const API = "http://localhost:3000";

async function carregarDispositivos() {
    const resposta = await fetch(`${API}/dispositivos`);
    const dispositivos = await resposta.json();

    const tabela = document.getElementById("tabela-dispositivos");
    tabela.innerHTML = "";

    dispositivos.forEach(d => {
        tabela.innerHTML += `
            <tr>
                <td>${d.nome_dispositivo}</td>
                <td>${d.ip}</td>
                <td>${d.porta}</td>
                <td>
                    <span style="color:${d.status_atual === 'online' ? 'green' : 'red'}">
                        ${d.status_atual}
                    </span>
                </td>
                <td>
                    <button onclick="testar(${d.id_dispositivo})">Testar Agora</button>
                    <button onclick="abrirHistorico(${d.id_dispositivo})">Histórico</button>
                </td>
            </tr>
        `;
    });
}

carregarDispositivos();

document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const body = {
        nome_dispositivo: document.getElementById("nome_dispositivo").value,
        ip: document.getElementById("ip").value,
        porta: Number(document.getElementById("porta").value),
        localizacao: document.getElementById("localizacao").value,
        id_usuario: Number(document.getElementById("id_usuario").value)
    };

    await fetch(`${API}/dispositivos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    carregarDispositivos();
});

async function testar(id) {
    await fetch(`${API}/dispositivos/${id}/teste`, { method: "POST" });
    alert("Teste executado!");
    carregarDispositivos();
}

async function abrirHistorico(id) {
    const res = await fetch(`${API}/dispositivos/${id}/testes`);
    const testes = await res.json();

    const ul = document.getElementById("lista-historico");
    ul.innerHTML = "";

    testes.forEach(t => {
        ul.innerHTML += `<li>${t.tipo_teste} - ${t.resultado} - ${t.latencia}ms</li>`;
    });

    document.getElementById("modal").style.display = "block";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

async function carregarLogs() {
    const res = await fetch(`${API}/logs`);
    const logs = await res.json();

    const ul = document.getElementById("lista-logs");
    ul.innerHTML = "";

    logs.forEach(l => {
        ul.innerHTML += `<li>${l.acao} - ${l.descricao}</li>`;
    });
}
