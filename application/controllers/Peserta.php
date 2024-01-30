<?php
defined('BASEPATH') or exit('No direct script access allowed');
require_once APPPATH . 'core/Admin_Controller.php';
class Peserta extends Admin_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Peserta_model');
		$this->load->model('Skema_model');
	}
	public function index()
	{
		$this->data['content'] = 'admin/peserta/list_v';
		$this->data['peserta'] = $this->Peserta_model->getAllById();

		$this->load->view('admin/layouts/page', $this->data);
	}


	public function create()
	{

		$this->form_validation->set_rules('kd_skema', "Kode Skema", 'trim|required');
		if ($this->form_validation->run() === TRUE) {
			$data = array(
				'kd_skema' => $this->input->post('kd_skema'),
				'nm_peserta' => $this->input->post('nm_peserta'),
				'jekel' => $this->input->post('jekel'),
				'alamat' => $this->input->post('alamat'),
				'no_hp' => $this->input->post('alamat'),
				'is_deleted' => 0
			);
			$insert = $this->Peserta_model->insert($data);
			if ($insert) {
				$this->session->set_flashdata('message', "Peserta Baru Berhasil Disimpan");
				redirect("peserta");
			} else {
				$this->session->set_flashdata('message_error', 'Peserta Baru Gagal Disimpan');
				redirect("peserta");
			}
		} else {
			$this->data['skema'] = $this->Skema_model->getAllById();
			$this->data['content'] = 'admin/peserta/create_v';
			$this->load->view('admin/layouts/page', $this->data);
		}
	}

	public function edit($id)
	{

		$this->form_validation->set_rules('nm_peserta', "Jumlah Unit", 'trim|required');

		if ($this->form_validation->run() === TRUE) {
			$data = array(
				'kd_skema' => $this->input->post('kd_skema'),
				'nm_peserta' => $this->input->post('nm_peserta'),
				'jekel' => $this->input->post('jekel'),
				'alamat' => $this->input->post('alamat'),
				'no_hp' => $this->input->post('alamat'),
				'is_deleted' => 0
			);
			$update = $this->Peserta_model->update($data, array("peserta.id" => $id));

			if ($update) {
				$this->session->set_flashdata('message', "Peserta Baru Berhasil Diubah");
				redirect("peserta", "refresh");
			} else {
				$this->session->set_flashdata('message_error', "Peserta Baru Gagal Dirubah");
				redirect("peserta", "refresh");
			}
		} else {
			if (!empty($_POST)) {
				$id = $this->input->post('id');
				$this->session->set_flashdata('message_error', validation_errors());
				return redirect("peserta/edit/" . $id);
			} else {
				$this->data['id'] = $id;
				$data = $this->Peserta_model->getOneBy(array("peserta.id" => $this->data['id']));
				$this->data['kd_skema'] = (!empty($data)) ? $data->kd_skema : "";
				$this->data['skema'] = $this->Skema_model->getAllById();
				$this->data['nm_peserta'] = (!empty($data)) ? $data->nm_peserta : "";
				$this->data['jekel'] = (!empty($data)) ? $data->jekel : "";
				$this->data['alamat'] = (!empty($data)) ? $data->alamat : "";
				$this->data['no_hp'] = (!empty($data)) ? $data->no_hp : "";
				$this->data['content'] = 'admin/peserta/edit_v';
				$this->load->view('admin/layouts/page', $this->data);
			}
		}
	}

	public function dataList()
	{
		$columns = array(
			0 => 'id',
			1 => 'kd_skema',
			2 => 'nm_skema',
			3 => 'nm_peserta',
			4 => 'jekel',
			5 => 'alamat',
			6 => 'no_hp',
			7 => ''
		);
		$order = $columns[$this->input->post('order')[0]['column']];
		$dir = $this->input->post('order')[0]['dir'];
		$search = array();
		$where = array();
		$limit = 0;
		$start = 0;
		$totalData = $this->Peserta_model->getCountAllBy($limit, $start, $search, $order, $dir, $where);



		if (!empty($this->input->post('search')['value'])) {
			$search_value = $this->input->post('search')['value'];
			$search = array(
				"peserta.nm_peserta" => $search_value,
			);
			$totalFiltered = $this->Peserta_model->getCountAllBy($limit, $start, $search, $order, $dir, $where);
		} else {
			$totalFiltered = $totalData;
		}
		$limit = $this->input->post('length');
		$start = $this->input->post('start');
		$datas = $this->Peserta_model->getAllBy($limit, $start, $search, $order, $dir, $where);

		$new_data = array();
		if (!empty($datas)) {
			foreach ($datas as $key => $data) {

				$edit_url = "";
				$delete_url = "";
				$delete_url_hard = "";

				if ($data->is_deleted == 0) {
					$edit_url = "<a href='" . base_url() . "peserta/edit/" . $data->id . "' class='btn btn-sm white btn-info'><i class='fas fa-edit'></i> Ubah</a>";
				}

				$delete_url = "";
				if ($data->is_deleted == 0) {
					$delete_url = "<a href='#' 
							url='" . base_url() . "peserta/destroy/" . $data->id . "/" . $data->is_deleted . "'
								class='btn btn-sm white btn-danger delete' 
							><i class='fas fa-times'></i> Nonaktifkan</a>";
				} else {
					$delete_url = "<a href='#' 
								url='" . base_url() . "peserta/destroy/" . $data->id . "/" . $data->is_deleted . "'
								class='btn btn-sm btn-primary white delete' 
							><i class='fas fa-check'></i> Aktifkan</a>";

					$delete_url_hard = "<a href='#' 
								url='" . base_url() . "peserta/destroy_hard/" . $data->id . "/" . $data->is_deleted . "'
								class='btn btn-sm btn-danger white delete' 
							><i class='fas fa-trash'></i> Delete</a>";
				}


				$nestedData['id'] = $start + $key + 1;
				$nestedData['kd_skema'] = $data->kd_skema;
				$nestedData['nm_skema'] = $data->nm_skema;
				$nestedData['nm_peserta'] = $data->nm_peserta;
				$nestedData['alamat'] = $data->alamat;
				$nestedData['no_hp'] = $data->no_hp;
				$nestedData['jekel'] = $data->jekel;
				$nestedData['action'] = $edit_url . " " . $delete_url . " " . $delete_url_hard;
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
			$this->load->model("Peserta_model");
			$data = array(
				'is_deleted' => ($is_deleted == 1) ? 0 : 1
			);
			$update = $this->Peserta_model->update($data, array("id" => $id));

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
			$this->load->model("Peserta_model");
			$data = array(
				'is_deleted' => ($is_deleted == 1) ? 0 : 1
			);
			$update = $this->Peserta_model->delete(array("id" => $id));

			$response_data['data'] = $data;
			$response_data['status'] = true;
		} else {
			$response_data['msg'] = "ID Harus Diisi";
		}

		echo json_encode($response_data);
	}

}