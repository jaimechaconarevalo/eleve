<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Suspension_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarSuspensiones()
	{
		$this->db->select('suspensiones.id, suspensiones.codigo, suspensiones.nombre, suspensiones.observaciones, suspensiones.estado, suspensiones.created_at, suspensiones.updated_at, suspensiones.id_usuario, suspensiones.grupo_suspension');
		$this->db->from('suspensiones');
		$this->db->where('suspensiones.estado', 1);
		$suspensiones = $this->db->get();
		return $suspensiones->result_array();
	}

}	
