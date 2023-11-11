import "./NovoExercicio.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NovoExercicio = () => {
  const { exercicioId, id, nome } = useParams();

  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);

  const [nomeExercicio, setNomeExercicio] = useState("");
  const [carga, setCarga] = useState("");
  const [series, setSeries] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [detalhes, setDetalhes] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErros({});

    const exercicio = {
      exercicioId: exercicioId,
      treinoId: id,
      nome: nomeExercicio,
      carga: carga,
      series: series,
      repeticoes: repeticoes,
      detalhes: detalhes,
    };

    if (!exercicioId) {
      await fetch(`http://localhost:5000/api/exercicio/novoExercicio/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercicio),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.erros) {
            setErros(data);
          } else {
            navigate(`/exercicios/${nome}/${id}`);
          }
        })
        .catch((err) => {
          console.log(err.message);
          return;
        });
    } else {
      await fetch(`http://localhost:5000/api/exercicio/editarExercicio/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercicio),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.erros) {
            setErros(data);
          } else {
            navigate(`/exercicios/${nome}/${id}`);
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

    if (!exercicioId) {
      return;
    }

    fetch(`http://localhost:5000/api/exercicio/pegaExercicio/${exercicioId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.erros) {
          setErros(data);
        } else {
          setNomeExercicio(data.nome);
          if (data.carga) setCarga(data.carga);
          if (data.series) setSeries(data.series);
          if (data.repeticoes) setRepeticoes(data.repeticoes);
          if (data.detalhes) setDetalhes(data.detalhes);
        }
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });
  }, [exercicioId]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="exercicioContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do exercício"
          name="nomeExercicio"
          value={nomeExercicio}
          onChange={(e) => setNomeExercicio(e.target.value)}
        />

        <input
          type="number"
          placeholder="Carga"
          name="carga"
          value={carga}
          onChange={(e) => setCarga(e.target.value)}
        />

        <input
          type="number"
          placeholder="Séries"
          name="series"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
        />

        <input
          type="number"
          placeholder="Repetições"
          name="repeticoes"
          value={repeticoes}
          onChange={(e) => setRepeticoes(e.target.value)}
        />

        <input
          type="text"
          placeholder="Detalhes"
          name="detalhes"
          value={detalhes}
          onChange={(e) => setDetalhes(e.target.value)}
        />

        {exercicioId ? (
          <button type="submit" className="submit">
            Editar
          </button>
        ) : (
          <button type="submit" className="submit">
            Adicionar
          </button>
        )}
      </form>

      {erros.erros && <p id="erro">{erros.erros}</p>}
    </div>
  );
};

export default NovoExercicio;
