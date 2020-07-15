/*
* )                )       )
* ( /(   (  (      ( /(    ( /(   (
* )\())  )\))(   ' )\())   )\())  )\ )
* ((_)\  ((_)()\ ) ((_)\   ((_)\  (()/(
* _((_) _(())\_)()  ((_)   _((_)  /(_))_
* | \| | \ \((_)/ / / _ \  | \| | (_)) __|
* | .` |  \ \/\/ / | (_) | | .` |   | (_ |
* |_|\_|   \_/\_/   \___/  |_|\_|    \___|
*
* Created by Nathan Wong
* https://nathanwong.studio
*
* Frame Depth Calculator v. 2.0
* Copyright 2020 Nathan Wong
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in the
* Software without restriction, including without limitation the rights to use, copy,
* modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so, subject to the
* following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
* PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
* SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

window.addEventListener("load", eventWindowLoaded, false);
window.addEventListener("change", calculator, false);
window.addEventListener("change", makeURL, false);

function eventWindowLoaded() {

  // Adding Data- attribute to SVG elements with their intial heights

  var svgRect = Array.from(document.getElementsByTagName("rect"));

  svgRect.forEach((x) => {

    var height = x.getAttribute('height');

    x.setAttribute('data-height', height);

  });
  setFromHref();
  calculator();
  downloadSVG();
  makeURL();
	chooseProfile();

}

function setFromHref() {
  if(window.location.href.includes("?rabbet")){
    (new URL(window.location.href)).searchParams.forEach((x, y) =>
      document.getElementById(y).value = decodeURIComponent(x));
  }
  calculator();
}

//Make a URL from the form elements
function makeURL() {
  var uri;
  var uriField = document.getElementById('url');

  var input = Array.from(document.getElementsByClassName('values'));

  var inputVals = input.map(function(x) {
    return x.id + "=" + encodeURIComponent(x.value);
  });

  uri =window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?' + inputVals.join('&');

  uriField.value = uri;

}

function chooseProfile() {
	var proButton = document.getElementById('chooseProfile'),
			picker = document.getElementById('overlay'),
			xButton = document.getElementById('x-button'),
			form = document.getElementById('frame-pick'),
			rabbet = document.getElementById('rabbet'),
			radios = document.getElementsByName('profile'),
			label,
			clear = document.getElementById('clear'),
			select = document.getElementById('select'),
			buttons = document.getElementById('buttons');

			proButton.addEventListener('click', function() {
				picker.classList.remove('hide');

				setTimeout(function() {
					picker.classList.add('show');
				}, 50);
			});
			xButton.addEventListener('click', function() {
				picker.classList.remove('show');

				setTimeout(function() {
					picker.classList.add('hide');
				}, 100);
			});
			select.addEventListener('click', function () {
				picker.classList.remove('show');

				setTimeout(function() {
					picker.classList.add('hide');
				}, 100);
			});
			clear.addEventListener('click', function() {

				buttons.classList.remove('show');
				buttons.classList.add('hide');

				for (var i = 0, length = radios.length; i < length; i++) {
					if (radios[i].checked) {

						radios[i].checked = false;

						// only one radio can be logically checked, don't check the rest
						break;
					}
				}
			});

			form.addEventListener('change', function() {
				for (var i = 0, length = radios.length; i < length; i++) {
					if (radios[i].checked) {
						// do whatever you want with the checked radio

						buttons.classList.remove('hide');
						buttons.classList.add('show');

						rabbet.value = radios[i].value;

						label = radios[i].nextElementSibling.innerHTML;

						proButton.innerHTML = label;

						proButton.classList.add('profile-selected');

						// only one radio can be logically checked, don't check the rest
						break;
					}
				}
			})

}

/** Calculator
 *** This function calculates the difference between the rabbet depth and the
 *** package depth and outputs a user-friendly fraction.
 **/

