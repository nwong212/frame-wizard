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
  // canvasApp();
  frameDesign();
}

function frameDesign() {
  var rabbet = document.getElementById("rabbet");

	rabbet.addEventListener("input", rabbetChanged);

  function rabbetChanged() {
    document.getElementById("svg-rabbet").textContent = rabbet.value + "\42";
  }

  var spacer = document.getElementById("spacer");

  spacer.addEventListener("input", spacerd);


  function spacerd() {

    document.getElementById("measurement-spacer").textContent = spacer.value + "\42";

    if (spacer.value.length != 0 && spacer.value > 0) {
      document.getElementById("notSpacer").setAttribute("transform", "translate(0 0)");

      document.getElementById("spacer-group").style.display = "inline";


    } else if (spacer.value.length == 0 || spacer.value == 0) {
      document.getElementById("notSpacer").setAttribute("transform", "translate(0 -20.8)");

      document.getElementById("spacer-group").style.display = "none";
    }
  }

  //Top Mat
  var topSelect = document.getElementById("topMat");

  topSelect.addEventListener("change", topChange, false);

  function topChange() {

    document.getElementById("measurement-top").textContent = topSelect.options[topSelect.selectedIndex].value + "\42";

    if (topSelect.value == "1/16") {
      document.getElementById("top-group").style.display = "inline";
      document.getElementById("notTop").setAttribute("transform", "translate(0 0)");

      document.getElementById("svg-top").setAttribute("points", "103.5,61.3 40.7,61.3 40.7,65.3 109.2,65.3 ");

    } else if (topSelect.value == "1/8") {
      document.getElementById("top-group").style.display = "inline";
      document.getElementById("notTop").setAttribute("transform", "translate(0 4)");

      document.getElementById("svg-top").setAttribute("points", "103.5,61.3 40.7,61.3 40.7,69.3 109.2,69.3");

    } else if (topSelect.value == "0") {
      document.getElementById("top-group").style.display = "none";

      document.getElementById("notTop").setAttribute("transform", "translate(0 -4)");
    }
  }

  //Bottom Mat
  var bottomSelect = document.getElementById("bottomMat");

  bottomSelect.addEventListener("change", bottomChange, false);

  function bottomChange() {

    document.getElementById("measurement-bottom").textContent = bottomSelect.options[bottomSelect.selectedIndex].value + "\42";

    if (bottomSelect.value == "1/16") {
      document.getElementById("svg-bottom").setAttribute("height", "4");

      document.getElementById("notBottom").setAttribute("transform", "translate(0 0)");
    } else if (bottomSelect.value == "1/8") {
      document.getElementById("svg-bottom").setAttribute("height", "8");

      document.getElementById("notBottom").setAttribute("transform", "translate(0 4)");
    }
  }

  //Backing Board
  var backingBoard = document.getElementById("backing");
  backingBoard.addEventListener("input", backingChanged);

  function backingChanged() {
    document.getElementById("measurement-backing").textContent = backingBoard.value + "\42";
  }

	// Additional Space
	var additional = document.getElementById("additional");
	additional.addEventListener("input", moreAdded);

	function moreAdded() {
		document.getElementById("measurement-additional").textContent = additional.value + "\42";


    if (additional.value.length != 0 && additional.value > 0) {
      document.getElementById("svg-strainer").setAttribute("transform", "translate(0 8)");

      document.getElementById("additional-group").style.display = "inline";


    } else if (additional.value.length == 0 || additional.value == 0) {
      document.getElementById("svg-strainer").setAttribute("transform", "translate(0 0)");

      document.getElementById("additional-group").style.display = "none";
    }
	}


  //Strainer
  var strainer = document.getElementById("strainer");
  strainer.addEventListener("input", strainerChanged);

  function strainerChanged() {
    document.getElementById("measurement-strainer").textContent = strainer.value + "\42";
  }

  //Glazing
  var glazing = document.getElementById("glazing");
  glazing.addEventListener("input", glazingChanged);

  function glazingChanged() {
    document.getElementById("measurement-glazing").textContent = glazing.value + "\42";

  }

  //Calculator

  var form = document.getElementById('frameCalc');

  form.addEventListener('change', calculate);

	var remainder = document.getElementById('remaining');

	var svgRemainder = document.getElementById('measurement-remainder');

  function calculate() {

		var values = [rabbet.value, glazing.value, spacer.value, topSelect.value, bottomSelect.value, backingBoard.value, strainer.value, additional.value];



		values.forEach(function(x, i, values) {
			if (x.indexOf('/') != -1) {
        var parts = x.split(" ")
        var decParts;
        if (parts.length > 1) {
          decParts = parts[1].split("/");
        } else {
          decParts = parts[0].split("/");
          parts[0] = 0;
        }
        values[i] = parseInt(parts[0], 10) + (parseInt(decParts[0], 10) / parseInt(decParts[1], 10))
      } else {
        values[i] = parseInt(x, 10)
      }

		});
		var noRabbet = values.slice(1)

		var maths = values[0] - noRabbet.reduce((a, b) => a + b, 0)

		var frameSide = document.getElementById('frameside')
		var frameHeight = document.getElementById('frame-group').getBBox().height

		// console.log(values);
		// remainder.value = numberToFraction(maths) + "\42"
		// svgRemainder.textContent = numberToFraction(maths)  + "\42"

		var fractioned;
		var nonNeg;

		if(maths < 0) {
			nonNeg = Math.abs(maths)

			fractioned = numberToFraction(nonNeg)

			remainder.value = "-" + fractioned + "\42"
			svgRemainder.textContent = "-" + fractioned + "\42"

			remainder.classList.add('negative')

			svgRemainder.setAttribute("class", 'negative')

			frameSide.setAttribute("height", frameHeight - 5)

		} else if (maths>=0) {

			fractioned = numberToFraction(maths)

			remainder.value =  fractioned + "\42"
			svgRemainder.textContent =  fractioned + "\42"

			remainder.classList.remove('negative')

			svgRemainder.setAttribute("class", 'positive')
		}
		if (maths == 0) {
			frameSide.setAttribute("height", frameHeight + 0)
		}
		if (maths > 0) {
			frameSide.setAttribute("height", frameHeight + 5)

		}
  }
	/**
 * Converts numbers to fractions:
 * - 1.25 to 1 1/4
 * - 2 to 2
 */
var numberToFraction = function( amount ) {
	// This is a whole number and doesn't need modification.
	if ( parseFloat( amount ) === parseInt( amount ) ) {
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
	if ( numerator > denominator ) {
		base = Math.floor( numerator / denominator );
		numerator -= base * denominator;
	}
	amount = Math.floor(numerator) + '/' + Math.floor(denominator);
	if ( base ) {
		amount = base + ' ' + amount;
	}
	return amount;
};
}
