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
				<i class="plusTitulo mb-2" data-feather="<?php echo ($titulo == 'Agregar Item de Costo' ? 'plus' : 'eye'); ?>" ></i>   <?php echo $titulo; ?>
			</h3>

		</div>
	</div>
	<div class="col-sm-12">
		<div id="filtros" class="mt-3 mr-3 ml-3">
			
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
						<input type="text" class="form-control  form-control-sm" id="inputTecnico" minlength="1" placeholder="Ingrese Nombre del Tecnico" name="inputTecnico" value="<?php if(isset($inspeccion['nombre_tecnico'])): echo $inspeccion['nombre_tecnico']; endif; ?>" readonly>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12 mb-5">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="check-square" ></i> ANTECEDENTES DEL EDIFICIO</h5>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreE" minlength="1" placeholder="Ingrese Nombre del Edificio" name="inputNombreE" value="<?php if(isset($inspeccion['edificio'])): echo $inspeccion['edificio']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Direccion del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputDireccionE" minlength="1" placeholder="Ingrese Direccion del Edificio" name="inputDireccionE" value="<?php if(isset($inspeccion['domicilio'])): echo $inspeccion['domicilio']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Rut del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputRutE" minlength="1" placeholder="Ingrese un Rut del Edificio" name="inputRutE" value="<?php if(isset($inspeccion['rut_e'])): echo $inspeccion['rut_e']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Id de Ascensor</label>
								<input type="text" class="form-control  form-control-sm" id="inputIdE" minlength="1" placeholder="Ingrese un Id de Ascensor" name="inputIdE" value="<?php if(isset($inspeccion['rol'])): echo $inspeccion['rol']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Nombre administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreA" minlength="1" placeholder="Ingrese un Nombre administrador" name="inputNombreA" value="<?php if(isset($inspeccion['nombre_admin'])): echo $inspeccion['nombre_admin']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">RUT administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputRutA" minlength="1" placeholder="Ingrese un RUT administrador" name="inputRutA" value="<?php if(isset($inspeccion['rut_admin'])): echo $inspeccion['rut_admin']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombre">Email administrador</label>
								<input type="email" class="form-control  form-control-sm" id="inputEmailA" minlength="1" placeholder="Ingrese un Email administrador" name="inputEmailA" value="<?php if(isset($inspeccion['email_admin'])): echo $inspeccion['email_admin']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<!--<div class="form-group col-sm-6">
								<label for="inputNombre">Fecha contrato de mantención</label>
								<input type="date" class="form-control  form-control-sm" id="inputFechaContrato" minlength="1" placeholder="Ingrese un Fecha contrato de mantención" name="inputFechaContrato" value="<?php if(isset($inspeccion['nombre'])): echo $inspeccion['nombre']; endif; ?>">
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
								<input type="text" class="form-control" id="idEmpresaMantenedora" minlength="1" name="idEmpresaMantenedora" value="<?php if(isset($inspeccion['id_empresa'])): echo $inspeccion['id_empresa']; endif; ?>" hidden>
								<input type="text" class="form-control  form-control-sm" id="inputEmpresaMantenedora" minlength="1" placeholder="Seleccione una Empresa Mantenedora" name="inputNombre" value="<?php if(isset($inspeccion['razon_social'])): echo $inspeccion['razon_social']; endif; ?>" readonly>
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
								<input type="text" class="form-control  form-control-sm" id="inputNombreRM" minlength="1" placeholder="Ingrese un Nombre de quien realiza la mantención" name="inputNombreRM" value="<?php if(isset($inspeccion['nombre_mant_2'])): echo $inspeccion['nombre_mant_2']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputNombre">Fecha de la última mantención</label>
								<input type="date" class="form-control  form-control-sm" id="inputFechaUM" minlength="1" placeholder="Ingrese un Fecha de la última mantención" name="inputFechaUM" value="<?php if(isset($inspeccion['fecha_ultima_mant'])): echo $inspeccion['fecha_ultima_mant']; endif; ?>" readonly>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-12 mb-5">
						<hr class="my-3">
						<h5 class="mb-3"><i class="mb-2" data-feather="check-square" ></i> CARPETA T&Eacute;CNICA</h5>

						<div class="form-group col-sm-12" readonly>
							<label for="inputNombre">Contiene Carpeta T&eacute;cnica ?</label>
							<div class="btn-group" role="group" aria-label="Basic example">
							  <button id="rbSiCarpeta" type="button" class="btn btn-primary">Si</button>
							  <button id="rbNoCarpeta" type="button" class="btn btn-danger">No</button>
							</div>
						</div>


						<div id="acordeonCarpeta" class="collapse <?php echo (isset($respuesta_carpetas) && sizeof($respuesta_carpetas) > 0 ? 'show' : ''); ?> col-sm-12" readonly>
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
								        	if (isset($respuesta_carpetas) && sizeof($respuesta_carpetas) > 0) {
								        		$respuesta_carpeta_rb = false;
								        		$key = array_search($carpeta['id'], array_column($respuesta_carpetas, 'id_carpeta'));
								        		if (is_numeric($key) && $key >= 0 && $key !== false) {
								        			$respuesta_carpeta_rb = ((int)$respuesta_carpetas[$key]["respuesta"]);
								        		}
								        	}
								        	
								        ?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $carpeta['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>
										        <td class="text-center align-middle">
										        	<input type="radio" id="rbCarpeta<?php echo $contador; ?>_si" name="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>" class="pauta disabled" value="si-<?php echo $carpeta['id']; ?>" readonly <?php echo ($respuesta_carpeta_rb === 1 ? 'checked' : ''); ?>>
										        </td>
								      			<td class="text-center align-middle">
								      				<input type="radio" id="rbCarpeta<?php echo $contador; ?>_no" name="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>" class="pauta disabled" value="no-<?php echo $carpeta['id']; ?>" readonly <?php echo ($respuesta_carpeta_rb === 0 ? 'checked' : ''); ?>>
								      			</td>
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
								        	if (isset($respuesta_normas) && sizeof($respuesta_normas) > 0) {
								        		$respuesta_norma_rb = false;
								        		$key = array_search($norma['id'], array_column($respuesta_normas, 'id_norma'));
								        		if (is_numeric($key) && $key >= 0 && $key !== false) {
								        			$respuesta_norma_rb = ((int)$respuesta_normas[$key]["respuesta"]);
								        		}
								        	}
							        	?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $norma['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $norma['nombre']; ?></p></td>
										        <td class="text-center align-middle">
										        	<input type="radio" id="rbNorma<?php echo $contador;#$norma['id']; ?>_si" name="rbNorma<?php echo $contador;#$norma['id']; ?>" class="pauta" value="si-<?php echo $norma['id']; ?>"  readonly <?php echo ($respuesta_norma_rb === 1 ? 'checked' : ''); ?>>
										        </td>
								      			<td class="text-center align-middle">
								      				<input type="radio" id="rbNorma<?php echo $contador;#$norma['id']; ?>_no" name="rbNorma<?php echo $contador;#$norma['id']; ?>" class="pauta" value="no-<?php echo $norma['id']; ?>"  readonly <?php echo ($respuesta_norma_rb === 0 ? 'checked' : ''); ?>>
								      			</td>
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

								        	if (isset($respuesta_herramientas) && sizeof($respuesta_herramientas) > 0) {
								        		$respuesta_herramienta_rb = false;
								        		$key = array_search($herramienta['id'], array_column($respuesta_herramientas, 'id_herramienta'));
								        		if (is_numeric($key) && $key >= 0 && $key !== false) {
								        			$respuesta_herramienta_rb = ((int)$respuesta_herramientas[$key]["respuesta"]);
								        		}
								        	}
								        ?>
								  			<tr>
										        <th class="text-center align-middle"><p><?php echo $herramienta['codigo']; ?></p></th>
										        <td class="text-center align-middle"><p><?php echo $herramienta['nombre']; ?></p></td>
										        <td class="text-center align-middle">
										        	<input type="radio" id="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>_si" name="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>" class="pauta" value="si-<?php echo $herramienta['id']; ?>"  readonly <?php echo ($respuesta_herramienta_rb === 1 ? 'checked' : ''); ?>>
										        </td>
								      			<td class="text-center align-middle">
								      				<input type="radio" id="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>_no" name="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>" class="pauta" value="no-<?php echo $herramienta['id']; ?>" readonly <?php echo ($respuesta_herramienta_rb === 0 ? 'checked' : ''); ?>>
								      			</td>
									    	</tr>
									  		<?php endforeach;
									  		echo '<input type="text" class="form-control" id="inputTotalHerramientas" minlength="1" name="inputTotalHerramientas" value="'.$contador.'" hidden>';
							  		}?>
						  		  </tbody>
								</table>
							</div>
							<!--<div class="form-group col-sm-6">
								<label for="inputObservaciones">Observaciones</label>
								<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="2"><?php if(isset($inspeccion['observaciones'])): echo $inspeccion['observaciones']; endif; ?></textarea>
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
								<input type="text" class="form-control  form-control-sm" id="inputMarca" minlength="1" placeholder="Ingrese Marca del Ascensor" name="inputMarca" value="<?php if(isset($inspeccion['marca_ascensor'])): echo $inspeccion['marca_ascensor']; endif; ?>" readonly>
							</div>
							<div class="form-group col-sm-6">
								<label for="selectUso">Uso</label>
								<select id="selectUso" name="selectUso" class="custom-select custom-select-sm" readonly>
									<option selected>Seleccione un Uso</option>
									<option value="1" <?php if(isset($inspeccion['id_uso']) && ($inspeccion['id_uso']) == 1): echo 'selected'; endif; ?>>Vivienda</option>
									<option value="2" <?php if(isset($inspeccion['id_uso']) && ($inspeccion['id_uso']) == 2): echo 'selected'; endif; ?>>Infraestructura</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputCapacidad">Capacidad de Personas</label>
								<input type="number" class="form-control  form-control-sm" id="inputCapacidad" minlength="1" placeholder="Ingrese capacidad del Ascensor" name="inputCapacidad" value="<?php if(isset($inspeccion['capacidad_personas'])): echo $inspeccion['capacidad_personas']; endif; ?>" readonly>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputCapacidadKG">Capacidad en KG</label>
								<input type="number" class="form-control  form-control-sm" id="inputCapacidadKG" minlength="1" placeholder="Ingrese capacidad en KG" name="inputCapacidadKG" value="<?php if(isset($inspeccion['capacidad_kg'])): echo $inspeccion['capacidad_kg']; endif; ?>" readonly>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputSuspension">Suspension</label>
								<select id="selectSuspension" name="selectSuspension" class="custom-select custom-select-sm" readonly>
									<option selected>Seleccione una Suspension</option>
									<option value="3" <?php if(isset($inspeccion['id_suspension']) && ($inspeccion['id_suspension']) == 3): echo 'selected'; endif; ?>>Suspension Hidraulica</option>
									<option value="4" <?php if(isset($inspeccion['id_suspension']) && ($inspeccion['id_suspension']) == 4): echo 'selected'; endif; ?>>Suspension Mecanica</option>
								</select>
							</div>
							<div class="form-group col-sm-6">
								<label for="selectSalaMaquina">Sala de Maquinas</label>
								<select id="selectSalaMaquina" name="selectSalaMaquina" class="custom-select custom-select-sm" readonly>
									<option value="1" <?php if(isset($inspeccion['sala_maquinas']) && ($inspeccion['sala_maquinas']) == 1): echo 'selected'; endif; ?>>Si</option>
									<option value="2" <?php if(isset($inspeccion['sala_maquinas']) && ($inspeccion['sala_maquinas']) == 2): echo 'selected'; endif; ?>>No</option>
								</select>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputVelocidad">Velocidad</label>
								<input type="text" class="form-control  form-control-sm" id="inputVelocidad" minlength="1" placeholder="Ingrese Velocidad" name="inputVelocidad" value="<?php if(isset($inspeccion['velocidad'])): echo $inspeccion['velocidad']; endif; ?>" readonly>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputRecorrido">Recorrido</label>
								<input type="text" class="form-control  form-control-sm" id="inputRecorrido" minlength="1" placeholder="Ingrese Recorrido" name="inputRecorrido" value="<?php if(isset($inspeccion['recorrido'])): echo $inspeccion['recorrido']; endif; ?>" readonly>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputParadas">Paradas</label>
								<input type="text" class="form-control  form-control-sm" id="inputParadas" minlength="1" placeholder="Ingrese Paradas" name="inputParadas" value="<?php if(isset($inspeccion['paradas'])): echo $inspeccion['paradas']; endif; ?>" readonly>
							</div>
							<div class="form-group col-sm-6">
								<label for="selectTipoTraccion">Tipo Tracción</label>
								<select id="selectTipoTraccion" name="selectTipoTraccion" class="custom-select custom-select-sm" readonly>
									<option selected>Seleccione un Tipo Tracción</option>
									<option value="1" <?php if(isset($inspeccion['id_tipo_traccion']) && ($inspeccion['id_tipo_traccion']) == 1): echo 'selected'; endif; ?>>Cable</option>
									<option value="2" <?php if(isset($inspeccion['id_tipo_traccion']) && ($inspeccion['id_tipo_traccion']) == 2): echo 'selected'; endif; ?>>Cinta</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputCantidad">Cantidad</label>
								<input type="text" class="form-control  form-control-sm" id="inputCantidad" minlength="1" placeholder="Ingrese Cantidad" name="inputCantidad" value="<?php if(isset($inspeccion['cantidad'])): echo $inspeccion['cantidad']; endif; ?>" readonly>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputDiamCablesTraccion">Diametro de Traccion</label>
								<input type="text" class="form-control  form-control-sm" id="inputDiamTraccion" minlength="1" placeholder="Ingrese Diametro de Traccion" name="inputDiamTraccion" value="<?php if(isset($inspeccion['diametro_traccion'])): echo $inspeccion['diametro_traccion']; endif; ?>" readonly>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputEnclavamientoElectrico">Enclavamiento El&eacute;ctrico Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputEnclavamientoElectrico" minlength="1" placeholder="Ingrese Enclavamiento Electrico Limitador" name="inputEnclavamientoElectrico" value="<?php if(isset($inspeccion['enclavamiento_electrico'])): echo $inspeccion['enclavamiento_electrico']; endif; ?>" readonly>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputEnclavamientoMecanico">Enclavamiento Mec&aacute;nico Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputEnclavamientoMecanico" minlength="1" placeholder="Ingrese Enclavamiento Electrico Limitador" name="inputEnclavamientoMecanico" value="<?php if(isset($inspeccion['enclavamiento_mecanico'])): echo $inspeccion['enclavamiento_mecanico']; endif; ?>" readonly>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputDiamCableLimitador">Diametro Cable Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputDiamCableLimitador" minlength="1" placeholder="Ingrese Diametro Cable Limitador" name="inputDiamCableLimitador" value="<?php if(isset($inspeccion['diametro_cable'])): echo $inspeccion['diametro_cable']; endif; ?>" readonly>
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
								<input type="text" class="form-control" id="idNorma" minlength="1" placeholder="Seleccione una Norma" name="idNorma" value="<?php if(isset($respuesta_norma_respuesta[0]['id_norma'])): echo $respuesta_norma_respuesta[0]['id_norma']; endif; ?>" hidden>
								<input type="text" class="form-control" id="inputNorma" minlength="1" placeholder="Seleccione una Norma" name="inputNorma" readonly value="<?php if(isset($respuesta_norma_respuesta[0]['nombre'])): echo $respuesta_norma_respuesta[0]['codigo'].'-'.$respuesta_norma_respuesta[0]['nombre']; endif; ?>">
							</div>
						</div>
					</div>
				</div>

				<div id="acordeon" class="collapse show col-sm-12">
					<?php 
							$id_categoria_i = null;
                            $div = '';
                            for ($i = 0; $i < sizeof($respuesta_norma_respuesta); $i++) {
                                $id_categoria = $respuesta_norma_respuesta[$i]["id_categoria"];
                                $id_pregunta = $respuesta_norma_respuesta[$i]["id_pregunta"];
                                $cod_categoria = $respuesta_norma_respuesta[$i]["codigo_c"];
                                $categoria = $respuesta_norma_respuesta[$i]["categoria"];
                                $cod_pregunta = $respuesta_norma_respuesta[$i]["codigo_p"];
                                $pregunta = $respuesta_norma_respuesta[$i]["pregunta"];
                                $respuesta_pre_rb = $respuesta_norma_respuesta[$i]["respuesta"];
                                $observacion_pre_rb = $respuesta_norma_respuesta[$i]["obs_resp"];
                                $cant_archivos = $respuesta_norma_respuesta[$i]["cant_archivos"];

				                $nombre_archivo = ($respuesta_norma_respuesta[$i]["id"].'_'.$respuesta_norma_respuesta[$i]["id_resp"].'_'.$id_categoria.'_'.$id_pregunta.'_');
				                #var_dump($nombre_archivo);

                                $cant_preguntas = 0;

                                $contador++;

                                if ($id_categoria_i != $id_categoria)
                                {
                                    if ($id_categoria_i) {
                                        $div = $div.'</tbody>';
                                        $div = $div.'</table>';
                                        $div = $div.'</div>';
                                        $div = $div.'</div>';
                                    }

                                    $cantPreguntas = sizeof($respuesta_norma_respuesta);

                                    if ($cantPreguntas) {
                                        $cant_preguntas = $cantPreguntas.$cantPreguntas;
                                    }else{
                                        $cant_preguntas = 0;
                                    }

                                        
                                    $div = $div.'<div id="categoria'.$id_categoria.'" class="card card-body">';
                                    $div = $div.'<div class="table-responsive">';
                                    $div = $div.'<table id="tabla_'.$id_categoria.'" class="table">';
                                    $div = $div.'<thead>';
                                    $div = $div.'<tr class="border-1">';
                                    $div = $div.'<td colspan="3" class="ml-3 text-left">';
                                    $div = $div.'<h5 class="mb-0">';
                                    $div = $div.'<button id="button_cat_'.$id_categoria.'" class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#tbodyCategoria'.$id_categoria.'" aria-expanded="true" aria-controls="tbodyCategoria'.$id_categoria.'">';
                                    $div = $div.$cod_categoria.' - '.$categoria;
                                    $div = $div.'</button>';

                                    $div = $div.'</h5>';
                                    $div = $div.'</td>';
                                    $div = $div.'<td colspan="3" class="text-right">';
                                    #$div = $div.'<span id="conteo_'.$id_categoria.'" class="badge badge-danger badge-pill">0</span>  /  <span id="total_conteo_'.$id_categoria.'" class="badge badge-primary badge-pill">'.$cant_preguntas.'</span>';
                                    #$div = $div.'<a class="btn btn-link agregarObservacion" data-id="'.$id_categoria.'" data-codigo="'.$cod_categoria.'" data-nombre="'.$categoria.'" data-toggle="modal" data-target="#modalAgregarObservacion"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>';
                                    $div = $div.'</td>';
                                    $div = $div.'</tr>';
                                    $div = $div.'</thead>';
                                    //$div = $div.'<thead>';
                                    
                                    //$div = $div.'</thead>';
                                    $div = $div.'<tbody id="tbodyCategoria'.$id_categoria.'" class="collapse show" aria-labelledby="categoria'.$id_categoria.'" data-parent="#categoria'.$id_categoria.'" >';

                                    $div = $div.'<tr>';
                                    $div = $div.'<th scope="col" class="text-center align-middle">#</th>';
                                    $div = $div.'<th scope="col" class="text-center align-middle">Codigo</th>';
                                    $div = $div.'<th scope="col" class="text-center align-middle">Pregunta</th>';
                                    $div = $div.'<th scope="col" class="text-center align-middle">SI</th>';
                                    $div = $div.'<th scope="col" class="text-center align-middle">NO</th>';
                                    $div = $div.'<th scope="col" class="text-center align-middle">N/A</th>';
                                    $div = $div.'</tr>';


                                    $div = $div.'<tr class="pregunta'.$id_categoria.'_'.$id_pregunta.' preguntas">';
                                    $div = $div.'<th class="text-center align-middle"><p>'.$id_categoria.'_'.$id_pregunta.'</p></th>';
                                    $div = $div.'<th class="text-center align-middle"><p>'.$cod_pregunta.'</p></th>';
                                    $div = $div.'<td class="text-center align-middle"><p>'.$pregunta.'</p></td>';
                                    $div = $div.'<td class="text-center align-middle radio"><input type="radio" id="rbPregunta'.$contador.'_SI" name="rbPregunta'.$contador./*,id_categoria,'_',id_pregunta,*/'" class="pauta rbSI" data-id_categoria="'.$id_categoria.'" data-id_pregunta="'.$id_pregunta.'" value="si-'.$id_categoria.'_'.$id_pregunta.'" '.($respuesta_pre_rb == 1 ? 'checked' : '').'></td>';
                                    $div = $div.'<td class="text-center align-middle radio"><input type="radio" id="rbPregunta'.$contador.'_NO" name="rbPregunta'.$contador./*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNO" data-id_categoria="'.$id_categoria.'" data-id_pregunta="'.$id_pregunta.'" value="no-'.$id_categoria.'_'.$id_pregunta.'" '.($respuesta_pre_rb == 2 ? 'checked' : '').'></td>';
                                    $div = $div.'<td class="text-center align-middle radio"><input type="radio" id="rbPregunta'.$contador.'_NA" name="rbPregunta'.$contador./*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNA" data-id_categoria="'.$id_categoria.'" data-id_pregunta="'.$id_pregunta.'" value="na-'.$id_categoria.'_'.$id_pregunta.'" '.($respuesta_pre_rb == 3 ? 'checked' : '').'></td>';
                                    $div = $div.'</tr>';
                                    
                                    $div = $div.'<tr>';
                                    $div = $div.'<td id="cat_pre_'.$id_categoria.'_'.$id_pregunta.'" class="collapse '.($respuesta_pre_rb == 2 ? 'show' : '').'" colspan="6">';
                                    $div = $div.'<div class="card card-body">';
                                    $div = $div.'<div class="row">';
                                    $div = $div.'<div class="col-sm-6">';
                                    $div = $div.'<label for="inputObservaciones'.$id_categoria.'_'.$id_pregunta.'">Observaciones</label>';
                                    $div = $div.'<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones'.$contador./*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones'.$contador./*,id_categoria,'_',id_pregunta,*/'" rows="2">'.($respuesta_pre_rb == 2 ? $observacion_pre_rb : '').'</textarea>';
                                    $div = $div.'</div>';
                                    $div = $div.'<div id="div_'.$id_categoria.'_'.$id_pregunta.'" class="col-sm-6 row">';

                                    //$div = $div.'<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalFoto">Tomar una Foto</button>';
                                    
                                    #$div = $div.'<div class="col-sm-2">';
                                    #$div = $div.'<button type="button" class="btn btn-primary tomarFoto" data-toggle="modal" data-target="#modalFoto" data-id="'.$id_categoria.'_'.$id_pregunta.'">Tomar una Foto</button>';
                                    #$div = $div.'</div>';

                                    if ($respuesta_pre_rb == 2 && is_numeric($cant_archivos)) {
                                    	for ($g=0; $g < (int)$cant_archivos; $g++) { 
                                    		$div = $div.'<div class="col-sm-2" id="div_image_'.$id_categoria.'_'.$id_pregunta.'_'.strval($g+1).'">';
                                    		$div = $div.'<img id="picture_'.$id_categoria.'_'.$id_pregunta.'_'.strval($g+1).'" class="img-fluid" src="'.base_url().'assets/files/image/'.strval($nombre_archivo.($g+1)).'.png" width="150">';
                                    		$div = $div.'</div>';
                                    	}
                                    }
                                    
                                    //$div = $div.'<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>';
                                    //$div = $div.'<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>';
                                    $div = $div.'</div>';
                                    $div = $div.'</div>';
                                    $div = $div.'</div>';
                                    $div = $div.'</td>';
                                    $div = $div.'</tr>';

                                    $id_categoria_i = $id_categoria;
                                }else{

                                    $div = $div.'<tr class="pregunta'.$id_categoria.'_'.$id_pregunta.' preguntas">';
                                    $div = $div.'<th class="text-center align-middle"><p>'.$id_categoria.'_'.$id_pregunta.'</p></th>';
                                    $div = $div.'<th class="text-center align-middle"><p>'.$cod_pregunta.'</p></th>';
                                    $div = $div.'<td class="text-center align-middle"><p>'.$pregunta.'</p></td>';
                                    $div = $div.'<td class="text-center align-middle radio"><input type="radio" id="rbPregunta'.$contador.'_SI" name="rbPregunta'.$contador.'" class="pauta rbSI" data-id_categoria="'.$id_categoria.'" data-id_pregunta="'.$id_pregunta.'" value="si-'.$id_categoria.'_'.$id_pregunta.'" '.($respuesta_pre_rb == 1 ? 'checked' : '').'></td>';
                                    $div = $div.'<td class="text-center align-middle radio"><input type="radio" id="rbPregunta'.$contador.'_NO" name="rbPregunta'.$contador.'" class="pauta rbNO" data-id_categoria="'.$id_categoria.'" data-id_pregunta="'.$id_pregunta.'" value="no-'.$id_categoria.'_'.$id_pregunta.'" '.($respuesta_pre_rb == 2 ? 'checked' : '').'></td>';
                                    $div = $div.'<td class="text-center align-middle radio"><input type="radio" id="rbPregunta'.$contador.'_NA" name="rbPregunta'.$contador.'" class="pauta rbNA" data-id_categoria="'.$id_categoria.'" data-id_pregunta="'.$id_pregunta.'" value="na-'.$id_categoria.'_'.$id_pregunta.'" '.($respuesta_pre_rb == 3 ? 'checked' : '').'></td>';
                                    $div = $div.'</tr>';
                                    
                                    $div = $div.'<tr>';
                                    $div = $div.'<td id="cat_pre_'.$id_categoria.'_'.$id_pregunta.'" class="collapse '.($respuesta_pre_rb == 2 ? 'show' : '').'" colspan="6">';
                                    $div = $div.'<div class="card card-body">';
                                    $div = $div.'<div class="row">';
                                    $div = $div.'<div class="col-sm-6">';
                                    $div = $div.'<label for="inputObservaciones'.$id_categoria.'_'.$id_pregunta.'">Observaciones</label>';
                                    $div = $div.'<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones'.$contador.'" name="inputObservaciones'.$contador.'" rows="2">'.($respuesta_pre_rb == 2 ? $observacion_pre_rb : '').'</textarea>';                                    
                                    $div = $div.'</div>';

                                    $div = $div.'<div id="div_'.$id_categoria.'_'.$id_pregunta.'" class="col-sm-6 row">';
                                    #$div = $div.'<div class="col-sm-2">';
                                    #$div = $div.'<button type="button" class="btn btn-primary tomarFoto" data-toggle="modal" data-target="#modalFoto" data-id="'.$id_categoria.'_'.$id_pregunta.'">Tomar una Foto</button>';
                                    #$div = $div.'</div>';

                                    
                                    if ($respuesta_pre_rb == 2 && is_numeric($cant_archivos)) {
                                    	for ($g=0; $g < (int)$cant_archivos; $g++) { 
                                    		$div = $div.'<div class="col-sm-2" id="div_image_'.$id_categoria.'_'.$id_pregunta.'_'.strval($g+1).'">';
                                    		$div = $div.'<img id="picture_'.$id_categoria.'_'.$id_pregunta.'_'.strval($g+1).'" class="img-fluid" src="'.base_url().'assets/files/image/'.strval($nombre_archivo.($g+1)).'.png" width="150">';
                                    		$div = $div.'</div>';
                                    	}
                                    }
                                    
                                    //$div = $div.'<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>';
                                    //$div = $div.'<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>';
                                    $div = $div.'</div>';
                                    $div = $div.'</div>';
                                    $div = $div.'</div>';
                                    $div = $div.'</td>';
                                    $div = $div.'</tr>';
                                }
                            }
                            #$div = $div.'</div>';
                            #$div = $div.'</div>';
                            echo $div;
                ?>


				</div>	
		</div>
	</div>
</div>

<div id="loader" class="loader" hidden></div>
