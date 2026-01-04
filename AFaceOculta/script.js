// script.js - Sistema D6 Simples

// Dados do sistema
const pericias = [
    ["Acrobacia", ["DES"]],
    ["Artes", ["INT"]],
    ["Atletismo", ["FOR"]],
    ["Arrombamento", ["FOR"]],
    ["Autocuidado", ["CON"]],
    ["Bordar", ["DES"]],
    ["Ciências", ["INT"]],
    ["Criar", ["INT"]],
    ["Crime", ["DES"]],
    ["Diplomacia", ["CONSC"]],
    ["Disciplina", ["CONSC"]],
    ["Distrair", ["CONSC"]],
    ["Enfermagem", ["INT", "CONH"]],
    ["Enganação", ["CONSC"]],
    ["Furtividade", ["DES"]],
    ["Fuga", ["DES", "INT"]],
    ["Fortitude", ["CON"]],
    ["Guarda", ["CON"]],
    ["Iniciativa", ["FOR", "DES"]],
    ["Interceptação", ["DES"]],
    ["Intimidação", ["CONSC"]],
    ["Intuição", ["CONSC"]],
    ["Luta", ["FOR"]],
    ["Maquinaria", ["INT", "FOR"]],
    ["Pontaria", ["DES"]],
    ["Pilotagem", ["DES", "INT"]],
    ["Profissão", ["INT"]],
    ["Reflexos", ["DES"]],
    ["Religião", ["CONSC"]],
    ["Sobrevivência", ["INT"]],
    ["Saber", ["CONH"]],
    ["Tática", ["INT"]],
    ["Tecnologia", ["INT"]],
    ["Vontade", ["CONSC"]]
];

// Quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    criarPericias();
    configurarBarras();
    carregarDados();
});

// Criar a lista de perícias
function criarPericias() {
    const lista = document.getElementById("listaPericias");
    
    pericias.forEach(function(pericia) {
        const nome = pericia[0];
        const atributos = pericia[1];
        
        // Criar div da perícia
        const div = document.createElement("div");
        div.className = "pericia";
        
        // Criar topo da perícia
        const top = document.createElement("div");
        top.className = "pericia-top";
        
        // Nome
        const nomeSpan = document.createElement("strong");
        nomeSpan.textContent = nome;
        
        // Seletor de atributo
        const selectAtributo = document.createElement("select");
        atributos.forEach(function(atributo) {
            const option = document.createElement("option");
            option.value = atributo;
            option.textContent = atributo;
            selectAtributo.appendChild(option);
        });
        
        // Seletor de nível
        const selectNivel = document.createElement("select");
        const niveis = ["Não Treinada", "Treinada", "Profissional", "Expert"];
        niveis.forEach(function(nivel) {
            const option = document.createElement("option");
            option.value = nivel;
            option.textContent = nivel;
            selectNivel.appendChild(option);
        });
        
        // Botão de rolar
        const btnRolar = document.createElement("button");
        btnRolar.textContent = "Rolar";
        btnRolar.onclick = function() {
            rolarPericia(nome, selectAtributo.value, selectNivel.value);
        };
        
        // Adicionar tudo
        top.appendChild(nomeSpan);
        top.appendChild(selectAtributo);
        top.appendChild(selectNivel);
        top.appendChild(btnRolar);
        div.appendChild(top);
        lista.appendChild(div);
    });
}

