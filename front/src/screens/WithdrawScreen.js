import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";

import {
  getAccount,
  updateAccount,
  reset,
} from "../features/account/accountSlice";
import {
  Button,
  Card,
  CardTitle,
  Col,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ListGroup } from "react-bootstrap";

const WithdrawScreen = () => {
  const dispatch = useDispatch();

  let { accounts, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.accounts
  );

  const [moneyTransfer, setMoneyTransfer] = useState(0);

  const submitWithdraw = (e) => {
    e.preventDefault();
    dispatch(reset);

    dispatch(updateAccount(accounts.balance - Number(moneyTransfer)));
    if (isError) console.log(message);
    setMoneyTransfer(0);
  };

  useEffect(() => {
    dispatch(getAccount());
    if (isSuccess) dispatch(reset);
  }, [dispatch, isSuccess, message]);

  const changeMoneyTransfer = (e) => {
    setMoneyTransfer(e.target.value);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Link to="/user" className="btn btn-light my-3">
        Go Back
      </Link>
      <Container>
        <div className="container-fluid py-3">
          <Row>
            <Col xs={12} sm={8} md={6} lg={6} className={"mx-auto"}>
              <Card>
                <div className="card-body">
                  <Collapse isOpen>
                    <CardTitle>
                      <h5 className="text-start">
                        Please enter withdrawal information
                      </h5>
                    </CardTitle>
                    <hr />
                    <Form
                      method="post"
                      noValidate="novalidate"
                      className="needs-validation"
                      onSubmit={submitWithdraw}
                    >
                      <h4>1. Account information</h4>

                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Current Balance:</strong> ${accounts.balance}
                        </ListGroup.Item>
                      </ListGroup>
                      <hr />

                      <h4>2. Information to withdraw money</h4>

                      <FormGroup>
                        <Label for="moneyTransfer">Amount of money</Label>
                        <Input
                          type="number"
                          name="moneyTransfer"
                          id="moneyTransfer"
                          onChange={changeMoneyTransfer}
                          value={moneyTransfer}
                          required
                        />
                      </FormGroup>
                      <hr />
                      <Button
                        id="btnRecharge"
                        type="submit"
                        color={"success"}
                        size={"lg"}
                        block={true}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <span style={{ marginLeft: "5px" }}>Withdraw</span>
                      </Button>
                    </Form>
                  </Collapse>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default WithdrawScreen;
