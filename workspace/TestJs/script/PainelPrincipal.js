/**
 * 
 */

PainelPrincipal = function () {

	UI.Panel.call(this);
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
	camera.position.z = 5;
	
	var mouse3D = {x: 0, y: 0};
	var intersectableObjectsList = [];
	//variavel que tem o objeto selecionado a partir do duplo clique do mouse3D	
	var OBJETO_SELECIONADO;	
	
	//this.dom.backgroundcolor = 0x000000;
	
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
		
	renderer.domElement.ondblclick = selecionaObjeto;
	renderer.domElement.backgroundcolor = 0x000000;
	
	document.body.appendChild(renderer.domElement);
	
	this.renderizar = function () {			
		renderer.render(scene, camera);
	};
	
	this.criarObjGrafico = function () {
		var geometry = new THREE.CubeGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
		var cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		
		intersectableObjectsList.push(cube);
		
		var lineGeom = new THREE.Geometry();
		lineGeom.vertices.push( new THREE.Vector3(-2,-2,0) );
		lineGeom.vertices.push( new THREE.Vector3(2,-2,0) );
		lineGeom.vertices.push( new THREE.Vector3(0,2,0) );
		lineGeom.vertices.push( new THREE.Vector3(-2,-2,0) );
		lineGeom.colors.push( new THREE.Color(0xff0000) );
		lineGeom.colors.push( new THREE.Color(0x00ff00) );
		lineGeom.colors.push( new THREE.Color(0x0000ff) );
		lineGeom.colors.push( new THREE.Color(0xff0000) );
		
		var lineMat = new THREE.LineBasicMaterial({
		    linewidth: 3,
		    vertexColors: true
		});
		
		var triangle = new THREE.Line( lineGeom, lineMat );			
		scene.add(triangle);  // scene is of type THREE.Scene
		intersectableObjectsList.push(triangle);
	};
	
	function selecionaObjeto( event ) {
		mouse3D.x = ( ( event.clientX) / (renderer.domElement.width) )  * 2 - 1;
		mouse3D.y = - ( ( event.clientY) / renderer.domElement.height ) * 2 + 1;
		
		var vetor = new THREE.Vector3(mouse3D.x, mouse3D.y, 1);
		//Cria o projetor3D da cena3D
		var projetor3D = new THREE.Projector(); 
		projetor3D.unprojectVector(vetor, camera);
		
		var raio3D = new THREE.Raycaster();
		raio3D.set( camera.position, vetor.sub(camera.position).normalize());
		
		// cria um array com todos os objetos da cena3D que sao interseccionados pelo raio.
		var intersects = raio3D.intersectObjects(intersectableObjectsList);				
		
		if (intersects.length > 0 ) {
			alert('Teste');
		}
	}
};

PainelPrincipal.prototype = Object.create(UI.Panel.prototype);