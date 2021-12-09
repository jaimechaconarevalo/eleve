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
			$this->db->select('normas.id, normas.codigo, normas.nombre');
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
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('normas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idNorma);
		$norma = $this->db->get();
		return $norma->result_array();
	}

	public function listarNormas($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at');
		$this->db->from('normas h');
		$this->db->where('h.estado', 1);
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

	public function agregarNorma($idNorma, $codigo, $nombre, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_norma' => null);

			$data = array(
		        //'id_norma' => $idNorma,
				'codigo' => $codigo,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idNorma && !is_null($idNorma)) {
				$norma = $this->db->get_where('normas', array('id' => $idNorma))->result();
				if (sizeof($norma) > 0) {
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
		    $this->db->select('ncp.id, ncp.id_norma, ncp.id_categoria, ncp.id_pregunta, c.codigo as codigo_c, c.nombre as categoria, p.codigo as codigo_p, p.nombre as pregunta, r.id as respuesta_id, r.orden as orden_r, r.nombre as respuesta, r.observaciones as obs_respuesta');
			$this->db->from('normas_categorias_preguntas ncp');
			$this->db->join('categorias c','ncp.id_categoria = c.id');
			$this->db->join('preguntas p', 'ncp.id_pregunta = p.id');
			$this->db->join('respuestas r', 'p.id = r.id_pregunta and r.id_estado = 1', 'LEFT');
			$this->db->where('c.estado', 1);
			$this->db->where('p.estado', 1);
#			$this->db->where('r.id_estado', 1);
			$this->db->where('ncp.id_norma', $idNorma);
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
}