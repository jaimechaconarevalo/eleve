<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Inicio_model extends CI_Model
{
	public function __construct()
	{
		$this->load->database();
		parent::__construct();
	}

	public function listarPromedioEvaluacionesCampanias()
	{
		$query = $this->db->query("select res.id_campania, res.c_nombre, (count(res.puntuacion)) as cant_evaluaciones, convert((avg(res.porcentaje)), decimal(4,2)) as promedio_evaluaciones /*, res.total_plantilla, res.porcentaje, */
			from (
				select sum((r.r_puntuacion * cat.cat_puntuacion)) as puntuacion,
				(select (sum((r.r_puntuacion * cat.cat_puntuacion))) as total
				from plantillas_categorias_preguntas p inner join categorias cat on p.id_categoria = cat.id_categoria
				inner join preguntas pre on p.id_pregunta = pre.id_pregunta
				inner join preguntas_respuestas pr on pre.id_pregunta = pr.id_pregunta
				inner join respuestas r on pr.id_respuesta = r.id_respuesta
				where p.pca_fecha_baja is null
				and r.r_puntuacion = 1
				and p.id_plantilla = c.id_plantilla) as total_plantilla,
				((sum(r.r_puntuacion * cat.cat_puntuacion) * 100) /(select (sum((r.r_puntuacion * cat.cat_puntuacion))) as total
				from plantillas_categorias_preguntas p inner join categorias cat on p.id_categoria = cat.id_categoria
				inner join preguntas pre on p.id_pregunta = pre.id_pregunta
				inner join preguntas_respuestas pr on pre.id_pregunta = pr.id_pregunta
				inner join respuestas r on pr.id_respuesta = r.id_respuesta
				where p.pca_fecha_baja is null
				and r.r_puntuacion = 1
				and p.id_plantilla = c.id_plantilla)) as porcentaje,
				c.id_campania,
				c.c_nombre
				from evaluaciones ev inner join detalle_evaluaciones de on ev.id_evaluacion = de.id_evaluacion
									 inner join grabaciones g on ev.id_grabacion = g.id_grabacion
									 inner join campanias c on g.id_campania = c.id_campania
									 inner join plantillas_categorias_preguntas pcp on de.id_plantilla_categoria_pregunta = pcp.id_plantilla_categoria_pregunta
									 inner join categorias cat on pcp.id_categoria = cat.id_categoria
									 inner join respuestas r on de.id_respuesta = r.id_respuesta
				group by ev.id_evaluacion) res
			group by res.id_campania, res.c_nombre
			;");
		return $query->result_array();
	}


	public function listarPromedioEvaluacioCampania($campania)
	{
		$query = $this->db->query("select rest.id_campania, rest.c_nombre, user.id_usuario, user.u_nombres, user.u_apellidos , convert((avg(rest.porcentaje)), decimal(4,2)) as porcentaje
			from (
			select usu.id_usuario, usu.u_nombres, usu.u_apellidos, p.pf_analista, usu.u_contabilizar,
					sum((r.r_puntuacion * cat.cat_puntuacion)) as puntuacion,
					(select (sum((r.r_puntuacion * cat.cat_puntuacion))) as total
					from plantillas_categorias_preguntas p inner join categorias cat on p.id_categoria = cat.id_categoria
					inner join preguntas pre on p.id_pregunta = pre.id_pregunta
					inner join preguntas_respuestas pr on pre.id_pregunta = pr.id_pregunta
					inner join respuestas r on pr.id_respuesta = r.id_respuesta
					where p.pca_fecha_baja is null
					and r.r_puntuacion = 1
					and p.id_plantilla = c.id_plantilla) as total_plantilla,
					((sum(r.r_puntuacion * cat.cat_puntuacion) * 100) /(select (sum((r.r_puntuacion * cat.cat_puntuacion))) as total
					from plantillas_categorias_preguntas p inner join categorias cat on p.id_categoria = cat.id_categoria
					inner join preguntas pre on p.id_pregunta = pre.id_pregunta
					inner join preguntas_respuestas pr on pre.id_pregunta = pr.id_pregunta
					inner join respuestas r on pr.id_respuesta = r.id_respuesta
					where p.pca_fecha_baja is null
					and r.r_puntuacion = 1
					and p.id_plantilla = c.id_plantilla)) as porcentaje,
			        c.id_campania,
			        c.c_nombre
			from evaluaciones ev inner join detalle_evaluaciones de on ev.id_evaluacion = de.id_evaluacion
								 inner join grabaciones g on ev.id_grabacion = g.id_grabacion
			                     inner join campanias c on g.id_campania = c.id_campania
			                     inner join plantillas_categorias_preguntas pcp on de.id_plantilla_categoria_pregunta = pcp.id_plantilla_categoria_pregunta
			                     inner join categorias cat on pcp.id_categoria = cat.id_categoria
			                     inner join respuestas r on de.id_respuesta = r.id_respuesta
			                     right join usuarios usu on g.id_usuario = usu.id_usuario
			                     inner join usuarios_perfiles up on usu.id_usuario = up.id_usuario
								 inner join perfiles p on up.id_perfil = p.id_perfil
			where p.pf_analista = 4
			and c.id_campania = ".$campania."
			group by usu.id_usuario, usu.u_nombres, usu.u_apellidos, p.pf_analista, usu.u_contabilizar, ev.id_evaluacion) rest
			right join usuarios user on rest.id_usuario = user.id_usuario
			inner join usuarios_perfiles ups on user.id_usuario = ups.id_usuario
			inner join perfiles per on ups.id_perfil = per.id_perfil
			where rest.id_campania = ".$campania."
			and per.pf_analista = 4
			group by rest.id_campania, rest.c_nombre, rest.id_usuario, rest.u_nombres, rest.u_apellidos;");
		return $query->result_array();
	}

	public function listarConveniosGrafico($id_institucion, $id_programa, $id_comuna, $id_estado, $id_usuario)
	{
		$query = $this->db->query("CALL `institucionminsal`.`listarConveniosGrafico`(".$id_institucion.', '.$id_programa.', '.$id_comuna.', '.$id_estado.', '.$id_usuario.');');
		return $query->result_array();
	}
}