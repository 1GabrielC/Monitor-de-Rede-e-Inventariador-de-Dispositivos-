const knex = require('../db');

async function list(req, res) {
  const logs = await knex('container').orderBy('data_acao', 'desc');
  res.json(logs);
}

async function create(req, res) {
  const body = req.body;
  const [id] = await knex('container').insert({
    acao: body.acao,
    descricao: body.descricao,
    id_usuario: body.id_usuario || null
  });
  const log = await knex('container').where('id_log', id).first();
  res.status(201).json(log);
}

module.exports = { list, create };
