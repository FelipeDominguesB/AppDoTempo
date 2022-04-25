const request = require('request');


function getPlaceTemp(coordinates)
{

    const url = `http://api.weatherstack.com/current?access_key=c2b9cf8a2abad4fdd5724f05a2000f18&query=${encodeURIComponent(coordinates[1])},${encodeURIComponent(coordinates[0])}`
    console.log(url)
    return new Promise((resolve, reject) =>{
        request({url: url, json: true, }, (err, res) =>{
    
            if(err) 
            {
                reject("erro interno");
            }
        
            if(res.body.error)
            {
                reject("Erro na API: ", res.body.error);
            } 
            
        
            resolve(res.body);
        
        })
    });
}


function getPlaceInfo(endereco)
{
    return new Promise((resolve, reject) =>{

        const urlSearch = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(endereco)}.json?limit=1&access_token=pk.eyJ1IjoiZnJhZ2dpZWRvbWluZ3VlcyIsImEiOiJjbDBmdTdiZHUwbmwwM2Nuc2Rtd2dzaW1nIn0.xxZzuZFED9k54VTsSzA2qw`
        console.log(urlSearch);
        request({url: urlSearch, json: true}, (err, res) =>{
            if(err) 
            {
                reject("Erro interno: ", err);
                return; 
            }
        
            if(res.body.messsage)
            {
                reject("Erro na API: ", err);
                return;
            }
            [longitude, latitude] = [res.body.features[0].center[0], res.body.features[0].center[1]];
        
            resolve([longitude, latitude]);
        })
    })

}


getPlaceInfo('Parelheiros').then((res) =>{
    return getPlaceTemp(res);
}).then(res =>{
    console.log("Nome do local: " + res.location.name);
    console.log("País: " + res.location.country);
    console.log("Região: " + res.location.region);
    console.log("Temperatura: " + res.current.temperature + " ºC");
}).catch((error) =>{
    console.log(error);
})