<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Carpeta extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('perfil_model');
		$this->load->model('carpeta_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarCarpetas', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarCarpeta()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idCarpeta = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputIdCarpeta')) && is_numeric($this->input->POST('inputIdCarpeta')))
				{
					$idCarpeta = $this->input->POST('inputIdCarpeta');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->carpeta_model->agregarCarpeta($idCarpeta, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_carpeta'])
					{
						if(is_null($idCarpeta)){
							$idCarpeta = (int)$resultado['id_carpeta'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Carpeta exitosamente. </br></br>ID: '.$idCarpeta.'</br></br>'.$resultado["mensaje"];
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Carpeta exitosamente. </br></br>ID: '.$idCarpeta.'</br></br>'.$resultado["mensaje"];
							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Carpeta, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (!isset($resultado["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la Carpeta, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Carpeta, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
						
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_carpeta'] = $idCarpeta;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar Documento';
				$usuario['controller'] = 'carpeta';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarCarpeta', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarCarpeta()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Carpeta';
			$usuario['controller'] = 'carpeta';

			if($this->input->GET('idCarpeta') && $this->input->GET('idCarpeta'))
			{
				$idCarpeta = $this->input->GET('idCarpeta');
				$carpeta =  $this->carpeta_model->obtenerCarpeta($idCarpeta, $usuario['id_usuario']);
				$usuario['carpeta'] = $carpeta[0];
				$usuario['titulo'] = 'Modificar Carpeta';
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarCarpeta', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarCarpetas()
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

				$carpetas =  $this->carpeta_model->listarCarpetas($usuario["id_usuario"]);

				$table_carpetas ='
				<table id="tListaCarpetas" class="table table-sm table-hover table-bordered">
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
				<tbody id="tbodyCarpetas">
		        ';

		        if(isset($carpetas) && sizeof($carpetas) > 0)
				{								
					foreach ($carpetas as $carpeta) {
						$table_carpetas .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$carpeta['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$carpeta['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$carpeta['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($carpeta["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$carpeta['created_at'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$carpeta['id'].'" class="view_convenio" href="ModificarCarpeta/?idCarpeta='.$carpeta['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($carpeta["estado"] == "1") {
		        					$table_carpetas .= '<a id="trash_'.$carpeta['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarCarpeta" data-id="'.$carpeta['id'].'" data-carpeta="'.$carpeta['nombre'].'">
						        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>       		
					        		</a>';
				        		}else{
	        						$table_carpetas .= '<a id="trash_'.$carpeta['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarCarpeta" data-id="'.$carpeta['id'].'" data-carpeta="'.$carpeta['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_carpetas .= '</td>
					    	</tr>';
					}
				}

		        $table_carpetas .='
		        	</tbody>
		        </table>';

				$datos['table_carpetas'] = $table_carpetas;
				echo json_encode($datos);

				
			}else{

				$carpetas =  $this->carpeta_model->listarCarpetas($usuario["id_usuario"]);
				$usuario['carpetas'] = $carpetas;
				
				$usuario['controller'] = 'carpeta';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarCarpetas', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function eliminarCarpeta()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idCarpeta = null;
			if($this->input->POST('idCarpeta'))
				$idCarpeta = $this->input->POST('idCarpeta');
			$resultado = $this->carpeta_model->eliminarCarpeta($idCarpeta, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarCarpeta()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idCarpeta = null;
			if($this->input->POST('id_carpeta'))
				$idCarpeta = $this->input->POST('id_carpeta');
			$resultado = $this->carpeta_model->activarCarpeta($idCarpeta, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}
}