// Rolar uma perícia
function rolarPericia(nomePericia, atributo, nivel) {
    // Pegar valor do atributo
    const valorAtributo = parseInt(document.getElementById(atributo).value) || 0;
    
    // Configurar baseado no nível
    let acertosNecessarios, bonus;
    
    switch(nivel) {
        case "Não Treinada":
            acertosNecessarios = 3;
            bonus = 0;
            break;
        case "Treinada":
            acertosNecessarios = 3;
            bonus = 1;
            break;
        case "Profissional":
            acertosNecessarios = 2;
            bonus = 2;
            break;
        case "Expert":
            acertosNecessarios = 1;
            bonus = 3;
            break;
        default:
            acertosNecessarios = 3;
            bonus = 0;
    }
    
    // Rolar os dados
    const dados = [];
    let acertos = 0;
    
    for (let i = 0; i < valorAtributo; i++) {
        const dado = Math.floor(Math.random() * 6) + 1;
        dados.push(dado);
        if (dado >= 4) {
            acertos++;
        }
    }
    
    // Calcular total com bônus
    // O bônus adiciona acertos, mas não pode passar do número de dados
    const totalComBonus = Math.min(acertos + bonus, valorAtributo);
    
    // Verificar se passou
    const sucesso = totalComBonus >= acertosNecessarios;
    
    // Mostrar resultado
    mostrarResultado(nomePericia, atributo, valorAtributo, nivel, 
                     acertosNecessarios, bonus, dados, acertos, 
                     totalComBonus, sucesso);
    
    // Adicionar ao histórico
    adicionarHistorico(nomePericia, sucesso, acertos, bonus, 
                       totalComBonus, acertosNecessarios);
}

// Mostrar resultado na tela
function mostrarResultado(nome, atributo, valorAtributo, nivel, 
                          acertosNecessarios, bonus, dados, 
                          acertos, totalComBonus, sucesso) {
    
    // Criar mensagem
    let mensagem = `🎲 TESTE DE ${nome.toUpperCase()} 🎲\n\n`;
    mensagem += `Atributo: ${atributo} (${valorAtributo} dados D6)\n`;
    mensagem += `Nível: ${nivel}\n`;
    mensagem += `Acertos necessários: ${acertosNecessarios}\n`;
    mensagem += `Bônus do nível: +${bonus}\n\n`;
    mensagem += `DADOS ROLADOS:\n`;
    
    // Mostrar cada dado
    dados.forEach((dado, i) => {
        const simbolo = dado >= 4 ? "✅" : "❌";
        mensagem += `Dado ${i+1}: ${dado} ${simbolo}\n`;
    });
    
    mensagem += `\nAcertos naturais: ${acertos}\n`;
    mensagem += `+ Bônus: ${bonus}\n`;
    mensagem += `Total de acertos: ${totalComBonus}\n\n`;
    
    if (sucesso) {
        mensagem += `🎉 SUCESSO! (${totalComBonus}/${acertosNecessarios})`;
    } else {
        mensagem += `💀 FALHA! (${totalComBonus}/${acertosNecessarios})`;
    }
    
    alert(mensagem);
}

// Adicionar ao histórico
function adicionarHistorico(nome, sucesso, acertos, bonus, total, necessario) {
    // Criar histórico se não existir
    let historicoDiv = document.getElementById("historicoRolagens");
    
    if (!historicoDiv) {
        historicoDiv = document.createElement("div");
        historicoDiv.id = "historicoRolagens";
        historicoDiv.style.cssText = `
            margin-top: 20px;
            padding: 10px;
            background: #111;
            border-radius: 5px;
            border: 1px solid #333;
        `;
        
        const titulo = document.createElement("h3");
        titulo.textContent = "Histórico de Rolagens";
        
        const extrasDiv = document.querySelector(".box:nth-child(3)");
        extrasDiv.appendChild(titulo);
        extrasDiv.appendChild(historicoDiv);
    }
    
    // Criar item do histórico
    const item = document.createElement("div");
    item.style.cssText = `
        padding: 5px;
        margin: 5px 0;
        border-left: 3px solid ${sucesso ? "#4CAF50" : "#f44336"};
        background: #222;
        font-size: 12px;
    `;
    
    const hora = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    item.innerHTML = `
        <strong>${hora}</strong> - ${nome}<br>
        ${sucesso ? "✅ Sucesso" : "❌ Falha"} 
        (${acertos} + ${bonus} = ${total}/${necessario})
    `;
    
    // Adicionar no topo
    historicoDiv.insertBefore(item, historicoDiv.firstChild);
    
    // Limitar a 5 itens
    if (historicoDiv.children.length > 5) {
        historicoDiv.removeChild(historicoDiv.lastChild);
    }
}

