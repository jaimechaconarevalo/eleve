<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Traccion_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarTipoTracciones()
	{
		$this->db->select('tipo_tracciones.id, tipo_tracciones.codigo, tipo_tracciones.nombre, tipo_tracciones.observaciones, tipo_tracciones.estado, tipo_tracciones.created_at, tipo_tracciones.updated_at, tipo_tracciones.id_usuario, tipo_tracciones.grupo_suspension');
		$this->db->from('tipo_tracciones');
		$this->db->where('tipo_tracciones.estado', 1);
		$tipo_tracciones = $this->db->get();
		return $tipo_tracciones->result_array();
	}

}	
