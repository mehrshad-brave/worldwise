import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import CountryItem from './CountryItem';
import Message from './Message';

function CountryList({citye, isLoade}) {
  if(isLoade) return <Spinner />
  
  if(!citye.length) {
    <Message message="Add your first city by clicking on a city on the map" />
  }
  
  const newListCity = citye.reduce((cur, acc) => {
    if(!cur.map(item => item.country).includes(acc.country)) return  [...cur, {emoji: acc.emoji,country: acc.country}];
    else return cur;
  }, []);

  return (<div className={styles.countryList}>
     {newListCity.map(city => <CountryItem country={city} key={city.country}/>)}
  </div>
  )
}

export default CountryList;
