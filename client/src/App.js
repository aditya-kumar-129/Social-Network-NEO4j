import { Route, Routes } from "react-router-dom";
import { Welcome } from "./Welcome";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { UserPage } from "./UserPage";
import { Profile } from "./Profile";
import { IncomingConnections } from "./incomingConnections";
import { GetSuggestions } from "./getSuggestions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user/:username" element={<UserPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/incomingConnections" element={<IncomingConnections />} />
      <Route path="/getSuggestions" element={<GetSuggestions />} />
    </Routes>
  );
}

export default App;
