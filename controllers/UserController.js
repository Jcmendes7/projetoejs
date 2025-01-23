const { where } = require("sequelize");
const { Usuario } = require("../models");

const UserController = {
  viewsForm: (req, res) => {
    return res.render("cadastrar");
  },

  registerUser: async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
      const user = await Usuario.create({
        nome,
        email,
        senha,
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
      const userEmail = await Usuario.findOne({
        where: {
          email: email,
        },
      });
      if (!userEmail) {
        return res.status(400).send("Senha invalida");
      }

      if (senha != userEmail.senha) {
        return res.status(400).send("senha invalda");
      }

      return res.send("LOGIN ACEITO");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao realizar login");
    }
  },
};

module.exports = UserController;
