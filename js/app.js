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
    //app_locale = setLanguage();
    setNavigationNumbers();
    $('#rootwizard').bootstrapWizard({
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
    });

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
        if (id_front.length > 0 && id_back.length > 0 && selfie.length > 0 && documentType != 'PASS') {
            data_valid = true;
        } else if (id_front.length > 0 && selfie.length > 0 && documentType == 'PASS') {
            data_valid = true;
        }
        if (data_valid) {
            var form_data = new FormData();
            form_data.append('id_front', dataURItoBlob(id_front));
            form_data.append('id_back', dataURItoBlob(id_back));
            form_data.append('selfie', dataURItoBlob(selfie));
            form_data.append('documentType', documentType);
            $.ajax({
                url: 'facial.php',
                async: true,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                data: form_data
            })
            .done(function(data) {
                console.log(data);
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
                    $('.again').show();
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
                url: 'facial.php',
                async: true,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
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
                } else {
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
