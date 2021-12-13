<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Carpeta_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarCarpetasUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_carpetas.carpetas_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_carpetas','usuarios.id_usuario = usuarios_carpetas.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('carpetas.id, carpetas.codigo, carpetas.nombre');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_carpetas','usuarios.id_usuario = usuarios_carpetas.id_usuario');
			$this->db->join('carpetas','usuarios_carpetas.carpetas_id = carpetas.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('carpetas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('carpetas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('carpetas.id, carpetas.codigo, carpetas.nombre');
			$this->db->from('carpetas');
			if (!is_null($id_servicio_salud))
				$this->db->where('carpetas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('carpetas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}

		
	}

	public function buscarCarpeta($filtroCarpeta, $id_usuario)
	{
		$this->db->select('carpetas.id, carpetas.codigo, carpetas.nombre');
		$this->db->from('carpetas');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_carpetas','usuarios.id_usuario = usuarios_carpetas.id_usuario');
		//$this->db->join('carpetas','usuarios_carpetas.carpetas_id = carpetas.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroCarpeta)){
			$this->db->like('carpetas.codigo', $filtroCarpeta);
			$this->db->or_like('carpetas.nombre', $filtroCarpeta);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('carpetas.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerCarpeta($idCarpeta, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('carpetas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idCarpeta);
		$carpeta = $this->db->get();
		return $carpeta->result_array();
	}

	public function listarCarpetas($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.estado, h.created_at, h.updated_at');
		$this->db->from('carpetas h');
		$this->db->where('h.estado', 1);
		$carpeta = $this->db->get();
		return $carpeta->result_array();
	}

	public function desactivarCarpeta($idCarpeta, $id_usuario)
	{
		try{
			$carpeta = $this->db->get_where('carpetas', array('id' => $idCarpeta, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_carpeta' => null
					  );

			if (sizeof($carpeta) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCarpeta);
			    $this->db->update('carpetas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_carpeta'] = $idCarpeta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la Carpeta.";
				}else{
					$respuesta['id_carpeta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_carpeta'] = -1;
		}

		return $respuesta;
	}

	public function activarCarpeta($idCarpeta, $id_usuario)
	{
		try{
			$carpeta = $this->db->get_where('carpetas', array('id' => $idCarpeta, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_carpeta' => null
					  );

			if (sizeof($carpeta) > 0) {

				$data3 = array(
			        'estado' => 1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idCarpeta);
			    $this->db->update('carpetas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_carpeta'] = $idCarpeta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la Carpeta.";
				}else{
					$respuesta['id_carpeta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_carpeta'] = -1;
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

	public function agregarCarpeta($idCarpeta, $codigo, $nombre, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_carpeta' => null);

			$data = array(
		        //'id_carpeta' => $idCarpeta,
				'codigo' => $codigo,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idCarpeta && !is_null($idCarpeta)) {
				$carpeta = $this->db->get_where('carpetas', array('id' => $idCarpeta))->result();
				if (sizeof($carpeta) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idCarpeta);
					$this->db->update('carpetas', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_carpeta'] = $idCarpeta;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Carpeta.";
					}else{
						$respuesta['id_carpeta'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_carpeta'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La Carpeta no existe.";
				}
			}else{
				$this->db->insert('carpetas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_carpeta = $this->db->insert_id();
					$respuesta['id_carpeta'] = $id_carpeta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Carpeta.";
				}else{
					$respuesta['id_carpeta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_carpeta'] = -1;
		}
		return $respuesta;
	}

	public function agregarCentroCostoCarpeta($idCentroCosto, $idCarpeta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_carpeta_centro_costos' => null);

			$id_carpeta_centro_costos = null;
			$this->db->select('hcc.id, hcc.carpetas_id, hcc.centro_costos_id');
			$this->db->from('carpetas_centro_costos hcc');
			$this->db->where('hcc.carpetas_id', $idCarpeta);
			$this->db->where('hcc.centro_costos_id', $idCentroCosto);
			$carpeta_cc = $this->db->get();
			$carpeta_cc = $carpeta_cc->result_array();

			if (sizeof($carpeta_cc) > 0) {
				$id_carpeta_centro_costos = $carpeta_cc[0]["id"];
			}

			$data = array(
		        'carpetas_id' => $idCarpeta,
				'centro_costos_id' => $idCentroCosto
			);

			if ($id_carpeta_centro_costos && !is_null($id_carpeta_centro_costos) ) {
				$this->db->where('id', $id_carpeta_centro_costos);
				$this->db->update('carpetas_centro_costos', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_carpeta_centro_costos'] = $id_carpeta_centro_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Carpeta Centro de Costo.";
				}else{
					$respuesta['id_carpeta_centro_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('carpetas_centro_costos', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_carpeta_centro_costos = $this->db->insert_id();
					$respuesta['id_carpeta_centro_costos'] = $id_carpeta_centro_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Centro de Costo al Carpeta.";
				}else{
					$respuesta['id_carpeta_centro_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_carpeta_centro_costos'] = -1;
		}
		return $respuesta;
	}

	public function agregarItemCostoCarpeta($idItemCosto, $idCarpeta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_carpeta_item_costos' => null);

			$id_carpeta_item_costos = null;
			$this->db->select('hic.id, hic.carpetas_id, hic.suministros_id');
			$this->db->from('carpetas_suministros hic');
			$this->db->where('hic.carpetas_id', $idCarpeta);
			$this->db->where('hic.suministros_id', $idItemCosto);
			$carpeta_ic = $this->db->get();
			$carpeta_ic = $carpeta_ic->result_array();

			if (sizeof($carpeta_ic) > 0) {
				$id_carpeta_item_costos = $carpeta_ic[0]["id"];
			}

			$data = array(
		        'carpetas_id' => $idCarpeta,
				'suministros_id' => $idItemCosto
			);

			if ($id_carpeta_item_costos && !is_null($id_carpeta_item_costos) ) {
				$this->db->where('id', $id_carpeta_item_costos);
				$this->db->update('carpetas_suministros', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_carpeta_item_costos'] = $id_carpeta_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Carpeta Item de Costo.";
				}else{
					$respuesta['id_carpeta_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('carpetas_suministros', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_carpeta_item_costos = $this->db->insert_id();
					$respuesta['id_carpeta_item_costos'] = $id_carpeta_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Item de Costo al Carpeta.";
				}else{
					$respuesta['id_carpeta_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_carpeta_item_costos'] = -1;
		}
		return $respuesta;
	}

	public function listarCentroCostosCarpeta($idGrupoCC, $idTipoCC, $idTipoATCC, $idUnidadProduccion, $idCarpeta, $idUsuario)
	{
		$estados = array(0, 1);
		$this->db->select('cc.id, cc.codigo, cc.nombre, cc.estado, cc.created_at, cc.updated_at, cc.grupo_cc_id, cc.id_perc, cc.primera_produccion_uni_id, cc.segunda_produccion_uni_id, cc.tercera_produccion_uni_id, cc.cuarta_produccion_uni_id, cc.quinta_produccion_uni_id,
		gc.codigo as codigo_gc, gc.nombre as grupo_cc, tc.codigo as codigo_tc, tc.nombre as tipo_cc, tac.codigo as codigo_tac, tac.nombre as tipo_at_cc,
        up1.codigo as codigo_up1, up1.nombre as up1,
        up2.codigo as codigo_up1, up2.nombre as up2,
        up3.codigo as codigo_up1, up3.nombre as up3,
        up4.codigo as codigo_up1, up4.nombre as up4,
        up5.codigo as codigo_up1, up5.nombre as up5');
        $this->db->from('carpetas h');
		$this->db->join('carpetas_centro_costos hcc', 'h.id = hcc.carpetas_id');
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
		$this->db->where('h.id', $idCarpeta);
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

	public function listarItemCostosCarpeta($tipoIC, $idCarpeta, $idUsuario)
	{
		$estados = array(0, 1);
	    $this->db->select('s.id, s.codigo, s.nombre, s.tipo_suministros_id, s.id_estado, s.created_at, s.updated_at, s.id_perc,
	    					ts.nombre as tipo_item_costo');
		$this->db->from('carpetas h');
		$this->db->join('carpetas_suministros hs','h.id = hs.carpetas_id');
		$this->db->join('suministros s', 'hs.suministros_id = s.id');
		$this->db->join('tipo_suministros ts','s.tipo_suministros_id = ts.id');
		$this->db->where('s.id_estado', 1);
		$this->db->where_in('h.estado', $estados);
		$this->db->where('h.id', $idCarpeta);
		if (!is_null($tipoIC))
			$this->db->where('ts.id', $tipoIC);
		$resultado = $this->db->get();
		return $resultado->result_array();
	}

	public function eliminarCarpetaInspeccion($idInspeccion, $id_usuario){
		try{
			$carpetas_inspeccion = $this->db->get_where('inspecciones_carpetas', array('id_inspeccion' => $idInspeccion, 'id_estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_inspeccion' => null
					  );

			if (sizeof($carpetas_inspeccion) > 0) {
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id_inspeccion', $idInspeccion);
			    $this->db->where('id_estado', 1);
				$this->db->update('inspecciones_carpetas', array('id_estado' => -1));

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_inspeccion'] = $idInspeccion;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se han eliminado correctamente las respuestas de Carpetas a la Inspeccion.";
				}else{
					$respuesta['id_inspeccion'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_carpeta'] = $idInspeccion;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "La Inspeccion no posee respuestas de Carpetas Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_inspeccion'] = -1;
		}
		return $respuesta;
	}
}