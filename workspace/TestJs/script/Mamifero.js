/**
 * 
 */

function Mamifero () {
	var peso;
	
	this.getPeso=function(){
		return this.peso;
	};
	
	this.setPeso=function(novoPeso){
		this.peso = novoPeso;
	};
	
	this.agir=function() {
		return "Mamifero!";
	};
}