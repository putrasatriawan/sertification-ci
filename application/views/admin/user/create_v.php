<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div>Tambah Pengguna <div class="page-title-subheading"> </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8 offset-md-2">
                <form method="POST"
                      enctype="
                      multipart/form-data">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="inputEmail3"
                                       class="col-sm-3 control-label">Nama</label>
                                <div class="col-sm-9">
                                    <input type="name"
                                           class="form-control"
                                           id="name"
                                           placeholder="Masukan Nama"
                                           name="name">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 control-label">NIK</label>
                                <div class="col-sm-9">
                                    <input type="number"
                                           class="form-control"
                                           id="nik"
                                           placeholder="Masukan NIK"
                                           name="nik">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3"
                                       class="col-sm-3 control-label">Email</label>
                                <div class="col-sm-9">
                                    <input type="email"
                                           class="form-control"
                                           id="email"
                                           placeholder="Masukan Email"
                                           name="email">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3"
                                       class="col-sm-3 control-label">Bidang</label>
                                <div class="col-sm-9">
                                    <select class="form-control"
                                            name="unit_kerja">
                                        <option selected
                                                hidden
                                                disabled>Pilih Unit Kerja</option><?php
                                                foreach ($unit_kerja as $key => $value) { ?> <option value="<?php echo $value->id ?>"><?php echo $value->name ?>
                                                                            </option> <?php
                                                }
                                                ?>
                                    </select>
                                </div>
                            </div>
                            <hr>
<div class="form-group row">
    <label for="inputPassword3" class="col-sm-3 control-label">Jabatan</label>
    <div class="col-sm-9">
        <select id="role_id" name="role_id" class="form-control">
            <option value="">Pilih Jabatan</option>
            <?php foreach ($roles as $key => $role) { ?>
                            <option value="<?php echo $role->id; ?>" data-role-name="<?php echo $role->name; ?>">
                                <?php echo $role->name; ?>
                            </option>
            <?php } ?>
        </select>
    </div>
</div>

<div id="mata_pelajaran_dropdown" class="form-group row" style="display: none;">
    <label for="inputPassword3" class="col-sm-3 control-label">Mata Pelajaran</label>
    <div class="col-sm-9">
        <select id="mata_pelajaran_id" name="mata_pelajaran_id" class="form-control">
            <option value="">Pilih Mata Pelajaran</option>
            <?php foreach ($mata_pelajaran as $key => $mata_pelajaran_item) { ?>
                            <option value="<?php echo $mata_pelajaran_item->id; ?>">
                                <?php echo $mata_pelajaran_item->name; ?>
                            </option>
            <?php } ?>
        </select>
    </div>
</div>  

                            <div class="form-group row">
                                <label for="inputPassword3"
                                       class="col-sm-3 control-label">Password</label>
                                <div class="col-sm-9">
                                    <input type="password"
                                           class="form-control"
                                           id="password"
                                           name="password">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3"
                                       class="col-sm-3 control-label">Ulangi Password</label>
                                <div class="col-sm-9">
                                    <input type="password"
                                           class="form-control"
                                           id="password_confirm"
                                           name="password_confirm">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-light align-items-center justify-content-end">
                            <a href="<?php echo base_url() ?>user"
                               class="btn btn-outline-secondary mr-2">
                                <span class="btn-icon-wrapper pr-2 opacity-7">
                                    <i class="fa fa-times fa-w-20"></i>
                                </span>Batal </a>
                            <button type="submit"
                                    class="btn btn-primary">
                                <span class="btn-icon-wrapper pr-2 opacity-7">
                                    <i class="fa fa-save fa-w-20"></i>
                                </span>Simpan </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script data-main="<?php echo base_url() ?>assets/js/main/main-user"
        src="<?php echo base_url() ?>assets/js/require.js"></script>