
function Fabrica () {
	// define classe como singleton - unica inst�ncia 
	if (arguments.callee._singletonInstance) {
		return arguments.callee._singletonInstance;
	}
	
	arguments.callee._singletonInstance = this;
	var scope = this;
	
	//propriedades	
	scope.itens = []; 
	
	//implementacao	
	this.ehItemDaFabrica = function (item) {
		for (var i = 0; i < scope.itens.length; i++) {
			if	(scope.itens[i] == item) {
				return true;
			}
		}
		return false;
	};
	
	scope.fabricarNovoItem = function (idItem, inserirNaLista) {			
		var item = null;
		
		if	(idItem == EIdsItens.CAMERA) {
			item = new ItemEditorCamera();
		} 
		else if (idItem == EIdsItens.OBJETOGRAFICO) {
			item = new ItemEditorObjetoGrafico();
		} 
		else if (idItem == EIdsItens.CUBO) {
			item = new ItemEditorCubo();
		} 
		else if (idItem == EIdsItens.POLIGONO) {
			item = new ItemEditorPoligono();
		} 
		else if (idItem == EIdsItens.SPLINE) {
			item = new ItemEditorSpline();
		} 
		else if (idItem == EIdsItens.TRANSLADAR) {
			item = new ItemEditorTransladar();
		} 
		else if (idItem == EIdsItens.ROTACIONAR) {	
			item = new ItemEditorRotacionar();
		} 
		else if (idItem == EIdsItens.REDIMENSIONAR) {	
			item = new ItemEditorEscalar();
		} 
		else {
			throw new Error ("Nao foi poss�vel fabricar o item. Id informado n�o existe!");			
		}		
			
		var nome = item.id.descricao; 
		if	(!inserirNaLista) {
			item.id.count++;
			nome += " " + item.id.count;	
		}
		
		item.setNome(nome);	
		item.esconderDetalhes();		
		
		if ((inserirNaLista !== undefined) && (inserirNaLista)) {			
			scope.itens.push(item);			
		}
		
		return item;
	};	
}

FabricaItensCount = 1;