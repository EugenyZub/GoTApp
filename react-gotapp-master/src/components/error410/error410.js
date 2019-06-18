import React from 'react';
//import './errorMessage.css';
import img from './error410.jpg';

const ErrorMessage410 = () => {
    return (
        <>
            {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img> */}
            <img src={img} alt='error'></img>
            <span>Something goes wrong (410)</span>
        </>
    )
} 

export default ErrorMessage410;