import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

import { Card, CardGroup, Col, Container, Row, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAccounts,
  approveAccount,
} from "../features/account/accountSlice";

const AccountApproval = () => {
  const dispatch = useDispatch();

  let { accounts, isError, isLoading, message } = useSelector(
    (state) => state.accounts
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAllAccounts());
  }, [dispatch, message, isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container className="container" style={{ marginTop: "20px" }}>
      <Row className="justify-content-center">
        <Col md={12}>
          <CardGroup className="mb-0">
            <Card className="p-6">
              <div className="card-block padding-card">
                <h3 className="col-centered table-heading text-center">
                  New Account Request
                </h3>
                <hr />

                <Table
                  striped
                  bordered
                  responsive
                  className="table-sm text-center"
                >
                  <thead>
                    <tr>
                      <th>
                        <div>#</div>
                      </th>
                      <th>
                        <div>Account Number</div>
                      </th>
                      <th>
                        <div>User</div>
                      </th>
                      <th>
                        <div>Balance</div>
                      </th>

                      <th>
                        <div>Approval</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts !== null &&
                      accounts
                        ?.filter((account) => account.accepted === false)
                        .map((account, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>

                            <td>{account.account_number}</td>
                            <td>{account.userSlug}</td>

                            <td>{account.balance}</td>
                            <td>
                              <Row className="justify-content-center">
                                <Col md={7}>
                                  <span className="table-remove">
                                    <button
                                      type="button"
                                      className="btn btn-success btn-rounded btn-sm my-0"
                                      onClick={(e) => {
                                        dispatch(
                                          approveAccount({
                                            slug: account.userSlug,

                                            accepted: true,
                                          })
                                        );
                                        toast.success("user updated");
                                      }}
                                    >
                                      Approve
                                    </button>
                                  </span>{" "}
                                  <span className="table-remove">
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-rounded btn-sm my-0"
                                      onClick={(e) => {
                                        dispatch(
                                          approveAccount({
                                            slug: account.userSlug,

                                            accepted: false,
                                          })
                                        );
                                      }}
                                    >
                                      Reject
                                    </button>
                                  </span>
                                </Col>
                              </Row>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </Table>
              </div>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AccountApproval;
