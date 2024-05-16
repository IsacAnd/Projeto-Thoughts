const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('thoughts2', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
})

try {   
    sequelize.authenticate();
    console.log("Conexão com o banco estabelecida com sucesso!");
} catch (error) {
    console.log(error);
}

module.exports = sequelize;
