function eventWindowLoaded(){frameDesign()}function frameDesign(){var e=document.getElementById("rabbet");e.addEventListener("input",(function(){document.getElementById("svg-rabbet").textContent=e.value+'"'}));var t=document.getElementById("spacer");t.addEventListener("input",(function(){document.getElementById("measurement-spacer").textContent=t.value+'"',0!=t.value.length&&t.value>0?(document.getElementById("notSpacer").setAttribute("transform","translate(0 0)"),document.getElementById("spacer-group").style.display="inline"):0!=t.value.length&&0!=t.value||(document.getElementById("notSpacer").setAttribute("transform","translate(0 -20.8)"),document.getElementById("spacer-group").style.display="none")}));var n=document.getElementById("topMat");n.addEventListener("change",(function(){document.getElementById("measurement-top").textContent=n.options[n.selectedIndex].value+'"',"1/16"==n.value?(document.getElementById("top-group").style.display="inline",document.getElementById("notTop").setAttribute("transform","translate(0 0)"),document.getElementById("svg-top").setAttribute("points","103.5,61.3 40.7,61.3 40.7,65.3 109.2,65.3 ")):"1/8"==n.value?(document.getElementById("top-group").style.display="inline",document.getElementById("notTop").setAttribute("transform","translate(0 4)"),document.getElementById("svg-top").setAttribute("points","103.5,61.3 40.7,61.3 40.7,69.3 109.2,69.3")):"0"==n.value&&(document.getElementById("top-group").style.display="none",document.getElementById("notTop").setAttribute("transform","translate(0 -4)"))}),!1);var a=document.getElementById("bottomMat");a.addEventListener("change",(function(){document.getElementById("measurement-bottom").textContent=a.options[a.selectedIndex].value+'"',"1/16"==a.value?(document.getElementById("svg-bottom").setAttribute("height","4"),document.getElementById("notBottom").setAttribute("transform","translate(0 0)")):"1/8"==a.value&&(document.getElementById("svg-bottom").setAttribute("height","8"),document.getElementById("notBottom").setAttribute("transform","translate(0 4)"))}),!1);var o=document.getElementById("backing");o.addEventListener("input",(function(){document.getElementById("measurement-backing").textContent=o.value+'"'}));var d=document.getElementById("additional");d.addEventListener("input",(function(){document.getElementById("measurement-additional").textContent=d.value+'"',0!=d.value.length&&d.value>0?(document.getElementById("svg-strainer").setAttribute("transform","translate(0 8)"),document.getElementById("additional-group").style.display="inline"):0!=d.value.length&&0!=d.value||(document.getElementById("svg-strainer").setAttribute("transform","translate(0 0)"),document.getElementById("additional-group").style.display="none")}));var u=document.getElementById("strainer");u.addEventListener("input",(function(){document.getElementById("measurement-strainer").textContent=u.value+'"'}));var l=document.getElementById("glazing");l.addEventListener("input",(function(){document.getElementById("measurement-glazing").textContent=l.value+'"'})),document.getElementById("frameCalc").addEventListener("change",(function(){var i=[e.value,l.value,t.value,n.value,a.value,o.value,u.value,d.value];i.forEach((function(e,t,n){if(-1!=e.indexOf("/")){var a,o=e.split(" ");o.length>1?a=o[1].split("/"):(a=o[0].split("/"),o[0]=0),n[t]=parseInt(o[0],10)+parseInt(a[0],10)/parseInt(a[1],10)}else n[t]=parseInt(e,10)}));var g,c,v=i.slice(1),y=i[0]-v.reduce((e,t)=>e+t,0),p=document.getElementById("frameside"),E=document.getElementById("frame-group").getBBox().height;y<0?(c=Math.abs(y),g=s(c),r.value="-"+g+'"',m.textContent="-"+g+'"',r.classList.add("negative"),m.setAttribute("class","negative"),p.setAttribute("height",E-5)):y>=0&&(g=s(y),r.value=g+'"',m.textContent=g+'"',r.classList.remove("negative"),m.setAttribute("class","positive"));0==y&&p.setAttribute("height",E+0);y>0&&p.setAttribute("height",E+5)}));var r=document.getElementById("remaining"),m=document.getElementById("measurement-remainder");var s=function(e){if(parseFloat(e)===parseInt(e))return e;var t=function(e,n){return n<1e-7?e:t(n,Math.floor(e%n))},n=e.toString().length-2,a=Math.pow(10,n),o=e*a,d=t(o,a),u=0;return(o/=d)>(a/=d)&&(o-=(u=Math.floor(o/a))*a),e=Math.floor(o)+"/"+Math.floor(a),u&&(e=u+" "+e),e}}window.addEventListener("load",eventWindowLoaded,!1);