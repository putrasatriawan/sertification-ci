define(["datatablesBS4", "jqvalidate"], function (datatablesBS4, jqvalidate) {
  return {
    table: null,
    init: function () {
      App.initFunc();
      App.initEvent();
      App.initConfirm();
      $(".loadingpage").hide();
    },
    initEvent: function () {
      App.table = $("#table").DataTable({
        language: {
          search: "Cari",
          lengthMenu: "Tampilkan _MENU_ baris per halaman",
          zeroRecords: "Data tidak ditemukan",
          info: "Menampilkan _PAGE_ dari _PAGES_",
          infoEmpty: "Tidak ada data yang ditampilkan ",
          infoFiltered: "(pencarian dari _MAX_ total records)",
          paginate: {
            first: "Pertama",
            last: "Terakhir",
            next: "Selanjutnya",
            previous: "Sebelum",
          },
        },
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
          url: App.baseUrl + "peserta/dataList",
          dataType: "json",
          type: "POST",
        },
        columns: [
          { data: "id" },
          { data: "kd_skema" },
          { data: "nm_skema" },
          { data: "nm_peserta" },
          { data: "jekel" },
          { data: "alamat" },
          { data: "action", orderable: false },
        ],
      });

      if ($("#form-peserta").length > 0) {
        $("#save-btn").removeAttr("disabled");
        $("#form-peserta").validate({
          rules: {
            kd_skema: {
              required: true,
            },
            nm_skema: {
              required: true,
            },
            nm_peserta: {
              required: true,
            },
            jekel: {
              required: true,
            },
            alamat: {
              required: true,
            },
            no_hp: {
              required: true,
            },
          },
          messages: {
            kd_skema: {
              required: "Kode Skema Harus Diisi",
            },
            nm_skema: {
              required: "Nama Skema Harus Diisi",
            },
            nm_peserta: {
              required: "Nama Peserta Harus Diisi",
            },
            jekel: {
              required: "Jenis Kelamin Harus Diisi",
            },
            alamat: {
              required: "Alamat Harus Diisi",
            },
            no_hp: {
              required: "No HP Harus Diisi",
            },
          },
          errorPlacement: function (error, element) {
            var name = element.attr("name");
            var errorSelector = '.form-control-feedback[for="' + name + '"]';
            var $element = $(errorSelector);
            if ($element.length) {
              $(errorSelector).html(error.html());
            } else {
              error.insertAfter(element);
            }
          },
          submitHandler: function (form) {
            // console.log(form);
            form.submit();
          },
        });
      }
    },
    initConfirm: function () {
      $("#table tbody").on("click", ".delete", function () {
        var url = $(this).attr("url");
        App.confirm("Apakah Anda Yakin Untuk Mengubah Ini?", function () {
          $.ajax({
            method: "GET",
            url: url,
          }).done(function (msg) {
            App.table.ajax.reload(null, true);
          });
        });
      });
    },
  };
});
