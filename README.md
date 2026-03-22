# John Paul M. Budy — Personal Portfolio

A responsive personal portfolio website showcasing my work as a Junior Software Developer. Built with HTML5, CSS3, and Vanilla JavaScript — no frameworks, no build tools, ready to host on GitHub Pages instantly.

**Live Site:** `https://jaypasks.github.io/myportfolio`

---

## 🌟 Features

- **Responsive Design** — Mobile-first layout that works on all screen sizes
- **Retro Beige / Warm Gray Theme** — Custom CSS variables for easy color changes
- **Scroll Animations** — AOS (Animate On Scroll) library
- **Functional Contact Form** — EmailJS integration with client-side validation
- **Project Detail Pages** — Dedicated screenshot galleries for each project
- **Image Modal Viewer** — Keyboard-navigable lightbox for screenshots

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (Grid, Flexbox, Custom Properties) |
| Logic | Vanilla JavaScript (ES6+) |
| Animations | AOS 2.3.1 |
| Icons | Font Awesome 6.4.0 |
| Fonts | Google Fonts — Inter |
| Email | EmailJS Browser SDK v4 |

---

## 📁 Project Structure

```
myportfolio/
├── index.html                  # Main portfolio page
├── project-frass.html          # FRASS project screenshot gallery
├── project-ezresults.html      # EZResults project screenshot gallery
├── css/
│   ├── style.css               # Global styles & CSS variables
│   ├── responsive.css          # Responsive breakpoints
│   ├── project-frass.css       # FRASS page styles
│   └── project-ezresults.css   # EZResults page styles
├── js/
│   ├── main.js                 # Navigation, mobile menu, scroll behavior
│   ├── animations.js           # AOS init, counter & parallax animations
│   ├── contact-form.js         # EmailJS form handling & validation
│   └── frass-screenshots.js    # Modal viewer & image navigation
├── assets/
│   ├── images/
│   │   └── projects/
│   │       ├── FRASS/          # FRASS screenshot images
│   │       └── EZRESULTS/      # EZResults screenshot images
│   └── resume.docx             # Downloadable resume
└── README.md
```

---

## 🌐 Deployment — GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Click **Save**. Your site will be live at:
   ```
   https://jaypasks.github.io/myportfolio
   ```

> **Important:** All file paths in the HTML use forward slashes (`/`). This is required for Linux-based GitHub Pages servers.

---

## 🔧 Local Development

No build step required. Just open with a live server:

```bash
# Python (built-in)
python -m http.server 8000

# Node.js
npx live-server

# VS Code — install "Live Server" extension, then right-click index.html → Open with Live Server
```

---

## ✉️ Contact Form Setup

The contact form uses [EmailJS](https://www.emailjs.com/). The credentials are stored in `js/contact-form.js`:

| Variable | Value |
|---|---|
| Service ID | `service_wnljfbw` |
| Template ID | `template_xkoc4bn` |
| Public Key | configured in `EMAILJS_CONFIG` |

If you fork this portfolio, replace these values with your own EmailJS credentials.

---

## 📱 Responsive Breakpoints

| Breakpoint | Width |
|---|---|
| Large Tablet / Small Desktop | ≤ 1024px |
| Tablet | ≤ 768px |
| Mobile | ≤ 480px |
| Extra Small | ≤ 320px |

---

## 📞 Contact

**John Paul M. Budy**
- Email: budyjohnpaul80@gmail.com
- LinkedIn: [john-paul-budy-62393a341](https://www.linkedin.com/in/john-paul-budy-62393a341/)
- GitHub: [@jaypasks](https://github.com/jaypasks)
- Location: Virac, Catanduanes, Philippines
