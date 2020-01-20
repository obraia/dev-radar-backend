// --> Essa função tem como objetivo transformar uma string com elementos sepadados
// por vírgulas em um array, assim também removendo os espaços entre eles caso existirem. 

module.exports = (string) => { return string.split(',').map(obj => obj.trim()); }