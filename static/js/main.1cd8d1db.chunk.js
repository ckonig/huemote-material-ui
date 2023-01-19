(this["webpackJsonpreact-hue"]=this["webpackJsonpreact-hue"]||[]).push([[0],{137:function(e,t,n){},159:function(e,t,n){"use strict";n.r(t);var a=n(106),r=n(228),c=n(229),o=n(12),s=n(0),i=n.n(s),l=i.a.createContext({state:{baseUrl:!1,username:!1,appname:!1},initialize:function(){},disconnect:function(){}}),u=function(){return i.a.useContext(l)},d=n(86),j=n(31),b=n(3),h=n(40),f=n(234),p=n(230),m=n(206),O=n(211),x=n(238),g=n(210),v=n(235),y=n(209),w=n(208),k=n(207),C=n(204);var S=function(){var e=46656*Math.random()|0,t=46656*Math.random()|0;return(e=("000"+e.toString(36)).slice(-3))+""+(t=("000"+t.toString(36)).slice(-3))},B=0,U=1,N=2,M=3,D=n(2),F=["onClose","open"];function I(e){var t=e.onClose,n=e.open,a=Object(b.a)(e,F),r=i.a.useState(S()),c=Object(o.a)(r,2),s=c[0],l=c[1];i.a.useEffect((function(){n||l(S)}),[n]),i.a.useEffect((function(){e.step!==N||H||x.baseUrl||fetch("https://discovery.meethue.com/").then((function(e){return e.json()})).then((function(e){e&&e.length>0&&Q(e[0].internalipaddress)}))}),[e.step]);var d=u(),O=d.initialize,x=d.state,I=i.a.useState(!1),L=Object(o.a)(I,2),z=L[0],q=L[1],E=i.a.useState(""),T=Object(o.a)(E,2),H=T[0],Q=T[1],P=i.a.useCallback((function(){return(t=e.step)===B?"Setup":t===U?"Data Storage":t===N?"Hue Bridge":t===M?"Finish":null;var t}),[e]),A=i.a.useCallback((function(){e.step===M&&z&&H&&fetch("http://".concat(H,"/api"),{method:"post",body:JSON.stringify({devicetype:"hue-react#"+s})}).then((function(e){return e.json()})).then((function(e){1===e.length&&e[0].error&&101===e[0].error.type?console.log("ALERT: press connect button! @todo"):e.length>0&&e[0].success&&e[0].success.username?(O(H,e[0].success.username,"hue-react#"+s),t()):console.error("unknown case @todo",e)})),e.step===B&&e.next(),e.step===U&&e.next(),e.step===N&&e.next()}),[e,s,O,z,H,t]);if(x.baseUrl)return null;var G=function(){return e.step===B?Object(D.jsx)(h.a,{children:"Press Continue to start the Connection Wizard."}):e.step===U?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(h.a,{children:"Your data belongs to you. We need your consent to store it on this device."}),Object(D.jsx)(C.a,{control:Object(D.jsx)(f.a,{required:!0,checked:z,onChange:function(e,t){return q(t)},name:"consent"}),label:"Allow Data Storage"})]}):e.step===N?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(p.a,{label:"",value:H,variant:"outlined",onChange:function(e){return Q(e.target.value)}}),Object(D.jsx)(m.a,{children:"Enter the IP address of the Hue Bridge on your local network. Make sure your device is connected to the same network."})]}):e.step===M?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(h.a,{children:'Now press the "Connect" hardware button on your Hue Bridge, then press "Finish" below.'}),Object(D.jsxs)(h.a,{children:["This will request permissions for this app (",Object(D.jsxs)("i",{children:[" react-app-",s," "]}),") in your Hue Bridge."]})]}):null};return Object(D.jsxs)(v.a,Object(j.a)(Object(j.a)({disableEscapeKeyDown:!0,maxWidth:"xs","aria-labelledby":"confirmation-dialog-title",open:n},a),{},{children:[Object(D.jsx)(k.a,{id:"confirmation-dialog-title",children:P()}),Object(D.jsx)(w.a,{dividers:!0,children:Object(D.jsx)(G,{})}),Object(D.jsx)(y.a,{children:Object(D.jsx)(g.a,{disabled:!z&&e.step===U,onClick:A,color:"primary",children:e.step===M?"Finish":"Continue"})})]}))}var L=Object(O.a)((function(e){return Object(x.a)({root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper},paper:{width:"80%",maxHeight:435}})}));function z(){var e=L(),t=i.a.useState(!0),n=Object(o.a)(t,2),a=n[0],r=n[1],c=u().state.baseUrl;i.a.useEffect((function(){c||a||(j(B),r(!0))}),[c,a]);var s=i.a.useState(B),l=Object(o.a)(s,2),d=l[0],j=l[1];return Object(D.jsx)(I,{classes:{paper:e.paper},id:"ringtone-menu",keepMounted:!0,step:d,next:function(){return j(d+1)},open:a,onClose:function(e){r(!1)}})}var q=n(225),E=n(215),T=n(19),H=n(212),Q=n(214),P=n(213),A=n(17),G=n(25),J=n(22),W=function(){var e=u().state.baseUrl,t=Object(s.useMemo)((function(){return{}}),[]),n=Object(J.useQuery)("".concat(e,"/config"),{queryFn:function(){var t=Object(G.a)(Object(A.a)().mark((function t(){var n;return Object(A.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e,"/config"));case 2:if((n=t.sent).ok){t.next=5;break}throw new Error("Network response was not ok");case 5:return t.abrupt("return",n.json());case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),initialData:t});return Object(s.useMemo)((function(){return{config:n.data||t}}),[t,n])},Z=Object(O.a)({root:{minWidth:275},title:{fontSize:14},pos:{marginBottom:12},label:{float:"left",width:150}}),K=function(){var e=u(),t=e.state.appname,n=e.disconnect,a=W().config,r=Z();return Object(D.jsx)(D.Fragment,{children:Object(D.jsxs)(H.a,{className:r.root,variant:"outlined",children:[Object(D.jsxs)(P.a,{children:[Object(D.jsx)(h.a,{className:r.title,color:"textSecondary",gutterBottom:!0,children:"Connected with Hue Bridge"}),Object(D.jsx)(h.a,{variant:"h5",component:"h2",children:a.name}),Object(D.jsxs)(h.a,{className:r.pos,color:"textSecondary",children:["Model: ",a.modelid]}),Object(D.jsxs)(h.a,{variant:"body2",component:"div",children:[Object(D.jsx)("span",{className:r.label,children:"Mac Address"}),a.mac,Object(D.jsx)("br",{}),Object(D.jsx)("span",{className:r.label,children:"IP Address"}),a.ipaddress,Object(D.jsx)("br",{}),Object(D.jsx)("span",{className:r.label,children:"Zigbee Channel"}),a.zigbeechannel,Object(D.jsx)("br",{}),Object(D.jsx)("span",{className:r.label,children:"App Name"}),t||"",Object(D.jsx)("br",{})]})]}),Object(D.jsx)(Q.a,{style:{alignItems:"right"},children:Object(D.jsx)(g.a,{style:{float:"right"},size:"small",endIcon:Object(D.jsx)(E.a,{className:"fa fa-trash"}),variant:"contained",color:"secondary",onClick:function(){window.confirm("disconnect from bridge and delete data?")&&n()},children:"Disconnect"})})]})})},$=n(108),R=function(){var e=u().state.baseUrl,t=Object(J.useQueryClient)(),n=Object(s.useMemo)((function(){return{}}),[]),a=Object(J.useQuery)("".concat(e,"/lights"),{cacheTime:10,queryFn:function(){var t=Object(G.a)(Object(A.a)().mark((function t(){var n;return Object(A.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e,"/lights"));case 2:if((n=t.sent).ok){t.next=5;break}throw new Error("Network response was not ok");case 5:return t.abrupt("return",n.json());case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),initialData:n}),r=Object(s.useCallback)((function(){return t.refetchQueries({queryKey:"".concat(e,"/lights")})}),[e,t]),c=Object(s.useCallback)((function(e,t){return fetch(e,{method:"put",body:JSON.stringify(t)})}),[]),o=Object(s.useCallback)(function(){var t=Object(G.a)(Object(A.a)().mark((function t(n,a){return Object(A.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c("".concat(e,"/lights/").concat(n,"/state"),{bri:a});case 2:r();case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),[e,r,c]),i=Object(s.useCallback)(function(){var t=Object(G.a)(Object(A.a)().mark((function t(n){return Object(A.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c("".concat(e,"/lights/").concat(n.id,"/state"),{on:!n.state.on});case 2:r();case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[e,r,c]),l=Object(s.useCallback)(Object(G.a)(Object(A.a)().mark((function t(){return Object(A.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c("".concat(e,"/groups/0/action"),{on:!1});case 2:r();case 3:case"end":return t.stop()}}),t)}))),[e,r,c]);return Object(s.useMemo)((function(){return{lights:a.data||n,setBrightness:o,toggle:i,shutDown:l}}),[a,n,o,i,l])},Y=function(){var e=R().shutDown;return Object(D.jsx)("div",{style:{width:"100%",textAlign:"center"},children:Object(D.jsx)($.a,{color:"secondary",style:{outline:"none",border:"none",width:50,height:50,fontSize:"2em"},onClick:function(){return e()},children:Object(D.jsx)(E.a,{className:"fa fa-power-off"})})})},_=n(220),V=n(205),X=n(221),ee=n(231),te=n(222),ne=n(223),ae=n(236),re=n(5),ce=Object(re.a)({root:{border:"1px solid rgba(0, 0, 0, .125)",boxShadow:"none","&:not(:last-child)":{borderBottom:0},"&:before":{display:"none"},"&$expanded":{margin:"auto"}},expanded:{}})(ae.a),oe=n(217),se=n(218),ie=n(216),le=Object(re.a)({root:{backgroundColor:"rgba(0, 0, 0, .03)",borderBottom:"1px solid rgba(0, 0, 0, .125)",marginBottom:-1,minHeight:56,"&$expanded":{minHeight:56}},content:{"&$expanded":{margin:"12px 0"}},expanded:{}})(ie.a),ue=function(e){switch(e){case"Living room":return"fa-tv";case"Bathroom":return"fa-toilet-paper";case"Bedroom":return"fa-bed";case"Balcony":return"fa-tree";case"Garden":return"fa-seedling";case"Kitchen":return"fa-coffee";case"Front door":return"fa-shoe-prints";case"Reading":return"fa-laptop-house"}console.error("no icon for class:"+e)},de=function(){var e=Object(J.useQueryClient)(),t=u().state.baseUrl,n=Object(s.useMemo)((function(){return{}}),[]),a=Object(J.useQuery)("".concat(t,"/groups"),{cacheTime:10,queryFn:function(){var e=Object(G.a)(Object(A.a)().mark((function e(){var n;return Object(A.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t,"/groups"));case 2:if((n=e.sent).ok){e.next=5;break}throw new Error("Network response was not ok");case 5:return e.abrupt("return",n.json());case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),initialData:n}),r=Object(s.useCallback)((function(){return e.refetchQueries({queryKey:"".concat(t,"/groups")})}),[t,e]),c=Object(s.useCallback)(function(){var e=Object(G.a)(Object(A.a)().mark((function e(n){var a;return Object(A.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={on:!n.state.any_on},e.next=3,fetch("".concat(t,"/groups/").concat(n.id,"/action"),{method:"put",body:JSON.stringify(a)});case 3:r();case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t,r]);return Object(s.useMemo)((function(){return{groups:a.data||n,toggle:c}}),[n,a,c])},je=function(e){var t=e.room,n=de().toggle;return Object(D.jsx)(le,{"aria-controls":"panel1d-content",id:"panel1d-header",children:Object(D.jsxs)(oe.a,{style:{width:"100%"},container:!0,children:[Object(D.jsxs)(ee.a,{display:"flex",flexGrow:1,style:{margin:"auto"},children:[Object(D.jsx)(E.a,{className:"fa ".concat(ue(t.class)),style:{width:45}}),Object(D.jsx)(h.a,{children:t.name})]}),Object(D.jsx)(ee.a,{children:Object(D.jsx)(se.a,{checked:t.state.any_on,onClick:function(e){return e.stopPropagation()},onChange:function(e){e.stopPropagation(),n(t)},color:"primary",inputProps:{"aria-label":"primary checkbox"}})})]})})},be=n(219),he=function(e){var t,n=e.productname;return Object(D.jsx)(be.a,{style:{fontSize:"1.5em",margin:"auto"},className:(t=n,"On/Off plug"===t?"fa fa-plug":"Hue lightstrip plus"===t?"fa fa-tape":"Hue color candle"===t?"fa fa-fire":"Hue color lamp"===t||"Hue color spot"===t?"fas fa-lightbulb":"far fa-lightbulb")})},fe=function(){var e=Object(J.useQueryClient)(),t=u().state.baseUrl,n=Object(s.useMemo)((function(){return{}}),[]),a=Object(J.useQuery)("".concat(t,"/scenes"),{queryFn:function(){var e=Object(G.a)(Object(A.a)().mark((function e(){var n;return Object(A.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t,"/scenes"));case 2:if((n=e.sent).ok){e.next=5;break}throw new Error("Network response was not ok");case 5:return e.abrupt("return",n.json());case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),initialData:n}),r=Object(s.useCallback)(function(){var n=Object(G.a)(Object(A.a)().mark((function n(a){var r;return Object(A.a)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={scene:a.id},n.next=3,fetch("".concat(t,"/groups/").concat(a.group,"/action"),{method:"put",body:JSON.stringify(r)});case 3:e.refetchQueries();case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),[t,e]);return Object(s.useMemo)((function(){return{scenes:a.data||n,activate:r}}),[n,a,r])},pe=function(){var e=de().groups,t=R().lights,n=fe().scenes;return Object(s.useMemo)((function(){return Object.keys(e).map((function(e){return parseInt(e)})).map((function(a){return Object(j.a)(Object(j.a)({},e[a]),{},{id:a,lights:e[a].lights.map((function(e){return Object(j.a)(Object(j.a)({},t[parseInt(e)]),{},{id:parseInt(e)})})),scenes:Object.keys(n).filter((function(e){return!n[e].recycle&&"GroupScene"===n[e].type&&parseInt(n[e].group)===a})).map((function(e){return Object(j.a)(Object(j.a)({},n[e]),{},{id:e})}))})}))}),[e,t,n])},me=n(239),Oe=function(e){var t=e.light,n=R().setBrightness;return t.state.bri?Object(D.jsx)(me.a,{disabled:!t.state.on,min:1,max:254,value:t.state.bri,onChangeCommitted:function(e,a){return n(t.id,a)},"aria-labelledby":"continuous-slider"}):null},xe=function(e){var t=e.light,n=R().toggle;return Object(D.jsx)(se.a,{size:"small",checked:!!t.state.on,onChange:function(){return n(t)}})},ge=function(){var e=i.a.useState(!1),t=Object(o.a)(e,2),n=t[0],a=t[1],r=pe();return Object(D.jsx)(D.Fragment,{children:r.map((function(e){return Object(D.jsxs)(ce,{square:!0,expanded:n===e.id,onChange:function(t,n){return a(!!n&&e.id)},children:[Object(D.jsx)(je,{room:e}),Object(D.jsx)(_.a,{children:Object(D.jsx)(V.a,{"aria-label":"secondary",color:"default",style:{width:"100%",fontSize:"1.25em"},children:e.lights.map((function(e){return Object(D.jsxs)(i.a.Fragment,{children:[Object(D.jsxs)(X.a,{style:{flexDirection:"column",margin:0,padding:0},children:[Object(D.jsxs)(ee.a,{width:"100%",display:"flex",flexDirection:"row",children:[Object(D.jsxs)(ee.a,{display:"flex",flexGrow:1,children:[Object(D.jsx)(he,{productname:e.productname}),Object(D.jsx)(te.a,{primary:e.name,secondary:e.productname})]}),Object(D.jsx)(ee.a,{children:Object(D.jsx)(xe,{light:e})})]}),Object(D.jsx)(Oe,{light:e})]}),!e.state.bri&&Object(D.jsx)(ne.a,{style:{marginBottom:13,marginTop:14}},e.id+"d")]},e.id)}))})})]},e.id)}))})},ve=function(){var e=i.a.useState(!1),t=Object(o.a)(e,2),n=t[0],a=t[1],r=fe().activate,c=pe();return Object(D.jsx)(D.Fragment,{children:c.map((function(e){return Object(D.jsxs)(ce,{square:!0,expanded:n===e.id,onChange:function(t,n){return a(!!n&&e.id)},children:[Object(D.jsx)(je,{room:e}),Object(D.jsx)(_.a,{children:Object(D.jsx)(V.a,{"aria-label":"secondary",color:"default",style:{width:"100%",fontSize:"1.25em"},children:e.scenes.map((function(e){return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(X.a,{style:{flexDirection:"column",margin:0,padding:0},children:Object(D.jsxs)(ee.a,{width:"100%",display:"flex",flexDirection:"row",children:[Object(D.jsx)(ee.a,{display:"flex",flexGrow:1,children:Object(D.jsx)(te.a,{primary:e.name})}),Object(D.jsx)(ee.a,{children:Object(D.jsx)(g.a,{size:"small",variant:"outlined",onClick:function(){return r(e)},children:"Activate"})})]})},e.id),Object(D.jsx)(ne.a,{style:{marginBottom:13,marginTop:14}})]})}))})})]},e.name)}))})},ye=n(109),we=n(240),ke=n(224),Ce=(n(137),function(e){return Object(D.jsx)("div",{style:{margin:"auto"},children:Object(D.jsx)("div",{className:"battery",children:Object(D.jsx)("div",{className:"battery-level",style:{height:e.level+"%"}})})})}),Se=function(e){switch(e){case"Living":case"Living room":return"fa-tv";case"Bathroom":case"Bath":return"fa-toilet-paper";case"Bed":case"Bedroom":return"fa-bed";case"Balcony":return"fa-tree";case"Plants":case"Greenhouse":return"fa-seedling";case"Kitchen":return"fa-coffee";case"Entrance":case"entrance":return"fa-shoe-prints";case"Office":case"Bib":return"fa-laptop-house"}console.error("no icon for room:"+e)},Be={width:"auto",height:"auto",margin:"auto",fontSize:"0.8em",paddingLeft:"10px"},Ue=function(e){return Object(D.jsx)(we.a,{style:{backgroundColor:"rgba(144,202,253,".concat(e.opacity,")")},variant:"outlined",size:"small",icon:Object(D.jsx)(E.a,{style:Be,className:"fa fa-".concat(e.icon)}),label:e.label})},Ne=function(e){return Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds())},Me=function(e){var t,n,a,r,c,o,s,l,u,d,j,b,h,f,p,m,O,x,g,v,y,w,k,C,S,B,U=i.a.useCallback((function(){var t,n,a;if(!e.model.model)return null;var r=new Date(null===(t=e.model)||void 0===t||null===(n=t.model)||void 0===n||null===(a=n.state)||void 0===a?void 0:a.lastupdated),c=Ne(new Date(Date.now()))-Ne(r),o=Math.floor(c/1e3/60)-60;if(o>=60){var s=Math.floor(o/60);return s>24?Math.floor(s/24)+" days ago":s+" hours ago"}return 0===o?"now":1===o?"1 minute ago":o+" minutes ago"}),[e]);return Object(D.jsxs)(H.a,{variant:"outlined",children:[Object(D.jsx)(ke.a,{avatar:Object(D.jsx)(E.a,{style:{margin:"auto",width:"auto"},className:"fa "+Se(null===(t=e.model)||void 0===t||null===(n=t.model)||void 0===n?void 0:n.name.split(" ")[0])}),title:e.model.model.name,action:null!==(a=e.model)&&void 0!==a&&null!==(r=a.model)&&void 0!==r&&null!==(c=r.config)&&void 0!==c&&c.battery?Object(D.jsx)(Ce,{level:e.model.model.config.battery}):null,subheader:U()}),Object(D.jsx)(Q.a,{children:Object(D.jsxs)(ee.a,{width:"100%",display:"flex",justifyContent:"space-between",alignContent:"center",children:[(null===(o=e.model.light)||void 0===o||null===(s=o.state)||void 0===s?void 0:s.lightlevel)&&Object(D.jsx)(ee.a,{children:Object(D.jsx)(Ue,{icon:null!==(l=e.model.light)&&void 0!==l&&l.state.dark?"moon":"sun",label:null===(u=e.model.light)||void 0===u||null===(d=u.state)||void 0===d?void 0:d.lightlevel,opacity:(null===(j=e.model.light)||void 0===j||null===(b=j.state)||void 0===b?void 0:b.lightlevel)/33e3})}),(null===(h=e.model.temperature)||void 0===h||null===(f=h.state)||void 0===f?void 0:f.temperature)&&Object(D.jsx)(ee.a,{children:Object(D.jsx)(Ue,{icon:"thermometer",label:"".concat((e.model.temperature.state.temperature/100).toFixed(2),"\xb0C")})}),(null===(p=e.model.presence)||void 0===p?void 0:p.state)&&Object(D.jsxs)(ee.a,{children:[(null===(m=e.model.presence)||void 0===m||null===(O=m.state)||void 0===O?void 0:O.presence)&&Object(D.jsx)(Ue,{icon:"eye",label:"Presence"}),!(null!==(x=e.model.presence)&&void 0!==x&&null!==(g=x.state)&&void 0!==g&&g.presence)&&Object(D.jsx)(Ue,{icon:"eye-slash",label:"No presence"})]}),(null===(v=e.model.switch)||void 0===v||null===(y=v.state)||void 0===y?void 0:y.buttonevent)&&Object(D.jsx)(ee.a,{children:(null===(w=e.model.switch)||void 0===w||null===(k=w.state)||void 0===k?void 0:k.buttonevent)&&Object(D.jsx)(Ue,{icon:"hand-point-down",label:"last button pressed: "+(B=null===(C=e.model.switch)||void 0===C||null===(S=C.state)||void 0===S?void 0:S.buttonevent,1002===B?"on":2002===B?"dim +":3002===B?"dim -":4002===B?"off":"")})})]})})]})},De="ZLLLightLevel",Fe="ZLLTemperature",Ie="ZLLPresence",Le="ZGPSwitch",ze="ZLLSwitch",qe=function(e){var t={};return Object.keys(e).map((function(t){return e[parseInt(t)]})).forEach((function(e){if(e&&e.uniqueid){var n=e.uniqueid.substring(0,26);e.type!==ze&&e.type!==Le||(t[n]||(t[n]={}),t[n].model=e,t[n].switch=e)}})),t},Ee=function(e){var t={};return Object.keys(e).map((function(t){return e[parseInt(t)]})).forEach((function(e){if(e&&e.uniqueid){var n=e.uniqueid.substring(0,26),a=function(){t[n]||(t[n]={})};e.type===Fe&&(a(),t[n].temperature=e),e.type===De&&(a(),t[n].light=e),e.type===Ie&&(a(),t[n].model=e,t[n].name=e.name,t[n].presence=e)}})),t},Te=function(){var e=u().state.baseUrl,t=Object(s.useMemo)((function(){return{}}),[]),n=Object(J.useQuery)("".concat(e,"/sensors"),{queryFn:function(){var t=Object(G.a)(Object(A.a)().mark((function t(){var n;return Object(A.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(e,"/sensors"));case 2:if((n=t.sent).ok){t.next=5;break}throw new Error("Network response was not ok");case 5:return t.abrupt("return",n.json());case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),initialData:t});return Object(s.useMemo)((function(){return{sensors:Ee(n.data||t),switches:qe(n.data||t)}}),[t,n])},He=function(){var e=Te().sensors;return Object(D.jsx)(ye.a,{placeholder:"loading",children:Object.keys(e).map((function(t){return e[t]})).map((function(e,t){return Object(D.jsx)(Me,{model:e},t)}))})},Qe=n(105),Pe=n.n(Qe),Ae=function(){var e=Te().switches;return Object(D.jsx)(ye.a,{placeholder:"loading",children:Object.keys(e).map((function(t){return e[t]})).map((function(e,t){return Object(D.jsx)(Me,{model:e},t)}))})},Ge=n(226),Je=["children","index"];var We=function(e){var t=e.children,n=e.index,a=Object(b.a)(e,Je);return Object(D.jsx)("div",Object(j.a)(Object(j.a)({style:{height:"100%"},role:"tabpanel",id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},a),{},{children:Object(D.jsx)(ee.a,{children:t})}))},Ze=n(232),Ke=[{icon:"fa-photo-video",label:"Scenes",route:"/Scenes"},{icon:"fa-lightbulb",label:"Lights",route:"/Lights"},{icon:"fa-random",label:"Switches",route:"/Switches"},{icon:"fa-thermometer-half",label:"Sensors",route:"/Sensors"},{icon:"fa-plug",label:"Bridge",route:"/Bridge"}],$e=Object(O.a)((function(e){return{wrapper:{flexDirection:"row"}}}));var Re=Object(T.d)((function(e){var t=i.a.useCallback((function(){var t=Ke.findIndex((function(t){return t.route===e.location.pathname}));return t>0?t:0}),[e]),n=$e();return Object(D.jsxs)("div",{style:{width:"100vw",maxWidth:400,margin:"auto",height:"100vh"},children:[Object(D.jsxs)(q.a,{position:"static",color:"default",children:[Object(D.jsx)(Y,{}),Object(D.jsx)(Ze.a,{onChange:function(t,n){e.history.push(Ke[n].route)},scrollButtons:"auto",variant:"scrollable",className:n.wrapper,value:t(),children:Ke.map((function(e,t){return Object(D.jsx)(Ge.a,{style:{fontSize:"0.9em",width:85},icon:Object(D.jsx)(E.a,{className:"fa "+e.icon}),label:e.label},t)}))})]}),Object(D.jsxs)(Pe.a,{style:{height:"100%"},containerStyle:{height:"100%"},index:t(),onChangeIndex:function(t){e.history.push(Ke[t].route)},disableLazyLoading:!0,animateTransitions:!1,children:[Object(D.jsx)(We,{index:0,children:Object(D.jsx)(ve,{})}),Object(D.jsx)(We,{index:1,children:Object(D.jsx)(ge,{})}),Object(D.jsx)(We,{index:2,children:Object(D.jsx)(Ae,{})}),Object(D.jsx)(We,{index:3,children:Object(D.jsx)(He,{})}),Object(D.jsx)(We,{index:4,children:Object(D.jsx)(K,{})})]})]})})),Ye=n(227);var _e=function(){var e=function(){var e=i.a.useState(localStorage.getItem("baseUrl")||!1),t=Object(o.a)(e,2),n=t[0],a=t[1],r=i.a.useState(localStorage.getItem("username")||!1),c=Object(o.a)(r,2),s=c[0],l=c[1],u=i.a.useState(localStorage.getItem("appname")||!1),d=Object(o.a)(u,2);return{baseUrl:n,setBaseUrl:a,username:s,setUsername:l,appname:d[0],setAppname:d[1]}}(),t={state:e,initialize:function(t,n,a){return function(e,t,n,a){var r=function(e,t){return"http://".concat(e,"/api/").concat(t)}(t,n);e.setBaseUrl&&e.setBaseUrl(r),e.setUsername&&e.setUsername(n),e.setAppname&&e.setAppname(a),localStorage.setItem("baseUrl",r),localStorage.setItem("username",n),localStorage.setItem("appname",a)}(e,t,n,a)},disconnect:function(){return t=e,localStorage.clear(),t.setBaseUrl&&t.setBaseUrl(""),void(t.setUsername&&t.setUsername(""));var t}},n=Object(Ye.a)("(prefers-color-scheme: dark)"),s=i.a.useMemo((function(){return Object(a.a)({palette:{type:n?"dark":"light"}})}),[n]),u=new J.QueryClient;return Object(D.jsx)(J.QueryClientProvider,{client:u,children:Object(D.jsxs)(r.a,{theme:s,children:[Object(D.jsx)(c.a,{}),Object(D.jsx)(l.Provider,{value:t,children:Object(D.jsxs)(d.a,{children:[t.state.baseUrl&&Object(D.jsx)(Re,{}),Object(D.jsx)(z,{})]})})]})})},Ve=n(15);n.n(Ve).a.render(Object(D.jsx)(i.a.StrictMode,{children:Object(D.jsx)(_e,{})}),document.getElementById("root"))}},[[159,1,2]]]);
//# sourceMappingURL=main.1cd8d1db.chunk.js.map