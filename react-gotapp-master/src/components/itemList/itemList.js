import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
export default class ItemList extends Component {

    render() {
        return (
            <ListGroup>
                <ListGroupItem tag='a' href='#'>
                    John Snow
                </ListGroupItem>
                <ListGroupItem tag='a' href='#' action>
                    Brandon Stark
                </ListGroupItem>
                <ListGroupItem tag='a' href='#'>
                    Geremy
                </ListGroupItem>
            </ListGroup>
        );
    }
}