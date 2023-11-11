import "./Home.css";

import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../../hooks/useUserContext";

const Home = () => {
  const [treinos, setTreinos] = useState(null);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useUserContext();

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    setLoading(true);
    setErros({});

    await fetch(`http://localhost:5000/api/treino/deletarTreino/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.erros) {
          setErros(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });

    treinoUsuario();

    setLoading(false);
  };

  const treinoUsuario = useCallback(() => {
    fetch(`http://localhost:5000/api/treino/todosTreinos/${user._id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.erros) {
          setErros(data);
        } else {
          setTreinos(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });
  }, [user._id]);

  useEffect(() => {
    setLoading(true);
    setErros({});

    treinoUsuario();

    setLoading(false);
  }, [treinoUsuario]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="treinos">
      <h1>Treinos</h1>
      <ul>
        {treinos &&
          treinos.map((treino) => (
            <li key={treino._id} className="treino">
              <span
                onClick={() =>
                  navigate(`/exercicios/${treino.nome}/${treino._id}`)
                }
                className="nomeTreino"
              >
                - {treino.nome}
              </span>
              <div>
                <button
                  className="deletar"
                  onClick={() => handleDelete(treino._id)}
                >
                  Deletar
                </button>{" "}
                <button
                  className="editar"
                  onClick={() => navigate(`/novoTreino/${treino._id}`)}
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
      </ul>

      <Link to="/novoTreino" className="novoTreino">
        Criar novo treino
      </Link>

      {erros.erros && <p id="erro">{erros.erros}</p>}
    </div>
  );
};

export default Home;
