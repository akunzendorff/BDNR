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

    // Seleciona o banco de dados "space_db"
    const database = client.db("space_db");

    // Selecionando a coleção "naves"
    const naves = database.collection("naves");

    // Inserindo dados do banco
    const naveInserida = await naves.insertMany([
      { 
        nome: "Aurora Galáctica",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      },
      {
        nome: "Vega Vortex",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      },
      {
        nome: "Nebulosa Alpha",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      },
      {
        nome: "Cometa Estelar",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      }
    ]);
    

    const idsNaves = naveInserida.insertedIds;

    // consultar os documentos de naves em missão
    const navesEmMissao = await naves.find({emMissao: true}).toArray();
    console.log("Naves em missão: ", navesEmMissao);

    // consultar todos os documentos
    const navesCapacidadeMaior15 = await naves.find({capacidadeTripulantes: {$gt: 5} }).toArray();
    console.log("Naves com capacidade maior que 15: ", navesCapacidadeMaior15);

    // atualizar um documento
    await naves.updateMany(
      { tipo: "Carga" }, // Filtro para encontrar registro
      { $set: { emMissao: false } }
    );

    // excluir um documento
    await naves.deleteMany({ capacidadeTripulantes: {$lt: 3} });

    // Selecionando a coleção "tripulantes"
    const tripulantes = database.collection("tripulantes");

    // Inserindo dados do banco
    await tripulantes.insertMany([
      { 
        nome: "Lucas Andrade",
        id_nave: idsNaves["1"]
      },
      {
        nome: "Sofia Martins",
        id_nave: idsNaves["2"]
      },
      {
        nome: "Gustavo Pereira",
        id_nave: idsNaves["3"]
      },
    ]);    

  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
