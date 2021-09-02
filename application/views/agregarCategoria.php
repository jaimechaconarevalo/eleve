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
			<form id="agregarCategoria" action="agregarCategoria" method="POST">
				<div class="row">
					<input type="text" class="form-control form-control-sm" id="inputIdCategoria" name="inputIdCategoria" value="<?php if(isset($categoria['id'])): echo $categoria['id']; endif; ?>" hidden>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputCodigo">C&oacute;digo</label>
						<input type="text" class="form-control  form-control-sm" id="inputCodigo" minlength="1" placeholder="Ingrese un c&oacute;digo de la Categoria" name="inputCodigo" value="<?php if(isset($categoria['codigo'])): echo $categoria['codigo']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
					<div class="form-group col-sm-6">
						<label for="inputNombre">Nombre</label>
						<input type="text" class="form-control  form-control-sm" id="inputNombre" minlength="1" placeholder="Ingrese un nombre de la Categoria" name="inputNombre" value="<?php if(isset($categoria['nombre'])): echo $categoria['nombre']; endif; ?>">
						<!--<span>Se requiere un Nombre de Equipo.</span>-->
					</div>
				</div>
				<div class="row">
					<div class="form-group col-sm-6">
						<label for="inputObservaciones">Observaciones</label>
						<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones" name="inputObservaciones" rows="2"><?php if(isset($categoria['observaciones'])): echo $categoria['observaciones']; endif; ?></textarea>
					</div>
				</div>
				
				<div id="botones" class="row m-3">
					<div class="col-sm-6 text-left">
						<a class="btn btn-link"  href="<?php echo base_url();?>Categoria/listarCategorias">Volver</a>
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
<div class="modal fade" id="modalMensajeCategoria" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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