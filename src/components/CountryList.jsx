import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import CountryItem from './CountryItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext'

function CountryList() {
  const {data, isLoade} = useCities();
  
  if(isLoade) return <Spinner />
  
  if(!data.length) {
    <Message message="Add your first city by clicking on a city on the map" />
  }
  
  const newListCity = data.reduce((cur, acc) => {
    if(!cur.map(item => item.country).includes(acc.country)) return  [...cur, {emoji: acc.emoji,country: acc.country}];
    else return cur;
  }, []);

  return (<div className={styles.countryList}>
     {newListCity.map(city => <CountryItem country={city} key={city.country}/>)}
  </div>
  )
}

export default CountryList;
