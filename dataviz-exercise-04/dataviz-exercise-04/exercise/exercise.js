


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

const TEST_TEMPERATURES = [13, 18, 21, 19, 26, 25, 16];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//const MARGIN = { top: 10, right: 10, bottom: 10, left: 10 };


class ScatterPlot {
	constructor(html_id, data) {
		const linearScaleX = d3.scaleLinear().domain([1, data.length]).range([0, 200]);
		const linearScaleY = d3.scaleLinear().domain([0, 30]).range([100, 0]);

		const getClass = (temp) => {
			if (temp <= 17) return "cold";
			else if (temp >= 23) return "warm";
			else return "";
		};

		const yLab = []
		const temp = [...Array(31).keys()]
		temp.forEach((elem) => { if (elem % 5 === 0) yLab.push(elem)});

		const svg =  d3.select(`#${html_id}`);
		svg.selectAll("circles")
			.data(data)
			.enter().append("circle")
			.attr("cx", (d) => linearScaleX(d.x))
			.attr("cy", (d) => linearScaleY(d.y))
			.attr("r", 2.5)
			.attr("class", (d) => getClass(d.y))
		// X labels
		svg.selectAll("xLabels")
			.data(data)
			.enter().append("text")
			.attr('x', (d) => linearScaleX(d.x))
			.attr('y', 103)
			.text((d) => d.name)
		// Y labels
		svg.selectAll("yLabels")
			.data(yLab)
			.enter().append("text")
			.attr('x', -20)
			.attr('y', (d) => linearScaleY(d))
			.text((d) => `${d}`)
	}

}

whenDocumentLoaded(() => {

	// prepare the data here
	const data = TEST_TEMPERATURES.map((temp, id) => {
		return {'y': temp, 'x': id+1, 'name': DAYS[id]}
	});
	console.log(data);

	const plot = new ScatterPlot('plot', data);
});

