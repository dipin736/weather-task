
  import React from 'react';
  import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
  import Login from './components/login';
  import Register from './components/register';
  import Dashboard from './components/dashboard';
  import { AuthProvider } from './Auth/AuthContext';
  import PrivateRoute from './components/PrivateRoute';
  import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './navbar/navbar';

  const App = () => {
    return (
      <div>
        <AuthProvider>
          <CustomNavbar/>
          <Router>
            <Routes>
              <Route element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
      </AuthProvider>
      </div>
    );
  };

  export default App;
