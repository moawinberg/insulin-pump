
angular.module('MainApp', [
  'MainApp.controllers'
]);
angular.module('MainApp.controllers', []).
  controller('mainController', function ($scope, $timeout) {
    $scope.currentPage = 'home';
    $scope.object = {
      bgLevel: 120,
      timestamp: moment().calendar(),
      timestampBolus: moment().calendar(),
      bolusLevel: 10,
    };
    $scope.bgLevel = null;
    $scope.bolusLevel = null;
    $scope.automode = true;

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
              backgroundColor: '#FB8C00',
              fill: false,
              pointRadius: 0,
              borderColor: '#FB8C00',
              borderDash: [5, 2],
              data: [null, null, null, null, null, null, 210, 200]
            },
            {
              backgroundColor: '#FB8C00',
              fill: false,
              borderWidth: 6,
              borderColor: '#FB8C00',
              data: [null, null, null, null, null, null, 210]
            },
            {
              backgroundColor: '#FB8C00',
              fill: false,
              borderColor: '#FB8C00',
              data: [70, 100, 150, 100, 100, 120, 210]
            },
            {
              pointRadius: 0,
              borderWidth: 1,
              borderColor: 'rgb(128, 128, 128 0.2)',
              fill: false,
              data: [70, 70, 70, 70, 70, 70, 70, 70]
            },
            {
              pointRadius: 0,
              borderWidth: 1,
              borderColor: 'rgb(128, 128, 128 0.2)',
              fill: false,
              data: [150, 150, 150, 150, 150, 150, 150, 150]
            },
            {
              pointRadius: 0,
              borderDash: [5, 2],
              borderWidth: 1,
              borderColor: 'rgb(128, 128, 128, 0.2)',
              fill: false,
              data: [100, 100, 100, 100, 100, 100, 100, 100]
            },
            {
              pointRadius: 0,
              borderDash: [5, 2],
              borderWidth: 1,
              borderColor: 'rgb(128, 128, 128, 0.2)',
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

    $scope.goTo = function(page) {
      $scope.currentPage = page;
    };

    $scope.changeBgLevel = function() {
      console.log($scope.bgLevel);
      $scope.object.bgLevel = $scope.bgLevel;
      $scope.object.timestamp = moment().calendar();
      $scope.showConfirmation = true;

      $timeout(function () {
        $scope.showConfirmation = false;
        $scope.goTo('home');
        $scope.bgLevel = null;
      }, 2500);
    };

    $scope.changeAutomode = function() {
      $scope.automode = $scope.automode ? false : true;
    };

    $scope.changeBolusLevel = function() {
      $scope.object.bolusLevel = $scope.bolusLevel;
      $scope.object.timestampBolus = moment().calendar();
      
      $scope.showConfirmation = true;

      $timeout(function () {
        $scope.showConfirmation = false;
        $scope.goTo('home');
        $scope.bolusLevel = null;
      }, 2500);
    };

    $(document).ready(function() {
      graph();
    });
  });