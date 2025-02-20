****
Elegant Egg Timer 🥚
****
A stylish web-based egg timer with a minimalist design and smooth animations. Perfect for cooking eggs exactly how you like them.
Features

Multiple Egg Types:
        -Soft-boiled (3:00)
        -Medium-boiled (5:00)
        -Hard-boiled (7:00)
        -Poached (6:00)


Visual Elements:
        -Animated SVG egg with expressions
        -Circular progress indicator
        -Clean, modern interface
        -Responsive design

Functionality:
        Real-time countdown
        Progress tracking
        Cooking history
        Mobile vibration alerts (if supported)



Technologies Used
        -HTML5
        -CSS3 (with animations)
        -Vanilla JavaScript
        -SVG for graphics

-------------------------------------------------------------------------------
Setup
        -Clone the repository:
            bashCopygit clone [repository-url]

        Place these files in your project directory:
            plaintextCopyegg-timer/
            ├── egg_timer.html
            ├── styles.css
            └── script.js

        Start a local server:
            bashCopypython -m http.server 8000

        Open in your browser:
            Copyhttp://localhost:8000/egg_timer.html

-------------------------------------------------------------------------------

Usage
        -Select your desired egg type
        -Click "Start" to begin the timer
        -Wait for the alarm
        -Check cooking history for previous timings

Code Structure
        egg_timer.html: Main structure and SVG elements
        styles.css: Styling and animations
        script.js: Timer logic and interactions




-------------------------------------------------------------------------------
Challenges Faced During Development
    SVG Animation Management:
                // We needed to change the egg animation based on its state:
                // - Floating when idle
                // - Vibrating during cooking
                // - Back to floating when done

                sol° in js:          // We used CSS classes to manage states
                                    const eggSvg = document.querySelector('.egg-svg');

                                    // When timer starts
                                    eggSvg.classList.remove('float');
                                    eggSvg.classList.add('cooking');

                                    // When done
                                    eggSvg.classList.remove('cooking');
                                    eggSvg.classList.add('float');

                                    // Corresponding CSS
                                    .egg-svg {
                                        animation: float 3s ease-in-out infinite;
                                    }

                                    .egg-svg.cooking {
                                        animation: cooking 1s ease-in-out infinite;
                                    }



    Progress Ring Implementation:
        Calculating circle circumference
                // We needed to create a circle that fills progressively
                // The challenge was to correctly calculate the circle length
                // and manage the filling animation
    
                sol° in js:
                        // 1. Calculate circumference
                        const radius = progressRing.r.baseVal.value; // Circle radius (45)
                        const circumference = radius * 2 * Math.PI;  // 2πr

                        // 2. Configure the stroke
                        progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
                        // Example: if circumference = 283, then strokeDasharray = "283 283"
                        // This creates a 283px dash followed by a 283px gap

                        // 3. Progress animation
                        function setProgress(percent) {
                            // If percent = 0, offset = circumference (empty circle)
                            // If percent = 100, offset = 0 (full circle)
                            const offset = circumference - (percent / 100 * circumference);
                            progressRing.style.strokeDashoffset = offset;
                        }

Future Improvements

Custom time settings
Sound notifications
More egg types
Temperature settings
Multiple simultaneous timers
Settings persistence
Dark/Light mode toggle

