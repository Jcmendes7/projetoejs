const { Usuario } = require("../models");
const bcrypt = require("bcrypt");

const UserController = {
  viewsForm: (req, res) => {
    return res.render("cadastrar");
  },

  registerUser: async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
      const senhaHash = await bcrypt.hash(senha, 10);
      const user = await Usuario.create({
        nome,
        email,
        senha: senhaHash,
      });
      console.log("usuer criado ", user);
      res.redirect("/users/login");
    } catch (error) {
      console.log("usuer criado", error);
    }
  },

  getLoginForm: (req, res) => {
    return res.render("login");
  },

  userLogin: async (req, res) => {
    const { email, senha } = req.body;

    try {
      // Busca o usuário pelo email
      const userEmail = await Usuario.findOne({
        where: {
          email: email,
        },
      });

      if (!userEmail) {
        return res.status(400).send("Usuário não encontrado");
      }

      // Compara a senha informada com a senha criptografada no banco
      const compareSenha = await bcrypt.compare(senha, userEmail.senha);
      if (!compareSenha) {
        return res.status(400).send("Senha inválida");
      }

      // Se o login for bem-sucedido, cria a sessão
      req.session.userId = userEmail.id_user; // Guardamos o ID do usuário na sessão
      req.session.userEmail = userEmail.email; // Guardamos o email do usuário na sessão
      req.session.userName = userEmail.nome;

      // Redireciona para a página de usuários
      return res.redirect("/users/usuario"); // Redireciona após login bem-sucedido
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao realizar login");
    }
  },

  getUsers: (req, res) => {
    if (req.session.userId) {
      // Se o usuário estiver autenticado, renderiza a página EJS com o nome
      res.render("usuario", {
        nome: req.session.userName, // Passando o nome para o EJS
        email: req.session.userEmail, // Se quiser passar o email também
      });
    } else {
      // Se não estiver logado, redireciona para a página de login
      res.redirect("/users/login");
    }
  },
};

module.exports = UserController;
