import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/books'
import HousesPage from '../pages/houses'
//import ItemList from '../itemList';
//import CharDetails from '../charDetails';
import gotService from '../../services/gotService';

import './app.css';

export default class App extends Component {
    gotService = new gotService();

    state = {
        //view: true,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    // onClickMagicButton = () => {
    //     const {view} = this.state;

    //     this.setState({
    //         view: !view
    //     })
    // }

    render() {
        const {error} = this.state;

        //const  buttonClick =  view ? <RandomChar/> : null;

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
                        <RandomChar/>
                            {/* <Button className='magicButton'
                                color='primary'
                                onClick={this.onClickMagicButton}>
                                Волшебная кнопка
                            </Button>
                             {buttonClick} */}
                        </Col>
                    </Row>
                   <CharacterPage/>
                   <BooksPage/>
                   <HousesPage/>
                </Container>
            </>
        );
    } 
};