// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js";

dotenv.config();
const serverPort = process.env.PORT || 3000;
// E então acesse os dados assim:
const { bruxos, casas, varinhas, animais, pocoes } = dados;

// Criar a aplicacao/server com express e falar que aceita o JSON
const app = express();
app.use(express.json());

// Criar a const da porta

// Rota raiz/principal para ver se esta tudo OK com o server
app.get("/", (req, res) => {
  res.send("Servidor funcionando...");
});

// Get com filtros
app.get("/bruxos", (req, res) => {
  const { casa, ano, especialidade, nome } = req.query;
  let resultado = bruxos;

  if (casa) {
    resultado = resultado.filter(
      (b) => b.casa.toLowerCase() === casa.toLowerCase()
    );
  }

  if (ano) {
    resultado = resultado.filter((b) => b.ano == ano);
  }

  if (especialidade) {
    resultado = resultado.filter((b) =>
      b.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    );
  }

  if (nome) {
    resultado = resultado.filter((b) =>
      b.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});

// Post
app.post("/bruxos", (req, res) => {
  // Acessando dados do body
  const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } =
    req.body;

  console.log("Dados recebidos:", req.body);

  // Validação básica
  if (nome === false || !casa) {
    return res.status(400).json({
      success: false,
      message: "Nome e casa são obrigatórios para um bruxo!",
    });
  }

  // Criar novo bruxo
  const novoBruxo = {
    id: bruxos.length + 1,
    nome,
    casa: casa,
    ano: parseInt(ano),
    varinha: varinha,
    mascote: mascote,
    patrono: patrono,
    especialidade: especialidade || "Em desenvolvimento",
    vivo: vivo,
  };

  // Adicionar à lista de bruxos
  bruxos.push(novoBruxo);

  res.status(201).json({
    success: true,
    message: "Novo bruxo adicionado a Hogwarts!",
    data: novoBruxo,
  });
});

app.get("/varinhas", (req, res) => {
  const { material, nucleo, comprimento } = req.query;
  let resultado = varinhas;

  if (material) {
    resultado = resultado.filter(
      (v) => v.material.toLowerCase() === material.toLowerCase()
    );
  }
  if (nucleo) {
    resultado = resultado.filter(
      (v) => v.nucleo.toLowerCase() === nucleo.toLowerCase()
    );
  }
  if (comprimento) {
    resultado = resultado.filter((v) => v.comprimento === comprimento);
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});

app.post("/varinhas", (req, res) => {
  const { material, nucleo, comprimento } = req.body;

  if (!material || !nucleo || !comprimento) {
    return res.status(400).json({
      success: false,
      message:
        "Material, núcleo e comprimento são obrigatórios para uma varinha!",
    });
  }

  const novaVarinha = {
    id: varinhas.length + 1,
    material: material || "AINDA NAO DEFINIDO",
    nucleo: nucleo || "AINDA NAO DEFINIDO",
    comprimento: comprimento || "AINDA NAO DEFINIDO",
  };

  varinhas.push(novaVarinha);

  res.status(201).json({
    success: true,
    message: "Nova varinha adicionada ao estoque de varinhas!",
    data: novaVarinha,
  });
});

app.get("/pocoes", (req, res) => {
  const { nome, efeito, duracao } = req.query;
  let resultado = pocoes;

  if (nome) {
    resultado = resultado.filter((p) =>
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  if (efeito) {
    resultado = resultado.filter((p) =>
      p.efeito.toLowerCase().includes(efeito.toLowerCase())
    );
  }
  if (duracao) {
    resultado = resultado.filter((p) =>
      p.duracao.toLowerCase().includes(duracao.toLowerCase())
    );
  }
  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});

app.get("/animais", (req, res) => {
  const { nome, tipo } = req.query;
  let resultado = animais;

  if (nome) {
    resultado = resultado.filter((a) =>
      a.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
  if (tipo) {
    resultado = resultado.filter((a) =>
      a.tipo.toLowerCase().includes(tipo.toLowerCase())
    );
  }
  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});

// Iniciar o servidor
app.listen(serverPort, () => {
  console.log("Servidor esta rodando...");
});
