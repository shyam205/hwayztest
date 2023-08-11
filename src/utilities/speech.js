import { useState, useEffect } from "react"

const SpeechRecognition = window?.SpeechRecognition || window.webkitSpeechRecognition

let recognition
if (!!SpeechRecognition) {
    recognition = new SpeechRecognition()
}

export function useSpeechRecognition() {
    const [recordedText, setRecordedText] = useState("")
    const [listening, setListening] = useState(false)

    useEffect(() => {
        const onRecognitionStart = e => {
            setListening(true)
        }
    
        const onRecognitionEnd = e => {
            setListening(false)
            setRecordedText(prev => !!prev? "": prev)
        }
        const onRecognitionResult = e => {
            const result = e.results[0][0].transcript
            setRecordedText(result)
        }
        // recognition.addEventListener("start", onRecognitionStart)
        // recognition.addEventListener("end", onRecognitionEnd)
        // recognition.addEventListener("result", onRecognitionResult)
        return () => {
            if (recognition) {
                recognition.stop()
            }
        }
    }, [])
    
    const startRecognition = () => {
        if (recognition && !listening) {
            recognition.start()
        }
    }

    const stopRecognition = () => {
        if (recognition && listening) {
            recognition.stop()
        }
    }

    return {
        isSupported: !!SpeechRecognition,
        listening,
        recordedText,
        startRecognition,
        stopRecognition
    }

}