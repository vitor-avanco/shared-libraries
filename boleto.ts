function validarBlocoBoleto(bloco: string): boolean {
  return validarModuloDezBoleto(bloco);
}

function validarBlocoArrecadacoes(bloco: string, moeda: number): boolean {
  if (moeda === 6 || moeda === 7) {
    return validarModuloDezArrecadacoes(bloco);
  } else if (moeda === 8 || moeda === 9) {
    return validarModuloOnzeArrecadacoes(bloco);
  }
  return false;
}

function validarModuloOnzeBoleto(): boolean {
  const inputCodigoBoleto = document.getElementById("inputCodigoBoleto") as HTMLInputElement;
  let barra = inputCodigoBoleto.value;

  barra = barra.replace(/\D/g, "");

  const strIPTE1 = barra.substring(0, 5);
  const strIPTE2 = barra.substring(5, 10);
  const strIPTE3 = barra.substring(10, 15);
  const strIPTE4 = barra.substring(15, 21);
  const strIPTE5 = barra.substring(21, 26);
  const strIPTE6 = barra.substring(26, 32);
  const strIPTE8 = barra.substring(33, 47);

  let strCdBarra = "";
  let nSoma = 0;
  let nSuperDigito = barra.substring(32, 33);

  const strIPTETemp1 = strIPTE1.substring(0, 4);
  const strIPTETemp2 = strIPTE2.substring(0, 4);
  const strIPTETemp3 = strIPTE3 + strIPTE4.substring(0, 5);
  const strIPTETemp4 = strIPTE5 + strIPTE6.substring(0, 5);
  const strIPTETemp5 = strIPTE8 + strIPTE1.substring(4, 5);

  strCdBarra = strIPTETemp1 + strIPTETemp5 + strIPTETemp2 + strIPTETemp3 + strIPTETemp4;

  let j = 2;
  for (let i = strCdBarra.length - 1; i > -1; i--) {
    nSoma += parseInt(strCdBarra.charAt(i)) * j;
    j = j === 9 ? 2 : j + 1;
  }

  const r = nSoma % 11;
  let nSuperDigitoCalculado = 0;
  if (r <= 1) {
    nSuperDigitoCalculado = 1;
  } else {
    nSuperDigitoCalculado = 11 - r;
  }

  if (nSuperDigito !== nSuperDigitoCalculado.toString()) {
    if (strIPTE8.trim() === "") {
      return nSuperDigito !== "0";
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function validarModuloDezBoleto(bloco: string): boolean {
  const numeroCaracteres = bloco.length;
  const digito = parseInt(bloco.charAt(numeroCaracteres - 1));

  let nSoma = 0;
  let peso = 2;
  for (let i = numeroCaracteres - 2; i >= 0; i--) {
    let num = parseInt(bloco.charAt(i));
    num *= peso;
    nSoma += num % 10 + Math.floor(num / 10);
    peso ^= 3;
  }

  const resultado = 10 - (nSoma % 10);
  return resultado === digito;
}

function validarModuloDezArrecadacoes(bloco: string): boolean {
  const digito = parseInt(bloco.charAt(bloco.length - 1));
  let nProduto: number;
  let nSoma = 0;

  let j = 2;
  for (let i = bloco.length - 2; i > -1; i--) {
    nProduto = parseInt(bloco.charAt(i), 10) * j;

    if (nProduto > 9) {
      nProduto = Math.floor(nProduto / 10) + (nProduto % 10);
    }

    nSoma += nProduto;

    j = j === 2 ? 1 : 2;
  }

  const resto = (nSoma % 10) === 0 ? 0 : (10 - (nSoma % 10));

  return resto === digito;
}

function validarModuloOnzeArrecadacoes(bloco: string): boolean {
  const digito = parseInt(bloco.charAt(bloco.length - 1), 10);
  let nSoma = 0;
  let j = 2;

  for (let i = bloco.length - 2; i > -1; i--) {
    nSoma += parseInt(bloco.charAt(i), 10) * j;
    j = j === 9 ? 2 : j + 1;
  }

  const resto = 11 - (nSoma % 11);

  return resto === digito || (resto === 10 && digito === 0);
}

function validarBarra(): boolean {
  const inputCodigoBoleto = document.getElementById("inputCodigoBoleto") as HTMLInputElement;
  
  if (!inputCodigoBoleto || inputCodigoBoleto.classList.contains("invalido")) {
    return false;
  }
  
  let barra = inputCodigoBoleto.value.replace(/\D/g, "");
  
  if (barra == '' || barra.length == 1) {
    inputCodigoBoleto.classList.remove("invalido");
    return false;
  }
  
  let erro;
  let boleto = true;
  if (parseInt(barra.substring(0, 1)) === 8) {
   boleto = false;
  }
  
  if (boleto == false) {
   erro = validaConcessionaria(barra).valido;
  } else {
   erro = validarBloqueto(barra).valido;
  }
  
  return erro;
}

function validaConcessionaria(barra: string): any {
  const input = document.getElementById("inputCodigoBoleto") as HTMLInputElement;
  input.maxLength = 51;

  const moeda = parseInt(barra.substring(2, 3));

  if (barra.length >= 12 && !validarBlocoArrecadacoes(barra.substring(0, 12), moeda)) {
    input.value = barra.substring(0, 12);
    input.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem:  "Confira a digita&ccedil;&atilde;o do 1&ordm; bloco" };
  }

  if (barra.length >= 24 && !validarBlocoArrecadacoes(barra.substring(12, 24), moeda)) {
    input.value = barra.substring(0, 24);
    input.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem: "Confira a digita&ccedil;&atilde;o do 2&ordm; bloco" };
  }

  if (barra.length >= 36 && !validarBlocoArrecadacoes(barra.substring(24, 36), moeda)) {
    input.value = barra.substring(0, 36);
    input.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem: "Confira a digita&ccedil;&atilde;o do 3&ordm; bloco" };
  }

  if (barra.length === 48 && !validarBlocoArrecadacoes(barra.substring(36, 48), moeda)) {
    input.value = barra.substring(0, 48);
    input.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem: "Confira a digita&ccedil;&atilde;o do 4&ordm; bloco" };
  }

  return {valido: true, mensagem: null}
}

