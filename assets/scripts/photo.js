 $(document).ready(function() {


 $('#guardarF').on('click', function(e) {
      var botonPopUp = e.currentTarget;
      var video = document.getElementById("videoModal"),
      canvas = document.getElementById("canvasModal");

      document.getElementById('tituloMC').dataset.foto = 'frontal';

      if (tieneSoporteUserMedia()) {
        _getUserMedia(
            {video: true},
            function (stream) {
              console.log("Permiso concedido");
              //$video.src = window.URL.createObjectURL(stream);
              video.srcObject=stream;
              video.play();       
          }, function (error) {
              alert("Permiso denegado o error: ", error);
              //$estado.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
          });
      } else {
        alert("Lo siento. Tu navegador no soporta esta característica");
        //$estado.innerHTML = "Parece que tu navegador no soporta esta característica. Intenta actualizarlo.";
      }
      $(document.getElementById('tituloMC')).html('Sacar Foto Superior Cedula de Identidad');
      $('#modalCamara').modal('show');
  });

  $('#guardarB').on('click', function(e) {
      var botonPopUp = e.currentTarget;
      var video = document.getElementById("videoModal"),
      canvas = document.getElementById("canvasModal");

      document.getElementById('tituloMC').dataset.foto = 'inferior';

      if (tieneSoporteUserMedia()) {
        _getUserMedia(
            {video: true},
            function (stream) {
              console.log("Permiso concedido");
              //$video.src = window.URL.createObjectURL(stream);
              video.srcObject=stream;
              video.play();       
          }, function (error) {
              alert("Permiso denegado o error: ", error);
              //$estado.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
          });
      } else {
        alert("Lo siento. Tu navegador no soporta esta característica");
        //$estado.innerHTML = "Parece que tu navegador no soporta esta característica. Intenta actualizarlo.";
      }

      $(document.getElementById('tituloMC')).html('Sacar Foto Inferior Cedula de Identidad');
      $('#modalCamara').modal('show');
  });

   $('#guardarS').on('click', function(e) {
      var botonPopUp = e.currentTarget;
      var video = document.getElementById("videoModal"),
      canvas = document.getElementById("canvasModal");

      document.getElementById('tituloMC').dataset.foto = 'selfie';

      if (tieneSoporteUserMedia()) {
        _getUserMedia(
            {video: true},
            function (stream) {
              console.log("Permiso concedido");
              //$video.src = window.URL.createObjectURL(stream);
              video.srcObject=stream;
              video.play();       
          }, function (error) {
              alert("Permiso denegado o error: ", error);
              //$estado.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
          });
      } else {
        alert("Lo siento. Tu navegador no soporta esta característica");
        //$estado.innerHTML = "Parece que tu navegador no soporta esta característica. Intenta actualizarlo.";
      }
      $(document.getElementById('tituloMC')).html('Sacar Foto Selfie');
      $('#modalCamara').modal('show');
  });

  $('#btnCapturar').on('click', function(e) {
    var video = document.getElementById("videoModal"),
      canvas = document.getElementById("canvasModal");
      video.pause();
      //Obtener contexto del canvas y dibujar sobre él
      var contexto = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
      var foto = canvas.toDataURL("image/jpeg");

      document.getElementById('tituloMC').dataset.fotoCaptura = foto;

  });

  $('#btnGuardar').on('click', function(e) {
    var fotoTipo = document.getElementById('tituloMC').dataset.foto;
    var foto = document.getElementById('tituloMC').dataset.fotoCaptura;
    if(fotoTipo == "frontal")
    {
      $(document.getElementById('imgF')).attr('src', foto);
      $(document.getElementById('imgF')).removeAttr('hidden');
      $(document.getElementById('iconoCameraF')).attr('hidden', 'hidden');
      $('#modalCamara').modal('hide');       
    }else
    {
      if(fotoTipo == "inferior")
      {
        $(document.getElementById('imgB')).attr('src', foto);
        $(document.getElementById('imgB')).removeAttr('hidden');
        $(document.getElementById('iconoCameraB')).attr('hidden', 'hidden');
        $('#modalCamara').modal('hide');
      }else
      {
        $(document.getElementById('imgS')).attr('src', foto);
        $(document.getElementById('imgS')).removeAttr('hidden');
        $(document.getElementById('iconoCameraS')).attr('hidden', 'hidden');
        $('#modalCamara').modal('hide');
      }
      $('#modalCamara').modal('hide');
    }

    var video = document.getElementById("videoModal"),
      canvas = document.getElementById("canvasModal");
      video.pause();
      //Obtener contexto del canvas y dibujar sobre él
      var contexto = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      contexto.drawImage(video, 0, 0, canvas.width, canvas.height);
      var foto = canvas.toDataURL("image/jpeg");

      document.getElementById('tituloMC').dataset.fotoCaptura = foto;

  });

   

  //$("#formValidarCliente").submit(function(e) {
    $("#validarUsuario").click(function(e){
    var loader = document.getElementById("loader");

    var x = Math.floor((Math.random() * 4) + -1);

    idTraspaso = document.getElementById('validarUsuario').dataset.idtraspaso;
    idRespuesta = x;
     
    var baseurl = window.origin + '/TOC/Traspaso/usuarioValido';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idTraspaso: idTraspaso, idRespuesta: x },
    success: function(data) {
    if (data)
    {
      $(document.getElementById('tituloMM')).html('Confirmacion');
      $(document.getElementById('parrafoMM')).html('Transaccion Realizada');
      $(document.getElementById('btnCerrar')).attr('hidden', '');
      $(document.getElementById('cerrarTodo')).removeAttr('hidden', '');
      $('#modalMensaje').modal('show');
    }
    }
    });

 
    
    /*var​ form_data = ​new​ FormData();
    var apiKey = "7b8a72c87f4a415b8603e16c6b6afcee";
    var docType = 'CHL2';

    var selfie_file = document.getElementById('imgS').src;
    var front_file = document.getElementById('imgF').src;
    var back_file = document.getElementById('imgB').src;

    form_data.append(​'apiKey'​, apiKey);
    form_data.append(​'documentType'​, docType);

    form_data.append(​'selfie'​, selfie_file);

    form_data.append(​'id_front'​, front_file); ​

    // Raw bytes of the photo 
    form_data.append(​'id_back'​, back_file); ​
    // Raw bytes of the photo   
    $.ajax({                 
      url: ​"https://sandbox-api.7oc.cl/v2/face-and-document"​,
      async: ​true​,
      crossDomain: ​true​,
      processData: ​false​,
      contentType: ​false​,
      type: ​'POST'​,
      data: form_data              
    }).done(​function​(data) ​{
       alert('metch');          
    }fail(​function​(data) ​{
      ​//your code if fails             
    } 
  */
  });

