// ==UserScript==
// @id             iitc-plugin-bring-portals-to-front@Zaso
// @name           IITC plugin: Bring Portals To Front
// @category       Tweaks
// @version        0.0.2.20200110.190101
// @namespace      http://www.giacintogarcea.com/ingress/items/
// @updateURL      https://github.com/MysticJay/ZasoItems.CE/raw/master/bring-portals-to-front.meta.js
// @downloadURL    https://github.com/MysticJay/ZasoItems.CE/raw/master/bring-portals-to-front.user.js
// @description    Bring the portals layers to front. Prevents that fields and drawn items cover them, making them unclickable.
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==

function wrapper(){
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function(){};

// PLUGIN START ////////////////////////////////////////////////////////
// history
// 0.0.2 headers changed, ready for IITC-CE
// 0.0.1 Original Script

	// use own namespace for plugin
	window.plugin.bringPortalsToFront = function(){};

    window.plugin.bringPortalsToFront.bringTop = function(){
        window.Render.prototype.bringPortalsToFront();
    }

    window.plugin.bringPortalsToFront.drawToolsHook = function(data){
        if(data.event === 'layerCreated' || data.event === 'import'){
            window.plugin.bringPortalsToFront.bringTop();
        }
    }

//*****************************

	var setup = function(){
		window.map.on('overlayadd', function(e){
			if(e.name === 'Fields' || e.name === 'Drawn Items'){
                window.plugin.bringPortalsToFront.bringTop();
			}
		});

        window.pluginCreateHook('pluginDrawTools');
        window.addHook('pluginDrawTools', window.plugin.bringPortalsToFront.drawToolsHook);
	};

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function'){
	setup();
}else{
	if(window.bootPlugins)
		window.bootPlugins.push(setup);
	else
		window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
