<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Empresa_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarEmpresasUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_empresas.empresas_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_empresas','usuarios.id_usuario = usuarios_empresas.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('empresas.id, empresas.codigo, empresas.nombre');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_empresas','usuarios.id_usuario = usuarios_empresas.id_usuario');
			$this->db->join('empresas','usuarios_empresas.empresas_id = empresas.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('empresas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('empresas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('empresas.id, empresas.codigo, empresas.nombre');
			$this->db->from('empresas');
			if (!is_null($id_servicio_salud))
				$this->db->where('empresas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('empresas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}

		
	}

	public function buscarEmpresa($filtroEmpresa, $id_usuario)
	{
		$this->db->select('empresas.id, empresas.codigo, empresas.nombre');
		$this->db->from('empresas');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_empresas','usuarios.id_usuario = usuarios_empresas.id_usuario');
		//$this->db->join('empresas','usuarios_empresas.empresas_id = empresas.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroEmpresa)){
			$this->db->like('empresas.codigo', $filtroEmpresa);
			$this->db->or_like('empresas.nombre', $filtroEmpresa);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('empresas.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerEmpresa($idEmpresa, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('empresas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idEmpresa);
		$empresa = $this->db->get();
		return $empresa->result_array();
	}

	public function listarEmpresas($id_usuario)
	{
		$this->db->select('h.id_empresa, h.rut, h.razon_social, h.num_registro, h.direccion, h.email, h.id_estado, h.created_at, h.updated_at');
		$this->db->from('empresas_mantenedoras h');
		$this->db->where('h.id_estado', 1);
		$empresa = $this->db->get();
		return $empresa->result_array();
	}

	public function desactivarEmpresa($idEmpresa, $id_usuario)
	{
		try{
			$empresa = $this->db->get_where('empresas', array('id' => $idEmpresa, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_empresa' => null
					  );

			if (sizeof($empresa) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idEmpresa);
			    $this->db->update('empresas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_empresa'] = $idEmpresa;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la Empresa.";
				}else{
					$respuesta['id_empresa'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_empresa'] = -1;
		}

		return $respuesta;
	}

	public function activarEmpresa($idEmpresa, $id_usuario)
	{
		try{
			$empresa = $this->db->get_where('empresas', array('id' => $idEmpresa, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_empresa' => null
					  );

			if (sizeof($empresa) > 0) {

				$data3 = array(
			        'estado' => 1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idEmpresa);
			    $this->db->update('empresas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_empresa'] = $idEmpresa;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la Empresa.";
				}else{
					$respuesta['id_empresa'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_empresa'] = -1;
		}

		return $respuesta;
	}

	public function listarClusterUsu($id_usuario)
	{
		$query = $this->db->get_where('cluster', array('estado =' => 1));
		$resultado = $query->result_array();
	    return $resultado;
	}

	public function listarRegionesUsu($id_usuario)
	{
		$query = $this->db->get_where('regiones', array('estado =' => 1));
		$resultado = $query->result_array();
	    return $resultado;
	}

	public function listarMacroZonasUsu($id_usuario)
	{
		$query = $this->db->get_where('macro_zonas', array('estado =' => 1));
		$resultado = $query->result_array();
	    return $resultado;
	}

	public function agregarEmpresa($idEmpresa, $rut, $nombre, $numRegistro, $direccion, $email, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_empresa' => null);

			$data = array(
		        //'id_empresa' => $idEmpresa,
				'rut' => $rut,
				'razon_social' => $nombre,
				'num_registro' => $numRegistro,
				'direccion' => $direccion,
				'email' => $email,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idEmpresa && !is_null($idEmpresa)) {
				$empresa = $this->db->get_where('empresas_mantenedoras', array('id' => $idEmpresa))->result();
				if (sizeof($empresa) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idEmpresa);
					$this->db->update('empresas_mantenedoras', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_empresa'] = $idEmpresa;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Empresa.";
					}else{
						$respuesta['id_empresa'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_empresa'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La Empresa no existe.";
				}
			}else{
				$this->db->insert('empresas_mantenedoras', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_empresa = $this->db->insert_id();
					$respuesta['id_empresa'] = $id_empresa;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Empresa.";
				}else{
					$respuesta['id_empresa'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_empresa'] = -1;
		}
		return $respuesta;
	}

	public function agregarEdificioEmpresa($id, $orden, $rol, $rut, $nombre, $direccion, $observacion, $idEmpresa, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_empresa_edificio' => null);

			if (isset($id)) {
				$id_empresa_edificio = null;
				$this->db->select('e.id, e.rol, e.nombre, e.rut, e.domicilio, e.observaciones, e.id_usuario, e.id_empresa, e.id_estado, e.created_at, e.updated_at');
				$this->db->from('edificios e');
				$this->db->where('e.id_empresa', $idEmpresa);
				$this->db->where('e.id', $id);
				$this->db->where('e.id_estado', 1);
				$empresa_cc = $this->db->get();
				$empresa_cc = $empresa_cc->result_array();

				if (sizeof($empresa_cc) > 0)
					$id_empresa_edificio = $empresa_cc[0]["id"];
			}

			$data = array(
		        'orden' => $orden,
				'rol' => $rol,
				'rut' => $rut,
				'nombre' => $nombre,
				'domicilio' => $direccion,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($id_empresa_edificio && !is_null($id_empresa_edificio) ) {
				$this->db->where('id', $id_empresa_edificio);
				$this->db->update('edificios', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_empresa_edificio'] = $id_empresa_edificio;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente el Edificio a la Empresa.";
				}else{
					$respuesta['id_empresa_edificio'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('edificios', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_empresa_edificio = $this->db->insert_id();
					$respuesta['id_empresa_edificio'] = $id_empresa_edificio;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Edificio a la Empresa.";
				}else{
					$respuesta['id_empresa_edificio'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_empresa_edificio'] = -1;
		}
		return $respuesta;
	}

	public function agregarItemCostoEmpresa($idItemCosto, $idEmpresa, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_empresa_item_costos' => null);

			$id_empresa_item_costos = null;
			$this->db->select('hic.id, hic.empresas_id, hic.suministros_id');
			$this->db->from('empresas_suministros hic');
			$this->db->where('hic.empresas_id', $idEmpresa);
			$this->db->where('hic.suministros_id', $idItemCosto);
			$empresa_ic = $this->db->get();
			$empresa_ic = $empresa_ic->result_array();

			if (sizeof($empresa_ic) > 0) {
				$id_empresa_item_costos = $empresa_ic[0]["id"];
			}

			$data = array(
		        'empresas_id' => $idEmpresa,
				'suministros_id' => $idItemCosto
			);

			if ($id_empresa_item_costos && !is_null($id_empresa_item_costos) ) {
				$this->db->where('id', $id_empresa_item_costos);
				$this->db->update('empresas_suministros', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_empresa_item_costos'] = $id_empresa_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Empresa Item de Costo.";
				}else{
					$respuesta['id_empresa_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('empresas_suministros', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_empresa_item_costos = $this->db->insert_id();
					$respuesta['id_empresa_item_costos'] = $id_empresa_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Item de Costo al Empresa.";
				}else{
					$respuesta['id_empresa_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_empresa_item_costos'] = -1;
		}
		return $respuesta;
	}

	public function listarCentroCostosEmpresa($idGrupoCC, $idTipoCC, $idTipoATCC, $idUnidadProduccion, $idEmpresa, $idUsuario)
	{
		$estados = array(0, 1);
		$this->db->select('cc.id, cc.codigo, cc.nombre, cc.estado, cc.created_at, cc.updated_at, cc.grupo_cc_id, cc.id_perc, cc.primera_produccion_uni_id, cc.segunda_produccion_uni_id, cc.tercera_produccion_uni_id, cc.cuarta_produccion_uni_id, cc.quinta_produccion_uni_id,
		gc.codigo as codigo_gc, gc.nombre as grupo_cc, tc.codigo as codigo_tc, tc.nombre as tipo_cc, tac.codigo as codigo_tac, tac.nombre as tipo_at_cc,
        up1.codigo as codigo_up1, up1.nombre as up1,
        up2.codigo as codigo_up1, up2.nombre as up2,
        up3.codigo as codigo_up1, up3.nombre as up3,
        up4.codigo as codigo_up1, up4.nombre as up4,
        up5.codigo as codigo_up1, up5.nombre as up5');
        $this->db->from('empresas h');
		$this->db->join('empresas_centro_costos hcc', 'h.id = hcc.empresas_id');
		$this->db->join('centro_costos cc','hcc.centro_costos_id = cc.id');
		$this->db->join('grupo_cc gc','cc.grupo_cc_id = gc.id', 'LEFT');
		$this->db->join('centro_costos_tipo_cc cctc','cc.id = cctc.centro_costos_id', 'LEFT');
		$this->db->join('tipo_cc tc','cctc.tipo_cc_id = tc.id', 'LEFT');
		$this->db->join('centro_costos_tipo_at_cc cctac','cc.id = cctac.centro_costos_id', 'LEFT');
		$this->db->join('tipo_at_cc tac','cctac.tipo_at_cc_id = tac.id', 'LEFT');
		$this->db->join('unidad_produccion up1','cc.primera_produccion_uni_id = up1.id', 'LEFT');
		$this->db->join('unidad_produccion up2','cc.segunda_produccion_uni_id = up2.id', 'LEFT');
		$this->db->join('unidad_produccion up3','cc.tercera_produccion_uni_id = up3.id', 'LEFT');
		$this->db->join('unidad_produccion up4','cc.cuarta_produccion_uni_id = up4.id', 'LEFT');
		$this->db->join('unidad_produccion up5','cc.quinta_produccion_uni_id = up5.id', 'LEFT');
		$this->db->where('cc.estado', 1);
		$this->db->where_in('h.estado', $estados);
		$this->db->where('h.id', $idEmpresa);
		if (!is_null($idGrupoCC))
			$this->db->where('gc.id', $idGrupoCC);
		if (!is_null($idTipoCC))
			$this->db->where('tc.id', $idTipoCC);
		if (!is_null($idTipoATCC))
			$this->db->where('tac.id', $idTipoATCC);

		if (!is_null($idUnidadProduccion)){
			$this->db->group_start();
			$this->db->or_where('up1.id', $idUnidadProduccion);
			$this->db->or_where('up2.id', $idUnidadProduccion);
			$this->db->or_where('up3.id', $idUnidadProduccion);
			$this->db->or_where('up4.id', $idUnidadProduccion);
			$this->db->or_where('up5.id', $idUnidadProduccion);
			$this->db->group_end();
		}

		$resultado = $this->db->get();
		return $resultado->result_array();
	}

	public function listarItemCostosEmpresa($tipoIC, $idEmpresa, $idUsuario)
	{
		$estados = array(0, 1);
	    $this->db->select('s.id, s.codigo, s.nombre, s.tipo_suministros_id, s.id_estado, s.created_at, s.updated_at, s.id_perc,
	    					ts.nombre as tipo_item_costo');
		$this->db->from('empresas h');
		$this->db->join('empresas_suministros hs','h.id = hs.empresas_id');
		$this->db->join('suministros s', 'hs.suministros_id = s.id');
		$this->db->join('tipo_suministros ts','s.tipo_suministros_id = ts.id');
		$this->db->where('s.id_estado', 1);
		$this->db->where_in('h.estado', $estados);
		$this->db->where('h.id', $idEmpresa);
		if (!is_null($tipoIC))
			$this->db->where('ts.id', $tipoIC);
		$resultado = $this->db->get();
		return $resultado->result_array();
	}

	public function eliminarCentroCostoEmpresa($idEmpresa, $id_usuario){
		try{
			$centro_costos_empresa = $this->db->get_where('empresas_centro_costos', array('empresas_id' => $idEmpresa))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_empresa' => null
					  );

			if (sizeof($centro_costos_empresa) > 0) {
			    $this->db->where('empresas_id', $idEmpresa);
				$this->db->delete('empresas_centro_costos');

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_empresa'] = $idEmpresa;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente los Centros de Costos dla Empresa.";
				}else{
					$respuesta['id_empresa'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_empresa'] = $idEmpresa;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "El empresa no posee Centro de Costos Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_empresa'] = -1;
		}

		return $respuesta;
	}

	public function eliminarItemCostoEmpresa($idEmpresa, $id_usuario){
		try{
			$item_costos_empresa = $this->db->get_where('empresas_suministros', array('empresas_id' => $idEmpresa))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_empresa' => null
					  );

			if (sizeof($item_costos_empresa) > 0) {
			    $this->db->where('empresas_id', $idEmpresa);
				$this->db->delete('empresas_suministros');

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_empresa'] = $idEmpresa;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente los Item de Costos dla Empresa.";
				}else{
					$respuesta['id_empresa'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_empresa'] = $idEmpresa;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "El empresa no posee Item de Costos Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_empresa'] = -1;
		}

		return $respuesta;
	}
}