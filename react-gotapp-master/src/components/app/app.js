import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
//import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import './app.css';

export default class App extends Component {

    state = {
        view: true,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onClickMagicButton = () => {
        const {view} = this.state;

        this.setState({
            view: !view
        })
    }



    render() {
        const {view, error} = this.state;

        const  buttonClick =  view ? <RandomChar/> : null;

        if (error) {
            return <ErrorMessage/>
        }

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
                   <CharacterPage/>
                </Container>
            </>
        );
    } 
};