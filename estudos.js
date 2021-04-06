const express = require('express');
const app = express();

//res = requisição do cliente
//res = resposta do servidor
applicationCache.get('/',(req,res) =>{
    res.send('Olá mundo!');
});

//Listen vai subir o servidor, recebe dois parametros, a porta e callback
app.listen(3000, () => 
    console.log('Servidor executando')
);