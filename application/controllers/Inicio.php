<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inicio extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('inicio_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();

		if($this->session->has_userdata('id_usuario'))
		{
			$perfil = $this->usuario_model->traerPerfilUsu($usuario["id_usuario"]);

			$usuario['controller'] = 'inicio';
			if(isset($perfil[0])){
				$usuario['perfil'] = $perfil[0];
			}else{
				$usuario['perfil'] = array("perfil" => "Usuario sin Perfil");
			}

			$this->load->view('temp/header', $usuario);
			$this->load->view('temp/menu', $usuario);
			$this->load->view('inicioSesion', $usuario);
			$this->load->view('temp/footer', $usuario);
		}else
		{
			$this->session->sess_destroy();
			$login['login'] = 0;
			$this->load->view('temp/header_index', $login);
			$this->load->view('temp/menu_index');
			$this->load->view('inicioSesion');
			$this->load->view('temp/footer');
		}
	}

	public function inicio()
	{
		$usuario = $this->session->userdata();
		if(!$usuario){
			$this->session->sess_destroy();
			echo 'asdfsadf';
		}else
		{
			$login['login'] = 0;
			$this->load->view('temp/header_index', $login);
			$this->load->view('temp/menu_index');
			$this->load->view('inicioSesion');
			$this->load->view('temp/footer');
		}
	}

	public function listarConveniosGrafico(){
		$datos[] = array();
     	unset($datos[0]);

     	$array = [1, 7, 8, 9, 10, 11, 20];
		$resultado = 0;
		$datos[] = array();
     	unset($datos[0]);
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario'))
		{
			$datos_usuario = $this->usuario_model->obtenerUsuario($usuario["id_usuario"]);
			$id_perfil = $datos_usuario[0]["id_perfil"];
			if(array_search($id_perfil, $array) > 0){
				if ($_SERVER['REQUEST_METHOD'] === 'POST') {

					mysqli_next_result($this->db->conn_id);
					$datos_usuario = $this->usuario_model->obtenerUsuario($usuario["id_usuario"]);
					$usuario['id_perfil'] = $datos_usuario[0]['id_perfil'];

					mysqli_next_result($this->db->conn_id);
					$datos = $this->inicio_model->listarConveniosGrafico("null", "null", "null", "null", $usuario["id_usuario"]);
					
					$resultado = 1;
				}
			}else{
				$resultado = 0;
			}
			$datos = array('resultado' => $resultado, 'estadosConvenios' => $datos);
			echo json_encode($datos);
		}else
		{
			redirect('Login');
		}
	}
}
