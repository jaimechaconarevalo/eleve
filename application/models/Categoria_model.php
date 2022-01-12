<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Categoria_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarCategoriasUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_categorias.categorias_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_categorias','usuarios.id_usuario = usuarios_categorias.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('categorias.id, categorias.codigo, categorias.nombre');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_categorias','usuarios.id_usuario = usuarios_categorias.id_usuario');
			$this->db->join('categorias','usuarios_categorias.categorias_id = categorias.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('categorias.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('categorias.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('categorias.id, categorias.codigo, categorias.nombre');
			$this->db->from('categorias');
			if (!is_null($id_servicio_salud))
				$this->db->where('categorias.servicio_salud_id', $id_servicio_salud);
			$this->db->where('categorias.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}
	}

	public function buscarCategoria($filtroCategoria, $id_usuario)
	{
		$this->db->select('categorias.id, categorias.codigo, categorias.nombre');
		$this->db->from('categorias');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_categorias','usuarios.id_usuario = usuarios_categorias.id_usuario');
		//$this->db->join('categorias','usuarios_categorias.categorias_id = categorias.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroCategoria)){
			$this->db->like('categorias.codigo', $filtroCategoria);
			$this->db->or_like('categorias.nombre', $filtroCategoria);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('categorias.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerCategoria($idCategoria, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('categorias h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idCategoria);
		$categoria = $this->db->get();
		return $categoria->result_array();
	}

	public function listarCategorias($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.estado, h.created_at, h.updated_at');
		$this->db->from('categorias h');
		$this->db->where('h.estado', 1);
		$categoria = $this->db->get();
		return $categoria->result_array();
	}

	public function desactivarCategoria($idCategoria, $id_usuario)
	{
		try{
			$categoria = $this->db->get_where('categorias', array('id' => $idCategoria, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_categoria' => null
					  );

			if (sizeof($categoria) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCategoria);
			    $this->db->update('categorias', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_categoria'] = $idCategoria;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la Categoria.";
				}else{
					$respuesta['id_categoria'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_categoria'] = -1;
		}

		return $respuesta;
	}

	public function activarCategoria($idCategoria, $id_usuario)
	{
		try{
			$categoria = $this->db->get_where('categorias', array('id' => $idCategoria, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_categoria' => null
					  );

			if (sizeof($categoria) > 0) {

				$data3 = array(
			        'estado' => 1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCategoria);
			    $this->db->update('categorias', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_categoria'] = $idCategoria;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la Categoria.";
				}else{
					$respuesta['id_categoria'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_categoria'] = -1;
		}

		return $respuesta;
	}

	public function agregarCategoria($idCategoria, $codigo, $nombre, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_categoria' => null);

			$data = array(
		        //'id_categoria' => $idCategoria,
				'codigo' => $codigo,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idCategoria && !is_null($idCategoria)) {
				$categoria = $this->db->get_where('categorias', array('id' => $idCategoria))->result();
				if (sizeof($categoria) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idCategoria);
					$this->db->update('categorias', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_categoria'] = $idCategoria;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Categoria.";
					}else{
						$respuesta['id_categoria'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_categoria'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La Categoria no existe.";
				}
			}else{
				$this->db->insert('categorias', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_categoria = $this->db->insert_id();
					$respuesta['id_categoria'] = $id_categoria;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Categoria.";
				}else{
					$respuesta['id_categoria'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_categoria'] = -1;
		}
		return $respuesta;
	}

	public function eliminarCategoria($idCategoria, $id_usuario)
	{
		try{
			$categoria = $this->db->get_where('categorias', array('id' => $idCategoria, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_categoria' => null
					  );

			if (sizeof($categoria) > 0) {

				$data3 = array(
			        'estado' => -1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCategoria);
			    $this->db->update('categorias', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_categoria'] = $idCategoria;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente la Categoria.";
				}else{
					$respuesta['id_categoria'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_categoria'] = -1;
		}
		return $respuesta;
	}

	
}