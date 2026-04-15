(function(){
  const key='hachavaPromoSeen';
  const overlay=document.getElementById('promoOverlay');
  if(!overlay) return;
  if(sessionStorage.getItem(key)==='1') return;
  overlay.hidden=false;
  sessionStorage.setItem(key,'1');
  const closeBtn=document.getElementById('closePromo');
  if(closeBtn) closeBtn.addEventListener('click', ()=>{ overlay.hidden=true; });
})();
