import React from 'react';
import styled from 'styled-components';
import {Nav, NavItem} from 'reactstrap';
import './header.css';

import {Link} from 'react-router-dom';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const Header = () => {
    return (
        <HeaderBlock>
            <HeaderTitle>
                <Link to='/home/'>
                    Game of Thrones DB
                </Link>
            </HeaderTitle>
            <Nav className='header-links'>
                <NavItem className='header-links-li'>
                    <Link to='/characters/'>Characters</Link>
                </NavItem>
                <NavItem className='header-links-li'>
                    <Link to='/houses/'>Houses</Link>
                </NavItem>
                <NavItem className='header-links-li'>
                    <Link to='/books/'>Books</Link>   
                </NavItem>
            </Nav>
        </HeaderBlock>
    );
};

export default Header;