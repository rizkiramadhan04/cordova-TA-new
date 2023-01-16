function onScanSuccess(qrCodeMessage) {
  document.getElementById("result").innerHTML =
    '<span class="result">' + qrCodeMessage + "</span>";
}
function onScanError(errorMessage) {
  //handle scan error
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess, onScanError);

var nama_user = window.localStorage.getItem("name");
var status_user = window.localStorage.getItem("status_user");

$(document).ready(function () {
  if (status_user == "Guru") {
    $("#back-murid").hide();
    $("#back-guru").show();
  } else {
    $("#back-murid").show();
    $("#back-guru").hide();
  }

  $("#nama_user_izin").val(nama_user);
});

var firstCon = firstConnection();

function scan() {
  console.log("scann");

  cordova.plugins.barcodeScanner.scan(
    function (result) {
      console.log(result);
      if (!result.cancelled) {
        if (result.format == "QR_CODE") {
          var value = result.text;
          alert("We got a barcode\n" + "Result: " + value);
        }
      }
    },
    function (error) {
      alert("Scanning failed: " + error);
    }
  );

  pages("presensi");
}

// function clickDetailstruk(param) {
//   data = {
//     id_receipt: $(param).data("id"),
//   };

//   $.ajax({
//     beforeSend: function (xhr) {
//       xhr.setRequestHeader(
//         "Authorization",
//         "Bearer " + window.localStorage.getItem("access_token")
//       );
//       xhr.setRequestHeader("Accept", "application/json");
//     },

//     url: conn + "/detail-receipt",
//     type: "POST",
//     dataType: "json",
//     data: data,
//     timeout: timeout,
//   })
//     .done(function (values) {
//       // console.log(values);
//       $("#img-struk").attr(
//         "src",
//         server_url + "/storage/receipt/" + values.image
//       );
//     })
//     .fail(function (jqXHR, textStatus, errorThrown) {
//       console.log(jqXHR);
//       console.log(textStatus);
//       console.log(errorThrown);
//       if (jqXHR.readyState == 0) {
//         console.log(
//           "Network error (i.e. connection refused, access denied due to CORS, etc.)"
//         );
//         navigator.notification.alert(
//           "Koneksi offline - Cek koneksi internet Anda.  ",
//           alertDismissed,
//           TITLE_ALERT,
//           "Ok"
//         );
//       } else {
//         SpinnerDialog.hide();
//         if (textStatus == "timeout") {
//           navigator.notification.alert(
//             "Koneksi Time Out - Cek koneksi internet Anda.",
//             alertDismissed,
//             TITLE_ALERT,
//             "Ok"
//           );
//         }
//       }
//     });

//   $(".modal-detail-struk").modal("show");
//   $(".icon-close").click(() => {
//     $(".modal-detail-struk").modal("hide");
//   });
// }

var firstCon = firstConnection();
var status_presensi = window.localStorage.getItem("status_presensi");

if (status_presensi == 0) {
  $("#img-ceklis-all").css("display", "none");
  $("#img-ceklis-izin").css("display", "none");
  $("#img-ceklis-presensi").css("display", "inline");
  // console.log('presensi active');
} else if (status_presensi == 1) {
  $("#img-ceklis-all").css("display", "none");
  $("#img-ceklis-izin").css("display", "inline");
  $("#img-ceklis-presensi").css("display", "none");
} else {
  $("#img-ceklis-all").css("display", "inline");
  $("#img-ceklis-izin").css("display", "none");
  $("#img-ceklis-presensi").css("display", "none");
}

data = {
  jenis_presensi: window.localStorage.getItem("status_presensi"),
};

$.ajax({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + window.localStorage.getItem("access_token")
    );
    xhr.setRequestHeader("Accept", "application/json");
  },
  type: "POST",
  url: conn + "/get-data-presensi",
  dataType: "json",
  timeout: timeout,
  data: data,
})
  .done(function (values) {
    console.log(values);
    var results = values.data;

    SpinnerDialog.hide();
    if (values.status == "failed") {
      navigator.notification.alert(
        values.message,
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    } else if (values.status == "success") {
      //   //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      console.log(results);
      var result_list = "";

      for (var i = 0; i < results.length; i++) {
        var data_ls = results[i];

        result_list +=
          '<a href="javascript:void(0)">' +
          '<div class="row detail item mb-2 p-0">' +
          '<div class="col-3"><img src="assets/img/icon-presensi.png" alt="img" class="image-block imaged w76"></div>' +
          '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">' +
          "<strong>" +
          data_ls.jenis_presensi +
          "</strong>" +
          "<p>Nama  : <strong>" +
          data_ls.nama +
          "</strong><br/></p>" +
          "<p>Waktu : <strong>" +
          (data_ls.jenis_presensi == "Presensi" ? data_ls.waktu_masuk : "-") +
          "</strong><br/></p>" +
          "<p>Tanggal : <strong>" +
          (data_ls.jenis_presensi == "Izin"
            ? data_ls.tanggal_izin
            : data_ls.tanggal_masuk) +
          "</strong><br/></p>" +
          "<p>Alasan : <strong>" +
          (data_ls.alasan_izin != null ? data_ls.alasan_izin : "-") +
          "</strong><br/></p>" +
          "</div>" +
          '<div class="col-3 text-center">' +
          "<p><b> Status <b/><br/></p>" +
          '<p><strong style="font-size:.8rem;">' +
          (data_ls.jenis_presensi == "Izin" ? "Izin" : data_ls.status_masuk) +
          "</strong></p>" +
          "</div>" +
          "</div>" +
          "</a>";
      }

      $("#list-presensi").html(result_list);
    } else {
      navigator.notification.alert(
        values.message,
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    }
    //loading('close');
  })
  .fail(function (jqXHR, textStatus, errorThrown) {
    SpinnerDialog.hide();
    if (jqXHR.readyState == 0) {
      console.log(
        "Network error (i.e. connection refused, access denied due to CORS, etc.)"
      );
      navigator.notification.alert(
        "Koneksi offline - Cek koneksi internet Anda. ",
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    } else {
      if (textStatus == "timeout") {
        navigator.notification.alert(
          "Request Time Out - Cek koneksi internet Anda.",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }
    }
  });

function postIzin() {
  event.preventDefault();
  SpinnerDialog.show(null, "Mengirim data ...");

  data = {
    izin: 1,
    tanggal_izin: $("#tanggal_izin").val(),
    alasan_izin: $("#alasan_izin").val(),
  };

  console.log(data);

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/input-data-presensi",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      console.log(values);
      var results = values.data;

      SpinnerDialog.hide();
      if (values.status == "failed") {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        pages("input-izin");
      } else if (values.status == "success") {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        pages("list-presensi");
      } else {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }
      //loading('close');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      SpinnerDialog.hide();
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline - Cek koneksi internet Anda. ",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Request Time Out - Cek koneksi internet Anda.",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}
