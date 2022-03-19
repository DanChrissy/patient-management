import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './navigation/Routes';

import data from '../src/assets/data.json';
import { useDispatch } from 'react-redux';
import { setAppointments } from './store/appointmentsReducer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAppointments(data));
  }, [])
  return (
    <Router/>
  );
}

export default App;
