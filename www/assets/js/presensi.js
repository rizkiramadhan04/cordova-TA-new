var nama_user = window.localStorage.getItem("name");
var status_user = window.localStorage.getItem("status_user");

$(document).ready(function () {
  $("#resultCheckPresensi").hide();
  $("#scanner-reader-content").hide();
  $("#tombol-submit").hide();

  if (status_user == "Guru") {
    $("#back-murid").hide();
    $("#back-guru").show();
  } else {
    $("#back-murid").show();
    $("#back-guru").hide();
  }

  var date_time = moment().format("DD-MM-YYYY HH:mm:ss ");
  // console.log(moment());

  $("#nama_user_izin").val(nama_user);
  console.log($("#nama_user_izin").val(nama_user));
  $("#namePresensiUser").append(nama_user);
  $("#timePresensiUser").append(date_time);

  $("#formUploadTanggal").val(date_time);
});

function openScanner() {
  $("#scanner-reader-content").show();
  $("#containerButtonOpen").hide();
}

// console.log(openScanner());

function onScanSuccess(qrCodeMessage) {
  $("#resultCheckPresensi").show();
  $("#tombol-submit").show();
  $("#containerButtonOpen").hide();

  html5QrcodeScanner.clear();
  // console.log("Hasil pembacaan QR : ", qrCodeMessage);

  $("#formUploadKodeJadwal").val(qrCodeMessage);
}

function onScanError(errorMessage) {
  console.log("Pesan error Scan :", errorMessage);
  '<span class="result">' + errorMessage + "</span>";
  $("#resultCheckPresensi").hide();
  $("#tombol-submit").hide();
  $("#containerButtonOpen").show();
  //handle scan error
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});

html5QrcodeScanner.render(onScanSuccess, onScanError);

var firstCon = firstConnection();

function uploadPresensi() {
  data = {
    tanggal_masuk: $("#formUploadTanggal").val(),
    kode_jadwal_presensi: $("#formUploadKodeJadwal").val(),
  };

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },

    url: conn + "/input-data-presensi",
    type: "POST",
    dataType: "json",
    data: data,
    timeout: timeout,
  })
    .done(function (values) {
      if (values.status == "failed") {
        // console.log("Status : ", values.status == "failed");
        // console.log("Status user : ", status_user);
        if (status_user == "Murid") {
          pages("presensi");

          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else {
          pages("presensi-guru");
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      } else if (values.status == "success") {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        pages("list-presensi");
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline - Cek koneksi internet Anda.  ",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Koneksi Time Out - Cek koneksi internet Anda.",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}

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
      // console.log(values);
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
