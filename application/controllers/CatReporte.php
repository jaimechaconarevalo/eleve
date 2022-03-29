<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CatReporte extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('perfil_model');
		$this->load->model('catReporte_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarCatReportes', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarCatReporte()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idCatReporte = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputIdCatReporte')) && is_numeric($this->input->POST('inputIdCatReporte')))
				{
					$idCatReporte = $this->input->POST('inputIdCatReporte');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->catReporte_model->agregarCatReporte($idCatReporte, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_catReporte'])
					{
						if(is_null($idCatReporte)){
							$idCatReporte = (int)$resultado['id_catReporte'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la CatReporte exitosamente. </br></br>ID: '.$idCatReporte.'</br></br>'.$resultado["mensaje"];
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la CatReporte exitosamente. </br></br>ID: '.$idCatReporte.'</br></br>'.$resultado["mensaje"];
							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la CatReporte, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (!isset($resultado["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la CatReporte, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la CatReporte, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
						
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_catReporte'] = $idCatReporte;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar CatReporte';
				$usuario['controller'] = 'catReporte';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarCatReporte', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarCatReporte()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar CatReporte';
			$usuario['controller'] = 'catReporte';

			if($this->input->GET('idCatReporte') && $this->input->GET('idCatReporte'))
			{
				//mysqli_next_result($this->db->conn_id);
				$idCatReporte = $this->input->GET('idCatReporte');
				$catReporte =  $this->catReporte_model->obtenerCatReporte($idCatReporte, $usuario['id_usuario']);
				$usuario['catReporte'] = $catReporte[0];
				$usuario['titulo'] = 'Modificar CatReporte';		
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarCatReporte', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarCatReportes()
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

				$catReportes =  $this->catReporte_model->listarCatReportes($usuario["id_usuario"]);

				$table_catReportes ='
				<table id="tListaCatReportes" class="table table-sm table-hover table-bordered">
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
				<tbody id="tbodyCatReportes">
		        ';

		        if(isset($catReportes) && sizeof($catReportes) > 0)
				{								
					foreach ($catReportes as $catReporte) {
						$table_catReportes .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$catReporte['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$catReporte['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$catReporte['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($catReporte["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$catReporte['created_at'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$catReporte['id'].'" class="view_convenio" href="ModificarCatReporte/?idCatReporte='.$catReporte['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($catReporte["estado"] == "1") {
		        					$table_catReportes .= '<a id="trash_'.$catReporte['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarCatReporte" data-id="'.$catReporte['id'].'" data-catReporte="'.$catReporte['nombre'].'">
						        		<i data-feather="x-circle" data-toggle="tooltip" data-placement="top" title="Desactivar"></i>       		
					        		</a>';
				        		}else{
	        						$table_catReportes .= '<a id="trash_'.$catReporte['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarCatReporte" data-id="'.$catReporte['id'].'" data-catReporte="'.$catReporte['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_catReportes .= '</td>
					    	</tr>';
					}
				}

		        $table_catReportes .='
		        	</tbody>
		        </table>';

				$datos['table_catReportes'] = $table_catReportes;
				echo json_encode($datos);
			}else{

				$catReportes =  $this->catReporte_model->listarCatReportes($usuario["id_usuario"]);
				$usuario['catReportes'] = $catReportes;
				
				$usuario['controller'] = 'catReporte';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarCatReportes', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function eliminarCatReporte()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idCatReporte = null;
			if($this->input->POST('idCatReporte'))
				$idCatReporte = $this->input->POST('idCatReporte');
			$resultado = $this->catReporte_model->eliminarCatReporte($idCatReporte, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function desactivarCatReporte()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idCatReporte = null;
			if($this->input->POST('id_catReporte'))
				$idCatReporte = $this->input->POST('id_catReporte');
			$resultado = $this->catReporte_model->desactivarCatReporte($idCatReporte, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarCatReporte()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idCatReporte = null;
			if($this->input->POST('id_catReporte'))
				$idCatReporte = $this->input->POST('id_catReporte');
			$resultado = $this->catReporte_model->activarCatReporte($idCatReporte, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}
}