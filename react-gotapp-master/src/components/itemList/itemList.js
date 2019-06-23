import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
//import gotService from '../../services/gotService';

import './itemList.css';

export default class ItemList extends Component {
    //gotService = new gotService();

    state = {
        itemList: null,
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
        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList,
                    loading: false
                })
            })
            
            .catch(this.onError);
            //this.foo.born = 0;  //для ошибки
    }

    componentDidCatch() {
        this.onError();
    }

    // checkItemType = (item) => {
    //     const charFilter = '/(?<first>characters)';
    //     const bookFilter = '/(?<first>books)';
    //     const houseFilter = '/(?<first>houses)';

    //     if(item.url.match(charFilter)) {
    //         return 'char';
    //     }

    //     if(item.url.match(bookFilter)) {
    //         return 'book';
    //     }

    //     if(item.url.match(houseFilter)) {
    //         return 'house';
    //     }
    // }

    renderItems(arr) {
        return arr.map((item) => {
            const id = item.url.substr(-2);
            const label = this.props.renderItem(item);  
 //           const itemType = this.checkItemType(item);
            return (
                <ListGroupItem 
                    key={id}
                    className='cursor' 
//                  onClick={ () => this.props.onItemSelected(id, itemType)}>
                    onClick={ () => this.props.onItemSelected(id)}>   
                    {label}
                </ListGroupItem>
            )
        })
    }

    render() {
        const {itemList, error, loading} = this.state;
        
        if (loading) {
            return <Spinner/>
        }
        const items = this.renderItems(itemList);

        const errorMessage = error ? <ErrorMessage/> : null;

        return (
            <ListGroup>
                {errorMessage}
                {items}
            </ListGroup>
        );
    }
}