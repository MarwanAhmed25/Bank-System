import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      {" "}
      <Container className="mx-auto px-6">
        <Row>
          <Col className="text-center py-3 ">
            &copy; {new Date().getFullYear()} Modern Bank
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
