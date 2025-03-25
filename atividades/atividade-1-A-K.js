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
        nome: "Bella", 
        especie: "Girafa", 
        idade: 8, 
        dieta: "Herbívoro",
        habitat: "Savana", 
        vacinado: true,
        cuidador: "João"
      },
      {
        nome: "Leo", 
        especie: "Leão", 
        idade: 12, 
        dieta: "Carnívoro",
        habitat: "Savana", 
        vacinado: true,
        cuidador: "Ana"
      },
      {
        nome: "Dune", 
        especie: "Camelo", 
        idade: 6, 
        dieta: "Herbívoro",
        habitat: "Deserto", 
        vacinado: true,
        cuidador: "Pedro"
      },
      {
        nome: "Rocky", 
        especie: "Robalo", 
        idade: 3, 
        dieta: "Carnívoro",
        habitat: "Águas costeiras", 
        vacinado: false,
        cuidador: "Carlos"
      }
    ]);

    // consultar todos os documentos de animais herbivoros
    const todosAnimaisHerbivoros = await animais.find({ dieta: "Herbívoro" }).toArray();
    console.log("Animais herbívoros: ", todosAnimaisHerbivoros);

    // consultar todos os documentos de animais que vivem no deserto
    const animaisDeserto = await animais.find({habitat: "Deserto"}).toArray();
    console.log("Animais que vivem no deserto: ", animaisDeserto);

    // atualizar um documento
    await animais.updateMany(
      { especie: {$regex: "felino", $options: "i" } }, // Filtro para encontrar registro
      { $set: { vacinado: true } }
    );

    // excluir um documento
    await animais.deleteMany({ idade: { $gt: 15 } });

  } finally {
    await client.close();
  }
}

// Chama a função principal e captura o erro, caso haja
main().catch(console.error);
