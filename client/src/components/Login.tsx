import { useState } from "react";

const Login = ({ onSubmit }: { onSubmit: (username: string) => void }) => {
  const [username, setUsername] = useState("");
  return (
    <>
      <h1>Welcome</h1>
      <p>What should people call you</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <button type="submit">Enter</button>
      </form>
    </>
  );
};

export default Login;
