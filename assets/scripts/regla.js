$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace();

  $("#agregarRegla").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarRegla").validate();
        if ($("#agregarRegla").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarRegla");
                var formData = new FormData(form);
                var tabla_ccr = $(document.getElementById('tListaCCA')).dataTable();
                var centro_costos_regla = tabla_ccr.fnGetData();
                formData.append("centro_costos_regla", JSON.stringify(centro_costos_regla));

                var tabla_gccr = $(document.getElementById('tListaGCCA')).dataTable();
                var grupo_centro_costos_regla = tabla_gccr.fnGetData();
                formData.append("grupo_centro_costos_regla", JSON.stringify(grupo_centro_costos_regla));

                var baseurl = (window.origin + '/Regla/agregarRegla');
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
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
                            $("#parrafoMP").append(data['mensaje']);
                            if(!$("#inputIdRegla").val())
                            {
                                $("#agregarRegla")[0].reset();
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

                                var grupo_centro_costos = JSON.parse(localStorage.getItem("grupo_centro_costos"));
                                if (grupo_centro_costos != null && grupo_centro_costos.length > 0) {
                                    var tabla_SA = $(document.getElementById("tListaGCCSA")).dataTable();
                                    tabla_SA.fnDestroy();
                                    $('#tListaGCCSA').DataTable( {
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
                                    "data":  grupo_centro_costos,
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

                                var tabla_gcc_a = $(document.getElementById('tListaGCCA')).dataTable();
                                tabla_gcc_a.fnClearTable();
                                localStorage.myPageDataArr = undefined;
                                localStorage.removeItem('grupo_centro_costos_seleccionados');
                                localStorage.removeItem('grupo_centro_costos_a_seleccionados');
                                    
                                }
                            }
                            loader.setAttribute('hidden', '');
                            $('#modalMensajeRegla').modal({
                              show: true
                            });
                            feather.replace()
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append(data['mensaje']);
                            loader.setAttribute('hidden', '');
                            $('#modalMensajeRegla').modal({
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

    $("#agregarRegla").validate({
        errorClass:'invalid-feedback',
        errorElement:'span',
        highlight: function(element, errorClass, validClass) {
          $(element).addClass("is-invalid").removeClass("invalid-feedback");
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass("is-invalid");
        },
        rules: {
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
                //delete reglas_usuario[index];
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

    $('#tListaGCCSA').on('click', 'tbody tr', function(e) {
        var id_grupo_centro_costo = this.firstElementChild.textContent;
        var codigo_grupo_centro_costo = this.children[1].textContent;
        var nombre_grupo_centro_costo = this.children[2].textContent;
        if (this.classList.contains('table-active')) {
            $(this).removeClass('table-active');
            var grupo_centro_costos_seleccionados = JSON.parse(localStorage.getItem("grupo_centro_costos_seleccionados"));
            if (grupo_centro_costos_seleccionados != null && grupo_centro_costos_seleccionados.length > 0) {
                var indexCC = grupo_centro_costos_seleccionados.findIndex(c => c[0] === id_grupo_centro_costo);
                //delete reglas_usuario[index];
                delete grupo_centro_costos_seleccionados.splice(indexCC, 1);
                localStorage.setItem("grupo_centro_costos_seleccionados", JSON.stringify(grupo_centro_costos_seleccionados));
            }
        }else{
            $(this).addClass('table-active');//.siblings().removeClass('table-active');
            var grupo_centro_costos_seleccionados = JSON.parse(localStorage.getItem("grupo_centro_costos_seleccionados"));
            if (grupo_centro_costos_seleccionados != null && grupo_centro_costos_seleccionados.length > 0) {
                grupo_centro_costos_seleccionados.push([id_grupo_centro_costo, codigo_grupo_centro_costo, nombre_grupo_centro_costo]);
                localStorage.setItem("grupo_centro_costos_seleccionados", JSON.stringify(grupo_centro_costos_seleccionados));
            }else{
                var grupo_centro_costos_seleccionados = [];
                grupo_centro_costos_seleccionados.push([id_grupo_centro_costo, codigo_grupo_centro_costo, nombre_grupo_centro_costo]);
                localStorage.setItem("grupo_centro_costos_seleccionados", JSON.stringify(grupo_centro_costos_seleccionados));
            }
        }
    });

    $('#tListaGCCA').on('click', 'tbody tr', function(e) {
        var id_grupo_centro_costo = this.firstElementChild.textContent;
        var codigo_grupo_centro_costo = this.children[1].textContent;
        var nombre_grupo_centro_costo = this.children[2].textContent;
        if (this.classList.contains('table-active')) {
            $(this).removeClass('table-active');
            var grupo_centro_costos_a_seleccionados = JSON.parse(localStorage.getItem("grupo_centro_costos_a_seleccionados"));
            if (grupo_centro_costos_a_seleccionados != null && grupo_centro_costos_a_seleccionados.length > 0) {
                var indexCC = grupo_centro_costos_a_seleccionados.findIndex(c => c[0] === id_grupo_centro_costo);
                //delete reglas_usuario[index];
                delete grupo_centro_costos_a_seleccionados.splice(indexCC, 1);
                localStorage.setItem("grupo_centro_costos_a_seleccionados", JSON.stringify(grupo_centro_costos_a_seleccionados));
            }
        }else{
            $(this).addClass('table-active');//.siblings().removeClass('table-active');
            var grupo_centro_costos_a_seleccionados = JSON.parse(localStorage.getItem("grupo_centro_costos_a_seleccionados"));
            if (grupo_centro_costos_a_seleccionados != null && grupo_centro_costos_a_seleccionados.length > 0) {
                grupo_centro_costos_a_seleccionados.push([id_grupo_centro_costo, codigo_grupo_centro_costo, nombre_grupo_centro_costo]);
                localStorage.setItem("grupo_centro_costos_a_seleccionados", JSON.stringify(grupo_centro_costos_a_seleccionados));
              }else{
                var grupo_centro_costos_a_seleccionados = [];
                grupo_centro_costos_a_seleccionados.push([id_grupo_centro_costo, codigo_grupo_centro_costo, nombre_grupo_centro_costo]);
                localStorage.setItem("grupo_centro_costos_a_seleccionados", JSON.stringify(grupo_centro_costos_a_seleccionados));
              }
        }
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

    $('#asociarGCC').on('click', function(event) {
        var grupo_centro_costos_seleccionados = JSON.parse(localStorage.getItem("grupo_centro_costos_seleccionados"));
        if (grupo_centro_costos_seleccionados != null && grupo_centro_costos_seleccionados.length > 0) {
            var tabla_A = $(document.getElementById("tListaGCCA")).dataTable();
            var grupo_centro_costos_A = tabla_A.fnGetData();
            if (grupo_centro_costos_A != null && grupo_centro_costos_A.length > 0) {

                for (var i = 0; i < grupo_centro_costos_seleccionados.length; i++) {
                    grupo_centro_costos_A.push(grupo_centro_costos_seleccionados[i]);
                }
            }else{
                grupo_centro_costos_A = grupo_centro_costos_seleccionados;
            }
            tabla_A.fnDestroy();
            $('#tListaGCCA').DataTable( {
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
                "data":  grupo_centro_costos_A,
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

            var tabla_gcc_sa = $(document.getElementById('tListaGCCSA')).dataTable();
            var grupo_centro_costos_SA = tabla_gcc_sa.fnGetData();
            if (grupo_centro_costos_SA != null && grupo_centro_costos_SA.length > 0) {
                for (var i = 0; i < grupo_centro_costos_seleccionados.length; i++) {
                    var indexCC = grupo_centro_costos_SA.findIndex(c => c[0] === grupo_centro_costos_seleccionados[i][0]);
                    delete grupo_centro_costos_SA.splice(indexCC, 1);
                }
                tabla_gcc_sa.fnDestroy();
                $('#tListaGCCSA').DataTable( {
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
                    
                    "data": grupo_centro_costos_SA,
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
                localStorage.removeItem('grupo_centro_costos_seleccionados');
                localStorage.removeItem('grupo_centro_costos_a_seleccionados');
            }
        }else{
            alert("debe seleccionar al menos 1 Centro de Costo");
        }
    });


    $('#desasociarGCC').on('click', function(event) {
        var grupo_centro_costos_a_seleccionados = JSON.parse(localStorage.getItem("grupo_centro_costos_a_seleccionados"));
        if (grupo_centro_costos_a_seleccionados != null && grupo_centro_costos_a_seleccionados.length > 0) {
            var tabla_A = $(document.getElementById("tListaGCCSA")).dataTable();
            var grupo_centro_costos_SA = tabla_A.fnGetData();
            if (grupo_centro_costos_SA != null && grupo_centro_costos_SA.length > 0) {
                for (var i = 0; i < grupo_centro_costos_a_seleccionados.length; i++) {
                    grupo_centro_costos_SA.push(grupo_centro_costos_a_seleccionados[i]);
                }
            }else{
                grupo_centro_costos_SA = grupo_centro_costos_a_seleccionados;
            }
            tabla_A.fnDestroy();
            $('#tListaGCCSA').DataTable( {
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
                "data":  grupo_centro_costos_SA,
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
            var tabla_gcc_a = $(document.getElementById("tListaGCCA")).dataTable();
            grupo_centro_costos_A = tabla_gcc_a.fnGetData();
            if (grupo_centro_costos_A != null && grupo_centro_costos_A.length > 0) {
                for (var i = 0; i < grupo_centro_costos_a_seleccionados.length; i++) {
                    var indexCC = grupo_centro_costos_A.findIndex(c => c[0] === grupo_centro_costos_a_seleccionados[i][0]);
                    delete grupo_centro_costos_A.splice(indexCC, 1);
                }
                tabla_gcc_a.fnDestroy();
                $('#tListaGCCA').DataTable( {
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
                    "data": grupo_centro_costos_A,
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
                localStorage.removeItem('grupo_centro_costos_a_seleccionados');
                localStorage.removeItem('grupo_centro_costos_seleccionados');
            }
        }else{
            alert("debe seleccionar al menos 1 Grupo Centro de Costo");
        }
    });


    $('#asociarGCCT').on('click', function(event) {
        var grupo_centro_costos = JSON.parse(localStorage.getItem("grupo_centro_costos"));
        if (grupo_centro_costos != null && grupo_centro_costos.length > 0) {
            var tabla_A = $(document.getElementById("tListaGCCA")).dataTable();
            tabla_A.fnDestroy();
            $('#tListaGCCA').DataTable( {
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
                "data":  grupo_centro_costos,
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

            var tabla_gcc_sa = $(document.getElementById('tListaGCCSA')).dataTable();
            tabla_gcc_sa.fnClearTable();
            localStorage.myPageDataArr = undefined;
            localStorage.removeItem('grupo_centro_costos_seleccionados');
            localStorage.removeItem('grupo_centro_costos_a_seleccionados');
        }else{
            alert("debe seleccionar al menos 1 Centro de Costo");
        }
    });

    $('#desasociarGCCT').on('click', function(event) {
        var grupo_centro_costos = JSON.parse(localStorage.getItem("grupo_centro_costos"));
        if (grupo_centro_costos != null && grupo_centro_costos.length > 0) {
            var tabla_SA = $(document.getElementById("tListaGCCSA")).dataTable();
            tabla_SA.fnDestroy();
            $('#tListaGCCSA').DataTable( {
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
                "data":  grupo_centro_costos,
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

            var tabla_gcc_a = $(document.getElementById('tListaGCCA')).dataTable();
            tabla_gcc_a.fnClearTable();
            localStorage.myPageDataArr = undefined;
            localStorage.removeItem('grupo_centro_costos_seleccionados');
            localStorage.removeItem('grupo_centro_costos_a_seleccionados');
            
        }else{
            alert("debe seleccionar al menos 1 Grupo Centro de Costo");
        }
    });
});

window.onload = function () {
    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarReglas'.toLowerCase())
    {
        $('#tListaReglas').dataTable({
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
    }

    
    if(window.location.pathname.split('/')[2].toLowerCase() == 'agregarRegla'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'modificarRegla'.toLowerCase())
    {
        var idRegla = document.getElementById('inputIdRegla').value;
        var baseurl =  window.origin + '/Regla/json_listarCentroCostos';
        jQuery.ajax({
            type: "POST",
            url: baseurl,
            dataType: 'json',
            data: {idRegla: idRegla},
            success: function(data) {
                if (data) {
                    var centro_costos = JSON.parse(localStorage.getItem("centro_costos"));
                    if (centro_costos != null && centro_costos.length > 0) {
                      localStorage.setItem("centro_costos", JSON.stringify(data.data));
                    }else{
                      localStorage.setItem("centro_costos", JSON.stringify(data.data));
                    }

                    if (data.data_cc_r && data.data_cc_r.length > 0) {
                        var centro_costos_sa =  data.data;
                        for (var i = 0; i < data.data_cc_r.length; i++) {
                            var indexCC = centro_costos_sa.findIndex(c => c[0] === data.data_cc_r[i][0]);
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
                            "data": data.data_cc_r,
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

        var baseurl_2 =  window.origin + '/Regla/json_listarGrupoCentroCostos';
        jQuery.ajax({
            type: "POST",
            url: baseurl_2,
            dataType: 'json',
            data: {idRegla: idRegla},
            success: function(data) {
                if (data) {
                    var grupo_centro_costos = JSON.parse(localStorage.getItem("grupo_centro_costos"));
                    if (grupo_centro_costos != null && grupo_centro_costos.length > 0) {
                      localStorage.setItem("grupo_centro_costos", JSON.stringify(data.data));
                    }else{
                      localStorage.setItem("grupo_centro_costos", JSON.stringify(data.data));
                    }

                    if (data.data_gcc_r && data.data_gcc_r.length > 0) {
                        var grupo_centro_costos_sa =  data.data;
                        for (var i = 0; i < data.data_gcc_r.length; i++) {
                            var indexCC = grupo_centro_costos_sa.findIndex(c => c[0] === data.data_gcc_r[i][0]);
                            delete grupo_centro_costos_sa.splice(indexCC, 1);
                        }

                        $('#tListaGCCA').DataTable( {
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
                            "data": data.data_gcc_r,
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

                        $('#tListaGCCSA').DataTable( {
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
                            "data": grupo_centro_costos_sa,
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
                    
                        $('#tListaGCCSA').DataTable( {
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

                        $('#tListaGCCA').DataTable( {
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
}