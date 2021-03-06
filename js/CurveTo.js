;(function() {

    (function ($) {
        brite.registerView("CurveTo",  {
			emptyParent : true,
			parent:".MainScreen-main"
		}, {
        	create:function (data, config) {
                var $html = app.render("tmpl-CurveTo");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
                var $container = $e.find(".CurveToChart");
                //clear container
				$container.empty();
				$container.append("<div class='fstCon'><canvas id='CurveToCanvas' width='960' height='800'></canvas></div>");
				
                var canvas, stage;
		        var drawingCanvas;
		        var oldPt;
		        var oldMidPt;
		        var title;
		        var color;
		        var stroke;
		        var colors;
		        var index;
		        
		        canvas = $e.find("#CurveToCanvas")[0];
		        
	            index = 0;
	            colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];
	
	            //check to see if we are running in a browser with touch support
	            stage = new createjs.Stage(canvas);
	            stage.autoClear = false;
	            stage.enableDOMEvents(true);
	
	            createjs.Touch.enable(stage);
	            createjs.Ticker.setFPS(24);
	
	            drawingCanvas = new createjs.Shape();
	
	            stage.addEventListener("stagemousedown", handleMouseDown);
	            stage.addEventListener("stagemouseup", handleMouseUp);
	
	            title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
	            title.x = 300;
	            title.y = 200;
	            stage.addChild(title);
	
	            stage.addChild(drawingCanvas);
	            stage.update();
	            
	            
		        function stop() {
		            createjs.Ticker.removeEventListener("tick", tick);
		        }
		
		        function handleMouseDown(event) {
		            if (stage.contains(title)) { stage.clear(); stage.removeChild(title); }
		            color = colors[(index++)%colors.length];
		            stroke = Math.random()*30 + 10 | 0;
		            oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
		            oldMidPt = oldPt;
		            stage.addEventListener("stagemousemove" , handleMouseMove);
		        }
		
		        function handleMouseMove(event) {
		            var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);
		
		            drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
		
		            oldPt.x = stage.mouseX;
		            oldPt.y = stage.mouseY;
		
		            oldMidPt.x = midPt.x;
		            oldMidPt.y = midPt.y;
		
		            stage.update();
		        }
		
		        function handleMouseUp(event) {
		            stage.removeEventListener("stagemousemove" , handleMouseMove);
		        }
			}
        });
        
        
    })(jQuery);
})();
