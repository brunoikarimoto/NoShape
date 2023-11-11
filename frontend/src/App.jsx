import "./App.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { useUserContext } from "./hooks/useUserContext";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Registro from "./pages/Registro/Registro";
import NotFound from "./pages/NotFound/NotFound";
import Navbar from "./components/Navbar";
import Treino from "./pages/Treino/Treino";
import Exercicio from "./pages/Exercicio/Exercicio";
import NovoExercicio from "./pages/NovoExercicio/NovoExercicio";
import EditarUsuario from "./pages/EditarUsuario/EditarUsuario";

function App() {
  const { user } = useUserContext();

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={user.nome ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user.nome ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/registro"
            element={user.nome ? <Navigate to="/" /> : <Registro />}
          />
          <Route
            path="/editarUsuario"
            element={user.nome ? <EditarUsuario /> : <Navigate to="/login" />}
          />
          <Route
            path="/novoTreino"
            element={user.nome ? <Treino /> : <Navigate to="/login" />}
          />
          <Route
            path="/novoTreino/:id"
            element={user.nome ? <Treino /> : <Navigate to="/login" />}
          />
          <Route
            path="/exercicios/:nome/:id"
            element={user.nome ? <Exercicio /> : <Navigate to="/login" />}
          />
          <Route
            path="/:nome/novoExercicio/:id"
            element={user.nome ? <NovoExercicio /> : <Navigate to="/login" />}
          />
          <Route
            path="/:nome/editarExercicio/:exercicioId/:id"
            element={user.nome ? <NovoExercicio /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
