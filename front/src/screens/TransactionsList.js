import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardGroup, Col, Container, Row, Table } from "reactstrap";
import { getUserLog, reset } from "../features/logs/logSlice";
const moment = require("moment");

const TransactionsList = () => {
  const dispatch = useDispatch();

  const { logs, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.logs
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUserLog());
    if (isSuccess) dispatch(reset);
  }, [dispatch, isSuccess, isError, message]);

  const formatMoment = (value) => moment(value).format("DD-MM-YYYY HH:mm:ss");

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Link to="/user" className="btn btn-light my-3">
        Go Back
      </Link>
      <Container className="container" style={{ marginTop: "20px" }}>
        <Row className="justify-content-center">
          <Col md={12}>
            <CardGroup className="mb-0">
              <Card className="p-6">
                <div className="card-block padding-card">
                  <h3 className="col-centered table-heading text-center">
                    TRANSACTION LIST
                  </h3>
                  <hr />

                  {/* <Routes>
                  <Route
                    render={({ history }) => <SearchBox history={history} />}
                  />
                </Routes> */}

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
                          <div>Operation number</div>
                        </th>
                        <th>
                          <div>Sender Account Number</div>
                        </th>
                        <th>
                          <div>Receiver Account Number</div>
                        </th>
                        <th>
                          <div>Amount</div>
                        </th>
                        <th>
                          <div>Date</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs &&
                        logs
                          // .filter((log) => log.reciver === "7991794")// later

                          .map((log, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{log.operation_number}</td>
                              <td>{log.sender}</td>
                              <td>{log.reciver}</td>
                              <td>{log.amount}</td>
                              <td>{formatMoment(log.created_at)}</td>
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
    </>
  );
};

export default TransactionsList;

//filter by account number
//success, loading, error
