import React, {Component} from 'react';
import './randomChar.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import ErrorMessage404 from '../error404';
import ErrorMessage408 from '../error408';
import ErrorMessage410 from '../error410';

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updateChar();
        this.errorChoise();
    }

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: ''
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    errorChoise(num) {
        const array = [404, 408, 410];
        return array[
            num === 1 ? 0 : num === 2 ? 1 : 2
        ];
    }

    onError = (err) => {
        let randNum = Math.floor(Math.random()*3 + 1);
        
        let errorNumber= this.errorChoise(randNum);

        this.setState({
            error: errorNumber,
            loading: false
        })
        console.log(errorNumber)
    }

    updateChar() {
        //const id = Math.floor(Math.random()*140 + 25);
        const id = 13000000000;   //для ошибки 404.
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error } = this.state;

        const errorMessage = error === 404 ? <ErrorMessage404/> : 
              error === 408 ? <ErrorMessage408/> : 
              error === 410 ? <ErrorMessage410/> : null;

        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}
