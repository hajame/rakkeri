import './App.css';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { SignUpForm } from './components/SignUpForm';
import { Home } from './components/Home';
import { Test } from './components/Test';
import Button from '@mui/material/Button';
import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [activeTracking, setActiveTracking] = useState(null);

  const handleLogout = () => {
    window.localStorage.removeItem('rakkeriAppUser');
    window.location.reload();
    setUser(null);
    setProjects([]);
    setProject(null);
    setActiveTracking(null);
  };

  function hasUser() {
    return window.localStorage.getItem('rakkeriAppUser');
  }

  return (
    <Router>
      <div>
        <Link to='/'><Button>{hasUser() ? 'Home' : 'Login'}</Button></Link>
        <Link to='/test'><Button>Test page</Button></Link>
        <Link to='/signup'><Button>Sign up</Button></Link>
        {user !== null ?
          <Button onClick={() => handleLogout()}>Logout</Button>
          : <div />}

      </div>

      <Routes>
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/test' element={<Test />} />
        <Route path='/' element={
          <Home user={user} setUser={setUser}
                project={project} setProject={setProject}
                projects={projects} setProjects={setProjects}
                activeTracking={activeTracking} setActiveTracking={setActiveTracking}
          />
        } />
      </Routes>
    </Router>
  );
};

export default App;
