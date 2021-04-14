/* Copyright (C) 2007 - 2009 YOOtheme GmbH */

var YOOTools = {
		
	start: function() {

		/* Match height of div tags */
		YOOTools.setDivHeight();
		
		/* Accordion menu */
		new YOOAccordionMenu('div#middle ul.menu li.toggler', 'ul.accordion', { accordion: 'slide' });

		/* Dropdown menu */
		new YOODropdownMenu('div#menu li.parent', { mode: 'height', transition: Fx.Transitions.Expo.easeOut });

		/* Morph: main menu - level1 (tab) */
		var menuEnter = { 'color': '#dc3200' };
		var menuLeave = { 'color': '#323232' };

		switch (YtSettings.color) {
			case 'yellow':
				menuEnter = { 'color': '#bb8a01' };
				break;
			case 'pink':
				menuEnter = { 'color': '#834b94' };
				break;
			case 'turquoise':
				menuEnter = { 'color': '#3c8b9c' };
				break;
			case 'mossgreen':
				menuEnter = { 'color': '#829333' };
				break;
			case 'green':
				menuEnter = { 'color': '#6a9939' };
				break;
			case 'blue':
				menuEnter = { 'color': '#2f66a7' };
				break;
		}

		new YOOMorph('div#menu li.level1', menuEnter, menuLeave,
			{ transition: Fx.Transitions.linear, duration: 0, ignoreClass: 'active' },
			{ transition: Fx.Transitions.sineIn, duration: 300 }, 'a.level1');

		new YOOMorph('div#menu li.level1', menuEnter, menuLeave,
			{ transition: Fx.Transitions.linear, duration: 0, ignoreClass: 'active'},
			{ transition: Fx.Transitions.sineIn, duration: 300 }, 'span.sub');

		/* Morph: main menu - level2 and deeper (color) */
		var selector = 'div#menu li.level2 a, div#menu li.level2 span.separator';
		/* fix for Opera because Mootools 1.1 is not compatible with latest Opera version */
		if (window.opera) { selector = 'div#menu li.item1 li.level2 a, div#menu li.item1 li.level2 span.separator, div#menu li.item2 li.level2 a, div#menu li.item2 li.level2 span.separator, div#menu li.item3 li.level2 a, div#menu li.item3 li.level2 span.separator, div#menu li.item4 li.level2 a, div#menu li.item4 li.level2 span.separator, div#menu li.item5 li.level2 a, div#menu li.item5 li.level2 span.separator, div#menu li.item6 li.level2 a, div#menu li.item6 li.level2 span.separator, div#menu li.item7 li.level2 a, div#menu li.item7 li.level2 span.separator'; }
		
		new YOOMorph(selector, menuEnter, menuLeave,
			{ transition: Fx.Transitions.linear, duration: 0, ignoreClass: 'active' },
			{ transition: Fx.Transitions.sineIn, duration: 300 });

		/* Morph: sub menu - level1 */
		new YOOMorph('div#middle ul.menu a, div#middle ul.menu span.separator', menuEnter, menuLeave,
			{ transition: Fx.Transitions.expoOut, duration: 0, ignoreClass: 'active' },
			{ transition: Fx.Transitions.sineIn, duration: 300 });

		/* Smoothscroll */
		new SmoothScroll({ duration: 500, transition: Fx.Transitions.Expo.easeOut });
	},

	/* Include script */
	include: function(library) {
		$ES('script').each(function(s, i){
			var src  = s.getProperty('src');
			var path = '';
			if (src && src.match(/yoo_tools\.js(\?.*)?$/)) path = src.replace(/yoo_tools\.js(\?.*)?$/,'');
			if (src && src.match(/template\.js\.php(\?.*)?$/)) path = src.replace(/template\.js\.php(\?.*)?$/,'');
			if (path != '') document.write('<script language="javascript" src="' + path + library + '" type="text/javascript"></script>');
		});
	},

	/* Match height of div tags */
	setDivHeight: function() {
		YOOBase.matchDivHeight('div.headerbox div.deepest', 0, 40);
		YOOBase.matchDivHeight('div.topbox div.deepest', 0, 40);
		YOOBase.matchDivHeight('div.bottombox div.deepest', 0, 40);
		YOOBase.matchDivHeight('div.maintopbox div.deepest', 0, 40);
		YOOBase.matchDivHeight('div.mainbottombox div.deepest', 0, 40);
		YOOBase.matchDivHeight('div.contenttopbox div.deepest', 0, 40);
		YOOBase.matchDivHeight('div.contentbottombox div.deepest', 0, 40);
	}

};

/* Add functions on window load */
window.addEvent('domready', YOOTools.start);

/* Load IE6 fix */
if (window.ie6) {
	YOOTools.include('addons/ie6fix.js');
	YOOTools.include('addons/ie6png.js');
	YOOTools.include('yoo_ie6fix.js');
}