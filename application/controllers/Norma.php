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
				$solo_texto = false;
				$visible = false;
				$preguntas_seleccionadas = null;
				$categorias_reporte = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputSoloTexto')) && trim($this->input->POST('inputSoloTexto')) != ""){
					$solo_texto = trim($this->input->POST('inputSoloTexto'));
					if ($solo_texto == "on") {
						$solo_texto = true;
					}
				}

				if(!is_null($this->input->POST('inputVisible')) && trim($this->input->POST('inputVisible')) != ""){
					$visible = trim($this->input->POST('inputVisible'));
					if ($visible == "on") {
						$visible = true;
					}
				}

				if(!is_null($this->input->POST('inputIdNorma')) && is_numeric($this->input->POST('inputIdNorma')))
				{
					$idNorma = $this->input->POST('inputIdNorma');
					#$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado_an = $this->norma_model->agregarNorma($idNorma, $codigo, $nombre, $observacion, $solo_texto, $visible, $usuario["id_usuario"]);
				if($resultado_an && $resultado_an["resultado"] > 0)
				{
					if (isset($resultado_an["temporal"]) && $resultado_an["temporal"] == 1) {
						$accion = "agregado";
					}else{
						$accion = "modificado";
					}

					if($resultado_an['id_norma'])
					{
						if(is_null($idNorma)){
							$idNorma = (int)$resultado_an['id_norma'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Norma exitosamente. </br></br>ID: '.$idNorma.'</br></br>'.$resultado["mensaje"];						
						}else{
							if (isset($resultado_an) && $resultado_an["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Norma exitosamente. </br></br>ID: '.$idNorma.'</br></br>'.$resultado["mensaje"];
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


	public function agregarNormaTemporal()
	{
		$usuario = $this->session->userdata();

		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$datos[] = array();
     			unset($datos[0]);
				$accion = 'agregado';
				$idNorma = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;
				$solo_texto = false;
				$visible = false;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputSoloTexto')) && trim($this->input->POST('inputSoloTexto')) != "" && boolval(trim($this->input->POST('inputSoloTexto')))) {
					$solo_texto = filter_var(trim($this->input->POST('inputSoloTexto')), FILTER_VALIDATE_BOOLEAN); 
				}

				if(!is_null($this->input->POST('inputVisible')) && trim($this->input->POST('inputVisible')) != ""){
					$visible = filter_var(trim($this->input->POST('inputVisible')), FILTER_VALIDATE_BOOLEAN);
				}

				if(!is_null($this->input->POST('inputIdNorma')) && is_numeric($this->input->POST('inputIdNorma')))
				{
					$idNorma = $this->input->POST('inputIdNorma');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado_an = $this->norma_model->agregarNorma($idNorma, $codigo, $nombre, $observacion, $solo_texto, $visible, $usuario["id_usuario"], 1);
				if($resultado_an && $resultado_an["resultado"] > 0)
				{
					if($resultado_an['id_norma'])
					{
						if(is_null($idNorma)){
							$idNorma = (int)$resultado_an['id_norma'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Norma exitosamente. </br></br>ID: '.$idNorma.'</br></br>'.$resultado["mensaje"];
						}
					}
				}

				$datos['resultado'] = $resultado_an["resultado"];
				$datos['mensaje'] = $mensaje;
				$datos['id_norma'] = $idNorma;
			}else{
				$datos['resultado'] = -1;
				$datos['mensaje'] = "No se ha cargado correctamente la pagina.";
				$datos['id_norma'] = null;
			}
			echo json_encode($datos);
		}else
		{
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

				#$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				#$usuario['preguntas'] = $preguntas;
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
     			$id_estado_norma = null;

     			$visible = false;

     			if(!is_null($this->input->post('estado_norma')) && $this->input->post('estado_norma') != "-1"  && $this->input->post('estado_norma') != "")
					$estado_norma = $this->input->post('estado_norma');
#var_dump($estado_norma);
				if ($estado_norma == 1) {
					$visible = true;
				}elseif ($estado_norma == 2) {
					$visible = false;
				}else{
					$visible = true;
				}
     			
				$normas =  $this->norma_model->listarNormas($visible, $usuario["id_usuario"]);
				$table_normas ='
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
		        ';

		        if(isset($normas) && sizeof($normas) > 0)
				{								
					foreach ($normas as $norma) {
						$table_normas .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($norma['solo_texto'] == 1 ? '<i data-feather="check" data-placement="top" class="text-success"></i>': '').'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($norma['visible'] == 1 ? '<i data-feather="check" data-placement="top" class="text-success"></i>': '').'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($norma["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['created_at'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$norma['orden'].'</p></td>

						        <td class="text-center align-middle registro botonTabla">';
						        if ($norma['orden'] > 1 && $norma['visible'] == 1) {	      	
							      	$table_normas .= '<a id="mover_'.$norma['id'].'" class="view_convenio up_norma" data-id="'.$norma['id'].'" data-norma="'.$norma['nombre'].'" data-orden="'.$norma['orden'].'" style="cursor: pointer;">
						        		<i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i>
					        		</a>';
						      	}
						        $table_normas .= '</td>
							    <td class="text-center align-middle registro botonTabla">';
						      	if ($norma['orden'] < sizeof($normas) && $norma['visible'] == 1) {
							      	$table_normas .= '<a id="mover_'.$norma['id'].'" class="view_convenio down_norma" data-id="'.$norma['id'].'" data-norma="'.$norma['nombre'].'" data-orden="'.$norma['orden'].'" style="cursor: pointer;">
						        		<i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i>
					        		</a>';
						      	}
						        $table_normas .= '</td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$norma['id'].'" class="view_convenio" href="ModificarNorma/?idNorma='.$norma['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($norma["estado"] == "1") {
		        					$table_normas .= '<a id="trash_'.$norma['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarNorma" data-id="'.$norma['id'].'" data-norma="'.$norma['nombre'].'">
						        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
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
				$visible = true;
				$normas =  $this->norma_model->listarNormas($visible, $usuario["id_usuario"]);
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
	                     	$orden_pregunta = $pregunta['orden_pregunta'];
	                     	$id_respuesta = $pregunta['respuesta_id'];
	                     	$orden_r = $pregunta['orden_r'];
	                     	$respuesta = $pregunta['respuesta'];
	                     	$obs_respuesta = $pregunta['obs_respuesta'];

	                     	if (is_null($idCategoria)) {
	                     		$idCategoria = $pregunta['id_categoria'];
	                     		$idPregunta = $id_pregunta;
	                     		$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
	                     		$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

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
	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

	                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
			                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
			                     	}

			                     	$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
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
		                     	$orden_pregunta = $pregunta['orden_pregunta'];
		                     	$id_respuesta = $pregunta['respuesta_id'];
		                     	$orden_r = $pregunta['orden_r'];
		                     	$respuesta = $pregunta['respuesta'];
		                     	$obs_respuesta = $pregunta['obs_respuesta'];

		                    	$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
		                    	$respuestas = array();
		                    	$idPregunta = $pregunta['id_pregunta'];
		                    	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

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

	public function eliminarNorma()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$output = array(
				'resultado' => null,
				'mensaje' => null,
				'id_norma' => null
			);

			$idNorma = null;
			if($this->input->POST('idNorma'))
				$idNorma = $this->input->POST('idNorma');
			$resultado = $this->norma_model->eliminarNorma($idNorma, $usuario['id_usuario']);
			if (isset($resultado) && isset($resultado["resultado"]) && $resultado["resultado"] > 0) {
				$output["resultado"] = 1;
			}else{
				$output["resultado"] = -1;
				$output["mensaje"] = $resultado["mensaje"];
			}
			echo json_encode($output);
		}
	}

	public function json_moverNorma()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$funcion = null;

			$data = array();

			$output = array(
				'resultado' => null,
				'mensaje' => null,
				'id_norma' => null
			);

			if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
				$idNorma = $this->input->post('id_norma');

			if(!is_null($this->input->post('funcion')) && $this->input->post('funcion') != "-1"  && $this->input->post('funcion') != "")
				$funcion = $this->input->post('funcion');

			$mover_norma = $this->norma_model->moverNorma($idNorma, $funcion, $usuario["id_usuario"]);
			if (isset($mover_norma) && isset($mover_norma["resultado"]) && $mover_norma["resultado"] > 0) {

				$output["resultado"] = 1;

				/*if (isset($idNorma)) {

					$categorias_reporte_norma = $this->norma_model->listarCategoriasNorma($idNorma, $usuario['id_usuario']);
					if (sizeof($categorias_reporte_norma) > 0) {
						foreach ($categorias_reporte_norma as $categoria_norma) {
							$row_cp_n = array();
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['id'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['orden'].'</p>';
							#$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['codigo'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['nombre'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['observaciones'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['iniciales'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['created_at'].'</p>';
							if ($categoria_norma['orden'] == "1") {
								$row_cp_n[] = '';
							}else{
								$row_cp_n[] = '<a id="up" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i></a>';	
							}
							if ($categoria_norma['orden'] == strval(sizeof($categorias_reporte_norma))) {
								$row_cp_n[] = '';
							}else{
								$row_cp_n[] = '<a id="down" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i></a>';
							}

							

							$row_cp_n[] = '<a class="trash eliminarCategoriaReporte" href="#" data-orden="'.$categoria_norma['orden'].'" data-id="'.$categoria_norma['id'].'"><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>';
							$categorias_norma[] = $row_cp_n;
						}
						$output["categorias_norma"] = $categorias_norma;
					}


				}*/
				

			}else{
				$output["resultado"] = -1;
				$output["mensaje"] = $mover_norma["mensaje"];
			}
			
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
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

	public function json_listarCategoriasReporteNorma()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){

			$idNorma = null;
			$categorias_norma = array();
			$data = array();

			if(!is_null($this->input->post('idNorma')) && $this->input->post('idNorma') != "-1"  && $this->input->post('idNorma') != "")
				$idNorma = $this->input->post('idNorma');

			if (isset($idNorma)) {
				$categorias_reporte_norma = $this->norma_model->listarCategoriasNorma($idNorma, $usuario['id_usuario']);
				if (sizeof($categorias_reporte_norma) > 0) {
					foreach ($categorias_reporte_norma as $categoria_norma) {
						$row_cp_n = array();
						$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['id'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['orden'].'</p>';
						#$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['codigo'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['nombre'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['observaciones'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['iniciales'].'</p>';
						$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['created_at'].'</p>';
						if ($categoria_norma['orden'] == "1") {
							$row_cp_n[] = '';
						}else{
							$row_cp_n[] = '<a id="up" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i></a>';	
						}
						if ($categoria_norma['orden'] == strval(sizeof($categorias_reporte_norma))) {
							$row_cp_n[] = '';
						}else{
							$row_cp_n[] = '<a id="down" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i></a>';
						}
						$row_cp_n[] = '<a class="trash eliminarCategoriaReporte" href="#" data-orden="'.$categoria_norma['orden'].'" data-id="'.$categoria_norma['id'].'" data-nombre="'.$categoria_norma['nombre'].'" data-iniciales="'.$categoria_norma['iniciales'].'"><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>';
						$categorias_norma[] = $row_cp_n;
					}
				}
			}
			
			$output = array(
				'categorias_norma' => $categorias_norma
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}

	public function json_moverCategoriaReporte()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$id_categoria_reporte = null;
			$funcion = null;

			$categorias_norma = array();
			$data = array();

			$output = array(
				'resultado' => null,
				'mensaje' => null,
				'categorias_norma' => null
			);

			if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
				$idNorma = $this->input->post('id_norma');

			if(!is_null($this->input->post('id_categoria_reporte')) && $this->input->post('id_categoria_reporte') != "-1"  && $this->input->post('id_categoria_reporte') != "")
				$id_categoria_reporte = $this->input->post('id_categoria_reporte');

			if(!is_null($this->input->post('funcion')) && $this->input->post('funcion') != "-1"  && $this->input->post('funcion') != "")
				$funcion = $this->input->post('funcion');

			$mover_categoria_reporte = $this->norma_model->moverCategoriaReporte($idNorma, $id_categoria_reporte, $funcion, $usuario["id_usuario"]);
			if (isset($mover_categoria_reporte) && isset($mover_categoria_reporte["resultado"]) && $mover_categoria_reporte["resultado"] > 0) {

				$output["resultado"] = 1;

				if (isset($idNorma)) {
					$categorias_reporte_norma = $this->norma_model->listarCategoriasNorma($idNorma, $usuario['id_usuario']);
					if (sizeof($categorias_reporte_norma) > 0) {
						foreach ($categorias_reporte_norma as $categoria_norma) {
							$row_cp_n = array();
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['id'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['orden'].'</p>';
							#$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['codigo'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['nombre'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['observaciones'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['iniciales'].'</p>';
							$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['created_at'].'</p>';
							if ($categoria_norma['orden'] == "1") {
								$row_cp_n[] = '';
							}else{
								$row_cp_n[] = '<a id="up" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i></a>';	
							}
							if ($categoria_norma['orden'] == strval(sizeof($categorias_reporte_norma))) {
								$row_cp_n[] = '';
							}else{
								$row_cp_n[] = '<a id="down" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i></a>';
							}

							

							$row_cp_n[] = '<a class="trash eliminarCategoriaReporte" href="#" data-orden="'.$categoria_norma['orden'].'" data-id="'.$categoria_norma['id'].'"><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>';
							$categorias_norma[] = $row_cp_n;
						}
						$output["categorias_norma"] = $categorias_norma;
					}
				}
				

			}else{
				$output["resultado"] = -1;
				$output["mensaje"] = $mover_categoria_reporte["mensaje"];
			}
			
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}

	public function eliminarCategoriaReporte()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$output = array(
					'resultado' => null,
					'mensaje' => null,
					'categorias_norma' => null
				);

				$idNorma = null;
				$id_categoria_reporte = null;
				$orden = null;

				if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
				$idNorma = $this->input->post('id_norma');

				if(!is_null($this->input->post('id_categoria_reporte')) && $this->input->post('id_categoria_reporte') != "-1"  && $this->input->post('id_categoria_reporte') != "")
					$id_categoria_reporte = $this->input->post('id_categoria_reporte');

				if(!is_null($this->input->post('orden_categoria_reporte')) && $this->input->post('orden_categoria_reporte') != "-1"  && $this->input->post('orden_categoria_reporte') != "")
					$orden = $this->input->post('orden_categoria_reporte');

				$resultado_ecr = $this->norma_model->eliminarCategoriasReporte($idNorma, $id_categoria_reporte, $orden, $usuario["id_usuario"]);

				if (isset($resultado_ecr) && isset($resultado_ecr["resultado"]) && $resultado_ecr["resultado"] > 0) {

					$output["resultado"] = 1;

					if (isset($idNorma)) {
						$categorias_reporte_norma = $this->norma_model->listarCategoriasNorma($idNorma, $usuario['id_usuario']);
						if (sizeof($categorias_reporte_norma) > 0) {
							foreach ($categorias_reporte_norma as $categoria_norma) {
								$row_cp_n = array();
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['id'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['orden'].'</p>';
								#$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['codigo'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['nombre'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['observaciones'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['iniciales'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['created_at'].'</p>';
								if ($categoria_norma['orden'] == "1") {
									$row_cp_n[] = '';
								}else{
									$row_cp_n[] = '<a id="up" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i></a>';	
								}
								if ($categoria_norma['orden'] == strval(sizeof($categorias_reporte_norma))) {
									$row_cp_n[] = '';
								}else{
									$row_cp_n[] = '<a id="down" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i></a>';
								}

								

								$row_cp_n[] = '<a class="trash eliminarCategoriaReporte" href="#" data-orden="'.$categoria_norma['orden'].'" data-id="'.$categoria_norma['id'].'"><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>';
								$categorias_norma[] = $row_cp_n;
							}
							$output["categorias_norma"] = $categorias_norma;
						}
					}
				}else{
					$output["resultado"] = -1;
					$output["mensaje"] = $resultado_ecr["mensaje"];
				}
				echo json_encode($output);
			}else{
				echo json_encode($output);
			}
		}else{
			redirect('Inicio');
		}
	}


	public function agregarCategoriaReporte()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$output = array(
					'resultado' => null,
					'mensaje' => null,
					'categorias_norma' => null,
					'id_norma' => null
				);

				$id = null;
				$idNorma = null;
				$id_categoria_reporte = null;
				$nombre = null;
				$titulo = null;
				$inicial = null;
				$orden = null;

				if(!is_null($this->input->post('inputIdNorma')) && $this->input->post('inputIdNorma') != "-1"  && $this->input->post('inputIdNorma') != "")
					$idNorma = $this->input->post('inputIdNorma');

				if(!is_null($this->input->post('inputNombreCR')) && $this->input->post('inputNombreCR') != "-1"  && $this->input->post('inputNombreCR') != "")
					$nombre = $this->input->post('inputNombreCR');

				if(!is_null($this->input->post('inputTituloCR')) && $this->input->post('inputTituloCR') != "-1"  && $this->input->post('inputTituloCR') != "")
					$titulo = $this->input->post('inputTituloCR');

				if(!is_null($this->input->post('inputInicialesCR')) && $this->input->post('inputInicialesCR') != "-1"  && $this->input->post('inputInicialesCR') != "")
					$inicial = $this->input->post('inputInicialesCR');

				
				if (is_null($idNorma)) {
					$respuesta = 0;
					$codigo = null;
					$nombre_norma = null;
					$observacion = null;
					$solo_texto = false;
					$visible = false;
					$resultado_an = $this->norma_model->agregarNorma($idNorma, $codigo, $nombre_norma, $observacion, $solo_texto, $visible, $usuario["id_usuario"], 1);
					if($resultado_an && $resultado_an["resultado"] > 0)
					{
						if($resultado_an['id_norma'])
						{
							if(is_null($idNorma)){
								$idNorma = (int)$resultado_an['id_norma'];

								$output["id_norma"] = $idNorma;
								$resultado = 1;
								$mensaje = 'Se ha agregado la Norma exitosamente. </br></br>ID: '.$idNorma.'</br></br>'.$resultado["mensaje"];
							}
						}
					}
				}

				$resultado_acr = $this->norma_model->agregarCategoriaReporte($id, $orden, $titulo, $nombre, $inicial, $idNorma, $usuario["id_usuario"]);
				if (isset($resultado_acr) && isset($resultado_acr["resultado"]) && $resultado_acr["resultado"] > 0) {

					$output["resultado"] = 1;

					if (isset($idNorma)) {
						$categorias_reporte_norma = $this->norma_model->listarCategoriasNorma($idNorma, $usuario['id_usuario'], 1);
						if (sizeof($categorias_reporte_norma) > 0) {
							foreach ($categorias_reporte_norma as $categoria_norma) {
								$row_cp_n = array();
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['id'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['orden'].'</p>';
								#$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['codigo'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['nombre'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['observaciones'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['iniciales'].'</p>';
								$row_cp_n[] = '<p class="texto-pequenio">'.$categoria_norma['created_at'].'</p>';
								if ($categoria_norma['orden'] == "1") {
									$row_cp_n[] = '';
								}else{
									$row_cp_n[] = '<a id="up" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i></a>';	
								}
								if ($categoria_norma['orden'] == strval(sizeof($categorias_reporte_norma))) {
									$row_cp_n[] = '';
								}else{
									$row_cp_n[] = '<a id="down" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i></a>';
								}

								

								$row_cp_n[] = '<a class="trash eliminarCategoriaReporte" href="#" data-orden="'.$categoria_norma['orden'].'" data-id="'.$categoria_norma['id'].'" data-nombre="'.$categoria_norma['nombre'].'" data-iniciales="'.$categoria_norma['iniciales'].'"><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>';
								$categorias_norma[] = $row_cp_n;
							}
							$output["categorias_norma"] = $categorias_norma;
						}
					}
				}else{
					$output["resultado"] = -1;
					$output["mensaje"] = $resultado_acr["mensaje"];
				}
				echo json_encode($output);
			}else{
				echo json_encode($output);
			}
		}else{
			redirect('Inicio');
		}
	}

	public function agregarCategoriaPregunta()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$output = array(
					'resultado' => null,
					'mensaje' => null,
					'categorias_norma' => null,
					'id_norma' => null
				);

				
				$idNorma = null;
				$id_categoria = null;
				$id_pregunta = null;

				if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
					$idNorma = $this->input->post('id_norma');

				if(!is_null($this->input->post('id_categoria')) && $this->input->post('id_categoria') != "-1"  && $this->input->post('id_categoria') != "")
					$id_categoria = $this->input->post('id_categoria');

				if(!is_null($this->input->post('id_pregunta')) && $this->input->post('id_pregunta') != "-1"  && $this->input->post('id_pregunta') != "")
					$id_pregunta = $this->input->post('id_pregunta');

				
				if (is_null($idNorma)) {
					$respuesta = 0;
					$codigo = null;
					$nombre_norma = null;
					$observacion = null;
					$solo_texto = false;
					$visible = false;
					$resultado_an = $this->norma_model->agregarNorma($idNorma, $codigo, $nombre_norma, $observacion, $solo_texto, $visible, $usuario["id_usuario"], 1);
					if($resultado_an && $resultado_an["resultado"] > 0)
					{
						if($resultado_an['id_norma'])
						{
							if(is_null($idNorma)){
								$idNorma = (int)$resultado_an['id_norma'];

								$output["id_norma"] = $idNorma;
								$resultado = 1;
								$mensaje = 'Se ha agregado la Norma exitosamente. </br></br>ID: '.$idNorma.'</br></br>'.$resultado["mensaje"];
							}
						}
					}
				}

				if (!is_null($idNorma) && !is_null($id_categoria) && !is_null($id_pregunta)) {

					$resultado_acpn = $this->norma_model->agregarCategoriaPreguntaNorma($idNorma, $id_categoria, $id_pregunta, $usuario["id_usuario"]);
					#$resultado_acr = $this->norma_model->agregarCategoriaReporte($id, $orden, $titulo, $nombre, $inicial, $idNorma, $usuario["id_usuario"]);
					if (isset($resultado_acpn) && isset($resultado_acpn["resultado"]) && $resultado_acpn["resultado"] > 0) {

						$output["resultado"] = 1;
						$output["id_norma"] = $idNorma;
						$output["id_categoria"] = $id_categoria;
						$output["id_pregunta"] = $id_pregunta;

						if (isset($idNorma)) {
							$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);
							if (sizeof($categorias_preguntas_norma) > 0) {
								$categorias = array();
								$preguntas = array();
								$respuestas = array();

								$idCategoria = null;
								$idPregunta = null;

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

									if ($idCategoria != $pregunta['id_categoria'])
				                    {
				                     	$id_pregunta = $pregunta['id_pregunta'];
				                     	$codigo_c = $pregunta['codigo_c'];
				                     	$categoria = $pregunta['categoria'];
				                     	$codigo_p = $pregunta['codigo_p'];
				                     	$pregunta_r = $pregunta['pregunta'];
				                     	$orden_pregunta = $pregunta['orden_pregunta'];
				                     	$id_respuesta = $pregunta['respuesta_id'];
				                     	$orden_r = $pregunta['orden_r'];
				                     	$respuesta = $pregunta['respuesta'];
				                     	$obs_respuesta = $pregunta['obs_respuesta'];

				                     	if (is_null($idCategoria)) {
				                     		$idCategoria = $pregunta['id_categoria'];
				                     		$idPregunta = $id_pregunta;
				                     		$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
				                     		$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

					                     	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
					                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
					                     	}
				                     	}else{
			                     			$idCategoria = $pregunta['id_categoria'];
			                     		
			                     			$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
			                     			$respuestas = array();
			                     			$idPregunta = $pregunta['id_pregunta'];
			                     			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
			                     			$preguntas = array();
			                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

			                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
					                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
					                     	}
					                     	$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
				                     	}
				                    }else{
				                    	if ($idPregunta != $pregunta['id_pregunta'])
					                    {
					                    	$id_pregunta = $pregunta['id_pregunta'];
					                     	$codigo_c = $pregunta['codigo_c'];
					                     	$categoria = $pregunta['categoria'];
					                     	$codigo_p = $pregunta['codigo_p'];
					                     	$pregunta_r = $pregunta['pregunta'];
					                     	$orden_pregunta = $pregunta['orden_pregunta'];
					                     	$id_respuesta = $pregunta['respuesta_id'];
					                     	$orden_r = $pregunta['orden_r'];
					                     	$respuesta = $pregunta['respuesta'];
					                     	$obs_respuesta = $pregunta['obs_respuesta'];
					                    	$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
					                    	$respuestas = array();
					                    	$idPregunta = $pregunta['id_pregunta'];
					                    	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);
					                    	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
					                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
					                     	}
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
				                    }
				                }

				                $preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
			         			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
				                $output["data_cp_n"] = $categorias;
							}
						}
						
						$output['data_cp_n'] = $categorias;
					}else{
						$output["resultado"] = -1;
						$output["mensaje"] = $resultado_acpn["mensaje"];
					}
				}else{
					$output["resultado"] = -1;
					$output["mensaje"] = "Los valores vienen en blanco.";
				}
				
				echo json_encode($output);
			}else{
				echo json_encode($output);
			}
		}else{
			redirect('Inicio');
		}
	}


	public function json_moverCategoriaPregunta()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$id_categoria = null;
			$id_pregunta = null;
			$funcion = null;
			$mover_categoria_pregunta = null;

			$categorias_norma = array();
			$data = array();

			$output = array(
				'resultado' => null,
				'mensaje' => null,
				'categorias_norma' => null
			);

			if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
				$idNorma = $this->input->post('id_norma');

			if(!is_null($this->input->post('id_categoria')) && $this->input->post('id_categoria') != "-1"  && $this->input->post('id_categoria') != "")
				$id_categoria = $this->input->post('id_categoria');

			if(!is_null($this->input->post('id_pregunta')) && $this->input->post('id_pregunta') != "-1"  && $this->input->post('id_pregunta') != "")
				$id_pregunta = $this->input->post('id_pregunta');

			if(!is_null($this->input->post('funcion')) && $this->input->post('funcion') != "-1"  && $this->input->post('funcion') != "")
				$funcion = $this->input->post('funcion');



			if (!is_null($id_pregunta)) {
				$mover_categoria_pregunta = $this->norma_model->moverNormaCategoriaPregunta($idNorma, $id_categoria, $id_pregunta, $funcion, $usuario["id_usuario"]);
				if (isset($mover_categoria_pregunta) && isset($mover_categoria_pregunta["resultado"]) && $mover_categoria_pregunta["resultado"] > 0) {
					$output["resultado"] = 1;
				}else{
					$output["resultado"] = -1;
				}
			}else{
				$mover_categoria_pregunta = $this->norma_model->moverCategoriaPregunta($idNorma, $id_categoria, $funcion, $usuario["id_usuario"]);
				if (isset($mover_categoria_pregunta) && isset($mover_categoria_pregunta["resultado"]) && $mover_categoria_pregunta["resultado"] > 0) {
					$output["resultado"] = 1;
				}else{
					$output["resultado"] = -1;
				}
			}

			$output['idNorma'] = $idNorma;
			$output['id_categoria'] =$id_categoria;
			$output['id_pregunta'] =$id_pregunta;
			

			if (isset($idNorma)) {
				$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);
				if (sizeof($categorias_preguntas_norma) > 0) {
					$categorias = array();
					$preguntas = array();
					$respuestas = array();

					$idCategoria = null;
					$idPregunta = null;

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

						if ($idCategoria != $pregunta['id_categoria'])
	                    {
	                     	$id_pregunta = $pregunta['id_pregunta'];
	                     	$codigo_c = $pregunta['codigo_c'];
	                     	$categoria = $pregunta['categoria'];
	                     	$codigo_p = $pregunta['codigo_p'];
	                     	$pregunta_r = $pregunta['pregunta'];
	                     	$orden_pregunta = $pregunta['orden_pregunta'];
	                     	$id_respuesta = $pregunta['respuesta_id'];
	                     	$orden_r = $pregunta['orden_r'];
	                     	$respuesta = $pregunta['respuesta'];
	                     	$obs_respuesta = $pregunta['obs_respuesta'];

	                     	if (is_null($idCategoria)) {
	                     		$idCategoria = $pregunta['id_categoria'];
	                     		$idPregunta = $id_pregunta;
	                     		$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
	                     		$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

		                     	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}
	                     	}else{
                     			$idCategoria = $pregunta['id_categoria'];
                     		
                     			$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
                     			$respuestas = array();
                     			$idPregunta = $pregunta['id_pregunta'];
                     			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
                     			$preguntas = array();
                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}
		                     	$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
	                     	}
	                    }else{
	                    	if ($idPregunta != $pregunta['id_pregunta'])
		                    {
		                    	$id_pregunta = $pregunta['id_pregunta'];
		                     	$codigo_c = $pregunta['codigo_c'];
		                     	$categoria = $pregunta['categoria'];
		                     	$codigo_p = $pregunta['codigo_p'];
		                     	$pregunta_r = $pregunta['pregunta'];
		                     	$orden_pregunta = $pregunta['orden_pregunta'];
		                     	$id_respuesta = $pregunta['respuesta_id'];
		                     	$orden_r = $pregunta['orden_r'];
		                     	$respuesta = $pregunta['respuesta'];
		                     	$obs_respuesta = $pregunta['obs_respuesta'];
		                    	$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
		                    	$respuestas = array();
		                    	$idPregunta = $pregunta['id_pregunta'];
		                    	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);
		                    	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}
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
	                    }
	                }

	                $preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
         			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
	                $output["data_cp_n"] = $categorias;
				}

			}else{
				$output["resultado"] = -1;
				$output["mensaje"] = $mover_categoria_pregunta["mensaje"];
			}
			
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}

	public function eliminarCategoriaPregunta()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$output = array(
					'resultado' => null,
					'mensaje' => null,
					'categorias_norma' => null
				);

				$idNorma = null;
				$id_categoria = null;
				$codigo = null;
				$orden = null;

				if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
				$idNorma = $this->input->post('id_norma');

				if(!is_null($this->input->post('id_categoria')) && $this->input->post('id_categoria') != "-1"  && $this->input->post('id_categoria') != "")
					$id_categoria = $this->input->post('id_categoria');

				if(!is_null($this->input->post('codigo')) && $this->input->post('codigo') != "-1"  && $this->input->post('codigo') != "")
					$codigo = $this->input->post('codigo');

				if(!is_null($this->input->post('orden')) && $this->input->post('orden') != "-1"  && $this->input->post('orden') != "")
					$orden = $this->input->post('orden');

				$resultado_ec = $this->norma_model->eliminarCategoria($idNorma, $id_categoria, $orden, $usuario["id_usuario"]);

				if (isset($resultado_ec) && isset($resultado_ec["resultado"]) && $resultado_ec["resultado"] > 0) {

					$output["resultado"] = 1;

					if (isset($idNorma)) {





						$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);
						if (sizeof($categorias_preguntas_norma) > 0) {
							$categorias = array();
							$preguntas = array();
							$respuestas = array();

							$idCategoria = null;
							$idPregunta = null;

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

								if ($idCategoria != $pregunta['id_categoria'])
			                    {
			                     	$id_pregunta = $pregunta['id_pregunta'];
			                     	$codigo_c = $pregunta['codigo_c'];
			                     	$categoria = $pregunta['categoria'];
			                     	$codigo_p = $pregunta['codigo_p'];
			                     	$pregunta_r = $pregunta['pregunta'];
			                     	$orden_pregunta = $pregunta['orden_pregunta'];
			                     	$id_respuesta = $pregunta['respuesta_id'];
			                     	$orden_r = $pregunta['orden_r'];
			                     	$respuesta = $pregunta['respuesta'];
			                     	$obs_respuesta = $pregunta['obs_respuesta'];

			                     	if (is_null($idCategoria)) {
			                     		$idCategoria = $pregunta['id_categoria'];
			                     		$idPregunta = $id_pregunta;
			                     		$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
			                     		$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

				                     	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
				                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
				                     	}
			                     	}else{
		                     			$idCategoria = $pregunta['id_categoria'];
		                     		
		                     			$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
		                     			$respuestas = array();
		                     			$idPregunta = $pregunta['id_pregunta'];
		                     			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
		                     			$preguntas = array();
		                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

		                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
				                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
				                     	}
				                     	$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
			                     	}
			                    }else{
			                    	if ($idPregunta != $pregunta['id_pregunta'])
				                    {
				                    	$id_pregunta = $pregunta['id_pregunta'];
				                     	$codigo_c = $pregunta['codigo_c'];
				                     	$categoria = $pregunta['categoria'];
				                     	$codigo_p = $pregunta['codigo_p'];
				                     	$pregunta_r = $pregunta['pregunta'];
				                     	$orden_pregunta = $pregunta['orden_pregunta'];
				                     	$id_respuesta = $pregunta['respuesta_id'];
				                     	$orden_r = $pregunta['orden_r'];
				                     	$respuesta = $pregunta['respuesta'];
				                     	$obs_respuesta = $pregunta['obs_respuesta'];
				                    	$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
				                    	$respuestas = array();
				                    	$idPregunta = $pregunta['id_pregunta'];
				                    	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);
				                    	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
				                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
				                     	}
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
			                    }
			                }

			                $preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
		         			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
			                $output["data_cp_n"] = $categorias;
						}





					}
				}else{
					$output["resultado"] = -1;
					$output["mensaje"] = $resultado_ec["mensaje"];
				}
				echo json_encode($output);
			}else{
				echo json_encode($output);
			}
		}else{
			redirect('Inicio');
		}
	}


	public function eliminarPregunta()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$output = array(
					'resultado' => null,
					'mensaje' => null,
					'categorias_norma' => null
				);

				$idNorma = null;
				$id_categoria = null;
				$id_pregunta = null;
				$codigo = null;
				$orden = null;

				if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
				$idNorma = $this->input->post('id_norma');

				if(!is_null($this->input->post('id_categoria')) && $this->input->post('id_categoria') != "-1"  && $this->input->post('id_categoria') != "")
					$id_categoria = $this->input->post('id_categoria');

				if(!is_null($this->input->post('id_pregunta')) && $this->input->post('id_pregunta') != "-1"  && $this->input->post('id_pregunta') != "")
					$id_pregunta = $this->input->post('id_pregunta');

				if(!is_null($this->input->post('codigo')) && $this->input->post('codigo') != "-1"  && $this->input->post('codigo') != "")
					$codigo = $this->input->post('codigo');

				if(!is_null($this->input->post('orden')) && $this->input->post('orden') != "-1"  && $this->input->post('orden') != "")
					$orden = $this->input->post('orden');

				$resultado_ep = $this->norma_model->eliminarPregunta($idNorma, $id_categoria, $id_pregunta, $orden, $usuario["id_usuario"]);

				if (isset($resultado_ep) && isset($resultado_ep["resultado"]) && $resultado_ep["resultado"] > 0) {

					$output["resultado"] = 1;
					$output['idNorma'] = $idNorma;
					$output['id_categoria'] =$id_categoria;
					$output['id_pregunta'] =$id_pregunta;

					if (isset($idNorma)) {



						$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);
						if (sizeof($categorias_preguntas_norma) > 0) {
							$categorias = array();
							$preguntas = array();
							$respuestas = array();

							$idCategoria = null;
							$idPregunta = null;

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

								if ($idCategoria != $pregunta['id_categoria'])
			                    {
			                     	$id_pregunta = $pregunta['id_pregunta'];
			                     	$codigo_c = $pregunta['codigo_c'];
			                     	$categoria = $pregunta['categoria'];
			                     	$codigo_p = $pregunta['codigo_p'];
			                     	$pregunta_r = $pregunta['pregunta'];
			                     	$orden_pregunta = $pregunta['orden_pregunta'];
			                     	$id_respuesta = $pregunta['respuesta_id'];
			                     	$orden_r = $pregunta['orden_r'];
			                     	$respuesta = $pregunta['respuesta'];
			                     	$obs_respuesta = $pregunta['obs_respuesta'];

			                     	if (is_null($idCategoria)) {
			                     		$idCategoria = $pregunta['id_categoria'];
			                     		$idPregunta = $id_pregunta;
			                     		$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
			                     		$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

				                     	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
				                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
				                     	}
			                     	}else{
		                     			$idCategoria = $pregunta['id_categoria'];
		                     		
		                     			$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
		                     			$respuestas = array();
		                     			$idPregunta = $pregunta['id_pregunta'];
		                     			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
		                     			$preguntas = array();
		                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);

		                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
				                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
				                     	}
				                     	$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "orden_categoria" => $pregunta["orden_categoria"], "preguntas" => []);
			                     	}
			                    }else{
			                    	if ($idPregunta != $pregunta['id_pregunta'])
				                    {
				                    	$id_pregunta = $pregunta['id_pregunta'];
				                     	$codigo_c = $pregunta['codigo_c'];
				                     	$categoria = $pregunta['categoria'];
				                     	$codigo_p = $pregunta['codigo_p'];
				                     	$pregunta_r = $pregunta['pregunta'];
				                     	$orden_pregunta = $pregunta['orden_pregunta'];
				                     	$id_respuesta = $pregunta['respuesta_id'];
				                     	$orden_r = $pregunta['orden_r'];
				                     	$respuesta = $pregunta['respuesta'];
				                     	$obs_respuesta = $pregunta['obs_respuesta'];
				                    	$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
				                    	$respuestas = array();
				                    	$idPregunta = $pregunta['id_pregunta'];
				                    	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "orden_pregunta" => $orden_pregunta, "respuestas" => []);
				                    	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
				                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
				                     	}
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
			                    }
			                }

			                $preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
		         			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
			                $output["data_cp_n"] = $categorias;
						}





					}
				}else{
					$output["resultado"] = -1;
					$output["mensaje"] = $resultado_ep["mensaje"];
				}
				echo json_encode($output);
			}else{
				echo json_encode($output);
			}
		}else{
			redirect('Inicio');
		}
	}

	public function json_listarPreguntasNorma()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$id_categoria = null;

			$preguntas_norma = array();
			$output = array(
				'resultado' => null,
				'mensaje' => null,
				'preguntas_norma' => null
			);

			if(!is_null($this->input->post('id_norma')) && $this->input->post('id_norma') != "-1"  && $this->input->post('id_norma') != "")
				$idNorma = $this->input->post('id_norma');

			if(!is_null($this->input->post('id_categoria')) && $this->input->post('id_categoria') != "-1"  && $this->input->post('id_categoria') != "")
				$id_categoria = $this->input->post('id_categoria');

			$preguntas =  $this->norma_model->listarPreguntasNormaCategoria($idNorma, $id_categoria, $usuario["id_usuario"]);
			if (isset($preguntas) && sizeof($preguntas) > 0) {
				$output["resultado"] = 1;	
				foreach ($preguntas as $pregunta) {
					$row_cp_n = array();
					$row_cp_n[] = '<p class="texto-pequenio">'.$pregunta['id'].'</p>';
					$row_cp_n[] = '<p class="texto-pequenio">'.$pregunta['codigo'].'</p>';
					$row_cp_n[] = '<p class="texto-pequenio">'.$pregunta['nombre'].'</p>';
					$row_cp_n[] = '<p class="texto-pequenio">'.($pregunta["estado"] == "1" ? "Activo" : "Eliminado").'</p>';
					$row_cp_n[] = '<p class="texto-pequenio">'.$pregunta['created_at'].'</p>';
					#$row_cp_n[] = '<button type="button" class="btn btn-outline-success btn-sm seleccionarPregunta" data-id="'.$pregunta['id'].'" data-codigo="'.$pregunta['codigo'].'" data-nombre="'.$pregunta['nombre'].'">Seleccionar</button>';
					$preguntas_norma[] = $row_cp_n;
				}
				$output["preguntas_norma"] = $preguntas_norma;
			}else{
				$output["resultado"] = -1;
				$output["mensaje"] = $preguntas["mensaje"];
			}
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}

}