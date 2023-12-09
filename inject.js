function load() {
    // Check if its a playlist page
    var intervalId = setInterval(function() {
        var tracksSummaryElement = document.querySelector('.fullHero__tracksSummary');
        if (tracksSummaryElement) {
            clearInterval(intervalId);
            inject(); // It is a playlist
        }
        // Check multiple times
        if (intervalId.checkCount === undefined) {
            intervalId.checkCount = 0;
        }
        intervalId.checkCount++;
        if (intervalId.checkCount >= 30) {
            clearInterval(intervalId);
        }
    }, 100);
}

function inject() {
    // Get target
    var container = document.getElementsByClassName('fullHero__foreground')[0];

    // Make div with button
    var div = document.createElement("div");
    var button = document.createElement("button");
    button.innerHTML = "Autoload";

    // Style the button
    var style = document.createElement('style');
    style.innerHTML =
        '.autoload_button button {' +
            'height: 5.5em;' +
            'width: 5.5em;' +
            'color: #ffffff;' +
            'background-color: #ff5500;' +
            'border-style: none;' +
            'border-radius: 50%;' +
            'box-shadow: none;' +
            'margin-top: 6em;' +
            'margin-left: 1.75em;' +
        '}' +
        '.autoload_button button:hover {' +
            'background-color: #ff3300;' +
        '}' +
        '.autoload_button button:disabled {' +
            'background-color: #333333;' +
            'opacity: 0.5;' +
        '}'
        ;
    document.head.appendChild(style)
    div.setAttribute('class', 'autoload_button');

    // Add it to the target
    container.appendChild(div);
    div.appendChild(button);
    
    // Disable if we don't need to load anything
    var trackAmount = parseInt(document.querySelector('.genericTrackCount__title').textContent);
    if (trackAmount <= 15) {
        button.disabled = true;
    }

    // Add click Function
    const buttonOnClick = () => {
        button.disabled = true;
        scroll();
        loop();
        function loop() {
            setTimeout(function() {
                var lastTrackElement = document.querySelector('ul.trackList__list li:last-child');
                var numberElement = lastTrackElement.querySelector(".trackItem__number");
                if (numberElement && numberElement.textContent) {
                    var numberText = numberElement.textContent.trim();
                    var numberValue = parseInt(numberText);
                    // Keep looping if we haven't reached the bottom
                    if (trackAmount > numberValue) {
                        scroll()
                    }
                    // At the bottom, one last scroll
                    if (trackAmount == numberValue) {
                        scroll()
                        return;
                    }
                }
            loop();
            }, 250)
        }
    };

    button.addEventListener('click', buttonOnClick);
    
}

function scroll() {
    window.scrollTo({
        top: document.documentElement.scrollHeight
    });
}

load();