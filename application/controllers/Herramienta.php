<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Herramienta extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('perfil_model');
		$this->load->model('herramienta_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarHerramientas', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarHerramienta()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idHerramienta = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputIdHerramienta')) && is_numeric($this->input->POST('inputIdHerramienta')))
				{
					$idHerramienta = $this->input->POST('inputIdHerramienta');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->herramienta_model->agregarHerramienta($idHerramienta, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_herramienta'])
					{
						if(is_null($idHerramienta)){
							$idHerramienta = (int)$resultado['id_herramienta'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Herramienta exitosamente. </br></br>ID: '.$idHerramienta.'</br></br>'.$resultado["mensaje"];
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Herramienta exitosamente. </br></br>ID: '.$idHerramienta.'</br></br>'.$resultado["mensaje"];
							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Herramienta, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (!isset($resultado["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la Herramienta, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Herramienta, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
						
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_herramienta'] = $idHerramienta;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar Herramienta';
				$usuario['controller'] = 'herramienta';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarHerramienta', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarHerramienta()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Herramienta';
			$usuario['controller'] = 'herramienta';

			if($this->input->GET('idHerramienta') && $this->input->GET('idHerramienta'))
			{
				$idHerramienta = $this->input->GET('idHerramienta');
				$herramienta =  $this->herramienta_model->obtenerHerramienta($idHerramienta, $usuario['id_usuario']);
				$usuario['herramienta'] = $herramienta[0];
				$usuario['titulo'] = 'Modificar Herramienta';
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarHerramienta', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarHerramientas()
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

				$herramientas =  $this->herramienta_model->listarHerramientas($usuario["id_usuario"]);

				$table_herramientas ='
				<table id="tListaHerramientas" class="table table-sm table-hover table-bordered">
				<thead class="thead-dark">
					<tr>
						<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Codigo</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Cluster</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Servicio Salud</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Regi&oacute;n</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Macro Zona</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					</tr>
				</thead>
				<tbody id="tbodyHerramientas">
		        ';

		        if(isset($herramientas) && sizeof($herramientas) > 0)
				{								
					foreach ($herramientas as $herramienta) {
						$table_herramientas .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($herramienta["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['created_at'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['cluster'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['servicio_salud'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['region'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$herramienta['macro_zona'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$herramienta['id'].'" class="view_convenio" href="ModificarHerramienta/?idHerramienta='.$herramienta['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($herramienta["estado"] == "1") {
		        					$table_herramientas .= '<a id="trash_'.$herramienta['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarHerramienta" data-id="'.$herramienta['id'].'" data-herramienta="'.$herramienta['nombre'].'">
						        		<i data-feather="x-circle" data-toggle="tooltip" data-placement="top" title="Desactivar"></i>       		
					        		</a>';
				        		}else{
	        						$table_herramientas .= '<a id="trash_'.$herramienta['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarHerramienta" data-id="'.$herramienta['id'].'" data-herramienta="'.$herramienta['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_herramientas .= '</td>
					    	</tr>';
					}
				}

		        $table_herramientas .='
		        	</tbody>
		        </table>';

				$datos['table_herramientas'] = $table_herramientas;
				echo json_encode($datos);

				
			}else{

				$herramientas =  $this->herramienta_model->listarHerramientas($usuario["id_usuario"]);
				$usuario['herramientas'] = $herramientas;
				
				$usuario['controller'] = 'herramienta';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarHerramientas', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function desactivarHerramienta()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idHerramienta = null;
			if($this->input->POST('id_herramienta'))
				$idHerramienta = $this->input->POST('id_herramienta');
			$resultado = $this->herramienta_model->desactivarHerramienta($idHerramienta, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarHerramienta()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idHerramienta = null;
			if($this->input->POST('id_herramienta'))
				$idHerramienta = $this->input->POST('id_herramienta');
			$resultado = $this->herramienta_model->activarHerramienta($idHerramienta, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}
}