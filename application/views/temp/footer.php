		</div>
	<!--	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>-->
<!--		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>-->
<!--		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>-->
<!--		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>-->
<!--	    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>-->
		
		<script src="<?php echo (base_url().'assets/scripts/jquery-3.5.1.min.js'); ?>"></script>
		<!--<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>-->

		<script src="<?php echo (base_url().'assets/scripts/popper.min.js'); ?>" integrity="" crossorigin=""></script>

		<script src="<?php echo (base_url().'assets/scripts/bootstrap.min.js'); ?>" integrity="" crossorigin=""></script>

		<script src="<?php echo base_url();?>assets/scripts/index.js"></script>
		<?php 
			if(isset($controller) && !is_null($controller))
				echo '<script src="'.base_url().'assets/scripts/'.$controller.'.js"></script>';
		?>
	    <!--<script src="<?php //echo base_url();?>assets/plugins/metisMenu/jquery.metisMenu.js"></script>-->
	    <script src="<?php echo (base_url().'assets/scripts/feather.js'); ?>"></script>
	    <script src="<?php echo (base_url().'assets/scripts/feather.min.js'); ?>"></script>
		<script src="<?php echo (base_url().'assets/scripts/jquery.validate.js'); ?>"></script>
		<script src="<?php echo (base_url().'assets/scripts/jquery.validate.min.js'); ?>"></script>
		<script src="<?php echo (base_url().'assets/scripts/jquery.number.js'); ?>"></script>
		<script src="<?php echo (base_url().'assets/scripts/jquery.number.min.js'); ?>"></script>
		<script src="<?php echo (base_url().'assets/scripts/additional-methods.js'); ?>"></script>
		<script src="<?php echo (base_url().'assets/scripts/additional-methods.min.js'); ?>"></script>
		<!--<script src="<?php //echo (base_url().'assets/scripts/bootstrap-multiselect.js'); ?>"></script>-->
		<!-- Latest compiled and minified JavaScript -->
		<!--<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>-->
		<script src="<?php echo (base_url().'assets/scripts/bootstrap-select.min.js'); ?>"></script>
		<script src="<?php echo (base_url().'assets/scripts/bootstrap-multiselect.js'); ?>"></script>
		<!--<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
        async defer></script>-->
  		<!--<script src="<?php //echo (base_url().'assets/scripts/api.js?onload=onloadCallback&render=explicit'); ?>"
        async defer></script>-->

<!-- (Optional) Latest compiled and minified JavaScript translation files -->
<!--<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/i18n/defaults-*.min.js"></script>-->
		<!--<script type="text/javascript" src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>-->
		<script type="text/javascript" src="<?php echo (base_url().'assets/scripts/jquery.canvasjs.min.js'); ?>"></script>
		<!--<script type="text/javascript" language="javascript" src="<?php //echo (base_url().'assets/scripts/jquery.dataTables.js'); ?>"></script>-->
		<script type="text/javascript" src="<?php echo (base_url().'assets/scripts/jquery.dataTables.min.js'); ?>"></script>
		<script type="text/javascript" src="<?php echo (base_url().'assets/scripts/dataTables.bootstrap4.min.js'); ?>"></script>
		<script type="text/javascript" src="<?php echo (base_url().'assets/scripts/dataTables.fixedColumns.min.js'); ?>"></script>
		<script type="text/javascript" src="<?php echo (base_url().'assets/scripts/dataTables.select.min.js'); ?>"></script>
		<script type="text/javascript" src="<?php echo (base_url().'assets/scripts/dataTables.buttons.min.js'); ?>"></script>
	</body>
</html>