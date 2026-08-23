const pages = {
    home: `
        <h1>Eetu Turtiainen</h1>
        <h2>Junior Developer</h2> 
        <p>Welcome. This is my personal portfolio website. You can find out more about me and my projects here:</p>
        <p> > <a href='javascript:void(0)' class='terminal-link' onclick='switchPage("about")'>[ Open about_me.txt ]</a></p>
        <p> > <a href='javascript:void(0)' class='terminal-link' onclick='switchPage("projects")'>[ Move to projects folder ]</a></p>
    `,
    
    about: `
        <h1>About_Me.txt</h1>
        <p>I am a Junior Full Stack Developer with high interest for software architecture and data intensive applications.</p>
        <p>My core programming stack leans towards the JavaScript/TypeScript ecosystem with technologies like React, NextJS, NodeJS, 
        PostqreSQL and MongoDB, but I'm always interested in learning new technologies.</p>
        <p>I have also learned and used various AI coding assistants and tools like Copilot, Claude Code and OpenCode, and have a strong interest in AI and its applications in software development.</p>
        <p><a href='javascript:void(0)' class='terminal-link' onclick='switchPage("home")'>[ Return ]</a></p>
    `,
    
    projects: `
        <h1>/Projects</h1>
        <p>1. Terminal Portfolio UI - This current interactive user experience module.</p>
        <p>2. Team Project Dashboard - A real time collaborative dashboard for small teams to organize and synchronize tasks. <a href='javascript:void(0)' class='terminal-link-dev'>[ in development ]</a></p>
        <p><a href='javascript:void(0)' class='terminal-link' onclick='switchPage("home")'>[ Return ]</a></p>
    `
};

const speed = 20; 
let index = 0;
let currentText = "";
let typingTimeout = null; 

function cleanText(rawString) {
    return rawString.trim().replace(/^\s+/gm, '').replace(/\n/g, '');
}

function typeWriter() {
    const container = document.getElementById("typewriter");
    
    if (index < currentText.length) {
        if (currentText.charAt(index) === '<') {
            const tagEnd = currentText.indexOf('>', index);
            if (tagEnd !== -1) {
                index = tagEnd + 1;
            } else {
                index++;
            }
        } else {
            index++;
        }

        container.innerHTML = currentText.substring(0, index);

        const existingCursors = container.querySelectorAll('.active-cursor');
        existingCursors.forEach(el => el.classList.remove('active-cursor'));

        let activeNode = container.lastElementChild;
        while (activeNode && activeNode.lastElementChild) {
            activeNode = activeNode.lastElementChild;
        }

        if (activeNode) {
            activeNode.classList.add("active-cursor");
        } else {
            container.classList.add("active-cursor");
        }

        const bodyPanel = container.closest('.terminal-body');
        if (bodyPanel) {
            bodyPanel.scrollTop = bodyPanel.scrollHeight;
        }

        typingTimeout = setTimeout(typeWriter, speed);
    }
}

function switchPage(pageKey) {
    clearTimeout(typingTimeout);
    
    index = 0;
    currentText = cleanText(pages[pageKey]);
    document.getElementById("typewriter").innerHTML = "";

    typeWriter();
}

window.onload = function() {
    currentText = cleanText(pages.home);
    typeWriter();
};
