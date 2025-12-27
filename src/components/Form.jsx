// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";

import styles from "./Form.module.css";
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

import Button from './Button';
import ButtonBack from './ButtonBack';
import { useCities }from '../contexts/CitiesContext'

import { useUrlPosition } from '../hooks/useUrlPosition';
import Message from './Message';
import Spinner from './Spinner';

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isToCity, setIsToCity] = useState(false);
  
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [isErrorGeolocation, setIsErrorGeolocation] = useState("");
  const [emoji, setEmoji] = useState("");
  
  const { 
    data,
    updateListCity, 
    isLoade} = useCities();
  const navigate = useNavigate();
  
  const [lat, lng] = useUrlPosition();
  
  useEffect(function() {
    async function fetchCityData() {
      try{
        setIsErrorGeolocation("");
        setIsLoadingGeolocation(true);
        const request = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        
        if(!request.ok) return;
        const dataFetch = await request.json();
        if (!dataFetch.countryCode) throw new Error("Please select a country.")
        setCityName(dataFetch.city || dataFetch.countryName || dataFetch.countryCode);
        setCountry(dataFetch.countryCode);
        setEmoji(convertToEmoji(dataFetch.countryCode));
      } catch(error) {
        setIsErrorGeolocation(error.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
  fetchCityData();
  }, [lat, lng])
  
  async function handlerSubmit(e) {
    e.preventDefault()
    if (!cityName || !date) return;
    
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: lat,
        lng: lng
      }
    }
    await updateListCity(newCity);
    navigate('/app/cityes')
  }
  
  if (isLoadingGeolocation) return <Spinner />
  
  if (isErrorGeolocation) return <Message message={isErrorGeolocation} />
  return (
    <form className={`${styles.form} ${isLoade ? styles.loading : ''}`} onSubmit={handlerSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <DatePicker 
          selected={date} 
          onChange={(data) => setDate(data)} 
          dateFormat='dd/MM/yyyy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary' dis={isToCity}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