function tieneSoporteUserMedia() {
    return !!(navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia)
}
function _getUserMedia() {
    return (navigator.getUserMedia || (navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia) || navigator.webkitGetUserMedia || navigator.msGetUserMedia).apply(navigator, arguments);
}

// Declaramos elementos del DOM
/*var $video = document.getElementById("video"),
  $canvas = document.getElementById("canvas"),
  $boton = document.getElementById("guardarF"),
  $estado = document.getElementById("estado");

  var $videoA = document.getElementById("videoA"),
  $canvasA = document.getElementById("canvasA"),
  $botonA = document.getElementById("guardarA"),
  $estadoA = document.getElementById("estadoA");
*/

 /* if (tieneSoporteUserMedia()) {
    _getUserMedia(
        {video: true},
        function (stream) {
            console.log("Permiso concedido");
      //$video.src = window.URL.createObjectURL(stream);
      video.srcObject=stream;
      videoA.srcObject=stream;
      $video.play();
      $videoA.play();

      //Escuchar el click
      $boton.addEventListener("click", function(){

        //Pausar reproducción
        $video.pause();

        //Obtener contexto del canvas y dibujar sobre él
        var contexto = $canvas.getContext("2d");
        $canvas.width = $video.videoWidth;
        $canvas.height = $video.videoHeight;
        contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);

        
        var foto = $canvas.toDataURL(); 

        */

        //Esta es la foto, en base 64
        /*$estado.innerHTML = "Enviando foto. Por favor, espera...";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./guardar_foto.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(encodeURIComponent(foto)); //Codificar y enviar

        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                console.log("La foto fue enviada correctamente");
                console.log(xhr);
                $estado.innerHTML = "Foto guardada con éxito. Puedes verla <a target='_blank' href='./" + xhr.responseText + "'> aquí</a>";
            }
        }

        //Reanudar reproducción
        $video.play();*/
     // });

      /*$botonA.addEventListener("click", function(){

        //Pausar reproducción
        $videoA.pause();

        //Obtener contexto del canvas y dibujar sobre él
        var contexto = $canvas.getContext("2d");
        $canvasA.width = $video.videoWidth;
        $canvasA.height = $video.videoHeight;
        contexto.drawImage($videoA, 0, 0, $canvasA.width, $canvasA.height);

        var fotoA = $canvasA.toDataURL(); //Esta es la foto, en base 64
        /*$estado.innerHTML = "Enviando foto. Por favor, espera...";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./guardar_foto.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(encodeURIComponent(foto)); //Codificar y enviar

        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                console.log("La foto fue enviada correctamente");
                console.log(xhr);
                $estado.innerHTML = "Foto guardada con éxito. Puedes verla <a target='_blank' href='./" + xhr.responseText + "'> aquí</a>";
            }
        }

        //Reanudar reproducción
        $video.play();*/
    //  });

