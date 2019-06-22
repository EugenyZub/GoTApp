import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage/';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
    gotService = new gotService();
    
    state = {
        selectedChar: null,
        //selectedBook: null,
        //selectedHouse: null,
        error: false
    }

   // onItemSelected = (id, itemType) => {
    onItemSelected = (id) => {
        // switch (itemType) {
        //     case 'char':
        //             this.setState({
        //                 selectedChar: id,
        //                 selectedBook: null,
        //                 selectedHouse: null
        //             })
        //             break;
        //     case 'book':
        //             this.setState({
        //                 selectedChar: null,
        //                 selectedBook: id,
        //                 selectedHouse: null
        //             })
        //             break;
        //     case 'house':
        //             this.setState({
        //                 selectedChar: null,
        //                 selectedBook: null,
        //                 selectedHouse: id
        //             })
        //             break; 
        //     default: console.log('Incorrect itemType')
        //             break;
        //         }  

        this.setState({
            selectedChar: id
        })
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    choiseViewComponent() {
        
        if( this.state.selectedChar !== null) {
            return (
                <CharDetails 
                        itemId={this.state.selectedChar}
                        getData={this.gotService.getCharacter}>
                    <Field field='gender' label='Gender'/>
                    <Field field='born' label='Born'/>
                </CharDetails>
            )
        }

        if( this.state.selectedBook !== null) {
            return (
                <CharDetails 
                        itemId={this.state.selectedBook}
                        getData={this.gotService.getBook}>
                    <Field field='numberOfPages' label='pages'/>
                    <Field field='publisher' label='publisher'/>
                </CharDetails>
            )
        }

        if( this.state.selectedHouse !== null) {
            return ( 
                <CharDetails 
                        itemId={this.state.selectedHouse}
                        getData={this.gotService.getHouse}>
                    <Field field='region' label='region'/>
                    <Field field='words' label='words'/>
                </CharDetails>
            )
        }
    }

    render() {
        const charDetails = this.choiseViewComponent();
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            // <>
                <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllCharacters}
                    renderItem={({name, gender}) => `${name} (${gender})`}/>
                /* <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllBooks}
                    renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`}/>
                <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllHouses}
                    renderItem={({name, region}) => `${name} (${region})`}/> */
        //    </>
        )  

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}