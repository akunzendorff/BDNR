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
    await naves.insertMany([
      { 
        nome: "Estrela Cadente",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      },
      {
        nome: "Estrela Cadente",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      },
      {
        nome: "Estrela Cadente",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      },
      {
        nome: "Estrela Cadente",
        tipo: "Exploração",
        capacidadeTripulantes: 1949,
        emMissao: true
      }
    ]);

    // consultar os documentos de naves em missão
    const navesEmMissao = await naves.find().toArray();
    console.log("Naves em missão: ", navesEmMissao);

    // consultar todos os documentos
    const navesCapacidadeMaior15 = await naves.find().toArray();
    console.log("Naves com capacidade maior que 15: ", navesCapacidadeMaior15);

    // atualizar um documento
    await naves.updataOne(
      { tipo: "Carga" }, // Filtro para encontrar registro
      { $set: { tipo: false } }
    );

    // excluir um documento
    await naves.deleteMany({ capacidadeTripulantes: 3 });

    // Selecionando a coleção "tripulantes"
    const tripulantes = database.collection("tripulantes");

    // Inserindo dados do banco
    await tripulantes.insertMany([
      { 
        nome: "Estrela Cadente",
        id_nave: 3
      },
      {
        nome: "Estrela Cadente",
        id_nave: 3
      },
      {
        nome: "Estrela Cadente",
        id_nave: 3
      },
    ]);


  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
