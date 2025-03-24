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
        nivel: 30, 
        habilidade: "Soco de trovão",
        vida: 10     
      },
      {
        nome: "Arya Ventis", 
        classe: "Mago", 
        nivel: 30, 
        habilidade: "Soco de trovão",
        vida: 10
      },
      {
        nome: "Arya Ventis", 
        classe: "Mago", 
        nivel: 30, 
        habilidade: "Soco de trovão",
        vida: 10
      },
      { 
        nome: "Arya Ventis", 
        classe: "Mago", 
        nivel: 30, 
        habilidade: "Soco de trovão",
        vida: 10     
      },
      {
        nome: "Arya Ventis", 
        classe: "Mago", 
        nivel: 30, 
        habilidade: "Soco de trovão",
        vida: 10
      },
      {
        nome: "Arya Ventis", 
        classe: "Mago", 
        nivel: 30, 
        habilidade: "Soco de trovão",
        vida: 10
      }
    ]);

    // consultar os documentos com o nivel maior que 10
    const personagensNivel10 = await personagens.find().toArray();
    console.log("Personagens com o nível maior que 10: ", personagensNivel10);

    // consultar os documentos com o nivel maior que 10
    const personagensGuerreiros = await personagens.find().toArray();
    console.log("Personagens da classe Guerreiro: ", personagensGuerreiros);

    // atualizar um documento
    await personagens.updateMany(
      { habilidade: "Treinamento especial" }, // Filtro para encontrar registro
      { $set: { vida: 200 } }
    );

    // excluir um documento
    await personagens.deleteMany({ vida: 30 });

  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
