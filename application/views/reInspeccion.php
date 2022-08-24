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
					<input type="text" class="form-control form-control-sm" id="inputEsTemporal" name="inputEsTemporal" value="<?php if(isset($inspeccion['es_temporal'])): echo $inspeccion['es_temporal']; endif; ?>" hidden>
					<input type="text" class="form-control form-control-sm" id="inputReinspeccion" name="inputReinspeccion" value="<?php if(isset($reinspeccion['id'])): echo $reinspeccion['id']; endif; ?>" hidden>
					<input type="text" class="form-control form-control-sm" id="es_reinspeccion" name="es_reinspeccion" value="<?php if(isset($reinspeccion['reinspeccion'])): echo $reinspeccion['reinspeccion']; endif; ?>" hidden>
				</div>

				<div class="row">
					<div class="col-sm-12 mb-5">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="user-check" ></i> PARTICIPANTES EN LA REVISION</h5>
					</div>
					<div class="form-group col-sm-6">
						<label for="inputTecnico">Nombre del Tecnico</label>
						<input type="text" class="form-control  form-control-sm" id="inputTecnico" minlength="1" placeholder="Ingrese Nombre del Tecnico" name="inputTecnico" value="<?php if(isset($inspeccion['nombre_tecnico'])): echo $inspeccion['nombre_tecnico']; endif; ?>">
					</div>

					<div class="form-group col-sm-6">
						<label for="inputTecnico">Cantidad de Ascensores</label>
						<input type="text" class="form-control  form-control-sm" id="inputCantAscensor" minlength="1" placeholder="Ingrese Cantidad de Ascensores" name="inputCantAscensor" value="<?php if(isset($inspeccion['cantidad_ascensor'])): echo $inspeccion['cantidad_ascensor']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
					</div>
				</div>

				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputNumInforme">N&uacute;mero de Informe</label>
						<input type="text" class="form-control  form-control-sm" id="inputNumInforme" minlength="1" placeholder="Ingrese Nombre del Tecnico" name="inputNumInforme" value="<?php if(isset($inspeccion['num_informe'])): echo $inspeccion['num_informe']; endif; ?>">
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12 mb-5">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="edit" ></i> ANTECEDENTES DEL EDIFICIO</h5>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombreE">Nombre del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreE" minlength="1" placeholder="Ingrese Nombre del Edificio" name="inputNombreE" value="<?php if(isset($inspeccion['edificio'])): echo $inspeccion['edificio']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputDireccionE">Direccion del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputDireccionE" minlength="1" placeholder="Ingrese Direccion del Edificio" name="inputDireccionE" value="<?php if(isset($inspeccion['domicilio'])): echo $inspeccion['domicilio']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputRutE">Rut del Edificio</label>
								<input type="text" class="form-control  form-control-sm" id="inputRutE" minlength="1" placeholder="Ingrese un Rut del Edificio" name="inputRutE" value="<?php if(isset($inspeccion['rut_e'])): echo $inspeccion['rut_e']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputIdE">Id de Ascensor</label>
								<input type="text" class="form-control  form-control-sm" id="inputIdE" minlength="1" placeholder="Ingrese un Id de Ascensor" name="inputIdE" value="<?php if(isset($inspeccion['rol'])): echo $inspeccion['rol']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombreA">Nombre administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreA" minlength="1" placeholder="Ingrese un Nombre administrador" name="inputNombreA" value="<?php if(isset($inspeccion['nombre_admin'])): echo $inspeccion['nombre_admin']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputRutA">RUT administrador</label>
								<input type="text" class="form-control  form-control-sm" id="inputRutA" minlength="1" placeholder="Ingrese un RUT administrador" name="inputRutA" value="<?php if(isset($inspeccion['rut_admin'])): echo $inspeccion['rut_admin']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputEmailA">Email administrador</label>
								<input type="email" class="form-control  form-control-sm" id="inputEmailA" minlength="1" placeholder="Ingrese un Email administrador" name="inputEmailA" value="<?php if(isset($inspeccion['email_admin'])): echo $inspeccion['email_admin']; endif; ?>" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
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

							<div class="form-group col-10 col-sm-4">
								<label for="inputEmpresaMantenedora">Empresa Mantenedora</label>
								<input type="text" class="form-control" id="idEmpresaMantenedora" minlength="1" name="idEmpresaMantenedora" value="<?php if(isset($inspeccion['id_empresa_mantenedora'])): echo $inspeccion['id_empresa_mantenedora']; endif; ?>" hidden>
								<input type="text" class="form-control  form-control-sm" id="inputEmpresaMantenedora" minlength="1" placeholder="Seleccione una Empresa Mantenedora" name="inputEmpresaMantenedora" value="<?php if(isset($inspeccion['rut_em'])): echo $inspeccion['rut_em'].' - '; endif; if(isset($inspeccion['razon_social'])): echo $inspeccion['razon_social']; endif;?>" readonly>
							</div>
							<div class="form-group col-2 col-sm-2 pt-1">
								<div class="align-middle pt-2" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'hidden'; endif; ?>>
									<button href="SeleccionarEmpresa" class="btn btn-link align-middle text-center pt-4" type="button" id="btnBuscarEmpresa"  data-toggle="modal" data-target="#modalBuscarEmpresa" style="padding-top: 6px;" <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
										<i stop-color data-feather="search" class="mb-2" data-toggle="tooltip" data-placement="top" title="Seleccionar una Empresa Mantenedora"></i>
									</button>
								</div>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombreRM">Nombre de quien realiza la mantención</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreRM" minlength="1" placeholder="Ingrese un Nombre de quien realiza la mantención" name="inputNombreRM" value="<?php if(isset($inspeccion['nombre_mant_2'])): echo $inspeccion['nombre_mant_2']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
							<div class="form-group col-sm-6">
								<label for="inputFechaUM">Fecha de la última mantención</label>
								<input type="date" class="form-control  form-control-sm" id="inputFechaUM" minlength="1" placeholder="Ingrese un Fecha de la última mantención" name="inputFechaUM" value="<?php if(isset($inspeccion['fecha_ultima_mant'])): echo $inspeccion['fecha_ultima_mant']; endif; ?>">
								<!--<span>Se requiere un Nombre de Equipo.</span>-->
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-12 mb-5">
						<hr class="my-3">
						<h5 class="mb-3"><i class="mb-2" data-feather="folder" ></i> CARPETA T&Eacute;CNICA</h5>

						<div class="form-group col-sm-12">
							<label for="inputNombre">Contiene Carpeta T&eacute;cnica ?</label>
							<div class="btn-group" role="group" aria-label="Basic example">
							  <button id="rbSiCarpeta" type="button" class="btn btn-primary">Si</button>
							  <button id="rbNoCarpeta" type="button" class="btn btn-danger">No</button>
							</div>
						</div>


						<div id="acordeonCarpeta" class="collapse <?php echo (isset($respuesta_carpetas) && sizeof($respuesta_carpetas) > 0 ? 'show' : ''); ?> col-sm-12">
							<table class="table">
							  <thead>
							    <tr>
							      <!--<th scope="col" class="text-left align-middle">#</th>-->
							      <th scope="col" class="text-left align-middle">CARPETA T&Eacute;CNICA</th>
							      <th scope="col" class="text-left align-middle">SI</th>
							      <th scope="col" class="text-left align-middle">NO</th>
							    </tr>
							  </thead>

							  <tbody id="tbodyCarpetas">
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
									        <!--<th class="text-left align-middle"><p><?php echo $carpeta['codigo']; ?></p></th>-->
									        <td class="text-left align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>
									        <td class="text-left align-middle"><input type="radio" id="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>_si" name="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>" class="pauta_carpeta" value="si-<?php echo $carpeta['id']; ?>"  <?php echo (isset($respuesta_carpeta_rb) && $respuesta_carpeta_rb === 1 ? 'checked' : ''); ?> <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="yes"'; endif; ?>></td>
							      			<td class="text-left align-middle"><input type="radio" id="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>_no" name="rbCarpeta<?php echo $contador;#echo $carpeta['id']; ?>" class="pauta_carpeta" value="no-<?php echo $carpeta['id']; ?>" <?php echo (isset($respuesta_carpeta_rb) && $respuesta_carpeta_rb === 0 ? 'checked' : ''); ?> <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="yes"'; endif; ?>></td>
								    	</tr>
								  		<?php 
								  		endforeach;
								  		echo '<input type="text" class="form-control" id="inputTotalCarpetas" minlength="1" name="inputTotalCarpetas" value="'.$contador.'" hidden>';
						  		}?>
					  		  </tbody>
							</table>
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
								      <th scope="col" class="text-left align-middle">#</th>
								      <th scope="col" class="text-left align-middle">NORMA</th>
								      <th scope="col" class="text-left align-middle">SI</th>
								      <th scope="col" class="text-left align-middle">NO</th>
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
										        <th class="text-left align-middle"><p><?php echo $norma['codigo']; ?></p></th>
										        <td class="text-left align-middle"><p><?php echo $norma['nombre']; ?></p></td>
										        <td class="text-left align-middle"><input type="radio" id="rbNorma<?php echo $contador;#$norma['id']; ?>_si" name="rbNorma<?php echo $contador;#$norma['id']; ?>" class="pauta" value="si-<?php echo $norma['id']; ?>" <?php echo (isset($respuesta_norma_rb) && !is_null($respuesta_norma_rb) && $respuesta_norma_rb === 1 ? 'checked' : ''); ?> <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="yes"'; endif; ?>></td>
								      			<td class="text-left align-middle"><input type="radio" id="rbNorma<?php echo $contador;#$norma['id']; ?>_no" name="rbNorma<?php echo $contador;#$norma['id']; ?>" class="pauta" value="no-<?php echo $norma['id']; ?>" <?php echo (isset($respuesta_norma_rb) && !is_null($respuesta_norma_rb) && $respuesta_norma_rb === 0 ? 'checked' : ''); ?> <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="yes"'; endif; ?>></td>
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
						<h5 class="mb-3"><i class="mb-2" data-feather="tool" ></i> EQUIPOS Y HERRAMIENTAS y EPP UTILIZADOS UTILIZADAS PARA LA REVISION</h5>

						<div class="row">
							<div class="form-group col-sm-12">
								<table class="table">
								  <thead>
								    <tr>
								      <th scope="col" class="text-left align-middle">#</th>
								      <th scope="col" class="text-left align-middle">EQUIPO Y HERRAMIENTA</th>
								      <th scope="col" class="text-left align-middle">SI</th>
								      <th scope="col" class="text-left align-middle">NO</th>
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
										        <th class="text-left align-middle"><p><?php echo $herramienta['codigo']; ?></p></th>
										        <td class="text-left align-middle"><p><?php echo $herramienta['nombre']; ?></p></td>
										        <td class="text-left align-middle"><input type="radio" id="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>_si" name="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>" class="pauta" value="si-<?php echo $herramienta['id']; ?>" <?php echo (isset($respuesta_herramienta_rb) && !is_null($respuesta_herramienta_rb) && $respuesta_herramienta_rb === 1 ? 'checked' : ''); ?> <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="yes"'; endif; ?>></td>
								      			<td class="text-left align-middle"><input type="radio" id="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>_no" name="rbHerramienta<?php echo $contador;#$herramienta['id']; ?>" class="pauta" value="no-<?php echo $herramienta['id']; ?>" <?php echo (isset($respuesta_herramienta_rb) && !is_null($respuesta_herramienta_rb) && $respuesta_herramienta_rb === 0 ? 'checked' : ''); ?> <?php  if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="yes"'; endif; ?>></td>
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
						<h5><i class="mb-2" data-feather="edit" ></i> ANTECEDENTES DEL ASCENSOR</h5>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputMarca">Marca</label>
								<input type="text" class="form-control  form-control-sm" id="inputMarca" minlength="1" placeholder="Ingrese Marca del Ascensor" name="inputMarca" value="<?php if(isset($inspeccion['marca_ascensor'])): echo $inspeccion['marca_ascensor']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
							<div class="form-group col-sm-6">
								<label for="selectUso">Uso</label>
								<select id="selectUso" name="selectUso" class="custom-select custom-select-sm" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="true"'; endif; ?>>
									<?php 
								 		if(isset($usos))
								 		{
								 			
								 			$opciones = '';
								 			foreach ($usos as $uso) {
								 				$selected = ''; 
								 				if (isset($inspeccion['id_uso']) && $inspeccion['id_uso'] == $uso['id']) {
								 					$selected = 'selected';
								 				}
								 				$opciones.= '<option value="'.$uso['id'].'" '.$selected.'>'.$uso['nombre'].'</option>';
								 			}
								 			if (strlen($selected) > 0 ) {
								 				$opciones = '<option>Seleccione un Uso</option>'.$opciones;
								 			}else{
								 				$opciones = '<option value="-1" selected>Seleccione un Uso</option>'.$opciones;
								 			}
								 			echo $opciones;
								 		}
								 	?>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputCapacidad">Capacidad de Personas</label>
								<input type="number" class="form-control  form-control-sm" id="inputCapacidad" minlength="1" placeholder="Ingrese capacidad del Ascensor" name="inputCapacidad" value="<?php if(isset($inspeccion['capacidad_personas'])): echo $inspeccion['capacidad_personas']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputCapacidadKG">Capacidad en KG</label>
								<input type="number" class="form-control  form-control-sm" id="inputCapacidadKG" minlength="1" placeholder="Ingrese capacidad en KG" name="inputCapacidadKG" value="<?php if(isset($inspeccion['capacidad_kg'])): echo $inspeccion['capacidad_kg']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputSuspension">Suspension</label>
								<select id="selectSuspension" name="selectSuspension" class="custom-select custom-select-sm" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="true"'; endif; ?>>
									<option value="-1" selected>Seleccione una Suspension</option>
									<?php if(isset($suspensiones)) {
				        					foreach ($suspensiones as $suspension): 
				        						$selected = ''; 
								 				if (isset($inspeccion['id_suspension']) && $inspeccion['id_suspension'] == $suspension['id']) {
								 					$selected = 'selected';
								 				}
				        						?>
												<option value="<?php if(isset($suspension['id'])): echo $suspension['id']; endif; ?>" data-grupo="<?php if(isset($suspension['grupo_suspension'])): echo $suspension['grupo_suspension']; endif; ?>" <?php echo $selected;?>><?php if(isset($suspension['nombre'])): echo $suspension['nombre']; endif; ?></option>
									<?php endforeach;
										} ?>
								</select>
							</div>
							<div class="form-group col-sm-6">
								<label for="selectSalaMaquina">Sala de Maquinas</label>
								  <select id="selectSalaMaquina" name="selectSalaMaquina" class="custom-select custom-select-sm" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="true"'; endif; ?>>
									<option value="1" <?php if(isset($inspeccion['sala_maquinas']) && $inspeccion['sala_maquinas'] == 1): echo "selected"; endif; ?>>Si</option>
									<option value="2" <?php if(isset($inspeccion['sala_maquinas']) && $inspeccion['sala_maquinas'] == 2): echo "selected"; endif; ?>>No</option>
								</select>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputVelocidad">Velocidad</label>
								<input type="text" class="form-control  form-control-sm" id="inputVelocidad" minlength="1" placeholder="Ingrese Velocidad" name="inputVelocidad" value="<?php if(isset($inspeccion['velocidad'])): echo $inspeccion['velocidad']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputRecorrido">Recorrido</label>
								<input type="text" class="form-control  form-control-sm" id="inputRecorrido" minlength="1" placeholder="Ingrese Recorrido" name="inputRecorrido" value="<?php if(isset($inspeccion['recorrido'])): echo $inspeccion['recorrido']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputParadas">Paradas</label>
								<input type="text" class="form-control  form-control-sm" id="inputParadas" minlength="1" placeholder="Ingrese Paradas" name="inputParadas" value="<?php if(isset($inspeccion['paradas'])): echo $inspeccion['paradas']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
							<div class="form-group col-sm-6">
								<label for="selectTipoTraccion">Tipo Tracción</label>
								<select id="selectTipoTraccion" name="selectTipoTraccion" class="custom-select custom-select-sm" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'disabled="true"'; endif; ?>>
									<option value="-1" selected>Seleccione un Tipo Tracción</option>

									<?php if(isset($tipos_traccion)) {

											$id_grupo_suspension = null;
											if (isset($inspeccion['id_suspension'])) {
												$id_suspension = $inspeccion['id_suspension'];
												$grupo_seleccionado = array_filter($suspensiones, function($val) use($id_suspension){
								              		return ($val['id']== $id_suspension);
								         		});

												reset($grupo_seleccionado);
												$first_key = key($grupo_seleccionado);


								         		if (sizeof($grupo_seleccionado) > 0) {
								         			$id_grupo_suspension = $grupo_seleccionado[$first_key]["grupo_suspension"];
								         		}
											}

				        					foreach ($tipos_traccion as $traccion): 
				        						$selected = ''; 
								 				if (isset($inspeccion['id_tipo_traccion']) && $inspeccion['id_tipo_traccion'] == $traccion['id']) {
								 					$selected = 'selected';
								 				}
				        						?>
												<option value="<?php if(isset($traccion['id'])): echo $traccion['id']; endif; ?>" data-grupo="<?php if(isset($traccion['grupo_suspension'])): echo $traccion['grupo_suspension']; endif; ?>" <?php if(isset($id_grupo_suspension) && !is_null($id_grupo_suspension) && isset($traccion['grupo_suspension']) && !is_null($traccion['grupo_suspension']) && $id_grupo_suspension != $traccion['grupo_suspension']): echo 'hidden'; endif; echo $selected; ?>><?php if(isset($traccion['nombre'])): echo $traccion['nombre']; endif; ?></option>
									<?php endforeach;
										} ?>
								</select>
							</div>
						</div>

						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputCantidad">Cantidad</label>
								<input type="text" class="form-control  form-control-sm" id="inputCantidad" minlength="1" placeholder="Ingrese Cantidad" name="inputCantidad" value="<?php if(isset($inspeccion['cantidad'])): echo $inspeccion['cantidad']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputDiamCablesTraccion">Diametro de Traccion</label>
								<input type="text" class="form-control  form-control-sm" id="inputDiamTraccion" minlength="1" placeholder="Ingrese Diametro de Traccion" name="inputDiamTraccion" value="<?php if(isset($inspeccion['diametro_traccion'])): echo $inspeccion['diametro_traccion']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputEnclavamientoElectrico">Enclavamiento El&eacute;ctrico Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputEnclavamientoElectrico" minlength="1" placeholder="Ingrese Enclavamiento Electrico Limitador" name="inputEnclavamientoElectrico" value="<?php if(isset($inspeccion['enclavamiento_electrico'])): echo $inspeccion['enclavamiento_electrico']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
							<div class="form-group col-sm-6">
								<label for="inputEnclavamientoMecanico">Enclavamiento Mec&aacute;nico Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputEnclavamientoMecanico" minlength="1" placeholder="Ingrese Enclavamiento Electrico Limitador" name="inputEnclavamientoMecanico" value="<?php if(isset($inspeccion['enclavamiento_mecanico'])): echo $inspeccion['enclavamiento_mecanico']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputDiamCableLimitador">Diametro Cable Limitador</label>
								<input type="text" class="form-control  form-control-sm" id="inputDiamCableLimitador" minlength="1" placeholder="Ingrese Diametro Cable Limitador" name="inputDiamCableLimitador" value="<?php if(isset($inspeccion['diametro_cable'])): echo $inspeccion['diametro_cable']; endif; ?>" <?php if(isset($reinspeccion['reinspeccion']) && $reinspeccion['reinspeccion'] == 1): echo 'readonly'; endif; ?>>
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
					<div class="col-sm-12">
						<h5><i class="mb-2" data-feather="clipboard" ></i> CHECKLIST # 1</h5>
					</div>

					<div class="col-10 col-sm-4">
						<label for="inputNorma">Norma</label>
						<input type="text" class="form-control" id="idNorma" minlength="1" placeholder="Seleccione una Norma" name="idNorma" value="<?php if(isset($respuesta_norma_respuesta[0]['id_norma'])): echo $respuesta_norma_respuesta[0]['id_norma']; endif; ?>" hidden>
						<input type="text" class="form-control" id="inputNorma" minlength="1" placeholder="Seleccione una Norma" name="inputNorma" value="<?php if(isset($respuesta_norma_respuesta[0]['nombre'])): echo $respuesta_norma_respuesta[0]['nombre']; endif; ?>" readonly>
					</div>
					<div class="col-2 col-sm-2 pt-1">
						<div class="align-middle pt-2">
							<button href="SeleccionarNorma" class="btn btn-link align-middle text-center pt-4" type="button" id="btnBuscarNorma"  data-toggle="modal" data-target="#modalBuscarNorma">
								<i stop-color data-feather="plus" data-toggle="tooltip" data-placement="top" title="Seleccionar una Norma"></i>
							</button>
						</div>
					</div>

				</div>

				<div class="accordion mt-3" id="acordionCategorias"></div>
				<div class="row">
					<div class="col-sm-12">
						<hr class="my-3">
						<h5><i class="mb-2" data-feather="eye" ></i> Observaciones Generales</h5>
					</div>
				</div>
				<div class="row mt-3 row" id="observacionesGenerales">
					<!--<?php /*if(isset($observaciones_generales) && sizeof($observaciones_generales) > 0)
				        {
				        	$contador = 0;
					        foreach ($observaciones_generales as $observacion_general): var_dump($observacion_general); ?>
					        	<div class="float-sm-left m-3" id="div_contenedor_<?php echo $observacion_general["orden"]; ?>">
									<div class="card border-secondary" style="width: 18rem;">
										<img alt="Alt information for image" class="img-fluid rounded float-left" src="<?php echo base_url().'assets/files/image/'.$observacion_general["file_name"]; ?>" id="imagen_<?php echo $observacion_general["orden"]; ?>">
										<div class="card-body text-secondary">
											<input type="text" class="form-control  form-control-sm" id="input_obs_<?php echo $observacion_general["id_categoria"].'-'.$observacion_general["archivo_id"].'_'.$observacion_general["orden"]; ?>" name="input_obs_<?php echo $observacion_general["id_categoria"].'-'.$observacion_general["archivo_id"].'_'.$observacion_general["orden"]; ?>" hidden="true">
											<h5 class="card-title"><?php echo $observacion_general["orden"].'.- "'.$observacion_general["codigo_categoria"]."_".$observacion_general["categoria"]; ?>"</h5>
											<p class="card-text"><?php echo $observacion_general["observaciones"]; ?></p>
											<a class="btn btn-outline-danger eliminarObservacion" data-id="<?php echo $observacion_general["id_categoria"]; ?>" data-codigo="<?php echo $observacion_general["codigo_categoria"]; ?>" data-nombre="<?php echo $observacion_general["categoria"]; ?>" data-cant="<?php echo $observacion_general["orden"]; ?>">
												<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i> Eliminar Observaci&oacute;n
											</a>
										</div>
									</div>
									<input type="file" id="picture_<?php echo $observacion_general["id_categoria"].'_'.$observacion_general["orden"]; ?>" name="picture_<?php echo $observacion_general["id_categoria"].'_'.$observacion_general["orden"]; ?>" hidden="true">
								</div>
					<?php   endforeach;
					} */ ?>-->
				</div>

				<div id="botones" class="row mt-5 mb-5">
					<div class="col-6 text-left">
						<a class="btn btn-link"  href="<?php echo base_url();?>Inspeccion/listarInspecciones">Volver</a>
					</div>
					<div  class="col-6 text-right">
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
												        <label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span id="span_foto" data-localize="capture">FOTO</span></label>
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

        <div id="dObsGenerales" class="row justify-content-md-center" hidden>
			<div class="form-group col-sm-10">
				<label for="inputObservaciones">Observaciones Generales</label>
				<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="4"></textarea>
			</div>
		</div>
		
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
        <button id="seleccionarFoto" type="button" class="btn btn-info" data-dismiss="modal" data-id="" data-codigo="" data-nombre="" data-cant="">Seleccionar Foto</button>
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
				<table id="tListaNormas" class="table table-sm table-hover table-condensed table-bordered">
					<thead class="thead-dark">
						<tr>
							<th scope="col" class="texto-pequenio text-center align-middle registro" style="width: 20% !important"># ID</th>
						    <th scope="col" class="texto-pequenio text-center align-middle registro" style="width: 30% !important">Nombre</th>
						    <th scope="col" class="texto-pequenio text-center align-middle registro">Observaci&oacute;n</th>
						    <!--<th scope="col" class="texto-pequenio text-center align-middle registro"></th>-->
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
							        <td class="text-center align-middle registro celdaAsignado"><p class=""><?php echo $norma['observaciones']; ?></p></td>
							        <!--<td class="text-center align-middle registro botonTabla paginate_button">
						        		<button href="#" aria-controls="tListaNormas" data-id="<?php echo $norma['id']; ?>" data-nombre="<?php echo $norma['nombre']; ?>" tabindex="0" class="btn btn-outline-dark seleccionNorma">Seleccionar</button>
						        	</td>-->
						    	</tr>
					  		<?php endforeach;
				  		}?>
				  </tbody>
				</table>
			</div>
      	</div>
		<div class="modal-footer">
			<button id="btnCerrarBN" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			<button id="btnSeleccionarBN" type="button" class="btn btn-success" data-dismiss="modal">Seleccionar</button>
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
			<div id="dAgregarEmpresa" class="col-sm-12 text-right">
				<button type="button" class="btn btn-link" data-toggle="modal" data-target="#modalAgregarEmpresa"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Empresa</button>
			</div>
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


