<?php
	
	session_start();

	//montagem do arquivo
	$titulo = str_replace('#', '-', $_POST['titulo']);
	$categoria = str_replace('#', '-', $_POST['categoria']);
	$descricao = str_replace('#', '-', $_POST['descricao']);

	$texto = $_SESSION['id'] . '#' . $titulo . '#' . $categoria . '#' . $descricao . PHP_EOL; //php_eol indica fim de linha, na qual no proximo registro, quebra para a próxima linha

	$arquivo = fopen('../../app_help_desk/arquivo.hd', 'a'); //gravar dados em um arquivo no servidor, abrindo o arquivo

	fwrite($arquivo, $texto); //escrevendo os dados no arquivo

	fclose($arquivo); //fechando o arquivo

	header('Location: abrir_chamado.php');

?>