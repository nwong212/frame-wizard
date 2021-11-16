import{r as e,a as t}from"./vendor.7f85612b.js";function a(e){if(-1!=e.indexOf("/")){var t,a=e.split(" ");a.length>1?t=a[1].split("/"):(t=a[0].split("/"),a[0]=0);var s=parseInt(a[0],10)+parseInt(t[0],10)/parseInt(t[1],10);return isNaN(s)?" ":s}return parseInt(e,10)}function s(e){if(parseFloat(e)<0)var t=Math.abs(e),a=!0;else t=e,a=!1;if(parseFloat(e)===parseInt(e))return e;var s=function(e,t){return t<1e-7?e:s(t,Math.floor(e%t))},r=t.toString().length-2,l=Math.pow(10,r),n=t*l,i=s(n,l),h=0;(n/=i)>(l/=i)&&(n-=(h=Math.floor(n/l))*l);var m=Math.floor(n)+"/"+Math.floor(l);return h&&(m=h+" "+m),a?"–"+m:m}!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,l)=>{const n=new URL(e,s);if(self[t].moduleMap[n])return a(self[t].moduleMap[n]);const i=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),h=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){l(new Error(`Failed to import: ${e}`)),r(h)},onload(){a(self[t].moduleMap[n]),r(h)}});document.head.appendChild(h)})),self[t].moduleMap={}}}("/assets/");class r extends e.Component{render(){return e.createElement("header",null,e.createElement("ul",{class:"tabs"},e.createElement("li",{class:"tab"},e.createElement("a",{href:"/"},"Frame Depth")),e.createElement("li",{class:"tab active"},e.createElement("a",{href:"/float"},"Float"))))}}class l extends e.Component{constructor(e){super(e),this.state={base:"1",measureIn:"1/2",measureOut:"1/2",profileOD:"1 1/2",profileID:"1 3/8",baseHeight:"1/8",float:"3/16",strainerWidth:"1",artHeight:"1 1/4",stemWidth:"1/8",buildup:"0",dbase:1,dmeasureIn:.5,dmeasureOut:.5,dprofileOD:1.5,dprofileID:1.375,dbaseHeight:.125,dfloat:.1875,dstrainerWidth:1,dartHeight:1.25,dstemWidth:.125,dbuildup:0,dmagic:1.0625,fromOut:!0},this.handleChange=this.handleChange.bind(this),this.handleBlur=this.handleBlur.bind(this),this.calculate=this.calculate.bind(this)}handleChange(e){this.props.onFormChange(e.target.name,e.target.value)}handleBlur(e){this.props.onInputBlur(e.target.name)}calculate(){this.props.magicButton()}render(){return e.createElement("div",{id:"form"},e.createElement("section",{id:"recess"},e.createElement("h4",null,"Recess"),e.createElement("div",{id:"recessAmt"},e.createElement("label",{htmlFor:"recessField"},e.createElement("span",{className:"inches"},e.createElement("input",{name:"recessField",id:"recessField",type:"text",value:this.props.recessField,readOnly:!0}))))),e.createElement("section",{id:"frameDims"},e.createElement("h4",null,"Frame"),e.createElement("section",null,e.createElement("div",{id:"profileID-container"},e.createElement("label",{htmlFor:"profileID"},e.createElement("p",null,"Frame ID"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"profileID",id:"profileID",type:"text",value:this.props.profileID,onChange:this.handleChange,onBlur:this.handleBlur})))),e.createElement("div",{id:"profileOD-container"},e.createElement("label",{htmlFor:"profileOD"},e.createElement("p",null,"Frame OD"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"profileOD",id:"profileOD",type:"text",value:this.props.profileOD,onChange:this.handleChange,onBlur:this.handleBlur}))))),e.createElement("section",null,e.createElement("div",{id:"stem-container"},e.createElement("label",{htmlFor:"stemWidth"},e.createElement("p",null,"Stem Thickness"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"stemWidth",id:"stemWidth",type:"text",value:this.props.stemWidth,onChange:this.handleChange}))))),e.createElement("section",null,e.createElement("div",{id:"baseWidth-container"},e.createElement("label",{htmlFor:"base",id:"baseLabel"},e.createElement("p",null,"Base Width"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"base",id:"base",type:"text",placeholder:"Base Width",value:this.props.base,onChange:this.handleChange,onBlur:this.handleBlur})))),e.createElement("div",{id:"baseHeight-container"},e.createElement("label",{htmlFor:"baseHeight"},e.createElement("p",null,"Base Thickness"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"baseHeight",id:"baseHeight",type:"text",value:this.props.baseHeight,onChange:this.handleChange,onBlur:this.handleBlur})))))),e.createElement("section",{id:"inout"},e.createElement("h4",null,"Hole Placement"),e.createElement("label",{htmlFor:"measureOut"},e.createElement("span",{className:"inches"},e.createElement("input",{name:"measureOut",id:"measureOut",type:"text",className:"active",placeholder:"Hole Distance",value:this.props.measureOut,onChange:this.handleChange,onBlur:this.handleBlur})),e.createElement("p",null,"from Outside →")),e.createElement("label",{htmlFor:"measureIn"},e.createElement("span",{className:"inches"},e.createElement("input",{name:"measureIn",id:"measureIn",type:"text",className:"disabled",placeholder:"Hole Distance",value:this.props.measureIn,onChange:this.handleChange,onBlur:this.handleBlur})),e.createElement("p",null,"← from Inside"))),e.createElement("button",{id:"recalc",onClick:this.calculate},"✨"),e.createElement("section",{id:"frameContent"},e.createElement("h4",null,"Artwork"),e.createElement("section",null,e.createElement("div",{id:"float-container"},e.createElement("label",{htmlFor:"float"},e.createElement("p",null,"Float"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"float",id:"float",type:"text",value:this.props.float,onChange:this.handleChange,onBlur:this.handleBlur}))))),e.createElement("div",{id:"strainerWidth-container"},e.createElement("label",{htmlFor:"strainerWidth"},e.createElement("p",null,"Support Width"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"strainerWidth",id:"strainerWidth",className:"inches",type:"text",value:this.props.strainerWidth,onChange:this.handleChange,onBlur:this.handleBlur})))),e.createElement("div",{id:"artHeight-container"},e.createElement("label",{htmlFor:"artHeight"},e.createElement("p",null,"Artwork Height"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"artHeight",id:"artHeight",type:"text",value:this.props.artHeight,onChange:this.handleChange,onBlur:this.handleBlur})))),e.createElement("div",{id:"buildup-container"},e.createElement("label",{htmlFor:"buildup"},e.createElement("p",null,"Buildup"),e.createElement("span",{className:"inches"},e.createElement("input",{name:"buildup",id:"buildup",type:"text",value:this.props.buildup,onChange:this.handleChange,onBlur:this.handleBlur}))))))}}class n extends e.Component{constructor(e){super(e)}render(){return e.createElement("svg",{viewBox:"0 0 600 600"},e.createElement("defs",null,e.createElement("mask",{id:"holeMask"},e.createElement("rect",{x:this.props.hole-16,y:"-3",width:"32",height:"5",fill:"white",strokeWidth:"0"}))),e.createElement("svg",{id:"frameDiagram",x:"40%",y:"0"},e.createElement("g",{transform:"scale(1 -1)\n                         translate(0 -450)",stroke:"#2b6799",strokeWidth:"1",fill:"none"},e.createElement("defs",null,e.createElement("mask",{id:"Mask"},e.createElement("rect",{x:"0",y:"0",width:this.props.baseW+2,height:this.props.stemH+2,fill:"white"}),e.createElement("rect",{x:"1.5",y:"1.5",width:this.props.stemW-1,height:this.props.baseH+2.5,fill:"black",stroke:"none"}),e.createElement("rect",{x:"1.5",y:"1.5",width:this.props.stemW+2.5,height:this.props.baseH-1,fill:"black",stroke:"none"}))),e.createElement("g",{mask:"url(#Mask)"},e.createElement("rect",{id:"frameStem",height:this.props.stemH,width:this.props.stemW,x:"1",y:"1"}),e.createElement("rect",{id:"frameBase",height:this.props.baseH,width:this.props.baseW,x:"1",y:"1"})),e.createElement("svg",{x:this.props.floatPos+1,y:this.props.basePos+1},e.createElement("rect",{id:"buildupSVG",height:this.props.buH,width:this.props.artW-4,x:"2",y:"1",fill:"none",stroke:"#e6f4f7",strokeWidth:"2",strokeDasharray:"4 2"}),e.createElement("rect",{id:"artworkSVG",height:this.props.artH-1,width:this.props.artW,x:"0",y:this.props.buH+1,fill:"#e6f4f7",strokeWidth:"0"})),e.createElement("circle",{mask:"url(#holeMask)",id:"hole-outline",cx:this.props.hole,cy:"0",r:"13.5",fill:"#fefdfb",stroke:"transparent",strokeWidth:"0"}),e.createElement("circle",{id:"hole",cx:this.props.hole,cy:"0",r:"9.4",fill:"#fefdfb",stroke:"#2b6799",strokeWidth:"1"}),e.createElement("circle",{id:"hole-dot",cx:this.props.hole,cy:"0",r:"2",fill:"#2b6799",stroke:"transparent",strokeWidth:"0"}))))}}class i extends e.Component{constructor(e){super(e),this.state={base:"1",measureIn:"1/4",measureOut:"3/4",profileOD:"1 1/2",profileID:"1 3/8",baseHeight:"1/8",float:"3/16",strainerWidth:"1",artHeight:"1 1/4",stemWidth:"1/8",buildup:"0",recessField:"1/8",dbase:1,dmeasureIn:.25,dmeasureOut:.75,dprofileOD:1.5,dprofileID:1.375,dbaseHeight:.125,dfloat:.1875,dstrainerWidth:1,dartHeight:1.25,dstemWidth:.125,dbuildup:0,dmagic:1.0625,fromOut:!0},this.handleChange=this.handleChange.bind(this),this.handleBlur=this.handleBlur.bind(this),this.magic=this.magic.bind(this)}handleChange(e,t){const s="d"+e;"measureOut"===e?this.setState({fromOut:!0}):"measureIn"===e&&this.setState({fromOut:!1}),this.setState((()=>({[e]:t}))),this.setState((()=>({[s]:a(t)})))}handleBlur(e){"baseHeight"===e||"profileOD"===e?(this.setState((e=>({dprofileID:e.dprofileOD-e.dbaseHeight}))),this.setState((e=>({profileID:s(e.dprofileID)})))):"profileID"===e?(this.setState((e=>({dprofileOD:e.dprofileID+e.dbaseHeight}))),this.setState((e=>({profileOD:s(e.dprofileOD)})))):"measureOut"===e?(this.setState((e=>({dmeasureIn:e.dbase-e.dmeasureOut}))),this.setState((e=>({measureIn:s(e.dmeasureIn)})))):"measureIn"===e&&(this.setState((e=>({dmeasureOut:e.dbase-e.dmeasureIn}))),this.setState((e=>({measureOut:s(e.dmeasureOut)})))),this.setState((e=>({recessField:s(e.dprofileID-e.dartHeight-e.dbuildup)})))}magic(){const e=this.state.dstrainerWidth/2+this.state.dfloat+this.state.dstemWidth;this.setState((()=>({measureOut:s(e),dmeasureOut:e}))),this.setState((e=>({dmeasureIn:e.dbase-e.dmeasureOut}))),this.setState((e=>({measureIn:s(e.dmeasureIn)})))}render(){const t=100*this.state.dstemWidth,a=100*this.state.dprofileOD,s=100*this.state.dbase,r=100*this.state.dbaseHeight,i=100*this.state.dartHeight,h=100*this.state.dstrainerWidth,m=100*this.state.dbuildup,o=m+r,d=100*this.state.dmeasureOut,c=100*this.state.dfloat,u=r,p=c+t;return e.createElement("div",{className:"diagram"},e.createElement("svg",{version:"1.1",id:"frame-diagram",x:"0px",y:"0px",viewBox:"0 50 800 700"},e.createElement(n,{stemW:t,stemH:a,baseW:s,baseH:r,artH:i,artW:h,buH:m,buM:o,hole:d,float:c,floatPos:p,basePos:u}),e.createElement("foreignObject",{x:"0",y:"0",width:"100%",height:"100%"},e.createElement(l,{base:this.state.base,measureIn:this.state.measureIn,measureOut:this.state.measureOut,profileOD:this.state.profileOD,profileID:this.state.profileID,baseHeight:this.state.baseHeight,float:this.state.float,strainerWidth:this.state.strainerWidth,artHeight:this.state.artHeight,stemWidth:this.state.stemWidth,buildup:this.state.buildup,recessField:this.state.recessField,onFormChange:this.handleChange,magicButton:this.magic,onInputBlur:this.handleBlur}))))}}class h extends e.Component{render(){return e.createElement("div",null,e.createElement(r,null),e.createElement("div",{id:"diagram"},e.createElement(i,null)))}}function m(){return e.createElement(h,null)}function o(){return e.createElement(e.Fragment,null,e.createElement(m,null))}t.render(e.createElement(e.StrictMode,null,e.createElement(o,null)),document.getElementById("root"));
