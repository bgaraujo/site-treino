export function parseToFloat(real){
    return parseFloat(real.replaceAll(".","").replace(",","."));
}

export function parseToRealBr(float){
    return float.toLocaleString('pt-BR');
}