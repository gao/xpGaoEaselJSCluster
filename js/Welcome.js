;(function() {

    (function ($) {
        brite.registerView("Welcome",  {
        	loadTmpl : true,
			emptyParent : true,
			parent:".MainScreen-main"
		}, {
        	create:function (data, config) {
                var $html = app.render("tmpl-Welcome");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                
                var canvas = $e.find("#WelcomeCanvas")[0];
			    
				// create a stage object to work with the canvas. This is the top level node in the display list:
				var stage = new createjs.Stage(canvas);
			    
			    var text = new createjs.Text("Welcome to the EaselJS Chart Demo!", "36px Arial", "#777");
			    stage.addChild(text);
				text.x = 260;
				text.y = 200;
				
			    stage.update();
			}
        });
        
    })(jQuery);
})();
