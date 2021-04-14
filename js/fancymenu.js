/* Copyright (C) 2007 - 2009 YOOtheme GmbH */

var YOOFancyMenu = new Class({
	initialize: function(menu, options) {	
		this.setOptions({
			transition: Fx.Transitions.sineInOut,
			duration: 500,
			wait: false,
			onClick: Class.empty,
			opacity: 1,
			mode: 'move',
			slideOffset: 30,
			colorSelector: ['red', 'pink', 'blue', 'green', 'orange', 'yellow', 'lilac', 'turquoise'],
			itemSelector: 'li.level1',
			activeSelector: 'li.active'
		}, options);

		this.menu = $(menu), this.current = this.menu.getElement(this.options.activeSelector);
		this.li   = [];
		this.div  = [];
				
		this.menu.getElements(this.options.itemSelector).each(function(item, i){
			this.createBackground(item, i);
			item.addEvent('click', function(event){ this.clickItem(event, item); }.bind(this));
			item.addEvent('mouseenter', function(){ this.mouseenterItem(item, i); }.bind(this));
			if (this.options.mode == 'move') { 
				item.addEvent('mouseleave', function(){ this.mouseleaveItem(this.current, i); }.bind(this));
			} else {
				item.addEvent('mouseleave', function(){ this.mouseleaveItem(item, i); }.bind(this));
			}
		}.bind(this));
			
		if (this.options.mode == 'move') {
			if (this.current) {
				this.setCurrent(this.current)
			} else { 
				var first = this.menu.getElement('li');
				first.addClass('active');
				first.addClass('current');
				this.setCurrent(first);
			};
		}	
	},

	createBackground: function(item, i) {
		if (this.options.mode == 'move' && i != 0) return;

		var css = 'fancy ' + 'bg' + (i+1);
		this.options.colorSelector.each(function(col, i){
			if (item.hasClass(col)) {
				css += ' bg-' + col;
			}
		});
		
		this.div[i] = new Element('div', {'class': 'fancy-1'}).adopt(new Element('div', {'class': 'fancy-2'}).adopt(new Element('div', {'class': 'fancy-3'})));
		this.div[i].fx = this.div[i].effects(this.options);
		this.li[i]  = new Element('li', {'class': css}).adopt(this.div[i]).injectInside(this.menu);
		this.li[i].fx  = this.li[i].effects(this.options);
	},
	
	setCurrent: function(item) {
		this.li[0].setStyles({
			'left': item.offsetLeft,
			'width': item.offsetWidth,
			'visibility': 'visible',
			'opacity': this.options.opacity
		});
		this.current = item;
	},

	clickItem: function(event, item) {
		if (!this.current) this.setCurrent(item);
		this.current = item;
		this.options.onClick(new Event(event), item);
	},
	
	mouseenterItem: function(item, i) {
		switch (this.options.mode) {
			case 'fade':
				this.fadeFx(item, i, true);
		  		break;
			case 'slide':
				this.slideFx(item, i, true);
		  		break;    
			default:
				this.moveFx(item, 0);
		}		
	},

	mouseleaveItem: function(item, i) {
		switch (this.options.mode) {
			case 'fade':
				this.fadeFx(item, i, false);
		  		break;
			case 'slide':
				this.slideFx(item, i, false);
		  		break;    
			default:
				this.moveFx(item, 0);
		}		
	},

	moveFx: function(item, i) {
		if(!this.current) return;
		this.li[i].fx.custom({
			'left': [this.li[i].offsetLeft, item.offsetLeft],
			'width': [this.li[i].offsetWidth, item.offsetWidth]
		});		
	},

	fadeFx: function(item, i, show) {
		if (show) {
			this.li[i].fx.setOptions(this.options);
			this.li[i].fx.set({
				'left': item.offsetLeft,
				'width': item.offsetWidth
			});
			this.li[i].fx.custom({
				'opacity': [0, 1]
			});		
		} else {
			var dur = this.options.duration * 2;
			this.li[i].fx.setOptions({duration: dur});
			this.li[i].fx.custom({
				'opacity': [1, 0]
			});		
		}
	},

	slideFx: function(item, i, show) {
		var offset = this.options.slideOffset;
		if (show) {
			this.li[i].fx.set({
				'opacity': 1,
				'left': item.offsetLeft,
				'width': item.offsetWidth
			});
			this.div[i].fx.set({
				'margin-top': offset
			});
			this.div[i].fx.custom({
				'margin-top': [offset, 0]
			});
		} else {
			this.div[i].fx.set({
				'margin-top': 0
			});
			this.div[i].fx.custom({
				'margin-top': [0, offset]
			});
		}
	}
});

YOOFancyMenu.implement(new Options);