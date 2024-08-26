const db = require("../models");
const Produto = db.produtos;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    
    //validações
    if (!req.body.nome){
        res.status(400).send({
            message: "Conteúdo não pode estar vazio"
        });
        return;
    }


//objeto com dados p/ salvar no banco
const produto = {
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    foto: req.body.foto,
    lojaId: req.body.lojaId
}


Produto.create(produto)
.then((data) => {
    res.send(data);
})

.catch((err) => {
    res.status(500).send({
        message: err.message || "Erro durante a criação de Produto.",
    });
});

};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;


Produto.findAll({ where: condition })
.then((data) => {
    res.send(data);
})
.catch((err) => {
    res.status(500).send({
        message: err.message || "Erro durante a procura por Produto.",
    });
});

};
