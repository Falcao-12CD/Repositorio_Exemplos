<?php
	///ou remover índices individualmente do array de sessão -> unset() ou remover os índices que existirem
	//ou destruir a varíavel de sessão -> session_destroy() e forçar um redirecionamento

	session_start();

	session_destroy();

	header('Location: index.php');
?>