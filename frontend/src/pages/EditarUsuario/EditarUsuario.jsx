import "./EditarUsuario.css";

import { useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { useNavigate } from "react-router-dom";

const EditarUsuario = () => {
  const { user, setUser } = useUserContext();

  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

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

    await fetch("http://localhost:5000/api/usuario/atualizar", {
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
    <div id="editar">
      <h1>Editar Usuário</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />

        <input
          type="text"
          placeholder="Nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
          Atualizar
        </button>
      </form>

      {erros.erros && <p id="erro">{erros.erros}</p>}
    </div>
  );
};

export default EditarUsuario;
