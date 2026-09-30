const chave='conectaSolidaria:contraste:v1';
export function iniciarContraste(){
 const botao=document.getElementById('alternar-contraste');
 const preferencia=window.matchMedia('(prefers-contrast: more)');
 let escolha=null;
 try{const valor=localStorage.getItem(chave);if(valor==='alto'||valor==='padrao')escolha=valor;}catch{}
 function aplicar(alto){document.documentElement.dataset.contraste=alto?'alto':'padrao';botao.setAttribute('aria-pressed',String(alto));}
 aplicar(escolha?escolha==='alto':preferencia.matches);botao.hidden=false;
 botao.addEventListener('click',()=>{escolha=botao.getAttribute('aria-pressed')==='true'?'padrao':'alto';aplicar(escolha==='alto');try{localStorage.setItem(chave,escolha);}catch{}});
 preferencia.addEventListener('change',()=>{if(escolha===null)aplicar(preferencia.matches);});
}
