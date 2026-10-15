var d=[["Data Structures",92],["Database Systems",84],["Operating Systems",78],["Communication Skills",90]];
var s=document.getElementById("sub");
d.forEach(function(x){var e=document.createElement("div");e.className="card";
e.innerHTML='<div class="row">'+x[0]+'<i>'+x[1]+'%</i></div><div class="bar"><div data-w="'+x[1]+'"></div></div>';s.appendChild(e)});
setTimeout(function(){document.querySelectorAll(".bar div").forEach(function(b){b.style.width=b.dataset.w+"%"})},200);
var cal=document.getElementById("cal"),absent=[6,9],hol=[2],today=15;
function load(k,f){try{var v=JSON.parse(localStorage.getItem(k));return v||f}catch(e){return f}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
absent=load("palak_abs",absent);
function drawCal(){var np=0,na=0;cal.innerHTML="";
"SMTWTFS".split("").forEach(function(c){cal.insertAdjacentHTML("beforeend",'<div class="h">'+c+'</div>')});
for(var i=0;i<4;i++)cal.insertAdjacentHTML("beforeend","<div></div>");
for(var n=1;n<=31;n++){var w=(n+3)%7,cl="d",tag="div",ex="";
if(n>today)cl+=" o";else if(w==0||w==6||hol.indexOf(n)>-1){}else{tag="button";ex=' data-n="'+n+'"';if(absent.indexOf(n)>-1){cl+=" a";na++}else{cl+=" p";np++}}
if(n==today)cl+=" t";cal.insertAdjacentHTML("beforeend",'<'+tag+ex+' class="'+cl+'">'+n+'</'+tag+'>')}
document.getElementById("np").textContent=np;document.getElementById("na").textContent=na;document.getElementById("nr").textContent=Math.round(np*100/(np+na))+"%"}
cal.onclick=function(e){var b=e.target.closest("button[data-n]");if(!b)return;var n=+b.dataset.n,i=absent.indexOf(n);if(i>-1)absent.splice(i,1);else absent.push(n);save("palak_abs",absent);drawCal();toast("Oct "+n+" marked "+(i>-1?"present":"absent"))};
drawCal();
var tasks=load("palak_tasks",[{t:"Submit assignment 3",d:0},{t:"Revise for mid-terms",d:0},{t:"Return library book",d:0}]),tl=document.getElementById("tl"),ti=document.getElementById("ti");
function drawTasks(){tl.innerHTML="";tasks.forEach(function(k,i){var l=document.createElement("label");l.className="tk"+(k.d?" done":"");var c=document.createElement("input");c.type="checkbox";c.checked=!!k.d;c.onchange=function(){k.d=c.checked;save("palak_tasks",tasks);drawTasks()};var s=document.createElement("span");s.textContent=k.t;var x=document.createElement("button");x.textContent="\u00d7";x.setAttribute("aria-label","Delete task");x.onclick=function(e){e.preventDefault();tasks.splice(i,1);save("palak_tasks",tasks);drawTasks()};l.appendChild(c);l.appendChild(s);l.appendChild(x);tl.appendChild(l)});document.getElementById("npend").textContent=tasks.filter(function(k){return !k.d}).length}
function addTask(){var v=ti.value.trim();if(!v)return;tasks.push({t:v,d:0});ti.value="";save("palak_tasks",tasks);drawTasks()}
document.getElementById("tb").onclick=addTask;ti.onkeydown=function(e){if(e.key=="Enter")addTask()};drawTasks();
var tt;function toast(m){var t=document.getElementById("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("on")},2200)}
var msgs=["Fee status: no dues pending","Results: semester results not published yet","Library: 1 book due on 20 Oct","Forms: nothing to download right now"];
document.querySelectorAll(".links button").forEach(function(b,i){b.onclick=function(){toast(msgs[i])}});
var root=document.documentElement,tg=document.getElementById("tg");
function isDark(){var a=root.getAttribute("data-theme");return a?a=="dark":matchMedia("(prefers-color-scheme:dark)").matches}
function lab(){tg.textContent=isDark()?"Light mode":"Dark mode"}
tg.onclick=function(){root.setAttribute("data-theme",isDark()?"light":"dark");lab()};lab();