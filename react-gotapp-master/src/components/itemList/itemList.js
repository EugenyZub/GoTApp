import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemList.css';

export default class ItemList extends Component {

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

    renderItems(arr) {
        return arr.map((item) => {
            const id = item.url.substr(-2);
            const label = this.props.renderItem(item);  
            return (
                <ListGroupItem 
                    key={id}
                    className='cursor' 
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

        if(error) {
            return <ErrorMessage/>
        }
        const items = this.renderItems(itemList);

        return (
            <ListGroup flush>
                {items}
            </ListGroup>
        );
    }
}