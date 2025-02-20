# Elegant Egg Timer 🥚

## Overview
A stylish web-based egg timer with a minimalist design and smooth animations. Perfect for cooking eggs exactly how you like them.

## Features

### Multiple Egg Types:
- Soft-boiled (3:00)
- Medium-boiled (5:00)
- Hard-boiled (7:00)
- Poached (6:00)

### Visual Elements:
- Animated SVG egg with expressions
- Circular progress indicator
- Clean, modern interface
- Responsive design

### Functionality:
- Real-time countdown
- Progress tracking
- Cooking history
- Mobile vibration alerts (if supported)

## Technologies Used
- HTML5
- CSS3 (with animations)
- Vanilla JavaScript
- SVG for graphics

## Setup

1. **Clone the repository:**
   ```bash
   git clone [repository-url]

Start a local server:
python -m http.server 8000
Open in your browser:
http://localhost:8000/egg_timer.html
Usage
Select your desired egg type
Click "Start" to begin the timer
Wait for the alarm
Check cooking history for previous timings

## Code Structure
egg_timer.html: Main structure and SVG elements
styles.css: Styling and animations
script.js: Timer logic and interactions

## Challenges Faced During Development
SVG Animation Management
We needed to change the egg animation based on its state:

Floating when idle
Vibrating during cooking
Back to floating when done
Solution in JavaScript:

const eggSvg = document.querySelector('.egg-svg');

// When timer starts
eggSvg.classList.remove('float');
eggSvg.classList.add('cooking');

// When done
eggSvg.classList.remove('cooking');
eggSvg.classList.add('float');
Corresponding CSS:


.egg-svg {
    animation: float 3s ease-in-out infinite;
}

.egg-svg.cooking {
    animation: cooking 1s ease-in-out infinite;
}

Progress Ring Implementation
We needed to create a circle that fills progressively. The challenge was to correctly calculate the circle length and manage the filling animation.

Solution in JavaScript:

// 1. Calculate circumference
const radius = progressRing.r.baseVal.value; // Circle radius (45)
const circumference = radius * 2 * Math.PI;  // 2πr

// 2. Configure the stroke
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;

// 3. Progress animation
function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    progressRing.style.strokeDashoffset = offset;
}


## Future Improvements
Custom time settings
Sound notifications
More egg types
Temperature settings
Multiple simultaneous timers
Settings persistence
Dark/Light mode toggle
