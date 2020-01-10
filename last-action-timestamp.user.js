// ==UserScript==
// @id             iitc-plugin-last-action-timestamp@Zaso
// @name           IITC plugin: Last Action Timestamp
// @category       Info
// @version        0.0.3.20200110.190101
// @namespace      http://www.giacintogarcea.com/ingress/items/
// @updateURL      https://github.com/MysticJay/ZasoItems.CE/raw/master/last-action-timestamp.meta.js
// @downloadURL    https://github.com/MysticJay/ZasoItems.CE/raw/master/last-action-timestamp.user.js
// @description    Estimate the portal decaying.
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==

function wrapper(){
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function(){};

// PLUGIN START ////////////////////////////////////////////////////////
// History
// 0.0.3 Headers changed. Ready for IITC-CE
// 0.0.2 Original sript


	// use own namespace for plugin
	window.plugin.lastAction = function() {};


	window.plugin.lastAction.convertTimestamp = function(timestamp){
		var dt = window.unixTimeToDateTimeString(timestamp, true);
		return dt;
	}

	window.plugin.lastAction.appendDetails = function(data){
		var guid = window.selectedPortal;
		var p = window.portals[guid];
		var t = p.options.timestamp;
		var dt = window.plugin.lastAction.convertTimestamp(t);

		if(dt !== undefined && dt !== null){
			dt = dt.slice(0, -4);
			var helpTxt = 'The action is a recharge, deploy, upgrade, install a mod, link, fire, expires, but not hack or get xm';
			var html = '<span style="cursor:help;" title="'+helpTxt+'">Last action</span>: <b>'+dt+'</b>';

			$('#portaldetails .linkdetails').before('<div class="lastAction">'+html+'</div>');
		}
	}

	//---------------------------------------------------------------------------------------
	// Append the stylesheet
	//---------------------------------------------------------------------------------------
	window.plugin.lastAction.setupCSS = function(){
		$('<style>').prop('type', 'text/css').html(''
			+'.lastAction{text-align:center;padding:2px 0 3px;border:1px solid #20A8B1;border-width:1px 0;color:lightgrey;}'
			+'.lastAction b{color:#ffc000;}'
		).appendTo('head');
	}

	var setup = function() {
		window.plugin.lastAction.setupCSS();
		window.addHook('portalDetailsUpdated', window.plugin.lastAction.appendDetails);
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