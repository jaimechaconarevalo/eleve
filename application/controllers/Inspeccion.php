<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use PhpOffice\PhpWord\Element\Table;
use PhpOffice\PhpWord\Element\Field;
use PhpOffice\PhpWord\Element\TextRun;
use PhpOffice\PhpWord\SimpleType\TblWidth;

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
		$this->load->model('suspension_model');
		$this->load->model('uso_model');
		$this->load->model('traccion_model');
		$this->load->library('pdf');
		//$this->load->library('word');
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

	public function pruebaReporte()
	{
		$usuario = $this->session->userdata();
		if ($this->session->userdata('id_usuario')) {
			$this->load->library('PHPWord');
			if($this->input->GET('idInspeccion') && $this->input->GET('idInspeccion'))
			{
				$id_inspeccion = $this->input->GET('idInspeccion');
				#$respuestas_inspeccion = $this->inspeccion_model->obtenerRespuestasInspeccionReporte($id_inspeccion, $usuario['id_usuario']);
				#var_dump($respuestas_inspeccion);
				#exit();
				$inspeccion =  $this->inspeccion_model->obtenerInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				if (sizeof($inspeccion) > 0) {

					$this->load->library('PHPWord');

					$nombre_plantilla = base_url().'assets/doc/plantilla_reporte_inspeccion.docx';
					$template = new \PhpOffice\PhpWord\TemplateProcessor($nombre_plantilla);
					chmod($nombre_plantilla, 0644);
					#$template->cloneBlock('block_numero_1', 13, true, true);
					var_dump($nombre_plantilla);
					$nombre_cont_1 = 'Eduardo Lopez';
					$num_cont_1 = '8437 0668';
					$nombre_cont_2 = 'Daniel Bravo';
					$num_cont_2 = '8966 7141';


					$nombre_usuario = 'Eduardo Lopez';
					$fecha_i = date("d-m-Y", strtotime($inspeccion[0]['created_at']));
					$cantidad_ascensor = $inspeccion[0]['cantidad_ascensor'];
					$nombre_tecnico = $inspeccion[0]['nombre_tecnico'];
					$rol = $inspeccion[0]['rol'];
					$nombre_admin = $inspeccion[0]['nombre_admin'];
					$rut_admin = $inspeccion[0]['rut_admin'];
					$edificio = $inspeccion[0]['edificio'];
					$rut_e = $inspeccion[0]['rut_e'];
					#$direccion = $inspeccion[0]['direccion_em'];
					$domicilio = $inspeccion[0]['domicilio'];
					$cantidad = $inspeccion[0]['cantidad'];
					$email_admin = $inspeccion[0]['email_admin'];

					$razon_social = $inspeccion[0]['razon_social'];
					$num_registro = $inspeccion[0]['num_registro'];
					$direccion_em = $inspeccion[0]['direccion_em'];
					$rut_em = $inspeccion[0]['rut_em'];
					$nombre_mant_2 = $inspeccion[0]['nombre_mant_2'];
					$fecha_um = date("d-m-Y", strtotime($inspeccion[0]['fecha_ultima_mant']));
					
					$marca_ascensor = $inspeccion[0]['marca_ascensor'];
					$capacidad_personas = $inspeccion[0]['capacidad_personas'];
					$velocidad = $inspeccion[0]['velocidad'];
					$capacidad_kg = $inspeccion[0]['capacidad_kg'];
					$recorrido = $inspeccion[0]['recorrido'];
					$suspension = $inspeccion[0]['suspension'];
					$paradas = $inspeccion[0]['paradas'];
					$id_uso = $inspeccion[0]['id_uso'];
					$uso = $inspeccion[0]['uso'];
					$norma = $inspeccion[0]['norma'];

					$texto_sala_maquina = '';

					$diametro_cable = $inspeccion[0]['diametro_cable'];
					$diametro_traccion = $inspeccion[0]['diametro_traccion'];
					$enclavamiento_mecanico = $inspeccion[0]['enclavamiento_mecanico'];
					$enclavamiento_electrico = $inspeccion[0]['enclavamiento_electrico'];

					
					#$template->setValue('cantidad_ascensor', $cantidad_ascensor);

					$template->setValue('nombre_cont_1', $nombre_cont_1);
					$template->setValue('num_cont_1', $num_cont_1);
					$template->setValue('nombre_cont_2', $nombre_cont_2);
					$template->setValue('num_cont_2', $num_cont_2);

					$template->setValue('nombre_usuario', $nombre_usuario);
					$template->setValue('fecha_i', $fecha_i);
					$template->setValue('nombre_tecnico', $nombre_tecnico);
					$template->setValue('rol', $rol);
					#$template->setValue('nombre_admin', $nombre_admin);
					#$template->setValue('rut_admin', $rut_admin);
					#$template->setValue('edificio', $edificio);
					#$template->setValue('rut_e', $rut_e);
					#$template->setValue('direccion', $direccion);
					#$template->setValue('domicilio', $domicilio);
					#$template->setValue('cantidad', $cantidad);
					#$template->setValue('email_admin', $email_admin);
				}

				$file_name = 'Informe_norma.docx';
				$template->saveAs($file_name);

				#Blass Pino Chacón es un insecto
			    #header('Content-Disposition: attachment; filename='.$file_name.';charset=iso-8859-1');
			    #echo file_get_contents($file_name);
			    #exit();
			}
		}
	}
	public function revisarInspeccion()
	{
		$usuario = $this->session->userdata();
		if ($this->session->userdata('id_usuario')) {
			
			if($this->input->GET('idInspeccion') && $this->input->GET('idInspeccion'))
			{
				$id_inspeccion = $this->input->GET('idInspeccion');
				#$respuestas_inspeccion = $this->inspeccion_model->obtenerRespuestasInspeccionReporte($id_inspeccion, $usuario['id_usuario']);
				#var_dump($respuestas_inspeccion);
				#exit();
				$inspeccion =  $this->inspeccion_model->obtenerInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				if (sizeof($inspeccion) > 0) {
					#var_dump($inspeccion);exit();
					$this->load->library('PHPWord');

					$nombre_plantilla = base_url().'assets/doc/plantilla_reporte.docx';
					$template = new \PhpOffice\PhpWord\TemplateProcessor($nombre_plantilla);
					#$template->cloneBlock('block_numero_1', 13, true, true);

					$nombre_cont_1 = 'Eduardo Lopez';
					$num_cont_1 = '8437 0668';
					$nombre_cont_2 = 'Daniel Bravo';
					$num_cont_2 = '8966 7141';


					$nombre_usuario = 'Eduardo Lopez';
					$fecha_i = date("d-m-Y", strtotime($inspeccion[0]['created_at']));
					$cantidad_ascensor = $inspeccion[0]['cantidad_ascensor'];
					$nombre_tecnico = $inspeccion[0]['nombre_tecnico'];
					$rol = $inspeccion[0]['rol'];
					$num_informe = $inspeccion[0]['num_informe'];


					$largo_rol = strlen($rol);
					$cant_caracteres = 3;
					
					/*echo "rol: ".($rol);
					echo "</br>";
					echo "largo caracteres rol: ".($largo_rol);
					echo "</br>";
					echo "cant_caracteres a tomar: ".($cant_caracteres);
					echo "</br>";
					
					$cant_ascensores_rol = explode(";", $rol);
					echo "cant de ascensores ingresados por ';': ".(sizeof($cant_ascensores_rol));
					echo "</br>";
					echo "matriz";
					echo "</br>";
					var_dump($cant_ascensores_rol);


					exit();*/


					$cant_ascensores_rol = explode(";", $rol);
					$rol_modificado = "";
					$abreviacion_titulo = "";
					$abreviacion = "";
					$plural = "";

					if (sizeof($cant_ascensores_rol) > 1) {
						$plural = "es";
					}

					$template->setValue('plural', $plural);


					for ($i=0; $i < sizeof($cant_ascensores_rol); $i++) { 
						if ($rol_modificado != "") {
							$rol_modificado = $rol_modificado.'</w:t><w:br/><w:t>'.$cant_ascensores_rol[$i];

							$abreviacion_ascensor = substr($cant_ascensores_rol[$i], -3, 3);
							if ($i == (sizeof($cant_ascensores_rol)-1)) {								
								$abreviacion_titulo = $abreviacion_titulo.' y '.$abreviacion_ascensor;
							}else{
								$abreviacion_titulo = $abreviacion_titulo.', '.$abreviacion_ascensor;
							}

							$abreviacion = $abreviacion.';'.$abreviacion_ascensor;
						}else{
							$abreviacion_ascensor = substr($cant_ascensores_rol[$i], -3, 3);

							$abreviacion = $abreviacion_ascensor;
							$abreviacion_titulo = $abreviacion_ascensor;
							$rol_modificado = $cant_ascensores_rol[$i];
						}
					}

					#var_dump($rol_modificado);
					#exit();
					$template->setValue('abreviacion_titulo', $abreviacion_titulo);
					$template->setValue('abreviacion', $abreviacion);


					$nombre_admin = $inspeccion[0]['nombre_admin'];
					$rut_admin = $inspeccion[0]['rut_admin'];
					$edificio = $inspeccion[0]['edificio'];
					$rut_e = $inspeccion[0]['rut_e'];
					#$direccion = $inspeccion[0]['direccion_em'];
					$domicilio = $inspeccion[0]['domicilio'];
					$cantidad = $inspeccion[0]['cantidad'];
					$email_admin = $inspeccion[0]['email_admin'];

					$razon_social = $inspeccion[0]['razon_social'];
					$num_registro = $inspeccion[0]['num_registro'];
					$direccion_em = $inspeccion[0]['direccion_em'];
					$rut_em = $inspeccion[0]['rut_em'];
					$nombre_mant_2 = $inspeccion[0]['nombre_mant_2'];
					$fecha_um = date("d-m-Y", strtotime($inspeccion[0]['fecha_ultima_mant']));
					
					$marca_ascensor = $inspeccion[0]['marca_ascensor'];
					$capacidad_personas = $inspeccion[0]['capacidad_personas'];
					$velocidad = $inspeccion[0]['velocidad'];
					$capacidad_kg = $inspeccion[0]['capacidad_kg'];
					$recorrido = $inspeccion[0]['recorrido'];
					$suspension = $inspeccion[0]['suspension'];
					$paradas = $inspeccion[0]['paradas'];
					$id_uso = $inspeccion[0]['id_uso'];
					$uso = $inspeccion[0]['uso'];
					$norma = $inspeccion[0]['norma'];

					$texto_sala_maquina = '';

					$diametro_cable = $inspeccion[0]['diametro_cable'];
					$diametro_traccion = $inspeccion[0]['diametro_traccion'];
					$enclavamiento_mecanico = $inspeccion[0]['enclavamiento_mecanico'];
					$enclavamiento_electrico = $inspeccion[0]['enclavamiento_electrico'];

					

					if ($inspeccion[0]["id_tipo_traccion"] == 1) {
						#var_dump("es cable");
						$template->setValue('cantidad_cable', $inspeccion[0]["cantidad"]);
						$template->setValue('cantidad_cinta', "N/A");
						$template->setValue('diametro_traccion_cable', $inspeccion[0]["diametro_traccion"]);
						$template->setValue('diametro_traccion_cinta', "N/A");
					}else{
						#var_dump("es cinta");
						$template->setValue('cantidad_cable', "N/A");
						$template->setValue('cantidad_cinta', $inspeccion[0]["cantidad"]);
						$template->setValue('diametro_traccion_cable', "N/A");
						$template->setValue('diametro_traccion_cinta', $inspeccion[0]["diametro_traccion"]);
					}



					#var_dump($inspeccion);exit();

					$template->setValue('cantidad_ascensor', $cantidad_ascensor);
					$template->setValue('num_informe', $num_informe);

					$template->setValue('nombre_cont_1', $nombre_cont_1);
					$template->setValue('num_cont_1', $num_cont_1);
					$template->setValue('nombre_cont_2', $nombre_cont_2);
					$template->setValue('num_cont_2', $num_cont_2);

					$template->setValue('nombre_usuario', $nombre_usuario);
					$template->setValue('fecha_i', $fecha_i);
					$template->setValue('nombre_tecnico', $nombre_tecnico);

					$template->setValue('rol', $rol_modificado);

					$template->setValue('nombre_admin', $nombre_admin);
					$template->setValue('rut_admin', $rut_admin);
					$template->setValue('edificio', $edificio);
					$template->setValue('rut_e', $rut_e);
					#$template->setValue('direccion', $direccion);
					$template->setValue('domicilio', $domicilio);
					$template->setValue('cantidad', $cantidad);
					$template->setValue('email_admin', $email_admin);

					$template->setValue('razon_social', $razon_social);
					$template->setValue('num_registro', $num_registro);
					$template->setValue('direccion_em', $direccion_em);
					$template->setValue('rut_em', $rut_em);
					$template->setValue('nombre_mant_2', $nombre_mant_2);
					$template->setValue('fecha_um', $fecha_um);

					$template->setValue('marca_ascensor', $marca_ascensor);
					$template->setValue('capacidad_personas', $capacidad_personas);
					$template->setValue('velocidad', $velocidad);
					$template->setValue('capacidad_kg', $capacidad_kg);
					$template->setValue('recorrido', $recorrido);
					$template->setValue('suspension', $suspension);
					$template->setValue('paradas', $paradas);
					$template->setValue('id_uso', $id_uso);
					$template->setValue('uso', $uso);
					$template->setValue('norma', $norma);
					$template->setValue('texto_sala_maquina', $texto_sala_maquina);
					
					$template->setValue('enclavamiento_mecanico', $enclavamiento_mecanico);
					$template->setValue('enclavamiento_electrico', $enclavamiento_electrico);
					$template->setValue('diametro_cable_limitador', $inspeccion[0]["diametro_cable"]);

					$estilo_herramientas_titulo = array('bold'=>true, 'size'=>10, 'name'=>'Arial');
					$estilo_herramientas = array('bold'=>false, 'size'=>10, 'name'=>'Arial');
					#$template->cloneBlock('block_numero_1', 13, true, true);
					$table = new Table(array('borderSize' => 2, 'borderColor' => 'black', 'width' => 9500, 'unit' => TblWidth::TWIP, 'align' => 'center'));
					$table->addRow();
					$table->addCell(150)->addText('Herramienta', $estilo_herramientas_titulo, array('align' => 'center'));
					$table->addCell(150)->addText('Código', $estilo_herramientas_titulo, array('align' => 'center'));
					$table->addCell(150)->addText('Incertidumbre', $estilo_herramientas_titulo, array('align' => 'center'));

					$respuesta_herramientas =  $this->inspeccion_model->obtenerHerramientas($id_inspeccion ,$usuario["id_usuario"]);

					$contador_herramienta = 1;
					if (sizeof($respuesta_herramientas) > 0) {

						$cant_herramientas = sizeof($respuesta_herramientas);
						$template->cloneRow('nombre_herramienta', $cant_herramientas);

						foreach ($respuesta_herramientas as $herramienta) {
							$codigo = $herramienta["codigo"];
							$nombre_herramienta = $herramienta["nombre"];
							$observacion = $herramienta["observaciones"];

							$table->addRow();
							$table->addCell(150)->addText($nombre_herramienta, $estilo_herramientas, array('align' => 'center', 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::LEFT));
							$table->addCell(150)->addText($codigo, $estilo_herramientas, array('align' => 'center', 'alignCenter'));
							$table->addCell(150)->addText($observacion, $estilo_herramientas, array('align' => 'center', 'alignCenter'));

							$template->setValue('nombre_herramienta#'.$contador_herramienta, $nombre_herramienta);
							$template->setValue('codigo_herramienta#'.$contador_herramienta, $codigo);
							$template->setValue('incertidumbre_herramienta#'.$contador_herramienta, $observacion);
							$contador_herramienta++;
						}
					}

					$template->setComplexBlock('table_herramientas', $table);





					$estilo_normas_titulo = array('bold'=>true, 'size'=>10, 'name'=>'Arial');
					$estilo_normas = array('bold'=>true, 'size'=>10, 'name'=>'Arial');
					$estilo_normas_obs = array('bold'=>false, 'size'=>10, 'name'=>'Arial');
					$table = new Table(array('borderSize' => 2, 'borderColor' => 'black', 'width' => 9500, 'unit' => TblWidth::TWIP, 'align' => 'center'));
					$table->addRow();
					$table->addCell(10)->addText('Aplica', $estilo_normas_titulo, array('align' => 'center'));
					$table->addCell(150)->addText('Normas o Referencias utilizadas en la inspección', $estilo_normas_titulo, array('align' => 'center'));

					$respuesta_normas =  $this->norma_model->obtenerNormasReporte($usuario["id_usuario"]);

					$normas_inspeccion =  $this->inspeccion_model->obtenerNormas($id_inspeccion, $usuario["id_usuario"]);
					

					$cant_normas_reporte = sizeof($respuesta_normas);
					$template->cloneRow('se_encuentra_norma', $cant_normas_reporte);
					$contador_norma = 1;
					if (sizeof($respuesta_normas) > 0) {
						foreach ($respuesta_normas as $norma) {
							
							$codigo = $norma["codigo"];
							$nombre_norma = $norma["nombre"];
							$observacion = $norma["observaciones"];
							$id_norma_b = $norma["id"];
							
							$array_filtrado_norma = array_filter($normas_inspeccion, function($val) use($id_norma_b){
											            return ($val['id_norma']==$id_norma_b and $val['respuesta']== 1);
											        });
							if (isset($array_filtrado_norma) && sizeof($array_filtrado_norma) > 0) {
								$se_encuentra = "SI";
							}else{
								$se_encuentra = "NO";
							}

							$template->setValue('se_encuentra_norma#'.$contador_norma, strtoupper($se_encuentra));
							$template->setValue('nombre_norma#'.$contador_norma, $nombre_norma);
							$template->setValue('obs_norma#'.$contador_norma, $observacion);
							$contador_norma++;
						}
					}else{
						$template->setValue('se_encuentra_norma', "");
						$template->setValue('nombre_norma', "");
						$template->setValue('obs_norma', "");
					}

					/*$fancyTableStyle = array('borderSize' => 6, 'borderColor' => '999999');
					$cellRowSpan = array('vMerge' => 'restart', 'valign' => 'center', 'bgColor' => 'FFFF00');
					$cellRowContinue = array('vMerge' => 'continue');
					$cellColSpan = array('gridSpan' => 2, 'valign' => 'center');
					$cellHCentered = array('alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER);
					$cellVCentered = array('valign' => 'center');
					$cellVHCentered = array('valign' => 'center', 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER);*/

					$estilo_carpetas_titulo = array('bold'=>true, 'size'=>10, 'name'=>'Arial');
					$estilo_carpetas = array('bold'=>false, 'size'=>10, 'name'=>'Arial');
					$table_carpetas = new Table(array('borderSize' => 2, 'borderColor' => 'black', 'width' => 9500, 'unit' => TblWidth::TWIP, 'align' => 'center'));
					$table_carpetas->addRow();
					$table_carpetas->addCell(20)->addText('Cumple', $estilo_carpetas_titulo, array('align' => 'center'));
					$table_carpetas->addCell(150)->addText('Documento', $estilo_carpetas_titulo, array('align' => 'center'));

					$carpetas =  $this->carpeta_model->listarCarpetas($usuario["id_usuario"]);
					

					/*if (sizeof($carpetas) > 0) {
						$respuesta_carpetas =  $this->inspeccion_model->obtenerCarpetas($id_inspeccion ,$usuario["id_usuario"]);
						#var_dump($respuesta_carpetas);
						#exit();
						foreach ($carpetas as $carpeta) {
							$cumple = "";
							$id_carpeta = $carpeta["id"];
							$nombre_carpeta = $carpeta["nombre"];
							$observacion_carpeta = $carpeta["observaciones"];

							if (sizeof($respuesta_carpetas) > 0) {
								$index_encontrado = array_search($id_carpeta, array_column($respuesta_carpetas, 'id_carpeta'));
								if ($index_encontrado !== false){
									if ($respuesta_carpetas[$index_encontrado]["respuesta"] == "1"){
										$cumple = "SI";
									}else{
										$cumple = "NO";
									}
								}else{
									$cumple = "NO";
								}
							}else{
								$cumple = "NO";
							}

							$table_carpetas->addRow();
							$table_carpetas->addCell(10)->addText($cumple, $estilo_carpetas, array('align' => 'center'));
							$table_carpetas->addCell(150)->addText($observacion_carpeta, $estilo_carpetas, array('align' => 'center', 'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::LEFT));
						}
					}*/

					$cant_carpetas_reporte = sizeof($carpetas);
					$template->cloneRow('cumple', $cant_carpetas_reporte);
					$contador_carpeta = 1;

					$respuesta_carpetas =  $this->inspeccion_model->obtenerCarpetas($id_inspeccion ,$usuario["id_usuario"]);
					if (sizeof($carpetas) > 0) {
						foreach ($carpetas as $carpeta) {
							$se_encuentra = "NO";
							$id_carpeta = $carpeta["id"];
							$nombre_carpeta = $carpeta["nombre"];
							$observacion_carpeta = $carpeta["observaciones"];

							$array_filtrado_carpeta = array_filter($respuesta_carpetas, function($val) use($id_carpeta){
											            return ($val['id_carpeta']==$id_carpeta);
											        });
							reset($array_filtrado_carpeta);
							$first_key = key($array_filtrado_carpeta);

							if (isset($array_filtrado_carpeta) && sizeof($array_filtrado_carpeta) > 0 && isset($array_filtrado_carpeta[$first_key]["respuesta"]) && $array_filtrado_carpeta[$first_key]["respuesta"] == "1") {
								$se_encuentra = "SI";
							}else{
								$se_encuentra = "NO";
							}

							$template->setValue('cumple#'.$contador_carpeta, strtoupper($se_encuentra));
							$nombre_block = 'block_negrita#'.$contador_carpeta;


							#if ($id_carpeta == 1) {
							#	var_dump ($observacion_carpeta);
							#	exit();
							#}

							if (strpos($observacion_carpeta, '<negrita>') > 0) {
								$obs_carpeta = $observacion_carpeta;
								$cant_negritas = substr_count($obs_carpeta, '<negrita>');
								$cant_negritas_cerrado = substr_count($obs_carpeta, '</negrita>');

								if ($cant_negritas_cerrado > 0) {
									$explode_cerrado = explode("</negrita>", $obs_carpeta);
									#var_dump();
									if (strlen(trim(end($explode_cerrado))) > 0) {
										$cant_negritas ++;
									}
								}

								$template->cloneBlock($nombre_block, $cant_negritas, true, true);

								$inicio_min = 0;
								$inline = new TextRun();

								$contador_negrita_carpeta = 1;
								$inicio_texto = "";
								$texto_negrita = "";

								#$explode_negrita = str_replace("<negrita>", "&", $obs_carpeta);
								$explode_negrita = explode("<negrita>", $obs_carpeta);

								
								#var_dump(sizeof($explode_negrita));


								if (sizeof($explode_negrita) > 1) {
									for ($i=0; $i < sizeof($explode_negrita); $i++) {

										#var_dump(sizeof($explode_negrita));
										#exit();
									#}
									#foreach ($explode_negrita as $texto) {
										/*if ($id_carpeta == 1) {
											var_dump ($id_carpeta);
											var_dump ($nombre_carpeta);
											var_dump ($observacion_carpeta);
											exit();
										}*/
										$texto = $explode_negrita[$i];
										#echo ($texto);
										#echo ('</br></br>');
										if (strpos($texto, '</negrita>') > 0){
											$explode_negrita_2 = explode("</negrita>", $texto);
											#var_dump($explode_negrita_2);
											#var_dump($cant_negritas);
											#exit();
											#echo ('</br>');
											#var_dump(sizeof($explode_negrita_2));
											#echo ('</br></br>');
											if (sizeof($explode_negrita_2) > 1) {
												$texto_negrita = $explode_negrita_2[0];
												$template->setValue('negrita_carpeta#'.$contador_carpeta."#".strval($i), $texto_negrita);
												#echo "texto en negrita: ".$texto_negrita;
												#echo ('</br>Posicion: '.$i);
												#if (trim($explode_negrita_2[1]) != "") {
													#echo ('</br>');
													#echo "texto de negrita: ".$explode_negrita_2[1];
													#echo ('</br>Posicion: '.strval($i+1));
													#echo ('</br></br>');
													$template->setValue('obs_carpeta#'.$contador_carpeta."#".strval($i+1), $explode_negrita_2[1]);
												#}
											}
										}else{
											if (sizeof($explode_negrita) == ($i+1)) {
												$texto_negrita = $explode_negrita[$i];
												#var_dump('negrita_carpeta#'.$contador_carpeta."#".strval($i));
												#exit();
												$template->setValue('negrita_carpeta#'.$contador_carpeta."#".strval($i), $texto_negrita);
											}else{
												$texto = $texto." ";
												$template->setValue('obs_carpeta#'.$contador_carpeta."#".strval($i+1), $texto);
											}
										}
									}
								}
								#if ($id_carpeta == 1) {
								#	exit();
								#	}
								#exit();
								#$explode_negrita = explode("</negrita>", $obs_carpeta);

								#var_dump($explode_negrita);
								#var_dump($explode_negrita);
								#exit();

								/*for ($i=0; $i < $cant_negritas; $i++) {

									$inicio = strpos($obs_carpeta, '<negrita>');
									$fin = strpos($obs_carpeta, '</negrita>');

									if (is_null($fin) || $fin == false) {
										$fin = strlen($observacion_carpeta);
									}

									$largo_negrita = $fin - $inicio;


									echo ($inicio_texto);
									echo ("</br></br>");
									echo ($texto_negrita);

									$inicio_texto = substr($obs_carpeta, 0, $inicio); 
									$texto_negrita = substr($obs_carpeta, $inicio, $largo_negrita);

									$texto_negrita = str_replace("<negrita>", " ", $texto_negrita);
									$texto_negrita = str_replace("</negrita>", "", $texto_negrita);

									if ($i == 1) {

										echo ($inicio_texto);
										echo ("</br></br>");
										echo ($texto_negrita);
										#var_dump($obs_carpeta);
										#var_dump("</br></br>");
										#var_dump($inicio_texto);
										#var_dump("</br></br>");
										#var_dump($texto_negrita);
										#var_dump("</br></br>");
										#var_dump($cant_negritas);
										#var_dump("</br></br>");
										exit();
									}

									$template->setValue('obs_carpeta#'.$contador_carpeta."#".$contador_negrita_carpeta, $inicio_texto);
									$template->setValue('negrita_carpeta#'.$contador_carpeta."#".$contador_negrita_carpeta, $texto_negrita);

									$largo_restante = (strlen($obs_carpeta)-$fin);
									$obs_carpeta = substr($obs_carpeta, $fin, $largo_restante);
									$contador_negrita_carpeta++;
								}*/

							}else{
								$template->cloneBlock($nombre_block, 1, true, true);
								$template->setValue('obs_carpeta#'.$contador_carpeta."#1", $observacion_carpeta);
								$template->setValue('negrita_carpeta#'.$contador_carpeta."#1", "");
								#$template->replaceBlock($nombre_block, $observacion_carpeta);
								#$template->setValue('obs_carpeta#'.$contador_carpeta, $observacion_carpeta);
								#$template->setValue('negrita_carpeta#'.$contador_carpeta, "");
							}
							
							$contador_carpeta++;
						}
					}else{
						$template->setValue('cumple', "");
						$template->replaceBlock('block_negrita', "");
						#$template->setValue('obs_carpeta', "");
						#$template->setValue('negrita_carpeta', "");
					}

					

					/*private function makeWordBold($str, $hex=null, $style='b'): string
				    {
				        $cor = $hex ? "<w:color w:val='".$hex."'/>" : "";
				        $before="/w:t/w:r<w:r><w:rPr>".$cor."<w:".$style."/>/w:rPr<w:t xml:space='preserve'>";
				        $after='/w:t/w:r<w:r><w:t>';
				        return $before.$str.$after;
				    }*/

				    #$palabra = "<w:color w:val='".$value."'/>";

					#$template->setComplexBlock('table_carpetas', $table_carpetas);





					



					$respuestas_inspeccion = $this->inspeccion_model->obtenerRespuestasInspeccionReporte($id_inspeccion, $usuario['id_usuario'], true);
					$id_pregunta = null;
					#var_dump(json_encode($respuestas_inspeccion));exit();

					if (sizeof($respuestas_inspeccion) > 0) {
						$cant_1 = 1;
						$orden_reportes = $this->inspeccion_model->obtenerOrdenNorma($inspeccion[0]["id_norma"], $usuario["id_usuario"]);

						$cant_categorias_reporte = sizeof($orden_reportes);
						$template->cloneBlock('block_numero_1', $cant_categorias_reporte, true, true);
						$contador_reporte = 1;

						#var_dump($cant_categorias_reporte);
						#return;





						foreach ($orden_reportes as $orden_reporte) {
							$titulo_categoria_reporte = trim($orden_reporte['observaciones']);
							$titulo_punto = trim($orden_reporte['nombre']);


							$template->setValue('nombre_categoria#'.$contador_reporte, strtoupper($titulo_categoria_reporte));
							$template->setValue('titulo_punto#'.$contador_reporte, strtoupper($titulo_punto));
							if (($contador_reporte) == $cant_categorias_reporte) {
								#$template->setValue('pageBreakHere#'.$contador_reporte, '');
								$template->setValue('pageBreakHere#'.$contador_reporte, '<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
							}else{
								$template->setValue('pageBreakHere#'.$contador_reporte, '<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
							}

							$largo_palabra = strlen($orden_reporte['iniciales']);
							$palabra = trim($orden_reporte['iniciales']);

							$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($palabra, $largo_palabra){
					              return (substr($val['codigo_pregunta'], 0, $largo_palabra) == $palabra);
					        });

					        #var_dump(json_encode($array_filtrado));exit();

					        $group = array();
					        $contador_filtro = 0;
					       	foreach ($array_filtrado as $filtro) {
					       		$index_encontrado = array_search($filtro["id_pregunta"], array_column($group, 'id_pregunta'));
					       		$contador_filtro++;
					       		$orig_name = $filtro["file_name"];
					       		$file_path = $filtro["file_path"];
					       		$full_path = $filtro["full_path"];

								if ($index_encontrado !== false){
									$imagenes = array();	

									if ($filtro["cantidad_fotos"] > 0) {
										$url_imagen = base_url().'assets/files/image/'.$orig_name;
										$imagenes[] = array("url_imagen" => $url_imagen, 'file_path' => $file_path, 'full_path' => $full_path);
									}

									$index_resp_encontrado = array_search($filtro["inspeccion_checklist_resp_id"], array_column($group[$index_encontrado]["respuesta_imagenes"], 'inspeccion_checklist_resp_id'));

									if ($index_resp_encontrado !== false) {
										$imagenes = array();	

										if ($filtro["cantidad_fotos"] > 0) {
											$url_imagen = base_url().'assets/files/image/'.$orig_name;
											$imagenes = array("url_imagen" => $url_imagen, 'file_path' => $file_path, 'full_path' => $full_path);
										}

										if ($filtro["file_type"] === "image/png") {
											$group[$index_encontrado]["respuesta_imagenes"][$index_resp_encontrado]["imagenes"][] = $imagenes;
										}
										#var_dump($group);
									}else{
										$imagenes = array();
										if ($filtro["cantidad_fotos"] > 0) {
											$url_imagen = base_url().'assets/files/image/'.$orig_name;
											$imagenes = array("url_imagen" => $url_imagen, 'file_path' => $file_path, 'full_path' => $full_path);
										}

										$respuestas = array();
										$respuestas = array('inspeccion_checklist_resp_id' => $filtro["inspeccion_checklist_resp_id"], 'respuesta_obs' => $filtro["respuesta_obs"], 'id_severidad' => $filtro["id_severidad_respuesta"], 'severidad' => $filtro["severidad"], 'imagenes' => [$imagenes]);

										if ($filtro["file_type"] === "image/png") {
											$group[$index_encontrado]["respuesta_imagenes"][] = $respuestas;
										}

										
									}
								}else{
									$respuestas = array();
									$imagenes = array();
									if ($filtro["cantidad_fotos"] > 0) {
										
										$url_imagen = base_url().'assets/files/image/'.$orig_name;
										$imagenes = array("url_imagen" => $url_imagen, 'file_path' => $file_path, 'full_path' => $full_path);
									}

									$respuestas = array('inspeccion_checklist_resp_id' => $filtro["inspeccion_checklist_resp_id"], 'respuesta_obs' => $filtro["respuesta_obs"], 'id_severidad' => $filtro["id_severidad_respuesta"], 'severidad' => $filtro["severidad"], 'imagenes' => [$imagenes]);

									$group[] = array("id_pregunta" => $filtro["id_pregunta"],
													"codigo_pregunta" => $filtro["codigo_pregunta"],
													"pregunta_obs" => $filtro["pregunta_obs"],
													"orig_name" => $filtro["orig_name"],
													"cantidad_fotos" => $filtro["cantidad_fotos"],
													"respuesta_imagenes" => [$respuestas]
												);
								}
					       	}




					       	#var_dump($group[0]);
					       	#var_dump($group[0]["imagenes"]);
					       	#var_dump(json_encode($group));return;

					        $cant_preguntas_respuestas = sizeof($group);
					        #var_dump("llego aca");
					        var_dump('id_punto_1#'.$contador_reporte);
							$template->cloneRow('id_punto_1#'.$contador_reporte, $cant_preguntas_respuestas);
					        return;

					        if ($cant_preguntas_respuestas > 0) {
					        	//$template->cloneRow('id_punto_1#'.$contador_reporte, $cant_preguntas_respuestas);
					        }else{
					        	/*$template->cloneRow('id_punto_1#'.$contador_reporte, 1);
					        	$template->setValue('id_punto_1#'.$contador_reporte.'#1', '');
					        	$template->setValue('generalidad_1#'.$contador_reporte.'#1', 'Sin observaciones.');
					        	$template->setValue('comentario_1#'.$contador_reporte.'#1', '');
					        	$template->setValue('imagen_resp_1#'.$contador_reporte.'#1', '');
					        	$template->setValue('imagen_resp_2#'.$contador_reporte.'#1', '');
					        	$template->setValue('imagen_resp_3#'.$contador_reporte.'#1', '');
					        	$template->setValue('imagen_resp_4#'.$contador_reporte.'#1', '');
					        	$template->setValue('imagen_resp_5#'.$contador_reporte.'#1', '');
								$template->setValue('id_severidad_1#'.$contador_reporte.'#1', '');
								$template->setValue('id_severidad_2#'.$contador_reporte.'#1', '');*/
					        }


					        $id_pregunta = null;
					        
					        $cant_pregunta_categoria = 0;
					        /*foreach ($group as $pregunta_respuesta) {
					        	$es_grave = null;
					        	$es_leve = null;
					        	$cant_pregunta_categoria++;
					        	$cant_imagen = 0;

								$id_pregunta = $pregunta_respuesta["id_pregunta"];
								$codigo_pregunta = $pregunta_respuesta["codigo_pregunta"];
								$pregunta_obs = $pregunta_respuesta["pregunta_obs"];

								$template->setValue('id_punto_1#'.$contador_reporte.'#'.$cant_pregunta_categoria, $codigo_pregunta);
								$template->setValue('generalidad_1#'.$contador_reporte.'#'.$cant_pregunta_categoria, $pregunta_obs);

								$cant_respuestas_imagenes = sizeof($pregunta_respuesta["respuesta_imagenes"]);

								#$template->cloneBlock('block_comentario#'.$contador_reporte.'#'.$cant_pregunta_categoria, $cant_respuestas_imagenes);
								#$estilo_carpetas_titulo = array('bold'=>true, 'size'=>10, 'name'=>'Arial');
								#$estilo_carpetas = array('bold'=>false, 'size'=>10, 'name'=>'Arial');
								#$table_carpetas = new Table(array('borderSize' => 0, 'borderColor' => 'ffffff', 'width' => 9500, 'unit' => TblWidth::TWIP, 'align' => 'center'));
								#$table_carpetas->addRow();
								#$table_carpetas->addCell(20)->addText('Cumple', $estilo_carpetas_titulo, array('align' => 'center'));

								$cant_comentarios = 1;
								$cant_imagenes = 1;
								#$orden_comentario = 1;
								if ($cant_respuestas_imagenes > 0) {
									foreach ($pregunta_respuesta["respuesta_imagenes"] as $respuesta_imagen) {


										#var_dump($respuesta_imagen);return;


										$cant_imagen_comentario = sizeof($respuesta_imagen["imagenes"]);

										if ($cant_comentarios < 4) {
											$template->setValue('comentario_'.$cant_comentarios.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, $respuesta_imagen["respuesta_obs"]);

											if (isset($respuesta_imagen["id_severidad"])) {
												$id_severidad = $respuesta_imagen["id_severidad"];
												$severidad = $respuesta_imagen["severidad"];
												$estilo_grave = array('bold'=>true, '', 'size'=>10, 'name'=>'Arial', 'underline' => 'single', 'color' => 'red');
												$estilo_leve = array('bold'=>false, 'size'=>10, 'name'=>'Arial');
												
												if (isset($id_severidad) && is_numeric($id_severidad) && $id_severidad == 1) {
													$template->setValue('id_severidad_l_'.$cant_comentarios.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, $severidad);
													$template->setValue('id_severidad_g_'.($cant_comentarios).'#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
												}elseif (isset($id_severidad) && is_numeric($id_severidad) && $id_severidad == 2) {
													$template->setValue('id_severidad_l_'.$cant_comentarios.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
													$template->setValue('id_severidad_g_'.($cant_comentarios).'#'.$contador_reporte.'#'.$cant_pregunta_categoria, $severidad);
												}
											}else{
												$template->setValue('id_severidad_1#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
												$template->setValue('id_severidad_2#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
											}

											$cant_comentarios++;
										}

										
										if (sizeof($respuesta_imagen["imagenes"]) > 0) {
											foreach ($respuesta_imagen["imagenes"] as $imagen_respuesta) {
												#var_dump($imagen_respuesta);return;

												$url_imagen = null;
												$full_path = null;

												if (isset($imagen_respuesta["url_imagen"])) {
													$url_imagen = $imagen_respuesta["url_imagen"];
													$full_path = $imagen_respuesta["full_path"];
												
													if (file_exists($full_path)) {
														$template->setImageValue('imagen_resp_'.($cant_imagenes).'#'.$contador_reporte.'#'.$cant_pregunta_categoria, array('path' => $url_imagen, 'width' => 269, 'height' => 200, 'ratio' => TRUE,'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER));
														$cant_imagenes++;
														#var_dump("entro aca");return;
														#$table->addRow();
														#$source = file_get_contents($url_imagen);
														#$source = 'D:\Jaime Chacon\Escritorio\casa-en-ingles.jpg';
														#var_dump($source);return;
														#$table_carpetas->addCell()->addImage($source);
														#$table_carpetas->addRow();
														#$cell = $table_carpetas->addCell(1300);
														#$cell->addImage($source, array('width' => 100));
														#$textrun->addImage($source);
														#$table->addCell()->addImage($full_path, $imageStyle);
														#$textrun->addText($lipsumText);									            
														#$template->setImageValue('imagen_resp_'.($i+1).'#'.$contador_reporte.'#'.$cant_pregunta_categoria, array('path' => $url_imagen, 'width' => 269, 'height' => 200, 'ratio' => TRUE,'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER));
											        }
										    	}
											}

											$restante_img = (5-$cant_imagen_comentario);
											if ($restante_img > 0) {
												for ($i=0; $i < $restante_img; $i++) {
													#echo 'restante_img '.$restante_img;
													#echo 'cant_imagenes '.$cant_imagenes;
													$template->setValue('imagen_resp_'.$cant_imagenes.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, '');
													$cant_imagenes++;
												}
											}
										}

									}

									$restante_com = (3-$cant_respuestas_imagenes);
									if ($restante_com > 0) {
										for ($i=0; $i < $restante_com; $i++) {
											$template->setValue('comentario_'.$cant_comentarios.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
											$template->setValue('id_severidad_l_'.$cant_comentarios.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
											$template->setValue('id_severidad_g_'.$cant_comentarios.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
											$cant_comentarios++;
										}
									}

									$restante_img = (16-$cant_imagenes);
									if ($restante_img > 0) {
										for ($i=0; $i < $restante_img; $i++) {
											$template->setValue('imagen_resp_'.$cant_imagenes.'#'.$contador_reporte.'#'.$cant_pregunta_categoria, "");
											$cant_imagenes++;
										}
									}
								}



								#$template->cloneBlock('block_comentario_1#1#1', 3);
								#$template->setComplexBlock('comentario_1#'.$contador_reporte.'#'.$cant_pregunta_categoria, $table_carpetas);




							}*/




						}

					}


					#return;

					$observaciones = array();
					$observaciones_generales =  $this->inspeccion_model->obtenerObservacionesInspeccion($id_inspeccion ,$usuario["id_usuario"]);
					if (sizeof($observaciones_generales) > 0) {
						#var_dump($observaciones_generales);
						$cant = 1;

						$template->cloneRow('id_observacion', sizeof($observaciones_generales));


						foreach ($observaciones_generales as $observacion) {
							$id_categoria = null;
							$codigo_c = null;
							$categoria = null;
							$obs_categoria = null;
							$archivo_id = null;
							$file_name = null;
							$inspeccion_checklist_obs_id = null;
							$observacion_item = null;
							$orden_r = null;

							$id_categoria = $observacion['id_categoria'];
	                     	$codigo_c = $observacion['codigo_categoria'];
	                     	$categoria = $observacion['categoria'];
	                     	$obs_categoria = $observacion['obs_categorias'];
	                     	$archivo_id = $observacion['archivo_id'];
	                     	$file_name_imagen = $observacion['file_name'];
	                     	$full_path = $observacion['full_path'];
	                     	$inspeccion_checklist_obs_id = $observacion['inspeccion_checklist_obs_id'];
	                     	$observacion_item = $observacion['observaciones'];
	                     	$orden_r = $observacion['orden'];
	                    	
	                    	$id_obs = $orden_r;

	                    	$url_imagen = base_url().'assets/files/image/'.$file_name_imagen;

				    		$template->setValue('id_observacion#'.$cant, $orden_r);
	                    	$template->setValue('observacion#'.$cant, $observacion_item);
				    		$template->setImageValue('image_observacion#'.$cant, array('path' => $url_imagen, 'width' => 269, 'height' => 200, 'ratio' => TRUE,'alignment' => \PhpOffice\PhpWord\SimpleType\Jc::CENTER));

				    		$cant++;

		                }

					}


					$file_name = 'Informe_norma.docx';

					#$nombre_reporte = $_SERVER['DOCUMENT_ROOT'].'/assets/doc/Informe_norma.docx';
					#$nombre_reporte = $_SERVER['DOCUMENT_ROOT'].'/assets/doc/Informe_norma.docx';

					
					#var_dump(file_exists($nombre_reporte));
					#var_dump(unlink($nombre_reporte));

					$filepath = $template->save();
					#var_dump($filepath);
					#rename($filepath, "plantilla_reporte.docx");
					#$template->saveAs($filepath);


					#var_dump("llego acá");
				    
				    header('Content-Description: File Transfer');
					header('Content-Type: application/octet-stream');
					header('Content-Disposition: attachment; filename='."reporte_".$id_inspeccion.".docx");#.$filepath);
					header('Content-Transfer-Encoding: binary');
					header('Expires: 0');
					header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
					header('Pragma: public');
					header('Content-Length: ' . filesize($filepath));
					flush();
					readfile($filepath);
					unlink($filepath);
					exit();
				}

			}
		}else{
			redirect('Inicio');
		}
	}

	public function agregarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				#var_dump($this->input->POST());

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


				try{
				/*	$accion = 'agregado';
					$idInspeccion = null;
					$tecnico = null;
					$cantidad_ascensor = null;
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
					$cantidad = null;
					$diamTraccion = null;
					$enclavamientoE = null;
					$enclavamientoM = null;
					$diamCableL = null;
					$idNorma = null;
					$cant_respuestas_agregadas = null;
					$es_temporal = 0;

					if(!is_null($this->input->POST('es_temporal')) && trim($this->input->POST('es_temporal')) != "" && trim($this->input->POST('es_temporal')) != "-1")
						$es_temporal = trim($this->input->POST('es_temporal'));

					if(!is_null($this->input->POST('inputTecnico')) && trim($this->input->POST('inputTecnico')) != "")
						$tecnico = trim($this->input->POST('inputTecnico'));

					if(!is_null($this->input->POST('inputCantAscensor')) && trim($this->input->POST('inputCantAscensor')) != "")
						$cantidad_ascensor = trim($this->input->POST('inputCantAscensor'));

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

					#if(!is_null($this->input->POST('inputFechaContrato')) && trim($this->input->POST('inputFechaContrato')) != "")
					#	$fechaC = trim($this->input->POST('inputFechaContrato'));

					#if(!is_null($this->input->POST('selectContratoVigente')) && trim($this->input->POST('selectContratoVigente')) != "")
					#	$contratoV = trim($this->input->POST('selectContratoVigente'));

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



					#respuestas carpeta tecnica y herramientas
					#$contador_carpeta = 1;
					#$respuestas_carpeta = array();

					#for ($i=0; $i < $contador_carpeta; $i++) {
					#	if(!is_null($this->input->POST('rbCarpeta'.$contador_carpeta)) && trim($this->input->POST('rbCarpeta'.$contador_carpeta)) != ""){
					#		$respuesta_carpeta = explode("-", $this->input->POST('rbCarpeta'.$contador_carpeta));
					#		$id_carpeta = $respuesta_carpeta[1];
					#		$respuesta = ($respuesta_carpeta[0] == "si" ? true : false);
					#		$respuestas_carpeta[] = array('id_carpeta' => $id_carpeta, 'respuesta' => $respuesta);
					#		$contador_carpeta++;
					#	}
					#}


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

					#$contador_herramienta = 1;
					#$respuestas_herramienta = array();
					#for ($i=0; $i < $contador_herramienta; $i++) {
					#	if(!is_null($this->input->POST('rbHerramienta'.$contador_herramienta)) && trim($this->input->POST('rbHerramienta'.$contador_herramienta)) != ""){
					#		$respuesta_herramienta = explode("-", $this->input->POST('rbHerramienta'.$contador_herramienta));
					#		$id_herramienta = $respuesta_herramienta[1];
					#		$respuesta = ($respuesta_herramienta[0] == "si" ? true : false);
					#		$respuestas_herramienta[] = array('id_herramienta' => $id_herramienta, 'respuesta' => $respuesta);
					#		$contador_herramienta++;
					#	}
					#}
					#var_dump($respuestas_herramientas);

					$respuestas_normas = array();
					if (isset($totalNormas) && is_numeric($totalNormas) && (int)$totalNormas > 0) {

						if(!is_null($this->input->POST('rbNorma1')) && trim($this->input->POST('rbNorma1')) != ""){
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
							$id_respuesta = null;

							if(!is_null($this->input->POST('rbPregunta'.strval($f+1))) && trim($this->input->POST('rbPregunta'.strval($f+1))) != "" && strlen($this->input->POST('rbPregunta'.strval($f+1))) > 0)
								$respuesta_cat_pre_check = trim($this->input->POST('rbPregunta'.strval($f+1)));

							#if(!is_null($this->input->POST('rbPregunta'.strval($f+1).'_NO')) && trim($this->input->POST('rbPregunta'.strval($f+1).'_NO')) != "" && strlen($this->input->POST('rbPregunta'.strval($f+1).'_NO')) > 0)
							#	$respuesta_no = trim($this->input->POST('rbPregunta'.strval($f+1).'_NO'));

							#if(!is_null($this->input->POST('rbPregunta'.strval($f+1).'_NA')) && trim($this->input->POST('rbPregunta'.strval($f+1).'_NA')) != "" && strlen($this->input->POST('rbPregunta'.strval($f+1).'_NA')) > 0)
							#	$respuesta_na = trim($this->input->POST('rbPregunta'.strval($f+1).'_NA'));

							if(!is_null($this->input->POST('inputObservaciones'.strval($f+1))) && trim($this->input->POST('inputObservaciones'.strval($f+1))) != "" && strlen($this->input->POST('inputObservaciones'.strval($f+1))) > 0)
								$observacion_pregunta = trim($this->input->POST('inputObservaciones'.strval($f+1)));

							if(!is_null($this->input->POST('sRespuesta'.strval($f+1))) && trim($this->input->POST('sRespuesta'.strval($f+1))) != "" && is_numeric($this->input->POST('sRespuesta'.strval($f+1))) && (int)$this->input->POST('sRespuesta'.strval($f+1)) > 0)
								$id_respuesta = trim($this->input->POST('sRespuesta'.strval($f+1)));
							

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
								$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'respuesta' => $respuesta_pregunta_rb, 'observacion' => $observacion, 'orden' => strval($f+1), 'id_respuesta' => $id_respuesta
								);

							}
							#if (isset($respuesta_no) && strlen($respuesta_no) > 0) {
							#	$respuesta_cat_pre = explode("-", $respuesta_no);
							#	$id_cat_pre = explode("_", $respuesta_cat_pre[1]);
							#	$id_categoria = $id_cat_pre[0];
							#	$id_pregunta = $id_cat_pre[1];
							#	$respuesta_pregunta_rb = ($respuesta_cat_pre[0] == "no" ? 2: null);
							#	$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'respuesta' => $respuesta_pregunta_rb, 'observacion' => $observacion, 'orden' => strval($f+1));
							#}
							#if (isset($respuesta_na) && strlen($respuesta_na) > 0) {
							#	$respuesta_cat_pre = explode("-", $respuesta_na);
							#	$id_cat_pre = explode("_", $respuesta_cat_pre[1]);
							#	$id_categoria = $id_cat_pre[0];
							#	$id_pregunta = $id_cat_pre[1];
							#	$respuesta_pregunta_rb = ($respuesta_cat_pre[0] == "na" ? 3: null);
							#	$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'respuesta' => $respuesta_pregunta_rb, 'observacion' => $observacion, 'orden' => strval($f+1));
							#}
							#var_dump($respuesta_pregunta_rb);
							#$respuestas_checklists[] = 
							#var_dump($respuestas_checklists);
							#$respuesta_norma = explode("-", $respuesta);
							#	$id_norma = $respuesta_norma[1];
							#	$respuesta_norma_rb = ($respuesta_norma[0] == "si" ? true : false);
							#	$respuestas_checklists[] = array('id_norma' => $id_norma, 'respuesta' => $respuesta_norma_rb);

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

					if(!is_null($this->input->POST('inputCantidad')) && trim($this->input->POST('inputCantidad')) != "")
						$cantidad = trim($this->input->POST('inputCantidad'));

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
					
					#var_dump($this->input->POST());
					#var_dump($_FILES);

					#var_dump($idInspeccion);
					#var_dump($tecnico);
					#var_dump($nombreE);
					#var_dump($direccionE);
					#var_dump($rutE);
					#var_dump($idE);
					#var_dump($nombreA);
					#var_dump($rutA);
					#var_dump($emailA);
					##var_dump($fechaC);
					##var_dump($contratoV);
					#var_dump($idEmpresaM);
					#var_dump($nombreRM);
					#var_dump($fechaUM);

					#var_dump($marca);
					#var_dump($idUso);
					#var_dump($capacidad);
					#var_dump($capacidadKG);
					#var_dump($idSuspension);
					#var_dump($salaMaquina);
					#var_dump($velocidad);
					#var_dump($recorrido);
					#var_dump($paradas);
					#var_dump($idTipoTraccion);
					#var_dump($diamTraccion);
					#var_dump($enclavamientoE);
					#var_dump($enclavamientoM);
					#var_dump($diamCableL);
					#var_dump($idNorma);


					$respuesta = 0;
					$mensaje = '';

					$resultado = $this->inspeccion_model->agregarInspeccion($idInspeccion, $tecnico, $cantidad_ascensor, $nombreE, $direccionE, $rutE, $idE, $nombreA, $rutA, $emailA, $idEmpresaM, $nombreRM, $fechaUM, $marca, $idUso, $capacidad, $capacidadKG, $idSuspension, $salaMaquina, $velocidad, $recorrido, $paradas, $idTipoTraccion, $cantidad, $diamTraccion, $enclavamientoE, $enclavamientoM, $diamCableL, $idNorma, $usuario["id_usuario"], $es_temporal);

					if($resultado && $resultado["resultado"] > 0)
					{
						
						if(isset($resultado['id_inspeccion']))
						{
							
							if(is_null($idInspeccion))
								$idInspeccion = (int)$resultado['id_inspeccion'];
								
								$orden_carpeta = 0;
								$resultado_ec = $this->carpeta_model->eliminarCarpetaInspeccion($idInspeccion, $usuario["id_usuario"]);
								if (isset($resultado_ec) && $resultado_ec["resultado"] > 0) {
									if (sizeof($respuestas_carpetas) > 0) {	
										foreach ($respuestas_carpetas as $carpeta) {
											$orden_carpeta++;
											$id_carpeta = $carpeta["id_carpeta"];
											$respuesta = $carpeta["respuesta"];
											$resultado_carpeta = $this->inspeccion_model->agregarCarpetaInspeccion($id_carpeta, $respuesta, $orden_carpeta, $idInspeccion);
										}
									}
								}

								$orden_herramienta = 0;
								$resultado_oh = $this->herramienta_model->eliminarHerramientasInspeccion($idInspeccion, $usuario["id_usuario"]);
								if (isset($resultado_oh) && $resultado_oh["resultado"] > 0) {
									if (sizeof($respuestas_herramientas) > 0) {
										foreach ($respuestas_herramientas as $herramienta) {
											$orden_herramienta++;
											$id_herramienta = $herramienta["id_herramienta"];
											$respuesta = $herramienta["respuesta"];
											$resultado_herramienta = $this->inspeccion_model->agregarHerramientaInspeccion($id_herramienta, $respuesta, $orden_herramienta, $idInspeccion);
										}
									}
								}
								
								$orden_norma = 0;
								$resultado_oh = $this->norma_model->eliminarNormasInspeccion($idInspeccion, $usuario["id_usuario"]);
								if (isset($resultado_oh) && $resultado_oh["resultado"] > 0) {
									if (sizeof($respuestas_normas) > 0) {
										foreach ($respuestas_normas as $norma) {
											$orden_norma++;
											$id_norma = $norma["id_norma"];
											$respuesta = $norma["respuesta"];
											$resultado_norma = $this->inspeccion_model->agregarNormaInspeccion($id_norma, $respuesta, $orden_norma, $idInspeccion);
										}
									}
								}

								$respuestas_checklists_data = array();
								$orden_checklist = 1;

								$resultado_respuesta_checklist = null;
								$id_inspeccion_checklist_bk = null;
								$resultado_rch = $this->inspeccion_model->eliminarRespuestasChecklistInspeccion($idInspeccion, $usuario["id_usuario"]);
								$resultado_ni = $this->norma_model->eliminarNormasChecklistInspeccion($idInspeccion, $usuario["id_usuario"]);

								if (isset($resultado_ni) && $resultado_ni["resultado"] > 0) {
									if (isset($idNorma) && !is_null($idNorma) && is_numeric($idNorma)) {
										#$id_inspeccion_checklist_bk = $resultado_ni
										$id_inspeccion_checklist_bk = $resultado_ni["id_inspeccion_checklist"];
										$resultado_respuesta_checklist = $this->inspeccion_model->agregarInspeccionChecklist($idNorma, $orden_checklist, $idInspeccion);
									}
								}

								if (isset($resultado_rch) && $resultado_rch["resultado"] > 0) {

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
												$id_respuesta = $res_check["id_respuesta"];

												#var_dump($id_categoria);
												#var_dump($id_pregunta);
												#var_dump($respuesta_check);
												#var_dump($observacion);
												#var_dump($orden);

												$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheck($id_categoria, $id_pregunta, $respuesta_check, $observacion, $orden, $id_respuesta, $id_inspeccion_checklist, $usuario["id_usuario"]);
												if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
													$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
													$respuestas_checklists_data[] = array("id_inspeccion_checklist" => $id_inspeccion_checklist, "id_inspeccion_checklist_resp" => $id_inspeccion_checklist_resp, "id_categoria" => $id_categoria, "id_pregunta" => $id_pregunta, "respuesta_check" => $respuesta_check, "observacion" => $observacion);
													$cant_respuestas_agregadas++;
												}
											}
										}
									}
								}

								$cant_archivos = 0;
								#var_dump($_FILES);
								#var_dump($this->input->POST());
								#var_dump($_FILES);
								if (sizeof($_FILES) > 0) {

									$id_inspeccion_checklist = null;
									if (isset($resultado_respuesta_checklist) && isset($resultado_respuesta_checklist["resultado"]) && $resultado_respuesta_checklist["resultado"] > 0) {
										if (isset($resultado_respuesta_checklist["id_inspeccion_checklist"]) && is_numeric($resultado_respuesta_checklist["id_inspeccion_checklist"]) && (int)$resultado_respuesta_checklist["id_inspeccion_checklist"] > 0)
											$id_inspeccion_checklist = (int)$resultado_respuesta_checklist["id_inspeccion_checklist"];
									}
									
									#var_dump($_FILES);
									
									foreach ($_FILES as $nombre_archivo_input => $archivo) {
										$datos_archivo = explode("_", $archivo["name"]);
										#var_dump($nombre_archivo_input);
										#var_dump($archivo);
										



										if (sizeof($datos_archivo) == 3) {
											
											$id_categoria = null;
											$id_archivo_obs = null;
											$orden = $datos_archivo[2];
											

											if (strpos($datos_archivo[1], '-')) {
												#var_dump($datos_archivo);
												$archivo_info = explode("-", $datos_archivo[1]);
												$id_archivo_obs = $archivo_info[1];
												$id_categoria = $archivo_info[0];
											}else{
												$id_categoria = $datos_archivo[1];
											}

											$observacion = null;

											if (isset($id_archivo_obs) && strlen($id_archivo_obs) > 0) {
												if(!is_null($this->input->POST('input_obs_'.strval($id_categoria)."-".strval($id_archivo_obs)."_".strval($orden))) && trim($this->input->POST('input_obs_'.strval($id_categoria)."-".strval($id_archivo_obs)."_".strval($orden))) != "")
													$observacion = trim($this->input->POST('input_obs_'.strval($id_categoria)."-".strval($id_archivo_obs)."_".strval($orden)));
											}else{
												if(!is_null($this->input->POST('input_obs_'.strval($id_categoria)."_".strval($orden))) && trim($this->input->POST('input_obs_'.strval($id_categoria)."_".strval($orden))) != "")
													$observacion = trim($this->input->POST('input_obs_'.strval($id_categoria)."_".strval($orden)));
											}

											
											#var_dump($observacion);
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
											$id_inspeccion_checklist_obs = null;

											$resultado_obs_check = $this->inspeccion_model->agregarObservacionCheck($id_categoria, $observacion, $orden, $id_inspeccion_checklist, $usuario["id_usuario"]);
											#var_dump($resultado_obs_check);

											if ($resultado_obs_check && isset($resultado_obs_check["resultado"]) && is_numeric($resultado_obs_check["resultado"]) && (int)$resultado_obs_check["resultado"] > 0)
												$id_inspeccion_checklist_obs = (int)$resultado_obs_check["id_inspeccion_checklist_obs"];
											
											$nuevoNombre = $id_inspeccion_checklist.'_'.$id_inspeccion_checklist_obs.'_'.$id_categoria.'_'.$orden.'.png';
											
											$config['upload_path'] = './assets/files/image';
											$config['allowed_types'] = '*';
											$config['remove_spaces'] = TRUE;
											$config['max_size'] = '0';
											$config['file_name'] = $nuevoNombre;

											$this->load->library('upload', $config);
											$this->upload->initialize($config);

											#var_dump($nombre_original);
											#var_dump($config);

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

												$respuesta_archivo = $this->inspeccion_model->agregarArchivo($file_name, $file_type, $file_path, $full_path, $raw_name, $orig_name, $client_name, $file_ext, $file_size, $is_image, $image_width, $image_height, $image_type, $image_size_str, null, $id_categoria, null, $orden, $usuario["id_usuario"], $id_inspeccion_checklist_obs);
												if ($respuesta_archivo && isset($respuesta_archivo["resultado"]) && is_numeric($respuesta_archivo["resultado"]) && (int)$respuesta_archivo["resultado"] > 0) {
													$cant_archivos++;
												}
											}else
											{
												$error = $this->upload->display_errors();
											}

										}else{
											$datos_archivo = explode("_", $archivo["name"]);

											if ($archivo["name"] == "") {

												#var_dump($nombre_archivo_input);

												$datos_archivo = explode("_", $nombre_archivo_input);

												#var_dump(sizeof($datos_archivo));
												#$id_categoria = null;
												#$id_archivo_obs = null;
												#$orden = $datos_archivo[2];
												
												
												if (strpos($datos_archivo[1], '-')) {
													#var_dump($datos_archivo);
													#$archivo_info = explode("-", $datos_archivo[1]);
													#$id_archivo_obs = $archivo_info[1];
													#$id_categoria = $archivo_info[0];
												}#else{
													#$id_categoria = $datos_archivo[1];
												#}


												if (sizeof($datos_archivo) == 5) {
													$archivo_id_input = $datos_archivo[1];
													$id_categoria = $datos_archivo[2];
													$id_pregunta = $datos_archivo[3];
													$orden_archivo = $datos_archivo[4];


													$array_filtrado_checklist = array_filter($respuestas_checklists_data, function($val) use($id_categoria, $id_pregunta){
											              return ($val['id_categoria']==$id_categoria and $val['id_pregunta']==$id_pregunta);
											         });

													if ($array_filtrado_checklist && isset($array_filtrado_checklist) && sizeof($array_filtrado_checklist) == 1) {
														foreach ($array_filtrado_checklist as $key => $value) {
															$id_inspeccion_checklist_resp = $array_filtrado_checklist[$key]["id_inspeccion_checklist_resp"];	
														}
													}

											        #var_dump($array_filtrado_checklist);

													#var_dump($archivo_id_input);
													#var_dump($id_categoria);
													#var_dump($id_pregunta);
													#var_dump($orden_archivo);
													#var_dump($id_inspeccion_checklist_resp);
													#var_dump($id_inspeccion_checklist_bk);
													$respuesta_archivo_existente = $this->inspeccion_model->agregarArchivoExistente($idInspeccion, $id_inspeccion_checklist_bk, $archivo_id_input, $id_categoria, $id_pregunta, $orden_archivo, $usuario["id_usuario"] , $id_inspeccion_checklist_resp);
													#var_dump($respuesta_archivo_existente);
	#												exit();

													if (isset($respuesta_archivo_existente) && !is_null($respuesta_archivo_existente) && sizeof($respuesta_archivo_existente) > 0) {
														$cant_archivos++;
													}

												}elseif (sizeof($datos_archivo) == 3 && strpos($datos_archivo[1], '-')) {
													
													
													$info_obs = explode("-", $datos_archivo[1]);
													$id_archivo_obs = $info_obs[1];
													$id_categoria = $info_obs[0];
													$orden = $datos_archivo[2];

													#var_dump($id_archivo_obs);
													#var_dump($id_categoria);
													#var_dump($orden);
													#var_dump($nombre_archivo_input);
													#var_dump($id_inspeccion_checklist);


													$resultado_obs_check = $this->inspeccion_model->agregarObservacionCheck($id_categoria, $observacion, $orden, $id_inspeccion_checklist, $usuario["id_usuario"], $id_archivo_obs);
													if ($resultado_obs_check && isset($resultado_obs_check["resultado"]) && is_numeric($resultado_obs_check["resultado"]) && (int)$resultado_obs_check["resultado"] > 0) {
														$cant_archivos++;
													}
													#$array_filtrado_checklist = array_filter($respuestas_checklists_data, function($val) use($id_categoria, $id_pregunta){
											        #      return ($val['id_categoria']==$id_categoria and $val['id_pregunta']==$id_pregunta);
											        # });

													#if ($array_filtrado_checklist && isset($array_filtrado_checklist) && sizeof($array_filtrado_checklist) == 1) {
													#	foreach ($array_filtrado_checklist as $key => $value) {
													#		$id_inspeccion_checklist_resp = $array_filtrado_checklist[$key]["id_inspeccion_checklist_resp"];	
													#	}
													#}

													#$respuesta_archivo_existente = $this->inspeccion_model->agregarArchivoExistente($idInspeccion, $id_inspeccion_checklist_bk, $archivo_id_input, $id_categoria, $id_pregunta, $orden_archivo, $usuario["id_usuario"] , $id_inspeccion_checklist_resp);
												}

												
												
												
												#$respuesta_archivo_existente = $this->inspeccion_model->agregarArchivoExistente($id_inspeccion_checklist_resp, $id_categoria, $id_pregunta, $orden_archivo, $usuario["id_usuario"]);

												#if ($respuesta_archivo_existente && isset($respuesta_archivo_existente["resultado"]) && is_numeric($respuesta_archivo_existente["resultado"]) && (int)$respuesta_archivo_existente["resultado"] > 0) {
													#$cant_archivos++;
												#}

												
											}else{


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
												#var_dump($nombre_original);
												#var_dump($config);

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
											#var_dump($archivo);
											#reset($archivo);
											#$key_archivo = key($archivo);
											#var_dump($key_archivo);
											#var_dump($archivo);

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

								if (isset($cant_respuestas_agregadas) && !is_null($cant_respuestas_agregadas) && $cant_respuestas_agregadas > 0) {
									$mensaje .= ' Se han agregado '.$cant_respuestas_agregadas.' Respuestas a la Inspeccion.</br></br>';
								}
								

							#}else{
							#	if (isset($resultado) && $resultado["resultado"] > 0) {
							#		$resultado = 1;
							#		$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							#	}else{
							#		$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							#	}
							#}
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
					*/

					#var_dump($this->input->POST());

					$accion = 'agregado';
					$idInspeccion = null;
					$es_temporal = 0;
					$es_reinspeccion = 0;

					if(!is_null($this->input->POST('es_temporal')) && trim($this->input->POST('es_temporal')) != "" && trim($this->input->POST('es_temporal')) != "-1")
						$es_temporal = trim($this->input->POST('es_temporal'));

					if(!is_null($this->input->POST('inputIdInspeccion')) && trim($this->input->POST('inputIdInspeccion')) != "" && trim($this->input->POST('inputIdInspeccion')) != "-1" && is_numeric($this->input->POST('inputIdInspeccion')))
						$idInspeccion = trim($this->input->POST('inputIdInspeccion'));

					if(!is_null($this->input->POST('es_reinspeccion')) && trim($this->input->POST('es_reinspeccion')) != "" && trim($this->input->POST('es_reinspeccion')) != "-1")
						$es_reinspeccion = trim($this->input->POST('es_reinspeccion'));
					

					$respuesta_activacion = $this->inspeccion_model->activarInspeccion($idInspeccion, $usuario["id_usuario"], $es_reinspeccion);
					#var_dump($respuesta_activacion);
					
					if ($respuesta_activacion && isset($respuesta_activacion["resultado"]) && is_numeric($respuesta_activacion["resultado"]) && (int)$respuesta_activacion["resultado"] > 0) {
						$resultado = $respuesta_activacion["resultado"];
						$mensaje = "Se ha ".$accion." exitosamente la Inspeccion";
						$idInspeccion = $respuesta_activacion["id_inspeccion"];
					}

					$data['resultado'] = $resultado;
					$data['mensaje'] = $mensaje;
					$data['id_inspeccion'] = $idInspeccion;
				}catch(Exception $e){
					$data['resultado'] = -1;
				    $data['mensaje'] = $e;
				    $data['id_inspeccion'] = -1;
				}
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

				$normas =  $this->norma_model->obtenerNormasReporte($usuario["id_usuario"]);
				$usuario['normas'] = $normas;

				$herramientas =  $this->herramienta_model->listarHerramientas($usuario["id_usuario"]);
				$usuario['herramientas'] = $herramientas;

				$carpetas =  $this->carpeta_model->listarCarpetas($usuario["id_usuario"]);
				$usuario['carpetas'] = $carpetas;

				$suspensiones =  $this->suspension_model->listarSuspensiones($usuario["id_usuario"]);
				$usuario['suspensiones'] = $suspensiones;

				$usos =  $this->uso_model->listarUsos($usuario["id_usuario"]);
				$usuario['usos'] = $usos;

				$tipos_traccion =  $this->traccion_model->listarTipoTracciones($usuario["id_usuario"]);
				$usuario['tipos_traccion'] = $tipos_traccion;

				/*$idInspeccion = null;
				$tecnico = null;
				$nombreE = null;
				$direccionE = null;
				$rutE = null;
				$idE = null;
				$nombreA = null;
				$rutA = null;
				$emailA = null;
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
				$cantidad = null;
				$diamTraccion = null;
				$enclavamientoE = null;
				$enclavamientoM = null;
				$diamCableL = null;
				$idNorma = null;*/
				

				#$resultado_inspeccion = $this->inspeccion_model->agregarInspeccion($idInspeccion, $tecnico, $nombreE, $direccionE, $rutE, $idE, $nombreA, $rutA, $emailA, $idEmpresaM, $nombreRM, $fechaUM, $marca, $idUso, $capacidad, $capacidadKG, $idSuspension, $salaMaquina, $velocidad, $recorrido, $paradas, $idTipoTraccion, $cantidad, $diamTraccion, $enclavamientoE, $enclavamientoM, $diamCableL, $idNorma, $usuario["id_usuario"], 1);

				#if ($resultado_inspeccion && isset($resultado_inspeccion["resultado"]) && is_numeric($resultado_inspeccion["resultado"]) && (int)$resultado_inspeccion["resultado"] > 0) {
				#	$id_inspeccion = (int)$resultado_inspeccion["id_inspeccion"];
				#	$usuario["inspeccion"] = array('id' => $id_inspeccion, 'es_temporal' => 1);
				#}

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
                $usuario["inspeccion"] = array('es_temporal' => 1);

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


	public function agregarInspeccionTemporal()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				try{
					$accion = 'agregado';
					$idInspeccion = null;

					$id_elemento = null;
					$valor_elemento = null;
					$resultado = null;
					/*$tecnico = null;
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
					$cantidad = null;
					$diamTraccion = null;
					$enclavamientoE = null;
					$enclavamientoM = null;
					$diamCableL = null;*/
					$idNorma = null;
					$cant_respuestas_agregadas = null;
					$es_temporal = 0;
					$es_reinspeccion = false;
					$id_reinspeccion = null;

					if(!is_null($this->input->POST('id_inspeccion')) && is_numeric($this->input->POST('id_inspeccion')))
					{
						$idInspeccion = $this->input->POST('id_inspeccion');
					}

					if(!is_null($this->input->POST('re_inspeccion')) && trim($this->input->POST('es_temporal')) != "" && trim($this->input->POST('es_temporal')) != "-1")
					{
						$es_reinspeccion = $this->input->POST('re_inspeccion');
					}

					#var_dump($es_reinspeccion);
					#exit();

					if(!is_null($this->input->POST('reinspeccion')) && is_numeric($this->input->POST('reinspeccion')) && trim($this->input->POST('reinspeccion')) != "-1")
					{
						$id_reinspeccion = $this->input->POST('reinspeccion');
					}

					#var_dump($id_reinspeccion);
					#exit();


					if(!is_null($this->input->POST('es_temporal')) && trim($this->input->POST('es_temporal')) != "" && trim($this->input->POST('es_temporal')) != "-1")
						$es_temporal = trim($this->input->POST('es_temporal'));

					if(!is_null($this->input->POST('id_elemento')) && trim($this->input->POST('id_elemento')) != "" && trim($this->input->POST('id_elemento')) != "-1")
						$id_elemento = trim($this->input->POST('id_elemento'));

					if(!is_null($this->input->POST('valor_elemento')) && trim($this->input->POST('valor_elemento')) != "" && trim($this->input->POST('valor_elemento')) != "-1")
						$valor_elemento = trim($this->input->POST('valor_elemento'));

					$totalCarpeta = null;
					if(!is_null($this->input->POST('total_carpetas')) && trim($this->input->POST('total_carpetas')) != "" && strpos($id_elemento, 'rbCarpeta') !== false){

						$totalCarpeta = trim($this->input->POST('total_carpetas'));
						$respuestas_carpetas = array();
						if (isset($totalCarpeta) && is_numeric($totalCarpeta) && (int)$totalCarpeta > 0) {
							for ($i=0; $i < $totalCarpeta; $i++) {
								$respuesta = null;

								#if(!is_null($this->input->POST('rbCarpeta'.strval($i+1))) && trim($this->input->POST('rbCarpeta'.strval($i+1))) != "")
									#$respuesta = trim($this->input->POST('rbCarpeta'.strval($i+1)));
								
								$posicion_carpetas = explode("_", $id_elemento);
								$posicion_carpeta = $posicion_carpetas[0];


								$posicion_carpeta = substr($posicion_carpetas[0], 9, strlen($posicion_carpetas[0]) - 8);

								if (isset($posicion_carpeta) && is_numeric($posicion_carpeta) && (int)$posicion_carpeta > 0 && (int)$posicion_carpeta === ($i+1)) {
									$respuesta = $valor_elemento;

									if (isset($respuesta) && strlen($respuesta) > 0 && strpos($respuesta, '-') > 0) {
										$respuesta_carpeta = explode("-", $respuesta);
										$id_carpeta = $respuesta_carpeta[1];
										$respuesta_carpeta_rb = ($respuesta_carpeta[0] == "si" ? true : false);
										$orden_sub_carpeta = ($i+1);
										$respuestas_carpetas[] = array('id_carpeta' => $id_carpeta, 'respuesta' => $respuesta_carpeta_rb, 'orden' => $orden_sub_carpeta);
									}
								}


								
							}
						}

						#var_dump($respuestas_carpetas);

						if ($es_reinspeccion) {
							var_dump("entro aca 1");
							exit();
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							var_dump($resultado);
							exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}
						
						#var_dump($resultado);
						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion))
									$idInspeccion = (int)$resultado['id_inspeccion'];

								$orden_carpeta = 0;
								if (sizeof($respuestas_carpetas) > 0) {	
									foreach ($respuestas_carpetas as $carpeta) {
										$orden_carpeta++;
										$id_carpeta = $carpeta["id_carpeta"];
										$respuesta = $carpeta["respuesta"];
										$orden_sub_carpeta = $carpeta["orden"];
										$resultado_carpeta = $this->inspeccion_model->agregarCarpetaInspeccion($id_carpeta, $respuesta, $orden_sub_carpeta, $idInspeccion);
										#var_dump($resultado_carpeta);
									}
								}

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{
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

					}


					$totalNormas = null;
					if(!is_null($this->input->POST('total_normas')) && trim($this->input->POST('total_normas')) != "" && strpos($id_elemento, 'rbNorma') !== false){

						$totalNormas = trim($this->input->POST('total_normas'));
						$respuestas_normas = array();
						if (isset($totalNormas) && is_numeric($totalNormas) && (int)$totalNormas > 0) {




							for ($i=0; $i < $totalNormas; $i++) {
								$respuesta = null;

								#if(!is_null($this->input->POST('rbCarpeta'.strval($i+1))) && trim($this->input->POST('rbCarpeta'.strval($i+1))) != "")
									#$respuesta = trim($this->input->POST('rbCarpeta'.strval($i+1)));
								
								$posicion_normas = explode("_", $id_elemento);
								$posicion_norma = substr($posicion_normas[0], 7, strlen($posicion_normas[0]) - 6);

								if (isset($posicion_norma) && is_numeric($posicion_norma) && (int)$posicion_norma > 0 && (int)$posicion_norma === ($i+1)) {
									$respuesta = $valor_elemento;

									if (isset($respuesta) && strlen($respuesta) > 0 && strpos($respuesta, '-') > 0) {
										$respuesta_norma = explode("-", $respuesta);
										$id_norma = $respuesta_norma[1];
										$respuesta_norma_rb = ($respuesta_norma[0] == "si" ? true : false);
										$orden_sub_norma = ($i+1);
										$respuestas_normas[] = array('id_norma' => $id_norma, 'respuesta' => $respuesta_norma_rb, 'orden' => $orden_sub_norma);
									}
								}
							}
						}
						
						for ($i=0; $i < 3 ; $i++) {

							if ($es_reinspeccion) {
								var_dump("entro aca 2");
								exit();
								$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
								var_dump($resultado);
								exit();
							}else{
								$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
							}
							#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
							#var_dump($resultado);
							if($resultado && $resultado["resultado"] > 0)
							{
								if(isset($resultado['id_inspeccion']))
								{
									if(is_null($idInspeccion))
										$idInspeccion = (int)$resultado['id_inspeccion'];

									$orden_norma = 0;
									if (sizeof($respuestas_normas) > 0) {	
										foreach ($respuestas_normas as $norma) {
											$orden_norma++;
											$id_norma = $norma["id_norma"];
											$respuesta = $norma["respuesta"];
											$orden_sub_norma = $norma["orden"];
											$resultado_norma = $this->inspeccion_model->agregarNormaInspeccion($id_norma, $respuesta, $orden_sub_norma, $idInspeccion);
											#var_dump($resultado_norma);
										}
									}

									$resultado = 1;
									$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
									break;
								}else{
									$resultado = -1;
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}
							}else{
								if($resultado["resultado"] === -1)
								{
									if (!isset($resultado["mensaje"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
									}else{
										if (isset($resultado["mensaje"]["message"])) {
											$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
										}
									}
								}elseif ($resultado["resultado"] === 0) {
									$i=$i;
									if (isset($data["reintentos"])) {
										$data["reintentos"] = ((int)$data["reintentos"] +1);
									}else{
										$data["reintentos"] = 1;
									}
									
								}
							}
						}
					}


					#$data['total_herramientas'] = $this->input->POST('total_herramientas');
					#$data['id_elemento'] = $id_elemento;

					
					$totalHerramientas = null;
					if(!is_null($this->input->POST('total_herramientas')) && trim($this->input->POST('total_herramientas')) != "" && strpos($id_elemento, 'rbHerramienta') !== false){
						
						$totalHerramientas = trim($this->input->POST('total_herramientas'));
						$respuestas_herramientas = array();
						if (isset($totalHerramientas) && is_numeric($totalHerramientas) && (int)$totalHerramientas > 0) {

							for ($i=0; $i < $totalHerramientas; $i++) {
								$respuesta = null;

								$posicion_herramientas = explode("_", $id_elemento);
								$posicion_herramienta = substr($posicion_herramientas[0], 13, strlen($posicion_herramientas[0]) - 12);

								if (isset($posicion_herramienta) && is_numeric($posicion_herramienta) && (int)$posicion_herramienta > 0 && (int)$posicion_herramienta === ($i+1)) {
									$respuesta = $valor_elemento;

									if (isset($respuesta) && strlen($respuesta) > 0 && strpos($respuesta, '-') > 0) {
										$respuesta_herramienta = explode("-", $respuesta);
										$id_herramienta = $respuesta_herramienta[1];
										$respuesta_herramienta_rb = ($respuesta_herramienta[0] == "si" ? true : false);
										$orden_sub_herramienta = ($i+1);
										$respuestas_herramientas[] = array('id_herramienta' => $id_herramienta, 'respuesta' => $respuesta_herramienta_rb, 'orden' => $orden_sub_herramienta);
									}
								}
							}
						}

						for ($i=0; $i < 3 ; $i++) {

							#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
							if ($es_reinspeccion) {
								var_dump("entro aca 3");
								exit();
								$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
								var_dump($resultado);
								exit();
							}else{
								$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
							}

							#var_dump($resultado);
							#$data["resultado_insert_inspec"] = $resultado;
							if($resultado && $resultado["resultado"] > 0)
							{
								if(isset($resultado['id_inspeccion']))
								{
									if(is_null($idInspeccion))
										$idInspeccion = (int)$resultado['id_inspeccion'];

									$orden_herramienta = 0;
									if (sizeof($respuestas_herramientas) > 0) {	
										foreach ($respuestas_herramientas as $herramienta) {
											$orden_herramienta++;
											$id_herramienta = $herramienta["id_herramienta"];
											$respuesta = $herramienta["respuesta"];
											$orden_sub_herramienta = $herramienta["orden"];
											$resultado_herramienta = $this->inspeccion_model->agregarHerramientaInspeccion($id_herramienta, $respuesta, $orden_sub_herramienta, $idInspeccion);
											#$data['herramienta'] = $resultado_herramienta;
											#var_dump($resultado_herramienta);
										}
									}

									$resultado = 1;
									$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
									break;
								}else{
									$resultado = -1;
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}
							}else{

								if($resultado["resultado"] === -1)
								{
									if (!isset($resultado["mensaje"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
									}else{
										if (isset($resultado["mensaje"]["message"])) {
											$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
										}
									}
								}elseif ($resultado["resultado"] === 0) {
									$i=$i;
									if (isset($data["reintentos"])) {
										$data["reintentos"] = ((int)$data["reintentos"] +1);
									}else{
										$data["reintentos"] = 1;
									}
									
								}
							}
						}

					}

					/*if(!is_null($this->input->POST('id_elemento')) && trim($this->input->POST('id_elemento')) != "" && strlen(trim($this->input->POST('id_elemento'))) > 0 &&  trim($this->input->POST('id_elemento')) === "idNorma") {
						$idNorma = trim($this->input->POST('valor_elemento'));

						$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, null, null, null, $usuario["id_usuario"], $es_temporal);

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion))
									$idInspeccion = (int)$resultado['id_inspeccion'];

								$resultado_checklist = $this->inspeccion_model->agregarInspeccionChecklist($idNorma, 1, $idInspeccion);

								if($resultado_checklist && $resultado_checklist["resultado"] > 0)
								{
									$resultado = 1;
									$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];

								}
							}
						}

					}*/
					
					$totalCategorias = null;
					$id_pregunta = null;
					$id_categoria = null;
					if(!is_null($this->input->POST('total_categorias')) && trim($this->input->POST('total_categorias')) != "" && strpos($id_elemento, 'rbPregunta') !== false){
						
						$totalCategorias = trim($this->input->POST('total_categorias'));



						if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && trim($this->input->POST('id_categoria')) != "-1")
							$id_categoria = trim($this->input->POST('id_categoria'));

						if(!is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && trim($this->input->POST('id_pregunta')) != "-1")
							$id_pregunta = trim($this->input->POST('id_pregunta'));

						$respuestas_checklists = array();
						if (isset($totalCategorias) && is_numeric($totalCategorias) && (int)$totalCategorias > 0) {

							#for ($i=0; $i < $totalCategorias; $i++) {

								$respuesta = null;

								$posicion_preguntas = explode("_", $id_elemento);
								$posicion_pregunta = substr($posicion_preguntas[0], 10, strlen($posicion_preguntas[0]) - 9);

								if (isset($posicion_pregunta) && is_numeric($posicion_pregunta) && (int)$posicion_pregunta > 0 /*&& (int)$posicion_pregunta === ($i+1)*/) {
									$respuesta = $valor_elemento;

									if (isset($respuesta) && strlen($respuesta) > 0 && strpos($respuesta, '-') > 0) {

										$respuesta_cat_pre = explode("-", $respuesta);
										$id_cat_pre = explode("_", $respuesta_cat_pre[1]);
										$id_categoria_respuesta = $id_cat_pre[0];
										$id_pregunta_respuesta = $id_cat_pre[1];
										$orden_sub_pregunta = (int)$posicion_pregunta;
										$respuesta_pregunta_rb = ($respuesta_cat_pre[0] == "si" ? 1 : ($respuesta_cat_pre[0] == "no" ? 2 : 3));

										$respuestas_checklists[] = array('id_categoria' => $id_categoria_respuesta, 'id_pregunta' => $id_pregunta_respuesta, 'respuesta' => $respuesta_pregunta_rb, 'orden' => $orden_sub_pregunta);

										/*$respuesta_pregunta = explode("-", $respuesta);
										$id_pregunta_respuesta = $respuesta_pregunta[1];#6_1
										$respuesta_pregunta_rb = ($respuesta_pregunta[0] == "si" ? true : false);#na/si/no
										$orden_sub_pregunta = (int)$posicion_pregunta;*/
										#$respuestas_preguntas_respuestas[] = array('id_herramienta' => $id_herramienta, 'respuesta' => $respuesta_herramienta_rb, 'orden' => $orden_sub_herramienta);

									}
								}
							#}
						}

						#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						if ($es_reinspeccion) {
							#var_dump("entro aca 4");
							#exit();
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							#var_dump($resultado);
							#exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}
						#var_dump($resultado);
						#$data["resultado_insert_inspec"] = $resultado;

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion) || $es_reinspeccion)
									$idInspeccion = (int)$resultado['id_inspeccion'];



							if (sizeof($respuestas_checklists) > 0) {
									foreach ($respuestas_checklists as $res_check) {
										$id_categoria = $res_check["id_categoria"];
										$id_pregunta = $res_check["id_pregunta"];
										$respuesta_check = $res_check["respuesta"];
										#$observacion = $res_check["observacion"];
										$observacion = null;
										$orden = $res_check["orden"];
										#$id_respuesta = $res_check["id_respuesta"];
										$id_respuesta = null;
										/*var_dump($id_categoria);
										var_dump($id_pregunta);
										var_dump($respuesta_check);
										var_dump($observacion);
										var_dump($orden);*/

										$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheckTemporal($id_categoria, $id_pregunta, $respuesta_check, $observacion, $orden, $id_respuesta, $idInspeccion, $usuario["id_usuario"]);

										if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
											$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
											#$respuestas_checklists_data[] = array("id_inspeccion_checklist" => $id_inspeccion_checklist, "id_inspeccion_checklist_resp" => $id_inspeccion_checklist_resp, "id_categoria" => $id_categoria, "id_pregunta" => $id_pregunta, "respuesta_check" => $respuesta_check, "observacion" => $observacion);
											$cant_respuestas_agregadas++;
										}
									}
								}

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{

							if($resultado["resultado"] === -1)
							{
								if (!isset($resultado["mensaje"])) {
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}else{
									if (isset($resultado["mensaje"]["message"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
									}
								}
							}elseif ($resultado["resultado"] === 0) {
								$i=$i;
								if (isset($data["reintentos"])) {
									$data["reintentos"] = ((int)$data["reintentos"] +1);
								}else{
									$data["reintentos"] = 1;
								}
							}
						}
					}







					$totalCategorias = null;
					$id_pregunta = null;
					$id_categoria = null;
					if(!is_null($this->input->POST('total_categorias')) && trim($this->input->POST('total_categorias')) != "" && strpos($id_elemento, 'sRespuesta') !== false){
						$totalCategorias = trim($this->input->POST('total_categorias'));

						if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && trim($this->input->POST('id_categoria')) != "-1")
							$id_categoria = trim($this->input->POST('id_categoria'));

						if(!is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && trim($this->input->POST('id_pregunta')) != "-1")
							$id_pregunta = trim($this->input->POST('id_pregunta'));

						$respuestas_checklists = array();
						if (isset($totalCategorias) && is_numeric($totalCategorias) && (int)$totalCategorias > 0) {

							$respuesta = null;
							$posicion_pregunta = substr($id_elemento, 10, strlen($id_elemento) - 9);
							if (isset($posicion_pregunta) && is_numeric($posicion_pregunta) && (int)$posicion_pregunta > 0 /*&& (int)$posicion_pregunta === ($i+1)*/) {
								$respuesta = $valor_elemento;

								#if (isset($respuesta) && strlen($respuesta) > 0 && is_numeric($respuesta)) {

									$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'id_respuesta' => $respuesta, 'orden' => $posicion_pregunta);
								#}
							}
						}

						#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						if ($es_reinspeccion) {
							var_dump("entro aca 5");
							exit();
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							var_dump($resultado);
							exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}
						#var_dump($respuestas_checklists);
						#var_dump($valor_elemento);
						#var_dump($totalCategorias);
						#var_dump($resultado);exit();

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion))
									$idInspeccion = (int)$resultado['id_inspeccion'];



							if (sizeof($respuestas_checklists) > 0) {
									foreach ($respuestas_checklists as $res_check) {
										$id_categoria = $res_check["id_categoria"];
										$id_pregunta = $res_check["id_pregunta"];
										#$respuesta_check = $res_check["respuesta"];
										#$observacion = $res_check["observacion"];
										$observacion = null;
										$orden = $res_check["orden"];
										#$id_respuesta = $res_check["id_respuesta"];
										$id_respuesta = $res_check["id_respuesta"];
										/*var_dump($id_categoria);
										var_dump($id_pregunta);
										var_dump($respuesta_check);
										var_dump($observacion);
										var_dump($orden);*/

										$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheckTemporal($id_categoria, $id_pregunta, null, $observacion, $orden, $id_respuesta, $idInspeccion, $usuario["id_usuario"], true);

										if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
											$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
											#$respuestas_checklists_data[] = array("id_inspeccion_checklist" => $id_inspeccion_checklist, "id_inspeccion_checklist_resp" => $id_inspeccion_checklist_resp, "id_categoria" => $id_categoria, "id_pregunta" => $id_pregunta, "respuesta_check" => $respuesta_check, "observacion" => $observacion);
											$cant_respuestas_agregadas++;
										}
									}
								}

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{

							if($resultado["resultado"] === -1)
							{
								if (!isset($resultado["mensaje"])) {
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}else{
									if (isset($resultado["mensaje"]["message"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
									}
								}
							}elseif ($resultado["resultado"] === 0) {
								$i=$i;
								if (isset($data["reintentos"])) {
									$data["reintentos"] = ((int)$data["reintentos"] +1);
								}else{
									$data["reintentos"] = 1;
								}
							}
						}
					}








					$totalCategorias = null;
					$id_pregunta = null;
					$id_categoria = null;
					if(!is_null($this->input->POST('total_categorias')) && trim($this->input->POST('total_categorias')) != "" && strpos($id_elemento, 'sAscensor') !== false){
						$totalCategorias = trim($this->input->POST('total_categorias'));
						
						if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && trim($this->input->POST('id_categoria')) != "-1")
							$id_categoria = trim($this->input->POST('id_categoria'));

						if(!is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && trim($this->input->POST('id_pregunta')) != "-1")
							$id_pregunta = trim($this->input->POST('id_pregunta'));

						$respuestas_checklists = array();
						if (isset($totalCategorias) && is_numeric($totalCategorias) && (int)$totalCategorias > 0) {

							$respuesta = null;
							$posicion_pregunta = substr($id_elemento, 9, strlen($id_elemento) - 8);

							if (isset($posicion_pregunta) && is_numeric($posicion_pregunta) && (int)$posicion_pregunta > 0 /*&& (int)$posicion_pregunta === ($i+1)*/) {
								$respuesta = $valor_elemento;

								#if (isset($respuesta) && strlen($respuesta) > 0 && is_numeric($respuesta)) {

									$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'cant_ascensor' => $respuesta, 'orden' => $posicion_pregunta);
								#}
							}
						}

						#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						if ($es_reinspeccion) {
							#var_dump("entro aca en sAscensor");
							#exit();
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							#var_dump($resultado);
							#exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}
						#var_dump($respuestas_checklists);
						#var_dump($valor_elemento);
						#var_dump($totalCategorias);
						#var_dump($resultado);exit();

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion) && !$es_reinspeccion){
									$idInspeccion = (int)$resultado['id_inspeccion'];
								}else{
									if ($es_reinspeccion && is_numeric($id_reinspeccion)) {
										$idInspeccion = $id_reinspeccion;
									}
								}



							if (sizeof($respuestas_checklists) > 0) {
									foreach ($respuestas_checklists as $res_check) {
										$id_categoria = $res_check["id_categoria"];
										$id_pregunta = $res_check["id_pregunta"];
										
										$observacion = null;
										$orden = $res_check["orden"];

										$cant_ascensor = $res_check["cant_ascensor"];
										
										$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheckTemporal($id_categoria, $id_pregunta, null, $observacion, $orden, $cant_ascensor, $idInspeccion, $usuario["id_usuario"], false, false, false, true);

										if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
											$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
											$cant_respuestas_agregadas++;
										}
									}
								}

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{

							if($resultado["resultado"] === -1)
							{
								if (!isset($resultado["mensaje"])) {
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}else{
									if (isset($resultado["mensaje"]["message"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
									}
								}
							}elseif ($resultado["resultado"] === 0) {
								$i=$i;
								if (isset($data["reintentos"])) {
									$data["reintentos"] = ((int)$data["reintentos"] +1);
								}else{
									$data["reintentos"] = 1;
								}
							}
						}
					}


					$totalCategorias = null;
					$id_pregunta = null;
					$id_categoria = null;
					$es_observacion = false;

					if(!is_null($this->input->POST('total_categorias')) && trim($this->input->POST('total_categorias')) != "" && strpos($id_elemento, 'picture_') !== false){

						$totalCategorias = trim($this->input->POST('total_categorias'));

						if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && trim($this->input->POST('id_categoria')) != "-1")
							$id_categoria = trim($this->input->POST('id_categoria'));

						if(!is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && trim($this->input->POST('id_pregunta')) != "-1")
							$id_pregunta = trim($this->input->POST('id_pregunta'));

						//var_dump($this->input->POST());

						$respuestas_checklists = array();
						if (isset($totalCategorias) && is_numeric($totalCategorias) && (int)$totalCategorias > 0) {
							$respuesta = null;
							$posicion_pregunta = null;
							#$posicion_pregunta = substr($id_elemento, 10, strlen($id_elemento) - 9);
							$datos_imagen = explode("_", $id_elemento);

							if (sizeof($datos_imagen) == 3){
								$es_observacion = true;
							}elseif (sizeof($datos_imagen) > 3) {
								$posicion_pregunta = $datos_imagen[3];
							}
							

							if (isset($posicion_pregunta) && is_numeric($posicion_pregunta) && (int)$posicion_pregunta > 0 || $es_observacion /*&& (int)$posicion_pregunta === ($i+1)*/) {
								$respuesta = $valor_elemento;

								if (isset($respuesta) && strlen($respuesta) > 0) {

									$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'id_respuesta' => $respuesta, 'orden' => $posicion_pregunta);


									$cant_archivos = 0;
									#var_dump($_FILES);
									#var_dump($this->input->POST());
									#var_dump($_FILES);
									if (sizeof($_FILES) > 0) {

										//var_dump("entro aca");
										foreach ($_FILES as $nombre_archivo_input => $archivo) {

											if (isset($_FILES[$nombre_archivo_input])) {
												//$archivo = $_FILES[$nombre_archivo_input];
												#var_dump($archivo);
												#var_dump($archivo["name"]);
												$datos_archivo = explode("_", $archivo["name"]);
												$orden_archivo = null;
												#var_dump($nombre_archivo_input);
												#var_dump($archivo);
												
												if (sizeof($datos_archivo) == 3) {
													//var_dump("entro aca");
													#$id_archivo_obs = $datos_archivo[1];;
													$orden_archivo = $datos_archivo[2];

													#if (strpos($datos_archivo[1], '-')) {
														#var_dump($datos_archivo);
													#	$archivo_info = explode("-", $datos_archivo[1]);
												#		$id_archivo_obs = $archivo_info[1];
												#		$id_categoria = $archivo_info[0];
												#	}else{
												#		$id_categoria = $datos_archivo[1];
												#	}

													$observacion = null;

													#$this->input->POST();
													#var_dump("entro aca;");
													
													if(!is_null($this->input->POST('observacion')) && trim($this->input->POST('observacion')) != "")
														$observacion = trim($this->input->POST('observacion'));

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
													$id_inspeccion_checklist_obs = null;

													$inspecciones_checklist_obs = $this->inspeccion_model->obtenerNombreArchivoObs($idInspeccion, $id_categoria, $usuario["id_usuario"]);

													if (isset($inspecciones_checklist_obs) && sizeof($inspecciones_checklist_obs) > 0) {
														#$id_inspeccion_checklist_resp = $inspecciones_checklist_obs[0]["id"];
														$id_inspeccion_checklist = $inspecciones_checklist_obs[0]["id"];

														$resultado_obs_check = $this->inspeccion_model->agregarObservacionCheck($id_categoria, $observacion, $orden_archivo, $id_inspeccion_checklist, $usuario["id_usuario"]);

														if ($resultado_obs_check && isset($resultado_obs_check["resultado"]) && is_numeric($resultado_obs_check["resultado"]) && (int)$resultado_obs_check["resultado"] > 0)
															$id_inspeccion_checklist_obs = (int)$resultado_obs_check["id_inspeccion_checklist_obs"];
														
														$nuevoNombre = $id_inspeccion_checklist.'_'.$id_inspeccion_checklist_obs.'_'.$id_categoria.'_'.$orden_archivo.'.png';
														
														$config['upload_path'] = './assets/files/image';
														$config['allowed_types'] = '*';
														$config['remove_spaces'] = TRUE;
														$config['max_size'] = '0';
														$config['file_name'] = $nuevoNombre;

														$this->load->library('upload', $config);
														$this->upload->initialize($config);

														$archivo_cargado = $this->upload->do_upload($nombre_original);
														
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

															$respuesta_archivo = $this->inspeccion_model->agregarArchivo($file_name, $file_type, $file_path, $full_path, $raw_name, $orig_name, $client_name, $file_ext, $file_size, $is_image, $image_width, $image_height, $image_type, $image_size_str, null, $id_categoria, null, $orden_archivo, $usuario["id_usuario"], $id_inspeccion_checklist_obs);
															if ($respuesta_archivo && isset($respuesta_archivo["resultado"]) && is_numeric($respuesta_archivo["resultado"]) && (int)$respuesta_archivo["resultado"] > 0) {
																$cant_archivos++;
															}
														}else
														{
															$error = $this->upload->display_errors();
														}
													}
												}else{
													$datos_archivo = explode("_", $archivo["name"]);

													if ($archivo["name"] == "") {

														#var_dump($nombre_archivo_input);

														$datos_archivo = explode("_", $nombre_archivo_input);

														if (sizeof($datos_archivo) == 5) {
															$archivo_id_input = $datos_archivo[1];
															$id_categoria = $datos_archivo[2];
															$id_pregunta = $datos_archivo[3];
															$orden_archivo = $datos_archivo[4];


															$array_filtrado_checklist = array_filter($respuestas_checklists_data, function($val) use($id_categoria, $id_pregunta){
													              return ($val['id_categoria']==$id_categoria and $val['id_pregunta']==$id_pregunta);
													         });

															if ($array_filtrado_checklist && isset($array_filtrado_checklist) && sizeof($array_filtrado_checklist) == 1) {
																foreach ($array_filtrado_checklist as $key => $value) {
																	$id_inspeccion_checklist_resp = $array_filtrado_checklist[$key]["id_inspeccion_checklist_resp"];	
																}
															}

													        /*var_dump($array_filtrado_checklist);

															var_dump($archivo_id_input);
															var_dump($id_categoria);
															var_dump($id_pregunta);
															var_dump($orden_archivo);
															#var_dump($id_inspeccion_checklist_resp);
															var_dump($id_inspeccion_checklist_bk);*/
															$respuesta_archivo_existente = $this->inspeccion_model->agregarArchivoExistente($idInspeccion, $id_inspeccion_checklist_bk, $archivo_id_input, $id_categoria, $id_pregunta, $orden_archivo, $usuario["id_usuario"] , $id_inspeccion_checklist_resp);
															#var_dump($respuesta_archivo_existente);
			#												exit();

															if (isset($respuesta_archivo_existente) && !is_null($respuesta_archivo_existente) && sizeof($respuesta_archivo_existente) > 0) {
																$cant_archivos++;
															}

														}elseif (sizeof($datos_archivo) == 3 && strpos($datos_archivo[1], '-')) {
															
															
															$info_obs = explode("-", $datos_archivo[1]);
															$id_archivo_obs = $info_obs[1];
															$id_categoria = $info_obs[0];
															$orden = $datos_archivo[2];

															#var_dump($id_archivo_obs);
															#var_dump($id_categoria);
															#var_dump($orden);
															#var_dump($nombre_archivo_input);
															#var_dump($id_inspeccion_checklist);


															$resultado_obs_check = $this->inspeccion_model->agregarObservacionCheck($id_categoria, $observacion, $orden, $id_inspeccion_checklist, $usuario["id_usuario"], $id_archivo_obs);
															if ($resultado_obs_check && isset($resultado_obs_check["resultado"]) && is_numeric($resultado_obs_check["resultado"]) && (int)$resultado_obs_check["resultado"] > 0) {
																$cant_archivos++;
															}
															/*$array_filtrado_checklist = array_filter($respuestas_checklists_data, function($val) use($id_categoria, $id_pregunta){
													              return ($val['id_categoria']==$id_categoria and $val['id_pregunta']==$id_pregunta);
													         });

															if ($array_filtrado_checklist && isset($array_filtrado_checklist) && sizeof($array_filtrado_checklist) == 1) {
																foreach ($array_filtrado_checklist as $key => $value) {
																	$id_inspeccion_checklist_resp = $array_filtrado_checklist[$key]["id_inspeccion_checklist_resp"];	
																}
															}*/

															#$respuesta_archivo_existente = $this->inspeccion_model->agregarArchivoExistente($idInspeccion, $id_inspeccion_checklist_bk, $archivo_id_input, $id_categoria, $id_pregunta, $orden_archivo, $usuario["id_usuario"] , $id_inspeccion_checklist_resp);
														}

														
														
														
														#$respuesta_archivo_existente = $this->inspeccion_model->agregarArchivoExistente($id_inspeccion_checklist_resp, $id_categoria, $id_pregunta, $orden_archivo, $usuario["id_usuario"]);

														#if ($respuesta_archivo_existente && isset($respuesta_archivo_existente["resultado"]) && is_numeric($respuesta_archivo_existente["resultado"]) && (int)$respuesta_archivo_existente["resultado"] > 0) {
															#$cant_archivos++;
														#}

														
													}else{

														#var_dump($datos_archivo);
														$id_categoria = $datos_archivo[1];
														$id_pregunta = $datos_archivo[2];
														$orden_archivo = $datos_archivo[3];

														/*$array_filtrado = array_filter($respuestas_checklists_data, function($val) use($id_categoria, $id_pregunta){
												              return ($val['id_categoria']==$id_categoria and $val['id_pregunta']==$id_pregunta);
												         });*/

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
														#var_dump($archivo);
														$id_inspeccion_checklist_resp = null;

														/*if ($array_filtrado && isset($array_filtrado) && sizeof($array_filtrado) == 1) {
															foreach ($array_filtrado as $key => $value) {
																$id_inspeccion_checklist_resp = $array_filtrado[$key]["id_inspeccion_checklist_resp"];	
															}
														}*/
														#var_dump($idInspeccion);
														#var_dump($id_categoria);
														#var_dump($id_pregunta);
														$inspecciones_checklist_resp = $this->inspeccion_model->obtenerNombreArchivo($idInspeccion, $id_categoria, $id_pregunta, $usuario["id_usuario"]);

														if (isset($inspecciones_checklist_resp) && sizeof($inspecciones_checklist_resp) > 0) {
															$id_inspeccion_checklist_resp = $inspecciones_checklist_resp[0]["id"];
															$id_inspeccion_checklist = $inspecciones_checklist_resp[0]["id_inspecciones_checklists"];

															$nuevoNombre = $id_inspeccion_checklist.'_'.$id_inspeccion_checklist_resp.'_'.$id_categoria.'_'.$id_pregunta.'_'.$orden_archivo.'.png';
															
															$config['upload_path'] = './assets/files/image';
															$config['allowed_types'] = '*';
															$config['remove_spaces'] = TRUE;
															$config['max_size'] = '0';
															$config['file_name'] = $nuevoNombre;

															$this->load->library('upload', $config);
															$this->upload->initialize($config);

															#var_dump($nombre_original);
															#var_dump($config);
															$archivo_cargado = $this->upload->do_upload($archivo['name']);
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

																#var_dump($respuesta_archivo);
																if ($respuesta_archivo && isset($respuesta_archivo["resultado"]) && is_numeric($respuesta_archivo["resultado"]) && (int)$respuesta_archivo["resultado"] > 0) {
																	$cant_archivos++;
																}
															}else
															{
																$error = $this->upload->display_errors();
																#var_dump($error);
															}
														}
														
													}
													
												}
												
											}

										}



									}







								}
							}
						}

						#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						if ($es_reinspeccion) {
							var_dump("entro aca 6");
							exit();
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							var_dump($resultado);
							exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion))
									$idInspeccion = (int)$resultado['id_inspeccion'];



							if (sizeof($respuestas_checklists) > 0) {
									foreach ($respuestas_checklists as $res_check) {
										$id_categoria = $res_check["id_categoria"];
										$id_pregunta = $res_check["id_pregunta"];
										#$respuesta_check = $res_check["respuesta"];
										#$observacion = $res_check["observacion"];
										$observacion = null;
										$orden = $res_check["orden"];
										#$id_respuesta = $res_check["id_respuesta"];
										$id_respuesta = $res_check["id_respuesta"];
										/*var_dump($id_categoria);
										var_dump($id_pregunta);
										var_dump($respuesta_check);
										var_dump($observacion);
										var_dump($orden);*/

										$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheckTemporal($id_categoria, $id_pregunta, null, $observacion, $orden, $id_respuesta, $idInspeccion, $usuario["id_usuario"], true);

										if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
											$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
											#$respuestas_checklists_data[] = array("id_inspeccion_checklist" => $id_inspeccion_checklist, "id_inspeccion_checklist_resp" => $id_inspeccion_checklist_resp, "id_categoria" => $id_categoria, "id_pregunta" => $id_pregunta, "respuesta_check" => $respuesta_check, "observacion" => $observacion);
											$cant_respuestas_agregadas++;
										}
									}
								}

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{

							if($resultado["resultado"] === -1)
							{
								if (!isset($resultado["mensaje"])) {
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}else{
									if (isset($resultado["mensaje"]["message"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
									}
								}
							}elseif ($resultado["resultado"] === 0) {
								$i=$i;
								if (isset($data["reintentos"])) {
									$data["reintentos"] = ((int)$data["reintentos"] +1);
								}else{
									$data["reintentos"] = 1;
								}
							}
						}
					}





					$totalCategorias = null;
					$id_pregunta = null;
					$id_categoria = null;
					if(!is_null($this->input->POST('total_categorias')) && trim($this->input->POST('total_categorias')) != "" && strpos($id_elemento, 'inputObservaciones') !== false){
						
						$totalCategorias = trim($this->input->POST('total_categorias'));

						if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && trim($this->input->POST('id_categoria')) != "-1")
							$id_categoria = trim($this->input->POST('id_categoria'));

						if(!is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && trim($this->input->POST('id_pregunta')) != "-1")
							$id_pregunta = trim($this->input->POST('id_pregunta'));

						$respuestas_checklists = array();
						if (isset($totalCategorias) && is_numeric($totalCategorias) && (int)$totalCategorias > 0) {

							$respuesta = null;
							$posicion_pregunta = substr($id_elemento, 18, strlen($id_elemento) - 17);

							if (isset($posicion_pregunta) && is_numeric($posicion_pregunta) && (int)$posicion_pregunta > 0 /*&& (int)$posicion_pregunta === ($i+1)*/) {
								$respuesta = $valor_elemento;

								if (isset($respuesta) && strlen($respuesta) > 0 && trim($respuesta) != "") {

									$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'observacion' => $respuesta, 'orden' => $posicion_pregunta);
								}
							}
						}

						#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						if ($es_reinspeccion) {
							var_dump("entro aca 7");
							exit();
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							var_dump($resultado);
							exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion))
									$idInspeccion = (int)$resultado['id_inspeccion'];



							if (sizeof($respuestas_checklists) > 0) {
									foreach ($respuestas_checklists as $res_check) {
										$id_categoria = $res_check["id_categoria"];
										$id_pregunta = $res_check["id_pregunta"];
										#$respuesta_check = $res_check["respuesta"];
										$observacion = $res_check["observacion"];
										#$observacion = null;
										$orden = $res_check["orden"];
										#$id_respuesta = $res_check["id_respuesta"];
										$id_respuesta = null;
										/*var_dump($id_categoria);
										var_dump($id_pregunta);
										var_dump($respuesta_check);
										var_dump($observacion);
										var_dump($orden);*/

										$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheckTemporal($id_categoria, $id_pregunta, null, $observacion, $orden, $id_respuesta, $idInspeccion, $usuario["id_usuario"], false, true);

										if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
											$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
											#$respuestas_checklists_data[] = array("id_inspeccion_checklist" => $id_inspeccion_checklist, "id_inspeccion_checklist_resp" => $id_inspeccion_checklist_resp, "id_categoria" => $id_categoria, "id_pregunta" => $id_pregunta, "respuesta_check" => $respuesta_check, "observacion" => $observacion);

											if (isset($resultado_resp_check["id_respuesta"])) {
												$data['id_respuesta'] = $resultado_resp_check["id_respuesta"];
												$data['respuesta'] = $observacion;
												$data['id_categoria'] = $id_categoria;
												$data['id_pregunta'] = $id_pregunta;
												$data['orden'] = $orden;
											}
											$cant_respuestas_agregadas++;
										}
									}
								}

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{

							if($resultado["resultado"] === -1)
							{
								if (!isset($resultado["mensaje"])) {
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}else{
									if (isset($resultado["mensaje"]["message"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
									}
								}
							}elseif ($resultado["resultado"] === 0) {
								$i=$i;
								if (isset($data["reintentos"])) {
									$data["reintentos"] = ((int)$data["reintentos"] +1);
								}else{
									$data["reintentos"] = 1;
								}
							}
						}
					}






















					$totalCategorias = null;
					$id_pregunta = null;
					$id_categoria = null;
					if(!is_null($this->input->POST('total_categorias')) && trim($this->input->POST('total_categorias')) != "" && strpos($id_elemento, 'sTipoRespuesta') !== false){
						
						$totalCategorias = trim($this->input->POST('total_categorias'));

						if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && trim($this->input->POST('id_categoria')) != "-1")
							$id_categoria = trim($this->input->POST('id_categoria'));

						if(!is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && trim($this->input->POST('id_pregunta')) != "-1")
							$id_pregunta = trim($this->input->POST('id_pregunta'));

						$respuestas_checklists = array();
						if (isset($totalCategorias) && is_numeric($totalCategorias) && (int)$totalCategorias > 0) {

							$respuesta = null;
							$posicion_pregunta = substr($id_elemento, 15, strlen($id_elemento) - 14);

							if (isset($posicion_pregunta) && is_numeric($posicion_pregunta) && (int)$posicion_pregunta > 0) {
								$respuesta = $valor_elemento;

								if (isset($respuesta) && strlen($respuesta) > 0 && is_numeric($respuesta)) {

									$respuestas_checklists[] = array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'id_tipo_respuesta' => $respuesta, 'orden' => $posicion_pregunta);
								}
							}
						}

						#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						if ($es_reinspeccion) {
							#var_dump("entro aca XD");
							#exit();
							#var_dump($id_reinspeccion);
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							#var_dump($resultado);
							#exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{


								#if ($es_reinspeccion) {
								#	$idInspeccion = (int)$resultado['id_inspeccion'];
								#}

								if(is_null($idInspeccion) || $es_reinspeccion)
									$idInspeccion = (int)$resultado['id_inspeccion'];



							if (sizeof($respuestas_checklists) > 0) {
									foreach ($respuestas_checklists as $res_check) {
										$id_categoria = $res_check["id_categoria"];
										$id_pregunta = $res_check["id_pregunta"];
										$observacion = null;
										$id_respuesta = null;
										$orden = $res_check["orden"];
										$id_tipo_respuesta = $res_check["id_tipo_respuesta"];

										$resultado_resp_check = $this->inspeccion_model->agregarRespuestaCheckTemporal($id_categoria, $id_pregunta, null, $observacion, $orden, $id_tipo_respuesta, $idInspeccion, $usuario["id_usuario"], false, false, true);

										#var_dump($resultado_resp_check);
										if ($resultado_resp_check && isset($resultado_resp_check["resultado"]) && is_numeric($resultado_resp_check["resultado"]) && (int)$resultado_resp_check["resultado"] > 0) {
											$id_inspeccion_checklist_resp = (int)$resultado_resp_check["id_inspeccion_checklist_resp"];
											#$respuestas_checklists_data[] = array("id_inspeccion_checklist" => $id_inspeccion_checklist, "id_inspeccion_checklist_resp" => $id_inspeccion_checklist_resp, "id_categoria" => $id_categoria, "id_pregunta" => $id_pregunta, "respuesta_check" => $respuesta_check, "observacion" => $observacion);
											$cant_respuestas_agregadas++;
										}
									}
								}

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{

							if($resultado["resultado"] === -1)
							{
								if (!isset($resultado["mensaje"])) {
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}else{
									if (isset($resultado["mensaje"]["message"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
									}
								}
							}elseif ($resultado["resultado"] === 0) {
								$i=$i;
								if (isset($data["reintentos"])) {
									$data["reintentos"] = ((int)$data["reintentos"] +1);
								}else{
									$data["reintentos"] = 1;
								}
							}
						}
					}





					$id_pregunta = null;
					$id_categoria = null;
					$orden_imagen = null;
					if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && !is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && !is_null($this->input->POST('orden_imagen')) && trim($this->input->POST('orden_imagen')) != "" && strpos($id_elemento, 'close_') !== false){
						
						if(!is_null($this->input->POST('id_categoria')) && trim($this->input->POST('id_categoria')) != "" && trim($this->input->POST('id_categoria')) != "-1")
							$id_categoria = trim($this->input->POST('id_categoria'));

						if(!is_null($this->input->POST('id_pregunta')) && trim($this->input->POST('id_pregunta')) != "" && trim($this->input->POST('id_pregunta')) != "-1")
							$id_pregunta = trim($this->input->POST('id_pregunta'));

						if(!is_null($this->input->POST('orden_imagen')) && trim($this->input->POST('orden_imagen')) != "" && trim($this->input->POST('orden_imagen')) != "-1")
							$orden_imagen = trim($this->input->POST('orden_imagen'));

						if ($es_reinspeccion) {
							#var_dump("entro aca XD");
							#exit();
							#var_dump($id_reinspeccion);
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							#var_dump($resultado);
							#exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, null, null, $usuario["id_usuario"], $es_temporal);
						}

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{


								#if ($es_reinspeccion) {
								#	$idInspeccion = (int)$resultado['id_inspeccion'];
								#}

								if(is_null($idInspeccion) || $es_reinspeccion)
									$idInspeccion = (int)$resultado['id_inspeccion'];

								#var_dump($idInspeccion);
								#var_dump($id_categoria);
								#var_dump($id_pregunta);
								#var_dump($orden_imagen);

								$resultado_archivo = $this->inspeccion_model->eliminarArchivoExistente($idInspeccion, null, $id_categoria, $id_pregunta, $orden_imagen, $usuario["id_usuario"]);

								#var_dump($resultado_archivo);
								#exit();

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{

							if($resultado["resultado"] === -1)
							{
								if (!isset($resultado["mensaje"])) {
									$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
								}else{
									if (isset($resultado["mensaje"]["message"])) {
										$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
									}
								}
							}elseif ($resultado["resultado"] === 0) {
								$i=$i;
								if (isset($data["reintentos"])) {
									$data["reintentos"] = ((int)$data["reintentos"] +1);
								}else{
									$data["reintentos"] = 1;
								}
							}
						}
					}





















					

					$respuesta = 0;
					$mensaje = '';


					$diccionario_elementos = array(array('nombre' => 'es_temporal', 'valor' => 'es_temporal'),
						array('nombre' => 'inputTecnico', 'valor' => 'nombre_tecnico'),
						array('nombre' => 'inputCantAscensor', 'valor' => 'cantidad_ascensor'),
						array('nombre' => 'inputNumInforme', 'valor' => 'num_informe'),
						array('nombre' => 'inputNombreE', 'valor' => 'nombre'),
						array('nombre' => 'inputDireccionE', 'valor' => 'domicilio'),
						array('nombre' => 'inputRutE', 'valor' => 'rut'),
						array('nombre' => 'inputIdE', 'valor' => 'rol'),
						array('nombre' => 'inputNombreA', 'valor' => 'nombre_admin'),
						array('nombre' => 'inputRutA', 'valor' => 'rut_admin'),
						array('nombre' => 'inputEmailA', 'valor' => 'email_admin'),
						array('nombre' => 'idEmpresaMantenedora', 'valor' => 'id_empresa_mantenedora'),
						array('nombre' => 'inputNombreRM', 'valor' => 'nombre_mant_2'),
						array('nombre' => 'inputFechaUM', 'valor' => 'fecha_ultima_mant'),
						array('nombre' => 'inputMarca', 'valor' => 'marca_ascensor'),
						array('nombre' => 'selectUso', 'valor' => 'id_uso'),
						array('nombre' => 'inputCapacidad', 'valor' => 'capacidad_personas'),
						array('nombre' => 'inputCapacidadKG', 'valor' => 'capacidad_kg'),
						array('nombre' => 'selectSuspension', 'valor' => 'id_suspension'),
						array('nombre' => 'selectSalaMaquina', 'valor' => 'sala_maquinas'),
						array('nombre' => 'inputVelocidad', 'valor' => 'velocidad'),
						array('nombre' => 'inputRecorrido', 'valor' => 'recorrido'),
						array('nombre' => 'inputParadas', 'valor' => 'paradas'),
						array('nombre' => 'selectTipoTraccion', 'valor' => 'id_tipo_traccion'),
						array('nombre' => 'inputCantidad', 'valor' => 'cantidad'),
						array('nombre' => 'inputDiamTraccion', 'valor' => 'diametro_traccion'),
						array('nombre' => 'inputEnclavamientoElectrico', 'valor' => 'enclavamiento_electrico'),
						array('nombre' => 'inputEnclavamientoMecanico', 'valor' => 'enclavamiento_mecanico'),
						array('nombre' => 'inputDiamCableLimitador', 'valor' => 'diametro_cable'),
						array('nombre' => 'idNorma', 'valor' => 'id_norma')
					);


					#var_dump($id_elemento);
					#var_dump($valor_elemento);
					$index_encontrado = array_search($id_elemento, array_column($diccionario_elementos, 'nombre'));
					#var_dump($index_encontrado);

					#var_dump($id_elemento);
					#var_dump($index_encontrado);
					#exit();

					if ($index_encontrado !== false && $index_encontrado >= 0) {
						$nombre_campo = $diccionario_elementos[$index_encontrado]["nombre"];
						$valor_campo = $diccionario_elementos[$index_encontrado]["valor"];



						#$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, $valor_elemento, $valor_campo, $usuario["id_usuario"], $es_temporal);
						if ($es_reinspeccion) {
							#var_dump("entro aca 8");
							#exit();
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($id_reinspeccion, $id_elemento, $valor_elemento, $valor_campo, $usuario["id_usuario"], $es_temporal, $es_reinspeccion);
							#var_dump($resultado);
							#exit();
						}else{
							$resultado = $this->inspeccion_model->agregarInspeccionTemporal($idInspeccion, $id_elemento, $valor_elemento, $valor_campo, $usuario["id_usuario"], $es_temporal);
						}

						if($resultado && $resultado["resultado"] > 0)
						{
							if(isset($resultado['id_inspeccion']))
							{
								if(is_null($idInspeccion) || $es_reinspeccion)
									$idInspeccion = (int)$resultado['id_inspeccion'];

								$resultado = 1;
								$mensaje = 'Se ha '.$accion.' la Inspeccion exitosamente. </br></br>ID: '.$idInspeccion.'</br></br>'.$resultado["mensaje"];
							}else{
								$resultado = -1;
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, '.$resultado["mensaje"];
							}
						}else{
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
						
					}else{
						if (is_null($resultado)) {
							$resultado = -1;
							$mensaje = 'Ha ocurrido un error al '.$accion.' la Inspeccion, no se reconoce el campo que desea actualizar.';
						}
					}

					#var_dump($diccionario_elementos);


					$data['resultado'] = $resultado;
					$data['mensaje'] = $mensaje;
					$data['id_inspeccion'] = $idInspeccion;
				}catch(Exception $e){
					$data['resultado'] = -1;
				    $data['mensaje'] = $e;
				    $data['id_inspeccion'] = -1;
				}
				echo json_encode($data);
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function modificarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			$usuario['titulo'] = 'Modificar Inspeccion';
			$usuario['controller'] = 'inspeccion';

			if($this->input->GET('idInspeccion') && $this->input->GET('idInspeccion'))
			{
				$id_inspeccion = $this->input->GET('idInspeccion');

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;

				$checklists =  $this->checklist_model->listarCheckLists($usuario["id_usuario"]);
				$usuario['checklists'] = $checklists;

				$visible = true;
				$normas =  $this->norma_model->listarNormas($visible, $usuario["id_usuario"]);
				$usuario['normas'] = $normas;

				$herramientas =  $this->herramienta_model->listarHerramientas($usuario["id_usuario"]);
				$usuario['herramientas'] = $herramientas;

				$carpetas =  $this->carpeta_model->listarCarpetas($usuario["id_usuario"]);
				$usuario['carpetas'] = $carpetas;

				$suspensiones =  $this->suspension_model->listarSuspensiones($usuario["id_usuario"]);
				$usuario['suspensiones'] = $suspensiones;

				$usos =  $this->uso_model->listarUsos($usuario["id_usuario"]);
				$usuario['usos'] = $usos;

				$inspeccion =  $this->inspeccion_model->obtenerInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				if (sizeof($inspeccion) > 0) {
					$usuario['inspeccion'] = $inspeccion[0];
					#var_dump($inspeccion[0]);
				}

				#if (isset($inspeccion) && sizeof($inspeccion) > 0 && isset($inspeccion[0]["reinspeccion"]) && $inspeccion[0]["reinspeccion"] == "1") {
					#var_dump($inspeccion[0]["reinspeccion"]);
					#ECHO "es una reinspeccion";
				#}else{
					#var_dump($inspeccion[0]["reinspeccion"]);
					#ECHO "es una INPSECCION";
				#}
				
				$respuesta_carpetas =  $this->inspeccion_model->obtenerCarpetas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_carpetas'] = $respuesta_carpetas;

				$respuesta_normas =  $this->inspeccion_model->obtenerNormas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_normas'] = $respuesta_normas;

				$respuesta_herramientas =  $this->inspeccion_model->obtenerHerramientas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_herramientas'] = $respuesta_herramientas;

				$respuesta_norma_respuesta =  $this->inspeccion_model->obtenerNormasRespuesta($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_norma_respuesta'] = $respuesta_norma_respuesta;

				$tipos_traccion =  $this->traccion_model->listarTipoTracciones($usuario["id_usuario"]);
				$usuario['tipos_traccion'] = $tipos_traccion;

				#$observaciones_generales =  $this->inspeccion_model->obtenerObservacionesInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				#$usuario['observaciones_generales'] = $observaciones_generales;

				#var_dump($observaciones_generales);
				

				
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarInspeccion', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}


	public function reInspeccion()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			$usuario['titulo'] = 'Re-Inspeccion';
			$usuario['controller'] = 'inspeccion';

			if($this->input->GET('idInspeccion') && $this->input->GET('idInspeccion'))
			{
				$id_inspeccion = $this->input->GET('idInspeccion');

				

				$categorias =  $this->categoria_model->listarCategorias($usuario["id_usuario"]);
				$usuario['categorias'] = $categorias;

				$preguntas =  $this->pregunta_model->listarPreguntas($usuario["id_usuario"]);
				$usuario['preguntas'] = $preguntas;

				$checklists =  $this->checklist_model->listarCheckLists($usuario["id_usuario"]);
				$usuario['checklists'] = $checklists;

				$visible = true;
				$normas =  $this->norma_model->listarNormas($visible, $usuario["id_usuario"]);
				$usuario['normas'] = $normas;

				$herramientas =  $this->herramienta_model->listarHerramientas($usuario["id_usuario"]);
				$usuario['herramientas'] = $herramientas;

				$carpetas =  $this->carpeta_model->listarCarpetas($usuario["id_usuario"]);
				$usuario['carpetas'] = $carpetas;

				$suspensiones =  $this->suspension_model->listarSuspensiones($usuario["id_usuario"]);
				$usuario['suspensiones'] = $suspensiones;

				$usos =  $this->uso_model->listarUsos($usuario["id_usuario"]);
				$usuario['usos'] = $usos;

				$inspeccion =  $this->inspeccion_model->obtenerInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				if (sizeof($inspeccion) > 0) {
					$usuario['inspeccion'] = $inspeccion[0];
					#var_dump($inspeccion[0]);
				}




				$cant_preguntas_respondidas = 0;
				$cant_preguntas = 0;

				$lista_cant_preguntas = $this->inspeccion_model->obtenerCantidadPreguntas($id_inspeccion, $usuario["id_usuario"]);
				$lista_cant_preguntas_respondidas = $this->inspeccion_model->obtenerCantidadPreguntasRespondidas($id_inspeccion, $usuario["id_usuario"]);

				#var_dump($cant_preguntas);
				#var_dump($cant_preguntas_respondidas);

				if (isset($lista_cant_preguntas_respondidas) && sizeof($lista_cant_preguntas_respondidas) > 0 && isset($lista_cant_preguntas_respondidas[0]["cant_respondidas"])) {
					$cant_preguntas_respondidas = $lista_cant_preguntas_respondidas[0]["cant_respondidas"];
				}

				if (isset($lista_cant_preguntas) && sizeof($lista_cant_preguntas) > 0 && isset($lista_cant_preguntas[0]["cant_preguntas"])) {
					$cant_preguntas = $lista_cant_preguntas[0]["cant_preguntas"];
				}

				if ($cant_preguntas_respondidas < $cant_preguntas) {
					$respuesta['id_reinspeccion'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = 'La Inspeccion #'.$id_inspeccion.' no se encuentra con el checklist respondido por completo, favor completar checklists para crear Re-Inspeccion.';
					
					#$this->session->mark_as_flash('respuesta');
					#$this->session->mark_as_flash(array('respuesta', $respuesta));
					#$this->session->set_flashdata('respuesta', $respuesta);
					$_SESSION['respuesta'] =  $respuesta;
					$this->session->mark_as_flash('respuesta');

					redirect('Inspeccion/listarInspecciones');
				}

				if (isset($inspeccion[0]["reinspeccion"]) && $inspeccion[0]["reinspeccion"] == 1 && $inspeccion[0]["id_estado"] != 2) {
					$respuesta['id_reinspeccion'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = 'La Re-Inspeccion #'.$id_inspeccion.' no se encuentra confirmada, favor confirmar Re-Inspeccion para crear otra Re-Inspeccion.';
					
					#$this->session->mark_as_flash('respuesta');
					#$this->session->mark_as_flash(array('respuesta', $respuesta));
					#$this->session->set_flashdata('respuesta', $respuesta);
					$_SESSION['respuesta'] =  $respuesta;
					$this->session->mark_as_flash('respuesta');

					redirect('Inspeccion/listarInspecciones');
				}




				$respuesta_carpetas =  $this->inspeccion_model->obtenerCarpetas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_carpetas'] = $respuesta_carpetas;

				$respuesta_normas =  $this->inspeccion_model->obtenerNormas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_normas'] = $respuesta_normas;

				$respuesta_herramientas =  $this->inspeccion_model->obtenerHerramientas($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_herramientas'] = $respuesta_herramientas;

				$respuesta_norma_respuesta =  $this->inspeccion_model->obtenerNormasRespuesta($id_inspeccion ,$usuario["id_usuario"]);
				$usuario['respuesta_norma_respuesta'] = $respuesta_norma_respuesta;

				$tipos_traccion =  $this->traccion_model->listarTipoTracciones($usuario["id_usuario"]);
				$usuario['tipos_traccion'] = $tipos_traccion;

				#$observaciones_generales =  $this->inspeccion_model->obtenerObservacionesInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				#$usuario['observaciones_generales'] = $observaciones_generales;

				#var_dump($observaciones_generales);
				$respuesta_reinspeccion =  $this->inspeccion_model->obtenerReInspeccion($id_inspeccion ,$usuario["id_usuario"]);
				#var_dump($respuesta_reinspeccion);#exit();

				#var_dump(isset($respuesta_reinspeccion["resultado"]));
				#var_dump(!isset($respuesta_reinspeccion["resultado"]));
					
				if (sizeof($respuesta_reinspeccion) > 0 && !array_key_exists('resultado', $respuesta_reinspeccion)) {
					#var_dump($respuesta_reinspeccion[0]);
					$usuario['reinspeccion'] = $respuesta_reinspeccion[0];
					#var_dump("entro aca");
					#var_dump($respuesta_reinspeccion[0]);
				}
				

				

				
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('reInspeccion', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
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
				#var_dump($inspeccion);

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

				$temporal = 0;
				$datos[] = array();
     			unset($datos[0]);

     			$table_inspecciones = '';

				if(!is_null($this->input->post('temporal')) && $this->input->post('temporal') != "-1"  && $this->input->post('temporal') != "")
					$temporal = $this->input->post('temporal');

				#var_dump($temporal);

				$inspecciones =  $this->inspeccion_model->listarInspecciones($usuario["id_usuario"], $temporal);

				#if (isset($inspecciones) && sizeof($inspecciones) > 0) {
					$table_inspecciones ='
					<table id="tListaInspecciones" class="table table-sm table-hover table-bordered">
						<thead class="thead-dark">
							<tr>
								<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Edificio</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Direcci&oacute;n</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">cant. Ascensores</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Num. Informe</th>


								<th scope="col" class="texto-pequenio text-center align-middle registro">Tecnico</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Rut Admin</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre Admin</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Email Admin</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Nombre Mant.</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Marca Ascensor</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Capacidad</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Tipo</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
								<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
								<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
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
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['edificio'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['domicilio'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['cantidad'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['num_informe'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['nombre_tecnico'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['rut_admin'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['nombre_admin'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['email_admin'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['nombre_mant_2'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['marca_ascensor'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['capacidad_personas'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($inspeccion["reinspeccion"] == "1" ? "Re-Inspeccion" : "Base").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($inspeccion["id_estado"] == "1" ? "Activo" : ($inspeccion["id_estado"] == "2" ? "Re-Inspeccion Confirmada" : "Eliminado")).'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$inspeccion['created_at'].'</p></td>
						        <td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$inspeccion['id'].'" class="view_convenio" href="reInspeccion/?idInspeccion='.$inspeccion['id'].'">
						        		<i data-feather="check-square" data-toggle="tooltip" data-placement="top" title="Re-Inspeccion"></i>
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$inspeccion['id'].'" class="view_convenio" href="revisarInspeccion/?idInspeccion='.$inspeccion['id'].'">
						        		<i data-feather="file-text" data-toggle="tooltip" data-placement="top" title="Visualizar Reporte"></i>
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$inspeccion['id'].'" class="view_convenio" href="modificarInspeccion/?idInspeccion='.$inspeccion['id'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';
					        		if ($inspeccion["id_estado"] == "1" || $inspeccion["id_estado"] == "2") {
						        					$table_inspecciones .= '<a id="trash_'.$inspeccion['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarInspeccion" data-id="'.$inspeccion['id'].'" data-inspeccion="'.$inspeccion['edificio'].'">
										        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>       		
									        		</a>';
					        		}else{
					        			$table_inspecciones .= '<a id="trash_'.$inspeccion['id'].'" class="trash" href="#" data-toggle="modal" data-target="#modalActivarInspeccion" data-id="'.$inspeccion['id'].'" data-inspeccion="'.$inspeccion['edificio'].'">
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
			   # }

				$datos['table_inspecciones'] = $table_inspecciones;
				echo json_encode($datos);
			}else{
				if (isset($_SESSION['respuesta'])) {
					$respuesta = $this->session->flashdata('respuesta');
					$usuario['respuesta'] = $respuesta;
				}
				
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

	public function json_listarCategoriasPreguntasRespuestaInspeccion()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$idInspeccion = null;
			$categorias_preguntas = array();
			$data = array();
			$dataCategoria = array();
			$cantCategoria = 0;
			$cantCategoriaPregunta = 0;
			$idCategoria = null;
			$idPregunta = null;
			$respuestas_inspeccion = null;
			$reinspeccion = null;

			$categorias = array();
			$preguntas = array();
			$respuestas = array();

			if(!is_null($this->input->post('idNorma')) && $this->input->post('idNorma') != "-1"  && $this->input->post('idNorma') != "")
				$idNorma = $this->input->post('idNorma');

			if(!is_null($this->input->post('idInspeccion')) && $this->input->post('idInspeccion') != "-1"  && $this->input->post('idInspeccion') != "")
				$idInspeccion = $this->input->post('idInspeccion');

			if(!is_null($this->input->post('reinspeccion')) && $this->input->post('reinspeccion') != "-1"  && $this->input->post('reinspeccion') != "")
				$reinspeccion = $this->input->post('reinspeccion');

			if (isset($idNorma)) {
				$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);

				$respuestas_inspeccion = $this->inspeccion_model->obtenerRespuestasInspeccion($idInspeccion, $usuario['id_usuario']);
				#var_dump($respuestas_inspeccion);

				$severidad_respuestas = $this->inspeccion_model->obtenerSeveridadRespuestas($usuario["id_usuario"]);

				if (sizeof($categorias_preguntas_norma) > 0) {

					
					#if (sizeof($categorias_preguntas_norma) > 0) {
					#	var_dump($categorias_preguntas_respuesta_inspeccion);
					#}

					#var_dump($categorias_preguntas_norma);
					

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

						$tiene_no = false;

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

	                     	#var_dump("es diferente la categoria");
                 			#var_dump($idCategoria);
                 			#var_dump("</br>");
                 			#var_dump($pregunta['id_categoria']);
                 			#var_dump("</br></br></br>");
                 			#var_dump($respuestas_inspeccion);

	                     	if (is_null($idCategoria)) {
	                     		$idCategoria = $pregunta['id_categoria'];
	                     		$idPregunta = $id_pregunta;

	                     		$respuesta_pregunta = null;
	                     		$id_respuesta_pregunta = null;
	                     		$id_severidad_respuesta = null;
	                     		$cant_ascensor = null;
	                     		$imagenes = array();
	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {

	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria and $val['id_pregunta']==$id_pregunta);
							         });
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);#var_dump($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];
	                     				$cant_ascensor = $array_filtrado[$first_key]["cant_ascensor"];
	                     				#var_dump($idCategoria);
	                     				#var_dump($id_pregunta);
	                     				
	                     				/*if ($respuesta_pregunta == 2) {
	                     					var_dump($respuesta_pregunta);
	                     					exit();	
	                     				}else{
	                     					var_dump($array_filtrado);
	                     					var_dump('</br></br>');
	                     				}*/
	                     				
	                     				if (!is_null($respuesta_pregunta) && $respuesta_pregunta == 2) {
	                     					#var_dump($array_filtrado);
	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}

		                     				if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
				                     			$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);
				                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);	
				                     		}


	                     				}
	                     			}
	                     		}

	                     		if (!isset($reinspeccion) && is_null($reinspeccion)) {
	                     			$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);

	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
	                     		}

		                     	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}

		                     	#var_dump($categorias);
		                     	#var_dump('</br></br>');
		                     	#var_dump($preguntas);
		                     	#var_dump('</br></br>');
		                     	#var_dump($respuestas);
		                     	#var_dump('</br></br>');
		                     	#var_dump($imagenes);
		                     	#exit();
	                     	}else{

	                     			$idCategoria = $pregunta['id_categoria'];
	                     		#if (sizeof($respuestas) > 0) {
	                     			$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
	                     			$respuestas = array();
	                     			$idPregunta = $pregunta['id_pregunta'];
	                     			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
	                     			$preguntas = array();

	                     			$respuesta_pregunta = null;
	                     			$id_respuesta_pregunta = null;
	                     			$imagenes = array();
		                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {
		                     			
		                     			
		                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria, $id_pregunta){
								              return ($val['id_categoria']==$idCategoria and $val['id_pregunta']==$id_pregunta);
								         });
		                     			#var_dump($idCategoria);var_dump($id_pregunta);
		                     			reset($array_filtrado);
										$first_key = key($array_filtrado);
		                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
		                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
		                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
		                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];
		                     				$cant_ascensor = $array_filtrado[$first_key]["cant_ascensor"];

		                     				if ($respuesta_pregunta == 2 && !is_null($respuesta_pregunta)) {
		                     					$tiene_no = true;
		                     					foreach ($array_filtrado as $key => $value) {
		                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
		                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
		                     						}
			                     				}
		                     				}
		                     			}
		                     		}

		                     		#var_dump($reinspeccion);
		                     		#var_dump($tiene_no);
		                     		if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
		                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
		                     		}elseif (!isset($reinspeccion) && is_null($reinspeccion)) {
		                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
		                     		}

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

		                    	$respuesta_pregunta = null;
		                    	$id_respuesta_pregunta = null;
		                    	$imagenes = array();
	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {
	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria and $val['id_pregunta']==$id_pregunta);
							         });
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];
	                     				$cant_ascensor = $array_filtrado[$first_key]["cant_ascensor"];

	                     				#var_dump($idCategoria);var_dump($id_pregunta);
	                     				#var_dump($array_filtrado);
	                     				if ($respuesta_pregunta == 2 && !is_null($respuesta_pregunta)) {
	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}
	                     				}
	                     			}
	                     		}

	                     		if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
	                     		}elseif (!isset($reinspeccion) && is_null($reinspeccion)) {
	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
	                     		}

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
				'severidad' => $severidad_respuestas,
				#'data_total' => $dataCategoria
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}


	public function json_listarCategoriasPreguntasRespuestaReInspeccion()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$idInspeccion = null;
			$categorias_preguntas = array();
			$data = array();
			$dataCategoria = array();
			$cantCategoria = 0;
			$cantCategoriaPregunta = 0;
			$idCategoria = null;
			$idPregunta = null;
			$respuestas_inspeccion = null;
			$reinspeccion = null;
			$idReInspeccion = null;

			$categorias = array();
			$preguntas = array();
			$respuestas = array();

			if(!is_null($this->input->post('idNorma')) && $this->input->post('idNorma') != "-1"  && $this->input->post('idNorma') != "")
				$idNorma = $this->input->post('idNorma');

			if(!is_null($this->input->post('idInspeccion')) && $this->input->post('idInspeccion') != "-1"  && $this->input->post('idInspeccion') != "")
				$idInspeccion = $this->input->post('idInspeccion');

			if(!is_null($this->input->post('reinspeccion')) && $this->input->post('reinspeccion') != "-1"  && $this->input->post('reinspeccion') != "")
				$reinspeccion = $this->input->post('reinspeccion');

			if(!is_null($this->input->post('idReInspeccion')) && $this->input->post('idReInspeccion') != "-1"  && $this->input->post('idReInspeccion') != "")
				$idReInspeccion = $this->input->post('idReInspeccion');

			#var_dump($idReInspeccion);
			#exit();
			if (isset($idNorma)) {
				$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);
				$respuestas_inspeccion = $this->inspeccion_model->obtenerRespuestasInspeccion($idReInspeccion, $usuario['id_usuario']);
				#var_dump($idNorma);
				#var_dump($respuestas_inspeccion);
				#var_dump($categorias_preguntas_norma);
				#exit();
				$severidad_respuestas = $this->inspeccion_model->obtenerSeveridadRespuestas($usuario["id_usuario"]);

				if (sizeof($categorias_preguntas_norma) > 0) {

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
						$tiene_no = false;

						if ($idCategoria != $pregunta['id_categoria'])
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

	                     	if (is_null($idCategoria)) {
	                     		$idCategoria = $pregunta['id_categoria'];
	                     		$idPregunta = $id_pregunta;

	                     		$respuesta_pregunta = null;
	                     		$id_respuesta_pregunta = null;
	                     		$id_severidad_respuesta = null;
	                     		$cant_ascensor = null;
	                     		$imagenes = array();
	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {

	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria and $val['id_pregunta']==$id_pregunta);
							         });
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);#var_dump($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];
	                     				$cant_ascensor = $array_filtrado[$first_key]["cant_ascensor"];
	                     				#var_dump($id_severidad_respuesta);
	                     				if (!is_null($respuesta_pregunta) && $respuesta_pregunta == 2) {
	                     					#var_dump($array_filtrado);
	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}

		                     				#if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
				                     			#$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);
				                     			#$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "imagenes" => $imagenes, "respuestas" => []);	
				                     		#}


	                     				}
	                     			}
	                     		}

	                     		#if (!isset($reinspeccion) && is_null($reinspeccion)) {
	                     			$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);

	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
	                     		#}

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

                     			$respuesta_pregunta = null;
                     			$id_respuesta_pregunta = null;
                     			$imagenes = array();
	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {
	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria and $val['id_pregunta']==$id_pregunta);
							         });
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];
	                     				$cant_ascensor = $array_filtrado[$first_key]["cant_ascensor"];

	                     				if ($respuesta_pregunta == 2 && !is_null($respuesta_pregunta)) {
	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}
	                     				}
	                     			}
	                     		}

	                     		#if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
	                     			#$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "imagenes" => $imagenes, "respuestas" => []);
	                     		#}elseif (!isset($reinspeccion) && is_null($reinspeccion)) {
	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
	                     		#}

                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
		                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
		                     	}

		                     	$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);
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

		                    	$respuesta_pregunta = null;
		                    	$id_respuesta_pregunta = null;
		                    	$imagenes = array();
	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {
	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria and $val['id_pregunta']==$id_pregunta);
							         });
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];
	                     				$cant_ascensor = $array_filtrado[$first_key]["cant_ascensor"];

	                     				if ($respuesta_pregunta == 2 && !is_null($respuesta_pregunta)) {
	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}
	                     				}
	                     			}
	                     		}

	                     		#if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
	                     		#	$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "imagenes" => $imagenes, "respuestas" => []);
	                     		#}elseif (!isset($reinspeccion) && is_null($reinspeccion)) {
	                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "cant_ascensor" => $cant_ascensor, "imagenes" => $imagenes, "respuestas" => []);
	                     		#}

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
				}
			}

			$categorias_no = array();
			foreach ($categorias as $categoria) {
				#var_dump($categoria);
				$preguntas_no = array();
				$tiene_no = false;


				foreach ($categoria["preguntas"] as $pregunta) {
					#var_dump($pregunta);
					if ($pregunta["respuesta"] == "2") {
						/*var_dump($categoria["id_categoria"]);
						var_dump($categoria["codigo"]);
						var_dump($categoria["categoria"]);
						var_dump($pregunta);*/
						$tiene_no = true;
						$preguntas_no[] = $pregunta;
						#var_dump($preguntas_no);
					}
				}

				if ($tiene_no) {
					$categorias_no[] = $categoria;
					$categorias_no[(sizeof($categorias_no) - 1)]["preguntas"] = $preguntas_no;
				}
				#var_dump($categorias_no);
				#exit();
			}

			#var_dump($categorias_no);
			#exit();
			$output = array(
				'data_cp_n' => $categorias_no,
				'severidad' => $severidad_respuestas
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}





	/*{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$idInspeccion = null;
			$categorias_preguntas = array();
			$data = array();
			$dataCategoria = array();
			$cantCategoria = 0;
			$cantCategoriaPregunta = 0;
			$idCategoria = null;
			$idPregunta = null;
			$respuestas_inspeccion = null;
			$reinspeccion = null;

			$categorias = array();
			$preguntas = array();
			$respuestas = array();

			if(!is_null($this->input->post('idNorma')) && $this->input->post('idNorma') != "-1"  && $this->input->post('idNorma') != "")
				$idNorma = $this->input->post('idNorma');

			if(!is_null($this->input->post('idInspeccion')) && $this->input->post('idInspeccion') != "-1"  && $this->input->post('idInspeccion') != "")
				$idInspeccion = $this->input->post('idInspeccion');

			if(!is_null($this->input->post('reinspeccion')) && $this->input->post('reinspeccion') != "-1"  && $this->input->post('reinspeccion') != "")
				$reinspeccion = $this->input->post('reinspeccion');

			if (isset($idNorma)) {
				$categorias_preguntas_norma = $this->norma_model->listarCategoriasPreguntasNorma($idNorma, $usuario['id_usuario']);

				$respuestas_inspeccion = $this->inspeccion_model->obtenerRespuestasInspeccionReporte($idInspeccion, $usuario['id_usuario'], true);
				#var_dump($respuestas_inspeccion);
				#exit();

				$severidad_respuestas = $this->inspeccion_model->obtenerSeveridadRespuestas($usuario["id_usuario"]);

				if (sizeof($categorias_preguntas_norma) > 0) {
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
						$tiene_no = false;

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

	                     	#var_dump("es diferente la categoria");
                 			#var_dump($idCategoria);
                 			#var_dump("</br>");
                 			#var_dump($pregunta['id_categoria']);
                 			#var_dump("</br></br></br>");
                 			#var_dump($respuestas_inspeccion);

	                     	if (is_null($idCategoria)) {
	                     		#$idCategoria = $pregunta['id_categoria'];
	                     		$idCategoria2 = $pregunta['id_categoria'];
	                     		$idPregunta = $id_pregunta;

	                     		$respuesta_pregunta = null;
	                     		$id_respuesta_pregunta = null;
	                     		$imagenes = array();

	                     		

	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {

	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria2, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria2 and $val['id_pregunta']==$id_pregunta);
							         });
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);#var_dump($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];

	                     				#var_dump($idCategoria);
	                     				#var_dump($id_respuesta_pregunta);
	                     				#var_dump($id_severidad_respuesta);
	                     				
	                     				#var_dump($array_filtrado);
	                     				#var_dump($respuesta_pregunta);

	                     				if (!is_null($respuesta_pregunta) && $respuesta_pregunta == 2) {
	                     					$idCategoria = $pregunta['id_categoria'];
	                     					$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);

	                     					
	                     					#exit();
	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}

		                     				if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
				                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "imagenes" => $imagenes, "respuestas" => []);	
				                     		
				                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
						                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
						                     	}

				                     		}
	                     				}else{
	                     					$tiene_no = false;
	                     				}
	                     			}
	                     		}

		                     	#var_dump($categorias);
		                     	#var_dump('</br></br>');
		                     	#var_dump($preguntas);
		                     	#var_dump('</br></br>');
		                     	#var_dump($respuestas);
		                     	#var_dump('</br></br>');
		                     	#var_dump($imagenes);
		                     	#exit();
	                     	}else{

                     			#$idCategoria = $pregunta['id_categoria'];
                     			$idCategoria2 = $pregunta['id_categoria'];
                     			$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
                     			$respuestas = array();
                     			$idPregunta = $pregunta['id_pregunta'];
                     			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
                     			$preguntas = array();

                     			$respuesta_pregunta = null;
                     			$id_respuesta_pregunta = null;
                     			$imagenes = array();

	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {
	                     			
	                     			
	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria2, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria2 and $val['id_pregunta']==$id_pregunta);
							         });
	                     			#var_dump($idCategoria);var_dump($id_pregunta);
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];

	                     				if ($respuesta_pregunta == 2 && !is_null($respuesta_pregunta)) {
	                     					$idCategoria = $pregunta['id_categoria'];
	                     					$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);

	                     					#var_dump($array_filtrado);
	                     					#exit();

	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}

		                     				if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
				                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "imagenes" => $imagenes, "respuestas" => []);

				                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
						                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
						                     	}
				                     		}

	                     				}else{
	                     					$tiene_no = false;
	                     				}
	                     			}
	                     		}

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

		                    	$respuesta_pregunta = null;
		                    	$id_respuesta_pregunta = null;
		                    	$imagenes = array();
	                     		if (isset($respuestas_inspeccion) && !is_null($respuestas_inspeccion) && sizeof($respuestas_inspeccion) > 0) {
	                     			$array_filtrado = array_filter($respuestas_inspeccion, function($val) use($idCategoria, $id_pregunta){
							              return ($val['id_categoria']==$idCategoria and $val['id_pregunta']==$id_pregunta);
							         });
	                     			reset($array_filtrado);
									$first_key = key($array_filtrado);
	                     			if (isset($array_filtrado) && !is_null($array_filtrado) && sizeof($array_filtrado) > 0 && isset($array_filtrado[$first_key]["respuesta"]) && !is_null($array_filtrado[$first_key]["respuesta"])) {
	                     				$respuesta_pregunta = $array_filtrado[$first_key]["respuesta"];
	                     				$id_respuesta_pregunta = $array_filtrado[$first_key]["id_respuesta"];
	                     				$id_severidad_respuesta = $array_filtrado[$first_key]["id_severidad_respuesta"];

	                     				

	                     				if ($respuesta_pregunta == 2 && !is_null($respuesta_pregunta)) {


	                     					
	                     					var_dump($categorias);
	                     					var_dump($respuestas);
	                     					var_dump($preguntas);

	                     					#var_dump($respuesta_pregunta);
		                     				#var_dump($id_pregunta);
		                     				#var_dump($array_filtrado);
		                     				exit();

	                     					$tiene_no = true;
	                     					foreach ($array_filtrado as $key => $value) {
	                     						if (isset($value["file_name"]) && !is_null($value["file_name"]) && $value["file_name"] != "") {
	                     							$imagenes[] = array('id_imagen' => ($value["id_categoria"].'_'.$value["id_pregunta"].'_'.$value["orden_a"]), 'file_name' => $value["file_name"], 'orden' => $value["orden_a"], 'archivo_id' => $value["archivo_id"]);	
	                     						}
		                     				}

		                     				if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
				                     			$preguntas[] = array('id_pregunta' => $id_pregunta, 'codigo' => $codigo_p, "pregunta" => $pregunta_r, "respuesta" => $respuesta_pregunta, "id_respuesta" => $id_respuesta_pregunta, "id_severidad_respuesta" => $id_severidad_respuesta, "imagenes" => $imagenes, "respuestas" => []);

				                     			if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
						                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
						                     	}
				                     		}

				                     		$posicion_categoria = null;
				                     		if (sizeof($categorias) > 0) {
				                     			$index_encontrado = array_search($idCategoria, array_column($categorias, 'id_categoria'));
					                     		if ($index_encontrado !== false){
													$posicion_categoria = $index_encontrado;	
												}else{
													$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);
													$index_encontrado = array_search($idCategoria, array_column($categorias, 'id_categoria'));
													$posicion_categoria = $index_encontrado;
												}
				                     		}else{
				                     			$categorias[] = array('id_categoria' => $idCategoria, 'codigo' => $pregunta["codigo_c"], "categoria" => $pregunta["categoria"], "preguntas" => []);
												$index_encontrado = array_search($idCategoria, array_column($categorias, 'id_categoria'));
												$posicion_categoria = $index_encontrado;
				                     		}

				                     		#$categorias[$posicion_categoria]["preguntas"][] = $preguntas;
				                     		if (!is_null($posicion_categoria)) {
				                     			var_dump($posicion_categoria);
				                     		}


	                     				}else{
	                     					$tiene_no = false;
	                     				}
	                     			}
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
		                    	
		                    	if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
			                    	if (!is_null($pregunta["respuesta_id"]) && is_numeric($pregunta["respuesta_id"]) && (int)$pregunta["respuesta_id"] > 0) {
			                     		$respuestas[] = array("id_respuesta" => $id_respuesta, "orden_r" => $orden_r, "respuesta" => $respuesta, "obs_respuesta" => $obs_respuesta);
			                     	}
			                    }

		                    }
	                    	#$cantCategoriaPregunta++;
	                    	#var_dump($pregunta);

	                    }

	                }

	                $preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
         			$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;

	                #var_dump($respuestas);
	                #var_dump($preguntas);
	                #var_dump($categorias);

	                #if (isset($reinspeccion) && !is_null($reinspeccion) &&  $reinspeccion == 1 && $tiene_no == true) {
                    	#$preguntas[(sizeof($preguntas)-1)]["respuestas"] = $respuestas;
         				#$categorias[(sizeof($categorias)-1)]["preguntas"] = $preguntas;
                    #}

	                
	                #var_dump($categorias);
	                #$dataCategoria[] = array('id_categoria' => $idCategoria, 'cantPreguntas' => $cantCategoriaPregunta);
				}
			}
			
			$output = array(
				'data_cp_n' => $categorias,
				'severidad' => $severidad_respuestas,
				#'data_total' => $dataCategoria
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}

*/
	public function json_listarObservacionesInspeccion()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){
			$idNorma = null;
			$idInspeccion = null;
			$categorias_preguntas = array();
			$data = array();
			$dataCategoria = array();
			$cantCategoria = 0;
			$cantCategoriaPregunta = 0;
			$idCategoria = null;
			$idPregunta = null;
			$respuestas_inspeccion = null;

			
			$observaciones = array();

			if(!is_null($this->input->post('idInspeccion')) && $this->input->post('idInspeccion') != "-1"  && $this->input->post('idInspeccion') != "")
				$idInspeccion = $this->input->post('idInspeccion');

			if (isset($idInspeccion)) {

				$observaciones_generales =  $this->inspeccion_model->obtenerObservacionesInspeccion($idInspeccion ,$usuario["id_usuario"]);
				if (sizeof($observaciones_generales) > 0) {

					
					#if (sizeof($categorias_preguntas_norma) > 0) {
					#	var_dump($categorias_preguntas_respuesta_inspeccion);
					#}

					#var_dump(sizeof($categorias_preguntas_norma));
					

					foreach ($observaciones_generales as $observacion) {
						$id_categoria = null;
						$codigo_c = null;
						$categoria = null;
						$obs_categoria = null;
						$archivo_id = null;
						$file_name = null;
						$inspeccion_checklist_obs_id = null;
						$observacion_item = null;
						$orden_r = null;

						$id_categoria = $observacion['id_categoria'];
                     	$codigo_c = $observacion['codigo_categoria'];
                     	$categoria = $observacion['categoria'];
                     	$obs_categoria = $observacion['obs_categorias'];
                     	$archivo_id = $observacion['archivo_id'];
                     	$file_name = $observacion['file_name'];
                     	$inspeccion_checklist_obs_id = $observacion['inspeccion_checklist_obs_id'];
                     	$observacion_item = $observacion['observaciones'];
                     	$orden_r = $observacion['orden'];
                    	
                    	
                     	$observaciones[] = array("id_categoria" => $id_categoria, "codigo_c" => $codigo_c, "categoria" => $categoria, "obs_categoria" => $obs_categoria, "archivo_id" => $archivo_id, "file_name" => $file_name, "inspeccion_checklist_obs_id" => $inspeccion_checklist_obs_id, "observacion_item" => $observacion_item, "orden_r" => $orden_r);
	                }
				}
			}
			
			$output = array(
				'data_obs_generales' => $observaciones
				#'data_cp_n' => $categorias_preguntas,
				#'data_total' => $dataCategoria
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}


	public function eliminarInspeccion()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idInspeccion = null;
			if($this->input->POST('idInspeccion'))
				$idInspeccion = $this->input->POST('idInspeccion');
			$resultado = $this->inspeccion_model->eliminarInspeccion($idInspeccion, $usuario['id_usuario']);
			#var_dump($resultado);
			$respuesta = 0;
			if(isset($resultado) && isset($resultado["resultado"]) && $resultado["resultado"] > 0)
				$respuesta = 1;

			echo json_encode($resultado);
		}
	}





}