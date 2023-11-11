import Usuario from "../models/Usuario.js";

const register = async (req, res) => {
  const { nome, email, senha, confirmSenha } = req.body;

  if (senha !== confirmSenha) {
    res.status(422).json({ erros: ["As senhas não são iguais"] });
    return;
  }

  if (nome.length <= 2) {
    res
      .status(422)
      .json({ erros: ["O nome precisa ter no mínimo 3 caracteres."] });
    return;
  }

  if (senha.length <= 2) {
    res
      .status(422)
      .json({ erros: ["A senha precisa ter no mínimo 3 dígitos."] });
    return;
  }

  const user = await Usuario.findOne({ email });

  if (user) {
    res.status(422).json({ erros: ["E-mail já registrado"] });
    return;
  }

  const newUser = await Usuario.create({
    nome,
    email,
    senha,
  });

  if (!newUser) {
    res.status(422).json({
      erros: ["Algo deu errado, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    nome: newUser.nome,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await Usuario.findOne({ email });

  if (!user) {
    res.status(422).json({ erros: ["E-mail não encontrado."] });
    return;
  }

  if (user.senha !== senha) {
    res.status(422).json({ erros: ["Senha incorreta."] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    nome: user.nome,
    email: user.email,
  });
};

const update = async (req, res) => {
  const { nome, email, senha, confirmSenha } = req.body;

  if (senha && senha !== confirmSenha) {
    res.status(422).json({ erros: ["As senhas não são iguais"] });
    return;
  }

  const user = await Usuario.findOne({ email });

  if (!user) {
    res.status(422).json({
      erros: ["Algo deu errado, por favor tenta novamente mais tarde."],
    });
    return;
  }

  if (nome.length <= 2) {
    res
      .status(422)
      .json({ erros: ["O nome precisa ter no mínimo 3 caracteres."] });
    return;
  }

  if (senha && senha.length <= 2) {
    res
      .status(422)
      .json({ erros: ["A senha precisa ter no mínimo 3 dígitos."] });
    return;
  }

  user.nome = nome;
  if (senha) user.senha = senha;

  await user.save();

  res.status(201).json({
    _id: user._id,
    nome: user.nome,
    email: user.email,
  });
};

export { register, login, update };
