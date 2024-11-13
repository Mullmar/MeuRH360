function MascaraCPF(input) {
    $(document).ready(function () {
        var $seuCampoCpf = $(input);
        $seuCampoCpf.mask('000.000.000-00', { reverse: true });
    });
}

function MascaraCEP(input) {
  $(document).ready(function () {
      var $seuCampoCep = $(input);
      $seuCampoCep.mask('00000-000', { reverse: true });
  });
}

function MascaraCNPJ(input) {
  $(document).ready(function () {
      var $seuCampoCnpj = $(input);
      $seuCampoCnpj.mask('00.000.000/0000-00', { reverse: true });
  });
}

function MascaraCelular(input) {
  $(document).ready(function () {
      var $seuCampoCelular = $(input);
      $seuCampoCelular.mask('0000000-0000', { reverse: true });
  });
}




