// Función que actualiza números de los pasos del proceso
function setNavigationNumbers() {
    var liTabs = $('#apiTab > li:visible');
    $.each(liTabs, function(index, el) {
        $(this).children('a').children('span').text(index + 1);
    });
}

// Función que define los pasos del proceso según tipo de documento
function setAppSteps() {
    switch ($('#documentType').val()) {
        case 'ONLYFACE':
            $('#back-tab').parent().hide();
            $('fieldset#front').children('h2').text(lang[app_locale]['selfie_title']);
            $('fieldset#front').children('h3').text(lang[app_locale]['selfie_subtitle']);
        break;
        case 'PASS':
            $('#back-tab').parent().hide();
        break;
        default:
            $('#back-tab').parent().show();
            $('fieldset#front').children('h2').text(lang[app_locale]['document_front_title']);
            $('fieldset#front').children('h3').text(lang[app_locale]['document_front_subtitle']);

    }
    setNavigationNumbers();
}

// Función que bloquea fieldset por validación
function blockFieldset(id, message) {
    $('fieldset' + id).shake({interval: 50, distance: 15, times: 5});
    bootbox.alert(message);
}

// Función que actualiza el stream de video para sacar fotos
function refreshVideoStream(id, retake) {
    if ($(id + '-video' + ' #video-stream').length == 0) {
        $(id + '-video').append(document.getElementById('video-stream'));
    }
    setVideoStream($('#videoSource').val());
    if ($(id + '-video').siblings('img').attr('src').length == 0 || retake) {
        ($('#video-stream').is(':hidden')) ? $('#video-stream').show() : '';
        $('.btn.rotate').hide();
        $(id + '-video').siblings('img').hide();
        $('fieldset' + id).children('.take-photo').removeClass('retake').children('span').text(lang[app_locale]['photo']);
    } else {
        ($('#video-stream').is(':visible')) ? $('#video-stream').hide() : '';
        $('.btn.rotate').show();
        $('.next').show();
        $(id + '-video').siblings('img').show();
    }
}

// Función que verifica que toda la información para llamar a la API sea correcta
function checkApiFormData() {
    errorData = true;
    documentType = 'CHL2';//$('select#documentType').val();
    if (documentType.length > 0) {
        switch (documentType) {
            case 'PASS':
            case 'ONLYFACE':
                if ($('input[name="id_front"]').val().length > 0 && $('input[name="selfie"]').val().length > 0) {
                    errorData = false;
                }
            break;
            default:
                if ($('input[name="id_front"]').val().length > 0 && $('input[name="id_back"]').val().length > 0
                  && $('input[name="selfie"]').val().length > 0) {
                errorData = false;
            }
        }
    }
    (!errorData) ? $('.api-call').show() : $('.api-call').hide();
    ($('.api-call').is(':visible')) ? $('.next').hide() : '';
    ($('.api-call').is(':visible')) ? $('.again').hide() : '';
}

// Función que despliega las fotos que no se procesaron correctamente resultados
function displayErrorApi(frontStatus, backStatus, selfieStatus) {
    errorCount = 0;
    ok_class = 'fa fa-check fa-fw text-success';
    error_class = 'fa fa-times fa-fw text-danger';
    $('#error_facial .modal-body ul.errorPhoto li span i').removeClass();
    if (frontStatus) {
        $('#error_facial .modal-body ul.errorPhoto li.front i').addClass(ok_class);
        $('#error_facial .modal-body ul.errorPhoto li.front a').hide();
    } else {
        $('#error_facial .modal-body ul.errorPhoto li.front i').addClass(error_class);
        $('#error_facial .modal-body ul.errorPhoto li.front a').show();
        errorCount++;
    }
    if (backStatus) {
        $('#error_facial .modal-body ul.errorPhoto li.back i').addClass(ok_class);
        $('#error_facial .modal-body ul.errorPhoto li.back a').hide();
    } else {
        $('#error_facial .modal-body ul.errorPhoto li.back i').addClass(error_class);
        $('#error_facial .modal-body ul.errorPhoto li.back a').show();
        errorCount++;
    }
    if (selfieStatus) {
        $('#error_facial .modal-body ul.errorPhoto li.selfie i').addClass(ok_class);
        $('#error_facial .modal-body ul.errorPhoto li.selfie a').hide();
    } else {
        $('#error_facial .modal-body ul.errorPhoto li.selfie i').addClass(error_class);
        $('#error_facial .modal-body ul.errorPhoto li.selfie a').show();
        errorCount++;
    }
    $('#errorPhotoCount').text(errorCount);
    $( '#error_facial').modal('show');
}

