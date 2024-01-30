<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Skema_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
    }
    public function getAllById($where = array())
    {
        $this->db->select("skema.*")->from("skema");
        $this->db->where($where);
        $this->db->where("skema.is_deleted", 0);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        }
        return FALSE;
    }

    public function getOneBy($where = array())
    {
        $this->db->select("skema.*")->from("skema");
        $this->db->where("skema.is_deleted", 0);
        $this->db->where($where);

        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->row();
        }
        return FALSE;
    }
    public function insert($data)
    {
        $this->db->insert('skema', $data);
        return $this->db->insert_id();
    }
    public function update($data, $where)
    {
        $this->db->update('skema', $data, $where);
        return $this->db->affected_rows();
    }
    public function delete($where)
    {
        $this->db->where($where);
        $this->db->delete('skema');
        if ($this->db->affected_rows()) {
            return TRUE;
        }
        return FALSE;
    }
    public function insert_batch($data)
    {
        $this->db->insert_batch('skema', $data);
        return $this->db->insert_id();
    }
    function getAllBy($limit, $start, $search, $col, $dir)
    {
        $this->db->select("skema.*")->from("skema");

        $this->db->limit($limit, $start)->order_by($col, $dir);
        if (!empty($search)) {
            foreach ($search as $key => $value) {
                $this->db->or_like($key, $value);
            }
        }
        $result = $this->db->get();
        if ($result->num_rows() > 0) {
            return $result->result();
        } else {
            return null;
        }
    }
    function getCountAllBy($limit, $start, $search, $order, $dir)
    {
        $this->db->select("skema.*")->from("skema");
        if (!empty($search)) {
            foreach ($search as $key => $value) {
                $this->db->or_like($key, $value);
            }
        }
        $result = $this->db->get();
        return $result->num_rows();
    }



}