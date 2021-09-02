 $(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  feather.replace()
  $('#selectSubtitulos').selectpicker();
  $('#idInstitucion').selectpicker();
  $('#idInstitucionM').selectpicker();
  $('#idInstitucionC').selectpicker();
  $('#idInstitucionP').selectpicker();
  $('#selectComunas').selectpicker();
  $('#selectCuota').selectpicker();

  $("#btnExportarTodoExcelC").on('click', function() {
      var loader = document.getElementById("loader");
      loader.removeAttribute('hidden');
      institucion = -1;
      programa = -1;
      estado = -1;

      var urlFinal = window.location.href.replace("listarConvenios", "exportarexcel") + "?institucion=" + institucion + "&programa=" + programa + "&estado=" + estado;
      window.location.href = urlFinal;
      loader.setAttribute('hidden', '');
    });

    $("#btnExportarExcelC").on('click', function() {
    var loader = document.getElementById("loader");
      loader.removeAttribute('hidden');
      institucion = -1;
      programa = -1;
      estado = -1;
      fecha_desde = null;
      fecha_hasta = null;

      var institucionS = document.getElementById('institucionConvenio');
      if (!jQuery.isEmptyObject(institucionS))
        institucion = institucionS.value;
      
      var programaS = document.getElementById('idProgramaConvenio');
      if (!jQuery.isEmptyObject(programaS))
        programa = programaS.value;

      var estadoS = document.getElementById('estadoConvenio');
      if (!jQuery.isEmptyObject(estadoS))
        estado = estadoS.value;

       var fechaDesdeS = document.getElementById('fechaDesde');
      if(!jQuery.isEmptyObject(fechaDesdeS))
        fechaDesde = fechaDesdeS.value;

      var fechaHastaS = document.getElementById('fechaHasta');
      if(!jQuery.isEmptyObject(fechaHastaS))
        fechaHasta = fechaHastaS.value;


      var urlFinal = window.location.href.replace("listarConvenios", "exportarexcel") + "?institucion=" + institucion + "&programa=" + programa + "&estado=" + estado + "&fechaDesde=" + fecha_desde + "&fechaHasta=" + fecha_hasta;
      window.location.href = urlFinal;
      loader.setAttribute('hidden', '');
    });

    $("#btnExportarTodoExcelM").on('click', function() {
      var loader = document.getElementById("loader");
      loader.removeAttribute('hidden');
      institucion = -1;
      programa = -1;

      var urlFinal = window.location.href.replace("listarMarcos", "exportarexcelMarco") + "?institucion=" + institucion + "&programa=" + programa;
      window.location.href = urlFinal;
      loader.setAttribute('hidden', '');
    });

    $("#btnExportarExcelM").on('click', function() {
    var loader = document.getElementById("loader");
      loader.removeAttribute('hidden');
      institucion = -1;
      programa = -1;

      var institucionS = document.getElementById('institucionMarco');
      if (!jQuery.isEmptyObject(institucionS))
        institucion = institucionS.value;
      
      var programaS = document.getElementById('idProgramaMarco');
      if (!jQuery.isEmptyObject(programaS))
        programa = programaS.value;

      var urlFinal = window.location.href.replace("listarMarcos", "exportarexcelMarco") + "?institucion=" + institucion + "&programa=" + programa;
      window.location.href = urlFinal;
      loader.setAttribute('hidden', '');
    });

    $("#btnExportarTodoExcelP").on('click', function() {
      var loader = document.getElementById("loader");
      loader.removeAttribute('hidden');

      var urlFinal = window.location.href.replace("listarPresupuestos", "exportarexcelPresupuesto");
      window.location.href = urlFinal;
      loader.setAttribute('hidden', '');
    });

  $('#idInstitucionM').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    var subtitulo = document.getElementById('idPresupuesto').dataset.subtitulo;
    var idInstitucion = $(e.currentTarget).val();
    var baseurl = window.origin + '/Programa/listarComunasHospitalesMarco';
    if (subtitulo != null && subtitulo != "" && idInstitucion != null && idInstitucion != "") {

      //document.getElementById('programa_presupuesto').textContent = '';
      var inputPresupuesto = document.getElementById('idPresupuesto');
      //var monto_restante = document.getElementById('monto_restante');
      //var monto = parseInt(inputPresupuesto.dataset.restante);

      //monto_restante.dataset.montoRestante = monto;
      //monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto);
      mensaje = "";
      
      document.getElementById('mensajeError').textContent = mensaje;
      
      //monto_restante.classList.remove('text-danger');
      //monto_restante.classList.add('text-success');

      jQuery.ajax({
      type: "POST",
      url: baseurl,
      dataType: 'json',
      data: {institucion: idInstitucion, subtitulo: subtitulo},
      success: function(data) {
        if (data) {

          //var monto_restante = $(e.currentTarget).data('restante');
          //document.getElementById('monto_restante').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante);
          //document.getElementById('monto_restante').dataset.montoRestante = monto_restante;
          //inputPresupuesto.dataset.restante = monto_restante;


          if (data['hospitales'] != null && data['hospitales'].length > 0) {
            $('#divComunasHospitales').html('');
            document.getElementById('cantidad').textContent = data['hospitales'].length;
            var primero = true;
            var row = '';
            for (var i=0; i < data["hospitales"].length; i++) {
              row = row.concat('\n<div class="form-group col-sm-6">');
              row = row.concat('\n<input class="form-control form-control-sm" type="text" placeholder="',data['hospitales'][i]['nombre'],'" readonly disabled>');  
              row = row.concat('\n</div>');
              row = row.concat('\n<div class="form-group col-sm-6">');
              row = row.concat('\n<input type="number" class="form-control form-control-sm marcos_institucion" data-id="',data['hospitales'][i]['id_hospital'],'" id="inputMarco',i,'" minlength="1" placeholder="Ingrese un Marco para ',data['hospitales'][i]['nombre'],'" name="inputMarco',i,'" />');
              row = row.concat('\n<input type="text" class="form-control" id="inputHospital',i,'" name="inputHospital',i,'" value="',data['hospitales'][i]['id_hospital'],'" hidden>');
              row = row.concat('\n</div>');
            }
            var div = document.getElementById('divComunasHospitales');
            div.innerHTML = row;
          }else
          {
            if (data['comunas'] != null && data['comunas'].length > 0) {
              $('#divComunasHospitales').html('');
              document.getElementById('cantidad').textContent = data['comunas'].length;
              var primero = true;
              var row = '';
              for (var i=0; i < data["comunas"].length; i++) {
                row = row.concat('\n<div class="form-group col-sm-6">');
                row = row.concat('\n<input class="form-control form-control-sm" type="text" placeholder="',data['comunas'][i]['nombre'],'" readonly disabled>');  
                row = row.concat('\n</div>');
                row = row.concat('\n<div class="form-group col-sm-6">');
                row = row.concat('\n<input type="number" class="form-control form-control-sm marcos_institucion" data-id="',data['comunas'][i]['id_comunas'],'" id="inputMarco',i,'" minlength="1" placeholder="Ingrese un Marco para ',data['comunas'][i]['nombre'],'" name="inputMarco',i,'" />');
                row = row.concat('\n<input type="text" class="form-control" id="inputComuna',i,'" name="inputComuna',i,'" value="',data['comunas'][i]['id_comunas'],'" hidden>');
                row = row.concat('\n</div>');
              }
              var div = document.getElementById('divComunasHospitales');
              div.innerHTML = row;
            }
          }
        }
        
      }
      });

    }
    loader.setAttribute('hidden', '');
  });

  $('#idInstitucionC').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    /*var idMarco = $(e.currentTarget).data('id');
    var nombrePrograma = $(e.currentTarget).data('programa');
    var monto_restante = $(e.currentTarget).data('restante');
    var codigo_cuenta = $(e.currentTarget).data('codigo_cuenta');
    var nombre_cuenta = $(e.currentTarget).data('nombre_cuenta');
    var institucion = $(e.currentTarget).data('institucion');
    var id_institucion = $(e.currentTarget).data('id_institucion');*/

    document.getElementById('programa_presupuesto').textContent = '';
    document.getElementById('monto_restante').textContent = '';
    document.getElementById('cuenta_presupuesto').textContent = '';
    document.getElementById('monto_restante').dataset.montoRestante = '';
    document.getElementById('lInstitucion').textContent = '';

    //$('select[name=idInstitucionC]').val(id_institucion);
    //$('.selectpicker').selectpicker('refresh');


    //var presupuesto = $(e.currentTarget).data('restante');
    $('#idMarco').val('');
    $('#inputMarco').val('');
    var inputMarco = document.getElementById('idMarco');
    inputMarco.dataset.restante = '';

    $('#modalBuscarMarco').modal('hide');

    /*var idInstitucion = $(e.currentTarget).val();
    var baseurl = window.origin + '/Programa/listarMarcosUsuario';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {institucion: idInstitucion},
    success: function(data) {
      if (data) {

        var table = $('#tListaProgramas').DataTable();
        table.destroy();
        
        $("#listaSeleccionMarco").empty();
        var row = '';
        row = row.concat('\n<table id="tListaProgramas" class="table table-sm table-hover table-bordered">',
        '\n<thead class="thead-dark">',
          '\n<tr>',
            '\n<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Institucion</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Programa</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Subtitulo</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Dependencia</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Marco</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Monto Restante</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro"></th>',
          '\n</tr>',
        '\n</thead>',
        '\n<tbody id="tbodyPrograma">');

        for (var i = 0; i < data.marcos.length; i++){
                row = row.concat('\n<tr>');
                  row = row.concat('\n<th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['id_marco'],'</th>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['institucion'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['programa'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['codigo_cuenta'], ' ',data.marcos[i]['cuenta'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['clasificacion'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.marcos[i]['marco']),'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.marcos[i]['dif_rest']),'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro botonTabla paginate_button">');
                  row = row.concat('\n<button href="#" aria-controls="tListaMarcos" data-id="',data.marcos[i]['id_marco'],'" data-nombre="$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.marcos[i]['dif_rest']),' restantes de ',data.marcos[i]['programa'],'" data-restante="',data.marcos[i]['dif_rest'],'" tabindex="0" class="btn btn-outline-dark seleccionMarco">Seleccionar</button>');
                  row = row.concat('\n</td>');
                row = row.concat('\n</tr>');
        }
        row = row.concat('\n</tbody>');
        row = row.concat('\n</table>');
        $('#listaSeleccionMarco').html(row);
        $('#inputMarco').val('');
        $("#selectComunas").empty();
        var options = '';
        for (var i = 0; i < data.comunas.length; i++) {
          options = options.concat('\n<option value="',data.comunas[i]["id_comuna"],'">',data.comunas[i]["nombre"], '</option>');
        }
        $("#selectComunas").append(options);
        $('#selectComunas').selectpicker();
        $('#selectComunas').selectpicker('refresh');


        $('#tListaProgramas').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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
      }
      
    }
    });
*/
  });

  $('#tListaProgramas').dataTable({
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
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

 $('#idInstitucionP').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    obtenerFiltrosTransferencias(1);
  });

 $('#idInstitucionP').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    obtenerFiltrosTransferencias(2);
  });

 $("#institucionMarco").change(function() {
    var loader = document.getElementById("loader");
    var table = $('#tListaMarcos').DataTable();
    table.destroy();
    $('#tListaMarcos').dataTable({
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
            "serverSide": true,
             "ajax": 
             {
               "url":  window.origin + '/Programa/json_listarMarcos',
               "type": 'POST',
               "data": {
                        "idInstitucion": document.getElementById('institucionMarco').value,
                        "idPrograma" : $("#idProgramaMarco").val(),
                       }
             },
             searching: true,
             paging:         true,
             ordering:       false,
             info:           true,
             //"order": [[ 16, "desc" ]],
             /*columnDefs: [
               { targets: 'no-sort', orderable: false }
             ],*/
             //bDestroy:       true,
            //"type": 'POST',
            "aoColumnDefs" :  [
                                {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                              ],

             "oLanguage": {
              /*"sProcessing":     function(){
              let timerInterval

              },*/
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
              lengthMenu: [[10, 20], [10, 20]]
           });

  });

 $("#institucionConvenio").change(function() {
    listarConvenios();
  });

 $("#institucionAC").change(function() {
    var loader = document.getElementById("loader");
    var institucion = document.getElementById('institucionAC');
    if (jQuery.isEmptyObject(institucion))
      institucion = null;
    else
      institucion = institucion.value;

    var fecha_resolucion = document.getElementById('fechaResolucionAC');
     if (jQuery.isEmptyObject(fecha_resolucion))
      fecha_resolucion = null;
    else
      fecha_resolucion = fecha_resolucion.value;

    var table = $('#tListaConveniosPendientes').DataTable();
    table.destroy();
    
    $('#tListaConveniosPendientes').dataTable({
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
      "serverSide": true,
       "ajax": 
       {
         "url":  window.origin + '/Programa/json_listarConvenios',
         "type": 'POST',
         "data": {
                  "idInstitucion": institucion,//document.getElementById('institucionMarco').value,
                  "idPrograma" : document.getElementById('idProgramaAC').value,
                  "fechaResolucion" : fecha_resolucion,
                  "idEstado": 3
                 }
       },
       searching: true,
       paging:         true,
       ordering:       false,
       info:           true,
       //"order": [[ 16, "desc" ]],
       /*columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],*/
       //bDestroy:       true,
      //"type": 'POST',
      "aoColumnDefs" :  [
                          {"aTargets" : [0,1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                          {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                          {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],

      "oLanguage": {
        /*"sProcessing":     function(){
        let timerInterval

        },*/
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
      lengthMenu: [[10, 20], [10, 20]]
    });
  });

 $("#fechaResolucionAC").change(function() {
    var loader = document.getElementById("loader");
    var institucion = document.getElementById('institucionAC');
    if (jQuery.isEmptyObject(institucion))
      institucion = null;
    else
      institucion = institucion.value;

    var fecha_resolucion = document.getElementById('fechaResolucionAC');
     if (jQuery.isEmptyObject(fecha_resolucion))
      fecha_resolucion = null;
    else
      fecha_resolucion = fecha_resolucion.value;

    var table = $('#tListaConveniosPendientes').DataTable();
    table.destroy();
    
    $('#tListaConveniosPendientes').dataTable({
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
      "serverSide": true,
       "ajax": 
       {
         "url":  window.origin + '/Programa/json_listarConvenios',
         "type": 'POST',
         "data": {
                  "idInstitucion": institucion,//document.getElementById('institucionMarco').value,
                  "idPrograma" : document.getElementById('idProgramaAC').value,
                  "fechaResolucion" : fecha_resolucion,
                  "idEstado": 3
                 }
       },
       searching: true,
       paging:         true,
       ordering:       false,
       info:           true,
       //"order": [[ 16, "desc" ]],
       /*columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],*/
       //bDestroy:       true,
      //"type": 'POST',
      "aoColumnDefs" :  [
                          {"aTargets" : [0,1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                          {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                          {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],

      "oLanguage": {
        /*"sProcessing":     function(){
        let timerInterval

        },*/
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
      lengthMenu: [[10, 20], [10, 20]]
    });
  });

$("#fechaDesde").change(function() {
  listarConvenios();
});

$("#fechaHasta").change(function() {
  listarConvenios();
});

  $("#estadoConvenio").change(function() {
    listarConvenios();
  }); 

 $('#listaSeleccionProgramaP').on('click', '.seleccionPrograma', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPrograma = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('nombre');
     $('#inputProgramaP').val(nombrePrograma);
     $('#idProgramaP').val(idPrograma);
     $('#modalBuscarPrograma').modal('hide');
     obtenerFiltrosTransferencias(3);
  });

 $('#listaSeleccionProgramaMarco').on('click', '.seleccionProgramaMarco', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPrograma = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('nombre');
     $('#inputProgramaMarco').val(nombrePrograma);
     $('#idProgramaMarco').val(idPrograma);
     $('#modalBuscarProgramaMarco').modal('hide');

     //obtenerFiltrosTransferencias(3);
     //listarMarcos();
    var table = $('#tListaMarcos').DataTable();
    table.destroy();
    $('#tListaMarcos').dataTable({
      "fnDrawCallback": function( oSettings ) {
        feather.replace();
        loader.setAttribute('hidden', '');
        $('[data-toggle="tooltip"]').tooltip();
      },
      "preDrawCallback": function( settings ) {
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        $('[data-toggle="tooltip"]').tooltip();
      },
      "processing": false,
      "serverSide": true,
       "ajax": 
       {
         "url":  window.origin + '/Programa/json_listarMarcos',
         "type": 'POST',
         "data": {
                  "idInstitucion": document.getElementById('institucionMarco').value,
                  "idPrograma" : $("#idProgramaMarco").val(),
                 }
       },
       searching: true,
       paging:         true,
       ordering:       false,
       info:           true,
       //"order": [[ 16, "desc" ]],
       /*columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],*/
       //bDestroy:       true,
      //"type": 'POST',
      "aoColumnDefs" :  [
                          {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                          {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                          {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],

       "oLanguage": {
        /*"sProcessing":     function(){
        let timerInterval

        },*/
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
        lengthMenu: [[10, 20], [10, 20]]
     });


    var btnQuitarPrograma = document.getElementById("btnQuitarProgramaMarco");
    btnQuitarPrograma.removeAttribute('hidden');
    var btnBuscarPrograma = document.getElementById("btnBuscarProgramaMarco");
    btnBuscarPrograma.setAttribute('hidden', '');

  });

  $('#listaSeleccionProgramaAC').on('click', '.seleccionProgramaAC', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPrograma = $(e.currentTarget).data('id');

     var nombrePrograma = $(e.currentTarget).data('nombre');
     $('#inputProgramaAC').val(nombrePrograma);
     $('#idProgramaAC').val(idPrograma);
     $('#modalBuscarProgramaAC').modal('hide');

     var institucion = document.getElementById('institucionAC');
        if (jQuery.isEmptyObject(institucion))
          institucion = null;
        else
          institucion = institucion.value;

     var fecha_resolucion = document.getElementById('fechaResolucionAC');
     if (jQuery.isEmptyObject(fecha_resolucion))
      fecha_resolucion = null;
    else
      fecha_resolucion = fecha_resolucion.value;

     //obtenerFiltrosTransferencias(3);
     //listarMarcos();
    var table = $('#tListaConveniosPendientes').DataTable();
    table.destroy();
    
    $('#tListaConveniosPendientes').dataTable({
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
      "serverSide": true,
       "ajax": 
       {
         "url":  window.origin + '/Programa/json_listarConvenios',
         "type": 'POST',
         "data": {
                  "idInstitucion": institucion,//document.getElementById('institucionMarco').value,
                  "idPrograma" : idPrograma,
                  "fechaResolucion" : fecha_resolucion,
                  "idEstado": 3
                 }
       },
       searching: true,
       paging:         true,
       ordering:       false,
       info:           true,
       //"order": [[ 16, "desc" ]],
       /*columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],*/
       //bDestroy:       true,
      //"type": 'POST',
      "aoColumnDefs" :  [
                          {"aTargets" : [0,1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                          {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                          {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],

      "oLanguage": {
        /*"sProcessing":     function(){
        let timerInterval

        },*/
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
      lengthMenu: [[10, 20], [10, 20]]
    });


    var btnQuitarPrograma = document.getElementById("btnQuitarProgramaAC");
    btnQuitarPrograma.removeAttribute('hidden');
    var btnBuscarPrograma = document.getElementById("btnBuscarProgramaAC");
    btnBuscarPrograma.setAttribute('hidden', '');

  });

 /*$('#listaSeleccionProgramaMarco').on('click', '.seleccionProgramaMarco', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPrograma = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('nombre');
     $('#inputProgramaMarco').val(nombrePrograma);
     $('#idProgramaMarco').val(idPrograma);
     $('#modalBuscarProgramaMarco').modal('hide');

     //obtenerFiltrosTransferencias(3);
     listarMarcos();

    var btnQuitarPrograma = document.getElementById("btnQuitarProgramaMarco");
    btnQuitarPrograma.removeAttribute('hidden');
    var btnBuscarPrograma = document.getElementById("btnBuscarProgramaMarco");
    btnBuscarPrograma.setAttribute('hidden', '');

  });*/

 $('#listaSeleccionProgramaConvenio').on('click', '.seleccionProgramaConvenio', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPrograma = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('nombre');
     $('#inputProgramaConvenio').val(nombrePrograma);
     $('#idProgramaConvenio').val(idPrograma);
     $('#modalBuscarProgramaConvenio').modal('hide');

     //obtenerFiltrosTransferencias(3);
     //listarConvenios();
    listarConvenios();

    var btnQuitarPrograma = document.getElementById("btnQuitarProgramaConvenio");
    btnQuitarPrograma.removeAttribute('hidden');
    var btnBuscarPrograma = document.getElementById("btnBuscarProgramaConvenio");
    btnBuscarPrograma.setAttribute('hidden', '');

  });

  $('#btnQuitarProgramaConvenio').on('click', function(e) {

    $('#inputProgramaConvenio').val("");
    $('#idProgramaConvenio').val("");
    $('#modalBuscarProgramaConvenio').modal('hide');

     //obtenerFiltrosTransferencias(3);
    //listarConvenios();
    listarConvenios();

    var btnQuitarPrograma = document.getElementById("btnQuitarProgramaConvenio");
    btnQuitarPrograma.setAttribute('hidden', '');
    var btnBuscarPrograma = document.getElementById("btnBuscarProgramaConvenio");
    btnBuscarPrograma.removeAttribute('hidden');

  }); 

  $('#btnQuitarProgramaMarco').on('click', function(e) {

    $('#inputProgramaMarco').val("");
    $('#idProgramaMarco').val("");
    $('#modalBuscarProgramaMarco').modal('hide');

     //obtenerFiltrosTransferencias(3);
    //listarMarcos();
    var table = $('#tListaMarcos').DataTable();
    table.destroy();
    $('#tListaMarcos').dataTable({
      "fnDrawCallback": function( oSettings ) {
        feather.replace();
        loader.setAttribute('hidden', '');
        $('[data-toggle="tooltip"]').tooltip();
      },
      "preDrawCallback": function( settings ) {
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
        $('[data-toggle="tooltip"]').tooltip();
      },
      "processing": false,
      "serverSide": true,
       "ajax": 
       {
         "url":  window.origin + '/Programa/json_listarMarcos',
         "type": 'POST',
         "data": {
                  "idInstitucion": document.getElementById('institucionMarco').value,
                  "idPrograma" : $("#idProgramaMarco").val(),
                 }
       },
       searching: true,
       paging:         true,
       ordering:       true,
       info:           true,
       //"order": [[ 16, "desc" ]],
       columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],
       //bDestroy:       true,
      //"type": 'POST',
      "aoColumnDefs" :  [
                          {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                          {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                          {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],

       "oLanguage": {
        /*"sProcessing":     function(){
        let timerInterval

        },*/
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
        lengthMenu: [[10, 20], [10, 20]]
     });

    var btnQuitarPrograma = document.getElementById("btnQuitarProgramaMarco");
    btnQuitarPrograma.setAttribute('hidden', '');
    var btnBuscarPrograma = document.getElementById("btnBuscarProgramaMarco");
    btnBuscarPrograma.removeAttribute('hidden');
    feather.replace();
  });

  $('#btnQuitarProgramaAC').on('click', function(e) {

    $('#inputProgramaAC').val("");
    $('#idProgramaAC').val("");
    $('#modalBuscarProgramaAC').modal('hide');

    var institucion = document.getElementById('institucionAC');
      if (jQuery.isEmptyObject(institucion))
        institucion = null;
      else
        institucion = institucion.value;

    var fecha_resolucion = document.getElementById('fechaResolucionAC');
     if (jQuery.isEmptyObject(fecha_resolucion))
      fecha_resolucion = null;
    else
      fecha_resolucion = fecha_resolucion.value;


    var table = $('#tListaConveniosPendientes').DataTable();
    table.destroy();
    $('#tListaConveniosPendientes').dataTable({
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
    "serverSide": true,
     "ajax": 
     {
       "url":  window.origin + '/Programa/json_listarConvenios',
       "type": 'POST',
       "data": {
                "idInstitucion": institucion,
                "idPrograma" : document.getElementById('idProgramaAC').value,
                "fechaResolucion" : fecha_resolucion,
                "idEstado": 3
               }
     },
     searching: true,
     paging:         true,
     ordering:       false,
     info:           true,
     //"order": [[ 16, "desc" ]],
     /*columnDefs: [
       { targets: 'no-sort', orderable: false }
     ],*/
     //bDestroy:       true,
    //"type": 'POST',
    "aoColumnDefs" :  [
                        {"aTargets" : [0,1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                        {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                        {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                      ],

     "oLanguage": {
      /*"sProcessing":     function(){
      let timerInterval

      },*/
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
      lengthMenu: [[10, 20], [10, 20]]
    });

    var btnQuitarPrograma = document.getElementById("btnQuitarProgramaAC");
    btnQuitarPrograma.setAttribute('hidden', '');
    var btnBuscarPrograma = document.getElementById("btnBuscarProgramaAC");
    btnBuscarPrograma.removeAttribute('hidden');
    feather.replace();
  });

 /*$('#listaSeleccionConvenioP').on('click', '.seleccionConvenio', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPrograma = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('nombre');
     $('#inputConvenioP').val(nombrePrograma);
     $('#idConvenioP').val(idPrograma);
     $('#modalBuscarConvenio').modal('hide');
     obtenerFiltrosTransferencias(4);
  });*/



 function obtenerFiltrosTransferencias(origen)
 {
    var idInstitucion = document.getElementById('idInstitucionP').value;
    var idComuna = document.getElementById('selectComunasP').value;
    var idPrograma = document.getElementById('idProgramaP').value;
    var idConvenio = document.getElementById('idConvenioP').value;

    var baseurl = window.origin + '/Programa/obtenerFiltrosTransferencias';
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {institucion: idInstitucion, idComuna: idComuna, idPrograma: idPrograma},
    success: function(data) {
      if (data) {

        var table = $('#tListaProgramas').DataTable();
        table.destroy();
        
        $("#listaSeleccionMarco").empty();
        var row = '';
        row = row.concat('\n<table id="tListaProgramas" class="table table-sm table-hover table-bordered">',
        '\n<thead class="thead-dark">',
          '\n<tr>',
            '\n<th scope="col" class="texto-pequenio text-center align-middle registro"># ID</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Institucion</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Programa</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Subtitulo</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Dependencia</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Marco</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro">Monto Restante</th>',
              '\n<th scope="col" class="texto-pequenio text-center align-middle registro"></th>',
          '\n</tr>',
        '\n</thead>',
        '\n<tbody id="tbodyPrograma">');

        for (var i = 0; i < data.marcos.length; i++){
                row = row.concat('\n<tr>');
                  row = row.concat('\n<th scope="row" class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['id_marco'],'</th>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['institucion'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['programa'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['codigo_cuenta'], ' ',data.marcos[i]['cuenta'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">',data.marcos[i]['clasificacion'],'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.marcos[i]['marco']),'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro"><p class="texto-pequenio">$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.marcos[i]['dif_rest']),'</p></td>');
                  row = row.concat('\n<td class="text-center align-middle registro botonTabla paginate_button">');
                  row = row.concat('\n<button href="#" aria-controls="tListaMarcos" data-id="',data.marcos[i]['id_marco'],'" data-nombre="$ ',Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(data.marcos[i]['dif_rest']),' restantes de ',data.marcos[i]['programa'],'" data-restante="',data.marcos[i]['dif_rest'],'" tabindex="0" class="btn btn-outline-dark seleccionMarco">Seleccionar</button>');
                  row = row.concat('\n</td>');
                row = row.concat('\n</tr>');
        }
        row = row.concat('\n</tbody>');
        row = row.concat('\n</table>');
        $('#listaSeleccionMarco').html(row);

        $("#selectComunas").empty();
        var options = '';
        for (var i = 0; i < data.comunas.length; i++) {
          options = options.concat('\n<option value="',data.comunas[i]["id_comuna"],'">',data.comunas[i]["nombre"], '</option>');
        }
        $("#selectComunas").append(options);
        $('#selectComunas').selectpicker();
        $('#selectComunas').selectpicker('refresh');


        $('#tListaProgramas').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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
      }
      
    }
    });
 }


  $('#archivoMarco').on('change',function(){
      //get the file name
      var fileName = $(this).val();
      //replace the "Choose a file" label
      $(this).next('.custom-file-label').html(fileName);
      if (fileName.trim().length == 0)
        $(this).next('.custom-file-label').html('Seleccionar un Archivo...');

  });

  $('#archivoMarcoModificar').on('change',function(){
      //get the file name
      var fileName = $(this).val();
      //replace the "Choose a file" label
      var label = document.getElementById('lArchivoMarco');
      label.textContent = fileName;
      //$(this).next('.custom-file-label').html(fileName);
      if (fileName.trim().length == 0)
         label.textContent = 'Seleccionar un Archivo...';
        //$(this).next('.custom-file-label').html('Seleccionar un Archivo...');

  });

  $('#archivoMarcoAsignar').on('change',function(){
      //get the file name
      var fileName = $(this).val();
      //replace the "Choose a file" label
      var label = document.getElementById('lArchivoMarco');
      label.textContent = fileName;
      //$(this).next('.custom-file-label').html(fileName);
      if (fileName.trim().length == 0)
         label.textContent = 'Seleccionar un Archivo...';
        //$(this).next('.custom-file-label').html('Seleccionar un Archivo...');

  });
  

   $('.marcos_instituciones').on('change',function(){
      //get the file name
      var marco = $(this).val();
      //replace the "Choose a file" label
      var monto_restante = document.getElementById('monto_restante_marco');

      var monto_restante_presupuesto = document.getElementById('monto_restante');

      var moto_base_marco = document.getElementById('inputPresupuestoInstitucionMarco').value;

      var marcos = document.getElementsByClassName('marcos_instituciones');
      var suma = 0;
      var monto_presupuesto_marco = document.getElementById('inputPresupuestoInstitucionMarco').value;
      var monto_actual = monto_restante_presupuesto.dataset.montoRestanteActual;

      var monto_presupuesto = parseInt(monto_restante_presupuesto.dataset.montoRestante);
      var montoMarco = parseInt(monto_restante_presupuesto.dataset.montoMarco);

       if (isNaN(monto_presupuesto) || monto_presupuesto == "")
        monto_presupuesto = 0;

       if (isNaN(montoMarco) || montoMarco == "")
        montoMarco = 0;

      //alert(monto_presupuesto);
      //alert(montoMarco);

      if (isNaN(monto_presupuesto_marco) || monto_presupuesto_marco == "")
        monto_presupuesto_marco = 0;

      var monto_marco = parseInt(monto_presupuesto_marco);//parseInt(monto_restante.dataset.montoMarco);
      var monto_restante_marco = parseInt(monto_restante.dataset.montoRestante);
      //var restante = (monto_marco + monto_restante_marco);

      var diferencia = 0;

      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      if (parseInt(monto_presupuesto_marco) < suma)
      {
        monto_restante_marco = suma;
        monto_restante.dataset.montoRestante = suma;
        document.getElementById('inputPresupuestoInstitucionMarco').value = suma;
      }else{
        var diferencia = (monto_presupuesto_marco - suma);
      }


      var diferencia_marco = 0;
      var se_resta = false;
      var diferencia_presupuesto = 0;

      if (montoMarco < suma){
        se_resta = true;
        diferencia_marco = (suma-montoMarco);
        diferencia_presupuesto = (monto_presupuesto - diferencia_marco);
      }else{
        diferencia_marco = (montoMarco-suma);
        //diferencia_presupuesto = (monto_presupuesto - diferencia_marco);
        if (monto_marco < suma) {
          diferencia_marco = (suma-montoMarco);
          diferencia_presupuesto = (monto_presupuesto-diferencia_marco);  
        }else{
          //diferencia_presupuesto = monto_presupuesto;
          diferencia_presupuesto = monto_actual;
        }
        
      }

      if(diferencia_presupuesto < 0)
      {
        mensaje = "El presupuesto institución no puede ser mayor al presupuesto restante.";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante_presupuesto.classList.remove('text-success');
        monto_restante_presupuesto.classList.add('text-danger');
        monto_restante_presupuesto.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia_presupuesto);
      }
      else{
        mensaje = "";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante_presupuesto.classList.remove('text-danger');
        monto_restante_presupuesto.classList.add('text-success');
        monto_restante_presupuesto.classList.add('text-success');
        monto_restante_presupuesto.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia_presupuesto);
      }

      
      if(diferencia < 0)
      {
        mensaje = "EXCEDE MONTO DEL MARCO PRESUPUESTARIO.";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }
      else{
        mensaje = "";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }

      var mensaje = "";
      if(diferencia < 0)
      {
        /*mensaje = "Excede el presupuesto Institución.";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);*/
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(0);
        document.getElementById('inputPresupuestoInstitucionMarco').value = suma;
      }
      else{
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }

      if (suma == 0) {
        var monto_base = document.getElementById('monto_restante').dataset.montoMarco;
        document.getElementById('inputPresupuestoInstitucionMarco').value = monto_base;
        document.getElementById('monto_restante_marco').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_base);
        monto_restante.dataset.montoRestante = monto_base;

        monto_restante_presupuesto.dataset.montoRestanteActual = monto_restante_presupuesto.dataset.montoRestante;
        monto_restante_presupuesto.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante_presupuesto.dataset.montoRestante);
      }
      var suma_marcos = parseInt(monto_restante_presupuesto.dataset.sumaMarcos);
      
      if(suma == suma_marcos){
        document.getElementById('inputPresupuestoInstitucionMarco').textContent = monto_restante_presupuesto.dataset.montoMarco;
        monto_restante_presupuesto.dataset.montoRestanteActual = (parseInt(monto_restante_presupuesto.dataset.montoRestante));
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format((parseInt(monto_restante_presupuesto.dataset.montoMarco) - parseInt(suma_marcos)));
        monto_restante.dataset.montoRestante = (parseInt(monto_restante_presupuesto.dataset.montoMarco) - parseInt(suma_marcos));
        document.getElementById('inputPresupuestoInstitucionMarco').value = monto_restante_presupuesto.dataset.montoMarco;
      }

      if(parseInt(monto_restante_presupuesto.dataset.montoMarco) == parseInt(document.getElementById('inputPresupuestoInstitucionMarco').value)){
        mensaje = "";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante_presupuesto.classList.remove('text-danger');
        monto_restante_presupuesto.classList.add('text-success');
        monto_restante_presupuesto.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante_presupuesto.dataset.montoRestante);
      }
      var montoMarco_actual = parseInt(document.getElementById('inputPresupuestoInstitucionMarco').value);

      if (suma < montoMarco_actual) {
        var diff_marc_rest = montoMarco_actual - suma;
        var monto_presu_actualizado = 0;
        monto_presu_actualizado = (parseInt(monto_restante_presupuesto.dataset.montoRestanteActual) + parseInt(diff_marc_rest));
        monto_restante_presupuesto.dataset.montoRestanteActual = monto_presu_actualizado;
        monto_restante_presupuesto.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_presu_actualizado);
        monto_restante.dataset.montoRestante = 0;
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(0);
        document.getElementById('inputPresupuestoInstitucionMarco').value = suma;
        monto_restante.classList.add('text-success');
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;

        if (monto_presu_actualizado < 0) {
          mensaje = "EXCEDE MONTO DEL MARCO PRESUPUESTARIO.";
          document.getElementById('mensajeError').textContent = mensaje;
          monto_restante.classList.remove('text-success');
          monto_restante.classList.add('text-danger');
        }else{
          mensaje = "";
          document.getElementById('mensajeError').textContent = mensaje;
          monto_restante.classList.remove('text-danger');
          monto_restante.classList.add('text-success');
        }

      }

      //alert(mensaje + '  Suma: ' + suma + '   Disponible: ' + monto_restante_marco + '   Monto Marco: ' + monto_marco + '   Diferencia:  ' + diferencia);
  });

 //$('.marcos_instituciones').on('change',function(){
$('#divComunasHospitalesD').on('change', '.marcos_institucion', function(e) {
      var marco = $(this).val();
      var monto_restante = document.getElementById('monto_restante');


      var marcos = document.getElementsByClassName('marcos_institucion');
      var suma = 0;

      var montoMarco = monto_restante.dataset.montoMarco;

      if (isNaN(montoMarco) || montoMarco == "")
        montoMarco = 0;

      var monto_marco = parseInt(montoMarco);
      var monto_restante_marco = parseInt(monto_restante.dataset.montoRestante);
      
      var diferencia = 0;

      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      diferencia = (montoMarco-suma);

      if(diferencia < 0)
      {
        mensaje = "Los convenios asignados no pueden ser mayor al marco restante.";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }
      else{
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }


      //alert(mensaje + '  Suma: ' + suma + '   Disponible: ' + monto_restante_marco + '   Monto Marco: ' + monto_marco + '   Diferencia:  ' + diferencia);
  });

  $('#inputConvenio').on('change',function(){
      //get the file name
      var convenio = $(this).val();
      //replace the "Choose a file" label
      var monto_restante = document.getElementById('monto_restante');
      //var marcos = document.getElementsByClassName('marcos_instituciones');
      //var suma = 0;

      //var monto_convenio = parseInt(monto_restante.dataset.montoMarco);
      var monto_restante_marco = parseInt(monto_restante.dataset.montoRestante);

      var diferencia = (monto_restante_marco - convenio);
      //var diferencia = (restante - suma);

      var mensaje = "";
      if(diferencia < 0)
      {
        mensaje = "EXCEDE MONTO DEL MARCO PRESUPUESTARIO.";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }
      else{
        mensaje = "";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }


      //alert(mensaje + '  Suma: ' + suma + '   Disponible: ' + monto_restante_marco + '   Monto Marco: ' + monto_marco + '   Diferencia:  ' + diferencia);
  });

  $('#divComunasHospitales').on('change', '.marcos_institucion', function(e) {
  //$('.marcos_institucion').on('change',function(){
      //get the file name
      var marco = $(this).val();
      //replace the "Choose a file" label
      var monto_restante = document.getElementById('monto_restante_marco');
      var marcos = document.getElementsByClassName('marcos_institucion');
      var suma = 0;
      var monto_presupuesto_marco = document.getElementById('inputPresupuestoInstitucion').value;

       if (isNaN(monto_presupuesto_marco) || monto_presupuesto_marco == "")
        monto_presupuesto_marco = 0;

      //var monto_marco = parseInt(monto_restante.dataset.montoMarco);
      var monto_restante_marco = parseInt(monto_restante.dataset.montoRestante);

      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      var diferencia = 0;

      
      if (monto_presupuesto_marco < suma)
      {
        monto_restante_marco = suma;
        monto_restante.dataset.montoRestante = suma;
        document.getElementById('inputPresupuestoInstitucion').value = suma;
      }else{
        var diferencia = (monto_presupuesto_marco - suma);
      }

      var mensaje = "";
      if(diferencia < 0)
      {
        /*mensaje = "Excede el presupuesto Institución.";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);*/
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(0);
        document.getElementById('inputPresupuestoInstitucion').value = suma;


      }
      else{
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }


      //alert(mensaje + '  Suma: ' + suma + '   Disponible: ' + monto_restante_marco + '   Monto Marco: ' + monto_marco + '   Diferencia:  ' + diferencia);
  });

  $('#divPresupuestoInstitucion').on('change', '#inputPresupuestoInstitucion', function(e) {
      var marco = $(this).val();
      var monto_restante_marco = document.getElementById('monto_restante_marco');
      var monto_restante = document.getElementById('monto_restante');
      
      var marcos = document.getElementsByClassName('marcos_institucion');
      var suma = 0;

      var monto_rest_marco = parseInt(monto_restante_marco.dataset.montoRestante);
      var monto_restante_marc = parseInt(monto_restante.dataset.montoRestante);

      if (isNaN(marco) || marco == "")
        marco = 0;

      if (isNaN(monto_rest_marco))
        monto_rest_marco = 0;

      if (isNaN(monto_restante_marc))
        monto_restante_marc = 0;
      
      //var monto_marco = parseInt(monto_restante.dataset.montoMarco);      
      //var restante = (monto_marco + monto_restante_marco);


      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      var valor_marco = parseInt(marco);

      var diferencia = (monto_restante_marc - valor_marco);
      var diferencia_marco = (valor_marco - suma);

      var mensaje = "";
      if(diferencia < 0)
      {
        mensaje = "El presupuesto institución no puede ser mayor al presupuesto restante.";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }
      else{
        mensaje = "";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante.classList.remove('text-danger');
        monto_restante.classList.add('text-success');
        monto_restante.classList.add('text-success');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }

      if(diferencia_marco < 0)
      {
        mensaje = "El presupuesto de institución no puede ser menor a la suma de marcos asignados.";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante_marco.classList.remove('text-success');
        monto_restante_marco.classList.add('text-danger');
        monto_restante_marco.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia_marco);
      }
      else{
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante_marco.classList.remove('text-danger');
        monto_restante_marco.classList.add('text-success');
        monto_restante_marco.classList.add('text-success');
        monto_restante_marco.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia_marco);
      }


      //alert(mensaje + '  Suma: ' + suma + '   Disponible: ' + monto_restante_marco + '   Monto Marco: ' + monto_marco + '   Diferencia:  ' + diferencia);
  });

   $('#divPresupuestoInstitucion').on('change', '#inputPresupuestoInstitucionMarco', function(e) {
      var marco = $(this).val();
      var monto_restante_marco = document.getElementById('monto_restante_marco');
      var monto_restante = document.getElementById('monto_restante');
      
      var marcos = document.getElementsByClassName('marcos_instituciones');
      var suma = 0;

      var monto_rest_marco = parseInt(monto_restante_marco.dataset.montoRestante);
      var monto_restante_marc = parseInt(monto_restante.dataset.montoRestante);
      var monto_marco_base = parseInt(monto_restante.dataset.montoMarco);

      if (isNaN(marco) || marco == "")
        marco = 0;

      if (isNaN(monto_rest_marco))
        monto_rest_marco = 0;

      if (isNaN(monto_restante_marc))
        monto_restante_marc = 0;
      
      //var monto_marco = parseInt(monto_restante.dataset.montoMarco);      
      //var restante = (monto_marco + monto_restante_marco);


      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      var valor_marco = parseInt(marco);

      var monto_actual = monto_restante.dataset.montoRestanteActual;

      //var diferencia = (monto_restante_marc - valor_marco);
      var diferencia = 0;
      if (monto_actual < monto_rest_marco) {
        diferencia = ((monto_actual + monto_rest_marco) - valor_marco);
      }else{
        diferencia = (monto_actual - valor_marco);
      }
      
      var diferencia_marco = (valor_marco - suma);

      var mensaje = "";

      if (monto_rest_marco > marco) {
          //monto_restante.dataset.montoRestante  = monto_rest_marco -  marco;
          var monto_restante_recalculado = monto_rest_marco -  marco;
          monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante_recalculado);
          monto_restante.dataset.montoRestanteActual = monto_restante_recalculado;
      }else{
          var monto_restante_recalculado = 0;
          var monto_total_presupuesto = 0;
          monto_total_presupuesto = parseInt(monto_restante.dataset.montoRestante) + parseInt(monto_restante.dataset.montoMarco);
          if (monto_total_presupuesto > marco) {
            monto_restante_recalculado = monto_total_presupuesto - marco; 
          }else{
            monto_restante_recalculado = marco - monto_actual;
          }

          /*if (monto_actual > marco) {
            monto_restante_recalculado = monto_actual - marco;  
          }else{
            monto_restante_recalculado = marco - monto_actual;
          }*/

          monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante_recalculado);
          monto_restante.dataset.montoRestanteActual = monto_restante_recalculado;
      }

      if(diferencia < 0)
      {
        mensaje = "El presupuesto institución no puede ser mayor al presupuesto restante.";
        document.getElementById('mensajeError').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
      }
      else{
        if (diferencia < 0) {
          mensaje = "";
          document.getElementById('mensajeError').textContent = mensaje;
          monto_restante.classList.remove('text-danger');
          monto_restante.classList.add('text-success');
          monto_restante.classList.add('text-success');
          monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
        }
      }

      if(diferencia_marco < 0)
      {
        mensaje = "El presupuesto de institución no puede ser menor a la suma de marcos asignados.";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante_marco.classList.remove('text-success');
        monto_restante_marco.classList.add('text-danger');
        monto_restante_marco.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia_marco);
      }
      else{
        mensaje = "";
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante_marco.classList.remove('text-danger');
        monto_restante_marco.classList.add('text-success');
        monto_restante_marco.classList.add('text-success');
        monto_restante_marco.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia_marco);
      }

      if (marco == 0) {
          mensaje = "";
          document.getElementById('mensajeError').textContent = mensaje;
          monto_restante.classList.remove('text-danger');
          monto_restante.classList.add('text-success');
          monto_restante.classList.add('text-success');
        var monto_recalculado = monto_restante.dataset.montoMarco;
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_recalculado);
        monto_restante_marco.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(0);
      }

      if (marco == parseInt(monto_restante.dataset.montoMarco)) {
          mensaje = "";
          document.getElementById('mensajeError').textContent = mensaje;
          monto_restante.classList.remove('text-danger');
          monto_restante.classList.add('text-success');
          monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante.dataset.montoRestante);
      }

      if(marco < parseInt(monto_restante.dataset.montoMarco)) {
           mensaje = "";
          document.getElementById('mensajeError').textContent = mensaje;
          monto_restante.classList.remove('text-danger');
          monto_restante.classList.add('text-success');
          monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(parseInt(monto_restante.dataset.montoMarco) - parseInt(marco));
          monto_restante.dataset.montoRestanteActual = (parseInt(monto_restante.dataset.montoMarco) - parseInt(marco));
      }

      if (parseInt(marco) < parseInt(monto_restante.dataset.montoMarco)) {
          mensaje = "";

          var monto_disponible_presupuesto = 0;
          monto_disponible_presupuesto = parseInt(monto_restante.dataset.montoRestante) + (parseInt(monto_restante.dataset.montoMarco) - parseInt(marco));

          //if (monto_disponible_presupuesto) {}

          document.getElementById('mensajeError').textContent = mensaje;
          monto_restante.classList.remove('text-danger');
          monto_restante.classList.add('text-success');
          monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_disponible_presupuesto);
          monto_restante.dataset.montoRestanteActual = monto_disponible_presupuesto;
      }

      if (parseInt(marco) > parseInt(monto_restante.dataset.montoMarco)) {
          mensaje = "";
          var monto_disponible_presupuesto = 0;

          monto_disponible_presupuesto = parseInt(monto_restante.dataset.montoRestante) + parseInt(monto_restante.dataset.montoMarco);

          if (monto_disponible_presupuesto >= marco) {
            document.getElementById('mensajeError').textContent = mensaje;
            monto_restante.classList.remove('text-danger');
            monto_restante.classList.add('text-success');
            monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_disponible_presupuesto-marco);
            monto_restante.dataset.montoRestanteActual = (monto_disponible_presupuesto-marco);
          }else{
            mensaje = "El presupuesto institución no puede ser mayor al presupuesto restante.";
            document.getElementById('mensajeError').textContent = mensaje;
            monto_restante.classList.remove('text-success');
            monto_restante.classList.add('text-danger');
            monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_disponible_presupuesto-marco);
          }
      }
      
      //if (parseInt(document.getElementById('inputPresupuestoInstitucionMarco')) 

      //alert(mensaje + '  Suma: ' + suma + '   Disponible: ' + monto_restante_marco + '   Monto Marco: ' + monto_marco + '   Diferencia:  ' + diferencia);
  });


  $('#archivoPresupuesto').on('change',function(){
      //get the file name
      var fileName = $(this).val();
      //replace the "Choose a file" label
      $(this).next('.custom-file-label').html(fileName);
      if (fileName.trim().length == 0)
        $(this).next('.custom-file-label').html('Seleccionar un Archivo...');

  });

  $('#archivoConvenio').on('change',function(){
      //get the file name
      var fileName = $(this).val();
      //replace the "Choose a file" label
      $(this).next('.custom-file-label').html(fileName);
      if (fileName.trim().length == 0)
        $(this).next('.custom-file-label').html('Seleccionar un Archivo...');

  });

  $('#divComunasHospitalesD').on('change', '.archivosMarcos', function(e) {
  //$('.archivosMarcos').on('change',function(){
      //get the file name
      var fileName = $(this).val();
      //replace the "Choose a file" label

      $(this).next('.custom-file-label').html(fileName);
      if (fileName.trim().length == 0)
        $(this).next('.custom-file-label').html('Seleccionar un Archivo...');

  });


  $("#agregarMarco").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    ignore: ":hidden:not(.selectpicker)",
    errorPlacement: function( span, element ) {
      if(element[0].className === "selectpicker invalid") {
        element.parent().append(span);
      } else {
        span.insertAfter(element);
      }
    },
    //ignore: ":hidden:not(.selectpicker)",
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
      if(element.className == "selectpicker is-invalid")
      {
        $(element.parentElement.children[1]).addClass('form-control');
        $(element.parentElement.children[1]).addClass('is-invalid');
        $(element).removeClass("is-invalid");
        $(element).addClass('invalid');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
      if(element.className == "selectpicker invalid")
      {
        $(element.parentElement.children[1]).removeClass('form-control');
        $(element.parentElement.children[1]).removeClass('is-invalid');
      }
    },
    rules: {
      /*inputMarco: {
        required: true,
        number: true,
        min: 1,
        max: function(){ return parseInt(document.getElementById('idPresupuesto').dataset.restante); }
      },*/
      idInstitucionM: {
        required: true
      },
      inputPresupuesto: {
        required: true,
        minlength: 1
      },
      archivoMarcoAsignar: {
        required: true,
        minlength: 3,
        extension: "pdf"
      },
      inputPresupuestoInstitucion:{
        required: true
        //min: 
      },

      /*idInstitucion: {
        required: true
      },
      idDependencia: {
        required: true
      },*/
    },
    messages:{
      inputMarco: {
        required: "Ingrese un Marco Presupuestario.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Marco Presupuestario mayor a 0.",
        max:  function(){ return ("El Marco Presupuestario no debe ser mayor que $ ").concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(parseInt(document.getElementById('idPresupuesto').dataset.restante)), ".") }
      },
      idInstitucionM: {
        required: "Seleccione una Institucion.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres."
      },
      inputPresupuesto: {
        required: "Seleccione un Presupuesto.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres."
      },
      idInstitucion: {
        required: "Seleccione una Institución."
      },
      archivoMarcoAsignar: {
        required: "Ingrese Archivo de Marco Presupuestario.",
        minlength: "Se requiere un archivo válido.",
        extension: "Ingrese un Archivo con extensión PDF.",
      },
      inputPresupuestoInstitucion:{
        required: "Ingrese un Presupuesto para la Institución."
        //min: 
      },
    }     
  });

  $("#agregarMarcoD").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    ignore: ":hidden:not(.selectpicker)",
    errorPlacement: function( span, element ) {
      if(element[0].className === "selectpicker invalid") {
        element.parent().append(span);
      } else {
        span.insertAfter(element);
      }
    },
    //ignore: ":hidden:not(.selectpicker)",
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
      if(element.className == "selectpicker is-invalid")
      {
        $(element.parentElement.children[1]).addClass('form-control');
        $(element.parentElement.children[1]).addClass('is-invalid');
        $(element).removeClass("is-invalid");
        $(element).addClass('invalid');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
      if(element.className == "selectpicker invalid")
      {
        $(element.parentElement.children[1]).removeClass('form-control');
        $(element.parentElement.children[1]).removeClass('is-invalid');
      }
    },
    rules: {
      
      inputMarcoD: {
        required: true,
        minlength: 1
      },
    },
    messages:{
      inputMarcoD: {
        required: "Seleccione un Marco.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres."
      },
    }     
  });

  $("#modificarMarco").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    ignore: ":hidden:not(.selectpicker)",
    errorPlacement: function( span, element ) {
      if(element[0].className === "selectpicker invalid") {
        element.parent().append(span);
      } else {
        span.insertAfter(element);
      }
    },
    //ignore: ":hidden:not(.selectpicker)",
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
      if(element.className == "selectpicker is-invalid")
      {
        $(element.parentElement.children[1]).addClass('form-control');
        $(element.parentElement.children[1]).addClass('is-invalid');
        $(element).removeClass("is-invalid");
        $(element).addClass('invalid');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
      if(element.className == "selectpicker invalid")
      {
        $(element.parentElement.children[1]).removeClass('form-control');
        $(element.parentElement.children[1]).removeClass('is-invalid');
      }
    },
    rules: {
      inputMarcoInstitucion: {
        required: true,
        number: true,
        min: 1
        //max: function(){ return parseInt(document.getElementById('idPresupuesto').dataset.restante); }
      },
      archivoMarcoModificar: {
        required: true,
        minlength: 3,
        extension: "pdf",
      },
      inputPresupuestoInstitucionMarco:{
        required: true
        //min: 
      },
    },
    messages:{
      inputMarcoInstitucion: {
        required: "Ingrese un Marco Presupuestario.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Marco Presupuestario mayor a 0."
        //max:  function(){ return ("El Marco Presupuestario no debe ser mayor que $ ").concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(parseInt(document.getElementById('idPresupuesto').dataset.restante)), ".") }
      },
      archivoMarcoModificar: {
        required: "Ingrese Archivo de Marco Presupuestario.",
        minlength: "Se requiere un archivo válido.",
        extension: "Ingrese un Archivo con extensión PDF."
      },
      inputPresupuestoInstitucionMarco:{
        required: "Ingrese un Presupuesto para la Institución."
        //min: 
      },
    }
  });

  $("#agregarPresupuesto").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    ignore: ":hidden:not(.selectpicker)",
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
    rules: {
      inputPrograma: {
        required: true,
        minlength: 0
      },
      inputPresupuesto6: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min: function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
      inputPresupuesto3: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min:  function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
      inputPresupuesto4: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min:  function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
      inputPresupuesto5: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min: function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
    },
    messages:{
      inputPrograma: {
        required: "Seleccione un Programa para el Presupuestario.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres."
      },
      inputPresupuesto6: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
      inputPresupuesto3: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
      inputPresupuesto4: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
      inputPresupuesto5: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
    }
  });

  $("#modificarPresupuesto").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    ignore: ":hidden:not(.selectpicker)",
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
    rules: {
      inputPrograma: {
        required: true,
        minlength: 1
      },
      inputPresupuesto6: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min: function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
      inputPresupuesto3: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min: function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
      inputPresupuesto4: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min: function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
      inputPresupuesto5: {
        required: function(element){ return (!$('#inputPresupuesto6').val() && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val()); },
        number: true,
        min: function(element){ 
          if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
          { 
            return 1;
          }else{
            if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && $('#inputPresupuesto5').val() <= 0)
            { 
              return 1;
            }else{
              if(!$('#inputPresupuesto6').val()  && !$('#inputPresupuesto3').val() && $('#inputPresupuesto4').val() <= 0 && !$('#inputPresupuesto5').val())
              { 
                return 1;
              }else{
                if(!$('#inputPresupuesto6').val()  && $('#inputPresupuesto3').val() <= 0 && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                { 
                  return 1;
                }else{
                  if($('#inputPresupuesto6').val() <= 0 && !$('#inputPresupuesto3').val() && !$('#inputPresupuesto4').val() && !$('#inputPresupuesto5').val())
                  { 
                    return 1;
                  }else{
                    if($('#inputPresupuesto6').val() <= 0 && $('#inputPresupuesto3').val() <= 0 && $('#inputPresupuesto4').val() <= 0 && $('#inputPresupuesto5').val() <= 0)
                    { 
                      return 1;
                    }else{
                      return 0;
                    }
                  }
                }
              }
            }
          } 
        },
      },
    },
    messages:{
      inputPrograma: {
        required: "Seleccione un Programa para el Presupuestario.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres."
      },
      inputPresupuesto6: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
      inputPresupuesto3: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
      inputPresupuesto4: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
      inputPresupuesto5: {
        required: "Ingrese un Presupuesto.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Presupuesto mayor a 0." 
      },
    }
  });

  $("#agregarConvenio").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
     ignore: ":hidden:not(.selectpicker)",
    errorPlacement: function( span, element ) {
      if(element[0].className === "selectpicker invalid") {
        element.parent().append(span);
      } else {
        span.insertAfter(element);
      }
    },
    //ignore: ":hidden:not(.selectpicker)",
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
      if(element.className == "selectpicker is-invalid" || element.className == "selectpicker invalid is-invalid")
      {
        $(element.parentElement.children[1]).addClass('form-control');
        $(element.parentElement.children[1]).removeClass('is-invalid');
        $(element.parentElement.children[1]).addClass('is-invalid');
        $(element).removeClass("is-invalid");
        $(element).addClass('invalid');
      }
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
      if(element.className == "selectpicker invalid")
      {
        $(element.parentElement.children[1]).removeClass('form-control');
        $(element.parentElement.children[1]).removeClass('is-invalid');
        $(element.parentElement.children[1]).removeClass('invalid');
      }
    },
    rules: {
      inputConvenio: {
        required: true,
        number: true,
        min: 1,
        max: function(){ return parseInt(document.getElementById('idMarco').dataset.restante); }
      },
      inputMarco:{
        required: true
      },
      inputFecha: {
        required: true
      },
      inputResolucion: {
        required: true
      },
      archivoConvenio: {
        required: true,
        minlength: 3,
        extension: "pdf"
      },
    },
    messages:{
      inputConvenio: {
        required: "Ingrese un Convenio.",
        number: "Ingrese un valor numérico.",
        min: "Ingrese un Convenio mayor a 0.",
        max:  function(){ return ("El Convenio no debe ser mayor que $ ").concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(parseInt(document.getElementById('idMarco').dataset.restante)), ".") } 
      },
      inputMarco:{
        required: "Seleccione un Marco Presupuestario."
      },
      inputFecha: {
        required: "Ingrese una Fecha de Resolución.",
      },
      inputResolucion: {
        required: "Ingrese un N° de Resoluci&oacute;n."
      },
      archivoConvenio: {
        required: "Ingrese Archivo de Resolución de Convenio.",
        minlength: "Se requiere un archivo válido.",
        extension: "Ingrese un Archivo con extensión PDF.",
      },
    }
  });

  $("#agregarMarco").on("submit", function(e){
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#agregarMarco").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      e.preventDefault();
      var monto_restante = document.getElementById('monto_restante');
      var marcos = document.getElementsByClassName('marcos_institucion');
      var suma = 0;


      var cantidad = document.getElementById('cantidad');
      var subtitulo = document.getElementById('subtitulo');

      //var monto_marco = parseInt(monto_restante.dataset.montoMarco);
      var monto_restante_marco = parseInt(monto_restante.dataset.montoRestante);
      //var restante = (monto_marco + monto_restante_marco);

      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      var diferencia = (monto_restante_marco - suma);

      var mensaje = "";

      /*if (suma == 0) {
         mensaje = 'Debes ingresar al menos un monto para Marco Presupuestario.';
        //document.getElementById('mensajeError').textContent = mensaje;
        //monto_restante.classList.remove('text-success');
        //monto_restante.classList.add('text-danger');
        //monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);

        $('#tituloM').empty();
        $("#parrafoM").empty();
        $("#tituloM").append('<i class="plusTituloError" data-feather="x-circle"></i> Error!!!');
        $("#parrafoM").append(mensaje);
        loader.setAttribute('hidden', '');
        //feather.replace()
        $('#modalMensajeMarco').modal({
          show: true
        });

        feather.replace()
      *///}else{
        if(diferencia < 0)
        {
          mensaje = 'EXCEDE MONTO DEL MARCO PRESUPUESTARIO POR UN MONTO DE: <p class="text-danger">$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia)+'</p>';
          //document.getElementById('mensajeError').textContent = mensaje;
          //monto_restante.classList.remove('text-success');
          //monto_restante.classList.add('text-danger');
          //monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);

          $('#tituloM').empty();
          $("#parrafoM").empty();
          $("#tituloM").append('<i class="plusTituloError" data-feather="x-circle"></i> Error!!!');
          $("#parrafoM").append(mensaje);
          loader.setAttribute('hidden', '');
          //feather.replace()
          $('#modalMensajeMarco').modal({
            show: true
          });

          feather.replace()

          //feather.replace();
          //loader.setAttribute('hidden', '');
          //return false;
        }else{
          var f = $(this);
          var form = document.getElementById("agregarMarco");
          var archivo = document.getElementById('archivoMarcoAsignar').files[0];
          var institucion = $('#idInstitucionM').val();
          //var dependencia = $('#idDependencia').val();
          var formData = new FormData(form);

          formData.append("cantidad", cantidad.textContent)
          formData.append("subtitulo", subtitulo.textContent)

          //formData.append("institucion", institucion);
          //formData.append("dependencia", dependencia);

          jQuery.ajax({
          type: form.getAttribute('method'),
          url: form.getAttribute('action'),
          dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function(data) {
            if (data.resultado && data.resultado == "1") {
              document.getElementById("agregarMarco").reset();
              $(document.getElementById('idInstitucionM')).selectpicker('refresh');
              //$(document.getElementById('selectSubtitulos')).selectpicker('refresh');
              $(document.getElementById('archivoMarcoAsignar')).next('.custom-file-label').html('Seleccionar un Archivo...');
              document.getElementById('divComunasHospitales').innerHTML = "";
              document.getElementById('cantidad').textContent = "";
              document.getElementById('subtitulo').textContent = "";
              document.getElementById('mensajeError').textContent = "";
              document.getElementById('programa_presupuesto').textContent = "";
              document.getElementById('cuenta_presupuesto').textContent = "";
              var idPresupuesto = document.getElementById('idPresupuesto');
              idPresupuesto.dataset.restante = "";
              idPresupuesto.dataset.subtitulo = "";
              var monto_restante = document.getElementById('monto_restante');
              monto_restante.dataset.montoRestante = "";
              monto_restante.textContent = "";

              var monto_restante_marco = document.getElementById('monto_restante_marco');
              monto_restante_marco.dataset.montoRestante = "";
              monto_restante_marco.textContent = "";

              $('#tituloM').empty();
              $("#parrafoM").empty();
              $("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
              $("#parrafoM").append(data.mensaje);
              loader.setAttribute('hidden', '');


              $('#modalMensajeMarco').modal({
                  show: true
                });

              feather.replace();
            }
            
          }
          });
        }
      //}

      // ... resto del código de mi ejercicio
    }else
    {
      loader.setAttribute('hidden', '');
    }
    feather.replace();
  });


 $("#agregarMarcoD").on("submit", function(e){
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    var validacion = $("#agregarMarcoD").validate();

    if(validacion.numberOfInvalids() == 0)
    {
      e.preventDefault();

      var marco = $(this).val();
      var monto_restante = document.getElementById('monto_restante');
      var marcos = document.getElementsByClassName('marcos_institucion');
      var suma = 0;
      var montoMarco = monto_restante.dataset.montoMarco;

      var cantidad = document.getElementById('cantidad');
      var subtitulo = document.getElementById('subtitulo');

      if (isNaN(montoMarco) || montoMarco == "")
        montoMarco = 0;

      var monto_marco = parseInt(montoMarco);
      var monto_restante_marco = parseInt(monto_restante.dataset.montoRestante);
      var diferencia = 0;

      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      diferencia = (montoMarco-suma);

      if (suma == 0) {

        mensaje = "Asigne convenios a ".concat((subtitulo == 4 ? 'las comunas.' : 'los hospitales.'));
        document.getElementById('mensajeErrorMarco').textContent = mensaje;
        monto_restante.classList.remove('text-success');
        monto_restante.classList.add('text-danger');
        monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
        $('#tituloM').empty();
        $("#parrafoM").empty();
        $("#tituloM").append('<i class="plusTituloError" data-feather="x-circle"></i> Error!!!');
        $("#parrafoM").append(mensaje);
        loader.setAttribute('hidden', '');
        //feather.replace()
        $('#modalMensajeMarco').modal({
          show: true
        });
        feather.replace()
      }else{
        if(diferencia < 0)
        {
          mensaje = "Los convenios asignados no pueden ser mayor al marco restante.";
          document.getElementById('mensajeErrorMarco').textContent = mensaje;
          monto_restante.classList.remove('text-success');
          monto_restante.classList.add('text-danger');
          monto_restante.textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia);
          $('#tituloM').empty();
          $("#parrafoM").empty();
          $("#tituloM").append('<i class="plusTituloError" data-feather="x-circle"></i> Error!!!');
          $("#parrafoM").append(mensaje);
          loader.setAttribute('hidden', '');
          //feather.replace()
          $('#modalMensajeMarco').modal({
            show: true
          });
          feather.replace()
       
        }else{
          var f = $(this);
          var form = document.getElementById("agregarMarcoD");        
          var formData = new FormData(form);

          formData.append("cantidad", cantidad.textContent)
          formData.append("subtitulo", subtitulo.textContent)

          jQuery.ajax({
          type: form.getAttribute('method'),
          url: form.getAttribute('action'),
          dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function(data) {
            if (data.resultado && data.resultado == "1") {
              document.getElementById("agregarMarcoD").reset();
              document.getElementById('divComunasHospitalesD').innerHTML = "";
              document.getElementById('cantidad').textContent = "";
              document.getElementById('subtitulo').textContent = "";
              document.getElementById('mensajeErrorMarco').textContent = "";
              document.getElementById('programa_presupuesto').textContent = "";
              document.getElementById('cuenta_presupuesto').textContent = "";
              document.getElementById('institucionD').textContent = "";
              var monto_disponible = document.getElementById('monto_disponible');
              monto_disponible.dataset.montoMarco = "";
              monto_disponible.textContent = "";
              var monto_restante = document.getElementById('monto_restante');
              monto_restante.dataset.montoRestante = "";
              monto_restante.dataset.montoMarco = "";
              monto_restante.textContent = "";

              $('#tituloM').empty();
              $("#parrafoM").empty();
              $("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
              $("#parrafoM").append(data.mensaje);
              loader.setAttribute('hidden', '');

              $('#modalMensajeMarco').modal({
                  show: true
                });

              feather.replace()
            }
            
          }
          });
        }
      }
    }else
    {
      loader.setAttribute('hidden', '');
    }
    feather.replace();
  });

  $('#modalMensajeModificarMarco').on('hidden.bs.modal', function (e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    location.reload();
  })

  $('#modalConfirmacion').on('hidden.bs.modal', function (e) {
    var loader = document.getElementById("loader");
    loader.setAttribute('hidden', '');
  })

  $('#modalConfirmacion').on('click', '#confirmarCMM', function(e) {
    document.getElementById('confirmarCMM').dataset.confirmado = 1;
    $('#modalConfirmacion').modal('hide');
    $( "#modificarMarco" ).submit();
  })
  

  $("#modificarMarco").on("submit", function(e){
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#modificarMarco").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      var monto_restante = document.getElementById('monto_restante');
      var monto_marco_institucion = document.getElementById('inputPresupuestoInstitucionMarco');
      var monto_presupuesto_marco_1 = parseInt(monto_restante.dataset.montoMarco);
      var monto_presupuesto_marco_actual = parseInt(monto_marco_institucion.value);
      var confirmado = document.getElementById('confirmarCMM').dataset.confirmado;

      if (monto_presupuesto_marco_1 < monto_presupuesto_marco_actual || monto_presupuesto_marco_1 > monto_presupuesto_marco_actual) {
        if (confirmado != 1){
          if (monto_presupuesto_marco_1 < monto_presupuesto_marco_actual){
            e.preventDefault();
            $('#tituloCMM').empty();
            $("#parrafoCMM").empty();
            $("#tituloCMM").append('<i class="plusTituloError mb-2" data-feather="alert-triangle"></i> Advertencia!!!');
            var mensaje = '<div class="marco_error pl-2"><p>Está aumentando el Presupuesto de la Insittuci&oacute;n con valor actual de: </p><div class="alert alert-success" role="alert"><a href="#" class="alert-link">$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_presupuesto_marco_1));
            mensaje = mensaje.concat('</a></div><p> por el nuevo monto de: </p><div class="alert alert-danger" role="alert"><a href="#" class="alert-link">$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_presupuesto_marco_actual)));
            mensaje = mensaje.concat('</a></div><p> con una diferencia de monto de: </p><div class="alert alert-warning" role="alert"><a href="#" class="alert-link">$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format((monto_presupuesto_marco_actual - monto_presupuesto_marco_1))));
            mensaje = mensaje.concat('</a></div></div>');
            mensaje = mensaje.concat('<div class="pl-2">¿Estás seguro que deseas aumentar el Presupuesto de Instituci&oacute;n?</div>');

            $("#parrafoCMM").append(mensaje);
            feather.replace();
            loader.setAttribute('hidden', '');
          }else{
             e.preventDefault();
            $('#tituloCMM').empty();
            $("#parrafoCMM").empty();
            $("#tituloCMM").append('<i class="plusTituloError mb-2" data-feather="alert-triangle"></i> Advertencia!!!');
            var mensaje = '<div class="marco_error pl-2"><p>Está disminuyendo el Presupuesto de la Insittuci&oacute;n con valor actual de: </p><p class="text-success">$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_presupuesto_marco_1));
            mensaje = mensaje.concat('</p><p> por el nuevo monto de: </p><p class="text-danger">$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_presupuesto_marco_actual)));
            mensaje = mensaje.concat('</p><p> con una diferencia de monto de: </p><p class="text-warning">$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format((monto_presupuesto_marco_actual - monto_presupuesto_marco_1))));
            mensaje = mensaje.concat('</p></p></div>');

            mensaje = mensaje.concat('<div">¿Estás seguro que deseas disminuir el Presupuesto de Instituci&oacute;n?</div>');

            $("#parrafoCMM").append(mensaje);
            feather.replace();
            loader.setAttribute('hidden', '');
          }
          $('#modalConfirmacion').modal({
            show: true
          });
            
          return false;
        }
      }

      e.preventDefault();


      var monto_restante = document.getElementById('monto_restante');
      var marcos = document.getElementsByClassName('marcos_instituciones');
      var suma = 0;

      var cantidad = document.getElementById('cantidad');
      var subtitulo = document.getElementById('subtitulo');

      var monto_marco = parseInt(monto_restante.dataset.montoMarco);
      var monto_restante_marco = parseInt(monto_restante.dataset.montoRestante);
      var restante = (monto_marco + monto_restante_marco);




      for (var i = 0; i < marcos.length; i ++) {
        var monto = 0;
        if ($.isNumeric(marcos[i].value)) {
          monto = parseInt(marcos[i].value);  
          suma = (suma + monto);
        }
      }

      var diferencia = (restante - suma);

      var mensaje = "";
      if(diferencia < 0)
      {
        mensaje = 'EXCEDE MONTO DEL MARCO PRESUPUESTARIO POR UN MONTO DE: <p class="text-danger">$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(diferencia)+'</p>';

        $('#tituloM').empty();
        $("#parrafoM").empty();
        $("#tituloM").append('<i class="plusTituloError" data-feather="x-circle"></i> Error!!!');
        $("#parrafoM").append(mensaje);
        loader.setAttribute('hidden', '');
        //feather.replace()
        $('#modalMensajeMarco').modal({
          show: true
        });

        feather.replace()
      }
      else{
          var f = $(this);
          var form = document.getElementById("modificarMarco");
          var archivo = document.getElementById('archivoMarcoModificar').files[0];
          //var institucion = $('#idInstitucion').val();
          //var dependencia = $('#idDependencia').val();
          //var institucion = $('#idInstitucionM').val();
          //var dependencia = $('#idDependencia').val();
          var institucion = document.getElementById('idInstitucionM').value;

          var formData = new FormData(form);

          formData.append("cantidad", cantidad.value);
          formData.append("subtitulo", subtitulo.value);
          formData.append("institucion", institucion);

          for (var i=0;i<cantidad.value;i++) {
            marco = 0;
            nombre = "";
            nombre = "inputMarco".concat(i);
            marco = document.getElementById(nombre).value;
            formData.append(nombre, marco);
          }

         
          jQuery.ajax({
          type: form.getAttribute('method'),
          url: form.getAttribute('action'),
          dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function(data) {
            if (data.resultado && data.resultado == "1") {
              //document.getElementById("modificarMarco").reset();
              //$(document.getElementById('idInstitucion')).selectpicker('refresh');
              //$(document.getElementById('selectSubtitulos')).selectpicker('refresh');
              $(document.getElementById('archivoMarcoModificar')).next('.custom-file-label').html('Seleccionar un nuevo Archivo...');
              
              $('#tituloMM').empty();
              $("#parrafoMM").empty();
              $("#tituloMM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
              $("#parrafoMM").append(data.mensaje);
              loader.setAttribute('hidden', '');

              $('#modalMensajeModificarMarco').modal({
                  show: true
                });

              feather.replace()
            }
            
          }
          });
      }
     
      // ... resto del código de mi ejercicio      
      
    }else
    {
      loader.setAttribute('hidden', '');
    }
  });

  $("#agregarPresupuesto").on("submit", function(e){
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#agregarPresupuesto").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      e.preventDefault();
      var f = $(this);
      var form = document.getElementById("agregarPresupuesto");
      //var archivo = document.getElementById('archivoPresupuesto').files[0];
      //var subtitulo = $('#selectSubtitulos').val();
      var formData = new FormData(form);

      //formData.append("archivo", archivo, archivo.name);
      //formData.append("subtitulo", subtitulo);

      jQuery.ajax({
      type: form.getAttribute('method'),
      url: form.getAttribute('action'),
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) {
        //console.log(data);
        if (data != null && data.resultado || data.resultado == 1 ) { 
          document.getElementById("agregarPresupuesto").reset();
          $(document.getElementById('selectSubtitulos')).selectpicker('refresh');
          //$(document.getElementById('archivoPresupuesto')).next('.custom-file-label').html('Seleccionar un Archivo...');
          
          $('#tituloM').empty();
          $("#parrafoM").empty();
          $("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoM").append(data.mensaje);
          loader.setAttribute('hidden', '');
          $('#modalMensajePresupuesto').modal({
              show: true
            });

          feather.replace()
        }else{
          $('#tituloM').empty();
          $("#parrafoM").empty();
          $("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoM").append('Ha ocurrido un error al agregar los Presupuestos. Favor intente nuevamente.');
          loader.setAttribute('hidden', '');
          $('#modalMensajePresupuesto').modal({
              show: true
            });

          feather.replace()
        }
        
      }
      });
      // ... resto del código de mi ejercicio
    }else
    {
      loader.setAttribute('hidden', '');
    }
  });

  $("#modificarPresupuesto").on("submit", function(e){
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#modificarPresupuesto").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      e.preventDefault();
      var f = $(this);
      var form = document.getElementById("modificarPresupuesto");
      //var archivo = document.getElementById('archivoPresupuesto').files[0];
      //var subtitulo = $('#selectSubtitulos').val();
      var formData = new FormData(form);

      //formData.append("archivo", archivo, archivo.name);
      //formData.append("subtitulo", subtitulo);

      jQuery.ajax({
      type: form.getAttribute('method'),
      url: form.getAttribute('action'),
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) {
        //console.log(data);
        if (data != null && data.resultado || data.resultado == 1 ) { 
          //document.getElementById("modificarPresupuesto").reset();
          $(document.getElementById('selectSubtitulos')).selectpicker('refresh');
          //$(document.getElementById('archivoPresupuesto')).next('.custom-file-label').html('Seleccionar un Archivo...');
          
          $('#tituloM').empty();
          $("#parrafoM").empty();
          $("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoM").append(data.mensaje);
          loader.setAttribute('hidden', '');
          $('#modalMensajePresupuesto').modal({
              show: true
            });

          feather.replace()
        }else{
          $('#tituloM').empty();
          $("#parrafoM").empty();
          $("#tituloM").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoM").append('Ha ocurrido un error al agregar los Presupuestos. Favor intente nuevamente.');
          loader.setAttribute('hidden', '');
          $('#modalMensajePresupuesto').modal({
              show: true
            });

          feather.replace()
        }
        
      }
      });
      // ... resto del código de mi ejercicio
    }else
    {
      loader.setAttribute('hidden', '');
    }
  });

