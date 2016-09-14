angular.module('panesApp', [
    'd3',
    'ui.router',
    'panesApp.controllers'
    ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('parent', {
        abstract: true, //https://github.com/angular-ui/ui-router/wiki/Nested-States-and-Nested-Views
        template: '<div class="row">\
          <div class="large-4 small-4 columns" ui-view="data"></div>\
          <div class="large-8 small-8 columns" ui-view="d3"></div>\
          </div>\
          <style type="text/css"> .chart rect {stroke:white;}</style>'
      })
      .state('parent.home', {
        url: '/',
        views: {
          data: {
            templateUrl: 'tabularData.html'
          },
          d3: {
            template: '<div id="d3"></div>',
            controller: function($scope, d3Service) {
              d3Service.d3().then(function(d3) {
                var width = 400,
                    height = 150,
                    color = d3.scale.category20();
                var chart = d3.select(
                    document.getElementById("d3")
                    ).append("svg")
                    .attr("class", "chart")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(10,15)");
                  $scope.$watch('data', function(newData) {
                    var data = [];
                    angular.forEach(newData, function(d) {
                      data.push(d.percent);
                    });
                    $scope.render(data);
                  }, true);
                $scope.render = function(data) {
                  chart.selectAll('*').remove();
                  var x = d3.scale.linear()
                      .domain([0, d3.max(data)])
                      .range(["0px", width + "px"]);
                  var y = d3.scale.ordinal()
                      .domain(data)
                      .rangeBands([0, 120]);
                chart.selectAll("line")
                    .data(x.ticks(10))
                  .enter().append("line")
                    .attr("x1", x)
                    .attr("x2", x)
                    .attr("y1", 0)
                    .attr("y2", 120)
                    .style("stroke", "#ccc");
                chart.selectAll(".rule")
                    .data(x.ticks(10))
                  .enter().append("text")
                    .attr("class", "rule")
                    .attr("x", x)
                    .attr("y", 0)
                    .attr("dy", -3)
                    .attr("text-anchor", "middle")
                    .text(String);
                chart.selectAll("rect")
                    .data(data)
                  .enter().append("rect")
                    .attr("y", y)
                    .attr("width", x)
                    .attr("height", y.rangeBand())
                    .attr('fill', function(d) {
                      return color(d);
                    });
                chart.selectAll(".bar")
                    .data(data)
                  .enter().append("text")
                    .attr("class", "bar")
                    .attr("x", x)
                    .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
                    .attr("dx", -12)
                    .attr("dy", ".35em")
                    .attr("text-anchor", "end")
                    .text(String);
                chart.append("line")
                    .attr("y1", 0)
                    .attr("y2", 120)
                    .style("stroke", "#000");
                };
                $scope.render();
              });
            }
          }
        }
      });
  }]);



  angular.module('panesApp.controllers', [])
  .controller('NestedViewsController', ['$scope', '$state', function($scope, $state) {
    $scope.data = [
      {name: "Chrome", percent:50},
      {name: "Firefox", percent:30},
      {name: "Safari", percent:20}
    ];
    $scope.signup = function() {
    }
  }]);
