<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Checklist_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarCheckListsUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_checklists.checklists_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_checklists','usuarios.id_usuario = usuarios_checklists.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('checklists.id, checklists.codigo, checklists.nombre');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_checklists','usuarios.id_usuario = usuarios_checklists.id_usuario');
			$this->db->join('checklists','usuarios_checklists.checklists_id = checklists.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('checklists.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('checklists.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('checklists.id, checklists.codigo, checklists.nombre');
			$this->db->from('checklists');
			if (!is_null($id_servicio_salud))
				$this->db->where('checklists.servicio_salud_id', $id_servicio_salud);
			$this->db->where('checklists.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}

		
	}

	public function buscarCheckList($filtroCheckList, $id_usuario)
	{
		$this->db->select('checklists.id, checklists.codigo, checklists.nombre');
		$this->db->from('checklists');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_checklists','usuarios.id_usuario = usuarios_checklists.id_usuario');
		//$this->db->join('checklists','usuarios_checklists.checklists_id = checklists.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroCheckList)){
			$this->db->like('checklists.codigo', $filtroCheckList);
			$this->db->or_like('checklists.nombre', $filtroCheckList);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('checklists.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerCheckList($idCheckList, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('checklists h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idCheckList);
		$checklist = $this->db->get();
		return $checklist->result_array();
	}

	public function listarCheckLists($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.estado, h.created_at, h.updated_at');
		$this->db->from('checklists h');
		$this->db->where('h.estado', 1);
		$checklist = $this->db->get();
		return $checklist->result_array();
	}

	public function desactivarCheckList($idCheckList, $id_usuario)
	{
		try{
			$checklist = $this->db->get_where('checklists', array('id' => $idCheckList, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_checklist' => null
					  );

			if (sizeof($checklist) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCheckList);
			    $this->db->update('checklists', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_checklist'] = $idCheckList;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la CheckList.";
				}else{
					$respuesta['id_checklist'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_checklist'] = -1;
		}

		return $respuesta;
	}

	public function activarCheckList($idCheckList, $id_usuario)
	{
		try{
			$checklist = $this->db->get_where('checklists', array('id' => $idCheckList, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_checklist' => null
					  );

			if (sizeof($checklist) > 0) {

				$data3 = array(
			        'estado' => 1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCheckList);
			    $this->db->update('checklists', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_checklist'] = $idCheckList;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la CheckList.";
				}else{
					$respuesta['id_checklist'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_checklist'] = -1;
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

	public function agregarCheckList($idCheckList, $codigo, $nombre, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_checklist' => null);

			$data = array(
		        //'id_checklist' => $idCheckList,
				'codigo' => $codigo,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idCheckList && !is_null($idCheckList)) {
				$checklist = $this->db->get_where('checklists', array('id' => $idCheckList))->result();
				if (sizeof($checklist) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idCheckList);
					$this->db->update('checklists', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_checklist'] = $idCheckList;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la CheckList.";
					}else{
						$respuesta['id_checklist'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_checklist'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La CheckList no existe.";
				}
			}else{
				$this->db->insert('checklists', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_checklist = $this->db->insert_id();
					$respuesta['id_checklist'] = $id_checklist;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la CheckList.";
				}else{
					$respuesta['id_checklist'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_checklist'] = -1;
		}
		return $respuesta;
	}

	public function agregarCategoriaPreguntaChecklist($idChecklist, $id_categoria, $id_pregunta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_checklists_categorias_preguntas' => null);

			$id_checklist_cat_pre = null;
			$this->db->select('ccp.id, ccp.id_checklist, ccp.id_categoria, ccp.id_pregunta');
			$this->db->from('checklists_categorias_preguntas ccp');
			$this->db->where('ccp.id_checklist', $idChecklist);
			$this->db->where('ccp.id_categoria', $id_categoria);
			$this->db->where('ccp.id_pregunta', $id_pregunta);
			$checklist_cp = $this->db->get();
			$checklist_cp = $checklist_cp->result_array();

			if (sizeof($checklist_cp) > 0) {
				$id_checklist_cat_pre = $checklist_cp[0]["id"];
			}

			$data = array(
				'id_checklist' => $idChecklist,
		        'id_categoria' => $id_categoria,
				'id_pregunta' => $id_pregunta
			);

			if ($id_checklist_cat_pre && !is_null($id_checklist_cat_pre) ) {
				$this->db->where('id', $id_checklist_cat_pre);
				$this->db->update('checklists_categorias_preguntas', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_checklist_cat_pre'] = $id_checklist_cat_pre;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Checklist Categoria Pregunta.";
				}else{
					$respuesta['id_checklist_cat_pre'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('checklists_categorias_preguntas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_checklist_cat_pre = $this->db->insert_id();
					$respuesta['id_checklist_cat_pre'] = $id_checklist_cat_pre;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Categoria Pregunta al Checklist.";
				}else{
					$respuesta['id_checklist_cat_pre'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_checklist_cat_pre'] = -1;
		}
		return $respuesta;
	}

	public function eliminarCategoriaPregunta($idChecklist, $id_usuario){
		try{
			$item_costos_checklist = $this->db->get_where('checklists_categorias_preguntas', array('id_checklist' => $idChecklist))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_checklist' => null
					  );

			if (sizeof($item_costos_checklist) > 0) {
			    $this->db->where('id_checklist', $idChecklist);
				$this->db->delete('checklists_categorias_preguntas');

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_checklist'] = $idChecklist;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente las Preguntas al Checklist.";
				}else{
					$respuesta['id_checklist'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_checklist'] = $idChecklist;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "El Checklist no posee Preguntas Asociadas.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_checklist'] = -1;
		}

		return $respuesta;
	}

}