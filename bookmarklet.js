(function(window, document){

/**
 * LazyLoad — https://github.com/rgrove/lazyload/
 * 
 * Copyright (c) 2010 Ryan Grove <ryan@wonko.com>
 * All rights reserved.
 */
LazyLoad=function(){function r(c,b){var a=h.createElement(c),e;for(e in b)b.hasOwnProperty(e)&&a.setAttribute(e,b[e]);return a}function k(c){var b=i[c],a,e;if(b){a=b.callback;e=b.urls;e.shift();l=0;if(!e.length){a&&a.call(b.context,b.obj);i[c]=null;j[c].length&&m(c)}}}function w(){if(!d){var c=navigator.userAgent,b=parseFloat,a;d={async:h.createElement("script").async===true,gecko:0,ie:0,opera:0,webkit:0};if((a=c.match(/AppleWebKit\/(\S*)/))&&a[1])d.webkit=b(a[1]);else if((a=c.match(/MSIE\s([^;]*)/))&&
a[1])d.ie=b(a[1]);else if(/Gecko\/(\S*)/.test(c)){d.gecko=1;if((a=c.match(/rv:([^\s\)]*)/))&&a[1])d.gecko=b(a[1])}else if(a=c.match(/Opera\/(\S*)/))d.opera=b(a[1])}}function m(c,b,a,e,s){var n=function(){k(c)},o=c==="css",f,g,p;w();if(b){b=Object.prototype.toString.call(b)==="[object Array]"?b:[b];if(o||d.gecko&&(d.async||d.gecko<2)||d.opera)j[c].push({urls:[].concat(b),callback:a,obj:e,context:s});else{f=0;for(g=b.length;f<g;++f)j[c].push({urls:[b[f]],callback:f===g-1?a:null,obj:e,context:s})}}if(!(i[c]||
!(p=i[c]=j[c].shift()))){q=q||h.head||h.getElementsByTagName("head")[0];b=p.urls;f=0;for(g=b.length;f<g;++f){a=b[f];if(o)a=r("link",{charset:"utf-8","class":"lazyload",href:a,rel:"stylesheet",type:"text/css"});else{a=r("script",{charset:"utf-8","class":"lazyload",src:a});if(d.async)a.async=false}if(d.ie)a.onreadystatechange=function(){var t=this.readyState;if(t==="loaded"||t==="complete"){this.onreadystatechange=null;n()}};else if(o&&(d.gecko||d.webkit))if(d.webkit){p.urls[f]=a.href;u()}else setTimeout(n,
50*g);else a.onload=a.onerror=n;q.appendChild(a)}}}function u(){var c=i.css,b;if(c){for(b=v.length;b&&--b;)if(v[b].href===c.urls[0]){k("css");break}l+=1;if(c)l<200?setTimeout(u,50):k("css")}}var h=document,d,q,i={},l=0,j={css:[],js:[]},v=h.styleSheets;return{css:function(c,b,a,e){m("css",c,b,a,e)},js:function(c,b,a,e){m("js",c,b,a,e)}}}();

LazyLoad.css('http://oddnut.com/yui3-grids-annotations/annotations.css', function(){
	LazyLoad.js('http://yui.yahooapis.com/3.3.0/build/yui/yui-min.js', init);
});

function init () {
	YUI().use('node', 'align-plugin', 'event-hover', 'collection', function(Y){
		
		var gridUnitClasses		= ['yui3-u', 'yui3-u-1', 'yui3-u-1-2', 'yui3-u-1-3', 'yui3-u-2-3', 'yui3-u-1-4', 'yui3-u-3-4', 'yui3-u-1-5', 'yui3-u-2-5', 'yui3-u-3-5', 'yui3-u-4-5', 'yui3-u-1-6', 'yui3-u-5-6', 'yui3-u-1-8', 'yui3-u-3-8', 'yui3-u-5-8', 'yui3-u-7-8', 'yui3-u-1-12', 'yui3-u-5-12', 'yui3-u-7-12', 'yui3-u-11-12', 'yui3-u-1-24', 'yui3-u-5-24', 'yui3-u-7-24', 'yui3-u-11-24', 'yui3-u-13-24', 'yui3-u-17-24', 'yui3-u-19-24', 'yui3-u-23-24'],
			gridUnitSelector	= '.' + gridUnitClasses.join(',.');
			gridUnitDescNode	= Y.Node.create('<div class="yui3-u-desc"></div>');
			
		gridUnitDescNode.plug(Y.Plugin.Align).hide().appendTo('body');
		
		Y.one('body').delegate('hover', function(e){
			
			var gridUnit = e.currentTarget.addClass('yui3-u-annotated'),
				gridClassName;
			
			gridClassName = Y.Array.find(gridUnit.get('className').split(' '), function(c){
				if (Y.Array.indexOf(gridUnitClasses, c) >= 0) {
					return c;
				}
			});
			
			gridUnitDescNode.set('text', '.' + gridClassName);
			gridUnitDescNode.show().align.to(gridUnit, 'tr', 'tr', true);
			
		}, function(e){
		
			var gridUnit = e.currentTarget;
			
			function removeAnnotation () {
				gridUnitDescNode.hide();
				gridUnit.removeClass('yui3-u-annotated');
			}
			
			if (e.relatedTarget === gridUnitDescNode) {
				gridUnitDescNode.once('mouseleave', removeAnnotation);
			} else {
				removeAnnotation();
			}
		
		}, gridUnitSelector);
		
	});
}

}(window, document));
