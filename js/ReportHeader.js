;(function() {

    (function ($) {
        brite.registerView("ReportHeader",  {parent:".MainScreen-header"}, {
            create:function (data, config) {
                var $html = app.render("tmpl-ReportHeader");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                
            },
            events:{
            	"btap;.nav li":function(e){
            		var view = this;
            		var $e = view.$el;
            		var $li = $(e.currentTarget);
            		$e.find("li").removeClass("active");
            		$li.addClass("active");
            		var menu = $li.attr("data-nav");
            		if(menu == "Welcome"){
            		  brite.display("Welcome");
            		}else if(menu == "ClusterChart"){
            		  brite.display("ClusterChart");
            		}else if(menu == "CurveTo"){
            		  brite.display("CurveTo");
            		}
            	}
            }
        });
        
    })(jQuery);
})();