import React, {Component} from 'react';
import './randomChar.css';
import {ListGroup, ListGroupItem} from 'reactstrap';
export default class RandomChar extends Component {

    render() {

        return (
            <div className="random-block rounded">
                <h4>Random Character: John</h4>
                <ListGroup flush>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>male</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>11.03.1039</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>13.09.1089</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>Anarchy</span>
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}
