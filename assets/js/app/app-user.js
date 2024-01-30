define(["toastr", "datatablesBS4", "jqvalidate"], function (
  toastr,
  datatablesBS4,
  jqvalidate
) {
  return {
    table: null,
    init: function () {
      App.initFunc();
      App.initEvent();
      App.initConfirm();

      App.searchTable();
      App.resetSearch();
      App.roleIdChangeGuru();

      // $(".dataTables_filter").hide();
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
        processing: true,
        serverSide: true,
        ajax: {
          url: App.baseUrl + "user/dataList",
          dataType: "json",
          type: "POST",
        },
        columns: [
          { data: "id" },
          { data: "unit_kerja" },
          { data: "role_name" },
          { data: "name" },
          { data: "nik" },
          { data: "action", orderable: false },
        ],
      });

      if ($("#form").length > 0) {
        $("#save-btn").removeAttr("disabled");
        $("#form").validate({
          rules: {
            name: {
              required: true,
            },
            email: {
              required: true,
            },
            nik: {
              required: true,
            },
            password: {
              required: $("#user_id").length <= 0,
              minlength: 8,
            },
            password_confirm: {
              required: $("#user_id").length <= 0,
              minlength: 8,
              equalTo: "#password",
            },
            role_id: {
              required: $("#user_id").length <= 0,
            },
          },
          messages: {
            name: {
              required: "Nama Harus Diisi",
            },
            email: {
              required: "Email Harus Diisi",
            },
            nik: {
              required: "Nik Harus Diisi",
            },
            password: {
              required: "Password Harus Diisi",
              minlength: "Minimal 8 ",
            },
            password_confirm: {
              required: "Ulangi Password Harus Diisi",
              minlength: "Minimal 8 ",
              equalTo: "Password Tidak Sama",
            },
            role_id: {
              required: "Role Harus Diisi",
            },
          },
          debug: false,

          errorPlacement: function (error, element) {
            var name = element.attr("name");
            console.log(name);
            var errorSelector = '.form-control-feedback[for="' + name + '"]';
            var $element = $(errorSelector);
            if ($element.length) {
              $(errorSelector).html(error.html());
            } else {
              error.insertAfter(element);
            }
          },
          submitHandler: function (form) {
            form.submit();
          },
        });
      }
    },

    roleIdChangeGuru: function () {
      $("#role_id").change(function () {
        var selectedRoleName = $(this).find(":selected").attr("data-role-name");

        // Menampilkan atau menyembunyikan dropdown mata pelajaran berdasarkan role
        if (selectedRoleName.toLowerCase() === "guru") {
          $("#mata_pelajaran_dropdown").show();
        } else {
          $("#mata_pelajaran_dropdown").hide();
        }
      });
    },
    searchTable: function () {
      $("#search").on("click", function () {
        console.log("SEARCH");
        var name = $("#name").val();
        var company_field = $("#company").val();
        var email = $("#email").val();

        App.table.column(3).search(name, true, true);
        App.table.column(5).search(email, true, true);

        App.table.draw();
      });
    },
    resetSearch: function () {
      $("#reset").on("click", function () {
        $("#name").val("");
        $("#company").val("");
        $("#email").val("");

        App.table.search("").columns().search("").draw();
      });
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

      $("#table tbody").on("click", ".reset_password", function () {
        var url = $(this).attr("url");
        var status = $(this).attr("data-status");
        var pesan = "Apakah Anda Yakin akan Mereset Password ini";
        App.confirm(pesan, function () {
          $.ajax({
            method: "GET",
            url: url,
          }).done(function (msg) {
            var data = JSON.parse(msg);
            if (data.status == false) {
              toastr.error(data.msg);
            } else {
              toastr.success(data.msg);
              App.table.ajax.reload(null, true);
            }
          });
        });
      });
    },
    searchTable: function () {
      $("#btn-apply-filter").on("click", function () {
        // var status = $("#filter-status").val();
        var unitKerja = $("#filter-unit-kerja").val();
        var roles = $("#filter-roles").val();

        if (unitKerja) {
          App.table.column(1).search(unitKerja, true, false);
        }
        if (roles) {
          App.table.column(2).search(roles, true, false);
        }

        App.table.draw();
      });
    },
    resetSearch: function () {
      $("#btn-reset-filter").on("click", function () {
        $("#filter-roles").val("");
        $("#filter-unit-kerja").val("");

        App.table.search("").columns().search("").draw();

        $("#filter-unit-kerja option:first")
          .prop("selected", true)
          .prop("hidden", true)
          .prop("disabled", true)[0].textContent = "Pilih Unit Kerja";
        $("#filter-roles option:first")
          .prop("selected", true)
          .prop("hidden", true)
          .prop("disabled", true)[0].textContent = "Pilih Jabatan";
      });
    },
  };
});
