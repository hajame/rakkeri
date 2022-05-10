import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { SignUpForm } from './components/SignUpForm';
import { Home } from './components/Home';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState(new Map());
  const [project, setProject] = useState(null);
  const [activeTracking, setActiveTracking] = useState(null);

  const handleLogout = () => {
    window.localStorage.removeItem('rakkeriAppUser');
    window.location.reload();
    setUser(null);
    setProjects([]);
    setTasks(new Map());
    setProject(null);
    setActiveTracking(null);
  };

  function hasUser() {
    return window.localStorage.getItem('rakkeriAppUser');
  }

  const theme = createTheme({
    palette: {
      mode: 'dark', // always dark mode
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Link to='/rakkeri'><Button>{hasUser() ? 'Home' : 'Login'}</Button></Link>
          {user === null ?
            <Link to='/rakkeri/signup'><Button>Sign up</Button></Link>
            : <Button onClick={() => handleLogout()}>Logout</Button>}

        </div>

        <Routes>
          <Route path='/rakkeri/signup' element={<SignUpForm />} />
          <Route path='/rakkeri' element={
            <Home user={user} setUser={setUser}
                  project={project} setProject={setProject}
                  projects={projects} setProjects={setProjects}
                  tasks={tasks} setTasks={setTasks}
                  activeTracking={activeTracking} setActiveTracking={setActiveTracking}
            />
          } />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
