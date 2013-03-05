;(function() {

    (function ($) {
        brite.registerView("ClusterChart",  {
        	loadTmpl : true,
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
                
                var viewName = "summary";
				view.viewName = viewName;
				view.reportType = "BATCH";
                
                view.showView(viewName);
			},
			
			getAllData: function(viewBy){
				var view = this;
				var dfd = $.Deferred();
				app.getSummary(view.reportType,"common",viewBy).done(function(data){
					var dataSet = {};
					if(data.items!=null){
						dataSet = data.items[0];
					}
					dfd.resolve(dataSet);
				});
				return dfd.promise();
			},
			
			showView: function(){
				var view = this;
				var $e = view.$el;
				
				//clean first
				$e.bEmpty();
				var html;
				if(view.viewName == 'summary'){
					html = app.render("tmpl-ClusterChart-Summary")
				}else{
					return false;
				}
		
				$e.append($(html));
				
				
				view.getAllData("day").done(function(dataAll){
					showSummaryView.call(view,dataAll);
				});
				
				return true;
			}
        });
        
        function showSummaryView(dataAll){
        	var data = dataAll.data
        	var view = this;
			var $e = view.$el;
        	var $container = $e.find(".ClusterChartSummary");
        	if(typeof dataAll == "undefined"){
				$container.html("");
				$container.append("<div class='noData'>No Data!</div>");
			}else{
				//clear container
				$container.empty();
				$container.append("<div class='fstCon'><canvas id='ClusterChartCanvas' width='960' height='800'></canvas></div>");
				
				//first sort the children
				var childrenData = data.children;
				app.newSort(childrenData,"value");
			
			    var w = 1000,
				    h = 800,
				    rx = w / 2,
				    ry = h / 2;
				    
				var canvas = $e.find("#ClusterChartCanvas")[0];
			    
				var stage = new createjs.Stage(canvas);
				
			    $.each(childrenData,function(i,item){
					var angle = (360/childrenData.length)*(Math.PI/180)*i;
					var value = childrenData[i].value;
					
					var outRx = rx + (Math.cos(angle)*value*10);
					var outRy = ry + (Math.sin(angle)*value*10);
					
					var container = new createjs.Container();
					container.x = outRx;
					container.y = outRy;
					container.name = item.name;
					container.value = item.value;
					
					//draw the node
					var node = new createjs.Shape();
					node.graphics.beginFill("rgba(255,102,0,0.75)")
					                    .drawCircle(0, 0 , 5)
					                    .closePath();
					
					container.addChild(node);
					
					//add the click event for node
					container.addEventListener("mouseover",function(evt){
						console.log("-----mouseover-------");
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
		}
        
    })(jQuery);
})();
