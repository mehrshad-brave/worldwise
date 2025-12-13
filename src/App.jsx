import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

function App() {
  const [data, setData] = useState([]);
  const [isLoade, setIsLoade] = useState(false);
  
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
  
  return (<BrowserRouter>
    <Routes>
      <Route index element={<Homepage />} />
      <Route path='pricing' element={<Product />} />
      <Route path='product' element={<Pricing />} />
      <Route path='app' element={<AppLayout />}>
        <Route index element={<CityList data={data} isLoade={isLoade}/>} />
        <Route path='cityes' element={<CityList data={data} isLoade={isLoade}/>} />
        <Route path='cityes/:id' element={<City />} />
        <Route path='contries' element={<CountryList citye={data}/>} />
        <Route path='form' element={<Form />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    
  </BrowserRouter>
  )
}

export default App;
