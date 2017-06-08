var processor = {
	fixViewport: function (type, width) {
	    var docEl = document.documentElement;
	    var metaEl = document.querySelector('meta[name="viewport"]');
	    var clientWidth = Math.min(docEl.clientWidth, docEl.clientHeight);
	    var scale, content;
	    
	    switch (type) {
	        case 'fixed':
	            scale = clientWidth / width;
	            content = 'width=' + width + ',initial-scale=' + scale + ',maximum-scale=' + scale +
	                ',minimum-scale=' + scale;
	            break;
	        case 'rem':
	            var dpr = window.devicePixelRatio || 1;
	            docEl.setAttribute('data-dpr', dpr);
	            docEl.style.fontSize = 100 * (clientWidth * dpr / width) + "px";

	            scale = 1 / dpr;
	            content = 'width=' + clientWidth * dpr + ',initial-scale=' + scale + ',maximum-scale=' + scale +
	                ', minimum-scale=' + scale;
	            break;
	    }
	    
	    metaEl.setAttribute('content', content);
	},
	locktip: function(){
		var _this = this;
		$('#locktip').on('click', function(){
			$(this).remove();
			_this.initMusic();
		})
	},
	sharetip: function(){
		$('#shareBtn').on('click', function(e){
			e.stopPropagation();
			$('#sharetip').addClass('active');
		});
		$('#sharetip').on('click', function(e){
			e.stopPropagation();
			$(this).removeClass('active');
		})
	},
	initPage: function(){
		var _this = this;
		_this.locktip();
		_this.sharetip();

		var w = $(window).width(),
		    h = $(window).height(),
			$container = $('#container'),
			$scene = $('#scene'),
			$last = $('#last'),
		    pageH = $scene.height();
		$container.css({
		    width: h,
		    height: w,
		    transformOrigin: w/2+'px'+' '+w/2+'px'
		})
		$last.css({
			width: h,
			height: w,
			left: pageH-h
		})
		//开始出现的位置
		var bird3 = $('.bird3').position().top;
		var bird4 = $('.bird4').position().top;
		var bird5 = $('.bird5').position().top;
		var bird6 = $('.bird6').position().top;
		var bird7 = $('.bird7').position().top;
		var bird8 = $('.bird8').position().top;
		var bird9 = $('.bird9').position().top;
		var bird10 = $('.bird10').position().top;
		var bird11 = $('.bird11').position().top;
		var people1 = $('.people1').position().top;
		var people2 = $('.people2').position().top;
		var people3 = $('.people3').position().top;
		var people4 = $('.people4').position().top;
		var people5 = $('.people5').position().top;


		var startY, distance, offsetY = 0;
		$container.on('touchstart', function(e){
			var touch = e.touches[0];
			startY = Number(touch.pageY)-offsetY;
		})
		$container.on('touchmove', function(e){
			e.preventDefault();
			var touch = e.touches[0];
			var moveY = Number(touch.pageY);
			distance = moveY-startY;
			if(distance > 0){
				distance = 0;
			}
			if(distance < -(pageH-h)/2){
				distance = -(pageH-h)/2;
				$last.addClass('active');
			}
			$scene.css({
				'transform': 'translate3d('+distance*2+'px, 0, 0)'
			});

			//开始视觉差移动
			var absDistance = Math.abs(distance*2);
			var transX = function(pos){
				return absDistance-(pos-h);
			}

			if(absDistance > (bird3-h) && absDistance < bird3){
				$('.bird3').css({
					'transform': 'translate3d('+ transX(bird3) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird4-h) && absDistance < bird4){
				$('.bird4').css({
					'transform': 'translate3d('+ -transX(bird4) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird5-h) && absDistance < bird5){
				$('.bird5').css({
					'transform': 'translate3d('+ -transX(bird5) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird6-h) && absDistance < bird6){
				$('.bird6').css({
					'transform': 'translate3d('+ transX(bird6) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird7-h) && absDistance < bird7){
				$('.bird7').css({
					'transform': 'translate3d('+ -transX(bird7) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird8-h) && absDistance < bird8){
				$('.bird8').css({
					'transform': 'translate3d('+ -transX(bird8) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird9-h) && absDistance < bird9){
				$('.bird9').css({
					'transform': 'translate3d('+ transX(bird9) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird10-h) && absDistance < bird10){
				$('.bird10').css({
					'transform': 'translate3d('+ transX(bird10) +'%, 0, 0)'
				})
			}
			if(absDistance > (bird11-h) && absDistance < bird11){
				$('.bird11').css({
					'transform': 'translate3d('+ -transX(bird11) +'%, 0, 0)'
				})
			}
			if(absDistance > (people1-h) && absDistance < people1){
				$('.people1').css({
					'transform': 'translate3d('+ -transX(people1)/10 +'%, 0, 0)'
				})
			}
			if(absDistance > (people2-h) && absDistance < people2){
				$('.people2').css({
					'transform': 'translate3d('+ -transX(people2)/15 +'%, 0, 0)'
				})
			}
			if(absDistance > (people3-h) && absDistance < people3){
				$('.people3').css({
					'transform': 'translate3d(0, '+ transX(people3)/15 +'%, 0)'
				})
			}
			if(absDistance > (people4-h) && absDistance < people4){
				$('.people4').css({
					'transform': 'translate3d('+ -transX(people4)/10 +'%, 0, 0)'
				})
			}
			if(absDistance > (people5-h) && absDistance < people5){
				$('.people5').css({
					'transform': 'translate3d('+ -transX(people5)/15 +'%, 0, 0)'
				})
			}
		})
		$container.on('touchend', function(){
			offsetY = distance;
		})
	},
	initMusic: function(){
		var $audio = $('#audio');
		var $audioParent = $audio.parent();
		$audio[0].play();
		$audioParent.on('click', function(){
		    if(!$audio[0].paused){
		        $audio[0].pause();
		        $audioParent.removeClass('on');
		    }else{
		        $audio[0].play();
		        $audioParent.addClass('on');
		    }
		})
	}
}

$(function(){
	processor.fixViewport('fixed', 640);
	processor.initPage();
})