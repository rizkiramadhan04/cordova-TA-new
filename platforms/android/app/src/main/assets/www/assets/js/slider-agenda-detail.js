var firstCon = firstConnection();
var id_agenda = window.localStorage.getItem("id_agenda");
var status_user = window.localStorage.getItem("status_user");

console.log(status_user);

$(document).ready(function () {
  if (status_user == "Guru") {
    $("#back-murid").hide();
    $("#back-guru").show();
  } else {
    $("#back-murid").show();
    $("#back-guru").hide();
  }
});

if (firstCon == "online") {
  data = {
    id_agenda: window.localStorage.getItem("id_agenda"),
  };
  $.ajax({
    type: "POST",
    url: conn + "/get-detail-data-agenda",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      var data_agnd = values.data;
      // console.log(data_agnd);
      SpinnerDialog.hide();
      if (values.status == "errors") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "failed") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "success") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');

        $(".image-detail-slideragenda").attr(
          "src",
          server_url + "/storage/agenda/" + data_agnd.gambar
        );
        $("#title-slider-agenda").html(data_agnd.nama_agenda);
        $("#desc-slider-agenda").html(data_agnd.deskripsi_agenda);
        $("#tanggal-slider-agenda").html(
          "Tanggal Agenda : " + data_agnd.tanggal_agenda
        );

        window.localStorage.removeItem("title_agenda");
        window.localStorage.setItem("title_agenda", data_agnd.title);
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
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      SpinnerDialog.hide();
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline - Cek koneksi internet Anda.",
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
} else {
  SpinnerDialog.hide();
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda.",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}
