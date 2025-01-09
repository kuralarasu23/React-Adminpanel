import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Custom styles for colorful UI

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    num: "",
    email: "",
    password: "",
    repassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    num: Yup.string().required("Mobile number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("https://670e4b8a073307b4ee464403.mockapi.io/admin", values)
      .then(() => {
        toast.success("Signup Successful!");
        resetForm();
        navigate("/");
      })
      .catch(() => {
        toast.error("Error during signup. Please try again.");
      });
  };

 

  return (
    <div className="signup-bg d-flex justify-content-center align-items-center vh-100">
      <div className="signup-card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary fw-bold">Admin Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-secondary">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="form-control rounded-pill"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label htmlFor="num" className="form-label text-secondary">
                Mobile Number
              </label>
              <Field
                type="text"
                name="num"
                className="form-control rounded-pill"
                placeholder="Enter your mobile number"
              />
              <ErrorMessage name="num" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-secondary">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="form-control rounded-pill"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-secondary">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="form-control rounded-pill"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            <div className="mb-3">
              <label htmlFor="repassword" className="form-label text-secondary">
                Confirm Password
              </label>
              <Field
                type="password"
                name="repassword"
                className="form-control rounded-pill"
                placeholder="Confirm your password"
              />
              <ErrorMessage name="repassword" component="div" className="text-danger small" />
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button type="submit" className="btn btn-primary rounded-pill px-4">
                Sign Up
              </button>
              <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">
                Cancel
              </Link>
            </div>
            <div className="mt-3">
          <Link to="/" className="text-center">Already have an account? Login</Link>
        </div>
          </Form>
        </Formik>
      </div>
      {/* Place ToastContainer here */}
      <ToastContainer position="top-center" autoClose={5000} />
    </div>
  );
};

export default Signup;
