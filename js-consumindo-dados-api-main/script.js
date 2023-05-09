async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if(consultaCEPConvertida.erro) {
        throw Error('CEP não existente!')
    }
    console.log(consultaCEPConvertida);
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro;

    return consultaCEPConvertida;
    } catch(erro) {
        console.log(erro);
        mensagemErro.innerHTML = `<p>Cep inválido. Tente novamente.<p>`
    }  
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));