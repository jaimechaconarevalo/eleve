<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pregunta extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('perfil_model');
		$this->load->model('pregunta_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarPreguntas', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarPregunta()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idPregunta = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputIdPregunta')) && is_numeric($this->input->POST('inputIdPregunta')))
				{
					$idPregunta = $this->input->POST('inputIdPregunta');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->pregunta_model->agregarPregunta($idPregunta, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_pregunta'])
					{
						if(is_null($idPregunta)){
							$idPregunta = (int)$resultado['id_pregunta'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Pregunta exitosamente. </br></br>ID: '.$idPregunta.'</br></br>'.$resultado["mensaje"];
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Pregunta exitosamente. </br></br>ID: '.$idPregunta.'</br></br>'.$resultado["mensaje"];
							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Pregunta, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (!isset($resultado["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la Pregunta, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Pregunta, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
						
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_pregunta'] = $idPregunta;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar Pregunta';
				$usuario['controller'] = 'pregunta';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarPregunta', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarPregunta()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Pregunta';
			$usuario['controller'] = 'pregunta';

			if($this->input->GET('idPregunta') && $this->input->GET('idPregunta'))
			{
				$idPregunta = $this->input->GET('idPregunta');
				$pregunta =  $this->pregunta_model->obtenerPregunta($idPregunta, $usuario['id_usuario']);
				$usuario['pregunta'] = $pregunta[0];
				$usuario['titulo'] = 'Modificar Pregunta';
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarPregunta', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarPreguntas()
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

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);

				$table_preguntas ='
				<table id="tListaPreguntas" class="table table-sm table-hover table-bordered">
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
				<tbody id="tbodyPreguntas">
		        ';

		        if(isset($preguntas) && sizeof($preguntas) > 0)
				{								
					foreach ($preguntas as $pregunta) {
						$table_preguntas .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($pregunta["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['created_at'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['cluster'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['servicio_salud'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['region'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['macro_zona'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$pregunta['id'].'" class="view_convenio" href="ModificarPregunta/?idPregunta='.$pregunta['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($pregunta["estado"] == "1") {
		        					$table_preguntas .= '<a id="trash_'.$pregunta['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarPregunta" data-id="'.$pregunta['id'].'" data-pregunta="'.$pregunta['nombre'].'">
						        		<i data-feather="x-circle" data-toggle="tooltip" data-placement="top" title="Desactivar"></i>       		
					        		</a>';
				        		}else{
	        						$table_preguntas .= '<a id="trash_'.$pregunta['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarPregunta" data-id="'.$pregunta['id'].'" data-pregunta="'.$pregunta['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_preguntas .= '</td>
					    	</tr>';
					}
				}

		        $table_preguntas .='
		        	</tbody>
		        </table>';

				$datos['table_preguntas'] = $table_preguntas;
				echo json_encode($datos);

				
			}else{

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;
				
				$usuario['controller'] = 'pregunta';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarPreguntas', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function desactivarPregunta()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idPregunta = null;
			if($this->input->POST('id_pregunta'))
				$idPregunta = $this->input->POST('id_pregunta');
			$resultado = $this->pregunta_model->desactivarPregunta($idPregunta, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarPregunta()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idPregunta = null;
			if($this->input->POST('id_pregunta'))
				$idPregunta = $this->input->POST('id_pregunta');
			$resultado = $this->pregunta_model->activarPregunta($idPregunta, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}
}