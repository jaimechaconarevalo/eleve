<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CheckList extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('pregunta_model');
		$this->load->model('checklist_model');
		$this->load->model('norma_model');
		$this->load->model('categoria_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarCheckLists', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarCheckList()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$accion = 'agregado';
				$idCheckList = null;
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

				if(!is_null($this->input->POST('inputIdCheckList')) && is_numeric($this->input->POST('inputIdCheckList')))
				{
					$idCheckList = $this->input->POST('inputIdCheckList');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->checklist_model->agregarCheckList($idCheckList, $codigo, $nombre, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_checklist'])
					{
						if(is_null($idCheckList)){
							$idCheckList = (int)$resultado['id_checklist'];

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la CheckList exitosamente. </br></br>ID: '.$idCheckList.'</br></br>'.$resultado["mensaje"];

							$contador_p = 0;
							if (sizeof($preguntas_seleccionadas) > 0) {
								foreach ($preguntas_seleccionadas as $pregunta) {
									$id_pregunta = $pregunta[0];
									$id_categoria = $pregunta[1];
									$resultado_acpn = $this->checklist_model->agregarCategoriaPreguntaChecklist($idCheckList, $id_categoria, $id_pregunta, $usuario["id_usuario"]);
									if (isset($resultado_acpn) && $resultado_acpn["resultado"] == 1)
										$contador_p++;
								}

								if ($contador_p > 0)
									$mensaje .= ' Se han agregado '.$contador_p.' Preguntas al Checklist.</br></br>';
							}

						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la CheckList exitosamente. </br></br>ID: '.$idCheckList.'</br></br>'.$resultado["mensaje"];

								$resultado_ecp = $this->checklist_model->eliminarCategoriaPregunta($idCheckList, $usuario["id_usuario"]);
								if (isset($resultado_ecp) && $resultado_ecp["resultado"] > 0) {
									$contador_p = 0;
									if (sizeof($preguntas_seleccionadas) > 0) {
										foreach ($preguntas_seleccionadas as $pregunta) {
											$id_pregunta = $pregunta[0];
											$id_categoria = $pregunta[1];
											$resultado_acpn = $this->checklist_model->agregarCategoriaPreguntaChecklist($idCheckList, $id_categoria, $id_pregunta, $usuario["id_usuario"]);
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
								$mensaje = 'Ha ocurrido un error al '.$accion.' la CheckList, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (!isset($resultado["mensaje"])) {
							$mensaje = 'Ha ocurrido un error al '.$accion.' la CheckList, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$mensaje = 'Ha ocurrido un error al '.$accion.' la CheckList, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
						
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				$data['id_checklist'] = $idCheckList;
				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar CheckList';
				$usuario['controller'] = 'checklist';

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;

				$normas =  $this->norma_model->listarNormas($usuario["id_usuario"]);
				$usuario['normas'] = $normas;

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarCheckList', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function modificarCheckList()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar CheckList';
			$usuario['controller'] = 'checklist';

			if($this->input->GET('idCheckList') && $this->input->GET('idCheckList'))
			{
				$idCheckList = $this->input->GET('idCheckList');
				$checklist =  $this->checklist_model->obtenerCheckList($idCheckList, $usuario['id_usuario']);
				$usuario['checklist'] = $checklist[0];
				$usuario['titulo'] = 'Modificar CheckList';
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarCheckList', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarCheckLists()
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

				$checklists =  $this->checklist_model->listarCheckLists($usuario["id_usuario"]);

				$table_checklists ='
				<table id="tListaCheckLists" class="table table-sm table-hover table-bordered">
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
				<tbody id="tbodyCheckLists">
		        ';

		        if(isset($checklists) && sizeof($checklists) > 0)
				{								
					foreach ($checklists as $checklist) {
						$table_checklists .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['id'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['codigo'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['nombre'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($checklist["estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['created_at'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['cluster'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['servicio_salud'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['region'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$checklist['macro_zona'].'</p></td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$checklist['id'].'" class="view_convenio" href="ModificarCheckList/?idCheckList='.$checklist['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';

					        	if ($checklist["estado"] == "1") {
		        					$table_checklists .= '<a id="trash_'.$checklist['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarCheckList" data-id="'.$checklist['id'].'" data-checklist="'.$checklist['nombre'].'">
						        		<i data-feather="x-circle" data-toggle="tooltip" data-placement="top" title="Desactivar"></i>       		
					        		</a>';
				        		}else{
	        						$table_checklists .= '<a id="trash_'.$checklist['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarCheckList" data-id="'.$checklist['id'].'" data-checklist="'.$checklist['nombre'].'">
						        		<i data-feather="check-circle" data-toggle="tooltip" data-placement="top" title="Activar"></i>       		
					        		</a>';
					        	}

					        	$table_checklists .= '</td>
					    	</tr>';
					}
				}

		        $table_checklists .='
		        	</tbody>
		        </table>';

				$datos['table_checklists'] = $table_checklists;
				echo json_encode($datos);

				
			}else{

				$checklists =  $this->checklist_model->listarCheckLists($usuario["id_usuario"]);
				$usuario['checklists'] = $checklists;
				
				$usuario['controller'] = 'checklist';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarCheckLists', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function desactivarCheckList()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idCheckList = null;
			if($this->input->POST('id_checklist'))
				$idCheckList = $this->input->POST('id_checklist');
			$resultado = $this->checklist_model->desactivarCheckList($idCheckList, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarCheckList()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idCheckList = null;
			if($this->input->POST('id_checklist'))
				$idCheckList = $this->input->POST('id_checklist');
			$resultado = $this->checklist_model->activarCheckList($idCheckList, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}
}