 $(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace();

	$('#modalEditarDistribucion').on('show.bs.modal', function(e) {
		var form = $("#editarImporte");
	    form.validate().resetForm();
	    form[0].reset();
	    var inputObservacion = document.getElementById("inputObservaciones");
	    $(inputObservacion).removeClass("is-invalid");
		var idImporte = $(e.relatedTarget).data('id');
		var anio = $(e.relatedTarget).data('anio');
		var mes = $(e.relatedTarget).data('mes');
		var hospital = $(e.relatedTarget).data('hospital');
		//populate the textbox
		$("#tituloEP").text('Editar Importación N° ' + idImporte);
		document.getElementById("inputIdImporte").value = idImporte;
		$("#parrafoEP").text('¿Estás seguro que deseas editar el importe N°: ' + idImporte + ' - Año: ' + anio + ' - Mes: ' + mes + ' - Establecimiento: ' + hospital+ '?');
		$("#tituloEP").removeData("idimporte");
		$("#tituloEP").attr("data-idimporte", idImporte);
	});

	$('#modalEditarDistribucion').on('hidden.bs.modal', function(e) {
		var form = $("#editarImporte");
	    form.validate().resetForm();
	    form[0].reset();   
		
	});

	$('#modalMensajeDistribucion').on('hidden.bs.modal', function(e) {
		location.reload();		
	});


	$('#modalEliminarHospital').on('show.bs.modal', function(e) {
	    var id_hospital = $(e.relatedTarget).data('id');
	    var hospital = $(e.relatedTarget).data('hospital');
	    //populate the textbox
	    $("#tituloEP").text('Desactivar Hospital ID: ' + id_hospital);
	    $("#parrafoEP").text('¿Estás seguro que deseas Desactivar el Hospital ID: ' + id_hospital + ', Nombre: "' + hospital + '"?');
	    $("#tituloEP").removeData("idhospital");
	    $("#tituloEP").attr("data-idhospital", id_hospital);
	});

	$('#eliminarHospital').click(function(e){
	    id_hospital = document.getElementById('tituloEP').dataset.idhospital;
	    var baseurl = window.origin + '/Hospital/desactivarHospital';
	    jQuery.ajax({
		    type: "POST",
		    url: baseurl,
		    dataType: 'json',
		    data: {id_hospital: id_hospital},
		    success: function(data) {
		      if (data)
		      {
		        if(data == '1')
		        {
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
		          $("#parrafoMP").append('Se ha Desactivado exitosamente el Hospital.');
		          $('#modalEliminarHospital').modal('hide');
		          listarHospitales();
		          loader.setAttribute('hidden', '');
		          $('#modalMensajeHospital').modal({
		            show: true
		          });

		        }else{
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
		          $("#parrafoMP").append('Ha ocurrido un error al intentar Desactivar el Hospital.');
		          $('#modalEliminarHospital').modal('hide');
		          listarHospitales();
		          loader.setAttribute('hidden', '');
		          $('#modalMensajeHospital').modal({
		            show: true
		          });
		        }
		        feather.replace()
		        $('[data-toggle="tooltip"]').tooltip()
		      }
		    }
	    });
	});


	$('#modalActivarHospital').on('show.bs.modal', function(e) {
	    var id_hospital = $(e.relatedTarget).data('id');
	    var hospital = $(e.relatedTarget).data('hospital');
	    //populate the textbox

	    $("#tituloAP").text('Desactivar Hospital ID: ' + id_hospital);
	    $("#parrafoAP").text('¿Estás seguro que deseas Activar el Hospital ID: ' + id_hospital + ', Nombre: "' + hospital + '"?');
	    $("#tituloAP").removeData("idhospital");
	    $("#tituloAP").attr("data-idhospital", id_hospital);
	});

	$('#activarHospital').click(function(e){
	    id_hospital = document.getElementById('tituloAP').dataset.idhospital;
	    var baseurl = window.origin + '/Hospital/activarHospital';
	    jQuery.ajax({
		    type: "POST",
		    url: baseurl,
		    dataType: 'json',
		    data: {id_hospital: id_hospital},
		    success: function(data) {
		      if (data)
		      {
		        if(data == '1')
		        {
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
		          $("#parrafoMP").append('Se ha Activado el Hospital exitosamente.');
		          $('#modalActivarHospital').modal('hide');
		          listarHospitales();
		          loader.setAttribute('hidden', '');
		          $('#modalMensajeHospital').modal({
		            show: true
		          });
		        }else{
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
		          $("#parrafoMP").append('Ha ocurrido un error al intentar Desactivar el Hospital.');
		          document.getElementById('tituloAP').innerHTML = 
		          $('#modalActivarHospital').modal('hide');
		          listarHospitales();
		          loader.setAttribute('hidden', '');
		          $('#modalMensajeHospital').modal({
		            show: true
		          });
		        }
		        feather.replace()
		        $('[data-toggle="tooltip"]').tooltip()
		      }
		    }
	    });
	});


	$("#agregarHospital").on("submit", function(e){
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarHospital").validate();
	   	if ($("#agregarHospital").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarHospital");
				var formData = new FormData(form);
				var tabla_cch = $(document.getElementById('tListaCCA')).dataTable();
				var centro_costos_hospital = tabla_cch.fnGetData();
      			formData.append("centro_costos_hospital", JSON.stringify(centro_costos_hospital));

      			var tabla_ich = $(document.getElementById('tListaICA')).dataTable();
				var item_costos_hospital = tabla_ich.fnGetData();
      			formData.append("item_costos_hospital", JSON.stringify(item_costos_hospital));

				var baseurl = (window.origin + '/Hospital/agregarHospital');
				jQuery.ajax({
				type: form.getAttribute('method'),
				url: baseurl,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if(data['resultado'] == '1')
						{
							$(document.getElementById('formaPago')).selectpicker('refresh');
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoMP").append(data['mensaje']);
							if(!$("#inputIdHospital").val())
							{
								$("#agregarHospital")[0].reset();
								var centro_costos = JSON.parse(localStorage.getItem("centro_costos"));
								if (centro_costos != null && centro_costos.length > 0) {
									var tabla_SA = $(document.getElementById("tListaCCSA")).dataTable();
									tabla_SA.fnDestroy();
									$('#tListaCCSA').DataTable( {
								 	"fnDrawCallback": function( oSettings ) {
										feather.replace();
										loader.setAttribute('hidden', '');
										$('[data-toggle="tooltip"]').tooltip();
									},
									"preDrawCallback": function( settings ) {
										var loader = document.getElementById("loader");
										loader.removeAttribute('hidden');
									},
									"processing": false,
									"data":  centro_costos,
									searching: true,
									paging:         true,
									ordering:       true,
									info:           true,
									select: true,
									"oLanguage": {
										"sProcessing":     function(){
											let timerInterval
										},
									  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
									  	"sZeroRecords": "No se encontraron registros",
									  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
									  	"sInfoEmpty": "Mostrando 0 de 0 registros",
									  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
									  	"sSearch":        "Buscar:",
									  	"oPaginate": {
									    	"sFirst":    "Primero",
									    	"sLast":    "Último",
									    	"sNext":    "Siguiente",
									    	"sPrevious": "Anterior"
									  	}
									},
									lengthMenu: [[20], [20]]
									});

								var tabla_cc_a = $(document.getElementById('tListaCCA')).dataTable();
								//tabla_cc_a.fnDestroy();
								tabla_cc_a.fnClearTable();
								localStorage.myPageDataArr = undefined;
								localStorage.removeItem('centro_costos_seleccionados');
								localStorage.removeItem('centro_costos_a_seleccionados');
								}

								var item_costos = JSON.parse(localStorage.getItem("item_costos"));
								if (item_costos != null && item_costos.length > 0) {
									var tabla_SA = $(document.getElementById("tListaICSA")).dataTable();
									tabla_SA.fnDestroy();
									$('#tListaICSA').DataTable( {
								 	"fnDrawCallback": function( oSettings ) {
										feather.replace();
										loader.setAttribute('hidden', '');
										$('[data-toggle="tooltip"]').tooltip();
									},
									"preDrawCallback": function( settings ) {
										var loader = document.getElementById("loader");
										loader.removeAttribute('hidden');
									},
									"processing": false,
									"data":  item_costos,
									searching: true,
									paging:         true,
									ordering:       true,
									info:           true,
									select: true,
									"oLanguage": {
										"sProcessing":     function(){
											let timerInterval
										},
									  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
									  	"sZeroRecords": "No se encontraron registros",
									  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
									  	"sInfoEmpty": "Mostrando 0 de 0 registros",
									  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
									  	"sSearch":        "Buscar:",
									  	"oPaginate": {
									    	"sFirst":    "Primero",
									    	"sLast":    "Último",
									    	"sNext":    "Siguiente",
									    	"sPrevious": "Anterior"
									  	}
									},
									lengthMenu: [[20], [20]]
									});

								var tabla_ic_a = $(document.getElementById('tListaICA')).dataTable();
								tabla_ic_a.fnClearTable();
								localStorage.myPageDataArr = undefined;
								localStorage.removeItem('item_costos_seleccionados');
								localStorage.removeItem('item_costos_a_seleccionados');
									
								}
							}
							loader.setAttribute('hidden', '');
							$('#modalMensajeHospital').modal({
							  show: true
							});
							feather.replace()
						}else{
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoMP").append(data['mensaje']);
							loader.setAttribute('hidden', '');
							$('#modalMensajeHospital').modal({
							  show: true
							});
						}
						feather.replace()
						$('[data-toggle="tooltip"]').tooltip()
					}
				}
				});
			}else{
				var loader = document.getElementById("loader");
				loader.setAttribute('hidden', '');
			}
	    }else{
			var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
		}
	    feather.replace();
	});

	$("#agregarHospital").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      servicioSalud: {
	        required: true,
	        minlength: 1,
	        min: 1
	      },
	      cluster: {
	        required: true,
	        minlength: 1,
	        min: 1
	      },
	      inputCodigo: {
	        required: true,
	        minlength: 1,
	        maxlength: 30
	      },
	      inputNombre: {
	        required: true,
	        minlength: 1,
	        maxlength: 100
	      },
	      inputObservaciones: {
	        required: false,
	        maxlength: 300
	      }
	    },
	    messages:{
	      servicioSalud: {
	        required: "Seleccione un Servicio de Salud.",
	        min: "Seleccione un Servicio de Salud.",
	      },
	      cluster: {
	        required: "Seleccione un Cluster.",
	        min: "Seleccione un Cluster.",
	      },
	      inputCodigo: {
	        required: "Ingrese un Codigo.",
	        minlength: "Ingrese un Codigo",
	        maxlength: "El Codigo no puede superar los {0} caracteres."
	      },
	      inputNombre: {
	        required: "Ingrese un Nombre.",
	        minlength: "Ingrese un Nombre",
	        maxlength: "El Nombre no puede superar los {0} caracteres."
	      },
	      inputObservaciones: {
	        maxlength: "La observacion tiene que ser menor o igual a {0} caracteres."
	      }
	    }
  	});

	$('#tListaCCSA').on('click', 'tbody tr', function(e) {
		var id_centro_costo = this.firstElementChild.textContent;
		var codigo_centro_costo = this.children[1].textContent;
		var nombre_centro_costo = this.children[2].textContent;
		if (this.classList.contains('table-active')) {
			$(this).removeClass('table-active');
			var centro_costos_seleccionados = JSON.parse(localStorage.getItem("centro_costos_seleccionados"));
			if (centro_costos_seleccionados != null && centro_costos_seleccionados.length > 0) {
				var indexCC = centro_costos_seleccionados.findIndex(c => c[0] === id_centro_costo);
				//delete hospitales_usuario[index];
				delete centro_costos_seleccionados.splice(indexCC, 1);
				localStorage.setItem("centro_costos_seleccionados", JSON.stringify(centro_costos_seleccionados));
			}
		}else{
			$(this).addClass('table-active');//.siblings().removeClass('table-active');
			var centro_costos_seleccionados = JSON.parse(localStorage.getItem("centro_costos_seleccionados"));
	 		if (centro_costos_seleccionados != null && centro_costos_seleccionados.length > 0) {
		        centro_costos_seleccionados.push([id_centro_costo, codigo_centro_costo, nombre_centro_costo]);
		        localStorage.setItem("centro_costos_seleccionados", JSON.stringify(centro_costos_seleccionados));
		      }else{
		        var centro_costos_seleccionados = [];
		        centro_costos_seleccionados.push([id_centro_costo, codigo_centro_costo, nombre_centro_costo]);
		        localStorage.setItem("centro_costos_seleccionados", JSON.stringify(centro_costos_seleccionados));
		      }
		}
	});

	$('#tListaCCA').on('click', 'tbody tr', function(e) {
		var id_centro_costo = this.firstElementChild.textContent;
		var codigo_centro_costo = this.children[1].textContent;
		var nombre_centro_costo = this.children[2].textContent;
		if (this.classList.contains('table-active')) {
			$(this).removeClass('table-active');
			var centro_costos_a_seleccionados = JSON.parse(localStorage.getItem("centro_costos_a_seleccionados"));
			if (centro_costos_a_seleccionados != null && centro_costos_a_seleccionados.length > 0) {
				var indexCC = centro_costos_a_seleccionados.findIndex(c => c[0] === id_centro_costo);
				//delete hospitales_usuario[index];
				delete centro_costos_a_seleccionados.splice(indexCC, 1);
				localStorage.setItem("centro_costos_a_seleccionados", JSON.stringify(centro_costos_a_seleccionados));
			}
		}else{
			$(this).addClass('table-active');//.siblings().removeClass('table-active');
			var centro_costos_a_seleccionados = JSON.parse(localStorage.getItem("centro_costos_a_seleccionados"));
	 		if (centro_costos_a_seleccionados != null && centro_costos_a_seleccionados.length > 0) {
		        centro_costos_a_seleccionados.push([id_centro_costo, codigo_centro_costo, nombre_centro_costo]);
		        localStorage.setItem("centro_costos_a_seleccionados", JSON.stringify(centro_costos_a_seleccionados));
		    }else{
		        var centro_costos_a_seleccionados = [];
		        centro_costos_a_seleccionados.push([id_centro_costo, codigo_centro_costo, nombre_centro_costo]);
		    	localStorage.setItem("centro_costos_a_seleccionados", JSON.stringify(centro_costos_a_seleccionados));
		    }
		}
	});

	$('#tListaICSA').on('click', 'tbody tr', function(e) {
		var id_item_costo = this.firstElementChild.textContent;
		var codigo_item_costo = this.children[1].textContent;
		var nombre_item_costo = this.children[2].textContent;
		if (this.classList.contains('table-active')) {
			$(this).removeClass('table-active');
			var item_costos_seleccionados = JSON.parse(localStorage.getItem("item_costos_seleccionados"));
			if (item_costos_seleccionados != null && item_costos_seleccionados.length > 0) {
				var indexCC = item_costos_seleccionados.findIndex(c => c[0] === id_item_costo);
				//delete hospitales_usuario[index];
				delete item_costos_seleccionados.splice(indexCC, 1);
				localStorage.setItem("item_costos_seleccionados", JSON.stringify(item_costos_seleccionados));
			}
		}else{
			$(this).addClass('table-active');//.siblings().removeClass('table-active');
			var item_costos_seleccionados = JSON.parse(localStorage.getItem("item_costos_seleccionados"));
	 		if (item_costos_seleccionados != null && item_costos_seleccionados.length > 0) {
		        item_costos_seleccionados.push([id_item_costo, codigo_item_costo, nombre_item_costo]);
		        localStorage.setItem("item_costos_seleccionados", JSON.stringify(item_costos_seleccionados));
			}else{
				var item_costos_seleccionados = [];
				item_costos_seleccionados.push([id_item_costo, codigo_item_costo, nombre_item_costo]);
				localStorage.setItem("item_costos_seleccionados", JSON.stringify(item_costos_seleccionados));
			}
		}
	});

	$('#tListaICA').on('click', 'tbody tr', function(e) {
		var id_item_costo = this.firstElementChild.textContent;
		var codigo_item_costo = this.children[1].textContent;
		var nombre_item_costo = this.children[2].textContent;
		if (this.classList.contains('table-active')) {
			$(this).removeClass('table-active');
			var item_costos_a_seleccionados = JSON.parse(localStorage.getItem("item_costos_a_seleccionados"));
			if (item_costos_a_seleccionados != null && item_costos_a_seleccionados.length > 0) {
				var indexCC = item_costos_a_seleccionados.findIndex(c => c[0] === id_item_costo);
				//delete hospitales_usuario[index];
				delete item_costos_a_seleccionados.splice(indexCC, 1);
				localStorage.setItem("item_costos_a_seleccionados", JSON.stringify(item_costos_a_seleccionados));
			}
		}else{
			$(this).addClass('table-active');//.siblings().removeClass('table-active');
			var item_costos_a_seleccionados = JSON.parse(localStorage.getItem("item_costos_a_seleccionados"));
	 		if (item_costos_a_seleccionados != null && item_costos_a_seleccionados.length > 0) {
		        item_costos_a_seleccionados.push([id_item_costo, codigo_item_costo, nombre_item_costo]);
		        localStorage.setItem("item_costos_a_seleccionados", JSON.stringify(item_costos_a_seleccionados));
		      }else{
		        var item_costos_a_seleccionados = [];
		        item_costos_a_seleccionados.push([id_item_costo, codigo_item_costo, nombre_item_costo]);
		        localStorage.setItem("item_costos_a_seleccionados", JSON.stringify(item_costos_a_seleccionados));
		      }
		}
	});

	$('#clusterLH').on('change',function(){
		listarHospitales();
 	});

 	$('#serviciosLH').on('change',function(){
		listarHospitales();
 	});

 	$('#regionLT').on('change',function(){
		listarHospitales();
 	});

 	$('#macroZonaLT').on('change',function(){
		listarHospitales();
 	});

 	$('#asociarCC').on('click', function(event) {
 		/*var centro_costos = document.getElementById('lista_centro_costos_sin_asociar').children;
 		for (var i = 0; i < centro_costos.length; i++) {
 			var check_cc = centro_costos[i].children[0];
 			if (check_cc.checked) {
 				var id = centro_costos[i].children[0].dataset.id;
 				var codigo = centro_costos[i].children[0].dataset.codigo;
 				var nombre = centro_costos[i].children[0].dataset.nombre;
 				$("#lista_centro_costos_asociados").append('<label class="list-group-item"><input class="form-check-input me-1" type="checkbox" value="'.concat(id,'" id="',id,'" data-id="',id,'" data-codigo="',codigo,'" data-nombre="',nombre,'">',codigo,' - ',nombre,'</label>'));
    			var lista_eliminar = centro_costos[i];
    			lista_eliminar.parentNode.removeChild(lista_eliminar);
    			i--;
 			}
		}*/
		var centro_costos_seleccionados = JSON.parse(localStorage.getItem("centro_costos_seleccionados"));
 		if (centro_costos_seleccionados != null && centro_costos_seleccionados.length > 0) {


 			//var centro_costos_A = JSON.parse(localStorage.getItem("centro_costos_A"));
 			var tabla_A = $(document.getElementById("tListaCCA")).dataTable();
 			var centro_costos_A = tabla_A.fnGetData();
 			if (centro_costos_A != null && centro_costos_A.length > 0) {

 				for (var i = 0; i < centro_costos_seleccionados.length; i++) {
 					centro_costos_A.push(centro_costos_seleccionados[i]);
 				}
 				//localStorage.setItem("centro_costos_A", JSON.stringify(centro_costos_A));
		   	}else{
				centro_costos_A = centro_costos_seleccionados;
				//localStorage.setItem("centro_costos_A", JSON.stringify(centro_costos_A));
		   	}
		   	//var table_1 = $(document.getElementById('tListaCCA')).dataTable();
 			//var table = $(document.getElementById('tListaCCA')).DataTable();
 			tabla_A.fnDestroy();
    		//tabla_A.destroy();
 			$('#tListaCCA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				//"serverSide": true,
				"data":  centro_costos_A,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
	        	
				//"order": [[ 0, "asc" ]],
	            //paging:         false,
	            //ordering:       false,
	            //info:           true,
	            //"scrollY": true,
			    //scrollY:        "300px",
		        //scrollX:        true,
		        //scrollCollapse: true,
		        //paging:         false,
		        //fixedColumns:   true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	// "sProcessing" : '<img src="<?php //echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});





			//var centro_costos_SA = JSON.parse(localStorage.getItem("centro_costos_SA"));
			var tabla_cc_sa = $(document.getElementById('tListaCCSA')).dataTable();
			var centro_costos_SA = tabla_cc_sa.fnGetData();
			if (centro_costos_SA != null && centro_costos_SA.length > 0) {
		   		for (var i = 0; i < centro_costos_seleccionados.length; i++) {
		   			var indexCC = centro_costos_SA.findIndex(c => c[0] === centro_costos_seleccionados[i][0]);
					delete centro_costos_SA.splice(indexCC, 1);
					//localStorage.setItem("centro_costos_SA", JSON.stringify(centro_costos_SA));
				}

				//var table = $('#tListaCCSA').DataTable();
    			//table.destroy();
    			tabla_cc_sa.fnDestroy();
				$('#tListaCCSA').DataTable( {
				 	"fnDrawCallback": function( oSettings ) {
						feather.replace();
						loader.setAttribute('hidden', '');
						$('[data-toggle="tooltip"]').tooltip();
					},
					"preDrawCallback": function( settings ) {
						var loader = document.getElementById("loader");
						loader.removeAttribute('hidden');
					},
					"processing": false,
					//"serverSide": true,
					"data": centro_costos_SA,//"ajax":  window.origin + '/Distribucion/json_listarCentroCostos',
					searching: true,
					paging:         true,
					ordering:       true,
					info:           true,
		        	select: true,
		        	
					//"order": [[ 0, "asc" ]],

		            //paging:         false,
		            //ordering:       false,
		            //info:           true,
		            //"scrollY": true,
				    //scrollY:        "300px",
			        //scrollX:        true,
			        //scrollCollapse: true,
			        //paging:         false,
			        //fixedColumns:   true,
					"oLanguage": {
						"sProcessing":     function(){
							let timerInterval
						},
					  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
					  	"sZeroRecords": "No se encontraron registros",
					  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
					  	"sInfoEmpty": "Mostrando 0 de 0 registros",
					  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
					  	"sSearch":        "Buscar:",
					  	// "sProcessing" : '<img src="<?php //echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
					  	"oPaginate": {
					    	"sFirst":    "Primero",
					    	"sLast":    "Último",
					    	"sNext":    "Siguiente",
					    	"sPrevious": "Anterior"
					  	}
					},
					lengthMenu: [[20], [20]]
			    });

			    localStorage.myPageDataArr = undefined;
				localStorage.removeItem('centro_costos_seleccionados');
				localStorage.removeItem('centro_costos_a_seleccionados');
		   	}
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});


 	$('#desasociarCC').on('click', function(event) {
		var centro_costos_a_seleccionados = JSON.parse(localStorage.getItem("centro_costos_a_seleccionados"));
 		if (centro_costos_a_seleccionados != null && centro_costos_a_seleccionados.length > 0) {


 			//var centro_costos_SA = JSON.parse(localStorage.getItem("centro_costos_SA"));
 			var tabla_A = $(document.getElementById("tListaCCSA")).dataTable();
 			var centro_costos_SA = tabla_A.fnGetData();
 			if (centro_costos_SA != null && centro_costos_SA.length > 0) {

 				for (var i = 0; i < centro_costos_a_seleccionados.length; i++) {
 					centro_costos_SA.push(centro_costos_a_seleccionados[i]);
 				}
 				//localStorage.setItem("centro_costos_SA", JSON.stringify(centro_costos_SA));
		   	}else{
				centro_costos_SA = centro_costos_a_seleccionados;
				//localStorage.setItem("centro_costos_SA", JSON.stringify(centro_costos_SA));
		   	}
		   	//var table_1 = $(document.getElementById('tListaCCA')).dataTable();
 			//var table = $(document.getElementById('tListaCCA')).DataTable();
 			tabla_A.fnDestroy();
    		//tabla_A.destroy();
 			$('#tListaCCSA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				//"serverSide": true,
				"data":  centro_costos_SA,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
	        	
				//"order": [[ 0, "asc" ]],
	            //paging:         false,
	            //ordering:       false,
	            //info:           true,
	            //"scrollY": true,
			    //scrollY:        "300px",
		        //scrollX:        true,
		        //scrollCollapse: true,
		        //paging:         false,
		        //fixedColumns:   true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	// "sProcessing" : '<img src="<?php //echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});


			//var centro_costos_A = JSON.parse(localStorage.getItem("centro_costos_A"));
			var tabla_cc_a = $(document.getElementById("tListaCCA")).dataTable();
			centro_costos_A = tabla_cc_a.fnGetData();
			if (centro_costos_A != null && centro_costos_A.length > 0) {
		   		for (var i = 0; i < centro_costos_a_seleccionados.length; i++) {
		   			var indexCC = centro_costos_A.findIndex(c => c[0] === centro_costos_a_seleccionados[i][0]);
					delete centro_costos_A.splice(indexCC, 1);
					//localStorage.setItem("centro_costos_A", JSON.stringify(centro_costos_A));
				}

				//var table = $('#tListaCCSA').DataTable();
    			//table.destroy();
    			tabla_cc_a.fnDestroy();
				$('#tListaCCA').DataTable( {
				 	"fnDrawCallback": function( oSettings ) {
						feather.replace();
						loader.setAttribute('hidden', '');
						$('[data-toggle="tooltip"]').tooltip();
					},
					"preDrawCallback": function( settings ) {
						var loader = document.getElementById("loader");
						loader.removeAttribute('hidden');
					},
					"processing": false,
					//"serverSide": true,
					"data": centro_costos_A,//"ajax":  window.origin + '/Distribucion/json_listarCentroCostos',
					searching: true,
					paging:         true,
					ordering:       true,
					info:           true,
		        	select: true,
		        	
					//"order": [[ 0, "asc" ]],

		            //paging:         false,
		            //ordering:       false,
		            //info:           true,
		            //"scrollY": true,
				    //scrollY:        "300px",
			        //scrollX:        true,
			        //scrollCollapse: true,
			        //paging:         false,
			        //fixedColumns:   true,
					"oLanguage": {
						"sProcessing":     function(){
							let timerInterval
						},
					  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
					  	"sZeroRecords": "No se encontraron registros",
					  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
					  	"sInfoEmpty": "Mostrando 0 de 0 registros",
					  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
					  	"sSearch":        "Buscar:",
					  	// "sProcessing" : '<img src="<?php //echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
					  	"oPaginate": {
					    	"sFirst":    "Primero",
					    	"sLast":    "Último",
					    	"sNext":    "Siguiente",
					    	"sPrevious": "Anterior"
					  	}
					},
					lengthMenu: [[20], [20]]
			    });

			    localStorage.myPageDataArr = undefined;
				localStorage.removeItem('centro_costos_a_seleccionados');
				localStorage.removeItem('centro_costos_seleccionados');
		   	}
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});


 	$('#asociarCCT').on('click', function(event) {
		var centro_costos = JSON.parse(localStorage.getItem("centro_costos"));
 		if (centro_costos != null && centro_costos.length > 0) {
 			var tabla_A = $(document.getElementById("tListaCCA")).dataTable();
 			tabla_A.fnDestroy();
 			$('#tListaCCA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				"data":  centro_costos,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});

			var tabla_cc_sa = $(document.getElementById('tListaCCSA')).dataTable();
			tabla_cc_sa.fnClearTable();
			//tabla_cc_sa.fnDestroy();
		    localStorage.myPageDataArr = undefined;
			localStorage.removeItem('centro_costos_seleccionados');
			localStorage.removeItem('centro_costos_a_seleccionados');
		   	
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});

  	$('#desasociarCCT').on('click', function(event) {
		var centro_costos = JSON.parse(localStorage.getItem("centro_costos"));
 		if (centro_costos != null && centro_costos.length > 0) {
 			var tabla_SA = $(document.getElementById("tListaCCSA")).dataTable();
 			tabla_SA.fnDestroy();
 			$('#tListaCCSA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				"data":  centro_costos,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});

			var tabla_cc_a = $(document.getElementById('tListaCCA')).dataTable();
			//tabla_cc_a.fnDestroy();
			tabla_cc_a.fnClearTable();
		    localStorage.myPageDataArr = undefined;
			localStorage.removeItem('centro_costos_seleccionados');
			localStorage.removeItem('centro_costos_a_seleccionados');
		   	
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});

  	$('#asociarIC').on('click', function(event) {
		var item_costos_seleccionados = JSON.parse(localStorage.getItem("item_costos_seleccionados"));
 		if (item_costos_seleccionados != null && item_costos_seleccionados.length > 0) {
 			var tabla_A = $(document.getElementById("tListaICA")).dataTable();
 			var item_costos_A = tabla_A.fnGetData();
 			if (item_costos_A != null && item_costos_A.length > 0) {

 				for (var i = 0; i < item_costos_seleccionados.length; i++) {
 					item_costos_A.push(item_costos_seleccionados[i]);
 				}
		   	}else{
				item_costos_A = item_costos_seleccionados;
		   	}
 			tabla_A.fnDestroy();
 			$('#tListaICA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				"data":  item_costos_A,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});

			var tabla_ic_sa = $(document.getElementById('tListaICSA')).dataTable();
			var item_costos_SA = tabla_ic_sa.fnGetData();
			if (item_costos_SA != null && item_costos_SA.length > 0) {
		   		for (var i = 0; i < item_costos_seleccionados.length; i++) {
		   			var indexCC = item_costos_SA.findIndex(c => c[0] === item_costos_seleccionados[i][0]);
					delete item_costos_SA.splice(indexCC, 1);
				}
    			tabla_ic_sa.fnDestroy();
				$('#tListaICSA').DataTable( {
				 	"fnDrawCallback": function( oSettings ) {
						feather.replace();
						loader.setAttribute('hidden', '');
						$('[data-toggle="tooltip"]').tooltip();
					},
					"preDrawCallback": function( settings ) {
						var loader = document.getElementById("loader");
						loader.removeAttribute('hidden');
					},
					"processing": false,
					
					"data": item_costos_SA,
					searching: true,
					paging:         true,
					ordering:       true,
					info:           true,
		        	select: true,
					"oLanguage": {
						"sProcessing":     function(){
							let timerInterval
						},
					  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
					  	"sZeroRecords": "No se encontraron registros",
					  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
					  	"sInfoEmpty": "Mostrando 0 de 0 registros",
					  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
					  	"sSearch":        "Buscar:",
					  	"oPaginate": {
					    	"sFirst":    "Primero",
					    	"sLast":    "Último",
					    	"sNext":    "Siguiente",
					    	"sPrevious": "Anterior"
					  	}
					},
					lengthMenu: [[20], [20]]
			    });

			    localStorage.myPageDataArr = undefined;
				localStorage.removeItem('item_costos_seleccionados');
				localStorage.removeItem('item_costos_a_seleccionados');
		   	}
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});


 	$('#desasociarIC').on('click', function(event) {
		var item_costos_a_seleccionados = JSON.parse(localStorage.getItem("item_costos_a_seleccionados"));
 		if (item_costos_a_seleccionados != null && item_costos_a_seleccionados.length > 0) {
 			var tabla_A = $(document.getElementById("tListaICSA")).dataTable();
 			var item_costos_SA = tabla_A.fnGetData();
 			if (item_costos_SA != null && item_costos_SA.length > 0) {
 				for (var i = 0; i < item_costos_a_seleccionados.length; i++) {
 					item_costos_SA.push(item_costos_a_seleccionados[i]);
 				}
		   	}else{
				item_costos_SA = item_costos_a_seleccionados;
		   	}
 			tabla_A.fnDestroy();
 			$('#tListaICSA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				"data":  item_costos_SA,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});
			var tabla_ic_a = $(document.getElementById("tListaICA")).dataTable();
			item_costos_A = tabla_ic_a.fnGetData();
			if (item_costos_A != null && item_costos_A.length > 0) {
		   		for (var i = 0; i < item_costos_a_seleccionados.length; i++) {
		   			var indexCC = item_costos_A.findIndex(c => c[0] === item_costos_a_seleccionados[i][0]);
					delete item_costos_A.splice(indexCC, 1);
				}
    			tabla_ic_a.fnDestroy();
				$('#tListaICA').DataTable( {
				 	"fnDrawCallback": function( oSettings ) {
						feather.replace();
						loader.setAttribute('hidden', '');
						$('[data-toggle="tooltip"]').tooltip();
					},
					"preDrawCallback": function( settings ) {
						var loader = document.getElementById("loader");
						loader.removeAttribute('hidden');
					},
					"processing": false,
					"data": item_costos_A,
					searching: true,
					paging:         true,
					ordering:       true,
					info:           true,
		        	select: true,
					"oLanguage": {
						"sProcessing":     function(){
							let timerInterval
						},
					  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
					  	"sZeroRecords": "No se encontraron registros",
					  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
					  	"sInfoEmpty": "Mostrando 0 de 0 registros",
					  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
					  	"sSearch":        "Buscar:",
					  	"oPaginate": {
					    	"sFirst":    "Primero",
					    	"sLast":    "Último",
					    	"sNext":    "Siguiente",
					    	"sPrevious": "Anterior"
					  	}
					},
					lengthMenu: [[20], [20]]
			    });

			    localStorage.myPageDataArr = undefined;
				localStorage.removeItem('item_costos_a_seleccionados');
				localStorage.removeItem('item_costos_seleccionados');
		   	}
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});


 	$('#asociarICT').on('click', function(event) {
		var item_costos = JSON.parse(localStorage.getItem("item_costos"));
 		if (item_costos != null && item_costos.length > 0) {
 			var tabla_A = $(document.getElementById("tListaICA")).dataTable();
 			tabla_A.fnDestroy();
 			$('#tListaICA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				"data":  item_costos,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});

			var tabla_ic_sa = $(document.getElementById('tListaICSA')).dataTable();
			tabla_ic_sa.fnClearTable();
		    localStorage.myPageDataArr = undefined;
			localStorage.removeItem('item_costos_seleccionados');
			localStorage.removeItem('item_costos_a_seleccionados');
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});

  	$('#desasociarICT').on('click', function(event) {
		var item_costos = JSON.parse(localStorage.getItem("item_costos"));
 		if (item_costos != null && item_costos.length > 0) {
 			var tabla_SA = $(document.getElementById("tListaICSA")).dataTable();
 			tabla_SA.fnDestroy();
 			$('#tListaICSA').DataTable( {
			 	"fnDrawCallback": function( oSettings ) {
					feather.replace();
					loader.setAttribute('hidden', '');
					$('[data-toggle="tooltip"]').tooltip();
				},
				"preDrawCallback": function( settings ) {
					var loader = document.getElementById("loader");
					loader.removeAttribute('hidden');
				},
				"processing": false,
				"data":  item_costos,
				searching: true,
				paging:         true,
				ordering:       true,
				info:           true,
	        	select: true,
				"oLanguage": {
					"sProcessing":     function(){
						let timerInterval
					},
				  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
				  	"sZeroRecords": "No se encontraron registros",
				  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
				  	"sInfoEmpty": "Mostrando 0 de 0 registros",
				  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
				  	"sSearch":        "Buscar:",
				  	"oPaginate": {
				    	"sFirst":    "Primero",
				    	"sLast":    "Último",
				    	"sNext":    "Siguiente",
				    	"sPrevious": "Anterior"
				  	}
				},
				lengthMenu: [[20], [20]]
	   		});

			var tabla_ic_a = $(document.getElementById('tListaICA')).dataTable();
			tabla_ic_a.fnClearTable();
		    localStorage.myPageDataArr = undefined;
			localStorage.removeItem('item_costos_seleccionados');
			localStorage.removeItem('item_costos_a_seleccionados');
		   	
		}else{
			alert("debe seleccionar al menos 1 Centro de Costo");
		}
  	});
  	

	$("#agregarItemCosto").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      tipoICAIC: {
	        required: true,
	        minlength: 1,
	        min: 1
	      },
	      inputCodigo: {
	        required: true,
	        minlength: 1,
	        maxlength: 30
	      },
	      inputNombre: {
	        required: true,
	        minlength: 1,
	        maxlength: 100
	      },
	      inputObservaciones: {
	        required: false,
	        maxlength: 300
	      }
	    },
	    messages:{
	      tipoICAIC: {
	        required: "Seleccione un Tipo de Item de Costo.",
	        min: "Seleccione un Tipo de Item de Costo.",
	      },
	      inputCodigo: {
	        required: "Ingrese un Codigo.",
	        minlength: "Ingrese un Codigo",
	        maxlength: "El Codigo no puede superar los {0} caracteres."
	      },
	      inputNombre: {
	        required: "Ingrese un Nombre.",
	        minlength: "Ingrese un Nombre",
	        maxlength: "El Nombre no puede superar los {0} caracteres."
	      },
	      inputObservaciones: {
	        maxlength: "La observacion tiene que ser menor o igual a {0} caracteres."
	      }
	    }
  	});

  	$("#modalMensajeItemCosto").on("hidden.bs.modal", function () {
	    var pagina = window.location.pathname.split('/')[2].toLowerCase();
	    if (pagina == "modificaritemcosto") {
	    	location.reload();
	    }
	});

	$('#tipoIC').on('change',function(){
		listarItemCosto();
 	});

 	$("#modalMensajeItemCosto").on("hidden.bs.modal", function () {
	    var pagina = window.location.pathname.split('/')[2].toLowerCase();
	    if (pagina == "modificaritemcosto") {
	    	location.reload();
	    }
	});

	
	$('#modalEliminarItemCosto').on('show.bs.modal', function(e) {
	    var idItemCosto = $(e.relatedTarget).data('id');
	    var itemCosto = $(e.relatedTarget).data('item');
	    //populate the textbox
	    $("#tituloEP").text('Eliminar Item de Costo ID: ' + idItemCosto);
	    $("#parrafoEP").text('¿Estás seguro que deseas eliminar el Item de Costo ID: ' + idItemCosto + ', Nombre: "' + itemCosto + '"?');
	    $("#tituloEP").removeData("idItemCosto");
	    $("#tituloEP").attr("data-idItemCosto", idItemCosto);
	});

	$('#eliminarItemCosto').click(function(e){
	    idItemCosto = document.getElementById('tituloEP').dataset.iditemcosto;
	    var baseurl = window.origin + '/Distribucion/eliminarItemCosto';
	    jQuery.ajax({
		    type: "POST",
		    url: baseurl,
		    dataType: 'json',
		    data: {idItemCosto: idItemCosto},
		    success: function(data) {
		      if (data)
		      {
		        if(data == '1')
		        {
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
		          $("#parrafoMP").append('Se ha eliminado exitosamente el Item de Costo.');
		          $('#modalEliminarItemCosto').modal('hide');
		          listarItemCosto();
		          $('#modalMensajeItemCosto').modal({
		            show: true
		          });
		        }else{
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
		          $("#parrafoMP").append('Ha ocurrido un error al intentar eliminar el Item de Costo.');
		          $('#modalEliminarItemCosto').modal('hide');
		          listarItemCosto();
		          $('#modalMensajeItemCosto').modal({
		            show: true
		          });
		        }
		        feather.replace()
		        $('[data-toggle="tooltip"]').tooltip()
		      }
		    }
	    });
	});


	$("#agregarItemCosto").on("submit", function(e){
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarItemCosto").validate();
	   	if ($("#agregarItemCosto").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarItemCosto");
				var formData = new FormData(form);
				var baseurl = (window.origin + '/Distribucion/agregarItemCosto');

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: baseurl,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.respuesta.resultado >= 1) {
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoMP").append(data.respuesta.mensaje, '</br></br> ID: ', data.respuesta.id_item_costo);
							$('#modalMensajeItemCosto').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("agregarItemCosto").reset();
						}else{
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoMP").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoMP").append('</br></br>Detalle: </br>', data.respuesta.mensaje);
							$('#modalMensajeItemCosto').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
	});

	$("#agregarItemCosto").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      tipoICAIC: {
	        required: true,
	        minlength: 1,
	        min: 1
	      },
	      inputCodigo: {
	        required: true,
	        minlength: 1,
	        maxlength: 30
	      },
	      inputNombre: {
	        required: true,
	        minlength: 1,
	        maxlength: 100
	      },
	      inputObservaciones: {
	        required: false,
	        maxlength: 300
	      }
	    },
	    messages:{
	      tipoICAIC: {
	        required: "Seleccione un Tipo de Item de Costo.",
	        min: "Seleccione un Tipo de Item de Costo.",
	      },
	      inputCodigo: {
	        required: "Ingrese un Codigo.",
	        minlength: "Ingrese un Codigo",
	        maxlength: "El Codigo no puede superar los {0} caracteres."
	      },
	      inputNombre: {
	        required: "Ingrese un Nombre.",
	        minlength: "Ingrese un Nombre",
	        maxlength: "El Nombre no puede superar los {0} caracteres."
	      },
	      inputObservaciones: {
	        maxlength: "La observacion tiene que ser menor o igual a {0} caracteres."
	      }
	    }
  	});

  	$("#modalMensajeItemCosto").on("hidden.bs.modal", function () {
	    var pagina = window.location.pathname.split('/')[2].toLowerCase();
	    if (pagina == "modificaritemcosto") {
	    	location.reload();
	    }
	});

	$('#tipoIC').on('change',function(){
		listarItemCosto();
 	});

 	$("#modalMensajeItemCosto").on("hidden.bs.modal", function () {
	    var pagina = window.location.pathname.split('/')[2].toLowerCase();
	    if (pagina == "modificaritemcosto") {
	    	location.reload();
	    }
	});


	$('#modalEliminarCentroCosto').on('show.bs.modal', function(e) {
	    var idCentroCosto = $(e.relatedTarget).data('id');
	    var centroCosto = $(e.relatedTarget).data('centrocosto');
	    //populate the textbox
	    $("#tituloEP").text('Eliminar Centro de Costo ID: ' + idCentroCosto);
	    $("#parrafoEP").text('¿Estás seguro que deseas eliminar el Centro de Costo ID: ' + idCentroCosto + ', Nombre: "' + centroCosto + '"?');
	    $("#tituloEP").removeData("idCentroCosto");
	    $("#tituloEP").attr("data-idCentroCosto", idCentroCosto);
	});

	$('#eliminarCentroCosto').click(function(e){
	    idCentroCosto = document.getElementById('tituloEP').dataset.idcentrocosto;
	    var baseurl = window.origin + '/Distribucion/eliminarCentroCosto';
	    jQuery.ajax({
		    type: "POST",
		    url: baseurl,
		    dataType: 'json',
		    data: {idCentroCosto: idCentroCosto},
		    success: function(data) {
		      if (data)
		      {
		        if(data == '1')
		        {
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
		          $("#parrafoMP").append('Se ha eliminado exitosamente el Centro de Costo.');
		          $('#modalEliminarCentroCosto').modal('hide');
		          listarCentroCosto();
		          $('#modalMensajeCentroCosto').modal({
		            show: true
		          });
		        }else{
		          $('#tituloMP').empty();
		          $("#parrafoMP").empty();
		          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
		          $("#parrafoMP").append('Ha ocurrido un error al intentar eliminar el Centro de Costo.');
		          $('#modalEliminarCentroCosto').modal('hide');
		          listarCentroCosto();
		          $('#modalMensajeCentroCosto').modal({
		            show: true
		          });
		        }
		        feather.replace()
		        $('[data-toggle="tooltip"]').tooltip()
		      }
		    }
	    });
	});


	$("#agregarCentroCosto").on("submit", function(e){
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarCentroCosto").validate();
	   	if ($("#agregarCentroCosto").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarCentroCosto");
				var formData = new FormData(form);
				var baseurl = (window.origin + '/Distribucion/agregarCentroCosto');

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: baseurl,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.respuesta.resultado >= 1) {
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoMP").append(data.respuesta.mensaje, '</br></br> ID: ', data.respuesta.id_centro_costo);
							$('#modalMensajeCentroCosto').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("agregarCentroCosto").reset();
						}else{
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoMP").append('Ha ocurrido un error al intentar agregar el Centro de Costo.');
							$("#parrafoMP").append('</br></br>Detalle: </br>', data.respuesta.mensaje);
							$('#modalMensajeCentroCosto').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
	});

	$("#agregarCentroCosto").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      grupoCCACC: {
	        required: true,
	        minlength: 1,
	        min: 1
	      },
	      tipoCCACC: {
	        required: true,
	        minlength: 1,
	        min: 1
	      },
	      tipoATCCACC: {
	        required: true,
	        minlength: 1,
	        min: 1
	      },
	      inputCodigo: {
	        required: true,
	        minlength: 1,
	        maxlength: 30
	      },
	      inputNombre: {
	        required: true,
	        minlength: 1,
	        maxlength: 100
	      },
	      inputObservaciones: {
	        required: false,
	        maxlength: 300
	      }
	    },
	    messages:{
	      grupoCCACC: {
	        required: "Seleccione un Grupo Centro de Costo.",
	        min: "Seleccione un Grupo Centro de Costo.",
	      },
	      tipoCCACC: {
	        required: "Seleccione un Tipo Centro de Costo.",
	        min: "Seleccione un Tipo Centro de Costo.",
	      },
	       tipoATCCACC: {
	        required: "Seleccione un Tipo AT Centro de Costo.",
	        min: "Seleccione un Tipo AT Centro de Costo.",
	      },
	      inputCodigo: {
	        required: "Ingrese un Codigo.",
	        minlength: "Ingrese un Codigo",
	        maxlength: "El Codigo no puede superar los {0} caracteres."
	      },
	      inputNombre: {
	        required: "Ingrese un Nombre.",
	        minlength: "Ingrese un Nombre",
	        maxlength: "El Nombre no puede superar los {0} caracteres."
	      },
	      inputObservaciones: {
	        maxlength: "La observacion tiene que ser menor o igual a {0} caracteres."
	      }
	    }
  	});

  	$("#modalMensajeCentroCosto").on("hidden.bs.modal", function () {
	    var pagina = window.location.pathname.split('/')[2].toLowerCase();
	    if (pagina == "modificarcentrocosto") {
	    	location.reload();
	    }
	});

	$('#grupoCC').on('change',function(){
		listarCentroCosto();
 	});

 	$('#tipoCC').on('change',function(){
		listarCentroCosto();
 	});

 	$('#tipoATCC').on('change',function(){
		listarCentroCosto();
 	});

  	
	
	$("#editarImporte").on("submit", function(e){
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#editarImporte").validate();

	   	if ($("#editarImporte").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("editarImporte");
				var formData = new FormData(form);
				var baseurl = window.origin + '/Distribucion/validarImportacion';

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: baseurl,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado >= 1) {
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoMP").append(data.mensaje_importacion, '</br></br> ID: ', data["id_importacion"]);
							$('#modalEditarDistribucion').modal('hide');
							$('#modalMensajeDistribucion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("editarImporte").reset();
						}else{
							$('#tituloMP').empty();
							$("#parrafoMP").empty();
							$("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoMP").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoMP").append('</br></br>Detalle: </br>');
							$('#modalEditarDistribucion').modal('hide');
							$('#modalMensajeDistribucion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
	});

	$("#editarImporte").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      inputObservaciones: {
	        //required: true,
	        minlength: 3,
	        maxlength: 299
	      }
	    },
	    messages:{
	      inputObservaciones: {
	        //required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres.",
	        maxlength: "La observacion no puede ser mayor a 299 caracteres."
	      }
	    }
  	});

  	$(".page-item, page-link").on('click', function(e) {
  		feather.replace();
  		$('[data-toggle="tooltip"]').tooltip();
  	});

	$(".botonRRHH").on('click', function(e) {
  		var url = e.currentTarget.dataset.url;
  		window.open(url,'_blank');
  	});

  	

    $('#archivoCentroProduccion').on('change',function(){
		var fileName = $(this).val();
		$(this).next('.custom-file-label').html(fileName);
		if (fileName.trim().length == 0)
			$(this).next('.custom-file-label').html('Seleccionar un Archivo...');
 	});

 	$('#archivoNominaEmpleados').on('change',function(){
		var fileName = $(this).val();
		$(this).next('.custom-file-label').html(fileName);
		if (fileName.trim().length == 0)
			$(this).next('.custom-file-label').html('Seleccionar un Archivo...');
 	});

 	$('#archivoProgramacionHoras').on('change',function(){
		var fileName = $(this).val();
		$(this).next('.custom-file-label').html(fileName);
		if (fileName.trim().length == 0)
			$(this).next('.custom-file-label').html('Seleccionar un Archivo...');
 	});

 	$('#archivoDistribucionGastoGeneral').on('change',function(){
		var fileName = $(this).val();
		$(this).next('.custom-file-label').html(fileName);
		if (fileName.trim().length == 0)
			$(this).next('.custom-file-label').html('Seleccionar un Archivo...');
 	});

 	$('#archivoDistribucionSuministros').on('change',function(){
		var fileName = $(this).val();
		$(this).next('.custom-file-label').html(fileName);
		if (fileName.trim().length == 0)
			$(this).next('.custom-file-label').html('Seleccionar un Archivo...');
 	});
 	
 	$('#archivoProduccionServicios').on('change',function(){
		var fileName = $(this).val();
		$(this).next('.custom-file-label').html(fileName);
		if (fileName.trim().length == 0)
			$(this).next('.custom-file-label').html('Seleccionar un Archivo...');
 	});

 	$('#archivoProduccionDistribuida').on('change',function(){
		var fileName = $(this).val();
		$(this).next('.custom-file-label').html(fileName);
		if (fileName.trim().length == 0)
			$(this).next('.custom-file-label').html('Seleccionar un Archivo...');
 	});

    $("#btnDescargarExcelCP").on('click', function() {
		var urlFinal = window.location.href.replace("agregarCentroProduccion", "descargarPlantilla/1");
		window.location.href = urlFinal;
		loader.setAttribute('hidden', '');
    });

    $("#btnDescargarExcelPS").on('click', function() {
		var urlFinal = window.location.href.replace("agregarProduccionServicios", "descargarPlantilla/6");
		window.location.href = urlFinal;
		loader.setAttribute('hidden', '');
    });

    $("#btnDescargarExcelNE").on('click', function() {
		var urlFinal = window.location.href.replace("agregarNominaEmpleados", "descargarPlantilla/2");
		window.location.href = urlFinal;
		loader.setAttribute('hidden', '');
    });

    $("#btnDescargarExcelDS").on('click', function() {
		var urlFinal = window.location.href.replace("agregarDistribucionSuministros", "descargarPlantilla/5");
		window.location.href = urlFinal;
		loader.setAttribute('hidden', '');
    });

    $("#btnDescargarExcelPD").on('click', function() {
		var urlFinal = window.location.href.replace("agregarProduccionDistribuida", "descargarPlantilla/7");
		window.location.href = urlFinal;
		loader.setAttribute('hidden', '');
    });
    /*$("#tImportaciones tr").click(function() {
	  var selected = $(this).hasClass("table-active");
	  $("#tImportaciones tr").removeClass("table-active");
	  if (!selected)
	    $(this).addClass("table-active");
	});*/

	$('#serviciosSD').on('change',function(){
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var id_servicio_salud = document.getElementById('serviciosSD').value;
		var baseurl = window.origin + '/Distribucion/obtenerHospitales';
		
		jQuery.ajax({
			type: "POST",
			url: baseurl,
			dataType: 'json',
			data: {id_servicio_salud: id_servicio_salud},
			success: function(data) {
				if (data)
				{
					if (data.resultado == 1) {
						$("#hospitalesSD").empty();
				        var options = '<option value="-1">Todos</option>';
				        for (var i = 0; i < data.hospitales.length; i++) {
				          options = options.concat('\n<option value="',data.hospitales[i]["id"],'">',data.hospitales[i]["codigo"],' ',data.hospitales[i]["nombre"], '</option>');
				        }
				        $("#hospitalesSD").append(options);
				        loader.setAttribute('hidden', '');
					}else{
						$('#tituloMP').empty();
						$("#parrafoMP").empty();
						$("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
						$("#parrafoMP").append('Ha ocurrido un error al intentar obtener los hospitales del Servicio de Salud.');

						$('#modalMensajeImporte').modal({
						  show: true
						});
						feather.replace();
						loader.setAttribute('hidden', '');
					}
				}
			}
		});
 	});

	 $("#btnDescargarExcelSD").on('click', function() {
	 	var id_servicio = document.getElementById("serviciosSD").value;
	 	var id_hospital = document.getElementById("hospitalesSD").value;
	 	var fecha = document.getElementById("fechaSD").value;
	 	var estado = document.getElementById("estadosSD").value;

	 	if (fecha.trim() == "") {
	 		$('#tituloMP').empty();
			$("#parrafoMP").empty();
			$("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
			$("#parrafoMP").append('Debe seleccionar una Fecha para poder descargar la Sabana de Datos.');
			$('#modalMensajeImporte').modal({
			  show: true
			});
			feather.replace();
	 	}else{
	 		var urlFinal = window.location.href.replace("listarReporteGeneral", "listarReporteGeneralDescargable/".concat(id_servicio, '/',id_hospital, '/', fecha, '/', estado));
	 		window.open(urlFinal,'_blank');
			//window.location.href = urlFinal;
			//loader.setAttribute('hidden', '');
	 	}
    });

	$("#btnDescargarExcelDGG").on('click', function() {
		var urlFinal = window.location.href.replace("agregarDistribucionGastoGeneral", "descargarPlantilla/4");
		window.location.href = urlFinal;
		loader.setAttribute('hidden', '');
    });

	$("#btn_descargar_plantilla").on('click', function() {
		var id_importe = null;
		if($('#tImportaciones tbody tr.table-active')[0])
		{
			id_importe = $($('#tImportaciones tbody tr.table-active')[0].children[0].children[0]).text();
			var urlFinal = window.location.href.replace("agregarProgramacionHoras", "descargarPlantilla/3/"+id_importe);
			window.location.href = urlFinal;
			loader.setAttribute('hidden', '');
		}else{
			$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
			$("#parrafoM").append('Debe seleccionar un Importe de Nomina de Empleados para descargar la Plantilla de Programaci&oacute;n de Horas.');
			$('#modalPlantillaProgramacionHoras').modal('hide')
			$('#modalMensajeProgramacionHoras').modal({
			  show: true
			});
			feather.replace();
		}
    });

	$('#tImportaciones').on('click', 'tbody tr', function(event) {
		if ($(this).hasClass('table-active')) {
			$(this).removeClass('table-active');
		}else{
			$(this).addClass('table-active').siblings().removeClass('table-active');
		}
	});

    $("#btnDescargarExcelPH").on('click', function() {
		/*var urlFinal = window.location.href.replace("agregarProgramacionHoras", "descargarPlantilla/3");
		window.location.href = urlFinal;
		loader.setAttribute('hidden', '');*/
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var url = window.location.href;
	    var id_importacion = url.split("agregarProgramacionHoras/")[1];
		$('#tituloPH').empty();
		$("#parrafoPH").empty();
		$("#tituloPH").append('<i class="plusTitulo mb-2" data-feather="check-square"></i> Seleccione un Importe de Empleados');
		$("#parrafoPH").append('Favor seleccione un importe de Empleados.');
		//$("#parrafoPH").append('</br></br>Detalle: </br>');

		var baseurl = window.origin + '/Distribucion/existeNominaEmpleado';
		
		jQuery.ajax({
			type: "POST",
			url: baseurl,
			dataType: 'json',
			data: {id_importacion: id_importacion},
			success: function(data) {
				if (data)
				{
					if (data.existe == "1") {
						var urlFinal = window.location.href.replace("agregarProgramacionHoras", "descargarPlantilla/3");
						window.location.href = urlFinal;
						loader.setAttribute('hidden', '');
					}else
					{
						$('#tituloM').empty();
						$("#parrafoM").empty();
						$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
						$("#parrafoM").append('Debe importar el "Formato 2_RRHH" antes de continuar con "Formato 3_Programación Hora".');
						
				    	feather.replace();
		    			$('[data-toggle="tooltip"]').tooltip();
		    			$('#modalMensajeProgramacionHoras').modal({
						  show: true
						});
						loader.setAttribute('hidden', '');
					}

				}
			}
		});
    });


    $("#btnCancelarImporteCP").on('click', function(e) {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var baseurl = window.origin + '/Distribucion/cancelarImporte';
    	e.preventDefault();
		var form = document.getElementById("confirmacionCentroProduccion");
		var formData = new FormData(form);
		formData.append("cancelado", 1);

		jQuery.ajax({
		type: form.getAttribute('method'),
		url: form.getAttribute('action'),
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if (data) {
				if (data.resultado == 1) {
					var redirect = window.location.href.replace("confirmacionCentroProduccion", "detalleCentroProduccionTemporal");
					var f = document.createElement('form');
					f.action=redirect;
					f.method='POST';

					var i=document.createElement('input');
					i.type='hidden';
					i.name='resultado';
					i.value= 1;
					f.appendChild(i);

					/*var i=document.createElement('input');
					i.type='hidden';
					i.name='mensaje';
					i.value= ('Se ha cambiado el estado del Importe a "'.concat(data.estado,'" exitosamente. ID ', data["id_importacion"],'.'));
					f.appendChild(i);*/

					var i=document.createElement('input');
					i.type='hidden';
					i.name='estado';
					i.value= (data.estado);
					f.appendChild(i);

					document.body.appendChild(f);
					f.submit();
				}else{
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
					$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
					$("#parrafoM").append('</br></br>Detalle: </br>');

					$('#modalMensajeValidacion').modal({
					  show: true
					});
					feather.replace();
				}
			}
		}
		});
	
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();


    });


    $("#btnCancelarImporteNE").on('click', function(e) {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var baseurl = window.origin + '/Distribucion/cancelarImporte';
    	e.preventDefault();
		var form = document.getElementById("confirmacionNominaEmpleados");
		var formData = new FormData(form);
		formData.append("cancelado", 1);

		jQuery.ajax({
		type: form.getAttribute('method'),
		url: form.getAttribute('action'),
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if (data) {
				if (data.resultado == 1) {
					var redirect = window.location.href.replace("confirmacionNominaEmpleados", "detalleNominaEmpleadosTemporal");
					var f = document.createElement('form');
					f.action=redirect;
					f.method='POST';

					var i=document.createElement('input');
					i.type='hidden';
					i.name='resultado';
					i.value= 1;
					f.appendChild(i);

					/*var i=document.createElement('input');
					i.type='hidden';
					i.name='mensaje';
					i.value= ('Se ha cambiado el estado del Importe a "'.concat(data.estado,'" exitosamente. ID ', data["id_importacion"],'.'));
					f.appendChild(i);*/

					var i=document.createElement('input');
					i.type='hidden';
					i.name='estado';
					i.value= (data.estado);
					f.appendChild(i);

					document.body.appendChild(f);
					f.submit();
				}else{
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
					$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
					$("#parrafoM").append('</br></br>Detalle: </br>');

					$('#modalMensajeValidacion').modal({
					  show: true
					});
					feather.replace();
				}
			}
		}
		});
	
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();


    });


    $(".mantener_formato").on('click', function(e) {
		var loader = document.getElementById("loader");
		loader.removeAttribute('hidden');
		

		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var id_importacion_carga = e.currentTarget.dataset.id;

		var baseurl = window.origin + '/Distribucion/cambiarEstadoImportacionCarga';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {id_importacion_carga: id_importacion_carga},
		success: function(data) {
		if (data)
		{
		  	if (data.resultado == 1) {
				$('#tituloM').empty();
				$("#parrafoM").empty();
				$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
				$("#parrafoM").append('Se ha mantenido el archivo del formato exitosamente.');
				$('#modalMensajeImportacion').modal({
				  show: true
				});
				feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		        //location.reload();
			}else{
				$('#tituloM').empty();
				$("#parrafoM").empty();
				$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
				$("#parrafoM").append('Ha ocurrido un error al intentar mantener el archivo del formato.');
				$("#parrafoM").append('</br></br>Detalle: </br>');

				$('#modalMensajeImportacion').modal({
				  show: true
				});
				loader.setAttribute('hidden', '');
				feather.replace();
			}
	        feather.replace();
		    $('[data-toggle="tooltip"]').tooltip();
			loader.setAttribute('hidden', '');
		}
		}
		});
    });

    $("#modalMensajeImportacion").on("hidden.bs.modal", function () {
	    var pagina = window.location.pathname.split('/')[2].toLowerCase();
	    if (pagina == "detalleimportacion") {
	    	location.reload();
	    }else{
	    	if (pagina == "validarimportacion") {
	    		var urlFinal = window.origin + '/Distribucion/listarImportacion';
				window.location.href = urlFinal;
	    	}
	    }
	});

    $("#enviarImportacion").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#enviarImportacion").validate();
	    
	   if ($("#enviarImportacion").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("enviarImportacion");
				var formData = new FormData(form);

				var baseurl = window.origin + '/Distribucion/enviarImportacion';
				jQuery.ajax({
				type: form.getAttribute('method'),
				url: baseurl,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',data.estado,'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeImportacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("enviarImportacion").reset();
							loader.setAttribute('hidden', '');
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeImportacion').modal({
							  show: true
							});
							feather.replace();
							loader.setAttribute('hidden', '');
						}
					}
				}
				});
			}
	    }	    
      	//loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#confirmarImportacion").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	   
    	e.preventDefault();
		var form = document.getElementById("confirmarImportacion");
		var formData = new FormData(form);

		var baseurl = window.origin + '/Distribucion/confirmarImportacion';
		jQuery.ajax({
		type: form.getAttribute('method'),
		url: baseurl,
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		beforeSend: function() {
		    var loader = document.getElementById("loader");
			loader.removeAttribute('hidden');
			$('#modalMensajeImportacionEspera').modal({
			  show: true,
			  keyboard: false,
			  backdrop: false
			});

	  	},
		data: formData,
		success: function(data) {
			if (data) {
				$('#modalMensajeImportacionEspera').modal('hide');
				if (data.resultado == 1) {
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
					$("#parrafoM").append(data.mensaje_importacion, ' ID <h2>', data["id_importacion"],'</h2>".');
					$('#modalMensajeImportacion').modal({
					  show: true
					});
					feather.replace();
			        $('[data-toggle="tooltip"]').tooltip();
					document.getElementById("confirmarImportacion").reset();
					loader.setAttribute('hidden', '');
				}else{
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
					$("#parrafoM").append('Ha ocurrido un error al intentar confirmar la Importación.');
					$("#parrafoM").append('</br></br>Detalle: </br>');

					$('#modalMensajeImportacion').modal({
					  show: true
					});
					feather.replace();
					loader.setAttribute('hidden', '');
				}
			}
		}
		});
	    feather.replace();
    });

    $("#enviarImportacion").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      inputObservaciones: {
	        required: false,
	        maxlength: 300
	      }
	    },
	    messages:{
	      inputObservaciones: {
	        maxlength: "La observacion tiene que ser menor a 300 caracteres."
	      }
	    }
  	});

  	$("#validarImportacion").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#validarImportacion").validate();
	    
	   if ($("#validarImportacion").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("validarImportacion");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',$("#estados option:selected" ).text(),'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeImportacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("validarImportacion").reset();
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeImportacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

  	$("#validarImportacion").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      estados: {
	        required: true,
	        min: 1
	      },
	      inputObservaciones: {
	        required: true,
	        minlength: 3
	      }
	    },
	    messages:{
	      estados: {
	        required: "Seleccione un Estado.",
	        min: "Seleccione un Estado"
	      },
	      inputObservaciones: {
	        required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres."
	      }
	    }
  	});


    $("#validarImportacionCP").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#validarImportacionCP").validate();
	    
	   if ($("#validarImportacionCP").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("validarImportacionCP");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',$("#estados option:selected" ).text(),'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("validarImportacionCP").reset();
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#validarImportacionCP").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      estados: {
	        required: true,
	        minlength: 1
	      },
	      inputObservaciones: {
	        required: true,
	        minlength: 3
	      }
	    },
	    messages:{
	      estados: {
	        required: "Seleccione un Estado.",
	        minlength: "Seleccione un Estado"
	      },
	      inputObservaciones: {
	        required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres."
	      }
	    }
  	});

  	$("#validarImportacionNE").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#validarImportacionNE").validate();
	    
	   if ($("#validarImportacionNE").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("validarImportacionNE");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',$("#estados option:selected" ).text(),'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("validarImportacionNE").reset();
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#validarImportacionNE").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      estados: {
	        required: true,
	        minlength: 1
	      },
	      inputObservaciones: {
	        required: true,
	        minlength: 3
	      }
	    },
	    messages:{
	      estados: {
	        required: "Seleccione un Estado.",
	        minlength: "Seleccione un Estado"
	      },
	      inputObservaciones: {
	        required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres."
	      }
	    }
  	});

  	$("#validarImportacionDS").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#validarImportacionDS").validate();
	    
	   if ($("#validarImportacionDS").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("validarImportacionDS");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',$("#estados option:selected" ).text(),'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("validarImportacionDS").reset();
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#validarImportacionDS").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      estados: {
	        required: true,
	        minlength: 1
	      },
	      inputObservaciones: {
	        required: true,
	        minlength: 3
	      }
	    },
	    messages:{
	      estados: {
	        required: "Seleccione un Estado.",
	        minlength: "Seleccione un Estado"
	      },
	      inputObservaciones: {
	        required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres."
	      }
	    }
  	});

    $("#validarImportacionDGG").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#validarImportacionDGG").validate();
	    
	   if ($("#validarImportacionDGG").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("validarImportacionDGG");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',$("#estados option:selected" ).text(),'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("validarImportacionDGG").reset();
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#validarImportacionDGG").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      estados: {
	        required: true,
	        minlength: 1
	      },
	      inputObservaciones: {
	        required: true,
	        minlength: 3
	      }
	    },
	    messages:{
	      estados: {
	        required: "Seleccione un Estado.",
	        minlength: "Seleccione un Estado"
	      },
	      inputObservaciones: {
	        required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres."
	      }
	    }
  	});

    $("#validarImportacionPD").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#validarImportacionPD").validate();
	    
	   if ($("#validarImportacionPD").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("validarImportacionPD");
				var formData = new FormData(form);
				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',$("#estados option:selected" ).text(),'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("validarImportacionPD").reset();
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#validarImportacionPD").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      estados: {
	        required: true,
	        minlength: 1
	      },
	      inputObservaciones: {
	        required: true,
	        minlength: 3
	      }
	    },
	    messages:{
	      estados: {
	        required: "Seleccione un Estado.",
	        minlength: "Seleccione un Estado"
	      },
	      inputObservaciones: {
	        required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres."
	      }
	    }
  	});

  	 $("#validarImportacionPH").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#validarImportacionPH").validate();
	    
	   if ($("#validarImportacionPH").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("validarImportacionPH");
				var formData = new FormData(form);
				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado el estado del Importe a "',$("#estados option:selected" ).text(),'" exitosamente. ID <h2>', data["id_importacion"],'</h2>".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("validarImportacionPH").reset();
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#validarImportacionPH").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      estados: {
	        required: true,
	        minlength: 1
	      },
	      inputObservaciones: {
	        required: true,
	        minlength: 3
	      }
	    },
	    messages:{
	      estados: {
	        required: "Seleccione un Estado.",
	        minlength: "Seleccione un Estado"
	      },
	      inputObservaciones: {
	        required: "Ingrese una observacion.",
	        minlength: "La observacion tiene que ser mayor a 3 caracteres."
	      }
	    }
  	});

  	$("#confirmacionCentroProduccion").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#confirmacionCentroProduccion").validate();
	    
	   if ($("#confirmacionCentroProduccion").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("confirmacionCentroProduccion");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							var redirect = window.location.href.replace("confirmacionCentroProduccion", "detalleCentroProduccionTemporal");
							var f = document.createElement('form');
							f.action=redirect;
							f.method='POST';

							var i=document.createElement('input');
							i.type='hidden';
							i.name='resultado';
							i.value= 1;
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='mensaje';
							i.value= ('Se ha cambiado exitosamente el estado del Importe a "'.concat(data.estado,'". </br></br>Codigo Importe: ', data["id_importacion"],'.'));
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='estado';
							i.value= (data.estado);
							f.appendChild(i);

							document.body.appendChild(f);
							f.submit();
							/*$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado  el estado del Importe a "',data.estado,'". ID </br></br>Codigo Importe: "', data["id_importacion"],'".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("confirmacionCentroProduccion").reset();*/
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });
 	
 	$("#confirmacionProduccionServicios").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#confirmacionProduccionServicios").validate();
	    
	   if ($("#confirmacionProduccionServicios").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("confirmacionProduccionServicios");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							var redirect = window.location.href.replace("confirmacionProduccionServicios", "detalleProduccionServiciosTemporal");
							var f = document.createElement('form');
							f.action=redirect;
							f.method='POST';

							var i=document.createElement('input');
							i.type='hidden';
							i.name='resultado';
							i.value= 1;
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='mensaje';
							i.value= ('Se ha cambiado exitosamente el estado del Importe a "'.concat(data.estado,'". </br></br>Codigo Importe: ', data["id_importacion"],'.'));
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='estado';
							i.value= (data.estado);
							f.appendChild(i);

							document.body.appendChild(f);
							f.submit();
							/*$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado  el estado del Importe a "',data.estado,'". ID </br></br>Codigo Importe: "', data["id_importacion"],'".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("confirmacionCentroProduccion").reset();*/
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#confirmacionNominaEmpleados").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#confirmacionNominaEmpleados").validate();
	    
	   if ($("#confirmacionNominaEmpleados").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("confirmacionNominaEmpleados");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							var redirect = window.location.href.replace("confirmacionNominaEmpleados", "detalleNominaEmpleadosTemporal");
							var f = document.createElement('form');
							f.action=redirect;
							f.method='POST';

							var i=document.createElement('input');
							i.type='hidden';
							i.name='resultado';
							i.value= 1;
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='mensaje';
							i.value= ('Se ha cambiado exitosamente el estado del Importe a "'.concat(data.estado,'". </br></br>Codigo Importe: ', data["id_importacion"],'.'));
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='estado';
							i.value= (data.estado);
							f.appendChild(i);

							document.body.appendChild(f);
							f.submit();
							/*$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado  el estado del Importe a "',data.estado,'". ID </br></br>Codigo Importe: "', data["id_importacion"],'".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("confirmacionCentroProduccion").reset();*/
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#confirmacionProgramacionHoras").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#confirmacionProgramacionHoras").validate();
	    
	   if ($("#confirmacionProgramacionHoras").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("confirmacionProgramacionHoras");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							var redirect = window.location.href.replace("confirmacionProgramacionHoras", "detalleProgramacionHorasTemporal");
							var f = document.createElement('form');
							f.action=redirect;
							f.method='POST';

							var i=document.createElement('input');
							i.type='hidden';
							i.name='resultado';
							i.value= 1;
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='mensaje';
							i.value= ('Se ha cambiado exitosamente el estado del Importe a "'.concat(data.estado,'". </br></br>Codigo Importe: ', data["id_importacion"],'.'));
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='estado';
							i.value= (data.estado);
							f.appendChild(i);

							document.body.appendChild(f);
							f.submit();
							/*$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado  el estado del Importe a "',data.estado,'". ID </br></br>Codigo Importe: "', data["id_importacion"],'".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("confirmacionCentroProduccion").reset();*/
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#btnCancelarImportePH").on('click', function(e) {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		//var baseurl = window.origin + '/Distribucion/cancelarImporte';
    	e.preventDefault();
		var form = document.getElementById("confirmacionProgramacionHoras");
		var formData = new FormData(form);
		formData.append("cancelado", 1);

		jQuery.ajax({
		type: form.getAttribute('method'),
		url: form.getAttribute('action'),
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if (data) {
				if (data.resultado == 1) {
					var redirect = window.location.href.replace("confirmacionProgramacionHoras", "detalleProgramacionHorasTemporal");
					var f = document.createElement('form');
					f.action=redirect;
					f.method='POST';

					var i=document.createElement('input');
					i.type='hidden';
					i.name='resultado';
					i.value= 1;
					f.appendChild(i);

					/*var i=document.createElement('input');
					i.type='hidden';
					i.name='mensaje';
					i.value= ('Se ha cambiado el estado del Importe a "'.concat(data.estado,'" exitosamente. ID ', data["id_importacion"],'.'));
					f.appendChild(i);*/

					var i=document.createElement('input');
					i.type='hidden';
					i.name='estado';
					i.value= (data.estado);
					f.appendChild(i);

					document.body.appendChild(f);
					f.submit();
				}else{
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
					$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
					$("#parrafoM").append('</br></br>Detalle: </br>');

					$('#modalMensajeValidacion').modal({
					  show: true
					});
					feather.replace();
				}
			}
		}
		});
	
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();


    });

    $("#confirmacionDistribucionSuministros").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#confirmacionDistribucionSuministros").validate();
	    
	   if ($("#confirmacionDistribucionSuministros").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("confirmacionDistribucionSuministros");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							var redirect = window.location.href.replace("confirmacionDistribucionSuministros", "detalleDistribucionSuministrosTemporal");
							var f = document.createElement('form');
							f.action=redirect;
							f.method='POST';

							var i=document.createElement('input');
							i.type='hidden';
							i.name='resultado';
							i.value= 1;
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='mensaje';
							i.value= ('Se ha cambiado exitosamente el estado del Importe a "'.concat(data.estado,'". </br></br>Codigo Importe: ', data["id_importacion"],'.'));
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='estado';
							i.value= (data.estado);
							f.appendChild(i);

							document.body.appendChild(f);
							f.submit();
							/*$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado  el estado del Importe a "',data.estado,'". ID </br></br>Codigo Importe: "', data["id_importacion"],'".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("confirmacionCentroProduccion").reset();*/
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });
 	
 	$("#btnCancelarImporteDS").on('click', function(e) {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		//var baseurl = window.origin + '/Distribucion/cancelarImporte';
    	e.preventDefault();
		var form = document.getElementById("confirmacionDistribucionSuministros");
		var formData = new FormData(form);
		formData.append("cancelado", 1);

		jQuery.ajax({
		type: form.getAttribute('method'),
		url: form.getAttribute('action'),
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if (data) {
				if (data.resultado == 1) {
					var redirect = window.location.href.replace("confirmacionDistribucionSuministros", "detalleDistribucionSuministrosTemporal");
					var f = document.createElement('form');
					f.action=redirect;
					f.method='POST';

					var i=document.createElement('input');
					i.type='hidden';
					i.name='resultado';
					i.value= 1;
					f.appendChild(i);

					/*var i=document.createElement('input');
					i.type='hidden';
					i.name='mensaje';
					i.value= ('Se ha cambiado el estado del Importe a "'.concat(data.estado,'" exitosamente. ID ', data["id_importacion"],'.'));
					f.appendChild(i);*/

					var i=document.createElement('input');
					i.type='hidden';
					i.name='estado';
					i.value= (data.estado);
					f.appendChild(i);

					document.body.appendChild(f);
					f.submit();
				}else{
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
					$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
					$("#parrafoM").append('</br></br>Detalle: </br>');

					$('#modalMensajeValidacion').modal({
					  show: true
					});
					feather.replace();
				}
			}
		}
		});
	
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();


    });

 	$("#confirmacionDistribucionGastoGeneral").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#confirmacionDistribucionGastoGeneral").validate();
	    
	   if ($("#confirmacionDistribucionGastoGeneral").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("confirmacionDistribucionGastoGeneral");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							var redirect = window.location.href.replace("confirmacionDistribucionGastoGeneral", "detalleDistribucionGastoGeneralTemporal");
							var f = document.createElement('form');
							f.action=redirect;
							f.method='POST';

							var i=document.createElement('input');
							i.type='hidden';
							i.name='resultado';
							i.value= 1;
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='mensaje';
							i.value= ('Se ha cambiado exitosamente el estado del Importe a "'.concat(data.estado,'". </br></br>Codigo Importe: ', data["id_importacion"],'.'));
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='estado';
							i.value= (data.estado);
							f.appendChild(i);

							document.body.appendChild(f);
							f.submit();
							/*$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado  el estado del Importe a "',data.estado,'". ID </br></br>Codigo Importe: "', data["id_importacion"],'".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("confirmacionCentroProduccion").reset();*/
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });
 	
 	$("#btnCancelarImporteDGG").on('click', function(e) {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		//var baseurl = window.origin + '/Distribucion/cancelarImporte';
    	e.preventDefault();
		var form = document.getElementById("confirmacionDistribucionGastoGeneral");
		var formData = new FormData(form);
		formData.append("cancelado", 1);

		jQuery.ajax({
		type: form.getAttribute('method'),
		url: form.getAttribute('action'),
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if (data) {
				if (data.resultado == 1) {
					var redirect = window.location.href.replace("confirmacionDistribucionGastoGeneral", "detalleDistribucionGastoGeneralTemporal");
					var f = document.createElement('form');
					f.action=redirect;
					f.method='POST';

					var i=document.createElement('input');
					i.type='hidden';
					i.name='resultado';
					i.value= 1;
					f.appendChild(i);

					/*var i=document.createElement('input');
					i.type='hidden';
					i.name='mensaje';
					i.value= ('Se ha cambiado el estado del Importe a "'.concat(data.estado,'" exitosamente. ID ', data["id_importacion"],'.'));
					f.appendChild(i);*/

					var i=document.createElement('input');
					i.type='hidden';
					i.name='estado';
					i.value= (data.estado);
					f.appendChild(i);

					document.body.appendChild(f);
					f.submit();
				}else{
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
					$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
					$("#parrafoM").append('</br></br>Detalle: </br>');

					$('#modalMensajeValidacion').modal({
					  show: true
					});
					feather.replace();
				}
			}
		}
		});
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#confirmacionProduccionDistribuida").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#confirmacionProduccionDistribuida").validate();
	    
	   if ($("#confirmacionProduccionDistribuida").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("confirmacionProduccionDistribuida");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.resultado == 1) {
							var redirect = window.location.href.replace("confirmacionProduccionDistribuida", "detalleProduccionDistribuidaTemporal");
							var f = document.createElement('form');
							f.action=redirect;
							f.method='POST';

							var i=document.createElement('input');
							i.type='hidden';
							i.name='resultado';
							i.value= 1;
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='mensaje';
							i.value= ('Se ha cambiado exitosamente el estado del Importe a "'.concat(data.estado,'". </br></br>Codigo Importe: ', data["id_importacion"],'.'));
							f.appendChild(i);

							var i=document.createElement('input');
							i.type='hidden';
							i.name='estado';
							i.value= (data.estado);
							f.appendChild(i);

							document.body.appendChild(f);
							f.submit();
							/*$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
							$("#parrafoM").append('Se ha cambiado  el estado del Importe a "',data.estado,'". ID </br></br>Codigo Importe: "', data["id_importacion"],'".');
							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
					        $('[data-toggle="tooltip"]').tooltip();
							document.getElementById("confirmacionCentroProduccion").reset();*/
						}else{
							$('#tituloM').empty();
							$("#parrafoM").empty();
							$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
							$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
							$("#parrafoM").append('</br></br>Detalle: </br>');

							$('#modalMensajeValidacion').modal({
							  show: true
							});
							feather.replace();
						}
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });
 	
 	$("#btnCancelarImportePD").on('click', function(e) {
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		//var baseurl = window.origin + '/Distribucion/cancelarImporte';
    	e.preventDefault();
		var form = document.getElementById("confirmacionProduccionDistribuida");
		var formData = new FormData(form);
		formData.append("cancelado", 1);

		jQuery.ajax({
		type: form.getAttribute('method'),
		url: form.getAttribute('action'),
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		success: function(data) {
			if (data) {
				if (data.resultado == 1) {
					var redirect = window.location.href.replace("confirmacionProduccionDistribuida", "detalleProduccionDistribuidaTemporal");
					var f = document.createElement('form');
					f.action=redirect;
					f.method='POST';

					var i=document.createElement('input');
					i.type='hidden';
					i.name='resultado';
					i.value= 1;
					f.appendChild(i);

					/*var i=document.createElement('input');
					i.type='hidden';
					i.name='mensaje';
					i.value= ('Se ha cambiado el estado del Importe a "'.concat(data.estado,'" exitosamente. ID ', data["id_importacion"],'.'));
					f.appendChild(i);*/

					var i=document.createElement('input');
					i.type='hidden';
					i.name='estado';
					i.value= (data.estado);
					f.appendChild(i);

					document.body.appendChild(f);
					f.submit();
				}else{
					$('#tituloM').empty();
					$("#parrafoM").empty();
					$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
					$("#parrafoM").append('Ha ocurrido un error al intentar cambiar el estado del Importe.');
					$("#parrafoM").append('</br></br>Detalle: </br>');

					$('#modalMensajeValidacion').modal({
					  show: true
					});
					feather.replace();
				}
			}
		}
		});
	
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#agregarImportacion").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarImportacion").validate();
	    
	    if ($("#agregarImportacion").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarImportacion");
				var formData = new FormData(form);
				var fechaAI = document.getElementById('fechaAI').value;
				var hospitalesAI = document.getElementById('hospitalesAI').value;
				var inputObservacionesAI = document.getElementById('inputObservacionesAI').value;

				var baseurl = window.origin + '/Distribucion/agregarImportacion';
				jQuery.ajax({
				type: "POST",
				url: baseurl,
				dataType: 'json',
				data: { fechaAI: fechaAI, hospitalesAI: hospitalesAI, inputObservacionesAI: inputObservacionesAI },
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarImportacion", "detalleImportacion/".concat(data.respuesta_importacion.id_importacion));
							window.location.href = urlFinal;
							loader.setAttribute('hidden', '');
						}else{
							if (data.resultado_archivo == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								


								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeImportacion').modal({
								  show: true
								});
								feather.replace();
							}else{
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar agregar la Importaci&oacute;n.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								$("#parrafoM").append('Importaci&oacute;n Existente: </br>');
								$("#parrafoM").append(data.mensaje_importacion,' </br></br>');

								$('#modalMensajeImportacion').modal({
								  show: true
								});
								feather.replace();
							}
						}
						
					}
				}
				});
			}
	    }
	    
      	loader.setAttribute('hidden', '');
	    feather.replace();
    });

    $("#agregarImportacion").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitalesAI: {
	        required: true,
	        minlength: 1,
	        min: 1,
	      },
	      fechaAI: {
	        required: true,
	        minlength: 1
	      },
	      inputObservacionesAI: {
	        required: false,
	        minlength: 4
	      },
	    },
	    messages:{
	      hospitalesAI: {
	        required: "Seleccione un Hospital.",
	        min: "Seleccione un Hospital.",
	      },
	      fechaAI: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      inputObservacionesAI: {
	        //required: "Ingrese una Observaci&oacute;n para la Importaci&oacute;n",
	        minlength: "Se requiere un m&iacute;nimo de 4 caracteres.",
	      },
	    }
  	});
 	
 	

    $("#agregarCentroProduccion").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarCentroProduccion").validate();
	    
	   if ($("#agregarCentroProduccion").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarCentroProduccion");
				var formData = new FormData(form);
				var id_importacion = document.getElementById('id_importacion').value;
				var baseurl = window.origin + '/Distribucion/agregarCentroProduccion/' + id_importacion;
				jQuery.ajax({
				type: 'POST',
				url: baseurl,//form.getAttribute('action'),
				dataType: 'json',
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarCentroProduccion", "detalleImportacion");
							//.concat(data.respuesta_importacion.id_importacion_carga));
							window.location.href = urlFinal;
							//loader.setAttribute('hidden', '');
						}else{
							document.getElementById("agregarCentroProduccion").reset();
							$(document.getElementById('archivoCentroProduccion')).next('.custom-file-label').html('Seleccionar un Archivo...');
							$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							if (data.resultado_archivo == 1 && data.resultado_archivo_db == 1 &&
							data.resultado_carga == 1 && data.resultado_extension == 1 &&
							data.resultado_n_archivo == 1 && data.resultado_parametros == 1 &&
							data.resultado_registros_db == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
								$("#parrafoM").append('Se ha cargado Exitosamente el Importe al sistema con ID <h2>', data["respuesta_importacion"].id_importacion_carga,'</h2>, su estado actual es "Pendiente de Aprobaci&oacute;n".');

								$("#parrafoM").append('</br></br>', data.registros_db);
								$('#modalMensajeCentroProduccion').modal({
								  show: true
								});
								feather.replace();
						        $('[data-toggle="tooltip"]').tooltip();
								document.getElementById("agregarCentroProduccion").reset();
								$(document.getElementById('archivoCentroProduccion')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							}else{
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								if (data.resultado_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.error_archivo,' </br></br>');
								}

								if (data.resultado_archivo_db <= 0) {
									$("#parrafoM").append('Error Archivo DB: </br>');
									$("#parrafoM").append(data.error_archivo_db,' </br></br>');
								}

								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_extension <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_extension,' </br></br>');
								}

								if (data.resultado_n_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_n_archivo,' </br></br>');
								}

								if (data.resultado_parametros <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_parametros,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeCentroProduccion').modal({
								  show: true
								});
								feather.replace();
								var loader = document.getElementById("loader");
								loader.setAttribute('hidden', '');
							}
						}
						
					}
				}
				});
			}
	    }else{
	    	feather.replace();
	    	var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
	    }
	    feather.replace();
    });

    $("#agregarCentroProduccion").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitales: {
	        required: true,
	        minlength: 1
	      },
	      fecha: {
	        required: true,
	        minlength: 1
	      },
	      archivoCentroProduccion: {
	        required: true,
	        minlength: 3,
	        extension: "xls|xlsx"
	      },
	    },
	    messages:{
	      hospitales: {
	        required: "Seleccione un Hospital."
	      },
	      fecha: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      archivoCentroProduccion: {
	        required: "Ingrese Plantilla Centro de Producci&oacute;n.",
	        minlength: "Se requiere un archivo válido.",
	        extension: "Ingrese un Archivo con extensión XLS|XLSX.",
	      },
	    }
  	});

  	$("#agregarProduccionDistribuida").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarProduccionDistribuida").validate();
	    
	    if ($("#agregarProduccionDistribuida").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarProduccionDistribuida");
				var formData = new FormData(form);
				var id_importacion = document.getElementById('id_importacion').value;
				var baseurl = window.origin + '/Distribucion/agregarProduccionDistribuida/' + id_importacion;

				jQuery.ajax({
				type: 'POST',
				url: baseurl,//form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				data: formData,
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarProduccionDistribuida", "detalleImportacion");
							window.location.href = urlFinal;
						}else{
							document.getElementById("agregarProduccionDistribuida").reset();
							$(document.getElementById('archivoProduccionDistribuida')).next('.custom-file-label').html('Seleccionar un Archivo...');
							$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							if (data.resultado_archivo == 1 && data.resultado_archivo_db == 1 &&
							data.resultado_carga == 1 && data.resultado_extension == 1 &&
							data.resultado_n_archivo == 1 && data.resultado_parametros == 1 &&
							data.resultado_registros_db == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
								$("#parrafoM").append('Se ha cargado Exitosamente el Importe al sistema con ID <h2>', data["respuesta_importacion"].id_importacion_carga,'</h2>, su estado actual es "Pendiente de Aprobaci&oacute;n".');

								$("#parrafoM").append('</br></br>', data.registros_db);
								$('#modalMensajeProduccionServicios').modal({
								  show: true
								});
								feather.replace();
						        $('[data-toggle="tooltip"]').tooltip();
								document.getElementById("agregarProduccionDistribuida").reset();
								$(document.getElementById('archivoProduccionDistribuida')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							}else{
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								if (data.resultado_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.error_archivo,' </br></br>');
								}

								if (data.resultado_archivo_db <= 0) {
									$("#parrafoM").append('Error Archivo DB: </br>');
									$("#parrafoM").append(data.error_archivo_db,' </br></br>');
								}

								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_extension <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_extension,' </br></br>');
								}

								if (data.resultado_n_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_n_archivo,' </br></br>');
								}

								if (data.resultado_parametros <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_parametros,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeProduccionDistribuida').modal({
								  show: true
								});
								feather.replace();
								var loader = document.getElementById("loader");
								loader.setAttribute('hidden', '');
							}
						}
						
					}
				}
				});
			}
	    }else{
	    	feather.replace();
	    	var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
	    }
	    feather.replace();
    });

  	$("#agregarProduccionDistribuida").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitales: {
	        required: true,
	        minlength: 1
	      },
	      fecha: {
	        required: true,
	        minlength: 1
	      },
	      archivoProduccionDistribuida: {
	        required: true,
	        minlength: 3,
	        extension: "xls|xlsx"
	      },
	    },
	    messages:{
	      hospitales: {
	        required: "Seleccione un Hospital."
	      },
	      fecha: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      archivoProduccionDistribuida: {
	        required: "Ingrese Plantilla Producci&oacute;n Distribuida.",
	        minlength: "Se requiere un archivo válido.",
	        extension: "Ingrese un Archivo con extensión XLS|XLSX.",
	      },
	    }
  	});

  	$("#agregarProduccionServicios").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarProduccionServicios").validate();
	    
	    if ($("#agregarProduccionServicios").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarProduccionServicios");
				var formData = new FormData(form);
				var id_importacion = document.getElementById('id_importacion').value;
				var baseurl = window.origin + '/Distribucion/agregarProduccionServicios/' + id_importacion;

				jQuery.ajax({
				type: 'POST',
				url: baseurl,//form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				data: formData,
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarProduccionServicios", "detalleImportacion");
							window.location.href = urlFinal;
							/*var urlFinal = window.location.href.replace("agregarProduccionServicios", "confirmacionProduccionServicios/".concat(data.respuesta_importacion.id_importacion_carga));
							window.location.href = urlFinal;
							loader.setAttribute('hidden', '');*/
						}else{
							document.getElementById("agregarProduccionServicios").reset();
							$(document.getElementById('archivoProduccionServicios')).next('.custom-file-label').html('Seleccionar un Archivo...');
							$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							if (data.resultado_archivo == 1 && data.resultado_archivo_db == 1 &&
							data.resultado_carga == 1 && data.resultado_extension == 1 &&
							data.resultado_n_archivo == 1 && data.resultado_parametros == 1 &&
							data.resultado_registros_db == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
								$("#parrafoM").append('Se ha cargado Exitosamente el Importe al sistema con ID <h2>', data["respuesta_importacion"].id_importacion_carga,'</h2>, su estado actual es "Pendiente de Aprobaci&oacute;n".');

								$("#parrafoM").append('</br></br>', data.registros_db);
								$('#modalMensajeProduccionServicios').modal({
								  show: true
								});
								feather.replace();
						        $('[data-toggle="tooltip"]').tooltip();
								document.getElementById("agregarProduccionServicios").reset();
								$(document.getElementById('archivoProduccionServicios')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							}else{
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								if (data.resultado_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.error_archivo,' </br></br>');
								}

								if (data.resultado_archivo_db <= 0) {
									$("#parrafoM").append('Error Archivo DB: </br>');
									$("#parrafoM").append(data.error_archivo_db,' </br></br>');
								}

								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_extension <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_extension,' </br></br>');
								}

								if (data.resultado_n_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_n_archivo,' </br></br>');
								}

								if (data.resultado_parametros <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_parametros,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeProduccionServicios').modal({
								  show: true
								});
								feather.replace();
								var loader = document.getElementById("loader");
								loader.setAttribute('hidden', '');
							}
						}
						
					}
				}
				});
			}
	    }else{
	    	feather.replace();
	    	var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
	    }
	    feather.replace();
    });

  	$("#agregarProduccionServicios").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitalesPS: {
	        required: true,
	        minlength: 1
	      },
	      fechaPS: {
	        required: true,
	        minlength: 1
	      },
	      archivoProduccionServicios: {
	        required: true,
	        minlength: 3,
	        extension: "xls|xlsx"
	      },
	    },
	    messages:{
	      hospitalesPS: {
	        required: "Seleccione un Hospital."
	      },
	      fechaPS: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      archivoProduccionServicios: {
	        required: "Ingrese Plantilla Producci&oacute;n de Servicios.",
	        minlength: "Se requiere un archivo válido.",
	        extension: "Ingrese un Archivo con extensión XLS|XLSX.",
	      },
	    }
  	});

  	$("#agregarNominaEmpleados").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');

	    var validacion = $("#agregarNominaEmpleados").validate();
	    
	   	if ($("#agregarNominaEmpleados").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarNominaEmpleados");
				var formData = new FormData(form);

				var id_importacion = document.getElementById('id_importacion').value;
				var baseurl = window.origin + '/Distribucion/agregarNominaEmpleados/' + id_importacion;

				jQuery.ajax({
				type: 'POST',
				url: baseurl,//form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				data: formData,
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarNominaEmpleados", "detalleImportacion");
							//.concat(data.respuesta_importacion.id_importacion_carga));
							window.location.href = urlFinal;
							/*var urlFinal = window.location.href.replace("agregarNominaEmpleados", "confirmacionNominaEmpleados/".concat(data.respuesta_importacion.id_importacion_carga));
							window.location.href = urlFinal;
							loader.setAttribute('hidden', '');*/
						}else{
							document.getElementById("agregarNominaEmpleados").reset();
							$(document.getElementById('agregarNominaEmpleados')).next('.custom-file-label').html('Seleccionar un Archivo...');
							$("#lArchivoProduccion").text("Seleccionar un Archivo...");
							if (data.resultado_archivo == 1 && data.resultado_archivo_db == 1 &&
							data.resultado_carga == 1 && data.resultado_extension == 1 &&
							data.resultado_n_archivo == 1 && data.resultado_parametros == 1 &&
							data.resultado_registros_db == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
								$("#parrafoM").append('Se ha cargado Exitosamente el Importe al sistema con ID <h2>', data["respuesta_importacion"].id_importacion_carga,'</h2>, su estado actual es "Pendiente de Aprobaci&oacute;n".');

								$("#parrafoM").append('</br></br>', data.registros_db);
								$('#modalMensajeNominaEmpleados').modal({
								  show: true
								});
								feather.replace();
						        $('[data-toggle="tooltip"]').tooltip();
								document.getElementById("agregarNominaEmpleados").reset();
								$(document.getElementById('archivoCentroProduccion')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							}else{
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								if (data.resultado_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.error_archivo,' </br></br>');
								}

								if (data.resultado_archivo_db <= 0) {
									$("#parrafoM").append('Error Archivo DB: </br>');
									$("#parrafoM").append(data.error_archivo_db,' </br></br>');
								}

								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_extension <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_extension,' </br></br>');
								}

								if (data.resultado_n_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_n_archivo,' </br></br>');
								}

								if (data.resultado_parametros <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_parametros,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeNominaEmpleados').modal({
								  show: true
								});
								feather.replace();
								var loader = document.getElementById("loader");
								loader.setAttribute('hidden', '');
							}
						}
						
					}
				}
				});
			}
	    }else{
	    	feather.replace();
	    	var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
	    }
	    feather.replace();
    });

    $("#agregarNominaEmpleados").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitalesNE: {
	        required: true,
	        minlength: 1
	      },
	      fechaNE: {
	        required: true,
	        minlength: 1
	      },
	      archivoNominaEmpleados: {
	        required: true,
	        minlength: 3,
	        extension: "xls|xlsx"
	      },
	    },
	    messages:{
	      hospitalesNE: {
	        required: "Seleccione un Hospital."
	      },
	      fechaNE: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      archivoNominaEmpleados: {
	        required: "Ingrese Plantilla Nomina Empleados.",
	        minlength: "Se requiere un archivo válido.",
	        extension: "Ingrese un Archivo con extensión XLS|XLSX.",
	      },
	    }
  	});

  	$("#agregarProgramacionHoras").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarProgramacionHoras").validate();
	    
	    if ($("#agregarProgramacionHoras").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarProgramacionHoras");
				var formData = new FormData(form);

				jQuery.ajax({
				type: form.getAttribute('method'),
				url: form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				data: formData,
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarProgramacionHoras", "detalleImportacion");
							window.location.href = urlFinal;
						}else{
							if (data.resultado_archivo == 1 && data.resultado_archivo_db == 1 &&
							data.resultado_carga == 1 && data.resultado_extension == 1 &&
							data.resultado_n_archivo == 1 && data.resultado_parametros == 1 &&
							data.resultado_registros_db == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
								$("#parrafoM").append('Se ha cargado Exitosamente el Importe al sistema con ID <h2>', data["respuesta_importacion"].id_importacion_carga,'</h2>, su estado actual es "Pendiente de Aprobaci&oacute;n".');

								$("#parrafoM").append('</br></br>', data.registros_db);
								$('#modalMensajeProgramacionHoras').modal({
								  show: true
								});
								feather.replace();
						        $('[data-toggle="tooltip"]').tooltip();
								document.getElementById("agregarProgramacionHoras").reset();
								$(document.getElementById('archivoProgramacionHoras')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							}else{
								document.getElementById("agregarProgramacionHoras").reset();
								$(document.getElementById('archivoProgramacionHoras')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								if (data.resultado_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.error_archivo,' </br></br>');
								}

								if (data.resultado_archivo_db <= 0) {
									$("#parrafoM").append('Error Archivo DB: </br>');
									$("#parrafoM").append(data.error_archivo_db,' </br></br>');
								}

								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_extension <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_extension,' </br></br>');
								}

								if (data.resultado_n_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_n_archivo,' </br></br>');
								}

								if (data.resultado_parametros <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_parametros,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeProgramacionHoras').modal({
								  show: true
								});
								feather.replace();
								var loader = document.getElementById("loader");
								loader.setAttribute('hidden', '');
							}
						}
						
					}
				}
				});
			}
	    }else{
	    	feather.replace();
	    	var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
	    }
	    feather.replace();
    });

    $("#agregarProgramacionHoras").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitales: {
	        required: true,
	        minlength: 1
	      },
	      fecha: {
	        required: true,
	        minlength: 1
	      },
	      archivoProgramacionHoras: {
	        required: true,
	        minlength: 3,
	        extension: "xls|xlsx"
	      },
	    },
	    messages:{
	      hospitales: {
	        required: "Seleccione un Hospital."
	      },
	      fecha: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      archivoProgramacionHoras: {
	        required: "Ingrese Plantilla Programaci&oacute;n de Horas.",
	        minlength: "Se requiere un archivo válido.",
	        extension: "Ingrese un Archivo con extensión XLS|XLSX.",
	      },
	    }
  	});

  	$("#agregarDistribucionSuministros").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarDistribucionSuministros").validate();
	    
	    if ($("#agregarDistribucionSuministros").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarDistribucionSuministros");
				var formData = new FormData(form);
				var id_importacion = document.getElementById('id_importacion').value;
				var baseurl = window.origin + '/Distribucion/agregarDistribucionSuministros/' + id_importacion;

				jQuery.ajax({
				type: 'POST',
				url: baseurl,//form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				data: formData,
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarDistribucionSuministros", "detalleImportacion/");
							window.location.href = urlFinal;
							/*var urlFinal = window.location.href.replace("agregarDistribucionSuministros", "confirmacionDistribucionSuministros/".concat(data.respuesta_importacion.id_importacion_carga));
							window.location.href = urlFinal;
							loader.setAttribute('hidden', '');*/
						}else{
							if (data.resultado_archivo == 1 && data.resultado_archivo_db == 1 &&
							data.resultado_carga == 1 && data.resultado_extension == 1 &&
							data.resultado_n_archivo == 1 && data.resultado_parametros == 1 &&
							data.resultado_registros_db == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
								$("#parrafoM").append('Se ha cargado Exitosamente el Importe al sistema con ID <h2>', data["respuesta_importacion"].id_importacion_carga,'</h2>, su estado actual es "Pendiente de Aprobaci&oacute;n".');

								$("#parrafoM").append('</br></br>', data.registros_db);
								$('#modalMensajeProgramacionHoras').modal({
								  show: true
								});
								feather.replace();
						        $('[data-toggle="tooltip"]').tooltip();
								document.getElementById("agregarDistribucionSuministros").reset();
								$(document.getElementById('archivoProgramacionHoras')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							}else{
								document.getElementById("agregarDistribucionSuministros").reset();
								$(document.getElementById('archivoDistribucionSuministros')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								if (data.resultado_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.error_archivo,' </br></br>');
								}

								if (data.resultado_archivo_db <= 0) {
									$("#parrafoM").append('Error Archivo DB: </br>');
									$("#parrafoM").append(data.error_archivo_db,' </br></br>');
								}

								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_extension <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_extension,' </br></br>');
								}

								if (data.resultado_n_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_n_archivo,' </br></br>');
								}

								if (data.resultado_parametros <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_parametros,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeDistribucionSuministros').modal({
								  show: true
								});
								feather.replace();
								var loader = document.getElementById("loader");
								loader.setAttribute('hidden', '');
							}
						}
						
					}
				}
				});
			}
	    }else{
	    	feather.replace();
	    	var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
	    }
	    feather.replace();
    });

    $("#agregarDistribucionSuministros").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitales: {
	        required: true,
	        minlength: 1
	      },
	      fecha: {
	        required: true,
	        minlength: 1
	      },
	      archivoDistribucionSuministros: {
	        required: true,
	        minlength: 3,
	        extension: "xls|xlsx"
	      },
	    },
	    messages:{
	      hospitales: {
	        required: "Seleccione un Hospital."
	      },
	      fecha: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      archivoDistribucionSuministros: {
	        required: "Ingrese Plantilla Distribuci&oacute;n de Suministros.",
	        minlength: "Se requiere un archivo válido.",
	        extension: "Ingrese un Archivo con extensión XLS|XLSX.",
	      },
	    }
  	});

  	$("#agregarDistribucionGastoGeneral").on("submit", function(e){
	    var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
	    var validacion = $("#agregarDistribucionGastoGeneral").validate();
	    
	    if ($("#agregarDistribucionGastoGeneral").valid()) {
	    	if(validacion.numberOfInvalids() == 0)
		    {
		    	e.preventDefault();
				var form = document.getElementById("agregarDistribucionGastoGeneral");
				var formData = new FormData(form);
				var id_importacion = document.getElementById('id_importacion').value;
				var baseurl = window.origin + '/Distribucion/agregarDistribucionGastoGeneral/' + id_importacion;

				jQuery.ajax({
				type: 'POST',
				url: baseurl,//form.getAttribute('action'),
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				beforeSend: function() {
				    var loader = document.getElementById("loader");
	    			loader.removeAttribute('hidden');
			  	},
				data: formData,
				success: function(data) {
					if (data) {
						if (data.errores === 0) {
							var urlFinal = window.location.href.replace("agregarDistribucionGastoGeneral", "detalleImportacion");
							window.location.href = urlFinal;

							/*var urlFinal = window.location.href.replace("agregarDistribucionGastoGeneral", "confirmacionDistribucionGastoGeneral/".concat(data.respuesta_importacion.id_importacion_carga));
							window.location.href = urlFinal;
							loader.setAttribute('hidden', '');*/
						}else{
							document.getElementById("agregarDistribucionGastoGeneral").reset();
							$(document.getElementById('archivoDistribucionGastoGeneral')).next('.custom-file-label').html('Seleccionar un Archivo...');
							$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							if (data.resultado_archivo == 1 && data.resultado_archivo_db == 1 &&
							data.resultado_carga == 1 && data.resultado_extension == 1 &&
							data.resultado_n_archivo == 1 && data.resultado_parametros == 1 &&
							data.resultado_registros_db == 1) {
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
								$("#parrafoM").append('Se ha cargado Exitosamente el Importe al sistema con ID <h2>', data["respuesta_importacion"].id_importacion_carga,'</h2>, su estado actual es "Pendiente de Aprobaci&oacute;n".');

								$("#parrafoM").append('</br></br>', data.registros_db);
								$('#modalMensajeProgramacionHoras').modal({
								  show: true
								});
								feather.replace();
						        $('[data-toggle="tooltip"]').tooltip();
								document.getElementById("agregarDistribucionGastoGeneral").reset();
								$(document.getElementById('archivoProgramacionHoras')).next('.custom-file-label').html('Seleccionar un Archivo...');
								$("#lArchivoProduccion").text = "Seleccionar un Archivo...";
							}else{
								$('#tituloM').empty();
								$("#parrafoM").empty();
								$("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
								$("#parrafoM").append('Ha ocurrido un error al intentar cargar el Importe.');
								$("#parrafoM").append('</br></br>Detalle: </br>');
								
								if (data.resultado_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.error_archivo,' </br></br>');
								}

								if (data.resultado_archivo_db <= 0) {
									$("#parrafoM").append('Error Archivo DB: </br>');
									$("#parrafoM").append(data.error_archivo_db,' </br></br>');
								}

								if (data.resultado_carga <= 0) {
									$("#parrafoM").append('Error Archivo D: </br>');
									$("#parrafoM").append(data.error_carga,' </br></br>');
								}

								if (data.resultado_extension <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_extension,' </br></br>');
								}

								if (data.resultado_n_archivo <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_n_archivo,' </br></br>');
								}

								if (data.resultado_parametros <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.mensaje_parametros,' </br></br>');
								}

								if (data.resultado_registros_db <= 0) {
									$("#parrafoM").append('Error Archivo: </br>');
									$("#parrafoM").append(data.registros_db,' </br></br>');
								}

								$('#modalMensajeDistribucionGastoGeneral').modal({
								  show: true
								});
								feather.replace();
								var loader = document.getElementById("loader");
								loader.setAttribute('hidden', '');
							}
						}
						
					}
				}
				});
			}
	    }else{
	    	feather.replace();
	    	var loader = document.getElementById("loader");
			loader.setAttribute('hidden', '');
	    }
	    feather.replace();
    });

    $("#agregarDistribucionGastoGeneral").validate({
	   	errorClass:'invalid-feedback',
		errorElement:'span',
		highlight: function(element, errorClass, validClass) {
		  $(element).addClass("is-invalid").removeClass("invalid-feedback");
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).removeClass("is-invalid");
		},
	    rules: {
	      hospitales: {
	        required: true,
	        minlength: 1
	      },
	      fecha: {
	        required: true,
	        minlength: 1
	      },
	      archivoDistribucionGastoGeneral: {
	        required: true,
	        minlength: 3,
	        extension: "xls|xlsx"
	      },
	    },
	    messages:{
	      hospitales: {
	        required: "Seleccione un Hospital."
	      },
	      fecha: {
	        required: "Seleccione Mes y A&ntilde;o."
	      },
	      archivoDistribucionGastoGeneral: {
	        required: "Ingrese Plantilla Distribuci&oacute;n de Gasto General.",
	        minlength: "Se requiere un archivo válido.",
	        extension: "Ingrese un Archivo con extensión XLS|XLSX.",
	      },
	    }
  	});

    $('#hospitalesI').on('change',function(){
		listarImportaciones();
 	});

 	 $('#fechaI').on('change',function(){
		listarImportaciones();
 	});

 	$('#hospitalesIPS').on('change',function(){
		var id_hospital = $(this).val();
		listarImportacionesPS();
 	});

 	 $('#fechaIPS').on('change',function(){
		listarImportacionesPS();
 	});

 	$('#hospitalesVI').on('change',function(){
		var id_hospital = $(this).val();
		listarValidacionImportaciones();
 	});

 	 $('#fechaVI').on('change',function(){
		listarValidacionImportaciones();
 	});



 	$('#hospitalesD').on('change',function(){
		listarDistribucion();
 	});

 	$('#fechaD').on('change',function(){
		listarDistribucion();
 	});

 	$('#estadosImporteD').on('change',function(){
		listarDistribucion();
 	});

 	function listarImportaciones()
	{
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var hospitalesI = $("#hospitalesI").val();
		var fechaI = $("#fechaI").val();
		//var estadosImporteD = $("#estadosImporteD").val();
		var baseurl = window.origin + '/Distribucion/listarImportacion';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {hospitalesI: hospitalesI, fechaI: fechaI},
		success: function(data) {
		if (data)
		{
		    var myJSON= JSON.stringify(data);
		    myJSON = JSON.parse(myJSON);
		    $('#tImportaciones').html(myJSON.table_importaciones);
			    feather.replace()
			    $('#tListaImportaciones').dataTable({
	            searching: true,
	            paging:         true,
	            ordering:       false,
	            info:           true,
	             "scrollX": false,
	            columnDefs: [
	              { targets: 'no-sort', orderable: false }
	            ],
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
	        feather.replace();
		    $('[data-toggle="tooltip"]').tooltip();
			loader.setAttribute('hidden', '');
		  }
		}
		});
	}

	function listarHospitales()
	{
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var cluster = $("#clusterLH").val();
		var servicio = $("#serviciosLH").val();
		var region = $("#regionLT").val();
		var macro_zona = $("#macroZonaLT").val();
		var baseurl = window.origin + '/Hospital/listarHospitales';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {cluster: cluster, servicio: servicio, region: region, macro_zona: macro_zona},
		success: function(data) {
		if (data)
		{
		    var myJSON= JSON.stringify(data);
		    myJSON = JSON.parse(myJSON);
		    $('#tablaListaHospitales').html(myJSON.table_hospitales);
		    $('#tListaHospitales').dataTable({
	            searching: true,
	            paging:         true,
	            ordering:       true,
	            info:           true,
	             "scrollX": false,
	            columnDefs: [
	              { targets: 'no-sort', orderable: false }
	            ],
	            "drawCallback": function( settings ) {
			        feather.replace();
			        $('[data-toggle="tooltip"]').tooltip();
			    },
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
	}

	function listarItemCosto()
	{
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var tipoIC = $("#tipoIC").val();
		var baseurl = window.origin + '/Distribucion/listarItemCosto';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {tipoIC: tipoIC},
		success: function(data) {
		if (data)
		{
		    var myJSON= JSON.stringify(data);
		    myJSON = JSON.parse(myJSON);
		    $('#tablaListaItemCostos').html(myJSON.table_item_costos);
		    $('#tListaCentroCosto').dataTable({
	            searching: true,
	            paging:         true,
	            ordering:       false,
	            info:           true,
	             "scrollX": false,
	            columnDefs: [
	              { targets: 'no-sort', orderable: false }
	            ],
	            "drawCallback": function( settings ) {
			        feather.replace();
			        $('[data-toggle="tooltip"]').tooltip();
			    },
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
	        feather.replace();
		    $('[data-toggle="tooltip"]').tooltip();
			loader.setAttribute('hidden', '');
		  }
		}
		});
	}

	function listarCentroCosto()
	{
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var grupoCC = $("#grupoCC").val();
		var tipoCC = $("#tipoCC").val();
		var tipoATCC = $("#tipoATCC").val();

		var baseurl = window.origin + '/Distribucion/listarCentroCosto';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {grupoCC: grupoCC, tipoCC: tipoCC, tipoATCC: tipoATCC},
		success: function(data) {
		if (data)
		{
		    var myJSON= JSON.stringify(data);
		    myJSON = JSON.parse(myJSON);
		    $('#tablaListaCentroCosto').html(myJSON.table_centro_costos);
		    $('#tListaCentroCosto').dataTable({
	            searching: true,
	            paging:         true,
	            ordering:       false,
	            info:           true,
	             "scrollX": false,
	            columnDefs: [
	              { targets: 'no-sort', orderable: false }
	            ],
	            "drawCallback": function( settings ) {
			        feather.replace();
			        $('[data-toggle="tooltip"]').tooltip();
			    },
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
	        feather.replace();
		    $('[data-toggle="tooltip"]').tooltip();
			loader.setAttribute('hidden', '');
		  }
		}
		});
	}

	function listarDistribucion()
	{
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var hospitalesD = $("#hospitalesD").val();
		var fechaD = $("#fechaD").val();
		var estadosImporteD = $("#estadosImporteD").val();
		var baseurl = window.origin + '/Distribucion/listarDistribucion';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {hospitalesD: hospitalesD, fechaD: fechaD, estadosImporteD: estadosImporteD},
		success: function(data) {
		if (data)
		{
		    var myJSON= JSON.stringify(data);
		    myJSON = JSON.parse(myJSON);
		    $('#tDistribuciones').html(myJSON.table_importaciones);
			    feather.replace()
			    $('#tListaDistribuciones').dataTable({
	            searching: true,
	            paging:         true,
	            ordering:       false,
	            info:           true,
	             "scrollX": false,
	            columnDefs: [
	              { targets: 'no-sort', orderable: false }
	            ],
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
	        feather.replace();
		    $('[data-toggle="tooltip"]').tooltip();
			loader.setAttribute('hidden', '');
		  }
		}
		});
	}

	function listarImportacionesPS()
	{
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var hospitalesI = $("#hospitalesIPS").val();
		var fechaI = $("#fechaIPS").val();
		var baseurl = window.origin + '/Distribucion/produccionServicios';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {hospitalesI: hospitalesI, fechaI: fechaI},
		success: function(data) {
		if (data)
		{
		    var myJSON= JSON.stringify(data);
		    myJSON = JSON.parse(myJSON);
		    $('#tImportaciones').html(myJSON.table_importaciones);
			    feather.replace()
			    $('#tListaImportaciones').dataTable({
	            searching: true,
	            paging:         true,
	            ordering:       false,
	            info:           true,
	             "scrollX": false,
	            columnDefs: [
	              { targets: 'no-sort', orderable: false }
	            ],
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
	        feather.replace();
		    $('[data-toggle="tooltip"]').tooltip();
			loader.setAttribute('hidden', '');
		  }
		}
		});
	}

	function listarValidacionImportaciones()
	{
		var loader = document.getElementById("loader");
	    loader.removeAttribute('hidden');
		var hospitalesI = $("#hospitalesVI").val();
		var fechaI = $("#fechaVI").val();
		var baseurl = window.origin + '/Distribucion/validacionImportaciones';
		jQuery.ajax({
		type: "POST",
		url: baseurl,
		dataType: 'json',
		data: {hospitalesI: hospitalesI, fechaI: fechaI},
		success: function(data) {
		if (data)
		{
		    var myJSON= JSON.stringify(data);
		    myJSON = JSON.parse(myJSON);
		    $('#tValidacionImportaciones').html(myJSON.table_importaciones);
			    feather.replace()
			    $('#tListaValidacionImportaciones').dataTable({
	            searching: true,
	            paging:         true,
	            ordering:       false,
	            info:           true,
	             "scrollX": false,
	            columnDefs: [
	              { targets: 'no-sort', orderable: false }
	            ],
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
	        feather.replace();
		    $('[data-toggle="tooltip"]').tooltip();
			loader.setAttribute('hidden', '');
		  }
		}
		});
	}
});

 window.onload = function () {

 	localStorage.myPageDataArr = undefined;
 	localStorage.removeItem('centro_costos');
	localStorage.removeItem('centro_costos_seleccionados');
	localStorage.removeItem('centro_costos_a_seleccionados');
	localStorage.removeItem('item_costos_seleccionados');
	localStorage.removeItem('item_costos_a_seleccionados');
	

	/*var hospitales = null;
	if (document.getElementById('lista_hospitalesAU') != null) 
	hospitales = document.getElementById('lista_hospitalesAU').children;

	if (hospitales != null && hospitales.length > 0) {
		for (var i = 0; i < hospitales.length; i++) {
		  if(hospitales[i].firstElementChild.checked)
		  {
		    var idHospital = hospitales[i].firstElementChild.dataset.id;
		    var hospitales_usuario = JSON.parse(localStorage.getItem("hospitales_usuario"));
		    if (hospitales_usuario != null && hospitales_usuario.length > 0) {
		      hospitales_usuario.push({'id_hospital': idHospital});
		      localStorage.setItem("hospitales_usuario", JSON.stringify(hospitales_usuario));
		    }else{
		      var hospitales_usuario = [];
		      hospitales_usuario.push({'id_hospital': idHospital});
		      localStorage.setItem("hospitales_usuario", JSON.stringify(hospitales_usuario));
		    }
		  }
		}  
	}*/

 	if(window.location.pathname.split('/')[2].toLowerCase() == 'agregarHospital'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'modificarHospital'.toLowerCase())
    {
    	var idHospital = document.getElementById('inputIdHospital').value;
    	var baseurl =  window.origin + '/Distribucion/json_listarCentroCostos';
		jQuery.ajax({
		    type: "POST",
		    url: baseurl,
		    dataType: 'json',
		    data: {idHospital: idHospital},
		    success: function(data) {
		    	if (data) {
		    		var centro_costos = JSON.parse(localStorage.getItem("centro_costos"));
				    if (centro_costos != null && centro_costos.length > 0) {
				      localStorage.setItem("centro_costos", JSON.stringify(data.data));
				    }else{
				      localStorage.setItem("centro_costos", JSON.stringify(data.data));
				    }

				    if (data.data_cc_h && data.data_cc_h.length > 0) {
				    	var centro_costos_sa =  data.data;
				    	for (var i = 0; i < data.data_cc_h.length; i++) {
				   			var indexCC = centro_costos_sa.findIndex(c => c[0] === data.data_cc_h[i][0]);
							delete centro_costos_sa.splice(indexCC, 1);
						}

				    	$('#tListaCCA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							"data": data.data_cc_h,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });

					    $('#tListaCCSA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							"data": centro_costos_sa,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });

				    }else{
				    	$('#tListaCCSA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							"data": data.data,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	// "sProcessing" : '<img src="<?php //echo base_url(); ?>images/gif/spin2.svg" height="42" width="42" >',
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });

				    	$('#tListaCCA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });
				    }
		    	}
		    }
		});

		var baseurl_2 =  window.origin + '/Distribucion/json_listarItemCostos';
		jQuery.ajax({
		    type: "POST",
		    url: baseurl_2,
		    dataType: 'json',
		    data: {idHospital: idHospital},
		    success: function(data) {
		    	if (data) {
		    		var item_costos = JSON.parse(localStorage.getItem("item_costos"));
				    if (item_costos != null && item_costos.length > 0) {
				      localStorage.setItem("item_costos", JSON.stringify(data.data));
				    }else{
				      localStorage.setItem("item_costos", JSON.stringify(data.data));
				    }

				    if (data.data_ic_h && data.data_ic_h.length > 0) {
				    	var item_costos_sa =  data.data;
				    	for (var i = 0; i < data.data_ic_h.length; i++) {
				   			var indexCC = item_costos_sa.findIndex(c => c[0] === data.data_ic_h[i][0]);
							delete item_costos_sa.splice(indexCC, 1);
						}

				    	$('#tListaICA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							"data": data.data_ic_h,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });

					    $('#tListaICSA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							"data": item_costos_sa,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });

				    }else{
 					
			    		$('#tListaICSA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							"data": data.data,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });

					    $('#tListaICA').DataTable( {
						 	"fnDrawCallback": function( oSettings ) {
								feather.replace();
								loader.setAttribute('hidden', '');
								$('[data-toggle="tooltip"]').tooltip();
							},
							"preDrawCallback": function( settings ) {
								var loader = document.getElementById("loader");
								loader.removeAttribute('hidden');
							},
							"processing": false,
							searching: true,
							paging:         true,
							ordering:       true,
							info:           true,
				        	select: true,
							"oLanguage": {
								"sProcessing":     function(){
									let timerInterval
								},
							  	"sLengthMenu": "_MENU_ Registros por p&aacute;gina",
							  	"sZeroRecords": "No se encontraron registros",
							  	"sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
							  	"sInfoEmpty": "Mostrando 0 de 0 registros",
							  	"sInfoFiltered": "(filtrado de _MAX_ registros totales)",
							  	"sSearch":        "Buscar:",
							  	"oPaginate": {
							    	"sFirst":    "Primero",
							    	"sLast":    "Último",
							    	"sNext":    "Siguiente",
							    	"sPrevious": "Anterior"
							  	}
							},
							lengthMenu: [[20], [20]]
					    });
					}
		    	}
		    }
		});
    	
        feather.replace();
    }

 	if(window.location.pathname.split('/')[2].toLowerCase() == 'listarDistribucionImportacion'.toLowerCase())
    {
    	/*$('#tListaImportacionesDistribucion').dataTable({
            /*searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
		    scrollY:        "300px",
	        scrollX:        true,
	        scrollCollapse: true,
	        paging:         false,
	        fixedColumns:   true,
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
            lengthMenu: [[20], [20]]
        });*/


        $('#tListaCubo').dataTable({
            searching: true,
            ordering:       false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
		    scrollY:        "600px",
	        scrollX:        true,
	        scrollCollapse: true,
	        paging:         false,
	        fixedColumns:   true,
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
            lengthMenu: [[20], [20]]
        });

        var tabla1 = document.getElementById('tImportaciones').children[0].children[1].children[0].children[0].children[2].children[0].children[0];
		tabla1.style.setProperty('margin-bottom', '0px', 'important');
		tabla1.parentElement.style.setProperty("margin", "0px -3px -2px 0px", "important");
		tabla1.parentElement.style.backgroundColor = "white";
		var tabla2 = document.getElementById('tImportaciones').children[0].children[1].children[0].children[0].children[2].children[1].children[0];
		tabla2.style.overflow = "hidden";
		tabla2.firstElementChild.style.setProperty("margin", "0px", "important");
		tabla3 = document.getElementById('tImportaciones').children[0].children[1].children[0].children[0].children[2].children[1];
		tabla3.style.backgroundColor = "white";
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarDistribucionRRHH'.toLowerCase())
    {
        $('#tListaReporteRRHH').dataTable({
            searching: true,
            ordering:       false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
		    scrollY:        "600px",
	        scrollX:        true,
	        scrollCollapse: true,
	        paging:         false,
	        fixedColumns:   true,
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
            lengthMenu: [[20], [20]]
        });

        var tabla1 = document.getElementsByClassName('DTFC_LeftHeadWrapper')[0].children[0];
		tabla1.style.setProperty('margin-bottom', '0px', 'important');
		tabla1.parentElement.style.setProperty("margin", "0px 0px -3px 0px", "important");
		var tabla2 = document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].children[0].children[0];
		document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].style.backgroundColor = "white";
		document.getElementsByClassName('DTFC_Cloned')[1].style.setProperty("margin", "0px", "important");
        feather.replace();
    }


    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarDistribucionGG'.toLowerCase()){
        $('#tListaReporteGG').dataTable({
            searching: true,
            ordering:       false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
		    scrollY:        "600px",
	        scrollX:        true,
	        scrollCollapse: true,
	        paging:         false,
	        fixedColumns:   true,
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
            }//,
            //lengthMenu: [[20], [20]]
        });
        var tabla1 = document.getElementsByClassName('DTFC_LeftHeadWrapper')[0].children[0];
		tabla1.style.setProperty('margin-bottom', '0px', 'important');
		tabla1.parentElement.style.setProperty("margin", "0px 0px -3px 0px", "important");
		var tabla2 = document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].children[0].children[0];
		document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].style.backgroundColor = "white";
		document.getElementsByClassName('DTFC_Cloned')[1].style.setProperty("margin", "0px", "important");
		tabla2.parentElement.style.overflow = "hidden";
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarDistribucionInsumos'.toLowerCase()){
        $('#tListaReporteI').dataTable({
            searching: true,
            ordering:       false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
		    scrollY:        "600px",
	        scrollX:        true,
	        scrollCollapse: true,
	        paging:         false,
	        fixedColumns:   true,
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
            }//,
            //lengthMenu: [[20], [20]]
        });
        var tabla1 = document.getElementsByClassName('DTFC_LeftHeadWrapper')[0].children[0];
		tabla1.style.setProperty('margin-bottom', '0px', 'important');
		tabla1.parentElement.style.setProperty("margin", "0px 0px -3px 0px", "important");
		var tabla2 = document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].children[0].children[0];
		document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].style.backgroundColor = "white";
		document.getElementsByClassName('DTFC_Cloned')[1].style.setProperty("margin", "0px", "important");
		tabla2.parentElement.style.overflow = "hidden";
        feather.replace();
    }

     if(window.location.pathname.split('/')[2].toLowerCase() == 'listarDistribucionIndirectos'.toLowerCase()){
        $('#tListaReporteICC').dataTable({
            searching: true,
            ordering:       false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
		    scrollY:        "600px",
	        scrollX:        true,
	        scrollCollapse: true,
	        paging:         false,
	        fixedColumns:   true,
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
            }//,
            //lengthMenu: [[20], [20]]
        });
        var tabla1 = document.getElementsByClassName('DTFC_LeftHeadWrapper')[0].children[0];
		tabla1.style.setProperty('margin-bottom', '0px', 'important');
		tabla1.parentElement.style.setProperty("margin", "0px 0px -3px 0px", "important");
		var tabla2 = document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].children[0].children[0];
		document.getElementsByClassName('DTFC_LeftBodyWrapper')[0].style.backgroundColor = "white";
		document.getElementsByClassName('DTFC_Cloned')[1].style.setProperty("margin", "0px", "important");
		tabla2.parentElement.style.overflow = "hidden";
        feather.replace();
    }

    


    if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleImportacion'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacion'.toLowerCase())
    {
    	$('#tListaBitacoras').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
            lengthMenu: [[20], [20]]
        });

        feather.replace();
    }


 	if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleCentroProduccionTemporal'.toLowerCase())
    {
    	$('#tListaCentroProduccion').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

        if (document.getElementById('inputResultado').value != "" && document.getElementById('inputResultado').value == "1") {
        	$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
			$("#parrafoM").append('Se ha cambiado exitosamente el estado del Importe a "'.concat(document.getElementById('inputEstado').value,'" . </br></br>Codigo Importe: ', document.getElementById('inputIdImporte').value,'.'));
			$('#modalMensajeValidacion').modal({
			  show: true
			});
        }inputIdImporte

        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleProduccionServiciosTemporal'.toLowerCase())
    {
    	$('#tListaProduccionServicios').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

        if (document.getElementById('inputResultado').value != "" && document.getElementById('inputResultado').value == "1") {
        	$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
			$("#parrafoM").append('Se ha cambiado exitosamente el estado del Importe a "'.concat(document.getElementById('inputEstado').value,'" . </br></br>Codigo Importe: ', document.getElementById('inputIdImporte').value,'.'));
			$('#modalMensajeValidacion').modal({
			  show: true
			});
        }inputIdImporte

        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleNominaEmpleadosTemporal'.toLowerCase())
    {
    	$('#tListaCentroProduccion').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

        if (document.getElementById('inputResultado').value != "" && document.getElementById('inputResultado').value == "1") {
        	$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
			$("#parrafoM").append('Se ha cambiado exitosamente el estado del Importe a "'.concat(document.getElementById('inputEstado').value,'" . </br></br>Codigo Importe: ', document.getElementById('inputIdImporte').value,'.'));
			$('#modalMensajeValidacion').modal({
			  show: true
			});
        }inputIdImporte

        feather.replace();
    }
    
    if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleProgramacionHorasTemporal'.toLowerCase())
    {
    	$('#tListaProgramacionHoras').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

         if (document.getElementById('inputResultado').value != "" && document.getElementById('inputResultado').value == "1") {
        	$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
			$("#parrafoM").append('Se ha cambiado exitosamente el estado del Importe a "'.concat(document.getElementById('inputEstado').value,'" . </br></br>Codigo Importe: ', document.getElementById('inputIdImporte').value,'.'));
			$('#modalMensajeValidacion').modal({
			  show: true
			});
        }inputIdImporte

        feather.replace();
    };

    if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleDistribucionSuministrosTemporal'.toLowerCase())
    {
    	$('#tListaDistribucionSuministros').dataTable({
            searching:  true,
            paging:     true,
            ordering:   false,
            info:       true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

         if (document.getElementById('inputResultado').value != "" && document.getElementById('inputResultado').value == "1") {
        	$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
			$("#parrafoM").append('Se ha cambiado exitosamente el estado del Importe a "'.concat(document.getElementById('inputEstado').value,'" . </br></br>Codigo Importe: ', document.getElementById('inputIdImporte').value,'.'));
			$('#modalMensajeValidacion').modal({
			  show: true
			});
        }inputIdImporte

        feather.replace();
     };

    if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleProduccionDistribuidaTemporal'.toLowerCase())
    {
    	$('#tListaProduccionDistribuida').dataTable({
            searching:  true,
            paging:     true,
            ordering:   false,
            info:       true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

         if (document.getElementById('inputResultado').value != "" && document.getElementById('inputResultado').value == "1") {
        	$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
			$("#parrafoM").append('Se ha cambiado exitosamente el estado del Importe a "'.concat(document.getElementById('inputEstado').value,'" . </br></br>Codigo Importe: ', document.getElementById('inputIdImporte').value,'.'));
			$('#modalMensajeValidacion').modal({
			  show: true
			});
        }inputIdImporte

        feather.replace();
    };

    if(window.location.pathname.split('/')[2].toLowerCase() == 'detalleDistribucionGastoGeneralTemporal'.toLowerCase())
    {
    	$('#tListaDistribucionGastoGeneral').dataTable({
            searching:  true,
            paging:     true,
            ordering:   false,
            info:       true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

         if (document.getElementById('inputResultado').value != "" && document.getElementById('inputResultado').value == "1") {
        	$('#tituloM').empty();
			$("#parrafoM").empty();
			$("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
			$("#parrafoM").append('Se ha cambiado exitosamente el estado del Importe a "'.concat(document.getElementById('inputEstado').value,'" . </br></br>Codigo Importe: ', document.getElementById('inputIdImporte').value,'.'));
			$('#modalMensajeValidacion').modal({
			  show: true
			});
        }inputIdImporte

        feather.replace();
    };

 	if(window.location.pathname.split('/')[2].toLowerCase() == 'centroProduccion'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'produccionServicios'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'nominaEmpleados'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'programacionHoras'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'distribucionSuministros'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'produccionDistribuida'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'distribucionGastoGeneral'.toLowerCase())
    {
    	$('#tListaImportaciones').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarImportacion'.toLowerCase())
    {
    	$('#tListaImportaciones').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarDistribucion'.toLowerCase())
    {
    	$('#tListaDistribuciones').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

        feather.replace();
    }


    

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validacionImportaciones'.toLowerCase())
    {
    	$('#tListaValidacionImportaciones').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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

        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacionCP'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'confirmacionCentroProduccion'.toLowerCase())
    {
    	$('#tListaCentroProduccionV').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacionPS'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'confirmacionProduccionServicios'.toLowerCase())
    {
    	$('#tListaProduccionServiciosV').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacionNE'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'confirmacionNominaEmpleados'.toLowerCase())
    {
    	$('#tListaNominaEmpleadosV').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacionPH'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'confirmacionProgramacionHoras'.toLowerCase())
    {
    	$('#tListaProgramacionHoras').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacionDS'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'confirmacionDistribucionSuministros'.toLowerCase())
    {
    	$('#tListaDistribucionSuministros').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacionPD'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'confirmacionProduccionDistribuida'.toLowerCase())
    {
    	$('#tListaProduccionDistribuida').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'validarImportacionDGG'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'confirmacionDistribucionGastoGeneral'.toLowerCase())
    {
    	$('#tListaDistribucionGastoGeneral').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarCentroCosto'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'listarUnidadProduccion'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'listarItemCosto'.toLowerCase())
    {
    	$('#tListaCentroCosto').dataTable({
            searching: true,
            paging:         true,
            ordering:       false,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarHospitales'.toLowerCase())
    {
    	$('#tListaHospitales').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
             "scrollX": false,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
            "drawCallback": function( settings ) {
		        feather.replace();
		        $('[data-toggle="tooltip"]').tooltip();
		    },
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
        feather.replace();
    }
    
    
 }