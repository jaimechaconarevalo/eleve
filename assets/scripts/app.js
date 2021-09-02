$('.loading').hide();
$('.again').hide();
$('.result').hide();
$('.info-doc').hide();
$('.cameras').hide();
$('.api-call').hide();

var documentData = {
    'national identification number': '',
    'document number': '',
    'name': '',
    'family name': '',
    'gender': '',
    'nationality': '',
    'date of birth': '',
    'expiration date': ''
};

var cedula_mrz = {
    'national identification number':'',
    'document number':'',
    'name':'',
    'family name':'',
    'gender':'',
    'nationality': '',
    'date of birth':'',
    'expiration date':''
};

var direction = '';
var app_locale = '';
var locale = '';

$(document).ready(function() {
    setNavigationNumbers();
    /*$('#rootwizard').bootstrapWizard({
        withVisible: false,
        'tabClass': 'nav nav-pills',
        onTabShow: function(tab, navigation, index) {
            current_tabpane = $('.api').find('.tab-pane.active.show');
            current_tabpane_id = current_tabpane.attr('id');
            $('.pager li').show();
            var stepNumber = index + 1;
            $('ul.nav-pills li a span').removeClass('badge-dark').addClass('badge-outline-dark');
            $('ul.nav-pills li a span').removeClass('active');
            tab.children().children().removeClass('badge-outline-dark').addClass('badge-dark active');
            if (index == 0) {
                $('.pager li.previous').hide();
            } else if (stepNumber == navigation.children().length) {
                $('.pager li.next').hide();
            } else {
                $('.pager li').show();
            }
        },
        onNext: function(tab, navigation, index) { },
        onPrevious: function(tab, navigation, index) { }
    });*/

    if (!DetectRTC.isMobileDevice) {
        if (DetectRTC.isWebRTCSupported) {
            console.log('Browser Support WebRTC')
            navigator.mediaDevices.enumerateDevices().then(function (devices) {
                for(var i = 0; i < devices.length; i ++){
                    var device = devices[i];
                    if (device.kind === 'videoinput') {
                        var option = document.createElement('option');
                        option.value = device.deviceId;
                        option.text = device.label || 'camera ' + (i + 1);
                        document.querySelector('select#videoSource').appendChild(option);
                    }
                };
                setVideoStream($('#videoSource').val());
            });
            $('input[type="file"]').detach();
            $('label.images').detach();
        } else {
            console.log('This Browser Not Support WebRTC');
            bootbox.alert(lang[app_locale]['webrtc_fail']);
            $('.api').detach();
            $('.supported').show();
        }
    } else {
        $('#video-stream').detach();
        $('.cameras').detach();
        $('a.take-photo.btn.btn-secondary').detach();
    }
});

