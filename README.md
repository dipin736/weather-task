# Weather Task Project

## Description
This project is designed to fetch and display live weather data using Django as the backend and React as the frontend. It utilizes a free weather API to retrieve real-time weather information and stores it in a MySQL database.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features
- Fetch live weather data from a free weather API.
- Store weather data in a MySQL database.
- Display live and stored weather data on a React dashboard.

## Technologies Used
- Django (Backend)
- React (Frontend)
- MySQL (Database)
- Axios (HTTP client for API requests)
- React Bootstrap (Styling)

## Setup
1. Clone the repository: `git clone https://github.com/your-username/weather-task.git`
2. Navigate to the Backend folder: `cd Backend`
3. Install Django dependencies: `pip install -r requirements.txt`
4. Set up MySQL database and configure the `settings.py` file.
5. Apply migrations: `python manage.py migrate`
6. Start the Django server: `python manage.py runserver`
7. Navigate to the Frontend folder: `cd Frontend`
8. Install React dependencies: `npm install`
9. Start the React development server: `npm start`

## Usage
1. Access the Django API at `http://localhost:8000/api/weather/` for fetching and storing weather data.
2. Access the React dashboard at `http://localhost:3000/` to view live and stored weather data.

## API Endpoints
- **POST** `/api/weather/`: Fetch and store weather data for a specific location.
  - Request Payload: `{ "location": "City, Country" }`

- **GET** `/api/weather/`: Retrieve the latest stored weather data.


