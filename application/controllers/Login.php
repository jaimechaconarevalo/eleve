<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		//$this->load->library('recaptchalib');
		$this->load->library('recaptcha', $this->config->load('recaptcha'));
	}

	public function index()
	{
		if (!is_null($this->session->userdata('message')))
			$login['message'] = $this->session->userdata('message');

		$this->cerrar_sesion();
		$login['login'] = 1;
		$this->load->view('temp/header_index', $login);
		$this->load->view('login', $login);
		$this->load->view('temp/footer');
	}

	public function ingresar()
	{
		$email = strtolower(addslashes($this->input->post('email')));
		$contrasenia = addslashes($this->input->post('contrasenia'));
		$recaptchaResponse = $this->input->post('g-recaptcha-response');
		$privatekey = "6Lf5Q_AUAAAAAFpr19F34OHh9gkUlW80AoUd6r4Y";
		$userIp=$this->input->ip_address();
      	$response = $this->recaptcha->is_valid($recaptchaResponse, $userIp);
      	$response['success'] = true;
      	if ($response) {
      		if ($response['success'] && $response['success'] == true) {
      			$result = $this->usuario_model->login($email, $contrasenia);
      			if($result)
				{
					if(password_verify($contrasenia, $result['contrasenia']))
					{
						$menus = $this->obtener_menu($result['id_usuario']);
						$this->session->set_userdata('id_usuario', $result['id_usuario']);
						$this->session->set_userdata('rut', $result['rut']);
						$this->session->set_userdata('nombres', $result['nombres']);
						$this->session->set_userdata('apellidos', $result['apellidos']);
						$this->session->set_userdata('menu', $menus);
						redirect('Inicio');
					}else
					{
						$login['login'] = 1;
		      			$this->session->set_userdata('message', 'Verifique su email y contrase&ntilde;a.');
						redirect('Login');
					}
				}else{
					$login['login'] = 1;
	      			$this->session->set_userdata('message', 'Verifique su email y contrase&ntilde;a.');
					redirect('Login');
				}
      		}else{
      			$login['login'] = 1;
      			$this->session->set_userdata('message', 'La verificación del robot falló, por favor intente nuevamente.');
				redirect('Login');
      		}
      	}
	}

	private function obtener_menu($id_usuario)
	{
		$data = $this->usuario_model->obtener_menu_usuario($id_usuario);
		$menus[] = array();
		unset($menus);
		$cont = 0;
		foreach ($data as $row) {
			if(isset($row['cant_submenu']) && $row['cant_submenu'] == '0')
			{
				$menu['id_menu'] = $row['id_menu'];
				$menu['nombre'] = $row['nombre'];
				$menu['url'] = $row['url'];
				$menu['orden'] = $row['orden'];
				$menu['id_modulo'] = $row['id_modulo'];
				$menu['id_rol'] = $row['id_rol'];
				$menu['cant_submenu'] = $row['cant_submenu'];
				$menu['sub_menu'] = array();
				$menus[$cont] = $menu;
				$cont++;
			}elseif (isset($row['cant_submenu']) && (int)$row['cant_submenu'] > 0) {
				for ($i=0; $i < count($menus); $i++) {
					if($menus[$i]['id_modulo'] === $row['id_modulo'])
					{
						$sub_menu['id_menu'] = $row['id_menu'];
						$sub_menu['nombre'] = $row['nombre'];
						$sub_menu['url'] = $row['url'];
						$sub_menu['orden'] = $row['orden'];
						$sub_menu['id_modulo'] = $row['id_modulo'];
						$sub_menu['id_rol'] = $row['id_rol'];
						$sub_menu['cant_submenu'] = $row['cant_submenu'];
						array_push($menus[$i]['sub_menu'], $sub_menu);
					}
				}
			}
		}
		return $menus;
	}

	public function cerrar_sesion()
	{
		$usuario = $this->session->userdata();
		if($usuario)
		{
			$this->session->sess_destroy();
		}
	}
}