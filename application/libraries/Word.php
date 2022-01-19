<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 
/*
 * Clase para la exportación de resultados a excel
 * @version 0.1 Primera version
 */
#require_once APPPATH."third_party\PHPWord.php";
require_once("PHPWord.php");
 
class Word extends PHPWord {
    public function __construct(){
        parent::__construct(); 
    }
}
?>