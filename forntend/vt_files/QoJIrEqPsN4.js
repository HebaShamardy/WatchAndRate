/*!CK:1585707618!*//*1454902804,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["VEH5O"]); }

__d('BrowseGroupResult',['Event'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(){}i.toggle=function(j,k,l){h.listen(k,'click',function(){l.toggle();j.hideFlyout();});};f.exports=i;},null);
__d('legacy:dom',['DOM'],function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();b.DOM=c('DOM');},3);
__d('DetailedSearchFilterPage',['$','Arbiter','DetailedSearchOptions','DOM','Input','Run','ge'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o={setQuery:function(p){if(!j.isFacebar)l.setValue(h("q"),p);},setFilter:function(p,q){var r=k.create('input',{type:'hidden',name:'type',value:p});k.insertAfter(n('q'),r);var s;if(p==='web'){s=k.create('input',{type:'hidden',name:'form',value:q});k.insertAfter(n('q'),s);}m.onLeave(function(){k.remove(r);if(s)k.remove(s);});i.inform('search/typeahead/updateFilter',{filter_type:p},i.BEHAVIOR_STATE);},setShowWebResults:function(p,q){this.setFilter('web',q);var r=h('searchBarClickRef').action;h('searchBarClickRef').action=p;var s=i.subscribe('page_transition',function(t,u){h('searchBarClickRef').action=r;i.unsubscribe(s);},i.SUBSCRIBE_NEW);i.inform('search/typeahead/updateSeeMoreEndpoint',p,i.BEHAVIOR_STATE);}};f.exports=o;},null);
__d("XPartnersPortalMobileSettingsController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/mobile\/settings\/",{carrier_id:{type:"Int"},partner_id:{type:"Int"},current_tab:{type:"String"}});},null);
__d('SettingsController',['Arbiter','Event','Banzai','Bootloader','CSS','DOM','DOMQuery','PageTransitions','Parent','Style','URI','XPartnersPortalMobileSettingsController'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){if(c.__markCompiled)c.__markCompiled();var t=null,u=null;function v(){return new r(window.location.href).getQueryData().tab||'account';}function w(){return new r(window.location.href).getQueryData().section;}function x(){return new r(window.location).getQueryData().id;}function y(){return new r(window.location).getQueryData().partner_id;}function z(ha){return new r(ha).addQueryData({view:null});}function aa(ha){return p.byClass(ha,'fbSettingsListItem');}function ba(ha){return p.byClass(ha,'fbSettingsListLink');}function ca(ha){return p.byClass(ha,'cancel');}function da(){return new r(window.location).getPath();}function ea(){return '/pages/edit/';}function fa(){return s.getURIBuilder().getURI().toString();}var ga={init:function(ha,ia,ja){this.extra_params=ja||{};i.listen(ha,'click',(function(ma){var na=ma.getTarget();if(ca(na))this.closeEditor();}).bind(this));o.registerHandler((function(ma){var na=ma.getQueryData();if(ma.getPath()==da()&&na.tab===v()&&typeof na.view!=='undefined'){o.transitionComplete();if(na.section){this._currentSection=na.section;h.inform('section_toggle',{action:'expand',section:this._currentSection});}return true;}if(na.tab!=v()||ma.getPath()!==da()){this._sectionArbiter&&this._sectionArbiter.unsubscribe();this._sectionArbiter=null;this._masherEventHandler&&this._masherEventHandler.remove();this._masherEventHandler=null;this._selectorEventHandler&&this._selectorEventHandler.remove();this._selectorEventHandler=null;if(ma.getPath()==='/settings'){j.post(this._banzaiRoute,{event:'settings_link',exit_point:na.tab+'_settings'});}else{var oa=ma.getPath();if(ma.getQueryData().audience_usered)oa='composer_link';j.post(this._banzaiRoute,{event:'exit_settings_page',exit_point:oa});}this._banzaiRoute=null;}}).bind(this));var ka=w();if(ka){var la=ia+':'+ka;this.scrollToActiveSection(la);}},scrollToActiveSection:function(ha){var ia=document.getElementById(ha);if(ia){ia.scrollIntoView();}else setTimeout((function(){this.scrollToActiveSection(ha);}).bind(this),250);},handleLinkClick:function(ha){if(t&&t.checkUnsaved())return false;if(u!==ha)u&&l.removeClass(u,'async_saving');u=ha;var ia=ha.getAttribute('data-meta'),ja=JSON.parse(ia);switch(ja.rel){case 'async':k.loadModules(["AsyncRequest"],function(ka){ka.bootstrap(ja.ajaxify,ha);});break;case 'dialog':k.loadModules(["AsyncDialog"],function(ka){ka.bootstrap(ja.ajaxify,ha,ja.rel);});break;default:throw new Error('SettingsController.handleLinkClick: Unexpected "rel".');}},updateErrors:function(ha,ia){if(t){t.hideErrors();t.showError(ha,ia);}},hideErrors:function(){t&&t.hideErrors();},getEditor:function(){return t;},setEditor:function(ha){if(!ha||!u||ha.contains(u))if(this.closeEditor()!==false){u&&o.go(z(u.href));u=null;(t=ha)&&ha.show();}},prepareAndReplaceEditor:function(ha){ha.prepare(t.container);t=ha;},prepareAndSetEditor:function(ha,ia,ja){var ka=aa(ha);ga.setEditor(ia.prepare(ka,ja));},closeEditor:function(){if(t&&t.hide()!==false){h.inform('section_toggle',{action:'collapse',section:this._currentSection});if(m.contains(document.body,t.container)){var ha=null,ia=da(),ja={tab:v()};if(ia==ea()){ja.id=x();}else if(ia==fa())ja.partner_id=y();for(var ka in this.extra_params)if(this.extra_params.hasOwnProperty(ka))ja[ka]=this.extra_params[ka];ha=new r(ia).setQueryData(ja);o.go(z(ha));}t=null;}return !t;},setPreviewForCurrent:function(ha){ga.setPreview(t.container,ha);},setPreview:function(ha,ia){var ja=m.find(aa(ha),'span.fbSettingsListItemContent');m.setContent(ja,ia);},closeAndAnimateEdited:function(){var ha=t.container;ga.closeEditor();ga.animateEditedListItem(ha);},animateEdited:function(ha){ga.animateEditedListItem(aa(ha));},animateEditedListItem:function(ha){k.loadModules(["Animation"],function(ia){var ja=m.find(ha,'span.fbSettingsListItemEdit'),ka=m.find(ha,'span.fbSettingsListItemSaved');l.hide(ja);l.show(ka);q.set(ja,'opacity',0);new ia(ba(ja)).from('background','#fff8bb').to('background','#fff').duration(1000).ease(ia.ease.begin).ondone(function(){l.removeClass(ha,'fbSettingsListItemEdited');q.set(this.obj,'background','');new ia(ka).to('color','#fff').duration(500).ease(ia.ease.begin).ondone(function(){l.hide(ka);q.set(ka,'color','');l.show(ja);new ia(ja).to('opacity',1).duration(500).ease(ia.ease.begin).go();}).go();}).go();});},registerSectionLogging:function(ha){this._banzaiRoute=ha;this._sectionArbiter=h.subscribe('section_toggle',(function(ia,ja){j.post(ha,{event:ja.section+'_'+ja.action});}).bind(this));},registerSelectorLogging:function(ha,ia,ja,ka,la){ha=ha.getInstance();ha.subscribe('open',function(){j.post(la,{event:ia});});ha.subscribe('close',function(){j.post(la,{event:ja});});ha.subscribe('changed',function(){j.post(la,{event:ka});});},registerNonAdamaSelectorLogging:function(ha,ia,ja,ka,la){this._selectorValue=la;this._selectorEventHandler=i.listen(ka,'click',function(){if(n.scry(ka,'.openToggler').length===0){j.post(ha,{event:ia});}else j.post(ha,{event:ja});});},registerNonAdamaSelectorChange:function(ha,event,ia){if(ia!=this._selectorValue){this._selectorValue=ia;j.post(ha,{event:event});}},registerMasherLogging:function(ha,event){this._masherEventHandler=i.listen(ha,'click',function(){j.post('privacy_settings',{event:event});});}};f.exports=b.SettingsPanelManager||ga;},null);
__d('FutureSideNavItem',['Arbiter','CSS','DOM','Parent','$','createArrayFromMixed','getElementText'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();function o(p,q){'use strict';this.id=p.id;this.up=q;this.endpoint=p.endpoint;this.type=p.type;this.node=p.node||l(p.id);this.paths=p.path?m(p.path):[];this.keys=p.key?m(p.key):[];var r=this._findKeys(this.keys);this.numericKey=r.numeric||this.keys[0];this.textKey=r.text||this.keys[0];this._pathPattern=this._buildRegex(this.paths);this._keyPattern=this._buildRegex(this.keys);this.hideLoading();this.hideSelected();}o.prototype.equals=function(p){'use strict';return p&&p.id===this.id;};o.prototype.getLinkNode=function(){'use strict';return (j.scry(this.node,'a.item')[0]||j.scry(this.node,'a.subitem')[0]);};o.prototype.matchPath=function(p){'use strict';return this._matchInput(this._pathPattern,p);};o.prototype.matchKey=function(p){'use strict';return this._matchInput(this._keyPattern,p);};o.prototype._matchInput=function(p,q){'use strict';var r=p&&p.exec(q);return r&&r.slice(1);};o.prototype.getTop=function(){'use strict';return this.isTop()?this:this.up.getTop();};o.prototype.isTop=function(p){'use strict';return !this.up;};o.prototype.setCount=function(p,q){'use strict';return this._updateCount(p,true);};o.prototype.incrementCount=function(p,q){'use strict';return this._updateCount(p,false);};o.prototype._updateCount=function(p,q,r){'use strict';var s=j.scry(this.node,'span.count')[0],t=s&&j.scry(s,'span.countValue')[0];if(t){var u=q?0:parseInt(n(t),10),v=Math.max(0,u+p),w=this.isTop()?'hidden':'hiddenSubitem';j.setContent(t,v);r&&i.conditionClass(this.node,w,!v);i.conditionClass(s,'hidden_elem',!v);if(this.isTop()){var x=j.scry(this.node,'div.linkWrap')[0];if(x){i.conditionClass(x,'noCount',!v);i.conditionClass(x,'hasCount',v);}}}h.inform('NavigationMessage.COUNT_UPDATE_DONE');};o.prototype.showLoading=function(){'use strict';i.addClass(this.node,'loading');};o.prototype.hideLoading=function(){'use strict';i.removeClass(this.node,'loading');};o.prototype.showSelected=function(){'use strict';i.addClass(this.node,'selectedItem');i.hasClass(this.node,'hider')&&i.addClass(this._getExpanderParent(),'expandedMode');};o.prototype.hideSelected=function(){'use strict';i.removeClass(this.node,'selectedItem');};o.prototype.showChildren=function(){'use strict';i.addClass(this.node,'open');};o.prototype.hideChildren=function(){'use strict';i.removeClass(this.node,'open');};o.prototype._getExpanderParent=function(){'use strict';return k.byClass(this.node,'expandableSideNav');};o.prototype._buildRegex=function(p){'use strict';if(p.length){var q=p.map(function(r){if(typeof r==="string"){return r.replace(/([^a-z0-9_])/ig,'\\$1');}else if(r&&r.regex)return r.regex;});return new RegExp('^(?:'+q.join('|')+')$');}};o.prototype._findKeys=function(p){'use strict';var q=/^(app|group|fl)_/,r={};for(var s=0;s<p.length;s++){var t=q.test(p[s]);if(t&&!r.numeric){r.numeric=p[s];}else if(!t&&!r.text)r.text=p[s];if(r.numeric&&r.text)break;}return r;};f.exports=o;},null);
__d('FutureSideNavSection',['Bootloader','DOMQuery','$'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();function k(l){'use strict';this.id=l.id;this.node=this.node||j(l.id);this.editEndpoint=l.editEndpoint;}k.prototype.equals=function(l){'use strict';return l&&l.id===this.id;};k.prototype.getEditorAsync=function(l){'use strict';h.loadModules(["SortableSideNav"],(function(m){var n=new m(i.find(this.node,'ul.uiSideNav'),this.editEndpoint);l(n);}).bind(this));};f.exports=k;},null);
__d('MorePagerFetchOnScroll',['AsyncRequest','DOMQuery','Event','Style','Vector','throttle'],function a(b,c,d,e,f,g,h,i,j,k,l,m){if(c.__markCompiled)c.__markCompiled();var n={};function o(p,q,r){'use strict';this._pager=p;this._offset=q||0;this._hasEventHandlers=false;if(r)this.setup();n[p.id]=this;}o.prototype.setup=function(){'use strict';this._scrollParent=k.getScrollParent(this._pager);this.setPagerInViewHandler(this._defaultPagerInViewHandler.bind(this));if(!this.check()){this._scrollListener=j.listen(this._scrollParent,'scroll',m((function(){this.check();}).bind(this),50));this._clickListener=j.listen(this._scrollParent,'click',m((function(){this.check();}).bind(this),50));this._hasEventHandlers=true;}};o.prototype.check=function(){'use strict';if(!i.contains(document.body,this._pager)){this.removeEventListeners();return true;}var p=l.getElementPosition(this._pager).y,q=this._scrollParent===window?l.getViewportDimensions().y:l.getElementDimensions(this._scrollParent).y,r=this._scrollParent===window?l.getScrollPosition().y+q:l.getElementPosition(this._scrollParent).y+q;if(p-this._offset<r){this._inViewHandler();this.removeEventListeners();return true;}return false;};o.prototype.removeEventListeners=function(){'use strict';if(this._hasEventHandlers){this._scrollListener&&this._scrollListener.remove();this._clickListener&&this._clickListener.remove();this._hasEventHandlers=false;}};o.prototype.setPagerInViewHandler=function(p){'use strict';this._inViewHandler=p;return this;};o.prototype._defaultPagerInViewHandler=function(){'use strict';var p=i.scry(this._pager,'a')[0];if(p)h.bootstrap(p.getAttribute('ajaxify')||p.href,p);};o.getInstance=function(p){'use strict';return n[p];};f.exports=o;},null);
__d('FutureSideNav',['Arbiter','ChannelConstants','CSS','DOM','DOMDimensions','$','Event','FutureSideNavItem','FutureSideNavSection','NavigationMessage','PageTransitions','Parent','Run','SelectorDeprecated','URI','Vector','Locale','createArrayFromMixed','debounce'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){if(c.__markCompiled)c.__markCompiled();function aa(ba,ca,da){'use strict';aa.instance&&aa.instance.uninstall();aa.instance=this;if(typeof ba==='undefined')return;this.init(ba,ca,da);}aa.prototype.init=function(ba,ca,da){'use strict';this.root=ba;this.items={};this.sections={};this.editor=null;this.editing=false;this.selected=null;this.loading=null;this.keyParam='sk';this.defaultKey=ca;this.uri=v.getRequestURI();this.ajaxPipe=da;this.ajaxPipeEndpoints={};this.sidecol=true;this._installed=true;this._handlePageTransitions=true;r.registerHandler((function(ea){return this._handlePageTransitions&&this.handlePageTransition(ea);}).bind(this));this._eventHandlers=[];this._sectionEventHandlers={};this._arbiterSubscriptions=[h.subscribe(q.NAVIGATION_COMPLETED,this.navigationComplete.bind(this)),h.subscribe(q.NAVIGATION_FAILED,this.navigationFailed.bind(this)),h.subscribe(q.NAVIGATION_COUNT_UPDATE,this.navigationCountUpdate.bind(this)),h.subscribe(q.NAVIGATION_SELECT,this.navigationSelect.bind(this)),h.subscribe(i.getArbiterType('nav_update_counts'),this.navigationCountUpdateFromPresence.bind(this)),h.subscribe('sideNavPopoverMenuItemClicked',(function(ea,fa){var ga=s.byClass(fa.bookmarkNode,'homeSideNav'),ha=ga&&ga.getAttribute('id');if(!ha)return;this._handleMenuClick(this.sections[ha],fa.bookmarkNode,fa.menuItemNode,fa.menuNode);}).bind(this)),h.subscribe('sideNavPopoverMenuCheckFavorite',(function(ea,fa){var ga=s.byClass(fa.bookmarkNode,'homeSideNav'),ha=ga&&ga.getAttribute('id');if(!ha)return;var ia=this.sections[ha].equals(this.getSection('favorites')),ja=this.items[fa.bookmarkNode.id];if(ia){ja.showFavorite(fa.menuNode);}else ja.hideFavorite(fa.menuNode);}).bind(this))];this._handleResize=z(this._checkNarrow.bind(this),200);this._eventHandlers.push(n.listen(window,'resize',this._handleResize));this._checkNarrow();this._selectorSubscriptions=[];window.Selector&&this._selectorSubscriptions.push(u.subscribe(['open','close'],function(ea,fa){var ga=s.byClass(fa.selector,'sideNavItem');ga&&j.conditionClass(ga,'editMenuOpened',ea==='open');}));t.onLeave(this.uninstall.bind(this));if(this._pendingSections)this._pendingSections.forEach((function(ea){this.initSection.apply(this,ea);}).bind(this));};aa.prototype._checkNarrow=function(){'use strict';if(!this.root)return;var ba=w.getElementPosition(this.root).x;j.conditionClass(this.root,'uiNarrowSideNav',ba<20||x.isRTL()&&ba+l.getElementDimensions(this.root).width<l.getElementDimensions(m('globalContainer')).width);};aa.prototype.uninstall=function(){'use strict';if(this._installed){this._installed=false;this._handlePageTransitions=false;this._arbiterSubscriptions.forEach(h.unsubscribe);this._selectorSubscriptions.forEach(function(ca){u.unsubscribe(ca);});this._eventHandlers.forEach(function(ca){ca.remove();});for(var ba in this._sectionEventHandlers)this._sectionEventHandlers[ba].remove();this._handleResize.reset();}};aa.prototype.initSection=function(ba,ca){'use strict';if(!this._installed){this._pendingSections=this._pendingSections||[];this._pendingSections.push(arguments);return;}this._initItems(ca);this._initSection(ba);};aa.prototype.addItem=function(ba,ca){'use strict';this._initItem(ba,ca);};aa.prototype._initItems=function(ba){'use strict';var ca=(function(da,ea){var fa=this._initItem(da,ea);if(da.children)da.children.forEach(function(ga){ca(ga,fa);});}).bind(this);y(ba).forEach(function(da){ca(da,null);});};aa.prototype._initItem=function(ba,ca){'use strict';var da=this.items[ba.id]=this._constructItem(ba,ca);if(da.equals(this.selected)||ba.selected)this.setSelected(da);var ea=da.getLinkNode();ea&&this._eventHandlers.push(n.listen(ea,'click',(function(event){return !this.editing;}).bind(this)));return da;};aa.prototype._initSection=function(ba){'use strict';this._sectionEventHandlers[ba.id]&&this._sectionEventHandlers[ba.id].remove();var ca=this.sections[ba.id]=this._constructSection(ba);this._sectionEventHandlers[ba.id]=n.listen(ca.node,'click',this.handleSectionClick.bind(this,ca));return ca;};aa.prototype._constructItem=function(ba,ca){'use strict';return new o(ba,ca);};aa.prototype._constructSection=function(ba){'use strict';return new p(ba);};aa.prototype.handleSectionClick=function(ba,event){'use strict';var ca=this._getEventTarget(event,'a');if(ca)this._handleLinkClick(ba,ca,event);};aa.prototype._getEventTarget=function(event,ba){'use strict';var ca=event.getTarget();if(ca.tagName!==ba.toUpperCase()){return s.byTag(ca,ba);}else return ca;};aa.prototype._handleMenuClick=function(ba,ca,da,ea){'use strict';if(j.hasClass(da,'rearrange'))this.beginEdit(ba);};aa.prototype._handleMenuItemClick=function(ba,ca,da){'use strict';if(ba==='rearrange')this.beginEdit(ca);};aa.prototype._handleLinkClick=function(ba,ca,event){'use strict';if(j.hasClass(ca,'navEditDone')){this.editing?this.endEdit():this.beginEdit(ba);event.kill();}};aa.prototype.getItem=function(ba){'use strict';if(this._isCurrentPath(ba)){return this._getItemForKey(this._getKey(ba.getQueryData())||this.defaultKey);}else return this._getItemForPath(ba.getPath());};aa.prototype.getNodeForKey=function(ba){'use strict';var ca=this._getItemForKey(ba);if(ca)return ca.node;};aa.prototype._isCurrentPath=function(ba){'use strict';return ba.getDomain()===this.uri.getDomain()&&ba.getPath()===this.uri.getPath();};aa.prototype._getKey=function(ba){'use strict';return ba[this.keyParam];};aa.prototype._getSectionForNode=function(ba){'use strict';while(ba=ba.parentNode)if(ba.id&&this.sections[ba.id])return this.sections[ba.id];};aa.prototype._getItemForNode=function(ba){'use strict';ba=s.byClass(ba,'sideNavItem');return ba&&this.items[ba.id];};aa.prototype._getItemForKey=function(ba){'use strict';return this._findItem(function(ca){return ca.matchKey(ba);});};aa.prototype._getItemForPath=function(ba){'use strict';return this._findItem(function(ca){return ca.matchPath(ba);});};aa.prototype._findItem=function(ba){'use strict';for(var ca in this.items)if(ba(this.items[ca]))return this.items[ca];};aa.prototype.removeItem=function(ba){'use strict';if(ba&&this.items[ba.id]){k.remove(ba.node);delete this.items[ba.id];}};aa.prototype.removeItemByKey=function(ba){'use strict';this.removeItem(this._getItemForKey(ba));};aa.prototype.moveItem=function(ba,ca,da){'use strict';var ea=k.find(ba.node,'ul.uiSideNav');(da?k.prependContent:k.appendContent)(ea,ca.node);};aa.prototype.setLoading=function(ba){'use strict';this.loading&&this.loading.hideLoading();this.loading=ba;this.loading&&this.loading.showLoading();};aa.prototype.setSelected=function(ba){'use strict';this.setLoading(null);if(this.selected){this.selected.hideSelected();this.selected.getTop().hideChildren();}this.selected=ba;if(this.selected){this.selected.showSelected();this.selected.getTop().showChildren();}};aa.prototype.handlePageTransition=function(ba){'use strict';var ca=this.getItem(ba),da=ca&&ca.endpoint&&this._doPageTransition(ca,ba);return da;};aa.prototype._doPageTransition=function(ba,ca){'use strict';this.setLoading(ba);this._sendPageTransition(ba.endpoint,babelHelpers._extends({},this._getTransitionData(ba,ca),ca.getQueryData()));return true;};aa.prototype._sendPageTransition=function(ba,ca){'use strict';ca.endpoint=ba;h.inform(q.NAVIGATION_BEGIN,{useAjaxPipe:this._useAjaxPipe(ba),params:ca});};aa.prototype._getTransitionData=function(ba,ca){'use strict';var da={};da.sidecol=this.sidecol;da.path=ca.getPath();da[this.keyParam]=ba.textKey;da.key=ba.textKey;return da;};aa.prototype._useAjaxPipe=function(ba){'use strict';return this.ajaxPipe||this.ajaxPipeEndpoints[ba];};aa.prototype.navigationComplete=function(){'use strict';this.loading&&this.setSelected(this.loading);};aa.prototype.navigationFailed=function(){'use strict';this.setLoading(null);};aa.prototype.navigationSelect=function(ba,ca){'use strict';var da=this._getItemForKey(this._getKey(ca));if(ca.asLoading){this.setLoading(da);}else this.setSelected(da);};aa.prototype.navigationCountUpdate=function(ba,ca){'use strict';var da=this._getItemForKey(ca&&ca.key);if(da)if(typeof ca.count!=="undefined"){da.setCount(ca.count,ca.hide);}else if(typeof ca.increment!=="undefined")da.incrementCount(ca.increment,ca.hide);};aa.prototype.navigationCountUpdateFromPresence=function(ba,ca){'use strict';ca=ca.obj;if(ca)if(!ca.class_name||ca.class_name&&j.hasClass(this.root,ca.class_name))if(ca.items)for(var da=0;da<ca.items.length;da++)this.navigationCountUpdate(ba,ca.items[da]);};aa.prototype.beginEdit=function(ba){'use strict';if(!this.editing){this.editing=true;j.addClass(this.root,'editMode');this._updateTrackingData();this._initEditor(ba);}};aa.prototype.endEdit=function(){'use strict';if(this.editing){j.removeClass(this.root,'editMode');this.editor&&this.editor.endEdit();this.editor=null;this.editing=false;this._updateTrackingData();}};aa.prototype._updateTrackingData=function(ba){'use strict';var ca=this.root.getAttribute('data-gt')||"{}";try{ca=JSON.parse(ca);if(this.editing){ca.editing=true;}else delete ca.editing;this.root.setAttribute('data-gt',JSON.stringify(ca));}catch(da){}};aa.prototype._initEditor=function(ba){'use strict';ba.getEditorAsync((function(ca){if(this.editing){this.editor=ca;this.editor.beginEdit();}}).bind(this));};aa.getInstance=function(){'use strict';return aa.instance||new aa();};aa.initMenu=function(ba,ca){'use strict';ca.subscribe('itemclick',function(da,ea){var fa=aa.getInstance(),ga=ba.getTriggerElem(),ha=fa._getSectionForNode(ga),ia=fa._getItemForNode(ga);fa._handleMenuItemClick(ea.item.getValue(),ha,ia);});};aa.initSectionGlobally=function(ba,ca){'use strict';aa.getInstance().initSection(ba,ca);};aa.instance=null;f.exports=aa;},null);
__d('legacy:ui-side-nav-future-js',['FutureSideNav'],function a(b,c,d,e){if(c.__markCompiled)c.__markCompiled();b.FutureSideNav=c('FutureSideNav');},3);