import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import FormDashboard from './pages/FormDashboard';
import FormOne from './pages/FormOne';
import FormTwo from './pages/FormTwo';
import Birthday from './pages/Birthday';
import Personal from './pages/Personal';
import Meeting from './pages/Meeting';
import BackButton from './components/common/BackButton';
import MainLayout from './layout/MainLayout';
import { specialFormLogin } from './service/authService';
import './App.css';

function App() {
  return (
    <>
      <BackButton />
      <Routes>
        {/* Main Login */}
        <Route path="/" element={<Login />} />
        
        {/* Form Login and Content */}
      <Route 
        path="/form" 
        element={
          <Login 
            title="FORM ACCESS" 
            subtitle="Ask for Username, Password and Date from the developer otherwise you can't access this."
            authFunction={specialFormLogin} 
            onSuccessRoute="/form-dashboard" 
          />
        } 
      />
      {/* Global Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/form-dashboard" element={<FormDashboard />} />
        <Route path="/form-1" element={<FormOne />} />
        <Route path="/form-2" element={<FormTwo />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/meeting" element={<Meeting />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
