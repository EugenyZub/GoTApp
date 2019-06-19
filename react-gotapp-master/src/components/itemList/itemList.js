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
        error: false
    }
    
    componentDidMount() {
        this.gotService.getAllCharacters()
            .then( (charList) => {
                this.setState({
                    charList
                })
            })
            //this.foo.born = 0;  //для ошибки
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

        const {charList} = this.state;
        //const {url} = charList;


        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ListGroup>
               {items}
            </ListGroup>
        );
    }
}