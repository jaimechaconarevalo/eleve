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
			<form id="agregarPregunta" action="agregarPregunta" method="POST">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdPregunta" name="inputIdPregunta" value="<?php if(isset($pregunta['id'])): echo $pregunta['id']; endif; ?>" hidden>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputCodigo">C&oacute;digo</label>
						<input type="text" class="form-control  form-control-sm" id="inputCodigo" minlength="1" placeholder="Ingrese un c&oacute;digo de la Pregunta" name="inputCodigo" value="<?php if(isset($pregunta['codigo'])): echo $pregunta['codigo']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputNombre">Nombre</label>
						<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un nombre de la Pregunta" name="inputNombre" value="<?php if(isset($pregunta['nombre'])): echo $pregunta['nombre']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputFiltro">Filtro</label>
						<input type="text" class="form-control  form-control-sm" id="inputFiltro" minlength="1" placeholder="Ingrese un filtro para la Pregunta" name="inputFiltro" value="<?php if(isset($pregunta['filtro'])): echo $pregunta['filtro']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputObservaciones">Observaciones</label>
						<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="2"><?php if(isset($pregunta['observaciones'])): echo $pregunta['observaciones']; endif; ?></textarea>
					</div>
				</div>
				

				<div class="col-sm-12">
					<hr class="my-3">
					<h5><i class="mb-2" data-feather="home" ></i> Respuestas</h5>
				</div>
				
				<div id="dAgregarRespuesta" class="col-sm-12 text-right">
					<a id="linkAgregarRespuesta" href="" class="btn btn-link" data-toggle="modal" data-target="#modalAgregarRespuesta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Respuesta</a>
				</div>
				<div class="row">
					<div class="col-sm-12 mt-3">
						<table id="tListaRespuestas" class="table table-sm table-hover table-bordered">
							<thead class="thead-dark">
								<tr>
									<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Orden</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Observacion</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
								</tr>
							</thead>
							<tbody id="tbodyRespuestas">
							</tbody>
						</table>
					</div>
				</div>


				<div id="botones" class="row m-3">
					<div class="col-sm-6 text-left">
						<a class="btn btn-link"  href="<?php echo base_url();?>Pregunta/listarPreguntas">Volver</a>
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
<div class="modal fade" id="modalMensajePregunta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

<div class="modal fade" id="modalAgregarRespuesta" tabindex="-1" role="dialog" aria-labelledby="agregarRespuesta" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
      	<i class="plusTitulo mb-2" data-feather="plus"></i>
        <h5 class="modal-title" id="tituloAE" name="tituloAE" data-idherramienta="" data-herramienta=""> Agregar Respuesta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="formAgregarRespuesta" action="" method="POST">
	      <div class="modal-body">
	      	
	      	
						<div class="row">
							<div class="form-group col-sm-6">
								<label for="inputNombreE">Nombre Respuesta</label>
								<input type="text" class="form-control  form-control-sm" id="inputNombreE" minlength="1" placeholder="Ingrese un Nombre del Respuesta" name="inputNombreE" value="">
							</div>
							<div class="form-group col-sm-6">
								<label for="inputObservacionesE">Observaciones</label>
								<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservacionesE" name="inputObservacionesE" rows="2"></textarea>
							</div>
						</div>
					

	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
	        <button id="agregarRespuesta" type="submit" class="btn btn-success">Agregar Respuesta</button>
	      </div>
      </form>
    </div>
  </div>
</div>