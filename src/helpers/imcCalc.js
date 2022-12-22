const table = [
        {
            title:"com obesidade Grau 3",
            max:99999,
            min:40.1
        },    
        {
            title:"com obesidade Grau 2",
            max:40,
            min:35.1
        },
        {
            title:"com obesidade Grau 1",
            max:35,
            min:30.1
        },
        {
            title:"com sobrepeso",
            max:30,
            min:25.1
        },
        {
            title:"Saudável",
            max:25,
            min:18.6
        },
        {
            title:"com magreza leve",
            max:18.5,
            min:17.1
        },
        {
            title:"com magreza moderada",
            max:17,
            min:16.1
        },
        {
            title:"com magreza grave",
            max:16,
            min:0
        }
    ];
function calcIMC(points){
    for(var i = 1; i<table.length ; i++){
        if(
            points < table[i].max &&
            points > table[i].min
        )
            return table[i];
    }
}
export {
    table,
    calcIMC
}