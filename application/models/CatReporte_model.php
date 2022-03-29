<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CatReporte_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function buscarCatReporte($filtroCatReporte, $id_usuario)
	{
		$this->db->select('categoria_reporte.id, categoria_reporte.codigo, categoria_reporte.nombre');
		$this->db->from('categoria_reporte');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_categoria_reporte','usuarios.id_usuario = usuarios_categoria_reporte.id_usuario');
		//$this->db->join('categoria_reporte','usuarios_categoria_reporte.categoria_reporte_id = categoria_reporte.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroCatReporte)){
			$this->db->like('categoria_reporte.codigo', $filtroCatReporte);
			$this->db->or_like('categoria_reporte.nombre', $filtroCatReporte);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('categoria_reporte.id_estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerCatReporte($idCatReporte, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.id_estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('categoria_reporte h');
		$this->db->where('h.id_estado', 1);
		$this->db->where('h.id', $idCatReporte);
		$catReporte = $this->db->get();
		return $catReporte->result_array();
	}

	public function listarCatReportes($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.id_estado, h.created_at, h.updated_at');
		$this->db->from('categoria_reporte h');
		$this->db->where('h.id_estado', 1);
		$catReporte = $this->db->get();
		return $catReporte->result_array();
	}

	public function agregarCatReporte($idCatReporte, $codigo, $nombre, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_catReporte' => null);

			$data = array(
		        //'id_catReporte' => $idCatReporte,
				'codigo' => $codigo,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idCatReporte && !is_null($idCatReporte)) {
				$catReporte = $this->db->get_where('categoria_reporte', array('id' => $idCatReporte))->result();
				if (sizeof($catReporte) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idCatReporte);
					$this->db->update('categoria_reporte', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_catReporte'] = $idCatReporte;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la CatReporte.";
					}else{
						$respuesta['id_catReporte'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_catReporte'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La CatReporte no existe.";
				}
			}else{
				$this->db->insert('categoria_reporte', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_catReporte = $this->db->insert_id();
					$respuesta['id_catReporte'] = $id_catReporte;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la CatReporte.";
				}else{
					$respuesta['id_catReporte'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_catReporte'] = -1;
		}
		return $respuesta;
	}

	public function eliminarCatReporte($idCatReporte, $id_usuario)
	{
		try{
			$catReporte = $this->db->get_where('categoria_reporte', array('id' => $idCatReporte, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_catReporte' => null
					  );

			if (sizeof($catReporte) > 0) {

				$data3 = array(
			        'estado' => -1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCatReporte);
			    $this->db->update('categoria_reporte', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_catReporte'] = $idCatReporte;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente la CatReporte.";
				}else{
					$respuesta['id_catReporte'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_catReporte'] = -1;
		}
		return $respuesta;
	}

	
}