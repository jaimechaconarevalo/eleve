<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Perfil extends CI_Controller {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('perfil_model');
	}

	public function index()
	{
		$data['perfiles'] = $this->perfil_model->listarPerfil();

		$this->load->view('temp/header');
		$this->load->view('temp/menu');
		$this->load->view('ListarPerfil', $data);
		$this->load->view('temp/footer');
	}
}