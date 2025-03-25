// Importar o modulo MongoClient
const { MongoClient } = require("mongodb");

// Função principal
async function main() {

  // Definir a URL de conexão com o MongoDB
  const uri = "mongodb://127.0.0.1:27017";

  //Criar uma instância do cliente mongodb
  const client = new MongoClient(uri);

  try {
    // Conect com o servidor MongoDB
    await client.connect();

    // Seleciona o banco de dados "rpg_db"
    const database = client.db("rpg_db");

    // Selecionando a coleção "personagens"
    const personagens = database.collection("personagens");

    // Inserindo dados do banco
    await personagens.insertMany([
      { 
        nome: "Arya Ventis", 
        classe: "Mago", 
        nivel: 12, 
        habilidades: ["Soco de trovão", "Invisibilidade"],
        vida: 45     
      },
      {
        nome: "Borin Pedraqueixo", 
        classe: "Guerreiro", 
        nivel: 18, 
        habilidades: ["Golpe de espada", "Escudo de ferro"],
        vida: 120
      },
      {
        nome: "Lira Vento", 
        classe: "Arqueiro", 
        nivel: 9, 
        habilidades: ["Disparo certeiro", "Flecha flamejante"],
        vida: 60
      },
      { 
        nome: "Karn Morv", 
        classe: "Guerreiro", 
        nivel: 16, 
        habilidades: ["Corte devastador", "Grito de batalha"],
        vida: 150     
      },
      {
        nome: "Elena Storm", 
        classe: "Mago", 
        nivel: 20, 
        habilidades: ["Tempestade elétrica", "Escudo mágico"],
        vida: 90
      },
      {
        nome: "Derek Light", 
        classe: "Guerreiro", 
        nivel: 14, 
        habilidades: ["Corte de luz", "Desarme"],
        vida: 85
      }
    ]);

    // consultar os documentos com o nivel maior que 10
    const personagensNivel10 = await personagens.find({nivel: {$gt: 10}}).toArray();
    console.log("Personagens com o nível maior que 10: ", personagensNivel10);

    // consultar os documentos com personagens guerreiros
    const personagensGuerreiros = await personagens.find({classe: "guerreiro"}).toArray();
    console.log("Personagens da classe Guerreiro: ", personagensGuerreiros);

    // atualizar um documento
    await personagens.updateMany(
      { classe: "Guerreiro" }, // Filtro para encontrar registro
      { $set: { vida: 200 } }
    );

    // excluir um documento
    await personagens.deleteMany({ vida: {$lt: 30} });

  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
