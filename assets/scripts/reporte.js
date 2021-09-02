 $(document).ready(function() {
 	feather.replace()
 	$("#institucion").change(function() {
 		var loader = document.getElementById("loader");
		institucion = $("#institucion").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospital").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospital").append(row);
	        }
      	}
    	});
		listarReportes();
		listarReporteResumenGrafico();
		cargarGraficos();
	});

	$("#institucionItem").change(function() {
		var loader = document.getElementById("loader");
		institucion = $("#institucionItem").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalItem").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalItem").append(row);
				listarReportesItem();
	        }
      	}
    	});		
	});

	$("#institucionAsignacion").change(function() {
		var loader = document.getElementById("loader");
		institucion = $("#institucionAsignacion").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalAsignacion").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalAsignacion").append(row);
				listarReportesAsignacion();
	        }
      	}
    	});
	});

	$("#institucionSubAsignacion").change(function() {
		var loader = document.getElementById("loader");
		institucion = $("#institucionSubAsignacion").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalSubAsignacion").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalSubAsignacion").append(row);
				listarReportesSubAsignacion();
	        }
      	}
    	});    	
	});

	$("#institucionEspecifico").change(function() {
		var loader = document.getElementById("loader");
		institucion = $("#institucionEspecifico").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalEspecifico").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalEspecifico").append(row);
				listarReportesEspecifico();
	        }
      	}
    	});    	
	});

	$("#institucionFecha").change(function() {
		var loader = document.getElementById("loader");
		institucion = $("#institucionFecha").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalFecha").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalFecha").append(row);
				listarReportesFecha();
	        }
      	}
    	});    	
	});

	$("#institucionEF").change(function() {
		var loader = document.getElementById("loader");
		institucion = $("#institucionEF").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalEF").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalEF").append(row);
				listarReportesEquilibrioFinanciero();
				cargarGraficosEF();
	        }
      	}
    	});    	
	});

	$("#institucionR").change(function() {
		var loader = document.getElementById("loader");
		institucion = $("#institucionR").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalR").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalR").append(row);
				listarReportesRecaudacion();
				cargarGraficosR();
	        }
      	}
    	});    	
	});

	$("#institucionPT").change(function() {
		$("#inputRutProveedor").val("");
		var loader = document.getElementById("loader");
		loader.removeAttribute('hidden');
		institucion = $("#institucionPT").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucionPagosTesoreria';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalPT").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalPT").append(row);
				listarPagosTesoreria();
	        }
      	}
    	});    	
		
	});

	$("#institucionPD").change(function() {
		//$("#inputRutProveedor").val("");
		var loader = document.getElementById("loader");
		loader.removeAttribute('hidden');
		institucion = $("#institucionPD").val();
		var baseurl = window.origin + '/Reporte/listarHospitalesInstitucionPagosDevengado';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalPD").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalPD").append(row);
				//listarPagosTesoreria();
				loader.setAttribute('hidden', '');
	        }
      	}
    	});    	
		
	});

 	$("#hospital").change(function() {
		listarReportes();
		listarReporteResumenGrafico();
		cargarGraficos();
	});

	$("#hospitalItem").change(function() {
		listarReportesItem();
	});

	$("#hospitalAsignacion").change(function() {
		listarReportesAsignacion();
	});

	$("#hospitalSubAsignacion").change(function() {
		listarReportesSubAsignacion();
	});

	$("#hospitalEspecifico").change(function() {
		listarReportesEspecifico();
	});

	$("#hospitalFecha").change(function() {
		listarReportesFecha();
	});

	$("#hospitalEF").change(function() {
		listarReportesEquilibrioFinanciero();
		cargarGraficosEF();
	});

	$("#hospitalR").change(function() {
		listarReportesRecaudacion();
		cargarGraficosR();
	});

	$("#hospitalPT").change(function() {
		$("#inputRutProveedor").val("");
		listarPagosTesoreria();
	});

	$("#cuenta").change(function() {
		listarReportes();
	});

	$("#mes").change(function() {
		listarReportesFecha();
	});

	$("#anio").change(function() {
		listarReportesFecha();
	});

	$('#inflactor').on('change',function(e){
    	listarReportesFecha();
	});

	$("#mesEF").change(function() {
		listarReportesEquilibrioFinanciero();
		cargarGraficosEF();
	});

	$("#anioEF").change(function() {
		listarReportesEquilibrioFinanciero();
		cargarGraficosEF();
	});

	$("#mesR").change(function() {
		listarReportesRecaudacion();
		cargarGraficosR();
	});

	$("#anioR").change(function() {
		anios = $("#anioR").val();
		var baseurl = window.origin + '/Reporte/listarMesesAnios';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {anios: anios },
		success: function(data) {
	        if (data)
	        {			
				$("#mesR").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 1; i <= Object.keys(data).length; i++) {
					row = row.concat('\n<option value="',data[i]["idMes"],'">',data[i]["nombreMes"], '</option>');
				}
				$("#mesR").append(row);
				listarReportesRecaudacion();
				cargarGraficosR();
	        }
      	}
    	});
		//cargarGraficosEF();
	});

	$('#tablaListaPagosDevengado').on('click', '.redireccionarHospitalPD', function(e) {
  	//$('.redireccionarItem').click(function() {
  		var loader = document.getElementById("loader");
    	loader.removeAttribute('hidden');
    	var idInstitucion = e.currentTarget.dataset.id;
		tipo_documento = $("#tipo_documentoPD").val();
		var baseurl = window.origin + '/Reporte/listarPagosDevengados';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {tipo_documento: tipo_documento, institucion: idInstitucion },
		success: function(data) {
	        if (data)
	        {
				var myJSON= JSON.stringify(data);
                myJSON = JSON.parse(myJSON);
				$('#tablaListaPagosDevengado').html(myJSON.table_pagos_devengado);
				feather.replace();
				$('#tListaPagosDevengado').dataTable({
			        searching: true,
			        paging:         true,
			        ordering:       true,
			        info:           true,
			        columnDefs: [
			          { targets: 'no-sort', orderable: false }
			        ],
			        //bDestroy:       true,
			         
			        "oLanguage": {
			            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
			            "sZeroRecords": "No se encontraron registros",
			            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
			            "sInfoEmpty": "Mostrando 0 de 0 registros",
			            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
			            "sSearch":        "Buscar:",
			            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
			            "oPaginate": {
			                "sFirst":    "Primero",
			                "sLast":    "Último",
			                "sNext":    "Siguiente",
			                "sPrevious": "Anterior"
			            }
			        },
			        lengthMenu: [[10, 20], [10, 20]]
			    });

			    document.getElementById('tituloLista').dataset.id = idInstitucion;
				document.getElementById("tituloLista").innerHTML = 'Antig&uuml;edad de la Deuda por &Aacute;rea';
				//$(document.getElementsByClassName('tooltip fade show bs-tooltip-bottom')).removeClass('show');
				document.getElementById("btnVolver").removeAttribute('hidden');
				document.getElementsByClassName('tooltip fade show bs-tooltip-top').item(0).remove();
			    loader.setAttribute('hidden', '');
			    feather.replace();
        		$('[data-toggle="tooltip"]').tooltip();
	        }
      	}
    	});
	});

	$("#btnVolver").on('click', function() {
  		var loader = document.getElementById("loader");
    	loader.removeAttribute('hidden');
		tipo_documento = $("#tipo_documentoPD").val();
		var baseurl = window.origin + '/Reporte/listarPagosDevengados';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {tipo_documento: tipo_documento },
		success: function(data) {
	        if (data)
	        {
				var myJSON= JSON.stringify(data);
                myJSON = JSON.parse(myJSON);
				$('#tablaListaPagosDevengado').html(myJSON.table_pagos_devengado);
				 document.getElementById('tituloLista').dataset.id = "";
				feather.replace();
				$('#tListaPagosDevengado').dataTable({
			        searching: true,
			        paging:         true,
			        ordering:       true,
			        info:           true,
			        columnDefs: [
			          { targets: 'no-sort', orderable: false }
			        ],
			        //bDestroy:       true,
			         
			        "oLanguage": {
			            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
			            "sZeroRecords": "No se encontraron registros",
			            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
			            "sInfoEmpty": "Mostrando 0 de 0 registros",
			            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
			            "sSearch":        "Buscar:",
			            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
			            "oPaginate": {
			                "sFirst":    "Primero",
			                "sLast":    "Último",
			                "sNext":    "Siguiente",
			                "sPrevious": "Anterior"
			            }
			        },
			        lengthMenu: [[10, 20], [10, 20]]
			    });
				document.getElementById("tituloLista").innerHTML = 'Antig&uuml;edad de la Deuda por Instituci&oacute;n';
				//$(document.getElementsByClassName('tooltip fade show bs-tooltip-bottom')).removeClass('show');
				document.getElementById("btnVolver").setAttribute('hidden', '');
			    loader.setAttribute('hidden', '');
			    feather.replace();
        		$('[data-toggle="tooltip"]').tooltip();
	        }
      	}
    	});

	});

	$("#tipo_documentoPD").change(function() {
 		var loader = document.getElementById("loader");
		tipo_documento = $("#tipo_documentoPD").val();
		id_institucion = document.getElementById('tituloLista').dataset.id;
		var baseurl = window.origin + '/Reporte/listarPagosDevengados';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {tipo_documento: tipo_documento, institucion: id_institucion},
		success: function(data) {
	        if (data)
	        {
				var myJSON= JSON.stringify(data);
                myJSON = JSON.parse(myJSON);
				$('#tablaListaPagosDevengado').html(myJSON.table_pagos_devengado);
				feather.replace()
				$('#tListaPagosDevengado').dataTable({
			        searching: true,
			        paging:         true,
			        ordering:       true,
			        info:           true,
			        columnDefs: [
			          { targets: 'no-sort', orderable: false }
			        ],
			        //bDestroy:       true,
			         
			        "oLanguage": {
			            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
			            "sZeroRecords": "No se encontraron registros",
			            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
			            "sInfoEmpty": "Mostrando 0 de 0 registros",
			            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
			            "sSearch":        "Buscar:",
			            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
			            "oPaginate": {
			                "sFirst":    "Primero",
			                "sLast":    "Último",
			                "sNext":    "Siguiente",
			                "sPrevious": "Anterior"
			            }
			        },
			        lengthMenu: [[10, 20], [10, 20]]
			    });

			    loader.setAttribute('hidden', '');
			    feather.replace();
        		$('[data-toggle="tooltip"]').tooltip();
	        }
      	}
    	});
	});



 	function listarReportes()
  	{
 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucion").val();
	    hospital = $("#hospital").val();
	    cuenta = $("#cuenta").val();
	    item = $("#item").val();

	    var baseurl = window.origin + '/Reporte/listarReporteResumen';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
		success: function(data) {
	        if (data)
	        {			
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            if(data[i]['nombre'] == 'Total')
		            {
		            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['ppto_vigente']),'</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['ejec'],'%</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
			            row = row.concat('\n<th class="text-center table-active"></th>');
		            }else{
		            	row = row.concat('\n<td class=""><p class="texto-pequenio">');
		            	row = row.concat((data[i]['codigo'] + ' ' + data[i]['nombre']));
		            	row = row.concat('</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['ppto_vigente']),'</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['ejec'],'%</p></td>');
			            row = row.concat('\n <td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
			            row = row.concat('\n<td class="text-center botonTabla">');
			            row = row.concat('\n<button type="button" class="btn btn-link redireccionarItem botonTabla" data-id="',data[i]["id_cuenta"],'" data-toggle="tooltip" title="click para ver detalle de cuenta">');
			            row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
						//row = row.concat('\n<a href="listarReportesItem/?idCuenta=',data[i]['id_cuenta'],'" title="click para ver detalle de cuenta"><i data-feather="search" class="trash"></i></a>');
						row = row.concat('\n</td>');
		            }
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		        }


		        institucion = $("#institucion").val();
			    hospital = $("#hospital").val();
			    cuenta = $("#cuenta").val();
			    item = $("#item").val();

		    	var baseurl = window.origin + '/Reporte/listarReporteResumenGasto';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
				success: function(data) {
			        if (data)
			        {			
						$("#tbodyReporteResumenGasto").empty();
						for (var i = 0; i < data.length; i++){
				            var row = '';
				            row = row.concat('<tr>');
				            if(data[i]['nombre'] == 'Total')
				            {
				            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['ppto_vigente']),'</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['ejec'],'%</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
					            row = row.concat('\n<th class="text-center table-active"></th>');
				            }else{
					            row = row.concat('\n<td class=""><p class="texto-pequenio">');
				            	row = row.concat((data[i]['codigo'] + ' ' + data[i]['nombre']));
				            	row = row.concat('</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['ppto_vigente']),'</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['ejec'],'%</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
					            row = row.concat('\n<td class="text-center botonTabla">');
					            row = row.concat('\n<button type="button" class="btn btn-link redireccionarItem botonTabla" data-id="',data[i]["id_cuenta"],'" data-toggle="tooltip" title="click para ver detalle de cuenta">');
					            row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
								//row = row.concat('\n<a href="listarReportesItem/?idCuenta=',data[i]['id_cuenta'],'" title="click para ver detalle de cuenta"><i data-feather="search" class="trash"></i></a>');
								row = row.concat('\n</td>');
				        	}
				            row = row.concat('\n</tr>');
				          $("#tbodyReporteResumenGasto").append(row);
				        }


				        institucion = $("#institucion").val();
					    hospital = $("#hospital").val();
					    cuenta = $("#cuenta").val();
					    item = $("#item").val();

				    	var baseurl = window.origin + '/Reporte/listarReporteResumenTipo';
					    jQuery.ajax({
						type: "POST",
						url: baseurl,
						dataType: 'json',
						data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
						success: function(data) {
					        if (data)
					        {			
					        	$("#tbodyReporteResumenTipo").empty();
								for (var i = 0; i < data.length; i++){
						            var row = '';
						            row = row.concat('<tr>');
						            if(data[i]['nombre'] == 'Total')
						            {
						            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['abreviacion'],'</p></th>');
							            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['presupuesto']),'</p></th>');
							            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['recaudado']),'</p></th>');
							            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var'],'%</p></th>');
							            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
						            }else{
							            row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['abreviacion'],'</p></td>');
							            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['presupuesto']),'</p></td>');
							            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['recaudado']),'</p></td>');
							            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var'],'%</p></td>');
							            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
						        	}
						            row = row.concat('\n</tr>');
						          $("#tbodyReporteResumenTipo").append(row);
						        }


						        institucion = $("#institucion").val();
							    hospital = $("#hospital").val();
							    cuenta = $("#cuenta").val();
							    item = $("#item").val();

						    	var baseurl = window.origin + '/Reporte/listarReporteResumenTipoGasto';
							    jQuery.ajax({
								type: "POST",
								url: baseurl,
								dataType: 'json',
								data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
								success: function(data) {
							        if (data)
							        {			
							        	$("#tbodyReporteResumenGastoTipo").empty();
										for (var i = 0; i < data.length; i++){
								            var row = '';
								            row = row.concat('<tr>');
								            if(data[i]['nombre'] == 'Total')
								            {
								            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['abreviacion'],'</p></th>');
									            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['recaudado']),'</p></th>');
									            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['devengado']),'</p></th>');
									            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['por_percibir']),'</p></th>');
								            }else{
									            row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['abreviacion'],'</p></td>');
									            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['recaudado']),'</p></td>');
									            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['devengado']),'</p></td>');
									            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['por_percibir']),'</p></td>');
								        	}
								            row = row.concat('\n</tr>');
								          $("#tbodyReporteResumenGastoTipo").append(row);
								        }

								        feather.replace()
				      					loader.setAttribute('hidden', '');
		      						}
						      	}
							    });
	      					}
				      	}
					    });
			        }
		      	}
		    	});
	        }
      	}
    	});

  	};
  	$("#comunaRR").change(function() {
		listarReportesResumenRegion(1);
  	});
  	

  	$("#regionRR").change(function() {
		listarReportesResumenRegion(0);
	});

 	function listarReportesResumenRegion(origen)
  	{
		var loader = document.getElementById("loader");
		loader.removeAttribute('hidden');
		region = $("#regionRR").val();
		comuna = $("#comunaRR").val();

		if(origen == 0)
			comuna = "-1";
		else
			comuna = $("#comunaRR").val();

		var baseurl = window.origin + '/Reporte/listarResumenConsolidadoRegion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {region: region, comuna: comuna },
		success: function(data) {
	        if (data)
	        {
	        	if(origen != 1)
	        	{
	        		if (data.listarComunas)
			        {			
						$("#comunaRR").empty();
						var row = '<option value="-1">Todos</option>';
						for (var i = 0; i < data.listarComunas.length; i++) {
							row = row.concat('\n<option value="',data.listarComunas[i]["id_comunas"],'">',data.listarComunas[i]["nombre"], '</option>');
						}
						$("#comunaRR").append(row);
			        }
	        	}

				$("#tbodyResumenConsolidado").empty();
				for (var i = 0; i < data.listarPagos.length; i++){
		            var row = '';
	            	if(data.listarPagos[i]['nombre'] == 'Total')
	            	{
	            		row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagos[i]['nombre'],'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['marco']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['convenio']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['convenio_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['transferencia']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_convenio']),' %</p></th>');
						row = row.concat('\n</tr>');
					}
	            	if(data.listarPagos[i]['nombre'] != 'Total')
	            	{
		            	row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagos[i]['nombre'],'</p></th>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['marco']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['convenio']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['convenio_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['transferencia']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_convenio']),' %</p></td>');
						row = row.concat('\n</tr>');
					}
		            
		          	$("#tbodyResumenConsolidado").append(row);
		        }


		        $("#tbodyListaResumenAPS").empty();
				for (var i = 0; i < data.listarPagosAPS.length; i++){
		            var row = '';
	            	if(data.listarPagosAPS[i]['nombre'] == 'Total')
	            	{
	            		row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPS[i]['nombre'],'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['marco']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['convenio']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['convenio_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['transferencia']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_convenio']),' %</p></th>');
						row = row.concat('\n</tr>');
					}
	            	if(data.listarPagosAPS[i]['nombre'] != 'Total')
	            	{
		            	row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPS[i]['nombre'],'</p></th>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['marco']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['convenio']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['convenio_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['transferencia']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_convenio']),' %</p></td>');
						row = row.concat('\n</tr>');
					}
		            
		          	$("#tbodyListaResumenAPS").append(row);
		        }

		        $("#tbodyListaResumenAPSSS").empty();
				for (var i = 0; i < data.listarPagosAPSSS.length; i++){
		            var row = '';
	            	if(data.listarPagosAPSSS[i]['nombre'] == 'Total')
	            	{
	            		row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPSSS[i]['nombre'],'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['marco']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['convenio']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['convenio_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['transferencia']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_convenio']),' %</p></th>');
						row = row.concat('\n</tr>');
					}
	            	if(data.listarPagosAPSSS[i]['nombre'] != 'Total')
	            	{
		            	row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPSSS[i]['nombre'],'</p></th>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['marco']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['convenio']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['convenio_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['transferencia']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_convenio']),' %</p></td>');
						row = row.concat('\n</tr>');
					}
		            
		          	$("#tbodyListaResumenAPSSS").append(row);
		        }

		        loader.setAttribute('hidden', '');

	        }
      	}
    	});    	
		
  	}

  	$("#institucionGRR").change(function() {
  		cargarGraficosRR();
  	});

  	$("#regionGCRR").change(function() {
  		cargarGraficosCRR(0);
  	});

  	$("#comunaGCRR").change(function() {
		cargarGraficosCRR(1);
  	});
  	

  	$("#institucionRR").change(function() {
		var loader = document.getElementById("loader");
		loader.removeAttribute('hidden');
		institucion = $("#institucionRR").val();

		var baseurl = window.origin + '/Reporte/listarResumenProgramas';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {
				$("#tbodyResumenConsolidado").empty();
				for (var i = 0; i < data.listarPagos.length; i++){
		            var row = '';
	            	if(data.listarPagos[i]['nombre'] == 'Total')
	            	{
	            		row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagos[i]['nombre'],'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['marco']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['convenio']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['convenio_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['transferencia']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_convenio']),' %</p></th>');
						row = row.concat('\n</tr>');
					}
	            	if(data.listarPagos[i]['nombre'] != 'Total')
	            	{
		            	row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagos[i]['nombre'],'</p></th>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['marco']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['convenio']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['convenio_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagos[i]['transferencia']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagos[i]['trans_convenio']),' %</p></td>');
						row = row.concat('\n</tr>');
					}
		            
		          	$("#tbodyResumenConsolidado").append(row);
		        }


		        $("#tbodyListaResumenAPS").empty();
				for (var i = 0; i < data.listarPagosAPS.length; i++){
		            var row = '';
	            	if(data.listarPagosAPS[i]['nombre'] == 'Total')
	            	{
	            		row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPS[i]['nombre'],'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['marco']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['convenio']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['convenio_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['transferencia']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_convenio']),' %</p></th>');
						row = row.concat('\n</tr>');
					}
	            	if(data.listarPagosAPS[i]['nombre'] != 'Total')
	            	{
		            	row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPS[i]['nombre'],'</p></th>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['marco']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['convenio']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['convenio_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPS[i]['transferencia']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPS[i]['trans_convenio']),' %</p></td>');
						row = row.concat('\n</tr>');
					}
		            
		          	$("#tbodyListaResumenAPS").append(row);
		        }

		        $("#tbodyListaResumenAPSSS").empty();
				for (var i = 0; i < data.listarPagosAPSSS.length; i++){
		            var row = '';
	            	if(data.listarPagosAPSSS[i]['nombre'] == 'Total')
	            	{
	            		row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPSSS[i]['nombre'],'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['marco']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['convenio']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['convenio_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['transferencia']),'</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_marco']),' %</p></th>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_convenio']),' %</p></th>');
						row = row.concat('\n</tr>');
					}
	            	if(data.listarPagosAPSSS[i]['nombre'] != 'Total')
	            	{
		            	row = row.concat('\n<tr>');
						row = row.concat('\n<th class="text-center align-middle"><p class="texto-pequenio">',data.listarPagosAPSSS[i]['nombre'],'</p></th>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['marco']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['convenio']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['convenio_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.listarPagosAPSSS[i]['transferencia']),'</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_marco']),' %</p></td>');
						row = row.concat('\n<td class="text-center align-middle"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 1}).format(data.listarPagosAPSSS[i]['trans_convenio']),' %</p></td>');
						row = row.concat('\n</tr>');
					}
		            
		          	$("#tbodyListaResumenAPSSS").append(row);
		        }

		        loader.setAttribute('hidden', '');

	        }
      	}
    	});    	
		
	});

  	function listarReportesItem()
  	{ 	
 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionItem").val();
	    hospital = $("#hospitalItem").val();
	    cuentaSeleccion = $(document.getElementById('cuentaSeleccion'));
		cuenta = cuentaSeleccion.data('id');
	    item = -1;//$("#item").val();

	    var baseurl = window.origin + '/Reporte/listarReporteResumenItem';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
		success: function(data) {
	        if (data)
	        {			
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            if(data[i]['nombre'] == 'Total')
		            {
		            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
			            row = row.concat('\n<th class="text-center table-active"></th>');
		            }else{
		            	row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n <td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
			            row = row.concat('\n<td class="text-center botonTabla">');
			            row = row.concat('\n<button type="button" class="btn btn-link redireccionarAsignacion botonTabla" data-id="',data[i]["id_item"],'" data-toggle="tooltip" title="click para ver detalle de item">');
					    row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
						//row = row.concat('\n<a href="listarReportesAsignacion/?idItem=',data[i]['id_item'],'" title="click para ver detalle de item"><i data-feather="search" class="trash"></i></a>');
						row = row.concat('\n</td>');
		            }
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		        }


		        institucion = $("#institucionItem").val();
			    hospital = $("#hospitalItem").val();
			    cuentaSeleccion = $(document.getElementById('cuentaSeleccion'));
				cuenta = cuentaSeleccion.data('id');
			    item = -1;//$("#item").val();

		    	var baseurl = window.origin + '/Reporte/listarReporteResumenItemGasto';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
				success: function(data) {
			        if (data)
			        {			
						$("#tbodyReporteResumenGasto").empty();
						for (var i = 0; i < data.length; i++){
				            var row = '';
				            row = row.concat('<tr>');
				            if(data[i]['nombre'] == 'Total')
				            {
				            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
					            row = row.concat('\n<th class="text-center table-active"></th>');
				            }else{
					            row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
					            row = row.concat('\n<td class="text-center botonTabla">');
					            row = row.concat('\n<button type="button" class="btn btn-link redireccionarAsignacion botonTabla" data-id="',data[i]["id_item"],'" data-toggle="tooltip" title="click para ver detalle de item">');
					    		row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
								//row = row.concat('\n<a href="listarReportesAsignacion/?idItem=',data[i]['id_item'],'" title="click para ver detalle de item"><i data-feather="search" class="trash"></i></a>');
								row = row.concat('\n</td>');
				        	}
				            row = row.concat('\n</tr>');
				          $("#tbodyReporteResumenGasto").append(row);
				        }
				        feather.replace()
      					loader.setAttribute('hidden', '');
			        }
		      	}
		    	});
	        }
      	}
    	});
  	};

  	function listarReportesAsignacion()
  	{ 	
 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionAsignacion").val();
	    hospital = $("#hospitalAsignacion").val();
	    itemSeleccion = $(document.getElementById('itemSeleccion'));
	    cuenta = itemSeleccion.data('idcuenta');
		item = itemSeleccion.data('id');

	    var baseurl = window.origin + '/Reporte/listarReporteResumenAsignacion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
		success: function(data) {
	        if (data)
	        {			
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            if(data[i]['nombre'] == 'Total')
		            {
		            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
			            row = row.concat('\n<th class="text-center table-active"></th>');
		            }else{
		            	row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n <td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
			            row = row.concat('\n<td class="text-center botonTabla">');
			            row = row.concat('\n<button type="button" class="btn btn-link redireccionarSubAsignacion botonTabla" data-id="',data[i]["id_asignacion"],'" data-toggle="tooltip" title="click para ver detalle de de asignaci&oacute;n">');
					    row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
						//row = row.concat('\n<a href="listarReportesSubAsignacion/?idAsignacion=',data[i]['id_asignacion'],'" title="click para ver detalle de asignaci&oacute;n"><i data-feather="search" class="trash"></i></a>');
						row = row.concat('\n</td>');
		            }
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		        }


		        institucion = $("#institucionAsignacion").val();
			    hospital = $("#hospitalAsignacion").val();
			    itemSeleccion = $(document.getElementById('itemSeleccion'));
			    cuenta = itemSeleccion.data('idcuenta');
				item = itemSeleccion.data('id');

		    	var baseurl = window.origin + '/Reporte/listarReporteResumenAsignacionGasto';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item },
				success: function(data) {
			        if (data)
			        {			
						$("#tbodyReporteResumenGasto").empty();
						for (var i = 0; i < data.length; i++){
				            var row = '';
				            row = row.concat('<tr>');
				            if(data[i]['nombre'] == 'Total')
				            {
				            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
					            row = row.concat('\n<th class="text-center table-active"></th>');
				            }else{
					            row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
					            row = row.concat('\n<td class="text-center botonTabla">');
								row = row.concat('\n<button type="button" class="btn btn-link redireccionarSubAsignacion botonTabla" data-id="',data[i]["id_asignacion"],'" data-toggle="tooltip" title="click para ver detalle de de asignaci&oacute;n">');
					    		row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
								//row = row.concat('\n<a href="listarReportesSubAsignacion/?idAsignacion=',data[i]['id_asignacion'],'" title="click para ver detalle de asignacion"><i data-feather="search" class="trash"></i></a>');
								row = row.concat('\n</td>');
				        	}
				            row = row.concat('\n</tr>');
				          $("#tbodyReporteResumenGasto").append(row);
				        }
				        feather.replace()
      					loader.setAttribute('hidden', '');
			        }
		      	}
		    	});
	        }
      	}
    	});
  	};

  	function listarReportesSubAsignacion()
  	{ 	
 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionSubAsignacion").val();
	    hospital = $("#hospitalSubAsignacion").val();
	    asignacionSeleccion = $(document.getElementById('asignacionSeleccion'));
	    cuenta = asignacionSeleccion.data('idcuenta');
	    item = asignacionSeleccion.data('iditem');
		asignacion = asignacionSeleccion.data('id');
	    //item = -1;//$("#item").val();

	    var baseurl = window.origin + '/Reporte/listarReporteResumenSubAsignacion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, item: item, asignacion: asignacion},
		success: function(data) {
	        if (data)
	        {			
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            if(data[i]['nombre'] == 'Total')
		            {
		            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
			            row = row.concat('\n<th class="text-center table-active"></th>');
		            }else{
		            	row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n <td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
			            row = row.concat('\n<td class="text-center botonTabla">');
						row = row.concat('\n<button type="button" class="btn btn-link redireccionarEspecifico botonTabla" data-id="',data[i]["id_sub_asignacion"],'" data-toggle="tooltip" title="click para ver detalle de de sub asignaci&oacute;n">');
			    		row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
						//row = row.concat('\n<a href="listarReportesEspecifico/?idSubAsignacion=',data[i]['id_sub_asignacion'],'" title="click para ver detalle de Sub Asignaci&oacute;n"><i data-feather="search" class="trash"></i></a>');
						row = row.concat('\n</td>');
		            }
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		        }


		        institucion = $("#institucionSubAsignacion").val();
			    hospital = $("#hospitalSubAsignacion").val();
			    asignacionSeleccion = $(document.getElementById('asignacionSeleccion'));
			    cuenta = asignacionSeleccion.data('idcuenta');
			    item = asignacionSeleccion.data('iditem');
				asignacion = asignacionSeleccion.data('id');

		    	var baseurl = window.origin + '/Reporte/listarReporteResumenSubAsignacionGasto';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item, asignacion: asignacion },
				success: function(data) {
			        if (data)
			        {			
						$("#tbodyReporteResumenGasto").empty();
						for (var i = 0; i < data.length; i++){
				            var row = '';
				            row = row.concat('<tr>');
				            if(data[i]['nombre'] == 'Total')
				            {
				            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
					            row = row.concat('\n<th class="text-center table-active"></th>');
				            }else{
					            row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
					            row = row.concat('\n<td class="text-center botonTabla">');
					            row = row.concat('\n<button type="button" class="btn btn-link redireccionarEspecifico botonTabla" data-id="',data[i]["id_sub_asignacion"],'" data-toggle="tooltip" title="click para ver detalle de de sub asignaci&oacute;n">');
			    				row = row.concat('\n<i data-feather="search" class="trash"></i></button>');
								//row = row.concat('\n<a href="listarReportesEspecifico/?idSubAsignacion=',data[i]['id_sub_asignacion'],'" title="click para ver detalle de Sub asignaci&oacute;n"><i data-feather="search" class="trash"></i></a>');
								row = row.concat('\n</td>');
				        	}
				            row = row.concat('\n</tr>');
				          $("#tbodyReporteResumenGasto").append(row);
				        }
				        feather.replace()
      					loader.setAttribute('hidden', '');
			        }
		      	}
		    	});
	        }
      	}
    	});
  	};


	function listarReportesEspecifico()
  	{ 	
 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionEspecifico").val();
	    hospital = $("#hospitalEspecifico").val();
	    subasignacionSeleccion = $(document.getElementById('subasignacionSeleccion'));
	    cuenta = subasignacionSeleccion.data('idcuenta');
	    item = subasignacionSeleccion.data('iditem');
	    asignacion = subasignacionSeleccion.data('idasignacion');
	    subAsignacion = subasignacionSeleccion.data('id');

	    var baseurl = window.origin + '/Reporte/listarReporteResumenEspecifico';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, item: item, asignacion: asignacion, subAsignacion: subAsignacion},
		success: function(data) {
	        if (data)
	        {			
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            if(data[i]['nombre'] == 'Total')
		            {
		            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
			            //row = row.concat('\n<th class="text-center table-active"></th>');
		            }else{
		            	row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n <td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
			            //row = row.concat('\n<td class="text-center">');
						//row = row.concat('\n<a href="listarReportesEspecifico/?idSubAsignacion=',data[i]['id_sub_asignacion'],'" title="click para ver detalle de Sub Asignaci&oacute;n"><i data-feather="search" class="trash"></i></a>');
						//row = row.concat('\n</td>');
		            }
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		        }


		        institucion = $("#institucionEspecifico").val();
			    hospital = $("#hospitalEspecifico").val();
			    subasignacionSeleccion = $(document.getElementById('subasignacionSeleccion'));
			    cuenta = subasignacionSeleccion.data('idcuenta');
			    item = subasignacionSeleccion.data('iditem');
			    asignacion = subasignacionSeleccion.data('idasignacion');
			    subAsignacion = subasignacionSeleccion.data('id');

		    	var baseurl = window.origin + '/Reporte/listarReporteResumenEspecificoGasto';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, cuenta: cuenta, item: item, asignacion: asignacion, subAsignacion: subAsignacion },
				success: function(data) {
			        if (data)
			        {			
						$("#tbodyReporteResumenGasto").empty();
						for (var i = 0; i < data.length; i++){
				            var row = '';
				            row = row.concat('<tr>');
				            if(data[i]['nombre'] == 'Total')
				            {
				            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></th>');
					            //row = row.concat('\n<th class="text-center table-active"></th>');
				            }else{
					            row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2019']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado_2018_con_mult']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var_18_17'],'%</p></td>');
					            //row = row.concat('\n<td class="text-center">');
								//row = row.concat('\n<a href="listarReportesEspecifico/?idSubAsignacion=',data[i]['id_sub_asignacion'],'" title="click para ver detalle de Sub asignaci&oacute;n"><i data-feather="search" class="trash"></i></a>');
								//row = row.concat('\n</td>');
				        	}
				            row = row.concat('\n</tr>');
				          $("#tbodyReporteResumenGasto").append(row);
				        }
				        feather.replace()
      					loader.setAttribute('hidden', '');
			        }
		      	}
		    	});
	        }
      	}
    	});
  	};

  	function listarReportesFecha()
  	{ 	
 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionFecha").val();
	    hospital = $("#hospitalFecha").val();
		cuenta = -1;
	    item = -1;
	    mes = $("#mes").val();
	    anio = $("#anio").val();
		inflactor = ($('#inflactor').val().length == 0 ? -1 : $('#inflactor').val());

	    var baseurl = window.origin + '/Reporte/listarReporteResumenFecha';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, cuenta: cuenta, mes: mes, anio: anio, inflactor: inflactor },
		success: function(data) {
	        if (data)
	        {			
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            if(data[i]['nombre'] == 'Total')
		            {
		            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
			            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
			            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado']),'</p></th>');
		            }else{
		            	row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado']),'</p></td>');
		            }
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		          $('#idAnio').text("I. Rec. " + anio);
		          $('#idAnioGasto').text("G. Dev. " + anio);
		        }


		        institucion = $("#institucionFecha").val();
			    hospital = $("#hospitalFecha").val();
				cuenta = -1;
			    item = -1;
			    mes = $("#mes").val();
			    anio = $("#anio").val();
			    inflactor = ($('#inflactor').val().length == 0 ? -1 : $('#inflactor').val());

		    	var baseurl = window.origin + '/Reporte/listarReporteResumenFechaGasto';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, cuenta: cuenta, mes: mes, anio: anio, inflactor: inflactor },
				success: function(data) {
			        if (data)
			        {			
						$("#tbodyReporteResumenGasto").empty();
						for (var i = 0; i < data.length; i++){
				            var row = '';
				            row = row.concat('<tr>');
				            if(data[i]['nombre'] == 'Total')
				            {
				            	row = row.concat('\n<th class="table-active"><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
					            row = row.concat('\n<th class="text-center table-active"><p class="texto-pequenio">','----','</p></th>');
					            row = row.concat('\n<th class="text-right table-active"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado']),'</p></th>');
				            }else{
					            row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['codigo'],' ', data[i]['nombre'],'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">','----','</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['Recaudado']),'</p></td>');
				        	}
				            row = row.concat('\n</tr>');
				          $("#tbodyReporteResumenGasto").append(row);
				        }
				        feather.replace()
      					loader.setAttribute('hidden', '');
			        }
		      	}
		    	});
	        }
      	}
    	});
  	};

  	function listarReportesEquilibrioFinanciero()
  	{ 	

 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionEF").val();
	    hospital = $("#hospitalEF").val();
		cuenta = -1;
	    item = -1;
	    mes = $("#mesEF").val();
	    anio = $("#anioEF").val();
		
	    var baseurl = window.origin + '/Reporte/listarReportesEquilibrioFinancieroFiltro';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, cuenta: cuenta, mes: mes, anio: anio},
		success: function(data) {
	        if (data)
	        {
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">', data[i]['nombreMes'].charAt(0).toUpperCase(), data[i]['nombreMes'].slice(1) ,'</p></td>');    
		            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['anio'],'</p></td>');    
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['gastos']),'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['ingresos']),'</p></td>');
	            	row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['cumplimiento'],'</p></td>');
	            	row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['puntuacion'],'</p></td>');
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		          //$('#idAnio').text("I. Rec. " + anio);
		          //$('#idAnioGasto').text("G. Dev. " + anio);
		        }
		        loader.setAttribute('hidden', '');
	        }
      	}
    	});
  	};

  	function listarReportesRecaudacion()
  	{ 	

 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionR").val();
	    hospital = $("#hospitalR").val();
	    mes = $("#mesR").val();
	    anio = $("#anioR").val();
		
	    var baseurl = window.origin + '/Reporte/listarReportesRecaudacionFiltro';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, mes: mes, anio: anio},
		success: function(data) {
	        if (data)
	        {
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');

		            if(data[i]['mes'] == 13)
		            {
		            	row = row.concat('\n<td class="text-center" colspan="2"><p class="texto-pequenio">', data[i]['nombreMes'],'</p></td>');
		            }else{
		            	row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['mes'],'</p></td>');    
		            	row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['anio'],'</p></td>');	
		            }		            
		            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['recaudado_70']),'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['devengado_70']),'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['porcentaje_70']),' %</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['puntuacion_70'],'</p></td>');
	            	row = row.concat('\n<td class="text-center"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['recaudado_30_anio_actual']),'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['recaudado_30_anio_anterior']),'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['porcentaje_30']),' %</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['puntuacion_30'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['ponderado'],'</p></td>');
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumen").append(row);
		          //$('#idAnio').text("I. Rec. " + anio);
		          //$('#idAnioGasto').text("G. Dev. " + anio);
		        }
		        loader.setAttribute('hidden', '');
	        }
      	}
    	});
  	};

  	$("#btnBuscarRutProveedor").on('click', function() {
  		listarPagosTesoreria();
	});

  	function listarPagosTesoreria()
  	{ 	

 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionPT").val();
	    hospital = $("#hospitalPT").val();
	    rut_proveedor = $("#inputRutProveedor").val();

	    if(institucion == null)
	    	institucion = -1;
		
	    var baseurl = window.origin + '/Reporte/listarPagosTesoreria';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, rut_proveedor: rut_proveedor},
		success: function(data) {
	        if (data)
	        {
	        	var myJSON= JSON.stringify(data);
                myJSON = JSON.parse(myJSON);
				$('#tablaListaPagosTesoreria').html(myJSON.table_pagos_tesoreria);
				$('#tListaPagosTesoreria').dataTable({                
			        searching: true,
			        paging:         true,
			        ordering:       true,
			        info:           true,
			        columnDefs: [
			          { targets: 'no-sort', orderable: false }
			        ],
			        //bDestroy:       true,
			         
			        "oLanguage": {
			            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
			            "sZeroRecords": "No se encontraron registros",
			            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
			            "sInfoEmpty": "Mostrando 0 de 0 registros",
			            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
			            "sSearch":        "Buscar:",
			            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
			            "oPaginate": {
			                "sFirst":    "Primero",
			                "sLast":    "Último",
			                "sNext":    "Siguiente",
			                "sPrevious": "Anterior"
			            }
			        },
			        lengthMenu: [[10, 20], [10, 20]]
			    });

			    loader.setAttribute('hidden', '');

	        	//$('#tListaPagosTesoreria').dataTable().fnDestroy();
	        	//tablaPagosTesoreria = $("#tListaPagosTesoreria").DataTable();
	        	//tablaPagosTesoreria.destroy();
				
	        	//tablaListaPagosTesoreria

				/*$("#tbodyPagosTesoreria").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['nombre_institucion'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['nombre'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['rut_beneficiario'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['nombre_beneficiario'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['rut_proveedor'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['nombre_proveedor'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['numero_documento'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['numero_cuenta_pago'],'</p></td>');
					row = row.concat('\n<td class="text-center"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data[i]['monto_pago']),'</p></td>');
		            row = row.concat('\n<tr>');
		          $("#tbodyPagosTesoreria").append(row);
		          //$('#idAnio').text("I. Rec. " + anio);
		          //$('#idAnioGasto').text("G. Dev. " + anio);
		        }
		        loader.setAttribute('hidden', '');*/

				/*$('#tListaPagosTesoreria').dataTable({                
			        searching: true,
			        paging:         true,
			        ordering:       true,
			        info:           true,
			        columnDefs: [
			          { targets: 'no-sort', orderable: false }
			        ],
			        //bDestroy:       true,
			         
			        "oLanguage": {
			            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
			            "sZeroRecords": "No se encontraron registros",
			            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
			            "sInfoEmpty": "Mostrando 0 de 0 registros",
			            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
			            "sSearch":        "Buscar:",
			            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
			            "oPaginate": {
			                "sFirst":    "Primero",
			                "sLast":    "Último",
			                "sNext":    "Siguiente",
			                "sPrevious": "Anterior"
			            }
			        },
			        lengthMenu: [[10, 20], [10, 20]]
			    });*/
			    //$("tListaPagosTesoreria").DataTable().ajax.reload(null, true);


 
				
	        }
      	}
    	});
  	};

  	$("#btnExportarTodoExcel, #imgExportarExcel").on('click', function() {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = -1;
	    hospital = -1;
	    rut_proveedor = "";
		
		//var url = window.location.href.replace("ListarPagos", "exportarexcel");
	    var urlFinal = window.location.href.replace("listarPagosTesoreria", "exportarexcelPagosTesoreria") + "?institucion=" + institucion + "&hospital=" + hospital  + "&rut_proveedor=" + rut_proveedor;
	    window.location.href = urlFinal;
	    loader.setAttribute('hidden', '');
  	});

  	$("#btnExportarExcel, #imgExportarExcel").on('click', function() {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = null;
	    hospital = null;
	    rut_proveedor = null;

	    if ($("#institucionPT").val() != null) {
	    	institucion = $("#institucionPT").val();
	    }

	    if ($("#institucionPT").val() != null) {
		    hospital = $("#hospitalPT").val();
		}

		if($("#inputRutProveedor").val().length > 0)
			rut_proveedor = $("#inputRutProveedor").val();
		
		//var url = window.location.href.replace("ListarPagos", "exportarexcel");
	    var urlFinal = window.location.href.replace("listarPagosTesoreria", "exportarexcelPagosTesoreria") + "?institucion=" + institucion + "&hospital=" + hospital + "&rut_proveedor=" + rut_proveedor;
	    window.location.href = urlFinal;
	    loader.setAttribute('hidden', '');
  	});

  	$("#btnExportarExcelPERC").on('click', function() {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    anio = null;
	    mes = null;
	    id_entidad = null;

	    if ($("#aniosPERC").val() != null) {
	    	anio = $("#aniosPERC").val();
	    }

	    if ($("#mesPERC").val() != null) {
		    mes = $("#mesPERC").val();
		}

		if($("#entidadesPERC").val().length > 0)
			id_entidad = $("#entidadesPERC").val();
		
		//var url = window.location.href.replace("ListarPagos", "exportarexcel");
	    var urlFinal = window.location.href.replace("reportePERC", "exportarexcelPERC") + "?anio=" + anio + "&mes=" + mes + "&id_entidad=" + id_entidad;
	    window.location.href = urlFinal;
	    loader.setAttribute('hidden', '');
  	});

  	$("#btnExportarIndirectExcelPERC").on('click', function() {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    anio = null;
	    mes = null;
	    id_entidad = null;

	    if ($("#aniosPERC").val() != null) {
	    	anio = $("#aniosPERC").val();
	    }

	    if ($("#mesPERC").val() != null) {
		    mes = $("#mesPERC").val();
		}

		if($("#entidadesPERC").val().length > 0)
			id_entidad = $("#entidadesPERC").val();
		
		//var url = window.location.href.replace("ListarPagos", "exportarexcel");
	    var urlFinal = window.location.href.replace("reportePERC", "exportarindirectexcelPERC") + "?anio=" + anio + "&mes=" + mes + "&id_entidad=" + id_entidad;
	    window.location.href = urlFinal;
	    loader.setAttribute('hidden', '');
  	});

  	function listarReporteResumenGrafico()
  	{
	    institucion = $("#institucion").val();
	    hospital = $("#hospital").val();
	    tipo = 1;
	  

	    var baseurl = window.origin + '/Reporte/listarReporteResumenGrafico';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, tipo: tipo },
		success: function(data) {
	        if (data)
	        {			
				$("#tbodyReporteResumenGrafico").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            if(data[i]['nivel'] == '1')
		            {
		            	row = row.concat('\n<th class=""><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
			            row = row.concat('\n<th class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2017']),'</p></th>');
			            row = row.concat('\n<th class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2018']),'</p></th>');
			            row = row.concat('\n<th class="text-center"><p class="texto-pequenio">',data[i]['var'],'%</p></th>');
		            }else{
		            	row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['nombreAsignacion'],'</p></th>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2017']),'</p></td>');
			            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2018']),'</p></td>');
			            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var'],'%</p></td>');
		            }
		            row = row.concat('\n<tr>');
		          $("#tbodyReporteResumenGrafico").append(row);
		        }


		        institucion = $("#institucion").val();
	    		hospital = $("#hospital").val();
	    		tipo = 2;

			    var baseurl = window.origin + '/Reporte/listarReporteResumenGrafico';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, tipo: tipo },
				success: function(data) {
			        if (data)
			        {			
						$("#tbodyReporteResumen22").empty();
						for (var i = 0; i < data.length; i++){
				            var row = '';
				            row = row.concat('<tr>');
				            if(data[i]['nivel'] == '1')
				            {
				            	row = row.concat('\n<th class=""><p class="texto-pequenio">',data[i]['nombre'],'</p></th>');
					            row = row.concat('\n<th class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2017']),'</p></th>');
					            row = row.concat('\n<th class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2018']),'</p></th>');
					            row = row.concat('\n<th class="text-center"><p class="texto-pequenio">',data[i]['var'],'%</p></th>');
				            }else{
				            	row = row.concat('\n<td class=""><p class="texto-pequenio">',data[i]['nombreAsignacion'],'</p></th>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2017']),'</p></td>');
					            row = row.concat('\n<td class="text-right"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(data[i]['total_2018']),'</p></td>');
					            row = row.concat('\n<td class="text-center"><p class="texto-pequenio">',data[i]['var'],'%</p></td>');
				            }
				            row = row.concat('\n</tr>');
				          $("#tbodyReporteResumen22").append(row);
				        }
			        }
		      	}
		    	});
	        }
      	}
    	});
  	};

  	$('#tReporteResumen,#tReporteResumenGasto,#botones').on('click', '.redireccionarSubtitulo', function(e) {
  	//$('.redireccionarSubtitulo').on('click', function(e) {
  		var loader = document.getElementById("loader");
    	loader.removeAttribute('hidden');
    	//var idCuenta = e.currentTarget.dataset.id;

    	idInstitucion = "";
    	idArea = "";
    	idCuenta = "";

    	if (e.currentTarget.className.indexOf('botonTabla', 0) > 0) {
	    	var url = window.location.href.split("?")[0].replace("ListarReportes", "ListarReportesItem");
	    	idInstitucion = $("#institucion").val();
	    	idArea = $("#hospital").val();
	    	idCuenta = e.currentTarget.dataset.id;
		}else
    	{
    		var url = window.location.href.split("?")[0].replace("ListarReportesItem", "ListarReportes");
    		idInstitucion = $("#institucionItem").val();
	    	idArea = $("#hospitalItem").val();
		}

	    if(idInstitucion > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idInstitucion=', idInstitucion);
	    	else
	    		url = url.concat('?idInstitucion=', idInstitucion);

	    if(idArea > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idArea=', idArea);
	    	else
	    		url = url.concat('?idArea=', idArea);

	    if(idCuenta != "")
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idCuenta=', idCuenta);
	    	else
	    		url = url.concat('?idCuenta=', idCuenta);   

	    window.location.href = url;
	});

	$('#tReporteResumen,#tReporteResumenGasto,#botones').on('click', '.redireccionarItem', function(e) {
  	//$('.redireccionarItem').click(function() {
  		var loader = document.getElementById("loader");
    	loader.removeAttribute('hidden');
    	var idCuenta = "";
    	var idInstitucion = "";
    	var idArea = "";

    	if (e.currentTarget.className.indexOf('botonTabla', 0) > 0) {
    		var url = window.location.href.split("?")[0].replace("ListarReportes", "ListarReportesItem");
    		idInstitucion = $("#institucion").val();
    		idArea = $("#hospital").val();
    		idCuenta = e.currentTarget.dataset.id;    		
    	}else
    	{
    		var url = window.location.href.split("?")[0].replace("ListarReportesAsignacion", "ListarReportesItem");
    		idInstitucion = $("#institucionAsignacion").val();
    		idArea = $("#hospitalAsignacion").val();
    		idCuenta = $('#itemSeleccion').data('idcuenta');
		}

	    if(idInstitucion > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idInstitucion=', idInstitucion);
	    	else
	    		url = url.concat('?idInstitucion=', idInstitucion);

	    if(idArea > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idArea=', idArea);
	    	else
	    		url = url.concat('?idArea=', idArea);

	    if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idCuenta=', idCuenta);
	    	else
	    		url = url.concat('?idCuenta=', idCuenta);

	    window.location.href = url;
	});

	$('#tReporteResumen,#tReporteResumenGasto,#botones').on('click', '.redireccionarAsignacion', function(e) {
  	//$('.redireccionarAsignacion').on('click', function(e) {
  		var loader = document.getElementById("loader");
    	loader.removeAttribute('hidden');

    	var idInstitucion = "";
    	var idArea = "";
    	var idCuenta = "";
    	var idItem = "";

    	if (e.currentTarget.className.indexOf('botonTabla', 0) > 0) {
    		var url = window.location.href.split("?")[0].replace("ListarReportesItem", "ListarReportesAsignacion");
    		idInstitucion = $("#institucionItem").val();
	    	idArea = $("#hospitalItem").val();
	    	idCuenta = $("#cuentaSeleccion").data('id');
	    	idItem = (e.currentTarget.dataset.id == "" ? null : e.currentTarget.dataset.id);
    	}else
    	{
    		var url = window.location.href.split("?")[0].replace("ListarReportesSubAsignacion", "ListarReportesAsignacion");
    		idInstitucion = $("#institucionSubAsignacion").val();
	    	idArea = $("#hospitalSubAsignacion").val();
	    	idCuenta = $("#asignacionSeleccion").data('idcuenta');
	    	idItem = $("#asignacionSeleccion").data('iditem');
    	}

	    if(idInstitucion > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idInstitucion=', idInstitucion);
	    	else
	    		url = url.concat('?idInstitucion=', idInstitucion);

	    if(idArea > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idArea=', idArea);
	    	else
	    		url = url.concat('?idArea=', idArea);

    	if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idCuenta=', idCuenta);
    	else
    		url = url.concat('?idCuenta=', idCuenta);

    	
    	if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idItem=', idItem);
    	else
    		url = url.concat('?idItem=', idItem);

	    window.location.href = url;
	});

	$('#tReporteResumen,#tReporteResumenGasto,#botones').on('click', '.redireccionarSubAsignacion', function(e) {
	//$('.redireccionarSubAsignacion').on('click', function(e) {
  		var loader = document.getElementById("loader");
    	loader.removeAttribute('hidden');
    	
    	var idInstitucion = "";
    	var idArea = "";
    	var idCuenta = "";
    	var idItem = "";
    	var idAsignacion = "";

    	if (e.currentTarget.className.indexOf('botonTabla', 0) > 0) {
    		var url = window.location.href.split("?")[0].replace("ListarReportesAsignacion", "ListarReportesSubAsignacion");
    		idInstitucion = $("#institucionAsignacion").val();
	    	idArea = $("#hospitalAsignacion").val();
	    	idCuenta = $("#itemSeleccion").data('idcuenta');
	    	idItem = $("#itemSeleccion").data('id');
	    	idAsignacion = e.currentTarget.dataset.id;
    	}else
    	{
		    var url = window.location.href.split("?")[0].replace("ListarReportesEspecifico", "ListarReportesSubAsignacion");
		    idInstitucion = $("#institucionEspecifico").val();
	    	idArea = $("#hospitalEspecifico").val();
	    	idCuenta = $("#subasignacionSeleccion").data('idcuenta');
	    	idItem = $("#subasignacionSeleccion").data('iditem');
	    	idAsignacion = $("#subasignacionSeleccion").data('idasignacion');
		}

	    if(idInstitucion > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idInstitucion=', idInstitucion);
	    	else
	    		url = url.concat('?idInstitucion=', idInstitucion);

	    if(idArea > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idArea=', idArea);
	    	else
	    		url = url.concat('?idArea=', idArea);
	    
	    if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idCuenta=', idCuenta);
    	else
    		url = url.concat('?idCuenta=', idCuenta);

	    if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idItem=', idItem);
    	else
    		url = url.concat('?idItem=', idItem);

    	if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idAsignacion=', idAsignacion);
    	else
    		url = url.concat('?idAsignacion=', idAsignacion);

	    window.location.href = url;
	});

	$('#tReporteResumen,#tReporteResumenGasto,#botones').on('click', '.redireccionarEspecifico', function(e) {
	//$('.redireccionarEspecifico').on('click', function(e) {
  		var loader = document.getElementById("loader");
    	loader.removeAttribute('hidden');
    	var idInstitucion = $("#institucionSubAsignacion").val();
    	var idArea = $("#hospitalSubAsignacion").val();
    	var idCuenta = $("#asignacionSeleccion").data('idcuenta');
    	var idItem = $("#asignacionSeleccion").data('iditem');
    	var idAsignacion = $("#asignacionSeleccion").data('id');
    	var idSubAsignacion = e.currentTarget.dataset.id;

    	var url = window.location.href.split("?")[0].replace("ListarReportesSubAsignacion", "ListarReportesEspecifico");

	    if(idInstitucion > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idInstitucion=', idInstitucion);
	    	else
	    		url = url.concat('?idInstitucion=', idInstitucion);

	    if(idArea > 0)
	    	if (url.indexOf('?', 0) > 0)
	    		url = url.concat('&idArea=', idArea);
	    	else
	    		url = url.concat('?idArea=', idArea);

	    if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idCuenta=', idCuenta);
    	else
    		url = url.concat('?idCuenta=', idCuenta);

	    if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idItem=', idItem);
    	else
    		url = url.concat('?idItem=', idItem);

    	if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idAsignacion=', idAsignacion);
    	else
    		url = url.concat('?idAsignacion=', idAsignacion);

    	if (url.indexOf('?', 0) > 0)
    		url = url.concat('&idSubAsignacion=', idSubAsignacion);
    	else
    		url = url.concat('?idSubAsignacion=', idSubAsignacion);

	    window.location.href = url;
	});
});

/*$(function () {
	$('#tListaPagosTesoreria').dataTable({                
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
        //bDestroy:       true,
         
        "oLanguage": {
            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
            "sZeroRecords": "No se encontraron registros",
            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 de 0 registros",
            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
            "sSearch":        "Buscar:",
            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":    "Último",
                "sNext":    "Siguiente",
                "sPrevious": "Anterior"
            }
        },
        lengthMenu: [[10, 20], [10, 20]]
    });
});*/

window.onload = function () {
	if(window.location.pathname.split('/')[2].toLowerCase() == 'ListarReportes'.toLowerCase())
	{
		cargarGraficos();
	}

	if(window.location.pathname.split('/')[2].toLowerCase() == 'listarReportesEquilibrioFinanciero'.toLowerCase())
	{
		cargarGraficosEF();
	}

	if(window.location.pathname.split('/')[2].toLowerCase() == 'ListarReportesRecaudacion'.toLowerCase())
	{
		cargarGraficosR();
	}

	if(window.location.pathname.split('/')[2].toLowerCase() == 'graficoResumenConsolidado'.toLowerCase())
	{
		cargarGraficosRR();
	}

	if(window.location.pathname.split('/')[2].toLowerCase() == 'graficoResumenConsolidadoRegion'.toLowerCase())
	{
		cargarGraficosCRR();
	}

	/*if(window.location.pathname.split('/')[2].toLowerCase() == 'listarPagosTesoreria'.toLowerCase())
	{
		listarPagosTesoreria();
	}*/

	$('#tListaPagosDevengado').dataTable({
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
        //bDestroy:       true,
         
        "oLanguage": {
            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
            "sZeroRecords": "No se encontraron registros",
            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 de 0 registros",
            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
            "sSearch":        "Buscar:",
            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":    "Último",
                "sNext":    "Siguiente",
                "sPrevious": "Anterior"
            }
        },
        lengthMenu: [[10, 20], [10, 20]]
    });

	$('#tListaPagosTesoreria').dataTable({                
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
        //bDestroy:       true,
         
        "oLanguage": {
            "sLengthMenu": "_MENU_ Registros por p&aacute;gina",
            "sZeroRecords": "No se encontraron registros",
            "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 de 0 registros",
            "sInfoFiltered": "(filtrado de _MAX_ registros totales)",
            "sSearch":        "Buscar:",
            "sProcessing" : '<img src="<?php echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":    "Último",
                "sNext":    "Siguiente",
                "sPrevious": "Anterior"
            }
        },
        lengthMenu: [[10, 20], [10, 20]]
    });
}



	function cargarGraficosEF(){
		 institucion = $("#institucionEF").val();
	    hospital = $("#hospitalEF").val();
		cuenta = -1;
	    item = -1;
	    mes = $("#mesEF").val();
	    anio = $("#anioEF").val();
		var dataPoints_2017 = [];
		var dataPoints_2018 = [];

	    var baseurl = window.origin + '/Reporte/listarReportesEquilibrioFinancieroFiltro';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, cuenta: cuenta, mes: mes, anio: anio},
		success: function(data) {
	        if (data)
	        {
				var dataPointsGeneral1 = [];
				var dataPoints11 = [];
				var dataPoints12 = [];

				if(data[data.length -1]["mes"] == "13")
	        	{
	        		delete data[data.length -1];	
	        	}


	        	var anio1 = data[0]["anio"];
	        	var pon_2017 = data[0]['2017'];
	        	var pon_2018 = data[0]['2018'];
				for (var i = 0; i < (data.length-1); i++) {
					if(anio1 != data[i]["anio"] || (i + 1) == (data.length -1)){
						var legend = '';
						if(anio1 == '2017')
							legend = parseFloat(pon_2017).toFixed(4);
						else
							legend = parseFloat(pon_2018).toFixed(4);
						if((i+1) == (data.length-1))
						{
							dataPoints11.push({
								label: data[i]['nombreMes'],
								y: parseFloat(data[i]['cumplimiento'])
							});
						
							dataPoints12.push({
								type: "spline",
								showInLegend: true,
								//yValueFormatString: "##.00mn",
								name: anio1,
								dataPoints: dataPoints11
							});
						}else{
							dataPoints12.push({
								type: "spline",
								showInLegend: true,
								//yValueFormatString: "##.00mn",
								name: anio1,
								dataPoints: dataPoints11
							});
						}
						

						dataPointsGeneral1.push(dataPoints12[0]);
						if(anio1 != data[i]["anio"])
						{
							dataPoints11 = [];
							dataPoints12 = [];
							anio1 = data[i]["anio"];

							dataPoints11.push({
								label: data[i]['nombreMes'],
								y: parseFloat(data[i]['cumplimiento'])
							});
						}

					}else{
						dataPoints11.push({
							label: data[i]['nombreMes'],
							y: parseFloat(data[i]['cumplimiento'])
						});
					}
				}

	        	/*for (var i = 0; i < data.length; i++) {

					if(data[i]["anio"] == 2017)
					{
						dataPoints_2017.push({
						label: data[i]["nombreMes"],
						y: parseFloat(data[i]["puntuacion"]),
						anio: data[i]["anio"]
						});
					}

					if(data[i]["anio"] == 2018)
					{
						dataPoints_2018.push({
						label: data[i]["nombreMes"],
						y: parseFloat(data[i]["puntuacion"]),
						anio: data[i]["anio"]
						});
					}
				}*/

				var chart = new CanvasJS.Chart("chartContainer", {
					theme:"light2",
					animationEnabled: true,
					title:{
						text: "Equilibrio Financiero"
					},
					axisY :{
						includeZero: false,
						title: "Coeficiente"
						//suffix: "mn"
					},
					toolTip: {
						shared: "true"
					},
					legend:{
						cursor:"pointer",
						itemclick : toggleDataSeries
					},
					data: dataPointsGeneral1
				});

				 /*var chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: true,
					title:{
						text: "Subt. 21"
					},
					axisY: {
						title: "Vista por M$",
						titleFontColor: "#4F81BC",
						lineColor: "#4F81BC",
						labelFontColor: "#4F81BC",
						tickColor: "#4F81BC",
						//labelFormatter: "#,###,,.##M",
						valueFormatString: "$#,###,,.##M"
					},
					axisY2: {
						title: "Vista por M$",
						titleFontColor: "#C0504E",
						lineColor: "#C0504E",
						labelFontColor: "#C0504E",
						tickColor: "#C0504E",
						//labelFormatter: "#,###,,.##M",
						valueFormatString: "$#,###,,.##M"
					},	
					toolTip: {
						shared: true
					},
					legend: {
						cursor:"pointer",
						itemclick: toggleDataSeries
					},
					data: [{
						type: "spline",
						name: "2017 Subt. 21",
						legendText: "2017 Subt. 21",
						showInLegend: true,
						indexLabel: "${y}",
						//indexLabelFontWeight: "bold",
						indexLabelPlacement: "inside",
						indexLabelOrientation: "vertical",
						indexLabelFontColor: "#ffffff",
						indexLabelFontSize: 11,
						toolTipContent: "<span style='\"'color: #4F81BC;'\"'>{anio}:<strong>${y}</strong></span>",
						dataPoints: dataPoints_2017
					},
					{
						type: "spline",	
						name: "2018 Subt. 21",
						axisYType: "secondary",
						legendText: "2018 Subt. 21",
						showInLegend: true,
						indexLabel: "${y}",
						//indexLabelFontWeight: "bold",
						indexLabelPlacement: "inside",
						indexLabelOrientation: "vertical",
						indexLabelFontColor: "#ffffff",
						indexLabelFontSize: 11,
						toolTipContent: "<span style='\"'color: #C0504E;'\"'>{anio}:<strong>${y}</strong></span>",
						dataPoints: dataPoints_2018
					}]
				});
				*/
		        
		       
			chart.render();

			function toggleDataSeries(e){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				}
				else{
					e.dataSeries.visible = true;
				}
				chart.render();
			}
	        }
      	}
    	});
	}


	function cargarGraficosR(){
		 institucion = $("#institucionR").val();
	    hospital = $("#hospitalR").val();
	    mes = $("#mesR").val();
	    anio = $("#anioR").val();
		var dataPoints_2017 = [];
		var dataPoints_2018 = [];

	    var baseurl = window.origin + '/Reporte/listarReportesRecaudacionFiltro';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, mes: mes, anio: anio},
		success: function(data) {
	        if (data)
	        {
				var dataPointsGeneral1 = [];
				var dataPoints11 = [];
				var dataPoints22 = [];
				var dataPoints12 = [];
				var dataPoints13 = [];

	        	var anio1 = data[0]["anio"];

	        	if(data[data.length -1]["mes"] == "13")
	        	{
	        		delete data[data.length -1];	
	        	}

				for (var i = 0; i < (data.length -1); i++) {
					//if(data[i]["mes"] != "13")
					//{
						if(anio1 != data[i]["anio"] || (i + 1) == (data.length -1)){

							if((i+1) == (data.length-1))
							{
								//if(data[i]["mes"] != "13")
								//{
									dataPoints11.push({
										label: data[i]['nombreMes'],
										y: parseFloat(data[i]['porcentaje_70'])
									});

									dataPoints22.push({
										label: data[i]['nombreMes'],
										y: parseFloat(data[i]['porcentaje_30'])
									});
								
									dataPoints12.push({
										type: "spline",
										showInLegend: true,
										//yValueFormatString: "##.00mn",
										name: '70 % Subt. 7 y 8',
										dataPoints: dataPoints11
									});

									dataPoints13.push({
										type: "spline",
										showInLegend: true,
										//yValueFormatString: "##.00mn",
										name: '30 % Subt. 12',
										dataPoints: dataPoints22
									});
								//}
							}else{
								//if(data[i]["mes"] != "13")
								//{
									dataPoints12.push({
										type: "spline",
										showInLegend: true,
										//yValueFormatString: "##.00mn",
										name: '70 % Subt. 7 y 8',
										dataPoints: dataPoints11
									});

									dataPoints13.push({
										type: "spline",
										showInLegend: true,
										//yValueFormatString: "##.00mn",
										name: '30 % Subt. 12',
										dataPoints: dataPoints22
									});
								//}
							}
							

							dataPointsGeneral1.push(dataPoints12[0]);
							dataPointsGeneral1.push(dataPoints13[0]);

							if(anio1 != data[i]["anio"])
							{
								dataPoints11 = [];
								dataPoints12 = [];
								anio1 = data[i]["anio"];
								//if(data[i]["mes"] != "13")
								//{
									dataPoints11.push({
										label: data[i]['nombreMes'],
										y: parseFloat(data[i]['porcentaje_70'])
									});

									dataPoints22.push({
										label: data[i]['nombreMes'],
										y: parseFloat(data[i]['porcentaje_30'])
									});
								//}
							}

						}else{
							//if(data[i]["mes"] != "13")
							//{
								dataPoints11.push({
									label: data[i]['nombreMes'],
									y: parseFloat(data[i]['porcentaje_70'])
								});
								dataPoints22.push({
									label: data[i]['nombreMes'],
									y: parseFloat(data[i]['porcentaje_30'])
								});
							//}
						}
					//}
					
				}

				var chart = new CanvasJS.Chart("chartContainer", {
					theme:"light2",
					animationEnabled: true,
					title:{
						text: "Recaudacion de Ingresos"
					},
					axisY :{
						includeZero: false,
						title: "Porcentaje"
						//suffix: "mn"
					},
					toolTip: {
						shared: "true"
					},
					legend:{
						cursor:"pointer",
						itemclick : toggleDataSeries
					},
					data: dataPointsGeneral1
				});		        
		       
			chart.render();

			function toggleDataSeries(e){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				}
				else{
					e.dataSeries.visible = true;
				}
				chart.render();
			}
	        }
      	}
    	});
	}

	function cargarGraficosRR(){
		institucion = $("#institucionGRR").val();
		var dataPoints_2017 = [];
		var loader = document.getElementById("loader");
		loader.removeAttribute('hidden');

	    var baseurl = window.origin + '/Reporte/listarResumenProgramas';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion},
		success: function(data) {
	        if (data)
	        {
				var dataPoints = [];
				var dataPointsP = [];
				for (var i = 0; i < data.listarPagos.length; i++){
	            	if(data.listarPagos[i]['nombre'] == 'Total')
	            	{
						var marco = data.listarPagos[i]['marco'];
						var convenio = data.listarPagos[i]['convenio'];
						var transferencia = data.listarPagos[i]['transferencia'];
							
						var pconvenio = ((parseFloat(convenio)*100)/parseFloat(marco));
						var ptransferencia = ((parseFloat(transferencia)*100)/parseFloat(marco));

						dataPoints.push({
							label: 'Marco Presupuestario',
							y: parseFloat(marco),
							y2: 100
						});
						
						dataPointsP.push({
							label: 'Marco Presupuestario',
							y: parseFloat(100)
						});


						dataPoints.push({
							label: 'Convenio',
							y: parseFloat(convenio),
							y2: parseFloat(pconvenio)
						});

						dataPointsP.push({
							label: 'Convenio',
							y: parseFloat(pconvenio)
						});

						dataPoints.push({
							label: 'Transferencia',
							y: parseFloat(transferencia),
							y2: parseFloat(ptransferencia)
						});

						dataPointsP.push({
							label: 'Transferencia',
							y: parseFloat(ptransferencia)
						});
					}
		        }

				var chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: true,
					exportEnabled: true,
					theme: "light1", // "light1", "light2", "dark1", "dark2"
					title:{
						text: "Gráfico Resumen Consolidado"
					},
					toolTip: {
						shared: true
					},
					legend: {
						cursor: "pointer",
						itemclick: toggleDataSeries
					},
					axisY: {
						title: "Vista por $",
						titleFontColor: "#C0504E",
						lineColor: "#C0504E",
						labelFontColor: "#C0504E",
						tickColor: "#C0504E",
						//labelFormatter: "#,###,,.##M",
						valueFormatString: "$#,###,,.##"
					},
					axisY2: {
						title: "Vista por %",
						titleFontColor: "#4F81BC",
						lineColor: "#4F81BC",
						labelFontColor: "#4F81BC",
						tickColor: "#4F81BC"
					},	
					axisX: {
						titleFontColor: "#4F81BC",
						lineColor: "#4F81BC",
						labelFontColor: "#4F81BC",
						tickColor: "#4F81BC",
						fontSize: 15
					},
					data: [{
						type: "column", //change type to bar, line, area, pie, etc
						//indexLabel: "{y}", //Shows y value on all Data Points
						name: "Montos",
						indexLabelFontColor: "#5A5757",
						indexLabelPlacement: "outside",
						showInLegend: true,
						dataPoints: dataPoints
					},
					{
						type: "column",
						name: "Porcentajes",
						axisYType: "secondary",
						showInLegend: true,
						yValueFormatString: "#,##0.#",
						dataPoints: dataPointsP
					}

					]
				});
		        
		       
		       loader.setAttribute('hidden', '');
				chart.render();

				function toggleDataSeries(e){
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					}
					else{
						e.dataSeries.visible = true;
					}
					chart.render();
				}
	        }
      	}
    	});
	}

	function cargarGraficosCRR(origen){
		var loader = document.getElementById("loader");
		loader.removeAttribute('hidden');

		region = $("#regionGCRR").val();
		comuna = $("#comunaGCRR").val();

		if(origen == 0)
			comuna = "-1";
		else
			comuna = $("#comunaGCRR").val();

	    var baseurl = window.origin + '/Reporte/listarResumenConsolidadoRegion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {region: region, comuna: comuna },
		success: function(data) {
	        if (data)
	        {

	        	if(origen != 1)
	        	{
	        		if (data.listarComunas)
			        {			
						$("#comunaGCRR").empty();
						var row = '<option value="-1">Todos</option>';
						for (var i = 0; i < data.listarComunas.length; i++) {
							row = row.concat('\n<option value="',data.listarComunas[i]["id_comunas"],'">',data.listarComunas[i]["nombre"], '</option>');
						}
						$("#comunaGCRR").append(row);
			        }
		        }

				var dataPoints = [];
				var dataPointsP = [];
				for (var i = 0; i < data.listarPagos.length; i++){
	            	if(data.listarPagos[i]['nombre'] == 'Total')
	            	{
						var marco = data.listarPagos[i]['marco'];
						var convenio = data.listarPagos[i]['convenio'];
						var transferencia = data.listarPagos[i]['transferencia'];
							
						var pconvenio = ((parseFloat(convenio)*100)/parseFloat(marco));
						var ptransferencia = ((parseFloat(transferencia)*100)/parseFloat(marco));

						dataPoints.push({
							label: 'Marco Presupuestario',
							y: parseFloat(marco),
							y2: 100
						});
						
						dataPointsP.push({
							label: 'Marco Presupuestario',
							y: parseFloat(100)
						});


						dataPoints.push({
							label: 'Convenio',
							y: parseFloat(convenio),
							y2: parseFloat(pconvenio)
						});

						dataPointsP.push({
							label: 'Convenio',
							y: parseFloat(pconvenio)
						});

						dataPoints.push({
							label: 'Transferencia',
							y: parseFloat(transferencia),
							y2: parseFloat(ptransferencia)
						});

						dataPointsP.push({
							label: 'Transferencia',
							y: parseFloat(ptransferencia)
						});
					}
		        }

				var chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: true,
					exportEnabled: true,
					theme: "light1", // "light1", "light2", "dark1", "dark2"
					title:{
						text: "Gráfico Resumen Consolidado Regiones"
					},
					toolTip: {
						shared: true
					},
					legend: {
						cursor: "pointer",
						itemclick: toggleDataSeries
					},
					axisY: {
						title: "Vista por $",
						titleFontColor: "#C0504E",
						lineColor: "#C0504E",
						labelFontColor: "#C0504E",
						tickColor: "#C0504E",
						//labelFormatter: "#,###,,.##M",
						valueFormatString: "$#,###,,.##"
					},
					axisY2: {
						title: "Vista por %",
						titleFontColor: "#4F81BC",
						lineColor: "#4F81BC",
						labelFontColor: "#4F81BC",
						tickColor: "#4F81BC"
					},	
					axisX: {
						titleFontColor: "#4F81BC",
						lineColor: "#4F81BC",
						labelFontColor: "#4F81BC",
						tickColor: "#4F81BC",
						fontSize: 15
					},
					data: [{
						type: "column", //change type to bar, line, area, pie, etc
						//indexLabel: "{y}", //Shows y value on all Data Points
						name: "Montos",
						indexLabelFontColor: "#5A5757",
						indexLabelPlacement: "outside",
						showInLegend: true,
						dataPoints: dataPoints
					},
					{
						type: "column",
						name: "Porcentajes",
						axisYType: "secondary",
						showInLegend: true,
						yValueFormatString: "#,##0.#",
						dataPoints: dataPointsP
					}

					]
				});
		        
		       
		       loader.setAttribute('hidden', '');
				chart.render();

				function toggleDataSeries(e) {
					if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					} else {
						e.dataSeries.visible = true;
					}
					e.chart.render();
				}
	        }
      	}
    	});
	}

	function cargarGraficos(){

		var institucion = $("#institucion").val();
		var hospital = $("#hospital").val();
		var cuenta = -1;//$("#asignacionSeleccion").data('idcuenta');
		var tipo = 1;

		var baseurl = window.origin + '/Reporte/listarReporteGrafico';
		var dataPointsSub21_2017 = [];
		var dataPointsSub21_2018 = [];
		var dataPointsSub22_2017 = [];
		var dataPointsSub22_2018 = [];
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, cuenta: cuenta, tipo :tipo},
		success: function(data) {
			if(data)
			{
				for (var i = 0; i < data.length; i++) {

					if(data[i]["subt"] == "subt1")
					{
						if(data[i]["anio"] == 2017)
						{
							dataPointsSub21_2017.push({
							label: data[i]["nombreMes"],
							y: parseFloat(data[i]["total"]),
							anio: data[i]["anio"]
							});
						}

						if(data[i]["anio"] == 2018)
						{
							dataPointsSub21_2018.push({
							label: data[i]["nombreMes"],
							y: parseFloat(data[i]["total"]),
							anio: data[i]["anio"]
							});
						}
					}else{
						if(data[i]["anio"] == 2017)
						{
							dataPointsSub22_2017.push({
							label: data[i]["nombreMes"],
							y: parseFloat(data[i]["total"]),
							anio: data[i]["anio"]
							});
						}

						if(data[i]["anio"] == 2018)
						{
							dataPointsSub22_2018.push({
							label: data[i]["nombreMes"],
							y: parseFloat(data[i]["total"]),
							anio: data[i]["anio"]
							});
						}
					}
				}

				    var chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: true,
					title:{
						text: "Subt. 21"
					},
					axisY: {
						title: "Vista por M$",
						titleFontColor: "#4F81BC",
						lineColor: "#4F81BC",
						labelFontColor: "#4F81BC",
						tickColor: "#4F81BC",
						//labelFormatter: "#,###,,.##M",
						valueFormatString: "$#,###,,.##M"
					},
					axisY2: {
						title: "Vista por M$",
						titleFontColor: "#C0504E",
						lineColor: "#C0504E",
						labelFontColor: "#C0504E",
						tickColor: "#C0504E",
						//labelFormatter: "#,###,,.##M",
						valueFormatString: "$#,###,,.##M"
					},	
					toolTip: {
						shared: true
					},
					legend: {
						cursor:"pointer",
						itemclick: toggleDataSeries
					},
					data: [{
						type: "column",
						name: "2017 Subt. 21",
						legendText: "2017 Subt. 21",
						showInLegend: true,
						indexLabel: "${y}",
						//indexLabelFontWeight: "bold",
						indexLabelPlacement: "inside",
						indexLabelOrientation: "vertical",
						indexLabelFontColor: "#ffffff",
						indexLabelFontSize: 11,
						toolTipContent: "<span style='\"'color: #4F81BC;'\"'>{anio}:<strong>${y}</strong></span>",
						dataPoints: dataPointsSub21_2017
					},
					{
						type: "column",	
						name: "2018 Subt. 21",
						axisYType: "secondary",
						legendText: "2018 Subt. 21",
						showInLegend: true,
						indexLabel: "${y}",
						//indexLabelFontWeight: "bold",
						indexLabelPlacement: "inside",
						indexLabelOrientation: "vertical",
						indexLabelFontColor: "#ffffff",
						indexLabelFontSize: 11,
						toolTipContent: "<span style='\"'color: #C0504E;'\"'>{anio}:<strong>${y}</strong></span>",
						dataPoints: dataPointsSub21_2018
					}]
				});


				
				var chart2 = new CanvasJS.Chart("chartContainer2", {
					animationEnabled: true,
					title:{
						text: "Subt. 22"
					},
					axisY: {
						title: "Vista por M$",
						titleFontColor: "#4F81BC",
						lineColor: "#4F81BC",
						labelFontColor: "#4F81BC",
						tickColor: "#4F81BC",
						valueFormatString: "$#,###,,.##M"
					},
					axisY2: {
						title: "Vista por M$",
						titleFontColor: "#C0504E",
						lineColor: "#C0504E",
						labelFontColor: "#C0504E",
						tickColor: "#C0504E",
						valueFormatString: "$#,###,,.##M"
					},	
					toolTip: {
						shared: true
					},
					legend: {
						cursor:"pointer",
						itemclick: toggleDataSeries
					},
					data: [{
						type: "column",
						name: "2017 Subt. 22",
						legendText: "2017 Subt. 22",
						showInLegend: true,
						indexLabel: "${y}",
						//indexLabelFontWeight: "bold",
						indexLabelPlacement: "inside",
						indexLabelOrientation: "vertical",
						indexLabelFontColor: "#ffffff",
						indexLabelFontSize: 11,
						toolTipContent: "<span style='\"'color: #4F81BC;'\"'>{anio}:<strong>${y}</strong></span>",
						dataPoints: dataPointsSub22_2017
					},
					{
						type: "column",	
						name: "2018 Subt. 22",
						axisYType: "secondary",
						legendText: "2018 Subt. 22",
						showInLegend: true,
						indexLabel: "${y}",
						//indexLabelFontWeight: "bold",
						indexLabelPlacement: "inside",
						indexLabelOrientation: "vertical",
						indexLabelFontColor: "#ffffff",
						indexLabelFontSize: 11,
						toolTipContent: "<span style='\"'color: #C0504E;'\"'>{anio}:<strong>${y}</strong></span>",
						dataPoints: dataPointsSub22_2018
					}]
				});


				var baseurlGraficoProduccion = window.origin + '/Reporte/listarReporteResumenGraficoProduccion';
				var dataPointsGrafico1 = [];
				var dataPointsGrafico2 = [];
				var dataPointsGrafico3 = [];
				var dataPointsGrafico4 = [];
				var dataPointsGrafico5 = [];
				var dataPointsGrafico6 = [];

				var dataPointsGeneral1 = [];
				var dataPoints11 = [];
				var dataPoints12 = [];

				var dataPointsGeneral2 = [];
				var dataPoints21 = [];
				var dataPoints22 = [];

				var dataPointsGeneral3 = [];
				var dataPoints31 = [];
				var dataPoints32 = [];

				var dataPointsGeneral4 = [];
				var dataPoints41 = [];
				var dataPoints42 = [];

				var dataPointsGeneral5 = [];
				var dataPoints51 = [];
				var dataPoints52 = [];

				var dataPointsGeneral6 = [];
				var dataPoints61 = [];
				var dataPoints62 = [];

				jQuery.ajax({
				type: "POST",
				url: baseurlGraficoProduccion,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital, grupo :"-1"},
				success: function(data) {
					if(data)
					{
						for (var i = 0; i < data.length; i++) {
							var id_grupo_prestacion = data[i]["id_grupo_prestacion"];
							switch(id_grupo_prestacion) {
		  						case "1":
		  							dataPointsGrafico1.push({
										anio: data[i]['anio'],
										mes: data[i]['mes'],
										nombreMes: data[i]['nombreMes'],
										monto: parseFloat(data[i]['monto']),
										id_grupo_prestacion: data[i]['id_grupo_prestacion'],
										nombre_grupo: data[i]['nombre_grupo']
									});
		  						break;
		  						case "2":
		  							dataPointsGrafico2.push({
										anio: data[i]['anio'],
										mes: data[i]['mes'],
										nombreMes: data[i]['nombreMes'],
										monto:  parseFloat(data[i]['monto']),
										id_grupo_prestacion: data[i]['id_grupo_prestacion'],
										nombre_grupo: data[i]['nombre_grupo']
									});
		  						break;
		  						case "3":
		  							dataPointsGrafico3.push({
										anio: data[i]['anio'],
										mes: data[i]['mes'],
										nombreMes: data[i]['nombreMes'],
										monto:  parseFloat(data[i]['monto']),
										id_grupo_prestacion: data[i]['id_grupo_prestacion'],
										nombre_grupo: data[i]['nombre_grupo']
									});
		  						break;
		  						case "4":
									dataPointsGrafico5.push({
										anio: data[i]['anio'],
										mes: data[i]['mes'],
										nombreMes: data[i]['nombreMes'],
										monto: parseFloat(data[i]['monto']),
										id_grupo_prestacion: data[i]['id_grupo_prestacion'],
										nombre_grupo: data[i]['nombre_grupo']
									});
		  						break;
		  						case "5":
		  							dataPointsGrafico4.push({
										anio: data[i]['anio'],
										mes: data[i]['mes'],
										nombreMes: data[i]['nombreMes'],
										monto: parseFloat(data[i]['monto']),
										id_grupo_prestacion: data[i]['id_grupo_prestacion'],
										nombre_grupo: data[i]['nombre_grupo']
									});
		  						break;
		  						case "6":
		  							dataPointsGrafico6.push({
										anio: data[i]['anio'],
										mes: data[i]['mes'],
										nombreMes: data[i]['nombreMes'],
										monto: parseFloat(data[i]['monto']),
										id_grupo_prestacion: data[i]['id_grupo_prestacion'],
										nombre_grupo: data[i]['nombre_grupo']
									});
		  						break;

		  					}
						}

						var anio1 = dataPointsGrafico1[0]["anio"];
						var row1 = "";
						$("#tbody1").empty();
						row1 = row1.concat('<tr>\n<td scope="row"><p class="texto-pequenio-grafico">',dataPointsGrafico1[0]["anio"],'</p></td>');
						for (var i = 0; i < dataPointsGrafico1.length; i++) {

							if(anio1 != dataPointsGrafico1[i]["anio"] || (i + 1) == dataPointsGrafico1.length){
								var row1 = row1.concat('</tr>');
								$("#tbody1").append(row1);
								var row1 = '<tr>\n<td scope="row"><p class="texto-pequenio-grafico">'.concat(dataPointsGrafico1[i]["anio"],'</p></td>', '<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico1[i]['monto']),'</p></td>');
								dataPoints12.push({
									type: "spline",
									showInLegend: true,
									//yValueFormatString: "##.00mn",
									name: anio1,
									dataPoints: dataPoints11
								});

								dataPointsGeneral1.push(dataPoints12[0]);
								dataPoints11 = [];
								dataPoints12 = [];
								anio1 = dataPointsGrafico1[i]["anio"];
								dataPoints11.push({
									label: dataPointsGrafico1[i]['nombreMes'],
									y: dataPointsGrafico1[i]['monto']
								});

							}else{
								row1 = row1.concat('\n<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico1[i]["monto"]),'</p></td>');
								dataPoints11.push({
									label: dataPointsGrafico1[i]['nombreMes'],
									y: dataPointsGrafico1[i]['monto']
								});
							}
						}

						var anio2 = dataPointsGrafico2[0]["anio"];
						var row2 = "";
						$("#tbody2").empty();
						row2 = row2.concat('<tr>\n<td scope="row"><p class="texto-pequenio-grafico">',dataPointsGrafico2[0]["anio"],'</p></td>');
						for (var i = 0; i < dataPointsGrafico2.length; i++) {
							if(anio2 != dataPointsGrafico2[i]["anio"] || (i + 1) == dataPointsGrafico2.length){
								var row2 = row2.concat('</tr>');
								$("#tbody2").append(row2);
								var row2 = '<tr>\n<td scope="row"><p class="texto-pequenio-grafico">'.concat(dataPointsGrafico2[i]["anio"],'</p></td>', '<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico2[i]['monto']),'</p></td>');
								dataPoints22.push({
									type: "spline",
									showInLegend: true,
									//yValueFormatString: "##.00mn",
									name: anio2,
									dataPoints: dataPoints21
								});
								dataPointsGeneral2.push(dataPoints22[0]);
								dataPoints21 = [];
								dataPoints22 = [];
								anio2 = dataPointsGrafico2[i]["anio"];
								dataPoints21.push({
									label: dataPointsGrafico2[i]['nombreMes'],
									y: dataPointsGrafico2[i]['monto']
								});
							}else{
								row2 = row2.concat('\n<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico2[i]["monto"]),'</p></td>');
								dataPoints21.push({
									label: dataPointsGrafico2[i]['nombreMes'],
									y: dataPointsGrafico2[i]['monto']
								});
							}
						}

						var anio3 = dataPointsGrafico3[0]["anio"];
						var row3 = "";
						$("#tbody3").empty();
						row3 = row3.concat('<tr>\n<td scope="row"><p class="texto-pequenio-grafico">',dataPointsGrafico3[0]["anio"],'</p></td>');
						for (var i = 0; i < dataPointsGrafico3.length; i++) {
							if(anio3 != dataPointsGrafico3[i]["anio"] || (i + 1) == dataPointsGrafico3.length){
								var row3 = row3.concat('</tr>');
								$("#tbody3").append(row3);
								var row3 = '<tr>\n<td scope="row"><p class="texto-pequenio-grafico">'.concat(dataPointsGrafico3[i]["anio"],'</p></td>', '<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico3[i]['monto']),'</p></td>');
								dataPoints32.push({
									type: "spline",
									showInLegend: true,
									//yValueFormatString: "##.00mn",
									name: anio3,
									dataPoints: dataPoints31
								});
								dataPointsGeneral3.push(dataPoints32[0]);
								dataPoints31 = [];
								dataPoints32 = [];
								anio3 = dataPointsGrafico3[i]["anio"];
								dataPoints31.push({
									label: dataPointsGrafico3[i]['nombreMes'],
									y: dataPointsGrafico3[i]['monto']
								});
							}else{
								row3 = row3.concat('\n<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico3[i]["monto"]),'</p></td>');
								dataPoints31.push({
									label: dataPointsGrafico3[i]['nombreMes'],
									y: dataPointsGrafico3[i]['monto']
								});
							}
						}

						var anio4 = dataPointsGrafico4[0]["anio"];
						var row4 = "";
						$("#tbody4").empty();
						row4 = row4.concat('<tr>\n<td scope="row"><p class="texto-pequenio-grafico">',dataPointsGrafico4[0]["anio"],'</p></td>');
						for (var i = 0; i < dataPointsGrafico4.length; i++) {
							if(anio4 != dataPointsGrafico4[i]["anio"] || (i + 1) == dataPointsGrafico4.length){
								var row4 = row4.concat('</tr>');
								$("#tbody4").append(row4);
								var row4 = '<tr>\n<td scope="row"><p class="texto-pequenio-grafico">'.concat(dataPointsGrafico4[i]["anio"],'</p></td>', '<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico4[i]['monto']),'</p></td>');
								dataPoints42.push({
									type: "spline",
									showInLegend: true,
									//yValueFormatString: "##.00mn",
									name: anio4,
									dataPoints: dataPoints41
								});
								dataPointsGeneral4.push(dataPoints42[0]);
								dataPoints41 = [];
								dataPoints42 = [];
								anio4 = dataPointsGrafico4[i]["anio"];
								dataPoints41.push({
									label: dataPointsGrafico4[i]['nombreMes'],
									y: dataPointsGrafico4[i]['monto']
								});
							}else{
								row4 = row4.concat('\n<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico4[i]["monto"]),'</p></td>');
								dataPoints41.push({
									label: dataPointsGrafico4[i]['nombreMes'],
									y: dataPointsGrafico4[i]['monto']
								});
							}
						}

						var anio5 = dataPointsGrafico5[0]["anio"];
						var row5 = "";
						$("#tbody5").empty();
						row5 = row5.concat('<tr>\n<td scope="row"><p class="texto-pequenio-grafico">',dataPointsGrafico5[0]["anio"],'</p></td>');
						for (var i = 0; i < dataPointsGrafico5.length; i++) {
							if(anio5 != dataPointsGrafico5[i]["anio"] || (i + 1) == dataPointsGrafico5.length){
								var row5 = row5.concat('</tr>');
								$("#tbody5").append(row5);
								var row5 = '<tr>\n<td scope="row"><p class="texto-pequenio-grafico">'.concat(dataPointsGrafico5[i]["anio"],'</p></td>', '<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico5[i]['monto']),'</p></td>');
								dataPoints52.push({
									type: "spline",
									showInLegend: true,
									//yValueFormatString: "##.00mn",
									name: anio5,
									dataPoints: dataPoints51
								});
								dataPointsGeneral5.push(dataPoints52[0]);
								dataPoints51 = [];
								dataPoints52 = [];
								anio5 = dataPointsGrafico5[i]["anio"];
								dataPoints51.push({
									label: dataPointsGrafico5[i]['nombreMes'],
									y: dataPointsGrafico5[i]['monto']
								});
							}else{
								row5 = row5.concat('\n<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico5[i]["monto"]),'</p></td>');
								dataPoints51.push({
									label: dataPointsGrafico5[i]['nombreMes'],
									y: dataPointsGrafico5[i]['monto']
								});
							}
						}

						var anio6 = dataPointsGrafico6[0]["anio"];
						var row6 = "";
						$("#tbody6").empty();
						row6 = row6.concat('<tr>\n<td scope="row"><p class="texto-pequenio-grafico">',dataPointsGrafico6[0]["anio"],'</p></td>');
						for (var i = 0; i < dataPointsGrafico6.length; i++) {
							if(anio6 != dataPointsGrafico6[i]["anio"] || (i + 1) == dataPointsGrafico6.length){
								var row6 = row6.concat('</tr>');
								$("#tbody6").append(row6);
								var row6 = '<tr>\n<td scope="row"><p class="texto-pequenio-grafico">'.concat(dataPointsGrafico6[i]["anio"],'</p></td>', '<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico6[i]['monto']),'</p></td>');
								dataPoints62.push({
									type: "spline",
									showInLegend: true,
									//yValueFormatString: "##.00mn",
									name: anio6,
									dataPoints: dataPoints61
								});
								dataPointsGeneral6.push(dataPoints62[0]);
								dataPoints61 = [];
								dataPoints62 = [];
								anio6 = dataPointsGrafico6[i]["anio"];
								dataPoints61.push({
									label: dataPointsGrafico6[i]['nombreMes'],
									y: dataPointsGrafico6[i]['monto']
								});
							}else{
								row6 = row6.concat('\n<td scope="row"><p class="texto-pequenio-grafico">', Intl.NumberFormat("de-DE", {minimumFractionDigits: 4}).format(dataPointsGrafico6[i]["monto"]),'</p></td>');
								dataPoints61.push({
									label: dataPointsGrafico6[i]['nombreMes'],
									y: dataPointsGrafico6[i]['monto']
								});
							}
						}

						var chart3 = new CanvasJS.Chart("chartContainer3", {
							theme:"light2",
							animationEnabled: true,
							title:{
								text: dataPointsGrafico1[0]["nombre_grupo"]
							},
							axisY :{
								includeZero: false,
								title: "Cantidades"//,
								//suffix: "mn"
							},
							toolTip: {
								shared: "true"
							},
							legend:{
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							data: dataPointsGeneral1
						});

						var chart4 = new CanvasJS.Chart("chartContainer4", {
							theme:"light2",
							animationEnabled: true,
							title:{
								text: dataPointsGrafico2[0]["nombre_grupo"]
							},
							axisY :{
								includeZero: false,
								title: "Cantidades"//,
								//suffix: "mn"
							},
							toolTip: {
								shared: "true"
							},
							legend:{
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							data: dataPointsGeneral2
						});

						var chart5 = new CanvasJS.Chart("chartContainer5", {
							theme:"light2",
							animationEnabled: true,
							title:{
								text: dataPointsGrafico3[0]["nombre_grupo"]
							},
							axisY :{
								includeZero: false,
								title: "Cantidades"//,
								//suffix: "mn"
							},
							toolTip: {
								shared: "true"
							},
							legend:{
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							data: dataPointsGeneral3
						});

						var chart6 = new CanvasJS.Chart("chartContainer6", {
							theme:"light2",
							animationEnabled: true,
							title:{
								text: dataPointsGrafico4[0]["nombre_grupo"]
							},
							axisY :{
								includeZero: false,
								title: "Cantidades"//,
								//suffix: "mn"
							},
							toolTip: {
								shared: "true"
							},
							legend:{
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							data: dataPointsGeneral4
						});

						var chart7 = new CanvasJS.Chart("chartContainer7", {
							theme:"light2",
							animationEnabled: true,
							title:{
								text: dataPointsGrafico5[0]["nombre_grupo"]
							},
							axisY :{
								includeZero: false,
								title: "Cantidades"//,
								//suffix: "mn"
							},
							toolTip: {
								shared: "true"
							},
							legend:{
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							data: dataPointsGeneral5
						});

						var chart8 = new CanvasJS.Chart("chartContainer8", {
							theme:"light2",
							animationEnabled: true,
							title:{
								text: dataPointsGrafico6[0]["nombre_grupo"]
							},
							axisY :{
								includeZero: false,
								title: "Cantidades"//,
								//suffix: "mn"
							},
							toolTip: {
								shared: "true"
							},
							legend:{
								cursor:"pointer",
								itemclick : toggleDataSeries
							},
							data: dataPointsGeneral6
						});


					}

					chart.render();
					chart2.render();
					chart3.render();
					chart4.render();
					chart5.render();
					chart6.render();
					chart7.render();
					chart8.render();

						
					function toggleDataSeries(e) {
						if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
						chart2.render();
						chart3.render();
						chart4.render();
						chart5.render();
						chart6.render();
						chart7.render();
						chart8.render();
					}

				}
				});

				function toggleDataSeries(e) {
					if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					}
					else {
						e.dataSeries.visible = true;
					}
					chart.render();
					chart2.render();
					chart3.render();
					chart4.render();
					chart5.render();
					chart6.render();
					chart7.render();
					chart8.render();
				}
				
			}
		}
		});
	};