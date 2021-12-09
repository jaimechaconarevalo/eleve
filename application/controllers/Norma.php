<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Norma extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('pregunta_model');
		$this->load->model('norma_model');
		$this->load->model('categoria_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarNormas', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarNorma()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idNorma = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;
				$preguntas_seleccionadas = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('preguntas_seleccionadas')) && trim($this->input->POST('preguntas_seleccionadas')) != "")
					$preguntas_seleccionadas = json_decode($this->input->POST('preguntas_seleccionadas'), true);

				if(!is_null($this->input->POST('inputIdNorma')) && is_numeric($this->input->POST('inputIdNorma')))
				{
					$idNorma = $this->input->POST('inputIdNorma');
					$accion = 'modificado';
				}
				;
				$respuesta = 0;
				$mensaje = '';
				$resultado_an = $this->norma_model->agregarNorma($idNorma, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado_an && $resultado_an["resultado"] > 0)
				{
					if($resultado_an['id_norma'])
					{
						if(is_null($idNorma)){
							$idNorma = (int)$resultado_an['id_norma'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Norma exitosamente. </br></br>ID: '.$idNorma.'</br></br>'.$resultado["mensaje"];
							$contador_p = 0;
							if (sizeof($preguntas_seleccionadas) > 0) {
								foreach ($preguntas_seleccionadas as $pregunta) {
									$id_pregunta = $pregunta[0];
									$id_categoria = $pregunta[1];
									$resultado_acpn = $this->norma_model->agregarCategoriaPreguntaNorma($idNorma, $id_categoria, $id_pregunta, $usuario["id_usuario"]);
									if (isset($resultado_acpn) && $resultado_acpn["resultado"] == 1)
										$contador_p++;
								}

								if ($contador_p > 0)
									$mensaje .= ' Se han agregado '.$contador_p.' Preguntas a la Norma.</br></br>';
							}

							
						}else{
							if (isset($resultado_an) && $resultado_an["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Norma exitosamente. </br></br>ID: '.$idNorma.'</br></br>'.$resultado["mensaje"];

								$resultado_ecp = $this->norma_model->eliminarCategoriaPregunta($idNorma, $usuario["id_usuario"]);
								if (isset($resultado_ecp) && $resultado_ecp["resultado"] > 0) {
									$contador_p = 0;
									if (sizeof($preguntas_seleccionadas) > 0) {
										foreach ($preguntas_seleccionadas as $pregunta) {
											$id_pregunta = $pregunta[0];
											$id_categoria = $pregunta[1];
											$resultado_acpn = $this->norma_model->agregarCategoriaPreguntaNorma($idNorma, $id_categoria, $id_pregunta, $usuario["id_usuario"]);
											if (isset($resultado_acpn) && $resultado_acpn["resultado"] == 1)
												$contador_p++;
										}

										if ($contador_p > 0)
											$mensaje .= ' Se han agregado '.$contador_p.' Preguntas a la Norma.</br></br>';
									}
								}else{
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Norma, '.$resultado_ecp["mensaje"];
								}

							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Norma, '.$resultado_an["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado_an["resultado"] === -1)
					{
						if (!isset($resultado_an["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la Norma, '.$resultado_an["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Norma, Codigo: '.$resultado_an["mensaje"]["code"].', Mensaje: '.$resultado_an["mensaje"]["message"];
							}
						}
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_norma'] = $idNorma;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar Norma';
				$usuario['controller'] = 'norma';

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarNorma', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarNorma()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Norma';
			$usuario['controller'] = 'norma';

			if($this->input->GET('idNorma') && $this->input->GET('idNorma'))
			{
				$idNorma = $this->input->GET('idNorma');
				$norma =  $this->norma_model->obtenerNorma($idNorma, $usuario['id_usuario']);
				$usuario['norma'] = $norma[0];
				$usuario['titulo'] = 'Modificar Norma';

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarNorma', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarNormas()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$datos[] = array();
     			unset($datos[0]);

				$normas =  $this->norma_model->listarNormas($usuario["id_usuario"]);

				$table_normas ='
				<table id="tListaNormas" class="table table-sm table-hover table-bordered">
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
				<tbody id="tbodyNormas">
		        ';

		        if(isset($normas) && sizeof($normas) > 0)
				{								
					foreach ($normas as $norma) {
						$table_normas .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($norma["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['created_at'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['cluster'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['servicio_salud'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['region'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['macro_zona'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$norma['id'].'" class="view_convenio" href="ModificarNorma/?idNorma='.$norma['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($norma["estado"] == "1") {
		        					$table_normas .= '<a id="trash_'.$norma['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarNorma" data-id="'.$norma['id'].'" data-norma="'.$norma['nombre'].'">
						        		<i data-feather="x-circle" data-toggle="tooltip" data-placement="top" title="Desactivar"></i>       		
					        		</a>';
				        		}else{
	        						$table_normas .= '<a id="trash_'.$norma['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarNorma" data-id="'.$norma['id'].'" data-norma="'.$norma['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_normas .= '</td>
					    	</tr>';
					}
				}

		        $table_normas .='
		        	</tbody>
		        </table>';

				$datos['table_normas'] = $table_normas;
				echo json_encode($datos);

				
			}else{

				$normas =  $this->norma_model->listarNormas($usuario["id_usuario"]);
				$usuario['normas'] = $normas;

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;

				$usuario['controller'] = 'norma';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarNormas', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function json_listarCategoriasPreguntas()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){

			$idNorma = null;
			$categorias_preguntas = array();
			$data = array();
			$dataCategoria = array();
			$cantCategoria = 0;
			$cantCategoriaPregunta = 0;
			$idCategoria = null;
			$idPregunta = null;

			if(!is_null($this->input->post('idNorma')) && $this->input->post('idNorma') != "-1"  && $this->input->post('idNorma') != "")
				$idNorma = $this->input->post('idNorma');

			if (isset($idNorma)) {
				$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);
				if (sizeof($categorias_preguntas_norma) > 0) {

					#var_dump(sizeof($categorias_preguntas_norma));
					$categorias = array();
					$preguntas = array();
					$respuestas = array();

					foreach ($categorias_preguntas_norma as $pregunta) {
						$id_categoria = null;
						$id_pregunta = null;
						$codigo_c = null;
						$categoria = null;
						$codigo_p = null;
						$pregunta_p = null;
						$id_respuesta = null;
						$orden_r = null;
						$respuesta = null;
						$obs_respuesta = null;

						#var_dump($idCategoria);
						#var_dump($pregunta['id_categoria']);

						
                     	/*var_dump("idCategoria:  ");var_dump($pregunta["id_categoria"]);var_dump("</br>");
                     	var_dump("id_pregunta:  ");var_dump($pregunta['id_pregunta']);var_dump("</br>");
                     	var_dump("codigo_c:  ");var_dump($pregunta['codigo_c']);var_dump("</br>");
                     	var_dump("categoria:  ");var_dump($pregunta['categoria']);var_dump("</br>");
                     	var_dump("codigo_p:  ");var_dump($pregunta['codigo_p']);var_dump("</br>");
                     	var_dump("pregunta_r:  ");var_dump($pregunta['pregunta']);var_dump("</br>");
                     	var_dump("orden_r:  ");var_dump($pregunta['orden_r']);var_dump("</br>");
                     	var_dump("respuesta:  ");var_dump($pregunta['respuesta']);var_dump("</br>");
                     	var_dump("obs_respuesta:  ");var_dump($pregunta['obs_respuesta']);var_dump("</br></br></br>");*/

						if ($idCategoria != $pregunta['id_categoria'])
	                    {
	                    	#if ($idCategoria)
	                    	#	$dataCategoria[] = array('id_categoria' => $idCategoria, 'cantPreguntas' => $cantCategoriaPregunta);

	                    	#$cantCategoriaPregunta = 0;
	                     	#$cantCategoria++;
	                     	#$cantCategoriaPregunta++;

	                     	$id_pregunta = $pregunta['id_pregunta'];
	                     	$codigo_c = $pregunta['codigo_c'];
	                     	$categoria = $pregunta['categoria'];
	                     	$codigo_p = $pregunta['codigo_p'];
	                     	$pregunta_r = $pregunta['pregunta'];
	                     	$id_respuesta = $pregunta['respuesta_id'];
	                     	$orden_r = $pregunta['orden_r'];
	                     	$respuesta = $pregunta['respuesta'];
	                     	$obs_respuesta = $pregunta['obs_respuesta'];

	                     	if (is_null($idCategoria)) {
	                     		$idCategoria = $pregunta['id_categoria'];
	                     		$idPregunta = $id_pregunta;
	                     		$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);
	                     		$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuestas" => []);

		                     	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}
	                     	}else{
	                     			$idCategoria = $pregunta['id_categoria'];
	                     		#if (sizeof($respuestas) > 0) {
	                     			$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
	                     			$respuestas = array();
	                     			$idPregunta = $pregunta['id_pregunta'];
	                     			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
	                     			$preguntas = array();
	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuestas" => []);

	                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
			                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
			                     	}

			                     	$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);
	                     		#}else{
	                     		#	$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
	                     		#	$respuestas = array();
	                     		#	$idPregunta = $pregunta['id_pregunta'];
	                     		#	$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
	                     		#	$preguntas = array();
	                     		#	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuestas" => []);
	                     		#}


	                     	}


	                    }else{

	                    	if ($idPregunta != $pregunta['id_pregunta'])
		                    {
		                    	$id_pregunta = $pregunta['id_pregunta'];
		                     	$codigo_c = $pregunta['codigo_c'];
		                     	$categoria = $pregunta['categoria'];
		                     	$codigo_p = $pregunta['codigo_p'];
		                     	$pregunta_r = $pregunta['pregunta'];
		                     	$id_respuesta = $pregunta['respuesta_id'];
		                     	$orden_r = $pregunta['orden_r'];
		                     	$respuesta = $pregunta['respuesta'];
		                     	$obs_respuesta = $pregunta['obs_respuesta'];

		                    	$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
		                    	$respuestas = array();
		                    	$idPregunta = $pregunta['id_pregunta'];
		                    	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuestas" => []);

		                    	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}

		                     	#var_dump($preguntas);

		                    }else{

		                    	$id_pregunta = $pregunta['id_pregunta'];
		                     	$codigo_c = $pregunta['codigo_c'];
		                     	$categoria = $pregunta['categoria'];
		                     	$codigo_p = $pregunta['codigo_p'];
		                     	$pregunta_r = $pregunta['pregunta'];
		                     	$id_respuesta = $pregunta['respuesta_id'];
		                     	$orden_r = $pregunta['orden_r'];
		                     	$respuesta = $pregunta['respuesta'];
		                     	$obs_respuesta = $pregunta['obs_respuesta'];
		                    	
		                    	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}

		                    }
	                    	#$cantCategoriaPregunta++;
	                    	#var_dump($pregunta);

	                    }

	                }

	                $preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
         			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
	                #var_dump($categorias);
	                #$dataCategoria[] = array('id_categoria' => $idCategoria, 'cantPreguntas' => $cantCategoriaPregunta);
	                	

					/*foreach ($categorias_preguntas_norma as $pregunta) {
						
						$row_cp_n = array();
						$row_cp_n[] = $pregunta['id'];
						$row_cp_n[] = $pregunta['id_norma'];
						$row_cp_n[] = $pregunta['id_categoria'];
						$row_cp_n[] = $pregunta['id_pregunta'];
						$row_cp_n[] = $pregunta['codigo_c'];
						$row_cp_n[] = $pregunta['categoria'];
						$row_cp_n[] = $pregunta['codigo_p'];
						$row_cp_n[] = $pregunta['pregunta'];
						$categorias_preguntas[] = $row_cp_n;

						$row = array();
						$row[] = $pregunta['id_pregunta'];
						$row[] = $pregunta['id_categoria'];
						$row[] = $pregunta['codigo_p'];
						$row[] = $pregunta['pregunta'];
						$data[] = $row;
					}*/
				}
			}
			
			$output = array(
				'data_cp_n' => $categorias,
				#'data_cp_n' => $categorias_preguntas,
				#'data_total' => $dataCategoria
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}

	public function desactivarNorma()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idNorma = null;
			if($this->input->POST('id_norma'))
				$idNorma = $this->input->POST('id_norma');
			$resultado = $this->norma_model->desactivarNorma($idNorma, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarNorma()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idNorma = null;
			if($this->input->POST('id_norma'))
				$idNorma = $this->input->POST('id_norma');
			$resultado = $this->norma_model->activarNorma($idNorma, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}
}