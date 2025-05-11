import React, { useState } from "react";

import { Container, TextField, Button, Typography, Box, Paper, MenuItem ,IconButton, InputAdornment} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignupForm = ({ formData, onChange, onSubmit, errors }) => {
  const genders = ["Male", "Female", "Other"];
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowCPassword = () => {
  setShowCPassword(!showCPassword);
};
  return (
    <Container maxWidth="sm" >
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4, }}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <Box component="form" 
            sx={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    paddingRight: '8px' // optional for scrollbar space
                }} onSubmit={onSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={onChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={onChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={onChange}
            error={!!errors.email}
            helperText={errors.email}
          />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showCPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowCPassword}
                      edge="end"
                      sx={{ color: "text.secondary" }}
                    >
                      {showCPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
                      
          <TextField
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            margin="normal"
            value={formData.phoneNumber}
            onChange={onChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            fullWidth
            margin="normal"
            value={formData.gender}
            onChange={onChange}
            error={!!errors.gender}
            helperText={errors.gender}
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupForm;
