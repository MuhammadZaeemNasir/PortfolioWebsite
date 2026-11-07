'use strict';

// ZAEEMNASIR — original, dependency-free, interactive portfolio experience.
const services = [
  {id:1,name:'Graphics & Design',group:'creative',tag:'VISUAL IDENTITY',description:'Creative assets that help your brand look memorable, consistent and ready for the spotlight.',colors:['#e2d4ff','#956eff','#402a96','#9670ff33'],items:['Logos & visual identity concepts','Social graphics & ad creatives','YouTube thumbnails & banners','Packaging, labels & mockups','Presentations & infographics','AI illustrations & image enhancement','Print designs & Canva templates']},
  {id:2,name:'Programming & Tech',group:'technology',tag:'DIGITAL FOUNDATIONS',description:'Practical web and technical support, from ideas and prototypes to digital improvements.',colors:['#d0edff','#4c94ff','#1a409f','#618dff33'],items:['WordPress, Elementor & WooCommerce','Landing page design & HTML/CSS','JavaScript & Python assistance','Responsive website improvement','Technical troubleshooting & fixes','API and chatbot integration support','GitHub, hosting & domain assistance']},
  {id:3,name:'AI Services',group:'technology',tag:'SMARTER WORKFLOWS',description:'Ideas amplified by modern AI tools, human direction and careful quality checks.',colors:['#c5fff6','#2fe4c9','#0c668d','#28dacb33'],items:['AI image & video concepts','Prompt creation & optimization','AI content drafting and editing','Chatbot & automation assistance','AI research and presentations','AI-assisted coding workflows','AI product visuals & content']},
  {id:4,name:'Digital Marketing',group:'growth',tag:'GROWTH & VISIBILITY',description:'Content, research and optimization that help your message connect with an audience.',colors:['#ffe2ca','#ff9869','#bf4d53','#ff9a6c33'],items:['Keyword research & SEO reports','On-page SEO & technical checks','Social content calendars','Website & campaign copy','YouTube titles, SEO & thumbnails','Email marketing & advertising copy','E-commerce listing optimization']},
  {id:5,name:'Video & Animation',group:'creative',tag:'STORIES IN MOTION',description:'Compelling motion, editing and visual storytelling for platforms and audiences.',colors:['#ffd9ec','#ff74b1','#9a397b','#ff74b133'],items:['YouTube videos, Shorts & Reels','AI video creation and promos','Explainer & educational videos','Video scripts and storyboards','Captions, subtitles & transitions','Motion text, intros & outros','Color, sound & timing refinement']},
  {id:6,name:'Writing & Translation',group:'creative',tag:'WORDS THAT CONNECT',description:'Clear, useful content shaped for a particular voice, platform and purpose.',colors:['#d7d0ff','#8f83f5','#5141a2','#8e82ff33'],items:['Blog posts & SEO articles','Website and landing page copy','Product descriptions & listings','Emails, newsletters & captions','Scripts, stories & guides','Proofreading & rewriting','English / Urdu translation review']},
  {id:7,name:'Music & Audio',group:'creative',tag:'SOUND & CLARITY',description:'Audio cleanup, voice preparation and sound enhancement for better listening.',colors:['#cbfff3','#59dcb9','#278a8a','#59dcb933'],items:['Voice editing & noise reduction','Podcast audio cleanup','Audio trimming & normalization','AI-assisted voiceover workflows','Speech transcription & timing','Audio format conversion','Sound effect and music integration']},
  {id:8,name:'Business',group:'business',tag:'PRACTICAL SUPPORT',description:'Hands-on support for research, documents and the details that keep work moving.',colors:['#ffe6c3','#e6ad62','#976048','#e6ad6233'],items:['Virtual assistance & online research','Presentations & document design','Business and competitor research','Spreadsheets & project trackers','PDF and document formatting','Product listings & CRM cleanup','Process documentation & workflows']},
  {id:9,name:'Finance Support',group:'business',tag:'ORGANIZED NUMBERS',description:'Useful spreadsheet systems and well-organized business records, not regulated advice.',colors:['#d7f8d1','#77c58d','#377a80','#7cc98d33'],items:['Financial data entry & formatting','Budget and expense trackers','Invoice and payment templates','Sales and revenue summaries','Cash flow tracking templates','Spreadsheet charts & dashboards','Business data reconciliation assistance']},
  {id:10,name:'Personal Growth',group:'business',tag:'POTENTIAL & PROGRESS',description:'Thoughtfully designed materials for professional identity, learning and organization.',colors:['#ffddcd','#f48b8d','#a65385','#f48b8d33'],items:['CV and resume formatting','Cover letters & professional bios','Portfolio & profile materials','Study plans & learning templates','Productivity & habit trackers','Interview preparation resources','Personal goal planning documents']},
  {id:11,name:'Consulting Support',group:'growth',tag:'DIRECTION & RESEARCH',description:'Research-led recommendations and digital planning support for clearer decisions.',colors:['#dfd5ff','#a981fb','#6850a3','#a981fb33'],items:['AI tool and workflow research','Digital content planning','Website and branding reviews','Market and competitor research','Automation opportunity mapping','Project planning & documentation','Technology comparison reports']},
  {id:12,name:'Data & Photography',group:'technology',tag:'DATA & VISUALS',description:'From organized information to refined product imagery for everyday business needs.',colors:['#d1eeff','#64c6ef','#3679b5','#64c6ef33'],items:['Data entry, cleaning & formatting','Excel and Google Sheets support','Charts, dashboards & CSV files','Survey data & public web research','Product image editing & retouching','Background removal & upscaling','AI-assisted product visuals']}
];

