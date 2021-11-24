<?php
	$id_usuario=$this->session->userdata('id_usuario');
	 
	if(!$id_usuario){
	  redirect('Login');
	}
?>

<div class="col-sm-12 mt-5">
	<h4>
		<i class="plusTitulo mb-2" stop-color data-feather="user-check" class="pb-1"></i>
		Bienvenido <?php echo $nombres.' '.$apellidos.' usted es un '.$perfil['perfil']; ?>
	</h4>
</div>
