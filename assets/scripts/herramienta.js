 $(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace();

  $("#agregarHerramienta").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarHerramienta").validate();
        if ($("#agregarHerramienta").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarHerramienta");
                var formData = new FormData(form);

                var baseurl = (window.origin + '/Herramienta/agregarHerramienta');
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
                            $('#modalMensajeHerramienta').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarHerramienta").reset();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append('Ha ocurrido un error al intentar agregar la Herramienta.');
                            $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalMensajeHerramienta').modal({
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

    $("#agregarHerramienta").validate({
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

    $("#modalMensajeHerramienta").on("hidden.bs.modal", function () {
        var pagina = window.location.pathname.split('/')[2].toLowerCase();
        if (pagina == "modificarherramienta") {
            location.reload();
        }
    });

    $('#eliminarHerramienta').click(function(e){
    idHerramienta = $('#tituloEP').data('idherramienta');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Herramienta/eliminarHerramienta';

        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        data: {idHerramienta: idHerramienta},
        success: function(data) {
        if (data)
        {
            if(data == '1')
            {
              $('#tituloMP').empty();
              $("#parrafoMP").empty();
              $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
              $("#parrafoMP").append('Se ha eliminado exitosamente la Herramienta.');
              $('#modalEliminarHerramienta').modal('hide');
               listarHerramientas();
              $('#modalMensajeHerramienta').modal({
                show: true
              });
            }else{
              $('#tituloMP').empty();
              $("#parrafoMP").empty();
              $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
              $("#parrafoMP").append('Ha ocurrido un error al intentar la Herramienta.');
              $('#modalEliminarHerramienta').modal('hide');
              listarHerramientas();
              $('#modalMensajeHerramienta').modal({
                show: true
              });
            }
            feather.replace()
            $('[data-toggle="tooltip"]').tooltip()
            }
        }
        });
    });

    function listarHerramientas()
    {
        var baseurl = window.origin + '/Herramienta/listarHerramientas';
        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        //data: {},
        success: function(data) {
        if (data)
        {
            var myJSON= JSON.stringify(data);
            myJSON = JSON.parse(myJSON);
            $('#tablaListaHerramientas').html(myJSON.table_herramientas);
            feather.replace()
            $('#tListaHerramientas').dataTable({
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
            $('[data-toggle="tooltip"]').tooltip();
              //loader.setAttribute('hidden', '');
          }
        }
        });
    }

    $('#modalEliminarHerramienta').on('show.bs.modal', function(e) {
        //get data-id attribute of the clicked element
        var idHerramienta = $(e.relatedTarget).data('id');
        var nombreHerramienta = $(e.relatedTarget).data('herramienta');
        //populate the textbox
        $("#tituloEP").text('Eliminar Herramienta N° ' + idHerramienta);
        $("#parrafoEP").text('¿Estás seguro que deseas eliminar la Herramienta N° ' + idHerramienta + ', "' + nombreHerramienta + '"?');

        $("#tituloEP").removeData("idherramienta");
        $("#tituloEP").attr("data-idherramienta", idHerramienta);
        //$("#tituloEE").removeData("nombreequipo");
        //$("#tituloEE").attr("data-nombreEquipo", nombreEquipo);
    });

});



window.onload = function () {
    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarHerramientas'.toLowerCase())
    {
        $('#tListaHerramientas').dataTable({
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