const $ = (selector,root=document)=>root.querySelector(selector);
const $$ = (selector,root=document)=>Array.from(root.querySelectorAll(selector));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const grid = $('#world-grid');
const dialog = $('#world-dialog');
const esc = (str)=>String(str).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

// Original 3D-inspired worlds, generated in the browser, without external images or libraries.
function serviceCard(s){
  return `<article class="world-card reveal" data-world="${s.id}" data-group="${s.group}" style="--planet-hi:${s.colors[0]};--planet-mid:${s.colors[1]};--planet-low:${s.colors[2]};--card-glow:${s.colors[3]};--card-shadow:${s.colors[3]}">
    <div class="world-card-top"><span class="world-card-number">WORLD / ${String(s.id).padStart(2,'0')}</span><span class="world-card-symbol">✳</span></div>
    <div class="world-card-planet" aria-hidden="true"><span class="world-planet-inner"></span></div>
    <h3 class="world-card-name">${esc(s.name)}</h3><p class="world-card-description">${esc(s.description)}</p>
    <div class="world-card-bottom"><span class="world-card-tag">${esc(s.tag)}</span><button type="button" class="world-open" data-open-world="${s.id}" aria-label="Explore ${esc(s.name)}">↗</button></div>
  </article>`;
}
grid.innerHTML=services.map(serviceCard).join('');
const select=$('select[name="service"]');
for(const s of services){const opt=document.createElement('option');opt.value=s.name;opt.textContent=s.name;select.appendChild(opt)}

// Filtering: exact visible count and pressed state stay in sync.
$$('.filter').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  $$('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
  let count=0;
  $$('.world-card').forEach(card=>{
    const show=filter==='all'||card.dataset.group===filter;
    card.hidden=!show;
    if(show){count++;card.style.transform='';}
  });
  $('#world-count-label').textContent=filter==='all'?'EXPLORING ALL 12 WORLDS':`EXPLORING ${count} ${filter.toUpperCase()} WORLD${count===1?'':'S'}`;
}));

// Modal for specific services.
function showWorld(id){
  const s=services.find(item=>item.id===Number(id));if(!s)return;
  $('#dialog-index').textContent=`WORLD ${String(s.id).padStart(2,'0')} / 12   •   ${s.tag}`;
  $('#dialog-title').textContent=s.name;
  $('#dialog-description').textContent=s.description;
  $('#dialog-list').innerHTML=s.items.map(x=>`<li>${esc(x)}</li>`).join('');
  const orb=$('#dialog-orb');
  orb.style.setProperty('--dialog-hi',s.colors[0]);orb.style.setProperty('--dialog-mid',s.colors[1]);orb.style.setProperty('--dialog-low',s.colors[2]);orb.style.setProperty('--dialog-glow',s.colors[3]);
  $('#dialog-action').dataset.subject=s.name;
  if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
  document.body.style.overflow='hidden';
}
function closeWorld(){if(dialog.open){dialog.close?.();dialog.removeAttribute('open')}document.body.style.overflow=''}
grid.addEventListener('click',event=>{const btn=event.target.closest('[data-open-world]');if(btn)showWorld(btn.dataset.openWorld)});
$('#dialog-close').addEventListener('click',closeWorld);
dialog.addEventListener('click',e=>{if(e.target===dialog)closeWorld()});
dialog.addEventListener('close',()=>{document.body.style.overflow='' });
$('#dialog-action').addEventListener('click',(e)=>{const title=e.currentTarget.dataset.subject;select.value=title;closeWorld()});

