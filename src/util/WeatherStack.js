const request = require('request');
const weatherStack = (coordinates = {}, callbackFn) =>{
    const url = `http://api.weatherstack.com/current?access_key=c2b9cf8a2abad4fdd5724f05a2000f18&query=${encodeURIComponent(coordinates.latitude)},${encodeURIComponent(coordinates.longitude)}`

    request({url: url, json: true, }, (err, {body}) =>{
    
        if(err) 
        {
            callbackFn("erro interno", undefined);
        }
    
        if(body.error)
        {
            callbackFn("Erro na API: " + body.error, undefined);
        } 
            
        
        callbackFn(undefined, body);
    
    });
}

module.exports = weatherStack;