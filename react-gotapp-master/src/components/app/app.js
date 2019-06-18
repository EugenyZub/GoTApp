import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
//import GotService from '../../services/gotService';

import './app.css';

export default class App extends Component {

    state = {
        view: true
    };

    onClickMagicButton = () => {
        const {view} = this.state;

        this.setState({
            view: !view
        })
    }

    render() {
        const {view} = this.state;

        const  buttonClick =  view ? <RandomChar/> : null;

        return (
            <> 
               <Container>
                     <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <Button className='magicButton'
                                color='primary'
                                onClick={this.onClickMagicButton}>
                                Волшебная кнопка
                            </Button>
                            {buttonClick}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    } 
};