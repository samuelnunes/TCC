
function PainelPropriedades( item ) {		

	UI.Panel.call(this); 
	
	var scope = this;	
	scope.item = item;	
		
	//scope.setClass( 'painel' );
	scope.setPosition( 'absolute' );	
	scope.setDisplay( 'broke' );
	
	/*DesenharPropriedadeDescricao = function() {
		scope.add(new UI.Text().setValue(item.id.descricao.toUpperCase()).setColor('#666'));
		scope.add(new UI.Break(), new UI.Break());
	};
	
	DesenharPropriedadeNome = function() {
		var objectNameRow;
		var objectName;	
		
		if	((scope.item.nome !== undefined) && (scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly) ) {		
			objectNameRow = new UI.Panel();
			objectName = new UI.Input().setWidth('150px').setColor('#444').setFontSize('12px').onChange(
					function update() {				
						if	( ( item.nome !== undefined ) && ( scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly )) {				
							item.setNome(objectName.getValue());					
						}
						
						item.update();
					});
			
			objectName.setValue(scope.item.nome);
			
			objectNameRow.add(new UI.Text('Nome').setWidth('90px').setColor('#666'));
			objectNameRow.add(objectName);
	
			scope.add(objectNameRow);
		}		
	};
	
	DesenharPropriedadeCor = function() {
		var objectColorRow;
		var objectColor;
			
		if	(scope.item.propriedadeCor !== undefined) {				
			objectColorRow = new UI.Panel();
			objectColor = new UI.Color().onChange(
					function update() {
						if	(item.propriedadeCor !== undefined) {
							item.propriedadeCor.setHex(objectColor.getHexValue());
						}
						item.update();
					});						
			
			objectColor.setHexValue(scope.item.propriedadeCor.getHex());
	
			objectColorRow.add(new UI.Text('Cor').setWidth('90px').setColor('#666'));
			objectColorRow.add(objectColor);
	
			scope.add(objectColorRow);			
		}
	};
	
	DesenharPropriedadeVisivel = function() {
		var materialVisibleRow;
		var materialVisibleEnabled;
		
		if	(scope.item.changeVisibility !== undefined && item.changeVisibility) {		
			var materialVisibleRow = new UI.Panel();
			var materialVisibleEnabled = new UI.Checkbox(false).onChange(
					function update() {
						if (item.changeVisibility !== undefined && item.changeVisibility) {						
							item.visible = materialVisibleEnabled.getValue();						
						}					
						item.update();
					});		
			
			materialVisibleEnabled.setValue(scope.item.visible);
			
			materialVisibleRow.add(new UI.Text(scope.item.visibleDescription).setWidth('90px').setColor('#666'));
			materialVisibleRow.add(materialVisibleEnabled);
	
			scope.add(materialVisibleRow);			
		}
	};
	
	DesenharPropriedadeQtdPontos = function() {
		var objectQtdPontosRow;
		var objectQtdPontos;	
		
		if	(scope.item.qtdPontos !== undefined) {		
			objectQtdPontosRow = new UI.Panel();
			objectQtdPontos = new UI.Input().setWidth('60px').setColor('#444').setFontSize('12px').onChange(
					function update() {				
						if	(item.qtdPontos !== undefined) {				
							item.qtdPontos = objectQtdPontos.getValue();
							item.pontos.x = 0;
							item.pontos.y = 0;
							item.pontos.z = 0;							
						}
						
						item.update();
					});
			
			objectQtdPontos.setValue(scope.item.qtdPontos);
			
			objectQtdPontosRow.add(new UI.Text('Qtd. Pontos').setWidth('90px').setColor('#666'));
			objectQtdPontosRow.add(objectQtdPontos);
			
			objectQtdPontosRow.dom.className = 'Teste';
	
			scope.add(objectQtdPontosRow);
		}		
	};
	
	DesenharPropriedadePontos = function() {
		var objectPontosRow;
		var objectPontoX;
		var objectPontoY;
		var objectPontoZ;
		
		if	(scope.item.pontos !== undefined) {		
			objectPontosRow = new UI.Panel();
			objectPontoX = new UI.Number().setWidth('50px').onChange(
					function update() {				
						if	(item.pontos !== undefined ) {							
							item.pontos.x = objectPontoX.getValue();
							item.listaPontos[item.pontoSelecionado - 1] = item.pontos; 
						}						
						item.update();
					});
			
			objectPontoY = new UI.Number().setWidth('50px').onChange(
					function update() {				
						if	(item.pontos !== undefined ) {							
							item.pontos.y = objectPontoY.getValue();
							item.listaPontos[item.pontoSelecionado - 1] = item.pontos;
						}						
						item.update();
					});
			
			objectPontoZ = new UI.Number().setWidth('50px').onChange(
					function update() {				
						if	(item.pontos !== undefined ) {							
							item.pontos.z = objectPontoZ.getValue();
							item.listaPontos[item.pontoSelecionado - 1] = item.pontos;
						}						
						item.update();
					});
			
			objectPontoX.setValue(scope.item.pontos.x);
			objectPontoY.setValue(scope.item.pontos.y);
			objectPontoZ.setValue(scope.item.pontos.z);
	
			objectPontosRow.add(new UI.Text('Pontos').setWidth('90px' ).setColor('#666'));
			
			objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
			objectPontosRow.add(objectPontoX);
			
			objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
			objectPontosRow.add(objectPontoY);
			
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPontoZ);
			
			scope.add(objectPontosRow);			
		}
		
		//LISTA PONTOS				
		var objectListaPontosRow;		
		var objectListaPontos;
		
		if	(true) {
			objectListaPontosRow = new UI.Panel();			
			objectListaPontos = new UI.Select().setOptionsArray(item.getListaPontos()).setWidth('120px').setColor('#444').setFontSize('12px').onChange(
					function update() {				
						if	(item.pontoSelecionado !== undefined ) {							
							item.pontosSelecionado = objectListaPontos.getValue();
							scope.item.pontos = item.listaPontos[item.pontoSelecionado - 1];
							
							objectPontoX.setValue(scope.item.pontos.x);
							objectPontoY.setValue(scope.item.pontos.y);
							objectPontoZ.setValue(scope.item.pontos.z);
						}						
						item.update();
					});
					
			objectListaPontosRow.add(new UI.Text(' ').setWidth('90px').setColor('#666'));			
			objectListaPontosRow.add(objectListaPontos);	
			
			scope.add(objectListaPontosRow);			
		}
	};
	
	DesenharPropriedadePrimitiva = function() {
		var objectListaPrimitivaRow;		
		var objectListaPrimitiva;
		
		if	(true) {
			objectListaPrimitivaRow = new UI.Panel();			
			objectListaPrimitiva = new UI.Select().setOptions(CG.listaDePrimitivas).setWidth('120px').setColor('#444').setFontSize('12px').onChange(
					function update() {				
						if	(objectListaPrimitiva.getValue() !== 'nenhum') {
							item.primitiva = objectListaPrimitiva.getValue();
						}
						
						item.update();
					});
						
			objectListaPrimitiva.setValue(item.primitiva);				
					
			objectListaPrimitivaRow.add(new UI.Text('Primitiva').setWidth('90px').setColor('#666'));			
			objectListaPrimitivaRow.add(objectListaPrimitiva);	
			
			scope.add(objectListaPrimitivaRow);			
		}
	};
	
	DesenharPropriedadePontosSpline = function(ponto, idPonto) {
		var objectPontosRow;
		var objectPontoX;
		var objectPontoY;
		var objectPontoZ;
		
		if	(ponto !== undefined) {		
			objectPontosRow = new UI.Panel();
			objectPontoX = new UI.Number().setWidth('50px').onChange(
					function update() {				
						if	(ponto !== undefined ) {							
							ponto.x = objectPontoX.getValue();														
						}						
						item.update();
					});
			
			objectPontoY = new UI.Number().setWidth('50px').onChange(
					function update() {				
						if	(ponto !== undefined ) {							
							ponto.y = objectPontoY.getValue();
						}						
						item.update();
					});
			
			objectPontoZ = new UI.Number().setWidth('50px').onChange(
					function update() {				
						if	(ponto !== undefined ) {							
							ponto.z = objectPontoZ.getValue();							
						}						
						item.update();
					});
			
			objectPontoX.setValue(ponto.x);
			objectPontoY.setValue(ponto.y);
			objectPontoZ.setValue(ponto.z);
	
			objectPontosRow.add(new UI.Text('P' + idPonto).setWidth('90px' ).setColor('#666'));
			
			objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
			objectPontosRow.add(objectPontoX);
			
			objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
			objectPontosRow.add(objectPontoY);
			
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPontoZ);
			
			scope.add(objectPontosRow);			
		}
	};
	
	DesenharPropriedadePoliedro = function() {
		var objectPoliedroRow;
		var objectPoliedro;
		
		if	(scope.item.poliedro !== undefined) {		
			var objectPoliedroRow = new UI.Panel();
			var objectPoliedro = new UI.Checkbox(false).onChange(
					function update() {
						if (scope.item.poliedro !== undefined) {						
							item.poliedro = objectPoliedro.getValue();						
						}					
						item.update();
					});		
			
			objectPoliedro.setValue(scope.item.poliedro);
			
			objectPoliedroRow.add(new UI.Text('Poliedro').setWidth('90px').setColor('#666'));
			objectPoliedroRow.add(objectPoliedro);
	
			scope.add(objectPoliedroRow);			
		}
	};*/
	
	/*if (item.id == EIdsItens.POLIGONO) {
		//DESCRICAO	
		DesenharPropriedadeDescricao();
		
		//NOME
		DesenharPropriedadeNome();
		
		//QTDPONTOS
		DesenharPropriedadeQtdPontos();
		
		//PONTOS
		DesenharPropriedadePontos();
		
		//PRIMITIVA
		DesenharPropriedadePrimitiva();
		
		//COR	
		DesenharPropriedadeCor();
		
		//VISIVEL		
		DesenharPropriedadeVisivel();
	}
	else if (item.id == EIdsItens.SPLINE) {
		//DESCRICAO	
		DesenharPropriedadeDescricao();
		
		//NOME
		DesenharPropriedadeNome();
		
		//PONTOS SPLINE
		DesenharPropriedadePontosSpline(scope.item.ponto1, '1');
		DesenharPropriedadePontosSpline(scope.item.ponto2, '2');
		DesenharPropriedadePontosSpline(scope.item.ponto3, '3');
		DesenharPropriedadePontosSpline(scope.item.ponto4, '4');
		
		//QTDPONTOS
		DesenharPropriedadeQtdPontos();
		
		//POLIEDRO
		DesenharPropriedadePoliedro();
		
		//COR	
		DesenharPropriedadeCor();
		
		//VISIVEL		
		DesenharPropriedadeVisivel();
	}
	else {	*/
		//DESCRICAO	
		//DesenharPropriedadeDescricao();
		scope.add(new UI.Text().setValue(item.id.descricao.toUpperCase()).setColor('#666'));
		scope.add(new UI.Break(), new UI.Break());
		
		//NOME
		var objectNameRow;
		var objectName;	
		
		if	((scope.item.nome !== undefined) && (scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly) ) {		
			objectNameRow = new UI.Panel();
			objectName = new UI.Input().setWidth('150px').setColor('#444').setFontSize('12px').onChange(update);
			
			objectName.setValue(scope.item.nome);
			
			objectNameRow.add(new UI.Text('Nome').setWidth('90px').setColor('#666'));
			objectNameRow.add(objectName);
	
			scope.add(objectNameRow);
		}
		
		var objectQtdPontosRow;
		var objectQtdPontos;	
		
		if	(scope.item.qtdPontos !== undefined && (item.id == EIdsItens.POLIGONO)) {		
			objectQtdPontosRow = new UI.Panel();
			objectQtdPontos = new UI.Input().setWidth('60px').setColor('#444').setFontSize('12px').onChange(update);
			//objectQtdPontos = new UI.Number().setWidth('50px').onChange(update);
			
			objectQtdPontos.setValue(scope.item.qtdPontos);
			
			objectQtdPontosRow.add(new UI.Text('Qtd. Pontos').setWidth('90px').setColor('#666'));
			objectQtdPontosRow.add(objectQtdPontos);
	
			scope.add(objectQtdPontosRow);
		}
		
		var objectPontosRow;
		var objectPontoX;
		var objectPontoY;
		var objectPontoZ;
		
		if	(scope.item.pontos !== undefined) {		
			objectPontosRow = new UI.Panel();
			objectPontoX = new UI.Number().setWidth('50px').onChange(update);			
			objectPontoY = new UI.Number().setWidth('50px').onChange(update);
			objectPontoZ = new UI.Number().setWidth('50px').onChange(update);
			
			objectPontoX.setValue(scope.item.pontos.x);
			objectPontoY.setValue(scope.item.pontos.y);
			objectPontoZ.setValue(scope.item.pontos.z);
	
			objectPontosRow.add(new UI.Text('Pontos').setWidth('90px' ).setColor('#666'));
			
			objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
			objectPontosRow.add(objectPontoX);
			
			objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
			objectPontosRow.add(objectPontoY);
			
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPontoZ);
			
			objectPontosRow.dom.className = 'PontoAtual';
			
			scope.add(objectPontosRow);			
		}
		
		//LISTA PONTOS				
		var objectListaPontosRow;		
		var objectListaPontos;
		
		if	(scope.item.listaPontos !== undefined && (item.id == EIdsItens.POLIGONO)) {
			objectListaPontosRow = new UI.Panel().setHeight('20px');			
			objectListaPontos = new UI.Select().setOptionsArray(item.getListaPontos()).setWidth('120px').setColor('#444').setFontSize('12px').onChange(update);
			
			objectListaPontos.setValue(item.pontoSelecionado);
					
			objectListaPontosRow.add(new UI.Text(' ').setWidth('90px').setColor('#666'));			
			objectListaPontosRow.add(objectListaPontos);	
			
			scope.add(objectListaPontosRow);
		}
		
		//////////////////////////////////////////////////////////////////
		//Pontos da SPLINE 
		if	(scope.item.listaPontos !== undefined && (item.id == EIdsItens.SPLINE)) {			
			var objectPontosRow;
			
			//PONTO 1
			var objectPonto1X;
			var objectPonto1Y;
			var objectPonto1Z;
								
			objectPontosRow = new UI.Panel();
			objectPonto1X = new UI.Number().setWidth('50px').onChange(update);
			objectPonto1Y = new UI.Number().setWidth('50px').onChange(update);
			objectPonto1Z = new UI.Number().setWidth('50px').onChange(update);
			
			objectPonto1X.setValue(scope.item.listaPontos[0].x);
			objectPonto1Y.setValue(scope.item.listaPontos[0].y);
			objectPonto1Z.setValue(scope.item.listaPontos[0].z);
	
			objectPontosRow.add(new UI.Text('P1').setWidth('90px' ).setColor('#666'));			
			objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
			objectPontosRow.add(objectPonto1X);			
			objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
			objectPontosRow.add(objectPonto1Y);			
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto1Z);
			
			scope.add(objectPontosRow);
			
			//PONTO 2
			var objectPonto2X;
			var objectPonto2Y;
			var objectPonto2Z;
								
			objectPontosRow = new UI.Panel();
			objectPonto2X = new UI.Number().setWidth('50px').onChange(update);
			objectPonto2Y = new UI.Number().setWidth('50px').onChange(update);
			objectPonto2Z = new UI.Number().setWidth('50px').onChange(update);
			
			objectPonto2X.setValue(scope.item.listaPontos[1].x);
			objectPonto2Y.setValue(scope.item.listaPontos[1].y);
			objectPonto2Z.setValue(scope.item.listaPontos[1].z);
	
			objectPontosRow.add(new UI.Text('P2').setWidth('90px' ).setColor('#666'));			
			objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
			objectPontosRow.add(objectPonto2X);			
			objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
			objectPontosRow.add(objectPonto2Y);			
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto2Z);
			
			scope.add(objectPontosRow);
			
			//PONTO 3
			var objectPonto3X;
			var objectPonto3Y;
			var objectPonto3Z;
								
			objectPontosRow = new UI.Panel();
			objectPonto3X = new UI.Number().setWidth('50px').onChange(update);
			objectPonto3Y = new UI.Number().setWidth('50px').onChange(update);
			objectPonto3Z = new UI.Number().setWidth('50px').onChange(update);
			
			objectPonto3X.setValue(scope.item.listaPontos[2].x);
			objectPonto3Y.setValue(scope.item.listaPontos[2].y);
			objectPonto3Z.setValue(scope.item.listaPontos[2].z);
	
			objectPontosRow.add(new UI.Text('P3').setWidth('90px' ).setColor('#666'));			
			objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
			objectPontosRow.add(objectPonto3X);			
			objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
			objectPontosRow.add(objectPonto3Y);			
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto3Z);
			
			scope.add(objectPontosRow);
			
			//PONTO 4
			var objectPonto4X;
			var objectPonto4Y;
			var objectPonto4Z;
								
			objectPontosRow = new UI.Panel();
			objectPonto4X = new UI.Number().setWidth('50px').onChange(update);
			objectPonto4Y = new UI.Number().setWidth('50px').onChange(update);
			objectPonto4Z = new UI.Number().setWidth('50px').onChange(update);
			
			objectPonto4X.setValue(scope.item.listaPontos[3].x);
			objectPonto4Y.setValue(scope.item.listaPontos[3].y);
			objectPonto4Z.setValue(scope.item.listaPontos[3].z);
	
			objectPontosRow.add(new UI.Text('P4').setWidth('90px' ).setColor('#666'));			
			objectPontosRow.add(new UI.Text('x: ').setColor('#666'));
			objectPontosRow.add(objectPonto4X);			
			objectPontosRow.add(new UI.Text('y: ').setColor('#666'));
			objectPontosRow.add(objectPonto4Y);			
			objectPontosRow.add(new UI.Text('z: ').setColor('#666'));
			objectPontosRow.add(objectPonto4Z);
			
			scope.add(objectPontosRow);
		}
		/////////////////////////////////////////////////////////////////
		
		if	(scope.item.qtdPontos !== undefined && (item.id == EIdsItens.SPLINE)) {		
			objectQtdPontosRow = new UI.Panel();
			objectQtdPontos = new UI.Input().setWidth('60px').setColor('#444').setFontSize('12px').onChange(update);
			//objectQtdPontos = new UI.Number().setWidth('50px').onChange(update);
			
			objectQtdPontos.setValue(scope.item.qtdPontos);
			
			objectQtdPontosRow.add(new UI.Text('Qtd. Pontos').setWidth('90px').setColor('#666'));
			objectQtdPontosRow.add(objectQtdPontos);
	
			scope.add(objectQtdPontosRow);
		}
		
		var objectListaPrimitivaRow;		
		var objectListaPrimitiva;
		
		if	(scope.item.primitiva !== undefined) {
			objectListaPrimitivaRow = new UI.Panel().setHeight('20px');			
			objectListaPrimitiva = new UI.Select().setOptions(CG.listaDePrimitivas).setWidth('120px').setColor('#444').setFontSize('12px').onChange(update);
						
			objectListaPrimitiva.setValue(item.primitiva);				
					
			objectListaPrimitivaRow.add(new UI.Text('Primitiva').setWidth('90px').setColor('#666'));			
			objectListaPrimitivaRow.add(objectListaPrimitiva);	
			
			scope.add(objectListaPrimitivaRow);	
		}
		
		var objectPoliedroRow;
		var objectPoliedro;
		
		if	(scope.item.poliedro !== undefined) {		
			var objectPoliedroRow = new UI.Panel().setHeight('30px');	
			var objectPoliedro = new UI.Checkbox(false).onChange(update);
			
			objectPoliedro.setValue(scope.item.poliedro);
			
			objectPoliedroRow.add(new UI.Text('Poliedro').setWidth('90px').setColor('#666'));
			objectPoliedroRow.add(objectPoliedro);
			
			if	(scope.item.poliedro == true) {
				//COR POLIEDRO
				var objectColorPoliedro;
					
				if	(scope.item.corPoliedro !== undefined) {
					objectPoliedroRow.add(new UI.Text().setValue('Cor').setWidth('30px').setColor('#666'));
					
					objectColorPoliedro = new UI.Color().onChange(update);					
					objectColorPoliedro.setHexValue(scope.item.corPoliedro.getHex());
			
					objectPoliedroRow.add(objectColorPoliedro);
				}
			}
			
			scope.add(objectPoliedroRow);
		}
		
		//valores x, y, z do item
		var objectValueRow;
		var objectValueX;
		var objectValueY;
		var objectValueZ;
		
		if	( scope.item.valorXYZ !== undefined ) {
		
			objectValueRow = new UI.Panel();
			objectValueX = new UI.Number().setWidth( '50px' ).onChange( update );
			objectValueY = new UI.Number().setWidth( '50px' ).onChange( update );
			objectValueZ = new UI.Number().setWidth( '50px' ).onChange( update );
			
			objectValueX.setValue(scope.item.valorXYZ.x);
			objectValueY.setValue(scope.item.valorXYZ.y);
			objectValueZ.setValue(scope.item.valorXYZ.z);
	
			objectValueRow.add( new UI.Text( scope.item.valueDescription ).setWidth( '90px' ).setColor( '#666' ) );
			objectValueRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
			objectValueRow.add( objectValueX);
			objectValueRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
			objectValueRow.add( objectValueY );
			objectValueRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
			objectValueRow.add( objectValueZ );
			
			scope.add( objectValueRow );
			
		}	
		
		//valores x, y, z da posicao	
		var objectPosicaoRow;
		var objectPosicaoX;
		var objectPosicaoY;
		var objectPosicaoZ;
		
		if	( scope.item.posicao !== undefined ) {
		
			objectPosicaoRow = new UI.Panel();
			objectPosicaoX = new UI.Number().setWidth( '50px' ).onChange( update );
			objectPosicaoY = new UI.Number().setWidth( '50px' ).onChange( update );
			objectPosicaoZ = new UI.Number().setWidth( '50px' ).onChange( update );
			
			objectPosicaoX.setValue(scope.item.posicao.x);
			objectPosicaoY.setValue(scope.item.posicao.y);
			objectPosicaoZ.setValue(scope.item.posicao.z);
	
			objectPosicaoRow.add( new UI.Text( "Posicao").setWidth( '90px' ).setColor( '#666' ) );		
			objectPosicaoRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
			objectPosicaoRow.add( objectPosicaoX);
			objectPosicaoRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
			objectPosicaoRow.add( objectPosicaoY );
			objectPosicaoRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
			objectPosicaoRow.add( objectPosicaoZ );
			
			scope.add( objectPosicaoRow );			
		}
		
		//valores x, y, z do lookAt 	
		var objectLookAtRow;
		var objectLookAtX;
		var objectLookAtY;
		var objectLookAtZ;
		
		if	(scope.item.lookAt !== undefined) {		
			objectLookAtRow = new UI.Panel();
			objectLookAtX = new UI.Number().setWidth( '50px' ).onChange( update );
			objectLookAtY = new UI.Number().setWidth( '50px' ).onChange( update );
			objectLookAtZ = new UI.Number().setWidth( '50px' ).onChange( update );
			
			objectLookAtX.setValue(scope.item.lookAt.x);
			objectLookAtY.setValue(scope.item.lookAt.y);
			objectLookAtZ.setValue(scope.item.lookAt.z);
	
			objectLookAtRow.add( new UI.Text( "Look At").setWidth( '90px' ).setColor( '#666' ) );
			objectLookAtRow.add( new UI.Text( 'x: ' ).setColor( '#666' ) );
			objectLookAtRow.add( objectLookAtX);
			objectLookAtRow.add( new UI.Text( 'y: ' ).setColor( '#666' ) );
			objectLookAtRow.add( objectLookAtY );
			objectLookAtRow.add( new UI.Text( 'z: ' ).setColor( '#666' ) );
			objectLookAtRow.add( objectLookAtZ );
			
			scope.add(objectLookAtRow);			
		}	
		
		//Near
		var objectNearRow;
		var objectNear;
		
		if	( scope.item.near !== undefined ) {
		
			objectNearRow = new UI.Panel();
			objectNear = new UI.Number().setWidth( '50px' ).onChange( update );
			
			objectNear.setValue(scope.item.near);
	
			objectNearRow.add( new UI.Text( "Near").setWidth( '90px' ).setColor( '#666' ) );
			objectNearRow.add( objectNear );
			
			scope.add( objectNearRow );			
		}
		
		//Far
		var objectFarRow;
		var objectFar;
		
		if	( scope.item.far !== undefined ) {
		
			objectFarRow = new UI.Panel();
			objectFar = new UI.Number().setWidth( '50px' ).onChange( update );
			
			objectFar.setValue(scope.item.far);
	
			objectFarRow.add( new UI.Text( "Far").setWidth( '90px' ).setColor( '#666' ) );
			objectFarRow.add( objectFar );
			
			scope.add( objectFarRow );
			
		}
		
		//FOV
		var objectFovRow;
		var objectFov;
		
		if	( scope.item.fov !== undefined ) {
		
			objectFovRow = new UI.Panel();
			objectFov = new UI.Number().setWidth( '50px' ).onChange( update );
			
			objectFov.setValue(scope.item.fov);
	
			objectFovRow.add( new UI.Text( "FOV").setWidth( '90px' ).setColor( '#666' ) );
			objectFovRow.add( objectFov );
			
			scope.add( objectFovRow );			
		}
		
		//COR
		//DesenharPropriedadeCor();
		var objectColorRow;
		var objectColor;
			
		if	(scope.item.propriedadeCor !== undefined) {				
			objectColorRow = new UI.Panel();
			objectColor = new UI.Color().onChange(update);					
			
			objectColor.setHexValue(scope.item.propriedadeCor.getHex());
	
			objectColorRow.add(new UI.Text('Cor').setWidth('90px').setColor('#666'));
			objectColorRow.add(objectColor);
	
			scope.add(objectColorRow);			
		}
		
		// clear color	
		var objectCorLimparRow;
		var objectCorLimpar;
			
		if	( scope.item.corLimpar !== undefined ) {	
			
			objectCorLimparRow = new UI.Panel();
			objectCorLimpar = new UI.Color().onChange( update );
			
			objectCorLimpar.setHexValue( scope.item.corLimpar.getHex() );
	
			objectCorLimparRow.add( new UI.Text( 'Cor de Limpeza' ).setWidth( '110px' ).setColor( '#666' ) );
			objectCorLimparRow.add( objectCorLimpar );
	
			scope.add( objectCorLimparRow );
			
		}	
		
		// textura	
		var materialMapRow1;
		var materialMapRow2;
		var materialMapRow3;
		var materialMapEnabled;
		var materialMap;
		var imagemLocal;
		
		if	( scope.item.textura !== undefined ) {
		
			materialMapRow1 = new UI.Panel();
			materialMapRow2 = new UI.Panel();
			materialMapRow3 = new UI.Panel();
			materialMapEnabled = new UI.Checkbox( false ).onChange( update );
			materialMap = new UI.Texture().setColor( '#444' ).setWidth( '115px' ).onChange( update );
			imagemLocal = new UI.Select().setOptions( CG.listaDeTexturas ).setWidth( '120px' ).setColor( '#444' ).setFontSize( '12px' ).onChange( update );	
			
			materialMap.dom.addEventListener( 'change', function ( event ) {
	
				imagemLocal.setValue( 'nenhum' );
	
			}, false );		
				
				
			materialMapEnabled.setValue( scope.item.usarTextura );
			if ( scope.item.textura !== null ) {			
				materialMap.setValue( scope.item.textura );
			} 
			
			materialMapRow1.add( new UI.Text( 'Textura' ).setWidth( '90px' ).setColor( '#666' ) );
			materialMapRow1.add( materialMapEnabled );
			materialMapRow1.add( new UI.Text( 'Habilitar textura' ).setWidth( '120px' ).setColor( '#666' ) );
			materialMapRow2.add( new UI.Text( ' ' ).setWidth( '90px' ).setColor( '#666' ) );
			materialMapRow2.add( materialMap );
			materialMapRow3.add( new UI.Text( ' ' ).setWidth( '90px' ).setColor( '#666' ) );
			materialMapRow3.add( new UI.Text( 'Usar lista' ).setWidth( '70px' ).setColor( '#666' ) );
			materialMapRow3.add( imagemLocal );
	
			scope.add( materialMapRow1 );
			scope.add( materialMapRow2 );
			scope.add( materialMapRow3 );
			
		}
				
		//Visivel
		//DesenharPropriedadeVisivel();
		var materialVisibleRow;
		var materialVisibleEnabled;
		
		if	(scope.item.changeVisibility !== undefined && item.changeVisibility) {		
			var materialVisibleRow = new UI.Panel();
			var materialVisibleEnabled = new UI.Checkbox(false).onChange(update);
			materialVisibleEnabled.setValue(scope.item.visible);
			
			materialVisibleRow.add(new UI.Text(scope.item.visibleDescription).setWidth('90px').setColor('#666'));
			materialVisibleRow.add(materialVisibleEnabled);
	
			scope.add(materialVisibleRow);			
		}
		
		// matrix		
		var matrix11;
		var matrix12;
		var matrix13;
		var matrix14;
		var matrix21;
		var matrix22;
		var matrix23;
		var matrix24;
		var matrix31;
		var matrix32;
		var matrix33;
		var matrix34;
		var matrix41;
		var matrix42;
		var matrix43;
		var matrix44;
		
		if	( scope.item.matrix !== undefined ) {		
			var materialMatrixRow1 = new UI.Panel();
			var materialMatrixRow2 = new UI.Panel();
			var materialMatrixRow3 = new UI.Panel();
			var materialMatrixRow4 = new UI.Panel();		
				
			var colMatrixWidth = '80px';
			matrix11 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix12 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix13 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix14 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix21 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix22 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix23 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix24 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix31 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix32 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix33 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix34 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix41 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix42 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix43 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			matrix44 = new UI.Text( "" ).setWidth( colMatrixWidth ).setColor( '#666' ).setClass('TextDir');
			updateMatrix();			
			
			materialMatrixRow1.add( new UI.Text( 'Matriz' ).setWidth( '90px' ).setColor( '#666' ) );
			materialMatrixRow1.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );	
			materialMatrixRow1.add( matrix11 );
			materialMatrixRow1.add( matrix21 );
			materialMatrixRow1.add( matrix31 );
			materialMatrixRow1.add( matrix41 );
			materialMatrixRow1.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );
			
			materialMatrixRow2.add( new UI.Text( '' ).setWidth( '90px' ).setColor( '#666' ) );
			materialMatrixRow2.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );
			materialMatrixRow2.add( matrix12 );
			materialMatrixRow2.add( matrix22 );
			materialMatrixRow2.add( matrix32 );
			materialMatrixRow2.add( matrix42 );
			materialMatrixRow2.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );
			
			materialMatrixRow3.add( new UI.Text( '' ).setWidth( '90px' ).setColor( '#666' ) );
			materialMatrixRow3.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );
			materialMatrixRow3.add( matrix13 );
			materialMatrixRow3.add( matrix23 );
			materialMatrixRow3.add( matrix33 );
			materialMatrixRow3.add( matrix43 );
			materialMatrixRow3.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );
	
			materialMatrixRow4.add( new UI.Text( '' ).setWidth( '90px' ).setColor( '#666' ) );
			materialMatrixRow4.add( new UI.Text( '[' ).setWidth( '5px' ).setColor( '#666' ) );
			materialMatrixRow4.add( matrix14 );
			materialMatrixRow4.add( matrix24 );
			materialMatrixRow4.add( matrix34 );
			materialMatrixRow4.add( matrix44 );
			materialMatrixRow4.add( new UI.Text( ']' ).setWidth( '5px' ).setColor( '#666' ) );
			
			scope.add( materialMatrixRow1 );
			scope.add( materialMatrixRow2 );
			scope.add( materialMatrixRow3 );
			scope.add( materialMatrixRow4 );			
		}
		
		function updateMatrix() {			
			matrix11.setValue( scope.item.matrix.elements[0].toFixed(3) /*+ ","*/ );
			matrix12.setValue( scope.item.matrix.elements[1].toFixed(3) /*+ ","*/ );
			matrix13.setValue( scope.item.matrix.elements[2].toFixed(3) /*+ ","*/ );
			matrix14.setValue( scope.item.matrix.elements[3].toFixed(3) /*+ ","*/ );
			matrix21.setValue( scope.item.matrix.elements[4].toFixed(3) /*+ ","*/ );
			matrix22.setValue( scope.item.matrix.elements[5].toFixed(3) /*+ ","*/ );
			matrix23.setValue( scope.item.matrix.elements[6].toFixed(3) /*+ ","*/ );
			matrix24.setValue( scope.item.matrix.elements[7].toFixed(3) /*+ ","*/ );
			matrix31.setValue( scope.item.matrix.elements[8].toFixed(3) /*+ ","*/ );
			matrix32.setValue( scope.item.matrix.elements[9].toFixed(3) /*+ ","*/ );
			matrix33.setValue( scope.item.matrix.elements[10].toFixed(3) /*+ ","*/ );
			matrix34.setValue( scope.item.matrix.elements[11].toFixed(3) /*+ ","*/ );
			matrix41.setValue( scope.item.matrix.elements[12].toFixed(3) );
			matrix42.setValue( scope.item.matrix.elements[13].toFixed(3) );
			matrix43.setValue( scope.item.matrix.elements[14].toFixed(3) );
			matrix44.setValue( scope.item.matrix.elements[15].toFixed(3) );
			
		}		
		
		function update() {	
			if	( ( item.nome !== undefined ) && ( scope.item.nomeReadOnly == undefined || !scope.item.nomeReadOnly )) {
				item.setNome( objectName.getValue() );
			}
			
			if	(item.qtdPontos !== undefined && item.qtdPontos != parseInt(objectQtdPontos.getValue()) && (item.id == EIdsItens.POLIGONO)) {					
				
				if (item.qtdPontos < parseInt(objectQtdPontos.getValue())) {
					var qtdNovosPontos = (parseInt(objectQtdPontos.getValue()) - item.qtdPontos);
										
					item.pontos.x = 0;
					item.pontos.y = 0;
					item.pontos.z = 0;
					
					for (var i = 0; i < qtdNovosPontos; i++) {
						item.listaPontos[item.qtdPontos + i] = new THREE.Vector3(item.pontos.x, item.pontos.y, item.pontos.z);
					}
					
					item.qtdPontos = parseInt(objectQtdPontos.getValue());
					
					objectPontoX.setValue(scope.item.pontos.x);
					objectPontoY.setValue(scope.item.pontos.y);
					objectPontoZ.setValue(scope.item.pontos.z);
					
					objectListaPontos.setOptionsArray(item.getListaPontos());
					objectListaPontos.setValue(item.qtdPontos);
				}
				else {
					var qtdPontosRemovidos = (item.qtdPontos - parseInt(objectQtdPontos.getValue()));
					
					for (var i = 0; i < qtdPontosRemovidos; i++) {
						item.listaPontos.pop();
					}
										
					item.qtdPontos = parseInt(objectQtdPontos.getValue());
					
					item.pontos.x = item.listaPontos[0].x;
					item.pontos.y = item.listaPontos[0].y;
					item.pontos.z = item.listaPontos[0].z;
					
					objectPontoX.setValue(scope.item.pontos.x);
					objectPontoY.setValue(scope.item.pontos.y);
					objectPontoZ.setValue(scope.item.pontos.z);
					
					objectListaPontos.setOptionsArray(item.getListaPontos());
					objectListaPontos.setValue(1);
				}
			}
			
			if	((item.qtdPontos !== undefined) && (item.qtdPontos != parseInt(objectQtdPontos.getValue())) && (item.id == EIdsItens.SPLINE)) {
				item.qtdPontos = parseInt(objectQtdPontos.getValue());
			}
			
			if	(item.primitiva !== undefined) {
				item.primitiva = objectListaPrimitiva.getValue();
			}
			
			if	(item.pontos !== undefined && (item.pontos.x != parseInt(objectPontoX.getValue()) || item.pontos.y != parseInt(objectPontoY.getValue()) || item.pontos.z != parseInt(objectPontoZ.getValue()))) {
				item.pontos.x = parseInt(objectPontoX.getValue());
				item.pontos.y = parseInt(objectPontoY.getValue());
				item.pontos.z = parseInt(objectPontoZ.getValue());
				
				var posAnterior = parseInt(objectListaPontos.getValue());
				
				item.listaPontos[(posAnterior - 1)].x = item.pontos.x;
				item.listaPontos[(posAnterior - 1)].y = item.pontos.y;
				item.listaPontos[(posAnterior - 1)].z = item.pontos.z;				
				
				objectListaPontos.setOptionsArray(item.getListaPontos());
				objectListaPontos.setValue(posAnterior);
			}	
			
			if	(item.pontoSelecionado !== undefined ) {							
				item.pontosSelecionado = parseInt(objectListaPontos.getValue());
				scope.item.pontos.x = item.listaPontos[(parseInt(objectListaPontos.getValue()) - 1)].x;
				scope.item.pontos.y = item.listaPontos[(parseInt(objectListaPontos.getValue()) - 1)].y;
				scope.item.pontos.z = item.listaPontos[(parseInt(objectListaPontos.getValue()) - 1)].z;
				
//				for (var i = 0; i < scope.dom.childNodes.length; i++) {
//					if (scope.dom.childNodes[i].className == 'PontoAtual') {
//						scope.dom.childNodes[i].childNodes[1].value = scope.item.pontos.x;
//						scope.dom.childNodes[i].childNodes[3].value = scope.item.pontos.y;
//						scope.dom.childNodes[i].childNodes[5].value = scope.item.pontos.z;
//					}
//				}				
				
				objectPontoX.setValue(scope.item.pontos.x);
				objectPontoY.setValue(scope.item.pontos.y);
				objectPontoZ.setValue(scope.item.pontos.z);
			}
			
			if	(scope.item.listaPontos !== undefined && (item.id == EIdsItens.SPLINE)) {
				if (scope.item.listaPontos[0].x != parseInt(objectPonto1X.getValue()) || scope.item.listaPontos[0].y != parseInt(objectPonto1Y.getValue()) || scope.item.listaPontos[0].z != parseInt(objectPonto1Z.getValue())) {
					scope.item.listaPontos[0].x = parseInt(objectPonto1X.getValue());
					scope.item.listaPontos[0].y = parseInt(objectPonto1Y.getValue());
					scope.item.listaPontos[0].z = parseInt(objectPonto1Z.getValue());
				}
				
				if (scope.item.listaPontos[1].x != parseInt(objectPonto2X.getValue()) || scope.item.listaPontos[1].y != parseInt(objectPonto2Y.getValue()) || scope.item.listaPontos[1].z != parseInt(objectPonto2Z.getValue())) {
					scope.item.listaPontos[1].x = parseInt(objectPonto2X.getValue());
					scope.item.listaPontos[1].y = parseInt(objectPonto2Y.getValue());
					scope.item.listaPontos[1].z = parseInt(objectPonto2Z.getValue());
				}
				
				if (scope.item.listaPontos[2].x != parseInt(objectPonto3X.getValue()) || scope.item.listaPontos[2].y != parseInt(objectPonto3Y.getValue()) || scope.item.listaPontos[2].z != parseInt(objectPonto3Z.getValue())) {
					scope.item.listaPontos[2].x = parseInt(objectPonto3X.getValue());
					scope.item.listaPontos[2].y = parseInt(objectPonto3Y.getValue());
					scope.item.listaPontos[2].z = parseInt(objectPonto3Z.getValue());
				}
				
				if (scope.item.listaPontos[3].x != parseInt(objectPonto4X.getValue()) || scope.item.listaPontos[3].y != parseInt(objectPonto4Y.getValue()) || scope.item.listaPontos[3].z != parseInt(objectPonto4Z.getValue())) {
					scope.item.listaPontos[3].x = parseInt(objectPonto4X.getValue());
					scope.item.listaPontos[3].y = parseInt(objectPonto4Y.getValue());
					scope.item.listaPontos[3].z = parseInt(objectPonto4Z.getValue());
				}
			}
			
			if (scope.item.poliedro !== undefined) {						
				item.poliedro = objectPoliedro.getValue();
				
				if (item.poliedro == true) {
					objectColorPoliedro.dom.disabled = false;
					if	(item.corPoliedro !== undefined) {					
						item.corPoliedro.setHex(objectColorPoliedro.getHexValue());					
					}
				}
				else {
					if (objectColorPoliedro != undefined) {
						objectColorPoliedro.dom.disabled = true;
					}
				}
			}
	
			if	(item.valorXYZ !== undefined ) {
			
				item.valorXYZ.x = objectValueX.getValue();
				item.valorXYZ.y = objectValueY.getValue();
				item.valorXYZ.z = objectValueZ.getValue();
				
			}
			
			if	(item.posicao !== undefined ) {
			
				item.posicao.x = objectPosicaoX.getValue();
				item.posicao.y = objectPosicaoY.getValue();
				item.posicao.z = objectPosicaoZ.getValue();
				
			}
			
			if	(item.lookAt !== undefined ) {
			
				item.lookAt.x = objectLookAtX.getValue();
				item.lookAt.y = objectLookAtY.getValue();
				item.lookAt.z = objectLookAtZ.getValue();
				
			}
			
			if	(item.near !== undefined ) {
			
				item.near = objectNear.getValue();
				
			}
			
			if	(item.far !== undefined ) {
			
				item.far = objectFar.getValue();
				
			}
			
			if	(item.fov !== undefined ) {
			
				item.fov = objectFov.getValue();
				
			}
			
			if	(item.propriedadeCor !== undefined ) {
			
				item.propriedadeCor.setHex( objectColor.getHexValue() );
				
			}
			
			if	(item.corLimpar !== undefined ) {
			
				item.corLimpar.setHex( objectCorLimpar.getHexValue() );
				
			}
			
			if ( item.textura !== undefined ) {
				
				var textura;
				
				if	( imagemLocal.getValue() !== 'nenhum' ) {
					var imagem = imagemLocal.getValue();
					textura = THREE.ImageUtils.loadTexture( imagem );
					textura.needsUpdate = true;
					textura.id = CG.getIdListaDeTexturas( imagem );
					textura.sourceFile = imagem;
				} else {
					textura = materialMap.getValue();
				}
				
				item.textura = textura;
				item.usarTextura = materialMapEnabled.getValue() === true;		
	
			}
			
			if ( item.changeVisibility !== undefined && item.changeVisibility ) {
		
				item.visible = materialVisibleEnabled.getValue();			
	
			}	
			
			item.update();
			//updateUI();
			
			if	( scope.item.matrix !== undefined ) {
			
				updateMatrix();
				
			}
	
		}
	//}	
		function updateUI() {
			for (var i = 0; i < scope.dom.childNodes.length; i++) {
				
			}
			if (scope.dom.childNodes[4].className == 'Teste') {
				scope.dom.childNodes[4].childNodes[1].value = 999;
			}
		}
}

PainelPropriedades.prototype = Object.create( UI.Panel.prototype );

