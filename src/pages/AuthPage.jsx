import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../app/authSlice";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const getValidationSchema = (isRegister) =>
  Yup.object({
    ...(isRegister && {
      name: Yup.string().required("Name is required"),
    }),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      setErrors({});
      await getValidationSchema(isRegister).validate(values, {
        abortEarly: false,
      });

      if (isRegister) {
        setMessage(`✅ Registered: ${values.name}, ${values.email}`);
        dispatch(
          login({
            name: values.name,
            email: values.email,
            password: values.password,
          })
        );
      } else {
        dispatch(
          login({
            name: "User1",
            email: values.email,
            password: values.password,
          })
        );
        setMessage(`🔑 Logged in: ${values.email}`);
      }
      navigate("/");
    } catch (validationError) {
      const errorObj = {};
      validationError.inner.forEach((err) => {
        errorObj[err.path] = err.message;
      });
      setErrors(errorObj);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff", // screen bg white
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 32,
          border: "1px solid #ddd",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          {isRegister ? "Register" : "Login"}
        </Title>

        <Form layout="vertical" onFinish={handleFinish}>
          {/* Name (only for register) */}
          {isRegister && (
            <Form.Item
              label="Name"
              name="name"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name}
            >
              <Input
                placeholder="Enter your name"
                style={{ backgroundColor: "#fff", color: "#000" }}
              />
            </Form.Item>
          )}

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              style={{ backgroundColor: "#fff", color: "#000" }}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password}
          >
            <Input.Password
              placeholder="Enter your password"
              style={{ backgroundColor: "#fff", color: "#000" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#34b51c",
                borderColor: "#34b51c",
                fontWeight: "bold",
              }}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </Form.Item>
        </Form>

        {message && (
          <Alert
            message={message}
            type="success"
            showIcon
            closable
            style={{ marginTop: 16 }}
          />
        )}

        <div style={{ marginTop: 16, textAlign: "center", color: "black" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button
            type="link"
            onClick={() => setIsRegister((prev) => !prev)}
            style={{ padding: 0 }}
          >
            {isRegister ? "Login" : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
