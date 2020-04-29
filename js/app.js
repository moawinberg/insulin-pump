
angular.module('MainApp', [
  'MainApp.controllers'
]);
angular.module('MainApp.controllers', []).
  controller('mainController', function($scope) {
    $scope.currentPage = 'home';
    $scope.object = {
      bgLevel: 6.4,
      timestamp: moment().calendar(),
      timestampBolus: moment().calendar(),
      bolusLevel: 0,
    };
    $scope.bgLevel = null;
    $scope.bolusLevel = null;
    $scope.automode = true;
    $scope.activeIndex = 0;

    function graph(labels, datasets) {
      if (!document.getElementById('chart')) {
        return;
      }
      const ctx = document.getElementById('chart').getContext('2d');
      $scope.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          },
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

    function createDataSets() {
      const result = [];
      let counter = 0;

      for (let i = 0; i <= 4; i++) {
        dataset = {};
        let color = 'rgb(128, 128, 128, 0.2)';
        let radius = 0;
        let dash = [];
        let border = 1;
        let dataItems = [];
        let order;

        if (counter === 0) {
          order = 4;
          color = '#FB8C00';
          radius = 2;
          border = 2;
          dataItems = [8, 7, 5.5, 7, 7, 8, 9, 8, 7, 5.5, 7, 7, 6.4];
        } else if (counter === 1) {
          order = 3;
          for (let j = 0; j < 14; j++) {
            dataItems.push(15);
          }
        } else if (counter === 2) {
          order = 2;
          for (let j = 0; j < 14; j++) {
            dataItems.push(4);
          }
        } else if (counter === 3) {
          order = 2;
          color = '#FB8C00';
          radius = 6;
          for (let j = 0; j < 14; j++) {
            if (j === 12) {
              dataItems.push(6.4);
            } else {
              dataItems.push(null);
            }
          }
        } else if (counter === 4) {
          order = 1;
          border = 2;
          dash = [5, 2];
          for (let j = 0; j < 14; j++) {
            if (j === 12) {
              dataItems.push(6.4);
            } else if (j === 13) {
              dataItems.push(6);
            } else {
              dataItems.push(null);
            }
          }
        }

        dataset.order = order;
        dataset.id = counter;
        dataset.fill = false;
        dataset.backgroundColor = color;
        dataset.borderColor = color;
        dataset.pointRadius = radius;
        dataset.borderDash = dash;
        dataset.borderWidth = border;
        dataset.data = dataItems;

        result.push(dataset);

        counter += 1;
      };
      return result;
    }

    function createLabels(index) {
      let result = [];
      const currentDate = moment();

      if (index === 0) {
        let date = moment.utc(currentDate).subtract(22, 'hours');
        for (let i = 0; i < 14; i++) {
          result.push(moment(date).startOf('hour').format('HH:mm'));
          date = moment(date).add(2, 'hours');
        }
      } else if (index === 1) {
        let date = moment(currentDate).subtract(6, 'days');
        for (let i = 0; i < 7; i++) {
          result.push(moment(date).format('dd'));
          date = moment(date).add(1, 'days');
        }
      } else if (index === 2) {
        let date = moment(currentDate).subtract(3, 'weeks');
        for (let i = 0; i < 4; i++) {
          result.push(`v. ${moment(date).format('W')}`);
          date = moment(date).add(1, 'week');
        }
      } else if (index === 3) {
        let date = moment(currentDate).subtract(2, 'months');
        for (let i = 0; i < 3; i++) {
          result.push(moment(date).format('MMM'));
          date = moment(date).add(1, 'month');
        }
      } else if (index === 4) {
        let date = moment(currentDate).subtract(5, 'months');
        for (let i = 0; i < 6; i++) {
          result.push(moment(date).format('MMM'));
          date = moment(date).add(1, 'month');
        }
      }
      return result;
    }

    $scope.updateGraph = function(index) {
      $scope.activeIndex = index;

      if ($scope.chart) {
        $scope.chart.destroy;
      }

      const datasets = createDataSets();
      const labels = createLabels(index);
 
      graph(labels, datasets);
    };

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
    };

    $scope.bgAlert = function() {
      swal("Current BG:", {
        content: "input",
        buttons: "Confirm",
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
    };

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
      $scope.updateGraph(0);
    });
  });