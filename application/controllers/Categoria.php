<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Categoria extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('perfil_model');
		$this->load->model('categoria_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarCategorias', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarCategoria()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idCategoria = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputIdCategoria')) && is_numeric($this->input->POST('inputIdCategoria')))
				{
					$idCategoria = $this->input->POST('inputIdCategoria');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->categoria_model->agregarCategoria($idCategoria, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_categoria'])
					{
						if(is_null($idCategoria)){
							$idCategoria = (int)$resultado['id_categoria'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Categoria exitosamente. </br></br>ID: '.$idCategoria.'</br></br>'.$resultado["mensaje"];
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Categoria exitosamente. </br></br>ID: '.$idCategoria.'</br></br>'.$resultado["mensaje"];
							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Categoria, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (!isset($resultado["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la Categoria, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Categoria, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
						
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_categoria'] = $idCategoria;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar Categoria';
				$usuario['controller'] = 'categoria';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarCategoria', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarCategoria()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Categoria';
			$usuario['controller'] = 'categoria';

			if($this->input->GET('idCategoria') && $this->input->GET('idCategoria'))
			{
				//mysqli_next_result($this->db->conn_id);
				$idCategoria = $this->input->GET('idCategoria');
				$categoria =  $this->categoria_model->obtenerCategoria($idCategoria, $usuario['id_usuario']);
				$usuario['categoria'] = $categoria[0];
				$usuario['titulo'] = 'Modificar Categoria';		
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarCategoria', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarCategorias()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$cluster = NULL;
				$servicio = NULL;
				$region = NULL;
				$macro_zona = NULL;

				$datos[] = array();
     			unset($datos[0]);

				if(!is_null($this->input->post('cluster')) && $this->input->post('cluster') != "-1"  && $this->input->post('cluster') != "")
					$cluster = $this->input->post('cluster');

				if(!is_null($this->input->post('servicio')) && $this->input->post('servicio') != "-1"  && $this->input->post('servicio') != "")
					$servicio = $this->input->post('servicio');

				if(!is_null($this->input->post('region')) && $this->input->post('region') != "-1"  && $this->input->post('region') != "")
					$region = $this->input->post('region');

				if(!is_null($this->input->post('macro_zona')) && $this->input->post('macro_zona') != "-1"  && $this->input->post('macro_zona') != "")
					$macro_zona = $this->input->post('macro_zona');

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);

				$table_categorias ='
				<table id="tListaCategorias" class="table table-sm table-hover table-bordered">
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
				<tbody id="tbodyCategorias">
		        ';

		        if(isset($categorias) && sizeof($categorias) > 0)
				{								
					foreach ($categorias as $categoria) {
						$table_categorias .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$categoria['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$categoria['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$categoria['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($categoria["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$categoria['created_at'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$categoria['id'].'" class="view_convenio" href="ModificarCategoria/?idCategoria='.$categoria['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($categoria["estado"] == "1") {
		        					$table_categorias .= '<a id="trash_'.$categoria['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarCategoria" data-id="'.$categoria['id'].'" data-categoria="'.$categoria['nombre'].'">
						        		<i data-feather="x-circle" data-toggle="tooltip" data-placement="top" title="Desactivar"></i>       		
					        		</a>';
				        		}else{
	        						$table_categorias .= '<a id="trash_'.$categoria['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarCategoria" data-id="'.$categoria['id'].'" data-categoria="'.$categoria['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_categorias .= '</td>
					    	</tr>';
					}
				}

		        $table_categorias .='
		        	</tbody>
		        </table>';

				$datos['table_categorias'] = $table_categorias;
				echo json_encode($datos);
			}else{

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;
				
				$usuario['controller'] = 'categoria';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarCategorias', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function eliminarCategoria()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idCategoria = null;
			if($this->input->POST('idCategoria'))
				$idCategoria = $this->input->POST('idCategoria');
			$resultado = $this->categoria_model->eliminarCategoria($idCategoria, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function desactivarCategoria()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idCategoria = null;
			if($this->input->POST('id_categoria'))
				$idCategoria = $this->input->POST('id_categoria');
			$resultado = $this->categoria_model->desactivarCategoria($idCategoria, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarCategoria()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idCategoria = null;
			if($this->input->POST('id_categoria'))
				$idCategoria = $this->input->POST('id_categoria');
			$resultado = $this->categoria_model->activarCategoria($idCategoria, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}
}