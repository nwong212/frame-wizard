// )                )       )
// ( /(   (  (      ( /(    ( /(   (
// )\())  )\))(   ' )\())   )\())  )\ )
// ((_)\  ((_)()\ ) ((_)\   ((_)\  (()/(
// _((_) _(())\_)()  ((_)   _((_)  /(_))_
// | \| | \ \((_)/ / / _ \  | \| | (_)) __|
// | .` |  \ \/\/ / | (_) | | .` |   | (_ |
// |_|\_|   \_/\_/   \___/  |_|\_|    \___|
//
// Created by Nathan Wong
// https://nathanwong.studio
//
// Frame Depth Calculator v. 1.0
// Copyright 2020 Nathan Wong
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
	frameDesign();
	downloadSVG();
	setYPosition(); //Set the Y for all elements at start

	//Adding Data- attribute to SVG elements with their intial heights

	var svgRect = Array.from(document.getElementsByTagName("rect"))
	;

	svgRect.forEach((x) => {

		var height = x.getAttribute('height');

		x.setAttribute('data-height', height);

	});

}

function frameDesign() {
	var form = document.getElementById('frameCalc');
	var remainder = document.getElementById('remaining');
	var svgRemainder = document.getElementById('measurement-remainder');
	var value;

	form.addEventListener('change', calculate);
	form.addEventListener('input', setVisibility);

	var fields = document.getElementsByClassName("values");
	var fieldArray = Array.from(fields);

	fieldArray.forEach((x) => {
		var height = x.getAttribute('height');

		x.setAttribute('data-height', height);
	});


	//Reset the Form
	var resetbtn = document.getElementById("resetButton");

	resetbtn.addEventListener('click', function () {

		// console.log(fields);

		Array.from(fields, function(el){
			el.value = 0;
		});

		calculate();
		setVisibility();
	});


	//Calculator
	//This function calculates the difference between the rabbet depth and the package depth and outputs a user-friendly fraction.

	function calculate() {

		//Reset any blank fields to 0
		//
		// Array.from(fields, function(el){
		//
		// 	if (el.value.length == 0 || el.value == 0) {
		// 		el.value = 0;
		// 	}
		// });

		// setting the height and positioning of everything based on the values given.
		fieldArray.forEach((f) => {
			value = f.value;

			var newValue = fractionToNumber(value);

			var svg = 'svg-' + f.id;
			var group = 'not-' + f.id;
			var elGroup = document.getElementById(group);
			var el = document.getElementById(svg);
			var height = parseFloat( el.getAttribute("data-height"));
			var scaled = parseFloat(newValue) * 64;
			var diff = scaled - height;

			el.setAttribute("height", scaled);

			if (f.id != "rabbet") { //ignore the rabbet
				elGroup.setAttribute("transform", "translate(0 " + diff + ")");
			}

			if (f.id == "strainer") {
				var x = document.getElementById('svg-x');
				var initY = parseFloat(x.getAttribute('data-y'));
				var newY = initY + diff;

				x.setAttribute('y2', newY);
			}

		});

		//Calculate the difference

		var fracs = Array.from(fields);

		fracs.forEach((f,i,fracs) => {
			var frac = f.value;

			fracs[i] = fractionToNumber(frac);
		});

		// console.log(fracs);

		var sum = fracs.reduce(function(a, b){
								return a + b;
							}, 0);

		var maths =(2 * fracs[0]) - sum;

		remainder.value = numberToFraction(maths);
		svgRemainder.textContent = remainder.value;

		var fractioned;
		var nonNeg;

		if (maths < 0) {
			nonNeg = Math.abs(maths)

			fractioned = numberToFraction(nonNeg)

			remainder.value = "-" + fractioned + "\42"
			svgRemainder.textContent = "-" + fractioned + "\42"

			remainder.classList.add('negative')

			svgRemainder.setAttribute("class", 'negative')

		} else {

			fractioned = numberToFraction(maths)

			remainder.value = fractioned + "\42"
			svgRemainder.textContent = fractioned + "\42"

			remainder.classList.remove('negative')

			svgRemainder.setAttribute("class", 'positive')
		}

		setYPosition();
	}

	function setVisibility() {
		fields = Array.from(fields);

		fields.forEach((x) => {

			var svgGroup = x.id + '-group';

			// console.log(svgGroup);

			var measurement = 'measurement-' + x.id;

			document.getElementById(measurement).textContent = x.value + "\42";

			if(x.value == 0 || x.value.length == 0) {
				document.getElementById(svgGroup).style.display = "none";
			} else {
				document.getElementById(svgGroup).style.display = "inline";
			}
		});
	}

	/**
	*
	* Convert Fraction to Number
	*
	**/
	var fractionToNumber = function(amount) {
		if (amount.indexOf('/') != -1) {
			var parts = amount.split(" ")
			var decParts;
			if (parts.length > 1) {
				decParts = parts[1].split("/");
			} else {
				decParts = parts[0].split("/");
				parts[0] = 0;
			}
			return parseInt(parts[0], 10) + (parseInt(decParts[0], 10) / parseInt(decParts[1], 10));
		} else {
			return parseInt(amount, 10)
		}
	}

	/**
	 * Converts numbers to fractions:
	 * - 1.25 to 1 1/4
	 * - 2 to 2
	 */
	var numberToFraction = function(amount) {
		// This is a whole number and doesn't need modification.
		if (parseFloat(amount) === parseInt(amount)) {
			return amount;
		}
		// Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
		var gcd = function(a, b) {
			if (b < 0.0000001) {
				return a;
			}
			return gcd(b, Math.floor(a % b));
		};
		var len = amount.toString().length - 2;
		var denominator = Math.pow(10, len);
		var numerator = amount * denominator;
		var divisor = gcd(numerator, denominator);
		numerator /= divisor;
		denominator /= divisor;
		var base = 0;
		// In a scenario like 3/2, convert to 1 1/2
		// by pulling out the base number and reducing the numerator.
		if (numerator > denominator) {
			base = Math.floor(numerator / denominator);
			numerator -= base * denominator;
		}
		amount = Math.floor(numerator) + '/' + Math.floor(denominator);
		if (base) {
			amount = base + ' ' + amount;
		}
		return amount;
	};
}

