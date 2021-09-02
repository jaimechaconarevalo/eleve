<?php
	$id_usuario=$this->session->userdata('id_usuario');
	 
	if(!$id_usuario){
	  redirect('Login');
	}
?>
<div class="row pt-3">
	<div class="col-sm-12">
		<div id="titulo" class="mt-3">
			<h3><i class="plusTitulo mb-2" data-feather="list" ></i> Lista de Usuarios
			</h3>
		</div>
		<hr class="my-3">
		<div class="row">
			<div class="col-sm-12 mt-3">	
				<div class="row ml-2">
					<div class="col-sm-6">
						<div class="row">
							<div class="col-sm-3">
								<span class="">Perfil de Usuario</span>
							</div>
							<div class="col-sm-9">
								<select id="perfilAU" class="custom-select custom-select-sm">
									<option value="-1" selected>Todos</option>
									<?php
						        if(isset($perfiles))
						        {
							        foreach ($perfiles as $perfil): ?>
							        <option value="<?php echo $perfil['id_perfil']; ?>"><?php echo $perfil['id_perfil'].' - '.$perfil['pf_nombre']; ?></option>
							  		<?php endforeach;
						  		}?>

								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div id="agregarUsuario" class="col-sm-12 text-right">
		<a href="AgregarUsuario" class="btn btn-link"><i stop-color data-feather="plus"></i>Agregar Usuario</a>
	</div>
</div>
<div class="row p-3">
	<div id="tDatos" class="col-sm-12 p-3">
		<div class="table-responsive" id="tablaListaUsuarios">
			<table id="tListaUsuarios" class="table table-sm table-hover table-bordered">
				<thead class="thead-dark">
					<tr>
						<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Codigo</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Rut</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Nombres</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Apellidos</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Email</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Perfil</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					</tr>
				</thead>
				<tbody id="tbodyUsuario">
			        <?php 
			        if(isset($usuarios))
			        {
				        foreach ($usuarios as $usuario): ?>
				  			<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $usuario['id_usuario']; ?></p></th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $usuario['cod_usuario']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $usuario['rut']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $usuario['nombres']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $usuario['apellidos']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $usuario['email']; ?></p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio"><?php echo $usuario['pf_nombre']; ?></p></td>
						        <td class="text-center align-middle registro botonTabla">
						        	<a id="edit_<?php echo $usuario['id_usuario']; ?>" class="view_usuario" href="ModificarUsuario/?idUsuario=<?php echo $usuario['id_usuario']; ?>" data-id="<?php echo $usuario['id_usuario']; ?>" data-nombre="<?php echo $usuario['nombres']; ?>">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="modificar"></i>
					        		</a>
					        	</td>
						        <td class="text-center align-middle registro botonTabla">
						        	<a id="trash_<?php echo $usuario['id_usuario']; ?>" class="trash" href="#" data-id="<?php echo $usuario['id_usuario']; ?>" data-nombre="<?php echo $usuario['nombres']; ?>" data-apellido="<?php echo $usuario['apellidos']; ?>" data-rut="<?php echo $usuario['rut']; ?>" data-toggle="modal" data-target="#modalEliminarUsuario">
						        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i>
					        		</a>
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
<div class="modal fade" id="modalMensajeUsuario" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
	<div class="modal fade" id="modalEliminarUsuario" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	      	<i class="plusTituloError mb-2" data-feather="trash-2"></i>
	        <h5 class="modal-title" id="tituloEP" name="tituloEP" data-idusuario="" data-nombreusuario="" ></h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
			<p id="parrafoEP"></p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button>
	        <button id="eliminarUsuario" type="button" class="btn btn-danger">Eliminar</button>
	      </div>
	    </div>
	  </div>
	</div>

<div id="loader" class="loader" hidden></div>