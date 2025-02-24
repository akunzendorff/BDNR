// Importar o modulo MongoClient
const { MongoClient } = require("mongodb");

// Função principal
async function main() {
  // Definir a URL de conexão com o MongoDB
  const url = "mongodb://localhost:27017";

  //Criar uma instância do cliente mongodb
  const client = new MongoClient(url);

  try {
    // Conect com o servidor MongoDB
    await client.connect();

    // Seleciona o banco de dados "biblioteca"
    const database = cliente.db("biblioteca");

    // Selecionando a coleção "livros"
    const livros = database.collection("livros");

    // Selecionando dados do banco
    await livros.insertMany([
      { titulo: "1984", autor: "George Orwell", ano: 1949, genero: "Distopia" },
      {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        ano: 1899,
        genero: "Romance",
      },
      {
        titulo: "Senhor dos Anéis",
        autor: "J. R. R Tolkel",
        ano: 1954,
        genero: "Fantasia",
      },
    ]);
  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
