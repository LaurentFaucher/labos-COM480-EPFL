
/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25,16];


// Part 1 - DOM
function showTemperatures(container_element, temperature_array) {
	container_element.innerHTML = "";
	temperature_array.forEach(element => {
		const newP = document.createElement('p');
		const newContent = document.createTextNode(`${element}`);
		if (element >= 23) newP.className = 'warm';
		if (element <= 17) newP.className = 'cold';
		newP.appendChild(newContent);
		container_element.appendChild(newP);
	});
}

whenDocumentLoaded(() => {
	// Part 1.1: Find the button + on click event
	const onClick = () => {
		console.log('The button was clicked');
		container = document.getElementById('weather-part1');
		showTemperatures(container, TEST_TEMPERATURES);
		container2 = document.getElementById('weather-part2');
		const forecast = new Forecast(container2);
		forecast.reload();
		container3 =  document.getElementById('weather-part3');
		const forecastOnline = new ForecastOnline(container3);
		forecastOnline.reload()
	};
	const btn = document.getElementById('btn-part1');
	btn.addEventListener("click", onClick, false);


	// Part 1.2: Write temperatures
});

// Part 2 - class

class Forecast {
	constructor (container) {
		this.container = container;
		this.temperatures = [1,2,3,4,5,6,7];
	}
	toString() {
		return `Container: ${this.container} \nTemperatures ${this.temperatures}`;
	}
	print() {
		console.log(this.toString())
	}
	show() {
		this.container.innerHTML = "";
		this.temperatures.forEach(element => {
			const newP = document.createElement('p');
			const newContent = document.createTextNode(`${element}`);
			if (element >= 23) newP.className = 'warm';
			if (element <= 17) newP.className = 'cold';
			newP.appendChild(newContent);
			this.container.appendChild(newP);
		});
	}
	reload() {
		this.temperatures = TEST_TEMPERATURES;
		this.show()
	}
}

// Part 3 - fetch

const QUERY_LAUSANNE = 'http://api.weatherbit.io/v2.0/forecast/daily?city=Lausanne&days=7&key=e9ef006c8c43499cb5de42c746e25b76';

function weatherbitToTemperatures(data) {
	const weather_arr = data['data'];
	const mean_arr = weather_arr.map((value) => (value['app_max_temp'] + value['app_min_temp']) / 2);
	console.log(mean_arr);
	return mean_arr;
}
let JSON_DATA = {}
class ForecastOnline extends Forecast {
	async reload() {
		await fetch(QUERY_LAUSANNE)
		.then((res) => res.json())
		.then((data) => {
			console.log(data)
			JSON_DATA = data;
			this.temperatures = weatherbitToTemperatures(JSON_DATA);
		});
		this.show();
	}
}

// Part 4 - interactive

