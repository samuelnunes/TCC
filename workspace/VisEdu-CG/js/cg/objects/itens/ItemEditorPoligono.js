/**
 * 
 */

function ItemEditorPoligono() {		 
	aItemEditorEncaixeQuadrado.call(this); 
	
	var scope = this;
	
	//propriedades	
	scope.id =  EIdsItens.POLIGONO;
	scope.valorXYZ = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL
	scope.posicao  = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL	
	scope.propriedadeCor.setHex(0xBE2EF2);
	
	scope.qtdPontos = 2;
	scope.pontos = new THREE.Vector3();
	scope.pontos.set(200, 200, 200);
	
	scope.primitiva = CG.listaDePrimitivas.Vertices;
	
	scope.listaPontos[0] = new THREE.Vector3(200, 200, 200);
	scope.listaPontos[1] = new THREE.Vector3(-200, -200, -200);
	
	scope.pontoSelecionado = 1;
		
	//POR ENQUANTO NÃO DEVERÁ USAR TEXTURA
	//scope.textura = null;
	//scope.usarTextura = false;
	
	scope.getListaPontos = function() {
		var listaStr = new Array();
		
		for (var i = 0; i < scope.listaPontos.length; i++) {			
			listaStr[i] = ['(' + scope.listaPontos[i].x + ', ' + scope.listaPontos[i].y + ', ' + scope.listaPontos[i].z + ')', i + 1];
		}
		
		return listaStr;
	};
}

ItemEditorPoligono.prototype = Object.create(aItemEditorEncaixeQuadrado.prototype);