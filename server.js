var express = require('express');
var app = express();
var url = require("url")
app.get('/', function (req,res) 
{
    res.sendFile(__dirname+'/index.html')
    
})

app.get('/:id', function(req,res)
{
    
    //console.log(entrada)
    var espaciador = /\s/;
    var direcion = req.param('id');
    //console.log(direcion)
    
    var natural, unix = "";
    
    
     if(espaciador.test(direcion))
     {
        
         var klk = new Date(direcion.split(' ').join());
         natural = direcion;
         unix = convertirUnix(klk);
     }
     
  
   else
   {
       unix = direcion
       natural = convertirNatural(direcion)
    
   }
   console.log(natural);
    
    if( natural!=="Invalid Date" && unix!=='Invalid Date')
        res.json({"unix": unix, "natural": natural})
        
        else{
            res.json({"unix": null, "natural": null})
        }
})



var convertirUnix = function(objectoFecha)
{
    var date = new Date(objectoFecha.toDateString())
    return date.getTime()/1000;
}

var convertirNatural = function(tomaString)
{
    return new Date(tomaString* 1000).toDateString()
    
    
}

app.listen(8080)