function createStopwatch() {
    const container = document.getElementById("stopwatches");

    const stopwatchDiv = document.createElement("div");
    stopwatchDiv.className = "stopwatch";

    const mainDisplay = document.createElement("span");
    mainDisplay.textContent = "00:00:00";
    mainDisplay.style.fontSize = "20px";
    mainDisplay.style.marginRight = "10px";

    const startButton = document.createElement("button");
    startButton.textContent = "Start";

    const stopButton = document.createElement("button");
    stopButton.textContent = "Stop";

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset";

    const lapButton = document.createElement("button");
    lapButton.textContent = "Lap";

    const lapList = document.createElement("ul");

    stopwatchDiv.appendChild(mainDisplay);
    stopwatchDiv.appendChild(startButton);
    stopwatchDiv.appendChild(stopButton);
    stopwatchDiv.appendChild(resetButton);
    stopwatchDiv.appendChild(lapButton);
    stopwatchDiv.appendChild(lapList);
    container.appendChild(stopwatchDiv);

    let mainTimer = null;
    let mainSeconds = 0;

    let currentLapSeconds = 0;
    let lapTimer = null;
    let currentLap = 0;

    function formatTime(totalSeconds) {
        const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const secs = String(totalSeconds % 60).padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    }

    function updateMainDisplay() {
        mainDisplay.textContent = formatTime(mainSeconds);
    }

    function updateLapDisplay(lapItem, lapSeconds) {
        lapItem.textContent = `Lap ${currentLap}: ${formatTime(lapSeconds)}`;
    }

    startButton.onclick = () => {
        if (!mainTimer) {
            mainTimer = setInterval(() => {
                mainSeconds++;
                updateMainDisplay();
            }, 1000);

            // Start the first lap when the stopwatch starts
            if (!lapTimer) {
                currentLap++;
                const lapItem = document.createElement("li");
                lapItem.textContent = `Lap ${currentLap}: 00:00:00`;
                lapList.appendChild(lapItem);

                lapTimer = setInterval(() => {
                    currentLapSeconds++;
                    updateLapDisplay(lapItem, currentLapSeconds);
                }, 1000);
            }
        }
    };

    stopButton.onclick = () => {
        clearInterval(mainTimer);
        clearInterval(lapTimer);
        mainTimer = null;
        lapTimer = null;
    };

    resetButton.onclick = () => {
        clearInterval(mainTimer);
        clearInterval(lapTimer);
        mainTimer = null;
        lapTimer = null;
        mainSeconds = 0;
        currentLapSeconds = 0;
        currentLap = 0;
        updateMainDisplay();
        lapList.innerHTML = ""; // Clear all laps
    };

    lapButton.onclick = () => {
        if (lapTimer) {
            clearInterval(lapTimer);
            lapTimer = null;

            // Record the next lap
            currentLapSeconds = 0;
            currentLap++;
            const lapItem = document.createElement("li");
            lapItem.textContent = `Lap ${currentLap}: 00:00:00`;
            lapList.appendChild(lapItem);

            // Start the new lap
            lapTimer = setInterval(() => {
                currentLapSeconds++;
                updateLapDisplay(lapItem, currentLapSeconds);
            }, 1000);
        }
    };
}

