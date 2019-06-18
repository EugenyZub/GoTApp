import React, {Component} from 'react';
import './errorMessage.css';
import img from './error.jpg';
import img404 from './error404.jpg';
import img408 from './error408.png';
import img410 from './error410.jpg';

export default class ErrorMessage extends Component {
    render() {
        const {error} = this.props;

        const curentErrorImg = error === 404 ? img404 : 
                               error === 408 ? img408 : 
                               error === 410 ? img410 : img;
                               
        return (
            <>
                <img src={curentErrorImg} alt={error}></img>
                <span>Something goes wrong ({error})</span>
            </>
        )
    }
}

// const ErrorBox = () => {
//     return (
//         <>
//             <img src={img} alt='error'></img>
//             <span>Something goes wrong</span>
//         </>
//     )
// }