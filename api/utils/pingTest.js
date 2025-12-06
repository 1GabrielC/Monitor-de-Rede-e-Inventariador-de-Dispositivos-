const ping = require('ping');
const net = require('net');

async function doPing(host, timeout = 2000) {
  try {
    const res = await ping.promise.probe(host, { timeout: Math.ceil(timeout/1000) });
    if (res.alive) {
      const latency = Math.round(parseFloat(res.time)); 
      return { success: true, latency };
    } else {
      return { success: false, latency: null };
    }
  } catch (err) {
    return { success: false, latency: null };
  }
}

function checkTcpPort(host, port, timeout = 2000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let resolved = false;
    socket.setTimeout(timeout);

    socket.on('connect', () => {
      resolved = true;
      socket.destroy();
      resolve({ open: true });
    });

    socket.on('timeout', () => {
      if (!resolved) {
        resolved = true;
        socket.destroy();
        resolve({ open: false });
      }
    });

    socket.on('error', () => {
      if (!resolved) {
        resolved = true;
        socket.destroy();
        resolve({ open: false });
      }
    });

    socket.connect(port, host);
  });
}

module.exports = { doPing, checkTcpPort };
