import React, {Component} from 'react';
import './randomChar.css';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: '',
        seeRandChar: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {  
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            error: err,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        //const id = 13000000000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onClickMagicButton = () => {
        const {seeRandChar} = this.state;

        this.setState({
            seeRandChar: !seeRandChar
        })
    }

    render() {
        const {char, loading, error, seeRandChar } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || seeRandChar) ? <View char={char}/> : null;
        
        return (
            <>
                <Button className='magicButton'
                    color='primary'
                    onClick={this.onClickMagicButton}>
                    Волшебная кнопка
                </Button>

                {errorMessage}
                {spinner}
                {content}
            </>
        );
    }
}

const View = ({char}) => {
    const{name, gender, born, died, culture} = char;
    return (
        <div className="random-block rounded">
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
        </div>
    )
}
