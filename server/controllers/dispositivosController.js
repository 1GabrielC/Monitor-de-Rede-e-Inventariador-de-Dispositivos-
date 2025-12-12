const knex = require('../db');
const { doPing, checkTcpPort } = require('../utils/networkTest');


async function list(req, res) {
  const devices = await knex('dispositivo').select();
  res.json(devices);
}

async function create(req, res) {
  const body = req.body;
  const [id] = await knex('dispositivo').insert({
    nome_dispositivo: body.nome_dispositivo,
    ip: body.ip,
    porta: body.porta,
    localizacao: body.localizacao,
    status_atual: body.status_atual || null,
    id_usuario: body.id_usuario || null
  });
  
  await knex('container').insert({
    acao: 'criou_dispositivo',
    descricao: `Dispositivo ${body.nome_dispositivo} (ip:${body.ip}) criado.`,
    id_usuario: body.id_usuario || null
  });
  const newDevice = await knex('dispositivo').where('id_dispositivo', id).first();
  res.status(201).json(newDevice);
}

async function getById(req, res) {
  const id = req.params.id;
  const device = await knex('dispositivo').where('id_dispositivo', id).first();
  if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });
  res.json(device);
}

async function update(req, res) {
  const id = req.params.id;
  const changes = req.body;
  await knex('dispositivo').where('id_dispositivo', id).update(changes);
  await knex('container').insert({
    acao: 'atualizou_dispositivo',
    descricao: `Dispositivo id ${id} atualizado.`,
    id_usuario: changes.id_usuario || null
  });
  const device = await knex('dispositivo').where('id_dispositivo', id).first();
  res.json(device);
}

async function remove(req, res) {
  const id = req.params.id;
  await knex('dispositivo').where('id_dispositivo', id).del();
  await knex('container').insert({
    acao: 'removeu_dispositivo',
    descricao: `Dispositivo id ${id} removido.`,
    id_usuario: null
  });
  res.status(204).send();
}


async function runTest(req, res) {
  const id = req.params.id;
  const device = await knex('dispositivo').where('id_dispositivo', id).first();
  if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });

  const host = device.ip;
  const port = device.porta || null;

  
  const pingResult = await doPing(host, 3000);

 
  let portOpen = null;
  if (port) {
    const tcp = await checkTcpPort(host, port, 2000);
    portOpen = tcp.open;
  }

  const resultado = pingResult.success ? 'sucesso' : 'erro';
  const latencia = pingResult.latency;


  await knex('testerede').insert({
    tipo_teste: 'ping',
    resultado,
    latencia,
    porta_aberta: portOpen === null ? null : (portOpen ? 1 : 0),
    id_dispositivo: id
  });


  const status_atual = pingResult.success ? 'online' : 'offline';
  await knex('dispositivo').where('id_dispositivo', id).update({ status_atual });

  
  await knex('container').insert({
    acao: 'teste_rede',
    descricao: `Teste ping em dispositivo id ${id} - resultado: ${resultado} - latencia: ${latencia}`,
    id_usuario: null
  });

  res.json({
    id_dispositivo: id,
    resultado,
    latencia,
    porta_aberta: portOpen
  });
}

async function history(req, res) {
  const id = req.params.id;
  const tests = await knex('testerede').where('id_dispositivo', id).orderBy('data_execucao', 'desc');
  res.json(tests);
}

module.exports = { list, create, getById, update, remove, runTest, history };
