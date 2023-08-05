import React from 'react';
import fondoHome from '../../assets/fondos/fondoHome.jpg';
import navBarHome from './navBar';

function BackgroundHome(){
  return (<div className='backgroundHome'>
    <img src={fondoHome} alt="FondoHome" width="100%" height="100%" />
  </div>)
};

export default BackgroundHome;