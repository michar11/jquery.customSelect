(function($){
 $.fn.extend({
 
 	customSelect : function(options) {
	  if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)){
	  var defaults = {
		  customClass: null,
		  mapClass:true,
		  mapStyle:true
	  };
	  var options = $.extend(defaults, options);
	  
	  return this.each(function() {
	  		var $this = $(this);
			var currentSelected = $this.find(':selected');
			var html = currentSelected.html() || '&nbsp;';
			var customSelectInnerSpan = $('<span class="customSelectInner" />').append(html);
			var customSelectSpan = $('<span class="customSelect" />').append(customSelectInnerSpan);
			$this.after(customSelectSpan);
			
			if(options.customClass)	{ customSelectSpan.addClass(options.customClass); }
			if(options.mapClass)	{ customSelectSpan.addClass($this.attr('class')); }
			if(options.mapStyle)	{ customSelectSpan.attr('style', $this.attr('style')); }
			
			var selectBoxWidth = parseInt($this.outerWidth()) - (parseInt(customSelectSpan.outerWidth()) - parseInt(customSelectSpan.width()) );			
			customSelectSpan.css({display:'inline-block'});
			customSelectInnerSpan.css({width:selectBoxWidth, display:'inline-block'});
			var selectBoxHeight = customSelectSpan.outerHeight();
			$this.css({'-webkit-appearance':'menulist-button',width:customSelectSpan.outerWidth(),position:'absolute', opacity:0,height:selectBoxHeight,fontSize:$this.next().css('font-size')}).change(function(){
				customSelectInnerSpan.text($this.find(':selected').text()).parent().addClass('customSelectChanged');
				setTimeout(function(){customSelectSpan.removeClass('customSelectOpen');},60);
			}).bind('mousedown',function(){
				customSelectSpan.toggleClass('customSelectOpen');
			}).focus(function(){
				customSelectSpan.addClass('customSelectFocus');
			}).blur(function(){
				customSelectSpan.removeClass('customSelectFocus customSelectOpen');
			});
			
	  });
	  }
	}
 });
})(jQuery);
