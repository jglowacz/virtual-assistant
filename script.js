// Initializing SpeechRecognition Module

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;

// Setting language to Polish for tests purposes
recognition.lang = 'pl-Pl'
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Creating diagnostic read-only reference to value
const diagnostic = document.getElementById('speech-container')

// Setting recognition start when user clicks anywhere on the display area
document.body.onclick = () => {
    recognition.start();
    console.log('Ready to start recognition')
}

// Creating event that attaches transcription results and displays them in speech-container
recognition.onresult = (event) => {
    diagnostic.textContent = event.results[0][0].transcript;
}

// To stop recognition when user stops talking
recognition.onspeechend = () => {
    recognition.stop();
}

// In the unfortunate event of error
recognition.onerror = (event) => {
    diagnostic.innerHTML = 'Error occurred in recognition: ' + event.error;
}