;(function() {

    (function ($) {
        brite.registerView("ClusterChart",  {
			emptyParent : true,
			parent:".MainScreen-main"
		}, {
        	create:function (data, config) {
                var $html = app.render("tmpl-ClusterChart");
               	var $e = $($html);
                return $e;
            },
            postDisplay:function (data, config) {
                var view = this;
                var $e = view.$el;
        		var $container = $e.find(".ClusterChartSummary");
				$container.append("<div class='fstCon'><canvas id='ClusterChartCanvas' width='960' height='800'></canvas></div>");
				
				data = data || {};
				data.children = [];
				
				//generate data,weight between 1 and 10
				for(var i=0; i< 30 ;i++){
					var weight = RandomData(1,10);
					data.children.push({"name": "User"+i,"weight":weight});
				}
				
				//sort the weight
				var childrenData = data.children;
				app.newSort(childrenData,"weight");
			
			    var w = 800,
				    h = 600,
				    rx = w / 2,
				    ry = h / 2;
				    
				var canvas = $e.find("#ClusterChartCanvas")[0];
				var stage = new createjs.Stage(canvas);
				stage.enableMouseOver(20);
				
			    $.each(childrenData,function(i,item){
					var angle = (360/childrenData.length)*(Math.PI/180)*i;
					var weight = childrenData[i].weight;
					
					var outRx = rx + (Math.cos(angle)*weight*40);
					var outRy = ry + (Math.sin(angle)*weight*40);
					
					var container = new createjs.Container();
					container.x = outRx;
					container.y = outRy;
					container.name = item.name;
					container.weight = item.weight;
					
					//draw the node
					var node = new createjs.Shape();
					node.graphics.beginFill("rgba(255,102,0,0.75)")
					                    .drawCircle(0, 0 , 5)
					                    .closePath();
					
					container.addChild(node);
					
					//add the click event for node
					container.addEventListener("mouseover",function(evt){
						var html = app.render("tmpl-section-hover",evt.target);
						var $hoverBoxContainer = $e.find(".hoverBoxContainer");
						$hoverBoxContainer.empty();
						$hoverBoxContainer.append(html);
					});
					
					stage.addChild(container);
					
					
					//draw the line
					var line = new createjs.Shape();
					line.graphics.beginStroke("#999")
						.moveTo(rx,ry)
						.lineTo(outRx,outRy)
						.closePath();
					stage.addChild(line)
						
					//show the label
					if(i==0 || i%3==0){
						var text = new createjs.Text(childrenData[i].name, "12px Arial", "#777");
						var mx = 0;
						var my = 0;
						var ang = (360/childrenData.length)*i;
						if(ang < 90){
							mx = 5;
							my = 0;
						}else if(ang > 90 && ang < 180){
							mx = -50;
							my = 5;
						}else if(ang > 180 && ang < 270){
							mx = -50;
							my = -5;
						}else if(ang > 270 && ang < 360){
							mx = 10;
							my = -10;
						}
						text.x = outRx + mx;
						text.y = outRy + my;
						stage.addChild(text);
					}
				});
				
				//draw the origin point
				var circle = new createjs.Shape();
			    circle.graphics
			    		.beginRadialGradientFill(["#CCFFCC", "#006400"], [0.1, 0.9], rx, ry, 1, rx, ry, 10)
			    		.drawCircle(rx, ry, 10)
			    		.closePath();
			    stage.addChild(circle);
			    
			    stage.update();
			}
			
        });
        
        // --------- Private Method --------- //
		function RandomData(under, over){ 
			return parseInt(Math.random()*(over-under) + under); 
		}
		// --------- /Private Method --------- //

    })(jQuery);
})();
