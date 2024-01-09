import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const kelvinToCelsius = (kelvin) => kelvin - 273.15;
  const navigate = useNavigate();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8000/api/weather/',
        { location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userResponse = await axios.get('http://localhost:8000/api/weather/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWeatherData(userResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);

      if (error.response && error.response.status === 401) {

        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); 

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGetWeatherData = () => {
    if (location.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <Container style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h2>Weather Dashboard</h2>
      <div style={{ marginBottom: '10px' }}>
        <Form>
          <Form.Group controlId="formBasicLocation">
            <Form.Label>Enter Location:</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={handleLocationChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleGetWeatherData();
                }
              }}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </Form.Group>
          <Button variant="primary" className="m-3 p-3"onClick={handleGetWeatherData}>
            Get Weather Data
          </Button>
        </Form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <Card style={{ width: '18rem', margin: '20px' }}>
          <Card.Body>
            <Card.Title>Live Weather Data</Card.Title>
            <Card.Text>
              <p>Location: {weatherData.location}</p>
              <p>Description: {weatherData.description}</p>
              <p>Temperature: {kelvinToCelsius(weatherData.temperature).toFixed(2)}°C</p>
              <p>Humidity: {weatherData.humidity}</p>
              <p>Feels Like: {weatherData.feels_like}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>No weather data available.</p>
      )}
    </Container>
  );
};

export default Dashboard;
