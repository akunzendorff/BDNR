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

    // Seleciona o banco de dados "zoo_db"
    const database = client.db("zoo_db");

    // Selecionando a coleção "animais"
    const animais = database.collection("animais");

    // Inserindo dados do banco
    await animais.insertMany([
      {
        nome: "Thor", 
        especie: "Tigre-de-bengala", 
        idade: 10, 
        dieta: "Carnívoro",
        habitat: "Floresta Tropical", 
        vacinado: true,
        cuidador: "Sara"
      },
      {
        nome: "Thor", 
        especie: "Tigre-de-bengala", 
        idade: 10, 
        dieta: "Carnívoro",
        habitat: "Floresta Tropical", 
        vacinado: true,
        cuidador: "Sara"
      },
      {
        nome: "Thor", 
        especie: "Tigre-de-bengala", 
        idade: 10, 
        dieta: "Carnívoro",
        habitat: "Floresta Tropical", 
        vacinado: true,
        cuidador: "Sara"
      },
      {
        nome: "Thor", 
        especie: "Tigre-de-bengala", 
        idade: 10, 
        dieta: "Carnívoro",
        habitat: "Floresta Tropical", 
        vacinado: true,
        cuidador: "Sara"
      },
      {
        nome: "Thor", 
        especie: "Tigre-de-bengala", 
        idade: 10, 
        dieta: "Carnívoro",
        habitat: "Floresta Tropical", 
        vacinado: true,
        cuidador: "Sara"
      }
    ]);

    // consultar todos os documentos
    const todosAnimais = await animais.find().toArray();
    console.log("Animais: ", todosAnimais);

    // consultar todos os documentos
    const animaisDeserto = await animais.find().toArray();
    console.log("Animais que vivem no deserto: ", animaisDeserto);

    // atualizar um documento
    await animais.updataOne(
      { especie: "leão" }, // Filtro para encontrar registro
      { $set: { vacinado: true } }
    );

    // excluir um documento
    await animais.deleteOne({ idade: 15 });
  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
