import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemList.css';

export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false,
        loading: true
    }
    
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList,
                    loading: false
                })
            })
            .catch(this.onError);
            //this.foo.born = 0;  //для ошибки
    }

    componentDidCatch() {
        this.onError();
    }

    renderItems(arr) {
        return arr.map((item) => {
            const id = item.url.substr(-2);
            return (
                <ListGroupItem 
                    key={id}
                    className='cursor' 
                    onClick={ () => this.props.onCharSelected(id)}>
                    {item.name}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {charList, error, loading} = this.state;

        if (loading) {
            return <Spinner/>
        }
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;

        return (
            <ListGroup>
                {errorMessage}
                {items}
            </ListGroup>
        );
    }
}