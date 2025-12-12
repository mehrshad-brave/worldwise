import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));


function CityItem({citye}) {
  const { id, cityName, emoji, date, notes } = citye;
  return (<li >
    <Link to={`cityes/${id}`} className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.time}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  </li>
  )
}

export default CityItem;
