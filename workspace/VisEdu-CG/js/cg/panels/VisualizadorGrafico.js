VisualizadorGrafico = function ( editor, signals ) {

	UI.Panel.call( this ); 
	IEditorObserver.call( this ); //interface

	var scope = this;	
	
	//propriedades	
	
	//SELECAO
	var mouse3D = {x: 0, y: 0};
	scope.intersectableObjectsList = [];
	//variavel que tem o objeto selecionado a partir do duplo clique do mouse3D	
	var OBJETO_SELECIONADO;	
	
	if	( !(editor instanceof Editor )) {
		throw new Error ( "argumento deve ser da classe Editor !" );	
	}	
	scope.editor = editor;
	scope.editor.visualizadorGrafico = this;
	scope.setPosition( 'absolute' );
	scope.setBackgroundColor( '#ddd' );	
	scope.setDisplay( 'broke' );	
	
	//implementacao	
	var objetosCriados = [];	
	signals.windowResize.add( function ( object ) { onWindowResize(); } );	
	
	//@Override	
	scope.onChangeItems = function ( ) {
		
		//limpa ojetos adicionados ao scene do visualizador
		for (var i=0; i < objetosCriados.length; i++) {			
			scene.remove(objetosCriados[i]);			
		}	
		objetosCriados = [];
		
		//limpa ojetos helpers
		for (var i=0; i < views.length; i++) {			
			if (views[0].cameraHelper !== undefined && views[0].cameraHelper) {
				sceneHelper.remove(views[0].cameraHelper);	
				views[0].cameraHelper = undefined;
			}
		}			
				
		scope.intersectableObjectsList = [];
		visualizarItem(scope.editor.painelMontagem, scene);		
	};
	
	//@Override
	scope.onChangeObjetoEmEdicao = function() {
		//vazio
	}
	
	scope.editor.observadores.push( scope ); //adicona esta classo como observador do editor
	
	
	/*var radius = 10;
	var widthSegments = 32;
	var heightSegments = 16;
	var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
	var cameraMesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 1 } ) );*/
	
	
	var pontoLuz;
	
	getBoundingBox = function(item){
		item.geometry.computeBoundingBox();
		
		var xMax = item.geometry.boundingBox.max.x;
		var xMin = item.geometry.boundingBox.min.x;
		var yMax = item.geometry.boundingBox.max.y;
		var yMin = item.geometry.boundingBox.min.y;
		var zMax = item.geometry.boundingBox.max.z;
		var zMin = item.geometry.boundingBox.min.z;
		
		var geom = new THREE.Geometry();
		
		//Face 1
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		
		//Face 2
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8	
		
		//Ligacoes 
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		
		var mat = new THREE.LineBasicMaterial( { color: 0xFF3300} );
		var bbox = new THREE.Line( geom, mat );
		bbox.name = "boundingbox";
		bbox.type = THREE.Line;
		
		return bbox;
	};
	
	visualizarItem = function ( item, objetoAux ) {	
		switch ( item.id ) {
			case EIdsItens.OBJETOGRAFICO:
				
				if	( item.visible ) {
				
					var novoObjeto = new THREE.Object3D();
					objetoAux.add( novoObjeto );
					if	(objetoAux instanceof THREE.Scene) {					
						objetosCriados.push(novoObjeto);
					}
					
					//aplica transformacoes
					novoObjeto.matrizTransformacao = new THREE.Matrix4();				
					novoObjeto.matrizTransformacao.multiply( novoObjeto.matrix );
					
					
					for ( var i = item.filhos.length-1; i >= 0 ; i-- ) {
						if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.DIAMANTE ) {
							visualizarItem( item.filhos[i], novoObjeto );							
						}
					}			
													
					//cria formas geometricas
					for ( var i = 0; i < item.filhos.length; i++ ) {
						if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.QUADRADO ) {							
							visualizarItem( item.filhos[i], novoObjeto );
						}
					}
					
					item.matrix = novoObjeto.matrizTransformacao;
					novoObjeto.applyMatrix( novoObjeto.matrizTransformacao );
					
					//cria filhos
					for ( var i = 0; i < item.filhos.length; i++ ) {
						if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.SETA ) {
							visualizarItem( item.filhos[i], novoObjeto );
						}
					}					
				}

				break;
			case EIdsItens.CUBO:				
				if	( item.visible ) {
				
					var corCubo = item.propriedadeCor.getHex();
					
					var geometria = new THREE.CubeGeometry( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
					var cubo = new THREE.Mesh( geometria, new THREE.MeshPhongMaterial() );
					cubo.material.color.setHex( corCubo );
					cubo.material.map = item.usarTextura ? item.textura : null;
					cubo.material.needsUpdate = true;
					cubo.geometry.buffersNeedUpdate = true;
					cubo.geometry.uvsNeedUpdate = true;									
					//cubo.visible = item.visible;
						
					cubo.position.set( item.posicao.x, item.posicao.y, item.posicao.z );
					cubo.item = item;
					objetoAux.add(cubo);
					scope.intersectableObjectsList.push(cubo);
					
					if (scope.editor.getObjetoSelecionado() != null) {						
						if ((scope.editor.getObjetoSelecionado().id == EIdsItens.CUBO) && (scope.editor.getObjetoSelecionado() == item)) {
							var bbox = getBoundingBox(cubo);					
							objetoAux.add(bbox);
						}
					}									
				}
				
				break;
			case EIdsItens.SPLINE:				
				if	(item.visible) {					
					var points = [];					
					
					for (var i = 0; i < item.listaPontos.length; i++) {
						points.push(item.listaPontos[i]);
					}										
					
					var cor = item.propriedadeCor.getHex();
					
					if (item.poliedro == true) {
						var corPoliedro = item.corPoliedro.getHex();
						
						var geometry = new THREE.Geometry();
						geometry.vertices = points;
						geometry.computeLineDistances();
												
						var material = new THREE.LineBasicMaterial( { linewidth: 1, color: corPoliedro, transparent: false } );
						var line = new THREE.Line(geometry, material, THREE.LineStrip);
						objetoAux.add(line);
					}					
					
					var pointsSpline = [];	
					
					var t;
					var p0, p1, p2, p3;					
					var x, y, z;
					
					
					for (var i = 0; i <= item.qtdPontos; i++) {
						
						t  =  i / item.qtdPontos;
						p0 = Math.pow((1 - t), 3);
						p1 = 3 * t * Math.pow((1 - t), 2);
						p2 = 3 * Math.pow(t, 2) * (1 - t);
						p3 = Math.pow(t, 3);
						
						x = p0 * points[0].x + p1 * points[1].x + p2 * points[2].x + p3 * points[3].x;
						y = p0 * points[0].y + p1 * points[1].y + p2 * points[2].y + p3 * points[3].y;
						z = p0 * points[0].z + p1 * points[1].z + p2 * points[2].z + p3 * points[3].z;
						
						//glVertex2f(x, y);						
						pointsSpline.push(new THREE.Vector3(x, y, z));						
					}
					
					var materialSpline;
					var lineSpline;
					var geometrySpline = new THREE.Geometry();
					geometrySpline.vertices = pointsSpline;
					geometrySpline.computeLineDistances();
					
					materialSpline = new THREE.LineBasicMaterial( { linewidth: 2, color: cor, transparent: false } );
					lineSpline = new THREE.Line(geometrySpline, materialSpline, THREE.LineStrip);
					objetoAux.add(lineSpline);
					lineSpline.item = item;
					scope.intersectableObjectsList.push(lineSpline);
					
					if (scope.editor.getObjetoSelecionado() != null) {
						if ((scope.editor.getObjetoSelecionado().id == EIdsItens.SPLINE) && (scope.editor.getObjetoSelecionado() == item)) {
							var bbox = getBoundingBox(lineSpline);					
							objetoAux.add(bbox);
						}
					}
				}
				
				break;
			case EIdsItens.POLIGONO:				
				if	( item.visible ) {					
					var points = [];	
					
					for (var i = 0; i < item.listaPontos.length; i++) {
						points.push(item.listaPontos[i]);
					}					
					
					var cor = item.propriedadeCor.getHex();					
					
					if (item.primitiva == CG.listaDePrimitivas.Vertices) {						
						var geometry = new THREE.CubeGeometry(5,5,5);
						var material = new THREE.MeshBasicMaterial({color: cor});
						
						for (var i = 0; i < item.listaPontos.length; i++) {
							var cube = new THREE.Mesh(geometry, material);
														
							cube.position.set(item.listaPontos[i].x, item.listaPontos[i].y, item.listaPontos[i].z);
							objetoAux.add(cube);
						}					
					}
					else if (item.primitiva == CG.listaDePrimitivas.Aberto) {
						//ABERTO
						var geometry = new THREE.Geometry();
						geometry.vertices = points;
						geometry.computeLineDistances();
												
						var material = new THREE.LineBasicMaterial( { linewidth: 5, color: cor, transparent: false } );
						var line = new THREE.Line(geometry, material, THREE.LineStrip);
						line.item = item;
						objetoAux.add(line);
						scope.intersectableObjectsList.push(line);						
						
						if (scope.editor.getObjetoSelecionado() != null) {
							if ((scope.editor.getObjetoSelecionado().id == EIdsItens.POLIGONO) && (scope.editor.getObjetoSelecionado() == item)) {
								var bbox = getBoundingBox(line);					
								objetoAux.add(bbox);
							}
						}
					} 
					else if (item.primitiva == CG.listaDePrimitivas.Fechado) {
						//FECHADO
						var geometry = new THREE.Geometry();
						points.push(item.listaPontos[0]);
						geometry.vertices = points;
						geometry.computeLineDistances();
												
						var material = new THREE.LineBasicMaterial( { linewidth: 5, color: cor, transparent: false } );
						var line = new THREE.Line(geometry, material, THREE.LineStrip);
						line.item = item;
						objetoAux.add(line);						
						scope.intersectableObjectsList.push(line);

						if (scope.editor.getObjetoSelecionado() != null) {
							if ((scope.editor.getObjetoSelecionado().id == EIdsItens.POLIGONO) && (scope.editor.getObjetoSelecionado() == item)) {
								var bbox = getBoundingBox(line);					
								objetoAux.add(bbox);
							}
						}
					}	
				}
				
				break;
			case EIdsItens.TRANSLADAR:
			
				if	( item.visible ) {
				
					var m1 = new THREE.Matrix4();				
					m1.makeTranslation( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
								
					objetoAux.matrizTransformacao.multiply( m1 );					
				}
				
				break;		
			case EIdsItens.ROTACIONAR:				
				if	(item.visible) {				
					var m1 = new THREE.Matrix4();
					var m2 = new THREE.Matrix4();
					var m3 = new THREE.Matrix4();				
					m1.makeRotationX( Util.math.converteGrausParaRadianos( item.valorXYZ.x ) );
					m2.makeRotationY( Util.math.converteGrausParaRadianos( item.valorXYZ.y ) );
					m3.makeRotationZ( Util.math.converteGrausParaRadianos( item.valorXYZ.z ) );

					//objetoAux.matrizTransformacao.multiplyMatrices( m1, m2 );				
					objetoAux.matrizTransformacao.multiply( m1 );
					objetoAux.matrizTransformacao.multiply( m2 );
					objetoAux.matrizTransformacao.multiply( m3 );					
				}
				
				break;
			case EIdsItens.REDIMENSIONAR:	
			
				if	(item.visible) {				
					var m1 = new THREE.Matrix4();				
					m1.makeScale( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
							
					objetoAux.matrizTransformacao.multiply( m1 );				
				}
				
				break;
			case EIdsItens.PAINELMONTAGEMEDITOR: 
			
				scope.intersectableObjectsList = [];
				for ( var i = 0; i < item.filhos.length; i++ ) {
					visualizarItem( item.filhos[i], objetoAux );
				}
				
				var indiceView = 1;
				var viewCamera = views[ indiceView ];
				
				viewCamera.clearColorHex = item.corLimpar.getHex();
				
				break;
			case EIdsItens.CAMERA:	
				var indiceView = 1;
				var viewCamera = views[ indiceView ];
				
				var atualizarMatrizCamera = ( ( viewCamera.camera.near !== item.near ) ||
											   ( viewCamera.camera.far !== item.far ) ||
											   ( viewCamera.camera.fov !== item.fov ) );											   
			
				viewCamera.camera.position.copy( item.valorXYZ );				
				viewCamera.camera.lookAt( item.lookAt.clone() );	
				viewCamera.camera.near = item.near;
				viewCamera.camera.far = item.far;
				viewCamera.camera.fov = item.fov;				
				
				if	(!viewCamera.cameraHelper) {				
					viewCamera.cameraHelper = new CGCameraHelper( viewCamera.camera );	/*THREE.CameraHelper*/					
					sceneHelper.add(viewCamera.cameraHelper);					
				}
				
				if	(atualizarMatrizCamera) {
					viewCamera.camera.updateProjectionMatrix();	
					viewCamera.cameraHelper.update();
				}
				
				pontoLuz.position.copy( item.valorXYZ );
				
				break;	
			default:
			  throw new Error ("Não foi possível processar a visualização do item. Id " + item.id + " não era esperada!");
		}
		
	};
		
	
	//WEB GL IMPLEMENTATION	
	var scene, sceneHelper, renderer, controls;
	var windowWidth, windowHeight;
	
	var views = [
		{ 
			left: 0,
			bottom: 0,
			width: 0.5,
			height: 1.0,
			background: { r: 0.9, g: 0.9, b: 0.9, a: 1 },
			posicao: [ 0, 600, 1800 ],
			lookAt: [ 0, 0, 0 ],
			up: [ 0, 1, 0 ],
			fov:45,
			near:1,
			far:99999,
			cameraHelper: null
		},
		{ 
			left: 0.5,
			bottom: 0,
			width: 0.5,
			height: 1,
			background: { r: 0, g: 0, b: 0, a: 1 },
			posicao: [ 0, -999998, 0 ],
			lookAt: [ 0, -999999, 0 ],
			up: [ 0, 1, 0 ],
			fov: 45,
			near:50,
			far:500,
			cameraHelper: null
		},
		{ 
			left: 0.5,
			bottom: 0,
			width: 0.5,
			height: 1,
			background: { r: 0, g: 0, b: 0, a: 1 },
			posicao: [ 0, -999998, 0 ],
			lookAt: [ 0, -999999, 0 ],
			up: [ 0, 1, 0 ],
			fov: 45,
			near:50,
			far:500,
			cameraHelper: null
		}
	];	
	scope.views = views;
	
	initVisualizador();	
	
	function generateCamera( indiceView ) {
	
		var view = views[indiceView];
		
		camera = new THREE.PerspectiveCamera( view.fov, 1, view.near, view.far );		
		camera.position.x = view.posicao[ 0 ];
		camera.position.y = view.posicao[ 1 ];
		camera.position.z = view.posicao[ 2 ];
		camera.up.x = view.up[ 0 ];
		camera.up.y = view.up[ 1 ];
		camera.up.z = view.up[ 2 ];		
		camera.lookAt( new THREE.Vector3().set( view.lookAt[ 0 ], view.lookAt[ 1 ], view.lookAt[ 2 ] ) );
		view.camera = camera;	
		
	}
	
	function initVisualizador() {

		//var container = document.getElementById( 'visualizador' );
		
		// SCENES 
		scene = new THREE.Scene();
		sceneHelper = new THREE.Scene();
		scene.add(sceneHelper);
		//sceneHelper.add(scene);
		
		// CAMERAS
		
		for (var i =  0; i < views.length-1; ++i ) {

			generateCamera( i );
			
		}

		//CONTROLER		
		
		controls = new THREE.TrackballControls( views[0].camera, scope.dom  );				
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noRotate = false;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.3;
		

		// LIGTHS
		
		
		var color = 0xffffff;
		var intensity = 2;
		var distance = 0;
		pontoLuz = new THREE.PointLight( color, intensity, distance );	
		scene.add( light );		
		
		var color = 0xffffff;
		var intensity = 1;
		//diretionalLightVisualizador = new THREE.DirectionalLight( color, intensity );		
		//scene.add( diretionalLightVisualizador );
		
		
		
		var skyColor = 0xFFFFFF;
		var groundColor = 0xFFFFFF;
		var intensity = 1;
		var light = new THREE.HemisphereLight( skyColor, groundColor, intensity );	
		light.position.set( 1, 1, 1 ).multiplyScalar( 200 );
		scene.add( light );
		
		
		// OBJECTS
		
		var grid = new THREE.GridHelper( 500, 25 );
		sceneHelper.add( grid );
		
		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 700, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0xFF0000, transparent: true } );
		var lineX = new THREE.Line( geometry, material );
		sceneHelper.add( lineX );
		
		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 700, 0 ) );
		geometry.computeLineDistances();
		material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0x00FF00, transparent: true } );
		var lineY = new THREE.Line( geometry, material );			
		sceneHelper.add( lineY );
	
		
		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 700 ) );
		geometry.computeLineDistances();
		material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0x0000FF, transparent: true } );
		var lineZ = new THREE.Line( geometry, material );
		sceneHelper.add( lineZ );
		
		
		// RENDERER
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		
		//Adiciona o metodo que pinta a BBox no listener de duplo clique
		renderer.domElement.ondblclick = selecionaObjeto;
									
		scope.dom.appendChild( renderer.domElement );
	}	
	
	function onWindowResize() {

		if ( windowWidth != scope.dom.offsetWidth || windowHeight != scope.dom.offsetHeight ) {

			windowWidth  = scope.dom.offsetWidth;
			windowHeight =  scope.dom.offsetHeight;

			renderer.setSize ( windowWidth, windowHeight );

		}

	}	
	
	scope.renderizar = function () {		
		for ( var i = 0; i < views.length-1; ++i ) {

			var view = views[i];
			var camera = view.camera;		

			var left   = Math.floor( windowWidth  * view.left );
			var bottom = Math.floor( windowHeight * view.bottom );
			var width  = Math.floor( windowWidth  * view.width );
			var height = Math.floor( windowHeight * view.height );
			renderer.setViewport( left, bottom, width, height );
			renderer.setScissor( left, bottom, width, height );
			renderer.enableScissorTest ( true );
			
			if	(view.clearColorHex !== undefined) {
				renderer.setClearColorHex( view.clearColorHex, view.background.a  );
				
				//NOVO THREE.js
				//renderer.setClearColor(view.clearColorHex, view.background.a);
			} else {
				renderer.setClearColor( view.background, view.background.a );
			}
			
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			
			
			if	(view.cameraHelper) {				
				
				//renderer.render( sceneHelper, camera );	
				scene.remove( sceneHelper );
				
				renderer.render( scene, camera );
				
				scene.add( sceneHelper );
				
			} else {			
				renderer.render( scene, camera );				
			}			
		}
		
		controls.update();
	};
	
	function selecionaObjeto( event ) {
		mouse3D.x = ( ( event.clientX - scope.dom.offsetTop) / (renderer.domElement.width) )  * 2 - 1;
		mouse3D.y = - ( ( event.clientY - scope.dom.offsetTop) / renderer.domElement.height) * 2 + 1;
		
		var vetor = new THREE.Vector3(mouse3D.x, mouse3D.y, 1);
		var projetor3D = new THREE.Projector(); 
		projetor3D.unprojectVector(vetor, views[0].camera);
		
		var raio3D = new THREE.Raycaster();
		raio3D.set( views[0].camera.position, vetor.sub(views[0].camera.position).normalize());
		
		var intersects = raio3D.intersectObjects(scope.intersectableObjectsList);				
		
		if (intersects.length > 0 ) {			
			OBJETO_SELECIONADO = intersects[0].object;
			
			editor.selecionarObjeto(OBJETO_SELECIONADO.item);
		}
		else {		
			editor.selecionarObjeto(null);
			
			scope.intersectableObjectsList = [];
			visualizarItem(scope.editor.painelMontagem, scene);
		}
	};	
};

VisualizadorGrafico.prototype = Object.create( UI.Panel.prototype );