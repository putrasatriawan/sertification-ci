define(["highcharts", "datepicker"], function (Highcharts, datepicker) {
  return {
    table: null,
    init: function () {
      App.initFunc();
      App.initEvent();
      App.unitAndYear();
      App.resetSearch();
      App.yearPicker();
      $(".loadingpage").hide();
    },
    initEvent: function () {
      App.graphAll();
      App.graphManual();
      App.graphProsedur();
      App.graphInstruksi();
      App.graphFormulir();
      App.graphDataRekaman();
    },
    graphAll: function () {
      $.ajax({
        url: App.baseUrl + "dashboard/get_all",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var categories = [];
          var seriesData = [];

          for (var table in response) {
            var tableData = [];
            var tableTotal = response[table].total;
            var tableAlias = response[table].alias; // Mengambil alias kustom dari data yang diterima

            response[table].data.forEach(function (item) {
              categories.push(item.name);
              tableData.push({
                y: parseInt(item.count),
                name: tableAlias, // Menggunakan alias kustom sebagai nama table
              });
            });

            seriesData.push({
              name: tableAlias,
              data: tableData,
              total: tableTotal,
            });
          }

          Highcharts.chart("graph-all", {
            chart: {
              type: "bar",
            },
            title: {
              text: "Total Semua Per Unit",
              align: "center",
            },
            xAxis: {
              categories: categories,
              title: {
                text: null,
              },
            },
            yAxis: {
              min: 0,
              title: {
                text: "Total Data",
                align: "high",
              },
              labels: {
                overflow: "justify",
                format: "{value}",
              },
              tickInterval: 1,
              gridLineWidth: 0,
            },
            legend: {
              align: "right",
              verticalAlign: "top",
              layout: "vertical",
            },
            tooltip: {
              formatter: function () {
                return this.point.name + ": " + this.point.y + " Unit";
              },
            },
            credits: {
              enabled: false,
            },
            series: seriesData,
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },

    // graphAll: function () {
    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_all",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (response) {
    //       var categories = [];
    //       var seriesData = [];

    //       for (var unit in response) {
    //         var tableData = response[unit];
    //         var tableTotal = tableData.total;
    //         var aliasList = "";

    //         for (var table in tableData.data) {
    //           var tableName = tableData.data[table].name;
    //           var tableCount = tableData.data[table].count;
    //           aliasList += tableName + ": " + tableCount + " Unit<br>";
    //         }

    //         categories.push(unit);
    //         seriesData.push({
    //           name: unit,
    //           data: [tableTotal],
    //           aliasList: aliasList,
    //         });
    //       }

    //       Highcharts.chart("graph-all", {
    //         chart: {
    //           type: "bar",
    //         },
    //         title: {
    //           text: "Total Semua Per Unit",
    //           align: "center",
    //         },
    //         xAxis: {
    //           categories: categories,
    //           title: {
    //             text: null,
    //           },
    //         },
    //         yAxis: {
    //           min: 0,
    //           title: {
    //             text: "Total Data",
    //             align: "high",
    //           },
    //           labels: {
    //             overflow: "justify",
    //             format: "{value}",
    //           },
    //           tickInterval: 1,
    //           gridLineWidth: 0,
    //         },
    //         legend: {
    //           enabled: false,
    //         },
    //         tooltip: {
    //           formatter: function () {
    //             return (
    //               "<b>" + this.x + "</b><br>" + this.series.options.aliasList
    //             );
    //           },
    //         },
    //         credits: {
    //           enabled: false,
    //         },
    //         series: seriesData,
    //       });
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //     },
    //   });
    // },

    graphManual: function () {
      $.ajax({
        url: App.baseUrl + "dashboard/get_manual",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var categories = [];
          var dataCounts = [];

          //   console.log(dataCounts);
          response.forEach(function (item) {
            categories.push(item.name);
            dataCounts.push(parseInt(item.count));
          });

          Highcharts.chart("graph-manual", {
            chart: {
              type: "bar",
            },
            title: {
              text: "Total Manual Per Unit",
              align: "center",
            },
            xAxis: {
              categories: categories,
              title: {
                text: null,
              },
            },
            yAxis: {
              min: 0,
              title: {
                text: "Total Data",
                align: "high",
              },
              labels: {
                overflow: "justify",
                format: "{value}",
              },
              tickInterval: 1,
              gridLineWidth: 0,
            },
            legend: { enabled: false },
            tooltip: {
              formatter: function () {
                return this.x + "<br><b>Total Unit: " + this.y + "</b>";
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                data: dataCounts,
              },
            ],
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },

    graphProsedur: function () {
      $.ajax({
        url: App.baseUrl + "dashboard/get_prosedur",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var categories = [];
          var dataCounts = [];
          var dataCountsTerbit = [];
          var dataCountsNull = [];

          response.forEach(function (item) {
            categories.push(item.name);
            dataCountsTerbit.push(parseInt(item.terbit_count));
            dataCountsNull.push(parseInt(item.null_count));
            dataCounts.push(parseInt(item.count));
          });

          // console.log("prosedur count", dataCountsNull);

          Highcharts.chart("graph-prosedur", {
            chart: {
              type: "bar",
              // height: 400,
            },
            title: {
              text: "Total Prosedur Per Unit",
              align: "center",
            },
            xAxis: {
              categories: categories,
              title: {
                text: null,
              },
            },
            yAxis: {
              min: 0,
              title: {
                text: "Total Data",
                align: "high",
              },
              labels: {
                overflow: "justify",
                format: "{value}",
              },
              tickInterval: 1,
              gridLineWidth: 0,
            },
            legend: { enabled: false },
            tooltip: {
              // formatter: function () {
              //   return (
              //     this.x +
              //     "<br><b>Total Unit: " +
              //     this.y +
              //     "</b><br>" +
              //     "Total Terbit: " +
              //     dataCountsTerbit[this.point.index] + // Menggunakan nilai langsung dari dataCountsTerbit
              //     "<br>" +
              //     "Total Waiting Approved: " +
              //     dataCountsNull[this.point.index] // Menggunakan nilai langsung dari dataCountsNull
              //   );
              // },
              formatter: function () {
                return this.x + "<br><b>Total Unit: " + this.y + "</b>";
              },
            },

            credits: {
              enabled: false,
            },
            series: [
              {
                data: dataCounts,
              },
            ],
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    graphInstruksi: function () {
      $.ajax({
        url: App.baseUrl + "dashboard/get_instruksi",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var categories = [];
          var dataCounts = [];

          //   console.log(dataCounts);
          response.forEach(function (item) {
            categories.push(item.name);
            dataCounts.push(parseInt(item.count));
          });

          Highcharts.chart("graph-instruksi", {
            chart: {
              type: "bar",
            },
            title: {
              text: "Total Instruksi Per Unit",
              align: "center",
            },
            xAxis: {
              categories: categories,
              title: {
                text: null,
              },
            },
            yAxis: {
              min: 0,
              title: {
                text: "Total Data",
                align: "high",
              },
              labels: {
                overflow: "justify",
                format: "{value}",
              },
              tickInterval: 1,
              gridLineWidth: 0,
            },
            legend: { enabled: false },
            tooltip: {
              formatter: function () {
                return this.x + "<br><b>Total Unit: " + this.y + "</b>";
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                data: dataCounts,
              },
            ],
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    graphFormulir: function () {
      $.ajax({
        url: App.baseUrl + "dashboard/get_formulir",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var categories = [];
          var dataCounts = [];

          //   console.log(dataCounts);
          response.forEach(function (item) {
            categories.push(item.name);
            dataCounts.push(parseInt(item.count));
          });

          Highcharts.chart("graph-formulir", {
            chart: {
              type: "bar",
            },
            title: {
              text: "Total Formulir Per Unit",
              align: "center",
            },
            xAxis: {
              categories: categories,
              title: {
                text: null,
              },
            },
            yAxis: {
              min: 0,
              title: {
                text: "Total Data",
                align: "high",
              },
              labels: {
                overflow: "justify",
                format: "{value}",
              },
              tickInterval: 1,
              gridLineWidth: 0,
            },
            legend: { enabled: false },
            tooltip: {
              formatter: function () {
                return this.x + "<br><b>Total Unit: " + this.y + "</b>";
              },
            },
            credits: {
              enabled: false,
            },
            series: [
              {
                data: dataCounts,
              },
            ],
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    graphDataRekaman: function () {
      $.ajax({
        url: "dashboard/get_rekaman",
        type: "GET",
        dataType: "json",
        success: function (response) {
          var categories = [];
          var seriesData = [];

          for (var table in response) {
            var tableData = [];
            var tableTotal = response[table].total;
            var tableAlias = response[table].alias; // Mengambil alias kustom dari data yang diterima

            response[table].data.forEach(function (item) {
              categories.push(item.name);
              tableData.push({
                y: parseInt(item.count),
                name: tableAlias, // Menggunakan alias kustom sebagai nama table
              });
            });

            seriesData.push({
              name: tableAlias,
              data: tableData,
              total: tableTotal,
            });
          }

          Highcharts.chart("graph-data-rekaman", {
            chart: {
              type: "bar",
            },
            title: {
              text: "Total Data Rekaman Per Unit",
              align: "center",
            },
            xAxis: {
              categories: categories,
              title: {
                text: null,
              },
            },
            yAxis: {
              min: 0,
              title: {
                text: "Total Data",
                align: "high",
              },
              labels: {
                overflow: "justify",
                format: "{value}",
              },
              tickInterval: 1,
              gridLineWidth: 0,
            },
            legend: {
              align: "right",
              verticalAlign: "top",
              layout: "vertical",
            },
            tooltip: {
              formatter: function () {
                return this.point.name + ": " + this.point.y + " Unit";
              },
            },
            credits: {
              enabled: false,
            },
            series: seriesData,
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    yearPicker: function () {
      $(".datepicker").datepicker({
        format: "yyyy",
        startView: "years",
        minViewMode: "years",
        autoclose: true,
      });
    },
    unitAndYear: function () {
      $("#btn-apply-filter").on("click", function () {
        var unitKerjaId = $("#unit_kerja").val();
        var tahun = $("#tahun").val();
        $(".loading-container").css("display", "flex");

        console.log("loadung");
        // $("#unit_kerja, #tahun").change(function () {
        //   var unitKerjaId = $("#unit_kerja").val();
        //   var tahun = $("#tahun").val();
        setTimeout(function () {
          App.compliance0101(unitKerjaId, tahun);
          App.compliance0102(unitKerjaId, tahun);
          App.compliance0103(unitKerjaId, tahun);
          App.compliance0104(unitKerjaId, tahun);
          App.compliance0201(unitKerjaId, tahun);
          App.compliance0202(unitKerjaId, tahun);
          App.compliance0601(unitKerjaId, tahun);
          App.compliance0701Kepuasan(unitKerjaId, tahun);
          App.compliance0701Keluhan(unitKerjaId, tahun);
          App.compliance0801(unitKerjaId, tahun);
          App.compliance0802(unitKerjaId, tahun);
          App.compliance0803(unitKerjaId, tahun);
          App.compliance0804(unitKerjaId, tahun);
          App.compliance0805(unitKerjaId, tahun);
          App.compliance0806(unitKerjaId, tahun);
          App.compliance0807(unitKerjaId, tahun);
          App.compliance1301(unitKerjaId, tahun);
          App.compliance1302(unitKerjaId, tahun);
          App.compliance1401(unitKerjaId, tahun);
          App.compliance1402(unitKerjaId, tahun);
          App.compliance1403(unitKerjaId, tahun);
          App.compliance1501(unitKerjaId, tahun);
          App.compliance1502(unitKerjaId, tahun);
          App.compliance1503(unitKerjaId, tahun);
          App.compliance1504(unitKerjaId, tahun);
          App.compliance1505(unitKerjaId, tahun);
          App.compliance1801(unitKerjaId, tahun);
          App.compliance1802(unitKerjaId, tahun);
          App.compliance2101(unitKerjaId, tahun);
          App.compliance2501(unitKerjaId, tahun);
          App.compliance2502(unitKerjaId, tahun);
          App.compliance2701(unitKerjaId, tahun);
          App.compliance2702(unitKerjaId, tahun);
          App.compliance2703(unitKerjaId, tahun);
          App.compliance2707(unitKerjaId, tahun);
          App.compliance2901(unitKerjaId, tahun);
          App.compliance2902(unitKerjaId, tahun);
          App.compliance2903(unitKerjaId, tahun);
          App.compliance3501(unitKerjaId, tahun);
          App.compliance3502(unitKerjaId, tahun);
          App.compliance3503(unitKerjaId, tahun);
          // App.compliance3101(unitKerjaId, tahun);
          // App.compliance3102(unitKerjaId, tahun);
          $(".loading-container").css("display", "none");
        }, 2000);
      });
    },
    resetSearch: function () {
      $("#btn-reset-filter").on("click", function () {
        $("#unit_kerja").val("Pilih Unit Kerja");
        $("#tahun").val("2023");
      });
    },
    compliance0101: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0101",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-01-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-01-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-01-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0102: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0102",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-01-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-01-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-01-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0103: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0103",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-01-03").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-01-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-01-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0104: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0104",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-01-04").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-01-04").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-01-04").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },

    compliance0201: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0201",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-02-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-02-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-02-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0202: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0202",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-02-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-02-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-02-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },

    compliance0202: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // console.log("Days",daysInYear)

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0202",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerDay = {};

              for (var i = 0; i < daysInYear; i++) {
                var currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i); // Tanggal saat ini dalam iterasi
                var dateString = currentDate.toISOString().split("T")[0];
                dataPerDay[dateString] = 0;
              }

              filteredData.forEach(function (item) {
                var dateString = item.tanggal;
                if (dataPerDay.hasOwnProperty(dateString)) {
                  dataPerDay[dateString]++;
                }
              });

              var totalData = 0;
              for (var date in dataPerDay) {
                totalData += dataPerDay[date];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (daysInYear * unitKerjaIds.length)) * 100;
              }

              $(".fp-02-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-02-02").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-02-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-02-02").text("0%");
        },
      });
    },

    compliance0601: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0601",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-06-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-06-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-06-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0701Kepuasan: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Menghitung jumlah triwulan dalam setahun (4 triwulan)
      var triwulan = 4;
      var daysInTriwulan = daysInYear / triwulan;

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0701_kepuasan",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(
                  item.data_pencacah_unit_kerja.toString()
                ) ||
                  unitKerjaId === item.data_pencacah_unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerTriwulan = {};

              for (var i = 0; i < triwulan; i++) {
                dataPerTriwulan[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var triwulanIndex = Math.floor(
                  (tanggal.getMonth() + 1) / (12 / triwulan)
                );
                dataPerTriwulan[triwulanIndex]++;
              });

              var totalData = 0;
              for (var triwulanIndex in dataPerTriwulan) {
                totalData += dataPerTriwulan[triwulanIndex];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (triwulan * unitKerjaIds.length)) * 100;
              }

              $(".fp-07-01-kepuasan").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-07-01-kepuasan").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-07-01-kepuasan").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-07-01-kepuasan ").text("0%");
        },
      });
    },
    compliance0701Keluhan: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Menghitung jumlah triwulan dalam setahun (4 triwulan)
      var triwulan = 4;
      var daysInTriwulan = daysInYear / triwulan;

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0701_keluhan",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerTriwulan = {};

              for (var i = 0; i < triwulan; i++) {
                dataPerTriwulan[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var triwulanIndex = Math.floor(
                  (tanggal.getMonth() + 1) / (12 / triwulan)
                );
                dataPerTriwulan[triwulanIndex]++;
              });

              var totalData = 0;
              for (var triwulanIndex in dataPerTriwulan) {
                totalData += dataPerTriwulan[triwulanIndex];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (triwulan * unitKerjaIds.length)) * 100;
              }

              $(".fp-07-01-keluhan").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-07-01-keluhan").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-07-01-keluhan").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-07-01-keluhan").text("0%");
        },
      });
    },
    compliance0801: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0801",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-08-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-08-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-08-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0802: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0802",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-08-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-08-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-08-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0803: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0803",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-08-03").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-08-03").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-08-03").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0804: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0804",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-08-04").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-08-04").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-08-04").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0805: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0805",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-08-05").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-08-05").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-08-05").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0806: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0806",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-08-06").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-08-06").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-08-06").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance0807: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp0807",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-08-07").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-08-07").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-08-07").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance1301: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1301",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-13-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-13-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-13-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance1302: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1302",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-13-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-13-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-13-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance1401: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1401",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};

              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
              }

              $(".fp-14-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-14-01").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-14-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-14-01").text("0%");
        },
      });
    },
    compliance1402: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1402",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};

              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
              }

              $(".fp-14-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-14-02").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-14-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-14-02").text("0%");
        },
      });
    },
    compliance1403: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1403",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};

              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
              }

              $(".fp-14-03").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-14-03").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-14-03").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-14-03").text("0%");
        },
      });
    },
    compliance1501: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1501",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2902", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2902", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2903", totalData);
              }

              $(".fp-15-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-15-01").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-15-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-15-01").text("0%");
        },
      });
    },

    compliance1502: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1502",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2902", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2902", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2903", totalData);
              }

              $(".fp-15-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-15-02").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-15-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-15-02").text("0%");
        },
      });
    },

    compliance1503: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1503",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2903", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2903", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2903", totalData);
              }

              $(".fp-15-03").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-15-03").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-15-03").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-15-03").text("0%");
        },
      });
    },

    compliance1504: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1504",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2904", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2904", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2904", totalData);
              }

              $(".fp-15-04").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-15-04").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-15-04").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-15-04").text("0%");
        },
      });
    },

    compliance1505: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1505",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2905", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2905", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2905", totalData);
              }

              $(".fp-15-05").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-15-05").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-15-05").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-15-05").text("0%");
        },
      });
    },
    // compliance1501: function (unitKerjaId, tahun) {
    //   // Menginisialisasi tanggal awal dan akhir dalam setahun
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp1501",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.created_at_tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-15-01").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-15-01").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-15-01").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-15-01").text("0%");
    //     },
    //   });
    // },
    // compliance1502: function (unitKerjaId, tahun) {
    //   // Menginisialisasi tanggal awal dan akhir dalam setahun
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp1502",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.created_at_tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-15-02").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-15-02").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-15-02").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-15-02").text("0%");
    //     },
    //   });
    // },
    // compliance1503: function (unitKerjaId, tahun) {
    //   // Menginisialisasi tanggal awal dan akhir dalam setahun
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp1503",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.created_at_tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-15-03").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-15-03").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-15-03").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-15-03").text("0%");
    //     },
    //   });
    // },
    // compliance1504: function (unitKerjaId, tahun) {
    //   // Menginisialisasi tanggal awal dan akhir dalam setahun
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp1504",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.created_at_tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-15-04").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-15-04").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-15-04").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-15-04").text("0%");
    //     },
    //   });
    // },
    // compliance1505: function (unitKerjaId, tahun) {
    //   // Menginisialisasi tanggal awal dan akhir dalam setahun
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp1505",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.created_at_tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-15-05").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-15-05").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-15-05").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-15-05").text("0%");
    //     },
    //   });
    // },
    compliance1801: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // console.log("Days",daysInYear)

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1801",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerDay = {};

              for (var i = 0; i < daysInYear; i++) {
                var currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i); // Tanggal saat ini dalam iterasi
                var dateString = currentDate.toISOString().split("T")[0];
                dataPerDay[dateString] = 0;
              }

              filteredData.forEach(function (item) {
                var dateString = item.tanggal;
                if (dataPerDay.hasOwnProperty(dateString)) {
                  dataPerDay[dateString]++;
                }
              });

              var totalData = 0;
              for (var date in dataPerDay) {
                totalData += dataPerDay[date];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (daysInYear * unitKerjaIds.length)) * 100;
              }

              $(".fp-18-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-18-01").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-18-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-18-01").text("0%");
        },
      });
    },
    compliance1802: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // console.log("Days",daysInYear)

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp1802",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerDay = {};

              for (var i = 0; i < daysInYear; i++) {
                var currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i); // Tanggal saat ini dalam iterasi
                var dateString = currentDate.toISOString().split("T")[0];
                dataPerDay[dateString] = 0;
              }

              filteredData.forEach(function (item) {
                var dateString = item.tanggal;
                if (dataPerDay.hasOwnProperty(dateString)) {
                  dataPerDay[dateString]++;
                }
              });

              var totalData = 0;
              for (var date in dataPerDay) {
                totalData += dataPerDay[date];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (daysInYear * unitKerjaIds.length)) * 100;
              }

              $(".fp-18-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-18-02").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-18-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-18-02").text("0%");
        },
      });
    },
    compliance2101: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2101",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-21-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-21-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-21-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance2501: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2501",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-25-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-25-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-25-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance2502: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2502",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-25-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-25-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-25-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance2701: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // console.log("Days",daysInYear)

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2701",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerDay = {};

              for (var i = 0; i < daysInYear; i++) {
                var currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i); // Tanggal saat ini dalam iterasi
                var dateString = currentDate.toISOString().split("T")[0];
                dataPerDay[dateString] = 0;
              }

              filteredData.forEach(function (item) {
                var dateString = item.tanggal;
                if (dataPerDay.hasOwnProperty(dateString)) {
                  dataPerDay[dateString]++;
                }
              });

              var totalData = 0;
              for (var date in dataPerDay) {
                totalData += dataPerDay[date];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (daysInYear * unitKerjaIds.length)) * 100;
              }

              $(".fp-27-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-27-01").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-27-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-27-01").text("0%");
        },
      });
    },
    compliance2702: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // console.log("Days",daysInYear)

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2702",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerDay = {};

              for (var i = 0; i < daysInYear; i++) {
                var currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i); // Tanggal saat ini dalam iterasi
                var dateString = currentDate.toISOString().split("T")[0];
                dataPerDay[dateString] = 0;
              }

              filteredData.forEach(function (item) {
                var dateString = item.tanggal;
                if (dataPerDay.hasOwnProperty(dateString)) {
                  dataPerDay[dateString]++;
                }
              });

              var totalData = 0;
              for (var date in dataPerDay) {
                totalData += dataPerDay[date];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (daysInYear * unitKerjaIds.length)) * 100;
              }

              $(".fp-27-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-27-02").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-27-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-27-02").text("0%");
        },
      });
    },
    compliance2703: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // console.log("Days",daysInYear)

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2703",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });
            //  console.log("filtered",filteredData)
            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerDay = {};

              for (var i = 0; i < daysInYear; i++) {
                var currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i); // Tanggal saat ini dalam iterasi
                var dateString = currentDate.toISOString().split("T")[0];
                dataPerDay[dateString] = 0;
              }

              filteredData.forEach(function (item) {
                var dateString = item.tanggal;
                if (dataPerDay.hasOwnProperty(dateString)) {
                  dataPerDay[dateString]++;
                }
              });

              var totalData = 0;
              for (var date in dataPerDay) {
                totalData += dataPerDay[date];
              }

              // Periksa apakah unitKerjaIds tidak kosong sebelum menghitung persentase
              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage =
                  (totalData / (daysInYear * unitKerjaIds.length)) * 100;
              }

              $(".fp-27-03").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-27-03").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-27-03").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-27-03").text("0%");
        },
      });
    },
    compliance2707: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2707",
        type: "GET",
        dataType: "json",
        success: function (data) {
          // console.log("2707", data);
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2702", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.tanggal);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2702", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
                console.log("2707", totalData);
              }

              $(".fp-27-07").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-27-07").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-27-07").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-27-07").text("0%");
        },
      });
    },

    compliance2901: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2901",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2902", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.created_at);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2902", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2901", totalData);
              }

              $(".fp-29-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-29-01").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-29-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-29-01").text("0%");
        },
      });
    },

    compliance2902: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2902",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2902", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.created_at);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2902", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2902", totalData);
              }

              $(".fp-29-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-29-02").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-29-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-29-02").text("0%");
        },
      });
    },

    compliance2903: function (unitKerjaId, tahun) {
      // Menginisialisasi tanggal awal dan akhir dalam setahun
      var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
      var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

      var timeDifference = Math.abs(endDate - startDate);
      var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      $.ajax({
        url: App.baseUrl + "dashboard/get_fp2903",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              // consl
              return (
                item.created_at_tahun == tahun &&
                (unitKerjaId.includes(item.unit_kerja.toString()) ||
                  unitKerjaId === item.unit_kerja.toString())
              );
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var dataPerMonth = {};
              // console.log("test 2902", unitKerjaIds);
              for (var i = 0; i < 12; i++) {
                dataPerMonth[i] = 0;
              }

              filteredData.forEach(function (item) {
                var tanggal = new Date(item.created_at);
                var monthIndex = tanggal.getMonth();
                dataPerMonth[monthIndex]++;
              });

              var totalData = 0;
              for (var monthIndex in dataPerMonth) {
                totalData += dataPerMonth[monthIndex];
                // console.log("test 2902", totalData);
              }

              var percentage = 0; // Default 0%
              if (unitKerjaIds.length > 0) {
                // Menghitung presentase dengan membagi totalData dengan jumlah unit_kerja
                percentage = (totalData / (unitKerjaIds.length * 12)) * 100;
                // Memastikan presentase tidak melebihi 100%
                percentage = Math.min(percentage, 100);
                // console.log("2903", totalData);
              }

              $(".fp-29-03").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-29-03").text("0%");
              console.error("Data not found for selected tahun or unit.");
            }
          } else {
            $(".fp-29-03").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
          $(".fp-29-03").text("0%");
        },
      });
    },

    // compliance2901: function (unitKerjaId, tahun) {
    //   // Menginisialisasi tanggal awal dan akhir dalam setahun
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp2707",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       // console.log("2901", data);
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-29-01").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-29-01").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-29-01").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-29-01").text("0%");
    //     },
    //   });
    // },

    // compliance2902: function (unitKerjaId, tahun) {
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp2902",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.created_at_tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //             // console.log("test 2902", totalData);
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-29-02").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-29-02").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-29-02").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-29-02").text("0%");
    //     },
    //   });
    // },
    // compliance2903: function (unitKerjaId, tahun) {
    //   var startDate = new Date(tahun, 0, 1); // Tanggal 1 Januari
    //   var endDate = new Date(tahun, 11, 31); // Tanggal 31 Desember

    //   var timeDifference = Math.abs(endDate - startDate);
    //   var daysInYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    //   $.ajax({
    //     url: App.baseUrl + "dashboard/get_fp2903",
    //     type: "GET",
    //     dataType: "json",
    //     success: function (data) {
    //       if (data.length > 0) {
    //         var filteredData = data.filter(function (item) {
    //           return (
    //             item.created_at_tahun == tahun &&
    //             (unitKerjaId.includes(item.unit_kerja.toString()) ||
    //               unitKerjaId === item.unit_kerja.toString())
    //           );
    //         });

    //         if (filteredData.length > 0) {
    //           var unitKerjaIds = unitKerjaId.split(",");
    //           var dataPerMonth = {};

    //           for (var i = 0; i < 12; i++) {
    //             dataPerMonth[i] = 0;
    //           }

    //           filteredData.forEach(function (item) {
    //             var tanggal = new Date(item.tanggal);
    //             var monthIndex = tanggal.getMonth();
    //             dataPerMonth[monthIndex]++;
    //           });

    //           var totalData = 0;
    //           for (var monthIndex in dataPerMonth) {
    //             totalData += dataPerMonth[monthIndex];
    //           }

    //           var percentage = 0; // Default 0%
    //           if (unitKerjaIds.length > 0) {
    //             percentage = (totalData / (12 * unitKerjaIds.length)) * 100;
    //           }

    //           $(".fp-29-03").text(percentage.toFixed(0) + "%");
    //         } else {
    //           $(".fp-29-03").text("0%");
    //           console.error("Data not found for selected tahun or unit.");
    //         }
    //       } else {
    //         $(".fp-29-03").text("0%");
    //         console.error("Data not found.");
    //       }
    //     },
    //     error: function (xhr, status, error) {
    //       console.error("Error fetching data:", error);
    //       $(".fp-29-03").text("0%");
    //     },
    //   });
    // },
    compliance3101: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp3101",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-31-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-31-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-31-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance3102: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp3102",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-31-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-31-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-31-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance3501: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp3501",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-35-01").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-35-01").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-35-01").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance3502: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp3502",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-35-02").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-35-02").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-35-02").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
    compliance3503: function (unitKerjaId, tahun) {
      $.ajax({
        url: App.baseUrl + "dashboard/get_fp3503",
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (data.length > 0) {
            var filteredData = data.filter(function (item) {
              return item.created_at_tahun == tahun;
            });

            if (filteredData.length > 0) {
              var unitKerjaIds = unitKerjaId.split(",");
              var unitFound = 0;

              for (var i = 0; i < unitKerjaIds.length; i++) {
                var unit = unitKerjaIds[i];

                var unitExists = filteredData.some(function (item) {
                  return item.unit_kerja.toString() === unit;
                });

                if (unitExists) {
                  unitFound++;
                }
              }

              var totalUnit = unitKerjaIds.length;
              var percentage = (unitFound / totalUnit) * 100;

              $(".fp-35-03").text(percentage.toFixed(0) + "%");
            } else {
              $(".fp-35-03").text("0%");
              console.error("Data not found for selected tahun.");
            }
          } else {
            $(".fp-35-03").text("0%");
            console.error("Data not found.");
          }
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    },
  };
});
