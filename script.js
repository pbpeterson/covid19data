import {KEY} from './key.js'

console.log('oi')

const text = document.querySelector('input');
const button = document.querySelector('button');
const error = document.querySelector('.error');
const content = document.querySelector('.covidNumbers')

function formataValue(pais){
	return pais.toLowerCase()
}

function formataCountry(event){
	event.preventDefault()
	const country = text.value;
	const paisFormatado = formataValue(country);
	getCovid(paisFormatado)
}

async function getCovid(country){
const covidJson = await fetch(`https://covid-19-data.p.rapidapi.com/country?name=${country}&format=json`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": KEY,
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
	text.value = ''
  const covidData = await covidJson.json()
  if (covidData.length){
		error.classList.remove('ativo')
		content.innerHTML = ''
		const {country, critical, deaths, recovered} = covidData[0];
		const newDiv = document.createElement('div');
		newDiv.classList.add('covidValues')
		newDiv.innerHTML = `<div class="covidData"><p>Country</p><h1>${country}</h1></div> <div class="covidData"><p>Critical</p> <h1>${critical}</h1></div> <div class="covidData"><p>Deaths</p> <h1>${deaths}</h1></div> <div class="covidData"><p>Recovered</p> <h1>${recovered}</h1></div>`
		content.appendChild(newDiv)

	}	else{
		content.innerHTML = ''
		error.classList.add('ativo')
	}
}

getCovid('brazil')
button.addEventListener('click', formataCountry)
button.addEventListener('mouseover', ()=>{
	text.classList.add('ativo')
})
button.addEventListener('mouseout', ()=>{
	text.classList.remove('ativo')
})
