import React from "react";

import { Container } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <>
      <Container className="landing-page">
        <div className="title">
          <h1>Welcome to Modern Bank</h1>
          <br />
        </div>

        <img className="bank-img" src="/images/bank.jpg" alt="bank" />
      </Container>
    </>
  );
};

export default HomeScreen;
