<body>
	<div class="container-full">
		<div id="menu">
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<a class="navbar-brand" href="<?php echo base_url();?>Inicio"><img src="<?php echo base_url();?>assets/img/logo.png" width="50" class="d-inline-block align-top" alt=""></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				    <span class="navbar-toggler-icon"></span>
				 	</button>
					
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
				    <ul class="navbar-nav mr-auto">

				    	<?php
				    	//var_dump($menu[5]);
				    	if(isset($menu))
				    	{				    	
					    	foreach ($menu as $menu) {
					    		//echo count($menu['sub_menu']);
								if(count($menu['sub_menu']) == 0)
								{
						?>
							<li class="nav-item active">
								<a class="nav-link" href="<?php echo base_url().$menu['url'];?>"><?php echo $menu['nombre'];?><span class="sr-only">(current)</span></a>
							</li>
								<?php
								}
								elseif (count($menu['sub_menu']) > 0) {
								?>
								<li class="nav-item dropdown">
									<a class="nav-link dropdown-toggle" href="#" id="ddl<?php echo $menu['nombre'];?>" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<?php echo $menu['nombre'];?>
									</a>
									<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<?php
				    			foreach ($menu['sub_menu'] as $item) {
								?>

										<a class="dropdown-item" href="<?php echo base_url().$item['url'];?>">
											<?php echo $item['nombre'];?>
										</a>

								<?php
								}
								?>
									</div>
								</li>
						<?php	
								}
							}
						}
						?>
						<!--<li class="nav-item">
							<a class="nav-link" href="<?php echo base_url();?>assets/files/videos/Manual Operativo SIGCOM v1.pdf" download="Manual Operativo SIGCOM v1.pdf">Descargar Manual PDF</a>
						</li>-->
					</ul>
					<!--<form class="form-inline my-2 my-lg-0">
						<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>-->
					<ul class="navbar-nav my-sm-2 my-sm-0">
						<!--<li class="nav-item">
							<a class="nav-link" href="<?php echo base_url();?>Login">Cerrar Sesi&oacute;n</a>
						</li>-->
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="userDropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
						  		<i class="userProfile mb-2" data-feather="user" ></i> <?php echo ucwords(explode(" ", $nombres)[0]); ?>
							</a>
							<div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left" aria-labelledby="userDropdown">
						  	<!--<a class="dropdown-item" href="#">Editar Informaci&oacute;n</a>
						  	<a class="dropdown-item" href="#">Delete brains</a>-->
						  	<!--<div class="dropdown-divider"></div>-->
						  		<a class="dropdown-item" href="<?php echo base_url();?>Login">Cerrar Sesi&oacute;n</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
