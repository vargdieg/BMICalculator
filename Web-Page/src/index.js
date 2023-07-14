import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Loggin from './Pages/LogginPage/Loggin.jsx';
import Register from './Pages/RegisterPage/Register.jsx';
import Appointment from './Pages/AppointmentPage/Appointment.jsx';
import Bmi from './Pages/BmiPage/Bmi.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' Component={Loggin} />
        <Route path='/Register' Component={Register} />
        <Route path='/Appointments' Component={Appointment} />
        <Route path='/Imc' Component={Bmi} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
