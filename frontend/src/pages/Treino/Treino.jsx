import "./Treino.css";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useUserContext } from "../../hooks/useUserContext";

const Treino = () => {
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useUserContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErros({});

    const treino = {
      nome: nome,
    };

    if (!id) {
      await fetch(`http://localhost:5000/api/treino/novoTreino/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(treino),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.erros) {
            setErros(data);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.message);
          return;
        });
    } else {
      await fetch(`http://localhost:5000/api/treino/editarTreino/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(treino),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.erros) {
            setErros(data);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.message);
          return;
        });
    }

    setLoading(false);
  };

  useEffect(() => {
    setErros({});
    if (!id) {
      return;
    }

    fetch(`http://localhost:5000/api/treino/treino/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.erros) {
          setErros(data);
        } else {
          setNome(data.nome);
        }
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="treinoContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do treino"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {id ? (
          <button type="submit" className="submit">
            Editar
          </button>
        ) : (
          <button type="submit" className="submit">
            Criar
          </button>
        )}
      </form>

      {erros.erros && <p id="erro">{erros.erros}</p>}
    </div>
  );
};

export default Treino;
