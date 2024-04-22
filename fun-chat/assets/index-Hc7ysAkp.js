var h=Object.defineProperty;var m=(d,e,t)=>e in d?h(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var a=(d,e,t)=>(m(d,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class p{constructor(){a(this,"url");a(this,"server");a(this,"activeUsers",[]);a(this,"serverHandler",null);this.url="ws://localhost:4000",this.server=new WebSocket(this.url),this.server.onmessage=this.msgHandler,this.initServer()}initServer(){this.serverHandler=setInterval(()=>{const e={id:"string",type:"USER_ACTIVE",payload:null},t={id:"string",type:"USER_INACTIVE",payload:null};this.server&&this.server.send(JSON.stringify(e)),this.server&&this.server.send(JSON.stringify(t))},100)}msgHandler(e){const t=JSON.parse(e.data);switch(t.type){case"USER_ACTIVE":this.activeUsers=t.payload.users,sessionStorage.setItem("onlineUsers",JSON.stringify(this.activeUsers));break;case"USER_INACTIVE":this.activeUsers=t.payload.users,sessionStorage.setItem("offlineUsers",JSON.stringify(this.activeUsers));break;case"USER_LOGIN":this.activeUsers=t.payload.users,sessionStorage.setItem("userData",JSON.stringify(this.activeUsers));break;case"USER_LOGOUT":this.activeUsers=t.payload.users,sessionStorage.removeItem("userData");break}}authenticateUser(e,t){const i={id:"1",type:"USER_LOGIN",payload:{user:{login:e,password:t}}};this.server&&this.server.send(JSON.stringify(i))}logOut(e,t){const i={id:"1",type:"USER_LOGOUT",payload:{user:{login:e,password:t}}};this.server&&this.server.send(JSON.stringify(i))}}class f{constructor(e){a(this,"onValidate");a(this,"container");a(this,"nameValidated");a(this,"passValidated");a(this,"req");a(this,"id");this.container=null,this.nameValidated=!1,this.passValidated=!1,this.req=null,this.id=0,this.onValidate=e,this.init()}init(){this.req=new p,this.createHtml()}createHtml(){this.container=document.createElement("section"),this.container.classList.add("log-container");const e=document.createElement("input");e.id="input-name",e.addEventListener("input",o=>{const r=o.target;this.validateForms(e.value,2)?(r.classList.remove("wrong-input"),this.nameValidated=!0):(r.classList.add("wrong-input"),this.nameValidated=!1)});const t=document.createElement("h6");t.innerHTML="Name should be not less that 2 letters and contains capital letter";const i=document.createElement("input");i.id="input-password",i.addEventListener("input",o=>{const r=o.target;this.validateForms(i.value,8)?(r.classList.remove("wrong-input"),this.passValidated=!0):(r.classList.add("wrong-input"),this.passValidated=!1)}),i.type="password";const s=document.createElement("h6");s.innerHTML="Password should be not less that 8 letters and contains capital letters";const n=document.createElement("button");n.addEventListener("click",()=>this.validateAllForms()),n.innerHTML="Confirm",this.container.append(e,t,i,s,n)}validateForms(e,t){return new RegExp(`^[A-Z][a-zA-Z-]{${t-1},}$`).test(e)}validateAllForms(){var e;if(this.nameValidated&&this.passValidated){const i=document.getElementById("input-name").value,n=document.getElementById("input-password").value;(e=this.req)==null||e.authenticateUser(i,n),this.saveData(i,n),this.onValidate()}}saveData(e,t){sessionStorage.setItem("userData",JSON.stringify({login:e,password:t}))}getHtml(){return this.container}}class g{constructor(e){a(this,"onLogout");a(this,"container");a(this,"name");a(this,"offlineUsers");a(this,"onlineUsers");this.container=null,this.onLogout=e,this.name="",this.offlineUsers=[],this.onlineUsers=[],this.init()}init(){this.getName(),this.getUsers(),this.createHtml()}getName(){this.name=JSON.parse(sessionStorage.getItem("userData")).login}getUsers(){this.offlineUsers=JSON.parse(sessionStorage.getItem("offlineUsers")),this.onlineUsers=JSON.parse(sessionStorage.getItem("onlineUsers"))}createHtml(){this.container=document.createElement("section"),this.container.classList.add("chat-container"),this.createHeader(),this.createMainContainer(),this.createFooter()}createHeader(){var n;const e=document.createElement("div");e.classList.add("chat-info-container");const t=document.createElement("h4");t.innerHTML=`User: ${this.name}`;const i=document.createElement("h4");i.innerHTML="Fun Chat";const s=document.createElement("button");s.innerHTML="Logout",s.addEventListener("click",()=>{this.onLogout()}),e.append(t,i,s),(n=this.container)==null||n.append(e)}createMainContainer(){var u;const e=document.createElement("div");e.classList.add("main-chat-container");const t=document.createElement("div");t.classList.add("users-container");const i=document.createElement("input");i.classList.add("search-user");const s=document.createElement("div");s.classList.add("users"),this.createUser(s);const n=document.createElement("div");n.classList.add("messages");const o=document.createElement("div");o.classList.add("message-container");const r=document.createElement("div");r.classList.add("text-con");const l=document.createElement("input");l.classList.add("msg-text"),l.placeholder="Write text...";const c=document.createElement("button");c.classList.add("send-btn"),c.innerHTML=">",c.addEventListener("click",()=>{}),t.append(i,s),r.append(l,c),n.append(o,r),e.append(t,n),(u=this.container)==null||u.append(e)}createUser(e){this.getUsers();const t=document.createElement("div");t.classList.add("user");const i=document.createElement("div");i.classList.add("user-status");const s=document.createElement("h5");s.classList.add("username"),s.innerHTML=`${this.name}`,t.append(i,s),e.append(t);for(let n in this.onlineUsers){const o=this.onlineUsers[n],r=document.createElement("div");r.classList.add("user");const l=document.createElement("div");l.classList.add("user-status");const c=document.createElement("h5");c.classList.add("username"),c.innerHTML=`${o.login}`,r.append(l,c),e.append(r)}for(let n in this.offlineUsers){const o=this.onlineUsers[n],r=document.createElement("div");r.classList.add("user");const l=document.createElement("div");l.classList.add("user-status"),o.isLogged||l.classList.add("offline-user");const c=document.createElement("h5");c.classList.add("username"),c.innerHTML=`${o.login}`,r.append(l,c),e.append(r)}}createFooter(){var r;const e=document.createElement("div");e.classList.add("chat-info-container");const t=document.createElement("img");t.classList.add("school-logo"),t.src="../assets/img/logo.png";const i=document.createElement("h4");i.innerHTML="RSSCHOOL";const s=document.createElement("h4");s.innerHTML="Ted Arsenev";const n=document.createElement("a");n.classList.add("link-to-gh"),n.innerHTML="GitHub",n.href="https://github.com/farsenyev";const o=document.createElement("h4");o.innerHTML="2024",e.append(t,i,s,n,o),(r=this.container)==null||r.append(e)}getHtml(){return this.container}}class L{constructor(e){a(this,"mainContainer");a(this,"parent");a(this,"log");a(this,"chat");a(this,"infoContainer");this.parent=e,this.mainContainer=null,this.log=null,this.chat=null,this.infoContainer=null,this.init()}init(){this.createHtml(),this.loadLog()}createHtml(){this.mainContainer=document.createElement("section"),this.mainContainer.classList.add("main-container"),this.infoContainer=document.createElement("div"),this.infoContainer.classList.add("info-container"),this.infoContainer.classList.add("hide-info"),this.fillInfo();const e=document.createElement("button");e.classList.add("about-btn"),e.innerHTML="About",e.addEventListener("click",()=>this.showInfo()),this.parent.append(this.infoContainer,e,this.mainContainer)}fillInfo(){var n;const e=document.createElement("h3");e.innerHTML="Author: Ted Arsenev";const t=document.createElement("h4");t.innerHTML="RSSCHOOL 2023 Q4";const i=document.createElement("h4");i.innerHTML="This is fun chat. App for communication. The prototype of social network";const s=document.createElement("h6");s.innerHTML="Close this window by click About button",(n=this.infoContainer)==null||n.append(e,t,i,s)}showInfo(){var e,t,i,s;(e=this.infoContainer)!=null&&e.classList.contains("hide-info")?(t=this.infoContainer)==null||t.classList.remove("hide-info"):(i=this.infoContainer)!=null&&i.classList.contains("hide-info")||(s=this.infoContainer)==null||s.classList.add("hide-info")}loadLog(){var e;this.clearMainContainer(),this.log=new f(this.loadMain.bind(this)),(e=this.mainContainer)==null||e.append(this.log.getHtml())}loadMain(){var e;this.clearMainContainer(),this.chat=new g(this.loadLog.bind(this)),(e=this.mainContainer)==null||e.append(this.chat.getHtml())}clearMainContainer(){this.mainContainer&&(this.mainContainer.innerHTML="")}}const v=document.body;new L(v);
