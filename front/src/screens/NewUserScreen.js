import React, { useEffect } from "react";
import { Col, Row, Button, Card, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../features/account/accountSlice";

const NewUserScreen = () => {
  const { user } = useSelector((state) => state.auth.user);
  console.log(user);

  const { accounts } = useSelector((state) => state.accounts);
  console.log(accounts);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/pending");
  };

  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={{ span: 6, offset: 3 }} lg={6}>
            <Card className="mt-3 text-center" bg="light">
              <Card.Header>DASHBOARD</Card.Header>
              <Card.Body>
                <Card.Title>
                  Hello, <span className="text-primary">{user.name}</span>
                </Card.Title>
                <Card.Text>You don't have an account! </Card.Text>
                <Col>
                  <Button
                    variant="success"
                    className="extraButton"
                    onClick={clickHandler}
                  >
                    Create New Account
                  </Button>
                </Col>
                <Col className="mt-2"></Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewUserScreen;
