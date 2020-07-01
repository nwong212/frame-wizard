function eventWindowLoaded(){frameDesign(),downloadSVG(),setYPosition(),Array.from(document.getElementsByTagName("rect")).forEach(e=>{var t=e.getAttribute("height");e.setAttribute("data-height",t)})}function frameDesign(){var e,t=document.getElementById("frameCalc"),n=document.getElementById("remaining"),a=document.getElementById("measurement-remainder");t.addEventListener("change",i),t.addEventListener("input",l);var r=document.getElementsByClassName("values"),o=Array.from(r);function i(){Array.from(r,(function(e){0!=e.value.length&&0!=e.value||(e.value=0)})),o.forEach(t=>{e=t.value;var n=d(e),a="svg-"+t.id,r="not-"+t.id,o=document.getElementById(r),i=document.getElementById(a),l=parseFloat(i.getAttribute("data-height")),u=64*parseFloat(n),s=u-l;if(i.setAttribute("height",u),"rabbet"!=t.id&&o.setAttribute("transform","translate(0 "+s+")"),"strainer"==t.id){var c=document.getElementById("svg-x"),m=parseFloat(c.getAttribute("data-y"))+s;c.setAttribute("y2",m)}});var t=Array.from(r);t.forEach((e,t,n)=>{var a=e.value;n[t]=d(a)});var i,l,s=t.reduce((function(e,t){return e+t}),0),c=2*t[0]-s;n.value=u(c),a.textContent=n.value,c<0?(l=Math.abs(c),i=u(l),n.value="-"+i+'"',a.textContent="-"+i+'"',n.classList.add("negative"),a.setAttribute("class","negative")):(i=u(c),n.value=i+'"',a.textContent=i+'"',n.classList.remove("negative"),a.setAttribute("class","positive")),setYPosition()}function l(){(r=Array.from(r)).forEach(e=>{var t=e.id+"-group",n="measurement-"+e.id;document.getElementById(n).textContent=e.value+'"',0==e.value||0==e.value.length?document.getElementById(t).style.display="none":document.getElementById(t).style.display="inline"})}o.forEach(e=>{var t=e.getAttribute("height");e.setAttribute("data-height",t)}),document.getElementById("resetButton").addEventListener("click",(function(){Array.from(r,(function(e){e.value=0})),i(),l()}));var d=function(e){if(-1!=e.indexOf("/")){var t,n=e.split(" ");return n.length>1?t=n[1].split("/"):(t=n[0].split("/"),n[0]=0),parseInt(n[0],10)+parseInt(t[0],10)/parseInt(t[1],10)}return parseInt(e,10)},u=function(e){if(parseFloat(e)===parseInt(e))return e;var t=function(e,n){return n<1e-7?e:t(n,Math.floor(e%n))},n=e.toString().length-2,a=Math.pow(10,n),r=e*a,o=t(r,a),i=0;return(r/=o)>(a/=o)&&(r-=(i=Math.floor(r/a))*a),e=Math.floor(r)+"/"+Math.floor(a),i&&(e=i+" "+e),e}}function downloadSVG(){var e=document.getElementById("download"),t=document.querySelector("svg");e.addEventListener("click",(function(){var e=document.getElementById("downloadable"),n=e.getContext("2d"),a=(new XMLSerializer).serializeToString(t),r=window.URL||window.webkitURL||window,o=new Image,i=new Blob([a],{type:"image/svg+xml;charset=utf-8"}),l=r.createObjectURL(i);o.onload=function(){n.clearRect(0,0,1800,2e3),n.drawImage(o,0,0,1800,2e3),r.revokeObjectURL(l),function(e){var t=new MouseEvent("click",{view:window,bubbles:!1,cancelable:!0}),n=document.createElement("a");n.setAttribute("download","frame-diagram.png"),n.setAttribute("href",e),n.setAttribute("target","_blank"),n.dispatchEvent(t)}(e.toDataURL("image/png").replace("image/png","image/octet-stream"))},o.src=l}))}function setYPosition(){var e,t;Array.from(document.getElementsByClassName("label")).forEach(n=>{e=n.previousElementSibling,t=parseFloat(e.getAttribute("y"));var a=parseFloat(e.getAttribute("height"))/2+t+1;n.setAttribute("y",a)})}window.addEventListener("load",eventWindowLoaded,!1);
//# sourceMappingURL=wizard.js.map