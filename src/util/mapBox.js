const request = require('request');

const mapBox = (endereco, callbackFn) =>{
    const urlSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(endereco)}.json?limit=1&access_token=pk.eyJ1IjoiZnJhZ2dpZWRvbWluZ3VlcyIsImEiOiJjbDBmdTdiZHUwbmwwM2Nuc2Rtd2dzaW1nIn0.xxZzuZFED9k54VTsSzA2qw`
    console.log(urlSearch);
    request({url: urlSearch, json: true}, (err, {body} = {}) =>{
        if(err || body.messsage) 
        {
            callbackFn("Erro: " + err, undefined);
        }
        if(body.features.length == 0)
        {
            return callbackFn("Não foi possível encontrar o local especificado", undefined);
            
        }
    
        callbackFn(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name});
    })
}

module.exports = mapBox