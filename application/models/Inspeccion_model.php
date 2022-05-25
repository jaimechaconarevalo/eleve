<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Inspeccion_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarInspeccionesUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_inspecciones.inspecciones_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_inspecciones','usuarios.id_usuario = usuarios_inspecciones.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('inspecciones.id, inspecciones.codigo, inspecciones.nombre');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_inspecciones','usuarios.id_usuario = usuarios_inspecciones.id_usuario');
			$this->db->join('inspecciones','usuarios_inspecciones.inspecciones_id = inspecciones.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('inspecciones.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('inspecciones.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('inspecciones.id, inspecciones.codigo, inspecciones.nombre');
			$this->db->from('inspecciones');
			if (!is_null($id_servicio_salud))
				$this->db->where('inspecciones.servicio_salud_id', $id_servicio_salud);
			$this->db->where('inspecciones.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}

		
	}

	public function buscarInspeccion($filtroInspeccion, $id_usuario)
	{
		$this->db->select('inspecciones.id, inspecciones.codigo, inspecciones.nombre');
		$this->db->from('inspecciones');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_inspecciones','usuarios.id_usuario = usuarios_inspecciones.id_usuario');
		//$this->db->join('inspecciones','usuarios_inspecciones.inspecciones_id = inspecciones.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroInspeccion)){
			$this->db->like('inspecciones.codigo', $filtroInspeccion);
			$this->db->or_like('inspecciones.nombre', $filtroInspeccion);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('inspecciones.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerInspeccion($idInspeccion, $id_usuario)
	{
	$this->db->select('i.id, i.id_edificio, i.nombre_tecnico, i.cantidad_ascensor, i.rut_admin, i.nombre_admin, i.email_admin, i.fecha_contrato_mant, i.contrato_vigente, i.id_empresa_mantenedora, i.nombre_mant_2, i.fecha_ultima_mant, i.marca_ascensor, i.id_uso, i.capacidad_personas, i.capacidad_kg, i.id_suspension, s.nombre as suspension, i.sala_maquinas, i.velocidad, i.recorrido, i.paradas, i.id_tipo_traccion, i.cantidad, i.num_informe, i.diametro_traccion, i.enclavamiento_electrico, i.enclavamiento_mecanico, i.diametro_cable, i.reinspeccion, i.id_estado, i.id_usuario, i.created_at, i.updated_at, e.rol, e.nombre as edificio, e.rut as rut_e, e.domicilio, em.cod_empresa, em.razon_social, em.num_registro, em.direccion as direccion_em, em.rut as rut_em, em.email as email_em, em.observaciones as observaciones_em, i.es_temporal, n.id as id_norma, n.codigo as codigo_norma, n.nombre as norma, n.observaciones as obs_norma, us.codigo as codigo_uso, us.nombre as uso, us.observaciones as obs_uso');
		$this->db->from('inspecciones i');
		$this->db->join('edificios e', 'i.id_edificio = e.id', 'LEFT');
		$this->db->join('empresas_mantenedoras em', 'i.id_empresa_mantenedora = em.id_empresa', 'LEFT');
		$this->db->join('suspensiones s', 'i.id_suspension = s.id', 'LEFT');
		$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion', 'LEFT');
		$this->db->join('normas n', 'ic.id_norma = n.id', 'LEFT');
		$this->db->join('usos us', 'i.id_uso = us.id', 'LEFT');
		$this->db->where('i.id_estado', 1);
		
		$this->db->group_start();
		$this->db->where('ic.id_estado', 1)->or_where('ic.id IS NULL', NULL, FALSE);
		$this->db->group_end();

		$this->db->where('i.id', $idInspeccion);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerReInspeccion($idInspeccion, $id_usuario)
	{
		try{
			$inspeccion = $this->db->get_where('inspecciones', array('id' => $idInspeccion, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($inspeccion) > 0) {
				if (is_null($inspeccion[0]->id_reinspeccion)) {
					$inspeccion[0]->id = null;
					$id_reinspeccion = null;
					$inspeccion[0]->reinspeccion = 1;
					$this->db->insert('inspecciones', $inspeccion[0]);
					if ($this->db->affected_rows() >= 1){
						$id_reinspeccion = $this->db->insert_id();
						$data3 = array(
					        'id_reinspeccion' => $id_reinspeccion
						);
					    
						$this->db->set('updated_at', 'NOW()', FALSE);
						$this->db->where('id', $idInspeccion);
					    $this->db->update('inspecciones', $data3);

					    $respuesta["id_inspeccion"] = $id_reinspeccion;
					    $respuesta["resultado"] = $this->db->affected_rows();

#						var_dump($id_reinspeccion);
						$inspecciones_checklists = $this->db->get_where('inspecciones_checklists', array('id_inspeccion' => $idInspeccion, 'id_estado' => 1))->result();
						if (sizeof($inspecciones_checklists) > 0) {
							$id_inspecciones_checklists = $inspecciones_checklists[0]->id;
							$inspecciones_checklists[0]->id = null;
							$inspecciones_checklists[0]->id_inspeccion = $id_reinspeccion;

							$this->db->insert('inspecciones_checklists', $inspecciones_checklists[0]);
							if ($this->db->affected_rows() >= 1){
								$id_checklist_reinspeccion = $this->db->insert_id();

								$respuesta["id_checklist_reinspeccion"] = $id_checklist_reinspeccion;
					    		#$respuesta["resultado"] = $this->db->affected_rows();

								$inspecciones_checklists_respuestas = $this->db->get_where('inspecciones_checklists_respuestas', array('id_inspecciones_checklists' => $id_inspecciones_checklists, 'id_estado' => 1))->result();
								if (sizeof($inspecciones_checklists_respuestas) > 0) {
									foreach ($inspecciones_checklists_respuestas as $ic_respuesta) {
										$id_ic_respuesta = $ic_respuesta->id;

										$imagenes_ic_respuesta = $this->db->get_where('archivos', array('inspeccion_checklist_resp_id' => $id_ic_respuesta, 'id_estado' => 1))->result();

										if (sizeof($imagenes_ic_respuesta) > 0) {
											foreach ($imagenes_ic_respuesta as $imagen_respuesta) {
												$imagen_respuesta->id = null;
											}
										}


										$ic_respuesta->id_inspecciones_checklists = $id_checklist_reinspeccion;
										$ic_respuesta->id = null;
									}
									$this->db->insert_batch('inspecciones_checklists_respuestas', $inspecciones_checklists_respuestas);
									if ($this->db->affected_rows() >= 1){
										$respuesta['cant_reinspeccion_checklists_respuestas'] = $this->db->affected_rows();

										$this->db->select('i.id, i.id_edificio, i.nombre_tecnico, i.cantidad_ascensor, i.rut_admin, i.nombre_admin, i.email_admin, i.fecha_contrato_mant, i.contrato_vigente, i.id_empresa_mantenedora, i.nombre_mant_2, i.fecha_ultima_mant, i.marca_ascensor, i.id_uso, i.capacidad_personas, i.capacidad_kg, i.id_suspension, s.nombre as suspension, i.sala_maquinas, i.velocidad, i.recorrido, i.paradas, i.id_tipo_traccion, i.cantidad, i.num_informe, i.diametro_traccion, i.enclavamiento_electrico, i.enclavamiento_mecanico, i.diametro_cable, i.reinspeccion, i.id_estado, i.id_usuario, i.created_at, i.updated_at, e.rol, e.nombre as edificio, e.rut as rut_e, e.domicilio, em.cod_empresa, em.razon_social, em.num_registro, em.direccion as direccion_em, em.rut as rut_em, em.email as email_em, em.observaciones as observaciones_em, i.es_temporal, n.id as id_norma, n.codigo as codigo_norma, n.nombre as norma, n.observaciones as obs_norma, us.codigo as codigo_uso, us.nombre as uso, us.observaciones as obs_uso');
										$this->db->from('inspecciones i');
										$this->db->join('edificios e', 'i.id_edificio = e.id', 'LEFT');
										$this->db->join('empresas_mantenedoras em', 'i.id_empresa_mantenedora = em.id_empresa', 'LEFT');
										$this->db->join('suspensiones s', 'i.id_suspension = s.id', 'LEFT');
										$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion', 'LEFT');
										$this->db->join('normas n', 'ic.id_norma = n.id', 'LEFT');
										$this->db->join('usos us', 'i.id_uso = us.id', 'LEFT');
										$this->db->where('i.id_estado', 1);
										$this->db->where('ic.id_estado', 1);
										$this->db->where('i.id', $id_reinspeccion);
										$respuesta = $this->db->get();
										$respuesta = $respuesta->result_array();

										/*select * from archivos a where a.inspeccion_checklist_resp_id in (select icr.id from inspecciones_checklists_respuestas icr where icr.id_inspecciones_checklists = 539)
										and a.id_estado = 1
										order by a.id_categoria, a.id_pregunta, a.orden;*/


									}
									#var_dump($this->db->affected_rows());
									#exit();

									#var_dump($inspecciones_checklists_respuestas);

									#exit();
									/*$id_inspecciones_checklists = $inspecciones_checklists_respuestas[0]->id;
									$inspecciones_checklists[0]->id = null;
									$inspecciones_checklists[0]->id_inspeccion = $id_reinspeccion;

									$this->db->insert('inspecciones_checklists', $inspecciones_checklists[0]);
									if ($this->db->affected_rows() >= 1){
										$id_checklist_reinspeccion = $this->db->insert_id();



										




									}else{
										$respuesta['id_reinspeccion'] = -1;
										$respuesta['resultado'] = $this->db->affected_rows();
										$respuesta['mensaje'] = $this->db->error();
									}*/
								}





							}else{
								$respuesta['id_reinspeccion'] = -1;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = $this->db->error();
							}
						}

					}else{
						$respuesta['id_reinspeccion'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
					#var_dump($id_reinspeccion);
				}else{					
					$this->db->select('i.id, i.id_edificio, i.nombre_tecnico, i.cantidad_ascensor, i.rut_admin, i.nombre_admin, i.email_admin, i.fecha_contrato_mant, i.contrato_vigente, i.id_empresa_mantenedora, i.nombre_mant_2, i.fecha_ultima_mant, i.marca_ascensor, i.id_uso, i.capacidad_personas, i.capacidad_kg, i.id_suspension, s.nombre as suspension, i.sala_maquinas, i.velocidad, i.recorrido, i.paradas, i.id_tipo_traccion, i.cantidad, i.num_informe, i.diametro_traccion, i.enclavamiento_electrico, i.enclavamiento_mecanico, i.diametro_cable, i.reinspeccion, i.id_estado, i.id_usuario, i.created_at, i.updated_at, e.rol, e.nombre as edificio, e.rut as rut_e, e.domicilio, em.cod_empresa, em.razon_social, em.num_registro, em.direccion as direccion_em, em.rut as rut_em, em.email as email_em, em.observaciones as observaciones_em, i.es_temporal, n.id as id_norma, n.codigo as codigo_norma, n.nombre as norma, n.observaciones as obs_norma, us.codigo as codigo_uso, us.nombre as uso, us.observaciones as obs_uso');
					$this->db->from('inspecciones i');
					$this->db->join('edificios e', 'i.id_edificio = e.id', 'LEFT');
					$this->db->join('empresas_mantenedoras em', 'i.id_empresa_mantenedora = em.id_empresa', 'LEFT');
					$this->db->join('suspensiones s', 'i.id_suspension = s.id', 'LEFT');
					$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion', 'LEFT');
					$this->db->join('normas n', 'ic.id_norma = n.id', 'LEFT');
					$this->db->join('usos us', 'i.id_uso = us.id', 'LEFT');
					$this->db->where('i.id_estado', 1);
					$this->db->where('ic.id_estado', 1);
					$this->db->where('i.id', $inspeccion[0]->id_reinspeccion);
					$inspeccion = $this->db->get();
					return $inspeccion->result_array();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion'] = -1;
		}

		return $respuesta;
	}

	public function obtenerCarpetas($idInspeccion, $id_usuario)
	{
		$this->db->select('ic.id, ic.id_inspeccion, ic.id_carpeta, ic.respuesta, ic.orden');
		$this->db->from('inspecciones_carpetas ic');
		$this->db->where('ic.id_estado', 1);
		$this->db->where('ic.id_inspeccion', $idInspeccion);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerNormas($idInspeccion, $id_usuario)
	{
		$this->db->select('ic.id, ic.id_inspeccion, ic.id_norma, ic.respuesta, ic.orden');
		$this->db->from('inspecciones_normas ic');
		$this->db->where('ic.id_estado', 1);
		$this->db->where('ic.id_inspeccion', $idInspeccion);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerHerramientas($idInspeccion, $id_usuario)
	{
		$this->db->select('ic.id, ic.id_inspeccion, ic.id_herramienta, ic.respuesta, ic.orden, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('inspecciones_herramientas ic');
		$this->db->join('herramientas h', 'ic.id_herramienta = h.id', 'LEFT');
		$this->db->where('ic.id_estado', 1);
		$this->db->where('ic.id_inspeccion', $idInspeccion);
		$this->db->order_by('ic.orden');
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerNormasRespuesta($idInspeccion, $id_usuario)
	{
		$this->db->select('ic.id, ic.id_inspeccion, ic.id_norma, n.codigo, n.nombre, n.observaciones, icr.id as id_resp, icr.id_categoria, icr.id_pregunta, icr.respuesta, icr.observaciones as obs_resp, icr.orden, c.codigo as codigo_c, c.nombre as categoria, c.observaciones as obs_cat, 
			p.codigo as codigo_p, p.nombre as pregunta, p.observaciones as obs_p,
			(select count(a.id) from archivos a where a.inspeccion_checklist_resp_id = icr.id and a.id_estado = 1) as cant_archivos');
		$this->db->from('inspecciones_checklists ic');
		$this->db->join('normas n', 'ic.id_norma = n.id', 'LEFT');
		$this->db->join('inspecciones_checklists_respuestas icr', 'ic.id = icr.id_inspecciones_checklists', 'LEFT');
		$this->db->join('categorias c', 'icr.id_categoria = c.id', 'LEFT');
		$this->db->join('preguntas p', 'icr.id_pregunta = p.id', 'LEFT');
		$this->db->where('ic.id_estado', 1);
		$this->db->where('ic.id_inspeccion', $idInspeccion);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerRespuestasInspeccion($idInspeccion, $id_usuario, $reinspeccion = false)
	{
		$this->db->select('icr.id, icr.id_inspecciones_checklists, icr.id_categoria, icr.id_pregunta, icr.id_pregunta, icr.respuesta, icr.observaciones, icr.orden, icr.id_respuesta, icr.id_estado, icr.created_at, icr.updated_at, icr.id_severidad_respuesta, a.id as archivo_id, a.file_name, a.file_type, a.file_path, a.full_path, a.raw_name, a.orig_name, a.client_name, a.file_ext, a.file_size, a.is_image, a.image_width, a.image_height, a.image_type, a.image_size_str, a.id_estado as id_estado_a, a.inspeccion_checklist_resp_id, a.inspeccion_checklist_obs_id, a.id_categoria as id_categoria_a, a.id_pregunta as id_pregunta_a, a.orden as orden_a, a.id_usuario as id_usuario_a, a.create_at as create_at_a, a.updated_at as updated_at_a');
		$this->db->from('inspecciones i');
		$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion', 'LEFT');
		$this->db->join('inspecciones_checklists_respuestas icr', 'ic.id = icr.id_inspecciones_checklists', 'LEFT');
		$this->db->join('archivos a', 'icr.id = a.inspeccion_checklist_resp_id', 'LEFT');
		$this->db->where('i.id', $idInspeccion);
		if ($reinspeccion) {
			$this->db->where('icr.respuesta', 2);
		}
		$this->db->where('i.id_estado', 1);
		$this->db->where('ic.id_estado', 1);
		$this->db->where('icr.id_estado', 1);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerRespuestasInspeccionReporte($idInspeccion, $id_usuario, $es_reinspeccion = false)
	{
		$this->db->select('icr.id, icr.id_inspecciones_checklists, icr.id_categoria, icr.id_pregunta, icr.id_pregunta, icr.respuesta, icr.observaciones, icr.orden, icr.id_respuesta, icr.id_estado, icr.created_at, icr.updated_at, 
		sr.id as id_severidad_respuesta, sr.orden as orden_severidad, sr.nombre as severidad,
		a.id as archivo_id, a.file_name, a.file_type, a.file_path, a.full_path, a.raw_name, a.orig_name, a.client_name, a.file_ext, a.file_size, a.is_image, a.image_width, a.image_height, a.image_type, a.image_size_str, 
		a.id_estado as id_estado_a, a.inspeccion_checklist_resp_id, a.inspeccion_checklist_obs_id, a.id_categoria as id_categoria_a, a.id_pregunta as id_pregunta_a, a.orden as orden_a, a.id_usuario as id_usuario_a, a.create_at as create_at_a, a.updated_at as updated_at_a,
        p.codigo as codigo_pregunta, p.nombre as pregunta, p.filtro, p.observaciones as pregunta_obs,
        r.orden as orden_respuesta, r.nombre as respuesta, r.observaciones as respuesta_obs,
        (select count(iicr.id) as cantidad from inspecciones ii inner join inspecciones_checklists iic on ii.id = iic.id_inspeccion inner join inspecciones_checklists_respuestas iicr on iic.id = iicr.id_inspecciones_checklists inner join archivos aa on iicr.id = aa.inspeccion_checklist_resp_id where ii.id = i.id and iicr.id_pregunta = icr.id_pregunta) as cantidad_fotos');
		$this->db->from('inspecciones i');
		$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion', 'LEFT');
		$this->db->join('inspecciones_checklists_respuestas icr', 'ic.id = icr.id_inspecciones_checklists', 'LEFT');
		$this->db->join('severidad_respuesta sr', 'icr.id_severidad_respuesta = sr.id', 'LEFT');
		$this->db->join('preguntas p', 'icr.id_pregunta = p.id', 'LEFT');
		$this->db->join('respuestas r', 'icr.id_respuesta = r.id', 'LEFT');
		$this->db->join('archivos a', 'icr.id = a.inspeccion_checklist_resp_id', 'LEFT');
		$this->db->where('i.id', $idInspeccion);
		if ($es_reinspeccion = true) {
			$this->db->where('icr.respuesta', 2);	
		}
		$this->db->where('i.id_estado', 1);
		$this->db->where('ic.id_estado', 1);
		$this->db->where('icr.id_estado', 1);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerObservacionesInspeccion($idInspeccion, $id_usuario)
	{
		$this->db->select('ico.id, ico.id_inspecciones_checklists, ico.id_categoria, ico.observaciones, ico.orden, ico.id_estado, ico.created_at, ico.updated_at, c.id as id_categoria, c.codigo as codigo_categoria, c.nombre as categoria, c.observaciones as obs_categorias,
							a.id as archivo_id, a.file_name, a.file_type, a.file_path, a.full_path, a.raw_name, a.orig_name, a.client_name, a.file_ext, a.file_size, a.is_image, a.image_width, a.image_height, a.image_type, a.image_size_str, 
							a.id_estado, a.inspeccion_checklist_resp_id, a.inspeccion_checklist_obs_id, a.id_categoria, a.id_pregunta, a.orden, a.id_usuario, a.create_at, a.updated_at');
		$this->db->from('inspecciones i');
		$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion', 'LEFT');
		$this->db->join('inspecciones_checklists_obs ico', 'ic.id = ico.id_inspecciones_checklists', 'LEFT');
		$this->db->join('categorias c', 'ico.id_categoria = c.id', 'LEFT');
		$this->db->join('archivos a', 'ico.id = a.inspeccion_checklist_obs_id', 'LEFT');
		$this->db->where('i.id', $idInspeccion);
		$this->db->where('i.id_estado', 1);
		$this->db->where('ic.id_estado', 1);
		$this->db->where('ico.id_estado', 1);
		$this->db->order_by('a.orden');
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function listarInspecciones($id_usuario, $temporal = 0)
	{
		$this->db->select('i.id, i.id_edificio, i.nombre_tecnico, i.rut_admin, i.nombre_admin, i.email_admin, i.fecha_contrato_mant, i.contrato_vigente, i.id_empresa_mantenedora, i.nombre_mant_2, i.fecha_ultima_mant, i.marca_ascensor, i.id_uso, i.capacidad_personas, i.capacidad_kg, i.id_suspension, i.sala_maquinas, i.velocidad, i.recorrido, i.paradas, i.id_tipo_traccion, i.cantidad, i.num_informe, i.diametro_traccion, i.enclavamiento_electrico, i.enclavamiento_mecanico, i.diametro_cable, i.reinspeccion, i.id_estado, i.id_usuario, i.created_at, i.updated_at`, e.rol, e.nombre as edificio, e.rut as rut_e, e.domicilio');
		$this->db->from('inspecciones i');
		$this->db->join('edificios e', 'i.id_edificio = e.id', 'LEFT');
		$this->db->where('i.id_estado', 1);
		if (isset($temporal)) {
			$this->db->where('i.es_temporal', $temporal);
		}
		
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function desactivarInspeccion($idInspeccion, $id_usuario)
	{
		try{
			$inspeccion = $this->db->get_where('inspecciones', array('id' => $idInspeccion, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($inspeccion) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idInspeccion);
			    $this->db->update('inspecciones', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspeccion'] = $idInspeccion;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la Inspeccion.";
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion'] = -1;
		}

		return $respuesta;
	}

	public function activarInspeccion($idInspeccion, $id_usuario)
	{
		try{
			$inspeccion = $this->db->get_where('inspecciones', array('id' => $idInspeccion, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($inspeccion) > 0) {

				$data3 = array(
			        'es_temporal' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idInspeccion);
			    $this->db->update('inspecciones', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspeccion'] = $idInspeccion;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la Inspeccion.";
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion'] = -1;
		}

		return $respuesta;
	}

	public function listarClusterUsu($id_usuario)
	{
		$query = $this->db->get_where('cluster', array('estado =' => 1));
		$resultado = $query->result_array();
	    return $resultado;
	}

	public function listarRegionesUsu($id_usuario)
	{
		$query = $this->db->get_where('regiones', array('estado =' => 1));
		$resultado = $query->result_array();
	    return $resultado;
	}

	public function listarMacroZonasUsu($id_usuario)
	{
		$query = $this->db->get_where('macro_zonas', array('estado =' => 1));
		$resultado = $query->result_array();
	    return $resultado;
	}

	public function agregarInspeccion($idInspeccion, $tecnico, $cantidad_ascensor, $nombreE, $direccionE, $rutE, $idE, $nombreA, $rutA, $emailA, $idEmpresaM, $nombreRM, $fechaUM, $marca, $idUso, $capacidad, $capacidadKG, $idSuspension, $salaMaquina, $velocidad, $recorrido, $paradas, $idTipoTraccion, $cantidad, $diamTraccion, $enclavamientoE, $enclavamientoM, $diamCableL, $idNorma, $id_usuario, $es_temporal = 0){
		try{
			$this->db->db_debug = FALSE;
			$id_edificio = null;
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion' => null);
			
			if (!is_null($idInspeccion) && $idInspeccion > 0 ) {
				$this->db->select('e.id, e.rol, e.orden, e.nombre, e.rut, e.domicilio, e.observaciones, e.id_usuario, e.id_empresa, e.id_estado, e.created_at, e.updated_at');
				$this->db->from('inspecciones i');
				$this->db->join('edificios e', 'i.id_edificio = e.id');
				$this->db->where('i.id', $idInspeccion);
				$this->db->where('i.id_estado', 1);
				$this->db->where('e.id_estado', 1);
				$edificio_inspeccion = $this->db->get()->result_array();

				if (isset($edificio_inspeccion) && sizeof($edificio_inspeccion) > 0 && isset($edificio_inspeccion["id"])) {
					$dataE = array(
						'nombre' => $nombreE,
						'domicilio' => $direccionE,
						'rut' => $rutE,
						'rol' => $idE,
						'id_usuario' => $id_usuario
					);
					$id_edificio = $edificio_inspeccion["id"];
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $id_edificio);
					$this->db->update('edificios', $dataE);
				}else{
					if (!is_null($nombreE) || !is_null($direccionE) || !is_null($rutE) || !is_null($idE)) {
						$dataE = array(
							'nombre' => $nombreE,
							'domicilio' => $direccionE,
							'rut' => $rutE,
							'rol' => $idE,
							'id_usuario' => $id_usuario
						);
						
						try{
						    $this->db->insert('edificios', $dataE);
							if ($this->db->affected_rows() >= 1){
								$id_edificio = $this->db->insert_id();
							}else{
								$respuesta['id_inspeccion'] = -1;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = $this->db->error();
							}
						}
						catch(Exception $e){
							$respuesta['id_inspeccion'] = -1;
						    $respuesta['mensaje'] = $e;
						    $respuesta['data'] = $dataE;
						}
					}
				}
			}else{
				if (!is_null($nombreE) || !is_null($direccionE) || !is_null($rutE) || !is_null($idE)) {
					$dataE = array(
						'nombre' => $nombreE,
						'domicilio' => $direccionE,
						'rut' => $rutE,
						'rol' => $idE,
						'id_usuario' => $id_usuario
					);
					
					try{
					    $this->db->insert('edificios', $dataE);
						if ($this->db->affected_rows() >= 1){
							$id_edificio = $this->db->insert_id();
						}else{
							$respuesta['id_inspeccion'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = $this->db->error();
						}
					}
					catch(Exception $e){
						$respuesta['id_inspeccion'] = -1;
					    $respuesta['mensaje'] = $e;
					    $respuesta['data'] = $dataE;
					}
				}
				
			}
			

			$data = array(
		        'id_edificio' => $id_edificio,
				'nombre_tecnico' => $tecnico,
				'cantidad_ascensor' => $cantidad_ascensor,
				'rut_admin' => $rutA,
				'nombre_admin' => $nombreA,
				'email_admin' => $emailA,
				'id_empresa_mantenedora' => $idEmpresaM,
				'nombre_mant_2' => $nombreRM,
				'fecha_ultima_mant' => $fechaUM,
				'marca_ascensor' => $marca,
				'id_uso' => $idUso,
				'capacidad_personas' => $capacidad,
				'capacidad_kg' => $capacidadKG,
				'id_suspension' => $idSuspension,
				'sala_maquinas' => $salaMaquina,
				'velocidad' => $velocidad,
				'recorrido' => $recorrido,
				'paradas' => $paradas,
				'id_tipo_traccion' => $idTipoTraccion,
				'cantidad' => $cantidad,
				'diametro_traccion' => $diamTraccion,
				'enclavamiento_electrico' => $enclavamientoE,
				'enclavamiento_mecanico' => $enclavamientoM,
				'diametro_cable' => $diamCableL,
				'es_temporal' => $es_temporal,
				'id_usuario' => $id_usuario
			);

			if ($idInspeccion && !is_null($idInspeccion)) {
				$inspeccion = $this->db->get_where('inspecciones', array('id' => $idInspeccion))->result();
				if (sizeof($inspeccion) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idInspeccion);
					$this->db->update('inspecciones', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_inspeccion'] = $idInspeccion;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Inspeccion.";
					}else{
						$respuesta['id_inspeccion'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La Inspeccion no existe.";
				}
			}else{
				$this->db->insert('inspecciones', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion = $this->db->insert_id();
					$respuesta['id_inspeccion'] = $id_inspeccion;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Inspeccion.";
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion'] = -1;
		}
		return $respuesta;
	}

	public function agregarInspeccionTemporal($idInspeccion, $id_elemento, $valor_elemento, $valor_campo, $id_usuario, $es_temporal = 0, $es_reinspeccion = false){
		try{
			$this->db->db_debug = FALSE;
			$id_edificio = null;
			#var_dump($es_reinspeccion);var_dump($idInspeccion);exit();
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion' => null);

			if ($id_elemento == 'inputNombreE' || $id_elemento == 'inputDireccionE' || $id_elemento == 'inputRutE' || $id_elemento == 'inputIdE') {
				if (!is_null($idInspeccion) && $idInspeccion > 0 ) {
					$this->db->select('e.id, e.rol, e.orden, e.nombre, e.rut, e.domicilio, e.observaciones, e.id_usuario, e.id_empresa, e.id_estado, e.created_at, e.updated_at');
					$this->db->from('inspecciones i');
					$this->db->join('edificios e', 'i.id_edificio = e.id');
					$this->db->where('i.id', $idInspeccion);
					$this->db->where('i.id_estado', 1);
					$this->db->where('e.id_estado', 1);
					$edificio_inspeccion = $this->db->get()->result_array();
					if (isset($edificio_inspeccion) && sizeof($edificio_inspeccion) > 0 && isset($edificio_inspeccion[0]["id"])) {
						$dataE = array(
					        $valor_campo => $valor_elemento,
							'id_usuario' => $id_usuario
						);

						$id_edificio = $edificio_inspeccion[0]["id"];
						$this->db->set('updated_at', 'NOW()', FALSE);
						$this->db->where('id', $id_edificio);
						$this->db->update('edificios', $dataE);

						if ($this->db->affected_rows() >= 1){
							$respuesta['id_inspeccion'] = $idInspeccion;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = "Se ha actualizado correctamente la Inspeccion.";
						}else{
							$respuesta['id_inspeccion'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = $this->db->error();
						}
					}else{
						$dataE = array(
					        $valor_campo => $valor_elemento,
							'id_usuario' => $id_usuario
						);
						
						try{
						    $this->db->insert('edificios', $dataE);
							if ($this->db->affected_rows() >= 1){
								$id_edificio = $this->db->insert_id();

								$data = array(
							        'id_edificio' => $id_edificio,
									'es_temporal' => $es_temporal,
									'id_usuario' => $id_usuario
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $idInspeccion);
								$this->db->update('inspecciones', $data);

								if ($this->db->affected_rows() >= 1) {
									$respuesta['id_inspeccion'] = $idInspeccion;
									$respuesta['resultado'] = $this->db->affected_rows();
									$respuesta['mensaje'] = "Se ha actualizado correctamente la Inspeccion.";
								}else{
									$respuesta['id_inspeccion'] = -1;
									$respuesta['resultado'] = $this->db->affected_rows();
									$respuesta['mensaje'] = $this->db->error();
								}

							}else{
								$respuesta['id_inspeccion'] = -1;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = $this->db->error();
							}
						}catch(Exception $e){
							$respuesta['id_inspeccion'] = -1;
						    $respuesta['mensaje'] = $e;
						    $respuesta['data'] = $dataE;
						}
					}
				}else{
					$dataE = array(
				        $valor_campo => $valor_elemento,
						'id_usuario' => $id_usuario
					);
					
					try{
					    $this->db->insert('edificios', $dataE);
						if ($this->db->affected_rows() >= 1){
							$id_edificio = $this->db->insert_id();

							$data = array(
						        'id_edificio' => $id_edificio,
								'es_temporal' => $es_temporal,
								'id_usuario' => $id_usuario
							);

							if ($es_reinspeccion) {
								$this->db->set('reinspeccion', 'TRUE', FALSE);
							}

							$this->db->insert('inspecciones', $data);
							if ($this->db->affected_rows() >= 1) {
								$id_inspeccion = $this->db->insert_id();
								$respuesta['id_inspeccion'] = $id_inspeccion;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = "Se ha insertado correctamente la Inspeccion.";
							}else{
								$respuesta['id_inspeccion'] = -1;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = $this->db->error();
							}
						}else{
							$respuesta['id_inspeccion'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = $this->db->error();
						}
					}
					catch(Exception $e){
						$respuesta['id_inspeccion'] = -1;
					    $respuesta['mensaje'] = $e;
					    $respuesta['data'] = $dataE;
					}
				}
			}elseif ($id_elemento == 'idNorma') {
				if (!is_null($idInspeccion) && $idInspeccion > 0 ) {
					$this->db->select('ic.id, ic.id_inspeccion, ic.id_norma, ic.id_checklist, ic.orden, ic.id_estado, ic.created_at, ic.updated_at');
					$this->db->from('inspecciones i');
					$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion');
					$this->db->where('i.id', $idInspeccion);
					$this->db->where('i.id_estado', 1);
					$this->db->where('ic.id_estado', 1);
					$inspeccion_checklist = $this->db->get()->result_array();
					if (isset($inspeccion_checklist) && sizeof($inspeccion_checklist) > 0 && isset($inspeccion_checklist[0]["id"])) {

						$dataE = array(
					        $valor_campo => $valor_elemento,
					        'id_inspeccion' => $idInspeccion,
					        'orden' => 1
						);

						$id_inspeccion_checklist = $inspeccion_checklist[0]["id"];
						$this->db->set('updated_at', 'NOW()', FALSE);
						$this->db->where('id', $id_inspeccion_checklist);
						$this->db->update('inspecciones_checklists', $dataE);

						if ($this->db->affected_rows() >= 1){
							$respuesta['id_inspeccion'] = $idInspeccion;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = "Se ha actualizado correctamente la Inspeccion.";

							$this->db->select('icr.id, icr.id_inspecciones_checklists, icr.id_categoria, icr.id_pregunta, icr.respuesta, icr.observaciones, icr.orden, icr.id_respuesta, icr.id_estado, icr.created_at, icr.updated_at');
							$this->db->from('inspecciones_checklists_respuestas icr');
							$this->db->where('icr.id_inspecciones_checklists', $id_inspeccion_checklist);
							$this->db->where('icr.id_estado', 1);
							$respuestas_checklists = $this->db->get()->result_array();

							if (sizeof($respuestas_checklists) > 0 && isset($respuestas_checklists)) {
								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id_inspecciones_checklists', $id_inspeccion_checklist);
							    $this->db->where('id_estado', 1);
								$this->db->update('inspecciones_checklists_respuestas', array('id_estado' => -1));

							    if ($this->db->affected_rows() >= 1) {
									$respuesta['mensaje'] = $respuesta['mensaje']." Se han eliminado correctamente las respuestas del Checklist a la Inspeccion.";
								}else{
									$respuesta['mensaje'] = $this->db->error();
								}
							}
						}else{
							$respuesta['id_inspeccion'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = $this->db->error();
						}
					}else{
						$dataE = array(
					        $valor_campo => $valor_elemento,
					        'id_inspeccion' => $idInspeccion,
					        'orden' => 1
						);
						
						try{
						    $this->db->insert('inspecciones_checklists', $dataE);
							if ($this->db->affected_rows() >= 1){
								$id_edificio = $this->db->insert_id();
								$respuesta['id_inspeccion'] = $idInspeccion;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = "Se ha actualizado correctamente la Inspeccion.";
							}else{
								$respuesta['id_inspeccion'] = -1;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = $this->db->error();
							}
						}catch(Exception $e){
							$respuesta['id_inspeccion'] = -1;
						    $respuesta['mensaje'] = $e;
						    $respuesta['data'] = $dataE;
						}
					}
				}else{

					$dataE = array(
				        //$valor_campo => $valor_elemento,
				        'es_temporal' => $es_temporal,
				        'sala_maquinas' => 1,
						'id_usuario' => $id_usuario
					);
					
					try{
					    $this->db->insert('inspecciones', $dataE);
						if ($this->db->affected_rows() >= 1){
							$idInspeccion = $this->db->insert_id();

							$data = array(
						         $valor_campo => $valor_elemento,
					        	'id_inspeccion' => $idInspeccion,
								'orden' => 1
							);

							$this->db->insert('inspecciones_checklists', $data);
							if ($this->db->affected_rows() >= 1) {
								#$id_inspeccion = $this->db->insert_id();
								$respuesta['id_inspeccion'] = $idInspeccion;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = "Se ha insertado correctamente el Checklist a la Inspeccion.";
							}else{
								$respuesta['id_inspeccion'] = -1;
								$respuesta['resultado'] = $this->db->affected_rows();
								$respuesta['mensaje'] = $this->db->error();
							}
						}else{
							$respuesta['id_inspeccion'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = $this->db->error();
						}
					}
					catch(Exception $e){
						$respuesta['id_inspeccion'] = -1;
					    $respuesta['mensaje'] = $e;
					    $respuesta['data'] = $dataE;
					}
				}
			}else{
				$data = null;
				if (!is_null($valor_campo) && strlen($valor_campo) > 0 && trim($valor_campo) != "") {

					if ($valor_elemento == -1)
						$valor_elemento = null;

					$data = array(
				        $valor_campo => $valor_elemento,
						'es_temporal' => $es_temporal,
						'id_usuario' => $id_usuario
					);
				}else{
					$data = array(
						'es_temporal' => $es_temporal,
						'id_usuario' => $id_usuario
					);
				}

				if ($idInspeccion && !is_null($idInspeccion)) {
					$inspeccion = $this->db->get_where('inspecciones', array('id' => $idInspeccion))->result();
					if (sizeof($inspeccion) > 0 && !is_null($valor_campo) && strlen($valor_campo) > 0 && trim($valor_campo) != "") {
						$this->db->set('updated_at', 'NOW()', FALSE);
						if ($es_reinspeccion) {
							$this->db->set('reinspeccion', 'TRUE', FALSE);
						}
						$this->db->where('id', $idInspeccion);
						$this->db->update('inspecciones', $data);

						if ($this->db->affected_rows() >= 1) {
							$respuesta['id_inspeccion'] = $idInspeccion;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = "Se ha actualizado correctamente la Inspeccion.";
						}else{
							$respuesta['id_inspeccion'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = $this->db->error();
						}
					}else{
						#var_dump(sizeof($inspeccion));

						if (sizeof($inspeccion) > 0) {
							$respuesta['id_inspeccion'] = $idInspeccion;
							$respuesta['resultado'] = 1;
							$respuesta['mensaje'] = "La inspeccion no requiere cambios.";
						}else{
							$respuesta['id_inspeccion'] = -1;
							$respuesta['resultado'] = -1;
							$respuesta['mensaje'] = "La Inspeccion no existe.";
						}
						
					}
				}else{
					$this->db->set('sala_maquinas', 1);
					if ($es_reinspeccion) {
						$this->db->set('reinspeccion', 'TRUE', FALSE);
					}
					$this->db->insert('inspecciones', $data);
					if ($this->db->affected_rows() >= 1) {
						$id_inspeccion = $this->db->insert_id();
						$respuesta['id_inspeccion'] = $id_inspeccion;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha insertado correctamente la Inspeccion.";
					}else{
						$respuesta['id_inspeccion'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}	
				}
			}

		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion'] = -1;
		}
		return $respuesta;
	}

	public function agregarCarpetaInspeccion($id_carpeta, $respuesta_carpeta, $orden, $idInspeccion){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_carpeta' => null);

			$id_inspeccion_carpeta = null;
			$data = array(
		        'id_inspeccion' => $idInspeccion,
				'id_carpeta' => $id_carpeta,
				'respuesta' => $respuesta_carpeta,
				'orden' => $orden
			);

			$carpeta = $this->db->get_where('inspecciones_carpetas', array('id_inspeccion' => $idInspeccion, 'id_carpeta' => $id_carpeta, 'id_estado' => 1))->result();
			if (sizeof($carpeta) > 0) {
				$id_inspeccion_carpeta = $carpeta[0]->id;

				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $id_inspeccion_carpeta);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_carpetas', $data);


				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_carpeta = $this->db->insert_id();
					$respuesta['id_inspeccion_carpeta'] = $id_inspeccion_carpeta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la respuesta de Carpeta a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_carpeta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
				
			}else{
				$this->db->insert('inspecciones_carpetas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_carpeta = $this->db->insert_id();
					$respuesta['id_inspeccion_carpeta'] = $id_inspeccion_carpeta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la respuesta de Carpeta a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_carpeta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}

			
			
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion_carpeta'] = -1;
		}
		return $respuesta;
	}

	public function agregarHerramientaInspeccion($id_herramienta, $respuesta_herramienta, $orden, $idInspeccion){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_herramienta' => null);

			$id_inspeccion_herramienta = null;

			$data = array(
		        'id_inspeccion' => $idInspeccion,
				'id_herramienta' => $id_herramienta,
				'respuesta' => $respuesta_herramienta,
				'orden' => $orden
			);


			$herramienta = $this->db->get_where('inspecciones_herramientas', array('id_inspeccion' => $idInspeccion, 'id_herramienta' => $id_herramienta, 'id_estado' => 1))->result();
			if (sizeof($herramienta) > 0) {
				$id_inspeccion_herramienta = $herramienta[0]->id;

				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $id_inspeccion_herramienta);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_herramientas', $data);


				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_herramienta = $this->db->insert_id();
					$respuesta['id_inspeccion_herramienta'] = $id_inspeccion_herramienta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la respuesta de Herramienta a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_herramienta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
				
			}else{
				$this->db->insert('inspecciones_herramientas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_herramienta = $this->db->insert_id();
					$respuesta['id_inspeccion_herramienta'] = $id_inspeccion_herramienta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la respuesta de Herramienta a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_herramienta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion_herramienta'] = -1;
		}
		return $respuesta;
	}

	public function agregarNormaInspeccion($id_norma, $respuesta_herramienta, $orden, $idInspeccion){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_norma' => null);

			$id_inspeccion_norma = null;

			$data = array(
		        'id_inspeccion' => $idInspeccion,
				'id_norma' => $id_norma,
				'respuesta' => $respuesta_herramienta,
				'orden' => $orden
			);

			$norma = $this->db->get_where('inspecciones_normas', array('id_inspeccion' => $idInspeccion, 'id_norma' => $id_norma, 'id_estado' => 1))->result();
			if (sizeof($norma) > 0) {
				$id_inspeccion_norma = $norma[0]->id;

				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $id_inspeccion_norma);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_normas', $data);


				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_norma = $this->db->insert_id();
					$respuesta['id_inspeccion_norma'] = $id_inspeccion_norma;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la respuesta de Norma a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
				
			}else{
				$this->db->insert('inspecciones_normas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_norma = $this->db->insert_id();
					$respuesta['id_inspeccion_norma'] = $id_inspeccion_norma;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la respuesta de Norma a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion_norma'] = -1;
		}
		return $respuesta;
	}

	public function agregarInspeccionChecklist($id_norma, $orden_checklist, $idInspeccion){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_checklist' => null);

			$id_inspeccion_checklist = null;

			$data = array(
		        'id_inspeccion' => $idInspeccion,
				'id_norma' => $id_norma,
				'orden' => $orden_checklist
			);

			$inspecciones_checklist = $this->db->get_where('inspecciones_checklists', array('id_inspeccion' => $idInspeccion, 'id_norma' => $id_norma, 'id_estado' => 1))->result();
			if (sizeof($inspecciones_checklist) > 0) {
				$id_inspeccion_checklist = $inspecciones_checklist[0]->id;

				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $id_inspeccion_checklist);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_checklists', $data);


				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_checklist = $this->db->insert_id();
					$respuesta['id_inspeccion_checklist'] = $id_inspeccion_checklist;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente el CheckList a la Inspeccion.";

					
					$this->db->select('icr.id, icr.id_inspecciones_checklists, icr.id_categoria, icr.id_pregunta, icr.respuesta, icr.observaciones, icr.orden, icr.id_respuesta, icr.id_estado, icr.created_at, icr.updated_at');
					$this->db->from('inspecciones_checklists_respuestas icr');
					$this->db->where('icr.id_inspecciones_checklists', $id_inspeccion_checklist);
					$this->db->where('icr.id_estado', 1);
					$respuestas_checklists = $this->db->get()->result_array();

					if (sizeof($respuestas_checklists) > 0 && isset($respuestas_checklists) && isset($respuestas_checklists[0]["id_checklist"])) {
						$this->db->set('updated_at', 'NOW()', FALSE);
						$this->db->where('id_inspecciones_checklists', $id_inspeccion_checklist);
					    $this->db->where('id_estado', 1);
						$this->db->update('inspecciones_checklists_respuestas', array('id_estado' => -1));

					    if ($this->db->affected_rows() >= 1) {
							$respuesta['mensaje'] = $respuesta['mensaje']." Se han eliminado correctamente las respuestas del Checklist a la Inspeccion.";
						}else{
							$respuesta['mensaje'] = $this->db->error();
						}
					}
				}else{
					$respuesta['id_inspeccion_checklist'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
				
			}else{
				$this->db->insert('inspecciones_checklists', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_checklist = $this->db->insert_id();
					$respuesta['id_inspeccion_checklist'] = $id_inspeccion_checklist;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el CheckList a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_checklist'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion_checklist'] = -1;
		}
		return $respuesta;
	}

	public function agregarRespuestaCheck($id_categoria, $id_pregunta, $respuesta_check, $observacion, $orden, $id_respuesta, $id_inspecciones_checklists, $id_usuario){
		try{
			$this->db->db_debug = FALSE;
			$idRespuesta = null;
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_checklist_resp' => null);

			$id_inspeccion_checklist_resp = null;

			if ($respuesta_check === 2) {
				if (isset($id_respuesta) && !is_null($id_respuesta) && strlen(trim($id_respuesta)) > 0) {
					$respuestas = $this->db->get_where('respuestas', array('id' => $id_respuesta, 'id_estado' => 1))->result();
					if (sizeof($respuestas) > 0) {
						$idRespuesta = $id_respuesta;
					}else{
						$respuesta['resultado'] = -1;
					    $respuesta['mensaje'] = 'La respuesta que intenta ingresar no se encuentra registrada.';
					    $respuesta['id_inspeccion_checklist_resp'] = -1;
					    exit;
					}
				}else{
					if (isset($observacion) && !is_null($observacion) && strlen(trim($observacion)) > 0) {

						$respuestas = $this->db->get_where('respuestas', array('id_pregunta' => $id_pregunta, 'id_estado' => 1))->result();
						$orden_respuesta = (sizeof($respuestas) + 1);

						$data_respuesta = array(
							'orden' => $orden_respuesta,
							'nombre' => trim($observacion),
							'observaciones' => ($observacion),
							'id_pregunta' => $id_pregunta,
							'id_usuario' => $id_usuario
						);

						$this->db->insert('respuestas', $data_respuesta);
						if ($this->db->affected_rows() >= 1) {
							$idRespuesta = $this->db->insert_id();
						}else{
							$respuesta['resultado'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
						    $respuesta['mensaje'] = $this->db->error();
						    $respuesta['id_inspeccion_checklist_resp'] = -1;
						    exit;
						}
					}
				}
			}

			$data = array(
		        'id_inspecciones_checklists' => $id_inspecciones_checklists,
				'id_categoria' => $id_categoria,
				'id_pregunta' => $id_pregunta,
				'respuesta' => $respuesta_check,
				'id_respuesta' => $idRespuesta,
				'orden' => $orden
			);
			
			$this->db->insert('inspecciones_checklists_respuestas', $data);
			if ($this->db->affected_rows() >= 1) {
				$id_inspeccion_checklist_resp = $this->db->insert_id();
				$respuesta['id_inspeccion_checklist_resp'] = $id_inspeccion_checklist_resp;
				$respuesta['resultado'] = $this->db->affected_rows();
				$respuesta['mensaje'] = "Se ha insertado correctamente la respuesta del CheckList a la Inspeccion.";
			}else{
				$respuesta['id_inspeccion_checklist_resp'] = -1;
				$respuesta['resultado'] = $this->db->affected_rows();
				$respuesta['mensaje'] = $this->db->error();
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion_checklist_resp'] = -1;
		}
		return $respuesta;
	}


	public function agregarRespuestaCheckTemporal($id_categoria, $id_pregunta, $respuesta_check, $observacion, $orden, $id_respuesta, $id_inspeccion, $id_usuario, $solo_respuesta = false, $solo_observacion = false, $solo_severidad = false){
		try{
			$this->db->db_debug = FALSE;
			$idRespuesta = null;
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_checklist_resp' => null);

			$id_inspeccion_checklist_resp = null;
			$id_inspeccion_checklist = null;

			$this->db->select('ic.id, ic.id_inspeccion, ic.id_norma, ic.id_checklist, ic.orden, ic.id_estado, ic.created_at, ic.updated_at');
			$this->db->from('inspecciones i');
			$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion');
			$this->db->where('i.id', $id_inspeccion);
			$this->db->where('i.id_estado', 1);
			$this->db->where('ic.id_estado', 1);
			$inspeccion_checklist = $this->db->get()->result_array();
			#var_dump($inspeccion_checklist);

			if (sizeof($inspeccion_checklist) > 0){
				$id_inspeccion_checklist = $inspeccion_checklist[0]["id"];
			}/*else{

				$inspeccion = $this->db->get_where('inspecciones', array('id' => $id_inspeccion, 'id_estado' => 1))->result();

				if (sizeof($inspeccion) > 0) {
					$id_norma = $inspeccion[0]->
				}

				$data_inspeccion_checklist = array(
					'orden' => $orden_respuesta,
					'nombre' => trim($observacion),
					'observaciones' => ($observacion),
					'id_pregunta' => $id_pregunta,
					'id_usuario' => $id_usuario
				);

				$this->db->insert('respuestas', $data_respuesta);
				if ($this->db->affected_rows() >= 1) {
					$idRespuesta = $this->db->insert_id();
				}else{
					$respuesta['resultado'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
				    $respuesta['mensaje'] = $this->db->error();
				    $respuesta['id_inspeccion_checklist_resp'] = -1;
				    exit;
				}
			}*/

			/*if ($respuesta_check === 2) {
				if (isset($id_respuesta) && !is_null($id_respuesta) && strlen(trim($id_respuesta)) > 0) {
					$respuestas = $this->db->get_where('respuestas', array('id' => $id_respuesta, 'id_estado' => 1))->result();
					if (sizeof($respuestas) > 0) {
						$idRespuesta = $id_respuesta;
					}else{
						$respuesta['resultado'] = -1;
					    $respuesta['mensaje'] = 'La respuesta que intenta ingresar no se encuentra registrada.';
					    $respuesta['id_inspeccion_checklist_resp'] = -1;
					    exit;
					}
				}else{
					if (isset($observacion) && !is_null($observacion) && strlen(trim($observacion)) > 0) {

						$respuestas = $this->db->get_where('respuestas', array('id_pregunta' => $id_pregunta, 'id_estado' => 1))->result();
						$orden_respuesta = (sizeof($respuestas) + 1);

						$data_respuesta = array(
							'orden' => $orden_respuesta,
							'nombre' => trim($observacion),
							'observaciones' => ($observacion),
							'id_pregunta' => $id_pregunta,
							'id_usuario' => $id_usuario
						);

						$this->db->insert('respuestas', $data_respuesta);
						if ($this->db->affected_rows() >= 1) {
							$idRespuesta = $this->db->insert_id();
						}else{
							$respuesta['resultado'] = -1;
							$respuesta['resultado'] = $this->db->affected_rows();
						    $respuesta['mensaje'] = $this->db->error();
						    $respuesta['id_inspeccion_checklist_resp'] = -1;
						    exit;
						}
					}
				}
			}*/

			$data = array(
		        'id_inspecciones_checklists' => $id_inspeccion_checklist,
				'id_categoria' => $id_categoria,
				'id_pregunta' => $id_pregunta,
				'respuesta' => $respuesta_check,
				'id_respuesta' => $id_respuesta,
				'observaciones' => $observacion,
				'orden' => $orden
			);


			$inspecciones_checklist_resp = $this->db->get_where('inspecciones_checklists_respuestas', array('id_inspecciones_checklists' => $id_inspeccion_checklist, 'id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'id_estado' => 1))->result();
			if (sizeof($inspecciones_checklist_resp) > 0) {
				$id_inspeccion_checklist_resp = $inspecciones_checklist_resp[0]->id;


				if ($solo_respuesta) {
					$data = array(
				        'id_inspecciones_checklists' => $id_inspeccion_checklist,
						'id_respuesta' => $id_respuesta,
						'observaciones' => $observacion
					);
				}elseif ($solo_observacion) {
					$orden_respuesta = null;
					$respuestas_pregunta = $this->db->get_where('respuestas', array('id_pregunta' => $id_pregunta, 'id_estado' => 1))->result();
					$orden_respuesta = (sizeof($respuestas_pregunta) + 1);
					$data_respuesta = array(
						'orden' => $orden_respuesta,
						'nombre' => $observacion,
						'observaciones' => $observacion,
						'id_pregunta' => $id_pregunta,
						'id_usuario' => $id_usuario
					);

					$this->db->insert('respuestas', $data_respuesta);
					if ($this->db->affected_rows() >= 1) {
						$idRespuesta = $this->db->insert_id();
						$respuesta['id_respuesta'] = $idRespuesta;
						$respuesta['respuesta'] = $observacion;
						$data = array(
					        'id_inspecciones_checklists' => $id_inspeccion_checklist,
							'id_respuesta' => $idRespuesta,
							'observaciones' => $observacion
						);
					}else{
						$respuesta['resultado'] = -1;
					    $respuesta['mensaje'] = $this->db->error();
					    $respuesta['id_inspeccion_checklist_resp'] = -1;
					}
				}elseif ($solo_severidad) {
					$data = array(
				        #'id_inspecciones_checklists' => $id_inspeccion_checklist,
						'id_severidad_respuesta' => $id_respuesta
					);
				}

				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $id_inspeccion_checklist_resp);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_checklists_respuestas', $data);


				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_checklist_resp = $this->db->insert_id();
					$respuesta['id_inspeccion_checklist_resp'] = $id_inspeccion_checklist_resp;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la respuesta de CheckList a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_checklist_resp'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
				
			}else{
				$this->db->insert('inspecciones_checklists_respuestas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_checklist_resp = $this->db->insert_id();
					$respuesta['id_inspeccion_checklist_resp'] = $id_inspeccion_checklist_resp;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la respuesta del CheckList a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_checklist_resp'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}			
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion_checklist_resp'] = -1;
		}
		return $respuesta;
	}

	public function agregarObservacionCheck($id_categoria, $observacion, $orden, $id_inspecciones_checklists, $id_usuario, $archivo_id = null){
		try{
			$this->db->db_debug = FALSE;
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_checklist_obs' => null);

			$id_inspeccion_checklist_obs = null;


			if (isset($archivo_id) && is_numeric($archivo_id) && $archivo_id > 0){
				$archivo_existente = $this->db->get_where('archivos', array('id' => $archivo_id, 'id_estado' => 1))->result();
				if (sizeof($archivo_existente) > 0) {
					$id_inspecciones_checklists_obs = $archivo_existente[0]->inspeccion_checklist_obs_id;
					
					$data = array(
				        'id_inspecciones_checklists' => $id_inspecciones_checklists,
						'orden' => $orden
					);

					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $id_inspecciones_checklists_obs);
				    $this->db->where('id_estado', 1);
					$this->db->update('inspecciones_checklists_obs', $data);


					if ($this->db->affected_rows() >= 1) {
						$id_inspeccion_checklist_obs = $this->db->insert_id();
						$respuesta['id_inspeccion_checklist_obs'] = $id_inspecciones_checklists_obs;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Observacion del CheckList a la Inspeccion.";
					}else{
						$respuesta['id_inspeccion_checklist_obs'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_inspeccion_checklist_obs'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "El archivo no se encuentra registrado.";
				}
			}else{
				$data = array(
			        'id_inspecciones_checklists' => $id_inspecciones_checklists,
					'id_categoria' => $id_categoria,
					'observaciones' => $observacion,
					'orden' => $orden
				);
				
				$this->db->insert('inspecciones_checklists_obs', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_inspeccion_checklist_obs = $this->db->insert_id();
					$respuesta['id_inspeccion_checklist_obs'] = $id_inspeccion_checklist_obs;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Observacion del CheckList a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_checklist_obs'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_inspeccion_checklist_obs'] = -1;
		}
		return $respuesta;
	}


	public function agregarArchivo($file_name, $file_type, $file_path, $full_path, $raw_name, $orig_name, $client_name, $file_ext, $file_size, $is_image, $image_width, $image_height, $image_type, $image_size_str, $id_inspeccion_checklist_resp, $id_categoria, $id_pregunta, $orden, $id_usuario, $id_inspeccion_checklist_obs = null){
		$respuesta = array('resultado' => null, 
			'mensaje' => null,
			'id_archivo' => null);
		$data = array(
	        'client_name' => $client_name,
			'file_ext' => $file_ext,
			'file_name' => $file_name,
			'file_path' => $file_path,
			'file_size' => $file_size,
			'file_type' => $file_type,
			'full_path' => $full_path,
			'image_height' => $image_height,
			'image_size_str' => $image_size_str,
			'image_type' => $image_type,
			'image_width' => $image_width,
			'is_image' => $is_image,
			'orig_name' => $orig_name,
			'raw_name' => $raw_name,
			'id_usuario' => $id_usuario,
			'inspeccion_checklist_resp_id' => $id_inspeccion_checklist_resp,
			'id_categoria' => $id_categoria,
			'id_pregunta' => $id_pregunta,
			'inspeccion_checklist_obs_id' => $id_inspeccion_checklist_obs,
			'orden' => $orden
		);
		$this->db->insert('archivos', $data);

		if ($this->db->affected_rows() >= 1) {
			$respuesta['id_archivo'] = $this->db->insert_id();
			$respuesta['resultado'] = $this->db->affected_rows();
			$respuesta['mensaje'] = "Se ha insertado correctamente el archivo.";
		}else{
			$respuesta['id_archivo'] = -1;
			$respuesta['resultado'] = $this->db->affected_rows();
			$respuesta['mensaje'] = $this->db->error();
		}
		return $respuesta;
	}

	public function agregarArchivoExistente($idInspeccion, $id_inspeccion_checklist_bk, $archivo_id, $id_categoria, $id_pregunta, $orden, $id_usuario, $inspeccion_checklist_resp_id){
		$respuesta = array('resultado' => null, 
			'mensaje' => null,
			'id_archivo' => null);

		
		$this->db->select('icr.id, icr.id_inspecciones_checklists, icr.id_categoria, icr.id_pregunta, icr.id_pregunta, icr.respuesta, icr.observaciones, icr.orden, icr.id_respuesta, icr.id_estado, icr.created_at, icr.updated_at, a.id as archivo_id, 
		a.file_name, a.file_type, a.file_path, a.full_path, a.raw_name, a.orig_name, a.client_name, a.file_ext, a.file_size, a.is_image, a.image_width, a.image_height, a.image_type, a.image_size_str, a.id_estado as id_estado_a, 
        a.inspeccion_checklist_resp_id, a.inspeccion_checklist_obs_id, a.id_categoria as id_categoria_a, a.id_pregunta as id_pregunta_a, a.orden as orden_a, a.id_usuario as id_usuario_a, a.create_at as create_at_a, a.updated_at as updated_at_a');
		$this->db->from('inspecciones i');
		$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion');
		$this->db->join('inspecciones_checklists_respuestas icr', 'ic.id = icr.id_inspecciones_checklists');
		$this->db->join('archivos a', 'icr.id = a.inspeccion_checklist_resp_id');
		$this->db->where('i.id', $idInspeccion);
		$this->db->where('ic.id', $id_inspeccion_checklist_bk);
		$this->db->where('i.id_estado', 1);
		$this->db->where('ic.id_estado', -1);
		$this->db->where('icr.id_estado', -1);
		$this->db->where('a.id', $archivo_id);
		$this->db->where('icr.id_categoria', $id_categoria);
		$this->db->where('icr.id_pregunta', $id_pregunta);
		$archivo_existente = $this->db->get()->result_array();

		#var_dump($archivo_existente);

		if (sizeof($archivo_existente) > 0) {
			
			$data = array(
		        'inspeccion_checklist_resp_id' => $inspeccion_checklist_resp_id,
				'id_usuario' => $id_usuario,
				'orden' => $orden
			);
			

			$this->db->set('updated_at', 'NOW()', FALSE);
			$this->db->where('id', $archivo_id);
		    $this->db->where('id_estado', 1);
			$this->db->update('archivos', $data);

			if ($this->db->affected_rows() >= 1) {
				$respuesta['id_archivo'] = $archivo_id;
				$respuesta['resultado'] = $this->db->affected_rows();
				$respuesta['mensaje'] = "Se ha actualizado correctamente el archivo.";
			}else{
				$respuesta['id_archivo'] = -1;
				$respuesta['resultado'] = $this->db->affected_rows();
				$respuesta['mensaje'] = $this->db->error();
			}
		}else{
			$respuesta['id_archivo'] = -1;
			$respuesta['resultado'] = -1;
			$respuesta['mensaje'] = "El archivo no se ha encontrado.";
		}

		#$archivo_existente = $this->db->get_where('archivos', array('id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'id_estado' => 1))->result();
		
		return $respuesta;
	}


	public function eliminarRespuestasChecklistInspeccion($idInspeccion, $id_usuario){
		try{
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspecciones_checklists' => null
					  );
			$id_inspecciones_checklists = null;
			$this->db->select('ic.id as id_checklist, icr.id, icr.id_inspecciones_checklists, icr.id_categoria, icr.id_pregunta, icr.respuesta, icr.observaciones, icr.orden, icr.id_respuesta, icr.id_estado, icr.created_at, icr.updated_at');
			$this->db->from('inspecciones i');
			$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion');
			$this->db->join('inspecciones_checklists_respuestas icr', 'ic.id = icr.id_inspecciones_checklists');
			$this->db->where('i.id', $idInspeccion);
			$this->db->where('i.id_estado', 1);
			$this->db->where('ic.id_estado', 1);
			$this->db->where('icr.id_estado', 1);
			$respuestas_checklists = $this->db->get()->result_array();

			if (sizeof($respuestas_checklists) > 0 && isset($respuestas_checklists) && isset($respuestas_checklists[0]["id_checklist"])) {
				$id_inspecciones_checklists = (int)$respuestas_checklists[0]["id_checklist"];

				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id_inspecciones_checklists', $id_inspecciones_checklists);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_checklists_respuestas', array('id_estado' => -1));

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspecciones_checklists'] = $id_inspecciones_checklists;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se han eliminado correctamente las respuestas del Checklist a la Inspeccion.";
				}else{
					$respuesta['id_inspecciones_checklists'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_inspecciones_checklists'] = $id_inspecciones_checklists;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "La Inspeccion no posee respuestas del Checklist Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspecciones_checklists'] = -1;
		}
		return $respuesta;
	}

	public function eliminarInspeccion($idInspeccion, $id_usuario)
	{
		try{
			$inspeccion = $this->db->get_where('inspecciones', array('id' => $idInspeccion, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($inspeccion) > 0) {

				$data3 = array(
			        'id_estado' => -1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idInspeccion);
			    $this->db->update('inspecciones', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspeccion'] = $idInspeccion;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente la Norma.";
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion'] = -1;
		}
		return $respuesta;
	}

	
	public function obtenerNombreArchivo($idInspeccion, $id_categoria, $id_pregunta, $id_usuario)
	{
		$this->db->select('icr.id, icr.id_inspecciones_checklists, icr.id_categoria, icr.id_pregunta, icr.respuesta, icr.observaciones, icr.orden, icr.id_respuesta, icr.id_estado, icr.created_at, icr.updated_at');
		$this->db->from('inspecciones i');
		$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion');
		$this->db->join('inspecciones_checklists_respuestas icr', 'ic.id = icr.id_inspecciones_checklists');
		$this->db->where('i.id', $idInspeccion);
		$this->db->where('icr.id_categoria', $id_categoria);
		$this->db->where('icr.id_pregunta', $id_pregunta);
		$this->db->where('i.id_estado', 1);
		$this->db->where('ic.id_estado', 1);
		$this->db->where('icr.id_estado', 1);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerNombreArchivoObs($idInspeccion, $id_categoria, $id_usuario)
	{
		$this->db->select('ic.id, ic.id_inspeccion, ic.id_norma, ic.orden, ic.id_estado, ic.created_at, ic.updated_at');
		$this->db->from('inspecciones i');
		$this->db->join('inspecciones_checklists ic', 'i.id = ic.id_inspeccion');
		$this->db->where('i.id', $idInspeccion);
		$this->db->where('i.id_estado', 1);
		$this->db->where('ic.id_estado', 1);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerOrdenNorma($id_norma, $id_usuario)
	{
		$this->db->select('cr.id, cr.codigo, cr.nombre, cr.observaciones, cr.iniciales, cr.orden, cr.id_estado, cr.created_at, cr.updated_at, cr.id_usuario, cr.id_norma');
		$this->db->from('categoria_reporte cr');
		$this->db->where('cr.id_norma', $id_norma);
		$this->db->where('cr.id_estado', 1);
		$this->db->order_by('cr.orden');
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

	public function obtenerSeveridadRespuestas($id_usuario)
	{
		$this->db->select('sr.id, sr.nombre, sr.observaciones, sr.orden, sr.id_estado, sr.created_at, sr.updated_at, sr.id_usuario');
		$this->db->from('severidad_respuesta sr');
		$this->db->where('sr.id_estado', 1);
		$this->db->order_by('sr.orden');
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
	}

}