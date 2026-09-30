import {validarCadastro,camposCadastro} from './validacao.js';
export const chaveCadastro='conectaSolidaria:cadastro:v1';
export function gravarCadastro(entrada){
 const r=validarCadastro(entrada);if(!r.valido)return {ok:false,erro:'Corrija os campos antes de salvar.'};
 try{localStorage.setItem(chaveCadastro,JSON.stringify({versao:1,dados:r.dados}));return {ok:true};}
 catch{return {ok:false,erro:'Não foi possível salvar neste navegador. Verifique a disponibilidade do armazenamento e tente novamente.'};}
}
export function lerCadastro(){
 try{
  const texto=localStorage.getItem(chaveCadastro);if(texto===null)return {ok:true,dados:null};
  const registro=JSON.parse(texto);
  if(registro?.versao!==1||!registro.dados||!camposCadastro.every(c=>typeof registro.dados[c]==='string'))return {ok:false,erro:'O cadastro salvo está incompatível. Você pode excluí-lo e preencher novamente.'};
  const r=validarCadastro(registro.dados);if(!r.valido)return {ok:false,erro:'O cadastro salvo contém dados inválidos. Você pode excluí-lo e preencher novamente.'};
  return {ok:true,dados:r.dados};
 }catch{return {ok:false,erro:'Não foi possível recuperar o cadastro salvo. O armazenamento pode estar indisponível ou conter dados corrompidos.'};}
}
export function excluirCadastro(){try{localStorage.removeItem(chaveCadastro);return {ok:true};}catch{return {ok:false,erro:'Não foi possível excluir o cadastro salvo. Tente novamente quando o armazenamento estiver disponível.'};}}
