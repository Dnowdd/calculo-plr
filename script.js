$("input[data-type='currency']").on({
  keyup: function() {
    formatCurrency($(this));
  },
  blur: function() { 
    formatCurrency($(this), "blur");
  }
});

function formatNumber(n) {
return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

function formatCurrency(input, blur) {
var input_val = input.val();
if (input_val === "") { return; }

var original_len = input_val.length;
var caret_pos = input.prop("selectionStart");
  
if (input_val.indexOf(",") >= 0) {
  var decimal_pos = input_val.indexOf(",");

  var left_side = input_val.substring(0, decimal_pos);
  var right_side = input_val.substring(decimal_pos);

  left_side = formatNumber(left_side);

  right_side = formatNumber(right_side);
  
  if (blur === "blur") {
    right_side += "00";
  }
  
  right_side = right_side.substring(0, 2);

  input_val = "R$ " + left_side + "," + right_side;

} else {
  input_val = formatNumber(input_val);
  input_val = "R$ " + input_val;
  
  if (blur === "blur") {
    input_val += ",00";
  }
}

input.val(input_val);

var updated_len = input_val.length;
caret_pos = updated_len - original_len + caret_pos;
input[0].setSelectionRange(caret_pos, caret_pos);
}








// Seleciona todos os elementos com a classe "percent"
const percentInputs = document.querySelectorAll('.percent');

// Itera sobre cada elemento
percentInputs.forEach(function(input) {
input.addEventListener('input', function(e) {
  let int = e.target.value.slice(0, e.target.value.length - 1);

  if (int.includes('%')) {
    e.target.value = '%';
  } else if (int == '100') {
    e.target.value = int + '%';
    e.target.setSelectionRange(3, 3);
  } else if (int.length >= 3 && int.length <= 4 && !int.includes('.')) {
    e.target.value = int.slice(0, 2) + '.' + int.slice(2, 3) + '%';
    e.target.setSelectionRange(4, 4);
  } else if (int.length >= 5 && int.length <= 6) {
    let whole = int.slice(0, 2);
    let fraction = int.slice(3, 5);
    e.target.value = whole + '.' + fraction + '%';
  } else {
    e.target.value = int + '%';
    e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length - 1);
  }
  /* console.log('For robots: ' + getInt(e.target.value)); */
});
});

function getInt(val) {
let v = parseFloat(val);
if (v % 1 === 0) {
  return v;
} else {
  let n = v.toString().split('.').join('');
  return parseInt(n);
}
}






document.querySelector('#quota-selector').addEventListener('input', function(e){
/* console.log(e.target.value) */

for(let i = 0; i < 12; i++){
  $("#quota-"+(i+1)).addClass("off");
  $("#box-log-"+(i+1)).addClass("none");
}
for(let o = 0; o < e.target.value; o++){
  $("#quota-"+(o+1)).removeClass("off");
  $("#box-log-"+(o+1)).removeClass("none");
}
});











function valCurrencyToInt(value){
  value = value.replace('R$ ', '');
  value = value.replace(',', '.');
  value = value.replace(/\ /g, '');
  return Number(value);
}
function valPorcetageToInt(value){
  value = value.replace('%','');
  value = value.replace(' ','');
  return Number(value);
}
function intCurrencyToVal(value){
  const options = {style: 'currency', currency: 'BRL'};
  value = value.toLocaleString('pt-BR', options);
  value = value.replace(/\./g, ' ')
  return value;
}

function getAliquota(value){
  if(value >= 0 && value <= 7407.11){
    aliquota = 0;
  }else if(value >= 7407.12 && value <= 9922.28){
    aliquota = 7.5;
  }else if(value >= 9922.29 && value <= 13167.00){
    aliquota = 15;
  }else if(value >= 13167.01 && value <= 16380.38){
    aliquota = 22.5;
  }else if(value >= 16380.39){
    aliquota = 27.5;
  }else{
    aliquota = 0;
  }

  return aliquota;
}
function calculatePLR(){
  quota_value = $('#quota-selector').val();
  quotas_salario = [];
  quotas_plr = [];

  values_final = []; /* RESULTADO DE CADA PARCELA DO PLR CALCULADO */
  value_final = 0; /* RESULTADO DE TODAS PARCELAS DO PLR JUNTOS */

  for(let o = 0; o < quota_value; o++){
    quotas_salario.push(valCurrencyToInt($('#salario-'+(o+1)).val()));
    quotas_plr.push(valPorcetageToInt($('#plr-'+(o+1)).val()));
  }

  for(let i = 0; i < quotas_salario.length; i++){
    value_calculated = quotas_salario[i] * (quotas_plr[i]/100);
    values_final.push(value_calculated);
    value_final += value_calculated;
  }

  for(let j = 0; j < values_final.length; j++){
    $('#box-log-'+(j+1)+'_salario').html(intCurrencyToVal(quotas_salario[j]));
    $('#box-log-'+(j+1)+'_plr').html(quotas_plr[j].toString()+"%");
    $('#box-log-'+(j+1)+'_total').html(intCurrencyToVal(values_final[j]));
  }

  $('#result-parcelas').html(intCurrencyToVal(value_final)); // DEFINE O VALOR DA SOMA DE TODAS PARCELAS NO LOG
  $('#result-aliquota').html(getAliquota(value_final).toString().replace('.',',')+'%'); // 

  value_final_imposto = value_final * ((100 - getAliquota(value_final))/100);
  $('#result-final').html(intCurrencyToVal(value_final_imposto));
  $('#result-final2').html(intCurrencyToVal(value_final_imposto));
}

