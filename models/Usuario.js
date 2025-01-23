module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      // Definição das colunas
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      // Opções adicionais
      tableName: "usuario", // Nome da tabela no banco de dados
      timestamps: false, // Se a tabela não tiver campos `createdAt` e `updatedAt`
    }
  );

  return Usuario;
};
