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
	$this->db->select('i.id, i.id_edificio, i.nombre_tecnico, i.rut_admin, i.nombre_admin, i.email_admin, i.fecha_contrato_mant, i.contrato_vigente, i.id_empresa_mantenedora, i.nombre_mant_2, i.fecha_ultima_mant, i.marca_ascensor, i.id_uso, i.capacidad_personas, i.capacidad_kg, i.id_suspension, i.sala_maquinas, i.velocidad, i.recorrido, i.paradas, i.id_tipo_traccion, i.cantidad, i.diametro_traccion, i.enclavamiento_electrico, i.enclavamiento_mecanico, i.diametro_cable, i.id_estado, i.id_usuario, i.created_at, i.updated_at, e.rol, e.nombre as edificio, e.rut as rut_e, e.domicilio, em.cod_empresa, em.razon_social, em.num_registro, em.direccion as direccion_em, em.rut as rut_em, em.email as email_em, em.observaciones as observaciones_em');
		$this->db->from('inspecciones i');
		$this->db->join('edificios e', 'i.id_edificio = e.id', 'LEFT');
		$this->db->join('empresas_mantenedoras em', 'i.id_empresa_mantenedora = em.id_empresa', 'LEFT');
		$this->db->where('i.id_estado', 1);
		$this->db->where('i.id', $idInspeccion);
		$inspeccion = $this->db->get();
		return $inspeccion->result_array();
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
		$this->db->select('ic.id, ic.id_inspeccion, ic.id_herramienta, ic.respuesta, ic.orden');
		$this->db->from('inspecciones_herramientas ic');
		$this->db->where('ic.id_estado', 1);
		$this->db->where('ic.id_inspeccion', $idInspeccion);
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

	public function listarInspecciones($id_usuario)
	{
		$this->db->select('i.id, i.id_edificio, i.nombre_tecnico, i.rut_admin, i.nombre_admin, i.email_admin, i.fecha_contrato_mant, i.contrato_vigente, i.id_empresa_mantenedora, i.nombre_mant_2, i.fecha_ultima_mant, i.marca_ascensor, i.id_uso, i.capacidad_personas, i.capacidad_kg, i.id_suspension, i.sala_maquinas, i.velocidad, i.recorrido, i.paradas, i.id_tipo_traccion, i.cantidad, i.diametro_traccion, i.enclavamiento_electrico, i.enclavamiento_mecanico, i.diametro_cable, i.id_estado, i.id_usuario, i.created_at, i.updated_at`');
		$this->db->from('inspecciones i');
		$this->db->where('i.id_estado', 1);
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
			$inspeccion = $this->db->get_where('inspecciones', array('id' => $idInspeccion, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($inspeccion) > 0) {

				$data3 = array(
			        'estado' => 1
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

	public function agregarInspeccion($idInspeccion, $tecnico, $nombreE, $direccionE, $rutE, $idE, $nombreA, $rutA, $emailA, $idEmpresaM, $nombreRM, $fechaUM, $marca, $idUso, $capacidad, $capacidadKG, $idSuspension, $salaMaquina, $velocidad, $recorrido, $paradas, $idTipoTraccion, $cantidad, $diamTraccion, $enclavamientoE, $enclavamientoM, $diamCableL, $idNorma, $id_usuario){
		try{
			$this->db->db_debug = FALSE;
			$id_edificio = null;

			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion' => null);
			
			if ($idE > 0 && !is_null($idE)) {
				$edificios = $this->db->get_where('edificios', array('rol' => $idE))->result();
				if (sizeof($edificios) > 0) {
					$id_edificio = $edificios[0]->id;
				}
			}else{
				if (!is_null($nombreE) || !is_null($direccionE) || !is_null($rutE)) {
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

	public function agregarObservacionCheck($id_categoria, $observacion, $orden, $id_inspecciones_checklists, $id_usuario){
		try{
			$this->db->db_debug = FALSE;
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_inspeccion_checklist_obs' => null);

			$id_inspeccion_checklist_obs = null;

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

	
}