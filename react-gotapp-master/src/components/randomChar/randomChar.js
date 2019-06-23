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
        viewRandChar: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 50000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { 
        this.setState({
            char,
            loading: false,
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
        if(this.state.viewRandChar) { 
            this.setState({
                loading: true
            })
        }

        this.gotService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    onClickMagicButton = () => {
        const {viewRandChar} = this.state;
        this.updateChar();

        this.setState({
            viewRandChar: !viewRandChar,
            char: 0
        })
        
    }

    render() {
        console.log( 'render');
        const {char, loading, error, viewRandChar } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || viewRandChar) ? <View char={char}/> : null;
        return (
            <>
                <Button className='magicButton'
                    color='primary'
                    onClick={this.onClickMagicButton}>
                    Волшебная кнопка
                </Button>
                {  !viewRandChar &&
                    <div className="random-block rounded">
                        {errorMessage}
                        {spinner}
                        {content}
                    </div>
                }
               
            </>
        );
    }
}

const View = ({char}) => {
    const{name, gender, born, died, culture} = char;
    return (
        <div>
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
