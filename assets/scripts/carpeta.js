 $(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace();

  $("#agregarCarpeta").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarCarpeta").validate();
        if ($("#agregarCarpeta").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarCarpeta");
                var formData = new FormData(form);

                var baseurl = (window.origin + '/Carpeta/agregarCarpeta');
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
                            $('#modalMensajeCarpeta').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarCarpeta").reset();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append('Ha ocurrido un error al intentar agregar la Carpeta.');
                            $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalMensajeCarpeta').modal({
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

    $("#agregarCarpeta").validate({
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

    $("#modalMensajeCarpeta").on("hidden.bs.modal", function () {
        var pagina = window.location.pathname.split('/')[2].toLowerCase();
        if (pagina == "modificarcarpeta") {
            location.reload();
        }
    });

    $('#eliminarCarpeta').click(function(e){
    idCarpeta = $('#tituloEP').data('idcarpeta');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Carpeta/eliminarCarpeta';

        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        data: {idCarpeta: idCarpeta},
        success: function(data) {
        if (data)
        {
            if(data == '1')
            {
              $('#tituloMP').empty();
              $("#parrafoMP").empty();
              $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
              $("#parrafoMP").append('Se ha eliminado exitosamente la Carpeta.');
              $('#modalEliminarCarpeta').modal('hide');
               listarCarpetas();
              $('#modalMensajeCarpeta').modal({
                show: true
              });
            }else{
              $('#tituloMP').empty();
              $("#parrafoMP").empty();
              $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
              $("#parrafoMP").append('Ha ocurrido un error al intentar la Carpeta.');
              $('#modalEliminarCarpeta').modal('hide');
              listarCarpetas();
              $('#modalMensajeCarpeta').modal({
                show: true
              });
            }
            feather.replace()
            $('[data-toggle="tooltip"]').tooltip()
            }
        }
        });
    });

    function listarCarpetas()
    {
        var baseurl = window.origin + '/Carpeta/listarCarpetas';
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
            $('#tablaListaCarpetas').html(myJSON.table_carpetas);
            feather.replace()
            $('#tListaCarpetas').dataTable({
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

    $('#modalEliminarCarpeta').on('show.bs.modal', function(e) {
        //get data-id attribute of the clicked element
        var idCarpeta = $(e.relatedTarget).data('id');
        var nombreCarpeta = $(e.relatedTarget).data('carpeta');
        //populate the textbox
        $("#tituloEP").text('Eliminar Carpeta N° ' + idCarpeta);
        $("#parrafoEP").text('¿Estás seguro que deseas eliminar la Carpeta N° ' + idCarpeta + ', "' + nombreCarpeta + '"?');

        $("#tituloEP").removeData("idcarpeta");
        $("#tituloEP").attr("data-idcarpeta", idCarpeta);
        //$("#tituloEE").removeData("nombreequipo");
        //$("#tituloEE").attr("data-nombreEquipo", nombreEquipo);
    });

});



window.onload = function () {
    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarCarpetas'.toLowerCase())
    {
        $('#tListaCarpetas').dataTable({
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