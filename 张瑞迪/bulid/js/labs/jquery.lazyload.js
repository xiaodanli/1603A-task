!function(r){r.fn.lazyload=function(e){var n={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,skip_invisible:!0};e&&(null!==e.failurelimit&&(e.failure_limit=e.failurelimit,delete e.failurelimit),r.extend(n,e));var o=this;return 0==n.event.indexOf("scroll")&&r(n.container).bind(n.event,function(e){var t=0;o.each(function(){if(!n.skip_invisible||r(this).is(":visible"))if(r.abovethetop(this,n)||r.leftofbegin(this,n));else if(r.belowthefold(this,n)||r.rightoffold(this,n)){if(++t>n.failure_limit)return!1}else r(this).trigger("appear")});var i=r.grep(o,function(e){return!e.loaded});o=r(i)}),this.each(function(){var t=this;t.loaded=!1,r(t).one("appear",function(){this.loaded||r("<img />").bind("load",function(){r(t).hide().attr("src",r(t).data("original"))[n.effect](n.effectspeed),t.loaded=!0}).attr("src",r(t).data("original"))}),0!=n.event.indexOf("scroll")&&r(t).bind(n.event,function(e){t.loaded||r(t).trigger("appear")})}),r(window).bind("resize",function(e){r(n.container).trigger(n.event)}),r(n.container).trigger(n.event),this},r.belowthefold=function(e,t){if(void 0===t.container||t.container===window)var i=r(window).height()+r(window).scrollTop();else i=r(t.container).offset().top+r(t.container).height();return i<=r(e).offset().top-t.threshold},r.rightoffold=function(e,t){if(void 0===t.container||t.container===window)var i=r(window).width()+r(window).scrollLeft();else i=r(t.container).offset().left+r(t.container).width();return i<=r(e).offset().left-t.threshold},r.abovethetop=function(e,t){if(void 0===t.container||t.container===window)var i=r(window).scrollTop();else i=r(t.container).offset().top;return i>=r(e).offset().top+t.threshold+r(e).height()},r.leftofbegin=function(e,t){if(void 0===t.container||t.container===window)var i=r(window).scrollLeft();else i=r(t.container).offset().left;return i>=r(e).offset().left+t.threshold+r(e).width()},r.extend(r.expr[":"],{"below-the-fold":function(e){return r.belowthefold(e,{threshold:0,container:window})},"above-the-fold":function(e){return!r.belowthefold(e,{threshold:0,container:window})},"right-of-fold":function(e){return r.rightoffold(e,{threshold:0,container:window})},"left-of-fold":function(e){return!r.rightoffold(e,{threshold:0,container:window})}})}(jQuery);