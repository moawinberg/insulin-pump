
angular.module('MainApp', [
  'MainApp.controllers'
]);
angular.module('MainApp.controllers', []).
  controller('mainController', function ($scope) {
    $scope.currentPage = 'home';
    $scope.object = { bgLevel: 120, timestamp: moment().calendar() };
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
          datasets: [
            {
              backgroundColor: '#5AC8FA',
              fill: false,
              borderColor: '#5AC8FA',
              data: [70, 100, 150, 100, 100, 120, 210]
            },
            {
              pointRadius: 0,
              borderWidth: 1,
              borderColor: 'rgb(76, 217, 100, 0.2)',
              fill: false,
              data: [70, 70, 70, 70, 70, 70, 70, 70]
            },
            {
              pointRadius: 0,
              borderWidth: 1,
              borderColor: 'rgb(76, 217, 100, 0.2)',
              fill: false,
              data: [150, 150, 150, 150, 150, 150, 150, 150]
            },
            {
              pointRadius: 0,
              borderDash: [5, 2],
              borderWidth: 1,
              borderColor: 'rgb(255,59,48, 0.2)',
              fill: false,
              data: [100, 100, 100, 100, 100, 100, 100, 100]
            },
            {
              pointRadius: 0,
              borderDash: [5, 2],
              borderWidth: 1,
              borderColor: 'rgb(255,59,48, 0.2)',
              fill: false,
              data: [300, 300, 300, 300, 300, 300, 300, 300]
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          title: {
            text: 'Glucose Level'
          },
          legend: {
            display: false,
          }
        }
      });
    }

    $scope.changeBgLevel = function () {
      $scope.object.bgLevel = $scope.bgLevel;
      $scope.object.timestamp = moment().calendar();
    };

    $scope.goTo = function (page) {
      $scope.currentPage = page;

      // clear input field when leaving page
      $scope.bgLevel = "";
    };

    $(document).ready(function () {
      graph();
    });
  });