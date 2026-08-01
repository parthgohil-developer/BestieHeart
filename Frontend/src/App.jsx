import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import FormDashboard from './pages/FormDashboard';
import FormOne from './pages/FormOne';
import FormTwo from './pages/FormTwo';
import Birthday from './pages/Birthday';
import Personal from './pages/Personal';
import Meeting from './pages/Meeting';
import Friendship from './pages/Friendship';
import MessageReveal from './pages/MessageReveal';
import DoorReveal from './pages/DoorReveal';
import Museum from './pages/Museum';
import Exhibit1 from './pages/Exhibit1';
import Exhibit2 from './pages/Exhibit2';
import Exhibit3 from './pages/Exhibit3';
import FinalPage from './pages/FinalPage';
import WordSearch from './pages/WordSearch';
import Agreement from './pages/Agreement';
import MessageForm from './pages/MessageForm';

import MainLayout from './layout/MainLayout';
import { specialFormLogin } from './service/authService';
import './App.css';

function App() {
  return (
    <>
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
        <Route path="/friendship" element={<Friendship />} />
        <Route path="/message-reveal" element={<MessageReveal />} />
        <Route path="/door-reveal" element={<DoorReveal />} />
        <Route path="/museum" element={<Museum />} />
        <Route path="/exhibit-1" element={<Exhibit1 />} />
        <Route path="/exhibit-2" element={<Exhibit2 />} />
        <Route path="/exhibit-3" element={<Exhibit3 />} />
        <Route path="/final" element={<FinalPage />} />
        <Route path="/word-search" element={<WordSearch />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/message-form" element={<MessageForm />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
