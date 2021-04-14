/* Copyright (C) 2007 - 2009 YOOtheme GmbH */

var YOOBase = {

	/* Match height of div tags */		
	matchDivHeight: function(selector, minWidth) {
		var maxHeight = 0;
		var matchDivs = [];
		var selectors = selector.split(" ");
		var elements  = selectors.shift();
		var script    = '';

		selectors.each(function(el, i){
			script += '.getElement("' +  el + '")';
		});
		
		$ES(elements).each(function(element, i){
			eval('matchDivs.push(element' + script + ');');
		});

		matchDivs.each(function(div, i){
			if (!$chk(div)) return;
			var divHeight, divPadding;
			if (div.offsetHeight) {
				divHeight = div.offsetHeight;
				divPadding = 0;
				divPadding += div.getStyle('padding-top').toInt();
				divPadding += div.getStyle('padding-bottom').toInt();
				divHeight -= divPadding;
				divBorder = 0;
				divBorder += div.getStyle('border-top-width').toInt();
				divBorder += div.getStyle('border-bottom-width').toInt();
				divHeight -= divBorder;
			} else if (div.style.pixelHeight) {
				divHeight = div.style.pixelHeight;
			}
			maxHeight = Math.max(maxHeight, divHeight);
		});

		if (minWidth != undefined) {
			maxHeight = Math.max(maxHeight, minWidth);
		}

		matchDivs.each(function(div, i){
			if (!$chk(div)) return;
			if(window.ie6) {
				/* use height style for IE6 compatibility */
				div.setStyle('height', maxHeight + 'px')	
			} else {
				div.setStyle('min-height', maxHeight + 'px')					
			}
		});
	}

};

var YOOMorph = new Class({

	initialize: function(element, enter, leave, enterFx, leaveFx, elementFx) {	
		this.setOptions({
			duration: 500,
			transition: Fx.Transitions.expoOut,
			wait: false,
			ignoreClass: ''
		}, enterFx);
		
		var options = this.options;
		
		$$(element).each(function(el, i){
			var elfx = el;
			if (elementFx) {
				var elms = el.getElementsBySelector(elementFx);
				if (elms.length > 0) { elfx = elms[0]; }
			}
			var fx = new Fx.Styles(elfx, options);

			if (!($chk(options.ignoreClass) && el.hasClass(options.ignoreClass))) {
				el.addEvent('mouseenter', function(e){
					fx.setOptions(options, enterFx).start(enter);
				});
				el.addEvent('mouseleave', function(e){
					fx.setOptions(options, leaveFx).start(leave);
				});
			}
		});
	}

});

YOOMorph.implement(new Options);

var YOOBackgroundFx = new Class({

	initialize: function(options) {	
		this.setOptions({
			transition: Fx.Transitions.linear,
			duration: 9000,
			wait: false,
			colors: ['#FFFFFF', '#999999']
		}, options);

		var body   = new Element(document.body);
		var fx     = body.effects(this.options);
		var index  = 0;
		var colors = this.options.colors;
		var timer  = animate.periodical(this.options.duration * 2);
		
		animate();
		
		function animate() {
			fx.start({
				'background-color': colors[index]
			});
			if (index + 1 >= colors.length) {
				index = 0;
			} else {
				index++;
			};
		}
	}

});

YOOBackgroundFx.implement(new Options);