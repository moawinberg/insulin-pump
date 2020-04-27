
angular.module('MainApp', [
  'MainApp.controllers'
]);
angular.module('MainApp.controllers', []).
  controller('mainController', function ($scope) {
    $scope.currentPage = 'home';
    $scope.object = { bgLevel: 120 };
    $scope.bgLevel = "";

    function graph() {
      if (!document.getElementById('chart')) {
        return;
      }
     const ctx = document.getElementById('chart').getContext('2d');
      $scope.chart = new Chart(ctx, {
       type: 'line',
        data: {
          labels: ['4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
          datasets: [{
            backgroundColor: '#FB8C00',
            fill: false,
            borderColor: '#FB8C00',
            data: [0, 10, 5, 10, 10, 20, 15]
          }]
        },
        options: {
          title: {
            text: 'Glucose Level'
          },
          legend: {
            display: false,
          }
        }
      });
    }

    $scope.changeBgLevel = function() {
      $scope.object.bgLevel = $scope.bgLevel;
    };

    $scope.goTo = function(page) {
      $scope.currentPage = page;
    
      // clear input field when leaving page
      $scope.bgLevel = "";
    };

    $(document).ready(function () {
      graph();
    });
});