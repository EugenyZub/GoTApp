import React from 'react';
//import './errorMessage.css';
import img from './error404.jpg';

const ErrorMessage404 = () => {
    return (
        <>
            {/* <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img> */}
            <img src={img} alt='error'></img>
            <span>Something goes wrong (404)</span>
        </>
    )
} 

export default ErrorMessage404;