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
  console.log(e.target.value)

  for(let i = 0; i < 12; i++){
    $("#quota-"+(i+1)).addClass("off");
  }
  for(let o = 0; o < e.target.value; o++){
    $("#quota-"+(o+1)).removeClass("off");
  }
});