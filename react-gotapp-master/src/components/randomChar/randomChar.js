import React, {Component} from 'react';
import './randomChar.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updateChar();
    }

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: ''
    }

    onCharLoaded = (char) => {
        
        if (typeof char === typeof null) {
            this.setState({
                char,
                loading: false
            })
        } else {
            //console.log(char);
            this.setState({
                error: char,
                loading: false
            })
        }
    }

    // onError = () => {
    //     this.setState({
    //         error: true,
    //         loading: false
    //     })
    // }

    updateChar() {
        //const id = Math.floor(Math.random()*140 + 25);
        const id = 13000000000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            // .catch(this.onError);
    }

    render() {
        const {char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
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
    const{name, gender, born, died, culture} = char;
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
