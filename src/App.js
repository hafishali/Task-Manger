import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AuthRoute from './components/AuthRoute'

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Login register />} />
      <Route path="/dashboard" element={
        <AuthRoute><Dashboard /></AuthRoute>} />
      <Route path="/profile" element={
        <AuthRoute><Profile /></AuthRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;
