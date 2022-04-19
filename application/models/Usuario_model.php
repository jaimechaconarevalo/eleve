<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function login($email, $contrasenia)
	{
		$this->db->select('usuarios.id_usuario, usuarios.rut, usuarios.nombres, usuarios.apellidos, perfiles.pf_analista, usuarios.contrasenia');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.email',$email);
		//$this->db->where('usuarios.fecha_baja','1');
		$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
		$usuario = $this->db->get();
		return $usuario->row_array();
	}
		/*$usuario = $this->db->get_where('usuarios', array('u_email' => $email, 'u_contrasenia' => $contrasenia), 1);
		return $usuario->row_array();
	}*/

	public function obtener_menu_usuario($id_usuario)
	{
		//$usuario = $this->db->get_where('usuarios', array('u_email' => $email, 'u_contrasenia' => $contrasenia), 1);
		$query = $this->db->query("select distinct me.id_menu, me.nombre, me.url, me.orden, me.id_modulo, me.id_rol,
	   (if(isnull(me.id_rol), 0, (select count(men.id_menu) from menus men where men.id_modulo = me.id_modulo and not isnull(men.id_rol)))) as cant_submenu
		from usuarios usu inner join usuarios_perfiles up on usu.id_usuario = up.id_usuario
						  inner join perfiles p on up.id_perfil = p.id_perfil
                    inner join perfiles_modulos_roles pmr on p.id_perfil = pmr.id_perfil
                    left join menus me on (if(isnull(pmr.id_rol), (pmr.id_modulo = me.id_modulo and me.id_rol is null), (pmr.id_modulo = me.id_modulo and pmr.id_rol = me.id_rol)))
		where usu.id_usuario = ".$id_usuario."
		and isnull(me.fecha_baja)
		order by me.id_rol, me.orden;");
		return $query->result_array();
	}

	public function agregarUsuario($idUsuario, $rut, $codigo, $nombres, $apellidos, $email, $contrasenia, $idPerfil, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_usuario' => null);

			$perfil = $this->db->get_where('perfiles', array('id_perfil' => $idPerfil))->result();
			if (sizeof($perfil) <= 0) {
				$respuesta['id_usuario'] = -1;
				$respuesta['resultado'] = -1;
				$respuesta['mensaje'] = "El Perfil no existe.";
				return $respuesta;
				exit;
			}

			$data = array(
		        'id_usuario' => $idUsuario,
				'rut' => $rut,
				'nombres' => $nombres,
				'apellidos' => $apellidos,
				'email' => $email,
				'cod_usuario' => $codigo,
				'id_empresa' => 2,
				'contrasenia' => password_hash($contrasenia, PASSWORD_DEFAULT)
			);

			$dataUpdate = array(
				'rut' => $rut,
				'nombres' => $nombres,
				'apellidos' => $apellidos,
				'email' => $email,
				'cod_usuario' => $codigo
			);

			if ($idUsuario && !is_null($idUsuario)) {
				$usuario = $this->db->get_where('usuarios', array('id_usuario' => $idUsuario))->result();
				if (sizeof($usuario) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id_usuario', $idUsuario);
					$this->db->update('usuarios', $dataUpdate);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_usuario'] = $idUsuario;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente el Usuario.";

						$dataPAU = array(
							'id_perfil' => $idPerfil
						);
						$this->db->where('id_usuario', $idUsuario);
						$this->db->update('usuarios_perfiles', $dataPAU);
					}else{
						$respuesta['id_usuario'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_usuario'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "El Usuario no existe.";
				}
			}else{
				$this->db->insert('usuarios', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_usuario = $this->db->insert_id();
					$respuesta['id_usuario'] = $id_usuario;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Usuario.";

					$dataPAU = array(
				        'id_usuario' => $id_usuario,
						'id_perfil' => $idPerfil
					);
					$this->db->insert('usuarios_perfiles', $dataPAU);
					$respuesta['id_usuario_perfil'] = $this->db->insert_id();
				}else{
					$respuesta['id_usuario'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_usuario'] = -1;
		}
		return $respuesta;
	}

	public function obtenerEmpresasUsu($id_usuario)
	{
		$this->db->select('e.id_empresa, e.e_titulo');
        $this->db->from('usuarios usu');
        $this->db->join('empresas e','usu.id_empresa = e.id_empresa');
        $this->db->where('usu.id_usuario = ', $id_usuario);
        $empresas = $this->db->get();
        return $empresas->result_array();
	}

	public function listarAnalistaUsu()
	{
		$query = $this->db->query("			select concat(usu.u_nombres, ' ', usu.u_apellidos) as nombre_usu from usuarios usu inner join usuarios_perfiles up on usu.id_usuario = up.id_usuario
			inner join perfiles p on up.id_perfil = p.id_perfil
			where p.pf_analista in (2, 3);");
		return $query->result_array();
	}

	public function traerPerfilUsu($id_usuario)
	{
		$query = $this->db->query("select p.pf_nombre as perfil, p.pf_analista from usuarios usu inner join usuarios_perfiles up on usu.id_usuario = up.id_usuario
		inner join perfiles p on up.id_perfil = p.id_perfil
		where usu.id_usuario = ".$id_usuario." group by p.pf_nombre, p.pf_analista;");
		return $query->result_array();
	}

	public function obtener_usuarios($idPerfil){
		$this->db->select('usu.id_usuario, usu.rut, usu.nombres, usu.apellidos, usu.cod_usuario, usu.email, 
			   p.id_perfil, p.pf_nombre');#, h.codigo, h.cod_deis, h.nombre');
		$this->db->from('usuarios usu');
		$this->db->join('usuarios_perfiles up','usu.id_usuario = up.id_usuario');
		$this->db->join('perfiles p','up.id_perfil = p.id_perfil');
		$this->db->where('usu.fecha_baja is NULL', NULL, FALSE);
		if (!is_null($idPerfil))
			$this->db->where('p.id_perfil', $idPerfil);
		$usuarios = $this->db->get();
		return $usuarios->result_array();
	}

	public function eliminarUsuario($idUsuario, $id_usuario)
	{
		try{
			$this->db->select('usu.id_usuario, usu.rut, usu.nombres, usu.apellidos, usu.email, usu.telefono, usu.celular, usu.direccion, usu.contrasenia, usu.cod_usuario, usu.contabilizar, usu.fecha_baja, usu.id_empresa');
			$this->db->from('usuarios usu');
			$this->db->where('usu.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('usu.id_usuario', $idUsuario);
			$usuario_respuesta = $this->db->get();


			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_usuario' => null
					  );

			if (sizeof($usuario_respuesta) > 0) {			    
				$this->db->set('fecha_baja', 'NOW()', FALSE);
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id_usuario', $idUsuario);
			    $this->db->update('usuarios');

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_usuario'] = $idUsuario;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente el Usuario.";
				}else{
					$respuesta['id_usuario'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_usuario'] = -1;
		}

		return $respuesta;
	}

	public function obtenerUsuario($idUsuario, $id_usuario)
	{
		$this->db->select('usu.id_usuario, usu.rut, usu.nombres, usu.apellidos, usu.email, usu.telefono, usu.celular, usu.direccion, usu.cod_usuario, usu.fecha_baja, usu.id_empresa, usu.created_at, usu.updated_at,
						   p.id_perfil, p.pf_nombre as perfil');
		$this->db->from('usuarios usu');
		$this->db->join('usuarios_perfiles up','usu.id_usuario = up.id_usuario', 'LEFT');
		$this->db->join('perfiles p','up.id_perfil = p.id_perfil', 'LEFT');
		$this->db->where('usu.id_usuario', $idUsuario);
		$resultado = $this->db->get();
		return $resultado->result_array();
	}


}	
