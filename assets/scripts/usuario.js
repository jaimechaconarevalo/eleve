$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip();
  feather.replace()

  $('#modalEliminarUsuario').on('show.bs.modal', function(e) {
    var idUsuario = $(e.relatedTarget).data('id');
    var rut = $(e.relatedTarget).data('rut');
    var nombreUsuario = ($(e.relatedTarget).data('nombre') + " " + $(e.relatedTarget).data('apellido')).trim();
    $("#tituloEP").text('Eliminar Usuario N° ' + idUsuario);
    $("#parrafoEP").text('¿Estás seguro que deseas eliminar el usuario rut ' + rut + ', "' + nombreUsuario + '"?');
    $("#tituloEP").removeData("idusuario");
    $("#tituloEP").attr("data-idusuario", idUsuario);
  });

  $('#eliminarUsuario').click(function(e){
    idUsuario = $('#tituloEP').data('idusuario');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Usuario/eliminarUsuario';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idUsuario: idUsuario},
    success: function(data) {
      if (data)
      {
        if(data == '1')
        {
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoMP").append('Se ha eliminado exitosamente el Usuario.');
          $('#modalEliminarUsuario').modal('hide');
           listarUsuarios();
          $('#modalMensajeUsuario').modal({
            show: true
          });
        }else{
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoMP").append('Ha ocurrido un error al intentar el Usuario.');
          $('#modalEliminarUsuario').modal('hide');
          listarUsuarios();
          $('#modalMensajeUsuario').modal({
            show: true
          });
        }
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  });

  $('#perfilAU').on('change',function(){
    listarUsuarios();
  });

  $('#inputBuscarHospital').on('change',function(e){
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    var filtroHospital = $(this).val();

    var baseurl = window.origin + '/Usuario/buscarHospital';
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {filtroHospital: filtroHospital},
    success: function(data) {
    if (data)
    {
        var myJSON= JSON.stringify(data);
        myJSON = JSON.parse(myJSON);
        row = "";
        $("#lista_hospitalesAU").empty();
        for (var i = 0; i < data.length; i++) {
          checked = "";
          var hospitales_usuario = JSON.parse(localStorage.getItem("hospitales_usuario"));
          if (hospitales_usuario != null && hospitales_usuario.length > 0) {
            for (var b = 0; b < hospitales_usuario.length; b++) {
              if (data[i]["id"] == hospitales_usuario[b]["id_hospital"]) {
                checked = "checked";
                break;
              }
            }
          }else{
            checked = "";
          }

          row = row.concat('\n<li class="list-group-item"><input class="form-check-input me-1 check_hospital" type="checkbox" value="" aria-label=".." data-id="',data[i]["id"],'" ',checked,'>',
          data[i]["codigo"],' - ',data[i]["nombre"],'</li>');
        }
        $("#lista_hospitalesAU").append(row);

        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
        loader.setAttribute('hidden', '');
      }
    }
    });
  });

  //$("#lista_hospitalesAU").on("change", ".check_hospital", function(e){
  $("#panel_hospitalesAU").on("change", ".check_hospital", function(e){
    
    //$('.check_hospital').on('change', function(e){
    idHospital = e.currentTarget.dataset.id;
    if($(this).is(':checked')){
      var hospitales_usuario = JSON.parse(localStorage.getItem("hospitales_usuario"));
      if (hospitales_usuario != null && hospitales_usuario.length > 0) {
        hospitales_usuario.push({'id_hospital': idHospital});
        localStorage.setItem("hospitales_usuario", JSON.stringify(hospitales_usuario));
      }else{
        var hospitales_usuario = [];
        hospitales_usuario.push({'id_hospital': idHospital});
        localStorage.setItem("hospitales_usuario", JSON.stringify(hospitales_usuario));
      }
    }else{
      var hospitales_usuario = JSON.parse(localStorage.getItem("hospitales_usuario"));
      if (hospitales_usuario != null && hospitales_usuario.length > 0) {
        const index = hospitales_usuario.findIndex(c => c.id_hospital === idHospital);
        //delete hospitales_usuario[index];
        delete hospitales_usuario.splice(index, 1);
        localStorage.setItem("hospitales_usuario", JSON.stringify(hospitales_usuario));
      }
    }
  });
  

  $("#agregarUsuario").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
    rules: {
      inputNombres: {
        required: true,
        minlength: 1,
        maxlength: 100
      },
      inputApellidos: {
        required: true,
        minlength: 1,
        maxlength: 100
      },
      inputEmail: {
        required: true,
        email: true,
        minlength: 1,
        maxlength: 100
      },
      selectPerfil: {
        required: true,
        min: 1
      },
    },
    messages:{
      inputNombres: {
        required: "Se requiere un Nombre.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      inputApellidos: {
        required: "Se requiere los Apellidos.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      inputEmail: {
        required: "Se requiere un Nombre.",
        email: "Ingrse un Email v&aacute;lido.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      selectPerfil: {
        required: "Se requiere un Perfil para el Usuario",
        min: "Se requiere un Perfil para el Usuario"
      }
    }
  });

  $("#agregarUsuario").submit(function(e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#agregarUsuario").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      event.preventDefault();
      e.preventDefault();
      var form = document.getElementById("agregarUsuario");
      var formData = new FormData(form);

     
      var baseurl = (window.origin + '/Usuario/agregarUsuario');

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
          //data = JSON.parse(data);
          if(data['resultado'] == '1')
          {
            $('#tituloMP').empty();
            $("#parrafoMP").empty();
            $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
            $("#parrafoMP").append(data['mensaje']);
            if(!$("#inputIdUsuario").val())
            {
              $("#agregarUsuario")[0].reset();
            }
            loader.setAttribute('hidden', '');
            $('#modalMensajeUsuario').modal({
              show: true
            });
            feather.replace()
          }else{
            $('#tituloMP').empty();
            $("#parrafoMP").empty();
            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
            $("#parrafoMP").append(data['mensaje']);
            loader.setAttribute('hidden', '');
            $('#modalMensajeUsuario').modal({
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

});

function listarUsuarios()
{
  var loader = document.getElementById("loader");
  loader.removeAttribute('hidden');
  var perfilAU = $("#perfilAU").val();

  var baseurl = window.origin + '/Usuario/listarUsuarios';
  jQuery.ajax({
  type: "POST",
  url: baseurl,
  dataType: 'json',
  data: {perfilAU: perfilAU},
  success: function(data) {
  if (data)
  {
      var myJSON= JSON.stringify(data);
      myJSON = JSON.parse(myJSON);
      $('#tablaListaUsuarios').html(myJSON.table_usuarios);
      $('#tListaUsuarios').dataTable({
          searching: true,
          paging:         true,
          ordering:       true,
          info:           true,
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

window.onload = function () {

  localStorage.myPageDataArr = undefined;
  localStorage.removeItem('hospitales_usuario');
  var hospitales = null;
  if (document.getElementById('lista_hospitalesAU') != null) 
    hospitales = document.getElementById('lista_hospitalesAU').children;

  if (hospitales != null && hospitales.length > 0) {
    for (var i = 0; i < hospitales.length; i++) {
      if(hospitales[i].firstElementChild.checked)
      {
        var idHospital = hospitales[i].firstElementChild.dataset.id;
        var hospitales_usuario = JSON.parse(localStorage.getItem("hospitales_usuario"));
        if (hospitales_usuario != null && hospitales_usuario.length > 0) {
          hospitales_usuario.push({'id_hospital': idHospital});
          localStorage.setItem("hospitales_usuario", JSON.stringify(hospitales_usuario));
        }else{
          var hospitales_usuario = [];
          hospitales_usuario.push({'id_hospital': idHospital});
          localStorage.setItem("hospitales_usuario", JSON.stringify(hospitales_usuario));
        }
      }
    }  
  }

  $('#tListaUsuarios').dataTable({
      searching: true,
      paging:         true,
      ordering:       true,
      info:           true,
      columnDefs: [
        { targets: 'no-sort', orderable: false }
      ],
      "drawCallback": function( settings ) {
        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
      },
      //bDestroy:       true,
       
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

  $('[data-toggle="tooltip"]').tooltip();
  feather.replace()
}