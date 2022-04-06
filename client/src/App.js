import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [greeting, setGreeting] = useState("not connected to backend");
  const [testUser, setTestUser] = useState({
    username: "no username",
    email: "no email",
  });

  useEffect(() => {
    console.log(process.env, "This is the process env");
    console.log(BACKEND_URL, "This is the backend URL");
    axios.get(`${BACKEND_URL}/hello`).then((response) => {
      setGreeting(response.data.content + "!");
      console.log(response.data);
    });
    axios.get(`${BACKEND_URL}/test`).then((response) => {
      setTestUser(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{greeting}</p>
        <p>
          Test user from postgres: <br></br>
          name: {testUser.username}, <br></br>
          email: {testUser.email}
        </p>
      </header>
    </div>
  );
};

export default App;
