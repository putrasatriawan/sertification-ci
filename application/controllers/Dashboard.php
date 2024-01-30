<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once APPPATH.'core/Admin_Controller.php';
class Dashboard extends Admin_Controller {
 	public function __construct()
	{
		parent::__construct();
	
	}
	public function index()
	{
		$this->load->helper('url');

		$this->data['content'] = 'admin/dashboard';   
		$this->load->view('admin/layouts/page',$this->data); 
	} 	
	

}