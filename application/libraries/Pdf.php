<?php defined('BASEPATH') OR exit('No direct script access allowed');
 /**


* CodeIgniter PDF Library
 *
 * Generate PDF's in your CodeIgniter applications.
 *
 * @package         CodeIgniter
 * @subpackage      Libraries
 * @category        Libraries
 * @author          Chris Harvey
 * @license         MIT License
 * @link            https://github.com/chrisnharvey/CodeIgniter-PDF-Generator-Library



*/


#require_once(dirname(__FILE__).'\dompdf\dompdf_config.inc.php');
#include_path(base_url().'applications/libr/dompdf/dompdf_config.inc.php');
#require_once(.'/dompdf/dompdf_config.inc.php');

#include_once BASEPATH.'libraries\dompdf\autoload.inc.php';
require_once 'dompdf/autoload.inc.php';


use Dompdf\Dompdf;
use Dompdf\Options;

class Pdf
{
    public function __construct(){
        
        // include autoloader
       
        // instantiate and use the dompdf class
       
        
        //$pdf = new DOMPDF();
        unset($pdf);
        $pdf = new Dompdf(['isHtml5ParserEnabled' => true]);
		//$pdf->setPaper('A4', 'landscape');
		//$pdf->loadHtml("<strong>yer a pdf harry!</strong>");
		//$pdf->render();

        //$pdf->set_option('enable_html5_parser', TRUE); 
        $CI =& get_instance();
        $CI->dompdf = $pdf;  
    }


     public function generate($html, $filename='', $stream=TRUE, $paper = 'A4', $orientation = "portrait", $data)
	 {
	 	unset($_SESSION['pdf']);
	    $dompdf = new Dompdf();
	    //$dompdf->set_option('isHtml5ParserEnabled', true);
	   // $paper_size = array(0,0,360,360);
		//$dompdf->set_paper($paper_size);
		$dompdf->set_paper('A4', 'landscape');
	    $dompdf->loadHtml(utf8_decode($html));

	    //var_dump($html);

	    //$dompdf->loadHtml('plantillaEvaluaciones', $data);

	    //$dompdf->setPaper($paper, $orientation);
	    $dompdf->render();
	    if ($stream) {
	        $dompdf->stream($filename.".pdf", array("Attachment" => 0));
	    } else {
	    	$pdf = $dompdf->output();
	    	unset($dompdf);
	        return $pdf;
	    }
	 }
}

?>