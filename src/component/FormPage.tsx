import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import CSS from 'csstype';

const FormPage: React.FC = () => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.phone && formData.email) {
      localStorage.setItem('userDetails', JSON.stringify(formData));
      history("/second");
    } else {
      alert('Please fill in all the required information before submitting.');
    }
  };

  // Styling
  const h1Styles:CSS.Properties={
    fontWeight:'bold',
    color:'Purple',
    fontFamily:'revert'
  }

  return (
   
    <Container>
      <Grid container spacing={2} justifyContent="center" className="form">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" style={h1Styles}>User Details Form</Typography>
        </Grid>
        <Grid item xs={12} >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormPage;
