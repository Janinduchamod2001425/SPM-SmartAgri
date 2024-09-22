import React from 'react';

import HeroBG from '../images/hero.jpg';

import '../styles/Home.css'

const HomePage = () => {
  return (
    <div>
      <img src={HeroBG} alt="" className='bgImage' />
      <h1 className='title1'>SmartAgri</h1>
      <h3 className='title2'>Smart Agriculture System</h3>

    </div>
  )
}

export default HomePage