import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, CssBaseline } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';
import { LightPurpleButton } from '../components/buttonStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const GlobalStyle = createGlobalStyle`
  body {
    background: url('https://source.unsplash.com/random') no-repeat center center/cover;
    height: 100vh;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const theme = createTheme({
    palette: {
        primary: {
            main: '#7f56da',
        },
    },
});

const Homepage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            <StyledContainer maxWidth="md">
                <ContentBox>
                    <Typography variant="h2" gutterBottom>
                     
                        <br />
                        Attendance Management
                        <br />
                        System
                    </Typography>
                    
                    <ButtonContainer>
                        <StyledLink to="/choose">
                            <LightPurpleButton variant="contained" fullWidth>
                                Login
                            </LightPurpleButton>
                        </StyledLink>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link to="/Adminregister" style={{ color: "#7f56da", fontWeight: "bold" }}>
                                Sign up
                            </Link>
                        </Typography>
                    </ButtonContainer>
                </ContentBox>
            </StyledContainer>
        </ThemeProvider>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentBox = styled(Box)`
margin-top: 50px;
  background-color: rgba(255, 255, 255, 0.85);  /* Adjust transparency */
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);  /* Stronger shadow for pop-out effect */
  text-align: center;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
