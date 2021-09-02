 $(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace();

  $("#agregarCategoria").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarCategoria").validate();
        if ($("#agregarCategoria").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarCategoria");
                var formData = new FormData(form);

                var baseurl = (window.origin + '/Categoria/agregarCategoria');
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
                            $('#modalMensajeCategoria').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarCategoria").reset();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append('Ha ocurrido un error al intentar agregar la Categoria.');
                            $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalMensajeCategoria').modal({
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

    $("#agregarCategoria").validate({
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

    $('#modalEliminarCategoria').on('show.bs.modal', function(e) {
        var idCategoria = $(e.relatedTarget).data('id');
        var categoria = $(e.relatedTarget).data('categoria');
        $("#tituloEC").text('Eliminar Categoria ID: ' + idCategoria);
        $("#parrafoEC").text('¿Estás seguro que deseas eliminar la Categoria ID: ' + idCategoria + ', Nombre: "' + categoria + '"?');
        $("#tituloEC").removeData("idcategoria");
        $("#tituloEC").attr("data-idcategoria", idCategoria);
    });

    $('#eliminarCategoria').click(function(e){
        idCategoria = document.getElementById('tituloEC').dataset.idcategoria;
        var baseurl = window.origin + '/Categoria/eliminarCategoria';
        jQuery.ajax({
            type: "POST",
            url: baseurl,
            dataType: 'json',
            data: {idCategoria: idCategoria},
            success: function(data) {
              if (data)
              {
                if(data == '1')
                {
                  $('#tituloMP').empty();
                  $("#parrafoMP").empty();
                  $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
                  $("#parrafoMP").append('Se ha eliminado exitosamente la Categoria.');
                  $('#modalEliminarCategoria').modal('hide');
                  listarCategorias();
                  $('#modalMensajeCategoria').modal({
                    show: true
                  });
                }else{
                  $('#tituloMP').empty();
                  $("#parrafoMP").empty();
                  $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                  $("#parrafoMP").append('Ha ocurrido un error al intentar eliminar la Categoria.');
                  $('#modalEliminarCategoria').modal('hide');
                  listarCategorias();
                  $('#modalMensajeCategoria').modal({
                    show: true
                  });
                }
                feather.replace()
                $('[data-toggle="tooltip"]').tooltip()
              }
            }
        });
    });

    $("#modalMensajeCategoria").on("hidden.bs.modal", function () {
        var pagina = window.location.pathname.split('/')[2].toLowerCase();
        if (pagina == "modificarcategoria") {
            location.reload();
        }
    });


    function listarCategorias()
    {
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var baseurl = window.origin + '/Categoria/listarCategorias';
        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        success: function(data) {
        if (data)
        {
            var myJSON= JSON.stringify(data);
            myJSON = JSON.parse(myJSON);
            $('#tablaListaCategorias').html(myJSON.table_categorias);
            $('#tListaCategorias').dataTable({
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


});

window.onload = function () {
    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarCategorias'.toLowerCase())
    {
        $('#tListaCategorias').dataTable({
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