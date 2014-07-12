(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['index'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!DOCTYPE html><html lang=\"en\"><head><title></title><script type=\"text/javascript\">if (foo) {\n   bar(1 + 5)\n}</script></head><body><h1>Jade - node template engine</h1><div id=\"container\" class=\"col\"><p>Get on it!</p><p>Jade is a terse and simple\ntemplating language with a\nstrong focus on performance\nand powerful features.</p></div></body></html>";
  });
})();