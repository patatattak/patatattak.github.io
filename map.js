function docWheel(e){
	if(e.deltaY < 0){    
		zoomIn();
	}
	else{    
		zoomOut();
	}	
}

function zoomIn(){	
	if(state == "nav"){
		let center = {
			x: currentViewBox.left + currentViewBox.width / 2,
			y: currentViewBox.top + currentViewBox.height / 2
		};
		let rect = svgMap.getBoundingClientRect();
		let ratio = rect.width / rect.height;
		console.log(ratio);
		let newWidth = currentViewBox.width - currentViewBox.width * zoomStrength;
		//let newHeight = currentViewBox.height - currentViewBox.height * zoomStrength;
		
		
		if(newWidth < 0.1 * fullViewBox.width){
			newWidth = 0.1 * fullViewBox.width;
		}
		let newHeight = newWidth / ratio;
		if(newHeight < 0.1 * fullViewBox.height){
			newHeight = 0.1 * fullViewBox.height;
			newWidth = newHeight * ratio;
		}
		if(newHeight > 670){
			newHeight = 670;
		}
		currentViewBox = {
			left: center.x - newWidth / 2,
			top: center.y - newHeight / 2,
			width: newWidth,
			height: newHeight
		};			
		verifyViewBoxMove();
		console.log(getViewBoxString());
		gsap.to(svgMap, {
			duration: 0.3,
			attr: {
				viewBox: getViewBoxString()
			},
			ease: "power2.inOut"
		});	
	}
}

function zoomOut(){
	if(state == "nav"){
		let center = {
			x: currentViewBox.left + currentViewBox.width / 2,
			y: currentViewBox.top + currentViewBox.height / 2
		};
		let rect = svgMap.getBoundingClientRect();
		let ratio = rect.width / rect.height;
		console.log(ratio);
		let newWidth = currentViewBox.width + currentViewBox.width * zoomStrength;
		let newHeight = newWidth / ratio;
		if(newWidth > fullViewBox.width){
			newWidth = fullViewBox.width;
			newHeight = fullViewBox.height;
		}
		
		
		if(newHeight > fullViewBox.height){
			newHeight = fullViewBox.height;
			newWidth = fullViewBox.width;
		}
		currentViewBox = {
			left: center.x - newWidth / 2,
			top: center.y - newHeight / 2,
			width: newWidth,
			height: newHeight
		};
		verifyViewBoxMove();
		console.log(getViewBoxString());
		
		gsap.to(svgMap, {
			duration: 0.3,
			attr: {
				viewBox: getViewBoxString()
			},
			ease: "power2.inOut"
		});		
	}
}	

function verifyViewBoxMove(){
	if(currentViewBox.left < fullViewBox.left){
		currentViewBox.left = fullViewBox.left;
	}
	if(currentViewBox.top < fullViewBox.top){
		currentViewBox.top = fullViewBox.top;
	}
	if(currentViewBox.left > fullViewBox.left + fullViewBox.width - currentViewBox.width){
		currentViewBox.left = fullViewBox.left + fullViewBox.width - currentViewBox.width;
	}
	if(currentViewBox.top > fullViewBox.top + fullViewBox.height - currentViewBox.height){
		currentViewBox.top = fullViewBox.top + fullViewBox.height - currentViewBox.height;
	}
}
