import { Route, Routes } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Login } from "./Login";
import { Register } from "./Register";
import { Profile } from "./Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
