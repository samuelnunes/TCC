/**
 * 
 */

function ItemEditorSpline() {		 
	aItemEditorEncaixeQuadrado.call(this); 
	
	var scope = this;
	
	//propriedades	
	scope.id =  EIdsItens.SPLINE;
	scope.valorXYZ = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL
	scope.posicao  = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL

	scope.listaPontos[0] = new THREE.Vector3(-200, -200, 0);
	scope.listaPontos[1] = new THREE.Vector3(-200, 200, 0);	
	scope.listaPontos[2] = new THREE.Vector3(200, 200, 0);
	scope.listaPontos[3] = new THREE.Vector3(200, -200, 0);
	
	scope.qtdPontos = 20;	
	scope.poliedro = true;
	
	scope.propriedadeCor.setHex(0x098011);
	
	scope.corPoliedro = new THREE.Color();
	scope.corPoliedro.setHex(0x9EA8B0);
	
	//POR ENQUANTO NÃO DEVERÁ USAR TEXTURA
	//scope.textura = null;
	//scope.usarTextura = false;			
}

ItemEditorSpline.prototype = Object.create(aItemEditorEncaixeQuadrado.prototype);