import Exercicio from "../models/Exercicio.js";
import Treino from "../models/Treino.js";

const novoExericio = async (req, res) => {
  const { id } = req.params;
  const { nome, carga, repeticoes, series, detalhes } = req.body;

  if (nome.length < 1) {
    res.status(422).json({ erros: ["Precisa preencher o nome."] });
    return;
  }

  try {
    const treino = await Treino.findById({ _id: id });

    if (!treino) {
      console.log(error.message);
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    const newExercicio = await Exercicio.create({
      nome,
      carga,
      repeticoes,
      series,
      detalhes,
      treinoId: id,
    });

    res.status(201).json(newExercicio);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const editarExercicio = async (req, res) => {
  const { id } = req.params;
  const { exercicioId, nome, series, carga, repeticoes, detalhes } = req.body;

  try {
    const treino = await Treino.findById({ _id: id });

    if (!treino) {
      console.log(error.message);
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    const exercicio = await Exercicio.findById({ _id: exercicioId });

    if (!exercicio) {
      console.log(error.message);
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    if (nome && nome.length > 0) exercicio.nome = nome;
    exercicio.carga = carga;
    exercicio.repeticoes = repeticoes;
    exercicio.detalhes = detalhes;
    exercicio.series = series;

    await exercicio.save();

    res.status(201).json(exercicio);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const deletarExercicio = async (req, res) => {
  const { id } = req.params;

  try {
    const exercicio = await Exercicio.findById({ _id: id });

    if (!exercicio) {
      console.log(error.message);
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    await Exercicio.deleteOne({ _id: id });

    res.status(201).json(exercicio);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const todosExerciciosTreino = async (req, res) => {
  const { id } = req.params;

  try {
    const treino = await Treino.findById({ _id: id });

    if (!treino) {
      console.log(error.message);
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    const exercicios = await Exercicio.find({ treinoId: id });

    res.status(201).json(exercicios);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const pegaExercicio = async (req, res) => {
  const { id } = req.params;

  try {
    const exercicio = await Exercicio.findById({ _id: id });

    if (!exercicio) {
      console.log(error.message);
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    res.status(201).json(exercicio);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

export {
  novoExericio,
  editarExercicio,
  deletarExercicio,
  todosExerciciosTreino,
  pegaExercicio,
};
