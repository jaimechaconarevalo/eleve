 $(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace();

  $('#tListaRespuestas').on('click', '.eliminarRespuesta', function(e) {

        var ordenEdificio = $(e.currentTarget).data('id');

        var tabla_A = $(document.getElementById("tListaRespuestas")).dataTable();
        var edificios_empresa = tabla_A.fnGetData();

        var encontrado = edificios_empresa.findIndex(item => $(item[1]).text() === ordenEdificio.toString());
        if (encontrado != -1) {
            delete edificios_empresa.splice(encontrado, 1);
            for (var i = 0; i < edificios_empresa.length; i++) {
                edificios_empresa[i][1] = '<p class="texto-pequenio">'.concat((i+1), '</p>');
                edificios_empresa[i][5] = '<a class="trash eliminarRespuesta" href="#" data-id="'.concat((i+1), '" ><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>');
            }

            $(".tooltip").tooltip("hide");
            var table = $('#tListaRespuestas').DataTable();
            table.destroy();
            $('#tListaRespuestas').DataTable({
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
                "data":  edificios_empresa,
                searching: true,
                paging:         true,
                ordering:       true,
                info:           true,
                //select: true,
                "order": [[ 1, "asc" ]],
                //paging:         false,
                //ordering:       false,
                //info:           true,
                //"scrollY": true,
                //scrollY:        "300px",
                //scrollX:        true,
                //scrollCollapse: true,
                //paging:         false,
                //fixedColumns:   true,
                /*"columnDefs": [
                    { className: "texto-pequenio text-center align-middle registro", "targets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
                ],*/
                "aoColumnDefs" :  [
                            { 'visible': false, 'targets': [0] },
                            {"aTargets" : [0,1,2,3,4], "sClass":  "text-center align-middle registro"},
                            {"aTargets" : [5], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                            //
                            //{"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                          ],
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

        }
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();

    });


    $("#formAgregarRespuesta").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#formAgregarRespuesta").validate();
        if ($("#formAgregarRespuesta").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("formAgregarRespuesta");
                var formData = new FormData(form);

                var tabla_A = $(document.getElementById("tListaRespuestas")).dataTable();
                var respuestas_preguntas = tabla_A.fnGetData();
                var id = '<p class="texto-pequenio"></p>';
                var orden = '<p class="texto-pequenio">'.concat((respuestas_preguntas.length+1), '</p>');
                var nombre = '<p class="texto-pequenio">'.concat(formData.get('inputNombreE'), '</p>');                
                var observacion = '<p class="texto-pequenio">'.concat(formData.get('inputObservacionesE'), '</p>');
                var fecha_creacion = '<p class="texto-pequenio">'.concat(new Date().toLocaleString(), '</p>');
                var boton = '<a class="trash eliminarRespuesta" href="#" data-id="'.concat((respuestas_preguntas.length+1), '" ><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>');

                respuestas_preguntas.push([id, orden, nombre, observacion, fecha_creacion, boton]);
                tabla_A.fnDestroy();
                
                $('#tListaRespuestas').DataTable({
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
                    "data":  respuestas_preguntas,
                    searching: true,
                    paging:         true,
                    ordering:       true,
                    info:           true,
                    //select: true,
                    "order": [[ 1, "asc" ]],
                    //paging:         false,
                    //ordering:       false,
                    //info:           true,
                    //"scrollY": true,
                    //scrollY:        "300px",
                    //scrollX:        true,
                    //scrollCollapse: true,
                    //paging:         false,
                    //fixedColumns:   true,
                    /*"columnDefs": [
                        { className: "texto-pequenio text-center align-middle registro", "targets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
                    ],*/
                    "aoColumnDefs" :  [
                                { 'visible': false, 'targets': [0] },
                                {"aTargets" : [0,1,2,3, 4], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [5], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                //
                                //{"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                              ],
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

                feather.replace();
                $('[data-toggle="tooltip"]').tooltip();
                /*document.getElementById("formAgregarRespuesta").reset();
                var validator = $("#formAgregarRespuesta").validate();
                validator.resetForm();*/
                $('#modalAgregarRespuesta').modal('hide');
            }else{
                var loader = document.getElementById("loader");
                loader.setAttribute('hidden', '');
            }
        }else{
            var loader = document.getElementById("loader");
            loader.setAttribute('hidden', '');
        }
        loader.setAttribute('hidden', '');
        feather.replace();
    });

    

    $('#modalAgregarRespuesta').on('show.bs.modal', function (event) {
        $("#formAgregarRespuesta").validate().resetForm();
        document.getElementById("formAgregarRespuesta").reset();
        var validator = $("#formAgregarRespuesta").validate();
        validator.resetForm();
    })

    $("#formAgregarRespuesta").validate({
        errorClass:'invalid-feedback',
        errorElement:'span',
        highlight: function(element, errorClass, validClass) {
          $(element).addClass("is-invalid").removeClass("invalid-feedback");
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass("is-invalid");
        },
        rules: {
          inputRolE: {
            required: true,
            minlength: 1,
            maxlength: 100
          },
          inputRutE: {
            required: true,
            minlength: 1,
            maxlength: 12
          },
          inputNombreE: {
            required: true,
            minlength: 1,
            maxlength: 100
          },
          inputDireccionE: {
            required: true,
            minlength: 1,
            maxlength: 100
          },
          inputObservacionesE: {
            required: false,
            maxlength: 300
          }
        },
        messages:{
          inputNombreE: {
            required: "Ingrese un Nombre.",
            minlength: "Ingrese un Nombre",
            maxlength: "El Nombre no puede superar los {0} caracteres."
          },
          inputObservacionesE: {
            maxlength: "La Observacion tiene que ser menor o igual a {0} caracteres."
          }
        }
    });

  $("#agregarPregunta").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarPregunta").validate();
        if ($("#agregarPregunta").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarPregunta");
                var formData = new FormData(form);

                var tabla_rp = $(document.getElementById('tListaRespuestas')).dataTable();
                var respuestas_preguntas = tabla_rp.fnGetData();

                var respuestas_preguntas_a = [];

                for (var i = 0; i < respuestas_preguntas.length; i++) {

                    /*respuestas_preguntas_a[i][0] = $(respuestas_preguntas[i][0])[0].innerText;
                    respuestas_preguntas_a[i][1] = $(respuestas_preguntas[i][1])[0].innerText;
                    respuestas_preguntas_a[i][2] = $(respuestas_preguntas[i][2])[0].innerText;
                    respuestas_preguntas_a[i][3] = $(respuestas_preguntas[i][3])[0].innerText;
                    respuestas_preguntas_a[i][4] = $(respuestas_preguntas[i][4])[0].innerText;*/
                    respuestas_preguntas_a[i] = [$(respuestas_preguntas[i][0])[0].innerText, $(respuestas_preguntas[i][1])[0].innerText, $(respuestas_preguntas[i][2])[0].innerText, $(respuestas_preguntas[i][3])[0].innerText, $(respuestas_preguntas[i][4])[0].innerText]
                }

                formData.append("respuestas_preguntas", JSON.stringify(respuestas_preguntas_a));


                var baseurl = (window.origin + '/Pregunta/agregarPregunta');
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
                            $("#parrafoMP").append(data.mensaje);
                            $('#modalMensajePregunta').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarPregunta").reset();
                            var table = $('#tListaRespuestas').DataTable();
                            table.clear().draw();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append('Ha ocurrido un error al intentar agregar la Pregunta.');
                            $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalMensajePregunta').modal({
                              show: true
                            });
                            feather.replace();
                        }
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
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
        loader.setAttribute('hidden', '');
        feather.replace();
    });

    $("#agregarPregunta").validate({
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

    $("#modalMensajePregunta").on("hidden.bs.modal", function () {
        var pagina = window.location.pathname.split('/')[2].toLowerCase();
        if (pagina == "modificarpregunta") {
            location.reload();
        }
    });

});



window.onload = function () {
    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarPreguntas'.toLowerCase())
    {
        $('#tListaPreguntas').dataTable({
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

    if(window.location.pathname.split('/')[2].toLowerCase() == 'modificarPregunta'.toLowerCase())
    {

        var idPregunta = document.getElementById('inputIdPregunta').value;
        if (idPregunta) {
            var baseurl =  window.origin + '/Pregunta/json_listarRespuestasPregunta';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {idPregunta: idPregunta},
                success: function(data) {
                    if (data) {

                        $('#tListaRespuestas').DataTable({
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
                            "data":  data.respuestas_pregunta,
                            searching: true,
                            paging:         true,
                            ordering:       true,
                            info:           true,
                            //select: true,
                            "order": [[ 1, "asc" ]],
                            //paging:         false,
                            //ordering:       false,
                            //info:           true,
                            //"scrollY": true,
                            //scrollY:        "300px",
                            //scrollX:        true,
                            //scrollCollapse: true,
                            //paging:         false,
                            //fixedColumns:   true,
                            /*"columnDefs": [
                                { className: "texto-pequenio text-center align-middle registro", "targets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
                            ],*/
                            "aoColumnDefs" :  [
                                        { 'visible': false, 'targets': [0] },
                                        {"aTargets" : [0,1,2,3,4], "sClass":  "text-center align-middle registro"},
                                        {"aTargets" : [5], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                        //
                                        //{"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                                      ],
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
                        feather.replace();
                    }
                }
            });
        }
    }
}