<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Empresa extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('perfil_model');
		$this->load->model('empresa_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarEmpresas', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function agregarEmpresa()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$data = array();

				$accion = 'agregar';
				$idEmpresa = null;
				$rut = null;
				$nombre = null;
				$email = null;
				$numRegistro = null;
				$direccion = null;
				$observacion = null;
				$edificios_empresa = null;

				if(!is_null($this->input->POST('inputRut')) && trim($this->input->POST('inputRut')) != "")
					$rut = trim($this->input->POST('inputRut'));

				if(!is_null($this->input->POST('inputRazonSocial')) && trim($this->input->POST('inputRazonSocial')) != "")
					$nombre = trim($this->input->POST('inputRazonSocial'));

				if(!is_null($this->input->POST('inputEmail')) && trim($this->input->POST('inputEmail')) != "")
					$email = trim($this->input->POST('inputEmail'));

				if(!is_null($this->input->POST('inputNumRegistro')) && trim($this->input->POST('inputNumRegistro')) != "")
					$numRegistro = trim($this->input->POST('inputNumRegistro'));

				if(!is_null($this->input->POST('inputDireccion')) && trim($this->input->POST('inputDireccion')) != "")
					$direccion = trim($this->input->POST('inputDireccion'));

				if(!is_null($this->input->POST('inputObservaciones')) && trim($this->input->POST('inputObservaciones')) != "")
					$observacion = trim($this->input->POST('inputObservaciones'));

				#if(!is_null($this->input->POST('edificios_empresa')) && trim($this->input->POST('edificios_empresa')) != "")
				#	$edificios_empresa = json_decode($this->input->POST('edificios_empresa'), true);

				if(!is_null($this->input->POST('inputIdEmpresa')) && is_numeric($this->input->POST('inputIdEmpresa')))
				{
					$idEmpresa = $this->input->POST('inputIdEmpresa');
					$accion = 'modificado';
				}

				$respuesta = 0;
				$mensaje = '';

				$resultado = $this->empresa_model->agregarEmpresa($idEmpresa, $rut, $nombre, $numRegistro, $direccion, $email, $observacion, $usuario["id_usuario"]);
				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_empresa'])
					{
						if(is_null($idEmpresa)){
							$idEmpresa = (int)$resultado['id_empresa'];

							/*$contador = 0;
							foreach ($edificios_empresa as $edificio) {
								$id = $edificio[0];
								$orden = $edificio[1];
								$rol = $edificio[2];
								$rut = $edificio[3];
								$nombre = $edificio[4];
								$direccion = $edificio[5];
								$observacion = $edificio[6];

								$resultado = $this->empresa_model->agregarEdificioEmpresa($id, $orden, $rol, $rut, $nombre, $direccion, $observacion, $idEmpresa, $usuario["id_usuario"]);
								if (isset($resultado) && $resultado["resultado"] == 1)
									$contador++;
							}*/

							$data["resultado"] = 1;
							$data["mensaje"] = 'Se ha '.$accion.' la Empresa exitosamente. </br></br>ID: '.$idEmpresa.'</br></br>'.$resultado["mensaje"];

							#if ($contador > 0) {
							#	$mensaje .= ' Se han agregado '.$contador.' Edificios a la Empresa.</br></br>';
							#}
							
						}else{
							if (isset($resultado) && $resultado["resultado"] > 0) {
								$data["resultado"] = 1;
								$data["mensaje"] = 'Se ha '.$accion.' la Empresa exitosamente. </br></br>ID: '.$idEmpresa.'</br></br>'.$resultado["mensaje"];
							}else{
								$mensaje = 'Ha ocurrido un error al '.$accion.' la Empresa, '.$resultado["mensaje"];
							}
						}
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (isset($resultado["mensaje"])) {
							$data["resultado"] = -1;
							$data["mensaje"] = 'Ha ocurrido un error al '.$accion.' la Empresa, '.$resultado["mensaje"];
						}else{
							if (isset($resultado["mensaje"]["message"])) {
								$data["resultado"] = -1;
								$data["mensaje"] = 'Ha ocurrido un error al '.$accion.' la Empresa, Codigo: '.$resultado["mensaje"]["code"].', Mensaje: '.$resultado["mensaje"]["message"];
							}
						}
					}
				}

				echo json_encode($data);
			}else{
				$usuario['titulo'] = 'Agregar Empresa';
				$usuario['controller'] = 'empresa';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarEmpresa', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function eliminarEmpresa()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idEmpresa = null;
			if($this->input->POST('idEmpresa'))
				$idEmpresa = $this->input->POST('idEmpresa');
			$resultado = $this->empresa_model->eliminarEmpresa($idEmpresa, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function modificarEmpresa()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Empresa';
			$usuario['controller'] = 'empresa';

			if($this->input->GET('idEmpresa') && $this->input->GET('idEmpresa'))
			{
				$idEmpresa = $this->input->GET('idEmpresa');
				$empresa =  $this->empresa_model->obtenerEmpresa($idEmpresa, $usuario['id_usuario']);
				$usuario['empresa'] = $empresa[0];
				$usuario['titulo'] = 'Modificar Empresa';
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarEmpresa', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function listarEmpresas()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {

				$cluster = NULL;
				$servicio = NULL;
				$region = NULL;
				$macro_zona = NULL;

				$datos[] = array();
     			unset($datos[0]);

				if(!is_null($this->input->post('cluster')) && $this->input->post('cluster') != "-1"  && $this->input->post('cluster') != "")
					$cluster = $this->input->post('cluster');

				if(!is_null($this->input->post('servicio')) && $this->input->post('servicio') != "-1"  && $this->input->post('servicio') != "")
					$servicio = $this->input->post('servicio');

				if(!is_null($this->input->post('region')) && $this->input->post('region') != "-1"  && $this->input->post('region') != "")
					$region = $this->input->post('region');

				if(!is_null($this->input->post('macro_zona')) && $this->input->post('macro_zona') != "-1"  && $this->input->post('macro_zona') != "")
					$macro_zona = $this->input->post('macro_zona');

				$empresas =  $this->empresa_model->listarEmpresas($usuario["id_usuario"]);

				$table_empresas ='
				<table id="tListaEmpresas" class="table table-sm table-hover table-bordered">
				<thead class="thead-dark">
					<tr>
						<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Rut</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Raz&oacute;n Social</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">N° Registro</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Direcci&oacute;n</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Estado</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Fecha Creaci&oacute;n</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
						<th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					</tr>
				</thead>
				<tbody id="tbodyEmpresas">
		        ';

		        if(isset($empresas) && sizeof($empresas) > 0)
				{								
					foreach ($empresas as $empresa) {
						$table_empresas .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$empresa['id_empresa'].'</th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$empresa['rut'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$empresa['razon_social'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$empresa['num_registro'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$empresa['direccion'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.($empresa["id_estado"] == "1" ? "Activo" : "Desactivado").'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$empresa['created_at'].'</p></td>
						        
					        	<td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$empresa['id_empresa'].'" class="view_convenio" href="ModificarEmpresa/?idEmpresa='.$empresa['id_empresa'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="Modificar"></i>       		
					        		</a>
					        	</td>
					        	<td class="text-center align-middle registro botonTabla">';
	        					$table_empresas .= '<a id="trash_'.$empresa['id_empresa'].'" class="trash" href="#" data-toggle="modal" data-target="#modalEliminarEmpresa" data-id="'.$empresa['id_empresa'].'" data-empresa="'.$empresa['razon_social'].'">
						        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>       		
					        		</a>';
				        		

					        	$table_empresas .= '</td>
					    	</tr>';
					}
				}

		        $table_empresas .='
		        	</tbody>
		        </table>';

				$datos['table_empresas'] = $table_empresas;
				echo json_encode($datos);

				
			}else{
				$usuario['titulo'] = "Empresas";
				$empresas =  $this->empresa_model->listarEmpresas($usuario["id_usuario"]);
				$usuario['empresas'] = $empresas;
				
				$usuario['controller'] = 'empresa';

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarEmpresas', $usuario);
				$this->load->view('temp/footer');
			}
		}else
		{
			redirect('Inicio');
		}
	}

	public function desactivarEmpresa()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idEmpresa = null;
			if($this->input->POST('id_empresa'))
				$idEmpresa = $this->input->POST('id_empresa');
			$resultado = $this->empresa_model->desactivarEmpresa($idEmpresa, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function activarEmpresa()
	{
		$usuario = $this->session->userdata();
		if($usuario){

			$idEmpresa = null;
			if($this->input->POST('id_empresa'))
				$idEmpresa = $this->input->POST('id_empresa');
			$resultado = $this->empresa_model->activarEmpresa($idEmpresa, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function json_listarEmpresas()
	{
		$usuario = $this->session->userdata();
		if($usuario["id_usuario"]){

			$idEmpresa = null;
			$empresas_mantenedoras = array();
			$data = array();
			$dataCategoria = array();
			$cantCategoria = 0;
			$cantCategoriaPregunta = 0;
			$idCategoria = null;

			
			$empresas = $this->empresa_model->listarEmpresas($usuario['id_usuario']);
			if (sizeof($empresas) > 0) {
				foreach ($empresas as $empresa) {
					$row_e = array();
					$row_e[] = $empresa['id_empresa'];
					$row_e[] = $empresa['rut'];
					$row_e[] = $empresa['razon_social'];
					$row_e[] = $empresa['num_registro'];
					$row_e[] = $empresa['direccion'];
					$row_e[] = $empresa['id_estado'];
					$row_e[] = $empresa['created_at'];
					$row_e[] = $empresa['updated_at'];
					$empresas_mantenedoras[] = $row_e;
				}
			}
			
			$output = array(
				'empresas_mantenedoras' => $empresas_mantenedoras
			);
			echo json_encode($output);
		}else
		{
			redirect('Inicio');
		}
	}

}