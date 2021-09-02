 $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    feather.replace();


    // retake photo
    /*if ($(this).hasClass('retake') && $(this).siblings('.image').find('input[type="text"]').val() != '' &&
    $(this).siblings('.image').find('input[type="text"]').val().length > 0) {
        $('.next').hide();
        $(this).removeClass('btn-outline-secondary').addClass('btn-secondary');
        refreshVideoStream('#' + $(this).parent('fieldset').attr('id'), true);
        $('.cameras').show();
        return false;
    }
    // save photo data
    //var photoData = takePhoto();
    //var base64data = $(this).siblings('.image').find('img').attr('src').split(',');
    $(this).removeClass('btn-secondary');
    //$(this).siblings('.image').find('input[type="text"]').val(photoData);
    //$(this).siblings('.image').find('img').attr('src', photoData).show().addClass('border border-success card-body');
    //$(this).siblings('h3').html(lang[app_locale]['check_orientation']);
    $(this).siblings('img.check-orientation').show();
    //$(this).text(lang[app_locale]['retake']).addClass('btn-outline-secondary retake');
    $('#video-stream').hide();
    $('.cameras').hide();
    $('.btn.rotate').show();
    $('.next').show();
    checkApiFormData();*/

   $("#agregarInspeccion").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#agregarInspeccion").validate();
        if ($("#agregarInspeccion").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
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

                            for (var i = 0; i < data.data_cp_n.length; i++) {
                                var id_categoria = data.data_cp_n[i][2];
                                var id_pregunta = data.data_cp_n[i][3];
                                var cod_categoria = data.data_cp_n[i][4];
                                var categoria = data.data_cp_n[i][5];
                                var cod_pregunta = data.data_cp_n[i][6];
                                var pregunta = data.data_cp_n[i][7];
                                var cant_preguntas = 0;

                                if (id_categoria_i != id_categoria)
                                {
                                    if (id_categoria_i) {
                                        div = div.concat('</tbody>');
                                        div = div.concat('</table>');
                                        div = div.concat('</div>');
                                    }

                                    const cantPreguntas = data.data_total.find(categoria => categoria.id_categoria === id_categoria);
                                    if (cantPreguntas) {
                                        cant_preguntas = cantPreguntas.cantPreguntas;
                                    }else{
                                        cant_preguntas = 0;
                                    }

                                        
                                    div = div.concat('<div id="categoria',id_categoria,'" class="card card-body">');
                                    div = div.concat('<table class="table">');
                                    div = div.concat('<thead>');
                                    div = div.concat('<tr class="border-1">');
                                    div = div.concat('<td colspan="3" class="ml-3 text-left">');
                                    div = div.concat('<h5 class="mb-0">');
                                    div = div.concat('<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#tbodyCategoria',id_categoria,'" aria-expanded="true" aria-controls="tbodyCategoria',id_categoria,'">');
                                    div = div.concat(cod_categoria, ' - ', categoria);
                                    div = div.concat('</button>');

                                    div = div.concat('</h5>');
                                    div = div.concat('</td>');
                                    div = div.concat('<td colspan="3" class="text-right">');
                                    div = div.concat('<span class="badge badge-danger badge-pill">0</span>  /  <span class="badge badge-primary badge-pill">',cant_preguntas,'</span>');
                                    div = div.concat('<a class="btn btn-link agregarObservacion" data-id="',id_categoria,'" data-codigo="',cod_categoria,'" data-nombre="',categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>');
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


                                    div = div.concat('<tr class="pregunta',id_categoria,'_',id_pregunta,'">');
                                    div = div.concat('<th class="text-center align-middle"><p>',id_categoria,'_',id_pregunta,'</p></th>');
                                    div = div.concat('<th class="text-center align-middle"><p>',cod_pregunta,'</p></th>');
                                    div = div.concat('<td class="text-center align-middle"><p>',pregunta,'</p></td>');
                                    div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbPregunta',id_categoria,'_',id_pregunta,'" class="pauta"></td>');
                                    div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbPregunta',id_categoria,'_',id_pregunta,'" class="pauta" data-toggle="collapse" data-target="#collapseExample',id_categoria,'_',id_pregunta,'" aria-expanded="false" aria-controls="collapseExample',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbPregunta',id_categoria,'_',id_pregunta,'" class="pauta"></td>');
                                    div = div.concat('</tr>');
                                    
                                    div = div.concat('<tr>');
                                    div = div.concat('<td id="collapseExample',id_categoria,'_',id_pregunta,'" class="collapse" colspan="6">');
                                    div = div.concat('<div class="card card-body">');
                                    div = div.concat('<div class="row">');
                                    div = div.concat('<div class="col-sm-6">');
                                    div = div.concat('<label for="inputObservaciones',id_categoria,'_',id_pregunta,'">Observaciones</label>');
                                    div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',id_categoria,'_',id_pregunta,'" name="inputObservaciones',id_categoria,'_',id_pregunta,'" rows="2"></textarea>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div class="col-sm-6">');

                                    div = div.concat('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalFoto">Tomar una Foto</button>');
                                    div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                    div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</td>');
                                    div = div.concat('</tr>');

                                    id_categoria_i = id_categoria;
                                }else{

                                    div = div.concat('<tr class="pregunta',id_categoria,'_',id_pregunta,'">');
                                    div = div.concat('<th class="text-center align-middle"><p>',id_categoria,'_',id_pregunta,'</p></th>');
                                    div = div.concat('<th class="text-center align-middle"><p>',cod_pregunta,'</p></th>');
                                    div = div.concat('<td class="text-center align-middle"><p>',pregunta,'</p></td>');
                                    div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbPregunta',id_categoria,'_',id_pregunta,'" class="pauta"></td>');
                                    div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbPregunta',id_categoria,'_',id_pregunta,'" class="pauta" data-toggle="collapse" data-target="#collapseExample',id_categoria,'_',id_pregunta,'" aria-expanded="false" aria-controls="collapseExample',id_categoria,'_',id_pregunta,'"></td>');
                                    div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbPregunta',id_categoria,'_',id_pregunta,'" class="pauta"></td>');
                                    div = div.concat('</tr>');
                                    
                                    div = div.concat('<tr>');
                                    div = div.concat('<td id="collapseExample',id_categoria,'_',id_pregunta,'" class="collapse" colspan="6">');
                                    div = div.concat('<div class="card card-body">');
                                    div = div.concat('<div class="row">');
                                    div = div.concat('<div class="col-sm-6">');
                                    div = div.concat('<label for="inputObservaciones',id_categoria,'_',id_pregunta,'">Observaciones</label>');
                                    div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',id_categoria,'_',id_pregunta,'" name="inputObservaciones',id_categoria,'_',id_pregunta,'" rows="2"></textarea>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div class="col-sm-6">');
                                    div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                    div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</td>');
                                    div = div.concat('</tr>');
                                }

                                /*'<div class="card card-body">
                                    <table class="table">
                                        <thead>
                                        <tr class="border-1">
                                            <td colspan="3" class="ml-3 text-left">
                                                <h5 class="mb-0">
                                                    1.1.1.1 - CABINA
                                                </h5>
                                            </td>
                                            <td colspan="3" class="text-right">
                                                <span class="badge badge-danger badge-pill">0</span>  /  <span class="badge badge-primary badge-pill">12</span>
                                                <a class="btn btn-link agregarObservacion" data-id="6" data-codigo="6" data-nombre="CABINA" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>
                                            </td>
                                        </tr>
                                        </thead>
                                      <thead>
                                        <tr>
                                          <th scope="col" class="text-center align-middle">#</th>
                                          <th scope="col" class="text-center align-middle">Codigo</th>
                                          <th scope="col" class="text-center align-middle">Pregunta</th>
                                          <th scope="col" class="text-center align-middle">SI</th>
                                          <th scope="col" class="text-center align-middle">NO</th>
                                          <th scope="col" class="text-center align-middle">N/A</th>
                                        </tr>
                                      </thead>

                                      <tbody id="tbodyHerramientas">
                                        <?php
                                        if(isset($carpetas))
                                        {
                                            foreach ($carpetas as $carpeta): ?>
                                                <tr class="pregunta',id_pregunta,'">
                                                    <th class="text-center align-middle"><p>',id_pregunta,'</p></th>
                                                    <th class="text-center align-middle"><p><?php echo $carpeta['codigo']; ?></p></th>
                                                    <td class="text-center align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>
                                                    <td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta"></td>
                                                    <td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta" data-toggle="collapse" data-target="#collapseExample',id_pregunta,'" aria-expanded="false" aria-controls="collapseExample',id_pregunta,'"></td>
                                                    <td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta"></td>
                                                </tr>
                                                <tr>
                                                    <td id="collapseExample',id_pregunta,'" class="collapse" colspan="6">
                                                        <div class="card card-body">
                                                            <div class="row">
                                                                <div class="col-sm-6">
                                                                    <label for="inputObservaciones',id_pregunta,'">Observaciones</label>
                                                                    <textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',id_pregunta,'" name="inputObservaciones',id_pregunta,'" rows="2"><?php if(isset($carpeta['observaciones'])): echo $carpeta['observaciones']; endif; ?></textarea>
                                                                </div>
                                                                <div class="col-sm-6">
                                                                    
                                                                        <label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>
                                                                        <a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <?php endforeach;
                                        }?>
                                      </tbody>
                                    </table>
                                </div>';*/

                                /*if (id_categoria_i != id_categoria)
                                {
                                    if (id_categoria_i) {
                                        div = div.concat('</div>');
                                        div = div.concat('</div>');
                                    }
                                    div = div.concat('<div class="card card-body">');
                                    div = div.concat('<table class="table">');
                                        div = div.concat('<thead>');
                                        div = div.concat('<tr class="border-1">');
                                            div = div.concat('<td colspan="3" class="ml-3 text-left">');
                                                div = div.concat('<h5 class="mb-0">');
                                                    div = div.concat(categoria);
                                                div = div.concat('</h5>');
                                            div = div.concat('</td>');
                                            div = div.concat('<td colspan="3" class="text-right">');

                                             var encontrado = data.data_total.find(categori => categori.id_categoria === id_categoria.trim());
                                            if (encontrado) {
                                                div = div.concat('<span class="badge badge-danger badge-pill">0</span>  /  ');
                                                div = div.concat('<span class="badge badge-primary badge-pill">',encontrado.cantPreguntas,'</span>');
                                            }

                                                //div = div.concat('<span class="badge badge-danger badge-pill">0</span>  /  <span class="badge badge-primary badge-pill">12</span>');
                                                div = div.concat('<a class="btn btn-link agregarObservacion" data-id="',id_categoria,'" data-codigo="',id_categoria,'" data-nombre="',categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>');
                                            div = div.concat('</td>');
                                        div = div.concat('</tr>');
                                        div = div.concat('</thead>');
                                      div = div.concat('<thead>');
                                        div = div.concat('<tr>');
                                          div = div.concat('<th scope="col" class="text-center align-middle">#</th>');
                                          div = div.concat('<th scope="col" class="text-center align-middle">Codigo</th>');
                                          div = div.concat('<th scope="col" class="text-center align-middle">Pregunta</th>');
                                          div = div.concat('<th scope="col" class="text-center align-middle">SI</th>');
                                          div = div.concat('<th scope="col" class="text-center align-middle">NO</th>');
                                          div = div.concat('<th scope="col" class="text-center align-middle">N/A</th>');
                                        div = div.concat('</tr>');
                                      div = div.concat('</thead>');

                                      div = div.concat('<tbody id="tbodyHerramientas">');

                                       div = div.concat('<tr class="pregunta',id_pregunta,'">');
                                        div = div.concat('<th class="text-center align-middle"><p>',id_pregunta,'</p></th>');
                                        div = div.concat('<th class="text-center align-middle"><p><?php echo $carpeta['codigo']; ?></p></th>');
                                        div = div.concat('<td class="text-center align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>');
                                        div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta"></td>');
                                        div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta" data-toggle="collapse" data-target="#collapseExample',id_pregunta,'" aria-expanded="false" aria-controls="collapseExample',id_pregunta,'"></td>');
                                        div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta"></td>');
                                    div = div.concat('</tr>');
                                    div = div.concat('<tr>');
                                        div = div.concat('<td id="collapseExample',id_pregunta,'" class="collapse" colspan="6">');
                                            div = div.concat('<div class="card card-body">');
                                                div = div.concat('<div class="row">');
                                                    div = div.concat('<div class="col-sm-6">');
                                                        div = div.concat('<label for="inputObservaciones',id_pregunta,'">Observaciones</label>');
                                                        div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',id_pregunta,'" name="inputObservaciones',id_pregunta,'" rows="2"><?php if(isset($carpeta['observaciones'])): echo $carpeta['observaciones']; endif; ?></textarea>');
                                                    div = div.concat('</div>');
                                                    div = div.concat('<div class="col-sm-6">');
                                                        
                                                            div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                                            div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            div = div.concat('</div>');
                                        div = div.concat('</td>');
                                    div = div.concat('</tr>');
                                 }else{
                                   div = div.concat('<tr class="pregunta',id_pregunta,'">');
                                        div = div.concat('<th class="text-center align-middle"><p>',id_pregunta,'</p></th>');
                                        div = div.concat('<th class="text-center align-middle"><p>',cod_pregunta,'</p></th>');
                                        div = div.concat('<td class="text-center align-middle"><p><?php echo $carpeta['nombre']; ?></p></td>');
                                        div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta"></td>');
                                        div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta" data-toggle="collapse" data-target="#collapseExample',id_pregunta,'" aria-expanded="false" aria-controls="collapseExample',id_pregunta,'"></td>');
                                        div = div.concat('<td class="text-center align-middle"><input type="radio" name="rbCarpeta',id_pregunta,'" class="pauta"></td>');
                                    div = div.concat('</tr>');
                                    div = div.concat('<tr>');
                                        div = div.concat('<td id="collapseExample',id_pregunta,'" class="collapse" colspan="6">');
                                            div = div.concat('<div class="card card-body">');
                                                div = div.concat('<div class="row">');
                                                    div = div.concat('<div class="col-sm-6">');
                                                        div = div.concat('<label for="inputObservaciones',id_pregunta,'">Observaciones</label>');
                                                        div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',id_pregunta,'" name="inputObservaciones',id_pregunta,'" rows="2"><?php if(isset($carpeta['observaciones'])): echo $carpeta['observaciones']; endif; ?></textarea>');
                                                    div = div.concat('</div>');
                                                    div = div.concat('<div class="col-sm-6">');
                                                        
                                                            div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                                            div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            div = div.concat('</div>');
                                        div = div.concat('</td>');
                                    div = div.concat('</tr>');
                                }*/


                                /*if (id_categoria_i != id_categoria)
                                {
                                    if (id_categoria_i) {
                                        div = div.concat('</div>');
                                        div = div.concat('</div>');
                                    }
                                    div = div.concat('<div class="card" id="categoria',id_categoria,'">');
                                    div = div.concat('<div class="card-header row" id="heading',id_categoria,'">');
                                    div = div.concat('<div class="col-sm-6 text-left">');
                                    div = div.concat('<h2 class="mb-0">');
                                    div = div.concat('<button class="btn btn-link btn-block text-left ',(expandido == "false" ? 'collapsed' : ''),'" type="button" data-toggle="collapse" data-target="#collapse',id_categoria,'" aria-expanded="',expandido,'" aria-controls="collapse',id_categoria,'">');
                                    
                                    div = div.concat(cod_categoria, ' - ', categoria);
                                    div = div.concat('</button>');
                                    div = div.concat('</h2>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div id="agregarPregunta',id_categoria,'" class="col-sm-6 text-right">');

                                   
                                   

                                    //div = div.concat('<a class="btn btn-link text-danger eliminarCategoria" data-id="',id_categoria,'" data-codigo="',cod_categoria,'" data-nombre="',categoria,'"><i stop-color data-feather="trash-2" class="pb-1" data-toggle="tooltip" data-placement="top" title="Eliminar Categor&iacute;a"></i></a>');
                                    div = div.concat('<a class="btn btn-link agregarObservacion" data-id="',id_categoria,'" data-codigo="',cod_categoria,'" data-nombre="',categoria,'" data-toggle="modal" data-target="#modalAgregarPregunta"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>'); 
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('<div id="collapse',id_categoria,'" class="collapse ',(expandido == "true" ? 'show' : ''),'" aria-labelledby="heading',id_categoria,'" data-parent="#acordionCategorias">');
                                    div = div.concat('<div id="pregunta',id_categoria, '_', id_pregunta,'" class="card-body border">');
                                    div = div.concat('<div class="row">');
                                    div = div.concat('<div class="col-sm-16 text-left">');
                                    div = div.concat(cod_pregunta, ' - ', pregunta);
                                    div = div.concat('</div>');
                                    div = div.concat('<div class="col-sm-6 text-right">');
                                    //div = div.concat('<a id="trash_',id_pregunta,'" class="trash plusTituloError eliminarPregunta" href="#" data-id="',id_pregunta,'" data-codigo="',cod_pregunta,'" data-nombre="',pregunta,'" data-idcategoria="',id_categoria,'">');
                                    //div = div.concat('<i data-feather="trash-2" data-toggle="tooltip" data-placement="top" title="Eliminar Pregunta"></i>');
                                    //div = div.concat('</a>');
                                    

                                    //div = div.concat('<div class="btn-group" role="group" aria-label="Basic example">');
                                    //div = div.concat('<button id="rbSiPregunta" type="radio" class="btn btn-primary">Si</button>');
                                    //div = div.concat('<button id="rbNoPregunta" type="radio" class="btn btn-danger">No</button>');
                                    //div = div.concat('<button id="rbNAPregunta" type="radio" class="btn btn-danger">N/A</button>');
                                    div = div.concat('<input type="radio" name="rbPregunta', id_pregunta,'" class="pauta">');
                                    div = div.concat('<input type="radio" name="rbPregunta', id_pregunta,'" class="pauta">');
                                    div = div.concat('<input type="radio" name="rbPregunta', id_pregunta,'" class="pauta">');
                                    //div = div.concat('</div>');

                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');
                                    id_categoria_i = id_categoria;
                                    expandido = 'false';
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
                                }*/
                            }
                            div = div.concat('</div>');
                            div = div.concat('</div>');
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