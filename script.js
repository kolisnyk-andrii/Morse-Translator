"use strict"

// get element
const inputField = document.getElementById("input_text");
const outputField = document.getElementById("output_text");
const convertBtn = document.querySelector(".convert");
const changeBtn = document.querySelector(".change");

// some let and const
let textContent = "";
let outputTextContent = "";
let isMorseToText = true; // glag

const type_1 = new Audio("type_1.wav");
const type_2 = new Audio("type_2.wav");
const pop = new Audio("pop.wav");
let rand_type;

function playAudio(audio)
{
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

// some events
inputField.addEventListener("input", function handleChange(event)
{
    textContent = event.target.value;

    rand_type = Math.random();
    if (rand_type < 0.5)
    {
        playAudio(type_1);
    }
    else
    {
        playAudio(type_2);
    }
});

convertBtn.addEventListener("click", function()
{
    if (isMorseToText)
    {
        outputTextContent = decodeMorse(textContent);
    }
    else
    {
        outputTextContent = encodeMorse(textContent);
    }
    outputField.value = outputTextContent;
    playAudio(pop);
});

changeBtn.addEventListener("click", function()
{
    isMorseToText = !isMorseToText;
    changeBtn.textContent = isMorseToText ? "Change type to text" : "Change type to morse";
    inputField.value = "";
    outputField.value = "";
});

// functions
function decodeMorse(morseCode)
{
    let ref =
    {
        '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h',
        '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p',
        '--.-': 'q', '.-.': 'r', '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
        '-.--': 'y', '--..': 'z', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
        '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0'
    };

    return morseCode.split('   ').map(
        word => word.split(' ').map(letter => ref[letter] || '').join('')
    ).join(' ');
}

function encodeMorse(text)
{
    let ref =
    {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
        'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
        'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
        'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----'
    };

    return text.toLowerCase().split(' ').map(
        word => word.split('').map(letter => ref[letter] || '').join(' ')
    ).join('   ');
}
