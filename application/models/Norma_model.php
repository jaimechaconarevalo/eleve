<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Norma_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarNormasUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_normas.normas_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_normas','usuarios.id_usuario = usuarios_normas.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('normas.id, normas.codigo, normas.nombre, normas.solo_texto, normas.visible');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_normas','usuarios.id_usuario = usuarios_normas.id_usuario');
			$this->db->join('normas','usuarios_normas.normas_id = normas.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('normas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('normas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('normas.id, normas.codigo, normas.nombre');
			$this->db->from('normas');
			if (!is_null($id_servicio_salud))
				$this->db->where('normas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('normas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}

		
	}

	public function buscarNorma($filtroNorma, $id_usuario)
	{
		$this->db->select('normas.id, normas.codigo, normas.nombre');
		$this->db->from('normas');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_normas','usuarios.id_usuario = usuarios_normas.id_usuario');
		//$this->db->join('normas','usuarios_normas.normas_id = normas.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroNorma)){
			$this->db->like('normas.codigo', $filtroNorma);
			$this->db->or_like('normas.nombre', $filtroNorma);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('normas.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerNorma($idNorma, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.solo_texto, h.visible, h.estado, h.created_at, h.updated_at, h.orden, h.id_usuario');
		$this->db->from('normas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idNorma);
		$norma = $this->db->get();
		return $norma->result_array();
	}

	public function obtenerNormasReporte($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.solo_texto, h.visible, h.estado, h.created_at, h.updated_at, h.orden, h.id_usuario');
		$this->db->from('normas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.visible', 1);
		$this->db->where('h.temporal', 0);
		$this->db->order_by('h.orden');
		$norma = $this->db->get();
		return $norma->result_array();
	}

	public function listarNormas($visible, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.solo_texto, h.visible, h.estado, h.created_at, h.updated_at, h.orden');
		$this->db->from('normas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.temporal', 0);
		$this->db->where('h.visible', $visible);
		$this->db->order_by('h.orden');
		$norma = $this->db->get();
		return $norma->result_array();
	}

	public function desactivarNorma($idNorma, $id_usuario)
	{
		try{
			$norma = $this->db->get_where('normas', array('id' => $idNorma, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_norma' => null
					  );

			if (sizeof($norma) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idNorma);
			    $this->db->update('normas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_norma'] = $idNorma;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la Norma.";
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_norma'] = -1;
		}

		return $respuesta;
	}

	public function activarNorma($idNorma, $id_usuario)
	{
		try{
			$norma = $this->db->get_where('normas', array('id' => $idNorma, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_norma' => null
					  );

			if (sizeof($norma) > 0) {

				$data3 = array(
			        'estado' => 1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idNorma);
			    $this->db->update('normas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_norma'] = $idNorma;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la Norma.";
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_norma'] = -1;
		}

		return $respuesta;
	}

	public function agregarNorma($idNorma, $codigo, $nombre, $observacion, $solo_texto, $visible, $id_usuario, $es_temporal = 0){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_norma' => null);

			$data = array(
				'codigo' => $codigo,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'solo_texto' => $solo_texto,
				'visible' => $visible,
				'id_usuario' => $id_usuario,
				'temporal' => $es_temporal
			);

			if ($idNorma && !is_null($idNorma)) {
				$norma = $this->db->get_where('normas', array('id' => $idNorma))->result();
				if (sizeof($norma) > 0) {

					$respuesta['temporal'] = $norma[0]->temporal;


					if (is_null($norma[0]->orden) && $visible == 1) {
						$norma = $this->db->get_where('normas', array('temporal' => 0, 'estado' => 1, 'visible' => 1))->result();
						$orden = (sizeof($norma) + 1);
						$data["orden"] = $orden;
					}

					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idNorma);
					$this->db->update('normas', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_norma'] = $idNorma;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Norma.";
					}else{
						$respuesta['id_norma'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La Norma no existe.";
				}
			}else{
				if ($visible == 1 && $es_temporal == 0) {
					$norma = $this->db->get_where('normas', array('temporal' => 0, 'estado' => 1, 'visible' => 1))->result();
					$orden = (sizeof($norma) + 1);
					$data["orden"] = $orden;
				}

				if ($es_temporal == 1) {
					$data["temporal"] = $es_temporal;
				}

				$this->db->insert('normas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_norma = $this->db->insert_id();
					$respuesta['id_norma'] = $id_norma;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Norma.";
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_norma'] = -1;
		}
		return $respuesta;
	}

	public function agregarCategoriaPreguntaNorma($idNorma, $id_categoria, $id_pregunta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_normas_categorias_preguntas' => null);

			$orden_categoria = null;
			$orden_pregunta = null;

			$id_norma_cat_pre = null;
			$this->db->select('ncp.id, ncp.id_norma, ncp.id_categoria, ncp.id_pregunta');
			$this->db->from('normas_categorias_preguntas ncp');
			$this->db->where('ncp.id_norma', $idNorma);
			$this->db->where('ncp.id_categoria', $id_categoria);
			$this->db->where('ncp.id_pregunta', $id_pregunta);
			$norma_cp = $this->db->get();
			$norma_cp = $norma_cp->result_array();

			if (sizeof($norma_cp) > 0) {
				$id_norma_cat_pre = $norma_cp[0]["id"];
			}



			$data = array(
				'id_norma' => $idNorma,
		        'id_categoria' => $id_categoria,
				'id_pregunta' => $id_pregunta
			);

			if ($id_norma_cat_pre && !is_null($id_norma_cat_pre) ) {
				$this->db->where('id', $id_norma_cat_pre);
				$this->db->update('normas_categorias_preguntas', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_norma_cat_pre'] = $id_norma_cat_pre;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Norma Categoria Pregunta.";
				}else{
					$respuesta['id_norma_cat_pre'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{

				$categoria_nueva = false;
				$datos_categoria = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $idNorma, 'id_categoria' => $id_categoria, 'id_estado' => 1))->result();
				#$datos_categorias = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $idNorma, 'id_estado' => 1))->result();

				$this->db->select('ncp.id_norma, ncp.id_categoria');
				$this->db->from('normas_categorias_preguntas ncp');
				$this->db->where('ncp.id_norma', $idNorma);
				$this->db->where('ncp.id_estado', 1);
				$this->db->group_by('ncp.id_norma, ncp.id_categoria');
				$get_normas_categorias_preguntas = $this->db->get();
				$datos_categorias = $get_normas_categorias_preguntas->result_array();

				if (sizeof($datos_categoria) == 0) {
					$categoria_nueva = true;
					if (sizeof($datos_categorias) > 0) {
						$orden_categoria = (sizeof($datos_categorias) + 1);
					}else{
						$orden_categoria = 1;
					}
				}else{
					$orden_categoria = $datos_categoria[0]->orden_categoria;
				}

				if ($categoria_nueva) {
					$orden_pregunta = 1;
				}else{
					$orden_pregunta = (sizeof($datos_categoria)+1);
				}

				#var_dump($orden_categoria);var_dump($orden_pregunta);exit();return;

				$data["orden_categoria"] = $orden_categoria;
				$data["orden_pregunta"] = $orden_pregunta;

				#var_dump($data);exit();return;

				$this->db->insert('normas_categorias_preguntas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_norma_cat_pre = $this->db->insert_id();
					$respuesta['id_norma_cat_pre'] = $id_norma_cat_pre;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Categoria Pregunta a la Norma.";
				}else{
					$respuesta['id_norma_cat_pre'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_norma_cat_pre'] = -1;
		}
		return $respuesta;
	}

	public function listarCategoriasPreguntasNorma($idNorma, $idUsuario)
	{	
		try{   
		    $this->db->select('ncp.id, ncp.id_norma, ncp.id_categoria, ncp.id_pregunta, c.codigo as codigo_c, c.nombre as categoria, p.codigo as codigo_p, p.nombre as pregunta, r.id as respuesta_id, r.orden as orden_r, r.nombre as respuesta, r.observaciones as obs_respuesta, ncp.orden_categoria, ncp.orden_pregunta');
			$this->db->from('normas_categorias_preguntas ncp');
			$this->db->join('categorias c','ncp.id_categoria = c.id');
			$this->db->join('preguntas p', 'ncp.id_pregunta = p.id');
			$this->db->join('respuestas r', 'p.id = r.id_pregunta and r.id_estado = 1', 'LEFT');
			$this->db->where('c.estado', 1);
			$this->db->where('p.estado', 1);
			$this->db->where('ncp.id_estado', 1);
#			$this->db->where('r.id_estado', 1);
			$this->db->where('ncp.id_norma', $idNorma);
			$this->db->order_by('ncp.orden_categoria, ncp.orden_pregunta, ncp.id_categoria');
			$resultado = $this->db->get();
			return $resultado->result_array();
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_norma'] = -1;
		}
	}

	public function eliminarCategoriaPregunta($idNorma, $id_usuario){
		try{
			$item_costos_norma = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $idNorma))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_norma' => null
					  );

			if (sizeof($item_costos_norma) > 0) {
			    $this->db->where('id_norma', $idNorma);
				$this->db->delete('normas_categorias_preguntas');

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_norma'] = $idNorma;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente las Preguntas a la Norma.";
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_norma'] = $idNorma;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "La norma no posee Preguntas Asociadas.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_norma'] = -1;
		}

		return $respuesta;
	}

	public function eliminarNormasInspeccion($idInspeccion, $id_usuario){
		try{
			$herramientas_inspeccion = $this->db->get_where('inspecciones_normas', array('id_inspeccion' => $idInspeccion, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($herramientas_inspeccion) > 0) {
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id_inspeccion', $idInspeccion);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_normas', array('id_estado' => -1));

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspeccion'] = $idInspeccion;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se han eliminado correctamente las respuestas de Normas a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_inspeccion'] = $idInspeccion;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "La Inspeccion no posee respuestas de Normas Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion'] = -1;
		}
		return $respuesta;
	}

	public function eliminarNormasChecklistInspeccion($idInspeccion, $id_usuario){
		try{
			$herramientas_inspeccion = $this->db->get_where('inspecciones_checklists', array('id_inspeccion' => $idInspeccion, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion_checklist' => null
					  );

			$id_inspeccion_checklist = null;

			if (sizeof($herramientas_inspeccion) > 0) {
				$id_inspeccion_checklist = $herramientas_inspeccion[0]->id;
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id_inspeccion', $idInspeccion);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_checklists', array('id_estado' => -1));

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspeccion_checklist'] = $id_inspeccion_checklist;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se han eliminado correctamente las respuestas de Normas Checklist a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion_checklist'] = $id_inspeccion_checklist;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_inspeccion_checklist'] = $id_inspeccion_checklist;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "La Inspeccion no posee respuestas de Normas Checklist Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion_checklist'] = -1;
		}
		return $respuesta;
	}

	public function eliminarNorma($idNorma, $id_usuario)
	{
		try{
			$norma = $this->db->get_where('normas', array('id' => $idNorma, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_norma' => null
					  );

			if (sizeof($norma) > 0) {

				$data3 = array(
			        'estado' => -1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idNorma);
			    $this->db->update('normas', $data3);

			    if ($this->db->affected_rows() >= 1) {

			    	$normas = $this->db->get_where('normas', array('orden >' => $norma[0]->orden, 'temporal' => 0,'visible' => 1, 'estado' => 1))->result();
			    	if (sizeof($normas) > 0) {
			    		$data_orden = array(
							'id_usuario' => $id_usuario
						);

				    	$this->db->set('orden', '(orden-1)', FALSE);
					    $this->db->where('temporal', 0);
					    $this->db->where('orden > ', $norma[0]->orden);
					    $this->db->where('visible', 1);
					    $this->db->where('estado', 1);
						$this->db->update('normas', $data_orden);

						if ($this->db->affected_rows() >= 1) {
							$respuesta['id_norma'] = $idNorma;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = "Se ha eliminado correctamente la Norma.";
						}	
			    	}else{
			    		$respuesta['id_norma'] = $idNorma;
						$respuesta['resultado'] = 1;
						$respuesta['mensaje'] = "Se ha eliminado correctamente la Norma.";
			    	}
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_norma'] = -1;
		}
		return $respuesta;
	}


	public function moverNorma($id_norma, $funcion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null);

			if (isset($id_norma) && isset($funcion) && isset($id_usuario)) {
				$norma = $this->db->get_where('normas', array('id' => $id_norma, 'temporal' => 0, 'visible' => 1, 'estado' => 1))->result();
				$normas = $this->db->get_where('normas', array('temporal' => 0, 'visible' => 1, 'estado' => 1))->result();

				if (sizeof($norma) > 0) {
					$orden = $norma[0]->orden;

					if ($funcion == 1) {
						if ($orden > 1) {
							$orden_anterior = ($orden - 1);
							$norma_anterior = $this->db->get_where('normas', array('orden' => $orden_anterior, 'temporal' => 0, 'visible' => 1, 'estado' => 1))->result();

							if (sizeof($norma_anterior) > 0) {

								$data = array(
									'orden' => $orden_anterior
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $norma[0]->id);
								$this->db->update('normas', $data);

								$data_anterior = array(
									'orden' => $orden
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $norma_anterior[0]->id);
								$this->db->update('normas', $data_anterior);

								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden de la Norma.";

							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Norma que le antecede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más arriba la Norma";
						}
					}elseif ($funcion == 0) {
						if ($orden < sizeof($normas)) {
							$orden_superior = ($orden + 1);
							$norma_superior = $this->db->get_where('normas', array('orden' => $orden_superior, 'temporal' => 0, 'visible' => 1, 'estado' => 1))->result();

							if (sizeof($norma_superior) > 0) {

								$data = array('orden' => $orden_superior);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $norma[0]->id);
								$this->db->update('normas', $data);

								$data_superior = array('orden' => $orden);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $norma_superior[0]->id);
								$this->db->update('normas', $data_superior);

								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden.";
							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Norma que le procede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más abajo del total de Normas";
						}
					}
				}else{
					$respuesta["resultado"] = -1;
					$respuesta["mensaje"] = "No se encontró la Norma.";
				}
			}else{
				$respuesta["resultado"] = -1;
				$respuesta["mensaje"] = "Ocurrió un error al consultar los datos. No se enviaron todos los datos solicitados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		}
		return $respuesta;
	}

	public function listarCategoriasNorma($idNorma, $idUsuario)
	{	
		try{   
		    $this->db->select('cr.id, cr.codigo, cr.nombre, cr.observaciones, cr.iniciales, cr.orden, cr.created_at, cr.id_norma, n.codigo as codigo_norma, n.nombre as norma, n.observaciones as obs_norma');
			$this->db->from('categoria_reporte cr');
			$this->db->join('normas n', 'cr.id_norma = n.id', 'LEFT');
			$this->db->where('cr.id_estado', 1);
			$this->db->where('cr.id_norma', $idNorma);
			$this->db->order_by('cr.orden');
			$resultado = $this->db->get();
			return $resultado->result_array();
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_norma'] = -1;
		}
	}

	public function eliminarCategoriasReporte($idNorma, $id_categoria_reporte, $orden, $id_usuario){
		try{
			$respuestas = $this->db->get_where('categoria_reporte', array('id_norma' => $idNorma, 'id' => $id_categoria_reporte, 'orden' => $orden, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_norma' => null
					  );

			$data = array(
				'id_estado' => -1,
				'id_usuario' => $id_usuario
			);

			if (sizeof($respuestas) > 0) {
				$this->db->set('updated_at', 'NOW()', FALSE);
			    $this->db->where('id_norma', $idNorma);
			    $this->db->where('id', $id_categoria_reporte);
			    $this->db->where('orden', $orden);
			    $this->db->where('id_estado', 1);
				$this->db->update('categoria_reporte', $data);

			    if ($this->db->affected_rows() >= 1) {
			    	$categorias_reporte_orden = $this->db->get_where('categoria_reporte', array('id_norma' => $idNorma, 'orden > ' => $orden, 'id_estado' => 1))->result();
			    	if (sizeof($categorias_reporte_orden) > 0) {
			    		$data_orden = array(
							'id_usuario' => $id_usuario
						);

				    	$this->db->set('orden', '(orden-1)', FALSE);
					    $this->db->where('id_norma', $idNorma);
					    $this->db->where('orden > ', $orden);
					    $this->db->where('id_estado', 1);
						$this->db->update('categoria_reporte', $data_orden);

						if ($this->db->affected_rows() >= 1) {
							$respuesta['id_norma'] = $idNorma;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = "Se ha eliminado correctamente las Categorias Reporte a la Norma.";
						}	
			    	}else{
			    		$respuesta['id_norma'] = $idNorma;
						$respuesta['resultado'] = 1;
						$respuesta['mensaje'] = "Se ha eliminado correctamente las Categorias Reporte a la Norma.";
			    	}
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['resultado'] = -1;
				$respuesta['mensaje'] = "No se ha encontrado la Cateogira Reporte que desea eliminar.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_norma'] = -1;
		}

		return $respuesta;
	}

	public function agregarCategoriaReporte($id, $orden, $titulo, $nombre, $iniciales, $idNorma, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$id_categoria_reporte = null;
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_categoria_reporte' => null);

			$categorias_reporte = $this->db->get_where('categoria_reporte', array('id_norma' => $idNorma, 'id_estado' => 1))->result();
			if (sizeof($categorias_reporte) > 0){
				$orden = (sizeof($categorias_reporte)+1);
			}else{
				$orden = 1;
			}


			if (isset($id)) {
				$id_categoria_reporte = null;
				$this->db->select('cr.id, cr.codigo, cr.nombre, cr.observaciones, cr.iniciales, cr.orden, cr.created_at, cr.id_norma');
				$this->db->from('categoria_reporte cr');
				$this->db->join('normas n', 'cr.id_norma = n.id', 'LEFT');
				#$this->db->where('cr.id_estado', 1);
				$this->db->where('cr.id_norma', $idNorma);
				$this->db->where('cr.id', $id);
				$empresa_cc = $this->db->get();
				$empresa_cc = $empresa_cc->result_array();

				if (sizeof($empresa_cc) > 0)
					$id_categoria_reporte = $empresa_cc[0]["id"];
			}

			$data = array(
				'orden' => $orden,
				'nombre' => $titulo,
				'observaciones' => $nombre,
				'iniciales' => $iniciales,
				'id_norma' => (int)$idNorma,
				'id_usuario' => $id_usuario,
				'id_estado' => 1
			);

			if ($id_categoria_reporte && !is_null($id_categoria_reporte) ) {
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $id_categoria_reporte);
				$this->db->update('categoria_reporte', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_categoria_reporte'] = $id_categoria_reporte;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Categoria Reporte a la Norma.";
				}else{
					$respuesta['id_categoria_reporte'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{

				$this->db->insert('categoria_reporte', $data);
				#var_dump($data);
				if ($this->db->affected_rows() >= 1) {
					$id_categoria_reporte = $this->db->insert_id();
					$respuesta['id_categoria_reporte'] = $id_categoria_reporte;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Categoria Reporte a la Norma.";
				}else{
					$respuesta['id_categoria_reporte'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_categoria_reporte'] = -1;
		}
		return $respuesta;
	}

	public function moverCategoriaReporte($id_norma, $id_categoria_reporte, $funcion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null);

			if (isset($id_norma) && isset($id_categoria_reporte) && isset($funcion) && isset($id_usuario)) {
				$categoria_reporte = $this->db->get_where('categoria_reporte', array('id' => $id_categoria_reporte, 'id_norma' => $id_norma, 'id_estado' => 1))->result();
				$categorias_reporte = $this->db->get_where('categoria_reporte', array('id_norma' => $id_norma, 'id_estado' => 1))->result();

				if (sizeof($categoria_reporte) > 0) {
					$orden = $categoria_reporte[0]->orden;

					if ($funcion == 1) {
						if ($orden > 1) {
							$orden_anterior = ($orden - 1);
							$categoria_reporte_anterior = $this->db->get_where('categoria_reporte', array('id_norma' => $id_norma, 'orden' => $orden_anterior, 'id_estado' => 1))->result();

							if (sizeof($categoria_reporte_anterior) > 0) {
								
								$data = array(
									'orden' => $orden_anterior
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_reporte[0]->id);
								$this->db->update('categoria_reporte', $data);

								$data_anterior = array(
									'orden' => $orden
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_reporte_anterior[0]->id);
								$this->db->update('categoria_reporte', $data_anterior);

								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden.";

							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Categoria Reporte que le antecede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más arriba la Categoria Reporte";
						}
					}elseif ($funcion == 0) {
						if ($orden < sizeof($categorias_reporte)) {
							$orden_superior = ($orden + 1);
							$categoria_reporte_superior = $this->db->get_where('categoria_reporte', array('id_norma' => $id_norma, 'orden' => $orden_superior, 'id_estado' => 1))->result();

							if (sizeof($categoria_reporte_superior) > 0) {

								$data = array('orden' => $orden_superior);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_reporte[0]->id);
								$this->db->update('categoria_reporte', $data);

								$data_superior = array('orden' => $orden);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_reporte_superior[0]->id);
								$this->db->update('categoria_reporte', $data_superior);

								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden.";
							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Categoria Reporte que le antecede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más abajo del total de Categoria Reporte";
						}
					}
				}else{
					$respuesta["resultado"] = -1;
					$respuesta["mensaje"] = "No se encontró la Categoria Reporte.";
				}
			}else{
				$respuesta["resultado"] = -1;
				$respuesta["mensaje"] = "Ocurrió un error al consultar los datos. No se enviaron todos los datos solicitados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		}
		return $respuesta;
	}

	public function moverCategoriaPregunta($id_norma, $id_categoria, $funcion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null);

			if (isset($id_norma) && isset($id_categoria) && isset($funcion) && isset($id_usuario)) {

				#$categoria_pregunta = $this->db->get_where('categoria_reporte', array('id' => $id_categoria, 'id_norma' => $id_norma, 'id_estado' => 1))->result();
				$this->db->select('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
				$this->db->from('normas_categorias_preguntas ncp');
				$this->db->where('ncp.id_norma', $id_norma);
				$this->db->where('ncp.id_categoria', $id_categoria);
				$this->db->where('ncp.id_estado', 1);
				$this->db->group_by('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
				$get_normas_categorias_preguntas = $this->db->get();
				$categoria_pregunta = $get_normas_categorias_preguntas->result_array();


				$categorias_reporte = $this->db->get_where('categoria_reporte', array('id_norma' => $id_norma, 'id_estado' => 1))->result();
				$this->db->select('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
				$this->db->from('normas_categorias_preguntas ncp');
				$this->db->where('ncp.id_norma', $id_norma);
				$this->db->where('ncp.id_estado', 1);
				$this->db->group_by('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
				$get_normas_categorias_preguntas = $this->db->get();
				$categorias_preguntas = $get_normas_categorias_preguntas->result_array();
				


				if (sizeof($categoria_pregunta) > 0) {
					$orden = $categoria_pregunta[0]["orden_categoria"];

					if ($funcion == 1) {
						if ($orden > 1) {
							$orden_anterior = ($orden - 1);

							#$categoria_pregunta_anterior = $this->db->get_where('categoria_reporte', array('id_norma' => $id_norma, 'orden' => $orden_anterior, 'id_estado' => 1))->result();
							$this->db->select('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
							$this->db->from('normas_categorias_preguntas ncp');
							$this->db->where('ncp.id_norma', $id_norma);
							$this->db->where('ncp.orden_categoria', $orden_anterior);
							$this->db->where('ncp.id_estado', 1);
							$this->db->group_by('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
							$get_normas_categorias_preguntas = $this->db->get();
							$categoria_pregunta_anterior = $get_normas_categorias_preguntas->result_array();

							if (sizeof($categoria_pregunta_anterior) > 0) {
								
								$data = array(
									'orden_categoria' => $orden_anterior
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id_categoria', $categoria_pregunta[0]["id_categoria"]);
								$this->db->update('normas_categorias_preguntas', $data);

								$data_anterior = array(
									'orden_categoria' => $orden
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id_categoria', $categoria_pregunta_anterior[0]["id_categoria"]);
								$this->db->update('normas_categorias_preguntas', $data_anterior);

								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden.";

							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Categoria que le antecede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más arriba la Categoria";
						}
					}elseif ($funcion == 0) {
						if ($orden < sizeof($categorias_preguntas)) {
							$orden_superior = ($orden + 1);

							#$categoria_pregunta_superior = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $id_norma, 'orden' => $orden_superior, 'id_estado' => 1))->result();
							$this->db->select('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
							$this->db->from('normas_categorias_preguntas ncp');
							$this->db->where('ncp.id_norma', $id_norma);
							$this->db->where('ncp.orden_categoria', $orden_superior);
							$this->db->where('ncp.id_estado', 1);
							$this->db->group_by('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
							$get_normas_categorias_preguntas = $this->db->get();
							$categoria_pregunta_superior = $get_normas_categorias_preguntas->result_array();


							if (sizeof($categoria_pregunta_superior) > 0) {

								$data = array('orden_categoria' => $orden_superior);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id_categoria', $categoria_pregunta[0]["id_categoria"]);
								$this->db->update('normas_categorias_preguntas', $data);

								$data_superior = array('orden_categoria' => $orden);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id_categoria', $categoria_pregunta_superior[0]["id_categoria"]);
								$this->db->update('normas_categorias_preguntas', $data_superior);

								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden.";
							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Categoria que le antecede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más abajo del total de Categoria.";
						}
					}
				}else{
					$respuesta["resultado"] = -1;
					$respuesta["mensaje"] = "No se encontró la Categoria.";
				}
			}else{
				$respuesta["resultado"] = -1;
				$respuesta["mensaje"] = "Ocurrió un error al consultar los datos. No se enviaron todos los datos solicitados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		}
		return $respuesta;
	}

	public function moverNormaCategoriaPregunta($id_norma, $id_categoria, $id_pregunta, $funcion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null);

			if (isset($id_norma) && isset($id_categoria) && isset($id_pregunta) && isset($funcion) && isset($id_usuario)) {

				$categoria_pregunta = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $id_norma, 'id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'id_estado' => 1))->result();
				#var_dump($categoria_pregunta);

				$categorias_preguntas = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $id_norma, 'id_categoria' => $id_categoria, 'id_estado' => 1))->result();
				
				if (sizeof($categoria_pregunta) > 0) {
					$orden = $categoria_pregunta[0]->orden_pregunta;

					if ($funcion == 1) {
						if ($orden > 1) {
							$orden_anterior = ($orden - 1);

							$categoria_pregunta_anterior = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $id_norma, 'id_categoria' => $id_categoria, 'orden_pregunta' => $orden_anterior, 'id_estado' => 1))->result();

							if (sizeof($categoria_pregunta_anterior) > 0) {
								
								$data = array(
									'orden_pregunta' => $orden_anterior
								);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_pregunta[0]->id);
								$this->db->update('normas_categorias_preguntas', $data);

								$data_anterior = array(
									'orden_pregunta' => $orden
								);
								
								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_pregunta_anterior[0]->id);
								$this->db->update('normas_categorias_preguntas', $data_anterior);



								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden de la Pregunta.";

							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Pregunta que le antecede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más arriba la Pregunta";
						}
					}elseif ($funcion == 0) {
						if ($orden < sizeof($categorias_preguntas)) {
							$orden_superior = ($orden + 1);

							$categoria_pregunta_superior = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $id_norma, 'id_categoria' => $id_categoria, 'orden_pregunta' => $orden_superior, 'id_estado' => 1))->result();
							/*$this->db->select('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
							$this->db->from('normas_categorias_preguntas ncp');
							$this->db->where('ncp.id_norma', $id_norma);
							$this->db->where('ncp.orden_categoria', $orden_superior);
							$this->db->where('ncp.id_estado', 1);
							$this->db->group_by('ncp.id_norma, ncp.id_categoria, ncp.orden_categoria');
							$get_normas_categorias_preguntas = $this->db->get();
							$categoria_pregunta_superior = $get_normas_categorias_preguntas->result_array();*/


							if (sizeof($categoria_pregunta_superior) > 0) {

								$data = array('orden_pregunta' => $orden_superior);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_pregunta[0]->id);
								$this->db->update('normas_categorias_preguntas', $data);

								$data_superior = array('orden_pregunta' => $orden);

								$this->db->set('updated_at', 'NOW()', FALSE);
								$this->db->where('id', $categoria_pregunta_superior[0]->id);
								$this->db->update('normas_categorias_preguntas', $data_superior);

								$respuesta["resultado"] = 1;
								$respuesta["mensaje"] = "Se ha actualizado correctamente el orden de la Pregunta.";
							}else{
								$respuesta["resultado"] = -1;
								$respuesta["mensaje"] = "No se encontró la Pregunta que le procede.";
							}
						}else{
							$respuesta["resultado"] = -1;
							$respuesta["mensaje"] = "No se puede mover más abajo del total de Preguntas.";
						}
					}
				}else{
					$respuesta["resultado"] = -1;
					$respuesta["mensaje"] = "No se encontró la Pregunta.";
				}
			}else{
				$respuesta["resultado"] = -1;
				$respuesta["mensaje"] = "Ocurrió un error al consultar los datos. No se enviaron todos los datos solicitados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		}
		return $respuesta;
	}

	public function eliminarCategoria($idNorma, $id_categoria, $orden, $id_usuario){
		try{
			$respuestas = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $idNorma, 'id_categoria' => $id_categoria, 'orden_categoria' => $orden, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_norma' => null
					  );

			$data = array(
				'id_estado' => -1,
				'id_usuario' => $id_usuario
			);

			if (sizeof($respuestas) > 0) {
				$this->db->set('updated_at', 'NOW()', FALSE);
			    $this->db->where('id_norma', $idNorma);
			    $this->db->where('id_categoria', $id_categoria);
			    $this->db->where('orden_categoria', $orden);
			    $this->db->where('id_estado', 1);
				$this->db->update('normas_categorias_preguntas', $data);

			    if ($this->db->affected_rows() >= 1) {
			    	$categorias_orden = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $idNorma, 'orden_categoria > ' => $orden, 'id_estado' => 1))->result();
			    	if (sizeof($categorias_orden) > 0) {
			    		$data_orden = array(
							'id_usuario' => $id_usuario
						);

				    	$this->db->set('orden_categoria', '(orden_categoria-1)', FALSE);
					    $this->db->where('id_norma', $idNorma);
					    $this->db->where('orden_categoria > ', $orden);
					    $this->db->where('id_estado', 1);
						$this->db->update('normas_categorias_preguntas', $data_orden);

						if ($this->db->affected_rows() >= 1) {
							$respuesta['id_norma'] = $idNorma;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = "Se ha eliminado correctamente la Categoria a la Norma.";
						}	
			    	}else{
			    		$respuesta['id_norma'] = $idNorma;
						$respuesta['resultado'] = 1;
						$respuesta['mensaje'] = "Se ha eliminado correctamente la Categoria a la Norma.";
			    	}
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['resultado'] = -1;
				$respuesta['mensaje'] = "No se ha encontrado la Categoria que desea eliminar.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_norma'] = -1;
		}

		return $respuesta;
	}

	public function eliminarPregunta($idNorma, $id_categoria, $id_pregunta, $orden, $id_usuario){
		try{
			$respuestas = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $idNorma, 'id_categoria' => $id_categoria, 'id_pregunta' => $id_pregunta, 'orden_pregunta' => $orden, 'id_estado' => 1))->result();

			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_norma' => null
					  );

			$data = array(
				'id_estado' => -1,
				'id_usuario' => $id_usuario
			);

			if (sizeof($respuestas) > 0) {
				$this->db->set('updated_at', 'NOW()', FALSE);
			    $this->db->where('id_norma', $idNorma);
			    $this->db->where('id_categoria', $id_categoria);
			    $this->db->where('id_pregunta', $id_pregunta);
			    $this->db->where('orden_pregunta', $orden);
			    $this->db->where('id_estado', 1);
				$this->db->update('normas_categorias_preguntas', $data);

			    if ($this->db->affected_rows() >= 1) {
			    	$preguntas_orden = $this->db->get_where('normas_categorias_preguntas', array('id_norma' => $idNorma, 'id_categoria' => $id_categoria, 'orden_pregunta > ' => $orden, 'id_estado' => 1))->result();
			    	if (sizeof($preguntas_orden) > 0) {
			    		$data_orden = array(
							'id_usuario' => $id_usuario
						);

				    	$this->db->set('orden_pregunta', '(orden_pregunta-1)', FALSE);
					    $this->db->where('id_norma', $idNorma);
					    $this->db->where('id_categoria', $id_categoria);
					    $this->db->where('orden_pregunta > ', $orden);
					    $this->db->where('id_estado', 1);
						$this->db->update('normas_categorias_preguntas', $data_orden);

						if ($this->db->affected_rows() >= 1) {
							$respuesta['id_norma'] = $idNorma;
							$respuesta['resultado'] = $this->db->affected_rows();
							$respuesta['mensaje'] = "Se ha eliminado correctamente la Pregunta a la Categoría.";
						}	
			    	}else{
			    		$respuesta['id_norma'] = $idNorma;
						$respuesta['resultado'] = 1;
						$respuesta['mensaje'] = "Se ha eliminado correctamente la Pregunta a la Categoría.";
			    	}
				}else{
					$respuesta['id_norma'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['resultado'] = -1;
				$respuesta['mensaje'] = "No se ha encontrado la Pregunta que desea eliminar.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_norma'] = -1;
		}

		return $respuesta;
	}

	public function listarPreguntasNormaCategoria($id_norma, $id_categoria, $id_usuario)
	{
		/*$this->db->select('h.id, h.codigo, h.nombre, h.filtro, h.observaciones, h.estado, h.created_at, h.updated_at');
		$this->db->from('preguntas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id not in ', 1);
		$pregunta = $this->db->get();
		return $pregunta->result_array();*/


		$this->db->select('ncp.id_pregunta');
		$this->db->from('normas_categorias_preguntas ncp');
		$this->db->where('ncp.id_norma', $id_norma);
		$this->db->where('ncp.id_categoria', $id_categoria);
		$this->db->where('ncp.id_estado', 1);
		$sub_consulta = $this->db->get_compiled_select();

		$this->db->select('h.id, h.codigo, h.nombre, h.filtro, h.observaciones, h.estado, h.created_at, h.updated_at');
		$this->db->from('preguntas h');
		$this->db->where('h.estado', 1);
		$this->db->where("h.id NOT IN ($sub_consulta)");
		$preguntas = $this->db->get();
		return $preguntas->result_array();
	}
}