function validarBloqueto(barra: string): any {

  const inputCodigoBoleto = document.getElementById("inputCodigoBoleto") as HTMLInputElement;

  if (barra.length >= 10 && !validarBlocoBoleto(barra.substring(0, 10))) {
    inputCodigoBoleto.value = barra.substring(0, 10);
    inputCodigoBoleto.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem: "Confira a digita&ccedil;&atilde;o do 1&ordm; e do 2&ordm; bloco"};
  }

  if (barra.length >= 21 && !validarBlocoBoleto(barra.substring(10, 21))) {
    inputCodigoBoleto.value = barra.substring(0, 21);
    inputCodigoBoleto.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem: "Confira a digita&ccedil;&atilde;o do 3&ordm; e do 4&ordm; bloco"};
  }

  if (barra.length >= 32 && !validarBlocoBoleto(barra.substring(21, 32))) {
    inputCodigoBoleto.value = barra.substring(0, 32);
    inputCodigoBoleto.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem: "Confira a digita&ccedil;&atilde;o do 5&ordm; e do 6&ordm; bloco"};
  }

  if (barra.length >= 32 && barra.length < 47) {
    for (let i = barra.length; barra.length < 47; i++) {
      barra += "0";
      inputCodigoBoleto.value += "0";
    }
  }

  if (barra.length == 47 && !validarModuloOnzeBoleto()) {
    inputCodigoBoleto.value = barra.substring(0, 47);
    inputCodigoBoleto.dispatchEvent(new Event("keyup"));
    return {valido: false, mensagem: "C&oacute;digo de barras inv&aacute;lido"};
  }

  return {valido: true, mensagem: null}
}