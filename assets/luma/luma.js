/* A 16-second loop: 3 seconds per pose + 1 second per transition. */
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-luma-morph]').forEach(root=>{
  const sprites=[...root.querySelectorAll('.luma-morph__character')];
  const glow=root.querySelector('.luma-morph__glow');
  let animations=[],visible=false,loaded=false,loading=false;
  function sync(){
   const play=visible&&!document.hidden&&!reduce.matches;
   animations.forEach(a=>play?a.play():a.pause());
  }
  function start(){
   if(animations.length||reduce.matches||!loaded)return;
   const values=[[[0,1],[3,1],[4,0],[15,0],[16,1]],[[0,0],[3,0],[4,1],[7,1],[8,0],[16,0]],[[0,0],[7,0],[8,1],[11,1],[12,0],[16,0]],[[0,0],[11,0],[12,1],[15,1],[16,0]]];
   animations=sprites.map((el,i)=>el.animate(values[i].map(([t,opacity])=>({offset:t/16,opacity,easing:'ease-in-out'})),{duration:16000,iterations:Infinity}));
   animations.push(glow.animate([{opacity:.08},{opacity:.12,offset:.65},{opacity:.85,offset:.875},{opacity:.08}],{duration:4000,iterations:Infinity,easing:'ease-in-out'}));
   animations.forEach(a=>{a.pause();a.currentTime=0;});sync();
  }
  async function load(){
   if(loading||loaded||reduce.matches)return;
   loading=true;
   try{await Promise.all(sprites.map(async el=>{if(el.dataset.src)el.src=el.dataset.src;await el.decode();}));loaded=true;start();}
   catch{/* Keep the static adult illustration if an image cannot load. */}finally{loading=false;}
  }
  document.addEventListener('visibilitychange',sync);
  reduce.addEventListener('change',()=>{
   if(reduce.matches){animations.forEach(a=>a.cancel());animations=[];}
   else if(visible){loaded?start():load();}
  });
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)load();sync();},{threshold:.05}).observe(root);}
  else{visible=true;load();}
 });
})();
