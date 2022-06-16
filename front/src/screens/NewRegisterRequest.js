import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardGroup, Col, Container, Row, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, approveUser } from "../features/user/userSlice";
import Loader from "../components/Loader";

const NewRegisterRequest = () => {
  const dispatch = useDispatch();

  let { users, isError, isLoading, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getUsers());
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
                  New Registeration Requests
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
                        <div>Name</div>
                      </th>
                      <th>
                        <div>Email</div>
                      </th>
                      <th>
                        <div>Phone</div>
                      </th>
                      <th>
                        <div>Approval</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users
                        .filter((user) => user.accepted === false)
                        .map((user, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>

                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                              <Row className="justify-content-center">
                                <Col md={7}>
                                  {/* <Form>
                                    <FormGroup>
                                      <InputGroup>
                                        <Input
                                          className="text-center"
                                          id="status"
                                          type="select"
                                          onChange={(e) => {
                                            dispatch(
                                              approveUser({
                                                slug: user.slug,

                                                accepted: e.target.value,
                                              })
                                            );
                                            console.log(e.target.value);
                                            toast.success("user updated");
                                            if (isSuccess)
                                              console.log(user.slug);
                                            console.log(user.status);
                                            console.log(user);
                                          }}
                                          name="status"
                                          value={user.accepted}
                                        >
                                          <option
                                            className="text-success"
                                            value="true"
                                          >
                                            approve
                                          </option>
                                          <option
                                            className="text-danger"
                                            value="false"
                                          >
                                            reject
                                          </option>
                                        </Input>
                                      </InputGroup>
                                    </FormGroup>
                                  </Form> */}
                                  <span className="table-remove">
                                    <button
                                      type="button"
                                      className="btn btn-success btn-rounded btn-sm my-0"
                                      onClick={(e) => {
                                        dispatch(
                                          approveUser({
                                            slug: user.slug,

                                            accepted: true,
                                          })
                                        );
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
                                          approveUser({
                                            slug: user.slug,

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

export default NewRegisterRequest;

// <span class="table-remove">
// <button
//   type="button"
//   title="Click to cancel rejection"
//   className="btn btn-warning btn-rounded btn-sm my-0 d-none"
// >
//   Rejected
// </button>
// </span>
