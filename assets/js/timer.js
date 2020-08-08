

// Credit: Mateusz Rybczonec
/**
 * @class: Timer
 * @classdesc: Represents a Timer .   
 * @constructs
 * 
 * Modified as a class by me, added some minor code in for event completion 
 */

class Timer {

    constructor(gameDuration, game) {
        this.game = game;
        this.FULL_DASH_ARRAY = 283;
        this.WARNING_THRESHOLD = 10;
        this.ALERT_THRESHOLD = 5;
        this.TIME_LIMIT = gameDuration;
        this.timePassed = 0;
        this.timeLeft = this.TIME_LIMIT;
        this.timerInterval = null;
        this.notifyLossFunction = null;
        this.COLOR_CODES = {
            info: {
                color: "green"
            },
            warning: {
                color: "orange",
                threshold: this.WARNING_THRESHOLD
            },
            alert: {
                color: "red",
                threshold: this.ALERT_THRESHOLD
            }
        };
        this.remainingPathColor = this.COLOR_CODES.info.color;
    }


    setHTML() {
        document.getElementById("timer").innerHTML = `
        <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                class="base-timer__path-remaining ${this.remainingPathColor}"
                d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                "
            ></path>
            </g>
            </svg>
                <span id="base-timer-label" class="base-timer__label">${this.formatTime(
                            this.timeLeft
                        )}</span>
            </div>`;  
    }


    resetTimer() {
        this.timePassed = 0;
        this.timeLeft = this.TIME_LIMIT;
        this.remainingPathColor = this.COLOR_CODES.info.color;

    };

    stopTimer() {
        clearInterval(this.timerInterval);   
    }

    onTimesUp() {
        clearInterval(this.timerInterval);
        this.notifyLossFunction();
    }

        /**
     * @method: startTimer
     * 
     * @param {Method} Callback method to handle timer popped event
     * @param {Method} Callback method to get timer popped event
     * Core timer loop.  
     * if timer expires, (timer can be cancelled in the game, so this may not be called) 
     * calls the  notifyLossMethod method in param1
     * However it operates in it's own space so the this of the called is undefined. 
     * This means that the game never "knows" the timer popped. 
     * I got around this by carrying the callback owner in the constructor and updating it,
     * as well as updating the UI. 
     * It's clear that ALl of my classes should have had true getters and setters. 
     */
    startTimer(notifyLossMethod, lossCounterOwner) {
        this.notifyLossFunction = notifyLossMethod;
        this.timerInterval =  setInterval(() => {
            this.timePassed = this.timePassed += 1;
            this.timeLeft = this.TIME_LIMIT - this.timePassed;
            document.getElementById("base-timer-label").innerHTML = this.formatTime(
                this.timeLeft
            );
            this.setCircleDasharray();
            this.setRemainingPathColor(this.timeLeft);

            if (this.timeLeft === 0) {
                // Mike Document this hack, 
                if (arguments.length === 2) {
                    lossCounterOwner.lossCount++;
                    this.game.boardReady = false;
                    this.game.board.setGameOver(); 
                    $("#loss-count span").text(`${lossCounterOwner.lossCount}`);
                }
                this.onTimesUp();
            }
        }, 1000);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = this.COLOR_CODES;
        if (this.timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    }

    calculateTimeFraction() {
        const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
        return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
    }

    setCircleDasharray() {
        const circleDasharray = `${(
            this.calculateTimeFraction() * this.FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

}  // End of Timer