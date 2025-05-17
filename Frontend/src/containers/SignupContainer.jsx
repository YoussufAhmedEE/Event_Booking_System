import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import { motion } from "framer-motion";
import { register } from "../services/AuthenticationServices";
import { useNavigate } from "react-router-dom";

const SignupContainer = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (e.target.error) {
      const formattedErrors = {};
      error.details.forEach((detail) => {
        formattedErrors[detail.path[0]] = detail.message;
      });
      setErrors(formattedErrors);
    } else {
      setErrors({});

      const response =await register(formData)
      if(response.success){
        navigate('/home')
      }
      else{
        alert(response.error)
      }
    }
  };

  return (
        <motion.div
      key="signup"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "#5B7C9C",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        minWidth: "320px",
      }}
    >
    <SignupForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      errors={errors}
    />
    </motion.div>
  );
};

export default SignupContainer;
