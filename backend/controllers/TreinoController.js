import Treino from "../models/Treino.js";
import Usuario from "../models/Usuario.js";
import Exercicio from "../models/Exercicio.js";

const novoTreino = async (req, res) => {
  const { nome } = req.body;
  const { id } = req.params;

  try {
    const user = await Usuario.findById({ _id: id });

    if (!user) {
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    if (nome.length <= 2) {
      res
        .status(422)
        .json({ erros: ["O nome do treino deve ter no mínimo 3 caracteres."] });
      return;
    }

    const newTreino = await Treino.create({
      nome,
      usuarioId: user._id,
    });

    res.status(201).json(newTreino);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const verTodosTreinos = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Usuario.findById({ _id: id });

    if (!user) {
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    const todosTreinos = await Treino.find({ usuarioId: id });

    res.status(201).json(todosTreinos);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const editarTreino = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (nome.length <= 2) {
    res
      .status(422)
      .json({ erros: ["O nome do treino deve ter no mínimo 3 caracteres."] });
    return;
  }

  try {
    const treino = await Treino.findOne({ _id: id });

    if (!treino) {
      console.log(error.message);
      res.status(422).json({
        erros: ["Algo deu errado, por favor tente novamente mais tarde."],
      });
      return;
    }

    treino.nome = nome;

    await treino.save();

    res.status(201).json(treino);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const deletarTreino = async (req, res) => {
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

    await Exercicio.deleteMany({ treinoId: id });

    await Treino.deleteOne({ _id: id });

    res.status(201).json(treino);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

const treinoPorId = async (req, res) => {
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

    res.status(201).json(treino);
  } catch (error) {
    console.log(error.message);
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }
};

export {
  novoTreino,
  verTodosTreinos,
  editarTreino,
  deletarTreino,
  treinoPorId,
};
