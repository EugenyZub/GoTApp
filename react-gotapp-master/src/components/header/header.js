import React from 'react';
import styled from 'styled-components';
import {Nav, NavItem, NavLink} from 'reactstrap';
import './header.css';

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
                <NavLink href="#">
                    Game of Thrones DB
                </NavLink>
            </HeaderTitle>
            <Nav className='header-links'>
                <NavItem className='header-links-li'>
                    <NavLink href="#">Characters</NavLink>
                </NavItem>
                <NavItem className='header-links-li'>
                    <NavLink href="#">Houses</NavLink>
                </NavItem>
                <NavItem className='header-links-li'>
                    <NavLink href="#">Books</NavLink>   
                </NavItem>
            </Nav>
        </HeaderBlock>
    );
};

export default Header;