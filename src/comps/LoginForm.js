// Login.js
import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styled, { keyframes } from 'styled-components';

// Definice animace pro pozadí
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Stylovaný obal login formuláře s animovaným pozadím
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(270deg, #ff6ec4, #7873f5, #55d7ff);
  background-size: 600% 600%;
  animation: ${backgroundAnimation} 10s ease infinite;
  padding: 20px;
`;

// Stylování formuláře
const FormWrapper = styled(animated.form)`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

// Stylování jednotlivých prvků formuláře
const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #7873f5;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a56c5;
  }
`;

// Přihlašovací komponenta
const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Animace formuláře
  const formAnimation = useSpring({
    opacity: isSubmitted ? 0 : 1,
    transform: isSubmitted ? 'translateY(-20px)' : 'translateY(0)',
    config: { tension: 280, friction: 60 },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Simulace přihlašovací logiky
    setTimeout(() => {
      alert('Přihlášení úspěšné!');
      setIsSubmitted(false);
    }, 1000);
  };

  return (
    <Container>
      <FormWrapper style={formAnimation} onSubmit={handleLogin}>
        <h2>Přihlášení</h2>
        <InputGroup>
          <label>Email:</label>
          <Input type="email" required />
        </InputGroup>
        <InputGroup>
          <label>Heslo:</label>
          <Input type="password" required />
        </InputGroup>
        <Button type="submit">Prihlásit se</Button>
      </FormWrapper>
    </Container>
  );
};

export default Login;
