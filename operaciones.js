function f_sumar(a,b){
    console.log(a + b);

}
function f_restar(a,b){
    console.log(a - b);
    
}
function f_multiplicar(a,b){
    console.log(a * b);
        
}
function f_dividir(a,b){
    console.log(a / b);


}

module.exports = {
    sumar: f_sumar,
    restar: f_restar,
    multiplicar: f_multiplicar,
    dividir: f_dividir
};