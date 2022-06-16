import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { getAccount, reset } from "../features/account/accountSlice";
import { createLog } from "../features/logs/logSlice";
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
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { ListGroup } from "react-bootstrap";
import Loader from "../components/Loader";

const TransferScreen = () => {
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.accounts);
  const { isSuccess, isLoading, message } = useSelector((state) => state.logs);

  const [moneyTransfer, setMoneyTransfer] = useState(0);
  const [receiverAccountNum, setReceiverAccountNum] = useState("");

  const submitTransfer = (e) => {
    e.preventDefault();
    dispatch(reset);
    if (moneyTransfer > accounts.balance)
      return toast.error("Account does not have sufficient balance!");
    dispatch(
      createLog({ amount: +moneyTransfer, reciver: receiverAccountNum })
    );
    setMoneyTransfer(0);
  };

  useEffect(() => {
    dispatch(getAccount());
    if (isSuccess) dispatch(reset);
  }, [dispatch, isSuccess, message]);

  const changeMoneyTransfer = (e) => {
    setMoneyTransfer(e.target.value);
  };
  const changeReceiverAccountNum = (e) => {
    setReceiverAccountNum(e.target.value);
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
                      <h3 className="text-center">New Transfer</h3>
                    </CardTitle>
                    <hr />
                    <Form
                      method="post"
                      noValidate="novalidate"
                      className="needs-validation"
                      onSubmit={submitTransfer}
                    >
                      <h4>1. Account information</h4>
                      {/* <FormGroup> */}

                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Current Balance:</strong> ${accounts.balance}
                        </ListGroup.Item>
                      </ListGroup>
                      {/* </FormGroup> */}
                      <hr />

                      <h4>1. Sender</h4>

                      <FormGroup>
                        <InputGroup>
                          <InputGroupText>Account Number</InputGroupText>
                          <Input
                            type="text"
                            name="username"
                            disabled={true}
                            value={accounts.account_number || ""}
                          />
                        </InputGroup>
                      </FormGroup>
                      <h4>2. Recipient</h4>

                      <FormGroup>
                        <InputGroup>
                          <InputGroupText>Account Number</InputGroupText>
                          <Input
                            type="text"
                            name="accountNum"
                            id="accountNum"
                            onChange={changeReceiverAccountNum}
                            value={receiverAccountNum || ""}
                            placeholder="Enter account number"
                          />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <Label for="moneyTransfer">Amount of money</Label>
                        <Input
                          type="number"
                          name="moneyTransfer"
                          id="moneyTransfer"
                          onChange={changeMoneyTransfer}
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
                        <span style={{ marginLeft: "5px" }}>Transfer</span>
                      </Button>
                    </Form>
                  </Collapse>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default TransferScreen;
