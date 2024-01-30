<?php
defined('BASEPATH') or exit('No direct script access allowed');
require_once APPPATH . 'core/Admin_Controller.php';
class Sertifikasi extends Admin_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Skema_model');
	}
	public function index()
	{

		$this->data['content'] = 'admin/sertifikasi/list_v';
		$this->data['sertifikasi'] = $this->Skema_model->getAllById();
		$this->load->view('admin/layouts/page', $this->data);
	}


	public function create()
	{

		$this->form_validation->set_rules('jml_unit', "Jumlah Unit", 'trim|required');
		if ($this->form_validation->run() === TRUE) {


			$data = array(
				'kd_skema' => $this->input->post('kd_skema'),
				'nm_skema' => $this->input->post('nm_skema'),
				'jenis' => $this->input->post('jenis'),
				'jml_unit' => $this->input->post('jml_unit'),
				'is_deleted' => 0
			);
			$insert = $this->Skema_model->insert($data);
			if ($insert) {
				$this->session->set_flashdata('message', "Sertifikasi Baru Berhasil Disimpan");
				redirect("sertifikasi");
			} else {
				$this->session->set_flashdata('message_error', 'Sertifikasi Baru Gagal Disimpan');
				redirect("sertifikasi");
			}
		} else {
			$this->data['content'] = 'admin/sertifikasi/create_v';
			$this->load->view('admin/layouts/page', $this->data);
		}
	}

	public function edit($id)
	{

		$this->form_validation->set_rules('jml_unit', "Jumlah Unit", 'trim|required');

		if ($this->form_validation->run() === TRUE) {
			$data = array(
				'kd_skema' => $this->input->post('kd_skema'),
				'nm_skema' => $this->input->post('nm_skema'),
				'jenis' => $this->input->post('jenis'),
				'jml_unit' => $this->input->post('jml_unit'),
				'is_deleted' => 0
			);
			$update = $this->Skema_model->update($data, array("skema.id" => $id));

			if ($update) {
				$this->session->set_flashdata('message', "Sertifikasi Baru Berhasil Diubah");
				redirect("sertifikasi", "refresh");
			} else {
				$this->session->set_flashdata('message_error', "Sertifikasi Baru Gagal Dirubah");
				redirect("sertifikasi", "refresh");
			}
		} else {
			if (!empty($_POST)) {
				$id = $this->input->post('id');
				$this->session->set_flashdata('message_error', validation_errors());
				return redirect("sertifikasi/edit/" . $id);
			} else {
				$this->data['id'] = $id;
				$data = $this->Skema_model->getOneBy(array("skema.id" => $this->data['id']));
				$this->data['kd_skema'] = (!empty($data)) ? $data->kd_skema : "";
				$this->data['nm_skema'] = (!empty($data)) ? $data->nm_skema : "";
				$this->data['jenis'] = (!empty($data)) ? $data->jenis : "";
				$this->data['jml_unit'] = (!empty($data)) ? $data->jml_unit : "";
				$this->data['content'] = 'admin/sertifikasi/edit_v';
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
			3 => 'jenis',
			4 => 'jml_unit',
			5 => ''
		);
		$order = $columns[$this->input->post('order')[0]['column']];
		$dir = $this->input->post('order')[0]['dir'];
		$search = array();
		$where = array();
		$limit = 0;
		$start = 0;
		$totalData = $this->Skema_model->getCountAllBy($limit, $start, $search, $order, $dir, $where);



		if (!empty($this->input->post('search')['value'])) {
			$search_value = $this->input->post('search')['value'];
			$search = array(
				"skema.kd_skema" => $search_value,
				"skema.nm_skema" => $search_value,
				"skema.jenis" => $search_value,
			);
			$totalFiltered = $this->Skema_model->getCountAllBy($limit, $start, $search, $order, $dir, $where);
		} else {
			$totalFiltered = $totalData;
		}
		$limit = $this->input->post('length');
		$start = $this->input->post('start');
		$datas = $this->Skema_model->getAllBy($limit, $start, $search, $order, $dir, $where);

		$new_data = array();
		if (!empty($datas)) {
			foreach ($datas as $key => $data) {

				$edit_url = "";
				$delete_url = "";
				$delete_url_hard = "";

				if ($data->is_deleted == 0) {
					$edit_url = "<a href='" . base_url() . "sertifikasi/edit/" . $data->id . "' class='btn btn-sm white btn-info'><i class='fas fa-edit'></i> Ubah</a>";

					$delete_url = "<a href='#' 
        url='" . base_url() . "sertifikasi/destroy/" . $data->id . "/" . $data->is_deleted . "'
        class='btn btn-sm white btn-danger delete' 
    ><i class='fas fa-times'></i> Nonaktifkan</a>";
				} else {

					$delete_url = "<a href='#' 
        url='" . base_url() . "sertifikasi/destroy/" . $data->id . "/" . $data->is_deleted . "'
        class='btn btn-sm btn-primary white delete' 
    ><i class='fas fa-check'></i> Aktifkan</a>";

					$delete_url_hard = "<a href='#' 
        url='" . base_url() . "sertifikasi/destroy_hard/" . $data->id . "/" . $data->is_deleted . "'
        class='btn btn-sm btn-danger white delete' 
    ><i class='fas fa-trash'></i> Delete</a>";
				}

				$nestedData['id'] = $start + $key + 1;
				$nestedData['kd_skema'] = $data->kd_skema;
				$nestedData['nm_skema'] = $data->nm_skema;
				$nestedData['jenis'] = $data->jenis;
				$nestedData['jml_unit'] = $data->jml_unit;
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
			$this->load->model("Skema_model");
			$data = array(
				'is_deleted' => ($is_deleted == 1) ? 0 : 1
			);
			$update = $this->Skema_model->update($data, array("id" => $id));

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
			$this->load->model("Skema_model");
			$data = array(
				'is_deleted' => ($is_deleted == 1) ? 0 : 1
			);
			$update = $this->Skema_model->delete(array("id" => $id));

			$response_data['data'] = $data;
			$response_data['status'] = true;
		} else {
			$response_data['msg'] = "ID Harus Diisi";
		}

		echo json_encode($response_data);
	}

}