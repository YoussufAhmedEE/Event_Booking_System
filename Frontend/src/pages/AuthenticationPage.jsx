import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import LoginContainer from "../containers/LoginContainer";
import SignupContainer from "../containers/SignupContainer";

const AuthenticationPage = () => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <Box sx={{ minHeight: "100vh", width:"100vw", background: "#f0f2f5" }}>
      {/* Top Thin Bar */}
      <Box
        sx={{
          background: "#fff",
          padding: "15px 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          variant={activeForm === "login" ? "contained" : "outlined"}
          onClick={() => setActiveForm("login")}
        >
          Login
        </Button>
        <Button
          variant={activeForm === "signup" ? "contained" : "outlined"}
          onClick={() => setActiveForm("signup")}
        >
          Signup
        </Button>
      </Box>

      {/* Centered Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 60px)",
          padding: 2,
          background:"#0E2F4F"
        }}
      >
        <AnimatePresence mode="wait">
          {activeForm === "login" && <LoginContainer key="login" />}
          {activeForm === "signup" && <SignupContainer key="signup" />}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default AuthenticationPage;
