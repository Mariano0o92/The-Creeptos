const coinsContainer = document.querySelector('.coins__container')
const input = document.querySelector('input')
const listCoins = []

// API DATA

function getCoins() {
	const URL_API =
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1'
	const proxyUrl = 'https://corsproxy.io/?'
	const API_KEY = window.API_KEY

	fetch(URL_API, {
		method: 'GET',
	})
		.then(res => res.json())
		.then(data => {
			createCoins(data)
		})
		.catch(err => {
			console.log(err)
		})
}

getCoins()

const createCoins = coins => {
	const cryptoCoin = coins

	cryptoCoin.forEach(coin => {
		const coinRow = document.createElement('div')
		coinRow.classList.add('coins__row')

        listCoins.push(coinRow)

		const percentageChange = coin.price_change_percentage_24h
		const changeColorClass = percentageChange < 0 ? '' : ' coins__difference--green'

		coinRow.innerHTML = `
            <div class="coins__rank">${coin.market_cap_rank}</div>
            <img class="coins__logo" src="${coin.image}" alt="${coin.name}">
            <div class="coins__name">${coin.name}</div>
            <div class="coins__shortcut">${coin.symbol}</div>
            <div class="coins__price">$${coin.current_price}</div>
        <div class="coins__volume">$${coin.total_volume}</div>
        <div class="coins__difference${changeColorClass}">${percentageChange.toFixed(2)}%</div>
        <div class="coins__market-cap">$${coin.market_cap}</div>
        `
		coinsContainer.appendChild(coinRow)
	})
}

// SEARCH ENGINE

const filterCoins = (searchTerm) => {
    listCoins.forEach(coin => {
        const coinText = coin.innerText.toLowerCase();
        if (coinText.includes(searchTerm.toLowerCase())) {
            coin.style.display = 'grid';
        } else {
            coin.style.display = 'none';
        }
    });
}


input.addEventListener('input', (e) => filterCoins(e.target.value))
