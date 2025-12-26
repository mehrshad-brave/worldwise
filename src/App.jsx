import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import City from './components/City';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import Form from './components/Form';

import { CustumCitiesContext } from './contexts/CitiesContext';

function App() {
  
  return (<CustumCitiesContext>
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='pricing' element={<Product />} />
        <Route path='product' element={<Pricing />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<Navigate replace to='cityes'/>} />
          <Route path='cityes' element={<CityList />} />
          <Route path='cityes/:id' element={<City />} />
          <Route path='contries' element={<CountryList />} />
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      
    </BrowserRouter>
  </CustumCitiesContext>
  )
}

export default App;
