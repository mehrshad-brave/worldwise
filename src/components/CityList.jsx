import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext'

function CityList() {
  const {data, isLoade} = useCities();
  
  if(isLoade) return <Spinner />
  
  if(!data.length) {
    <Message message="Add your first city by clicking on a city on the map" />
  }

  return (<div className={styles.cityList}>
     {data.map(city => <CityItem citye={city} key={city.id}/>)}
  </div>
  )
}

export default CityList;
