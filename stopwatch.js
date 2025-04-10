function createStopwatch() {
    const container = document.getElementById("stopwatches");

    const stopwatchDiv = document.createElement("div");
    stopwatchDiv.className = "stopwatch";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Stopwatch Name";
    nameInput.style.fontSize = "16px";
    nameInput.style.marginRight = "10px";

    const mainDisplay = document.createElement("span");
    mainDisplay.textContent = "00:00.00";
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

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    const lapList = document.createElement("ul");

    stopwatchDiv.appendChild(nameInput);
    stopwatchDiv.appendChild(mainDisplay);
    stopwatchDiv.appendChild(startButton);
    stopwatchDiv.appendChild(stopButton);
    stopwatchDiv.appendChild(resetButton);
    stopwatchDiv.appendChild(lapButton);
    stopwatchDiv.appendChild(deleteButton);
    stopwatchDiv.appendChild(lapList);
    container.appendChild(stopwatchDiv);

    let mainTimer = null;
    let startTime = 0;
    let lapCount = 0;
    let lastLapEndTime = 0; // To store the total time of the previous lap

    function formatTime(totalMilliseconds) {
        const totalSeconds = Math.floor(totalMilliseconds / 1000); // Now dividing by 1000 for seconds
        const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const secs = String(totalSeconds % 60).padStart(2, "0");
        const milliseconds = totalMilliseconds % 1000;
        const hundredths = String(Math.floor(milliseconds / 10)).padStart(2, "0"); // Get hundredths
        return `${mins}:${secs}.${hundredths}`;
    }

    function updateDisplay() {
        const now = Date.now();
        const elapsedMilliseconds = now - startTime;
        mainDisplay.textContent = formatTime(elapsedMilliseconds);
        if (lapList.lastChild) {
            const lastLapItem = lapList.lastChild;
            const currentLapRunningTime = now - lastLapEndTime;
            const totalTime = elapsedMilliseconds;
            lastLapItem.textContent = `Lap ${lapCount}: ${formatTime(currentLapRunningTime)} | ${formatTime(totalTime)}`;
        }
    }

    startButton.onclick = () => {
        if (!mainTimer) {
            startTime = Date.now() - (mainTimer ? (Date.now() - startTime) : 0); // Adjust for pause
            mainTimer = setInterval(updateDisplay, 10);
            if (lapCount === 0) {
                lapCount = 1;
                const lapItem = document.createElement("li");
                lapItem.textContent = `Lap ${lapCount}: 00:00.00 | 00:00.00`;
                lapList.appendChild(lapItem);
                lastLapEndTime = startTime;
            }
        }
    };

    stopButton.onclick = () => {
        clearInterval(mainTimer);
        mainTimer = null;
    };

    resetButton.onclick = () => {
        clearInterval(mainTimer);
        mainTimer = null;
        startTime = 0;
        lapCount = 0;
        lastLapEndTime = 0;
        updateMainDisplay();
        lapList.innerHTML = "";
    };

    lapButton.onclick = () => {
        if (mainTimer) {
            const currentTime = Date.now();
            const lapSplitTime = currentTime - lastLapEndTime;
            const lapItem = document.createElement("li");
            lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapSplitTime)} | ${formatTime(currentTime - startTime)}`;
            lapList.appendChild(lapItem);
            lapCount++;
            lastLapEndTime = currentTime;
        }
    };

    deleteButton.onclick = () => {
        clearInterval(mainTimer);
        stopwatchDiv.remove();
    };
}

window.onload = () => {
    const addStopwatchButton = document.createElement("button");
    addStopwatchButton.id = "addStopwatch";
    addStopwatchButton.textContent = "Add New Stopwatch";
    addStopwatchButton.onclick = createStopwatch;
    document.body.appendChild(addStopwatchButton);

    const stopwatchesContainer = document.createElement("div");
    stopwatchesContainer.id = "stopwatches";
    document.body.appendChild(stopwatchesContainer);
};
