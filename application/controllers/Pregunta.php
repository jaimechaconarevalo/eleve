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
				$filtro = null;
				$observacion = null;
				$respuestas_preguntas = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputFiltro')) && trim($this->input->POST('inputFiltro')) != "")
					$filtro = trim($this->input->POST('inputFiltro'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('respuestas_preguntas')) && trim($this->input->POST('respuestas_preguntas')) != "")
					$respuestas_preguntas = json_decode($this->input->POST('respuestas_preguntas'), true);

				if(!is_null($this->input->POST('inputIdPregunta')) && is_numeric($this->input->POST('inputIdPregunta')))
				{
					$idPregunta = $this->input->POST('inputIdPregunta');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->pregunta_model->agregarPregunta($idPregunta, $codigo, $nombre, $filtro, $observacion, $usuario["id_usuario"]);
				var_dump('respuestas_preguntas');
				var_dump($respuestas_preguntas);
				var_dump('resultado de agregarPregunta');
				var_dump($resultado);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_pregunta'])
					{
						if(is_null($idPregunta)){
							$idPregunta = (int)$resultado['id_pregunta'];

							$resultado_erp = $this->pregunta_model->eliminarRespuestasPregunta($idPregunta, $usuario["id_usuario"]);
							var_dump('eliminacion de respuestas_preguntas');
							var_dump($resultado_erp);
							$contador = 0;
							if (isset($resultado_erp) && $resultado_erp["resultado"] > 0) {

								if (sizeof($respuestas_preguntas) > 0) {
									foreach ($respuestas_preguntas as $respuesta) {
										$id = $respuesta[0];
										$orden = $respuesta[1];
										$nombre = $respuesta[2];
										$observacion = $respuesta[3];

										$resultado = $this->pregunta_model->agregarRespuestaPregunta($id, $orden, $nombre, $observacion, $idPregunta, $usuario["id_usuario"]);
										if (isset($resultado) && $resultado["resultado"] == 1)
											$contador++;
									}
								}
							}
							

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Pregunta exitosamente. </br></br>ID: '.$idPregunta.'</br></br>'.$resultado["mensaje"];

							if ($contador > 0) {
								$mensaje .= ' Se han agregado '.$contador.' Respuestas a la Pregunta.</br></br>';
							}
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado_erp = $this->pregunta_model->eliminarRespuestasPregunta($idPregunta, $usuario["id_usuario"]);
								$contador = 0;
								if (isset($resultado_erp) && $resultado_erp["resultado"] > 0) {

									if (sizeof($respuestas_preguntas) > 0) {
										foreach ($respuestas_preguntas as $respuesta) {
											$id = $respuesta[0];
											$orden = $respuesta[1];
											$nombre = $respuesta[2];
											$observacion = $respuesta[3];

											$resultado = $this->pregunta_model->agregarRespuestaPregunta($id, $orden, $nombre, $observacion, $idPregunta, $usuario["id_usuario"]);
											if (isset($resultado) && $resultado["resultado"] == 1)
												$contador++;
										}
									}
								}
								

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Pregunta exitosamente. </br></br>ID: '.$idPregunta.'</br></br>'.$resultado["mensaje"];

								if ($contador > 0) {
									$mensaje .= ' Se han agregado '.$contador.' Respuestas a la Pregunta.</br></br>';
								}
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
						<th scope="col" class="texto-pequenio text-center align-middle registro">Filtro</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
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
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['filtro'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($pregunta["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$pregunta['created_at'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$pregunta['id'].'" class="view_convenio" href="ModificarPregunta/?idPregunta='.$pregunta['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($pregunta["estado"] == "1") {
		        					$table_preguntas .= '<a id="trash_'.$pregunta['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarPregunta" data-id="'.$pregunta['id'].'" data-pregunta="'.$pregunta['nombre'].'">
						        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
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

	public function eliminarPregunta()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idPregunta = null;
			if($this->input->POST('idPregunta'))
				$idPregunta = $this->input->POST('idPregunta');
			$resultado = $this->pregunta_model->eliminarPregunta($idPregunta, $usuario['id_usuario']);
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

	public function json_listarRespuestasPregunta()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){

			$idPregunta = null;
			$respuestas_pregunta = array();
			$data = array();

			if(!is_null($this->input->post('idPregunta')) && $this->input->post('idPregunta') != "-1"  && $this->input->post('idPregunta') != "")
				$idPregunta = $this->input->post('idPregunta');

			if (isset($idPregunta)) {
				$respuestas_preguntas = $this->pregunta_model->listarRespuestasPreguntas($idPregunta, $usuario['id_usuario']);
				if (sizeof($respuestas_preguntas) > 0) {
					foreach ($respuestas_preguntas as $respuesta_pregunta) {
						$row_cp_n = array();
						$row_cp_n[] = '<p class="texto-pequenio">'.$respuesta_pregunta['id'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$respuesta_pregunta['orden'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$respuesta_pregunta['nombre'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$respuesta_pregunta['observaciones'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$respuesta_pregunta['created_at'].'</p>';
						$row_cp_n[] = '<a class="trash eliminarRespuesta" href="#" data-id="'.$respuesta_pregunta['orden'].'" ><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>';
						$respuestas_pregunta[] = $row_cp_n;
					}
				}
			}
			
			$output = array(
				'respuestas_pregunta' => $respuestas_pregunta
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}
}