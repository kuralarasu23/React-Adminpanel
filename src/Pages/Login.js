import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

function App() {
  const [apiData, setApiData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://670e4b8a073307b4ee464403.mockapi.io/admin')
      .then((response) => {
        setApiData(response.data);
      });
  }, []);

  const handleLogin = (email, password) => {
    const user = apiData.find((item) => item.email === email); 
    if (!user) {
      toast.error("Email not found, please register first.");
      navigate("/signup");
    } else if (user.password === password) {
      toast.success("Login successful");
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      navigate("/products");
    } else {
      toast.warn("Invalid password, please try again.");
    }
  };


  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  return (
    <div className="login-container">
      {/* <Navbar collapseOnSelect expand="lg" className="bg-info text-white">
        <Container>
          <Navbar.Brand href="#home" className="fs-4 fw-bold">Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Link to='/signup'>
              <Button className="ms-2">Signup</Button>
            </Link>
            <Link to='/'>
              <Button className="ms-2">Login</Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}

      <div className="login-box shadow-lg p-5 rounded">
        <h2 className="text-center text-primary fw-bold mb-4">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values.email, values.password)}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="form-control rounded-pill"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="form-control rounded-pill"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={isSubmitting}>
                  Login
                </button>
                <Link to="/forgot">
                  <button type="button" className="btn btn-danger rounded-pill px-4">Forgot?</button>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-3">
          <Link to="/signup" className="text-center">Don't have an account? Signup</Link>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