// Función que rellena el objeto de datos de la información del documento
function setDocumentData(code, mrz) {
    if (code != '') {
        $.each(code.data, function(index, el) {
            documentData[index] = el;
        });
        $.each(documentData, function(key, value) {
            if (value == '') {
                documentData[key] = mrz[key];
            }
        });
    } else {
        $.each(mrz, function(index, el) {
            documentData[index] = el;
        });
    }
    return documentData;
}

// Función que procesa el MRZ RAW
function processRawMRZ(mrzRaw) {
    var decode_mrz = mrzRaw.split('\\n');
    if (decode_mrz[0].substr(0, 5) == 'INCHL') { // new CI
        cedula_mrz['document number'] = decode_mrz[0].substr(5, 9);
        cedula_mrz['date of birth'] = decode_mrz[1].substr(0, 6);
        cedula_mrz.gender = decode_mrz[1].substr(7, 1);
        cedula_mrz['expiration date'] = decode_mrz[1].substr(8, 6);
        cedula_mrz.nationality = decode_mrz[1].substr(15, 3);
        cedula_mrz['national identification number'] = decode_mrz[1].split(/</)[0].substr(18, decode_mrz[1].split(/</)[0].length) + decode_mrz[1].split(/</)[1];
        cedula_mrz['family name'] = decode_mrz[2].split(/<</)[0].replace(/</g, ' ');
        cedula_mrz.name = decode_mrz[2].split(/<</)[1].replace(/</g, ' ');
    } else if (decode_mrz[0].substr(0, 5) == 'IDCHL') { // old CI
        cedula_mrz['national identification number'] = decode_mrz[0].substr(5, 9);
        cedula_mrz['date of birth'] = decode_mrz[1].substr(0, 6);
        cedula_mrz.gender = decode_mrz[1].substr(7, 1);
        cedula_mrz['expiration date'] = decode_mrz[1].substr(8, 6);
        cedula_mrz.nationality = decode_mrz[1].substr(15, 3);
        cedula_mrz['document number'] = decode_mrz[1].split(/</)[0].substr(18);
        cedula_mrz['family name'] = decode_mrz[2].split(/<</)[0].replace(/</g, ' ');
        cedula_mrz.name = decode_mrz[2].split(/<</)[1].replace(/</g, ' ');
    }
    // UI element MRZ RAW in 3 lines
    $('h6.mrz-raw span.one').text(decode_mrz[0]);
    $('h6.mrz-raw span.two').text(decode_mrz[1]);
    $('h6.mrz-raw span.three').text(decode_mrz[2]);
}

// Función que marca en cada elemento de la interfaz la información del documento
function setDataUI() {
    // pasar objeto y setear datos, más limpio
    $('li.list-group-item.rut strong').text(documentData["national identification number"]);
    $('li.list-group-item.n-serie strong').text(documentData["document number"]);
    $('li.list-group-item.names strong').text(documentData.name);
    $('li.list-group-item.lastnames strong').text(documentData["family name"]);
    $('li.list-group-item.gender strong').text(documentData.gender);
    $('li.list-group-item.country strong').text(documentData.nationality);
    $('li.list-group-item.date-birth strong').text(documentData["date of birth"]);
    $('li.list-group-item.date-expire strong').text(documentData["expiration date"]);
}

// Función que limpia la información del objeto de datos del documento
function resetData() {
    documentData = {
        'national identification number':'',
        'document number':'',
        'name':'',
        'family name':'',
        'gender':'',
        'nationality': '',
        'date of birth':'',
        'expiration date':''
    };
    cedula_mrz = {
        'national identification number':'',
        'document number':'',
        'name':'',
        'family name':'',
        'gender':'',
        'nationality': '',
        'date of birth':'',
        'expiration date':''
    };
}

