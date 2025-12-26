import { createContext, useContext, useState, useEffect } from 'react';

const CitiesContext = createContext();

function CustumCitiesContext({children}) {
  const [data, setData] = useState([]);
  const [isLoade, setIsLoade] = useState(false);
  
  const [currentCitie, setCurrentCitie] = useState('');
  
  useEffect(function() {
    async function requestFetch() {
      try{
        setIsLoade(true);
        const request = await fetch('http://localhost:1300/cities');
        
        if(!request.ok) return;
        const data = await request.json();
        setData(data);
      } catch(error) {
        
      } finally {
        setIsLoade(false);
      }
    }
  requestFetch();
  }, [])
  
  async function getCitiye(id) {
      try{
        setIsLoade(true);
        const request = await fetch(`http://localhost:1300/cities/${id}`);
        
        if(!request.ok) return;
        const data = await request.json();
        setCurrentCitie(data);
      } catch(error) {
        
      } finally {
        setTimeout(function() {
          setIsLoade(false);
          
        }, 3000);
      }
  }
  
  
  return (<CitiesContext.Provider value={{
    data,
    isLoade,
    currentCitie,
    getCitiye,
  }}>
    {children}
  </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CustumCitiesContext, useCities };
