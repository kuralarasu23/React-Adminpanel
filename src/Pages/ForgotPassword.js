import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css'; // Custom styles for a colorful UI

function ForgotPassword() {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  const handleSubmit = (email) => {
    // Simulate password reset
    toast.success("Password reset link sent to your email!");
    // In real case, you can send the request to the backend for password reset.
    navigate("/"); // Redirect to login after successful reset
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box shadow-lg p-5 rounded">
        <h2 className="text-center text-primary fw-bold mb-4">Forgot Password</h2>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values.email)}
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

              <div className="d-flex justify-content-between mt-4">
                <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={isSubmitting}>
                  Send Reset Link
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-3 text-center">
          <Link to="/">
            <p className="text-muted">Remembered your password? Login</p>
          </Link>
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

export default ForgotPassword;
