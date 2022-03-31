import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [greeting, setGreeting] = useState("not connected to backend");
  const [testUser, setTestUser] = useState({
    username: "no username",
    email: "no email",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/hello").then((response) => {
      setGreeting(response.data.content);
      console.log(response.data);
    });
    axios.get("http://localhost:8080/test").then((response) => {
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
