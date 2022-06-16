import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

import {
  Card,
  CardGroup,
  Col,
  Container,
  Row,
  Table,
  FormGroup,
  Form,
  Input,
  InputGroup,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, approveUser } from "../features/user/userSlice";

const UserListScreen = () => {
  const dispatch = useDispatch();

  let { users, isSuccess, isLoading, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, message]);
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
                  USERS LIST
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
                        <div>Status</div>
                      </th>
                      {/* <th>
                        <div>Approval</div>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users
                        .filter((user) => user.accepted === true)
                        .map((user, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>

                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                              <Row className="justify-content-center">
                                <Col md={7}>
                                  <Form>
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

                                                status: e.target.value,
                                              })
                                            );

                                            toast.success("user updated");
                                            if (isSuccess)
                                              console.log(user.slug);
                                            console.log(user.status);
                                            console.log(user);
                                          }}
                                          name="status"
                                          value={user.status}
                                        >
                                          <option
                                            value="active"
                                            className="text-success"
                                          >
                                            active
                                          </option>
                                          <option
                                            className="text-danger"
                                            value="deactive"
                                          >
                                            inactive
                                          </option>
                                          <option value="suspended">
                                            suspended
                                          </option>
                                        </Input>
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
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

export default UserListScreen;
