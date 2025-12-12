const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const usuariosRouter = require('./routes/usuarios');
const dispositivosRouter = require('./routes/dispositivos');
const logsRouter = require('./routes/logs');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/usuarios', usuariosRouter);
app.use('/dispositivos', dispositivosRouter);
app.use('/logs', logsRouter);

app.get('/', (req, res) => res.json({ ok: true, project: 'Monitor de Rede' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
