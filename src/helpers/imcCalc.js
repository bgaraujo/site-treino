const table = {
    M:[
        {
            label:"43",
            title:"Obesidade mórbida",
            max:99999,
            min:43,
            value:(16.6*5)
        },
        {
            label:"39.9",
            title:"Obesidade moderada",
            max:39.9,
            min:30,
            value:(16.6*4)
        },
        {
            label:"29.9",
            title:"Obesidade leve",
            max:29.9,
            min:25,
            value:(16.6*3)
        },
        {
            label:"24.9",
            title:"Normal",
            max:24.9,
            min:20,
            value:(16.6*2)
        },
        {
            label:"20",
            title:"Abaixo do peso",
            max:20,
            min:0,
            value:(16.6*1)
        }
    ],
    F:[
        {
            label:"Obesidade mórbida",
            max:9999,
            min:39
        },
        {
            label:"Obesidade moderada",
            max:38.9,
            min:29
        },
        {
            label:"Obesidade leve",
            max:28.9,
            min:24
        },
        {
            label:"Normal",
            max:23.9,
            min:19
        },
        {
            label:"Abaixo do peso",
            max:19,
            min:0
        }
    ]
};
function calcIMC(points,gender){
    for(var i = 1; i<table[gender].length ; i++){
        if(
            points < table[gender][i].max &&
            points > table[gender][i].min
        )
            return table[gender][i];
    }
}
export {
    table,
    calcIMC
}