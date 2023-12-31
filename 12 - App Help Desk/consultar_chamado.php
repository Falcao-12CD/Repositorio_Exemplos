<? require_once "valida_acesso.php" ?>
<?php
  //chamados
  $chamados = [];

  echo $_SESSION['perfil_id'];


  //abrir o arquivo.hd
    $arquivo = fopen('../../app_help_desk/arquivo.hd', 'r');

    //enquanto houver registros(linhas) a serem recuperados
    while(!feof($arquivo)){//feof testa pelo fim de um arquivo, e nega-se para que as linhas preenchidas que antes eram false se tornem true
      $registro = fgets($arquivo);//recupera o que está escrito até a última letra da linha
      $registro_detalhes = explode('#', $registro);

      //perfil de id=2 só vamos exibir o chamado se ele foi criado pelo usuário
      if($_SESSION['perfil_id'] == 2){
        //só vamos exibir ao usuário, seu(s) próprio(s) chamado(s).
        if($_SESSION['id'] != $registro_detalhes[0]){
           continue;//faz nada
        }
      } else{
        $chamados[] = $registro; //adiciona o registro do arquivo ao array $chamados
      }
      
    }
    //fechar o arquivo aberto
    fclose($arquivo);
?>
<html>
  <head>
    <meta charset="utf-8" />
    <title>App Help Desk</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <style>
      .card-consultar-chamado {
        padding: 30px 0 0 0;
        width: 100%;
        margin: 0 auto;
      }
    </style>
  </head>

  <body>

    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <img src="logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        App Help Desk
      </a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="logoff.php" style="text-decoration: none; color: white;">SAIR</a>
        </li>
      </ul>
    </nav>

    <div class="container">    
      <div class="row">

        <div class="card-consultar-chamado">
          <div class="card">
            <div class="card-header">
              Consulta de chamado
            </div>
            
            <div class="card-body">
              
              <? foreach ($chamados as $chamado) { ?>
                <?php 
                  $chamado_dados = explode('#', $chamado);
                   //não existe detalhes do chamado se ele não estiver completo
                  if(count($chamado_dados) < 3){
                    continue;
                  }
                ?>
              <div class="card mb-3 bg-light">
                <div class="card-body">
                  <h5 class="card-title"><?=$chamado_dados[1]?></h5>
                  <h6 class="card-subtitle mb-2 text-muted"><?=$chamado_dados[2]?></h6>
                  <p class="card-text"><?=$chamado_dados[3]?></p>

                </div>
              </div>
             <? }?>

              <div class="row mt-5">
                <div class="col-6">
                  <a class="btn btn-lg btn-warning btn-block" href="home.php">Voltar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>