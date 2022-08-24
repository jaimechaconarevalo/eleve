 $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    feather.replace();


    $('#sEstadoNorma').on('change',function(e){
        listarNormas();
    });

    $("#tbodyCategoriasReporte").on('click', '#up', function() {
       /* var thisRow = $(this).closest("tr");
        var prevRow = $(this).closest("tr").prev(".site_heading");

        if (prevRow.length == 0) {
            return;
        }
        
        newOrder = prevRow.attr("data-order");
        oldOrder = thisRow.attr("data-order");

        thisRow.attr("data-order", newOrder);
        prevRow.attr("data-order", oldOrder);

        thisRow.children()[0].textContent = newOrder;
        prevRow.children()[0].textContent = oldOrder;
        $('#' + thisRow[0].id).insertBefore('#' + prevRow[0].id);
        RowOrder();*/


        var id_norma = document.getElementById('inputIdNorma').value;
        var fila = $(this).closest("tr");
        var id_categoria_reporte = fila[0].id;
        var funcion = 1;

        if (id_norma) {
            var baseurl =  window.origin + '/Norma/json_moverCategoriaReporte';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria_reporte: id_categoria_reporte, funcion: funcion },
                success: function(data) {
                    if (data) {
                        if (data.resultado != null && data.resultado == 1) {
                            var table = $('#tListaCategoriasReporte').DataTable();
                            table.destroy();
                            $(".tooltip").tooltip("hide");
                            $('#tListaCategoriasReporte').DataTable({
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
                                "data":  data.categorias_norma,
                                searching: true,
                                paging:         true,
                                ordering:       false,
                                info:           true,
                                fixedColumns: true,
                                "order": [[ 1, "asc" ]],
                                "aoColumnDefs" :  [
                                            {'visible': false, 'targets': [0] },
                                            {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                            {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                          ],
                                          createdRow: function (row, data, index) {

                                            row.classList.add('site_heading');
                                            row.id = $(data[0]).text();
                                            row.dataset.order = $(data[1]).text();
                                    //
                                    // if the second column cell is blank apply special formatting
                                    //
    //                                  if (data[1] == "") {
    //                                        console.dir(row);
                                        //$('tr', row).addClass('site_heading');
    //                                }
                                },
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
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append(data.mensaje);
                            $('#modalMensajeNorma').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria Reporte, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }
    });

    $("#tbodyCategoriasReporte").on('click', '#down', function() {
        /*var thisRow = $(this).closest("tr");
        var nextRow = $(this).closest("tr").next(".site_heading");

        if (nextRow.length == 0) {
            return;
        }

        oldOrder = thisRow.attr("data-order");
        newOrder = nextRow.attr("data-order");

        thisRow.attr("data-order", newOrder);
        nextRow.attr("data-order", oldOrder);

        thisRow.children()[0].textContent = newOrder;
        nextRow.children()[0].textContent = oldOrder;
        $('#' + thisRow[0].id).insertAfter('#' + nextRow[0].id);
        RowOrder();*/


        var id_norma = document.getElementById('inputIdNorma').value;
        var fila = $(this).closest("tr");
        var id_categoria_reporte = fila[0].id;
        var funcion = 0;

        if (id_norma) {
            var baseurl =  window.origin + '/Norma/json_moverCategoriaReporte';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria_reporte: id_categoria_reporte, funcion: funcion },
                success: function(data) {
                    if (data) {
                        if (data.resultado != null && data.resultado == 1) {
                            var table = $('#tListaCategoriasReporte').DataTable();
                            table.destroy();
                            $(".tooltip").tooltip("hide");
                            $('#tListaCategoriasReporte').DataTable({
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
                                "data":  data.categorias_norma,
                                searching: true,
                                paging:         true,
                                ordering:       false,
                                info:           true,
                                fixedColumns: true,
                                "order": [[ 1, "asc" ]],
                                "aoColumnDefs" :  [
                                            {'visible': false, 'targets': [0] },
                                            {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                            {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                          ],
                                          createdRow: function (row, data, index) {

                                            row.classList.add('site_heading');
                                            row.id = $(data[0]).text();
                                            row.dataset.order = $(data[1]).text();
                                    //
                                    // if the second column cell is blank apply special formatting
                                    //
    //                                  if (data[1] == "") {
    //                                        console.dir(row);
                                        //$('tr', row).addClass('site_heading');
    //                                }
                                },
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
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append(data.mensaje);
                            $('#modalMensajeNorma').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria Reporte, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }


    });



    /*var $table=$('#tListaCategoriasReporte');
    var rows = $table.find('tr.site_heading').get();
    
    rows.sort(function(a, b) {
        var keyA = $(a).attr('data-order');
        var keyB = $(b).attr('data-order');
        if (!keyA || !keyB) return -1;
        if (keyA > keyB) return 1;
        if (keyA < keyB) return -1;
        return 0;
    });
            
    $.each(rows, function(index, row) {
        $table.children('tbody').append(row);
    })

    $("#tbodyCategoriasReporte").on('click', '#up', function() {
        oldID =  ($(this).closest('tr').attr('id'))
        newID =  ($(this).closest("tr").prevAll(".site_heading").attr("id"))
        $('#' + oldID).insertBefore('#' + newID);
    })
      
    $("#tbodyCategoriasReporte").on('click', '#down', function() {
        oldID =  ($(this).closest('tr').attr('id'))
        newID =  ($(this).closest("tr").nextAll(".site_heading").attr("id"))
        $('#' + oldID).insertAfter('#' + newID);
    })*/




    $('#tListaCategoriasReporte').on('click', '.eliminarCategoriaReporte', function(e) {

        var ordenCategoriaReporte = $(e.currentTarget).data('orden');
        var idCategoriaReporte = $(e.currentTarget).data('id');
        var nombre = $(e.currentTarget).data('nombre');
        var iniciales = $(e.currentTarget).data('iniciales');

        var titulo_modal = document.getElementById('tituloMCR');
        titulo_modal.dataset.id = idCategoriaReporte;
        titulo_modal.dataset.orden = ordenCategoriaReporte;
        
        $('#tituloMCR').empty();
        $("#parrafoMCR").empty();
        $("#tituloMCR").append('<i class="plusTituloError mb-2 text-center" data-feather="trash-2"></i> ¿Estás seguro de eliminar la Categoría Reporte #'.concat(idCategoriaReporte), '?');

        var div = '<ul class="list-group list-group-flush overflow-hidden">';
        var id_cat_reporte_MCR = '<div class="row"><label for="idCatReporteMCR" class="col-sm-5 col-form-label font-weight-bold">ID: </label>';
        id_cat_reporte_MCR = id_cat_reporte_MCR.concat('<div class="col-sm-5">');
        id_cat_reporte_MCR = id_cat_reporte_MCR.concat('<label class="col-form-label" id="idCatReporteMCR">',idCategoriaReporte,'</label></div></div>');

        var nombre_cat_reporte_MCR = '<div class="row"><label for="nombre_cat_reporte_MCR" class="col-sm-5 col-form-label font-weight-bold">NOMBRE: </label>';
        nombre_cat_reporte_MCR = nombre_cat_reporte_MCR.concat('<div class="col-sm-5">');
        nombre_cat_reporte_MCR = nombre_cat_reporte_MCR.concat('<label class="col-form-label" id="nombre_cat_reporte_MCR">',nombre,'</label></div></div>');

        var iniciales_cat_reporte_MCR = '<div class="row"><label for="iniciales_cat_reporte_MCR" class="col-sm-5 col-form-label font-weight-bold">INICIALES: </label>';
        iniciales_cat_reporte_MCR = iniciales_cat_reporte_MCR.concat('<div class="col-sm-5">');
        iniciales_cat_reporte_MCR = iniciales_cat_reporte_MCR.concat('<label class="col-form-label" id="iniciales_cat_reporte_MCR">',iniciales,'</label></div></div>');

        var orden_cat_reporte_MCR = '<div class="row"><label for="orden_cat_reporte_MCR" class="col-sm-5 col-form-label font-weight-bold">ORDEN: </label>';
        orden_cat_reporte_MCR = orden_cat_reporte_MCR.concat('<div class="col-sm-5">');
        orden_cat_reporte_MCR = orden_cat_reporte_MCR.concat('<label class="col-form-label" id="orden_cat_reporte_MCR">',ordenCategoriaReporte,'</label></div></div>');

        div = div.concat('<li class="list-group-item">',id_cat_reporte_MCR,'</li>');
        div = div.concat('<li class="list-group-item">',nombre_cat_reporte_MCR,'</li>');
        div = div.concat('<li class="list-group-item">',iniciales_cat_reporte_MCR,'</li>');
        div = div.concat('<li class="list-group-item">',orden_cat_reporte_MCR,'</li>');
        div = div.concat('</ul>');


        $("#parrafoMCR").append(div);
        $('#modalConfirmacionEliminarCR').modal({
          show: true
        });
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
        
    });

    $('#btnConfirmarMCR').on('click', function(e) {        
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var id_norma = document.getElementById('inputIdNorma').value;
        var titulo_modal = document.getElementById('tituloMCR');
        var idCategoriaReporte = titulo_modal.dataset.id;
        var ordenCategoriaReporte = titulo_modal.dataset.orden;

        var baseurl = (window.origin + '/Norma/eliminarCategoriaReporte');
        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        data: {id_norma: id_norma, id_categoria_reporte: idCategoriaReporte, orden_categoria_reporte: ordenCategoriaReporte},
        success: function(data) {
            if (data) {
                if (data.resultado != null && data.resultado == 1) {
                    var table = $('#tListaCategoriasReporte').DataTable();
                    table.destroy();
                    $(".tooltip").tooltip("hide");
                    $('#tListaCategoriasReporte').DataTable({
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
                        "data":  data.categorias_norma,
                        searching: true,
                        paging:         true,
                        ordering:       false,
                        info:           true,
                        fixedColumns: true,
                        "order": [[ 1, "asc" ]],
                        "aoColumnDefs" :  [
                                    {'visible': false, 'targets': [0] },
                                    {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                    {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                  ],
                                  createdRow: function (row, data, index) {

                                    row.classList.add('site_heading');
                                    row.id = $(data[0]).text();
                                    row.dataset.order = $(data[1]).text();
                            //
                            // if the second column cell is blank apply special formatting
                            //
//                                  if (data[1] == "") {
//                                        console.dir(row);
                                //$('tr', row).addClass('site_heading');
//                                }
                        },
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
                    feather.replace();
                    $('[data-toggle="tooltip"]').tooltip();
                }else{
                    $('#tituloMP').empty();
                    $("#parrafoMP").empty();
                    $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                    $("#parrafoMP").append(data.mensaje);
                    $('#modalMensajeNorma').modal({
                      show: true
                    });
                    feather.replace();
                    $('[data-toggle="tooltip"]').tooltip();
                }
            }else{
                $('#tituloMP').empty();
                $("#parrafoMP").empty();
                $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                $("#parrafoMP").append("Ha ocurrido un error al eliminar la Cateogria Reporte, intente nuevamente.");
                $('#modalMensajeNorma').modal({
                  show: true
                });
                feather.replace();
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
        });
            
        loader.setAttribute('hidden', '');
        feather.replace();
    });



    $('#tListaCategorias').on('click', '.seleccionarCategoria', function(e) {
        
        var id = e.currentTarget.dataset.id;
        var codigo = e.currentTarget.dataset.codigo;
        var nombre = e.currentTarget.dataset.nombre;
        var orden = (document.getElementById('acordionCategorias').children.length+1);
        
        /*var categorias_seleccionadas = JSON.parse(localStorage.getItem("categorias_seleccionadas"));
        if (categorias_seleccionadas != null && categorias_seleccionadas.length > 0) {
            categorias_seleccionadas.push([id, codigo, nombre]);
            //localStorage.setItem("categorias_seleccionadas", JSON.stringify(categorias_seleccionadas));
        }else{
            var categorias_seleccionadas = [];
            categorias_seleccionadas.push([id, codigo, nombre]);
            //localStorage.setItem("categorias_seleccionadas", JSON.stringify(categorias_seleccionadas));
        }*/

        var div = '<div class="card" id="categoria'.concat(id,'">');
        div = div.concat('<div class="card-header row" id="heading',id,'">');
        div = div.concat('<div class="col-sm-9 text-left">');
        div = div.concat('<h2 class="mb-0">');
        div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',id,'" aria-expanded="false" aria-controls="collapse',id,'">');
        div = div.concat(codigo, ' - ', nombre);
        div = div.concat('</button>');
        div = div.concat('</h2>');
        div = div.concat('</div>');
        div = div.concat('<div id="agregarPregunta',id,'" class="col-sm-3 text-right">');
        div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',id,'" data-codigo="',codigo,'" data-nombre="',nombre,'" data-orden_categoria="',orden,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
        div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',id,'" data-codigo="',codigo,'" data-nombre="',nombre,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
        div = div.concat('</div>');
        div = div.concat('</div>');
        div = div.concat('<div id="collapse',id,'" class="collapse" aria-labelledby="heading',id,'" data-parent="#acordionCategorias">');
        //div = div.concat('<div class="card-body">1.0 - Primera Pregunta de Primera Categoria.</div>');
        div = div.concat('</div>');
        div = div.concat('</div>');

        $("#acordionCategorias").append(div);
        $('#modalAgregarCategoria').modal('hide');
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();

    });

    $("#acordionCategorias").on('click', '.up_categoria', function() {
        var id_norma = document.getElementById('inputIdNorma').value;
        var id_categoria = this.dataset.id;
        var orden = this.dataset.orden_categoria;
        var funcion = 1;

        if (id_norma) {
            var baseurl =  window.origin + '/Norma/json_moverCategoriaPregunta';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria: id_categoria, funcion: funcion },
                success: function(data) {
                    if (data) {

                        id_norma_form = document.getElementById('inputIdNorma').value;
                        if (id_norma_form.trim() == "") {
                            document.getElementById('inputIdNorma').value = data.id_norma;
                        }

                        var preguntas_seleccionadas = [];
                        var id_categoria_i = null;
                        var div = '';
                        if (data.data_cp_n) {
                            $(".tooltip").tooltip("hide");
                            var cant_categorias = data.data_cp_n.length;
                            $.each(data.data_cp_n, function(index_c, categoria ) {

                                div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                    div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                        div = div.concat('<div class="col-sm-9 text-left">');
                                            div = div.concat('<h2 class="mb-0">');
                                            div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                            div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                            div = div.concat('</button>');
                                            div = div.concat('</h2>');
                                        div = div.concat('</div>');
                                        div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                            if (index_c > 0) {
                                                div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                            }

                                            if ((index_c+1) < cant_categorias ) {
                                                div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                            }
                                            div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                            div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                        div = div.concat('</div>');
                                    div = div.concat('</div>');

                                    div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
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

                                                            if (index_p > 0) {
                                                                div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                            }

                                                            if ((index_p+1) < categoria.preguntas.length ) {
                                                                div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                            }

                                                            div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                            div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                            div = div.concat('</a>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            });
                                        }
                                    div = div.concat('</div>');
                                div = div.concat('</div>');
                            });

                            $("#acordionCategorias").empty();
                            $("#acordionCategorias").append(div);
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria Reporte, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }
    });

    $("#acordionCategorias").on('click', '.down_categoria', function() {
        var id_norma = document.getElementById('inputIdNorma').value;
        var id_categoria = this.dataset.id;
        var orden = this.dataset.orden_categoria;
        var funcion = 0;

        if (id_norma) {
            var baseurl =  window.origin + '/Norma/json_moverCategoriaPregunta';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria: id_categoria, funcion: funcion },
                success: function(data) {
                    if (data) {
                        id_norma_form = document.getElementById('inputIdNorma').value;
                        if (id_norma_form.trim() == "") {
                            document.getElementById('inputIdNorma').value = data.id_norma;
                        }

                        var preguntas_seleccionadas = [];
                        var id_categoria_i = null;
                        var div = '';
                        if (data.data_cp_n) {
                            $(".tooltip").tooltip("hide");
                            var cant_categorias = data.data_cp_n.length;
                            $.each(data.data_cp_n, function(index_c, categoria ) {

                                div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                    div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                        div = div.concat('<div class="col-sm-9 text-left">');
                                            div = div.concat('<h2 class="mb-0">');
                                            div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                            div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                            div = div.concat('</button>');
                                            div = div.concat('</h2>');
                                        div = div.concat('</div>');
                                        div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                            if (index_c > 0) {
                                                div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                            }

                                            if ((index_c+1) < cant_categorias ) {
                                                div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                            }
                                            div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                            div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                        div = div.concat('</div>');
                                    div = div.concat('</div>');

                                    div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
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
                                                            if (index_p > 0) {
                                                                div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                            }

                                                            if ((index_p+1) < categoria.preguntas.length ) {
                                                                div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                            }
                                                            div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                            div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                            div = div.concat('</a>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            });
                                        }
                                    div = div.concat('</div>');
                                div = div.concat('</div>');
                            });

                            $("#acordionCategorias").empty();
                            $("#acordionCategorias").append(div);
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }


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
        var id_categoria = e.currentTarget.dataset.id_categoria;
        var orden_pregunta = e.currentTarget.dataset.orden_pregunta;
        var div = document.getElementById("pregunta".concat(id_categoria,"_",id));

        /*var preguntas_seleccionadas = JSON.parse(localStorage.getItem("preguntas_seleccionadas"));
        if (preguntas_seleccionadas != null && preguntas_seleccionadas.length > 0) {
            var indexP = preguntas_seleccionadas.findIndex(p => p[0] === id && p[1] === idcategoria);
            delete preguntas_seleccionadas.splice(indexP, 1);
            localStorage.setItem("preguntas_seleccionadas", JSON.stringify(preguntas_seleccionadas));
        }

        $(e.currentTarget.firstElementChild).tooltip('hide');
        div.remove();*/

        
        var titulo_modal = document.getElementById('tituloMEP');
        titulo_modal.dataset.id = id;
        titulo_modal.dataset.codigo = codigo;
        titulo_modal.dataset.orden_pregunta = orden_pregunta;
        titulo_modal.dataset.id_categoria = id_categoria;
        
        $('#tituloMEP').empty();
        $("#parrafoMEP").empty();
        $("#tituloMEP").append('<i class="plusTituloError mb-2 text-center" data-feather="trash-2"></i> ¿Estás seguro de eliminar la Pregunta #'.concat(codigo, '-',nombre), '?');

        var div = '<ul class="list-group list-group-flush overflow-hidden">';
        var id_cat_MEP = '<div class="row"><label for="idpreguntaMEP" class="col-sm-5 col-form-label font-weight-bold">ID: </label>';
        id_cat_MEP = id_cat_MEP.concat('<div class="col-sm-5">');
        id_cat_MEP = id_cat_MEP.concat('<label class="col-form-label" id="idpreguntaMEP">',id,'</label></div></div>');

        var codigo_cat_MEP = '<div class="row"><label for="codigo_cat_MEP" class="col-sm-5 col-form-label font-weight-bold">CODIGO: </label>';
        codigo_cat_MEP = codigo_cat_MEP.concat('<div class="col-sm-5">');
        codigo_cat_MEP = codigo_cat_MEP.concat('<label class="col-form-label" id="codigo_cat_MEP">',codigo,'</label></div></div>');

        var nombre_cat_MEP = '<div class="row"><label for="nombre_cat_MEP" class="col-sm-5 col-form-label font-weight-bold">NOMBRE: </label>';
        nombre_cat_MEP = nombre_cat_MEP.concat('<div class="col-sm-5">');
        nombre_cat_MEP = nombre_cat_MEP.concat('<label class="col-form-label" id="nombre_cat_MEP">',nombre,'</label></div></div>');

        var orden_cat_MEP = '<div class="row"><label for="orden_cat_MC" class="col-sm-5 col-form-label font-weight-bold">ORDEN: </label>';
        orden_cat_MEP = orden_cat_MEP.concat('<div class="col-sm-5">');
        orden_cat_MEP = orden_cat_MEP.concat('<label class="col-form-label" id="orden_cat_MC">',orden_pregunta,'</label></div></div>');

        

        div = div.concat('<li class="list-group-item">',id_cat_MEP,'</li>');
        div = div.concat('<li class="list-group-item">',codigo_cat_MEP,'</li>');
        div = div.concat('<li class="list-group-item">',nombre_cat_MEP,'</li>');
        div = div.concat('<li class="list-group-item">',orden_cat_MEP,'</li>');
        div = div.concat('</ul>');


        $("#parrafoMEP").append(div);
        $('#modalConfirmacionEliminarP').modal({
          show: true
        });
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('#btnConfirmarEP').on('click', function(e) {        
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var id_norma = document.getElementById('inputIdNorma').value;
        var titulo_modal = document.getElementById('tituloMEP');
        var idCategoria = titulo_modal.dataset.id_categoria;
        var id_pregunta = titulo_modal.dataset.id;
        var codigo = titulo_modal.dataset.codigo;
        var orden = titulo_modal.dataset.orden_pregunta;

        var baseurl = (window.origin + '/Norma/eliminarPregunta');
        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        data: {id_norma: id_norma, id_pregunta: id_pregunta, id_categoria: idCategoria, codigo: codigo, orden: orden},
        success: function(data) {
            if (data) {


                id_norma_form = document.getElementById('inputIdNorma').value;
                if (id_norma_form.trim() == "") {
                    document.getElementById('inputIdNorma').value = data.id_norma;
                }

                var id_categoria_i = null;
                var div = '';
                if (data.data_cp_n) {
                    var cant_categorias = data.data_cp_n.length;
                    $.each(data.data_cp_n, function(index_c, categoria ) {

                        div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                            div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                div = div.concat('<div class="col-sm-9 text-left">');
                                    div = div.concat('<h2 class="mb-0">');
                                    div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                    div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                    div = div.concat('</button>');
                                    div = div.concat('</h2>');
                                div = div.concat('</div>');
                                div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                    if (index_c > 0) {
                                        div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                    }

                                    if ((index_c+1) < cant_categorias ) {
                                        div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                    }
                                    div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                    div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                div = div.concat('</div>');
                            div = div.concat('</div>');

                            div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
                                if (categoria.preguntas.length > 0) {
                                    $.each(categoria.preguntas, function(index_p, pregunta) {
                                        //contador++;

                                        var id = pregunta.id_pregunta;
                                        var codigo = pregunta.codigo;
                                        var nombre = pregunta.pregunta;
                                        var idCategoria = categoria.id_categoria;

                                        div = div.concat('<div id="pregunta',categoria.id_categoria, '_', pregunta.id_pregunta,'" class="card-body border">');
                                            div = div.concat('<div class="row">');
                                                div = div.concat('<div class="col-sm-10 text-left">');
                                                    div = div.concat(pregunta.codigo, ' - ', pregunta.pregunta);
                                                div = div.concat('</div>');
                                                div = div.concat('<div class="col-sm-2 text-right">');
                                                    if (index_p > 0) {
                                                        div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                    }

                                                    if ((index_p+1) < categoria.preguntas.length ) {
                                                        div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                    }
                                                    div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                    div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                    div = div.concat('</a>');
                                                div = div.concat('</div>');
                                            div = div.concat('</div>');
                                        div = div.concat('</div>');
                                    });
                                }
                            div = div.concat('</div>');
                        div = div.concat('</div>');
                    });

                    $("#acordionCategorias").empty();
                    $("#acordionCategorias").append(div);
                    feather.replace();
                    $('[data-toggle="tooltip"]').tooltip();
                    $(document.getElementById('collapse'.concat(data.id_categoria))).collapse(true);
                    $('#acordionCategorias #pregunta'.concat(data.id_categoria, '_', data.id_pregunta)).focus();




                }






            }else{
                $('#tituloMP').empty();
                $("#parrafoMP").empty();
                $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                $("#parrafoMP").append("Ha ocurrido un error al eliminar la Cateogria Reporte, intente nuevamente.");
                $('#modalMensajeNorma').modal({
                  show: true
                });
                feather.replace();
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
        });
            
        loader.setAttribute('hidden', '');
        feather.replace();
    });


    $("#acordionCategorias").on('click', '.eliminarCategoria', function (e) {
        /*var id = e.currentTarget.dataset.id;
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
    });*/

        var idCategoria = $(e.currentTarget).data('id');
        var nombre = $(e.currentTarget).data('nombre');
        var codigo = $(e.currentTarget).data('codigo');
        var orden_categoria = $(e.currentTarget).data('orden_categoria');

        var titulo_modal = document.getElementById('tituloMC');
        titulo_modal.dataset.id = idCategoria;
        titulo_modal.dataset.codigo = codigo;
        titulo_modal.dataset.orden_categoria = orden_categoria;
        
        $('#tituloMC').empty();
        $("#parrafoMC").empty();
        $("#tituloMC").append('<i class="plusTituloError mb-2 text-center" data-feather="trash-2"></i> ¿Estás seguro de eliminar la Categoría #'.concat(codigo), '?');

        var div = '<ul class="list-group list-group-flush overflow-hidden">';
        var id_cat_MC = '<div class="row"><label for="idCategoriaMC" class="col-sm-5 col-form-label font-weight-bold">ID: </label>';
        id_cat_MC = id_cat_MC.concat('<div class="col-sm-5">');
        id_cat_MC = id_cat_MC.concat('<label class="col-form-label" id="idCategoriaMC">',idCategoria,'</label></div></div>');

        var codigo_cat_MC = '<div class="row"><label for="codigo_cat_MC" class="col-sm-5 col-form-label font-weight-bold">CODIGO: </label>';
        codigo_cat_MC = codigo_cat_MC.concat('<div class="col-sm-5">');
        codigo_cat_MC = codigo_cat_MC.concat('<label class="col-form-label" id="codigo_cat_MC">',codigo,'</label></div></div>');

        var nombre_cat_MC = '<div class="row"><label for="nombre_cat_MC" class="col-sm-5 col-form-label font-weight-bold">NOMBRE: </label>';
        nombre_cat_MC = nombre_cat_MC.concat('<div class="col-sm-5">');
        nombre_cat_MC = nombre_cat_MC.concat('<label class="col-form-label" id="nombre_cat_MC">',nombre,'</label></div></div>');

        var orden_cat_MC = '<div class="row"><label for="orden_cat_MC" class="col-sm-5 col-form-label font-weight-bold">ORDEN: </label>';
        orden_cat_MC = orden_cat_MC.concat('<div class="col-sm-5">');
        orden_cat_MC = orden_cat_MC.concat('<label class="col-form-label" id="orden_cat_MC">',orden_categoria,'</label></div></div>');

        

        div = div.concat('<li class="list-group-item">',id_cat_MC,'</li>');
        div = div.concat('<li class="list-group-item">',codigo_cat_MC,'</li>');
        div = div.concat('<li class="list-group-item">',nombre_cat_MC,'</li>');
        div = div.concat('<li class="list-group-item">',orden_cat_MC,'</li>');
        div = div.concat('</ul>');


        $("#parrafoMC").append(div);
        $('#modalConfirmacionEliminarC').modal({
          show: true
        });
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('#btnConfirmarEC').on('click', function(e) {        
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var id_norma = document.getElementById('inputIdNorma').value;
        var titulo_modal = document.getElementById('tituloMC');
        var idCategoria = titulo_modal.dataset.id;
        var codigo = titulo_modal.dataset.codigo;
        var orden = titulo_modal.dataset.orden_categoria;

        var baseurl = (window.origin + '/Norma/eliminarCategoriaPregunta');
        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        data: {id_norma: id_norma, id_categoria: idCategoria, codigo: codigo, orden: orden},
        success: function(data) {
            if (data) {


                id_norma_form = document.getElementById('inputIdNorma').value;
                if (id_norma_form.trim() == "") {
                    document.getElementById('inputIdNorma').value = data.id_norma;
                }

                var preguntas_seleccionadas = [];
                var id_categoria_i = null;
                var div = '';
                if (data.data_cp_n) {
                    var cant_categorias = data.data_cp_n.length;
                    $.each(data.data_cp_n, function(index_c, categoria ) {

                        div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                            div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                div = div.concat('<div class="col-sm-9 text-left">');
                                    div = div.concat('<h2 class="mb-0">');
                                    div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                    div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                    div = div.concat('</button>');
                                    div = div.concat('</h2>');
                                div = div.concat('</div>');
                                div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                    if (index_c > 0) {
                                        div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                    }

                                    if ((index_c+1) < cant_categorias ) {
                                        div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                    }
                                    div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                    div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                div = div.concat('</div>');
                            div = div.concat('</div>');

                            div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
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
                                                    if (index_p > 0) {
                                                        div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                    }

                                                    if ((index_p+1) < categoria.preguntas.length ) {
                                                        div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                    }
                                                    div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                    div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                    div = div.concat('</a>');
                                                div = div.concat('</div>');
                                            div = div.concat('</div>');
                                        div = div.concat('</div>');
                                    });
                                }
                            div = div.concat('</div>');
                        div = div.concat('</div>');
                    });

                    $("#acordionCategorias").empty();
                    $("#acordionCategorias").append(div);
                    feather.replace();
                    $('[data-toggle="tooltip"]').tooltip();
                }






            }else{
                $('#tituloMP').empty();
                $("#parrafoMP").empty();
                $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                $("#parrafoMP").append("Ha ocurrido un error al eliminar la Cateogria Reporte, intente nuevamente.");
                $('#modalMensajeNorma').modal({
                  show: true
                });
                feather.replace();
                $('[data-toggle="tooltip"]').tooltip();
            }
        }
        });
            
        loader.setAttribute('hidden', '');
        feather.replace();
    });







    $('#btnSeleccionarPN').on('click', function(e) {
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');

        var tabla = $('#tListaPreguntas').DataTable();
        var data = tabla.rows({selected:  true}).data();
        if (data.length > 0) {
            //var id = e.currentTarget.dataset.id;
            var id = $(data[0][0]).text();
            var idCategoria = document.getElementById('tituloAP').dataset.id;
            var idNorma = document.getElementById('inputIdNorma').value;

            var baseurl = (window.origin + '/Norma/agregarCategoriaPregunta');
            jQuery.ajax({
            type: 'POST',
            url: baseurl,
            dataType: 'json',
            data: {id_norma: idNorma, id_categoria: idCategoria, id_pregunta: id},
            success: function(data) {
                if (data) {

                    
                    id_norma_form = document.getElementById('inputIdNorma').value;
                    if (id_norma_form.trim() == "") {
                        document.getElementById('inputIdNorma').value = data.id_norma;
                    }

                    var preguntas_seleccionadas = [];
                    var id_categoria_i = null;
                    var div = '';
                    if (data.data_cp_n) {
                        var cant_categorias = data.data_cp_n.length;
                        $.each(data.data_cp_n, function(index_c, categoria ) {

                            div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                    div = div.concat('<div class="col-sm-9 text-left">');
                                        div = div.concat('<h2 class="mb-0">');
                                        div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                        div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                        div = div.concat('</button>');
                                        div = div.concat('</h2>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                        if (index_c > 0) {
                                            div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                        }

                                        if ((index_c+1) < cant_categorias ) {
                                            div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                        }
                                        div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                        div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                    div = div.concat('</div>');
                                div = div.concat('</div>');

                                div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
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
                                                        if (index_p > 0) {
                                                            div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                        }

                                                        if ((index_p+1) < categoria.preguntas.length ) {
                                                            div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                        }
                                                        div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                        div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                        div = div.concat('</a>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            div = div.concat('</div>');
                                        });
                                    }
                                div = div.concat('</div>');
                            div = div.concat('</div>');
                        });

                        $("#acordionCategorias").empty();
                        $("#acordionCategorias").append(div);
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                        $(document.getElementById('collapse'.concat(data.id_categoria))).collapse(true);
                        $('#acordionCategorias #pregunta'.concat(data.id_categoria, '_', data.id_pregunta)).focus();
                    }

                    
                }else{
                    $('#tituloMP').empty();
                    $("#parrafoMP").empty();
                    $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                    $("#parrafoMP").append("Ha ocurrido un error al agregar la Pregunta a la Categoria, intente nuevamente.");
                    $('#modalMensajeNorma').modal({
                      show: true
                    });
                    feather.replace();
                    $('[data-toggle="tooltip"]').tooltip();
                }
            }
            });


            $('#modalAgregarPregunta').modal('hide');
            feather.replace();
            $('[data-toggle="tooltip"]').tooltip();
                
            loader.setAttribute('hidden', '');
            feather.replace();



        }else{
            
        }

    });




    $("#acordionCategorias").on('click', '.up_pregunta', function() {
        var id_norma = document.getElementById('inputIdNorma').value;
        var id_categoria = this.dataset.id_categoria;
        var id_pregunta = this.dataset.id;
        var orden = this.dataset.orden_pregunta;
        var funcion = 1;

        if (id_norma) {
            var baseurl =  window.origin + '/Norma/json_moverCategoriaPregunta';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria: id_categoria, id_pregunta: id_pregunta, funcion: funcion },
                success: function(data) {
                    if (data) {

                        id_norma_form = document.getElementById('inputIdNorma').value;
                        if (id_norma_form.trim() == "") {
                            document.getElementById('inputIdNorma').value = data.id_norma;
                        }

                        var id_categoria_i = null;
                        var div = '';
                        if (data.data_cp_n) {
                            $(".tooltip").tooltip("hide");
                            var cant_categorias = data.data_cp_n.length;
                            $.each(data.data_cp_n, function(index_c, categoria ) {

                                div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                    div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                        div = div.concat('<div class="col-sm-9 text-left">');
                                            div = div.concat('<h2 class="mb-0">');
                                            div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                            div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                            div = div.concat('</button>');
                                            div = div.concat('</h2>');
                                        div = div.concat('</div>');
                                        div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                            if (index_c > 0) {
                                                div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                            }

                                            if ((index_c+1) < cant_categorias ) {
                                                div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                            }
                                            div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                            div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                        div = div.concat('</div>');
                                    div = div.concat('</div>');

                                    div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
                                        if (categoria.preguntas.length > 0) {
                                            $.each(categoria.preguntas, function(index_p, pregunta) {
                                                //contador++;

                                                var id = pregunta.id_pregunta;
                                                var codigo = pregunta.codigo;
                                                var nombre = pregunta.pregunta;
                                                var idCategoria = categoria.id_categoria;

                                                div = div.concat('<div id="pregunta',categoria.id_categoria, '_', pregunta.id_pregunta,'" class="card-body border">');
                                                    div = div.concat('<div class="row">');
                                                        div = div.concat('<div class="col-sm-10 text-left">');
                                                            div = div.concat(pregunta.codigo, ' - ', pregunta.pregunta);
                                                        div = div.concat('</div>');
                                                        div = div.concat('<div class="col-sm-2 text-right">');

                                                            if (index_p > 0) {
                                                                div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                            }

                                                            if ((index_p+1) < categoria.preguntas.length ) {
                                                                div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                            }

                                                            div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                            div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                            div = div.concat('</a>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            });
                                        }
                                    div = div.concat('</div>');
                                div = div.concat('</div>');
                            });

                            $("#acordionCategorias").empty();
                            $("#acordionCategorias").append(div);
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            $(document.getElementById('collapse'.concat(data.id_categoria))).collapse(true);
                            $('#acordionCategorias #pregunta'.concat(data.id_categoria, '_', data.id_pregunta)).focus();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria Reporte, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }
    });

    $("#acordionCategorias").on('click', '.down_pregunta', function() {
        var id_norma = document.getElementById('inputIdNorma').value;
        var id_pregunta = this.dataset.id;
        var id_categoria = this.dataset.id_categoria;
        var orden = this.dataset.orden_pregunta;
        var funcion = 0;

        if (id_norma) {
            var baseurl =  window.origin + '/Norma/json_moverCategoriaPregunta';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria: id_categoria, id_pregunta: id_pregunta, funcion: funcion },
                success: function(data) {
                    if (data) {
                        id_norma_form = document.getElementById('inputIdNorma').value;
                        if (id_norma_form.trim() == "") {
                            document.getElementById('inputIdNorma').value = data.id_norma;
                        }

                        var preguntas_seleccionadas = [];
                        var id_categoria_i = null;
                        var div = '';
                        if (data.data_cp_n) {
                            $(".tooltip").tooltip("hide");
                            var cant_categorias = data.data_cp_n.length;
                            $.each(data.data_cp_n, function(index_c, categoria ) {

                                div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                    div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                        div = div.concat('<div class="col-sm-9 text-left">');
                                            div = div.concat('<h2 class="mb-0">');
                                            div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                            div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                            div = div.concat('</button>');
                                            div = div.concat('</h2>');
                                        div = div.concat('</div>');
                                        div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                            if (index_c > 0) {
                                                div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                            }

                                            if ((index_c+1) < cant_categorias ) {
                                                div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                            }
                                            div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                            div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                        div = div.concat('</div>');
                                    div = div.concat('</div>');

                                    div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
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
                                                            if (index_p > 0) {
                                                                div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                            }

                                                            if ((index_p+1) < categoria.preguntas.length ) {
                                                                div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                            }
                                                            div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                            div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                            div = div.concat('</a>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            });
                                        }
                                    div = div.concat('</div>');
                                div = div.concat('</div>');
                            });

                            $("#acordionCategorias").empty();
                            $("#acordionCategorias").append(div);
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            $(document.getElementById('collapse'.concat(data.id_categoria))).collapse(true);
                            $('#acordionCategorias #pregunta'.concat(data.id_categoria, '_', data.id_pregunta)).focus();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }


    });



    $("#modalAgregarCategoriaReporte").on("show.bs.modal", function () {
         document.getElementById("formAgregarCategoriaReporte").reset();
    });

    $("#formAgregarCategoriaReporte").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#formAgregarCategoriaReporte").validate();
        if ($("#formAgregarCategoriaReporte").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("formAgregarCategoriaReporte");
                var formData = new FormData(form);
                var baseurl = (window.origin + '/Norma/agregarCategoriaReporte');
                var idNorma = document.getElementById('inputIdNorma').value;
                formData.append("inputIdNorma", idNorma);

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
                        if (data.resultado != null && data.resultado == 1) {

                            id_norma_form = document.getElementById('inputIdNorma').value;
                            if (id_norma_form.trim() == "") {
                                document.getElementById('inputIdNorma').value = data.id_norma;
                            }

                            var table = $('#tListaCategoriasReporte').DataTable();
                            table.destroy();
                            $(".tooltip").tooltip("hide");
                            $('#tListaCategoriasReporte').DataTable({
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
                                "data":  data.categorias_norma,
                                searching: true,
                                paging:         true,
                                ordering:       false,
                                info:           true,
                                fixedColumns: true,
                                "order": [[ 1, "asc" ]],
                                "aoColumnDefs" :  [
                                            {'visible': false, 'targets': [0] },
                                            {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                            {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                          ],
                                          createdRow: function (row, data, index) {

                                            row.classList.add('site_heading');
                                            row.id = $(data[0]).text();
                                            row.dataset.order = $(data[1]).text();
                                    //
                                    // if the second column cell is blank apply special formatting
                                    //
        //                                  if (data[1] == "") {
        //                                        console.dir(row);
                                        //$('tr', row).addClass('site_heading');
        //                                }
                                },
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
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');

                            if (data.mensaje.message != null) {
                                $("#parrafoMP").append('</br></br>Codigo: ', data.mensaje.code);
                                $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje.message);
                            }else{
                                if (data.mensaje != null) {
                                    $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                                }
                            }

                            $("#parrafoMP").append(data.mensaje);


                            $('#modalMensajeNorma').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al agregar la Cateogria Reporte, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
                });


                /*var tabla_A = $(document.getElementById("tListaCategoriasReporte")).dataTable();
                var categorias_reporte = tabla_A.fnGetData();
                var id = '<p class="texto-pequenio"></p>';
                var orden = '<p class="texto-pequenio">'.concat((categorias_reporte.length+1), '</p>');
                var titulo = '<p class="texto-pequenio">'.concat(formData.get('inputTituloCR'), '</p>');
                var nombre = '<p class="texto-pequenio">'.concat(formData.get('inputNombreCR'), '</p>');
                var iniciales = '<p class="texto-pequenio">'.concat(formData.get('inputInicialesCR'), '</p>');
                var fecha_creacion = '<p class="texto-pequenio">'.concat(new Date().toLocaleString(), '</p>');
                var boton_subir = '<a id="up" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-up" data-toggle="tooltip" data-placement="top" title="Subir"></i></a>';
                var boton_bajar = '<a id="down" class="view_convenio" style="cursor: pointer;"><i data-feather="corner-left-down" data-toggle="tooltip" data-placement="top" title="Bajar" style="cursor: pointer;"></i></a>';
                var boton = '<a class="trash eliminarCategoriaReporte" href="#" data-id="'.concat((categorias_reporte.length+1), '" ><i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="eliminar"></i></a>');

                categorias_reporte.push([id, orden, titulo, nombre, iniciales, fecha_creacion, boton]);
                tabla_A.fnDestroy();

                $('#tListaCategoriasReporte').DataTable({
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
                    "data":  categorias_reporte,
                    searching: true,
                    paging:         true,
                    ordering:       false,
                    info:           true,
                    "order": [[ 1, "asc" ]],
                    "aoColumnDefs" :  [
                                {'visible': false, 'targets': [0] },
                                {"aTargets" : [0,1,2,3,4], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [5], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                              ],


                                createdRow: function (row, data, index) {
                                    //
                                    // if the second column cell is blank apply special formatting
                                    //
  //                                  if (data[1] == "") {
//                                        console.dir(row);
                                        $('tr', row).addClass('site_heading');
    //                                }
                                },

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
                });*/


                $('#modalAgregarCategoriaReporte').modal('hide');
                feather.replace();
                $('[data-toggle="tooltip"]').tooltip();               
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

    $("#inputCodigo, #inputNombre, #inputObservaciones, #inputSoloTexto, #inputVisible").change(function(e) {
        agregarNormaTemporal();
    });


    function agregarNormaTemporal(){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var form = document.getElementById("agregarNorma");
        var formData = new FormData(form);

        var solo_texto = document.getElementById('inputSoloTexto').checked;
        var visible = document.getElementById('inputVisible').checked;

        formData.append("inputSoloTexto", JSON.stringify(solo_texto));
        formData.append("inputVisible", JSON.stringify(visible));

        var baseurl = (window.origin + '/Norma/agregarNormaTemporal');
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
                    feather.replace();
                    $('[data-toggle="tooltip"]').tooltip();
                    id_norma_form = document.getElementById('inputIdNorma').value;
                    if (id_norma_form.trim() == "") {
                        document.getElementById('inputIdNorma').value = data.id_norma;
                    }
                }else{
                    if (data.id_norma > 0 && data.resultado == 0) {
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                        id_norma_form = document.getElementById('inputIdNorma').value;
                        if (id_norma_form.trim() == "") {
                            document.getElementById('inputIdNorma').value = data.id_norma;
                        }
                    }
                }
                feather.replace();
                $('[data-toggle="tooltip"]').tooltip();
                loader.setAttribute('hidden', '');
            }
        }
        });
        loader.setAttribute('hidden', '');
        feather.replace();
    }

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

                var tabla_rp = $(document.getElementById('tListaCategoriasReporte')).dataTable();
                var categorias_reporte = tabla_rp.fnGetData();

                var categorias_reporte_a = [];

                for (var i = 0; i < categorias_reporte.length; i++) {

                    /*respuestas_preguntas_a[i][0] = $(respuestas_preguntas[i][0])[0].innerText;
                    respuestas_preguntas_a[i][1] = $(respuestas_preguntas[i][1])[0].innerText;
                    respuestas_preguntas_a[i][2] = $(respuestas_preguntas[i][2])[0].innerText;
                    respuestas_preguntas_a[i][3] = $(respuestas_preguntas[i][3])[0].innerText;
                    respuestas_preguntas_a[i][4] = $(respuestas_preguntas[i][4])[0].innerText;*/
                    categorias_reporte_a[i] = [$(categorias_reporte[i][0])[0].innerText, $(categorias_reporte[i][1])[0].innerText, $(categorias_reporte[i][2])[0].innerText, $(categorias_reporte[i][3])[0].innerText, $(categorias_reporte[i][4])[0].innerText]
                }

                formData.append("categorias_reporte", JSON.stringify(categorias_reporte_a));




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
                            
                            var table = $('#tListaCategoriasReporte').DataTable();
                            table.clear().draw();
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


    $("#tablaListaNormas").on('click', '.up_norma, .down_norma', function() {
        var id_norma = this.dataset.id;
        var orden = this.dataset.orden;
        var funcion = null;

        if (this.classList.contains('up_norma')){
            funcion = 1;
        }else{
            funcion = 0;
        }

        if (id_norma && funcion != null) {
            var baseurl =  window.origin + '/Norma/json_moverNorma';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, funcion: funcion },
                success: function(data) {
                    if (data) {
                        if (data.resultado != null && data.resultado == 1) {
                            listarNormas();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');

                            if (data.mensaje.message != null) {
                                $("#parrafoMP").append('</br></br>Codigo: ', data.mensaje.code);
                                $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje.message);
                            }else{
                                if (data.mensaje != null) {
                                    $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                                }
                            }

                            $('#modalMensajeNorma').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria Reporte, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }
    });

    $("#acordionCategorias").on('click', '.down_categoria', function() {
        var id_norma = document.getElementById('inputIdNorma').value;
        var id_categoria = this.dataset.id;
        var orden = this.dataset.orden_categoria;
        var funcion = 0;

        if (id_norma) {
            var baseurl =  window.origin + '/Norma/json_moverCategoriaPregunta';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria: id_categoria, funcion: funcion },
                success: function(data) {
                    if (data) {
                        id_norma_form = document.getElementById('inputIdNorma').value;
                        if (id_norma_form.trim() == "") {
                            document.getElementById('inputIdNorma').value = data.id_norma;
                        }

                        var preguntas_seleccionadas = [];
                        var id_categoria_i = null;
                        var div = '';
                        if (data.data_cp_n) {
                            $(".tooltip").tooltip("hide");
                            var cant_categorias = data.data_cp_n.length;
                            $.each(data.data_cp_n, function(index_c, categoria ) {

                                div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                    div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                        div = div.concat('<div class="col-sm-9 text-left">');
                                            div = div.concat('<h2 class="mb-0">');
                                            div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                            div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                            div = div.concat('</button>');
                                            div = div.concat('</h2>');
                                        div = div.concat('</div>');
                                        div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                            if (index_c > 0) {
                                                div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                            }

                                            if ((index_c+1) < cant_categorias ) {
                                                div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                            }
                                            div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                            div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                        div = div.concat('</div>');
                                    div = div.concat('</div>');

                                    div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
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
                                                            if (index_p > 0) {
                                                                div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                            }

                                                            if ((index_p+1) < categoria.preguntas.length ) {
                                                                div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                            }
                                                            div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
                                                            div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                                            div = div.concat('</a>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            });
                                        }
                                    div = div.concat('</div>');
                                div = div.concat('</div>');
                            });

                            $("#acordionCategorias").empty();
                            $("#acordionCategorias").append(div);
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
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
            if (data.resultado != null && data.resultado == 1) {
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
                if (data.mensaje.message != null) {
                    $("#parrafoMP").append('</br></br>Codigo: ', data.mensaje.code);
                    $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje.message);
                }else{
                    if (data.mensaje != null) {
                        $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                    }
                }
                $('#modalMensajeNorma').modal({
                  show: true
                });
                feather.replace();
                $('[data-toggle="tooltip"]').tooltip();
            }
            feather.replace()
            $('[data-toggle="tooltip"]').tooltip()
            }
        }
        });
    });

    function listarNormas()
    {
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');

        var estado_norma = document.getElementById('sEstadoNorma').value;
        var baseurl = window.origin + '/Norma/listarNormas';
        jQuery.ajax({
        type: "POST",
        url: baseurl,
        dataType: 'json',
        data: {estado_norma: estado_norma},
        success: function(data) {
        if (data)
        {
            var myJSON= JSON.stringify(data);
            myJSON = JSON.parse(myJSON);
            $('#tablaListaNormas').html(myJSON.table_normas);
            feather.replace()
            $('#tListaNormas').dataTable({
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
                ordering:       false,
                info:           true,
                "order": [[ 7, "asc" ]],
                "aoColumnDefs" :  [
                    //{'visible': false, 'targets': [0] },
                    {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                    {"aTargets" : [8, 9, 10, 11], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                ],
                        /*createdRow: function (row, data, index) {

                            row.classList.add('site_heading');
                            row.id = $(data[0]).text();
                            row.dataset.order = $(data[1]).text();
                        },*/
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

    $('#modalAgregarPregunta').on('show.bs.modal', function(e) {

        var id_norma = document.getElementById('inputIdNorma').value;
        if (id_norma) {
            var id_categoria = $(e.relatedTarget).data('id');
            var nombreNorma = $(e.relatedTarget).data('norma');
            
            var baseurl =  window.origin + '/Norma/json_listarPreguntasNorma';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {id_norma: id_norma, id_categoria: id_categoria},
                success: function(data) {
                    if (data) {
                        if (data.resultado != null && data.resultado == 1) {

                            var table = $('#tListaPreguntas').DataTable();
                            table.destroy();
                            $(".tooltip").tooltip("hide");
                            $('#tListaPreguntas').DataTable({
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
                                "data":  data.preguntas_norma,
                                searching: true,
                                paging:         true,
                                ordering:       false,
                                info:           true,
                                fixedColumns: true,
                                select: true,
                                select:{
                                    style:     'os',
                                    className: 'table-success'
                                },
                                "order": [[ 1, "asc" ]],
                                "aoColumnDefs" :  [
                                            //{'visible': false, 'targets': [0] },
                                            {"aTargets" : [0,1,2,3,4], "sClass":  "text-center align-middle registro"},
                                            //{"aTargets" : [5], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                            //{ "aTargets" : [2], "width" : "5%" },
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
                                    "oPaginate": {
                                        "sFirst":    "Primero",
                                        "sLast":    "Último",
                                        "sNext":    "Siguiente",
                                        "sPrevious": "Anterior"
                                    },
                                    select: {
                                        rows: {
                                            _: " Tienes seleccionado %d filas",
                                            0: " Click en fila para seleccionar",
                                            1: " 1 fila seleccionada",
                                        }
                                    },
                                },
                                lengthMenu: [[10, 20], [10, 20]]
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append(data.mensaje);
                            $('#modalMensajeNorma').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }else{
                        $('#tituloMP').empty();
                        $("#parrafoMP").empty();
                        $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                        $("#parrafoMP").append("Ha ocurrido un error al mover la Cateogria Reporte, intente nuevamente.");
                        $('#modalMensajeNorma').modal({
                          show: true
                        });
                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            });
        }
    });


});



window.onload = function () {

    localStorage.removeItem('categorias_seleccionadas');
    localStorage.removeItem('preguntas_seleccionadas');

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarNormas'.toLowerCase())
    {
        $('#tListaNormas').dataTable({
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
            ordering:       false,
            info:           true,
            "order": [[ 7, "asc" ]],
            "aoColumnDefs" :  [
                //{'visible': false, 'targets': [0] },
                {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                {"aTargets" : [8, 9, 10, 11], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
            ],
                    /*createdRow: function (row, data, index) {

                        row.classList.add('site_heading');
                        row.id = $(data[0]).text();
                        row.dataset.order = $(data[1]).text();
                    },*/
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
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'agregarNorma'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'modificarNorma'.toLowerCase())
    {


        if(window.location.pathname.split('/')[2].toLowerCase()  == 'modificarNorma'.toLowerCase())
        {

            var idNorma = document.getElementById('inputIdNorma').value;
            if (idNorma) {
                var baseurl =  window.origin + '/Norma/json_listarCategoriasReporteNorma';
                jQuery.ajax({
                    type: "POST",
                    url: baseurl,
                    dataType: 'json',
                    data: {idNorma: idNorma},
                    success: function(data) {
                        if (data) {

                            $('#tListaCategoriasReporte').DataTable({
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
                                "data":  data.categorias_norma,
                                searching: true,
                                paging:         true,
                                ordering:       false,
                                info:           true,
                                //columnDefs: [
                                //    { width: '20%', targets: 0 }
                                //],
                                fixedColumns: true,
                                //scrollX:        true,
                                //scrollCollapse: true,
                                //scrollY:        "500px",

                                "order": [[ 1, "asc" ]],
                                "aoColumnDefs" :  [
                                            {'visible': false, 'targets': [0] },
                                            {"aTargets" : [0,1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                            {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                          ],
                                          createdRow: function (row, data, index) {

                                            row.classList.add('site_heading');
                                            row.id = $(data[0]).text();
                                            row.dataset.order = $(data[1]).text();
                                    //
                                    // if the second column cell is blank apply special formatting
                                    //
  //                                  if (data[1] == "") {
//                                        console.dir(row);
                                        //$('tr', row).addClass('site_heading');
    //                                }
                                },
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
                                    },
                                    select: {
                                        rows: {
                                            _: "Tienes seleccionado %d filas",
                                            0: "Click en fila para seleccionar",
                                            1: "1 fila seleccionada",
                                        }
                                    },
                                },
                                lengthMenu: [[20], [20]]
                            });
                            feather.replace();
                        }else{
                            $('#tListaCategoriasReporte').DataTable({
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
                                ordering:       false,
                                info:           true,
                                "order": [[ 1, "asc" ]],
                                "aoColumnDefs" :  [
                                            {'visible': false, 'targets': [0] },
                                            {"aTargets" : [0,1,2,3,4], "sClass":  "text-center align-middle registro"},
                                            {"aTargets" : [5], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
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
                            var cant_categorias = data.data_cp_n.length;
                            $.each(data.data_cp_n, function(index_c, categoria ) {

                                div = div.concat('<div class="card" id="categoria',categoria.id_categoria,'">');

                                    div = div.concat('<div class="card-header row" id="heading',categoria.id_categoria,'">');
                                        div = div.concat('<div class="col-sm-9 text-left">');
                                            div = div.concat('<h2 class="mb-0">');
                                            div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse',categoria.id_categoria,'" aria-expanded="false" aria-controls="collapse',categoria.id_categoria,'">');
                                            div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                            div = div.concat('</button>');
                                            div = div.concat('</h2>');
                                        div = div.concat('</div>');
                                        div = div.concat('<div id="agregarPregunta',categoria.id_categoria,'" class="col-sm-3 text-right">');
                                            if (index_c > 0) {
                                                div = div.concat('<a class="btn btn-link up_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Categor&iacute;a"></i></a>');
                                            }

                                            if ((index_c+1) < cant_categorias ) {
                                                div = div.concat('<a class="btn btn-link down_categoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Categor&iacute;a"></i></a>');
                                            }

                                            div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                            div = div.concat('<a class="btn btn-link agregarPregunta" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_categoria="',categoria.orden_categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Pregunta</a>'); 
                                        div = div.concat('</div>');
                                    div = div.concat('</div>');

                                    div = div.concat('<div id="collapse',categoria.id_categoria,'" class="collapse" aria-labelledby="heading',categoria.id_categoria,'" data-parent="#acordionCategorias">');
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

                                                            if (index_p > 0) {
                                                                div = div.concat('<a class="btn btn-link up_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-up" class="pb-1" data-toggle="tooltip" data-placement="top" title="Subir Pregunta"></i></a>');
                                                            }

                                                            if ((index_p+1) < categoria.preguntas.length ) {
                                                                div = div.concat('<a class="btn btn-link down_pregunta" data-id="',pregunta.id_pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'" style="cursor: pointer;"><i stop-color data-feather="corner-left-down" class="pb-1" data-toggle="tooltip" data-placement="top" title="Bajar Pregunta"></i></a>');
                                                            }
                                                            div = div.concat('<a id="trash_',pregunta.id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',pregunta.id_pregunta,'" data-codigo="',pregunta.codigo,'" data-nombre="',pregunta.pregunta,'" data-id_categoria="',categoria.id_categoria,'" data-orden_pregunta="',pregunta.orden_pregunta,'">');
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