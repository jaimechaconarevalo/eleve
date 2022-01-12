<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('usuario_model');
		$this->load->model('perfil_model');
	}

	public function index()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('listarUsuarios', $usuario);
			$this->load->view('temp/footer');
		}else
		{
			//$data['message'] = 'Verifique su email y contrase&ntilde;a.';
			redirect('Inicio');
		}
	}

	public function listarUsuarios()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$perfilAU = NULL;

				$datos[] = array();
     			unset($datos[0]);

				if(!is_null($this->input->post('perfilAU')) && $this->input->post('perfilAU') != "-1"  && $this->input->post('perfilAU') != "")
					$perfilAU = $this->input->post('perfilAU');

				$usuarios = $this->usuario_model->obtener_usuarios($perfilAU);

				$table_usuarios ='
				<table id="tListaUsuarios" class="table table-sm table-hover table-bordered">
				<thead class="thead-dark">
					<tr>
						<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>
						<th scope="col" class="texto-pequenio text-center align-middle registro">Codigo</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Rut</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Nombres</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Apellidos</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Email</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro">Perfil</th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					    <th scope="col" class="texto-pequenio text-center align-middle registro"></th>
					</tr>
				</thead>
				<tbody id="tbodyUsuario">
		        ';

		        if(isset($usuarios) && sizeof($usuarios) > 0)
				{								
					foreach ($usuarios as $usuario) {
						$table_usuarios .= '<tr>
						        <th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">'.$usuario['id_usuario'].'</p></th>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$usuario['cod_usuario'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$usuario['rut'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$usuario['nombres'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$usuario['apellidos'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$usuario['email'].'</p></td>
						        <td class="text-center align-middle registro"><p class="texto-pequenio">'.$usuario['pf_nombre'].'</p></td>
						        <td class="text-center align-middle registro botonTabla">
						        	<a id="edit_'.$usuario['id_usuario'].'" class="view_usuario" href="ModificarUsuario/?idUsuario='.$usuario['id_usuario'].'" data-id="'.$usuario['id_usuario'].'" data-nombre="'.$usuario['nombres'].'">
						        		<i data-feather="edit-3" data-toggle="tooltip" data-placement="top" title="modificar"></i>
					        		</a>
					        	</td>
						        <td class="text-center align-middle registro botonTabla">
						        	<a id="trash_'.$usuario['id_usuario'].'" class="trash" href="#" data-id="'.$usuario['id_usuario'].'" data-nombre="'.$usuario['nombres'].'" data-apellido="'.$usuario['apellidos'].'" data-rut="'.$usuario['rut'].'" data-toggle="modal" data-target="#modalEliminarUsuario">
						        		<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i>
					        		</a>
					        	</td>
					    	</tr>';
						
					}
				}else
				{
					$table_usuarios .= '<tr>
							<td class="text-center" colspan="9">No se encuentran datos registrados.</td>
						  </tr>';
				}

		        $table_usuarios .='
		        	</tbody>
		        </table>';

				$datos = array('table_usuarios' =>$table_usuarios);
		        

		        echo json_encode($datos);

			}else{
				$usuarios = $this->usuario_model->obtener_usuarios(NULL);
				$perfiles = $this->perfil_model->listarPerfil();

				$usuario['perfiles'] = $perfiles;
				$usuario['usuarios'] = $usuarios;
				$usuario['controller'] = 'usuario';
				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('listarUsuarios', $usuario);
				$this->load->view('temp/footer', $usuario);
			}
		}
	}

	public function buscarUsuario()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$filtroUsuario = "";
			if($this->input->POST('usuario'))
				$filtroUsuario = $this->input->POST('usuario');
			echo json_encode($this->usuario_model->buscarUsuario($filtroUsuario, (int)$usuario["id_usuario"]));
		}
	}

	public function agregarUsuario()
	{
		$usuario = $this->session->userdata();
		if($this->session->userdata('id_usuario')){
			if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$accion = 'agregado';

				$rut = NULL;
				$idEmpresa = NULL;
				$nombres = NULL;
				$apellidos = NULL;
				$codUsuario = NULL;
				$idPerfil = NULL;
				$idUsuario = NULL;

				if(!is_null($this->input->POST('inputRut')) && trim($this->input->POST('inputRut')) != "")
					$rut = trim($this->input->POST('inputRut'));

				if(!is_null($this->input->POST('idEmpresa')) && trim($this->input->POST('idEmpresa')) != "")
					$idEmpresa = trim($this->input->POST('idEmpresa'));

				if(!is_null($this->input->POST('inputNombres')) && trim($this->input->POST('inputNombres')) != "")
					$nombres = trim($this->input->POST('inputNombres'));

				if(!is_null($this->input->POST('inputApellidos')) && trim($this->input->POST('inputApellidos')) != "")
					$apellidos = trim($this->input->POST('inputApellidos'));

				if(!is_null($this->input->POST('inputEmail')) && trim($this->input->POST('inputEmail')) != "")
					$email = trim($this->input->POST('inputEmail'));

				if(!is_null($this->input->POST('inputCodUsuario')) && trim($this->input->POST('inputCodUsuario')) != "")
					$codUsuario = trim($this->input->POST('inputCodUsuario'));

				if(!is_null($this->input->POST('selectPerfil')) && trim($this->input->POST('selectPerfil')) != "" && trim($this->input->POST('selectPerfil')) != "-1")
					$idPerfil = trim($this->input->POST('selectPerfil'));

								if(!is_null($this->input->POST('inputIdUsuario')) && is_numeric($this->input->POST('inputIdUsuario')))
				{
					$idUsuario = $this->input->POST('inputIdUsuario');
					$accion = 'modificado';
				}

				$contrasenia = substr(explode(" ", ucwords($nombres))[0], 0, 1).explode(" ", ucwords($apellidos))[0].date("Y");
				$respuesta = 0;
				$mensaje = '';
				$resultado = $this->usuario_model->agregarUsuario($idUsuario, $rut, $codUsuario, $nombres, $apellidos, $email, $contrasenia, $idPerfil, $usuario["id_usuario"]);


				if($resultado && $resultado["resultado"] > 0)
				{
					if($resultado['id_usuario'])
					{
						if(is_null($idUsuario))
							$idUsuario = (int)$resultado['id_usuario'];
						$resultado = 1;
						$mensaje = 'Se ha '.$accion.' el usuario exitosamente. '.$resultado["mensaje"];
					}
				}else
				{
					if($resultado["resultado"] === -1)
					{
						if (sizeof($resultado["mensaje"]) > 0) {
							// code...
						}
						$mensaje = 'Ha ocurrido un error al '.$accion.' el Usuario, Codigo: '.$resultado["mensaje"]["code"].'; Mensaje: '.$resultado["mensaje"]["message"];
					}
				}

				$data['resultado'] = $resultado;
				$data['mensaje'] = $mensaje;
				echo json_encode($data);

			}else{
				$usuario['titulo'] = 'Agregar Usuario';
				$usuario['controller'] = 'usuario';
				
				$perfiles =  $this->perfil_model->obtenerPerfiles($usuario["id_usuario"]);
				if($perfiles)
					$usuario['perfiles'] = $perfiles;

				$empresas =  $this->usuario_model->obtenerEmpresasUsu($usuario["id_usuario"]);
				if($empresas)
				{
					$usuario['empresas'] = $empresas;
				}

				$this->load->view('temp/header');
				$this->load->view('temp/menu', $usuario);
				$this->load->view('agregarUsuario', $usuario);
				$this->load->view('temp/footer', $usuario);
			}
			
		}else
		{
			redirect('Inicio');
		}
	}

	public function guardarUsuario()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			if(!is_null($this->input->POST('nombres')))
			{
				if(!is_null($this->input->POST('apellidos')))
				{
					$rut = "null";
					if(!is_null($this->input->POST('rut')) && trim($this->input->POST('rut')) != "")
						$rut = trim($this->input->POST('rut'));

					$idEmpresa = "null";
					if(!is_null($this->input->POST('idEmpresa')) && trim($this->input->POST('idEmpresa')) != "")
						$idEmpresa = trim($this->input->POST('idEmpresa'));

					$nombres = "null";
					if(!is_null($this->input->POST('nombres')) && trim($this->input->POST('nombres')) != "")
						$nombres = trim($this->input->POST('nombres'));

					$apellidos = "null";
					if(!is_null($this->input->POST('apellidos')) && trim($this->input->POST('apellidos')) != "")
						$apellidos = trim($this->input->POST('apellidos'));
						
					$email = "null";
					if(!is_null($this->input->POST('email')) && trim($this->input->POST('email')) != "")
						$email = trim($this->input->POST('email'));

					$codUsuario = "null";
					if(!is_null($this->input->POST('codUsuario')) && trim($this->input->POST('codUsuario')) != "")
						$codUsuario = trim($this->input->POST('codUsuario'));

					$idPerfil = "null";
					if(!is_null($this->input->POST('idPerfil')) && trim($this->input->POST('idPerfil')) != "")
						$idPerfil = trim($this->input->POST('idPerfil'));

					$contabilizar = "null";
					if(!is_null($this->input->POST('contabilizar')) && trim($this->input->POST('contabilizar')) != "")
						$contabilizar = trim($this->input->POST('contabilizar'));

					$accion = 'agregado';
					
					$idUsuario = 'null';
					if(!is_null($this->input->POST('idUsuario')) && is_numeric($this->input->POST('idUsuario')))
					{
						$idUsuario = $this->input->POST('idUsuario');
						$accion = 'modificado';
					}

					$respuesta = 0;
					$mensaje = '';

					$resultado = $this->usuario_model->guardarUsuario($idUsuario, $rut, $idEmpresa, $nombres, $apellidos, $email, $codUsuario, $contabilizar, $idPerfil,  $usuario["id_usuario"]);

					if($resultado[0] > 0)
					{

						if($resultado[0]['idUsuario'])
						{
							if($idUsuario == 'null')
								$idUsuario = (int)$resultado[0]['idUsuario'];
							
							$respuesta = 1;
							$mensaje = 'Se ha '.$accion.' el usuario exitosamente.';
						}
					}else
					{
						if($resultado === 0)
						{
							$mensaje = 'Ha ocurrido un error al '.$accion.' la categor&iacute;a, la categor&iacute;a no se encuentra registrado.';
						}
					}
					$data['respuesta'] = $respuesta;
					$data['mensaje'] = $mensaje;
					echo json_encode($data);
				}
			}
		}
	}

	public function eliminarUsuario()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$idUsuario = null;
			if($this->input->POST('idUsuario'))
				$idUsuario = $this->input->POST('idUsuario');
			$resultado = $this->usuario_model->eliminarUsuario($idUsuario, $usuario['id_usuario']);
			$respuesta = 0;
			if($resultado > 0)
				$respuesta = 1;
			echo json_encode($respuesta);
		}
	}

	public function modificarUsuario()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$usuario['titulo'] = 'Modificar Usuario';
			$usuario['controller'] = 'usuario';

			if($this->input->GET('idUsuario') && $this->input->GET('idUsuario'))
			{
				//mysqli_next_result($this->db->conn_id);
				$idUsuario = $this->input->GET('idUsuario');
				$usuarioSeleccionado =  $this->usuario_model->obtenerUsuario($idUsuario, $usuario['id_usuario']);
				$usuario['usuarioSeleccionado'] = $usuarioSeleccionado;
				

				$usuario['titulo'] = 'Modificar Usuario';
				$usuario['controller'] = 'usuario';
				
				$perfiles =  $this->perfil_model->obtenerPerfiles($usuario["id_usuario"]);
				if($perfiles)
					$usuario['perfiles'] = $perfiles;

				$empresas =  $this->usuario_model->obtenerEmpresasUsu($usuario["id_usuario"]);
				if($empresas)
				{
					$usuario['empresas'] = $empresas;
				}
			}

			$this->load->view('temp/header');
			$this->load->view('temp/menu', $usuario);
			$this->load->view('agregarUsuario', $usuario);
			$this->load->view('temp/footer');
		}
	}

	public function buscarHospital()
	{
		$usuario = $this->session->userdata();
		if($usuario){
			$filtroHospital = "";
			if($this->input->POST('filtroHospital'))
				$filtroHospital = $this->input->POST('filtroHospital');
			echo json_encode($this->hospital_model->buscarHospital($filtroHospital, (int)$usuario["id_usuario"]));
		}
	}
	
}