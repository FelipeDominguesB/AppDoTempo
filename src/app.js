const path = require('path')
const express = require('express')
const hbs = require('hbs');

const mapBox = require('./util/mapBox') 
const weatherStack = require('./util/WeatherStack');


const app = express();
const port = process.env.PORT || 8000;
//Definição de caminhos
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup de views do handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup de diretório pra arquivos estáticos
app.use(express.static(publicDirectoryPath));

//Roteamento
app.get('/', (req, res) =>{
    res.render('index', {
        title: 'App do tempo',
        name: 'App do tempo'
    })
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Sobre',
        name: 'Sobre'
    })
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Ajuda',
        message: 'Página destinada à responder as principais dúvidas que alguém possa ter sobre esse sistema.'
    })
});


app.get('/Weather', (req, res) =>{

    if(!req.query.locale) return res.send({"Erro": "Necessário informar um local"});

    mapBox(req.query.locale, (error, {latitude, longitude, location} = {}) =>{
    
        if(error) return res.send({"Erro": error});


        weatherStack({latitude, longitude, location}, (mapError, mapData) =>{
            if(mapError) return res.send({"Erro" : mapError});
            res.send( {
                "Local": mapData.location.name,
                "Pais": mapData.location.country,
                "Imagem": mapData.current.weather_icons,
                "Temperatura": mapData.current.temperature,
                "Descricao": mapData.current.weather_descriptions[0]
            });
        })
    });

});

app.get('/products', (req, res) =>{
    if(!req.query.search)
    {
        return res.send({
            error: "Você precisa informar uma busca"
        })
    }
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) =>{
    res.render('notFound', {
        title: 'Artigo de ajuda não encontrado',
        message: 'Não conseguimos encontrar o artigo especificado, tente acessar uma das opções de páginas acima.'
    });
});

app.get('*', (req, res) =>{
    res.render('notFound', {
        title: 'Página não encontrada',
        message: 'Não conseguimos encontrar a página especificada, tente acessar uma das opções de páginas acima.'
    });
});



app.listen(port, () => {
    console.log('Server is up on port 8000.')
})