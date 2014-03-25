/**
 * 
 */

function Gato () {
	
	Mamifero.call(this);
	
	var scope = this;
	
	var idade;
	
	scope.getIdade=function(){
		return scope.idade;
	};
	
	scope.setIdade=function(novaIdade){
		scope.idade = novaIdade;
	};
	
	scope.agir=function() {
		return "Miau!";
	};
}

Gato.prototype = Object.create(Mamifero.prototype);