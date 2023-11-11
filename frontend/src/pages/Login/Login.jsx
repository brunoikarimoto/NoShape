import "./Login.css";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../../hooks/useUserContext.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErros({});

    const usuario = {
      email: email,
      senha: senha,
    };

    await fetch("http://localhost:5000/api/usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.erros) {
          setErros(data);
        } else {
          setUser(data);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });

    setLoading(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div id="login">
      <h1>Login</h1>
      <p>Bem vindo de volta!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit" className="submit">
          Entrar
        </button>
      </form>

      <p>
        Ainda não tem conta?{" "}
        <Link to="/registro" className="redirect">
          Criar conta
        </Link>
      </p>

      {erros.erros && <p id="erro">{erros.erros}</p>}
    </div>
  );
};

export default Login;