<div class="modal fade" id="modalAgregarEmpresa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
		<div class="modal-header">
			<h5 class="modal-title" id="tituloMP">
				<i class="plusTitulo mb-2" data-feather="plus" ></i>
				Agregar Empresa
			</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
		</div>
		<div class="modal-body">
			<form id="agregarEmpresa" action="agregarEmpresa" method="POST">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdEmpresa" name="inputIdEmpresa" value="" hidden>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputRut">R.U.T.</label>
						<input type="text" class="form-control  form-control-sm" id="inputRut" minlength="1" placeholder="Ingrese un R.U.T. de la Empresa" name="inputRut" value="">
					</div>
					<div class="form-group col-sm-6">
						<label for="inputRazonSocial">Raz&oacute;n Social</label>
						<input type="text" class="form-control  form-control-sm" id="inputRazonSocial" minlength="1" placeholder="Ingrese una Raz&oacute;n Social de la Empresa" name="inputRazonSocial" value="">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputNumRegistro">N° Registro</label>
						<input type="text" class="form-control  form-control-sm" id="inputNumRegistro" minlength="1" placeholder="Ingrese un N° de Registro de la Empresa" name="inputNumRegistro" value="">
					</div>
					<div class="form-group col-sm-6">
						<label for="inputDireccion">Direcci&oacute;n</label>
						<input type="text" class="form-control  form-control-sm" id="inputDireccion" minlength="1" placeholder="Ingrese una Dirección de la Empresa" name="inputDireccion" value="">
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputEmail">Email</label>
						<input type="text" class="form-control  form-control-sm" id="inputEmail" minlength="1" placeholder="Ingrese una Email de la Empresa" name="inputEmail" value="">
					</div>
					<div class="form-group col-sm-6">
						<label for="inputObservaciones">Observaciones</label>
						<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="2"></textarea>
					</div>
				</div>
			</form>			
      	</div>
		<div class="modal-footer">
			<button id="btnCerrarAE" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			<button id="btnAgregarE" type="button" class="btn btn-success">Agregar Empresa</button>
		</div>
    </div>
  </div>
</div>

<!-- Modal Mensaje -->
<div class="modal fade" id="modalMensajeEmpresa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloME" name="tituloME" data-idprograma="" data-nombreprograma="" ></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<p id="parrafoME"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
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


      	<!--<div class="api">
            <canvas id="photo" class="hide" style="display:none;" height="720" width="1280"></canvas>
            <canvas id="rotated" class="hide" style="display:none;" height="720" width="1280"></canvas>
            <img id="camera" src="" alt="" style="display:none">
            <div class="row">
                <div class="col-md-8 mx-auto">
                  
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
												        <label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span id="span_foto" data-localize="capture">FOTO</span></label>
												        <a href="#" class="btn btn-success take-photo">
												        	<i data-feather="camera"></i>
												        </a>
												        <a href="#" class="btn btn-warning refrescar">
												        	<i data-feather="refresh-ccw"></i>
												    	</a>
									            	</div>
									            </div>
									    </fieldset>
									</div>
								</div>
	                        </div>
	                    </div>
                    </div>
                </div>
            </div>
        </div>-->

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