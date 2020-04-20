import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../Redux/Action';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const user = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          ToDo App
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>

              {
                user
                ?
                <React.Fragment>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to='/todo'>
                        <NavItem>
                          <NavLink>ToDo</NavLink>
                        </NavItem>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to='/' onClick={() => dispatch(Logout())}>
                        <NavItem>
                          <NavLink>Logout</NavLink>
                        </NavItem>
                      </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Close Dropdown
                    </DropdownItem>
                  </DropdownMenu>
                </React.Fragment>
                :
                <React.Fragment>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to='/login'>
                        <NavItem>
                         <NavLink>Login</NavLink>
                        </NavItem>
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                    <Link to='/register'>
                      <NavItem>
                       <NavLink>Register</NavLink>
                      </NavItem>
                    </Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Close Dropdown
                    </DropdownItem>
                  </DropdownMenu>
                </React.Fragment>
              }

            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Come and Join !</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;