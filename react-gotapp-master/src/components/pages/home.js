import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import RandomChar from '../randomChar';

export default class home extends Component {

    render() {
        return (
            <Row>
                <Col lg={{size: 5, offset: 0}}>
                     <RandomChar/>
                </Col>
            </Row> 
        )
    }   
}