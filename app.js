const defaultNews=[
{id:1,title:"Local communities and the issues that matter most",category:"Nepal",summary:"News, voices and developments from across the country.",content:"This is demo article content. Replace it from the Admin Dashboard.",status:"Published",date:"2026-09-15T12:10:00"},
{id:2,title:"Understanding decisions that affect everyday citizens",category:"Politics",summary:"Clear context around public policy and governance.",content:"This is demo article content.",status:"Published",date:"2026-09-15T11:35:00"},
{id:3,title:"Markets, entrepreneurs and Nepal's changing economy",category:"Business",summary:"Business stories with a focus on practical impact.",content:"This is demo article content.",status:"Published",date:"2026-09-15T10:50:00"},
{id:4,title:"People, culture and stories from everyday Nepal",category:"Entertainment",summary:"Human-centered reporting from communities and cities.",content:"This is demo article content.",status:"Published",date:"2026-09-15T09:40:00"},
{id:5,title:"Digital Nepal: ideas, innovation and responsible technology",category:"Technology",summary:"Technology and innovation shaping Nepal's future.",content:"This is demo article content.",status:"Published",date:"2026-09-14T16:20:00"},
{id:6,title:"Global stories with local relevance",category:"World",summary:"International developments that matter to Nepal.",content:"This is demo article content.",status:"Published",date:"2026-09-14T14:10:00"},
{id:7,title:"Scores, competitions and stories behind the game",category:"Sports",summary:"Local and international sports coverage.",content:"This is demo article content.",status:"Published",date:"2026-09-14T12:20:00"}
];
function getNews(){let n=JSON.parse(localStorage.getItem('civilNews'));if(!n){localStorage.setItem('civilNews',JSON.stringify(defaultNews));n=defaultNews}return n}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function card(n){return `<article class="news-card"><div class="card-img">${n.image?`<img src="${esc(n.image)}" alt="">`:esc(n.category.toUpperCase())}</div><div class="card-body"><small>${esc(n.category)}</small><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p><time>${new Date(n.date).toLocaleString()}</time></div></article>`}
function render(){
let all=getNews().filter(n=>n.status==='Published');let q=(document.getElementById('search')?.value||'').toLowerCase();all=all.filter(n=>(n.title+n.summary+n.category).toLowerCase().includes(q));
document.getElementById('featured').innerHTML=all.length?`<article class="featured"><div class="featured-img">${all[0].image?`<img src="${esc(all[0].image)}" alt="">`:'FEATURED STORY'}</div><small>${esc(all[0].category)}</small><h2>${esc(all[0].title)}</h2><p>${esc(all[0].summary)}</p><a href="#" onclick="toast('Article page can be connected to your CMS in production.');return false">Read Full Story →</a></article>`:'<p>No published stories.</p>';
document.getElementById('sideNews').innerHTML=all.slice(0,4).map(n=>`<article class="side-card"><small>${esc(n.category)}</small><h3>${esc(n.title)}</h3></article>`).join('');
document.getElementById('newsGrid').innerHTML=all.slice(0,8).map(card).join('');
['Nepal','Politics','Business','Sports'].forEach(cat=>{let el=document.getElementById(cat==='Nepal'?'nepalList':cat==='Politics'?'politicsGrid':cat==='Business'?'businessGrid':'sportsGrid');if(el)el.innerHTML=all.filter(n=>n.category===cat).slice(0,3).map(n=>cat==='Nepal'?`<a href="#"><b>${esc(n.category)}</b><span>${esc(n.title)}</span>→</a>`:card(n)).join('')});
}
function toggleLang(){let b=document.getElementById('langBtn');b.textContent=b.textContent==='नेपाली'?'English':'नेपाली';toast('Language switch is ready for Nepali/English content.')}
function subscribe(e){e.preventDefault();toast('Thank you for subscribing!');e.target.reset()}
function toast(m){let t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
let headlines=['Welcome to The Civil Media Private Limited — Truth, People, Accountability.','Latest updates from Nepal and around the world.','Independent, responsible and public-interest journalism.'];let ti=0;setInterval(()=>{ti=(ti+1)%headlines.length;document.getElementById('ticker').textContent=headlines[ti]},3500);
document.getElementById('date').textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).format(new Date());document.getElementById('ticker').textContent=headlines[0];render();
