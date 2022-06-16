import React, { useEffect } from "react";
import { Col, Row, Card, Container } from "react-bootstrap";
import { getAccount, reset } from "../features/account/accountSlice";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";

const UserDashboardScreen = () => {
  const dispatch = useDispatch();

  const { accounts, isSuccess, message, isLoading } = useSelector(
    (state) => state.accounts
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAccount());
    if (isSuccess) dispatch(reset);
  }, [dispatch, isSuccess, message]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={6} className={"mx-auto"}>
              <Card className=" text-center" bg="light">
                <Card.Header className="text-center">
                  {/* <h1>Account</h1> */}
                  DASHBOARD
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Hello,{" "}
                    <span className="text-primary">{user.user.name}</span>
                  </Card.Title>
                  <h5>Manage Your Account</h5>

                  <Container>
                    <p>
                      <strong>Your Balance:</strong> {accounts.balance}
                    </p>

                    <div className="d-flex justify-content-around">
                      <Card.Link href="/deposit">
                        <button
                          className="btn
                         btn-success
                        
                        float-start"
                        >
                          Deposit
                        </button>
                      </Card.Link>

                      <Card.Link href="/withdraw">
                        <button
                          className="btn 
                         btn-success
                        
                        float-none"
                        >
                          withdraw
                        </button>
                      </Card.Link>

                      <Card.Link href="/transfer">
                        <button
                          className="btn 
                         btn-success
                      
                        
                        float-end"
                        >
                          transfer
                        </button>
                      </Card.Link>
                    </div>
                  </Container>
                </Card.Body>
                <Card.Footer>
                  <Link to="/list" className="btn btn-light my-3 float-end">
                    Transaction Hisory
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default UserDashboardScreen;
