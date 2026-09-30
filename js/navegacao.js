import {obterTemplate,titulos} from './templates.js';
export function iniciarNavegacao(aoRenderizar){
 const app=document.getElementById('app');
 function renderizar(){
  const [rota,secao]=(location.hash.slice(1)||'inicio').split('/');app.innerHTML=obterTemplate(rota);
  document.title=(titulos[rota]||'Página não encontrada')+' | Conecta Solidária';
  for(const link of document.querySelectorAll('.menu-principal a[data-rota]')){link.removeAttribute('aria-current');if(link.getAttribute('href')==='#'+rota)link.setAttribute('aria-current','page');}
  aoRenderizar(rota);
  const h1=app.querySelector('h1');if(h1){h1.tabIndex=-1;h1.focus({preventScroll:true});}
  const alvo=secao?[...app.querySelectorAll('[id]')].find(e=>e.id===secao):null;
  if(alvo)alvo.scrollIntoView();else window.scrollTo(0,0);
 }
 document.addEventListener('click',e=>{
  const link=e.target.closest('a[data-rota]');if(!link||e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||link.target==='_blank')return;
  const destino=link.getAttribute('href');if(!destino?.startsWith('#'))return;e.preventDefault();
  if(location.hash===destino)renderizar();else location.hash=destino;
 });
 window.addEventListener('hashchange',renderizar);renderizar();
}
