import { useState } from "react";
import userService from "../services/users";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await userService.create({ username, email, password });
      console.log(response);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("Error in creating new user", e);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleLogin} className="App-header">
        <div>Create a new account</div>
        <p></p>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          email{" "}
          <input
            type="text"
            value={email}
            name="email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
