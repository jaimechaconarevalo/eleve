<?php
	$id_usuario=$this->session->userdata('id_usuario');
	 
	if(!$id_usuario){
	  redirect('Login');
	}
	
?>
<div class="row pt-3">
	<div class="col-sm-12">
		<div class="row">
			<div class="col-sm-7 mt-3">
				<h3 class="pl-3"><i class="plusTitulo mb-2" data-feather="list" ></i> Lista de Herramientas
				</h3>
			</div>
		</div>

	<hr class="my-3">
	</div>
	<div id="agregarHerramienta" class="col-sm-12 text-right">
		<a href="agregarHerramienta" class="btn btn-link"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Herramienta</a>
	</div>
</div>
<div class="row p-3">
	<div id="tDatos" class="col-sm-12 p-3">
		<div class="table-responsive" id="tablaListaHerramientas">
			<table id="tListaHerramientas" class="table table-sm table-hover table-bordered">
				<thead class="thead-dark">
					<tr>
						<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Codigo</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					</tr>
				</thead>
				<tbody id="tbodyHerramientas">
		  			<?php
			        if(isset($herramientas))
			        {
				        foreach ($herramientas as $herramienta): ?>
				  			<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $herramienta['id']; ?></th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $herramienta['codigo']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $herramienta['nombre']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo ($herramienta["estado"] == "1" ? "Activo" : "Eliminado"); ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $herramienta['created_at']; ?></p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_<?php echo $herramienta['id']; ?>" class="view_convenio" href="ModificarHerramienta/?idHerramienta=<?php echo $herramienta['id']; ?>">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">
					        		<?php if ($herramienta["estado"] == "1") { ?>
						        					<a id="trash_<?php echo $herramienta['id']; ?>" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarHerramienta" data-id="<?php echo $herramienta['id']; ?>" data-herramienta="<?php echo $herramienta['nombre']; ?>">
										        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>       		
									        		</a>
					        		<?php }else{ ?>
					        						<a id="trash_<?php echo $herramienta['id']; ?>" class="trash" href="#" data-toggle="modal" data-target="#modalActivarHerramienta" data-id="<?php echo $herramienta['id']; ?>" data-herramienta="<?php echo $herramienta['nombre']; ?>">
										        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
									        		</a>
					        		<?php } ?>
						        	

					        	</td>
					    	</tr>
					  		<?php endforeach;
			  		}?>
			  </tbody>
			</table>
		</div>
	</div>
</div>

<!-- Modal Mensaje -->
<div class="modal fade" id="modalMensajeHerramienta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <button id="btnCerrarMP" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Eliminar -->
	<div class="modal fade" id="modalEliminarHerramienta" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	      	<i class="plusTituloError mb-2" data-feather="trash-2"></i>
	        <h5 class="modal-title" id="tituloEP" name="tituloEP" data-idherramienta="" data-herramienta=""> Eliminar Herramienta</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
			<p id="parrafoEP">¿Esta seguro que deseas Eliminar el Herramienta?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
	        <button id="eliminarHerramienta" type="button" class="btn btn-danger">Eliminar</button>
	      </div>
	    </div>
	  </div>
	</div>

<!-- Modal Activar -->
	<div class="modal fade" id="modalActivarHerramienta" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	      	<i class="plusTitulo mb-2" data-feather="check-circle"></i>
	        <h5 class="modal-title" id="tituloAP" name="tituloAP" data-idherramienta="" data-herramienta=""> Activar Herramienta</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
			<p id="parrafoAP" name="parrafoAP">¿Esta seguro que deseas Activar el Herramienta?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
	        <button id="activarHerramienta" type="button" class="btn btn-success">Activar</button>
	      </div>
	    </div>
	  </div>
	</div>
	
<div id="loader" class="loader" hidden></div>