// Configurar barras de status
function configurarBarras() {
    // Adicionar inputs para as barras se não existirem
    const statusDiv = document.querySelector(".box:first-child h3:nth-of-type(2)").parentNode;
    
    // Verificar se já tem inputs
    if (!document.getElementById("vidaAtual")) {
        // Adicionar inputs para Vida
        const vidaLabel = document.querySelector("label[for='vida']");
        if (vidaLabel) {
            const inputsDiv = document.createElement("div");
            inputsDiv.className = "barra-inputs";
            inputsDiv.innerHTML = `
                <input type="number" id="vidaAtual" placeholder="Atual" value="70" min="0" style="width: 48%;">
                <input type="number" id="vidaMax" placeholder="Max" value="100" min="0" style="width: 48%;">
            `;
            vidaLabel.parentNode.insertBefore(inputsDiv, vidaLabel.nextSibling);
        }
        
        // Fazer o mesmo para Sanidade e Fadiga
        // ... (você pode adicionar similar para os outros)
    }
    
    // Atualizar barras quando valores mudarem
    document.querySelectorAll('.barra-inputs input').forEach(input => {
        input.addEventListener('change', atualizarBarras);
    });
    
    // Atualizar agora
    atualizarBarras();
}

// Atualizar visual das barras
function atualizarBarras() {
    const barras = [
        { atualId: "vidaAtual", maxId: "vidaMax", barra: document.querySelector("#vida + .barra span") },
        { atualId: "sanidadeAtual", maxId: "sanidadeMax", barra: document.querySelector("#sanidade + .barra span") },
        { atualId: "fadigaAtual", maxId: "fadigaMax", barra: document.querySelector("#fadiga + .barra span") }
    ];
    
    barras.forEach(function(config) {
        const atualInput = document.getElementById(config.atualId);
        const maxInput = document.getElementById(config.maxId);
        const barraSpan = config.barra;
        
        if (atualInput && maxInput && barraSpan) {
            const atual = parseInt(atualInput.value) || 0;
            const max = parseInt(maxInput.value) || 100;
            const porcentagem = (atual / max) * 100;
            
            barraSpan.style.width = Math.min(100, Math.max(0, porcentagem)) + "%";
            
            // Mudar cor baseado na porcentagem
            if (porcentagem > 60) {
                barraSpan.style.background = "#4CAF50"; // Verde
            } else if (porcentagem > 30) {
                barraSpan.style.background = "#FF9800"; // Laranja
            } else {
                barraSpan.style.background = "#f44336"; // Vermelho
            }
        }
    });
}

// Salvar dados no navegador
function salvarDados() {
    const dados = {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        atributos: {}
    };
    
    // Salvar atributos
    ["FOR", "DES", "INT", "CON", "CONSC", "CONH"].forEach(function(atributo) {
        dados.atributos[atributo] = document.getElementById(atributo).value;
    });
    
    // Salvar status
    dados.vida = document.getElementById("vidaAtual")?.value || "70";
    dados.sanidade = document.getElementById("sanidadeAtual")?.value || "60";
    dados.fadiga = document.getElementById("fadigaAtual")?.value || "40";
    
    localStorage.setItem("fichaRPG", JSON.stringify(dados));
}

// Carregar dados salvos
function carregarDados() {
    const dadosSalvos = localStorage.getItem("fichaRPG");
    
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        
        // Carregar personagem
        document.getElementById("nome").value = dados.nome || "Michael";
        document.getElementById("idade").value = dados.idade || "19";
        
        // Carregar atributos
        if (dados.atributos) {
            for (const atributo in dados.atributos) {
                const input = document.getElementById(atributo);
                if (input) {
                    input.value = dados.atributos[atributo];
                }
            }
        }
        
        // Carregar status
        if (dados.vida) {
            const vidaAtual = document.getElementById("vidaAtual");
            if (vidaAtual) vidaAtual.value = dados.vida;
        }
    }
    
    // Salvar quando algo mudar
    document.querySelectorAll("input, select").forEach(function(elemento) {
        elemento.addEventListener("change", salvarDados);
    });
}

// Funções extras simples
document.querySelectorAll(".box:nth-child(3) button").forEach(function(botao, index) {
    botao.onclick = function() {
        const opcoes = ["Habilidades", "Conjurações", "Inventário"];
        alert(`Sistema de ${opcoes[index]} - Em desenvolvimento`);
    };
});