// Subtle perspective card motion, with keyboard/reduced-motion accessibility intact.
if(!prefersReducedMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  $$('.world-card').forEach(card=>{
    card.addEventListener('pointermove',ev=>{
      const r=card.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave',()=>{card.style.transform=''});
  });
}

// Scroll UI and entry animations.
const nav=$('#site-nav'),progress=$('#scroll-progress');
let scrollScheduled=false;
function updateScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${max>0?(window.scrollY/max*100):0}%`;
  nav.classList.toggle('scrolled',window.scrollY>30);
  scrollScheduled=false;
}
window.addEventListener('scroll',()=>{if(!scrollScheduled){scrollScheduled=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
if('IntersectionObserver' in window&&!prefersReducedMotion){
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  },{threshold:.08,rootMargin:'0px 0px -26px 0px'});
  $$('.reveal').forEach(el=>observer.observe(el));
}else{$$('.reveal').forEach(el=>el.classList.add('visible'))}

// Mobile navigation.
const menuToggle=$('.menu-toggle'),mobileMenu=$('#mobile-menu');
function toggleMenu(force){const isOpen=typeof force==='boolean'?force:menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation');mobileMenu.hidden=!isOpen;nav.classList.toggle('menu-open',isOpen)}
menuToggle.addEventListener('click',()=>toggleMenu());
$$('#mobile-menu a').forEach(link=>link.addEventListener('click',()=>toggleMenu(false)));
window.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});
window.matchMedia('(min-width: 701px)').addEventListener?.('change',ev=>{if(ev.matches)toggleMenu(false)});

// Contact form prepares a real mailto URL. No fake form submission or hidden collection.
$('#contact-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity())return;
  const data=new FormData(form),name=String(data.get('name')||''),email=String(data.get('email')||''),service=String(data.get('service')||''),message=String(data.get('message')||'');
  const subject=`Project inquiry — ${service}`;
  const body=`Hi Zaeem,\n\nI'm ${name} (${email}).\n\nI'm interested in: ${service}\n\nProject details:\n${message}\n\nLooking forward to hearing from you.\n`;
  window.location.href=`mailto:mohammadzaeemnasir@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
$('#year').textContent=String(new Date().getFullYear());

// Native WebGL rotating procedural 3D planet: no Three.js or external scripts necessary.
// The sphere is ray/surface-shaded in 3D, with lighting, Fresnel and animated surface bands.
(function createPlanet(){
  const canvas=$('#planet-canvas');if(!canvas)return;
  const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false,depth:false,powerPreference:'low-power'});
  if(!gl){
    // Accessible CSS 3D fallback for browsers/devices where GPU WebGL is disabled.
    const visual=$('.hero-visual'),fallback=$('.planet-fallback');
    if(visual&&fallback&&!prefersReducedMotion){
      visual.addEventListener('pointermove',e=>{
        const r=visual.getBoundingClientRect();
        const x=((e.clientX-r.left)/r.width-.5)*21;
        const y=((e.clientY-r.top)/r.height-.5)*-17;
        fallback.style.transform=`perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
        fallback.style.backgroundPosition=`${50+x*.6}% ${50+y*.6}%`;
      },{passive:true});
      visual.addEventListener('pointerleave',()=>{fallback.style.transform='';fallback.style.backgroundPosition='' });
    }
    return;
  }
  const vertexSrc=`attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}`;
  const fragmentSrc=`
    precision highp float;
    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform float u_time;
    #define PI 3.14159265359
    mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
    mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}
    float noise3(vec3 p){return sin(p.x*3.8+sin(p.y*5.1+p.z*2.3))*sin(p.y*4.2+sin(p.z*7.7))*sin(p.z*5.1+sin(p.x*2.8));}
    void main(){
      vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);
      vec3 ro=vec3(0.,0.,3.5);
      vec3 rd=normalize(vec3(uv*2.15,-3.2));
      float radius=.99;
      float b=dot(ro,rd);
      float c=dot(ro,ro)-radius*radius;
      float h=b*b-c;
      float radial=length(uv);
      vec3 outputColor=vec3(.01,.50,.68);
      float outer=exp(-pow(max(radial-.28,0.)*6.5,2.));
      float alpha=.10*outer;
      if(h>0.){
        float t=-b-sqrt(h);
        vec3 pos=ro+rd*t;
        vec3 n=normalize(pos);
        vec3 q=rotX(-.24+u_pointer.y*.26)*rotY(u_time*.17+u_pointer.x*.65)*n;
        float lon=atan(q.z,q.x);
        float lat=asin(clamp(q.y,-1.,1.));
        float fluid=sin(11.*lat+3.2*sin(5.*lon+.4*u_time)+2.*noise3(q*1.8));
        float streak=sin(lon*15.+9.*q.y+2.3*sin(q.z*7.)+u_time*.33);
        float storm=noise3(q*3.4)+.4*noise3(q*7.5);
        vec3 deep=vec3(.024,.055,.19);
        vec3 mid=vec3(.045,.24,.49);
        vec3 light=vec3(.13,.83,.91);
        vec3 violet=vec3(.45,.24,.85);
        vec3 color=mix(deep,mid,clamp(.5+.39*fluid+.24*storm,0.,1.));
        color=mix(color,light,clamp(.16+.42*streak+.32*storm,0.,.7));
        color=mix(color,violet,clamp(.26+.28*sin(lon*3.-lat*8.+u_time*.13),0.,.58));
        float lightDot=max(dot(n,normalize(vec3(-.65,.75,1.3))),0.);
        float diffuse=.29+.8*lightDot;
        float spec=pow(max(dot(reflect(normalize(vec3(.45,-.6,-1.3)),n),-rd),0.),28.);
        float rim=pow(1.-max(dot(n,-rd),0.),2.2);
        color=color*diffuse+rim*vec3(.16,.85,1.0)*1.35+spec*vec3(.8,.98,1.)*.55;
        color+=pow(max(0.,sin(24.*lat+lon*7.+u_time*.3)),14.)*.16*vec3(.5,1.,1.);
        outputColor=color;
        alpha=1.;
      }
      gl_FragColor=vec4(outputColor,alpha);
    }`;
  const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){console.warn('Planet shader unavailable',gl.getShaderInfoLog(shader));gl.deleteShader(shader);return null}return shader};
  const vs=compile(gl.VERTEX_SHADER,vertexSrc),fs=compile(gl.FRAGMENT_SHADER,fragmentSrc);if(!vs||!fs)return;
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS)){console.warn('Planet rendering unavailable');return}
  const posLoc=gl.getAttribLocation(program,'a_position'),resLoc=gl.getUniformLocation(program,'u_resolution'),timeLoc=gl.getUniformLocation(program,'u_time'),pointerLoc=gl.getUniformLocation(program,'u_pointer');
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  gl.useProgram(program);gl.enableVertexAttribArray(posLoc);gl.vertexAttribPointer(posLoc,2,gl.FLOAT,false,0,0);
  const wrapper=$('.hero-visual');let targetX=0,targetY=0,mouseX=0,mouseY=0,dragging=false,previousX=0,rotOffset=0;let active=true;
  const pointerHandler=e=>{
    const r=wrapper.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    targetX=Math.max(-1,Math.min(1,x*1.6+rotOffset));targetY=Math.max(-1,Math.min(1,-y*1.6));
    if(dragging){rotOffset+=(e.clientX-previousX)/r.width*3;previousX=e.clientX}
  };
  wrapper.addEventListener('pointermove',pointerHandler,{passive:true});
  wrapper.addEventListener('pointerdown',e=>{dragging=true;previousX=e.clientX;wrapper.setPointerCapture?.(e.pointerId)});
  wrapper.addEventListener('pointerup',()=>{dragging=false});wrapper.addEventListener('pointercancel',()=>{dragging=false});
  wrapper.addEventListener('pointerleave',()=>{if(!dragging){targetX=0;targetY=0}});
  document.addEventListener('visibilitychange',()=>{active=!document.hidden});
  const resize=()=>{const bounds=canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.6);const w=Math.floor(bounds.width*dpr),h=Math.floor(bounds.height*dpr);if(w&&h&&(canvas.width!==w||canvas.height!==h)){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}};
  window.addEventListener('resize',resize,{passive:true});resize();
  const start=performance.now();let lastFrame=0;
  function paint(now){requestAnimationFrame(paint);if(!active)return;if(now-lastFrame<28&&!prefersReducedMotion)return;lastFrame=now;
    resize();mouseX+=(targetX-mouseX)*.055;mouseY+=(targetY-mouseY)*.055;
    gl.clearColor(0.,0.,0.,0.);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(program);
    gl.uniform2f(resLoc,canvas.width,canvas.height);gl.uniform2f(pointerLoc,mouseX,mouseY);
    gl.uniform1f(timeLoc,prefersReducedMotion?3.5:(now-start)/1000);
    gl.drawArrays(gl.TRIANGLES,0,6);
  }
  requestAnimationFrame(paint);
})();
