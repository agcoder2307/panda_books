import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Button, Result } from "antd";
import { colors } from "../constants/colors";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
      {/* Header */}
      <Header isNotFound />

      <Result
        status="404"
        title="404"
        subTitle="Page Not Found 404"
        extra={
          <Button
            type="primary"
            style={{ background: colors.primary }}
            onClick={() => navigate("/")}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
