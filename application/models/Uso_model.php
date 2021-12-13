<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Uso_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarUsos()
	{
		$this->db->select('usos.id, usos.codigo, usos.nombre, usos.observaciones, usos.estado, usos.created_at, usos.updated_at, usos.id_usuario');
		$this->db->from('usos');
		$this->db->where('usos.estado', 1);
		$usos = $this->db->get();
		return $usos->result_array();
	}

}	
