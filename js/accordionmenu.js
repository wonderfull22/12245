/* Copyright (C) 2007 - 2009 YOOtheme GmbH */

var YOOAccordionMenu = new Class({

	initialize: function(togglers, elements, options) {	
		this.setOptions({
			accordion: 'default'
		}, options);
		this.togs = togglers;
		this.elms = elements;
		
	    switch(this.options.accordion) {
			case 'slide':
				this.createSlide();
				break;
			
			default:
				this.createDefault();
   		}
	},
	
	createDefault: function() {
		var options = {};

		if (!$defined(this.options.display) && !$defined(this.options.show)) {
			options = { show: -1 };
		}
		$ES(this.togs).each(function(tog, i) {
			if (tog.hasClass('active')) options = { show: i };
		}.bind(this));	
		
		var accordionMenu = new Fx.Accordion(this.togs, this.elms, $extend(this.options, options));
	},

	createSlide: function() {
		$ES(this.togs).each(function(tog, i) {
			var span = tog.getElement('span');
			var ul = tog.getElement(this.elms);
			var fx = new Fx.Slide(ul, { transition: Fx.Transitions.linear, duration: 250 });

			if (!(tog.hasClass('active') || this.options.display == 'all' || this.options.display == i)) {
				fx.hide();
			}
			
			span.addEvent('click', function(){
				fx.toggle();
			});
		}.bind(this));	
	}
	
});

YOOAccordionMenu.implement(new Options);