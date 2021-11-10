 $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    feather.replace();

    //$('.stepper').mdbStepper();

    $('#btnSeleccionarE').on('click', function(e) {
        var tabla = $('#tListaEmpresas').DataTable();
        var data = tabla.rows({selected:  true}).data();
        if (data.length > 0) {
            var id = data[0][0];
            var rut = data[0][1];
            var nombre = data[0][2];

            $('#inputEmpresaMantenedora').val(rut.concat(' - ', nombre));
            $('#idEmpresaMantenedora').val(id);
            $('#modalBuscarEmpresa').modal('hide');
        }else{
            $('#inputEmpresaMantenedora').val('');
            $('#idEmpresaMantenedora').val('');
            $('#modalBuscarEmpresa').modal('hide');
        }
        
    });

    $('#modalBuscarEmpresa').on('shown.bs.modal', function () {
    //$('#tListaNormas').on('click', '.seleccionNorma', function(e) {
        
        var baseurl =  window.origin + '/Empresa/json_listarEmpresas';
        jQuery.ajax({
            type: "POST",
            url: baseurl,
            dataType: 'json',
            //data: {idNorma: idNorma},
            success: function(data) {
                if (data) {
                    

                    if (data.empresas_mantenedoras.length > 0) {
                        var tabla_e = $(document.getElementById("tListaEmpresas")).dataTable();
                        tabla_e.fnDestroy();
                        $('#tListaEmpresas').DataTable( {
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
                            "data": data.empresas_mantenedoras,
                            searching: true,
                            paging:         true,
                            ordering:       true,
                            info:           true,
                            select: true,
                            select:{
                                style:     'os',
                                className: 'table-success'
                            },
                            language: {
                                select: {
                                    rows: {
                                        _: " Tienes %d filas seleccionadas",
                                        0: " Haz click para seleccionar una fila",
                                        1: " 1 fila seleccionada"
                                    }
                                }
                            },
                            
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

                        feather.replace();
                        $('[data-toggle="tooltip"]').tooltip();
                    }
                }
            }
        });
    });

    
    $("#agregarInspeccion").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarInspeccion").validate();
        if ($("#agregarInspeccion").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
/*var imagenes = document.getElementsByClassName('img-thumbnail');
                for (var i = 0; i < imagenes.length; i++) {
                    var input_file = null;

                    const img = document.getElementById(imagenes[i].id) 
                    fetch(imagenes[i].src)
                    .then(res => res.blob())
                    .then(blob => {
                      const file = new File([blob], 'dot.png', blob)
                      input_file = file;

                      let container = new DataTransfer();
                      container.items.add(file);

                      //fileInputElement.files = container.files;

                      var imagenes = document.getElementsByClassName('img-thumbnail');
                      var x = document.createElement("INPUT");
                       x.setAttribute("type", "file");
                       x.files = container.files;

                       var div = document.getElementById('div_'.concat('6_1'));
                       div.append(x);
                       //var form = document.getElementById("agregarInspeccion");
                       //var formData = new FormData(form);
                       //formData.append('picture_'.concat(imagenes[0].id), x);


                       //var avatar = document.getElementById('avatar');
                       //avatar.value = blob;


                      //
                      //formData.append('file_111', blob);
                      console.log(input_file);
                      

                      /*let reader = new FileReader();
                        reader.onload = function(e) {
                            let blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });
                            console.log(blob);
                        };
                        reader.readAsArrayBuffer(file);

                        console.log(blob);*/


                      //var fr = new FileReader();
                       //formData.append('file_'.concat(imagenes[0].id), input_file);
/*  });  */

                    //var image = imagenes[i].src;
                    //var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
                    //var blob = base64ToBlob(base64ImageContent, 'image/png');
                    //formData.append('file_'.concat(imagenes[i].id), blob);
                    
/* }*/
                /*const img = document.getElementById('#id_front') 
                fetch(image.src)
                .then(res => res.blob())
                .then(blob => {
                  const file = new File([blob], 'dot.png', blob);
                  
                });*/   

                e.preventDefault();
                var form = document.getElementById("agregarInspeccion");
                var formData = new FormData(form);



                var baseurl = (window.origin + '/Inspeccion/agregarInspeccion');
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
                            $('#modalMensajeInspeccion').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarInspeccion").reset();
                        }else{
                            $('#tituloMP').empty();
                            $("#parrafoMP").empty();
                            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoMP").append('Ha ocurrido un error al intentar agregar la Inspeccion.');
                            $("#parrafoMP").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalMensajeInspeccion').modal({
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

    $("#agregarInspeccion").validate({
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
            //required: true,
            minlength: 1,
            maxlength: 30
          },
          inputNombre: {
            //required: true,
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

    $("#modalMensajeInspeccion").on("hidden.bs.modal", function () {
        var pagina = window.location.pathname.split('/')[2].toLowerCase();
        if (pagina == "modificarinspeccion") {
            location.reload();
        }
    });


    $('#rbSiCarpeta').on('click',  function(e) {
        $('#acordeonCarpeta').collapse('show');
    });


    $('#rbNoCarpeta').on('click',  function(e) {
        $('#acordeonCarpeta').collapse('hide');
    });

    $('#modalMensajeInspeccion').on('hidden.bs.modal', function(e) {
        location.reload();   
    });
    

    $('#acordionCategorias').on('click', '.quitarImagen', function(e) {
        var id = e.currentTarget.dataset.id;
        var id_div = e.currentTarget.dataset.id_div;
        var div_image = document.getElementById('div_image_'.concat(id));
        div_image.remove();

        for (var i = 1; i < document.getElementById('div_'.concat(id_div)).children.length; i++) {
            var div = document.getElementById('div_'.concat(id_div)).children[i];
            div.id = 'div_image_'.concat(id_div, '_', i);
            div.children[1].id = id_div.concat('_', i);
        }

    });

    $('#acordionCategorias').on('click', '.rbSI, .rbNA', function(e) {
        var id_categoria = e.currentTarget.dataset.id_categoria;
        var id_pregunta = e.currentTarget.dataset.id_pregunta;
        $('#cat_pre_'.concat(id_categoria, '_',id_pregunta)).collapse('hide');
    });


    $('#acordionCategorias').on('click', '.rbNO', function(e) {
        var id_categoria = e.currentTarget.dataset.id_categoria;
        var id_pregunta = e.currentTarget.dataset.id_pregunta;
        $('#cat_pre_'.concat(id_categoria, '_',id_pregunta)).collapse('show');
    });

    $('#acordionCategorias').on('click', '.pauta', function(e) {
        var id_categoria = e.currentTarget.dataset.id_categoria;
        var contador = 0;
        if($(e.currentTarget).is(':checked')) {
            
            var table = document.getElementById('tabla_'.concat(id_categoria));
            var rowLength = table.rows.length;

            for(var i=0; i<rowLength; i+=1){
              var row = table.rows[i];

                if (row.classList.contains('preguntas')) {
                    var cellLength = row.cells.length;
                    for(var y=0; y<cellLength; y+=1){
                        var cell = row.cells[y];
                        if (cell.classList.contains('radio')) {
                            if($(cell.firstElementChild).is(':checked') ){
                                contador++;
                            }
                        }
                    }
                }
            }
        }

        if (contador > 0) {

            var badge = document.getElementById('conteo_'.concat(id_categoria));
            var badge_total = document.getElementById('total_conteo_'.concat(id_categoria));
            var boton_principal = document.getElementById('button_cat_'.concat(id_categoria));

            if(parseInt(badge_total.textContent) == contador){
                badge_total.classList.remove("badge-primary");
                badge_total.classList.remove("badge-success");
                badge_total.classList.add("badge-success");
                badge.classList.remove("badge-warning");
                badge.classList.remove("badge-danger");
                badge.classList.add("badge-success");
                badge.textContent = contador;

                var boton_principal = document.getElementById('button_cat_'.concat(id_categoria));
                boton_principal.classList.remove('btn-outline-success');
                boton_principal.classList.remove('btn-outline-warning');
                boton_principal.classList.add('btn-outline-success');
            }else{
                boton_principal.classList.remove('btn-outline-success');
                boton_principal.classList.remove('btn-outline-warning');
                boton_principal.classList.add('btn-outline-warning');
                badge_total.classList.remove("badge-success");
                badge_total.classList.remove("badge-primary");
                badge_total.classList.add("badge-primary");
                
                badge.classList.remove("badge-success");
                badge.classList.remove("badge-danger");
                badge.classList.add("badge-warning");
                badge.textContent = contador;
            }


        }

    });
     $('#modalFoto').on('shown.bs.modal', function () {
        var isMobile = false; //initiate as false
        // device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }
        alert(isMobile);

    }

    $('#seleccionarFoto').on('click',  function(e) {
        var id = document.getElementById('seleccionarFoto').dataset.id;
        var data_image = document.getElementById('id_front').src;


        //$(document.getElementById('pregunta_', id)).prepend($('<img>',{id:'foto_1_'.concat(id),src:data_image}));
        var img = '';
        img = img.concat('<img id="foto_1_',id,'" src="',data_image,'"/>');
        $(document.getElementById('div_', id)).append(img);

        //<button type="submit" class="close">
        //<span>&times;</span>
        //</button>
        
         
        var div = document.createElement("div");
        //div.setAttribute('class', 'img-responsive content_area');
        div.setAttribute('class', 'col-sm-2');
        //div.width = '170px !important';
        //div.setAttribute('style', ' width: 170px!important;');
        div.id = 'div_image_'.concat(id, '_', ($('#div_'.concat(id)).children('input').length+1));

        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute('class', 'close');
        button.setAttribute('aria-label', 'Close');

        var span = document.createElement("span");
        span.setAttribute('class', 'close quitarImagen');
        span.setAttribute('aria-hidden', 'true');
        span.textContent = "×";
        span.id = 'close_'.concat(id);
        span.dataset.id = id.concat('_', ($('#div_'.concat(id)).children('input').length+1));
        span.dataset.id_div = id;
        button.append(span);
        

        var image = document.createElement("IMG");
        image.alt = "Alt information for image";
        image.setAttribute('class', 'photo img-thumbnail');
        image.src = data_image;
        image.width = '150';
        image.id = id.concat('_', ($('#div_'.concat(id)).children('input').length+1));


        div.append(button);
        div.append(image);

        const img2 = document.getElementById(image.id)
                    fetch(data_image)
                    .then(res => res.blob())
                    .then(blob => {
                        
                        const file = new File([blob], 'picture_'.concat(id, '_',($('#div_'.concat(id)).children('input').length+1)), blob)
                        input_file = file;

                        let container = new DataTransfer();
                        container.items.add(file);
                        var x = document.createElement("INPUT");
                        x.setAttribute("type", "file");
                        x.files = container.files;
                        x.id = 'picture_'.concat(id, '_',($('#div_'.concat(id)).children('input').length+1));
                        x.name = 'picture_'.concat(id, '_',($('#div_'.concat(id)).children('input').length+1));
                        x.setAttribute("hidden", true);
                        $('#div_'.concat(id)).append(x);

                    });





        $('#div_'.concat(id)).append(div);
        //$(document.getElementById('foto_1_'.concat(id))).attr('src', data_image);
        //$(document.getElementById('foto_1_'.concat(id))).attr('width', '150px');
        $('#id_front').hide();
        $('#video-stream').show();

    });

    $('#acordionCategorias').on('click', '.tomarFoto', function (e) {
      var id = $(e.currentTarget).data('id');
      document.getElementById('seleccionarFoto').dataset.id = id;
    })

    $('#tListaNormas').on('click', '.seleccionNorma', function(e) {
        var idNorma = $(e.currentTarget).data('id');
        var norma = $(e.currentTarget).data('nombre');
        $('#inputNorma').val(norma);
        $('#idNorma').val(idNorma);
        $('#modalBuscarNorma').modal('hide');
        if (idNorma) {
            var baseurl =  window.origin + '/Norma/json_listarCategoriasPreguntas';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {idNorma: idNorma},
                success: function(data) {
                    if (data) {
                        if (data.data) {
                            var preguntas_seleccionadas = JSON.parse(localStorage.getItem("preguntas_seleccionadas"));
                            if (preguntas_seleccionadas != null && preguntas_seleccionadas.length > 0) {
                              localStorage.setItem("preguntas_seleccionadas", JSON.stringify(data.data));

                            }else{
                              localStorage.setItem("preguntas_seleccionadas", JSON.stringify(data.data));

                            }
                        }

                        if (data.data_cp_n) {
                            var id_categoria_i = null;
                            var div = '';
                            var expandido = 'true';
                            $("#acordionCategorias").empty();

                            var inputTC = '';
                            inputTC = inputTC.concat('<input type="text" class="form-control form-control-sm" id="inputTotalCategorias" name="inputTotalCategorias" value="',data.data_total.length,'" hidden>');
                            for (var i = 0; i < data.data_total.length; i++) {
                                inputTC = inputTC.concat('<input type="text" class="form-control form-control-sm" id="inputTotalPreguntas_',(i+1),'" name="inputTotalPreguntas_',(i+1),'" value="',data.data_total[i].cantPreguntas,'" hidden>');
                            }

                            var contador = 0;

                            for (var i = 0; i < data.data_cp_n.length; i++) {
                                var id_categoria = data.data_cp_n[i][2];
                                var id_pregunta = data.data_cp_n[i][3];
                                var cod_categoria = data.data_cp_n[i][4];
                                var categoria = data.data_cp_n[i][5];
                                var cod_pregunta = data.data_cp_n[i][6];
                                var pregunta = data.data_cp_n[i][7];
                                var cant_preguntas = 0;

                                contador++;

                                if (id_categoria_i != id_categoria)
                                {
                                    if (id_categoria_i) {
                                        div = div.concat('</tbody>');
                                        div = div.concat('</table>');
                                        div = div.concat('</div>');
                                        div = div.concat('</div>');
                                    }

                                    const cantPreguntas = data.data_total.find(categoria => categoria.id_categoria === id_categoria);
                                    if (cantPreguntas) {
                                        cant_preguntas = cantPreguntas.cantPreguntas;
                                    }else{
                                        cant_preguntas = 0;
                                    }

                                        
                                    div = div.concat('<div id="categoria',id_categoria,'" class="card card-body">');
                                    div = div.concat('<div class="table-responsive">');
                                    div = div.concat('<table id="tabla_',id_categoria,'" class="table">');
                                    div = div.concat('<thead>');
                                    div = div.concat('<tr class="border-1">');
                                    div = div.concat('<td colspan="3" class="ml-3 text-left">');
                                    div = div.concat('<h5 class="mb-0">');
                                    div = div.concat('<button id="button_cat_',id_categoria,'" class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#tbodyCategoria',id_categoria,'" aria-expanded="true" aria-controls="tbodyCategoria',id_categoria,'">');
                                    div = div.concat(cod_categoria, ' - ', categoria);
                                    div = div.concat('</button>');

                                    div = div.concat('</h5>');
                                    div = div.concat('</td>');
                                    div = div.concat('<td colspan="3" class="text-right">');
                                    div = div.concat('<span id="conteo_',id_categoria,'" class="badge badge-danger badge-pill">0</span>  /  <span id="total_conteo_',id_categoria,'" class="badge badge-primary badge-pill">',cant_preguntas,'</span>');
                                    div = div.concat('<a class="btn btn-link agregarObservacion" data-id="',id_categoria,'" data-codigo="',cod_categoria,'" data-nombre="',categoria,'" data-toggle="modal" data-target="#modalAgregarObservacion"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>');
                                    div = div.concat('</td>');
                                    div = div.concat('</tr>');
                                    div = div.concat('</thead>');
                                    //div = div.concat('<thead>');
                                    
                                    //div = div.concat('</thead>');
                                    div = div.concat('<tbody id="tbodyCategoria',id_categoria,'" class="collapse show" aria-labelledby="categoria',id_categoria,'" data-parent="#categoria',id_categoria,'" >');

                                    div = div.concat('<tr>');
                                    div = div.concat('<th scope="col" class="text-center align-middle">#</th>');
                                    div = div.concat('<th scope="col" class="text-center align-middle">Codigo</th>');
                                    div = div.concat('<th scope="col" class="text-center align-middle">Pregunta</th>');
                                    div = div.concat('<th scope="col" class="text-center align-middle">SI</th>');
                                    div = div.concat('<th scope="col" class="text-center align-middle">NO</th>');
                                    div = div.concat('<th scope="col" class="text-center align-middle">N/A</th>');
                                    div = div.concat('</tr>');


                                    div = div.concat('<tr class="pregunta',id_categoria,'_',id_pregunta,' preguntas">');
                                    div = div.concat('<th class="text-center align-middle"><p>',id_categoria,'_',id_pregunta,'</p></th>');
                                    div = div.concat('<th class="text-center align-middle"><p>',cod_pregunta,'</p></th>');
                                    div = div.concat('<td class="text-center align-middle"><p>',pregunta,'</p></td>');
                                    div = div.concat('<td class="text-center align-middle radio"><input type="radio" id="rbPregunta',contador,'_SI" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbSI" data-id_categoria="',id_categoria,'" data-id_pregunta="',id_pregunta,'" value="si-',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('<td class="text-center align-middle radio"><input type="radio" id="rbPregunta',contador,'_NO" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNO" data-id_categoria="',id_categoria,'" data-id_pregunta="',id_pregunta,'" value="no-',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('<td class="text-center align-middle radio"><input type="radio" id="rbPregunta',contador,'_NA" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNA" data-id_categoria="',id_categoria,'" data-id_pregunta="',id_pregunta,'" value="na-',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('</tr>');
                                    
                                    div = div.concat('<tr>');
                                    div = div.concat('<td id="cat_pre_',id_categoria,'_',id_pregunta,'" class="collapse" colspan="6">');
                                    div = div.concat('<div class="card card-body">');
                                    div = div.concat('<div class="row">');
                                    div = div.concat('<div class="col-sm-6">');
                                    div = div.concat('<label for="inputObservaciones',id_categoria,'_',id_pregunta,'">Observaciones</label>');
                                    div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div id="div_',id_categoria,'_',id_pregunta,'" class="col-sm-6 row">');

                                    //div = div.concat('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalFoto">Tomar una Foto</button>');
                                    
                                    div = div.concat('<div class="col-sm-2">');
                                    div = div.concat('<button type="button" class="btn btn-primary tomarFoto" data-toggle="modal" data-target="#modalFoto" data-id="',id_categoria,'_',id_pregunta,'">Tomar una Foto</button>');
                                    div = div.concat('</div>');
                                    /*div = div.concat('<img id="foto_1_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_2_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_3_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_4_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_5_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');*/
                                    //div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                    //div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</td>');
                                    div = div.concat('</tr>');

                                    id_categoria_i = id_categoria;
                                }else{

                                    div = div.concat('<tr class="pregunta',id_categoria,'_',id_pregunta,' preguntas">');
                                    div = div.concat('<th class="text-center align-middle"><p>',id_categoria,'_',id_pregunta,'</p></th>');
                                    div = div.concat('<th class="text-center align-middle"><p>',cod_pregunta,'</p></th>');
                                    div = div.concat('<td class="text-center align-middle"><p>',pregunta,'</p></td>');
                                    div = div.concat('<td class="text-center align-middle radio"><input type="radio" id="rbPregunta',contador,'_SI" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbSI" data-id_categoria="',id_categoria,'" data-id_pregunta="',id_pregunta,'" value="si-',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('<td class="text-center align-middle radio"><input type="radio" id="rbPregunta',contador,'_NO" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNO" data-id_categoria="',id_categoria,'" data-id_pregunta="',id_pregunta,'" value="no-',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('<td class="text-center align-middle radio"><input type="radio" id="rbPregunta',contador,'_NA" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNA" data-id_categoria="',id_categoria,'" data-id_pregunta="',id_pregunta,'" value="na-',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('</tr>');
                                    
                                    div = div.concat('<tr>');
                                    div = div.concat('<td id="cat_pre_',id_categoria,'_',id_pregunta,'" class="collapse" colspan="6">');
                                    div = div.concat('<div class="card card-body">');
                                    div = div.concat('<div class="row">');
                                    div = div.concat('<div class="col-sm-6">');
                                    div = div.concat('<label for="inputObservaciones',id_categoria,'_',id_pregunta,'">Observaciones</label>');
                                    div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div id="div_',id_categoria,'_',id_pregunta,'" class="col-sm-6 row">');
                                    div = div.concat('<div class="col-sm-2">');
                                    div = div.concat('<button type="button" class="btn btn-primary tomarFoto" data-toggle="modal" data-target="#modalFoto" data-id="',id_categoria,'_',id_pregunta,'">Tomar una Foto</button>');
                                    div = div.concat('</div>');
                                    /*div = div.concat('<img id="foto_1_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_2_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_3_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_4_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                    div = div.concat('<img id="foto_5_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');*/
                                    //div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                    //div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</td>');
                                    div = div.concat('</tr>');
                                }
                            }
                            div = div.concat('</div>');
                            div = div.concat('</div>');
                            $("#acordionCategorias").append(inputTC);
                            $("#acordionCategorias").append(div);
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    }
                }
            });
        }
      });

});


window.onload = function () {
    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarInspecciones'.toLowerCase())
    {
        $('#tListaInspecciones').dataTable({
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

    if(window.location.pathname.split('/')[2].toLowerCase() == 'agregarInspeccion'.toLowerCase())
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
        feather.replace();
    }
}