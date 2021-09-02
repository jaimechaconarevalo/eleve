 $(document).ready(function() {

 	$("#institucionPago").change(function() {
		institucion = $("#institucionPago").val();
		var baseurl = window.origin + '/Pago/listarHospitalesInstitucion';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion },
		success: function(data) {
	        if (data)
	        {			
				$("#hospitalPago").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#hospitalPago").append(row);

				institucion = $("#institucionPago").val();
		    	hospital =  $("#hospitalPago").val();
				var baseurl = window.origin + '/Pago/listarProveedores';
			    jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: {institucion: institucion, hospital: hospital },
				success: function(data) {
			        if (data)
			        {			
						$("#principalPago").empty();
						var row = '<option value="-1">Todos</option>';
						for (var i = 0; i < data.length; i++) {
							row = row.concat('\n<option value="',data[i]["id_principal"],'">',data[i]["nombre_principal"], '</option>');
						}
						$("#principalPago").append(row);

						institucion = $("#institucionPago").val();
				    	hospital =  $("#hospitalPago").val();
				    	proveedor =  $("#principalPago").val();
						var baseurl = window.origin + '/Pago/listarMesesAnios';
					    jQuery.ajax({
						type: "POST",
						url: baseurl,
						dataType: 'json',
						data: {institucion: institucion, hospital: hospital, proveedor: proveedor },
						success: function(data) {
					        if (data)
					        {			
								$("#mesPago").empty();
								var row = '<option value="-1">Todos</option>';
								for (var i = 1; i <= Object.keys(data["meses"]).length; i++) {
									row = row.concat('\n<option value="',data["meses"][i]["idMes"],'">',data["meses"][i]["nombreMes"], '</option>');
								}
								$("#mesPago").append(row);

								$("#anioPago").empty();
								var row = '<option value="-1">Todos</option>';
								for (var i = 1; i <= Object.keys(data["anios"]).length; i++) {
									row = row.concat('\n<option value="',data["anios"][i]["idAnio"],'">',data["anios"][i]["nombreAnio"], '</option>');
								}
								$("#anioPago").append(row);

								

								listarReportes();
					        }
				      	}
				    	});
			        }
		      	}
		    	});
	        }
      	}
    	});

		
	});


 	$("#hospitalPago").change(function() {
 		institucion = $("#institucionPago").val();
    	hospital =  $("#hospitalPago").val();
		var baseurl = window.origin + '/Pago/listarProveedores';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital },
		success: function(data) {
	        if (data)
	        {			
				$("#principalPago").empty();
				var row = '<option value="-1">Todos</option>';
				for (var i = 0; i < data.length; i++) {
					row = row.concat('\n<option value="',data[i]["id_hospital"],'">',data[i]["nombre"], '</option>');
				}
				$("#principalPago").append(row);
	        }
      	}
    	});
		listarReportes();
	});

	$("#mesPago").change(function() {
		listarReportes();
	});

	$("#anioPago").change(function() {
		listarReportes();
	});

	$('#principalPago').on('change',function(e){
    	listarReportes();
	});

  	function listarReportes()
  	{ 	
 		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionPago").val();
	    hospital = $("#hospitalPago").val();
	    mes = $("#mesPago").val();
	    anio = $("#anioPago").val();
		proveedor = $('#principalPago').val();

	    var baseurl = window.origin + '/Pago/listarPagosFiltrados';
	    jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {institucion: institucion, hospital: hospital, mes: mes, anio: anio, proveedor: proveedor },
		success: function(data) {
	        if (data)
	        {
				$("#tbodyReporteResumen").empty();
				for (var i = 0; i < data.length; i++){
		            var row = '';
		            row = row.concat('<tr>');
		            row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nombre_area_transaccional'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['folio'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['tipo_operacion'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['fecha_generacion'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['cta_contable'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nombre_tipo_documento'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nro_documento'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['fecha_cumplimiento'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['combinacion_catalogo'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nombre_principal'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nombre_principal_relacionado'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nombre_beneficiario'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nombre_banco'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['cta_corriente_banco'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['medio_pago'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nombre_tipo_medio_pago'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['nro_documento_pago'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['fecha_emision'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['estado_documento'],'</p></td>');
					row = row.concat('\n<td class="text-right"><p class="texto-pequenio">','$ ',formatNumber(data[i]['monto']),'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['moneda'],'</p></td>');
					row = row.concat('\n<td class="text-left"><p class="texto-pequenio">',data[i]['tipo_cambio'],'</p></td>');
		            row = row.concat('\n</tr>');
		          $("#tbodyReporteResumen").append(row);
		        }
		        feather.replace()
				loader.setAttribute('hidden', '');
	        }
      	}
    	});
  	};

  	$("#btnExportarTodoExcel, #imgExportarExcel").on('click', function() {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = -1;
	    hospital = -1;
	    mes = -1;
	    anio = -1;
		proveedor = -1;
		
		//var url = window.location.href.replace("ListarPagos", "exportarexcel");
	    var urlFinal = window.location.href.replace("ListarPagos", "exportarexcel") + "?institucion=" + institucion + "&hospital=" + hospital + "&mes=" + mes + "&anio=" + anio + "&proveedor=" + proveedor;
	    window.location.href = urlFinal;
	    loader.setAttribute('hidden', '');
  	});

  	$("#btnExportarExcel, #imgExportarExcel").on('click', function() {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    institucion = $("#institucionPago").val();
	    hospital = $("#hospitalPago").val();
	    mes = $("#mesPago").val();
	    anio = $("#anioPago").val();
		proveedor = $('#principalPago').val();
		
		//var url = window.location.href.replace("ListarPagos", "exportarexcel");
	    var urlFinal = window.location.href.replace("ListarPagos", "exportarexcel") + "?institucion=" + institucion + "&hospital=" + hospital + "&mes=" + mes + "&anio=" + anio + "&proveedor=" + proveedor;
	    window.location.href = urlFinal;
	    loader.setAttribute('hidden', '');
  	});

	$('.pagination li a').on('click', function(event) {
		event.preventDefault();
		var page = $(this).data('ci-pagination-page');
		alert(page);
	});

  	

	function formatNumber (n) {
		n = String(n).replace(/\D/g, "");
	  return n === '' ? n : Number(n).toLocaleString();
	}

	Number.addEventListener('keyup', (e) => {
		const element = e.target;
		const value = element.value;
	  element.value = formatNumber(value);
	});
});

