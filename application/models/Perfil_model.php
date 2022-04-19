<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Perfil_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarPerfil()
	{
		$perfiles = $this->db->get('perfiles');
		return $perfiles->result_array();
	}

	public function obtenerPerfiles($idUsuario)
	{
		$query = $this->db->get('perfiles'); 
		return $query->result_array();
	}

}	
