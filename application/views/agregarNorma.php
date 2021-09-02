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
			<form id="agregarNorma" action="agregarNorma" method="POST">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdNorma" name="inputIdNorma" value="<?php if(isset($norma['id'])): echo $norma['id']; endif; ?>" hidden>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputCodigo">C&oacute;digo</label>
						<input type="text" class="form-control  form-control-sm" id="inputCodigo" minlength="1" placeholder="Ingrese un c&oacute;digo de la Norma" name="inputCodigo" value="<?php if(isset($norma['codigo'])): echo $norma['codigo']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputNombre">Nombre</label>
						<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un nombre de la Norma" name="inputNombre" value="<?php if(isset($norma['nombre'])): echo $norma['nombre']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputObservaciones">Observaciones</label>
						<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="2"><?php if(isset($norma['observaciones'])): echo $norma['observaciones']; endif; ?></textarea>
					</div>
				</div>

				<div class="col-sm-12 mb-5">
					<hr class="my-3">
					<h5><i class="mb-2" data-feather="check-square" ></i> Configuraci&oacute;n de Norma</h5>
				</div>

				<div id="agregarCategoria" class="col-sm-12 text-right">
					<a id="btnAgregarCategoria" class="btn btn-link" data-toggle="modal" data-target="#modalAgregarCategoria"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Categoría</a>
				</div>

				<div class="accordion" id="acordionCategorias">
				</div>

				<div class="col-sm-12 mb-5">
					<hr class="my-3">
				</div>

				<div id="botones" class="row m-3">
					<div class="col-sm-6 text-left">
						<a class="btn btn-link"  href="<?php echo base_url();?>Norma/listarNormas">Volver</a>
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
<div class="modal fade" id="modalMensajeNorma" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

<div class="modal fade" id="modalAgregarCategoria" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloAC" name="tituloAC" data-idprograma="" data-nombreprograma="" >Agregar Categor&iacute;a</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
				<div class="table-responsive" id="tablaListaCategorias">
					<table id="tListaCategorias" class="table table-sm table-hover table-bordered">
						<thead class="thead-dark">
							<tr>
								<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Codigo</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
							</tr>
						</thead>
						<tbody id="tbodyCategorias">
							<?php
			        if(isset($categorias))
			        {
				        foreach ($categorias as $categoria): ?>
				  			<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $categoria['id']; ?></th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $categoria['codigo']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $categoria['nombre']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo ($categoria["estado"] == "1" ? "Activo" : "Eliminado"); ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $categoria['created_at']; ?></p></td>
					        	<td class="text-center align-middle registro botonTabla">
					        			<button type="button" class="btn btn-outline-success btn-sm seleccionarCategoria" data-id="<?php echo $categoria['id']; ?>" data-codigo="<?php echo $categoria['codigo']; ?>" data-nombre="<?php echo $categoria['nombre']; ?>">Seleccionar</button>
					        	</td>
					    	</tr>
					  		<?php endforeach;
			  			}?>
			  		</tbody>
					</table>
				</div>	
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modalAgregarPregunta" tabindex="-1" role="dialog" aria-labelledby="modalAgregarPregunta" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="tituloAP" name="tituloAP" data-id="" data-codigo="" data-nombre="" >Agregar Pregunta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
					<div class="table-responsive" id="tablaListaPreguntas">
						<table id="tListaPreguntas" class="table table-sm table-hover table-bordered">
							<thead class="thead-dark">
								<tr>
									<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Codigo</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
									<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
								</tr>
							</thead>
							<tbody id="tbodyPreguntas">
					  			<?php
						        if(isset($preguntas))
						        {
							        foreach ($preguntas as $pregunta): ?>
							  			<tr>
									        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $pregunta['id']; ?></th>
									        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $pregunta['codigo']; ?></p></td>
									        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $pregunta['nombre']; ?></p></td>
									        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo ($pregunta["estado"] == "1" ? "Activo" : "Eliminado"); ?></p></td>
									        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $pregunta['created_at']; ?></p></td>
								        	<td class="text-center align-middle registro botonTabla">
								        			<button type="button" class="btn btn-outline-success btn-sm seleccionarPregunta" data-id="<?php echo $pregunta['id']; ?>" data-codigo="<?php echo $pregunta['codigo']; ?>" data-nombre="<?php echo $pregunta['nombre']; ?>">Seleccionar</button>
								        	</td>
								    	</tr>
								  		<?php endforeach;
						  		}?>
								  </tbody>
								</table>
							</div>
						</div>
      		</div>
    		</div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>