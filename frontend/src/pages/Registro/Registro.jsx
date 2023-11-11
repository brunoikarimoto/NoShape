import "./Registro.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../hooks/useUserContext";

const Registro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErros({});

    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
      confirmSenha: confirmSenha,
    };

    await fetch("http://localhost:5000/api/usuario/registrar", {
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
    return <p>Carregando...</p>;
  }

  return (
    <div id="registro">
      <h1>Registro</h1>
      <p>Seja bem vindo a NoShape!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirme sua senha"
          name="confirmSenha"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
        />

        <button type="submit" className="submit">
          Registrar
        </button>
      </form>

      {erros.erros && <p id="erro">{erros.erros}</p>}
    </div>
  );
};

export default Registro;
