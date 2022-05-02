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
				<h3 class="pl-3"><i class="plusTitulo mb-2" data-feather="list" ></i> Lista de Normas
				</h3>
			</div>
		</div>
		<hr class="my-3">
		<div class="row">
			<div class="col-sm-12 mt-3">	
				<div class="row ml-2">
					<div class="col-sm-6">
						<div class="row">
							<div class="col-sm-3">
								<span class="">Estados Norma</span>
							</div>
							<div class="col-sm-9">
								<select id="sEstadoNorma" name="sEstadoNorma" class="custom-select custom-select-sm">
									<option value="1" selected>Visibles</option>
									<option value="2">No Visibles</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	<hr class="my-3">
	</div>
	<div id="agregarNorma" class="col-sm-12 text-right">
		<a href="agregarNorma" class="btn btn-link"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Norma</a>
	</div>
</div>
<div class="row p-3">
	<div id="tDatos" class="col-sm-12 p-3">
		<div class="table-responsive" id="tablaListaNormas">
			<table id="tListaNormas" class="table table-sm table-hover table-bordered">
				<thead class="thead-dark">
					<tr>
						<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Codigo</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Solo Texto</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Visible</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Orden</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Subir</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Bajar</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					</tr>
				</thead>
				<tbody id="tbodyNormas">
		  			<?php
			        if(isset($normas))
			        {
				        foreach ($normas as $norma): ?>
				  			<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['id']; ?></th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['codigo']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['nombre']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo ($norma['solo_texto'] == 1 ? '<i data-feather="check" data-placement="top" class="text-success"></i>': ''); ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo ($norma['visible'] == 1 ? '<i data-feather="check" data-placement="top" class="text-success"></i>': ''); ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo ($norma["estado"] == "1" ? "Activo" : "Eliminado"); ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['created_at']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $norma['orden']; ?></p></td>
						        <td class="text-center align-middle registro botonTabla">
						        		<?php if ($norma['orden'] > 1) {
								      	?>
									      	<a id="mover_<?php echo $norma['id']; ?>" class="view_convenio" style="cursor: pointer;">
								        		<i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i>
							        		</a>
								      	<?php	
								      	} ?>
						        </td>
							      <td class="text-center align-middle registro botonTabla">
							      	<?php
							      	if ($norma['orden'] < sizeof($normas)) {
							      	?>
								      	<a id="mover_<?php echo $norma['id']; ?>" class="view_convenio" style="cursor: pointer;">
							        		<i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i>
						        		</a>
							      	<?php	
							      	} ?>						        	
						        </td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_<?php echo $norma['id']; ?>" class="view_convenio" href="modificarNorma/?idNorma=<?php echo $norma['id']; ?>">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">
					        		<?php if ($norma["estado"] == "1") { ?>
						        					<a id="trash_<?php echo $norma['id']; ?>" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarNorma" data-id="<?php echo $norma['id']; ?>" data-norma="<?php echo $norma['nombre']; ?>">
										        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>       		
									        		</a>
					        		<?php }else{ ?>
					        						<a id="trash_<?php echo $norma['id']; ?>" class="trash" href="#" data-toggle="modal" data-target="#modalActivarNorma" data-id="<?php echo $norma['id']; ?>" data-norma="<?php echo $norma['nombre']; ?>">
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
<div class="modal fade" id="modalMensajeNorma" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
	<div class="modal fade" id="modalEliminarNorma" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	      	<i class="plusTituloError mb-2" data-feather="trash-2"></i>
	        <h5 class="modal-title" id="tituloEP" name="tituloEP" data-idnorma="" data-norma=""> Eliminar Norma</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
			<p id="parrafoEP">¿Esta seguro que deseas Eliminar el Norma?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
	        <button id="eliminarNorma" type="button" class="btn btn-danger">Eliminar</button>
	      </div>
	    </div>
	  </div>
	</div>

<!-- Modal Activar -->
	<div class="modal fade" id="modalActivarNorma" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	      	<i class="plusTitulo mb-2" data-feather="check-circle"></i>
	        <h5 class="modal-title" id="tituloAP" name="tituloAP" data-idnorma="" data-norma=""> Activar Norma</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
			<p id="parrafoAP" name="parrafoAP">¿Esta seguro que deseas Activar el Norma?</p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
	        <button id="activarNorma" type="button" class="btn btn-success">Activar</button>
	      </div>
	    </div>
	  </div>
	</div>
	
<div id="loader" class="loader" hidden></div>