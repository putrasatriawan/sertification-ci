<?php
defined('BASEPATH') or exit('No direct script access allowed');
require_once APPPATH . 'core/Admin_Controller.php';
class User extends Admin_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model('unit_kerja_model');
		$this->load->model('ion_auth_model');
		$this->load->model("roles_model");
	}
	public function index()
	{
		$this->load->helper('url');
		if ($this->data['is_can_read']) {
			if ($this->data['is_superadmin']) {
				$this->data['unit_kerja'] = $this->unit_kerja_model->getAllById();
				$this->data['roles'] = $this->roles_model->getAllById();
			}
			$this->data['content'] = 'admin/user/list_v';
		} else {
			$this->data['content'] = 'errors/html/restrict';
		}

		$this->load->view('admin/layouts/page', $this->data);
	}


	public function create()
	{
		$this->form_validation->set_rules('email', "Email", 'trim|required');
		$this->form_validation->set_rules('name', "Nama", 'trim|required');
		$this->form_validation->set_rules('password', "Password", 'trim|required');
		$this->form_validation->set_rules('role_id', "Role", 'trim|required');
		if ($this->form_validation->run() === TRUE) {


			$data = array(
				'nik' => $this->input->post('nik'),
				'unit_kerja' => $this->input->post('unit_kerja'),
				'first_name' => $this->input->post('name'),
				'address' => $this->input->post('address'),
				'active' => 1,
				'email' => $this->input->post('email'),
				'phone' => $this->input->post('phone'),
				'is_deleted' => 0
			);
			$nik = $this->input->post('nik');
			$role = array($this->input->post('role_id'));
			$password = $this->input->post('password');
			$email = $this->input->post('email');
			$nik = $this->input->post('nik');
			$insert = $this->ion_auth->register($nik, $password, $email, $data, $role);

			if ($insert) {
				$this->session->set_flashdata('message', "Pengurus Baru Berhasil Disimpan");
				redirect("user");
			} else {
				$this->session->set_flashdata('message_error', $this->ion_auth->errors());
				redirect("user");
			}
		} else {
			$this->data['roles'] = $this->roles_model->getAllById();
			$this->data['unit_kerja'] = $this->unit_kerja_model->getAllById();
			$this->data['content'] = 'admin/user/create_v';
			$this->load->view('admin/layouts/page', $this->data);
		}
	}

	public function edit($id)
	{
		$this->form_validation->set_rules('email', "Email", 'trim|required');
		$this->form_validation->set_rules('name', "Nama", 'trim|required');
		$this->form_validation->set_rules('role_id', "Role", 'trim|required');

		if ($this->form_validation->run() === TRUE) {
			$data = array(
				'first_name' => $this->input->post('name'),
				'address' => $this->input->post('address'),
				'nik' => $this->input->post('nik'),
				'unit_kerja' => $this->input->post('unit_kerja'),

				'email' => $this->input->post('email'),
				'phone' => $this->input->post('phone'),
			);
			// echo"<pre>"; print_r($data);die;
			// foreach($data as $value){
			// echo"<pre>"; print_r($value);
			// }
			// die;
			$roles_id = array(
				'role_id' => $this->input->post('role_id'),
			);
			$user_id = $this->input->post('id');

			$this->user_model->update_user_roles($roles_id, array("users_roles.user_id" => $user_id));
			// $update_role = $this->db->update($this->tables['users_roles'], $roles_id, $users_id);

			// var_dump($update_role);die;
			$update = $this->ion_auth->update($user_id, $data);

			if ($update) {
				$this->session->set_flashdata('message', "User Berhasil Diubah");
				redirect("user", "refresh");
			} else {
				$this->session->set_flashdata('message_error', "User Gagal Diubah");
				redirect("user", "refresh");
			}
		} else {
			if (!empty($_POST)) {
				$id = $this->input->post('id');
				$this->session->set_flashdata('message_error', validation_errors());
				return redirect("user/edit/" . $id);
			} else {
				$this->data['id'] = $id;
				$data = $this->user_model->getOneBy(array("users.id" => $this->data['id']));

				$this->load->model("roles_model");
				$this->data['roles'] = $this->roles_model->getAllBy(null, null, null, null, null);
				$this->data['first_name'] = (!empty($data)) ? $data->first_name : "";
				$this->data['last_name'] = (!empty($data)) ? $data->last_name : "";
				$this->data['username'] = (!empty($data)) ? $data->username : "";
				$this->data['address'] = (!empty($data)) ? $data->address : "";
				$this->data['unit_kerja'] = $this->unit_kerja_model->getAllById();
				$this->data['unit_kerja_selected'] = (!empty($data)) ? $data->unit_kerja : "";
				$this->data['email'] = (!empty($data)) ? $data->email : "";
				$this->data['nik'] = (!empty($data)) ? $data->nik : "";
				$this->data['phone'] = (!empty($data)) ? $data->phone : "";
				$this->data['role_id'] = (!empty($data)) ? $data->role_id : "";
				$this->data['content'] = 'admin/user/edit_v';
				$this->load->view('admin/layouts/page', $this->data);
			}
		}
	}

	public function dataList()
	{
		$columns = array(
			0 => 'id',
			1 => 'unit_kerja',
			2 => 'role_name',
			3 => 'users.first_name',
			4 => 'users.phone',
			5 => 'users.nik',
			6 => 'action'
		);
		$order = $columns[$this->input->post('order')[0]['column']];
		$dir = $this->input->post('order')[0]['dir'];
		$search = array();
		$where = array("roles.id >" => "1");
		$limit = 0;
		$start = 0;
		$totalData = $this->user_model->getCountAllBy($limit, $start, $search, $order, $dir, $where);

		$searchColumn = $this->input->post('columns');
		$isSearchColumn = false;

		if (!empty($searchColumn[1]['search']['value'])) {
			$value = $searchColumn[1]['search']['value'];
			$isSearchColumn = true;
			$search['users.unit_kerja'] = $value;
		}
		if (!empty($searchColumn[2]['search']['value'])) {
			$value = $searchColumn[2]['search']['value'];
			$isSearchColumn = true;
			$search['roles.name'] = $value;
		}

		if ($isSearchColumn) {
			$totalFiltered = $this->user_model->getCountAllBy($limit, $start, $search, $order, $dir, $where);
		} else {
			$totalFiltered = $totalData;
		}
		if (!empty($this->input->post('search')['value'])) {
			$isSearchColumn = true;
			$search_value = $this->input->post('search')['value'];
			$search = array(
				"users.first_name" => $search_value,
				"users.nik" => $search_value
			);
		}
		$limit = $this->input->post('length');
		$start = $this->input->post('start');
		$datas = $this->user_model->getAllBy($limit, $start, $search, $order, $dir, $where);

		$new_data = array();
		if (!empty($datas)) {
			foreach ($datas as $key => $data) {

				$edit_url = "";
				$delete_url = "";
				$delete_url_hard = "";
				$reset_p_url = "";

				if ($this->data['is_can_edit'] && $data->is_deleted == 0) {
					$edit_url = "<a href='" . base_url() . "user/edit/" . $data->id . "' class='btn btn-sm white btn-info'><i class='fas fa-edit'></i> Ubah</a>";
					$reset_p_url = "<a href='#' class='btn btn-sm btn-primary reset_password' data-id='" . $data->id . "'  url='" . base_url() . "user/reset_password/" . $data->id . "/1'><i class='fas fa-pencil-alt me-2'></i> Reset Password</a>";
				}
				if ($this->data['is_can_delete']) {
					if ($data->is_deleted == 0) {
						$delete_url = "<a href='#' 
	        				url='" . base_url() . "user/destroy/" . $data->id . "/" . $data->is_deleted . "'
	        				class='btn btn-sm white btn-danger delete' ><i class='fas fa-times'></i> NonAktifkan
	        				</a>";
					} else {
						$delete_url = "<a href='#' 
	        				url='" . base_url() . "user/destroy/" . $data->id . "/" . $data->is_deleted . "'
	        				class='btn btn-sm btn-primary white delete' 
	        				 ><i class='fas fa-check'></i> Aktifkan
	        				</a>";
						$delete_url_hard = "<a href='#' 
	        				url='" . base_url() . "user/destroy_hard/" . $data->id . "/" . $data->is_deleted . "'
	        				class='btn btn-sm btn-danger white delete' 
	        				 ><i class='fas fa-trash'></i> Delete 
	        				</a>";
					}
				}


				$nestedData['id'] = $start + $key + 1;
				$nestedData['unit_kerja'] = $data->unit_kerja_name;
				$nestedData['role_name'] = $data->role_name;
				$nestedData['name'] = $data->first_name . ' ' . $data->last_name;
				// $nestedData['phone'] = $data->phone; 
				// $nestedData['email'] = $data->email;
				$nestedData['nik'] = $data->nik;
				$nestedData['action'] = $edit_url . " " . $delete_url . " " . $delete_url_hard . " " . $reset_p_url;
				$new_data[] = $nestedData;
			}
		}

		$json_data = array(
			"draw" => intval($this->input->post('draw')),
			"recordsTotal" => intval($totalData),
			"recordsFiltered" => intval($totalFiltered),
			"data" => $new_data
		);

		echo json_encode($json_data);
	}

	public function destroy()
	{
		$response_data = array();
		$response_data['status'] = false;
		$response_data['msg'] = "";
		$response_data['data'] = array();

		$id = $this->uri->segment(3);
		$is_deleted = $this->uri->segment(4);
		if (!empty($id)) {
			$this->load->model("user_model");
			$data = array(
				'is_deleted' => ($is_deleted == 1) ? 0 : 1
			);
			$update = $this->user_model->update($data, array("id" => $id));

			$response_data['data'] = $data;
			$response_data['status'] = true;
		} else {
			$response_data['msg'] = "ID Harus Diisi";
		}

		echo json_encode($response_data);
	}
	public function destroy_hard()
	{
		$response_data = array();
		$response_data['status'] = false;
		$response_data['msg'] = "";
		$response_data['data'] = array();

		$id = $this->uri->segment(3);
		$is_deleted = $this->uri->segment(4);
		if (!empty($id)) {
			$this->load->model("roles_model");
			$data = array(
				'is_deleted' => ($is_deleted == 1) ? 0 : 1
			);
			$update = $this->user_model->delete(array("id" => $id));

			$response_data['data'] = $data;
			$response_data['status'] = true;
		} else {
			$response_data['msg'] = "ID Harus Diisi";
		}

		echo json_encode($response_data);
	}
	public function reset_password($id, $status)
	{
		$response_data = array();
		$response_data['status'] = false;
		$response_data['msg'] = "";
		$response_data['data'] = array();

		if (!empty($id)) {
			$where = ['users.id' => $id];
			$password = $this->generate_password();
			$data = array(
				'password' => $password['hash_password'],
			);
			$update = $this->user_model->update($data, $where);
			$response_data['data'] = $data;
			$response_data['msg'] = "Sukses Menonaktifkan Data";
			$response_data['status'] = true;
		} else {
			$response_data['msg'] = "ID Kosong";
		}
		echo json_encode($response_data);
	}
	public function generate_password()
	{
		$password = 0;
		$this->load->library('Bcrypt');

		$password = "AkhlakPTSI01";
		$hash_password = $this->bcrypt->hash($password);
		$data = array(
			"password" => $password,
			"hash_password" => $hash_password,
		);

		return $data;
	}
}