$("#agregarConvenio").on("submit", function(e){
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#agregarConvenio").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      e.preventDefault();
      var f = $(this);
      var form = document.getElementById("agregarConvenio");
      var archivo = document.getElementById('archivoConvenio').files[0];
      var comuna = $('#selectComunas').val();
      var formData = new FormData(form);

      //formData.append("archivo", archivo, archivo.name);
      formData.append("comuna", comuna);

      jQuery.ajax({
      type: form.getAttribute('method'),
      url: form.getAttribute('action'),
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
      success: function(data) {
        if (data.resultado && data.resultado == "1") {
          document.getElementById("agregarConvenio").reset();
          $(document.getElementById('selectComunas')).selectpicker('refresh');
          $(document.getElementById('idInstitucionC')).selectpicker('refresh');
          $(document.getElementById('archivoConvenio')).next('.custom-file-label').html('Seleccionar un Archivo...');
          
          document.getElementById('mensajeError').textContent = "";
          document.getElementById('programa_presupuesto').textContent = "";
          document.getElementById('cuenta_presupuesto').textContent = "";
          document.getElementById('lInstitucion').textContent = "";
          var monto_restante = document.getElementById('monto_restante');
          monto_restante.dataset.montoRestante = "";
          monto_restante.textContent = "";

          $('#tituloM').empty();
          $("#parrafoM").empty();
          $("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoM").append(data.mensaje);
          loader.setAttribute('hidden', '');
          $('#modalMensajeConvenio').modal({
              show: true
            });

          feather.replace()
        }
      }
      });
      // ... resto del código de mi ejercicio
      }else
      {
        loader.setAttribute('hidden', '');
      }
  });


  $('#sbtnAgregarMarco').click(function(e){
      var programa = $('#idPrograma').val();
      var institucion = $('#idInstitucion').val();
      var marco = $('#inputMarco').val();
      var archivo = document.getElementById('archivoMarco').files[0];

      var baseurl = window.origin + '/Programa/agregarMarco';

      jQuery.ajax({
      type: "POST",
      url: baseurl,
      dataType: 'json',
      data: {programa: programa, institucion: institucion, marco: marco, archivo: archivo},
      success: function(data) {
        if (data)
        {
          if(data == '1')
          {
            $('#tituloMP').empty();
            $("#parrafoMP").empty();
            $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
            $("#parrafoMP").append('Se ha eliminado exitosamente la Programa.');
            $('#modalEliminarPrograma').modal('hide');
            $('#modalMensajePrograma').modal({
              show: true
            });
            listarProgramas();
          }else{
            $('#tituloMP').empty();
            $("#parrafoMP").empty();
            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
            $("#parrafoMP").append('Ha ocurrido un error al intentar la Programa.');
            $('#modalEliminarPrograma').modal('hide');
            $('#modalMensajePrograma').modal({
              show: true
            });
            listarProgramas();
          }
          feather.replace()
          $('[data-toggle="tooltip"]').tooltip()
        }
      }
      });
  });

  $("#agregarPrograma").validate({
    errorClass:'invalid-feedback',
    errorElement:'span',
    highlight: function(element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("invalid-feedback");
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
    rules: {
      inputNombre: {
        required: true,
        minlength: 1,
        maxlength: 100
      },
      inputObservaciones: {
        maxlength: 100
      },
    },
    messages:{
      inputNombre: {
        required: "Se requiere un Nombre de Programa.",
        minlength: "Se requieren m&iacute;nimo {0} caracteres.",
        maxlength: "Se requiere no mas de {0} caracteres."
      },
      inputObservaciones: {
        maxlength: "Se requiere no mas de {0} caracteres."
      },
    }
  });

  $('#modalEliminarPrograma').on('show.bs.modal', function(e) {
    //get data-id attribute of the clicked element
    var idPrograma = $(e.relatedTarget).data('id');
    var nombrePrograma = $(e.relatedTarget).data('nombre');
    //populate the textbox
    $("#tituloEP").text('Eliminar Programa N° ' + idPrograma);
    $("#parrafoEP").text('¿Estás seguro que deseas eliminar la  Programa N° ' + idPrograma + ', "' + nombrePrograma + '"?');

    $("#tituloEP").removeData("idprograma");
    $("#tituloEP").attr("data-idprograma", idPrograma);
    //$("#tituloEE").removeData("nombreequipo");
    //$("#tituloEE").attr("data-nombreEquipo", nombreEquipo);
  });

  $('#modalEliminarConvenio').on('show.bs.modal', function(e) {
    //get data-id attribute of the clicked element
    var idConvenio = $(e.relatedTarget).data('id');
    var comuna = $(e.relatedTarget).data('comuna');
    //populate the textbox
    $("#tituloEP").text('Eliminar Convenio N° ' + idConvenio);
    $("#parrafoEP").text('¿Estás seguro que deseas eliminar el Convenio N° ' + idConvenio + 'de la comuna: "' + comuna + '"?');

    $("#tituloEP").removeData("idconvenio");
    $("#tituloEP").attr("data-idconvenio", idConvenio);
  });

  $('#modalEliminarMarco').on('show.bs.modal', function(e) {
    //get data-id attribute of the clicked element
    var idMarco = $(e.relatedTarget).data('id');
    var institucion = $(e.relatedTarget).data('institucion');
    var programa = $(e.relatedTarget).data('programa');
    //populate the textbox
    $("#tituloEP").text('Eliminar Marco N° ' + idMarco);
    $("#parrafoEP").text('¿Estás seguro que deseas eliminar el Marco N° ' + idMarco + ' de la institucion: "' + institucion + '", programa: "' + programa + '"?');

    $("#tituloEP").removeData("idmarco");
    $("#tituloEP").attr("data-idmarco", idMarco);
  });

   $('#modalEliminarPresupuesto').on('show.bs.modal', function(e) {
    //get data-id attribute of the clicked element
    var idPresupuesto = $(e.relatedTarget).data('id');
    var programa = $(e.relatedTarget).data('programa');
    //populate the textbox
    $("#tituloEP").text('Eliminar Presupuesto N° ' + idPresupuesto);
    $("#parrafoEP").text('¿Estás seguro que deseas eliminar el Presupuesto N° ' + idPresupuesto + ' del  programa: "' + programa + '"?');

    $("#tituloEP").removeData("idpresupuesto");
    $("#tituloEP").attr("data-idpresupuesto", idPresupuesto);
  });

  $('#modalBuscarPrograma').on('show.bs.modal', function (event) {

    var table = $('#tListaProgramas').DataTable();
    table.destroy();
    /*$('#tListaProgramas').DataTable( {
                "search": {
                  "search": ""
                }
            } );*/
     $('#tListaProgramas').dataTable({
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
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
  });

  $('#modalBuscarProgramaMarco').on('show.bs.modal', function (event) {

    var table = $('#tListaProgramas').DataTable();
    table.destroy();
    /*$('#tListaProgramas').DataTable( {
                "search": {
                  "search": ""
                }
            } );*/
     $('#tListaProgramas').dataTable({
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
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
  });

   $('#modalBuscarProgramaConvenio').on('show.bs.modal', function (event) {

   /*var table = $('#tListaProgramas').DataTable();
    table.destroy();*/
    /*$('#tListaProgramas').DataTable( {
                "search": {
                  "search": ""
                }
            } );*/
     /*$('#tListaProgramas').dataTable({
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
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
    });*/
  });

  $('#modalBuscarMarco').on('show.bs.modal', function (event) {

    var table = $('#tListaMarcos').DataTable();
    table.destroy();
    $('#tListaMarcos').DataTable( {
                "search": {
                  "search": ""
                }
            } );
  });

  $('#eliminarPrograma').click(function(e){
    idPrograma = $('#tituloEP').data('idprograma');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Programa/eliminarPrograma';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idPrograma: idPrograma},
    success: function(data) {
      if (data)
      {
        if(data == '1')
        {
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoMP").append('Se ha eliminado exitosamente la Programa.');
          $('#modalEliminarPrograma').modal('hide');
           listarProgramas();
          $('#modalMensajePrograma').modal({
            show: true
          });
        }else{
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoMP").append('Ha ocurrido un error al intentar la Programa.');
          $('#modalEliminarPrograma').modal('hide');
          listarProgramas();
          $('#modalMensajePrograma').modal({
            show: true
          });
        }
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  });

  $('#buscarPrograma').on('change',function(e){
     filtroPrograma = $('#buscarPrograma').val();

     if(filtroPrograma.length = 0)
        filtroPrograma = "";
    listarProgramas(filtroPrograma);
  });

  $('#eliminarConvenio').click(function(e){
    idConvenio = $('#tituloEP').data('idconvenio');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Programa/eliminarConvenio';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idConvenio: idConvenio},
    success: function(data) {
      if (data)
      {
        if(data == '1')
        {
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoMP").append('Se ha eliminado exitosamente el Convenio.');
          $('#modalEliminarConvenio').modal('hide');
          //listarConvenios();
          var table = $('#tListaConvenios').DataTable();
          table.destroy();
          var loader = document.getElementById("loader");   
          var institucion = document.getElementById('institucionConvenio');
          if (jQuery.isEmptyObject(institucion))
            institucion = null;
          else
            institucion = institucion.value;
          $('#tListaConvenios').dataTable({
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
            "serverSide": true,
             "ajax": 
             {
               "url":  window.origin + '/Programa/json_listarConvenios',
               "type": 'POST',
               "data": {
                        "idInstitucion": institucion, //document.getElementById('institucionConvenio').value,
                        "idPrograma" : $("#idProgramaConvenio").val(),
                        "idEstado": document.getElementById('estadoConvenio').value,
                       }
             },
             searching: true,
             paging:         true,
             ordering:       false,
             info:           true,
             //"order": [[ 16, "desc" ]],
             /*columnDefs: [
               { targets: 'no-sort', orderable: false }
             ],*/
             //bDestroy:       true,
            //"type": 'POST',
            "aoColumnDefs" :  [
                                {"aTargets" : [1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                              ],

             "oLanguage": {
              /*"sProcessing":     function(){
              let timerInterval

              },*/
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
              lengthMenu: [[10, 20], [10, 20]]
           });
          $('#modalMensajeConvenio').modal({
            show: true
          });
        }else{
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoMP").append('Ha ocurrido un error al intentar eliminar el Convenio.');
          $('#modalEliminarConvenio').modal('hide');
          //listarConvenios();
          var table = $('#tListaConvenios').DataTable();
          table.destroy();
          //var loader = document.getElementById("loader");   
          var institucion = document.getElementById('institucionConvenio');
          if (jQuery.isEmptyObject(institucion))
            institucion = null;
          else
            institucion = institucion.value;
          $('#tListaConvenios').dataTable({
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
            "serverSide": true,
             "ajax": 
             {
               "url":  window.origin + '/Programa/json_listarConvenios',
               "type": 'POST',
               "data": {
                        "idInstitucion": institucion, //document.getElementById('institucionConvenio').value,
                        "idPrograma" : $("#idProgramaConvenio").val(),
                        "idEstado": document.getElementById('estadoConvenio').value,
                       }
             },
             searching: true,
             paging:         true,
             ordering:       false,
             info:           true,
             //"order": [[ 16, "desc" ]],
             /*columnDefs: [
               { targets: 'no-sort', orderable: false }
             ],*/
             //bDestroy:       true,
            //"type": 'POST',
            "aoColumnDefs" :  [
                                {"aTargets" : [1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                              ],

             "oLanguage": {
              /*"sProcessing":     function(){
              let timerInterval

              },*/
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
              lengthMenu: [[10, 20], [10, 20]]
           });
          $('#modalMensajeConvenio').modal({
            show: true
          });
        }
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  });



 $('#eliminarConvenioVariante').click(function(e){
    idConvenio = $('#tituloEP').data('idconvenio');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Programa/eliminarConvenioVariante';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idConvenio: idConvenio},
    success: function(data) {
      if (data)
      {
        if(data == '1')
        {
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoMP").append('Se ha eliminado por modificación exitosamente el Convenio.');
          $('#modalEliminarConvenio').modal('hide');
          //listarConvenios();
          var table = $('#tListaConvenios').DataTable();
          table.destroy();
          var loader = document.getElementById("loader");   
          var institucion = document.getElementById('institucionConvenio');
          if (jQuery.isEmptyObject(institucion))
            institucion = null;
          else
            institucion = institucion.value;
          $('#tListaConvenios').dataTable({
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
            "serverSide": true,
             "ajax": 
             {
               "url":  window.origin + '/Programa/json_listarConvenios',
               "type": 'POST',
               "data": {
                        "idInstitucion": institucion, //document.getElementById('institucionConvenio').value,
                        "idPrograma" : $("#idProgramaConvenio").val(),
                        "idEstado": document.getElementById('estadoConvenio').value,
                       }
             },
             searching: true,
             paging:         true,
             ordering:       false,
             info:           true,
             //"order": [[ 16, "desc" ]],
             /*columnDefs: [
               { targets: 'no-sort', orderable: false }
             ],*/
             //bDestroy:       true,
            //"type": 'POST',
            "aoColumnDefs" :  [
                                {"aTargets" : [1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                              ],

             "oLanguage": {
              /*"sProcessing":     function(){
              let timerInterval

              },*/
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
              lengthMenu: [[10, 20], [10, 20]]
           });
          $('#modalMensajeConvenio').modal({
            show: true
          });
        }else{
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoMP").append('Ha ocurrido un error al intentar eliminar el Convenio.');
          $('#modalEliminarConvenio').modal('hide');
          //listarConvenios();
          var table = $('#tListaConvenios').DataTable();
          table.destroy();
          //var loader = document.getElementById("loader");   
          var institucion = document.getElementById('institucionConvenio');
          if (jQuery.isEmptyObject(institucion))
            institucion = null;
          else
            institucion = institucion.value;
          $('#tListaConvenios').dataTable({
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
            "serverSide": true,
             "ajax": 
             {
               "url":  window.origin + '/Programa/json_listarConvenios',
               "type": 'POST',
               "data": {
                        "idInstitucion": institucion, //document.getElementById('institucionConvenio').value,
                        "idPrograma" : $("#idProgramaConvenio").val(),
                        "idEstado": document.getElementById('estadoConvenio').value,
                       }
             },
             searching: true,
             paging:         true,
             ordering:       false,
             info:           true,
             //"order": [[ 16, "desc" ]],
             /*columnDefs: [
               { targets: 'no-sort', orderable: false }
             ],*/
             //bDestroy:       true,
            //"type": 'POST',
            "aoColumnDefs" :  [
                                {"aTargets" : [1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                                {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                              ],

             "oLanguage": {
              /*"sProcessing":     function(){
              let timerInterval

              },*/
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
              lengthMenu: [[10, 20], [10, 20]]
           });
          $('#modalMensajeConvenio').modal({
            show: true
          });
        }
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  });

  $('#eliminarMarco').click(function(e){
    idMarco = $('#tituloEP').data('idmarco');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Programa/eliminarMarco';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idMarco: idMarco},
    success: function(data) {
      if (data)
      {
        if(data == '1')
        {
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoMP").append('Se ha eliminado exitosamente el Marco.');
          $('#modalEliminarMarco').modal('hide');
          var table = $('#tListaMarcos').DataTable();
          table.destroy();
          $('#tListaMarcos').dataTable({
                  "fnDrawCallback": function( oSettings ) {
                    feather.replace();
                    loader.setAttribute('hidden', '');
                    $('[data-toggle="tooltip"]').tooltip();
                  },
                  "preDrawCallback": function( settings ) {
                    var idInstitucion = document.getElementById('institucionMarco').value;
                    var loader = document.getElementById("loader");
                    loader.removeAttribute('hidden');
                  },
                  "processing": false,
                  "serverSide": true,
                   "ajax": 
                   {
                     "url":  window.origin + '/Programa/json_listarMarcos',
                     "type": 'POST',
                     "data": {
                              "idInstitucion": document.getElementById('institucionMarco').value,
                              "idPrograma" : $("#idProgramaMarco").val(),
                             }
                   },
                   searching: true,
                   paging:         true,
                   ordering:       false,
                   info:           true,
                   //"order": [[ 16, "desc" ]],
                   /*columnDefs: [
                     { targets: 'no-sort', orderable: false }
                   ],*/
                   //bDestroy:       true,
                  //"type": 'POST',
                  "aoColumnDefs" :  [
                                      {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                      {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                      {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                                    ],

                   "oLanguage": {
                    /*"sProcessing":     function(){
                    let timerInterval

                    },*/
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
                    lengthMenu: [[10, 20], [10, 20]]
                 });
          $('#modalMensajeMarco').modal({
            show: true
          });
        }else{
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoMP").append('Ha ocurrido un error al intentar eliminar el Marco.');
          $('#modalEliminarMarco').modal('hide');
          var table = $('#tListaMarcos').DataTable();
          table.destroy();
          $('#tListaMarcos').dataTable({
                  "fnDrawCallback": function( oSettings ) {
                    feather.replace();
                    loader.setAttribute('hidden', '');
                    $('[data-toggle="tooltip"]').tooltip();
                  },
                  "preDrawCallback": function( settings ) {
                    var idInstitucion = document.getElementById('institucionMarco').value;
                    var loader = document.getElementById("loader");
                    loader.removeAttribute('hidden');
                  },
                  "processing": false,
                  "serverSide": true,
                   "ajax": 
                   {
                     "url":  window.origin + '/Programa/json_listarMarcos',
                     "type": 'POST',
                     "data": {
                              "idInstitucion": document.getElementById('institucionMarco').value,
                              "idPrograma" : $("#idProgramaMarco").val(),
                             }
                   },
                   searching: true,
                   paging:         true,
                   ordering:       false,
                   info:           true,
                   //"order": [[ 16, "desc" ]],
                   /*columnDefs: [
                     { targets: 'no-sort', orderable: false }
                   ],*/
                   //bDestroy:       true,
                  //"type": 'POST',
                  "aoColumnDefs" :  [
                                      {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                                      {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                                      {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                                    ],

                   "oLanguage": {
                    /*"sProcessing":     function(){
                    let timerInterval

                    },*/
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
                    lengthMenu: [[10, 20], [10, 20]]
                 });
          $('#modalMensajeMarco').modal({
            show: true
          });
        }
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  });

  $('#eliminarPresupuesto').click(function(e){
    idPresupuesto = $('#tituloEP').data('idpresupuesto');
    //var nombreEquipo = $('#tituloEE').data('nombreequipo');
    var baseurl = window.origin + '/Programa/eliminarPresupuesto';

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idPresupuesto: idPresupuesto},
    success: function(data) {
      if (data)
      {
        if(data == '1')
        {
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
          $("#parrafoMP").append('Se ha eliminado exitosamente el Presupuesto.');
          $('#modalEliminarPresupuesto').modal('hide');
          listarPresupuestos();
          $('#modalMensajePresupuesto').modal({
            show: true
          });
        }else{
          $('#tituloMP').empty();
          $("#parrafoMP").empty();
          $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
          $("#parrafoMP").append('Ha ocurrido un error al intentar eliminar el Presupuesto.');
          $('#modalEliminarPresupuesto').modal('hide');
          listarPresupuestos();
          $('#modalMensajePresupuesto').modal({
            show: true
          });
        }
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip()
      }
    }
    });
  });

  $('#buscarPrograma').on('change',function(e){
     filtroPrograma = $('#buscarPrograma').val();

     if(filtroPrograma.length = 0)
        filtroPrograma = "";
    listarProgramas(filtroPrograma);
  });

  /*$(".seleccionPrograma").on('click', function(e) {
    var idPrograma = $(e.relatedTarget).data('data-id');
    alert(idPrograma);
  });
*/
  $('#listaSeleccionPrograma').on('click', '.seleccionPrograma', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPrograma = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('nombre');
     $('#idPrograma').val(idPrograma);
     $('#inputPrograma').val(nombrePrograma);
     $('#idPrograma').val(idPrograma);
     $('#modalBuscarPrograma').modal('hide')
  });

   $('#listaSeleccionPresupuesto').on('click', '.seleccionPresupuesto', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
     var idPresupuesto = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('programa');
     var monto_restante = $(e.currentTarget).data('restante');
     var codigo_cuenta = $(e.currentTarget).data('codigo_cuenta');
     var nombre_cuenta = $(e.currentTarget).data('nombre_cuenta');
     var id_cuenta = $(e.currentTarget).data('id_cuenta');

     document.getElementById('programa_presupuesto').textContent = nombrePrograma;
     document.getElementById('monto_restante').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante);
     document.getElementById('cuenta_presupuesto').textContent = codigo_cuenta+' '+nombre_cuenta;
     document.getElementById('monto_restante').dataset.montoRestante = monto_restante;
     document.getElementById('idPresupuesto').dataset.subtitulo = id_cuenta;
     document.getElementById('subtitulo').textContent = id_cuenta;

     var presupuesto = $(e.currentTarget).data('restante');
     $('#inputPresupuesto').val(nombrePrograma + ' - $ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(presupuesto));
     $('#idPresupuesto').val(idPresupuesto);
     var inputPresupuesto = document.getElementById('idPresupuesto');
     inputPresupuesto.dataset.restante = monto_restante;
     $("#idInstitucionM").trigger("change");      
     $('#modalBuscarPresupuesto').modal('hide');
  });

  $('#btnBuscarPresupuesto').on('click', function(e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    var baseurl = window.origin + '/Programa/listarPresupuestosMarcos';
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
        $('#listaSeleccionPresupuesto').html(myJSON.table_presupuestos);
        
        loader.setAttribute('hidden', '');
        $('#modalBuscarPresupuesto').modal({
          show: true
        });
        feather.replace()
        $('#tListaPresupuestos').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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
      }
    }
    });
  });
  
  $('#btnBuscarMarco').on('click', function(e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    var table = $('#tListaMarcosUsuario').DataTable();
    table.destroy();

     $('#tListaMarcosUsuario').dataTable({
      "fnDrawCallback": function( oSettings ) {
         $('#modalBuscarMarco').modal({
          show: true
        });
        feather.replace();
        loader.setAttribute('hidden', '');
        $('[data-toggle="tooltip"]').tooltip();
      },
      "preDrawCallback": function( settings ) {
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
      },
      "processing": false,
      "serverSide": true,
       "ajax": 
       {
         "url":  window.origin + '/Programa/json_listarMarcosUsuario',
         "type": 'POST',
         "data": {
                  "institucion": $('select[name=idInstitucionC]').val(),
                  "origen": 'asignarConvenios'
                 }
       },
       searching: true,
       paging:         true,
       ordering:       false,
       info:           true,
       //"order": [[ 16, "desc" ]],
       /*columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],*/
       //bDestroy:       true,
      //"type": 'POST',
      "aoColumnDefs" :  [
                          {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                          {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                          {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],

       "oLanguage": {
        /*"sProcessing":     function(){
        let timerInterval

        },*/
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
        lengthMenu: [[10, 20], [10, 20]]
     });

    /*
    var baseurl = window.origin + '/Programa/listarMarcosUsuario';
    var institucion = $('select[name=idInstitucionC]').val();    
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {institucion: institucion},
    success: function(data) {
    if (data)
    {
        var myJSON= JSON.stringify(data);
        myJSON = JSON.parse(myJSON);
        $('#listaSeleccionMarco').html(myJSON.table_marcos);
        
        loader.setAttribute('hidden', '');
        $('#modalBuscarMarco').modal({
          show: true
        });
        feather.replace()
        $('#tListaMarcosUsuario').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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

        //feather.replace();
        //$('[data-toggle="tooltip"]').tooltip();
      }
    }
    });*/
  });

 $('#btnBuscarMarcoD').on('click', function(e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    var table = $('#tListaMarcosUsuario').DataTable();
    table.destroy();

     $('#tListaMarcosUsuario').dataTable({
      "fnDrawCallback": function( oSettings ) {
         $('#modalBuscarMarco').modal({
          show: true
        });
        feather.replace();
        loader.setAttribute('hidden', '');
        $('[data-toggle="tooltip"]').tooltip();
      },
      "preDrawCallback": function( settings ) {
        var loader = document.getElementById("loader");
        loader.removeAttribute('hidden');
      },
      "processing": false,
      "serverSide": true,
       "ajax": 
       {
         "url":  window.origin + '/Programa/json_listarMarcosUsuarioD',
         "type": 'POST',
         "data": {
                  //"institucion": $('select[name=idInstitucionC]').val(),
                  "origen": 'asignarConveniosD'
                 }
       },
       searching: true,
       paging:         true,
       ordering:       false,
       info:           true,
       //"order": [[ 16, "desc" ]],
       /*columnDefs: [
         { targets: 'no-sort', orderable: false }
       ],*/
       //bDestroy:       true,
      //"type": 'POST',
      "aoColumnDefs" :  [
                          {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                          {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                          {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                        ],

       "oLanguage": {
        /*"sProcessing":     function(){
        let timerInterval

        },*/
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
        lengthMenu: [[10, 20], [10, 20]]
     });

    /*
    var baseurl = window.origin + '/Programa/listarMarcosUsuario';
    var institucion = $('select[name=idInstitucionC]').val();    
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {institucion: institucion},
    success: function(data) {
    if (data)
    {
        var myJSON= JSON.stringify(data);
        myJSON = JSON.parse(myJSON);
        $('#listaSeleccionMarco').html(myJSON.table_marcos);
        
        loader.setAttribute('hidden', '');
        $('#modalBuscarMarco').modal({
          show: true
        });
        feather.replace()
        $('#tListaMarcosUsuario').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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

        //feather.replace();
        //$('[data-toggle="tooltip"]').tooltip();
      }
    }
    });*/
  });

  $('#listaSeleccionMarcos').on('click', '.seleccionMarco', function(e) {
     var idMarco = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('programa');
     var monto_restante = $(e.currentTarget).data('restante');
     var codigo_cuenta = $(e.currentTarget).data('codigo_cuenta');
     var nombre_cuenta = $(e.currentTarget).data('nombre_cuenta');
     var institucion = $(e.currentTarget).data('institucion');
     var id_institucion = $(e.currentTarget).data('id_institucion');
     var marco = $(e.currentTarget).data('marco');
     var comuna = $(e.currentTarget).data('comuna');
     var hospital = $(e.currentTarget).data('hospital');

     document.getElementById('programa_presupuesto').textContent = nombrePrograma;
     document.getElementById('monto_restante').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante);
     document.getElementById('cuenta_presupuesto').textContent = codigo_cuenta+' '+nombre_cuenta;
     document.getElementById('monto_restante').dataset.montoRestante = monto_restante;
     document.getElementById('monto_restante').dataset.montoMarco = marco;
     document.getElementById('lInstitucion').textContent = institucion;
     document.getElementById('lInstitucion').textContent = institucion;
     document.getElementById('lInstitucion').textContent = institucion;



     $('select[name=idInstitucionC]').val(id_institucion);
     $('.selectpicker').selectpicker('refresh');


     var presupuesto = $(e.currentTarget).data('restante');
     $('#inputPresupuesto').val(nombrePrograma + ' - $ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(presupuesto));
     $('#idMarco').val(idMarco);
     var inputMarco = document.getElementById('idMarco');
     inputMarco.dataset.restante = monto_restante;
     $('#modalBuscarMarco').modal('hide');
  });

  $('#tListaMarcosUsuario').on('click', '.seleccionMarcoD', function(e) {
     var idGrupoMarcoD = $(e.currentTarget).data('id');
     var nombrePrograma = $(e.currentTarget).data('programa');
     var monto_restante = $(e.currentTarget).data('restante');
     var monto_disponible = $(e.currentTarget).data('marco');
     var codigo_cuenta = $(e.currentTarget).data('codigo_cuenta');
     var nombre_cuenta = $(e.currentTarget).data('nombre_cuenta');
     var institucion = $(e.currentTarget).data('institucion');
     var id_institucion = $(e.currentTarget).data('id_institucion');
     var id_cuenta = $(e.currentTarget).data('id_cuenta');
     //var marco = $(e.currentTarget).data('marco');

     document.getElementById('programa_presupuesto').textContent = nombrePrograma;
     document.getElementById('monto_restante').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante);
     document.getElementById('cuenta_presupuesto').textContent = codigo_cuenta+' '+nombre_cuenta;

     document.getElementById('monto_restante').dataset.montoRestante = monto_restante;
     document.getElementById('monto_restante').dataset.montoMarco = monto_restante;
     document.getElementById('monto_disponible').dataset.montoMarco = monto_disponible;
     document.getElementById('institucionD').textContent = institucion;
     document.getElementById('monto_disponible').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_disponible);


     //$('select[name=idInstitucionC]').val(id_institucion);
     //$('.selectpicker').selectpicker('refresh');


     var presupuesto = $(e.currentTarget).data('restante');
     $('#inputMarcoD').val(nombrePrograma + ' - $ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(presupuesto));
     $('#idMarcoD').val(idGrupoMarcoD);
     var inputMarco = document.getElementById('idMarcoD');
     inputMarco.dataset.restante = monto_restante;
     $('#modalBuscarMarco').modal('hide');

    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    var subtitulo = id_cuenta;
    var idInstitucion = id_institucion;
    var baseurl = window.origin + '/Programa/listarComunasHospitalesMarco';
    if (subtitulo != null && subtitulo != "" && idInstitucion != null && idInstitucion != "") {
      document.getElementById('subtitulo').textContent = id_cuenta;
      jQuery.ajax({
      type: "POST",
      url: baseurl,
      dataType: 'json',
      data: {institucion: idInstitucion, subtitulo: subtitulo},
      success: function(data) {
        if (data) {

          //var monto_restante = $(e.currentTarget).data('restante');
          //document.getElementById('monto_restante').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante);
          //document.getElementById('monto_restante').dataset.montoRestante = monto_restante;
          //inputPresupuesto.dataset.restante = monto_restante;


          if (data['hospitales'] != null && data['hospitales'].length > 0) {
            $('#divComunasHospitalesD').html('');
            document.getElementById('cantidad').textContent = data['hospitales'].length;

            var primero = true;
            var row = '';
            for (var i=0; i < data["hospitales"].length; i++) {
              row = row.concat('\n<div class="form-group col-lg-3">');
              row = row.concat('\n<input class="form-control form-control-sm" type="text" placeholder="',data['hospitales'][i]['nombre'],'" readonly disabled>');  
              row = row.concat('\n</div>');
              row = row.concat('\n<div class="form-group col-lg-2">');
              row = row.concat('\n<input type="number" class="form-control form-control-sm marcos_institucion" data-id="',data['hospitales'][i]['id_hospital'],'" id="inputMarco',i,'" minlength="1" placeholder="Monto Convenio para ',data['hospitales'][i]['nombre'],'" name="inputMarco',i,'" />');
              row = row.concat('\n<input type="text" class="form-control" id="inputHospital',i,'" name="inputHospital',i,'" value="',data['hospitales'][i]['id_hospital'],'" hidden>');
              row = row.concat('\n</div>');
              row = row.concat('\n<div class="form-group col-lg-2">');
              row = row.concat('\n<input type="number" class="form-control form-control-sm" data-id="',data['hospitales'][i]['id_hospital'],'" id="inputNum',i,'" minlength="1" placeholder="Ingrese un N° Resoluci&oacute;n" name="inputNum',i,'" />');
              row = row.concat('\n</div>');
              row = row.concat('\n<div class="form-group col-lg-2">');
              row = row.concat('\n<input type="date" class="form-control form-control-sm" data-id="',data['hospitales'][i]['id_hospital'],'" id="inputFecha',i,'" minlength="1" placeholder="Ingrese una Fecha Resoluci&oacute;n" name="inputFecha',i,'" />');
              row = row.concat('\n</div>');
              row = row.concat('\n<div class="form-group col-lg-3">');
              row = row.concat('\n<div class="custom-file">');
              row = row.concat('\n<input type="file" class="custom-file-input archivosMarcos" data-id="',data['hospitales'][i]['id_hospital'],'" id="inputAdjunto',i,'" minlength="1" placeholder="Ingrese un Archivo de Resoluci&oacute;n" name="inputAdjunto',i,'" lang="es" />');
              row = row.concat('\n<label class="custom-file-label" for="inputAdjunto',i,'" data-browse="Elegir" id="lAdjunto',i,'">Archivo Resoluci&oacute;n...</label>');
              row = row.concat('\n</div>');
              row = row.concat('\n</div>');
            }
            var div = document.getElementById('divComunasHospitalesD');
            div.innerHTML = row;
          }else
          {
            if (data['comunas'] != null && data['comunas'].length > 0) {
              $('#divComunasHospitalesD').html('');
              document.getElementById('cantidad').textContent = data['comunas'].length;
              var primero = true;
              var row = '';
              for (var i=0; i < data["comunas"].length; i++) {
                row = row.concat('\n<div class="form-group col-lg-3">');
                row = row.concat('\n<input class="form-control form-control-sm" type="text" placeholder="',data['comunas'][i]['nombre'],'" readonly disabled>');  
                row = row.concat('\n</div>');
                row = row.concat('\n<div class="form-group col-lg-2">');
                row = row.concat('\n<input type="number" class="form-control form-control-sm marcos_institucion" data-id="',data['comunas'][i]['id_comunas'],'" id="inputMarco',i,'" minlength="1" placeholder="Monto Convenio para ',data['comunas'][i]['nombre'],'" name="inputMarco',i,'" />');
                row = row.concat('\n<input type="text" class="form-control" id="inputComuna',i,'" name="inputComuna',i,'" value="',data['comunas'][i]['id_comunas'],'" hidden>');
                row = row.concat('\n</div>');

                row = row.concat('\n<div class="form-group col-lg-2">');
                row = row.concat('\n<input type="number" class="form-control form-control-sm" data-id="',data['comunas'][i]['id_comunas'],'" id="inputNum',i,'" minlength="1" placeholder="Ingrese un N° Resoluci&oacute;n" name="inputNum',i,'" />');
                row = row.concat('\n</div>');
                row = row.concat('\n<div class="form-group col-lg-2">');
                row = row.concat('\n<input type="date" class="form-control form-control-sm" data-id="',data['comunas'][i]['id_comunas'],'" id="inputFecha',i,'" minlength="1" placeholder="Ingrese una Fecha Resoluci&oacute;n" name="inputFecha',i,'" />');
                row = row.concat('\n</div>');
                row = row.concat('\n<div class="form-group col-lg-3">');
                row = row.concat('\n<div class="custom-file">');
                row = row.concat('\n<input type="file" class="custom-file-input archivosMarcos" data-id="',data['comunas'][i]['id_comunas'],'" id="inputAdjunto',i,'" minlength="1" placeholder="Ingrese un Archivo de Resoluci&oacute;n" name="inputAdjunto',i,'" lang="es" />');
                row = row.concat('\n<label class="custom-file-label" for="inputAdjunto',i,'" data-browse="Elegir" id="lAdjunto',i,'">Archivo Resoluci&oacute;n...</label>');
                row = row.concat('\n</div>');
                row = row.concat('\n</div>');
              }
              var div = document.getElementById('divComunasHospitalesD');
              div.innerHTML = row;
            }
          }
        }
      }
      });
    }

    loader.setAttribute('hidden', '');
    var element = document.getElementById('inputMarcoD');
    $(element).removeClass("is-invalid");
    if(element.className == "selectpicker invalid")
    {
      $(element.parentElement.children[1]).removeClass('form-control');
      $(element.parentElement.children[1]).removeClass('is-invalid');
    }

  });
  

   $('#listaSeleccionMarco').on('click', '.seleccionMarco', function(e) {
  //$(".seleccionPrograma").on('click', function(e) {
    var idMarco = $(e.currentTarget).data('id');
    var nombrePrograma = $(e.currentTarget).data('programa');
    var monto_restante = $(e.currentTarget).data('restante');
    var codigo_cuenta = $(e.currentTarget).data('codigo_cuenta');
    var nombre_cuenta = $(e.currentTarget).data('nombre_cuenta');
    var institucion = $(e.currentTarget).data('institucion');
    var id_institucion = $(e.currentTarget).data('id_institucion');
    var hospital = $(e.currentTarget).data('hospital');
    var comuna = $(e.currentTarget).data('comuna');

     if (comuna.trim().length > 0) {
        document.getElementById('tituloHC').textContent = "Comuna: ";
        document.getElementById('lnombreHC').textContent = comuna;
     }else{
        if (hospital.trim().length > 0) {
            document.getElementById('tituloHC').textContent = "Hospital: ";
            document.getElementById('lnombreHC').textContent = hospital;
         }else{
            document.getElementById('tituloHC').textContent = "";
            document.getElementById('lnombreHC').textContent = "";
         }
     }

    document.getElementById('programa_presupuesto').textContent = nombrePrograma;
    document.getElementById('monto_restante').textContent = '$ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(monto_restante);
    document.getElementById('cuenta_presupuesto').textContent = codigo_cuenta+' '+nombre_cuenta;
    document.getElementById('monto_restante').dataset.montoRestante = monto_restante;
    document.getElementById('lInstitucion').textContent = institucion;

    var presupuesto = $(e.currentTarget).data('restante');
    $('#inputMarco').val(nombrePrograma + ' - $ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(presupuesto));
    $('#idMarco').val(idMarco);
    var inputMarco = document.getElementById('idMarco');
    inputMarco.dataset.restante = monto_restante;
    $('#modalBuscarMarco').modal('hide');

     //var idMarco = $(e.currentTarget).data('id');
     //var nombrePrograma = $(e.currentTarget).data('nombre');
     //var clasificacion = $(e.currentTarget).data('clasificacion');
     //var monto_restante = $(e.currentTarget).data('restante');
     //var marco = $(e.currentTarget).data('restante');
     //var institucion = $(e.currentTarget).data('institucion');
     
     //$('#inputMarco').val(nombrePrograma + ' - $ ' + Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(presupuesto));
     //$('#idPresupuesto').val(idPresupuesto);

     //$('#idMarco').val(idMarco);
     //$('#inputMarco').val(nombrePrograma);

     /* var baseurl = (window.origin + '/Programa/listarComunasMarco');
      jQuery.ajax({
      type: "POST",
      url: baseurl,
      dataType: 'json',
      data: {marco: idMarco, institucion: id_institucion},
      success: function(data) {
        if (data)
        {     */
         /* $("#selectComunas").empty();
          var row = '';
          if(clasificacion == "PRAPS")
          {
            $('#lComunasHospitales').text('Comunas');
            $('#selectComunas').attr("placeholder", "Seleccione una Comuna");
            $('#selectComunas').attr("title", "Seleccione una Comuna");
            $('#selectComunas').selectpicker({title: 'Seleccione una Comuna'});
            for (var i = 0; i < data['comunas'].length; i++) {
              row = row.concat('\n<option value="',data['comunas'][i]["id_comuna"],'">',data['comunas'][i]["nombre"], '</option>');
            }
          }else{
            $('#lComunasHospitales').text('Hospitales');
            $('#selectComunas').attr("placeholder", "Seleccione un Hospital");
            $('#selectComunas').attr("title", "Seleccione un Hospital");
            $('#selectComunas').selectpicker({title: 'Seleccione un Hospital'});
            for (var i = 0; i < data['hospitales'].length; i++) {
              row = row.concat('\n<option value="',data['hospitales'][i]["id_hospital"],'">',data['hospitales'][i]["nombre"], '</option>');
            }
          }
          /*if(data['componentes'])
          {
            var dComponentes = document.getElementById('dComponentes');
            dComponentes.removeAttribute('hidden');

            var rowComponente = '';
            $("#selectComponentes").empty();
            for (var i = 0; i < data['componentes'].length; i++) {
              rowComponente = rowComponente.concat('\n<option value="',data['componentes'][i]["id_programa"],'">',data['componentes'][i]["nombre"], '</option>');
            }
            $("#selectComponentes").empty();
            $("#selectComponentes").append(rowComponente);
            $('#selectComponentes').selectpicker('refresh');
          }else{
            var dComponentes = document.getElementById('dComponentes');
            dComponentes.removeAttribute('hidden');
            dComponentes.setAttribute('hidden', '');
            $("#selectComponentes").empty();
            $('#selectComponentes').selectpicker('refresh');
          }*/
         /* $("#selectComunas").append(row);
          $('#selectComunas').selectpicker('refresh');*/
      /*  }
      }
    });*/
  });

  $("#agregarPrograma").submit(function(e) {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    /*$("div.loader").addClass('show');*/
    var validacion = $("#agregarPrograma").validate();
    if(validacion.numberOfInvalids() == 0)
    {
      event.preventDefault();
      var codigo = $('#inputCodigo').val();
      var nombre = $('#inputNombre').val();
      var observacion = $('#inputObservaciones').val();
      var idFormaPago = $('#formaPago').val();

      var idPrograma = null;
      if($("#inputIdPrograma").val())
        idPrograma = $('#inputIdPrograma').val();

      var baseurl = (window.origin + '/Programa/guardarPrograma');
      jQuery.ajax({
      type: "POST",
      url: baseurl,
      dataType: 'json',
      data: {idPrograma: idPrograma, codigo: codigo, nombre: nombre, observacion: observacion, idFormaPago: idFormaPago },
      success: function(data) {
        if (data)
        {
          //data = JSON.parse(data);
          if(data['resultado'] == '1')
          {
            $(document.getElementById('formaPago')).selectpicker('refresh');
            $('#tituloM').empty();
            $("#parrafoM").empty();
            $("#tituloM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
            $("#parrafoM").append(data['mensaje']);
            if(!$("#inputIdPrograma").val())
            {
              $("#agregarPrograma")[0].reset();
            }
            loader.setAttribute('hidden', '');
            $('#modalMensajePrograma').modal({
              show: true
            });
            feather.replace()
          }else{
            $('#tituloMP').empty();
            $("#parrafoMP").empty();
            $("#tituloMP").append('<i class="plusTituloError mb-2" data-feather="x-circle"></i> Error!!!');
            $("#parrafoMP").append(data['mensaje']);
            loader.setAttribute('hidden', '');
            $('#modalMensajePrograma').modal({
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

  function listarProgramas()
  {
    var baseurl = window.origin + '/Programa/listarProgramas';
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
        $('#tablaListaProgramas').html(myJSON.table_programas);
        feather.replace()
        $('#tablaProgramas').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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

  /*function listarConvenios()
  {
    var loader = document.getElementById("loader");
    loader.removeAttribute('hidden');
    idInstitucion = $("#institucionConvenio").val();
    idPrograma = $("#idProgramaConvenio").val();
    idEstado = $("#estadoConvenio").val();
    var baseurl = window.origin + '/Programa/listarConvenios'; 
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {institucion: idInstitucion, programa: idPrograma, estado: idEstado },
    success: function(data) {
    if (data)
    {
        //var table = $('#tListaConvenios').DataTable();
        //table.destroy();
        var myJSON= JSON.stringify(data);
        myJSON = JSON.parse(myJSON);
        $('#tablaListaConvenios').html(myJSON.table_convenios);
        feather.replace()
        $('#tListaConvenios').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip();
        loader.setAttribute('hidden', '');
      }
    }
    });
  }*/


  /*function listarMarcos()
  {
    var baseurl = window.origin + '/Programa/listarMarcos';

    idInstitucion = $("#institucionMarco").val();
    idPrograma = $("#idProgramaMarco").val();

    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {idInstitucion: idInstitucion, idPrograma: idPrograma},
    beforeSend: function(){
      var loader = document.getElementById("loader");
      loader.removeAttribute('hidden');
    },
    success: function(data) {
    if (data)
    {
        var myJSON= JSON.stringify(data);
        myJSON = JSON.parse(myJSON);
        $('#tablaListaMarcos').html(myJSON.table_marcos);
        feather.replace()
        $('#tListaMarcos').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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

        feather.replace();
        $('[data-toggle="tooltip"]').tooltip();
        loader.setAttribute('hidden', '');
      }
    }
    });
  }*/

  function listarPresupuestos()
  {
    var baseurl = window.origin + '/Programa/listarPresupuestos';
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
        $('#tablaListaPresupuestos').html(myJSON.table_presupuestos);
        feather.replace()
        $('#tListaPresupuestos').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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
        feather.replace()
        $('[data-toggle="tooltip"]').tooltip();

          //loader.setAttribute('hidden', '');
      }
    }
    });
  }

  $('#listaSeleccionMarco').on('click', '.pdfMarco', function(e) {
    var ruta = $(e.currentTarget).data('pdf');
    openPDF(ruta);
  });

  $('#tablaListaMarcos').on('click', '.pdfMarco', function(e) {
    var ruta = $(e.currentTarget).data('pdf');
    openPDF(ruta);
  });

  $('#tablaListaConvenios').on('click', '.pdfMarco', function(e) {
    var ruta = $(e.currentTarget).data('pdf');
    openPDF(ruta);
  });

  $('#tablaListaConveniosPendientes').on('click', '.pdfMarco', function(e) {
    var ruta = $(e.currentTarget).data('pdf');
    openPDF(ruta);
  });

  $('#tablaListaPresupuestos').on('click', '.pdfPresupuesto', function(e) {
    var ruta = $(e.currentTarget).data('pdf');
    openPDF(ruta);
  });

  $('#modalRevisarConvenio').on('click', '.pdfConvenioRevision', function(e) {
    var ruta = e.currentTarget.dataset.pdf;//$(e.currentTarget).data('pdf');
    openPDF(ruta);
  });

  function openPDF(pdf){
    window.open(pdf);
    return false;
  }

  

  $('#modalRevisarConvenio').on('click', '#btnAprobarConvenio, #btnRechazarConvenio', function(e) {
    var id_estado = (e.currentTarget.id == 'btnAprobarConvenio' ? 1 : 2);
    var id_convenio = document.getElementById('numConvenio').textContent;
    var observacion = document.getElementById('observacionesRevision').value;
    var baseurl = window.origin + '/Programa/aprobacionConvenio';
    jQuery.ajax({
    type: "POST",
    url: baseurl,
    dataType: 'json',
    data: {estado: id_estado, convenio: id_convenio, observacion: observacion },
    success: function(data) {
    if (data)
    {
        var myJSON= JSON.stringify(data);
        myJSON = JSON.parse(myJSON);
        dataJSON = data;
        //$('#tablaListaConveniosPendientes').html(myJSON.table_convenios);
        feather.replace()
        
        document.getElementById('numConvenio').textContent = '';
        document.getElementById('resolucionRevision').textContent = '';
        document.getElementById('programaRevision').textContent = '';
        document.getElementById('subtituloRevision').textContent = '';
        document.getElementById('institucionRevision').textContent = '';
        document.getElementById('hospitalRevision').textContent = '';
        document.getElementById('comunaRevision').textContent = '';
        document.getElementById('marcoRevision').textContent = '';
        document.getElementById('marcoDisponibleRevision').textContent = ' ';
        document.getElementById('convenioRevision').textContent = ' ';
        document.getElementById('marcoRestanteRevision').textContent = ' ';
        document.getElementById('nombreArchivoRevision').textContent = '';
        document.getElementById('pdfConvenioRevision').dataset.pdf = '';
        document.getElementById('observacionesRevision').value = '';

        var table = $('#tListaConveniosPendientes').DataTable();
        table.destroy();
        var loader = document.getElementById("loader");   
        
        var institucion = document.getElementById('institucionAC');
        if (jQuery.isEmptyObject(institucion))
          institucion = null;
        else
          institucion = institucion.value;

        var fecha_resolucion = document.getElementById('fechaResolucionAC');
         if (jQuery.isEmptyObject(fecha_resolucion))
          fecha_resolucion = null;
        else
          fecha_resolucion = fecha_resolucion.value;


        $('#tListaConveniosPendientes').dataTable({
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
          "serverSide": true,
           "ajax": 
           {
             "url":  window.origin + '/Programa/json_listarConvenios',
             "type": 'POST',
             "data": {
                      "idInstitucion": institucion,//document.getElementById('institucionMarco').value,
                      "idPrograma" : document.getElementById('idProgramaAC').value,
                      "fechaResolucion" : fecha_resolucion,
                      "idEstado": 3
                     }
           },
           searching: true,
           paging:         true,
           ordering:       false,
           info:           true,
           //"order": [[ 16, "desc" ]],
           /*columnDefs: [
             { targets: 'no-sort', orderable: false }
           ],*/
           //bDestroy:       true,
          //"type": 'POST',
          "aoColumnDefs" :  [
                              {"aTargets" : [0,1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                              {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                              {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                            ],

           "oLanguage": {
            /*"sProcessing":     function(){
            let timerInterval

            },*/
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
            lengthMenu: [[10, 20], [10, 20]]
         });
        $('#modalRevisarConvenio').modal('hide');

        $('#tituloCM').empty();
        $("#parrafoCM").empty();

        if (dataJSON.resultado >= 1) {
          $("#tituloCM").append('<i class="plusTitulo mb-2" data-feather="check"></i> Exito!!!');
        }else{
          $("#tituloCM").append('<i class="plusTituloError" data-feather="x-circle"></i> Error!!!');
        }
        
        $("#parrafoCM").append(dataJSON.mensaje);
        loader.setAttribute('hidden', '');
        //feather.replace()
        $('#modalMensajeConvenio').modal({
          show: true
        });

        feather.replace()
        $('[data-toggle="tooltip"]').tooltip();

          //loader.setAttribute('hidden', '');
      }
    }
    });

  });

  $('#tablaListaConveniosPendientes').on('click', '.view_convenio', function(e) {
    var id = $(e.currentTarget).data('id');
    var comuna = $(e.currentTarget).data('comuna');
    var programa = $(e.currentTarget).data('programa');
    var subtitulo = $(e.currentTarget).data('subtitulo');
    var institucion = $(e.currentTarget).data('institucion');
    var codigo = $(e.currentTarget).data('codigo');
    var institucion = $(e.currentTarget).data('institucion');
    var hospital = $(e.currentTarget).data('hospital');
    var fecha = $(e.currentTarget).data('fecha');
    var marco = $(e.currentTarget).data('marco');
    var marco_disponible = $(e.currentTarget).data('marco_disponible');
    var convenio = $(e.currentTarget).data('convenio');
    var marco_restante = $(e.currentTarget).data('marco_restante');
    var fecha_resolucion = $(e.currentTarget).data('fecha_resolucion');
    var pdf = $(e.currentTarget).data('pdf');
    var nombre_archivo = $(e.currentTarget).data('nombre_archivo');
    var todo = 'datos '.concat(id,' - ', comuna,' - ', programa,' - ', codigo,' - ', institucion,' - ', fecha,' - ', marco,' - ', marco_disponible,' - ', convenio,' - ', marco_restante,' - ', pdf);
    //alert(todo);
    document.getElementById('numConvenio').textContent = id;
    document.getElementById('resolucionRevision').textContent = codigo;
    document.getElementById('programaRevision').textContent = programa;
    document.getElementById('subtituloRevision').textContent = subtitulo;    
    document.getElementById('institucionRevision').textContent = institucion;
    document.getElementById('hospitalRevision').textContent = hospital;
    document.getElementById('comunaRevision').textContent = comuna;
    document.getElementById('marcoRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(marco));
    document.getElementById('marcoDisponibleRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(marco_disponible));
    document.getElementById('convenioRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(convenio));
    document.getElementById('marcoRestanteRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(marco_restante));
    document.getElementById('fechaResolucion').textContent = fecha_resolucion;
    document.getElementById('nombreArchivoRevision').textContent = nombre_archivo;
    document.getElementById('pdfConvenioRevision').dataset.pdf = pdf;
    if (nombre_archivo.length == 0) {
      document.getElementById('pdfConvenioRevision').setAttribute("hidden", "");
    }else{
      document.getElementById('pdfConvenioRevision').removeAttribute("hidden");
    }

    $('#modalRevisarConvenio').modal('show');

  });

  $('#tablaListaConvenios').on('click', '.view_convenio', function(e) {
    var id = $(e.currentTarget).data('id');
    var comuna = $(e.currentTarget).data('comuna');
    var programa = $(e.currentTarget).data('programa');
    var subtitulo = $(e.currentTarget).data('subtitulo');
    var institucion = $(e.currentTarget).data('institucion');
    var codigo = $(e.currentTarget).data('codigo');
    var institucion = $(e.currentTarget).data('institucion');
    var hospital = $(e.currentTarget).data('hospital');
    var fecha = $(e.currentTarget).data('fecha');
    var marco = $(e.currentTarget).data('marco');
    var marco_disponible = $(e.currentTarget).data('marco_disponible');
    var convenio = $(e.currentTarget).data('convenio');
    var marco_restante = $(e.currentTarget).data('marco_restante');
    var pdf = $(e.currentTarget).data('pdf');
    var fecha_resolucion = $(e.currentTarget).data('fecha_resolucion');
    var nombre_archivo = $(e.currentTarget).data('nombre_archivo');
    var fecha_revision = $(e.currentTarget).data('fecha_revision');
    var observacion_revision = $(e.currentTarget).data('observacion_revision');
    var usuario_revision = $(e.currentTarget).data('usuario_revision');
    var id_estado_revision = $(e.currentTarget).data('id_estado_revision');
    //alert(todo);
    document.getElementById('numConvenio').textContent = id;
    document.getElementById('resolucionRevision').textContent = codigo;
    document.getElementById('programaRevision').textContent = programa;
    document.getElementById('subtituloRevision').textContent = subtitulo;
    document.getElementById('institucionRevision').textContent = institucion;
    document.getElementById('hospitalRevision').textContent = hospital;
    document.getElementById('comunaRevision').textContent = comuna;
    document.getElementById('marcoRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(marco));
    document.getElementById('marcoDisponibleRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(marco_disponible));
    document.getElementById('convenioRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(convenio));
    document.getElementById('marcoRestanteRevision').textContent = '$ '.concat(Intl.NumberFormat("de-DE", {minimumFractionDigits: 0}).format(marco_restante));
    document.getElementById('fechaResolucion').textContent = fecha_resolucion;
    document.getElementById('nombreArchivoRevision').textContent = nombre_archivo;
    document.getElementById('pdfConvenioRevision').dataset.pdf = pdf;
    document.getElementById('fechaRevision').textContent = fecha_revision;
    document.getElementById('usuarioRevision').textContent = usuario_revision;
    document.getElementById('observacionRevision').textContent = observacion_revision;
    document.getElementById('estadoRevision').textContent = (id_estado_revision == "1" ? 'Aprobado' : (id_estado_revision == 3 ? 'Pendiente de Aprobacion' : 'Rechazado'));

    if (id_estado_revision == "1" || id_estado_revision == "3") {
      document.getElementById('divMarcoRestante').classList.add('sr-only');
    }else{
      document.getElementById('divMarcoRestante').classList.remove('sr-only');
    }

    document.getElementById('estadoRevision').classList.remove('badge-success');
    document.getElementById('estadoRevision').classList.remove('badge-danger');
    document.getElementById('estadoRevision').classList.remove('badge-warning');
    document.getElementById('estadoRevision').classList.add((id_estado_revision == "1" ? 'badge-success' : (id_estado_revision == 3 ? 'badge-warning' : 'badge-danger')));


    if (nombre_archivo.length == 0) {
      document.getElementById('pdfConvenioRevision').setAttribute("hidden", "");
    }else{
      document.getElementById('pdfConvenioRevision').removeAttribute("hidden");
    }

    $('#modalRevisarConvenio').modal('show');

  });
});

function listarConvenios(){
      var loader = document.getElementById("loader");
      
      var institucion = document.getElementById('institucionConvenio');
      if (jQuery.isEmptyObject(institucion))
        institucion = null;
      else
        institucion = institucion.value;

      var programa = document.getElementById('idProgramaConvenio');
      if(jQuery.isEmptyObject(programa))
        programa = null;
      else
        programa = programa.value;

      var fechaDesde = document.getElementById('fechaDesde');
      if(jQuery.isEmptyObject(fechaDesde))
        fechaDesde = null;
      else
        fechaDesde = fechaDesde.value;

      var fechaHasta = document.getElementById('fechaHasta');
      if(jQuery.isEmptyObject(fechaHasta))
        fechaHasta = null;
      else
        fechaHasta = fechaHasta.value;

      var table = $('#tListaConvenios').DataTable();
      table.destroy();
      $('#tListaConvenios').dataTable({
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
        "serverSide": true,
         "ajax": 
         {
           "url":  window.origin + '/Programa/json_listarConvenios',
           "type": 'POST',
           "data": {
                    "idInstitucion": institucion,
                    "idPrograma" : programa,
                    "fechaDesde" : fechaDesde,
                    "fechaHasta" : fechaHasta,
                    "idPrograma" : programa,
                    "idEstado": document.getElementById('estadoConvenio').value,
                   }
         },
         searching: true,
         paging:         true,
         ordering:       false,
         info:           true,
         //"order": [[ 16, "desc" ]],
         /*columnDefs: [
           { targets: 'no-sort', orderable: false }
         ],*/
         //bDestroy:       true,
        //"type": 'POST',
        "aoColumnDefs" :  [
                            {"aTargets" : [1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                            {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                            {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                          ],

         "oLanguage": {
          /*"sProcessing":     function(){
          let timerInterval

          },*/
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
          lengthMenu: [[10, 20], [10, 20]]
       });
    }

window.onload = function () {

    $('#tListaArchivosMarco').dataTable({
        searching: true,
        paging:         true,
        ordering:       true,
        info:           true,
        columnDefs: [
          { targets: 'no-sort', orderable: false }
        ],
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

    

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarMarcos'.toLowerCase())
    {
        $('#tListaMarcos').dataTable({
          "fnDrawCallback": function( oSettings ) {
            feather.replace();
            var loader = document.getElementById("loader");
            loader.setAttribute('hidden', '');
            $('[data-toggle="tooltip"]').tooltip();
          },
          "preDrawCallback": function( settings ) {
            var loader = document.getElementById("loader");
            loader.removeAttribute('hidden');
          },
          "processing": false,
          "serverSide": true,
           "ajax": 
           {
             "url":  window.origin + '/Programa/json_listarMarcos',
             "type": 'POST',
             "data": {
                      "idInstitucion": document.getElementById('institucionMarco').value,
                      "idPrograma" : $("#idProgramaMarco").val(),
                     }
           },
           searching: true,
           paging:         true,
           ordering:       false,
           info:           true,
           //"order": [[ 16, "desc" ]],
           /*columnDefs: [
             { targets: 'no-sort', orderable: false }
           ],*/
           //bDestroy:       true,
          //"type": 'POST',
          "aoColumnDefs" :  [
                              {"aTargets" : [1,2,3,4,5,6,7], "sClass":  "text-center align-middle registro"},
                              {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                              {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                            ],

           "oLanguage": {
            /*"sProcessing":     function(){
            let timerInterval

            },*/
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
            lengthMenu: [[10, 20], [10, 20]]
         });

        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarConvenios'.toLowerCase())
    {
        listarConvenios();
        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'aprobacionConvenio'.toLowerCase())
    {
        var loader = document.getElementById("loader");   
        var institucion = document.getElementById('institucionAC');
        if (jQuery.isEmptyObject(institucion))
          institucion = null;
        else
          institucion = institucion.value;

        var fecha_resolucion = document.getElementById('fechaResolucionAC');
        if (jQuery.isEmptyObject(fecha_resolucion))
          fecha_resolucion = null;
        else
          fecha_resolucion = fecha_resolucion.value;

        $('#tListaConveniosPendientes').dataTable({
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
          "serverSide": true,
           "ajax": 
           {
             "url":  window.origin + '/Programa/json_listarConvenios',
             "type": 'POST',
             "data": {
                      "idInstitucion": institucion,
                      "idPrograma" : document.getElementById('idProgramaAC').value,
                      "fechaResolucion" : fecha_resolucion,
                      "idEstado": 3
                     }
           },
           searching: true,
           paging:         true,
           ordering:       false,
           info:           true,
           //"order": [[ 16, "desc" ]],
           /*columnDefs: [
             { targets: 'no-sort', orderable: false }
           ],*/
           //bDestroy:       true,
          //"type": 'POST',
          "aoColumnDefs" :  [
                              {"aTargets" : [0,1,2,3,4,5,6,7,8,9,10,11], "sClass":  "text-center align-middle registro"},
                              {"aTargets" : [8], "sClass":  "text-center align-middle registro botonTabla paginate_button"},
                              {"aTargets" : [9], "sClass":  "text-center align-middle registro botonTabla"},
                            ],

           "oLanguage": {
            /*"sProcessing":     function(){
            let timerInterval

            },*/
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
            lengthMenu: [[10, 20], [10, 20]]
         });

        feather.replace();
    }

    if(window.location.pathname.split('/')[2].toLowerCase() == 'listarPresupuestos'.toLowerCase())
    {
        $('#tListaPresupuestos').dataTable({
            searching: true,
            paging:         true,
            ordering:       true,
            info:           true,
            columnDefs: [
              { targets: 'no-sort', orderable: false }
            ],
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
    
    $('[data-toggle="tooltip"]').tooltip();
    feather.replace()
 }