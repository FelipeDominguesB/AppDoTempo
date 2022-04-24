const formulario = document.querySelector('form');
const textoPesquisa = document.querySelector('#textoPesquisa');

const localLabel = document.querySelector('#localLabel');
const tempLabel = document.querySelector('#tempLabel');
const countryLabel = document.querySelector('#countryLabel');
const tempCard = document.querySelector('.card-content');
const imgWeather = document.querySelector('#weatherImg');


formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    tempCard.style.display = 'none';
    fetch(`http://localhost:8000/Weather?locale=${textoPesquisa.value}`).then((response) =>{
        response.json().then((dados) =>{
            if(dados.Erro) 
            {
            }
            else{
                localLabel.textContent = "Local: " + dados.Local;
                countryLabel.textContent = `País: ${dados.Pais}`;
                tempLabel.textContent = `Temperatura: ${dados.Temperatura}ºC`;
                imgWeather.src = `img/${dados.Descricao.split(' ').join('')}.png`
                tempCard.style.display = 'flex';
            }
            
        })
    })
});
