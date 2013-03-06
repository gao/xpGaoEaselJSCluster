Handlebars.templates = Handlebars.templates || {};


// template --- tmpl-ClusterChart ---
Handlebars.templates['tmpl-ClusterChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ClusterChart\">\n		<div class=\"ClusterChartSummary\"></div>\n		<div class=\"hoverBoxContainer\"></div>\n	</div>";}
);

// template --- tmpl-section-hover ---
Handlebars.templates['tmpl-section-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"hoverDiv\">\n		<span>Name:";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><br>\n		<span>Weight:";
  foundHelper = helpers.weight;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.weight; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	</div>";
  return buffer;}
);

// template --- tmpl-CurveTo ---
Handlebars.templates['tmpl-CurveTo'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"CurveTo\">\n		<div class=\"CurveToChart\"></div>\n	</div>";}
);

// template --- tmpl-MainScreen ---
Handlebars.templates['tmpl-MainScreen'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"MainScreen\">\n	    <div class=\"MainScreen-header\">\n	    </div>\n	    <div class=\"MainScreen-main\">\n	    </div>\n    </div>";}
);

// template --- tmpl-ReportHeader ---
Handlebars.templates['tmpl-ReportHeader'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"ReportHeader\">\n		<div class=\"navbar  navbar-inverse navbar-fixed-top\">\n		  <div class=\"navbar-inner\">\n		    <a class=\"brand\" href=\"#\">D3JS Demo</a>\n		    <ul class=\"nav\">\n		      <li data-nav=\"Welcome\" class=\"menu active\">Welcome</li>\n		      <li data-nav=\"ClusterChart\" class=\"menu\">ClusterChart</li>\n		      <li data-nav=\"CurveTo\" class=\"menu\">CurveTo</li>\n		    </ul>\n		  </div>\n		</div>\n	</div>";}
);

// template --- tmpl-Welcome ---
Handlebars.templates['tmpl-Welcome'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"Welcome\">\n		<canvas id=\"WelcomeCanvas\" width=\"960\" height=\"400\"></canvas>\n	</div>";}
);
