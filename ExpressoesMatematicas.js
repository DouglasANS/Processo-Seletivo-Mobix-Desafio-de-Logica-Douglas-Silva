const readline = require('readline');
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
rl.question('Digite um valor: ', (val) => {
  let ValidNumber = /^\d+$/;
  let validName = /^[a-záàâãéèêíïóôõöúçñ ]+$/;
  const stringSplit = val.trim().replace(/\s+/g, "").split('')

  var ALL = stringSplit
  var removeALL = val.trim().replace(/\s+/g, "").split('')

    for (var i = 0; i < stringSplit.length; i++) {
        if(validName.test(stringSplit[i])){
            console.log('Invalid input')
            return rl.close();
        }
        if(
        stringSplit[i] === '/' && stringSplit[i+1] === '/' || 
        stringSplit[i] === '*' && stringSplit[i+1] === '*' || 
        stringSplit[i] === '-' && stringSplit[i+1] === '-' || 
        stringSplit[i] === '+' && stringSplit[i+1] === '+' || 
        stringSplit[i] === '^' && stringSplit[i+1] === '^' 
        ){
            console.log('Invalid input')
            return rl.close();
        }

        function parenteseL(value) {
            return value === '(';
        }
        function parenteseR(value) {
            return value === ')';
        }
      
        var Pleft = stringSplit.filter(parenteseL);
        var Pright = stringSplit.filter(parenteseR);

        if(Pleft.length !== Pright.length){
            console.log('Invalid input')
            return rl.close();
        }
    }

 /* Concatena os numeros e deixam em uma mesma posição do array*/
    function concatenarInitialValue(allSeparate){
        for (var a = 0; a < allSeparate.length; a++) {
            if(ValidNumber.test(allSeparate[a]) && ValidNumber.test(allSeparate[a+1])){
                var concatenar =  allSeparate[a] + allSeparate[a+1]
                    allSeparate.splice(a, 1),
                    allSeparate.splice(a, 1)
                    allSeparate.splice(a, 0, concatenar)
                    a = allSeparate.length + 1
            }
        }
    }

    for (var b = 0; b < ALL.length; b++) {
        while(ValidNumber.test(ALL[b]) && ValidNumber.test(ALL[b+1])){
            concatenarInitialValue(ALL)
            concatenarInitialValue(removeALL)
        }
    }

    var parenteses = []
    
    function arrayParenteses(all){
        for (var c = 0; c < all.length; c++){
            if(all[c] === '('){
                for (var z = c; z < all.length; z++){
                    if(all[z] === ')'){
                        parenteses.push(all[z])
                        for (var r = z; all[r] !== '('; r--){
                            removeALL.splice(r, 1)
                            if(all[r] === '('){
                            }
                        }
                        removeALL.splice(r, 1)
                        removeParenteses(parenteses)
                        while(parenteses.length > 1){
                            operation(parenteses)
                        }
                        JuntarEmString(parenteses)                 
                        removeALL.splice(r, 0, parenteses.toString())
                        concatenarInitialValue(parenteses)

                        c = all.length +1 
                        z = all.length +1 
                    }else{
                       
                        if(parenteses[0] !== undefined && parenteses[1] !== undefined){
                           
                                if(parenteses[0].includes('(') && parenteses[1].includes('(') ){
                                    parenteses = []
                                    parenteses.push('(')
                                }
                            }
                            
                            function parenteseF(value) {
                                return value === '(';
                              }
                              
                              var par = parenteses.filter(parenteseF);
                              //console.log('filter: ',par)

                              if(par.length > 1){
                                parenteses = []
                                parenteses.push('(')
                              }                        
                    parenteses.push(all[z])
                    } 
                }                                   
            }
        }
    }

    function removeParenteses(parenteses){
        parenteses.shift()
        parenteses.pop()
    }

    function JuntarEmString(all){
        ALL = all.join([separador = ''])
    }

    while(ALL.includes('(') || ALL.includes(')')){
        arrayParenteses(ALL)        
        ALL = removeALL
        parenteses= []              
    }

    while(ALL.length > 1){
        operation(ALL)
    }
    
    //Faz operação de valores => + - * /  
    function operation(all){
        if(all.includes('^')){
            for (var i = 0; i < all.length; i++){
                if(all[i] === '^') {
                    var base = parseInt(all[i-1])
                    var potencia = parseInt(all[i+1])
                    var result = base

                    for (var k= 1; k <= potencia-1; k++){
                        result *= base
                    }

                    
                    // (parseInt(all[i-1]) * parseInt(all[i-1])) // parseInt(all[i+1])
                    all.splice(i, 1)
                    all.splice(i, 1)
                    all.splice(i-1, 1)
                    all.splice(i-1, 0, result.toString())
                    i = all.length + 1
                }
            }
        }else if(all.includes('*') || all.includes('/')){
            for (var i = 0; i < all.length; i++){
                if(all[i+1] === '0' || all[i-1] === '0' ){
                    var div = 0
                    all.splice(i, 1)
                    all.splice(i, 1)
                    all.splice(i-1, 1)
                    all.splice(i-1, 0, div.toString())
                    i = all.length + 1

                }else if(all[i] === '/') {
                    var div = parseInt(all[i-1]) / parseInt(all[i+1])
                    all.splice(i, 1)
                    all.splice(i, 1)
                    all.splice(i-1, 1)
                    all.splice(i-1, 0, div.toString())
                    i = all.length + 1
                }
                if(all[i] === '*') {
                    var mult = parseInt(all[i-1]) * parseInt(all[i+1])
                    all.splice(i, 1)
                    all.splice(i, 1)
                    all.splice(i-1, 1)
                    all.splice(i-1, 0, mult.toString())
                    i = all.length + 1
                }   
            }
        }else{
            for (var i = 0; i < all.length; i++){
            if(all[i] === '+') {       
                var soma = parseInt(all[i-1]) + parseInt(all[i+1])
                all.splice(i, 1)
                all.splice(i, 1)
                all.splice(i-1, 1)
                all.splice(i-1, 0,soma.toString())
                i = all.length + 1
            }
            if(all[i] === '-') {
                
                var sub = parseInt(all[i-1]) - parseInt(all[i+1])
                all.splice(i, 1)
                all.splice(i, 1)
                all.splice(i-1, 1)
                all.splice(i-1, 0, sub.toString())
                i = all.length + 1
            } 
        }
        }
    }
    console.log('resultado: ',ALL.toString())

  rl.close();
});

