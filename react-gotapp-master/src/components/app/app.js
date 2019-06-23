import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import {CharacterPage, booksPage, HousesPage, BooksItem, home} from '../pages';
//import BooksPage from '../pages/'
//import HousesPage from '../pages/'
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

export default class App extends Component {
    gotService = new gotService();

    state = {
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        const {error} = this.state;

        if (error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                        {/* <Route path='/home' exact component={Header}/> */}
                    </Container>
                    <Container>

                        <Route path='/home' exact component={home}/>
                        {/* <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <RandomChar/>
                            </Col>
                        </Row> */}
                        
                        <Route path='/characters' component={CharacterPage}/>             
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={booksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;

                                return <BooksItem bookId={id}/>
                            }
                        }/>
                        
                    </Container>
                </div>
            </Router>
        );
    } 
};