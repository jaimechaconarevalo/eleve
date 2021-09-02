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
			<form id="agregarUsuario" action="agregarUsuario" method="POST">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdUsuario" name="inputIdUsuario" value="<?php if(isset($usuario['id_usuario'])): echo $usuario['id_usuario']; endif; ?>" hidden>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputCodigo">C&oacute;digo</label>
						<input type="text" class="form-control  form-control-sm" id="inputCodigo" minlength="1" placeholder="Ingrese un c&oacute;digo " name="inputCodigo" value="<?php if(isset($usuario['cod_usuario'])): echo $usuario['cod_usuario']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputRut">Rut</label>
						<input type="text" class="form-control  form-control-sm" id="inputRut" name="inputRut" placeholder="Ingrese un rut " value="<?php if(isset($usuario['puntuacion'])): echo $usuario['puntuacion']; endif; ?>">
						<!--<span>Se requiere una Abreviaci&oacute;n para el Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputNombres">Nombres</label>
						<input type="text" class="form-control  form-control-sm" id="inputNombres" minlength="1" placeholder="Ingrese nombres " name="inputNombres" value="<?php if(isset($usuario['nombre'])): echo $usuario['nombre']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputApellidos">Apellidos</label>
						<input type="text" class="form-control  form-control-sm" id="inputApellidos" name="inputApellidos" placeholder="Ingrese apellidos " value="<?php if(isset($usuario['apellidos'])): echo $usuario['apellidos']; endif; ?>">
						<!--<span>Se requiere una Abreviaci&oacute;n para el Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputEmail">Email</label>
						<input type="email" class="form-control  form-control-sm" id="inputEmail" minlength="1" placeholder="Ingrese un email " name="inputEmail" value="<?php if(isset($usuario['nombre'])): echo $usuario['nombre']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputPuntuacion">Empresa</label>
					<!--<div class="form-group col-sm-6">-->
						<select id="empresas" class="custom-select custom-select-sm">
							<option value="-1">Seleccione una Empresa</option>
							<?php
							if($empresas)
							{
								foreach ($empresas as $empresa) {
									echo '<option value="'.$empresa['id_empresa'].'">'.$empresa['e_titulo'].'</option>';
								}
							}
							?>
						</select>
					<!--</div>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputContrasenia">Contrase&ntilde;a</label>
						<input type="password" class="form-control  form-control-sm" id="inputContrasenia" minlength="1" placeholder="Ingrese una contrase&ntilde;a" name="inputContrasenia" value="">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputConfirmarContrasenia">Confirmar Contrase&ntilde;a</label>
						<input type="password" class="form-control  form-control-sm" id="inputConfirmarContrasenia" minlength="1" placeholder="Confirmar contrase&ntilde;a" name="inputConfirmarContrasenia" value="">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputPerfil">Perfil</label>
					<!--<div class="form-group col-sm-6">-->
						<select id="perfiles" class="custom-select custom-select-sm">
							<option value="-1">Seleccione un Perfil</option>
							<?php
							if($perfiles)
							{
								foreach ($perfiles as $perfil) {
									echo '<option value="'.$perfil['id_perfil'].'">'.$perfil['pf_nombre'].'</option>';
								}
							}
							?>
						</select>
					<!--</div>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputContabilizar">Contabilizar en Distribuci&oacute;n de Evaluaciones</label>
						<div class="btn-group-toggle" data-toggle="buttons">
						  <label class="btn  btn-outline-secondary">
						    <input type="checkbox" checked autocomplete="off"> Contabilizar
						  </label>
						</div>
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
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
        <h5 class="modal-title" id="tituloMU"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<p id="parrafoMU"></p>
      </div>
      <div class="modal-footer">
        <button id="btnCerrarMU" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>