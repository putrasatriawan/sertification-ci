<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div>Pengguna <div class="page-title-subheading">Pengguna User</div>
                    </div>
                </div>
                <div class="page-title-actions">
                    <a href="<?php echo base_url() ?>user/create"
                       class="btn-shadow mr-3 btn btn-success">
                        <span class="btn-icon-wrapper pr-2 opacity-7">
                            <i class="fa fa-plus fa-w-20"></i>
                        </span> Tambah </a>
                </div>
            </div>
        </div>
        <div class="main-card mb-3 card">
            <div class="card-body">
                <p class="title">Filter</p>
                <div class="row">
                    <div class="col-lg-3">
                        <select class="form-control"
                                id="filter-unit-kerja"
                                name="unit_kerja">
                            <option selected
                                    hidden
                                    disabled>Pilih Unit Kerja</option>
                            <?php foreach ($unit_kerja as $key => $value) { ?> <option value="<?php echo $value->id ?>">
                                <?php echo $value->name ?></option> <?php } ?>
                        </select>
                    </div>
                    <div class="col-lg-3">
                        <select class="form-control"
                                id="filter-roles"
                                name="role_name">
                            <option selected
                                    hidden
                                    disabled>Pilih Jabatan</option> <?php foreach ($roles as $key => $value) { ?>
                            <option value="<?php echo $value->name ?>"> <?php echo $value->name ?></option> <?php } ?>
                        </select>
                    </div>
                    <div class="col-lg-3">
                        <button id="btn-apply-filter"
                                class="btn btn-primary mr-2">Terapkan</button>
                        <button id="btn-reset-filter"
                                class="btn btn-outline-danger">Reset</button>
                    </div>
                </div>
                <hr> <?php if (!empty($this->session->flashdata('message'))) { ?> <div class="alert alert-info"> <?php
              print_r($this->session->flashdata('message'));
              ?> </div> <?php } ?> <?php if (!empty($this->session->flashdata('message_error'))) { ?> <div
                     class="alert alert-info"> <?php
              print_r($this->session->flashdata('message_error'));
              ?> </div> <?php } ?> <table class="table table-striped dt-responsive "
                       id="table"
                       style="width:100%;">
                    <thead>
                        <th>No Urut</th>
                        <th>Unit Kerja</th>
                        <th>Jabatan</th>
                        <th>Nama</th>
                        <th>NIK</th>
                        <th>Aksi</th>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<script data-main="<?php echo base_url() ?>assets/js/main/main-user"
        src="<?php echo base_url() ?>assets/js/require.js">
</script>