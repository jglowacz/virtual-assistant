// This module will serve to initialize all variables needed

export const init = () => {
    // Initializing SpeechRecognition Module
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false

    // Setting language to Polish for tests purposes
    recognition.lang = 'pl-Pl'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    const userMessage = document.getElementById('speech-container')
    const initButton = document.getElementById('speech-initialize')

    // Setting recognition start when user clicks anywhere on the display area
    initButton.onclick = () => {
        recognition.start()
        console.log('Ready to start recognition')
    }

    // Creating event that attaches transcription results and displays them in speech-container
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        userMessage.textContent = transcript
        readText(transcript)
        const newTab = 'nowa karta'
        transcript.toLowerCase() === newTab ? openEmptyTab() : console.log('I will not open a tab')
    }

    // To stop recognition when user stops talking
    recognition.onspeechend = () => {
        recognition.stop()
    }

    // In the unfortunate event of error
    recognition.onerror = (event) => {
        userMessage.textContent = 'Error occurred in recognition: ' + event.error
    }

    // Function to read the text out loud
    const readText = (msg) => {
        const speech = new SpeechSynthesisUtterance()
        speech.text = msg
        speech.volume = 0.95
        speech.rate = 0.95
        speech.pitch = 1
        window.speechSynthesis.speak(speech)
    }

}

