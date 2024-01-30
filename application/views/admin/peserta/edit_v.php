<div class="app-main__outer">
    <div class="app-main__inner">
        <div class="app-page-title">
            <div class="page-title-wrapper">
                <div class="page-title-heading">
                    <div>Ubah Peserta </div>
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
                                <label class="col-sm-3 form-label">Nama Peserta</label>
                                <div class="col-sm-9">
                                    <input type="text"
                                           name="nm_peserta"
                                           value="<?php echo $nm_peserta ?>"
                                           class="form-control"
                                           placeholder="Masukkan Kode Skema">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-label">Nama Skema</label>
                                <div class="col-sm-9">
                                <select class="form-control"
                                        name="kd_skema">
                                    <option selected
                                            hidden
                                            disabled>Pilih Skema</option> <?php foreach ($skema as $uk): ?>
                                                                        <option value="<?php echo $uk->kd_skema ?>"
                                                                                <?php echo ($uk->kd_skema == $kd_skema) ? 'selected' : '' ?>>
                                                                            <?php echo $uk->nm_skema ?></option> <?php endforeach; ?>
                                </select>
                                </div>
                            </div>
                          <div div class="form-group row">
                                <label class="col-sm-3 form-label">Jenis Kelamin</label>
                                <div class="col-sm-9">
                                    <label>
                                        <input type="radio" name="jekel" value="Laki-laki" <?php echo ($jekel == 'Laki-laki') ? 'checked' : ''; ?>>
                                        Laki-laki
                                    </label>
                                    <label>
                                        <input type="radio" name="jekel" value="Perempuan" <?php echo ($jekel == 'Perempuan') ? 'checked' : ''; ?>>
                                        Perempuan
                                    </label>
                                </div>
                            </div>


                            <div class="form-group row">
                                <label class="col-sm-3 form-label">Alamat</label>
                                <div class="col-sm-9">
                                    <textarea name="alamat" class="form-control" id="" cols="30" rows="10"><?php echo $alamat ?>
</textarea>
                                </div> 
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 form-label">No Hp</label>
                                <div class="col-sm-9">
                                    <input type="text"
                                           name="no_hp"
                                           value="<?php echo $no_hp ?>"
                                           class="form-control"
                                           placeholder="Masukkan No Hp">
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