import React, {Component} from 'react';
//import {Col, Row} from 'reactstrap';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class HousesPage extends Component {
    gotService = new gotService();
    
    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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
                getData={this.gotService.getAllHouses}
                renderItem={({name, region}) => `${name} (${region})`}/>
        )

        const houseDetails = (
            <CharDetails 
                    itemId={this.state.selectedHouse}
                    getData={this.gotService.getHouse}>
                <Field field='region' label='region'/>
                <Field field='words' label='words'/>
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={houseDetails}/>
        )
    }
}