$('body').on('click', '.api-call', function(event) {
    event.preventDefault();
    resetData();
    cleanDataUI();
    $('.loading').show();
    var data_valid = false;
    var documentType = $('select#documentType').val();
    if (documentType != 0 && documentType != 'ONLYFACE') {
        var id_front = $('input[name="id_front"]').val();
        var id_back = $('input[name="id_back"]').val();
        var selfie = $('input[name="selfie"]').val();
        var latitude = '';
        var longitude = '';
        var idTraspaso = '';
        if (id_front.length > 0 && id_back.length > 0 && selfie.length > 0 && documentType != 'PASS') {
            data_valid = true;
        } else if (id_front.length > 0 && selfie.length > 0 && documentType == 'PASS') {
            data_valid = true;
        }
        if (data_valid) {
             if($('input[name="id_traspaso"]').val())
                idTraspaso = $('input[name="id_traspaso"]').val();

            if ("geolocation" in navigator){ //check geolocation available 
                //try to get user current location using getCurrentPosition() method
                navigator.geolocation.getCurrentPosition(function(position){ 
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                });
            }

            var form_data = new FormData();
            form_data.append('id_front', dataURItoBlob(id_front));
            form_data.append('id_back', dataURItoBlob(id_back));
            form_data.append('selfie', dataURItoBlob(selfie));
            form_data.append('documentType', documentType);
            form_data.append('idTraspaso', idTraspaso);
            form_data.append('latitude', latitude);
            form_data.append('longitude', longitude);
            $.ajax({
                url: window.origin + '/TOC/Traspaso/verificarIdentidad',
                async: true,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                //dataType: 'json',
                data: form_data
            })
            .done(function(data) {
                console.log(data);
               // data = JSON.parse(data);
                var status_class = '';
                var result_text = '';
                var result_text_locale = '';
                var mrz = null;
                var code = null;
                var ocr = null;
                var type = null;
                var checksum_result = '';
                var checksum_result_locale = '';
                if (data.status == '200') {
                    if (typeof(data["information from document"]) != 'undefined' && data["information from document"].length != 0) {
                        mrz = (typeof(data["information from document"]).mrz != 'undefined') ? data["information from document"].mrz : null;
                        type = data["information from document"].type;
                        // resultado biométrico
                        if (parseFloat(data["biometric result"]) > 1) {
                            result_class = 'text-success';
                            result_text = lang[app_locale]['positive'];
                            result_text_locale = 'positive';
                            $('.match .card-body .positive').show();
                        } else if (parseFloat(data["biometric result"]) == 1) {
                            result_class = 'text-warning';
                            result_text = lang[app_locale]['positive'];
                            result_text_locale = 'positive';
                            $('.match .card-body .warning').show();
                        } else if (parseFloat(data["biometric result"]) < 0) {
                            result_class = 'text-danger';
                            result_text = lang[app_locale]['no_face'];
                            result_text_locale = 'no_face';
                            $('.match .card-body .negative').show();
                        } else if (parseFloat(data["biometric result"]) == 0) {
                            result_class = 'text-danger';
                            result_text = lang[app_locale]['negative'];
                            result_text_locale = 'negative';
                            $('.match .card-body .negative').show();
                        }
                        $('h5.token span.badge-light').text(data.toc_token);
                        $('.card.match .card-body h5 span.confidence').append(result_text).addClass(result_class).attr('data-localize', result_text_locale);
                        if (mrz != null && typeof(mrz) != 'undefined' && typeof(mrz.checksum) != 'undefined') {
                            if (mrz.checksum == '1') {
                                checksum_result = lang[app_locale]['checksum_positive'] + '_badge-success';
                                checksum_result_locale = 'checksum_positivo';
                            } else {
                                checksum_result = lang[app_locale]['checksum_negative'] + '_badge-warning';
                                checksum_result_locale = 'checksum_negative';
                                if (typeof(mrz.raw) != 'undefined') {
                                    processRawMRZ(mrz.raw);
                                    $('h6.mrz-raw').show();
                                }
                            }
                        }
                        checksum_result = checksum_result.split('_');
                        $('p.mrz-check span.verify-doc').text(checksum_result[0]).addClass(checksum_result[1]).attr('data-localize', checksum_result_locale);
                        if (typeof(data["information from document"].code) != 'undefined' && data["information from document"].code.length != 0) {
                            code = data["information from document"].code;
                            if (typeof(code["document status"]) != 'undefined' && code["document status"].length != 0) {
                                // Crear link de registro civil para cédula nueva
                                if (documentType == 'CHL1' || documentType == 'CHL2') {
                                    $('a.link-rc').attr({href: code["document status"], target: '_blank'}).show();
                                }
                            }
                            if (documentType == 'DCAN') { // Documento canadiense licencia conducir objeto de datos
                                $('.info-doc .card-body p.mrz-check').hide();
                                $('.info-doc .card-body ul.list-group-flush.mrz-data').hide();
                                $.each(code.data, function(index, el) {
                                    var data = '<li class="list-group-item">' + index + ': <strong>' + el + '</strong></li>';
                                    $('.info-doc .card-body ul.list-group-flush.data').append(data);
                                });
                                $('.info-doc .card-body ul.list-group-flush.data').show();
                            } else if (documentType == 'GBR1') { // Documento Reino unido con OCR objeto de datos
                                $('.info-doc .card-body p.mrz-check').hide();
                                $('.info-doc .card-body ul.list-group-flush.mrz-data').hide();
                                $.each(ocr.data, function(index, el) {
                                    var data = '<li class="list-group-item">' + index + ': <strong>' + el + '</strong></li>';
                                    $('.info-doc .card-body ul.list-group-flush.data').append(data);
                                });
                                $('.info-doc .card-body ul.list-group-flush.data').show();
                            } else { // Documentos con objeto de datos estándar
                                if (mrz != null && typeof(mrz.data) != 'undefined') {
                                    setDocumentData(code, mrz.data);
                                } else {
                                    setDocumentData(code, cedula_mrz);
                                }
                            }
                        } else {
                            // MRZ sin lectura de código
                            if (mrz != null && typeof(mrz.data) != 'undefined') {
                                setDocumentData('', mrz.data);
                            } else {
                                setDocumentData('', cedula_mrz);
                            }
                        }
                        setDataUI();
                    }
                    $('.loading').hide();
                    $('.result').show();
                    $('.info-doc').show();
                    $('a#result-tab').tab('show');
                    $('.api-call').hide();
                    $('.pager li.previous').hide();
                    $('.pager li.next').hide();
                    $('.pager li.next').hide();
                    //$('.again').show();
                } else {
                    if (typeof(data["information from document"]).mrz != 'undefined') {
                        mrz = data["information from document"].mrz;
                        mrzError = (mrz === 0) ? true : false;
                    }
                    if (data.status == '201') {
                        (mrzError) ? displayErrorApi(false, false, false) : displayErrorApi(false, true, false);
                    } else if (data.status == '202') {
                        (documentType == 'PASS') ? displayErrorApi(false, true, true) : displayErrorApi(true, false, true);
                    } else if (data.status == '203') {
                        displayErrorApi(false, false, false);
                    } else if (data.status == '431') {
                        (mrzError) ? displayErrorApi(false, false, false) : displayErrorApi(false, true, false);
                    } else {
                        (mrzError) ? displayErrorApi(false, false, false) : displayErrorApi(false, true, false);
                    }
                    (typeof(data.toc_token) != 'undefined') ? $('h6.token span.badge-light').text(data.toc_token) : '';
                    $('.loading').hide();
                }

                    var id_traspaso = $('input[name="id_traspaso"]').val();

                    if ("geolocation" in navigator){ //check geolocation available 
                        //try to get user current location using getCurrentPosition() method
                        navigator.geolocation.getCurrentPosition(function(position){ 
                            latitude = position.coords.latitude;
                            longitude = position.coords.longitude;
                        });
                    }
                    
                    var biometric_result = '';
                    var checksum = '';
                    var date_of_birth = '';
                    var document_number = '';
                    var expiration_date = '';
                    var family_name = '';
                    var gender = '';
                    var name = '';
                    var national_identification_number = '';
                    var nationality = '';
                    var raw = '';
                    var type = '';
                    var status = '';
                    var toc_token = '';

                    var status_pdf = '';
                    var signed_pdf = '';
                    var toc_token_pdf = '';

                    var apellidos_cliente = '';
                    var celular_cliente = '';
                    var email_cliente = '';
                    var id_cliente = '';
                    var nombre_cliente = '';
                    var run_cliente = '';

                    if(data.hasOwnProperty('biometric result'))
                        biometric_result =  data["biometric result"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz'))
                        if(data["information from document"]["mrz"].hasOwnProperty("checksum"))
                            checksum = data["information from document"]["mrz"]["checksum"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("date of birth"))
                            date_of_birth = data["information from document"]["mrz"]["data"]["date of birth"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("document number"))
                            document_number = data["information from document"]["mrz"]["data"]["document number"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("expiration date"))
                            expiration_date = data["information from document"]["mrz"]["data"]["expiration date"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("family name"))
                            family_name = data["information from document"]["mrz"]["data"]["family name"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("gender"))
                            gender = data["information from document"]["mrz"]["data"]["gender"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("name"))
                            name = data["information from document"]["mrz"]["data"]["name"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("national identification number"))
                            national_identification_number = data["information from document"]["mrz"]["data"]["national identification number"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz') && data["information from document"]["mrz"].hasOwnProperty("data"))
                        if(data["information from document"]["mrz"]['data'].hasOwnProperty("nationality"))
                            nationality = data["information from document"]["mrz"]["data"]["nationality"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('mrz'))
                        if(data["information from document"]["mrz"].hasOwnProperty("raw"))
                            raw = data["information from document"]["mrz"]["raw"];

                    if(data.hasOwnProperty('information from document') && data["information from document"].hasOwnProperty('type'))
                        type = data["information from document"]["type"];

                    if(data.hasOwnProperty('status'))
                        status =  data["status"];

                    if(data.hasOwnProperty('toc_token'))
                        toc_token =  data["toc_token"];

                    if(data.hasOwnProperty('document'))
                    {
                        data.document = JSON.parse(data.document);
                        if(data.document.hasOwnProperty('signed pdf') && data.document.hasOwnProperty('status') && data.document["status"] == '200')
                        {
                            status_pdf = data.document["status"];
                            signed_pdf = data.document["signed pdf"];
                            toc_token_pdf = data.document["toc_token"];
                            /*const linkSource = `data:application/pdf;base64,${signed_pdf}`;
                            const downloadLink = document.createElement("a");
                            const fileName = "verificacion_valida.pdf";
                            downloadLink.href = linkSource;
                            downloadLink.download = fileName;
                            downloadLink.click();*/
                        }
                    }

                    if(data.hasOwnProperty('cliente'))
                    {
                        data.cliente = JSON.parse(data.cliente);
                        if(data.cliente.hasOwnProperty('apellidos_cliente') && data.cliente.hasOwnProperty('celular_cliente') &&
                           data.cliente.hasOwnProperty('email_cliente') && data.cliente.hasOwnProperty('id_cliente') &&
                           data.cliente.hasOwnProperty('nombre_cliente') && data.cliente.hasOwnProperty('run_cliente')
                           )
                        {
                            apellidos_cliente = data.cliente["apellidos_cliente"];
                            celular_cliente = data.cliente["celular_cliente"];
                            email_cliente = data.cliente["email_cliente"];
                            id_cliente = data.cliente["id_cliente"];
                            nombre_cliente = data.cliente["nombre_cliente"];
                            run_cliente = data.cliente["run_cliente"];
                        }
                    }

                    var datos = {
                        id_traspaso: id_traspaso,
                        id_front: id_front,
                        id_back: id_back,
                        selfie: selfie,
                        biometric_result: biometric_result,
                        checksum: checksum,
                        date_of_birth: date_of_birth,
                        document_number: document_number,
                        expiration_date: expiration_date,
                        family_name: family_name,
                        gender: gender,
                        name: name,
                        national_identification_number: national_identification_number,
                        nationality: nationality,
                        raw: raw,
                        type: type,
                        status: status,
                        toc_token: toc_token,
                        latitude: latitude,
                        longitude: longitude,
                        status_pdf: status_pdf,
                        signed_pdf: signed_pdf,
                        toc_token_pdf: toc_token_pdf
                    };

                    var loader = document.getElementById("loader");
                    //loader.removeAttribute('hidden');
                    /*$("div.loader").addClass('show');*/
                    event.preventDefault();

                    var baseurl = (window.origin + '/TOC/Traspaso/usuarioValido');
                    $('.pager li.next').hide();


                    jQuery.ajax({
                    type: "POST",
                    url: baseurl,
                    dataType: 'json',
                    data: { datos: datos },
                    success: function(datosUsuario) {
                    if (datosUsuario)
                    {
                      //data = JSON.parse(data);
                      

                      $sub_titulo = 'Estimado ' + nombre_cliente + ' ' + apellidos_cliente + ', su solicitud ha sido aprobada con exito, se ha enviado un comprobante a su casilla de correo con el documento firmado electrónicamente.';
                      $(document.getElementById('sub_titulo_resultado')).text($sub_titulo);
                      $(document.getElementById('header')).hide();                      
                      $(document.getElementById('apiTab')).hide();
                      $('.pager li.previous').hide();
                      $('.pager li.next').hide();
                      
                    }
                    }
                    });

            }).fail(function(data) {
                console.log(data);
                console.log("error");
                bootbox.alert('Ocurrió un error al consultar la API Facial. Por favor, inténtelo nuevamente.');
                $('.loading').hide();
            });
        } else {
            $('.loading').hide();
            bootbox.alert('Alguna de las 3 imágenes no tiene datos válidos.');
        }
    } else if (documentType === 'ONLYFACE') {
        var id_front = $('input[name="id_front"]').val();
        var selfie = $('input[name="selfie"]').val();
        if (id_front.length > 0 && selfie.length > 0) {
            data_valid = true;
        }
        if (data_valid) {
            var form_data = new FormData();
            form_data.append('photo1', dataURItoBlob(id_front));
            form_data.append('photo2', dataURItoBlob(selfie));
            $.ajax({
                url: window.origin + '/TOC/Traspaso/verificarIdentidad',
                async: true,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                dataType: 'json',
                data: form_data
            })
            .done(function(data) {
                console.log(data);
                var status_class = '';
                var result_text = '';
                var result_text_locale = '';
                var type = null;
                if (data.status == '200') {
                    // resultado biométrico
                    if (parseFloat(data["biometric result"]) > 1) {
                        result_class = 'text-success';
                        result_text = lang[app_locale]['positive'];
                        result_text_locale = 'positive';
                        $('.match .card-body .positive').show();
                    } else if (parseFloat(data["biometric result"]) == 1) {
                        result_class = 'text-warning';
                        result_text = lang[app_locale]['positive'];
                        result_text_locale = 'positive';
                        $('.match .card-body .warning').show();
                    } else if (parseFloat(data["biometric result"]) < 0) {
                        result_class = 'text-danger';
                        result_text = lang[app_locale]['no_face'];
                        result_text_locale = 'no_face';
                        $('.match .card-body .negative').show();
                    } else if (parseFloat(data["biometric result"]) == 0) {
                        result_class = 'text-danger';
                        result_text = lang[app_locale]['negative'];
                        result_text_locale = 'negative';
                        $('.match .card-body .negative').show();
                    }
                    // $('.info-doc h6 span.status').text('OK, proceso exitoso');
                    $('h5.token span.badge-light').text(data.toc_token);
                    $('.card.match .card-body h5 span.confidence').append(result_text).addClass(result_class).attr('data-localize', result_text_locale);
                    $('.loading').hide();
                    $('.result').show();
                    $('a#result-tab').tab('show');
                    $('.api-call').hide();
                    $('.again').show();

                     var id_traspaso = $('input[name="id_traspaso"]').val();

                    if ("geolocation" in navigator){ //check geolocation available 
                        //try to get user current location using getCurrentPosition() method
                        navigator.geolocation.getCurrentPosition(function(position){ 
                            latitude = position.coords.latitude;
                            longitude = position.coords.longitude;
                        });
                    }
                    
                    var datos = {
                        id_traspaso: id_traspaso,
                        id_front: id_front,
                        id_back: id_back,
                        selfie: selfie,
                        biometric_result: data["biometric result"],
                        checksum: data["information from document"]["mrz"]["checksum"],
                        date_of_birth: data["information from document"]["mrz"]["data"]["date of birth"],
                        document_number: data["information from document"]["mrz"]["data"]["document number"],
                        expiration_date: data["information from document"]["mrz"]["data"]["expiration date"],
                        family_name: data["information from document"]["mrz"]["data"]["family name"],
                        gender: data["information from document"]["mrz"]["data"]["gender"],
                        name: data["information from document"]["mrz"]["data"]["name"],
                        national_identification_number: data["information from document"]["mrz"]["data"]["national identification number"],
                        nationality: data["information from document"]["mrz"]["data"]["nationality"],
                        raw: data["information from document"]["mrz"]["raw"],
                        type: data["information from document"]["type"],
                        status: data["status"],
                        toc_token: data["toc_token"],
                        latitude: latitude,
                        longitude: longitude
                    };

               
                    var loader = document.getElementById("loader");
                    loader.removeAttribute('hidden');
                    /*$("div.loader").addClass('show');*/
                    event.preventDefault();

                    var baseurl = (window.origin + '/TOC/Traspaso/usuarioValido');

                    /*jQuery.ajax({
                    type: "POST",
                    url: baseurl,
                    dataType: 'json',
                    data: { datos: datos },
                    success: function(data) {
                    if (data)
                    {
                      //data = JSON.parse(data);
                      
                    }
                    }
                    });*/


                }else {
                    if (data.status == '201') {
                        displayErrorApi(false, true, false);
                    } else if (data.status == '202') {
                        displayErrorApi(true, false, true);
                    } else if (data.status == '203') {
                        displayErrorApi(false, false, false);
                    } else if (data.status == '431') {
                        displayErrorApi(false, true, false);
                    } else {
                        displayErrorApi(true, false, true);
                    }
                    (typeof(data.toc_token) != 'undefined') ? $('h6.token span.badge-light').text(data.toc_token) : '';
                    $('.loading').hide();
                }
            }).fail(function(data) {
                console.log(data);
                console.log("error");
                // TODO: códigos
                bootbox.alert('Ocurrió un error al consultar la API Facial. Por favor, inténtelo nuevamente.');
                $('.loading').hide();
            });
        } else {
            // TODO: códigos
            $('.loading').hide();
            bootbox.alert('Alguna de las 2 imágenes no tiene datos válidos.');
        }
    }
});


function actualizarTraspaso(datos)
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
