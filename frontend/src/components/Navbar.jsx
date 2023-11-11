import "./Navbar.css";

import { useUserContext } from "../hooks/useUserContext";

import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useUserContext();

  const handleClick = () => {
    setUser({});
  };

  return (
    <nav>
      <li>
        <Link to="/">
          <strong>NoShape</strong>
        </Link>
      </li>
      {user.nome ? (
        <div>
          <li>
            <NavLink to="/editarUsuario">Usuário: {user.nome}</NavLink>
          </li>
          <li>
            <NavLink to="/">Treinos</NavLink>
          </li>
          <li>
            <span onClick={handleClick} className="sair">
              Sair
            </span>
          </li>
        </div>
      ) : (
        <div>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/registro">Registrar</NavLink>
          </li>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
