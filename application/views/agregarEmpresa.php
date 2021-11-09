<?php
	$id_usuario=$this->session->userdata('id_usuario');
	
	if(!$id_usuario){
	  redirect('Login');
	}
?>
<div class="row">
	<div class="col-sm-12">
		<div id="titulo" class="mt-3">
			<h3>
				<i class="plusTitulo mb-2" data-feather="<?php echo ($titulo == 'Agregar Item de Costo' ? 'plus' : 'edit-3'); ?>" ></i><?php echo $titulo; ?>
			</h3>

		</div>
	</div>
	<div class="col-sm-12">
		<div id="filtros" class="mt-3 mr-3 ml-3">
			<form id="agregarEmpresa" action="agregarEmpresa" method="POST">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdEmpresa" name="inputIdEmpresa" value="<?php if(isset($empresa['id'])): echo $empresa['id']; endif; ?>" hidden>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputRut">R.U.T.</label>
						<input type="text" class="form-control  form-control-sm" id="inputRut" minlength="1" placeholder="Ingrese un R.U.T. de la Empresa" name="inputRut" value="<?php if(isset($empresa['rut'])): echo $empresa['rut']; endif; ?>">
					</div>
					<div class="form-group col-sm-6">
						<label for="inputRazonSocial">Raz&oacute;n Social</label>
						<input type="text" class="form-control  form-control-sm" id="inputRazonSocial" minlength="1" placeholder="Ingrese una Raz&oacute;n Social de la Empresa" name="inputRazonSocial" value="<?php if(isset($empresa['razon_social'])): echo $empresa['razon_social']; endif; ?>">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputNumRegistro">N° Registro</label>
						<input type="text" class="form-control  form-control-sm" id="inputNumRegistro" minlength="1" placeholder="Ingrese un N° de Registro de la Empresa" name="inputNumRegistro" value="<?php if(isset($empresa['numRegistro'])): echo $empresa['numRegistro']; endif; ?>">
					</div>
					<div class="form-group col-sm-6">
						<label for="inputDireccion">Direcci&oacute;n</label>
						<input type="text" class="form-control  form-control-sm" id="inputDireccion" minlength="1" placeholder="Ingrese una Dirección de la Empresa" name="inputDireccion" value="<?php if(isset($empresa['direccion'])): echo $empresa['direccion']; endif; ?>">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputEmail">Email</label>
						<input type="text" class="form-control  form-control-sm" id="inputEmail" minlength="1" placeholder="Ingrese una Email de la Empresa" name="inputEmail" value="<?php if(isset($empresa['email'])): echo $empresa['email']; endif; ?>">
					</div>
					<div class="form-group col-sm-6">
						<label for="inputObservaciones">Observaciones</label>
						<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="2"><?php if(isset($empresa['observaciones'])): echo $empresa['observaciones']; endif; ?></textarea>
					</div>
				</div>
				
				<!--<div class="col-sm-12">
					<hr class="my-3">
					<h5><i class="mb-2" data-feather="home" ></i> Edificios</h5>
				</div>
				
				<div id="agregarEmpresa" class="col-sm-12 text-right">
					<a id="linkAgregarEdificio" href="" class="btn btn-link" data-toggle="modal" data-target="#modalAgregarEdificio"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Edificio</a>
				</div>
				<div class="row">
					<div class="col-sm-12 mt-3">
						<table id="tListaEdificios" class="table table-sm table-hover table-bordered">
							<thead class="thead-dark">
								<tr>
									<th scope="col" class="texto-pequenio text-center align-middle registro">ID</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Rol</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Rut</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Direccion</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Observacion</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
								</tr>
							</thead>
							<tbody id="tbodyEdificios">
							</tbody>
						</table>
					</div>
				</div>-->

				<div id="botones" class="row m-3">
					<div class="col-sm-6 text-left">
						<a class="btn btn-link"  href="<?php echo base_url();?>Empresa/listarEmpresas">Volver</a>
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
<div class="modal fade" id="modalMensajeEmpresa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloMP" name="tituloMP" data-idprograma="" data-nombreprograma="" ></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<p id="parrafoMP"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalAgregarEdificio" tabindex="-1" role="dialog" aria-labelledby="agregarEdificio" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
      	<i class="plusTitulo mb-2" data-feather="plus"></i>
        <h5 class="modal-title" id="tituloAE" name="tituloAE" data-idherramienta="" data-herramienta=""> Agregar Edificio</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="formAgregarEdificio" action="" method="POST">
	      <div class="modal-body">
	      	
	      	
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputRolE">Rol Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputRolE" minlength="1" placeholder="Ingrese un Rol del Edificio" name="inputRolE" value="">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputRutE">Rut Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputRutE" minlength="1" placeholder="Ingrese un R.U.T. del Edificio" name="inputRutE" value="">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombreE">Nombre Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreE" minlength="1" placeholder="Ingrese un Nombre del Edificio" name="inputNombreE" value="">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputDireccionE">Direcci&oacute;n Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputDireccionE" minlength="1" placeholder="Ingrese una Dirección del Edificio" name="inputDireccionE" value="">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputObservacionesE">Observaciones</label>
								<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservacionesE" name="inputObservacionesE" rows="2"></textarea>
							</div>
						</div>
					

	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
	        <button id="agregarEdificio" type="submit" class="btn btn-success">Agregar Edificio</button>
	      </div>
      </form>
    </div>
  </div>
</div>