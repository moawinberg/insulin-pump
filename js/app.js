
angular.module('MainApp', [
  'MainApp.controllers'
]);
angular.module('MainApp.controllers', []).
  controller('mainController', function($scope) {
    $scope.currentPage = 'home';
    $scope.object = {
      bgLevel: 5.4,
      timestamp: moment().calendar(),
      timestampBolus: moment().calendar(),
      bolusLevel: 0,
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
              borderWidth: 10,
              borderColor: '#FB8C00',
              data: [null, null, null, null, null, null, 210]
            },
            {
              fill: false,
              pointRadius: 0,
              borderColor: 'gray',
              borderDash: [5, 2],
              data: [null, null, null, null, null, null, 210, 200]
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
          title: {
            text: 'Glucose Level'
          },
          legend: {
            display: false,
          }
        }
      });
    }

    $scope.bolusAlert = function() {
      swal("Active Bolus:", {
        content: "input",
        buttons: "Confirm",
      }).then((value) => {
        if (value) {
          $scope.$apply(() => {
            $scope.object.bolusLevel += parseFloat(value);
          });
          swal(`Active Bolus: ${value}`, {
            icon: "success",
            buttons: false,
            timer: 2000
          });
        }
      });
    }

    $scope.bgAlert = function() {
      swal("Current BG:", {
        content: "input",
        buttons: "Confirm"
      }).then((value) => {
        if (value) {
          $scope.$apply(() => {
            $scope.object.bolusLevel = parseFloat(value);
          });
          swal(`Current BG: ${value}`, {
            icon: "success",
            buttons: false,
            timer: 2000
          });
        }
      });
    }

    $scope.goTo = function(page) {
      $scope.currentPage = page;
    };

    $scope.changeBgLevel = function() {
      $scope.object.bgLevel = $scope.bgLevel;
      $scope.object.timestamp = moment().calendar();
    };

    $scope.changeAutomode = function() {
      $scope.automode = $scope.automode ? false : true;
    };

    $scope.changeBolusLevel = function() {
      $scope.object.bolusLevel = $scope.bolusLevel;
      $scope.object.timestampBolus = moment().calendar();
    };

    $(document).ready(function() {
      graph();
    });
  });