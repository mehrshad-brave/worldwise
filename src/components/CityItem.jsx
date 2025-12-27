import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

import { useCities } from '../contexts/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


function CityItem({citye}) {
  const { currentCitie, deleteCity } = useCities();
  
  const { id, cityName, emoji, position, date, notes } = citye;
  
  function handlerDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (<li >
    <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={`${styles.cityItem} ${currentCitie.id === id ? styles['cityItem--active'] : ''}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.time}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handlerDelete}>&times;</button>
    </Link>
  </li>
  )
}
export default CityItem;
