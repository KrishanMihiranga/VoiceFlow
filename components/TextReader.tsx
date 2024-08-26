'use client'

import { Poppins } from 'next/font/google'
import React, { useState } from 'react'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const TextReader = () => {
    const [randomText, setRandomText] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const generateRandomText = () => {
        const texts = [
            "This is the first random text.",
            "Here is another piece of random text.",
            "Random text generation is fun!",
        ];
        const randomIndex = Math.floor(Math.random() * texts.length);
        setRandomText(texts[randomIndex]);
        setCurrentWordIndex(0);
    }

    const readText = () => {
        const words = randomText.split(" ");
        const utterance = new SpeechSynthesisUtterance(randomText);

        utterance.onboundary = (event) => {
            const {charIndex} = event;
            const wordsUntilCurrent = randomText.substring(0, charIndex).split(" ");
            setCurrentWordIndex(wordsUntilCurrent.length - 1);
        }

        utterance.onend = () => {
            setCurrentWordIndex(words.length);
        }

        window.speechSynthesis.speak(utterance);
    }

    return (

        <div className={`m-5 ${poppins.className}`}>
            <button onClick={generateRandomText}>Generate Random Text</button>
            {randomText && (
                <div className="my-5 text-lg">
                    {randomText.split(" ").map((word, index) => (
                        <span
                            key={index}
                            className={`mr-1 ${index === currentWordIndex ? 'bg-yellow-400' : 'bg-transparent'}`}
                        >
                            {word}
                        </span>
                    ))}
                </div>
            )}
            {randomText && <button onClick={readText}>Play</button>}
        </div>
    )
}

export default TextReader