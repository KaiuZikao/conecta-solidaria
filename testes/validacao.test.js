import test from 'node:test';
import assert from 'node:assert/strict';
import {validarCadastro} from '../js/validacao.js';
const base={nome:'Pessoa de Demonstração',cpf:'123.456.789-01',nascimento:'2000-01-01',email:'pessoa@example.com',telefone:'(11) 98765-4321',cep:'19200-000',logradouro:'Rua Teste',numero:'12A',complemento:'',cidade:'Pirapozinho',estado:'SP',participacao:'voluntario'};
test('cadastro válido aceita número alfanumérico e complemento vazio',()=>assert.equal(validarCadastro(base).valido,true));
test('campos obrigatórios contendo apenas espaços são rejeitados',()=>{for(const campo of ['nome','logradouro','numero','cidade'])assert.ok(validarCadastro({...base,[campo]:'   '}).erros[campo]);});
test('datas impossíveis e futuras são rejeitadas; ano bissexto válido é aceito',()=>{for(const nascimento of ['2024-02-30','2023-02-29',`${new Date().getFullYear()+1}-01-01`])assert.ok(validarCadastro({...base,nascimento}).erros.nascimento);assert.equal(validarCadastro({...base,nascimento:'2024-02-29'}).valido,true);});
test('formato de contato, CPF e CEP deve ser completo',()=>{for(const [campo,valor]of Object.entries({email:'sem-arroba',cpf:'123',telefone:'(11) 123',cep:'123'}))assert.ok(validarCadastro({...base,[campo]:valor}).erros[campo]);});
test('UF e participação fora das opções são rejeitadas',()=>{assert.ok(validarCadastro({...base,estado:'XX'}).erros.estado);assert.ok(validarCadastro({...base,participacao:'outra'}).erros.participacao);});
