'use client'

import { Poppins } from 'next/font/google'
import React, { useState } from 'react'
import { textsarr } from '@/utils/data'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const TextReader = () => {
    const [randomText, setRandomText] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    const generateRandomText = () => {
        const texts = textsarr;

        const randomIndex = Math.floor(Math.random() * texts.length);
        setRandomText(texts[randomIndex]);
        setCurrentWordIndex(0);
    }

    const readText = () => {
        if (synth && utterance) {
            synth.cancel();
        }

        const newUtterance = new SpeechSynthesisUtterance(randomText);
        const newSynth = window.speechSynthesis;

        newUtterance.onboundary = (event) => {
            const { charIndex } = event;
            const wordsUntilCurrent = randomText.substring(0, charIndex).split(" ");
            setCurrentWordIndex(wordsUntilCurrent.length - 1);
        }

        newUtterance.onend = () => {
            setCurrentWordIndex(randomText.split(" ").length);
            setIsPlaying(false);
        }

        newSynth.speak(newUtterance);
        setSynth(newSynth);
        setUtterance(newUtterance);
        setIsPlaying(true);
    }

    const pausePlayback = () => {
        if (synth) {
            synth.pause();
            setIsPlaying(false);
        }
    }

    const resumePlayback = () => {
        if (synth && utterance) {
            synth.resume();
            setIsPlaying(true);
        }
    }

    const handleAddText = () => {
        setRandomText(inputText);
        setCurrentWordIndex(0);
        setShowPopup(false);
    }

    return (
        <div className={`m-5 ${poppins.className} flex flex-col items-center justify-center`}>
            <div className='border w-full max-w-[600px] p-6 md:p-10 rounded-2xl border-gray-500 shadow-lg md:max-w-[1000px]'>
                {randomText && (
                    <div className="my-5 text-lg w-full leading-8 text-center break-words">
                        {randomText.split(" ").map((word, index) => (
                            <span
                                key={index}
                                className={`mr-1 ${index === currentWordIndex ? 'text-[#4DE438]' : 'text-gray-600'}`}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-wrap justify-center space-x-4 mt-8">
                <button
                    onClick={generateRandomText}
                    className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4DE438] transition duration-200"
                >
                    Generate Random Text
                </button>
                <button
                    onClick={() => {
                        setInputText('')
                        setShowPopup(true)
                    }}
                    className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4DE438] transition duration-200"
                >
                    Add your own
                </button>
                {randomText && (
                    <>
                        <button
                            onClick={readText}
                            className="bg-[#4DE438] text-gray-800 px-6 py-2 rounded-full hover:bg-[#3ac02f] focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
                        >
                            Play
                        </button>
                        <button
                            onClick={pausePlayback}
                            className="bg-yellow-500 text-gray-800 px-6 py-2 rounded-full hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
                        >
                            Pause
                        </button>
                        <button
                            onClick={resumePlayback}
                            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
                        >
                            Resume
                        </button>
                    </>
                )}
            </div>
    
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-white">Enter Text to Read</h2>
                        <textarea
                            rows={4}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-4 bg-gray-700 text-white placeholder-gray-400"
                            placeholder="Type your text here..."
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleAddText}
                                className="bg-[#4DE438] text-gray-800 px-4 py-2 rounded-full hover:bg-[#3ac02f] focus:outline-none focus:ring-2 focus:ring-[#4DE438] transition duration-200"
                            >
                                Add Text
                            </button>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TextReader
