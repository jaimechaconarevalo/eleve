 $(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace();

  $("#agregarEmpresa").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarEmpresa").validate();
        if ($("#agregarEmpresa").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarEmpresa");
                var formData = new FormData(form);

                var tabla_ee = $(document.getElementById('tListaEdificios')).dataTable();
                var edificios_empresa = tabla_ee.fnGetData();

                for (var i = 0; i < edificios_empresa.length; i++) {
                    edificios_empresa[i][0] = $(edificios_empresa[i][0])[0].innerText;
                    edificios_empresa[i][1] = $(edificios_empresa[i][1])[0].innerText;
                    edificios_empresa[i][2] = $(edificios_empresa[i][2])[0].innerText;
                    edificios_empresa[i][3] = $(edificios_empresa[i][3])[0].innerText;
                    edificios_empresa[i][4] = $(edificios_empresa[i][4])[0].innerText;
                    edificios_empresa[i][5] = $(edificios_empresa[i][5])[0].innerText;
                    edificios_empresa[i][6] = $(edificios_empresa[i][6])[0].innerText;
                    edificios_empresa[i][7] = $(edificios_empresa[i][7])[0].innerText;
                }

                formData.append("edificios_empresa", JSON.stringify(edificios_empresa));

                var baseurl = (window.origin + '/Empresa/agregarEmpresa');
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
                            $('#modalMensajeEmpresa').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarEmpresa").reset();
                            var table = $('#tListaEdificios').DataTable();
                            table.clear().draw();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append('Ha ocurrido un error al intentar agregar la Empresa.');
                            $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalMensajeEmpresa').modal({
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

    $.validator.addMethod("customemail", 
        function(value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
    );

    $("#agregarEmpresa").validate({
        errorClass:'invalid-feedback',
        errorElement:'span',
        highlight: function(element, errorClass, validClass) {
          $(element).addClass("is-invalid").removeClass("invalid-feedback");
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass("is-invalid");
        },
        rules: {
          inputRut: {
            required: true,
            minlength: 1,
            maxlength: 12
          },
          inputRazonSocial: {
            required: true,
            minlength: 1,
            maxlength: 300
          },
          inputEmail: {
            required: false,
            customemail: true,
            minlength: 1,
            maxlength: 254
          },
          inputObservaciones: {
            required: false,
            maxlength: 300
          }
        },
        messages:{
          inputRut: {
            required: "Ingrese un R.U.T.",
            minlength: "Ingrese un R.U.T.",
            maxlength: "El R.U.T. no puede superar los {0} caracteres."
          },
          inputRazonSocial: {
            required: "Ingrese una Razón Social.",
            minlength: "Ingrese una Razón Social.",
            maxlength: "La Razón Social no puede superar los {0} caracteres."
          },
          inputEmail: {
            required: "Ingrese un Email.",
            minlength: "Ingrese un Email",
            maxlength: "El Email no puede superar los {0} caracteres.",
            //email: "Ingrese un Email válido.",
            customemail: "el Emial no es valido"
          },
          inputObservaciones: {
            maxlength: "La Observacion tiene que ser menor o igual a {0} caracteres."
          }
        }
    });

    $('#tListaEdificios').on('click', '.eliminarEdificio', function(e) {

        var ordenEdificio = $(e.currentTarget).data('id');

        var tabla_A = $(document.getElementById("tListaEdificios")).dataTable();
        var edificios_empresa = tabla_A.fnGetData();

        var encontrado = edificios_empresa.findIndex(item => $(item[1]).text() === ordenEdificio.toString());
        if (encontrado != -1) {
            delete edificios_empresa.splice(encontrado, 1);
            for (var i = 0; i < edificios_empresa.length; i++) {
                edificios_empresa[i][1] = '<p class="texto-pequenio">'.concat((i+1), '</p>');
                edificios_empresa[i][8] = '<a class="trash eliminarEdificio" href="#" data-id="'.concat((i+1), '" ><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>');
            }

            $(".tooltip").tooltip("hide");
            var table = $('#tListaEdificios').DataTable();
            table.destroy();
            $('#tListaEdificios').DataTable({
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
                /*"columnDefs": [
                    { className: "texto-pequenio text-center align-middle registro", "targets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
                ],*/
                "aoColumnDefs" :  [
                            { 'visible': false, 'targets': [0] },
                            {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                            {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
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


    $("#formAgregarEdificio").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#formAgregarEdificio").validate();
        if ($("#formAgregarEdificio").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("formAgregarEdificio");
                var formData = new FormData(form);

                var tabla_A = $(document.getElementById("tListaEdificios")).dataTable();
                var edificios_empresa = tabla_A.fnGetData();
                var id = '<p class="texto-pequenio"></p>';
                var orden = '<p class="texto-pequenio">'.concat((edificios_empresa.length+1), '</p>');
                var rol = '<p class="texto-pequenio">'.concat(formData.get('inputRolE'), '</p>');
                var rut = '<p class="texto-pequenio">'.concat(formData.get('inputRutE'), '</p>');
                var nombre = '<p class="texto-pequenio">'.concat(formData.get('inputNombreE'), '</p>');
                var direccion = '<p class="texto-pequenio">'.concat(formData.get('inputDireccionE'), '</p>');
                var observacion = '<p class="texto-pequenio">'.concat(formData.get('inputObservacionesE'), '</p>');
                var fecha_creacion = '<p class="texto-pequenio">'.concat(new Date().toLocaleString(), '</p>');
                var boton = '<a class="trash eliminarEdificio" href="#" data-id="'.concat((edificios_empresa.length+1), '" ><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>');

                edificios_empresa.push([id, orden, rol, rut, nombre, direccion, observacion, fecha_creacion, boton]);
                tabla_A.fnDestroy();
                
                $('#tListaEdificios').DataTable({
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
                    /*"columnDefs": [
                        { className: "texto-pequenio text-center align-middle registro", "targets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
                    ],*/
                    "aoColumnDefs" :  [
                                { 'visible': false, 'targets': [0] },
                                {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
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
                /*document.getElementById("formAgregarEdificio").reset();
                var validator = $("#formAgregarEdificio").validate();
                validator.resetForm();*/
                $('#modalAgregarEdificio').modal('hide');
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

    

    $('#modalAgregarEdificio').on('show.bs.modal', function (event) {
        $("#formAgregarEdificio").validate().resetForm();
        document.getElementById("formAgregarEdificio").reset();
        var validator = $("#formAgregarEdificio").validate();
        validator.resetForm();
    })

    $("#formAgregarEdificio").validate({
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
          inputRolE: {
            required: "Ingrese un Rol.",
            minlength: "Ingrese un Rol.",
            maxlength: "El Rol no puede superar los {0} caracteres."
          },
          inputRutE: {
            required: "Ingrese un R.U.T.",
            minlength: "Ingrese un R.U.T.",
            maxlength: "El R.U.T. no puede superar los {0} caracteres."
          },
          inputNombreE: {
            required: "Ingrese un Nombre.",
            minlength: "Ingrese un Nombre",
            maxlength: "El Nombre no puede superar los {0} caracteres."
          },
          inputDireccionE: {
            required: "Ingrese una Dirección.",
            minlength: "Ingrese una Dirección.",
            maxlength: "La Dirección no puede superar los {0} caracteres."
          },
          inputObservacionesE: {
            maxlength: "La Observacion tiene que ser menor o igual a {0} caracteres."
          }
        }
    });


    $("#modalMensajeEmpresa").on("hidden.bs.modal", function () {
        var pagina = window.location.pathname.split('/')[2].toLowerCase();
        if (pagina == "modificarempresa") {
            location.reload();
        }
    });

});



window.onload = function () {
    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarEmpresas'.toLowerCase())
    {
        $('#tListaEmpresas').dataTable({
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

    if(window.location.pathname.split('/')[2].toLowerCase() == 'agregarEmpresa'.toLowerCase())
    {
        $('#tListaEdificios').dataTable({
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
            /*"columnDefs": [
                        { className: "texto-pequenio text-center align-middle registro", "targets": [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
            ],*/
            "aoColumnDefs" :  [
                            {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                            {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                            //{"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],
            "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }],
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