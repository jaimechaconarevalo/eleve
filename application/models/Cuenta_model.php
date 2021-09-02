<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cuenta_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarCuentasUsu($id_usuario)
	{
		$query = $this->db->query('CALL `institucionminsal`.`listarCuentasUsu`('.$id_usuario.');');
		return $query->result_array();
	}

	public function obtenerCuenta($id_cuenta)
	{
		$query = $this->db->query('CALL `institucionminsal`.`obtenerCuenta`('.$id_cuenta.');');
		return $query->result_array();
	}


}