<?php
	$id_usuario=$this->session->userdata('id_usuario');
	 
	if(!$id_usuario){
	  redirect('Login');
	}
?>

<div class="flex-row">
	<h2>Agregar Perfil</h2>
	<div class="col-lg-12 veinte_m_t">
        <form id="formAgregarPerfil" name="formAgregarPerfil" method="get" enctype="multipart/form-data">
            <div class="col-lg-6">
                <div class="form-group">
                    <label class="label-form" for="nombre">Nombre perfil</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingresa nombre perfil">
                </div>
                <div class="form-group">
                    <label class="label-form" for="caracteristicas">Caracter&iacute;sticas</label>
                    <textarea class="form-control" rows="3" id="caracteristicas" name="caracteristicas" placeholder="Ingresa una característica"></textarea>
                </div>
            </div>
            <div class="col-lg-12">
                <button id="guardar" type="submit" class="btn btn-primary pull-right">Guardar</button>
            </div>
        </form>
    </div>
</div>
