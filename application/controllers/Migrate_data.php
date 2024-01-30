<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Migrate_data extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->insert_menu();
		$this->insert_function();
		$this->insert_menu_function();
		// $this->insert_users();
		// $this->insert_users_roles();
		// $this->insert_roles();
		// $this->insert_menu_master_data();
		// $this->insert_menu_function_master_data();
		redirect("/");
	}

	function insert_menu()
	{
		$table = 'menu';
		$this->db->truncate($table);

		$data = array(
			array('id' => 1, 'module_id' => 1, 'name' => 'root', 'url' => '#', 'parent_id' => 0, 'icon' => "", 'sequence' => 0, 'description' => 'Root Aplikasi', "show_at" => 0),
			array('id' => 2, 'module_id' => 1, 'name' => 'Home', 'url' => 'dashboard', 'parent_id' => 1, 'icon' => "pe-7s-home", 'sequence' => 1, 'description' => '', "show_at" => 0),
			array('id' => 3, 'module_id' => 1, 'name' => 'Sertifikasi', 'url' => 'sertifikasi', 'parent_id' => 1, 'icon' => "pe-7s-home", 'sequence' => 2, 'description' => '', "show_at" => 0),
			array('id' => 4, 'module_id' => 1, 'name' => 'Peserta', 'url' => 'peserta', 'parent_id' => 1, 'icon' => "pe-7s-home", 'sequence' => 3, 'description' => '', "show_at" => 0),
		);
		$this->db->insert_batch($table, $data);
	}

	function insert_function()
	{
		$table = 'function';
		$this->db->truncate($table);

		$data = array(
			array('name' => 'Create', 'description' => 'Can Create'), //1
			array('name' => 'Read', 'description' => 'Can Read'), //2
			array('name' => 'Update', 'description' => 'Can Update'), //3
			array('name' => 'Delete', 'description' => 'Can Delete'), //4
			array('name' => 'Active', 'description' => 'Can Active'), //5
			array('name' => 'Access', 'description' => 'Can Access'), //6
			array('name' => 'Download', 'description' => 'Can Download'), //7
			array('name' => 'Upload', 'description' => 'Can Upload'), //8 
			array('name' => 'Approval', 'description' => 'Can Approval'), //9

		);
		$this->db->insert_batch($table, $data);
	}

	function insert_menu_function()
	{
		$table = 'menu_function';
		$this->db->truncate($table);

		$menus = [
			"1" => [2],
			//parent menu
			"2" => [1, 2, 3, 4, 5],
			"3" => [1, 2, 3, 4, 5],
			"4" => [1, 2, 3, 4, 5],
		];

		$data = [];
		foreach ($menus as $key => $value) {
			for ($i = 0; $i < count($value); $i++) {
				$data[] = [
					"menu_id" => $key,
					"function_id" => $value[$i],
				];
			}
		}

		$this->db->insert_batch($table, $data);
	}

	function insert_users()
	{
		$table = 'users';
		$this->db->truncate($table);

		$data = array(
			array('ip_address' => '127.0.0.1', 'username' => 'administratos', 'password' => '$2y$08$LE4H5hSpdxI5Lnfgt/CjzufLr9x33ZvDTOUA46Q4ZwbKCNQTa6/va', 'salt' => '', 'email' => 'admin@admin.com', 'activation_code' => '', 'forgotten_password_code' => NULL, 'nik' => '11111', 'created_on' => '1268889823', 'last_login' => '1268889823', 'active' => '1', 'first_name' => 'super admin', 'last_name' => '', 'phone' => '0', 'nik' => '99'),
		);
		$this->db->insert_batch($table, $data);
	}

	function insert_users_roles()
	{
		$table = 'users_roles';
		$this->db->truncate($table);

		$data = array(
			array('id' => 1, 'user_id' => '1', 'role_id' => '1'),
			array('id' => 2, 'user_id' => '2', 'role_id' => '1'),
		);
		$this->db->insert_batch($table, $data);
	}

	function insert_roles()
	{
		$table = 'roles';
		$this->db->truncate($table);

		$data = array(
			array('id' => 1, 'name' => 'superadmin'),
			array('id' => 2, 'name' => 'admin'),
		);
		$this->db->insert_batch($table, $data);
	}



}