const knex = require('../db');

async function create(req, res) {
  const body = req.body;
  const [id] = await knex('usuario').insert({
    nome: body.nome,
    email: body.email,
    senha_hash: body.senha_hash,
    tipo_usuario: body.tipo_usuario || 'user'
  });
  const u = await knex('usuario').where('id_usuario', id).first();
  res.status(201).json(u);
}

async function getById(req, res) {
  const id = req.params.id;
  const u = await knex('usuario').where('id_usuario', id).first();
  if (!u) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(u);
}

module.exports = { create, getById };
