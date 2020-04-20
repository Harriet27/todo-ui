import React, { useEffect } from 'react';
import './App.css';
import { Home } from './Pages';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Todo from './Pages/Todo';
import Verify from './Pages/Verify';
import { useDispatch } from 'react-redux';
import { keepLogin } from './Redux/Action';

function App() {
  // const token = localStorage.getItem('token');
  // console.log(token);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     keepLogin()
  //   )
  // }, [dispatch]);
  
  useEffect(() => {
    dispatch(
      keepLogin()
    )
  });

  return (
    <div>
      <Header/>
      <Route path='/' component={Home} exact/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/todo' component={Todo}/>
      <Route path='/verify' component={Verify}/>
    </div>
  );
}

export default App;
