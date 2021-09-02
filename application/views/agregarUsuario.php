<?php
	$id_usuario=$this->session->userdata('id_usuario');
	
	if(!$id_usuario){
	  redirect('Login');
	}
?>
<div class="row">
	<div class="col-sm-12">
		<div id="titulo" class="mt-3">
			<h3><i class="plusTitulo mb-2" data-feather="<?php echo ($titulo == 'Agregar Usuario' ? 'plus' : 'edit-3'); ?>" ></i><?php echo $titulo; ?>
			</h3>
		</div>
	</div>
	<div class="col-sm-12">
		<div id="filtros" class="mt-3 mr-3 ml-3">
			<form id="agregarUsuario" action="agregarUsuario" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdUsuario" name="inputIdUsuario" value="<?php if(isset($usuarioSeleccionado[0]['id_usuario'])): echo $usuarioSeleccionado[0]['id_usuario']; endif; ?>" hidden>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputRut">Rut</label>
						<input type="text" class="form-control  form-control-sm" id="inputRut" minlength="1" placeholder="Ingrese un Rut al Usuario" name="inputRut" value="<?php if(isset($usuarioSeleccionado[0]['rut'])): echo $usuarioSeleccionado[0]['rut']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputNombres">Nombres</label>
						<input type="text" class="form-control  form-control-sm" id="inputNombres" minlength="1" placeholder="Ingrese los Nombres del Usuario" name="inputNombres" value="<?php if(isset($usuarioSeleccionado[0]['nombres'])): echo $usuarioSeleccionado[0]['nombres']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputApellidos">Apellidos</label>
						<input type="text" class="form-control  form-control-sm" id="inputApellidos" name="inputApellidos" placeholder="Ingrese los Apellidos del Usuario" value="<?php if(isset($usuarioSeleccionado[0]['apellidos'])): echo $usuarioSeleccionado[0]['apellidos']; endif; ?>">
						<!--<span>Se requiere una Abreviaci&oacute;n para el Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputEmail">Email</label>
						<input type="text" class="form-control  form-control-sm" id="inputEmail" minlength="1" placeholder="Ingrese un Email al Usuario" name="inputEmail" value="<?php if(isset($usuarioSeleccionado[0]['email'])): echo $usuarioSeleccionado[0]['email']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputCodUsuario">C&oacute;digo usuario</label>
						<input type="text" class="form-control  form-control-sm" id="inputCodUsuario" minlength="1" placeholder="Ingrese un C&oacute;digo al Usuario" name="inputCodUsuario" value="<?php if(isset($usuarioSeleccionado[0]['cod_usuario'])): echo $usuarioSeleccionado[0]['cod_usuario']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="selectPerfil">Perfil</label>
						<select id="selectPerfil" name="selectPerfil" class="custom-select custom-select-sm">
						 	<?php 
						 		if(isset($perfiles))
						 		{
						 			echo '<option selected>Seleccione un Perfil</option>';
						 			foreach ($perfiles as $perfil) {
						 				$selected = ''; 
						 				if (isset($usuarioSeleccionado[0]['id_perfil']) && $usuarioSeleccionado[0]['id_perfil'] == $perfil['id_perfil']) {
						 					$selected = 'selected';
						 				}
						 				echo '<option value="'.$perfil['id_perfil'].'" '.$selected.'>'.$perfil['pf_nombre'].'</option>';
						 			}
						 		}
						 	?>
						</select>
					</div>
				</div>


				

				<div id="botones" class="row m-3">
					<div class="col-sm-6 text-left">
						<a class="btn btn-link"  href="<?php echo base_url();?>Usuario/ListarUsuarios">Volver</a>
					</div>
					<div  class="col-sm-6 text-right">
					 	<button type="submit" class="btn btn-primary submit"><?php echo $titulo;?></button>
					</div>
				</div>
			</form>		
		</div>
	</div>
</div>

<div id="loader" class="loader" hidden></div>

<!-- Modal Mensaje -->
<div class="modal fade" id="modalMensajeUsuario" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloMP"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<p id="parrafoMP"></p>
      </div>
      <div class="modal-footer">
        <button id="btnCerrarME" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>