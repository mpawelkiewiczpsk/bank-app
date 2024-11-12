import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input, Button, Typography, Row, Col, message } from 'antd';

const { Title, Text } = Typography;

export default function Login() {
  const [nik, setNik] = useState('');
  const [isNikSubmitted, setIsNikSubmitted] = useState(false);
  const [password, setPassword] = useState(Array(20).fill(''));
  const [disabledIndexes] = useState(
    Array.from({ length: 20 }, () => Math.random() < 0.5)
  );
  const inputRefs = useRef([]);

  const handleNikChange = (e) => {
    const value = e.target.value;
    if (value.length <= 8 && /^\d*$/.test(value)) {
      setNik(value);
    }
  };

  const loginToSystem = () => {
    axios
      .get(`http://localhost:3000/users?nik=${nik}`)
      .then(function (response) {
        if (response.data?.length > 0) {
          setIsNikSubmitted(true);
          response.data[0].name
            ? sessionStorage.setItem('name', response.data[0].name)
            : null;
          response.data[0].surname
            ? sessionStorage.setItem('surname', response.data[0].surname)
            : null;
        } else {
          message.warning('Nieprawidłowy numer NIK');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNikSubmit = () => {
    if (nik.length === 8) {
      loginToSystem();
    } else {
      message.warning('NIK musi mieć 8 cyfr');
    }
  };

  const handlePasswordChange = (index, value) => {
    if (value.length <= 1 && /^[a-zA-Z0-9]?$/.test(value)) {
      const newPassword = [...password];
      newPassword[index] = value;
      setPassword(newPassword);

      const nextIndex = inputRefs.current.findIndex(
        (_, i) => i > index && !disabledIndexes[i]
      );
      if (nextIndex !== -1) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '400px',
          textAlign: 'center',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title level={2}>Logowanie</Title>

        {!isNikSubmitted ? (
          <div>
            <Text strong>NIK (8 cyfr):</Text>
            <Input
              type="text"
              value={nik}
              onChange={handleNikChange}
              maxLength="8"
              style={{ width: '100%', marginTop: '10px' }}
            />
            <Button
              type="primary"
              onClick={handleNikSubmit}
              style={{ marginTop: '20px', width: '100%' }}
            >
              Dalej
            </Button>
          </div>
        ) : (
          <div>
            <Title level={4}>Podaj hasło</Title>
            <Row
              gutter={[16, 16]}
              justify="center"
              style={{ marginBottom: '20px' }}
            >
              {password.map((char, index) => (
                <Col key={index}>
                  <Input
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="password"
                    value={char}
                    onChange={(e) =>
                      handlePasswordChange(index, e.target.value)
                    }
                    disabled={disabledIndexes[index]}
                    maxLength={1}
                    style={{
                      width: '40px',
                      height: '40px',
                      textAlign: 'center',
                      fontSize: '18px',
                    }}
                  />
                </Col>
              ))}
            </Row>
            <Link to="/">
              <Button type="primary" style={{ width: '100%' }}>
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
