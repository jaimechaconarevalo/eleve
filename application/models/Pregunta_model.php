<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Pregunta_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarPreguntasUsu($id_usuario, $id_servicio_salud)
	{
		$this->db->select('perfiles.pf_analista, usuarios_preguntas.preguntas_id');
		$this->db->from('usuarios');
		$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		$this->db->join('usuarios_preguntas','usuarios.id_usuario = usuarios_preguntas.id_usuario');
		$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		$this->db->where('usuarios.id_usuario = '.$id_usuario);
		$es_admin = $this->db->get()->result_array();

		if (sizeof($es_admin) > 0 && isset($es_admin) && $es_admin[0]['pf_analista'] != 1) {
			$this->db->select('preguntas.id, preguntas.codigo, preguntas.nombre');
			$this->db->from('usuarios');
			$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
			$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
			$this->db->join('usuarios_preguntas','usuarios.id_usuario = usuarios_preguntas.id_usuario');
			$this->db->join('preguntas','usuarios_preguntas.preguntas_id = preguntas.id');
			$this->db->where('usuarios.id_usuario', $id_usuario);
			if (!is_null($id_servicio_salud))
				$this->db->where('preguntas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('usuarios.fecha_baja is NULL', NULL, FALSE);
			$this->db->where('preguntas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}else{
			$this->db->select('preguntas.id, preguntas.codigo, preguntas.nombre');
			$this->db->from('preguntas');
			if (!is_null($id_servicio_salud))
				$this->db->where('preguntas.servicio_salud_id', $id_servicio_salud);
			$this->db->where('preguntas.estado', 1);
			$usuario = $this->db->get();
			return $usuario->result_array();
		}

		
	}

	public function buscarPregunta($filtroPregunta, $id_usuario)
	{
		$this->db->select('preguntas.id, preguntas.codigo, preguntas.nombre, preguntas.filtro, preguntas.observaciones');
		$this->db->from('preguntas');
		//$this->db->from('usuarios');
		//$this->db->join('usuarios_perfiles','usuarios.id_usuario = usuarios_perfiles.id_usuario');
		//$this->db->join('perfiles','usuarios_perfiles.id_perfil = perfiles.id_perfil');
		//$this->db->join('usuarios_preguntas','usuarios.id_usuario = usuarios_preguntas.id_usuario');
		//$this->db->join('preguntas','usuarios_preguntas.preguntas_id = preguntas.id');
		//$this->db->where('usuarios.id_usuario', $id_usuario);
		if (!is_null($filtroPregunta)){
			$this->db->like('preguntas.codigo', $filtroPregunta);
			$this->db->or_like('preguntas.nombre', $filtroPregunta);
			//$this->db->like('column', 'pattern');
		}
		$this->db->where('preguntas.estado', 1);
		$usuario = $this->db->get();
		return $usuario->result_array();
	}

	public function obtenerPregunta($idPregunta, $id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.filtro, h.observaciones, h.estado, h.created_at, h.updated_at, h.id_usuario');
		$this->db->from('preguntas h');
		$this->db->where('h.estado', 1);
		$this->db->where('h.id', $idPregunta);
		$pregunta = $this->db->get();
		return $pregunta->result_array();
	}

	public function listarPreguntas($id_usuario)
	{
		$this->db->select('h.id, h.codigo, h.nombre, h.filtro, h.observaciones, h.estado, h.created_at, h.updated_at');
		$this->db->from('preguntas h');
		$this->db->where('h.estado', 1);
		$pregunta = $this->db->get();
		return $pregunta->result_array();
	}

	public function desactivarPregunta($idPregunta, $id_usuario)
	{
		try{
			$pregunta = $this->db->get_where('preguntas', array('id' => $idPregunta, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_pregunta' => null
					  );

			if (sizeof($pregunta) > 0) {

				$data3 = array(
			        'estado' => 0
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idPregunta);
			    $this->db->update('preguntas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta'] = $idPregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha desactivado correctamente la Pregunta.";
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_pregunta'] = -1;
		}

		return $respuesta;
	}

	public function activarPregunta($idPregunta, $id_usuario)
	{
		try{
			$pregunta = $this->db->get_where('preguntas', array('id' => $idPregunta, 'estado' => 0))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_pregunta' => null
					  );

			if (sizeof($pregunta) > 0) {

				$data3 = array(
			        'estado' => 1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idPregunta);
			    $this->db->update('preguntas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta'] = $idPregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha activado correctamente la Pregunta.";
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_pregunta'] = -1;
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

	public function agregarPregunta($idPregunta, $codigo, $nombre, $filtro, $observacion, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_pregunta' => null);

			$data = array(
		        //'id_pregunta' => $idPregunta,
				'codigo' => $codigo,
				'nombre' => $nombre,
				'filtro' => $filtro,
				'observaciones' => $observacion,
				'id_usuario' => $id_usuario
			);

			if ($idPregunta && !is_null($idPregunta)) {
				$pregunta = $this->db->get_where('preguntas', array('id' => $idPregunta))->result();
				if (sizeof($pregunta) > 0) {
					$this->db->set('updated_at', 'NOW()', FALSE);
					$this->db->where('id', $idPregunta);
					$this->db->update('preguntas', $data);

					if ($this->db->affected_rows() >= 1) {
						$respuesta['id_pregunta'] = $idPregunta;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = "Se ha actualizado correctamente la Pregunta.";
					}else{
						$respuesta['id_pregunta'] = -1;
						$respuesta['resultado'] = $this->db->affected_rows();
						$respuesta['mensaje'] = $this->db->error();
					}
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = -1;
					$respuesta['mensaje'] = "La Pregunta no existe.";
				}
			}else{
				$this->db->insert('preguntas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_pregunta = $this->db->insert_id();
					$respuesta['id_pregunta'] = $id_pregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente la Pregunta.";
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}	
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_pregunta'] = -1;
		}
		return $respuesta;
	}

	public function agregarCentroCostoPregunta($idCentroCosto, $idPregunta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_pregunta_centro_costos' => null);

			$id_pregunta_centro_costos = null;
			$this->db->select('hcc.id, hcc.preguntas_id, hcc.centro_costos_id');
			$this->db->from('preguntas_centro_costos hcc');
			$this->db->where('hcc.preguntas_id', $idPregunta);
			$this->db->where('hcc.centro_costos_id', $idCentroCosto);
			$pregunta_cc = $this->db->get();
			$pregunta_cc = $pregunta_cc->result_array();

			if (sizeof($pregunta_cc) > 0) {
				$id_pregunta_centro_costos = $pregunta_cc[0]["id"];
			}

			$data = array(
		        'preguntas_id' => $idPregunta,
				'centro_costos_id' => $idCentroCosto
			);

			if ($id_pregunta_centro_costos && !is_null($id_pregunta_centro_costos) ) {
				$this->db->where('id', $id_pregunta_centro_costos);
				$this->db->update('preguntas_centro_costos', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta_centro_costos'] = $id_pregunta_centro_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Pregunta Centro de Costo.";
				}else{
					$respuesta['id_pregunta_centro_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('preguntas_centro_costos', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_pregunta_centro_costos = $this->db->insert_id();
					$respuesta['id_pregunta_centro_costos'] = $id_pregunta_centro_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Centro de Costo al Pregunta.";
				}else{
					$respuesta['id_pregunta_centro_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_pregunta_centro_costos'] = -1;
		}
		return $respuesta;
	}

	public function agregarItemCostoPregunta($idItemCosto, $idPregunta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_pregunta_item_costos' => null);

			$id_pregunta_item_costos = null;
			$this->db->select('hic.id, hic.preguntas_id, hic.suministros_id');
			$this->db->from('preguntas_suministros hic');
			$this->db->where('hic.preguntas_id', $idPregunta);
			$this->db->where('hic.suministros_id', $idItemCosto);
			$pregunta_ic = $this->db->get();
			$pregunta_ic = $pregunta_ic->result_array();

			if (sizeof($pregunta_ic) > 0) {
				$id_pregunta_item_costos = $pregunta_ic[0]["id"];
			}

			$data = array(
		        'preguntas_id' => $idPregunta,
				'suministros_id' => $idItemCosto
			);

			if ($id_pregunta_item_costos && !is_null($id_pregunta_item_costos) ) {
				$this->db->where('id', $id_pregunta_item_costos);
				$this->db->update('preguntas_suministros', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta_item_costos'] = $id_pregunta_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente la Pregunta Item de Costo.";
				}else{
					$respuesta['id_pregunta_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('preguntas_suministros', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_pregunta_item_costos = $this->db->insert_id();
					$respuesta['id_pregunta_item_costos'] = $id_pregunta_item_costos;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Item de Costo al Pregunta.";
				}else{
					$respuesta['id_pregunta_item_costos'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_pregunta_item_costos'] = -1;
		}
		return $respuesta;
	}

	public function listarCentroCostosPregunta($idGrupoCC, $idTipoCC, $idTipoATCC, $idUnidadProduccion, $idPregunta, $idUsuario)
	{
		$estados = array(0, 1);
		$this->db->select('cc.id, cc.codigo, cc.nombre, cc.estado, cc.created_at, cc.updated_at, cc.grupo_cc_id, cc.id_perc, cc.primera_produccion_uni_id, cc.segunda_produccion_uni_id, cc.tercera_produccion_uni_id, cc.cuarta_produccion_uni_id, cc.quinta_produccion_uni_id,
		gc.codigo as codigo_gc, gc.nombre as grupo_cc, tc.codigo as codigo_tc, tc.nombre as tipo_cc, tac.codigo as codigo_tac, tac.nombre as tipo_at_cc,
        up1.codigo as codigo_up1, up1.nombre as up1,
        up2.codigo as codigo_up1, up2.nombre as up2,
        up3.codigo as codigo_up1, up3.nombre as up3,
        up4.codigo as codigo_up1, up4.nombre as up4,
        up5.codigo as codigo_up1, up5.nombre as up5');
        $this->db->from('preguntas h');
		$this->db->join('preguntas_centro_costos hcc', 'h.id = hcc.preguntas_id');
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
		$this->db->where('h.id', $idPregunta);
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

	public function listarItemCostosPregunta($tipoIC, $idPregunta, $idUsuario)
	{
		$estados = array(0, 1);
	    $this->db->select('s.id, s.codigo, s.nombre, s.tipo_suministros_id, s.id_estado, s.created_at, s.updated_at, s.id_perc,
	    					ts.nombre as tipo_item_costo');
		$this->db->from('preguntas h');
		$this->db->join('preguntas_suministros hs','h.id = hs.preguntas_id');
		$this->db->join('suministros s', 'hs.suministros_id = s.id');
		$this->db->join('tipo_suministros ts','s.tipo_suministros_id = ts.id');
		$this->db->where('s.id_estado', 1);
		$this->db->where_in('h.estado', $estados);
		$this->db->where('h.id', $idPregunta);
		if (!is_null($tipoIC))
			$this->db->where('ts.id', $tipoIC);
		$resultado = $this->db->get();
		return $resultado->result_array();
	}

	public function eliminarCentroCostoPregunta($idPregunta, $id_usuario){
		try{
			$centro_costos_pregunta = $this->db->get_where('preguntas_centro_costos', array('preguntas_id' => $idPregunta))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_pregunta' => null
					  );

			if (sizeof($centro_costos_pregunta) > 0) {
			    $this->db->where('preguntas_id', $idPregunta);
				$this->db->delete('preguntas_centro_costos');

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta'] = $idPregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente los Centros de Costos dla Pregunta.";
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_pregunta'] = $idPregunta;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "El pregunta no posee Centro de Costos Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_pregunta'] = -1;
		}

		return $respuesta;
	}

	public function eliminarItemCostoPregunta($idPregunta, $id_usuario){
		try{
			$item_costos_pregunta = $this->db->get_where('preguntas_suministros', array('preguntas_id' => $idPregunta))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_pregunta' => null
					  );

			if (sizeof($item_costos_pregunta) > 0) {
			    $this->db->where('preguntas_id', $idPregunta);
				$this->db->delete('preguntas_suministros');

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta'] = $idPregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente los Item de Costos dla Pregunta.";
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_pregunta'] = $idPregunta;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "El pregunta no posee Item de Costos Asociados.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_pregunta'] = -1;
		}

		return $respuesta;
	}

	public function agregarRespuestaPregunta($id, $orden, $nombre, $observacion, $idPregunta, $id_usuario){
		try{
			$this->db->db_debug = FALSE; 
			$respuesta = array('resultado' => null, 
				'mensaje' => null,
				'id_respuesta_pregunta' => null);

			if (isset($id)) {
				$id_respuesta_pregunta = null;
				$this->db->select('r.id, r.orden, r.nombre, r.observaciones, r.id_usuario, r.id_pregunta, r.id_estado, r.created_at, r.updated_at');
				$this->db->from('respuestas r');
				$this->db->where('r.id_pregunta', $idPregunta);
				$this->db->where('r.id', $id);
				$this->db->where('r.id_estado', 1);
				$empresa_cc = $this->db->get();
				$empresa_cc = $empresa_cc->result_array();

				if (sizeof($empresa_cc) > 0)
					$id_respuesta_pregunta = $empresa_cc[0]["id"];
			}

			$data = array(
				'orden' => $orden,
				'nombre' => $nombre,
				'observaciones' => $observacion,
				'id_pregunta' => $idPregunta,
				'id_usuario' => $id_usuario
			);

			if ($id_respuesta_pregunta && !is_null($id_respuesta_pregunta) ) {
				$this->db->where('id', $id_respuesta_pregunta);
				$this->db->update('respuestas', $data);

				if ($this->db->affected_rows() >= 1) {
					$respuesta['id_respuesta_pregunta'] = $id_respuesta_pregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha actualizado correctamente el Edificio a la Empresa.";
				}else{
					$respuesta['id_respuesta_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$this->db->insert('respuestas', $data);
				if ($this->db->affected_rows() >= 1) {
					$id_respuesta_pregunta = $this->db->insert_id();
					$respuesta['id_respuesta_pregunta'] = $id_respuesta_pregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha insertado correctamente el Edificio a la Empresa.";
				}else{
					$respuesta['id_respuesta_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e["code"].", Mensaje: ".$e["message"];
		    $respuesta['id_respuesta_pregunta'] = -1;
		}
		return $respuesta;
	}


	public function listarRespuestasPreguntas($idPregunta, $idUsuario)
	{	
		try{   
		    $this->db->select('r.id, r.orden, r.nombre, r.observaciones, r.id_usuario, r.id_pregunta, r.id_estado, r.created_at, r.updated_at');
			$this->db->from('respuestas r');
			$this->db->where('r.id_estado', 1);
			$this->db->where('r.id_pregunta', $idPregunta);
			$resultado = $this->db->get();
			return $resultado->result_array();
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_norma'] = -1;
		}
	}

	public function eliminarRespuestasPregunta($idPregunta, $id_usuario){
		try{
			$respuestas = $this->db->get_where('respuestas', array('id_pregunta' => $idPregunta))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_pregunta' => null
					  );

			$data = array(
				'id_estado' => -1,
				'id_usuario' => $id_usuario,
				'updated_at' => 'now()'
			);

			if (sizeof($respuestas) > 0) {
			    $this->db->where('id_pregunta', $idPregunta);
				$this->db->update('respuestas', $data);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta'] = $idPregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente las Respuestas a la Pregunta.";
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}else{
				$respuesta['id_pregunta'] = $idPregunta;
				$respuesta['resultado'] = 1;
				$respuesta['mensaje'] = "La Pregunta no posee Respuestas Asociadas.";
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_pregunta'] = -1;
		}

		return $respuesta;
	}

	public function eliminarPregunta($idPregunta, $id_usuario)
	{
		try{
			$pregunta = $this->db->get_where('preguntas', array('id' => $idPregunta, 'estado' => 1))->result();
			$respuesta = array('resultado' => null,
						'mensaje' => null,
						'id_pregunta' => null
					  );

			if (sizeof($pregunta) > 0) {

				$data3 = array(
			        'estado' => -1
				);
			    
				$this->db->set('updated_at', 'NOW()', FALSE);
				$this->db->where('id', $idPregunta);
			    $this->db->update('preguntas', $data3);

			    if ($this->db->affected_rows() >= 1) {
					$respuesta['id_pregunta'] = $idPregunta;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = "Se ha eliminado correctamente la Pregunta.";
				}else{
					$respuesta['id_pregunta'] = -1;
					$respuesta['resultado'] = $this->db->affected_rows();
					$respuesta['mensaje'] = $this->db->error();
				}
			}
		}catch(Exception $e){
			$respuesta['resultado'] = -1;
		    $respuesta['mensaje'] = $e;
		    $respuesta['id_pregunta'] = -1;
		}
		return $respuesta;
	}

}