//add art depth
//add svg to png

function downloadSVG() {
	var btn = document.getElementById('download');
	var svg = document.querySelector('svg');

	function triggerDownload (imgURI) {
		var evt = new MouseEvent('click', {
		  view: window,
		  bubbles: false,
		  cancelable: true
		});

		var a = document.createElement('a');
		a.setAttribute('download', 'frame-diagram.png');
		a.setAttribute('href', imgURI);
		a.setAttribute('target', '_blank');

		a.dispatchEvent(evt);
		}

		btn.addEventListener('click', function () {
				var canvas = document.getElementById('downloadable');
				var ctx = canvas.getContext('2d');
				var data = (new XMLSerializer()).serializeToString(svg);
				var DOMURL = window.URL || window.webkitURL || window;

				var img = new Image();
				var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
				var url = DOMURL.createObjectURL(svgBlob);

				img.onload = function () {
						ctx.clearRect(0, 0, 1800, 2000);
						ctx.drawImage(img, 0, 0, 1800, 2000);
				  DOMURL.revokeObjectURL(url);

				  var imgURI = canvas
				      .toDataURL('image/png')
				      .replace('image/png', 'image/octet-stream');

				  triggerDownload(imgURI);
				};

				img.src = url;
		});
}
function setYPosition() {
	var label = Array.from(document.getElementsByClassName("label"));
	var sibling;
	var height;
	var y;

	// console.log(document.getElementById("svg-strainer"))

	label.forEach((el) => {
			sibling = el.previousElementSibling;

			y = parseFloat(sibling.getAttribute("y"))
			height = parseFloat(sibling.getAttribute("height"));

			var yPosition = height / 2 + y + 1;

			el.setAttribute("y", yPosition);

			// console.log(el.id + y + " " + height);


	});



}
