import dayjs from './vendor/dayjs.js';
export const camposCadastro=['nome','cpf','nascimento','email','telefone','cep','logradouro','numero','complemento','cidade','estado','participacao'];
const ufs=new Set('AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' '));
const formatos={cpf:/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,telefone:/^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/,cep:/^[0-9]{5}-[0-9]{3}$/};
const limites={nome:120,email:150,logradouro:150,numero:20,complemento:80,cidade:80};
export function validarCadastro(entrada){
 const dados=Object.fromEntries(camposCadastro.map(c=>[c,typeof entrada?.[c]==='string'?entrada[c].trim():'']));
 const erros={};
 for(const c of camposCadastro)if(c!=='complemento'&&!dados[c])erros[c]='Este campo é obrigatório.';
 if(dados.nome&&dados.nome.length<3)erros.nome='Informe um nome com pelo menos três caracteres.';
 for(const [c,max] of Object.entries(limites))if(dados[c].length>max)erros[c]=`Use no máximo ${max} caracteres.`;
 if(dados.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email))erros.email='Informe um e-mail válido, como pessoa@example.com.';
 for(const [c,pattern] of Object.entries(formatos))if(dados[c]&&!pattern.test(dados[c]))erros[c]='Confira o formato indicado para este campo.';
 if(dados.nascimento){const data=dayjs(dados.nascimento,'YYYY-MM-DD',true);if(!data.isValid())erros.nascimento='Informe uma data válida.';else if(data.isAfter(dayjs(),'day'))erros.nascimento='A data de nascimento não pode estar no futuro.';}
 if(dados.estado&&!ufs.has(dados.estado))erros.estado='Selecione um estado válido.';
 if(dados.participacao&&!['doador','voluntario'].includes(dados.participacao))erros.participacao='Escolha doador ou voluntário.';
 return {valido:Object.keys(erros).length===0,erros,dados};
}
const digitos=(v,max)=>v.replace(/\D/g,'').slice(0,max);
export function aplicarMascara(c,v){
 if(c==='cpf'){const d=digitos(v,11);return d.slice(0,3)+(d.length>3?'.'+d.slice(3,6):'')+(d.length>6?'.'+d.slice(6,9):'')+(d.length>9?'-'+d.slice(9):'');}
 if(c==='cep'){const d=digitos(v,8);return d.slice(0,5)+(d.length>5?'-'+d.slice(5):'');}
 if(c==='telefone'){const d=digitos(v,11);if(!d)return '';if(d.length<=2)return '('+d;const corte=d.length===11?7:6;return '('+d.slice(0,2)+') '+d.slice(2,corte)+(d.length>corte?'-'+d.slice(corte):'');}
 return v;
}
