<?php
	$id_usuario=$this->session->userdata('id_usuario');
	 
	if(!$id_usuario){
	  redirect('Login');
	}
?>

<div class="col-sm-12 m-5">
	<div class="row">
		<h4><i class="plusTitulo mb-2" stop-color data-feather="user-check" class="pb-1"></i> Bienvenido <?php echo $nombres.' '.$apellidos.' usted es un '.$perfil['perfil']; ?></h4>
	</div>
</div>
<!--<div class="col-sm-12 m-5">
	<div class="row mb-3">
		<h3><i class="plusTituloError" stop-color data-feather="video" class="pb-1"></i> Videos tutoriales para uso del Sistema:</h3>
	</div>
	<div class="row pr-5">
		<div class="col-md-12 col-lg-6 col-xl-4 mb-4">
			<div class="card border-primary">
				<div class="card-header border-primary">
					Ingreso al Sistema SIGCOM
				</div>
				<div class="card-body">
					<div class="embed-responsive embed-responsive-16by9" >
						<iframe class="embed-responsive-item" src="<?php echo base_url();?>assets/files/videos/ingreso_sigcom.mp4?rel=0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 col-lg-6 col-xl-4 mb-4">
			<div class="card border-success">
				<div class="card-header border-success">
					Concepto de Importacion - SIGCOM
				</div>
				<div class="card-body">
					<div class="embed-responsive embed-responsive-16by9" >
						<iframe class="embed-responsive-item" src="<?php echo base_url();?>assets/files/videos/importe_sigcom.mp4?rel=0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 col-lg-6 col-xl-4 mb-4">
			<div class="card border-warning">
				<div class="card-header border-warning">
					Descarga de Formatos - SIGCOM
				</div>
				<div class="card-body">
					<div class="embed-responsive embed-responsive-16by9" >
						<iframe class="embed-responsive-item" src="<?php echo base_url();?>assets/files/videos/descarga_formatos_sigcom.mp4?rel=0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 col-lg-6 col-xl-4 mb-4">
			<div class="card border-info">
				<div class="card-header border-info">
					Proceso de Carga - SIGCOM
				</div>
				<div class="card-body">
					<div class="embed-responsive embed-responsive-16by9" >
						<iframe class="embed-responsive-item" src="<?php echo base_url();?>assets/files/videos/proceso_carga_sigcom.mp4?rel=0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 col-lg-6 col-xl-4 mb-4">
			<div class="card border-secondary">
				<div class="card-header border-secondary">
					Visualizaci&oacute;n Cubo 9 - SIGCOM
				</div>
				<div class="card-body">
					<div class="embed-responsive embed-responsive-16by9" >
						<iframe class="embed-responsive-item" src="<?php echo base_url();?>assets/files/videos/visualizacion_cubo9_sigcom.mp4?rel=0" allowfullscreen></iframe>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 col-lg-6 col-xl-4 mb-4">
			<div class="card border-danger">
				<div class="card-header border-danger">
					Manual Formato PDF - SIGCOM
				</div>
				<div class="card-body">
					<div class="embed-responsive embed-responsive-16by9" >
						<embed src="<?php echo base_url();?>assets/files/videos/Manual Operativo SIGCOM v1.pdf" type="application/pdf"></embed>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>-->
