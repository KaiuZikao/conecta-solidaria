import {iniciarContraste} from './contraste.js';
iniciarContraste();
import {iniciarNavegacao} from './navegacao.js';
import {iniciarEventos,prepararSecao} from './eventos.js';
iniciarEventos();
iniciarNavegacao(prepararSecao);
