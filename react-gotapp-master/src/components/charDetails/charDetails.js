import React, {Component} from 'react';
//import './charDetails.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './charDetails.css';

const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;

    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;
export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: true,
        error: ''
    }

    // onError = (err) => {
    //     this.setState({
    //         error: err,
    //         loading: false
    //     })
    // }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        console.log(this.state.loading)

        if (this.props.charId !== prevProps.charId) {
            if (this.state.loading === false) {
                this.setState({
                    loading: true
                })
            }
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({
                    char,
                    loading: false
                })
            })
            //this.foo.born = 0;
    }

    render() {
        const {char, loading, error } = this.state;

        // if (this.state.error) {
        //     return <ErrorMessage/>
        // }
        //console.log(!this.state.char)
        if (!char) {
            return <span className='select-error'>Please select a character</span>
        } 

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <CharDetailsBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetailsBlock>
        );
    }
}


const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>{name}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}