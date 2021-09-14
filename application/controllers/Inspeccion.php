<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inspeccion extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('pregunta_model');
		$this->load->model('inspeccion_model');
		$this->load->model('checklist_model');
		$this->load->model('norma_model');
		$this->load->model('categoria_model');
		$this->load->model('herramienta_model');
		$this->load->model('carpeta_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarInspecciones', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idInspeccion = null;
				$codigo = null;
				$nombre = null;
				$observacion = null;

				if(!is_null($this->input->POST('inputCodigo')) && trim($this->input->POST('inputCodigo')) != "")
					$codigo = trim($this->input->POST('inputCodigo'));

				if(!is_null($this->input->POST('inputNombre')) && trim($this->input->POST('inputNombre')) != "")
					$nombre = trim($this->input->POST('inputNombre'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				if(!is_null($this->input->POST('inputIdInspeccion')) && is_numeric($this->input->POST('inputIdInspeccion')))
				{
					$idInspeccion = $this->input->POST('inputIdInspeccion');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->inspeccion_model->agregarInspeccion($idInspeccion, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_inspeccion'])
					{
						if(is_null($idInspeccion)){
							$idInspeccion = (int)$resultado['id_inspeccion'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (!isset($resultado["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
						
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_inspeccion'] = $idInspeccion;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar Inspeccion';
				$usuario['controller'] = 'inspeccion';

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;

				$checklists =  $this->checklist_model->listarCheckLists($usuario["id_usuario"]);
				$usuario['checklists'] = $checklists;

				$normas =  $this->norma_model->listarNormas($usuario["id_usuario"]);
				$usuario['normas'] = $normas;

				$herramientas =  $this->herramienta_model->listarHerramientas($usuario["id_usuario"]);
				$usuario['herramientas'] = $herramientas;

				$carpetas =  $this->carpeta_model->listarCarpetas($usuario["id_usuario"]);
				$usuario['carpetas'] = $carpetas;

				/*$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma(1, $usuario['id_usuario']);
				$dataCategoria = array();
				$cantCategoria = 0;
				$cantCategoriaPregunta = 0;
				$idCategoria = null;

				foreach ($categorias_preguntas_norma as $pregunta) {
					if ($idCategoria != $pregunta['id_categoria'])
                    {
                    	if ($idCategoria)
                    		$dataCategoria[] = array('id_categoria' => $idCategoria, 'cantPreguntas' => $cantCategoriaPregunta);
                    	$cantCategoriaPregunta = 0;
                     	$cantCategoria++;
                     	$cantCategoriaPregunta++;
                     	$idCategoria = $pregunta['id_categoria'];
                    }else{
                    	$cantCategoriaPregunta++;
                    }
                }

                var_dump($dataCategoria);*/

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarInspeccion', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Inspeccion';
			$usuario['controller'] = 'inspeccion';

			if($this->input->GET('idInspeccion') && $this->input->GET('idInspeccion'))
			{
				$idInspeccion = $this->input->GET('idInspeccion');
				$inspeccion =  $this->inspeccion_model->obtenerInspeccion($idInspeccion, $usuario['id_usuario']);
				$usuario['inspeccion'] = $inspeccion[0];
				$usuario['titulo'] = 'Modificar Inspeccion';
				$servicio_salud = $this->servicioSalud_model->listarServicioSaludUsu($usuario["id_usuario"]);
				$usuario['servicios'] = $servicio_salud;

				$cluster =  $this->inspeccion_model->listarClusterUsu($usuario["id_usuario"]);
				$usuario['cluster'] = $cluster;				
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarInspeccion', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarInspecciones()
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

				$inspecciones =  $this->inspeccion_model->listarInspecciones($usuario["id_usuario"]);

				$table_inspecciones ='
				<table id="tListaInspecciones" class="table table-sm table-hover table-bordered">
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
				<tbody id="tbodyInspecciones">
		        ';

		        if(isset($inspecciones) && sizeof($inspecciones) > 0)
				{								
					foreach ($inspecciones as $inspeccion) {
						$table_inspecciones .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($inspeccion["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['created_at'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['cluster'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['servicio_salud'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['region'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['macro_zona'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$inspeccion['id'].'" class="view_convenio" href="ModificarInspeccion/?idInspeccion='.$inspeccion['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($inspeccion["estado"] == "1") {
		        					$table_inspecciones .= '<a id="trash_'.$inspeccion['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarInspeccion" data-id="'.$inspeccion['id'].'" data-inspeccion="'.$inspeccion['nombre'].'">
						        		<i data-feather="x-circle" data-toggle="tooltip" data-placement="top" title="Desactivar"></i>       		
					        		</a>';
				        		}else{
	        						$table_inspecciones .= '<a id="trash_'.$inspeccion['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarInspeccion" data-id="'.$inspeccion['id'].'" data-inspeccion="'.$inspeccion['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_inspecciones .= '</td>
					    	</tr>';
					}
				}

		        $table_inspecciones .='
		        	</tbody>
		        </table>';

				$datos['table_inspecciones'] = $table_inspecciones;
				echo json_encode($datos);

				
			}else{

				$inspecciones =  $this->inspeccion_model->listarInspecciones($usuario["id_usuario"]);
				$usuario['inspecciones'] = $inspecciones;
				
				$usuario['controller'] = 'inspeccion';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarInspecciones', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function desactivarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idInspeccion = null;
			if($this->input->POST('id_inspeccion'))
				$idInspeccion = $this->input->POST('id_inspeccion');
			$resultado = $this->inspeccion_model->desactivarInspeccion($idInspeccion, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idInspeccion = null;
			if($this->input->POST('id_inspeccion'))
				$idInspeccion = $this->input->POST('id_inspeccion');
			$resultado = $this->inspeccion_model->activarInspeccion($idInspeccion, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function prueba($idFolio)
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Verificar Identidad';
			$usuario['controller'] = 'inspeccion';
			$usuario['idTraspaso'] = $idFolio;
			$this->load->view('prueba', $usuario);
		}
	}
}