// Función que limpia información de la página del proceso actual
function resetDataProcess() {
    resetData();
    $('input[name="id_front"]').val('');
    $('img#id_front').attr('src', '').removeClass('border border-success');
    $('img#id_back').attr('src', '').removeClass('border border-success');
    $('img#selfie').attr('src', '').removeClass('border border-success');
    $('a.take-photo').removeClass('btn-outline-secondary retake').html('<i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">' + lang[app_locale]['photo'] + '</span>').addClass('btn-secondary');
    $('input[name="id_back"]').val('');
    $('input[name="selfie"]').val('');
    $('#documentType').val(0);
    $('a.api-call').hide();
    $('a.again').hide();
    $('.result').hide();
    $('.info-doc').hide();
    $('a.next').show();
    $('a#document-tab').tab('show');
    if (DetectRTC.isMobileDevice) {
        getGeoCountry(app_locale);
    }
}
// Función que limpia los datos de la interfaz para realizar nuevo proceso
function cleanDataUI() {
    // reset driving License
    $('.info-doc p.mrz-check').show();
    $('.info-doc ul.list-group-flush.mrz-data').show();
    $('.info-doc ul.list-group-flush.data').hide();
    // clean
    if ($('.card.match h1.confidence').hasClass('text-success')) {
        $('.card.match h1.confidence').removeClass('text-success');
    } else {
        $('.card.match h1.confidence').removeClass('text-danger');
    }
    $('.card.match h5 span.confidence').text('');
    $('p.mrz-check span.verify-doc').text('').removeClass().addClass('verify-doc badge');
    if ($('.card.match h6 span.status').hasClass('badge-success')) {
        $('.card.match h6 span.status').removeClass('badge-success');
    } else {
        $('.card.match h6 span.status').removeClass('badge-danger');
    }
    $('.match .card-body .positive').hide();
    $('.match .card-body .warning').hide();
    $('.match .card-body .danger').hide();
    $('.card.match h6 span.status').text('');
    $('.card.match p.token span.badge-light').text('');
    $('.info-doc p.mrz-check span.badge').text('');
    if ($('.info-doc p.mrz-check span.badge').hasClass('badge-success')) {
        $('.info-doc p.mrz-check span.badge').removeClass('badge-success');
    } else {
        $('.info-doc p.mrz-check span.badge').removeClass('badge-warning');
    }
    $('.info-doc h6.mrz-raw span.one').text('');
    $('.info-doc h6.mrz-raw span.two').text('');
    $('.info-doc h6.mrz-raw span.three').text('');
    $('.info-doc h6.mrz-raw').hide();
    $('.info-doc a.link-rc').attr('href', '#').hide();
    $('li.list-group-item.rut strong').text('');
    $('li.list-group-item.n-serie strong').text('');
    $('li.list-group-item.names strong').text('');
    $('li.list-group-item.lastnames strong').text('');
    $('li.list-group-item.gender strong').text('');
    $('li.list-group-item.country strong').text('');
    $('li.list-group-item.date-birth strong').text('');
    $('li.list-group-item.date-expire strong').text('');
}
// Función que rota una imagen base64
var rotate64 = function(base64data, degrees, enableURI) {
    return new Promise(function(resolve, reject) {
        //assume 90 degrees if not provided
        var degrees = 90;
        if (direction == 'left') {
            degrees = -90;
        }
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'hidden-canvas');
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        var image = new Image();
        //assume png if not provided
        image.src = base64data;
        image.onload = function() {
            var w = image.width;
            var h = image.height;
            var rads = degrees * Math.PI/180;
            var c = Math.cos(rads);
            var s = Math.sin(rads);
            if (s < 0) { s = -s; }
            if (c < 0) { c = -c; }
            //use translated width and height for new canvas
            canvas.width = h * s + w * c;
            canvas.height = h * c + w * s;
            //draw the rect in the center of the newly sized canvas
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(degrees * Math.PI / 180);
            ctx.drawImage(image, -image.width/2, -image.height/2);
            //assume plain base64 if not provided
            resolve(canvas.toDataURL('image/jpeg'));
            document.body.removeChild(canvas);
        };
        image.onerror = function() {
            reject('Unable to rotate data\n' + image.src);
        };
    });
}
// Función que transforma una imagen base64 como url a archivo
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
    else
    byteString = decodeURIComponent(dataURI.split(',')[1]);
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:'image/jpeg'});
}
// Función que establece la conexión de video con la cámara seleccionada
function setVideoStream(deviceId) {
    var constraints = { audio: false, video: { width: 1280, height: 720, deviceId: deviceId} };
    navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
        var video = document.querySelector('video');
        var preview = $('video#preview');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    }).catch(function(err) {
        bootbox.alert('Ocurrió un error al cambiar de cámara, reconecte al equipo para una correcta identificación y recargue la página.')
        console.log(err.name + ": " + err.message);
    }); // always check for errors at the end.
}
// Función que despliega los tipos de documentos por país
function setCountryOptions(country, locale) {
    $('#documentType').find('option').remove();
    var ci_codes = '';
    if (locale === 'es') {
        ci_codes = ci_codes_es;
    } else if (locale === 'en') {
        ci_codes = ci_codes_en;
    }
    if (typeof country != 'undefined' && country != '' && country != null && country.length > 0) {
        $('label[for="documentType"]').text(lang[app_locale]['document_type'] + ' ' + country);
        // set especific options
        $.each(ci_codes, function(index, element) {
            if (element.hasOwnProperty(country)) {
                $.each(element[country], function(index, item) {
                    $('#documentType').append($('<option>', {
                        value: item.value,
                        text : item.name
                    }));
                });
            }
        });
    } else {
        // set all options
        $('label[for="documentType"]').text(lang[app_locale]['document_type'] + ' : ');
        $('#documentType').append($('<option>', {
            value: 0,
            text : lang[app_locale]['select_document']
        }));
        $.each(ci_codes, function(index, element) {
            for (var key in element) {
                $.each(element[key], function(index, item) {
                    if (item.value != 0) {
                        $('#documentType').append($('<option>', {
                            value: item.value,
                            text : item.name + ' ' + key
                        }));
                    }
                });
            }
        });
    }
}
// Función que configura el lenguage de la aplicación
function setLanguage() {
    var language = navigator.language.split('-');
    $('button[data-lang="' + language[0] + '"]').addClass('btn-dark');
    setLocale(language[0]);
    return language[0];
}
// Función que traduce la página en base al lenguaje seleccionado
function setLocale(locale) {
    $('input[name="lang"]').val(locale);
    $('.checkbox .col-form-label span').text(' ' + lang[locale]['all_documents']);
    var path_prefix = 'locale/';
    if (window.location.href.indexOf('consorcio') >= 0) {
        path_prefix = '../locale/';
    }
    var opts = { language: locale, pathPrefix: path_prefix, skipLanguage: 'es-CL' };
    $('[data-localize]').localize('app', opts);
    getGeoCountry(locale);
}
// Función que despliega los templates de los documentos por país
function setTemplateCountry(country = '') {
    var base_image = '';
    base_image = (window.location.href.indexOf('cmr') !== -1) ? '../img/' : 'img/';
    switch (country) {
        case 'Chile':
            $('img#id_front').attr({src: base_image + 'ci_front.png'});
            $('img#id_back').attr({src: base_image + 'ci_back.png'});
        break;
        case 'Peru':
            $('img#id_front').attr({src: base_image + 'dni_front_peru.png'});
            $('img#id_back').attr({src: base_image + 'dni_back_peru.png'});
        break;
        case 'Colombia':
            $('img#id_front').attr({src: base_image + 'ci_front_col.png'});
            $('img#id_back').attr({src: base_image + 'ci_back_col.png'});
        break;
        default:
            $('img#id_front').attr({src: base_image + 'front.png', style: 'margin: 1%;width:35%;'});
            $('img#id_back').attr({src: base_image + 'back.png', style: 'margin: 1%;width:35%;'});
    }
    $('img#selfie').attr({src: base_image + 'selfie.png', style: 'margin: 1%;width:20%;'});
}
// Función que saca la foto para versión desktop
function takePhoto() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('photo');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    if (video.videoWidth < 1280) {
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    } else {
      canvas.getContext('2d').drawImage(video, 0, 0, 1280, 720, 0, 0, 1280, 720);
    }
    return canvas.toDataURL('image/jpeg');
}
// Función que busca la ubicación geografica del usuario
function getGeoCountry(locale) {
    var country = '';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $.ajax('https://maps.googleapis.com/maps/api/geocode/json?latlng='
            + position.coords.latitude + ','
            + position.coords.longitude)
            .done(function(data, textStatus, jqXHR) {
                if ( textStatus === 'success' && typeof data.results != 'undefined') {
                    var country = null, countryCode = null;
                    for (var r = 0, rl = data.results.length; r < rl; r += 1) {
                        var result = data.results[r];
                        if (!country && result.types[0] === 'country') {
                            country = result.address_components[0].long_name;
                            countryCode = result.address_components[0].short_name;
                        }
                    }
                }
                console.log(country);
                if (DetectRTC.isMobileDevice) {
                    setTemplateCountry(country);
                }
                setCountryOptions(country, locale);
            });
        });
    } else {
        if (DetectRTC.isMobileDevice) {
            setTemplateCountry(country);
        }
        setCountryOptions(country, locale);
    }
}

/*!
* jQuery UI Effects Shake 1.11.4
* http://jqueryui.com
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
* http://api.jqueryui.com/shake-effect/
*/

(function($){
    $.fn.shake = function(settings) {
        if (typeof settings.interval == 'undefined') {
            settings.interval = 100;
        }
        if( typeof settings.distance == 'undefined') {
            settings.distance = 10;
        }
        if( typeof settings.times == 'undefined') {
            settings.times = 4;
        }
        if( typeof settings.complete == 'undefined') {
            settings.complete = function(){};
        }
        $(this).css('position','relative');
        for (var iter=0; iter<(settings.times+1); iter++) {
            $(this).animate({ left:((iter%2 == 0 ? settings.distance : settings.distance * -1)) }, settings.interval);
        }
        $(this).animate({ left: 0}, settings.interval, settings.complete);
    };
})(jQuery);
