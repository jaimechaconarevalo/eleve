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

				/*if (isset($_POST['documentType']) && ($_FILES['id_front']['size'] != '') && ($_FILES['id_back']['size'] != '') && ($_FILES['selfie']['size'] != '')
				 && ($_POST['documentType'] != '')) {
				    $id_front =  file_get_contents($_FILES["id_front"]['tmp_name']);
					$id_back = file_get_contents($_FILES["id_back"]['tmp_name']);
					$selfie = file_get_contents($_FILES["selfie"]['tmp_name']);
				    $documentType = $_POST['documentType'];
				    $idTraspaso = $_POST['idTraspaso'];
				    $params = array(
				        'apiKey' => $apiKey,
				        'id_front' => $id_front,
				        'id_back' => $id_back,
				        'selfie' => $selfie,
				        'documentType' => $documentType
				    );*/

				    #var_dump($this->input->POST());
				    #var_dump($_FILES['picture_6_1_1']);

				    /*var_dump($_FILES['file_6_1_1']);
				    var_dump($_FILES['dot.png']);
				    var_dump($_FILES);

				    $tood = $request->files->get('file_111');
				    var_dump($todo);*/
				$accion = 'agregado';
				$idInspeccion = null;
				$tecnico = null;
				$nombreE = null;
				$direccionE = null;
				$rutE = null;
				$idE = null;
				$nombreA = null;
				$rutA = null;
				$emailA = null;
				//$fechaC = null;
				//$contratoV = null;
				$idEmpresaM = null;
				$nombreRM = null;
				$fechaUM = null;

				$marca = null;
				$idUso = null;
				$capacidad = null;
				$capacidadKG = null;
				$idSuspension = null;
				$salaMaquina = null;
				$velocidad = null;
				$recorrido = null;
				$paradas = null;
				$idTipoTraccion = null;
				$diamTraccion = null;
				$enclavamientoE = null;
				$enclavamientoM = null;
				$diamCableL = null;
				$idNorma = null;

				if(!is_null($this->input->POST('inputTecnico')) && trim($this->input->POST('inputTecnico')) != "")
					$tecnico = trim($this->input->POST('inputTecnico'));

				if(!is_null($this->input->POST('inputNombreE')) && trim($this->input->POST('inputNombreE')) != "")
					$nombreE = trim($this->input->POST('inputNombreE'));

				if(!is_null($this->input->POST('inputDireccionE')) && trim($this->input->POST('inputDireccionE')) != "")
					$direccionE = trim($this->input->POST('inputDireccionE'));

				if(!is_null($this->input->POST('inputRutE')) && trim($this->input->POST('inputRutE')) != "")
					$rutE = trim($this->input->POST('inputRutE'));

				if(!is_null($this->input->POST('inputIdE')) && trim($this->input->POST('inputIdE')) != "")
					$idE = trim($this->input->POST('inputIdE'));

				if(!is_null($this->input->POST('inputNombreA')) && trim($this->input->POST('inputNombreA')) != "")
					$nombreA = trim($this->input->POST('inputNombreA'));

				if(!is_null($this->input->POST('inputRutA')) && trim($this->input->POST('inputRutA')) != "")
					$rutA = trim($this->input->POST('inputRutA'));

				if(!is_null($this->input->POST('inputEmailA')) && trim($this->input->POST('inputEmailA')) != "")
					$emailA = trim($this->input->POST('inputEmailA'));

				/*if(!is_null($this->input->POST('inputFechaContrato')) && trim($this->input->POST('inputFechaContrato')) != "")
					$fechaC = trim($this->input->POST('inputFechaContrato'));

				if(!is_null($this->input->POST('selectContratoVigente')) && trim($this->input->POST('selectContratoVigente')) != "")
					$contratoV = trim($this->input->POST('selectContratoVigente'));*/

				if(!is_null($this->input->POST('idEmpresaMantenedora')) && trim($this->input->POST('idEmpresaMantenedora')) != "")
					$idEmpresaM = trim($this->input->POST('idEmpresaMantenedora'));

				if(!is_null($this->input->POST('inputNombreRM')) && trim($this->input->POST('inputNombreRM')) != "")
					$nombreRM = trim($this->input->POST('inputNombreRM'));

				if(!is_null($this->input->POST('inputFechaUM')) && trim($this->input->POST('inputFechaUM')) != "")
					$fechaUM = trim($this->input->POST('inputFechaUM'));


				$totalCarpeta = null;
				$totalHerramientas = null;
				$totalNormas = null;
				$totalCategorias = null;

				if(!is_null($this->input->POST('inputTotalCarpetas')) && trim($this->input->POST('inputTotalCarpetas')) != "")
					$totalCarpeta = trim($this->input->POST('inputTotalCarpetas'));

				if(!is_null($this->input->POST('inputTotalHerramientas')) && trim($this->input->POST('inputTotalHerramientas')) != "")
					$totalHerramientas = trim($this->input->POST('inputTotalHerramientas'));

				if(!is_null($this->input->POST('inputTotalNormas')) && trim($this->input->POST('inputTotalNormas')) != "")
					$totalNormas = trim($this->input->POST('inputTotalNormas'));

				if(!is_null($this->input->POST('inputTotalCategorias')) && trim($this->input->POST('inputTotalCategorias')) != "")
					$totalCategorias = trim($this->input->POST('inputTotalCategorias'));

				#var_dump($totalCarpeta);
				#var_dump($totalHerramientas);
				#var_dump($totalNormas);
				#var_dump($totalCategorias);
				#var_dump($this->input->POST('rbCarpeta'.strval(1)));

				$respuestas_carpetas = array();
				if (isset($totalCarpeta) && is_numeric($totalCarpeta) && (int)$totalCarpeta > 0) {
					for ($i=0; $i < $totalCarpeta; $i++) {
						$respuesta = null;

						if(!is_null($this->input->POST('rbCarpeta'.strval($i+1))) && trim($this->input->POST('rbCarpeta'.strval($i+1))) != "")
							$respuesta = trim($this->input->POST('rbCarpeta'.strval($i+1)));

						if (isset($respuesta) && strlen($respuesta) > 0 && strpos($respuesta, '-') > 0) {
							$respuesta_carpeta = explode("-", $respuesta);
							$id_carpeta = $respuesta_carpeta[1];
							$respuesta_carpeta_rb = ($respuesta_carpeta[0] == "si" ? true : false);
							$respuestas_carpetas[] = array('id_carpeta' => $id_carpeta, 'respuesta' => $respuesta_carpeta_rb);
						}
					}
				}



				/* respuestas carpeta tecnica y herramientas
				$contador_carpeta = 1;
				$respuestas_carpeta = array();

				for ($i=0; $i < $contador_carpeta; $i++) {
					if(!is_null($this->input->POST('rbCarpeta'.$contador_carpeta)) && trim($this->input->POST('rbCarpeta'.$contador_carpeta)) != ""){
						$respuesta_carpeta = explode("-", $this->input->POST('rbCarpeta'.$contador_carpeta));
						$id_carpeta = $respuesta_carpeta[1];
						$respuesta = ($respuesta_carpeta[0] == "si" ? true : false);
						$respuestas_carpeta[] = array('id_carpeta' => $id_carpeta, 'respuesta' => $respuesta);
						$contador_carpeta++;
					}
				} */


				#var_dump($respuestas_carpetas);


				$respuestas_herramientas = array();
				if (isset($totalHerramientas) && is_numeric($totalHerramientas) && (int)$totalHerramientas > 0) {
					for ($i=0; $i < $totalHerramientas; $i++) { 
						$respuesta = null;

						if(!is_null($this->input->POST('rbHerramienta'.strval($i+1))) && trim($this->input->POST('rbHerramienta'.strval($i+1))) != "")
							$respuesta = trim($this->input->POST('rbHerramienta'.strval($i+1)));
						if (isset($respuesta) && strlen($respuesta) > 0 && strpos($respuesta, '-') > 0) {
							$respuesta_herramienta = explode("-", $respuesta);
							$id_herramienta = $respuesta_herramienta[1];
							$respuesta_herramienta_rb = ($respuesta_herramienta[0] == "si" ? true : false);
							$respuestas_herramientas[] = array('id_herramienta' => $id_herramienta, 'respuesta' => $respuesta_herramienta_rb);
						}
					}
				}

				/*$contador_herramienta = 1;
				$respuestas_herramienta = array();

				for ($i=0; $i < $contador_herramienta; $i++) {
					if(!is_null($this->input->POST('rbHerramienta'.$contador_herramienta)) && trim($this->input->POST('rbHerramienta'.$contador_herramienta)) != ""){
						$respuesta_herramienta = explode("-", $this->input->POST('rbHerramienta'.$contador_herramienta));
						$id_herramienta = $respuesta_herramienta[1];
						$respuesta = ($respuesta_herramienta[0] == "si" ? true : false);
						$respuestas_herramienta[] = array('id_herramienta' => $id_herramienta, 'respuesta' => $respuesta);
						$contador_herramienta++;
					}
				}*/
				#var_dump($respuestas_herramientas);

				$respuestas_normas = array();
				if (isset($totalNormas) && is_numeric($totalNormas) && (int)$totalNormas > 0) {
					for ($i=0; $i < $totalNormas; $i++) { 
						$respuesta = null;

						if(!is_null($this->input->POST('rbNorma'.strval($i+1))) && trim($this->input->POST('rbNorma'.strval($i+1))) != "")
							$respuesta = trim($this->input->POST('rbNorma'.strval($i+1)));
						if (isset($respuesta) && strlen($respuesta) > 0 && strpos($respuesta, '-') > 0) {
							$respuesta_norma = explode("-", $respuesta);
							$id_norma = $respuesta_norma[1];
							$respuesta_norma_rb = ($respuesta_norma[0] == "si" ? true : false);
							$respuestas_normas[] = array('id_norma' => $id_norma, 'respuesta' => $respuesta_norma_rb);
						}
					}
				}

				#var_dump($respuestas_normas);

				


				
				$cant_respuestas = 0;
				if (isset($totalCategorias) && is_numeric($totalCategorias) && (int)$totalCategorias > 0) {
					for ($i=0; $i < $totalCategorias; $i++) {
						$respuesta_p = null;

						if(!is_null($this->input->POST('inputTotalPreguntas_'.strval($i+1))) && trim($this->input->POST('inputTotalPreguntas_'.strval($i+1))) != "")
							$respuesta_p = trim($this->input->POST('inputTotalPreguntas_'.strval($i+1)));

						if (isset($respuesta_p) && strlen($respuesta_p) > 0 && is_numeric($respuesta_p) && (int)$respuesta_p > 0) {
							$cant_respuestas = $cant_respuestas + (int)$respuesta_p;
						}
					}
				}

				$respuestas_checklists = array();
				if (isset($cant_respuestas) && strlen($cant_respuestas) > 0 && is_numeric($cant_respuestas) && (int)$cant_respuestas > 0) {
					for ($f=0; $f < (int)$cant_respuestas; $f++) {
						$respuesta_cat_pre_check = null;
						$observacion_pregunta = null;

						if(!is_null($this->input->POST('rbPregunta'.strval($f+1))) && trim($this->input->POST('rbPregunta'.strval($f+1))) != "" && strlen($this->input->POST('rbPregunta'.strval($f+1))) > 0)
							$respuesta_cat_pre_check = trim($this->input->POST('rbPregunta'.strval($f+1)));

						/*if(!is_null($this->input->POST('rbPregunta'.strval($f+1).'_NO')) && trim($this->input->POST('rbPregunta'.strval($f+1).'_NO')) != "" && strlen($this->input->POST('rbPregunta'.strval($f+1).'_NO')) > 0)
							$respuesta_no = trim($this->input->POST('rbPregunta'.strval($f+1).'_NO'));

						if(!is_null($this->input->POST('rbPregunta'.strval($f+1).'_NA')) && trim($this->input->POST('rbPregunta'.strval($f+1).'_NA')) != "" && strlen($this->input->POST('rbPregunta'.strval($f+1).'_NA')) > 0)
							$respuesta_na = trim($this->input->POST('rbPregunta'.strval($f+1).'_NA'));*/

						if(!is_null($this->input->POST('inputObservaciones'.strval($f+1))) && trim($this->input->POST('inputObservaciones'.strval($f+1))) != "" && strlen($this->input->POST('inputObservaciones'.strval($f+1))) > 0)
							$observacion_pregunta = trim($this->input->POST('inputObservaciones'.strval($f+1)));

						#$respuesta_pregunta = array();
						$observacion = null;
						if (isset($observacion_pregunta) && strlen($observacion_pregunta) > 0)
							$observacion = trim($observacion_pregunta);
							
						if (isset($respuesta_cat_pre_check) && strlen($respuesta_cat_pre_check) > 0) {
							$respuesta_cat_pre = explode("-", $respuesta_cat_pre_check);
							$id_cat_pre = explode("_", $respuesta_cat_pre[1]);
							$id_categoria = $id_cat_pre[0];
							$id_pregunta = $id_cat_pre[1];
							$respuesta_pregunta_rb = ($respuesta_cat_pre[0] == "si" ? 1 : ($respuesta_cat_pre[0] == "no" ? 2 : 3));
							$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'respuesta' => $respuesta_pregunta_rb, 'observacion' => $observacion, 'orden' => strval($f+1));

						}
						/*if (isset($respuesta_no) && strlen($respuesta_no) > 0) {
							$respuesta_cat_pre = explode("-", $respuesta_no);
							$id_cat_pre = explode("_", $respuesta_cat_pre[1]);
							$id_categoria = $id_cat_pre[0];
							$id_pregunta = $id_cat_pre[1];
							$respuesta_pregunta_rb = ($respuesta_cat_pre[0] == "no" ? 2: null);
							$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'respuesta' => $respuesta_pregunta_rb, 'observacion' => $observacion, 'orden' => strval($f+1));
						}
						if (isset($respuesta_na) && strlen($respuesta_na) > 0) {
							$respuesta_cat_pre = explode("-", $respuesta_na);
							$id_cat_pre = explode("_", $respuesta_cat_pre[1]);
							$id_categoria = $id_cat_pre[0];
							$id_pregunta = $id_cat_pre[1];
							$respuesta_pregunta_rb = ($respuesta_cat_pre[0] == "na" ? 3: null);
							$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'respuesta' => $respuesta_pregunta_rb, 'observacion' => $observacion, 'orden' => strval($f+1));
						}*/
						#var_dump($respuesta_pregunta_rb);
						#$respuestas_checklists[] = 
						#var_dump($respuestas_checklists);
						/*$respuesta_norma = explode("-", $respuesta);
							$id_norma = $respuesta_norma[1];
							$respuesta_norma_rb = ($respuesta_norma[0] == "si" ? true : false);
							$respuestas_checklists[] = array('id_norma' => $id_norma, 'respuesta' => $respuesta_norma_rb);*/

					}
				}



				#var_dump($this->input->POST());
				#var_dump($_FILES);
				#var_dump($respuestas_checklists);

				if(!is_null($this->input->POST('inputMarca')) && trim($this->input->POST('inputMarca')) != "")
					$marca = trim($this->input->POST('inputMarca'));

				if(!is_null($this->input->POST('selectUso')) && trim($this->input->POST('selectUso')) != "" && is_numeric($this->input->POST('selectUso')) && (int)$this->input->POST('selectUso') > 0)
					$idUso = trim($this->input->POST('selectUso'));
				
				if(!is_null($this->input->POST('inputCapacidad')) && trim($this->input->POST('inputCapacidad')) != "")
					$capacidad = trim($this->input->POST('inputCapacidad'));

				if(!is_null($this->input->POST('inputCapacidadKG')) && trim($this->input->POST('inputCapacidadKG')) != "")
					$capacidadKG = trim($this->input->POST('inputCapacidadKG'));

				if(!is_null($this->input->POST('selectSuspension')) && trim($this->input->POST('selectSuspension')) != "" && is_numeric($this->input->POST('selectSuspension')) && (int)$this->input->POST('selectSuspension') > 0)
					$idSuspension = trim($this->input->POST('selectSuspension'));

				if(!is_null($this->input->POST('selectSalaMaquina')) && trim($this->input->POST('selectSalaMaquina')) != "" && is_numeric($this->input->POST('selectSalaMaquina')) && (int)$this->input->POST('selectSalaMaquina') > 0)
					$salaMaquina = trim($this->input->POST('selectSalaMaquina'));

				if(!is_null($this->input->POST('inputVelocidad')) && trim($this->input->POST('inputVelocidad')) != "")
					$velocidad = trim($this->input->POST('inputVelocidad'));

				if(!is_null($this->input->POST('inputRecorrido')) && trim($this->input->POST('inputRecorrido')) != "")
					$recorrido = trim($this->input->POST('inputRecorrido'));

				if(!is_null($this->input->POST('inputParadas')) && trim($this->input->POST('inputParadas')) != "")
					$paradas = trim($this->input->POST('inputParadas'));

				if(!is_null($this->input->POST('selectTipoTraccion')) && trim($this->input->POST('selectTipoTraccion')) != "" && is_numeric($this->input->POST('selectTipoTraccion')) && (int)$this->input->POST('selectTipoTraccion') > 0)
					$idTipoTraccion = trim($this->input->POST('selectTipoTraccion'));

				if(!is_null($this->input->POST('inputDiamTraccion')) && trim($this->input->POST('inputDiamTraccion')) != "")
					$diamTraccion = trim($this->input->POST('inputDiamTraccion'));

				if(!is_null($this->input->POST('inputEnclavamientoElectrico')) && trim($this->input->POST('inputEnclavamientoElectrico')) != "")
					$enclavamientoE = trim($this->input->POST('inputEnclavamientoElectrico'));

				if(!is_null($this->input->POST('inputEnclavamientoMecanico')) && trim($this->input->POST('inputEnclavamientoMecanico')) != "")
					$enclavamientoM = trim($this->input->POST('inputEnclavamientoMecanico'));

				if(!is_null($this->input->POST('inputDiamCableLimitador')) && trim($this->input->POST('inputDiamCableLimitador')) != "")
					$diamCableL = trim($this->input->POST('inputDiamCableLimitador'));

				if(!is_null($this->input->POST('idNorma')) && trim($this->input->POST('idNorma')) != "")
					$idNorma = trim($this->input->POST('idNorma'));

				if(!is_null($this->input->POST('inputIdInspeccion')) && is_numeric($this->input->POST('inputIdInspeccion')))
				{
					$idInspeccion = $this->input->POST('inputIdInspeccion');
					$accion = 'modificado';
				}
				
				//var_dump($this->input->POST());

				
				/*var_dump($idInspeccion);
				var_dump($tecnico);
				var_dump($nombreE);
				var_dump($direccionE);
				var_dump($rutE);
				var_dump($idE);
				var_dump($nombreA);
				var_dump($rutA);
				var_dump($emailA);
				#var_dump($fechaC);
				#var_dump($contratoV);
				var_dump($idEmpresaM);
				var_dump($nombreRM);
				var_dump($fechaUM);

				var_dump($marca);
				var_dump($idUso);
				var_dump($capacidad);
				var_dump($capacidadKG);
				var_dump($idSuspension);
				var_dump($salaMaquina);
				var_dump($velocidad);
				var_dump($recorrido);
				var_dump($paradas);
				var_dump($idTipoTraccion);
				var_dump($diamTraccion);
				var_dump($enclavamientoE);
				var_dump($enclavamientoM);
				var_dump($diamCableL);
				var_dump($idNorma);*/


				$respuesta = 0;
				$mensaje = '';

				$resultado = $this->inspeccion_model->agregarInspeccion($idInspeccion, $tecnico, $nombreE, $direccionE, $rutE, $idE, $nombreA, $rutA, $emailA, $idEmpresaM, $nombreRM, $fechaUM, $marca, $idUso, $capacidad, $capacidadKG, $idSuspension, $salaMaquina, $velocidad, $recorrido, $paradas, $idTipoTraccion, $diamTraccion, $enclavamientoE, $enclavamientoM, $diamCableL, $idNorma, $usuario["id_usuario"]);

				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_inspeccion'])
					{
						if(is_null($idInspeccion)){
							$idInspeccion = (int)$resultado['id_inspeccion'];
							$orden_carpeta = 0;
							foreach ($respuestas_carpetas as $carpeta) {
								$orden_carpeta++;
								$id_carpeta = $carpeta["id_carpeta"];
								$respuesta = $carpeta["respuesta"];
								$resultado_carpeta = $this->inspeccion_model->agregarCarpetaInspeccion($id_carpeta, $respuesta, $orden_carpeta, $idInspeccion);
							}

							$orden_herramienta = 0;
							foreach ($respuestas_herramientas as $herramienta) {
								$orden_herramienta++;
								$id_herramienta = $herramienta["id_herramienta"];
								$respuesta = $herramienta["respuesta"];
								$resultado_herramienta = $this->inspeccion_model->agregarHerramientaInspeccion($id_herramienta, $respuesta, $orden_herramienta, $idInspeccion);
							}

							$orden_norma = 0;
							foreach ($respuestas_normas as $norma) {
								$orden_norma++;
								$id_norma = $norma["id_norma"];
								$respuesta = $norma["respuesta"];
								$resultado_norma = $this->inspeccion_model->agregarNormaInspeccion($id_norma, $respuesta, $orden_norma, $idInspeccion);
							}

							$respuestas_checklists_data = array();
							$orden_checklist = 1;
							$resultado_respuesta_checklist = $this->inspeccion_model->agregarInspeccionChecklist($id_norma, $orden_checklist, $idInspeccion);

							if (isset($resultado_respuesta_checklist) && isset($resultado_respuesta_checklist["resultado"]) && $resultado_respuesta_checklist["resultado"] > 0) {
								$id_inspeccion_checklist = null;
								if (isset($resultado_respuesta_checklist["id_inspeccion_checklist"]) && is_numeric($resultado_respuesta_checklist["id_inspeccion_checklist"]) && (int)$resultado_respuesta_checklist["id_inspeccion_checklist"] > 0)
									$id_inspeccion_checklist = (int)$resultado_respuesta_checklist["id_inspeccion_checklist"];

								#var_dump($respuestas_checklists);
								if (sizeof($respuestas_checklists) > 0) {
									foreach ($respuestas_checklists as $res_check) {
										$id_categoria = $res_check["id_categoria"];
										$id_pregunta = $res_check["id_pregunta"];
										$respuesta_check = $res_check["respuesta"];
										$observacion = $res_check["observacion"];
										$orden = $res_check["orden"];

										/*var_dump($id_categoria);
										var_dump($id_pregunta);
										var_dump($respuesta_check);
										var_dump($observacion);
										var_dump($orden);*/

										$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheck($id_categoria, $id_pregunta, $respuesta_check, $observacion, $orden, $id_inspeccion_checklist);
										if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
											$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
											$respuestas_checklists_data[] = array("id_inspeccion_checklist" => $id_inspeccion_checklist, "id_inspeccion_checklist_resp" => $id_inspeccion_checklist_resp, "id_categoria" => $id_categoria, "id_pregunta" => $id_pregunta, "respuesta_check" => $respuesta_check, "observacion" => $observacion);
										}
									}
								}
							}

							$cant_archivos = 0;
							if (sizeof($_FILES) > 0) {
								foreach ($_FILES as $archivo) {

									$datos_archivo = explode("_", $archivo["name"]);
									$id_categoria = $datos_archivo[1];
									$id_pregunta = $datos_archivo[2];
									$orden_archivo = $datos_archivo[3];

									$array_filtrado = array_filter($respuestas_checklists_data, function($val) use($id_categoria, $id_pregunta){
							              return ($val['id_categoria']==$id_categoria and $val['id_pregunta']==$id_pregunta);
							         });

									$maxDim = 800;
									$file_name = $archivo["tmp_name"];
									list($width, $height, $type, $attr) = getimagesize($file_name);
									if ( $width > $maxDim || $height > $maxDim ) {
									    $target_filename = $file_name;
									    $ratio = $width/$height;
									    if( $ratio > 1) {
									        $new_width = $maxDim;
									        $new_height = $maxDim/$ratio;
									    } else {
									        $new_width = $maxDim*$ratio;
									        $new_height = $maxDim;
									    }
									    $src = imagecreatefromstring( file_get_contents( $file_name ) );
									    $dst = imagecreatetruecolor( $new_width, $new_height );
									    imagecopyresampled( $dst, $src, 0, 0, 0, 0, $new_width, $new_height, $width, $height );
									    imagedestroy( $src );
									    imagepng( $dst, $target_filename ); // adjust format as needed
									    imagedestroy( $dst );
									}

									list($width, $height, $type, $attr) = getimagesize($file_name);
									
									$nombre_original = $archivo["name"];
									$id_inspeccion_checklist_resp = null;

									if ($array_filtrado && isset($array_filtrado) && sizeof($array_filtrado) == 1) {
										foreach ($array_filtrado as $key => $value) {
											$id_inspeccion_checklist_resp = $array_filtrado[$key]["id_inspeccion_checklist_resp"];	
										}
									}

									$nuevoNombre = $id_inspeccion_checklist.'_'.$id_inspeccion_checklist_resp.'_'.$id_categoria.'_'.$id_pregunta.'_'.$orden_archivo.'.png';
									
									$config['upload_path'] = './assets/files/image';
									$config['allowed_types'] = '*';
									$config['remove_spaces'] = TRUE;
									$config['max_size'] = '0';
									$config['file_name'] = $nuevoNombre;

									$this->load->library('upload', $config);
									$this->upload->initialize($config);


									$archivo_cargado = $this->upload->do_upload($nombre_original);
									#var_dump($archivo_cargado);

									
									
									if ($archivo_cargado) {
										$data_archivo = $this->upload->data();
										$client_name = $data_archivo['client_name'];
										$file_ext = $data_archivo['file_ext'];
										$file_name = $data_archivo['file_name'];
										$file_path = $data_archivo['file_path'];
										$file_size = $data_archivo['file_size'];
										$file_type = $data_archivo['file_type'];
										$full_path = $data_archivo['full_path'];
										$image_height = $data_archivo['image_height'];
										$image_size_str = $data_archivo['image_size_str'];
										$image_type = $data_archivo['image_type'];
										$image_width = $data_archivo['image_width'];
										$is_image = $data_archivo['is_image'];
										$orig_name = $data_archivo['orig_name'];
										$raw_name = $data_archivo['raw_name'];

										$respuesta_archivo = $this->inspeccion_model->agregarArchivo($file_name, $file_type, $file_path, $full_path, $raw_name, $orig_name, $client_name, $file_ext, $file_size, $is_image, $image_width, $image_height, $image_type, $image_size_str, $id_inspeccion_checklist_resp, $id_categoria, $id_pregunta, $orden_archivo, $usuario["id_usuario"]);
										if ($respuesta_archivo && isset($respuesta_archivo["resultado"]) && is_numeric($respuesta_archivo["resultado"]) && (int)$respuesta_archivo["resultado"] > 0) {
											$cant_archivos++;
										}
									}else
									{
										$error = $this->upload->display_errors();
									}
								}
							}

							$resultado = 1;
							$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];

							if ($orden_carpeta > 0) {
								$mensaje .= ' Se han agregado '.$orden_carpeta.' Respuestas de Carpeta T&eacute;cnica  a la Inspeccion.</br></br>';
							}

							if ($orden_herramienta > 0) {
								$mensaje .= ' Se han agregado '.$orden_herramienta.' Respuestas de Herramientas a la Inspeccion.</br></br>';
							}

							if ($orden_norma > 0) {
								$mensaje .= ' Se han agregado '.$orden_norma.' Respuestas de Normas a la Inspeccion.</br></br>';
							}

							if ($cant_archivos > 0) {
								$mensaje .= ' Se han agregado '.$cant_archivos.' Archivos de Imagen a la Inspeccion.</br></br>';
							}
							

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


	public function visualizarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'GET') {
				$usuario['titulo'] = 'Visualizar Inspeccion';
				$usuario['controller'] = 'inspeccion';

				$id_inspeccion = null;
				#if(!is_null($this->uri->segment(3)) && $this->uri->segment(3) != "" && $this->uri->segment(3) != "-1" && floatval($this->uri->segment(3)) >= 0)
				if($this->input->GET('idInspeccion') && $this->input->GET('idInspeccion'))
					$id_inspeccion = (int)$this->input->GET('idInspeccion');

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

				$inspeccion =  $this->inspeccion_model->obtenerInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['inspeccion'] = $inspeccion[0];
				
				$respuesta_carpetas =  $this->inspeccion_model->obtenerCarpetas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_carpetas'] = $respuesta_carpetas;

				$respuesta_normas =  $this->inspeccion_model->obtenerNormas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_normas'] = $respuesta_normas;

				$respuesta_herramientas =  $this->inspeccion_model->obtenerHerramientas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_herramientas'] = $respuesta_herramientas;

				$respuesta_norma_respuesta =  $this->inspeccion_model->obtenerNormasRespuesta($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_norma_respuesta'] = $respuesta_norma_respuesta;
				#var_dump($respuesta_norma_respuesta);

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
				$this->load->view('visualizarInspeccion', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
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