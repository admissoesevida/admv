"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];
const config_pass_path = __dirname + "/../../config/pwd.json";
const db = {};
let env_pass = '';

if (fs.existsSync(config_pass_path)) {
  env_pass = require(config_pass_path)[env];
}

const db_pass = process.env.DB_PWD || env_pass;

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    db_pass,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Descomente uma das duas linhas para sincronizar as alterações com o banco de dados.
//sequelize.sync({alter: true}); //Se quiser somente alterar as estruturas das tabelas sem remover os dados
//sequelize.sync({force: true}); //Se quiser deletar as tabelas e cria-las novamente

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
