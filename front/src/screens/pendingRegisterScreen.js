import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PendingRegisterScreen = () => {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} lg={6}>
          <Card className="mt-3 text-center" bg="light">
            <Card.Header>Your Request is pending Approval</Card.Header>
            <Card.Body>
              <Alert variant="dark">
                Your Registeration is waiting for approval. You will be notified
                when your request has been approved
              </Alert>

              <Button
                variant="success"
                className="extraButton"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back to login page
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingRegisterScreen;