/*
        }, function (error) {
            console.log("Permiso denegado o error: ", error);
            $estado.innerHTML = "No se puede acceder a la cámara, o no diste permiso.";
        });
  } else {
      alert("Lo siento. Tu navegador no soporta esta característica");
      $estado.innerHTML = "Parece que tu navegador no soporta esta característica. Intenta actualizarlo.";
  }
*/





  $("#agregarTraspaso").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
    rules: {
      inputRun: {
        required: true,
        minlength: 7,
        maxlength: 50
      },
      inputFechaNacimiento: {
        required: true,
        minlength: 3,
        maxlength: 40
      },
      inputNombres: {
        required: true,
        minlength: 3,
        maxlength: 50
      },
      inputApellidos: {
        required: true,
        minlength: 3,
        maxlength: 40
      },
      inputEmail: {
        required: true,
        minlength: 1
      },
      inputCelular: {
        required: true,
        minlength: 1
      },
      inputObservaciones: {
        maxlength: 100
      },
    },
    messages:{
      inputRun: {
        required: "Se requiere el R.U.N. del Cliente.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      inputFechaNacimiento: {
         required: "Se requiere Fecha de Nacimiento del Cliente.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      inputNombres: {
        required: "Se requiere los Nombres del Cliente.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      inputApellidos: {
        required: "Se requiere los Apellidos del Cliente.",
        minlength: "Se requiere m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      inputEmail: {
        required: "Se requiere el Email del Cliente.",
        minlength: "Se requiere seleccionar un Tipo de Traspaso.",
      },
      inputCelular: {
        required: "Se requiere el Celular del Cliente.",
        minlength: "Se requiere m&iacute;nimo {0} caracteres.",
      },
      inputObservaciones: {
        maxlength: "Se requiere no mas de {0} caracteres."
      },
    }
  });

  $('#buscarTraspaso').on('change',function(e){
     filtroTraspaso = $('#buscarTraspaso').val();

     if(filtroTraspaso.length = 0)
        filtroTraspaso = "";
    listarTraspasos(filtroTraspaso);
  });

  $('#modalEliminarTraspaso').on('show.bs.modal', function(e) {
    //get data-id attribute of the clicked element
    var idTraspaso = $(e.relatedTarget).data('id');
    var nombreTraspaso = $(e.relatedTarget).data('nombre');
    //populate the textbox
    $("#tituloEC").text('Eliminar ' + nombreTraspaso);
    $("#parrafoEC").text('¿Estás seguro que deseas eliminar "' + nombreTraspaso + '"?');

    $("#tituloEC").removeData("idtraspaso");
    $("#tituloEC").attr("data-idtraspaso", idTraspaso);
    //$("#tituloEC").removeData("nombretraspaso");
    //$("#tituloEC").attr("data-nombreTraspaso", nombreTraspaso);
  });

  $('#eliminarTraspaso').click(function(e){
    idTraspaso = $('#tituloEC').data('idtraspaso');
    //var nombreTraspaso = $('#tituloEC').data('nombretraspaso');
    var baseurl = window.origin + '/gestion_calidad/TOC/Traspaso/eliminarTraspaso';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    //dataType: 'json',
    data: {idTraspaso: idTraspaso},
    success: function(data) {
      if (data)
      {
        if(data == '1')
        {
          $('#tituloME').empty();
          $("#parrafoME").empty();
          $("#tituloME").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoME").append('Se ha eliminado exitosamente el Traspaso.');
          $('#modalEliminarTraspaso').modal('hide');
          $('#modalMensajeTraspaso').modal({
            show: true
          });
          listarTraspasos('');
        }else{
          $('#tituloME').empty();
          $("#parrafoME").empty();
          $("#tituloME").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoME").append('Ha ocurrido un error al intentar eliminar el Traspaso.');
          $('#modalEliminarTraspaso').modal('hide');
          $('#modalMensajeTraspaso').modal({
            show: true
          });
          listarTraspasos('');
        }
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  });

  $('#buscarEAC').on('change', function(e){
     filtroEAC = $('#buscarEAC').val();

     if(filtroEAC.length = 0)
        filtroEAC = "";
      listarEAC(filtroEAC);
  });

  function listarTraspasos(filtro)
  {
    var baseurl = window.origin + '/gestion_calidad/TOC/Traspaso/buscarTraspaso';
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {traspaso: filtro},
    success: function(data) {
    if (data)
    {
        $("#tbodyTraspaso").empty();
        for (var i = 0; i < data.length; i++){
          var row = '<tr>';
          row = row.concat('\n<th scope="row" class="text-center align-middle registro">',data[i]['id_traspaso'],'</th>');
          row = row.concat('\n<td class="text-center align-middle registro">',data[i]['c_nombre'],'</td>');
          row = row.concat('\n<td class="text-center align-middle registro">',data[i]['c_titulo'],'</td>');
          row = row.concat('\n<td class="text-center align-middle registro">',data[i]['c_muestra'],'</td>');
          row = row.concat('\n<td class="text-center align-middle registro">',((data[i]["c_cant_gestiones_ciclo"]) == null? '': (data[i]["c_cant_gestiones_ciclo"])),'</td>');
          row = row.concat('\n<td class="text-center align-middle registro">',data[i]['plantilla'],'</td>');
          row = row.concat('\n<td class="text-center align-middle registro">',data[i]['c_tmo'],'</td>');
          row = row.concat('\n<td class="text-right align-middle registro">');
          row = row.concat('\n<a id="trash_',data[i]['id_traspaso'],'" class="trash" href="#" data-id="',data[i]['id_traspaso'],'" data-nombre="',data[i]['c_nombre'],'" data-toggle="modal" data-target="#modalEliminarTraspaso">');
          row = row.concat('\n<i data-feather="trash-2"  data-toggle="tooltip" data-placement="top" title="eliminar"></i>');
          row = row.concat('\n</a>');
          row = row.concat('\n<a id="edit_',data[i]['id_traspaso'],'" class="edit" type="link" href="ModificarTraspaso/?idTraspaso=',data[i]['id_traspaso'],'" data-id="',data[i]['id_traspaso'],'" data-nombre="',data[i]['c_nombre'],'">');
          row = row.concat('\n<i data-feather="edit-3"  data-toggle="tooltip" data-placement="top" title="modificar"></i>');
          row = row.concat('\n</a>');
          row = row.concat('\n</td>');
          row = row.concat('\n<tr>');

        $("#tbodyTraspaso").append(row);
      }
      feather.replace()
      $('[data-toggle="tooltip"]').tooltip()
    }
    }
    });
  }

  function listarEAC(filtro){
    var eacs = [];
    if(document.getElementById('tablaEAC').dataset.eac.split(',').length > 0 && document.getElementById('tablaEAC').dataset.eac.split(',') != "")
      if(document.getElementById('tablaEAC').dataset.eac.split(',').length == 1)
        eacs = [document.getElementById('tablaEAC').dataset.eac];
      else
        eacs = document.getElementById('tablaEAC').dataset.eac.split(',');

    var baseurl = window.origin + '/gestion_calidad/TOC/Traspaso/buscarEAC';   

    jQuery.ajax({
    type: "POST",
    url: baseurl, //"buscarEAC",
    dataType: 'json',
    data: {eac: filtro},
    success: function(data) {
      if (data)
      {
          $("#tbodyEAC").empty();
          count = 0;
          for (var i = 0; i < data.length; i++){
            count++;
            var clases = "";//((count == 2) ? 'list-group' : '');
            if(count == 15)
              count = 0;
            var row = '';
            row = row.concat('<tr class="',clases,'">');
            row = row.concat('\n<td class="text-center" hidden>',data[i]['id_usuario'],'</td>');
            row = row.concat('\n<th class="text-center" scope="col">',data[i]['cod_eac'],'</td>');
            row = row.concat('\n<td class="text-center" colspan="5">',data[i]['nombres'],'</td>');
            row = row.concat('\n<td class="text-center" colspan="5">',data[i]['apellidos'],'</td>');
            row = row.concat('\n <td class="text-center" >',data[i]['email'],'</td>');
            row = row.concat('\n<td class="text-center " >');
            
            checked = "";
            var indiceEAC = eacs.indexOf(data[i]['id_usuario'].toString());
            if(indiceEAC != -1)
              checked = "checked";

            row = row.concat('\n<input id="check_',data[i]['id_usuario'],'" type="checkbox" class="pauta" data-idUsuario="', data[i]['id_usuario'],'" ', checked, '>');
            row = row.concat('\n</td>');
            row = row.concat('\n<tr>');
          $("#tbodyEAC").append(row);
        }
        //feather.replace()
        //$('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  }

  $('#tListaEAC').on('click', '.pauta', function(e) {
      idEAC = $(e.currentTarget).data('idusuario');
      checked = null;
      if(idEAC != null)
        checked = ($(this).is(':checked') ? true : false);

      var eacs = [];
      if(document.getElementById('tablaEAC').dataset.eac.split(',').length > 0 && document.getElementById('tablaEAC').dataset.eac.split(',') != "")
        if(document.getElementById('tablaEAC').dataset.eac.split(',').length == 1)
          eacs = [document.getElementById('tablaEAC').dataset.eac];
        else
          eacs = document.getElementById('tablaEAC').dataset.eac.split(',');

      var indiceEAC = eacs.indexOf(idEAC.toString());
      if(indiceEAC != -1)
      {
        if(!checked)
          eacs.splice(indiceEAC, 1);
      }else
        if(checked)
          eacs.push([idEAC]);
      document.getElementById('tablaEAC').dataset.eac = eacs;
  });

  $('#check_todos').on('click', function(e) {

      var tListaEAC = document.getElementById("tListaEAC");
      var r=1;
      var eacs = [];
      cant = 0;
      checked = ($("#check_todos").text() == 'Deseleccionar Todos' ? false : true);
      if(document.getElementById('tablaEAC').dataset.eac.split(',').length > 0 && document.getElementById('tablaEAC').dataset.eac.split(',') != "")
        if(document.getElementById('tablaEAC').dataset.eac.split(',').length == 1)
          eacs = [document.getElementById('tablaEAC').dataset.eac];
        else
          eacs = document.getElementById('tablaEAC').dataset.eac.split(',');
      while(row=tListaEAC.rows[r++])
      {
        if(row.cells.length > 0)
        {
          idEAC = row.cells[0].innerHTML;          
          if(idEAC != null)
          {
            var indiceEAC = eacs.indexOf(idEAC.toString());
            if(indiceEAC != -1)
            {
              if(!checked)
                eacs.splice(indiceEAC, 1);
            }else
              if(checked)
                eacs.push([idEAC]);

            $("#check_"+idEAC).prop("checked", checked);
          }
        }
      }

      document.getElementById('tablaEAC').dataset.eac = eacs;

      if(checked)
        $("#check_todos").text('Deseleccionar Todos');
      else
        $("#check_todos").text('Seleccionar Todos');
  });

  $("#agregarTraspaso").submit(function(e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#agregarTraspaso").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      event.preventDefault();
    
      var baseurl = (window.origin + '/TOC/Traspaso/guardarTraspaso');
      var run = $('#inputRun').val();
      var fechaNac = $('#inputFechaNacimiento').val();
      var nombres = $('#inputNombres').val();
      var apellidos = $('#inputApellidos').val();
      var email = $('#inputEmail').val();
      var celular = $('#inputCelular').val();
      var telefono = $('#inputTelefono').val();
      var observaciones = $('#inputObservaciones').val();
      var idTraspaso = null;
      if($("#inputIdTraspaso").val())
        idTraspaso = $('#inputIdTraspaso').val();

      jQuery.ajax({
      type: "POST",
      url: baseurl,
      dataType: 'json',
      data: { idTraspaso: idTraspaso, run: run, fechaNac: fechaNac,
              nombres: nombres, apellidos: apellidos, email: email, celular: celular, telefono: telefono,
              observaciones: observaciones },
      success: function(data) {
        if (data)
        {
          //data = JSON.parse(data);
          if(data['respuesta'] == '1')
          {
            $('#btnCerrarMC').removeClass('btn-secondary');
            $('#btnCerrarMC').addClass('btn-primary');
            $('#tituloMC').empty();
            $("#parrafoMC").empty();
            $("#tituloMC").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
            $("#parrafoMC").append(data['mensaje']);
            if(!$("#inputIdTraspaso").val())
            {
              $("#agregarTraspaso")[0].reset();
              $("#check_todos").text('Seleccionar Todos');
              $(".pauta").prop("checked", false);
            }
            loader.setAttribute('hidden', '');
            $('#modalMensajeTraspaso').modal({
              show: true
            });

          }else{
            $('#btnCerrarMC').removeClass('btn-primary');
            $('#btnCerrarMC').addClass('btn-secondary');
            $('#tituloMC').empty();
            $("#parrafoMC").empty();
            $("#tituloMC").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
            $("#parrafoMC").append(data['mensaje']);
            loader.setAttribute('hidden', '');
            $('#modalMensajeTraspaso').modal({
              show: true
            });

          }
          feather.replace()
          $('[data-toggle="tooltip"]').tooltip()
        }
      }
      });
    }else
    {
      loader.setAttribute('hidden', '');
    }
  });

  $('#modalMensajeTraspaso').on('hidden.bs.modal', function (e) {
    
  });

  $('#selectAnalistas').on('change',function(e){
      analista = null;
      traspaso = null;
      equipo = null;

      if($('#selectAnalistas').val().length > 0 && $('#selectAnalistas').val() != -1)
         analista = $('#selectAnalistas').val(); 

      if($('#selectTraspasos').val().length > 0 && $('#selectTraspasos').val() != -1)
        traspaso = $('#selectTraspasos').val();

      //if($('#selectEquipos').val().length > 0 && $('#selectEquipos').val() != -1)
        //equipo = $('#selectEquipos').val();

      listarUsuCampEqui(analista, traspaso, equipo);
  });

  $('#selectTraspasos').on('change',function(e){
    analista = null;
    traspaso = null;
    equipo = null;

    if($('#selectAnalistas').val().length > 0 && $('#selectAnalistas').val() != -1)
       analista = $('#selectAnalistas').val(); 

    if($('#selectTraspasos').val().length > 0 && $('#selectTraspasos').val() != -1)
      traspaso = $('#selectTraspasos').val();

    //if($('#selectEquipos').val().length > 0 && $('#selectEquipos').val() != -1)
      //equipo = $('#selectEquipos').val();

    listarUsuCampEqui(analista, traspaso, equipo);
  });

  /*$('#selectEquipos').on('change',function(e){
    analista = null;
    traspaso = null;
    equipo = null;

    if($('#selectAnalistas').val().length > 0 && $('#selectAnalistas').val() != -1)
       analista = $('#selectAnalistas').val(); 

    if($('#selectTraspasos').val().length > 0 && $('#selectTraspasos').val() != -1)
      traspaso = $('#selectTraspasos').val();

    if($('#selectEquipos').val().length > 0 && $('#selectEquipos').val() != -1)
      equipo = $('#selectEquipos').val();

    listarUsuCampEqui(analista, traspaso, null);
  });*/


  function listarUsuCampEqui(analista, traspaso, equipo)
  {
    var baseurl = window.origin + '/gestion_calidad/TOC/Traspaso/filtrarUsuCampEqui';
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {analista: analista, traspaso: traspaso, equipo: equipo},
    success: function(data) {
    if (data)
    {
      $("#tbodyUsuCampEqui").empty();
      for (var i = 0; i < data["usuCampEqui"].length; i++){
        var row = '<tr>';
        row = row.concat('\n<th scope="row" class="text-center align-middle registro">',data["usuCampEqui"][i]['id_usuario'],'</th>');
        row = row.concat('\n<td class="text-center align-middle registro">',data["usuCampEqui"][i]['nombre_completo'],'</td>');
        row = row.concat('\n<td class="text-center align-middle registro">',data["usuCampEqui"][i]['c_nombre'],'</td>');
        row = row.concat('\n<td class="text-center align-middle registro">',data["usuCampEqui"][i]['eq_nombre'],'</td>');
        row = row.concat('\n<td class="text-right align-middle registro">');
        row = row.concat('\n<a id="view_',data["usuCampEqui"][i]['id_usuario_traspaso'],'" class="view" href="#" data-id="',data["usuCampEqui"][i]['id_usuario_traspaso'],'" data-nombreAnalista="',data["usuCampEqui"][i]['nombre_completo'],'" data-nombreTraspaso="',data["usuCampEqui"][i]['c_nombre'],'" data-nombreEquipo="',data["usuCampEqui"][i]['eq_nombre'],'" data-toggle="modal" data-target="#modalEliminarUsuCampEqui">');
        row = row.concat('\n<i data-feather="trash-2"  data-toggle="tooltip" data-placement="top" title="eliminar"></i>');
        row = row.concat('\n</a>');
        row = row.concat('\n</td>')
        row = row.concat('\n<tr>');
        $("#tbodyUsuCampEqui").append(row);
      }

      if(analista != null && traspaso != null && data["usuCampEqui"].length == 1)
      {
        var btnAgregar = document.getElementById('btnAgregar');
        btnAgregar.classList.remove('btn-success');
        btnAgregar.classList.add('btn-secondary');
        btnAgregar.innerText = 'Modificar';
        btnAgregar.removeAttribute('data-idusucampequi');
        btnAgregar.removeAttribute('data-idequipo');
        btnAgregar.setAttribute('data-idusucampequi', data["usuCampEqui"][0]['id_usuario_traspaso']);
        btnAgregar.setAttribute('data-idequipo', data["usuCampEqui"][0]['id_equipo']);
      }else{
        var btnAgregar = document.getElementById('btnAgregar');
        btnAgregar.classList.remove('btn-secondary');
        btnAgregar.classList.add('btn-success');
        btnAgregar.innerText = 'Agregar';
        btnAgregar.removeAttribute('data-idusucampequi');
        btnAgregar.removeAttribute('data-idequipo');
      }

      feather.replace()
      $('[data-toggle="tooltip"]').tooltip()
    }
    }
    });
  }

  $("#btnAgregar").on('click', function(e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');

    analista = null;
    traspaso = null;
    equipo = null;

    if($('#selectAnalistas').val().length > 0 && $('#selectAnalistas').val() != -1)
       analista = $('#selectAnalistas').val(); 

    if($('#selectTraspasos').val().length > 0 && $('#selectTraspasos').val() != -1)
      traspaso = $('#selectTraspasos').val();

    if($('#selectEquipos').val().length > 0 && $('#selectEquipos').val() != -1)
      equipo = $('#selectEquipos').val();

    if(analista != null && traspaso != null)
      {
        var btnAgregar = document.getElementById('btnAgregar');
        var idEquipo = (btnAgregar.getAttribute('data-idequipo').trim() == "" ? null: btnAgregar.getAttribute('data-idequipo').trim());
        
        if(equipo == idEquipo)
        {
          var usuarioAnalista = $("#selectAnalistas option:selected").text();
          var mensaje = '';
          mensaje = mensaje.concat('El Usuario ', usuarioAnalista ,' ya posee la configuraci&oacute;n que desea modificar.');
          $('#tituloMUCE').empty();
          $("#parrafoMUCE").empty();
          $("#tituloMUCE").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoMUCE").append(mensaje);
          loader.setAttribute('hidden', '');
          $('#modalMensajeUsuCampEqui').modal({
            show: true
          });          
        }else
        {
           loader.setAttribute('hidden', '');
        }
      }else{
        var mensaje = '';
        if(analista == null)
        {
          mensaje = 'Debe seleccionar un Analista para Agregar la configuraci&oacute;n.';
        }else{
          if(traspaso == null)
          {
            mensaje = 'Debe seleccionar una Traspaso para Agregar la configuraci&oacute;n.';
          }
        }

        $('#tituloMUCE').empty();
        $("#parrafoMUCE").empty();
        $("#tituloMUCE").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
        $("#parrafoMUCE").append(mensaje);
        loader.setAttribute('hidden', '');
        $('#modalMensajeUsuCampEqui').modal({
          show: true
        });
      }
      feather.replace()
      $('[data-toggle="tooltip"]').tooltip()
  });

  $(".view").on('click', function(e) {
    let pdfWindow = window.open("")
    pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(e.currentTarget.dataset.pdf)+"'></iframe>");
  });

});