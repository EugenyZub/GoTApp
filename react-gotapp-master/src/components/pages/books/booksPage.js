import React, {Component} from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BooksPage extends Component {
    gotService = new gotService();
    
    state = {
        selectedBook: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}/>
        )

        const bookDetails = (
            <CharDetails 
                    itemId={this.state.selectedBook}
                    getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='numberOfPages'/>
                <Field field='publisher' label='publisher'/>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}