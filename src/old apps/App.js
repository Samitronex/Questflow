import React, { useState } from "react";
import Registro from "./components/Registro";
import SeleccionRol from "./components/SeleccionRol";
import ListaTareas from "./components/ListaTareas";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");

  if (!isLoggedIn) return <Registro onRegister={(name) => { setUsername(name); setIsLoggedIn(true); }} />;
  if (!selectedRole) return <SeleccionRol onSelect={(role) => setSelectedRole(role)} />;
  return <ListaTareas username={username} role={selectedRole} />;
};

export default App;
