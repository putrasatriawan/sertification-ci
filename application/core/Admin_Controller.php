<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin_Controller extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->data = array();
		$this->load->model("menu_model");


		$this->data['menu'] = $this->loadMenu();


	}
	private function isInPrivilleges($data, $id)
	{
		if (!empty($data)) {
			for ($i = 0; $i < count($data); $i++) {
				if (isset($data[$i]) && $data[$i]->function_id == $id) {
					return true;
				}
			}
		}

		return false;
	}
	private function createTree($parent, $menu, $parent_id, $path_active_name)
	{
		$html = "";
		if (isset($menu['parents'][$parent])) {
			if ($parent == 1) {
				$html .= '<ul class="vertical-nav-menu metismenu">';
			} else {
				$class = ($parent == $parent_id) ? '' : '';
				// $html .= '<ul class=' . $class . '>';
			}
			foreach ($menu['parents'][$parent] as $itemId) {
				$id = $menu['items'][$itemId]['id'];
				$url = $menu['items'][$itemId]['url'];
				$urlText = $menu['items'][$itemId]['url-text'];
				$icon = $menu['items'][$itemId]['icon'];
				$name = $menu['items'][$itemId]['name'];
				$description = $menu['items'][$itemId]['description'];

				if (!isset($menu['parents'][$itemId])) {
					$class = ($path_active_name == strtolower($urlText)) ? 'class="mm-active"' : 'class="mm"';
					$active = ($path_active_name == strtolower($urlText)) ? 'mm-active' : '';

					// Hapus atribut data-description
					$html .= '<li ' . $class . '>
						<a href="' . $url . '" class="' . $active . '">
							<i class="metismenu-icon ' . $icon . '"></i>
							' . $name . '
						</a>';
				} else {
					$class = ($id == $parent_id) ? 'show active' : '';
					$active = ($path_active_name == strtolower($urlText)) ? 'active' : '';
					$expanded = ($class == 'show active' || $active == 'active') ? 'true' : 'false';
					$is_expand = ($class == 'show active' || $active == 'active') ? "mm-active" : '';
					$submenuId = 'submenu-' . $id;

					// Pengecekan apakah deskripsi ada sebelum menampilkan elemen deskripsi
					$descriptionHtml = '';

					// Check if the current item is not expanded and description is not empty
					if ($expanded !== 'true' && !empty($description)) {
						$descriptionHtml = '<div class="menu-description" data-toggle="tooltip" data-placement="right" title="' . $description . '"></div>';
					}

					// Tambahkan deskripsi dengan class "menu-description" jika deskripsi ada
					$html .= '<li class="' . $is_expand . '" data-toggle="tooltip" data-placement="right" title="' . htmlspecialchars($description) . '">
					<a href="#" class="' . $active . '">
						<i class="metismenu-icon ' . $icon . '"></i> 
						' . $name . '
						<i class="metismenu-state-icon pe-7s-angle-down caret-left"></i> 
					</a>';


					// Include the description inside the app-main
					// $html .= '<div class="app-main">' . $descriptionHtml . '</div>';

					$html .= '<ul class="' . $class . '" id="' . $submenuId . '">';
					$html .= $this->createTree($itemId, $menu, $parent_id, $path_active_name);
					$html .= '</ul>';
					$html .= "</li>";

				}

			}
			// $html .= "</ul>";
		}
		return $html;
	}






	private function loadMenu()
	{

		$menus = $this->menu_model->getMenuSuperadmin();


		if (empty($menus))
			return "";

		$new_menus = array();

		foreach ($menus as $key => $value) {
			$new_menus[$value->id] = array();
			$new_menus[$value->id]['id'] = $value->id;
			$new_menus[$value->id]['name'] = $value->name;
			$new_menus[$value->id]['url'] = base_url() . $value->url;
			$new_menus[$value->id]['url-text'] = $value->url;
			$new_menus[$value->id]['parent_id'] = $value->parent_id;
			$new_menus[$value->id]['icon'] = $value->icon;
			$new_menus[$value->id]['description'] = $value->description;
		}

		$tree_menu = array(
			'items' => array(),
			'parents' => array()
		);
		foreach ($new_menus as $a) {
			$tree_menu['items'][$a['id']] = $a;
			// Creates list of all items with children
			$tree_menu['parents'][$a['parent_id']][] = $a['id'];
		}
		$path_active_name = $this->uri->segment(1);
		if (!empty($this->uri->segment(2))) {
			if ($this->uri->segment(2) !== "create" && $this->uri->segment(2) !== "edit" && $this->uri->segment(2) !== "detail" && $this->uri->segment(2) !== "importExcel" && $this->uri->segment(2) !== "exportJson") {
				$path_active_name = $this->uri->segment(1) . "/" . $this->uri->segment(2);
			}
		}

		$data_parent = $this->menu_model->getParentIdBy(array("URL" => $path_active_name));
		$data_menu = $this->menu_model->getDetailMenuBy(array("URL" => $path_active_name));

		$parent_id = (!empty($data_parent)) ? $data_parent->parent_id : 0;
		if ($data_parent) {
			$parent = $this->menu_model->getParentIdBy(array("id" => $data_parent->parent_id));
		}

		$this->data['page_description'] = (!empty($data_menu)) ? $data_menu->description : "";
		$this->data['parent_page_name'] = (!empty($parent)) ? $parent->name : "";
		$this->data['page'] = (!empty($data_menu)) ? $data_menu->name : "";
		$this->data['page_id'] = (!empty($data_menu)) ? $data_menu->id : "";
		$this->session->set_userdata(array("page_id" => $this->data['page_id']));
		return $this->createTree(1, $tree_menu, $parent_id, $path_active_name);
	}
}

