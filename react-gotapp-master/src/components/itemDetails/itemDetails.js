import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from 'styled-components';
//import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemDetails.css';

const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;

    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;

const Field = ({item, field, label}) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
                <span className="term">{label}</span>
                <span>{item[field]}</span>
        </ListGroupItem>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: ''
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
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
        const {getData, itemId} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false
                })
               
            })
            .catch(this.onError);
            //this.foo.born = 0;
    }

    render() {
        const {item, loading, error } = this.state;
        if (!item) {
            return <span className='select-error'>Please select a character</span>
        } 

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View item={item} children={this.props.children}/> : null;

        return (
            <CharDetailsBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetailsBlock>
        );
    }
}


const View = ({item, children}) => {
    const {name} = item;
    return (
        <>
            <h4>{name}</h4>
            <ListGroup flush>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ListGroup>
        </>
    )
}