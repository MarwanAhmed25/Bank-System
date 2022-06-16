import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const DepositScreen = () => {
  const dispatch = useDispatch();

  const { accounts, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.accounts
  );

  const [moneyTransfer, setMoneyTransfer] = useState(0);

  const submitRecharge = (e) => {
    e.preventDefault();
    dispatch(reset);

    dispatch(updateAccount(accounts.balance + Number(moneyTransfer)));
    setMoneyTransfer(0);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAccount());
    if (isSuccess) dispatch(reset);
  }, [dispatch, isSuccess, message, isError]);

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
                      <h3 className="text-center">DEPOSIT ACCOUNT</h3>
                    </CardTitle>
                    <hr />
                    <Form
                      method="post"
                      noValidate="novalidate"
                      className="needs-validation"
                      onSubmit={submitRecharge}
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

                      <h4>2. Information to deposit money</h4>

                      <FormGroup>
                        <Label for="moneyTransfer">
                          <strong>Amount of Money:</strong>

                          {/* <ShowRequire /> */}
                        </Label>
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
                        color="success"
                        size={"lg"}
                        block={true}
                        className="d-flex align-items-center justify-content-center"
                        // disabled={rechargeSelector.isLoading}

                        // onClick={onRecharge}
                      >
                        <span style={{ marginLeft: "5px" }}>Recharge</span>
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

export default DepositScreen;

// <Container className="container" style={{ marginTop: "20px" }}>
//   <Row className="justify-content-center">
//     <Col md={12}>
//       <CardGroup className="mb-0">
//         <Card className="p-6">
//           <div className="card-block" style={{ padding: "20px 40px" }}>
//             {" "}
//             <Alert color="info">
//               <h4 className="alert-heading">
//                 This account is pending approval
//               </h4>
//               <p>
//                 Your account is waiting for approval. You will be notified
//                 when your request has been approved.
//               </p>
//               <hr />
//               <p className="mb-0">
//                 <Col>
//                   <Link to="/">
//                     <Button
//                       variant="primary"
//                       className="extraButton"
//                       onClick={() => {
//                         navigate("/");
//                       }}
//                     >
//                       Back to home page
//                     </Button>
//                   </Link>
//                 </Col>
//               </p>
//             </Alert>
//           </div>
//         </Card>
//       </CardGroup>
//     </Col>
//   </Row>
// </Container>
