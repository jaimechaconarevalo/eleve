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
			<form id="agregarInspeccion" action="agregarInspeccion" method="POST">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdInspeccion" name="inputIdInspeccion" value="<?php if(isset($inspeccion['id'])): echo $inspeccion['id']; endif; ?>" hidden>
				</div>

				<div class="row">
					<div class="col-sm-12 mb-5">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="check-square" ></i> PARTICIPANTES EN LA REVISION</h5>
					</div>
					<div class="form-group col-sm-6">
						<label for="inputTecnico">Nombre del Edificio</label>
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
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese Nombre del Edificio" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Direccion del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese Direccion del Edificio" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Rut del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Rut del Edificio" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Rol de la Propiedad</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Rol de la Propiedad" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Nombre administrador" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">RUT administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un RUT administrador" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Email administrador</label>
								<input type="email" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Email administrador" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Fecha contrato de mantención</label>
								<input type="date" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Fecha contrato de mantención" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="selectContratoVigente">Contrato Vigente</label>
								<select id="selectContratoVigente" name="selectContratoVigente" class="custom-select custom-select-sm">
									<option value="1">Si</option>
									<option value="2">No</option>
								</select>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre mantenedor</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Nombre mantenedor" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre de quien realiza la mantención</label>
								<input type="email" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Nombre de quien realiza la mantención" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Fecha de la última mantención</label>
								<input type="date" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Fecha de la última mantención" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-12 mb-5">
						<hr class="my-3">
						<h5 class="mb-3"><i class="mb-2" data-feather="check-square" ></i> CARPETA 0</h5>

						<div class="form-group col-sm-12">
							<label for="inputNombre">Contiene Carpeta 0 ?</label>
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
								      <th scope="col" class="text-center align-middle">EQUIPO Y HERRAMIENTA</th>
								      <th scope="col" class="text-center align-middle">SI</th>
								      <th scope="col" class="text-center align-middle">NO</th>
								    </tr>
								  </thead>

								  <tbody id="tbodyHerramientas">
						  			<?php
							        if(isset($carpetas))
							        {
								        foreach ($carpetas as $carpeta): ?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $carpeta['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>
										        <td class="text-center align-middle"><input type="radio" name="rbCarpeta<?php echo $carpeta['id']; ?>" class="pauta"></td>
								      			<td class="text-center align-middle"><input type="radio" name="rbCarpeta<?php echo $carpeta['id']; ?>" class="pauta"></td>
									    	</tr>
									  		<?php endforeach;
							  		}?>
						  		  </tbody>
								</table>
							</div>
						</div>

						<!--<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Plano piso principal</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Plano piso principal" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Plano mecánico</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Plano mecánico" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Especificaciones técnicas</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Especificaciones técnicas" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Plano instalación eléctrica</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Plano instalación eléctrica" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Plano de línea de seguridades</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Plano de línea de seguridades" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Plan anual de mantención</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Plan anual de mantención" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Manual de procedimientos e inspecciones</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Manual de procedimientos e inspecciones" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Manual de uso e instructivo de rescate</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Manual de uso e instructivo de rescate" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Certificado de inscripción vigente mantenedor</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un Certificado de inscripción vigente mantenedor" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Copia certificado ultima mantención</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese una Copia certificado ultima mantención" name="inputNombre" value="<?php if(isset($checklist['nombre'])): echo $checklist['nombre']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Copia informe certificación anterior</label>
								<div class="custom-file">
									<input type="file" class="custom-file-input" id="archivoCentroProduccion" name="archivoCentroProduccion">
									<label class="custom-file-label" for="archivoCentroProduccion" id="lArchivoProduccion">Seleccionar un Archivo...</label>
								</div>
							</div>
						</div>-->
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
								        foreach ($herramientas as $herramienta): ?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $herramienta['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $herramienta['nombre']; ?></p></td>
										        <td class="text-center align-middle"><input type="radio" name="rbHerramienta<?php echo $herramienta['id']; ?>" class="pauta"></td>
								      			<td class="text-center align-middle"><input type="radio" name="rbHerramienta<?php echo $herramienta['id']; ?>" class="pauta"></td>
									    	</tr>
									  		<?php endforeach;
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
								<input type="text" class="form-control  form-control-sm" id="inputSuspension" minlength="1" placeholder="Ingrese Suspension" name="inputSuspension" value="<?php if(isset($checklist['suspension'])): echo $checklist['suspension']; endif; ?>">
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
								<label for="inpuyVelocidad">Velocidad</label>
								<input type="email" class="form-control  form-control-sm" id="inpuyVelocidad" minlength="1" placeholder="Ingrese Velocidad" name="inpuyVelocidad" value="<?php if(isset($checklist['velocidad'])): echo $checklist['velocidad']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputRecorrido">Recorrido</label>
								<input type="email" class="form-control  form-control-sm" id="inputRecorrido" minlength="1" placeholder="Ingrese Recorrido" name="inputRecorrido" value="<?php if(isset($checklist['recorrido'])): echo $checklist['recorrido']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputParadas">Paradas</label>
								<input type="email" class="form-control  form-control-sm" id="inputParadas" minlength="1" placeholder="Ingrese Paradas" name="inputParadas" value="<?php if(isset($checklist['paradas'])): echo $checklist['paradas']; endif; ?>">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputCantCablesTraccion">Cant. Cables de Traccion</label>
								<input type="text" class="form-control  form-control-sm" id="inputCantCablesTraccion" minlength="1" placeholder="Ingrese Cant. Cables de Traccion" name="inputCantCablesTraccion" value="<?php if(isset($checklist['cantCableTraccion'])): echo $checklist['cantCableTraccion']; endif; ?>">
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputDiamCablesTraccion">Diametro Cables de Traccion</label>
								<input type="text" class="form-control  form-control-sm" id="inputDiamCablesTraccion" minlength="1" placeholder="Ingrese Diametro Cables de Traccion" name="inputDiamCablesTraccion" value="<?php if(isset($checklist['diamCableTraccion'])): echo $checklist['diamCableTraccion']; endif; ?>">
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

				<div class="row">
					<div class="col-sm-12 mb-2">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="check-square" ></i> CHECKLIST # 1</h5>

						<div id="agregarCategoria" class="col-sm-12 text-right">
							<a id="btnAgregarCategoria" class="btn btn-link" data-toggle="modal" data-target="#modalAgregarCategoria"><i stop-color data-feather="plus" class="pb-1"></i>Agregar CheckList</a>
						</div>
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
					<!--<div class="card card-body">
						<table class="table">
							<thead>
							<tr class="border-1">
						  		<td colspan="3" class="ml-3 text-left">
						  			<h5 class="mb-0">
						  				1.1.1.1 - CABINA
						  			</h5>
						  		</td>
					  			<td colspan="3" class="text-right">
						  			<span class="badge badge-danger badge-pill">0</span>  /  <span class="badge badge-primary badge-pill">12</span>
						  			<a class="btn btn-link agregarObservacion" data-id="6" data-codigo="6" data-nombre="CABINA" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>
						  		</td>
						  	</tr>
						  	</thead>
						  <thead>
						    <tr>
						      <th scope="col" class="text-center align-middle">#</th>
						      <th scope="col" class="text-center align-middle">Codigo</th>
						      <th scope="col" class="text-center align-middle">Pregunta</th>
						      <th scope="col" class="text-center align-middle">SI</th>
						      <th scope="col" class="text-center align-middle">NO</th>
						      <th scope="col" class="text-center align-middle">N/A</th>
						    </tr>
						  </thead>

						  <tbody id="tbodyHerramientas">
				  			<?php
					        if(isset($carpetas))
					        {
						        foreach ($carpetas as $carpeta): ?>
						  			<tr class="pregunta<?php echo $carpeta['id']; ?>">
								        <th class="text-center align-middle"><p><?php echo $carpeta['id']; ?></p></th>
								        <th class="text-center align-middle"><p><?php echo $carpeta['codigo']; ?></p></th>
								        <td class="text-center align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>
								        <td class="text-center align-middle"><input type="radio" name="rbCarpeta<?php echo $carpeta['id']; ?>" class="pauta"></td>
						      			<td class="text-center align-middle"><input type="radio" name="rbCarpeta<?php echo $carpeta['id']; ?>" class="pauta" data-toggle="collapse" data-target="#collapseExample<?php echo $carpeta['id']; ?>" aria-expanded="false" aria-controls="collapseExample<?php echo $carpeta['id']; ?>"></td>
						      			<td class="text-center align-middle"><input type="radio" name="rbCarpeta<?php echo $carpeta['id']; ?>" class="pauta"></td>
							    	</tr>
							    	<tr>
							    		<td id="collapseExample<?php echo $carpeta['id']; ?>" class="collapse" colspan="6">
										 	<div class="card card-body">
										 		<div class="row">
										 			<div class="col-sm-6">
												    	<label for="inputObservaciones<?php echo $carpeta['id']; ?>">Observaciones</label>
														<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones<?php echo $carpeta['id']; ?>" name="inputObservaciones<?php echo $carpeta['id']; ?>" rows="2"><?php if(isset($carpeta['observaciones'])): echo $carpeta['observaciones']; endif; ?></textarea>
											  		</div>
											  		<div class="col-sm-6">
											  			
				                                            <label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>
				                                            <a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>
											  		</div>
										 		</div>
											</div>
							    		</td>
							    	</tr>
							  		<?php endforeach;
					  		}?>
				  		  </tbody>
						</table>
					</div>-->
				</div>

				<!--<div id="acorden2" class="collapse show col-sm-12">
				  <div id="accordion">
				    <div class="card">
				      <div class="card-header">
				        <table class="table table-sm mb-0">
				          <thead>
				            <tr id="headingOne" data-toggle="collapse" data-target="#collapseOne">
				              <th class="border-0 font-weight-bold text-center align-middle">#</th>
				              <th class="border-0 font-weight-bold text-center align-middle">Codigo</th>
				              <th class="border-0 font-weight-bold text-center align-middle">Pregunta</th>
				              <th class="border-0 font-weight-bold text-center align-middle">SI</th>
				              <th class="border-0 font-weight-bold text-center align-middle">NO</th>
				              <th class="border-0 font-weight-bold text-center align-middle">N/A</th>
				            </tr>
				            <tr id="headingOne" data-toggle="collapse" data-target="#collapseOne">
				              <th class="font-weight-bold text-center align-middle" colspan="6">CABINA</th>
				            </tr>
				          </thead>
				        </table>
				      </div>
				      <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
				        <div class="card-body">
							<table class="table table-sm mb-0">
								<tbody>
									<tr id="headingOne" data-toggle="collapse" data-target="#collapseOne">
									  <td class="border-0 text-center align-middle">1</td>
									  <td class="border-0 text-center align-middle">123</td>
									  <td class="border-0 text-center align-middle">Pregunta Numero 1 Pregunta Numero 1</td>
									  <td class="border-0 text-center align-middle">
									  	<input type="radio" name="rbCarpeta1" class="pauta">
									  </td>
									  <td class="border-0 font-weight-bold text-center align-middle">
									  	<input type="radio" name="rbCarpeta1" class="pauta">
									  </td>
									  <td class="border-0 font-weight-bold text-center align-middle">
									  	<input type="radio" name="rbCarpeta1" class="pauta">
									  </td>
									</tr>
								</tbody>
							</table>
				        </div>
				      </div>
				    </div>
				    <div class="card">
				      <div class="card-header" role="tab" id="headingTwo">
				        <h5 class="mb-0">
				          <a class="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				            Collapsible Group Item #2
				          </a>
				        </h5>
				      </div>
				      <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
				        <div class="card-body">
				          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
				        </div>
				      </div>
				    </div>
				    <div class="card">
				      <div class="card-header" role="tab" id="headingThree">
				        <h5 class="mb-0">
				          <a class="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
				            Collapsible Group Item #3
				          </a>
				        </h5>
				      </div>
				      <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
				        <div class="card-body">
				          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
				        </div>
				      </div>
				    </div>
				  </div>
				</div>-->

			

				
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
        <h5 class="modal-title" id="tituloMCL" name="tituloMCL" data-idprograma="" data-nombreprograma="" ></h5>
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


<script src="<?php echo (base_url().'assets/jquery/jquery-3.2.1.min.js'); ?>"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<!--<script src="<?php //echo (base_url().'assets/bootstrap-4.1.3/js/bootstrap.min.js'); ?>"></script>-->
<!--<script src="<?php //echo (base_url().'assets/shards-1.1/js/shards.min.js'); ?>"></script>-->-->
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