// Interaccion al mostrar un nuevo fieldset
$('.api').on('shown.bs.tab', function (e) {
    current_tabpane_id = e.target.hash;
    $('.next').show();
    if (!$(e.target.hash + '-tab').parent().is(':visible') && e.target.hash == '#back') {
        $('a#selfie-tab').tab('show');
    }
    $('.cameras').hide();
    if (current_tabpane_id == '#front' || current_tabpane_id == '#back' || current_tabpane_id == '#selfie') {
        setAppSteps();
        $('.next').hide();
        if (!DetectRTC.isMobileDevice) {
            refreshVideoStream(current_tabpane_id);
            if ($('#videoSource option').length > 1) {
                $('.cameras').show();
            } else {
                $('.cameras').hide();
            }
        }
    } else if (current_tabpane_id == '#document') {
        $('.next').hide();
    }
});

// Interaccion del boton de siguiente
$('.next').click(function() {
    var current_tabpane = $('.api').find('.tab-pane.active.show');
    current_tabpane_id = current_tabpane.attr('id');
    var message = '';
    switch (current_tabpane_id) {
        case 'document':
        if ($('#documentType').val() == '') {
            message = lang[app_locale]['document_empty'];
            checkApiFormData();
        }
        break;
        case 'front':
        if ($('input[name="id_front"]').val() == '') {
            message = lang[app_locale]['document_front_empty'];
            checkApiFormData();
        }
        break;
        case 'back':
        if ($('input[name="id_back"]').val() == '' && $('#' + current_tabpane_id + '-tab').parent().is(':visible')) {
            message = lang[app_locale]['document_back_empty'];
            checkApiFormData();
        }
        break;
        case 'selfie':
        if ($('input[name="selfie"]').val() == '') {
            message = lang[app_locale]['selfie_empty'];
            checkApiFormData();
        }
        break;
    }
    if (message != '') {
        blockFieldset('#' + current_tabpane_id, message);
        return false;
    }
});

// Interaccion del boton de lenguaje
$('body').on('click', '.lang button', function(event) {
    event.preventDefault();
    $('.lang button').removeClass('btn-dark').addClass('btn-secondary');
    $(this).addClass('btn-dark');
    app_locale = $(this).attr('data-lang');
    setLocale($(this).attr('data-lang'));
});

// Interaccion del boton de error de foto para retomar
$('body').on('click', '.photo-error', function(event) {
    event.preventDefault();
    if ($(this).parent('li').hasClass('front')) {
        $('a#front-tab').tab('show');
    } else if ($(this).parent('li').hasClass('back')) {
        $('a#back-tab').tab('show');
    } else if ($(this).parent('li').hasClass('selfie')) {
        $('a#selfie-tab').tab('show');
    }
    $('#error_facial').modal('hide');
});

// Interaccion del cambio de valor del tipo de documento
$('.api').on('change', '#documentType', function(event) {
    event.preventDefault();
    $('a#front-tab').tab('show');
});

// Interaccion del cambio de valor de todos los tipos de documentos disponibles
$('body').on('change', 'input[name="allCI"]', function(event) {
    event.preventDefault();
    locale = $('input[name="lang"]').val();
    $('.loading').show();
    if ($(this).is(":checked")) {
        setCountryOptions('', app_locale);
    } else {
        getGeoCountry(app_locale);
    }
    $('.loading').hide();
});

