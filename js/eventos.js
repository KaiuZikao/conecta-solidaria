import {validarCadastro,aplicarMascara} from './validacao.js';
import {lerCadastro,gravarCadastro,excluirCadastro} from './armazenamento.js';
let gatilhoModal=null;
const coletar=form=>Object.fromEntries(new FormData(form).entries());
function mensagem(id,texto,erro=false){const el=document.getElementById(id);if(!el)return;el.textContent=texto;el.hidden=!texto;if(id==='resultado'||id==='aviso-armazenamento'){el.className='alerta '+(erro?'alerta-erro':'alerta-sucesso');el.setAttribute('role',erro?'alert':'status');}}
function indicarCampo(form,nome,erro){for(const c of [...form.elements].filter(e=>e.name===nome))c.setAttribute('aria-invalid',String(Boolean(erro)));const texto=document.getElementById('erro-'+nome);if(texto){texto.textContent=erro||'';texto.hidden=!erro;}}
function verificarCampo(c){if(c.form){const r=validarCadastro(coletar(c.form));indicarCampo(c.form,c.name,r.erros[c.name]);}}
function fecharSubmenu(foco=false){document.getElementById('submenu-participar').hidden=true;const b=document.querySelector('.botao-submenu');b.setAttribute('aria-expanded','false');if(foco)b.focus();}
function fecharMenu(foco=false){document.getElementById('menu-principal').classList.remove('menu-aberto');const b=document.querySelector('.botao-menu');b.setAttribute('aria-expanded','false');if(foco)b.focus();}
export function prepararSecao(rota){
 if(rota!=='cadastro')return;const form=document.getElementById('form-cadastro');
 for(const c of [...form.elements].filter(e=>e.name&&e.type!=='radio')){const texto=document.createElement('p');texto.id='erro-'+c.name;texto.className='erro-campo';texto.hidden=true;c.after(texto);c.setAttribute('aria-describedby',((c.getAttribute('aria-describedby')||'')+' '+texto.id).trim());}
 const grupo=form.querySelector('#participacao');const erro=document.createElement('p');erro.id='erro-participacao';erro.className='erro-campo';erro.hidden=true;grupo.append(erro);for(const radio of grupo.querySelectorAll('input'))radio.setAttribute('aria-describedby',erro.id);
 const salvo=lerCadastro();if(!salvo.ok){mensagem('aviso-armazenamento',salvo.erro,true);return;}
 if(salvo.dados){for(const c of form.elements){if(!c.name)continue;if(c.type==='radio')c.checked=c.value===salvo.dados[c.name];else c.value=salvo.dados[c.name]||'';}mensagem('aviso-armazenamento','Cadastro de demonstração recuperado deste navegador.');}
}
export function iniciarEventos(){
 document.documentElement.classList.add('js');document.querySelector('.botao-menu').hidden=false;document.querySelector('.botao-submenu').hidden=false;
 document.addEventListener('click',e=>{
  const a=e.target.closest('button,a');if(!a)return;
  if(a.matches('.botao-menu')){const aberto=a.getAttribute('aria-expanded')!=='true';a.setAttribute('aria-expanded',String(aberto));document.getElementById('menu-principal').classList.toggle('menu-aberto',aberto);}
  else if(a.matches('.botao-submenu')){const sub=document.getElementById('submenu-participar');sub.hidden=!sub.hidden;a.setAttribute('aria-expanded',String(!sub.hidden));}
  else if(!a.closest('.item-submenu'))fecharSubmenu();
  if(a.matches('a[data-rota]')){fecharMenu();fecharSubmenu();document.querySelector('dialog[open]')?.close();}
  if(a.dataset.modal){gatilhoModal=a;document.getElementById(a.dataset.modal)?.showModal();}
  if(a.matches('.fechar-modal'))a.closest('dialog')?.close();
  if(a.id==='demonstrar-toast')document.getElementById('toast-feedback').classList.add('visivel');
  if(a.id==='fechar-toast'){document.getElementById('toast-feedback').classList.remove('visivel');document.getElementById('demonstrar-toast').focus();}
  if(a.id==='excluir-cadastro'){
   const r=excluirCadastro();if(!r.ok){mensagem('resultado',r.erro,true);return;}const form=document.getElementById('form-cadastro');form.reset();for(const c of form.elements)c.removeAttribute('aria-invalid');for(const t of form.querySelectorAll('.erro-campo')){t.hidden=true;t.textContent='';}document.getElementById('resumo-erros').hidden=true;mensagem('aviso-armazenamento','');mensagem('resultado','Cadastro salvo excluído deste navegador.');
  }
 });
 document.addEventListener('keydown',e=>{if(e.key!=='Escape'||document.querySelector('dialog[open]'))return;if(!document.getElementById('submenu-participar').hidden)fecharSubmenu(true);else if(document.getElementById('menu-principal').classList.contains('menu-aberto'))fecharMenu(true);});
 document.querySelector('.item-submenu').addEventListener('focusout',e=>{if(!e.currentTarget.contains(e.relatedTarget))fecharSubmenu();});
 matchMedia('(min-width:1024px)').addEventListener('change',()=>{fecharMenu();fecharSubmenu();});
 const app=document.getElementById('app');
 app.addEventListener('close',e=>{if(e.target.tagName==='DIALOG'&&gatilhoModal?.isConnected)gatilhoModal.focus();},true);
 app.addEventListener('input',e=>{const c=e.target;if(!c.form||!c.name)return;c.value=aplicarMascara(c.name,c.value);mensagem('resultado','');if(c.hasAttribute('aria-invalid'))verificarCampo(c);if(validarCadastro(coletar(c.form)).valido)document.getElementById('resumo-erros').hidden=true;});
 app.addEventListener('focusout',e=>{if(e.target.form&&e.target.name)verificarCampo(e.target);});
 app.addEventListener('submit',e=>{
  if(e.target.id!=='form-cadastro')return;e.preventDefault();const form=e.target;const r=validarCadastro(coletar(form));
  for(const nome of Object.keys(r.dados))indicarCampo(form,nome,r.erros[nome]);document.getElementById('resumo-erros').hidden=r.valido;
  if(!r.valido){mensagem('resultado','');[...form.elements].find(c=>r.erros[c.name])?.focus();return;}
  const salvo=gravarCadastro(r.dados);mensagem('resultado',salvo.ok?'Cadastro de demonstração salvo neste navegador. Nenhum dado foi enviado a um servidor.':salvo.erro,!salvo.ok);
 });
}
