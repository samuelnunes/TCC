/**
 * INTERFACE
 */

function IEditorObserver () {
	this.onChangeItems = function ( ) { throw new Error ("fun��o onChangeItems n�o implemenada!"); };
	this.onChangeObjetoEmEdicao = function ( ) { throw new Error ("fun��o onChangeObjetoEmEdicao n�o implemenada!"); };
}
