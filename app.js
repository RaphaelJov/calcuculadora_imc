const form = document.getElementById("form")
const limparResultado = document.getElementById('limparResultado')
let altura = document.getElementById('altura')
let peso = document.getElementById('peso')
const submit = document.getElementById('submit')
let resultado = document.getElementById('resultado')

// Escutador só para formatar a altura automaticamente
altura.addEventListener("input", function () {
    let valor = this.value.replace(/\D/g, ""); // mantém só números
    if (valor.length > 1) {
        valor = valor.replace(/(\d{1})(\d{2})/, "$1.$2"); // vira 181 → 1.81
    }
    this.value = valor;
});

// Escutador para limitar o peso a 3 digitos
peso.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '')
    if (valor.length > 3) {
        valor = valor.slice(0, 3)
    }
    this.value = valor
})

//funcao para calcular imc
form.addEventListener('submit', function (event) {

    event.preventDefault() // impede de recarregar a pagina
    let valorAltura = parseFloat(altura.value)
    let valorPeso = parseFloat(peso.value)

    // MELHORIA: Adiciona validação para evitar erros de cálculo
    if (isNaN(valorAltura) || isNaN(valorPeso) || valorAltura <= 0 || valorPeso <= 0) {
        resultado.innerHTML = "Por favor, preencha valores válidos.";
        return; // Para a execução se os valores forem inválidos
    }

    function calculaImc() {
        let imcCalculado = (valorPeso / (valorAltura * valorAltura))
        let resultadoArredondado = imcCalculado.toFixed(1)

        if (resultadoArredondado < 18.5) {
            resultado.innerHTML = `Seu IMC é: ${resultadoArredondado},Abaixo do Peso`
        } else if (resultadoArredondado >= 18.5 && resultadoArredondado <= 24.9) {
            resultado.innerHTML = `Seu IMC é: ${resultadoArredondado},Peso Normal`
        } else if (resultadoArredondado >= 25.0 && resultadoArredondado <= 29.9) {
            resultado.innerHTML = `Seu IMC é: ${resultadoArredondado}, Sobrepeso`
        } else if (resultadoArredondado >= 30.0 && resultadoArredondado <= 34.9) {
            resultado.innerHTML = `Seu IMC é: ${resultadoArredondado}, Obesidade Grau I`
        } else if (resultadoArredondado >= 35.0 && resultadoArredondado <= 39.9) {
            resultado.innerHTML = `Seu IMC é: ${resultadoArredondado}, Obesidade Grau II`
        } else if (resultadoArredondado >= 40.0) {
            resultado.innerHTML = `Seu IMC é: ${resultadoArredondado}, Obesidade Grau III (Grave)`
        }
    }
    calculaImc()

    limparResultado.addEventListener('click', function () {
        resultado.innerHTML = 'Resultado'
    })
})




