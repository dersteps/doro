'use strict';

const fs = require('fs');
const {app} = require('electron').remote;
const path = require('path');

var angularApp = angular.module('doroApp', []);

angularApp.controller('menuCtrl', function($scope) {
    
});


angularApp.controller('doroCtrl', function($scope) {

     // If present, read user config
    console.log("User home: " + app.getPath('home'));
    const doroHome = path.join(app.getPath('home'), '.doro');
    const configFile = path.join(doroHome, 'doro.cfg');
    let workTime = 25 * 60 * 1000;
    let breakTime = 5 * 60 * 1000;
    let longBreakTime = 10 * 60 * 1000;
    let iterations = 3;

    if(fs.existsSync(configFile)) {
        // Read it as JSON, configure
        var json = getJSONData(configFile);
        workTime = json['worktime'];
        breakTime = json['breaktime'];
        longBreakTime = json['longbreaktime'];
        iterations = json['iterations'];
    } else {
        // Create default config
        const defaultConfig = '{ "worktime": "1500000", "breaktime": "300000", "longbreaktime": "600000", "iterations": "3"}';
        fs.mkdir(doroHome, (error) => {
            if(error) {
                let notif = new Notification("Bad news", {body: "Unable to create own home directory: " + error});
                return;
            }

            fs.writeFile(configFile, defaultConfig, (error) => {
                console.log("In vallback now");
                if(error) {
                    let notif = new Notification("Bad news!", { body: "ERROR: " + error});
                    return;
                }
                let notif = new Notification("Good news", { body: "Default config file created: " + configFile });
                notif.onclick = () => { };
            });

        });
        
    }


    $scope.session = new Session();
    for(var i=0; i<iterations; i++) {
        $scope.session.add(new Pomodoro(workTime, "Work #" + (i+1)));
        if(i == iterations-1) {
            $scope.session.add(new Pomodoro(longBreakTime, "Long break"));
        } else {
            $scope.session.add(new Pomodoro(breakTime, "Break #" + (i+1)));
        }
    }

    $scope.showSettings = () => {
        alert("Display settings");
    };

    $scope.pausePomodoro = () => {
        $scope.currentPomodoro.pause();
    };

    $scope.resumePomodoro = () => {
        $scope.currentPomodoro.resume();
    };

    $scope.startSession = () => {
        go($scope.session.next());
    };

    
    function getJSONData(filepath) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }

   

    


    

    function go(pomodoro) {
        $scope.remaining = "???";
        $scope.currentPomodoro = pomodoro;
        if($scope.currentPomodoro === null) {
            console.log("Done");
            alert("Done");
            return;
        }
        $scope.name = $scope.currentPomodoro.name;
        $scope.currentPomodoro.start((remaining, pomodoro) => {
            console.log("Raw remaining: " + remaining);
            $scope.$apply(function(){
                $scope.remaining = toHuman(remaining);
                console.log("$scope.remaining = " + $scope.remaining);
                
             });
        }, (pom) => {
            $scope.remaining = "00:00";
            go($scope.session.next());
        });
    }

    


});
