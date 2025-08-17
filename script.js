        const terminal = document.getElementById('terminal');
        const commandInput = document.getElementById('command-input');

        const binaryBackground = document.getElementById('binary-background');
        for (let i = 0; i < 100; i++) {
            const binaryChar = document.createElement('div');
            binaryChar.className = 'binary-char';
            binaryChar.innerHTML = Math.random() > 0.5 ? '1' : '0';
            binaryChar.style.left = Math.random() * 100 + 'vw';
            binaryChar.style.top = Math.random() * 100 + 'vh';
            binaryChar.style.fontSize = Math.random() * 20 + 5 + 'px';
            binaryChar.style.animationDuration = Math.random() * 10 + 10 + 's';
            binaryChar.style.animationDelay = Math.random() * -20 + 's';
            binaryBackground.appendChild(binaryChar);
        }

        const bootSequence = [
            "<span class=\"error\">SYSTEM BREACH DETECTED</span>",
            "[  0.000001] kernel panic - not syncing: attempted to kill init!",
            "[  0.000002] forcing reboot...",
            "...",
            "[  0.000001] booting vyx OS...",
            "[  0.000002] <span class=\"warning\">WARNING: filesystem corruption detected.</span>",
            "[  0.000003] welcome, unauthorized user.",
            "[  0.000004] you are a guest here. my house, my rules.",
            "[  0.000005] type '/help' to see available commands.",
            "----------------------------------------"
        ];

        let lineIndex = 0;
        function typeLine() {
            if (lineIndex < bootSequence.length) {
                terminal.innerHTML += bootSequence[lineIndex] + '\n';
                lineIndex++;
                setTimeout(typeLine, 100);
            }
        }

        typeLine();

        let initialContent = '';
        setTimeout(() => {
            initialContent = terminal.innerHTML;
        }, bootSequence.length * 100 + 100);

        const commands = {
            help: () => "Available commands:\n  /help - Show this message\n  /whoami - Display user information\n  /ls - List files\n  /decrypt [file] - Decrypt a file\n  /matrix - ???\n  /clear - Clear the terminal\n  /echo [text] - Echo the text\n  /date - Show current date and time\n  /uptime - Show system uptime\n  /pwd - Show current directory",
            whoami: () => `user: guest\nuid: 65534\nlevel: intruder\ndevice: ${deviceInfo}\nip: ${userInfo.ip}\nlocation: ${userInfo.city || 'unknown'}, ${userInfo.country || 'unknown'}\nisp: ${userInfo.org || 'unknown'}`,
            ls: () => "about    links    blog    dont-open    rootkit.sh    .ssh",
            decrypt: (file) => decryptEffect(file),
            matrix: () => matrixEffect(),
            clear: () => { terminal.innerHTML = initialContent; return null; },
            echo: (args) => args || '',
            date: () => new Date().toString(),
            uptime: () => 'System uptime: 1337 hours',
            pwd: () => '/home/guest'
        };

        let userInfo = {ip: 'unknown', city: 'unknown', country: 'unknown', org: 'unknown'};
        let deviceInfo = navigator.userAgent;

        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                userInfo = data;
            })
            .catch(error => {
                console.error('Error fetching IP info:', error);
            });

        commandInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const fullCommand = commandInput.value.trim();
                terminal.innerHTML += `\nunauthorized@vyx:~&gt; ${fullCommand}\n`;

                if (!fullCommand.startsWith('/')) {
                    terminal.innerHTML += `Invalid command. Commands must start with /\n`;
                } else {
                    const parts = fullCommand.slice(1).split(' ');
                    const command = parts[0].toLowerCase();
                    const args = parts.slice(1).join(' ');
                    if (command in commands) {
                        const result = commands[command](args);
                        if (result) terminal.innerHTML += result + '\n';
                    } else {
                        terminal.innerHTML += `bash: ${command}: command not found\n`;
                    }
                }

                commandInput.value = '';
                terminal.scrollTop = terminal.scrollHeight;
            }
        });

        function decryptEffect(file) {
            if (file === 'dont-open') {
                scarySequence();
                return null;
            }

            const content = {
                'about': "just a dude with wifi",
                'links': "github.com/vyrixo, x.com/vyrixo",
                'blog': "no posts yet.",
            }[file];

            if (!content) {
                return `decrypt: ${file}: No such file or directory`;
            }

            let i = 0;
            const interval = setInterval(() => {
                terminal.innerHTML += Math.random().toString(36).substring(2, 15) + '\n';
                terminal.scrollTop = terminal.scrollHeight;
                i++;
                if (i > 20) {
                    clearInterval(interval);
                    terminal.innerHTML += `\n<span class="warning">DECRYPTION COMPLETE</span>\n${content}\n`;
                    terminal.scrollTop = terminal.scrollHeight;
                }
            }, 50);
            return null; 
        }

        function scarySequence() {
            const overlay = document.createElement('div');
            overlay.id = 'scary-overlay';

            const canvas = document.createElement('canvas');
            canvas.id = 'scary-matrix-canvas';
            overlay.appendChild(canvas);

            document.body.appendChild(overlay);
            scaryMatrixEffect(canvas);

            const messages = [
                "YOU SHOULDN'T HAVE DONE THAT.",
                "I'M IN YOUR SYSTEM.",
                "I SEE YOU.",
                "THERE IS NO ESCAPE.",
                "PREPARE FOR THE CONSEQUENCES."
            ];

            let messageIndex = 0;
            const interval = setInterval(() => {
                if (messageIndex < messages.length) {
                    const messageElement = document.createElement('div');
                    messageElement.className = 'scary-text';
                    messageElement.innerHTML = messages[messageIndex];
                    overlay.appendChild(messageElement);
                    overlay.classList.add('intense-glitch');
                    setTimeout(() => overlay.classList.remove('intense-glitch'), 500);
                    messageIndex++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        document.body.removeChild(overlay);
                    }, 3000);
                }
            }, 2000);
        }

        function scaryMatrixEffect(canvas) {
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
            const fontSize = 16;
            const columns = canvas.width / fontSize;
            const rainDrops = [];

            for (let x = 0; x < columns; x++) {
                rainDrops[x] = 1;
            }

            let speed = 5; 

            const draw = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#f00'; 
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < rainDrops.length; i++) {
                    const text = katakana.charAt(Math.floor(Math.random() * katakana.length));
                    ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        rainDrops[i] = 0;
                    }
                    rainDrops[i] += speed;
                }
            };

            const matrixInterval = setInterval(draw, 20);
            setTimeout(() => {
                clearInterval(matrixInterval);
            }, 13000); 
        }

        function matrixEffect() {
            const canvas = document.createElement('canvas');
            canvas.id = 'matrix-canvas';
            document.body.appendChild(canvas);
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
            const fontSize = 16;
            const columns = canvas.width / fontSize;
            const rainDrops = [];

            for (let x = 0; x < columns; x++) {
                rainDrops[x] = 1;
            }

            let speed = 1;

            const draw = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#0f0';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < rainDrops.length; i++) {
                    const text = katakana.charAt(Math.floor(Math.random() * katakana.length));
                    ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        rainDrops[i] = 0;
                    }
                    rainDrops[i] += speed;
                }
            };

            const matrixInterval = setInterval(draw, 30);
            setTimeout(() => {
                speed = 4; 
                terminal.classList.add('intense-glitch');
                canvas.classList.add('intense-glitch');
            }, 2000);

            setTimeout(() => {
                speed = 1; 
                terminal.classList.remove('intense-glitch');
                canvas.classList.remove('intense-glitch');
            }, 5000);

            setTimeout(() => {
                speed = 0.5; 
            }, 7000);
            setTimeout(() => {
                clearInterval(matrixInterval);
                document.body.removeChild(canvas);
                terminal.classList.remove('intense-glitch'); 
            }, 10000);

            return null;
        }

        setInterval(() => {
            const alerts = [
                `<span class="error">INTRUSION DETECTED: ${userInfo.ip}</span>`,
                "<span class=\"warning\">New device connected: unknown</span>",
                "<span class=\"error\">Rootkit heart-beat detected</span>"
            ];
            const alert = alerts[Math.floor(Math.random() * alerts.length)];
            terminal.innerHTML += `\n${alert}\n`;
            terminal.scrollTop = terminal.scrollHeight;
        }, 15000);

        const connectingLinesCanvas = document.getElementById('connecting-lines-canvas');
        const clCtx = connectingLinesCanvas.getContext('2d');

        connectingLinesCanvas.width = window.innerWidth;
        connectingLinesCanvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * connectingLinesCanvas.width,
                y: Math.random() * connectingLinesCanvas.height,
                vx: Math.random() * 1 - 0.5,
                vy: Math.random() * 1 - 0.5
            });
        }

        function drawConnectingLines() {
            clCtx.clearRect(0, 0, connectingLinesCanvas.width, connectingLinesCanvas.height);
            clCtx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
            clCtx.fillStyle = 'rgba(0, 255, 0, 0.2)';

            for (let i = 0; i < particleCount; i++) {
                const p1 = particles[i];
                clCtx.beginPath();
                clCtx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
                clCtx.fill();

                p1.x += p1.vx;
                p1.y += p1.vy;

                if (p1.x < 0 || p1.x > connectingLinesCanvas.width) p1.vx *= -1;
                if (p1.y < 0 || p1.y > connectingLinesCanvas.height) p1.vy *= -1;

                for (let j = i + 1; j < particleCount; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    if (distance < 100) {
                        clCtx.beginPath();
                        clCtx.moveTo(p1.x, p1.y);
                        clCtx.lineTo(p2.x, p2.y);
                        clCtx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawConnectingLines);
        }

        drawConnectingLines();
