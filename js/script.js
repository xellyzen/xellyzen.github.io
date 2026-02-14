document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bg-music");
    const unlockBtn = document.getElementById("unlock-btn");
    const codeInput = document.getElementById("code-input");
    const overlay = document.getElementById("overlay");
    const content = document.getElementById("content");
    const typedText = document.getElementById("typed-text");

    const correctCode = "021426"; // Set your static code here
    const message = 
`Hey <span style="color: red;">Miko</span>,\n\n 
Happy Valentine’s Day! Just wanted to send a quick message to say that I really appreciate you and our friendship. 
Looking back at how we met in a <span style="color: lightblue;">crazy gooner place</span> and eventually became close (hopefully) and good friends.\n\n 
I still always think about you as our days go on, our <span style="color: lightgreen;">conflicting timezones</span> of me being <span style="color: brown;">11 hours ahead</span> is a bit challenging but nonetheless, 
I try to find time to be sappy and <span style="color: gold;">spend time with you</span>.\n\n 
Thanks for being such a <span style="color: lightblue;">wonderful person</span>. 
Excited for <span style="color: gold;">alot more memories</span> and hopefully not <span style="color: red;">sad and frustrating ones</span>!\n\n 
Yours truly,\n <span style="color: purple;">Xel</span>`;
    
    const typingSound = new Audio("sfx/typewriter.mp3"); // Load typing sound
    typingSound.volume = 0.02; // Adjust volume if necessary

    function checkCode() {
        if (codeInput.value === correctCode) {
            // Play unlock sound
            let unlockSound = new Audio("sfx/unlock.mp3");
            unlockSound.play();

            // Fade out overlay
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.display = "none";
                content.style.display = "block";
                typeSentence(message, typedText);
            }, 1500); // Adjust timing to match cinematic fade
        } else {
            alert("Wrong code. Try again.");
        }
    }

    function typeSentence(sentence, element) {
        element.innerHTML = ""; // Clear previous text
    
        let index = 0;
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = sentence; // Convert string to HTML
    
        let nodes = Array.from(tempDiv.childNodes); // Convert child nodes to an array
        function typeNextNode(nodeIndex = 0) {
            if (nodeIndex < nodes.length) {
                let node = nodes[nodeIndex];
    
                if (node.nodeType === Node.TEXT_NODE) {
                    typeText(node.textContent, () => typeNextNode(nodeIndex + 1), element);
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    let newElement = document.createElement(node.tagName);
                    Array.from(node.attributes).forEach(attr => newElement.setAttribute(attr.name, attr.value));
                    element.appendChild(newElement);
                    typeText(node.textContent, () => typeNextNode(nodeIndex + 1), newElement);
                }
            }
        }
    
        function typeText(text, callback, parent) {
            let j = 0;
            function typeChar() {
                if (j < text.length) {
                    let char = text.charAt(j);
                    if (char === "\n") {
                        parent.appendChild(document.createElement("br"));
                        setTimeout(typeChar, 1); // 2s delay for new lines
                    } else {
                        parent.innerHTML += char;
    
                        // Play typing sound
                        typingSound.currentTime = 0; // Restart sound
                        typingSound.play();
    
                        let delay = 100; // Default typing speed
                        if (char === ".") delay = 2000; // 2s delay for periods
                        else if (char === ",") delay = 600; // 1s delay for commas
                        else if (char === "-") delay = 600;
                        else if (char === "!") delay = 1000;
    
                        setTimeout(typeChar, delay);
                    }
                    j++;
                } else {
                    callback();
                }
            }
            typeChar();
        }
    
        typeNextNode();
    }
    
    

    unlockBtn.addEventListener("click", checkCode);
});
