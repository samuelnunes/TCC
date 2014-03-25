/**
 * 
 */

function Cachorro () {
	
	Mamifero.call(this);
	
	var raca;
	
	this.getRaca=function(){
		return this.raca;
	};
	
	this.setPeso=function(novaRaca){
		this.raca = novaRaca;
	};
	
	this.agir=function() {
		return "Au-Au!";
	};
}

Cachorro.prototype = Object.create(Mamifero.prototype);