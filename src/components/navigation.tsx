import * as React from 'react';

import { Link } from 'react-router-dom';
import {
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
} from 'reactstrap';

interface NavigationState {
    isOpen: boolean;
}

//
// Extensions of Reactstraps DropdownItem and NavLink elements that
// enable using React Routers Link element as Tag.
//
export interface LinkProps {
    to: string;
}

class Navigation extends React.Component<{}, NavigationState> {
    constructor(props: {}) {
        super(props);
        this.state = { isOpen: false };
    }

    render() {
        return (
            <Navbar color='primary' dark={ true } expand='md'>
                <Container>
                    <NavbarToggler onClick={ this.toggle } />
                    <Collapse isOpen={ this.state.isOpen } navbar={ true }>
                        <Nav className='md-auto' navbar={ true }>
                            { this.menuItem('Home', '/') }
                            { this.menuItem('Live', '/live') }
                            { this.menuItem('Recent', '/recent') }
                            <UncontrolledDropdown nav={ true } inNavbar={ true }>
                                <DropdownToggle nav={ true } caret={ true }>History</DropdownToggle>
                                <DropdownMenu className='navbar-light'>
                                    { this.subMenuItem('Daily', '/history/daily') }
                                    { this.subMenuItem('Monthly', '/history/monthly') }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav={ true } inNavbar={ true }>
                                <DropdownToggle nav={ true } caret={ true }>Usage</DropdownToggle>
                                <DropdownMenu className='navbar-light'>
                                    { this.subMenuItem('Monthly', '/usage/monthly') }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            { this.menuItem('About', '/about') }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }

    private menuItem = (title: string, target: string) => (
        <NavItem key={ target }>
            <NavLink tag={ Link } to={ target }>{ title }</NavLink>
        </NavItem>
    )

    private subMenuItem = (title: string, target: string) => (
        <DropdownItem tag={ Link } to={ target }>{ title }</DropdownItem>
    )

    private toggle = () => {
        this.setState((prev, props) => ({
            isOpen: !prev.isOpen,
        }));
    }
}

export default Navigation;
