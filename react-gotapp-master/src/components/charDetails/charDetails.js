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

const Field = ({char, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
                <span className="term">{label}</span>
                <span>{char[field]}</span>
        </ListGroupItem>
    )
}

export {
    Field
}

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: true,
        error: ''
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {

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
        this.onError();
    }

    onError = () => {
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
            .catch(this.onError);
            //this.foo.born = 0;
    }

    render() {
        const {char, loading, error } = this.state;

        if (!char) {
            return <span className='select-error'>Please select a character</span>
        } 

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} children={this.props.children}/> : null;

        return (
            <CharDetailsBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetailsBlock>
        );
    }
}


const View = ({char, children}) => {
    const {name} = char;
    return (
        <>
            <h4>{name}</h4>
            <ListGroup flush>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {char})
                    })
                }
            </ListGroup>
        </>
    )
}