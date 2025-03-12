<?php
require_once 'vendor/autoload.php';

use Kreait\Firebase\Factory;

class FirebaseCRUD{
    private $database;

    public function _construct(){
        $firebase = (new Factory)
        ->withServiceAccount(__DIR__.'/chave-biblioteca.json')
        ->withDataBaseUri('https://biblioteca-dsm3-af66e-default-rtdb.firebaseio.com')
        ->createDatabase();

        // Inicializar a conexão com o RealTime Database
        $this->database = $firebase;
    }

    //  Inserir dados (Create)
    public function create($livro){
        $ref = $this -> database -> getReference('livros');
        $ref -> push($livro);
    }

    // Consultar todos os documentos (Read)
    public function read(){
        $ref = $this->database->getReference('livros');
        $liros = $ref->getValue();
    }

    // Atualizar um documento (Update)
    public function update($id, $livros){
        $ref = $this->database->getReference('livros');
        $ref->set($livro);
    }

    // Excluir um documento (Delete)
    public function delete($id){
        $ref = $this->database->getReference('livros/'.$id);
        $ref->remove();
    }
}

// Testando funções CRUD

// Inserir um livro
$FirebaseCRUD->create([
    'titulo' => '1984',
    'autor' => 'George Orwell',
    'ano' => 1949,
    'genero' => 'Distopia',
]);

?>