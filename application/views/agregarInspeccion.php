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
	<!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalFoto">Tomar una Foto</button>
	
    <div class="row">
        <div class="col">
            <div class="form-inline cameras" style="margin-bottom: 1%;">
                <label for="videoSource" style="margin-right: 10px; " data-localize="select-camera">Seleccionar Cámara:</label>
                <select id="videoSource" class="custom-select col-6"></select>
            </div>
        </div>
    </div>-->

	<div class="col-sm-12">
		<div id="filtros" class="mt-3 mr-3 ml-3">
			<form id="agregarInspeccion" action="agregarInspeccion" method="POST" enctype="multipart/form-data">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdInspeccion" name="inputIdInspeccion" value="<?php if(isset($inspeccion['id'])): echo $inspeccion['id']; endif; ?>" hidden>
				</div>

				<div class="row">
					<div class="col-sm-12 mb-5">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="check-square" ></i> PARTICIPANTES EN LA REVISION</h5>
					</div>
					<div class="form-group col-sm-6">
						<label for="inputTecnico">Nombre del Tecnico</label>
						<input type="text" class="form-control  form-control-sm" id="inputTecnico" minlength="1" placeholder="Ingrese Nombre del Tecnico" name="inputTecnico" value="<?php if(isset($checklist['tecnico'])): echo $checklist['tecnico']; endif; ?>">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12 mb-5">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="check-square" ></i> ANTECEDENTES DEL EDIFICIO</h5>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreE" minlength="1" placeholder="Ingrese Nombre del Edificio" name="inputNombreE" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Direccion del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputDireccionE" minlength="1" placeholder="Ingrese Direccion del Edificio" name="inputDireccionE" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Rut del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputRutE" minlength="1" placeholder="Ingrese un Rut del Edificio" name="inputRutE" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Id de Ascensor</label>
								<input type="text" class="form-control  form-control-sm" id="inputIdE" minlength="1" placeholder="Ingrese un Id de Ascensor" name="inputIdE" value="<?php if(isset($checklist['id_ascensor'])): echo $checklist['id_ascensor']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreA" minlength="1" placeholder="Ingrese un Nombre administrador" name="inputNombreA" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">RUT administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputRutA" minlength="1" placeholder="Ingrese un RUT administrador" name="inputRutA" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Email administrador</label>
								<input type="email" class="form-control  form-control-sm" id="inputEmailA" minlength="1" placeholder="Ingrese un Email administrador" name="inputEmailA" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<!--<div class="form-group col-sm-6">
								<label for="inputNombre">Fecha contrato de mantención</label>
								<input type="date" class="form-control  form-control-sm" id="inputFechaContrato" minlength="1" placeholder="Ingrese un Fecha contrato de mantención" name="inputFechaContrato" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="selectContratoVigente">Contrato Vigente</label>
								<select id="selectContratoVigente" name="selectContratoVigente" class="custom-select custom-select-sm">
									<option value="1">Si</option>
									<option value="2">No</option>
								</select>
							</div>-->
							<div class="form-group col-sm-5">
								<label for="inputNombre">Nombre mantenedor</label>
								<input type="text" class="form-control" id="idEmpresaMantenedora" minlength="1" name="idEmpresaMantenedora" value="" hidden>
								<input type="text" class="form-control  form-control-sm" id="inputEmpresaMantenedora" minlength="1" placeholder="Seleccione una Empresa Mantenedora" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>" readonly>
							</div>
							<div class="form-group col-sm-1 mt-4">
								<div class="col-sm-3">
									<button href="SeleccionarEmpresa" class="btn btn-link" type="button" id="btnBuscarEmpresa"  data-toggle="modal" data-target="#modalBuscarEmpresa" style="padding-top: 6px;">
										<i stop-color data-feather="search" class="mb-2" data-toggle="tooltip" data-placement="top" title="Seleccionar una Empresa Mantenedora"></i>
									</button>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre de quien realiza la mantención</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreRM" minlength="1" placeholder="Ingrese un Nombre de quien realiza la mantención" name="inputNombreRM" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Fecha de la última mantención</label>
								<input type="date" class="form-control  form-control-sm" id="inputFechaUM" minlength="1" placeholder="Ingrese un Fecha de la última mantención" name="inputFechaUM" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-12 mb-5">
						<hr class="my-3">
						<h5 class="mb-3"><i class="mb-2" data-feather="check-square" ></i> CARPETA T&Eacute;CNICA</h5>

						<div class="form-group col-sm-12">
							<label for="inputNombre">Contiene Carpeta T&eacute;cnica ?</label>
							<div class="btn-group" role="group" aria-label="Basic example">
							  <button id="rbSiCarpeta" type="button" class="btn btn-primary">Si</button>
							  <button id="rbNoCarpeta" type="button" class="btn btn-danger">No</button>
							</div>
						</div>


						<div id="acordeonCarpeta" class="collapse col-sm-12">
							<div class="card card-body">
								<table class="table">
								  <thead>
								    <tr>
								      <th scope="col" class="text-center align-middle">#</th>
								      <th scope="col" class="text-center align-middle">CARPETA T&Eacute;CNICA</th>
								      <th scope="col" class="text-center align-middle">SI</th>
								      <th scope="col" class="text-center align-middle">NO</th>
								    </tr>
								  </thead>

								  <tbody id="tbodyHerramientas">
						  			<?php
							        if(isset($carpetas))
							        {
							        	$contador = 0;
								        foreach ($carpetas as $carpeta): 
								        	$contador++;
								        ?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $carpeta['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>
										        <td class="text-center align-middle"><input type="radio" id="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>_si" name="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>" class="pauta" value="si-<?php echo $carpeta['id']; ?>"></td>
								      			<td class="text-center align-middle"><input type="radio" id="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>_no" name="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>" class="pauta" value="no-<?php echo $carpeta['id']; ?>"></td>
									    	</tr>
									  		<?php 
									  		endforeach;
									  		echo '<input type="text" class="form-control" id="inputTotalCarpetas" minlength="1" name="inputTotalCarpetas" value="'.$contador.'" hidden>';
							  		}?>
						  		  </tbody>
								</table>
							</div>
						</div>
					</div>


					<div class="col-lg-12 mb-5">
						<hr class="my-3">
						<h5 class="mb-3"><i class="mb-2" data-feather="check-square" ></i> Referencias Normativas</h5>

						<div class="row">
							<div class="form-group col-sm-12">
								<table class="table">
								  <thead>
								    <tr>
								      <th scope="col" class="text-center align-middle">#</th>
								      <th scope="col" class="text-center align-middle">NORMA</th>
								      <th scope="col" class="text-center align-middle">SI</th>
								      <th scope="col" class="text-center align-middle">NO</th>
								    </tr>
								  </thead>

								  <tbody id="tbodyHerramientas">
						  			<?php
							        if(isset($normas))
							        {
							        	$contador = 0;
								        foreach ($normas as $norma): 
								        	$contador++;
							        	?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $norma['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $norma['nombre']; ?></p></td>
										        <td class="text-center align-middle"><input type="radio" id="rbNorma<?php echo $contador;#$norma['id']; ?>_si" name="rbNorma<?php echo $contador;#$norma['id']; ?>" class="pauta" value="si-<?php echo $norma['id']; ?>"></td>
								      			<td class="text-center align-middle"><input type="radio" id="rbNorma<?php echo $contador;#$norma['id']; ?>_no" name="rbNorma<?php echo $contador;#$norma['id']; ?>" class="pauta" value="no-<?php echo $norma['id']; ?>"></td>
									    	</tr>
									  		<?php endforeach;
									  		echo '<input type="text" class="form-control" id="inputTotalNormas" minlength="1" name="inputTotalNormas" value="'.$contador.'" hidden>';
							  		}?>
						  		  </tbody>
								</table>
							</div>
						</div>
					</div>


				
					<div class="col-lg-12 mb-3">
						<hr class="my-3">
						<h5 class="mb-3"><i class="mb-2" data-feather="check-square" ></i> EQUIPOS Y HERRAMIENTAS y EPP UTILIZADOS UTILIZADAS PARA LA REVISION</h5>

						<div class="row">
							<div class="form-group col-sm-12">
								<table class="table">
								  <thead>
								    <tr>
								      <th scope="col" class="text-center align-middle">#</th>
								      <th scope="col" class="text-center align-middle">EQUIPO Y HERRAMIENTA</th>
								      <th scope="col" class="text-center align-middle">SI</th>
								      <th scope="col" class="text-center align-middle">NO</th>
								    </tr>
								  </thead>

								  <tbody id="tbodyHerramientas">
						  			<?php
							        if(isset($herramientas))
							        {
							        	$contador = 0;
								        foreach ($herramientas as $herramienta):
								        	$contador++;
								        ?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $herramienta['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $herramienta['nombre']; ?></p></td>
										        <td class="text-center align-middle"><input type="radio" id="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>_si" name="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>" class="pauta" value="si-<?php echo $herramienta['id']; ?>" checked></td>
								      			<td class="text-center align-middle"><input type="radio" id="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>_no" name="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>" class="pauta" value="no-<?php echo $herramienta['id']; ?>"></td>
									    	</tr>
									  		<?php endforeach;
									  		echo '<input type="text" class="form-control" id="inputTotalHerramientas" minlength="1" name="inputTotalHerramientas" value="'.$contador.'" hidden>';
							  		}?>
						  		  </tbody>
								</table>
							</div>
							<!--<div class="form-group col-sm-6">
								<label for="inputObservaciones">Observaciones</label>
								<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="2"><?php if(isset($checklist['observaciones'])): echo $checklist['observaciones']; endif; ?></textarea>
							</div>-->
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12 mb-5">
						<hr class="my-3">
						<h5><i class="mb-3" data-feather="check-square" ></i> ANTECEDENTES DEL ASCENSOR</h5>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputMarca">Marca</label>
								<input type="text" class="form-control  form-control-sm" id="inputMarca" minlength="1" placeholder="Ingrese Marca del Ascensor" name="inputMarca" value="<?php if(isset($checklist['marca'])): echo $checklist['marca']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="selectUso">Uso</label>
								<select id="selectUso" name="selectUso" class="custom-select custom-select-sm">
									<option selected>Seleccione un Uso</option>
									<option value="1">Vivienda</option>
									<option value="2">Infraestructura</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputCapacidad">Capacidad de Personas</label>
								<input type="number" class="form-control  form-control-sm" id="inputCapacidad" minlength="1" placeholder="Ingrese capacidad del Ascensor" name="inputCapacidad" value="<?php if(isset($checklist['capacidad'])): echo $checklist['capacidad']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputCapacidadKG">Capacidad en KG</label>
								<input type="number" class="form-control  form-control-sm" id="inputCapacidadKG" minlength="1" placeholder="Ingrese capacidad en KG" name="inputCapacidadKG" value="<?php if(isset($checklist['capacidadKG'])): echo $checklist['capacidadKG']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputSuspension">Suspension</label>
								<select id="selectSuspension" name="selectSuspension" class="custom-select custom-select-sm">
									<option selected>Seleccione una Suspension</option>
									<option value="3">Suspension Hidraulica</option>
									<option value="4">Suspension Mecanica</option>
								</select>
							</div>
							<div class="form-group col-sm-6">
								<label for="selectSalaMaquina">Sala de Maquinas</label>
								<select id="selectSalaMaquina" name="selectSalaMaquina" class="custom-select custom-select-sm">
									<option value="1">Si</option>
									<option value="2">No</option>
								</select>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputVelocidad">Velocidad</label>
								<input type="text" class="form-control  form-control-sm" id="inputVelocidad" minlength="1" placeholder="Ingrese Velocidad" name="inputVelocidad" value="<?php if(isset($checklist['velocidad'])): echo $checklist['velocidad']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputRecorrido">Recorrido</label>
								<input type="text" class="form-control  form-control-sm" id="inputRecorrido" minlength="1" placeholder="Ingrese Recorrido" name="inputRecorrido" value="<?php if(isset($checklist['recorrido'])): echo $checklist['recorrido']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputParadas">Paradas</label>
								<input type="text" class="form-control  form-control-sm" id="inputParadas" minlength="1" placeholder="Ingrese Paradas" name="inputParadas" value="<?php if(isset($checklist['paradas'])): echo $checklist['paradas']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="selectTipoTraccion">Tipo Tracción</label>
								<select id="selectTipoTraccion" name="selectTipoTraccion" class="custom-select custom-select-sm">
									<option selected>Seleccione un Tipo Tracción</option>
									<option value="1">Cable</option>
									<option value="2">Cinta</option>
								</select>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputDiamCablesTraccion">Diametro de Traccion</label>
								<input type="text" class="form-control  form-control-sm" id="inputDiamTraccion" minlength="1" placeholder="Ingrese Diametro de Traccion" name="inputDiamTraccion" value="<?php if(isset($checklist['diamTraccion'])): echo $checklist['diamTraccion']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputEnclavamientoElectrico">Enclavamiento El&eacute;ctrico Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputEnclavamientoElectrico" minlength="1" placeholder="Ingrese Enclavamiento Electrico Limitador" name="inputEnclavamientoElectrico" value="<?php if(isset($checklist['enclavamientoElectrico'])): echo $checklist['enclavamientoElectrico']; endif; ?>">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputEnclavamientoMecanico">Enclavamiento Mec&aacute;nico Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputEnclavamientoMecanico" minlength="1" placeholder="Ingrese Enclavamiento Electrico Limitador" name="inputEnclavamientoMecanico" value="<?php if(isset($checklist['enclavamientoMecanico'])): echo $checklist['enclavamientoMecanico']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputDiamCableLimitador">Diametro Cable Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputDiamCableLimitador" minlength="1" placeholder="Ingrese Diametro Cable Limitador" name="inputDiamCableLimitador" value="<?php if(isset($checklist['diamCableLimitador'])): echo $checklist['diamCableLimitador']; endif; ?>">
							</div>
						</div>

					</div>
				</div>

				<div id="divCheckList" class="row">
					<hr class="my-3">
					<div id="agregarChecklist" class="col-sm-12 text-right">
						<a id="btnAgregarChecklist" class="btn btn-link" data-toggle="modal" data-target="#modalAgregarChecklist"><i stop-color data-feather="plus" class="pb-1"></i>Agregar CheckList</a>
					</div>
					<input type="text" class="form-control" id="inputTotalChecklist" minlength="1" name="inputTotalChecklist" value="" hidden>
					<div class="col-sm-12 mb-2">
						<h5><i class="mb-2" data-feather="check-square" ></i> CHECKLIST # 1</h5>

						
						<div class="row">
							<div class="form-group col-sm-5 pt-3">
								<label for="inputNorma">Norma</label>
								<input type="text" class="form-control" id="idNorma" minlength="1" placeholder="Seleccione una Norma" name="idNorma" value="" hidden>
								<input type="text" class="form-control" id="inputNorma" minlength="1" placeholder="Seleccione una Norma" name="inputNorma" readonly>
							</div>
							<div class="col-sm-1 mt-5">
								<div class="row">
									<div class="col-sm-3">
										<button href="SeleccionarNorma" class="btn btn-link" type="button" id="btnBuscarNorma"  data-toggle="modal" data-target="#modalBuscarNorma" style="padding-top: 6px;">
											<i stop-color data-feather="plus" class="mb-2" data-toggle="tooltip" data-placement="top" title="Seleccionar una Norma"></i>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="acordeon" class="collapse show col-sm-12">
				</div>

				<div class="accordion" id="acordionCategorias"></div>

				<div id="botones" class="row m-3">
					<div class="col-sm-6 text-left">
						<a class="btn btn-link"  href="<?php echo base_url();?>Inspeccion/listarInspecciones">Volver</a>
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
<div class="modal fade" id="modalMensajeInspeccion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

<!-- FIN Modal Mensaje -->
<!-- INICIO Modal FOTO -->
<div class="modal fade" id="modalFoto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloMF" name="tituloMF" data-id=""></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<p id="parrafoMF"></p>


		<div class="api">
            <canvas id="photo" class="hide" style="display:none;" height="720" width="1280"></canvas>
            <canvas id="rotated" class="hide" style="display:none;" height="720" width="1280"></canvas>
            <img id="camera" src="" alt="" style="display:none">
            <div class="row">
                <div class="col-md-8 mx-auto">
                    <!-- Inicio Paso a Paso -->
                    <div id="rootwizard">
                    	<div class="row">
                            <div class="col">
                                <div class="form-inline cameras" style="margin-bottom: 1%;">
                                    <label for="videoSource" style="margin-right: 10px; " data-localize="select-camera">Seleccionar Cámara:</label>
                                    <select id="videoSource" class="custom-select col-6"></select>
                                </div>
                            </div>
                        </div>
                    	<div class="row">
                        	<div class="col">
                        		<div class="tab-content">
									<div class="" role="tabpanel" id="front">
									    <fieldset id="front">        
									            <div class="row">
									            	<div class="col-1">
                                                        <a href="javascript:void(0);" data-dir="left" class="btn btn-info rotate float-left">
                                                            <i data-feather="arrow-left" aria-hidden="true"></i></a>
                                                    </div>
									                <div class="col-10">
									                    <input type="text" name="id_front" value="" hidden>
									                    <img id="id_front" class="img-fluid" src="">
									                    <div id="front-video">
									                        <div id="video-stream">
									                            <video id="video" style="max-width:100%;"></video>
									                        </div>
									                    </div>
									                </div>
									                <div class="col-1">
									                    <a href="javascript:void(0);" data-dir="right" class="btn btn-info rotate float-right">
									                        <i data-feather="arrow-right" aria-hidden="true"></i></a>
									                </div>
									            </div>
									            <div class="row">
									            	<div class="col-sm-12 text-center mt-3">
									            		<input type="file" id="doc-front" name="doc-front" class="inputfile" accept="image/*" capture="camera">
												        <label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></label>
												        <a href="#" class="btn btn-success take-photo">
												        	<i data-feather="camera"></i>
												        	<!--<i class="fa fa-camera" aria-hidden="true"></i> -->
												        	<!--<span data-localize="capture">TOMAR FOTO</span>--></a>
												        <a href="#" class="btn btn-warning refrescar">
												        	<i data-feather="refresh-ccw"></i>
												    	</a>
									            	</div>
									            </div>
									    </fieldset>
									</div>

								</div>
                            <!-- Fin Tabs -->
	                        </div>
	                    </div>
                    </div>
                </div>
            </div>
        </div>
		
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
        <button id="seleccionarFoto" type="button" class="btn btn-info" data-dismiss="modal" data-id="">Seleccionar Foto</button>
      </div>
    </div>
  </div>
</div>
<!-- FIN Modal FOTO -->

<div class="modal fade" id="modalBuscarNorma" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title" id="tituloMP">Selecciona un Norma</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
		</div>
		<div class="modal-body">
			<div class="table-responsive" id="listaSeleccionNorma">
				<table id="tListaNormas" class="table table-sm table-hover table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
						    <th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
						    <th scope="col" class="texto-pequenio text-center align-middle registro">Observaci&oacute;n</th>
						    <th scope="col" class="texto-pequenio text-center align-middle registro"></th>
						</tr>
					</thead>
					<tbody id="tbodyNorma">
				        <?php
				        if(isset($normas))
				        {
					        foreach ($normas as $norma): ?>
					  			<tr>
							        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['id']; ?></th>
							        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['nombre']; ?></p></td>
							        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['observaciones']; ?></p></td>
							        <td class="text-center align-middle registro botonTabla paginate_button">
						        		<button href="#" aria-controls="tListaNormas" data-id="<?php echo $norma['id']; ?>" data-nombre="<?php echo $norma['nombre']; ?>" tabindex="0" class="btn btn-outline-dark seleccionNorma">Seleccionar</button>
						        	</td>
						    	</tr>
					  		<?php endforeach;
				  		}?>
				  </tbody>
				</table>
			</div>
      	</div>
		<div class="modal-footer">
			<button id="btnCerrarMP" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
		</div>
    </div>
  </div>
</div>

<!-- MODAL BUSCAR EMPRESA-->

<div class="modal fade" id="modalBuscarEmpresa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title" id="tituloMP">Selecciona una Empresa</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
		</div>
		<div class="modal-body">
			<div class="table-responsive" id="listaSeleccionEmpresa">
				<table id="tListaEmpresas" class="table table-sm table-hover table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Rut</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Raz&oacute;n Social</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">N° Registro</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Direcci&oacute;n</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
						</tr>
					</thead>
					<tbody id="tbodyEmpresas">
				  </tbody>
				</table>
			</div>
      	</div>
		<div class="modal-footer">
			<button id="btnCerrarE" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			<button id="btnSeleccionarE" type="button" class="btn btn-success" data-dismiss="modal">Seleccionar</button>
		</div>
    </div>
  </div>
</div>

<!-- INICIO Modal Observacion -->
<div class="modal fade" id="modalAgregarObservacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
      	<i class="plusTitulo mb-2" data-feather="plus"></i>
        <h5 class="modal-title" id="tituloAO" name="tituloAO" data-idherramienta="" data-herramienta=""> Agregar Observaci&oacute;n General</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="row">
			<div class="form-group col-sm-12">
				<label for="inputObservaciones">Observaciones Generales</label>
				<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="4"></textarea>
			</div>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
        <button id="agregarObservacion" type="button" class="btn btn-success">Agregar Observaci&oacute;n</button>
      </div>
    </div>
  </div>
</div>

<!-- FIN Modal Agregar Observacion -->


<!-- MODAL Agregar Checklist -->

<div class="modal fade" id="modalAgregarChecklist" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title" id="tituloMP">Selecciona una Empresa</h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="table-responsive" id="listaSeleccionEmpresa">
				<table id="tListaEmpresas" class="table table-sm table-hover table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Rut</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Raz&oacute;n Social</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">N° Registro</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Direcci&oacute;n</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
							<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
						</tr>
					</thead>
					<tbody id="tbodyEmpresas">
				  </tbody>
				</table>
			</div>
      	</div>
		<div class="modal-footer">
			<button id="btnCerrarE" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			<button id="btnSeleccionarE" type="button" class="btn btn-success" data-dismiss="modal">Seleccionar</button>
		</div>
    </div>
  </div>
</div>




<script src="<?php echo (base_url().'assets/jquery/jquery-3.2.1.min.js'); ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<!--<script src="<?php //echo (base_url().'assets/bootstrap-4.1.3/js/bootstrap.min.js'); ?>"></script>-->
<!--<script src="<?php //echo (base_url().'assets/shards-1.1/js/shards.min.js'); ?>"></script>-->
<!--<script src="<?php echo (base_url().'assets/jquery-bootstrap-wizard/jquery.bootstrap.wizard.min.js'); ?>"></script>-->
<!--<script src="<?php echo (base_url().'assets/bootbox-v4.4.0/bootbox.min.js'); ?>"></script>-->
<!--<script src="<?php echo (base_url().'assets/momentjs-2.18.1/moment.min.js'); ?>"></script>-->
<script src="https://cdn.webrtc-experiment.com/DetectRTC.js"></script>
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
<script src="<?php echo (base_url().'assets/localize/jquery.localize.min.js'); ?>"></script>
<!--<script src="<?php echo (base_url().'assets/image-picker/js/image-picker.min.js'); ?>"></script>-->
<!--<script src="<?php echo (base_url().'assets/scripts/ci_codes.js'); ?>"></script>-->
<!--<script src="<?php echo (base_url().'assets/locale/lang.js'); ?>"></script>-->
<script src="<?php echo (base_url().'assets/scripts/status.js'); ?>"></script>
<script src="<?php echo (base_url().'assets/scripts/toc_utils.js'); ?>"></script>
<script src="<?php echo (base_url().'assets/scripts/ui_interactions.js'); ?>"></script>
<script src="<?php echo (base_url().'assets/scripts/app.js'); ?>"></script>