 $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    feather.replace();

    function checkRut(rut) {
        // Despejar Puntos
        var valor = rut.value.replace('.','');
        // Despejar Guión
        valor = valor.replace('-','');
        
        // Aislar Cuerpo y Dígito Verificador
        cuerpo = valor.slice(0,-1);
        dv = valor.slice(-1).toUpperCase();
        
        // Formatear RUN
        if (cuerpo.length > 0 || dv.length > 0) {
            
            if ((cuerpo.length + dv.length) == 1) {
                rut.value = dv;
            }else{
                if (cuerpo.length > 3) {
                    var largo_rut = cuerpo.length;
                    var cant_puntos = Math.ceil(~~(cuerpo.length / 3));

                    if (cant_puntos == 1) {
                        cuerpo = cuerpo.slice(0, (cuerpo.replace('.', '').length-3)) + '.' + cuerpo.replace('.', '').slice((cuerpo.replace('.', '').length - 3), cuerpo.replace('.', '').length);
                    }else{
                        if (cuerpo.length > 6) {

                            cuerpo = cuerpo.replace('.', '').slice(0, (cuerpo.replace('.', '').length-6)) + '.' + cuerpo.replace('.', '').slice((cuerpo.replace('.', '').length-6), ((cuerpo.replace('.', '').length-6)+3)) + '.' + cuerpo.replace('.', '').slice((cuerpo.replace('.', '').length - 3), cuerpo.replace('.', '').length);
                        }else{
                            cuerpo = cuerpo.replace('.', '').slice(0, (cuerpo.replace('.', '').length-3)) + '.' + cuerpo.replace('.', '').slice((cuerpo.length - 3), cuerpo.replace('.', '').length);
                        }
                    }
                }

                rut.value = cuerpo + '-'+ dv;
            }
        }else{
            rut.value = "";
        }
        
        // Calcular Dígito Verificador
        suma = 0;
        multiplo = 2;
        
        // Para cada dígito del Cuerpo
        for(i=1;i<=cuerpo.length;i++) {
        
            // Obtener su Producto con el Múltiplo Correspondiente
            index = multiplo * valor.charAt(cuerpo.length - i);
            
            // Sumar al Contador General
            suma = suma + index;
            
            // Consolidar Múltiplo dentro del rango [2,7]
            if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
      
        }
        
        // Calcular Dígito Verificador en base al Módulo 11
        dvEsperado = 11 - (suma % 11);
        
        // Casos Especiales (0 y K)
        dv = (dv == 'K')?10:dv;
        dv = (dv == 0)?11:dv;
        
        // Validar que el Cuerpo coincide con su Dígito Verificador
        
        // Si todo sale bien, eliminar errores (decretar que es válido)
        rut.setCustomValidity('');
    }


    $('#inputRutE').on('input', function(e) {
      var resultado = checkRut(this);
    });

    $('#inputRutA').on('input', function(e) {
      var resultado = checkRut(this);
    });

    //$('.stepper').mdbStepper();
    $('#selectSuspension').on('change',function(e){
       var grupo = e.currentTarget.selectedOptions[0].dataset.grupo;
       var tipo_traccion = document.getElementById("selectTipoTraccion");

       if (e.currentTarget.selectedIndex > 0) {
            $('#selectTipoTraccion option').eq(0).prop('selected',true);
            $('#selectTipoTraccion > option').each(function() {

                if (this.index > 0) {
                    if (this.dataset.grupo != grupo && this.dataset.grupo != "") {
                        this.setAttribute("hidden", "");
                    }else{
                        this.removeAttribute("hidden");
                    }
                }
            });
       }else{
            $('#selectTipoTraccion option').eq(0).prop('selected',true);
            $('#selectTipoTraccion > option').each(function() {
                this.sele
                this.removeAttribute("hidden");
            });
       }
       
       
    });

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
            required: false,
            minlength: 1,
            maxlength: 30
          },
          inputNombreE: {
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
            minlength: "Ingrese un Codigo",
            maxlength: "El Codigo no puede superar los {0} caracteres."
          },
          inputNombreE: {
            required: "Ingrese un Nombre del Edificio.",
            minlength: "Ingrese un Nombre del Edificio.",
            maxlength: "El Nombre del Edificio no puede superar los {0} caracteres."
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

    $('#modalFoto').on('hidden.bs.modal', function(e) {
        var dObsGenerales = document.getElementById("dObsGenerales");
        dObsGenerales.setAttribute('hidden', '');
        $('#seleccionarFoto').empty();
        $("#seleccionarFoto").append('Seleccionar Foto');
        $('#tituloMF').empty();
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
        document.getElementById('inputObservaciones').value = "";

        $('#id_front').hide();
        $('#video-stream').show();
        $('#video-stream').addClass("rounded");

    });
    

    $('#acordionCategorias').on('click', '.quitarImagen', function(e) {
        var id = e.currentTarget.dataset.id;
        var id_div = e.currentTarget.dataset.id_div;
        var div_image = document.getElementById('div_image_'.concat(id));
        //var input_file = document.getElementById('picture_'.concat(id));
        div_image.remove();
        //input_file.remove();
        var id_div_r = 1;

        for (var i = 0; i < document.getElementById('div_'.concat(id_div)).children.length; i++) {
            var div = document.getElementById('div_'.concat(id_div)).children[i];
            if (div.tagName == "DIV") {
                div.firstElementChild.firstElementChild.id = 'close_'.concat(id_div, '_', id_div_r);
                div.firstElementChild.firstElementChild.name = 'close_'.concat(id_div, '_', id_div_r);
                div.firstElementChild.firstElementChild.dataset.id = id_div.concat('_', id_div_r);
                div.id = 'div_image_'.concat(id_div, '_', id_div_r);
                div.children[1].id = id_div.concat('_', id_div_r);
                div.children[1].name = id_div.concat('_', id_div_r);
                div.children[2].id = 'picture_'.concat(id_div, '_', id_div_r);
                div.children[2].name = 'picture_'.concat(id_div, '_', id_div_r);
                id_div_r++;
            }
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
                boton_principal.classList.remove('btn-outline-danger');
                boton_principal.classList.add('btn-outline-success');
                if (e.currentTarget.value.split('-')[0] != "no")
                    $('#tbodyCategoria'.concat(id_categoria)).collapse('hide');
                
            }else{
                boton_principal.classList.remove('btn-outline-success');
                boton_principal.classList.remove('btn-outline-warning');
                boton_principal.classList.remove('btn-outline-danger');
                boton_principal.classList.add('btn-outline-warning');
                badge_total.classList.remove("badge-success");
                badge_total.classList.remove("badge-primary");
                badge_total.classList.remove("badge-danger");
                badge_total.classList.add("badge-primary");
                
                badge.classList.remove("badge-success");
                badge.classList.remove("badge-danger");
                badge.classList.add("badge-warning");
                badge.textContent = contador;
            }


        }

    });

     $('#modalFoto').on('show.bs.modal', function () {
        var isMobile = false; //initiate as false
        // device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }
        //if (isMobile) {
            //take-photo
        //}
        if (DetectRTC.isMobileDevice) {
            document.getElementById('doc-front').hidden = true;
            document.getElementById('span_foto').hidden = true;
        }else{
            $('#doc-front').removeAttr('hidden');
            $('#span_foto').removeAttr('hidden');
        }
    });

    $('#modalAgregarEmpresa').on('show.bs.modal', function (event) {
       $('#modalBuscarEmpresa').modal('hide');
    });

    /*$('#modalAgregarEmpresa').on('hide.bs.modal', function (event) {
       $('#modalBuscarEmpresa').modal('show');
    });*/

    $('#btnAgregarE').on('click', function(e) {
        $("#modalAgregarEmpresa #agregarEmpresa").submit();
    });

    $("#modalAgregarEmpresa #agregarEmpresa").on("submit", function(e){
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        var validacion = $("#modalAgregarEmpresa #agregarEmpresa").validate();
        if ($("#modalAgregarEmpresa #agregarEmpresa").valid()) {
            if(validacion.numberOfInvalids() == 0)
            {
                e.preventDefault();
                var form = document.getElementById("agregarEmpresa");
                var formData = new FormData(form);
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
                            var id = data['id_empresa'];
                            var rut = data['rut_empresa'];
                            var nombre = data['nombre_empresa'];

                            $('#inputEmpresaMantenedora').val(rut.concat(' - ', nombre));
                            $('#idEmpresaMantenedora').val(id);
                            $('#modalBuscarEmpresa').modal('hide');

                            $('#tituloME').empty();
                            $("#parrafoME").empty();
                            $("#tituloME").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
                            $("#parrafoME").append(data.mensaje);
                            $('#modalAgregarEmpresa').modal('hide');
                            $('#modalMensajeEmpresa').modal({
                              show: true
                            });
                            feather.replace();
                            $('[data-toggle="tooltip"]').tooltip();
                            document.getElementById("agregarEmpresa").reset();
                        }else{
                            $('#tituloME').empty();
                            $("#parrafoME").empty();
                            $("#tituloME").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
                            $("#parrafoME").append('Ha ocurrido un error al intentar agregar la Empresa.');
                            $("#parrafoME").append('</br></br>Detalle: </br>', data.mensaje);
                            $('#modalAgregarEmpresa').modal('hide');
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
            if (element.value.trim().length> 0) {
                return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);    
            }else{
                return true;
            }
        },
    );

    $("#modalAgregarEmpresa #agregarEmpresa").validate({
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

    $('#acordionCategorias').on('click', '.agregarObservacion', function (e) {
        var id_categoria = e.currentTarget.dataset.id;
        var codigo_categoria = e.currentTarget.dataset.codigo;
        var categoria = e.currentTarget.dataset.nombre;
        var cant_obs = (document.getElementById('observacionesGenerales').children.length + 1);

        $('#dObsGenerales').removeAttr('hidden');
        $('#seleccionarFoto').empty();
        $("#seleccionarFoto").append('Agregar Observaci&oacute;n');
        $('#tituloMF').empty();
        $("#tituloMF").append('<i class="plusTitulo mb-2" data-feather="plus"></i> Agregar Observaci&oacute;n  a "'.concat(codigo_categoria, ' - ', categoria, '"'));
        var boton_agregar = document.getElementById('seleccionarFoto');
        boton_agregar.dataset.id = id_categoria;
        boton_agregar.dataset.codigo = codigo_categoria;
        boton_agregar.dataset.nombre = categoria;
        boton_agregar.dataset.cant = cant_obs;
        /*$("#parrafoME").append(data.mensaje);*/
        document.getElementById('inputObservaciones').value = "";
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
    });

    $('#observacionesGenerales').on('click', '.eliminarObservacion', function (e) {
        var id_categoria = e.currentTarget.dataset.id;
        var codigo_categoria = e.currentTarget.dataset.codigo;
        var categoria = e.currentTarget.dataset.nombre;
        var cantidad = e.currentTarget.dataset.cant;
        var obs = document.getElementById('div_contenedor_'.concat(cantidad));
        obs.remove();

        var cant = 1;
        var observaciones = document.getElementById('observacionesGenerales').children;
        $.each(observaciones, function(index_obs, observacion) {
            observacion.id = 'div_contenedor_'.concat(cant);
            observacion.lastChild.id = 'picture_'.concat(id_categoria, '_', cant);
            observacion.lastChild.name = 'picture_'.concat(id_categoria, '_', cant);
            observacion.firstChild.firstChild.id = 'imagen_'.concat(cant);
            observacion.firstElementChild.lastElementChild.firstElementChild.id = 'input_obs_'.concat(id_categoria, '_', cant);
            observacion.firstElementChild.lastElementChild.firstElementChild.name = 'input_obs_'.concat(id_categoria, '_', cant);
            observacion.firstElementChild.lastElementChild.children[1].textContent = String(cant).concat('.- "', codigo_categoria, '_', categoria, '"');
            observacion.firstElementChild.lastElementChild.children[3].dataset.cant = cant;
            cant++;
        });
    });

    

    $('#seleccionarFoto').on('click',  function(e) {
        if($('#dObsGenerales').is(':visible')){
            var data_image = document.getElementById('id_front').src;

            var imagen_foto = document.createElement("IMG");
            imagen_foto.alt = "Alt information for image";
            //image.setAttribute('class', 'photo img-thumbnail');
            imagen_foto.setAttribute('class', 'img-fluid rounded float-left');
            imagen_foto.src = data_image;
            imagen_foto.id = 'imagen_'.concat(e.currentTarget.dataset.cant);
            
            var obs = document.getElementById('inputObservaciones').value;

            var div_1 = document.createElement("div");
             div_1.setAttribute('class', 'float-sm-left m-3');
            div_1.id = 'div_contenedor_'.concat(e.currentTarget.dataset.cant);

            var div_2 = document.createElement("div");
            div_2.setAttribute('class', 'card border-secondary');
            div_2.setAttribute('style', 'width: 18rem;');

            var div_3 = document.createElement("div");
            div_3.setAttribute('class', 'card-body text-secondary');
            
            var titulo_h5 = document.createElement("h5");
            titulo_h5.setAttribute('class', "card-title");
            titulo_h5.append(e.currentTarget.dataset.cant.concat('.-  "',e.currentTarget.dataset.codigo,'_',e.currentTarget.dataset.nombre, '"'));

            var parrafo_card_body = document.createElement("p");
            parrafo_card_body.setAttribute('class', "card-text");
            parrafo_card_body.append(obs);

            var icono_eliminar = document.createElement("i");
            icono_eliminar.setAttribute('class', "pb-1");
            icono_eliminar.setAttribute('stop-cloro', "");
            icono_eliminar.dataset.feather = "trash";

            var boton_eliminar = document.createElement("a");
            boton_eliminar.setAttribute('class', "btn btn-outline-danger eliminarObservacion");
            boton_eliminar.dataset.id = e.currentTarget.dataset.id;
            boton_eliminar.dataset.codigo = e.currentTarget.dataset.codigo;
            boton_eliminar.dataset.nombre = e.currentTarget.dataset.nombre;
            boton_eliminar.dataset.cant = e.currentTarget.dataset.cant;
            
            boton_eliminar.append(icono_eliminar);
            boton_eliminar.append(' Eliminar Observaci&oacute;n');

            //id="inputDiamCableLimitador" minlength="1" placeholder="Ingrese Diametro Cable Limitador" name="inputDiamCableLimitador" value="">

            var input_obs = document.createElement("INPUT");
            input_obs.setAttribute("type", "text");
            input_obs.setAttribute("class", "form-control  form-control-sm");
            input_obs.id = 'input_obs_'.concat(e.currentTarget.dataset.id, '_', e.currentTarget.dataset.cant);
            input_obs.name = 'input_obs_'.concat(e.currentTarget.dataset.id, '_', e.currentTarget.dataset.cant);
            input_obs.setAttribute("hidden", true);
            input_obs.value = obs;
            div_3.append(input_obs);

            div_3.append(titulo_h5);
            div_3.append(parrafo_card_body);
            div_3.append(boton_eliminar);
            div_2.append(imagen_foto);
            div_2.append(div_3);
            
            $(document.getElementById('observacionesGenerales')).append(div_1);
            const img2 = document.getElementById(imagen_foto.id)
                        fetch(data_image)
                        .then(res => res.blob())
                        .then(blob => {
                            
                            const file = new File([blob], 'picture_'.concat(e.currentTarget.dataset.id, '_', e.currentTarget.dataset.cant), blob)
                            input_file = file;

                            let container = new DataTransfer();
                            container.items.add(file);
                            var x = document.createElement("INPUT");
                            x.setAttribute("type", "file");
                            x.files = container.files;
                            x.id = 'picture_'.concat(e.currentTarget.dataset.id, '_', e.currentTarget.dataset.cant);
                            x.name = 'picture_'.concat(e.currentTarget.dataset.id, '_', e.currentTarget.dataset.cant);
                            x.setAttribute("hidden", true);
                            //$('#div_'.concat(id)).append(x);
                            div_1.append(x);
                        });




            /*var button = document.createElement("button");
            button.type = "button";
            button.setAttribute('class', 'close');
            button.setAttribute('aria-label', 'Close');

            var span = document.createElement("span");
            span.setAttribute('class', 'close quitarObservacion');
            span.setAttribute('aria-hidden', 'true');
            span.textContent = "×";
            span.id = 'close_'.concat(e.currentTarget.dataset.id, '_', e.currentTarget.dataset.cant);
            span.dataset.id = e.currentTarget.dataset.id.concat('_', e.currentTarget.dataset.cant);
            span.dataset.id_div = 'div_contenedor_'.concat(e.currentTarget.dataset.cant);
            button.append(span);
            div_1.append(button);*/

            div_1.append(div_2);


            feather.replace();
            $('[data-toggle="tooltip"]').tooltip();

            /*var id = document.getElementById('seleccionarFoto').dataset.id;
            var data_image = document.getElementById('id_front').src;
            //$(document.getElementById('pregunta_', id)).prepend($('<img>',{id:'foto_1_'.concat(id),src:data_image}));
            var img = '';
            img = img.concat('<img id="foto_1_',id,'" src="',data_image,'"/>');
            $(document.getElementById('div_', id)).append(img);

            //<button type="submit" class="close">
            //<span>&times;</span>
            //</button>
            
            var id_concatenado = id.concat('_', (document.getElementById('div_'.concat(id)).children.length+1));


            var div = document.createElement("div");
            //div.setAttribute('class', 'img-responsive content_area');
            div.setAttribute('class', 'col-xs-3 m-3');
            //div.width = '170px !important';
            //div.setAttribute('style', ' width: 170px!important;');
            div.id = 'div_image_'.concat(id_concatenado);
            //div.id = 'div_image_'.concat(id, '_', ($('#div_'.concat(id)).children('input').length+1));

            var button = document.createElement("button");
            button.type = "button";
            button.setAttribute('class', 'close');
            button.setAttribute('aria-label', 'Close');

            var span = document.createElement("span");
            span.setAttribute('class', 'close quitarImagen');
            span.setAttribute('aria-hidden', 'true');
            span.textContent = "×";
            span.id = 'close_'.concat(id_concatenado);
            span.dataset.id = id_concatenado;
            span.dataset.id_div = id;
            button.append(span);
            

            var image = document.createElement("IMG");
            image.alt = "Alt information for image";
            //image.setAttribute('class', 'photo img-thumbnail');
            image.setAttribute('class', 'img-fluid rounded float-left');
            image.src = data_image;
            image.width = '150';
            image.id = id_concatenado;


            div.append(button);
            div.append(image);

            const img2 = document.getElementById(image.id)
                        fetch(data_image)
                        .then(res => res.blob())
                        .then(blob => {
                            
                            const file = new File([blob], 'picture_'.concat(id_concatenado), blob)
                            input_file = file;

                            let container = new DataTransfer();
                            container.items.add(file);
                            var x = document.createElement("INPUT");
                            x.setAttribute("type", "file");
                            x.files = container.files;
                            x.id = 'picture_'.concat(id_concatenado);
                            x.name = 'picture_'.concat(id_concatenado);
                            x.setAttribute("hidden", true);
                            //$('#div_'.concat(id)).append(x);
                            div.append(x);

                        });





            $('#div_'.concat(id)).append(div);
            //$(document.getElementById('foto_1_'.concat(id))).attr('src', data_image);
            //$(document.getElementById('foto_1_'.concat(id))).attr('width', '150px');
            $('#id_front').hide();
            $('#video-stream').show();*/



            //var div = "";
            //div = div.concat('<div class="float-sm-left m-3">');

            //div = div.concat('<div class="card" style="width: 18rem;">');

            //div = div.concat('<img src="',window.origin,'/assets/img/logo.png','" class="card-img-top" alt="...">');

            /*div = div.concat('<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">');
              div = div.concat('<ol class="carousel-indicators">');
                div = div.concat('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>');
                div = div.concat('<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>');
                div = div.concat('<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>');
              div = div.concat('</ol>');
              div = div.concat('<div class="carousel-inner rounded">');
                div = div.concat('<div class="carousel-item active">');
                  div = div.concat('<img src="',window.origin,'/assets/files/image/62_536_6_3_1.png','"" class="d-block w-100" alt="FOTO_1">');
                div = div.concat('</div>');
                div = div.concat('<div class="carousel-item">');
                  div = div.concat('<img src="',window.origin,'/assets/files/image/62_536_6_3_2.png','"" class="d-block w-100" alt="FOTO_2">');
                div = div.concat('</div>');
                div = div.concat('<div class="carousel-item">');
                  div = div.concat('<img src="',window.origin,'/assets/files/image/61_528_6_2_3.png','"" class="d-block w-100" alt="FOTO_3">');
                div = div.concat('</div>');
              div = div.concat('</div>');
              div = div.concat('<button class="carousel-control-prev" type="button" data-target="#carouselExampleIndicators" data-slide="prev">');
                div = div.concat('<span class="carousel-control-prev-icon" aria-hidden="true"></span>');
                div = div.concat('<span class="sr-only">Previous</span>');
              div = div.concat('</button>');
              div = div.concat('<button class="carousel-control-next" type="button" data-target="#carouselExampleIndicators" data-slide="next">');
                div = div.concat('<span class="carousel-control-next-icon" aria-hidden="true"></span>');
                div = div.concat('<span class="sr-only">Next</span>');
              div = div.concat('</button>');
            div = div.concat('</div>');*/

            //div = div.concat('<div class="card-body">');
             //div = div.concat('<h5 class="card-title">',e.currentTarget.dataset.cant, '.-  "',e.currentTarget.dataset.codigo,'_',e.currentTarget.dataset.nombre,'"</h5>');
            //div = div.concat('<p class="card-text">'.concat(obs,'</p>'));
            ////div = div.concat('<a href="#" class="btn btn-primary">Go somewhere</a>');
            //div = div.concat('<a class="btn btn-outline-danger eliminarObservacion" data-id="',e.currentTarget.dataset.id,'" data-codigo="',e.currentTarget.dataset.codigo,'" data-nombre="',e.currentTarget.dataset.nombre,'"><i stop-color data-feather="trash" class="pb-1"></i> Eliminar Observaci&oacute;n</a>');
            //div = div.concat('</div>');
            //div = div.concat('</div>');


            //div = div.concat('</div>');

            




        }else{
            var id = document.getElementById('seleccionarFoto').dataset.id;
            var data_image = document.getElementById('id_front').src;
            //$(document.getElementById('pregunta_', id)).prepend($('<img>',{id:'foto_1_'.concat(id),src:data_image}));
            var img = '';
            img = img.concat('<img id="foto_1_',id,'" src="',data_image,'"/>');
            $(document.getElementById('div_', id)).append(img);

            //<button type="submit" class="close">
            //<span>&times;</span>
            //</button>
            
            var id_concatenado = id.concat('_', (document.getElementById('div_'.concat(id)).children.length+1));


            var div = document.createElement("div");
            //div.setAttribute('class', 'img-responsive content_area');
            div.setAttribute('class', 'col-xs-3 m-3');
            //div.width = '170px !important';
            //div.setAttribute('style', ' width: 170px!important;');
            div.id = 'div_image_'.concat(id_concatenado);
            //div.id = 'div_image_'.concat(id, '_', ($('#div_'.concat(id)).children('input').length+1));

            var button = document.createElement("button");
            button.type = "button";
            button.setAttribute('class', 'close');
            button.setAttribute('aria-label', 'Close');

            var span = document.createElement("span");
            span.setAttribute('class', 'close quitarImagen');
            span.setAttribute('aria-hidden', 'true');
            span.textContent = "×";
            span.id = 'close_'.concat(id_concatenado);
            span.dataset.id = id_concatenado;
            span.dataset.id_div = id;
            button.append(span);
            

            var image = document.createElement("IMG");
            image.alt = "Alt information for image";
            //image.setAttribute('class', 'photo img-thumbnail');
            image.setAttribute('class', 'img-fluid rounded float-left');
            image.src = data_image;
            image.width = '150';
            image.id = id_concatenado;


            div.append(button);
            div.append(image);

            const img2 = document.getElementById(image.id)
                        fetch(data_image)
                        .then(res => res.blob())
                        .then(blob => {
                            
                            const file = new File([blob], 'picture_'.concat(id_concatenado), blob)
                            input_file = file;

                            let container = new DataTransfer();
                            container.items.add(file);
                            var x = document.createElement("INPUT");
                            x.setAttribute("type", "file");
                            x.files = container.files;
                            x.id = 'picture_'.concat(id_concatenado);
                            x.name = 'picture_'.concat(id_concatenado);
                            x.setAttribute("hidden", true);
                            //$('#div_'.concat(id)).append(x);
                            div.append(x);

                        });





            $('#div_'.concat(id)).append(div);
            //$(document.getElementById('foto_1_'.concat(id))).attr('src', data_image);
            //$(document.getElementById('foto_1_'.concat(id))).attr('width', '150px');
            $('#id_front').hide();
            $('#video-stream').show();
            $('#video-stream').addClass("rounded");
        }
    });

    $('#acordionCategorias').on('click', '.tomarFoto', function (e) {
      var id = $(e.currentTarget).data('id');
      document.getElementById('seleccionarFoto').dataset.id = id;
    });


    //$('#acordeonCarpeta').on('hide.bs.collapse', function () {
    $('#selectSalaMaquina').on('change',function(e){
        if (document.getElementsByClassName('sala_maquina').length == 1) {
            if (this.value == "2") {
                var cat_sala_maquinas = document.getElementsByClassName('sala_maquina')[0];
                cat_sala_maquinas.setAttribute('hidden', '');

                var pauta_carpeta = document.getElementsByClassName('pauta_carpeta');
                for (var i = 0; i < pauta_carpeta.length; i++) {
                    pauta_carpeta[i].checked = false;
                }
            }else{
                var cat_sala_maquinas = document.getElementsByClassName('sala_maquina')[0];
                cat_sala_maquinas.removeAttribute('hidden');
            }
        }
    });

    /*$('#acordeonCarpeta').on('show.bs.collapse', function () {
        if (document.getElementsByClassName('sala_maquina').length == 1) {
            var cat_sala_maquinas = document.getElementsByClassName('sala_maquina')[0];
            cat_sala_maquinas.removeAttribute('hidden');
        }
    });*/

    $('#btnSeleccionarBN').on('click', function(e) {
        var tabla = $('#tListaNormas').DataTable();
        var data = tabla.rows({selected:  true}).data();
        if (data.length > 0) {
            var idNorma = $(data[0][0]).text();
            var norma = $(data[0][1]).text();
            var observacion = $(data[0][2]).text();
            /*var idNorma = $(e.currentTarget).data('id');
            var norma = $(e.currentTarget).data('nombre');*/

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
                            /*if (data.data) {
                                var preguntas_seleccionadas = JSON.parse(localStorage.getItem("preguntas_seleccionadas"));
                                if (preguntas_seleccionadas != null && preguntas_seleccionadas.length > 0) {
                                  localStorage.setItem("preguntas_seleccionadas", JSON.stringify(data.data));

                                }else{
                                  localStorage.setItem("preguntas_seleccionadas", JSON.stringify(data.data));

                                }
                            }*/

                            if (data.data_cp_n) {
                                var id_categoria_i = null;
                                var div = '';
                                var expandido = 'true';
                                $("#acordionCategorias").empty();

                                var inputTC = '';
                                inputTC = inputTC.concat('<input type="text" class="form-control form-control-sm" id="inputTotalCategorias" name="inputTotalCategorias" value="',data.data_cp_n.length/*data.data_total.length*/,'" hidden>');
                                for (var i = 0; i < data.data_cp_n.length/*data.data_total.length*/; i++) {
                                    inputTC = inputTC.concat('<input type="text" class="form-control form-control-sm" id="inputTotalPreguntas_',(i+1),'" name="inputTotalPreguntas_',(i+1),'" value="',data.data_cp_n[i].preguntas.length/*data.data_total[i].cantPreguntas*/,'" hidden>');
                                }

                                var contador = 0;

                                $.each(data.data_cp_n, function(index_c, categoria ) {


/*                                    var id_categoria = data.data_cp_n[i][2];
                                    var id_pregunta = data.data_cp_n[i][3];
                                    var cod_categoria = data.data_cp_n[i][4];
                                    var categoria = data.data_cp_n[i][5];
                                    var cod_pregunta = data.data_cp_n[i][6];
                                    var pregunta = data.data_cp_n[i][7];
                                    var cant_preguntas = 0;

                                    var id_respuesta = data.data_cp_n[i][3];
                                    var cod_categoria = data.data_cp_n[i][4];
                                    var categoria = data.data_cp_n[i][5];
                                    var cod_pregunta = data.data_cp_n[i][6];
                                    var pregunta = data.data_cp_n[i][7];
                                    var cant_preguntas = 0;*/



                                    var hidden = '';
                                    var clase = '';
                                    var clase_pauta = '';
                                    if (categoria.categoria.trim().toLowerCase() == 'sala de maquinas') {
                                        clase = 'sala_maquina';
                                        clase_pauta = 'pauta_carpeta';

                                        var selectSalaMaquina = document.getElementById("selectSalaMaquina");
                                        var isVisible = selectSalaMaquina.options[selectSalaMaquina.selectedIndex].value == 1;
                                        if (!isVisible) {
                                            hidden = 'hidden';
                                        }else{
                                            hidden = '';
                                        }
                                    }


                                    div = div.concat('<div id="categoria',categoria.id_categoria,'" class="card card-body ',clase,'" ',hidden,'>');
                                    div = div.concat('<div class="table-responsive">');
                                    div = div.concat('<table id="tabla_',categoria.id_categoria,'" class="table table-sm">');
                                    div = div.concat('<thead>');
                                    div = div.concat('<tr class="border-1">');
                                    div = div.concat('<td colspan="2" class="ml-3 text-left">');
                                    div = div.concat('<h5 class="mb-0">');
                                    div = div.concat('<button id="button_cat_',categoria.id_categoria,'" class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#tbodyCategoria',categoria.id_categoria,'" aria-expanded="true" aria-controls="tbodyCategoria',categoria.id_categoria,'">');
                                    div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                    div = div.concat('</button>');

                                    div = div.concat('</h5>');
                                    div = div.concat('</td>');
                                    div = div.concat('<td colspan="3" class="text-right celdaAsignado">');
                                    div = div.concat('<span id="conteo_',categoria.id_categoria,'" class="badge badge-danger badge-pill">0</span>  /  <span id="total_conteo_',categoria.id_categoria,'" class="badge badge-primary badge-pill">',categoria.preguntas.length/*cant_preguntas*/,'</span>');
                                    div = div.concat('<a class="btn btn-link agregarObservacion" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-toggle="modal" data-target="#modalFoto"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>');
                                    div = div.concat('</td>');
                                    div = div.concat('</tr>');
                                    div = div.concat('</thead>');
                                    //div = div.concat('<thead>');
                                    
                                    //div = div.concat('</thead>');
                                    div = div.concat('<tbody id="tbodyCategoria',categoria.id_categoria,'" class="collapse" aria-labelledby="categoria',categoria.id_categoria,'" data-parent="#categoria',categoria.id_categoria,'" >');
                                    div = div.concat('<tr>');
                                    div = div.concat('<!--<th scope="col" class="text-left align-middle">#</th>-->');
                                    div = div.concat('<th scope="col" class="text-left align-middle">Codigo</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle celdaAsignado">Pregunta</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle">SI</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle">NO</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle">N/A</th>');
                                    div = div.concat('</tr>');

                                    if (categoria.preguntas.length > 0) {

                                        $.each(categoria.preguntas, function(index_p, pregunta) {
                                            contador++;
                                            div = div.concat('<tr class="pregunta',categoria.id_categoria,'_',pregunta.id_pregunta,' preguntas">');
                                            div = div.concat('<!--<th class="text-left align-middle"><p>',categoria.id_categoria,'_',pregunta.id_pregunta,'</p></th>-->');
                                            div = div.concat('<th class="text-left align-middle"><p class="texto-pequenio text-left align-middle registro">',pregunta.codigo,'</p></th>');
                                            div = div.concat('<td class="text-left align-middle celdaAsignado"><p class="texto-pequenio text-left align-middle registro">',pregunta.pregunta,'</p></td>');
                                            div = div.concat('<td class="text-left align-middle radio"><input type="radio" id="rbPregunta',contador,'_SI" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbSI ',clase_pauta,'" data-id_categoria="',categoria.id_categoria,'" data-id_pregunta="',pregunta.id_pregunta,'" value="si-',categoria.id_categoria,'_',pregunta.id_pregunta,'"></td>');
                                            div = div.concat('<td class="text-left align-middle radio"><input type="radio" id="rbPregunta',contador,'_NO" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNO ',clase_pauta,'" data-id_categoria="',categoria.id_categoria,'" data-id_pregunta="',pregunta.id_pregunta,'" value="no-',categoria.id_categoria,'_',pregunta.id_pregunta,'"></td>');
                                            div = div.concat('<td class="text-left align-middle radio"><input type="radio" id="rbPregunta',contador,'_NA" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNA ',clase_pauta,'" data-id_categoria="',categoria.id_categoria,'" data-id_pregunta="',pregunta.id_pregunta,'" value="na-',categoria.id_categoria,'_',pregunta.id_pregunta,'"></td>');
                                            div = div.concat('</tr>');
                                            
                                            div = div.concat('<tr>');
                                            div = div.concat('<td id="cat_pre_',categoria.id_categoria,'_',pregunta.id_pregunta,'" class="collapse" colspan="5">');
                                            div = div.concat('<div class="card card-body">');
                                            div = div.concat('<div class="row">');

                                            //div = div.concat('<div class="col-sm-6">');
                                            //div = div.concat('<label for="inputObservaciones',categoria.id_categoria,'_',pregunta.id_pregunta,'">Observaciones</label>');
                                            //div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                            //div = div.concat('</div>');

                                            if(pregunta.respuestas.length > 0){

                                                div = div.concat('<div class="form-group col-sm-6">');
                                                    div = div.concat('<ul class="nav nav-tabs" id="myTab" role="tablist">');
                                                      div = div.concat('<li class="nav-item" role="presentation">');
                                                        div = div.concat('<a class="nav-link active" id="respuesta_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'" data-toggle="tab" href="#respuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tab" aria-controls="respuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'" aria-selected="true">Respuestas</a>');
                                                      div = div.concat('</li>');
                                                      div = div.concat('<li class="nav-item" role="presentation">');
                                                        div = div.concat('<a class="nav-link" id="respuesta_obs_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'" data-toggle="tab" href="#respuesta_obs',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tab" aria-controls="respuesta_obs',categoria.id_categoria,'_',pregunta.id_pregunta,'" aria-selected="false">Nueva Respuesta</a>');
                                                      div = div.concat('</li>');
                                                    div = div.concat('</ul>');
                                                    div = div.concat('<div class="tab-content" id="myTabContent">');
                                                        div = div.concat('<div class="tab-pane fade show active" id="respuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tabpanel" aria-labelledby="respuesta_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'">');
                                                            div = div.concat('<div class="form-group col-sm-12">');
                                                                div = div.concat('<div class="row justify-content-md-left">');
                                                                    div = div.concat('<div class="form-group col-sm-12  mt-3">');
                                                                        //div = div.concat('<label for="sRespuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'">Respuesta</label>');
                                                                        div = div.concat('<select id="sRespuesta',contador/*categoria.id_categoria,'_',pregunta.id_pregunta*/,'" name="sRespuesta',contador/*categoria.id_categoria,'_',pregunta.id_pregunta*/,'" class="custom-select custom-select-sm">');
                                                                            div = div.concat('<option value="-1" selected>Seleccione una Respuesta</option>');
                                                                            
                                                                            $.each(pregunta.respuestas, function(index_r, respuesta) {
                                                                                div = div.concat('<option value="',respuesta['id_respuesta'],'">',respuesta['respuesta'],'</option>');
                                                                            });

                                                                        div = div.concat('</select>');
                                                                    div = div.concat('</div>');
                                                                div = div.concat('</div>');
                                                            div = div.concat('</div>');
                                                        div = div.concat('</div>');
                                                        div = div.concat('<div class="tab-pane fade" id="respuesta_obs',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tabpanel" aria-labelledby="respuesta_obs_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'">');
                                                            div = div.concat('<div class="justify-content-md-left p-3">');
                                                            //div = div.concat('<label for="inputObservaciones">Nueva Respuesta</label>');
                                                            //div = div.concat('<input type="text" class="form-control form-control-sm" id="inputObservaciones" minlength="1" placeholder="Ingrese una Respuesta" name="inputObservaciones" value="">');
                                                                div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una nueva Respuesta" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                                            div = div.concat('</div>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            }else{
                                                div = div.concat('<div class="col-sm-6">');
                                                div = div.concat('<label for="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'">Nueva Respuesta</label>');
                                                div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una nueva Respuesta" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                                div = div.concat('</div>');
                                            }


                                            div = div.concat('<div class="col-6 row">');

                                            //div = div.concat('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalFoto">Tomar una Foto</button>');
                                            
                                            div = div.concat('<div class="col-sm-12 col-md-6 mt-4">');
                                            div = div.concat('<button type="button" class="btn btn-primary align-middle tomarFoto" data-toggle="modal" data-target="#modalFoto" data-id="',categoria.id_categoria,'_',pregunta.id_pregunta,'">Tomar una Foto</button>');
                                            div = div.concat('</div>');

                                            
                                            /*div = div.concat('<img id="foto_1_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_2_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_3_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_4_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_5_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');*/
                                            //div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                            //div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                            div = div.concat('</div>');

                                            div = div.concat('<div id="div_',categoria.id_categoria,'_',pregunta.id_pregunta,'" class="col-12 row">');
                                            div = div.concat('</div>');

                                            div = div.concat('</div>');
                                            div = div.concat('</div>');
                                            div = div.concat('</td>');
                                            div = div.concat('</tr>');
                                        });
                                    }



                                    div = div.concat('</tbody>');
                                    div = div.concat('</table>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');


                                });

                                //div = div.concat('</div>');
                                //div = div.concat('</div>');
                                $("#acordionCategorias").append(inputTC);
                                $("#acordionCategorias").append(div);
                                feather.replace();
                                $('[data-toggle="tooltip"]').tooltip();
                            }
                        }
                    }
                });
            }

        }else{

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

    if(window.location.pathname.split('/')[2].toLowerCase() == 'agregarInspeccion'.toLowerCase() || window.location.pathname.split('/')[2].toLowerCase() == 'modificarInspeccion'.toLowerCase())
    {
        var idInspeccion = document.getElementById('inputIdInspeccion').value;
        var idNorma = document.getElementById('idNorma').value;
        
        if (idInspeccion != "" && idNorma != "") {
            var baseurl =  window.origin + '/Inspeccion/json_listarCategoriasPreguntasRespuestaInspeccion';
            jQuery.ajax({
                type: "POST",
                url: baseurl,
                dataType: 'json',
                data: {idInspeccion: idInspeccion, idNorma: idNorma},
                success: function(data) {
                    if (data) {

                        if (data.data_cp_n) {
                                var id_categoria_i = null;
                                var div = '';
                                var expandido = 'true';
                                $("#acordionCategorias").empty();

                                var inputTC = '';
                                inputTC = inputTC.concat('<input type="text" class="form-control form-control-sm" id="inputTotalCategorias" name="inputTotalCategorias" value="',data.data_cp_n.length/*data.data_total.length*/,'" hidden>');
                                for (var i = 0; i < data.data_cp_n.length/*data.data_total.length*/; i++) {
                                    inputTC = inputTC.concat('<input type="text" class="form-control form-control-sm" id="inputTotalPreguntas_',(i+1),'" name="inputTotalPreguntas_',(i+1),'" value="',data.data_cp_n.length/*data.data_total[i].cantPreguntas*/,'" hidden>');
                                }

                                var contador = 0;

                                $.each(data.data_cp_n, function(index_c, categoria ) {


/*                                    var id_categoria = data.data_cp_n[i][2];
                                    var id_pregunta = data.data_cp_n[i][3];
                                    var cod_categoria = data.data_cp_n[i][4];
                                    var categoria = data.data_cp_n[i][5];
                                    var cod_pregunta = data.data_cp_n[i][6];
                                    var pregunta = data.data_cp_n[i][7];
                                    var cant_preguntas = 0;

                                    var id_respuesta = data.data_cp_n[i][3];
                                    var cod_categoria = data.data_cp_n[i][4];
                                    var categoria = data.data_cp_n[i][5];
                                    var cod_pregunta = data.data_cp_n[i][6];
                                    var pregunta = data.data_cp_n[i][7];
                                    var cant_preguntas = 0;*/



                                    var hidden = '';
                                    var clase = '';
                                    var clase_pauta = '';
                                    if (categoria.categoria.trim().toLowerCase() == 'sala de maquinas') {
                                        clase = 'sala_maquina';
                                        clase_pauta = 'pauta_carpeta';

                                        var selectSalaMaquina = document.getElementById("selectSalaMaquina");
                                        var isVisible = selectSalaMaquina.options[selectSalaMaquina.selectedIndex].value == 1;
                                        if (!isVisible) {
                                            hidden = 'hidden';
                                        }else{
                                            hidden = '';
                                        }
                                    }

                                    cant_preguntas_respondidas = 0;
                                    categoria.preguntas.forEach(function(element) {
                                        if(element.respuesta != null){
                                            cant_preguntas_respondidas++;
                                        }
                                    });
                                    
                                    clase_contador_respuestas = (cant_preguntas_respondidas == categoria.preguntas.length ? "success" : (cant_preguntas_respondidas < categoria.preguntas.length && cant_preguntas_respondidas > 0 ? "warning" : "danger"));
                                    clase_titulo_respuestas = (cant_preguntas_respondidas == categoria.preguntas.length ? "btn-outline-success" : (cant_preguntas_respondidas < categoria.preguntas.length && cant_preguntas_respondidas > 0 ? "btn-outline-warning" : "btn-outline-danger"));


                                    div = div.concat('<div id="categoria',categoria.id_categoria,'" class="card card-body ',clase,'" ',hidden,'>');
                                    div = div.concat('<div class="table-responsive">');
                                    div = div.concat('<table id="tabla_',categoria.id_categoria,'" class="table table-sm">');
                                    div = div.concat('<thead>');
                                    div = div.concat('<tr class="border-1">');
                                    div = div.concat('<td colspan="2" class="ml-3 text-left">');
                                    div = div.concat('<h5 class="mb-0">');
                                    div = div.concat('<button id="button_cat_',categoria.id_categoria,'" class="btn btn-link btn-block text-left ',clase_titulo_respuestas,'" type="button" data-toggle="collapse" data-target="#tbodyCategoria',categoria.id_categoria,'" aria-expanded="true" aria-controls="tbodyCategoria',categoria.id_categoria,'">');
                                    div = div.concat(categoria.codigo, ' - ', categoria.categoria);
                                    div = div.concat('</button>');

                                    div = div.concat('</h5>');
                                    div = div.concat('</td>');
                                    div = div.concat('<td colspan="3" class="text-right celdaAsignado">');
                                    div = div.concat('<span id="conteo_',categoria.id_categoria,'" class="badge badge-',clase_contador_respuestas,' badge-pill">',cant_preguntas_respondidas,'</span>  /  <span id="total_conteo_',categoria.id_categoria,'" class="badge badge-',clase_contador_respuestas,' badge-pill">',categoria.preguntas.length/*cant_preguntas*/,'</span>');
                                    div = div.concat('<a class="btn btn-link agregarObservacion" data-id="',categoria.id_categoria,'" data-codigo="',categoria.codigo,'" data-nombre="',categoria.categoria,'" data-toggle="modal" data-target="#modalFoto"><i stop-color data-feather="plus" class="pb-1"></i>Agregar Observacion</a>');
                                    div = div.concat('</td>');
                                    div = div.concat('</tr>');
                                    div = div.concat('</thead>');
                                    //div = div.concat('<thead>');
                                    
                                    //div = div.concat('</thead>');
                                    div = div.concat('<tbody id="tbodyCategoria',categoria.id_categoria,'" class="collapse show" aria-labelledby="categoria',categoria.id_categoria,'" data-parent="#categoria',categoria.id_categoria,'" >');
                                    div = div.concat('<tr>');
                                    div = div.concat('<!--<th scope="col" class="text-left align-middle">#</th>-->');
                                    div = div.concat('<th scope="col" class="text-left align-middle">Codigo</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle celdaAsignado">Pregunta</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle">SI</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle">NO</th>');
                                    div = div.concat('<th scope="col" class="text-left align-middle">N/A</th>');
                                    div = div.concat('</tr>');

                                    if (categoria.preguntas.length > 0) {

                                        $.each(categoria.preguntas, function(index_p, pregunta) {
                                            contador++;
                                            div = div.concat('<tr class="pregunta',categoria.id_categoria,'_',pregunta.id_pregunta,' preguntas">');
                                            div = div.concat('<!--<th class="text-left align-middle"><p>',categoria.id_categoria,'_',pregunta.id_pregunta,'</p></th>-->');
                                            div = div.concat('<th class="text-left align-middle"><p class="texto-pequenio text-left align-middle registro">',pregunta.codigo,'</p></th>');
                                            div = div.concat('<td class="text-left align-middle celdaAsignado"><p class="texto-pequenio text-left align-middle registro">',pregunta.pregunta,'</p></td>');
                                            div = div.concat('<td class="text-left align-middle radio"><input type="radio" id="rbPregunta',contador,'_SI" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbSI ',clase_pauta,'" data-id_categoria="',categoria.id_categoria,'" data-id_pregunta="',pregunta.id_pregunta,'" value="si-',categoria.id_categoria,'_',pregunta.id_pregunta,'" ',(pregunta.respuesta == 1 ? 'checked' : ''),'></td>');
                                            div = div.concat('<td class="text-left align-middle radio"><input type="radio" id="rbPregunta',contador,'_NO" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNO ',clase_pauta,'" data-id_categoria="',categoria.id_categoria,'" data-id_pregunta="',pregunta.id_pregunta,'" value="no-',categoria.id_categoria,'_',pregunta.id_pregunta,'" ',(pregunta.respuesta == 2 ? 'checked' : ''),'></td>');
                                            div = div.concat('<td class="text-left align-middle radio"><input type="radio" id="rbPregunta',contador,'_NA" name="rbPregunta',contador,/*,id_categoria,'_',id_pregunta,*/'" class="pauta rbNA ',clase_pauta,'" data-id_categoria="',categoria.id_categoria,'" data-id_pregunta="',pregunta.id_pregunta,'" value="na-',categoria.id_categoria,'_',pregunta.id_pregunta,'" ',(pregunta.respuesta == 3 ? 'checked' : ''),'></td>');
                                            div = div.concat('</tr>');
                                            
                                            div = div.concat('<tr>');
                                            div = div.concat('<td id="cat_pre_',categoria.id_categoria,'_',pregunta.id_pregunta,'" class="collapse  ',(pregunta.respuesta == 2 ? 'show' : ''),'" colspan="5">');
                                            div = div.concat('<div class="card card-body">');
                                            div = div.concat('<div class="row">');

                                            //div = div.concat('<div class="col-sm-6">');
                                            //div = div.concat('<label for="inputObservaciones',categoria.id_categoria,'_',pregunta.id_pregunta,'">Observaciones</label>');
                                            //div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una Obseravaci&oacute;n" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                            //div = div.concat('</div>');

                                            if(pregunta.respuestas.length > 0){

                                                div = div.concat('<div class="form-group col-sm-6">');
                                                    div = div.concat('<ul class="nav nav-tabs" id="myTab" role="tablist">');
                                                      div = div.concat('<li class="nav-item" role="presentation">');
                                                        div = div.concat('<a class="nav-link active" id="respuesta_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'" data-toggle="tab" href="#respuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tab" aria-controls="respuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'" aria-selected="true">Respuestas</a>');
                                                      div = div.concat('</li>');
                                                      div = div.concat('<li class="nav-item" role="presentation">');
                                                        div = div.concat('<a class="nav-link" id="respuesta_obs_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'" data-toggle="tab" href="#respuesta_obs',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tab" aria-controls="respuesta_obs',categoria.id_categoria,'_',pregunta.id_pregunta,'" aria-selected="false">Nueva Respuesta</a>');
                                                      div = div.concat('</li>');
                                                    div = div.concat('</ul>');
                                                    div = div.concat('<div class="tab-content" id="myTabContent">');
                                                        div = div.concat('<div class="tab-pane fade show active" id="respuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tabpanel" aria-labelledby="respuesta_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'">');
                                                            div = div.concat('<div class="form-group col-sm-12">');
                                                                div = div.concat('<div class="row justify-content-md-left">');
                                                                    div = div.concat('<div class="form-group col-sm-12  mt-3">');
                                                                        //div = div.concat('<label for="sRespuesta',categoria.id_categoria,'_',pregunta.id_pregunta,'">Respuesta</label>');
                                                                        div = div.concat('<select id="sRespuesta',contador/*categoria.id_categoria,'_',pregunta.id_pregunta*/,'" name="sRespuesta',contador/*categoria.id_categoria,'_',pregunta.id_pregunta*/,'" class="custom-select custom-select-sm">');
                                                                            div = div.concat('<option value="-1" selected>Seleccione una Respuesta</option>');
                                                                            
                                                                            $.each(pregunta.respuestas, function(index_r, respuesta) {
                                                                                div = div.concat('<option value="',respuesta['id_respuesta'],'" ',(pregunta.id_respuesta == respuesta['id_respuesta'] ? 'selected' : ''),'>',respuesta['respuesta'],'</option>');
                                                                            });

                                                                        div = div.concat('</select>');
                                                                    div = div.concat('</div>');
                                                                div = div.concat('</div>');
                                                            div = div.concat('</div>');
                                                        div = div.concat('</div>');
                                                        div = div.concat('<div class="tab-pane fade" id="respuesta_obs',categoria.id_categoria,'_',pregunta.id_pregunta,'" role="tabpanel" aria-labelledby="respuesta_obs_tab',categoria.id_categoria,'_',pregunta.id_pregunta,'">');
                                                            div = div.concat('<div class="justify-content-md-left p-3">');
                                                            //div = div.concat('<label for="inputObservaciones">Nueva Respuesta</label>');
                                                            //div = div.concat('<input type="text" class="form-control form-control-sm" id="inputObservaciones" minlength="1" placeholder="Ingrese una Respuesta" name="inputObservaciones" value="">');
                                                                div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una nueva Respuesta" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                                            div = div.concat('</div>');
                                                        div = div.concat('</div>');
                                                    div = div.concat('</div>');
                                                div = div.concat('</div>');
                                            }else{
                                                div = div.concat('<div class="col-sm-6">');
                                                div = div.concat('<label for="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'">Nueva Respuesta</label>');
                                                div = div.concat('<textarea class="form-control form-control-sm block" placeholder="Ingrese una nueva Respuesta" id="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" name="inputObservaciones',contador,/*,id_categoria,'_',id_pregunta,*/'" rows="2"></textarea>');
                                                div = div.concat('</div>');
                                            }


                                            div = div.concat('<div class="col-6 row">');

                                            //div = div.concat('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalFoto">Tomar una Foto</button>');
                                            
                                            div = div.concat('<div class="col-sm-12 col-md-6 mt-4">');
                                            div = div.concat('<button type="button" class="btn btn-primary align-middle tomarFoto" data-toggle="modal" data-target="#modalFoto" data-id="',categoria.id_categoria,'_',pregunta.id_pregunta,'">Tomar una Foto</button>');
                                            div = div.concat('</div>');

                                            
                                            /*div = div.concat('<img id="foto_1_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_2_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_3_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_4_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');
                                            div = div.concat('<img id="foto_5_',id_categoria,'_',id_pregunta,'" class="img-fluid" src="">');*/
                                            //div = div.concat('<label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">Agregar Foto</span></label>');
                                            //div = div.concat('<a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>');
                                            div = div.concat('</div>');

                                            div = div.concat('<div id="div_',categoria.id_categoria,'_',pregunta.id_pregunta,'" class="col-12 row">');

                                            if(pregunta.imagenes.length > 0){
                                                $.each(pregunta.imagenes, function(index_i, imagen) {
                                                    div = div.concat('<div class="col-xs-3 m-3" id="div_image_',imagen.id_imagen,'">');
                                                    div = div.concat('<button type="button" class="close" aria-label="Close">');
                                                    div = div.concat('<span class="close quitarImagen" aria-hidden="true" id="close_',imagen.id_imagen,'" data-id="',imagen.id_imagen,'" data-id_div="',categoria.id_categoria,'_',pregunta.id_pregunta,'">×</span>');
                                                    div = div.concat('</button>');
                                                    div = div.concat('<img alt="Alt information for image" class="img-fluid rounded float-left" src="',window.origin + '/assets/files/image/',imagen.file_name,'" width="150" id="',imagen.id_imagen,'">');
                                                    div = div.concat('<input type="file" id="picture_',imagen.id_imagen,'" name="picture_',imagen.id_imagen,'" hidden="true">');
                                                    div = div.concat('</div>');
                                                });
                                            }
                                            div = div.concat('</div>');

                                            div = div.concat('</div>');
                                            div = div.concat('</div>');
                                            div = div.concat('</td>');
                                            div = div.concat('</tr>');
                                        });
                                    }



                                    div = div.concat('</tbody>');
                                    div = div.concat('</table>');
                                    div = div.concat('</div>');
                                    div = div.concat('</div>');


                                });

                                //div = div.concat('</div>');
                                //div = div.concat('</div>');
                                $("#acordionCategorias").append(inputTC);
                                $("#acordionCategorias").append(div);
                                feather.replace();
                                $('[data-toggle="tooltip"]').tooltip();
                            }

                    }
                }
            });
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


        $('#tListaNormas').DataTable( {
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
            //"data": data.empresas_mantenedoras,
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
             /*"columnDefs": [
                { "width": "20%", "targets": 0 }
              ],*/
            
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

        //var table = $('#tListaNormas').DataTable();
        //table.columns.adjust().draw();

        feather.replace();
    }
}