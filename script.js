# Axiom DevConsole | AI Command Dashboard UI

## Precision in Interface: Replicating a Modern Dev Console

"Axiom DevConsole" is a meticulous front-end replication of a sophisticated AI development interface, heavily inspired by the visual language of Google AI Studio. This project demonstrates advanced CSS layout techniques (Grid and Flexbox), component-based styling, and subtle JavaScript interactivity to create a functional and visually stunning dark-themed web application. Optimized for seamless deployment on GitHub Pages, it serves as an exemplar of modern UI/UX architecture.

### Project Type

Developer Console / Web Application UI / Dashboard Interface

### Design Philosophy

*   **Dark Theme Aesthetic**: Built on a refined palette of dark grays, muted texts, and a crisp blue accent, designed for reduced eye strain during prolonged use.
*   **Structured Layout (Grid & Flexbox)**: A rigid yet flexible three-column layout (left nav, main content, right settings panel) provides clear content segmentation.
*   **Atomic Component Design**: Individual UI elements like buttons, input fields, sliders, and toggles are styled consistently and with attention to pixel-perfect detail, ensuring scalability and maintainability.
*   **Intuitive Typography**: Utilizes the 'Inter' typeface with varying weights to establish clear visual hierarchy and readability for code, labels, and general text.
*   **Functional Icons & Interaction**: Inline SVG icons for scalability and visual clarity. Interactions (hovers, active states, toggle animations) are subtle, responsive, and provide clear user feedback.
*   **Mobile Adaptability**: Designed with responsiveness in mind, allowing the sidebars to collapse or become overlays on smaller screens, mirroring common app patterns.

### Features

*   **Semantic HTML5 Structure**: Clean and logical structure for accessibility and maintainability.
*   **Three-Column Layout**: Dedicated navigation, primary workspace (chat/code), and settings panel.
*   **Styled Navigation**: Interactive sidebar navigation with active states and integrated SVG icons.
*   **Dynamic Chat/Code Area**: A `contenteditable` `pre` tag simulates a text editor or prompt input.
*   **Responsive Header Actions**: A row of functional icon buttons mirroring common developer tool controls.
*   **Interactive Settings Panel**:
    *   Dropdown menu styling.
    *   Dynamic temperature slider with live value display.
    *   Custom-styled toggle switch for "Thinking mode."
    *   Collapsible "Tools" section using CSS transitions and JavaScript.
    *   Adjustable small toggle switches within collapsible sections.
*   **Optimized for GitHub Pages**: Includes `.nojekyll` for direct static site hosting.

### Technologies Used

*   **HTML5**: The backbone structure of the UI.
*   **CSS3**: Extensive custom styling, including CSS Grid, Flexbox, variables, and transitions to achieve the precise look and feel.
*   **JavaScript (Vanilla JS)**: Implements UI interactivity for navigation, sliders, toggles, and collapsing sections.
*   **Google Fonts**: `Inter` for its modern and versatile appearance.
*   **Inline SVG Icons**: For sharp, scalable, and customizable iconography.

### Getting Started

To get a local copy up and running for preview or development:

#### Prerequisites

You only need a modern web browser. Git is required for pushing to GitHub.

#### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://your-github-username/axiom-devconsole.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd axiom-devconsole
    ```
3.  **Place Icons (Optional, but recommended for full visual fidelity):**
    If you wish to host your own icons instead of the inline SVGs (for larger icon sets, etc.), place them in `assets/icons/`. The current setup uses inline SVGs directly in `index.html` to simplify deployment for quick preview, but in a real project you'd manage SVG assets.
    (For this exercise, the SVG path data is included directly in the HTML to show the intended icon style.)
4.  **Open `index.html`:**
    Simply open the `index.html` file in your web browser.

### Deployment (GitHub Pages)

This project is configured for easy deployment to GitHub Pages:

1.  **Create a new GitHub repository** (e.g., `axiom-devconsole`).
2.  **Push your code to the new repository.**
3.  **Go to your repository settings on GitHub.com.**
4.  **Under the "Pages" section, select the `main` branch as your source** and save.
5.  **Ensure a `.nojekyll` file exists in your root directory.** This prevents GitHub Pages from processing your site with Jekyll, ensuring pure HTML/CSS/JS deployment.
6.  Your site will be live at `https://your-github-username.github.io/axiom-devconsole/`.

### Customization

*   **Colors**: Modify the CSS variables under `:root` in `style.css` to change the theme's palette.
*   **Layout**: Adjust `grid-template-columns` in `.app-container` within `style.css` for different sidebar widths.
*   **Components**: Tweak padding, margins, border-radii, and hover effects for any UI component directly in `style.css`.
*   **Interactivity**: Extend `script.js` to add more complex behaviors, dynamic content loading, or form submissions.
*   **Icons**: Replace the inline SVGs with links to external SVG files, or integrate a library like Feather Icons or Material Symbols if you need more variety, remembering to match the flat/line art style.

### Contribution

This project is a demonstration of UI design and development. Feel free to fork, adapt, and build upon it. If you find improvements or issues, opening a pull request or issue is welcome.

### License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Architected with precision and a vision for the digital future by [Your Name/Organization].**
