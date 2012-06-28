jQuery.fn.validaData = function (o) {
  var defaults  = {range:false}
  var confs     = $.extend(defaults,o);

  this.change(function () {
    var el = this;

    var dataHoje, dataInformada;
    DATA = el.value;
    if (DATA == '' || DATA == '__/__/____' || DATA == '__/____') {
      return false;
    }

    var expReg = /^((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[1-2][0-9]\d{2})$/;
    var msgErro = 'Formato inválido de data.';
    if (DATA.match(expReg)) {
      var dia = parseFloat(DATA.substring(0, 2));
      var mes = parseFloat(DATA.substring(3, 5));
      var ano = parseFloat(DATA.substring(6, 10));
      var anoInt = parseInt(ano);

      if(confs.range=='ano'){
        if (anoInt < 1900 || anoInt > 2100) {
          alert('Ano inválido.');
          return false;
        }
      }

      if ((mes == 4 && dia > 30) || (mes == 6 && dia > 30) || (mes == 9 && dia > 30) || (mes == 11 && dia > 30)) {
        el.value='';
        alert("Dia incorreto !!! O mês especificado contém no máximo 30 dias.");
        return false;
      } else {
        if (ano % 4 != 0 && mes == 2 && dia > 28) {
          el.value='';
          alert("Data incorreta!! O mês especificado contém no máximo 28 dias.");
          return false;
        } else {
          if (ano % 4 == 0 && mes == 2 && dia > 29) {
            el.value='';
            alert("Data incorreta!! O mês especificado contém no máximo 29 dias.");
            return false;
          }
        }
      }
      if (confs.range == "maiorHoje") {
        dataHoje      = new Date();
        dataInformada = new Date();
        dataInformada.setDate(dia);
        dataInformada.setMonth(mes - 1);
        dataInformada.setYear(ano);
        if (dataInformada < dataHoje) {
          el.value='';
          alert('Data precisa ser maior ou igual que a data de hoje!');
          return false;
        }
      } else if (confs.range == "menorHoje") {
        dataHoje      = new Date();
        dataInformada = new Date();
        dataInformada.setDate(dia);
        dataInformada.setMonth(mes - 1);
        dataInformada.setYear(ano);
        if (dataInformada > dataHoje) {
          el.value='';
          alert('Data precisa ser menor ou igual que a data de hoje!');
          return false;
        }
      }
    } else {
      el.value='';
      alert(msgErro);
    }
    return true;
  });
  return this;
};