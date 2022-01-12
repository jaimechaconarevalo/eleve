<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Herramienta_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarHerramientasUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_herramientas.herramientas_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_herramientas','usuarios.id_usuario = usuarios_herramientas.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('herramientas.id, herramientas.codigo, herramientas.nombre');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_herramientas','usuarios.id_usuario = usuarios_herramientas.id_usuario');
			$this->db->join('herramientas','usuarios_herramientas.herramientas_id = herramientas.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('herramientas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('herramientas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('herramientas.id, herramientas.codigo, herramientas.nombre');
			$this->db->from('herramientas');
			if (!is_null($id_servicio_salud))
				$this->db->where('herramientas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('herramientas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}

		
	}

	public function buscarHerramienta($filtroHerramienta, $id_usuario)
	{
		$this->db->select('herramientas.id, herramientas.codigo, herramientas.nombre');
		$this->db->from('herramientas');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_herramientas','usuarios.id_usuario = usuarios_herramientas.id_usuario');
		//$this->db->join('herramientas','usuarios_herramientas.herramientas_id = herramientas.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroHerramienta)){
			$this->db->like('herramientas.codigo', $filtroHerramienta);
			$this->db->or_like('herramientas.nombre', $filtroHerramienta);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('herramientas.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerHerramienta($idHerramienta, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('herramientas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idHerramienta);
		$herramienta = $this->db->get();
		return $herramienta->result_array();
	}

	public function listarHerramientas($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.estado, h.created_at, h.updated_at');
		$this->db->from('herramientas h');
		$this->db->where('h.estado', 1);
		$herramienta = $this->db->get();
		return $herramienta->result_array();
	}

	public function desactivarHerramienta($idHerramienta, $id_usuario)
	{
		try{
			$herramienta = $this->db->get_where('herramientas', array('id' => $idHerramienta, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_herramienta' => null
					  );

			if (sizeof($herramienta) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idHerramienta);
			    $this->db->update('herramientas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_herramienta'] = $idHerramienta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la Herramienta.";
				}else{
					$respuesta['id_herramienta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_herramienta'] = -1;
		}

		return $respuesta;
	}

	public function activarHerramienta($idHerramienta, $id_usuario)
	{
		try{
			$herramienta = $this->db->get_where('herramientas', array('id' => $idHerramienta, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_herramienta' => null
					  );

			if (sizeof($herramienta) > 0) {

				$data3 = array(
			        'estado' => 1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idHerramienta);
			    $this->db->update('herramientas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_herramienta'] = $idHerramienta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la Herramienta.";
				}else{
					$respuesta['id_herramienta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_herramienta'] = -1;
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

	public function agregarHerramienta($idHerramienta, $codigo, $nombre, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_herramienta' => null);

			$data = array(
		        //'id_herramienta' => $idHerramienta,
				'codigo' => $codigo,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idHerramienta && !is_null($idHerramienta)) {
				$herramienta = $this->db->get_where('herramientas', array('id' => $idHerramienta))->result();
				if (sizeof($herramienta) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idHerramienta);
					$this->db->update('herramientas', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_herramienta'] = $idHerramienta;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Herramienta.";
					}else{
						$respuesta['id_herramienta'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_herramienta'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La Herramienta no existe.";
				}
			}else{
				$this->db->insert('herramientas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_herramienta = $this->db->insert_id();
					$respuesta['id_herramienta'] = $id_herramienta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Herramienta.";
				}else{
					$respuesta['id_herramienta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_herramienta'] = -1;
		}
		return $respuesta;
	}

	public function agregarCentroCostoHerramienta($idCentroCosto, $idHerramienta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_herramienta_centro_costos' => null);

			$id_herramienta_centro_costos = null;
			$this->db->select('hcc.id, hcc.herramientas_id, hcc.centro_costos_id');
			$this->db->from('herramientas_centro_costos hcc');
			$this->db->where('hcc.herramientas_id', $idHerramienta);
			$this->db->where('hcc.centro_costos_id', $idCentroCosto);
			$herramienta_cc = $this->db->get();
			$herramienta_cc = $herramienta_cc->result_array();

			if (sizeof($herramienta_cc) > 0) {
				$id_herramienta_centro_costos = $herramienta_cc[0]["id"];
			}

			$data = array(
		        'herramientas_id' => $idHerramienta,
				'centro_costos_id' => $idCentroCosto
			);

			if ($id_herramienta_centro_costos && !is_null($id_herramienta_centro_costos) ) {
				$this->db->where('id', $id_herramienta_centro_costos);
				$this->db->update('herramientas_centro_costos', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_herramienta_centro_costos'] = $id_herramienta_centro_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Herramienta Centro de Costo.";
				}else{
					$respuesta['id_herramienta_centro_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('herramientas_centro_costos', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_herramienta_centro_costos = $this->db->insert_id();
					$respuesta['id_herramienta_centro_costos'] = $id_herramienta_centro_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Centro de Costo al Herramienta.";
				}else{
					$respuesta['id_herramienta_centro_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_herramienta_centro_costos'] = -1;
		}
		return $respuesta;
	}

	public function agregarItemCostoHerramienta($idItemCosto, $idHerramienta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_herramienta_item_costos' => null);

			$id_herramienta_item_costos = null;
			$this->db->select('hic.id, hic.herramientas_id, hic.suministros_id');
			$this->db->from('herramientas_suministros hic');
			$this->db->where('hic.herramientas_id', $idHerramienta);
			$this->db->where('hic.suministros_id', $idItemCosto);
			$herramienta_ic = $this->db->get();
			$herramienta_ic = $herramienta_ic->result_array();

			if (sizeof($herramienta_ic) > 0) {
				$id_herramienta_item_costos = $herramienta_ic[0]["id"];
			}

			$data = array(
		        'herramientas_id' => $idHerramienta,
				'suministros_id' => $idItemCosto
			);

			if ($id_herramienta_item_costos && !is_null($id_herramienta_item_costos) ) {
				$this->db->where('id', $id_herramienta_item_costos);
				$this->db->update('herramientas_suministros', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_herramienta_item_costos'] = $id_herramienta_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Herramienta Item de Costo.";
				}else{
					$respuesta['id_herramienta_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('herramientas_suministros', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_herramienta_item_costos = $this->db->insert_id();
					$respuesta['id_herramienta_item_costos'] = $id_herramienta_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Item de Costo al Herramienta.";
				}else{
					$respuesta['id_herramienta_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_herramienta_item_costos'] = -1;
		}
		return $respuesta;
	}

	public function listarCentroCostosHerramienta($idGrupoCC, $idTipoCC, $idTipoATCC, $idUnidadProduccion, $idHerramienta, $idUsuario)
	{
		$estados = array(0, 1);
		$this->db->select('cc.id, cc.codigo, cc.nombre, cc.estado, cc.created_at, cc.updated_at, cc.grupo_cc_id, cc.id_perc, cc.primera_produccion_uni_id, cc.segunda_produccion_uni_id, cc.tercera_produccion_uni_id, cc.cuarta_produccion_uni_id, cc.quinta_produccion_uni_id,
		gc.codigo as codigo_gc, gc.nombre as grupo_cc, tc.codigo as codigo_tc, tc.nombre as tipo_cc, tac.codigo as codigo_tac, tac.nombre as tipo_at_cc,
        up1.codigo as codigo_up1, up1.nombre as up1,
        up2.codigo as codigo_up1, up2.nombre as up2,
        up3.codigo as codigo_up1, up3.nombre as up3,
        up4.codigo as codigo_up1, up4.nombre as up4,
        up5.codigo as codigo_up1, up5.nombre as up5');
        $this->db->from('herramientas h');
		$this->db->join('herramientas_centro_costos hcc', 'h.id = hcc.herramientas_id');
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
		$this->db->where('h.id', $idHerramienta);
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

	public function listarItemCostosHerramienta($tipoIC, $idHerramienta, $idUsuario)
	{
		$estados = array(0, 1);
	    $this->db->select('s.id, s.codigo, s.nombre, s.tipo_suministros_id, s.id_estado, s.created_at, s.updated_at, s.id_perc,
	    					ts.nombre as tipo_item_costo');
		$this->db->from('herramientas h');
		$this->db->join('herramientas_suministros hs','h.id = hs.herramientas_id');
		$this->db->join('suministros s', 'hs.suministros_id = s.id');
		$this->db->join('tipo_suministros ts','s.tipo_suministros_id = ts.id');
		$this->db->where('s.id_estado', 1);
		$this->db->where_in('h.estado', $estados);
		$this->db->where('h.id', $idHerramienta);
		if (!is_null($tipoIC))
			$this->db->where('ts.id', $tipoIC);
		$resultado = $this->db->get();
		return $resultado->result_array();
	}

	public function eliminarHerramientasInspeccion($idInspeccion, $id_usuario){
		try{
			$herramientas_inspeccion = $this->db->get_where('inspecciones_herramientas', array('id_inspeccion' => $idInspeccion, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($herramientas_inspeccion) > 0) {
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id_inspeccion', $idInspeccion);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_herramientas', array('id_estado' => -1));

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspeccion'] = $idInspeccion;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se han eliminado correctamente las respuestas de Herramientas a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_inspeccion'] = $idInspeccion;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "La Inspeccion no posee respuestas de Herramientas Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion'] = -1;
		}
		return $respuesta;
	}

	public function eliminarHerramienta($idHerramienta, $id_usuario)
	{
		try{
			$herramienta = $this->db->get_where('herramientas', array('id' => $idHerramienta, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_herramienta' => null
					  );

			if (sizeof($herramienta) > 0) {

				$data3 = array(
			        'estado' => -1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idHerramienta);
			    $this->db->update('herramientas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_herramienta'] = $idHerramienta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente la Herramienta.";
				}else{
					$respuesta['id_herramienta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_herramienta'] = -1;
		}
		return $respuesta;
	}
}