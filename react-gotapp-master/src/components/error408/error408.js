import React from 'react';
//import './errorMessage.css';
import img from './error408.png';

const ErrorMessage408 = () => {
    return (
        <>
            {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img> */}
            <img src={img} alt='error'></img>
            <span>Something goes wrong(408)</span>
        </>
    )
} 

export default ErrorMessage408;