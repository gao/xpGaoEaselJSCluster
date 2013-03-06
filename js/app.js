var app = app || {};

(function(w){  
  
	w.render = function(templateName, data) {
		var tmpl = Handlebars.templates[templateName];
		if (tmpl) {
			return tmpl(data);
		} else {
			// obviously, handle this case as you think most appropriate.
			return "<small>Error: could not find template: " + templateName + "</small>";
		}
	}

})(window);

(function($) {
	
	app.render = function(templateName,data){
		data = data || {};
		return render(templateName,data);
	}
	
	//new sort arr by columnName as order
	app.newSort=function(arr,columnName,order){
		var temp;
	    var exchange;
		
		for(var i=0; i<arr.length; i++){
			exchange = false;
			for(var j=arr.length-2; j>=i; j--){
				var valueA = "";
				var valueB = "";
				
				valueA = arr[j+1][columnName];
				valueB = arr[j][columnName];
				
				if(valueA == null || typeof valueA == "undefined"){
					valueA = "";
				}
				if(valueB==null || typeof valueB == "undefined"){
					valueB="";
				}
				
				//sometimes the number value will be N/A
				if(valueA == "N/A")valueA=0;
				if(valueB == "N/A")valueB=0;
				
				if(order){
					if((valueA) < (valueB)){
						temp = arr[j+1] ;
						arr[j+1] = arr[j] ;
						arr[j]  = temp;
						exchange = true;
					}
				}else{
					if((valueA) > (valueB)){
						temp = arr[j+1] ;
						arr[j+1] = arr[j] ;
						arr[j]  = temp;
						exchange = true;
					}
				}
			}
				
			if(!exchange){
				break;
			} 	
		}	
	 
		return arr;
	}

})(jQuery);
