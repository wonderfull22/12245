/* Copyright (C) 2007 - 2009 YOOtheme GmbH */

var YOODropdownMenu = new Class({
	
	initialize: function(element, options) {
		this.setOptions({
			mode: 'default',
			duration: 600,
			transition: Fx.Transitions.linear,
			wait: false
		}, options);

		var reset = {'width': 0, 'height': 0, 'opacity': 0};

		switch(this.options.mode) {
			case 'width':
				reset = {'width': 0, 'opacity': 0};
		  		break;    
			case 'height':
				reset = {'height': 0, 'opacity': 0};
				break;
		}

		$$(element).each(function(li) {
			var ul = li.getElement('ul');
			if (ul) {
				var fx = new Fx.Styles(ul, this.options);
				var styles = ul.getStyles('width','height','opacity');
				ul.setStyles(reset);
				li.addEvents({
					mouseenter: function() {
						var parent = li.getParent();
						if (parent.getStyle('overflow') == 'hidden') parent.setStyle('overflow', 'visible');
						fx.element.setStyle('overflow', 'hidden');
						fx.start(styles);
					},
					mouseleave: function() {
						fx.stop();
						ul.setStyles(reset);	
					}
				});
			}     
		}.bind(this));
	}

});

YOODropdownMenu.implement(new Options);