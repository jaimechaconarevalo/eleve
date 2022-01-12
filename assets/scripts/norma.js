 $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    feather.replace();

    $('#tListaCategorias').on('click', '.seleccionarCategoria', function(e) {
        
        var id = e.currentTarget.dataset.id;
        var codigo = e.currentTarget.dataset.codigo;
        var nombre = e.currentTarget.dataset.nombre;
        
        var categorias_seleccionadas = JSON.parse(localStorage.getItem("categorias_seleccionadas"));
        if (categorias_seleccionadas != null && categorias_seleccionadas.length > 0) {
            categorias_seleccionadas.push([id, codigo, nombre]);
            localStorage.setItem("categorias_seleccionadas", JSON.stringify(categorias_seleccionadas));
        }else{
            var categorias_seleccionadas = [];
            categorias_seleccionadas.push([id, codigo, nombre]);
            localStorage.setItem("categorias_seleccionadas", JSON.stringify(categorias_seleccionadas));
        }

        var div = '<div class="card" id="categoria'.concat(id,'">');
        div = div.concat('<div class="card-header row" id="heading',id,'">');
        div = div.concat('<div class="col-sm-9 text-left">');
        div = div.concat('<h2 class="mb-0">');
        div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',id,'" aria-expanded="true" aria-controls="collapse',id,'">');
        div = div.concat(codigo, ' - ', nombre);
        div = div.concat('</button>');
        div = div.concat('</h2>');
        div = div.concat('</div>');
        div = div.concat('<div id="agregarPregunta',id,'" class="col-sm-3 text-right">');
        div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',id,'" data-codigo="',codigo,'" data-nombre="',nombre,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
        div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',id,'" data-codigo="',codigo,'" data-nombre="',nombre,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
        div = div.concat('</div>');
        div = div.concat('</div>');
        div = div.concat('<div id="collapse',id,'" class="collapse show" aria-labelledby="heading',id,'" data-parent="#acordionCategorias">');
        //div = div.concat('<div class="card-body">1.0 - Primera Pregunta de Primera Categoria.</div>');
        div = div.concat('</div>');
        div = div.concat('</div>');

        $("#acordionCategorias").append(div);
        $('#modalAgregarCategoria').modal('hide');
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();

    });

    $("#acordionCategorias").on('click', '.agregarPregunta', function (e) {
        var id = e.currentTarget.dataset.id;
        var codigo = e.currentTarget.dataset.codigo;
        var nombre = e.currentTarget.dataset.nombre;
        document.getElementById('tituloAP').dataset.id = id;
        document.getElementById('tituloAP').dataset.codigo = codigo;
        document.getElementById('tituloAP').dataset.nombre = nombre;
    });

    $("#acordionCategorias").on('click', '.eliminarPregunta', function (e) {
        var id = e.currentTarget.dataset.id;
        var codigo = e.currentTarget.dataset.codigo;
        var nombre = e.currentTarget.dataset.nombre;
        var idcategoria = e.currentTarget.dataset.idcategoria;
        var div = document.getElementById("pregunta".concat(idcategoria,"_",id));

        var preguntas_seleccionadas = JSON.parse(localStorage.getItem("preguntas_seleccionadas"));
        if (preguntas_seleccionadas != null && preguntas_seleccionadas.length > 0) {
            var indexP = preguntas_seleccionadas.findIndex(p => p[0] === id && p[1] === idcategoria);
            delete preguntas_seleccionadas.splice(indexP, 1);
            localStorage.setItem("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));
        }

        $(e.currentTarget.firstElementChild).tooltip('hide');
        div.remove();
    });

    $("#acordionCategorias").on('click', '.eliminarCategoria', function (e) {
        var id = e.currentTarget.dataset.id;
        var codigo = e.currentTarget.dataset.codigo;
        var nombre = e.currentTarget.dataset.nombre;
        var div = document.getElementById("categoria".concat(id));

        var categorias_seleccionadas = JSON.parse(localStorage.getItem("categorias_seleccionadas"));
        if (categorias_seleccionadas != null && categorias_seleccionadas.length > 0) {
            var indexC = categorias_seleccionadas.findIndex(c => c[0] === id);
            delete categorias_seleccionadas.splice(indexC, 1);
            localStorage.setItem("categorias_seleccionadas", JSON.stringify(categorias_seleccionadas));
        }
        $(e.currentTarget.firstElementChild).tooltip('hide');
        div.remove();
       $('[data-toggle="tooltip"]').tooltip();
    });

  $('#tListaPreguntas').on('click', '.seleccionarPregunta', function(e) {
    
    var id = e.currentTarget.dataset.id;
    var codigo = e.currentTarget.dataset.codigo;
    var nombre = e.currentTarget.dataset.nombre;
    var idCategoria = document.getElementById('tituloAP').dataset.id;

    var preguntas_seleccionadas = JSON.parse(localStorage.getItem("preguntas_seleccionadas"));
    if (preguntas_seleccionadas != null && preguntas_seleccionadas.length > 0) {
        preguntas_seleccionadas.push([id, idCategoria, codigo, nombre]);
        localStorage.setItem("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));
    }else{
        var preguntas_seleccionadas = [];
        preguntas_seleccionadas.push([id, idCategoria, codigo, nombre]);
        localStorage.setItem("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));
    }

    var div = '<div id="pregunta'.concat(idCategoria, '_', id,'" class="card-body border">');
    div = div.concat('<div class="row">');
    div = div.concat('<div class="col-sm-10 text-left">');
    div = div.concat(codigo, ' - ', nombre);
    div = div.concat('</div>');
    div = div.concat('<div class="col-sm-2 text-right">');
    div = div.concat('<a id="trash_',id,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',id,'" data-codigo="',codigo,'" data-nombre="',nombre,'" data-idcategoria="',idCategoria,'">');
    div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
    div = div.concat('</a>');
    div = div.concat('</div>');
    div = div.concat('</div>');
    div = div.concat('</div>');

    $("#collapse".concat(idCategoria)).append(div);
    $('#modalAgregarPregunta').modal('hide')
    feather.replace();
    $('[data-toggle="tooltip"]').tooltip();

  }); 
  

  $("#agregarNorma").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarNorma").validate();
        if ($("#agregarNorma").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarNorma");
                var formData = new FormData(form);


                var preguntas_seleccionadas = JSON.parse(localStorage.getItem("preguntas_seleccionadas"));
                formData.append("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));

                var baseurl = (window.origin + '/Norma/agregarNorma');
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
                            $('#modalMensajeNorma').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarNorma").reset();
                            
                            var acordeon = document.getElementById('acordionCategorias');
                            acordeon.innerHTML = '';
                            localStorage.myPageDataArr = undefined;
                            localStorage.removeItem('categorias_seleccionadas');
                            localStorage.removeItem('preguntas_seleccionadas');
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append('Ha ocurrido un error al intentar agregar la Norma.');
                            $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalMensajeNorma').modal({
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

    $("#agregarNorma").validate({
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

    $("#modalMensajeNorma").on("hidden.bs.modal", function () {
        var pagina = window.location.pathname.split('/')[2].toLowerCase();
        if (pagina == "modificarnorma") {
            location.reload();
        }
    });


    $('#eliminarNorma').click(function(e){
        idNorma = $('#tituloEP').data('idnorma');
        //var nombreEquipo = $('#tituloEE').data('nombreequipo');
        var baseurl = window.origin + '/Norma/eliminarNorma';

        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        data: {idNorma: idNorma},
        success: function(data) {
        if (data)
        {
            if(data == '1')
            {
              $('#tituloMP').empty();
              $("#parrafoMP").empty();
              $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
              $("#parrafoMP").append('Se ha eliminado exitosamente la Norma.');
              $('#modalEliminarNorma').modal('hide');
               listarNormas();
              $('#modalMensajeNorma').modal({
                show: true
              });
            }else{
              $('#tituloMP').empty();
              $("#parrafoMP").empty();
              $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
              $("#parrafoMP").append('Ha ocurrido un error al intentar la Norma.');
              $('#modalEliminarNorma').modal('hide');
              listarNormas();
              $('#modalMensajeNorma').modal({
                show: true
              });
            }
            feather.replace()
            $('[data-toggle="tooltip"]').tooltip()
            }
        }
        });
    });

    function listarNormas()
    {
        var baseurl = window.origin + '/Norma/listarNormas';
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
            $('#tablaListaNormas').html(myJSON.table_normas);
            feather.replace()
            $('#tListaNormas').dataTable({
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

    $('#modalEliminarNorma').on('show.bs.modal', function(e) {
        //get data-id attribute of the clicked element
        var idNorma = $(e.relatedTarget).data('id');
        var nombreNorma = $(e.relatedTarget).data('norma');
        //populate the textbox
        $("#tituloEP").text('Eliminar Norma N° ' + idNorma);
        $("#parrafoEP").text('¿Estás seguro que deseas eliminar la Norma N° ' + idNorma + ', "' + nombreNorma + '"?');

        $("#tituloEP").removeData("idnorma");
        $("#tituloEP").attr("data-idnorma", idNorma);
        //$("#tituloEE").removeData("nombreequipo");
        //$("#tituloEE").attr("data-nombreEquipo", nombreEquipo);
    });

});



window.onload = function () {

    localStorage.removeItem('categorias_seleccionadas');
    localStorage.removeItem('preguntas_seleccionadas');

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarNormas'.toLowerCase())
    {
        $('#tListaNormas').dataTable({
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

    if(window.location.pathname.split('/')[2].toLowerCase() == 'agregarNorma'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'modificarNorma'.toLowerCase())
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

        var idNorma = document.getElementById('inputIdNorma').value;
        if (idNorma) {
            var baseurl =  window.origin + '/Norma/json_listarCategoriasPreguntas';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {idNorma: idNorma},
                success: function(data) {
                    if (data) {
                       
                        var preguntas_seleccionadas = [];
                        var id_categoria_i = null;
                        var div = '';
                        if (data.data_cp_n) {
                            $.each(data.data_cp_n, function(index_c, categoria ) {

                                div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                    div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                        div = div.concat('<div class="col-sm-9 text-left">');
                                            div = div.concat('<h2 class="mb-0">');
                                            div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="true" aria-controls="collapse',categoria.id_categoria,'">');
                                            div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                            div = div.concat('</button>');
                                            div = div.concat('</h2>');
                                        div = div.concat('</div>');
                                        div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                            div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                            div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                        div = div.concat('</div>');
                                    div = div.concat('</div>');

                                    div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse show" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
                                        if (categoria.preguntas.length > 0) {

                                            $.each(categoria.preguntas, function(index_p, pregunta) {
                                                //contador++;

                                                var id = pregunta.id_pregunta;
                                                var codigo = pregunta.codigo;
                                                var nombre = pregunta.pregunta;
                                                var idCategoria = categoria.id_categoria;

                                                if (preguntas_seleccionadas != null && preguntas_seleccionadas.length > 0) {
                                                    preguntas_seleccionadas.push([id, idCategoria, codigo, nombre]);
                                                    //localStorage.setItem("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));
                                                }else{
                                                    preguntas_seleccionadas.push([id, idCategoria, codigo, nombre]);
                                                    //localStorage.setItem("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));
                                                }

                                                div = div.concat('<div id="pregunta',categoria.id_categoria, '_', pregunta.id_pregunta,'" class="card-body border">');
                                                    div = div.concat('<div class="row">');
                                                        div = div.concat('<div class="col-sm-10 text-left">');
                                                            div = div.concat(pregunta.codigo, ' - ', pregunta.pregunta);
                                                        div = div.concat('</div>');
                                                        div = div.concat('<div class="col-sm-2 text-right">');
                                                            div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-idcategoria="',categoria.id_categoria,'">');
                                                            div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                            div = div.concat('</a>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            });
                                        }
                                        /*div = div.concat('<div id="pregunta',id_categoria, '_', id_pregunta,'" class="card-body border">');
                                            div = div.concat('<div class="row">');
                                                div = div.concat('<div class="col-sm-10 text-left">');
                                                    div = div.concat(cod_pregunta, ' - ', pregunta);
                                                div = div.concat('</div>');
                                                div = div.concat('<div class="col-sm-2 text-right">');
                                                    div = div.concat('<a id="trash_',id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',id_pregunta,'" data-codigo="',cod_pregunta,'" data-nombre="',pregunta,'" data-idcategoria="',id_categoria,'">');
                                                    div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                    div = div.concat('</a>');
                                                div = div.concat('</div>');
                                            div = div.concat('</div>');
                                        div = div.concat('</div>');*/
                                    
                                    div = div.concat('</div>');
                                div = div.concat('</div>');


                            });

                            localStorage.setItem("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));
 
                            /*
                            var id_categoria_i = null;
                            var div = '';
                            for (var i = 0; i < data.data_cp_n.length; i++) {
                                var id_categoria = data.data_cp_n[i][2];
                                var id_pregunta = data.data_cp_n[i][3];
                                var cod_categoria = data.data_cp_n[i][4];
                                var categoria = data.data_cp_n[i][5];
                                var cod_pregunta = data.data_cp_n[i][6];
                                var pregunta = data.data_cp_n[i][7];

                                if (id_categoria_i != id_categoria)
                                {
                                    if (id_categoria_i) {
                                        div = div.concat('</div>');
                                        div = div.concat('</div>');
                                    }
                                    div = div.concat('<div class="card" id="categoria',id_categoria,'">');
                                    div = div.concat('<div class="card-header row" id="heading',id_categoria,'">');
                                    div = div.concat('<div class="col-sm-9 text-left">');
                                    div = div.concat('<h2 class="mb-0">');
                                    div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',id_categoria,'" aria-expanded="true" aria-controls="collapse',id_categoria,'">');
                                    div = div.concat(cod_categoria, ' - ', categoria);
                                    div = div.concat('</button>');
                                    div = div.concat('</h2>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div id="agregarPregunta',id_categoria,'" class="col-sm-3 text-right">');
                                    div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',id_categoria,'" data-codigo="',cod_categoria,'" data-nombre="',categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                    div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',id_categoria,'" data-codigo="',cod_categoria,'" data-nombre="',categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div id="collapse',id_categoria,'" class="collapse show" aria-labelledby="heading',id_categoria,'" data-parent="#acordionCategorias">');
                                    div = div.concat('<div id="pregunta',id_categoria, '_', id_pregunta,'" class="card-body border">');
                                    div = div.concat('<div class="row">');
                                    div = div.concat('<div class="col-sm-10 text-left">');
                                    div = div.concat(cod_pregunta, ' - ', pregunta);
                                    div = div.concat('</div>');
                                    div = div.concat('<div class="col-sm-2 text-right">');
                                    div = div.concat('<a id="trash_',id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',id_pregunta,'" data-codigo="',cod_pregunta,'" data-nombre="',pregunta,'" data-idcategoria="',id_categoria,'">');
                                    div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                    div = div.concat('</a>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    id_categoria_i = id_categoria;
                                }else{
                                    div = div.concat('<div id="pregunta',id_categoria, '_', id_pregunta,'" class="card-body border">');
                                    div = div.concat('<div class="row">');
                                    div = div.concat('<div class="col-sm-10 text-left">');
                                    div = div.concat(cod_pregunta, ' - ', pregunta);
                                    div = div.concat('</div>');
                                    div = div.concat('<div class="col-sm-2 text-right">');
                                    div = div.concat('<a id="trash_',id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',id_pregunta,'" data-codigo="',cod_pregunta,'" data-nombre="',pregunta,'" data-idcategoria="',id_categoria,'">');
                                    div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                    div = div.concat('</a>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                }
                            }
                            div = div.concat('</div>');
                            div = div.concat('</div>');*/



                            $("#acordionCategorias").append(div);
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }
                }
            });
        }
        feather.replace();
    }
}