$('#doc-front').on('change', function(event) {
    event.preventDefault();
    //if (DetectRTC.isMobileDevice) {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("id_front");
        imgtag.title = selectedFile.name;

        reader.onload = function(event) {
        imgtag.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
        $('#id_front').show();
    //}
});

// Interaccion del boton de captura de foto
$('body').on('click', '.take-photo', function(event) {
    event.preventDefault();
    if (DetectRTC.isMobileDevice) {
        $('#doc-front').focus().trigger('click');
    }else{
        // retake photo
        if ($(this).hasClass('retake') && $(this).siblings('.image').find('input[type="text"]').val() != '' &&
        $(this).siblings('.image').find('input[type="text"]').val().length > 0) {
            //$('.next').hide();
            $(this).removeClass('btn-outline-secondary').addClass('btn-secondary');
            refreshVideoStream('#' + $(this).parent('fieldset').attr('id'), true);
            $('.cameras').show();
            return false;
        }
        // save photo data
        var photoData = takePhoto();
        $(document.getElementById('id_front')).attr('src', photoData);
        //var base64data = $(this).siblings('.image').find('img').attr('src').split(',');
        $(this).removeClass('btn-secondary');
        $(this).siblings('.image').find('input[type="text"]').val(photoData);
        $(this).siblings('.image').find('img').attr('src', photoData).show().addClass('border border-success card-body');
        //$(this).siblings('h3').html(lang[app_locale]['check_orientation']);
        $(this).siblings('img.check-orientation').show();
        //$(this).text(lang[app_locale]['retake']).addClass('btn-outline-secondary retake');
        $('#video-stream').hide();
        //$('.cameras').hide();
        $('.btn.rotate').show();
        $('#id_front').show();
        //checkApiFormData();
        feather.replace();
    }
});


$('body').on('click', '.upload-photo', function(event) {
    event.preventDefault();
    $('#doc-front').focus().trigger('click');
    /*var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("id_front");
    imgtag.title = selectedFile.name;

    reader.onload = function(event) {
    imgtag.src = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
    $('#id_front').show();*/
});

$('body').on('click', '.refrescar', function(event) {
    event.preventDefault();
    $('#video-stream').show();
    $('#id_front').hide();
    feather.replace();
});

// Interaccion del cambio de valor al capturar foto con el móvil
$('body').on('change', '[type="file"]', function(event) {
    event.preventDefault();

    if (DetectRTC.isMobileDevice || event.currentTarget.id == "doc-front") {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("id_front");
        imgtag.title = selectedFile.name;

        reader.onload = function(event) {
        imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
        $('#video-stream').hide();
    }else{
        var img_id = $(this).siblings().find('img').attr('id');
        var input_id = $(this).siblings().find('input').attr('name');
        $(this).siblings('h3').html(lang[app_locale]['check_orientation']);
        $(this).siblings('img.check-orientation').show();
        var canvas = document.getElementById('photo');
        var canvasContext = canvas.getContext('2d');
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        // limit the image to 1280x720 maximum size
        var maxWidth = 1280;
        var maxHeight = 720;
        var img = new Image;
        dataURL = null;
        img.onload = function() {
            var imageWidth = img.width;
            var imageHeight = img.height;
            var scale = Math.min((maxWidth / imageWidth), (maxHeight / imageHeight));
            var iwScaled = imageWidth * scale;
            var ihScaled = imageHeight * scale;
            canvas.width = iwScaled;
            canvas.height = ihScaled;
            canvasContext.drawImage(img, 0, 0, iwScaled, ihScaled);
            dataURL = canvas.toDataURL('image/jpeg');
            $('img#' + img_id).attr({src: dataURL, 'style' : 'margin:1%;width:85%;'}).addClass('border border-success card-body');
            $('input[name="' + input_id + '"]').val(dataURL);
            $('#' + input_id + '').val(dataURL);
            $('.next').show();
            checkApiFormData();
        }
        img.src = URL.createObjectURL(event.target.files[0]);
    }
});
// Interaccion del boton de realizar nuevo proceso
$('body').on('click', '.again', function(event) {
    event.preventDefault();
    resetDataProcess();
});
// Interaccion del cambio de valor de la cámara
$('body').on('change', 'select#videoSource', function(event) {
    event.preventDefault();
    deviceId = $(this).val();
    setVideoStream(deviceId);
});
// Interaccion del boton para rotar imagen
$('body').on('click', '.rotate', function(event) {
    event.preventDefault();
    rotatedBase64 = '';
    direction = $(this).attr('data-dir');
    input_name = $(this).parent().parent().find('input[type="text"]').attr('name');
    img_id = $(this).parent().parent().find('img.img-fluid').attr('id');
    imageSrc = $(this).parent().parent().find('img.img-fluid').attr('src');
    if (imageSrc.length > 0) {
        $('input[name="' + input_name + '"]').val('');
        rotate64(imageSrc).then(function(rotated) {
            $('img#' + img_id).attr('src', rotated);
            // var base64data = rotated.split(',');
            $('input[name="' + input_name + '"]').val(rotated);
        }).catch(function(err) {
            console.error(err);
        });
    }
});
