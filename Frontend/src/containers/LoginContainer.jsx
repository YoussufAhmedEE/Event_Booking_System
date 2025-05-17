import React, { useState } from "react";
import LoginForm from "../components/LoginFrom";
import { motion } from "framer-motion";
import { login } from "../services/AuthenticationServices";
import { useNavigate } from "react-router-dom";


const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleSubmit= async(e)=>{
     e.preventDefault();

    const userData={
      email,password
    }
    const response = await login(userData);
    if(!response.success){
      alert(response.error);
    }
    else {
        const { isAdmin}= response;

    if (isAdmin) {
      // Navigate to admin dashboard
      navigate("/admin");
    } else {
      // Navigate to user home
      navigate("/home");
    }
  }
    
  }
  return (
      <motion.div
      key="login"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "#5B7C9C",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        minWidth: "320px",
      }}
    >
    <LoginForm 
      email={email}
      password={password}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
    />
      </motion.div>
  );
};

export default LoginContainer;
