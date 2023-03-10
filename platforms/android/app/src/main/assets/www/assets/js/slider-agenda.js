var firstCon = firstConnection();

if (firstCon == "online") {
  $.ajax({
    beforeSend: function (xhr) {
      $(".slider-agenda1").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda2").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda3").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda4").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda5").attr("src", "assets/img/sample/news/loading.gif");
    },
    type: "GET",
    url: conn + "/get-data-agenda",
    dataType: "json",
    timeout: timeout,
    // data: data,
  })
    .done(function (values) {
      SpinnerDialog.hide();
      if (values.status == "errors") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "failed") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "success") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');

        var data_fl = values.data;

        var length_data = data_fl.length;
        // console.log("jumlah data:" + length_data);
        if (length_data >= 5) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[2].id);
          $(".slider-agenda4").attr("id", data_fl[3].id);
          $(".slider-agenda5").attr("id", data_fl[4].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[1].gambar_agenda
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[2].gambar_agenda
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[3].gambar_agenda
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[4].gambar_agenda
          );
        } else if (length_data == 4) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[2].id);
          $(".slider-agenda4").attr("id", data_fl[3].id);
          $(".slider-agenda5").attr("id", data_fl[0].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[1].gambar_agenda
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[2].gambar_agenda
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[3].gambar_agenda
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
        } else if (length_data == 3) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[2].id);
          $(".slider-agenda4").attr("id", data_fl[0].id);
          $(".slider-agenda5").attr("id", data_fl[1].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[1].gambar_agenda
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[2].gambar_agenda
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[1].gambar_agenda
          );
        } else if (length_data == 2) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[0].id);
          $(".slider-agenda4").attr("id", data_fl[1].id);
          $(".slider-agenda5").attr("id", data_fl[0].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[1].gambar_agenda
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[1].gambar_agenda
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
        } else if (length_data == 1) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[0].id);
          $(".slider-agenda3").attr("id", data_fl[0].id);
          $(".slider-agenda4").attr("id", data_fl[0].id);
          $(".slider-agenda5").attr("id", data_fl[0].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/storage/agenda/" + data_fl[0].gambar_agenda
          );
        }

        //manual js
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
      $(".slider-agenda1").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda2").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda3").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda4").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda5").attr("src", "assets/img/sample/news/loading.gif");
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        // navigator.notification.alert('Koneksi offline - Cek koneksi internet Anda. ', alertDismissed, TITLE_ALERT, 'Ok');
      } else {
        if (textStatus == "timeout") {
          console.log(
            "Network error (i.e. connection refused, access denied due to CORS, etc.)"
          );
          // navigator.notification.alert('Request Time Out - Cek koneksi internet Anda. ', alertDismissed, TITLE_ALERT, 'Ok');
        }
      }
    });
} else {
  SpinnerDialog.hide();
  $(".slider-agenda1").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda2").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda3").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda4").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda5").attr("src", "assets/img/sample/news/loading.gif");
  // navigator.notification.alert('Koneksi offline - Cek koneksi internet Anda. ', alertDismissed, TITLE_ALERT, 'Ok');
}

function clickAgendaDetailDashboard(id) {
  window.localStorage.removeItem("id_agenda");
  window.localStorage.setItem("id_agenda", id);
  pages("slider-agenda-detail");

  // console.log(id);
}
