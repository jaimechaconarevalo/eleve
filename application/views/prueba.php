<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Web application for facial recognition with GSBPO Biometrics API">
    <meta name="author" content="GSBPO">
    <title data-localize="title">Provida - Verificaci&oacute;n de Identidad</title>
    <!-- Bootstrap core CSS -->
    
    <link href="<?php echo base_url();?>/assets/bootstrap-4.1.3/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url();?>/assets/shards-1.1/css/shards.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo base_url();?>/assets/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="<?php echo base_url();?>/assets/image-picker/css/image-picker.css">
    <link href="<?php echo base_url();?>/assets/css/styles2.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="https://fonts.googleapis.com/css?family=Droid+Sans|Roboto" rel="stylesheet">
</head>
<body>
    <div class="container-fluid">
        <!-- Inicio navbar -->
        <nav class="navbar bg-light top">
            <a class="navbar-brand" href="/"><img src="<?php echo (base_url().'assets/img/logo.png'); ?>" alt=""></a>
            <div class="lang float-right" style="padding: .6rem;">
                <button data-lang="es" class="btn btn-sm btn-secondary btn-squared">ES</button>
                <button data-lang="en" class="btn btn-sm btn-secondary btn-squared">EN</button>
                <input type="hidden" name="lang" value="">
            </div>
        </nav>
        <!-- Fin navbar -->
        <div class="loading">Loading&#8230;</div>
        <!-- Inicio compatibilidad navegadores -->
        <div class="row supported" style="display:none;">
            <div class="col-lg">
                <div class="card">
                    <div class="card-body">
                        <h4 class="text-center" style="margin-bottom:0px;" data-localize="supported-browsers">
                            GSBPO API Facial - Navegadores compatibles: Chrome, Mozilla y Opera (actualizados últimas versiones)</h4>
                        <h5 class="text-center" data-localize="supported-browsers-detail">Para mayor información sobre soporte, revisar <a href="https://webrtc.org/">https://webrtc.org/</a></h5>
                        <hr>
                        <div class="row justify-content-center browsers">
                            <div class="col-sm-3">
                                <img src="<?php echo (base_url().'assets/img/chrome.png'); ?>" alt="">
                            </div>
                            <div class="col-sm-3">
                                <img src="<?php echo (base_url().'assets/img/firefox.png'); ?>" alt="">
                            </div>
                            <div class="col-sm-3">
                                <img src="<?php echo (base_url().'assets/img/opera.svg'); ?>" class="opera" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fin compatibilidad navegadores -->
        <!-- Inicio API -->
        <div class="api">
            <canvas id="photo" class="hide" style="display:none;" height="720" width="1280"></canvas>
            <canvas id="rotated" class="hide" style="display:none;" height="720" width="1280"></canvas>
            <img id="camera" src="" alt="" style="display:none">
            <div class="row">
                <div class="col-md-8 mx-auto">
                    <!-- Inicio Paso a Paso -->
                    <div id="rootwizard">
                        
                        <!-- Fin Navegación -->
                        <!-- Inicio Selección de cámaras -->
                        <div class="row">
                            <div class="col">
                                <div class="form-inline cameras" style="margin-bottom: 1%;">
                                    <label for="videoSource" style="margin-right: 10px; " data-localize="select-camera">Seleccionar Cámara:</label>
                                    <select id="videoSource" class="custom-select col-6"></select>
                                </div>
                            </div>
                        </div>
                        <!-- Fin Selección de cámaras -->
                        <div class="row">
                            <div class="col">
                                <!-- Inicio Tabs -->
                                <div class="tab-content">
                                    <!-- Inicio paso introducción -->
                                    <div class="tab-pane fade" role="tabpanel" id="intro">
                                        <fieldset>
                                            <h2 class="fs-title" data-localize="intro-title">Verificación de Identidad Facial</h2>
                                            <h3 class="fs-subtitle"><i data-localize="intro-subtitle">Para verificar su identidad se necesitan fotos de su cédula de identidad y rostro; o rostro contra rostro.</i></h3>
                                        </fieldset>
                                    </div>
                                    <!-- Fin paso introducción -->
                                    <!-- Inicio Selección documento -->
                                    <div class="tab-pane fade" role="tabpanel" id="document">
                                        <fieldset id="document">
                                            <h2 class="fs-title" data-localize="document">Tipo de Documento de Identidad</h2>
                                            <h3 class="fs-subtitle" data-localize="select-document-type">Seleccione el tipo de documento para verificación.</h3>
                                            <br>
                                            <hr>
                                            <!-- <div class="picker" style="margin: 0 auto;text-align: center;display: table;">
                                                <select id="documentType" class="image-picker show-labels show-html">
                                                    <option value=''></option>
                                                    <option data-img-src='<?php echo (base_url().'assets/img/ci_back.png'); ?>' value='CHL2'>Cédula Nueva</option>
                                                    <option data-img-src='<?php echo (base_url().'assets/img/ci_antigu_reverso.jpg'); ?>' value='CHL1'>Cédula Antigua</option>
                                                </select>
                                            </div> -->
                                            <!-- <label for="documentType" class="col-form-label" data-localize="document-type" style="margin-right:8px;">Tipo Documento</label> -->
                                            <div class="row justify-center">
                                                <div class="col"></div>
                                                <div class="col-4">
                                                    <label class="custom-control custom-toggle" style="text-align: left;">
                                                        <input name="allCI" type="checkbox" value="" class="custom-control-input" id="checkbox">
                                                        <span class="custom-control-indicator"></span>
                                                        <span class="custom-control-description" data-localize="all-documents"> Todos los documentos</span>
                                                    </label>
                                                </div>
                                                <div class="col-7">
                                                    <label for="documentType" class="col-form-label" data-localize="document-type" style="margin-right:8px;">Tipo Documento</label>
                                                    <select class="custom-select col-6" id="documentType" style="margin-right:8px;">
                                                        <option value="0">Seleccione Tipo CI</option>
                                                        <option value="CHL1">CI Antiguo</option>
                                                        <option value="CHL2">CI Nuevo</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br>
                                        </fieldset>
                                    </div>
                                    <!-- Fin Selección documento  -->
                                    <!-- Inicio Foto frontal -->
                                    <input type="text" name="id_traspaso" value="<?php if(isset($idTraspaso)): echo $idTraspaso; endif; ?>" hidden>
                                    <div class="tab-pane fade active show" role="tabpanel" id="front">
                                        <fieldset id="front">
                                            <h2 class="fs-title" data-localize="front-id">Foto Documento Frontal</h2>
                                            <h3 class="fs-subtitle" style="display:inline;" data-localize="front-id-subtitle">Toma una foto de su cédula por el frente.</h3>
                                            <img class="check-orientation" style="width:15%; display:none;" src="<?php echo (base_url().'assets/img/doc-ok.PNG'); ?>" alt="">
                                            <div class="image">
                                                <div class="row">
                                                    <div class="col-1">
                                                        <a href="javascript:void(0);" data-dir="left" class="btn btn-sm btn-dark rotate float-left">
                                                            <i class="fa fa-undo" aria-hidden="true"></i></a>
                                                    </div>
                                                    <div class="col-10">
                                                        <input type="text" name="id_front" value="" hidden>
                                                        <img id="id_front" class="img-fluid" src="">
                                                        <div id="front-video">
                                                            <div id="video-stream">
                                                                <video id="video" style="max-width:100%;"></video>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-1">
                                                        <a href="javascript:void(0);" data-dir="right" class="btn btn-sm btn-dark rotate float-right">
                                                            <i class="fa fa-repeat" aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="file" id="doc-front" name="doc-front" class="inputfile" accept="image/*" capture="camera">
                                            <label for="doc-front" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></label>
                                            <a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>
                                        </fieldset>
                                    </div>
                                    <!-- Fin foto frontal -->
                                    <!-- Inicio foto reverso -->
                                    <div class="tab-pane fade" role="tabpanel" id="back">
                                        <fieldset id="back">
                                            <h2 class="fs-title" data-localize="back-id">Foto Documento Reverso</h2>
                                            <h3 class="fs-subtitle" style="display:inline;" data-localize="back-id-subtitle">Toma una foto de su cédula por el reverso.</h3>
                                            <img class="check-orientation" style="width:15%; display:none;" src="<?php echo (base_url().'assets/img/doc-back-ok.PNG'); ?>" alt="">
                                            <div class="image">
                                                <div class="row">
                                                    <div class="col-1">
                                                        <a href="javascript:void(0);" data-dir="left" class="btn btn-sm btn-dark rotate float-left">
                                                            <i class="fa fa-undo" aria-hidden="true"></i></a>
                                                    </div>
                                                    <div class="col-10">
                                                        <input type="text" name="id_back" value="" hidden>
                                                        <img id="id_back" class="img-fluid" style="margin: 1%;" src="" alt="Back">
                                                        <div id="back-video"></div>
                                                    </div>
                                                    <div class="col-1">
                                                        <a href="javascript:void(0);" data-dir="right" class="btn btn-sm btn-dark rotate float-right">
                                                            <i class="fa fa-repeat" aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="file" id="doc-back" name="doc-back" class="inputfile" accept="image/*" capture="camera">
                                            <label for="doc-back" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></label>
                                            <a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>
                                        </fieldset>
                                    </div>
                                    <!-- Fin Foto reverso -->
                                    <!-- Inicio Selfie -->
                                    <div class="tab-pane fade" role="tabpanel" id="selfie">
                                        <fieldset id="selfie" class="fieldset-rostro">
                                            <h2 class="fs-title" data-localize="selfie-title">Foto Rostro</h2>
                                            <h3 class="fs-subtitle" style="display:inline;" data-localize="selfie-subtitle">Toma una foto de su rostro.</h3>
                                            <img class="check-orientation" style="width:8%; margin-left:5px; display:none;" src="<?php echo (base_url().'assets/img/selfie-ok.PNG'); ?>" alt="">
                                            <div class="image">
                                                <div class="row">
                                                    <div class="col-1">
                                                        <a href="javascript:void(0);" data-dir="left" class="btn btn-sm btn-dark rotate float-left">
                                                            <i class="fa fa-undo" aria-hidden="true"></i></a>
                                                    </div>
                                                    <div class="col-10">
                                                        <input type="text" name="selfie" value="" hidden>
                                                        <img id="selfie" class="img-fluid" style="margin: 1%;" src="" alt="Selfie">
                                                        <div id="selfie-video"></div>
                                                    </div>
                                                    <div class="col-1">
                                                        <a href="javascript:void(0);" data-dir="right" class="btn btn-sm btn-dark rotate float-right">
                                                            <i class="fa fa-repeat" aria-hidden="true"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="file" name="selfie-photo" id="selfie-photo" class="inputfile" accept="image/*" capture="camera">
                                            <label for="selfie-photo" class="images captura-btn"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></label>
                                            <a href="#" class="btn btn-secondary take-photo"><i class="fa fa-camera" aria-hidden="true"></i> <span data-localize="capture">FOTO</span></a>
                                        </fieldset>
                                    </div>
                                    <!-- Fin Selfie -->
                                    <!-- Inicio Resultado -->
                                    <div class="tab-pane fade" role="tabpanel" id="result">
                                        <fieldset>
                                            <h2 class="fs-title"><span data-localize="result-title">Resultado</span></h2>
                                            <h3 class="fs-subtitle" data-localize="result-subtitle">Resultado verificación facial</h3>
                                            <div class="result">
                                                <div class="row">
                                                    <div class="col-8 mx-auto">
                                                        <div class="card match">
                                                            <div class="card-body">
                                                                <!-- Token transacción -->
                                                                <h5 class="modal-title token">Token: <span class="badge badge-light"></span></h5>
                                                                <hr>
                                                                <!-- ícono resultado positivo biometría 2 -->
                                                                <div class="positive" style="display:none;">
                                                                    <div id="success">
                                                                        <svg class="tickmark" viewBox="0 0 52 52">
                                                                            <circle class="circle" cx="26" cy="26" r="25" fill="none" />
                                                                            <path class="tick" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <!-- ícono resultado positivo biometría 1 -->
                                                                <div class="warning" style="display:none;">
                                                                    <div id="info">
                                                                        <svg class="tickmark" viewBox="0 0 52 52">
                                                                            <circle class="circle" cx="26" cy="26" r="25" fill="none" />
                                                                            <path class="tick" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <!-- ícono resultado negativo biometría -->
                                                                <div class="negative" style="display:none;">
                                                                    <div id="error">
                                                                        <svg class="crossmark" viewBox="0 0 52 52">
                                                                            <circle class="circle" cx="26" cy="26" r="25" fill="none" />
                                                                            <line class="cross" x1="14.1" y1="15.1" x2="37.5" y2="38.6" />
                                                                            <line class="cross late" x1="37.6" y1="15.2" x2="14.1" y2="38.5" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <br>
                                                                <!-- Resultado biométrico -->
                                                                <h5 class="fs-title text-center">
                                                                    <span data-localize="match-facial">Verificación:</span> <span class="confidence"></span></h5>
                                                                <!-- datos del documento -->
                                                                <div class="info-doc">
                                                                    <br>
                                                                    <h5 class="card-title text-center" data-localize="document-info">Información Documento
                                                                        <a class="btn btn-sm btn-outline-success link-rc" href="javascript:void(0)" style="display:none;">Registro Civil</a>
                                                                    </h5>
                                                                    <ul class="list-group mrz-data">
                                                                        <li class="list-group-item rut"><span data-localize="rut">Rut: </span><strong></strong></li>
                                                                        <li class="list-group-item n-serie"><span data-localize="serial-number">N° Serie: </span><strong></strong></li>
                                                                        <li class="list-group-item names"><span data-localize="names">Nombres: </span><strong></strong></li>
                                                                        <li class="list-group-item lastnames"><span data-localize="lastnames">Apellidos: </span><strong></strong></li>
                                                                        <li class="list-group-item gender"><span data-localize="gender">Genero: </span><strong></strong></li>
                                                                        <li class="list-group-item country"><span data-localize="country">Nacionalidad: </span><strong></strong></li>
                                                                        <li class="list-group-item date-birth"><span data-localize="date-birth">Fecha Nacimiento: </span><strong></strong></li>
                                                                        <li class="list-group-item date-expire"><span data-localize="expire-date">Fecha Vencimiento: </span><strong></strong></li>
                                                                    </ul>
                                                                    <ul class="list-group data" style="display:none;"></ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <!-- Fin Resultado -->
                                </div>
                                <!-- Fin Tabs -->
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <!-- Inicio botones Navegación -->
                                <ul class="pager wizard">
                                    <li class="previous"><a class="btn btn-outline-secondary btn-pill prev" href="#" data-localize="previous">Anterior</a></li>
                                    <li class="next"><a class="btn btn-secondary btn-pill next" href="#" data-localize="next">Siguiente</a></li>
                                    <li><a class="btn btn-secondary btn-pill api-call" href="#" data-localize="verification">VERIFICAR</a></li>
                                    <li><a class="btn btn-secondary btn-pill again" href="#" data-localize="new-verification">Realizar Nueva Verificación</a></li>
                                </ul>
                                <!-- Fin botones Navegación -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Inicio Modal error resultado facial -->
    <div class="modal fade" id="error_facial" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mx-auto"><span data-localize="verification">Verificación</span>: <span class="text-danger" data-localize="negative">Negativa</span></h5>
                </div>
                <div class="modal-body">
                    <div class="col-lg-12">
                        <div class="container mb-2">
                            <h6 class="modal-title token">Token: <span class="badge badge-light"></span></h6>
                            <span data-localize="error-process-photos">Ocurrió un error en el procesamiento de las siguitenes imágenes: </span>
                            <strong><span id="errorPhotoCount"></span></strong>
                            <span data-localize="check-photos">Verifica cuál tuvo el error y vuelve a tomar la foto.</span>
                        </div>
                        <h4 class="card-title text-center" data-localize="document-info">Resultado Verificación</h4>
                        <ul class="list-group errorPhoto">
                            <li class="list-group-item front">
                                <span data-localize="capture-front">FOTO FRONTAL</span>:<i class="status"></i>
                                <a class="btn btn-sm btn-outline-secondary photo-error" href="#" style="display:none">
                                    <i class="fa fa-camera"></i> <span data-localize="capture">Capturar</span></a>
                            </li>
                            <li class="list-group-item back">
                                <span data-localize="capture-back">FOTO REVERSO</span>:<i class="status"></i>
                                <a class="btn btn-sm btn-outline-secondary photo-error" href="#" style="display:none">
                                    <i class="fa fa-camera"></i> <span data-localize="capture">Capturar</span></a>
                            </li>
                            <li class="list-group-item selfie">
                                <span data-localize="selfie">FOTO SELFIE</span>:<i class="status"></i>
                                <a class="btn btn-sm btn-outline-secondary photo-error" href="#" style="display:none">
                                    <i class="fa fa-camera"></i> <span data-localize="capture">Capturar</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Fin Modal errores resultado facial -->
    <!-- /.container -->
    <footer class="footer">
        <div class="container">
            <div class="text-center">
                <span class="">© 2019 GSBPO Biometrics</span>
            </div>
        </div>
    </footer>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->

    <script src="<?php echo (base_url().'assets/jquery/jquery-3.2.1.min.js'); ?>"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
    <script src="<?php echo (base_url().'assets/bootstrap-4.1.3/js/bootstrap.min.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/shards-1.1/js/shards.min.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/jquery-bootstrap-wizard/jquery.bootstrap.wizard.min.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/bootbox-v4.4.0/bootbox.min.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/momentjs-2.18.1/moment.min.js'); ?>"></script>
    <script src="https://cdn.webrtc-experiment.com/DetectRTC.js"></script>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="<?php echo (base_url().'assets/localize/jquery.localize.min.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/image-picker/js/image-picker.min.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/scripts/ci_codes.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/locale/lang.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/scripts/status.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/scripts/toc_utils.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/scripts/ui_interactions.js'); ?>"></script>
    <script src="<?php echo (base_url().'assets/scripts/app.js'); ?>"></script>


</body>
</html>
