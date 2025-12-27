import { createContext, useContext, useState, useEffect, useReducer } from 'react';

const BASE_URL = "http://localhost:1300/cities";

const CitiesContext = createContext();

const initialState = {
  data: [],
  isLoade: false,
  currentCitie: '',
  error: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'loader':
      return {...state, isLoade: true}
      
    case 'cityes/loader':
      return {
        ...state,
        isLoade: false,
        data: action.payload
      }
      
    case 'city/loader':
      return {
        ...state,
        isLoade: false,
        currentCitie: action.payload
      }
      
    case 'city/create':
      return {
        ...state,
        isLoade: false,
        data: [...state.data, action.payload],
        currentCitie: action.payload
      }
      
    case 'city/delete':
      return {
        ...state,
        isLoade: false,
        data: state.data.filter(filt => filt.id !== action.payload),
        currentCitie: {}
      }
      
    case 'rejected':
      return {
        ...state,
        error: action.payload
      }
    
    default:
      throw new Error('Unkwno action type')
  }
}

function CustumCitiesContext({children}) {
  const [{data, isLoade, currentCitie}, dispatch] = useReducer(reducer, initialState);
  
  useEffect(function() {
    dispatch({type: 'loader'});
    async function requestFetch() {
      try{
        const request = await fetch(BASE_URL);
        const data = await request.json();
        dispatch({type: 'cityes/loader', payload: data});
      } catch(error) {
        dispatch({
          type: 'rejected', 
          payload: "There was an error loading cities..."
        })
      }
    }
  requestFetch();
  }, [])
  
  async function getCitiye(id) {
      dispatch({type: 'loader'});
      try{
        const request = await fetch(`${BASE_URL}/${id}`);
        const data = await request.json();
        dispatch({type: 'city/loader', payload: data})
      } catch(error) {
        dispatch({
          type: 'rejected', 
          payload: "There was an error loading the city..."
        })
      }
  }
  
  async function updateListCity(newCity) {
      dispatch({type: 'loader'});
      try{
        const request = await fetch(`${BASE_URL}`, {
          method: 'POST',
          body: JSON.stringify(newCity),
          headers: {
            'Content-Type': 'aplication/json'
          }
        });
        const data = await request.json();
        dispatch({type: 'city/create', payload: data});
      } catch(error) {
        dispatch({
          type: 'rejected', 
          payload: "There was an error creating the city..."
        })
      } 
  }
  
  async function deleteCity(id) {
    dispatch({type: 'loader'});
    try{
      await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      dispatch({type: 'city/delete', payload: id})
    } catch(error) {
      dispatch({
        type: 'rejected', 
        payload: "There was an error creating the city..."
      })
    }
  }
  
  return (<CitiesContext.Provider value={{
    data,
    isLoade,
    currentCitie,
    getCitiye,
    updateListCity,
    deleteCity,
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
