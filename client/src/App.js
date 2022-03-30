import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [greeting, setGreeting] = useState("not connected");

  useEffect(() => {
    axios.get("http://localhost:8080/hello").then((response) => {
      setGreeting(response.data.content);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{greeting}</p>
      </header>
    </div>
  );
};

export default App;