function calculator() {

  // var form = document.getElementById('frameCalc');
  var remainder = document.getElementById('remaining'),
  svgRemainder = document.getElementById('measurement-remainder'),
  fields = Array.from(document.getElementsByClassName("values"));

  //make key-value
  let vals = new Map();

  fields.forEach((f) => {
    if (f.value == 0 || f.value.length == 0) {
      f.value = 0;
    }
    vals.set(f.id, f.value);
  });

  //convert to decimals
  let decimals = new Map();

  vals.forEach((value, key) => {
    var x = fractionToNumber(value);

    decimals.set(key, x);

    var label = 'measurement-' + key,
        labelEl = document.getElementById(label);

    labelEl.textContent = value + "\x22";

  });

  // find the difference
  var rabbet = decimals.get('rabbet'),
      sum = Array.from(decimals.values()).reduce(function(a, b) {
        return a + b;
      },0),
      difference = (2 * rabbet) - sum;

	//find out if the rabbet is larger than 2 3/8 and then change svg based on it.

	if(rabbet >= 2.375) {
		document.getElementById('frame-diagram').setAttribute('viewBox', '-10 10 180 250');
		document.getElementById('downloadable').setAttribute('height', '2500');
	} else {
		document.getElementById('frame-diagram').setAttribute('viewBox', '-10 10 180 200');
		document.getElementById('downloadable').setAttribute('height', '2000');
	}

  //Insert the Number

  var fractioned;
  var nonNeg;

  if (difference < 0) {
    nonNeg = Math.abs(difference)

    fractioned = numberToFraction(nonNeg)

    remainder.value = "-" + fractioned + '\x22'
    svgRemainder.textContent = "-" + fractioned + '\x22'

    remainder.classList.add('negative')

    svgRemainder.setAttribute("class", 'negative')

  } else {

    fractioned = numberToFraction(difference)

    remainder.value = fractioned + '\x22'
    svgRemainder.textContent = fractioned + '\x22'

    remainder.classList.remove('negative')

    svgRemainder.setAttribute("class", 'positive')
  }

  //take decimal number and convert to bits

  var bits = new Map();
  decimals.forEach((value, key) => {
    bits.set(key, value * 64)
  });

  //Assign heights, visibility, and labels
  bits.forEach((value, key) => {
    var svg = 'svg-' + key,
        not = 'not-' + key,
        group = key + '-group',
        label = 'measurement-' + key,
        svgEl = document.getElementById(svg),
        notEl = document.getElementById(not),
        groupEl = document.getElementById(group),
        labelEl = document.getElementById(label),
        svgDiff = value - parseFloat(svgEl.dataset.height),
        y = parseFloat(svgEl.getAttribute('y')),
        yPosition = value / 2 + y + 1;

    svgEl.setAttribute('height', value);

    if (key != 'rabbet') {
      notEl.setAttribute('transform', 'translate(0 ' + svgDiff + ')');

      labelEl.setAttribute('y', yPosition);

      if (value == 0) {
        groupEl.style.display = 'none';
      } else {
        groupEl.style.display = 'inline';
      }
    }
    if (key == 'strainer') {
      var y1 = parseFloat(document.getElementById('svg-x').getAttribute('y1')),
          y2 = y1 + value;
      document.getElementById('svg-x').setAttribute('y2', y2);
    }
    // console.log(svgEl)
  });



  /**
   *
   * Convert Fraction to Number
   *
   **/
  function fractionToNumber(amount) {
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
  function numberToFraction(amount) {
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
  }

}

/* SVG to PNG and Download
 ** Converts the SVG to a PNG
 ** Links straight to download.
 ** Doesn't work on iOS yet, haven't tested on android.
 */

function downloadSVG() {
  var btn = document.getElementById('download');
  var svg = document.querySelector('svg');

  function triggerDownload(imgURI) {
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

  btn.addEventListener('click', function() {
    var canvas = document.getElementById('downloadable');
    var ctx = canvas.getContext('2d');
    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svgBlob = new Blob([data], {
      type: 'image/svg+xml;charset=utf-8'
    });
    var url = DOMURL.createObjectURL(svgBlob);

		var height = canvas.height;

    img.onload = function() {
      ctx.clearRect(0, 0, 1800, height);
      ctx.rect(0, 0, 1800, height);
			ctx.fillStyle ='white';
			ctx.fill();

      ctx.drawImage(img, 0, 0, 1800, height);
      DOMURL.revokeObjectURL(url);

      var imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      triggerDownload(imgURI);
    };

    img.src = url;
  }, false);
}
