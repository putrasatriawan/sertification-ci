<?php
/**
 * @author   Natan Felles <natanfelles@gmail.com>
 */
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * Class Migration_create_table_api_limits
 *
 * @property CI_DB_forge         $dbforge
 * @property CI_DB_query_builder $db
 */
class Migration_create_table_peserta extends CI_Migration
{


	public function up()
	{
		$table = "peserta";
		$fields = array(
			'id' => [
				'type' => 'INT(11)',
				'auto_increment' => TRUE,
				'unsigned' => TRUE,
			],
			'kd_skema' => [
				'type' => 'VARCHAR(100)',
			],
			'nm_peserta' => [
				'type' => 'VARCHAR(100)',
			],
			'jekel' => [
				'type' => 'VARCHAR(100)',
			],
			'alamat' => [
				'type' => 'TEXT',
			],
			'no_hp' => [
				'type' => 'VARCHAR(100)',
			],
			'is_deleted' => [
				'type' => 'TINYINT(4)',
				'default' => '0'
			],

		);
		$this->dbforge->add_field($fields);
		$this->dbforge->add_key('id', TRUE);
		$this->dbforge->create_table($table);

	}


	public function down()
	{
		$table = "peserta";
		if ($this->db->table_exists($table)) {
			$this->db->query(drop_foreign_key($table, 'api_key'));
			$this->dbforge->drop_table($table);
		}
	}

}