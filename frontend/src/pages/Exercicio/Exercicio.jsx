import "./Exercicio.css";
//pegar o exercicio pelo id

import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Exercicio = () => {
  const { nome, id } = useParams();

  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const [exercicios, setExercicios] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    setLoading(true);
    setErros({});

    await fetch(`http://localhost:5000/api/exercicio/deletarExercicio/${id}`, {
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

    pegaExercicios();

    setLoading(false);
  };

  const pegaExercicios = useCallback(() => {
    fetch(`http://localhost:5000/api/exercicio/exerciciosTreino/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.erros) {
          setErros(data);
        } else {
          setExercicios(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    setErros({});

    pegaExercicios();

    setLoading(false);
  }, [pegaExercicios]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="exercicios">
      <h1>Treino - {nome}</h1>

      <h3>Exercícios:</h3>

      <ul className="listaExercicios">
        {exercicios &&
          exercicios.map((exercicio) => (
            <li key={exercicio._id}>
              <span>Nome: {exercicio.nome}</span>
              <span>Carga: {exercicio.carga}</span>
              <span>Séries: {exercicio.series}</span>
              <span>Repetições: {exercicio.repeticoes}</span>
              {exercicio.detalhes && (
                <span>Detalhes: {exercicio.detalhes}</span>
              )}

              <div>
                <button
                  className="deletar"
                  onClick={() => handleDelete(exercicio._id)}
                >
                  Deletar
                </button>{" "}
                <button
                  className="editar"
                  onClick={() =>
                    navigate(`/${nome}/editarExercicio/${exercicio._id}/${id}`)
                  }
                >
                  Editar
                </button>
              </div>
            </li>
          ))}
      </ul>

      <Link to={`/${nome}/novoExercicio/${id}`} className="novoTreino">
        Adicionar exercício
      </Link>

      {erros.erros && <p id="erro">{erros.erros}</p>}
    </div>
  );
};

export default Exercicio;
