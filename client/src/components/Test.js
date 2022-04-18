import { useState, useEffect } from 'react';
import axios from 'axios';

export const Test = () => {
  const [greeting, setGreeting] = useState('not connected to backend');
  const [testUser, setTestUser] = useState({
    username: 'no username',
    email: 'no email',
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/hello`).then((response) => {
      setGreeting(response.data.content);
    });
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/test`).then((response) => {
      setTestUser(response.data);
    });
  }, []);

  return (
    <div className='App'>
      <div className='App-header'>
        <p>{greeting}</p>
        <p>
          Test user from postgres: <br></br>
          name: {testUser.username}, <br></br>
          email: {testUser.email}
        </p>
      </div>
    </div>
  );
};
