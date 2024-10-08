const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    config
);

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.produtos = require("./produto.model.js") (sequelize, Sequelize);
db.lojas = require("./loja.model.js") (sequelize, Sequelize);
db.usuarios = require("./usuario.model.js") (sequelize, Sequelize);
db.categorias = require("./categoria.model.js") (sequelize, Sequelize);

db.usuarios.hasOne(db.lojas);
db.lojas.belongsTo(db.usuarios);

db.lojas.hasMany(db.produtos);
db.produtos.belongsTo(db.lojas);

db.produtos.belongsToMany(db.categorias, { through: "produtoCategoria" });
db.categorias.belongsToMany(db.produtos, { through: "produtoCategoria" });

module.exports = db;