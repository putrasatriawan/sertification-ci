<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div>Detail Kelas </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-8 offset-md-2">
                <form method="POST"
                      id="form-unit-kerja"
                      enctype="multipart/form-data">
                    <div class="main-card mb-3 card">
                        <div class="card-body"> <?php
                        if (!empty($this->session->flashdata('message_error'))) { ?>     <div class="alert alert-danger"> <?php
                               print_r($this->session->flashdata('message_error'));
                               ?> </div> <?php } ?>
                                  <div class="form-group row">
                                <label class="col-sm-3 form-label">Kode Skema</label>
                                <div class="col-sm-9">
                                    <input type="text"
                                           name="kd_skema"
                                             value="<?php echo $kd_skema ?>"
                                           class="form-control"
                                           placeholder="Masukkan Kode Skema">
                                </div>
                            </div>  
                            <div class="form-group row">
                                <label class="col-sm-3 form-label">Nama Skema</label>
                                <div class="col-sm-9">
                                    <input type="text"
                                           name="nm_skema"
                                           value="<?php echo $nm_skema ?>"
                                           class="form-control"
                                           placeholder="Masukkan Nama Skema">
                                </div>
                            </div>
                           <div class="form-group row">
                                <label class="col-sm-3 form-label">Jenis</label>
                                <div class="col-sm-9">
                                    <select name="jenis" id="">
                                        <option hidden disabled>Pilih Jenis</option>
                                        <option value="KKNI" <?php echo ($jenis == 'KKNI') ? 'selected' : ''; ?>>KKNI</option>
                                        <option value="Klaster" <?php echo ($jenis == 'Klaster') ? 'selected' : ''; ?>>Klaster</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-label">Jumlah Unit</label>
                                <div class="col-sm-9">
                                    <input type="number"
                                           name="jml_unit"
                                           value="<?php echo $jml_unit ?>"
                                           class="form-control"
                                           placeholder="Masukkan Jumlah Unit">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-light align-items-center justify-content-end">
                            <a href="<?php echo base_url(); ?>sertifikasi"
                               class="btn btn-outline-secondary mr-2">
                                <span class="btn-icon-wrapper pr-2 opacity-7">
                                    <i class="fa fa-times fa-w-20"></i>
                                </span>Batal </a>
                            <button type="submit"
                                    id="save-btn"
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
<script data-main="<?php echo base_url() ?>assets/js/main/main-sertifikasi"
        src="<?php echo base_url() ?>assets/js/require.js">
</script>