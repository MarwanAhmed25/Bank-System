import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Modern Bank</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user && user.user?.role === "user" ? (
                <NavDropdown title={user.user.name} id="username">
                  <LinkContainer to="/user">
                    <NavDropdown.Item>User Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                //   <LinkContainer to="/login">
                //     <Nav.Link>
                //       <i className="fas fa-user"></i> Sign In
                //     </Nav.Link>
                //   </LinkContainer>
                // )}
                // {
                user &&
                user.user?.role === "admin" && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/newrequest">
                      <NavDropdown.Item>New Requests</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>User List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/accountlist">
                      <NavDropdown.Item>Account List</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={onLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )
              )}

              {!user && (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
