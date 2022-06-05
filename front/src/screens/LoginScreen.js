import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user?.role === "user") {
      navigate("/");
    }

    if (isSuccess && user?.role === "admin") {
      navigate("/admin");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormContainer>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login to your account</p>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            className="form-control"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
          ></Form.Control>
        </Form.Group>

        <div className="d-grid gap-2 py-3">
          <Button type="submit" variant="primary">
            Login
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
