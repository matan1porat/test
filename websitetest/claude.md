# Project: Team Showcase Website

## Overview

This project is a lightweight, fast-loading website built using **vanilla HTML, CSS, and JavaScript**.

The website’s purpose is to:

- Showcase our team’s products
- Present written documents and resources
- Provide a clean, professional public-facing presence

Target audience:

- Potential clients or partners
- Internal stakeholders
- General visitors interested in our work

---

## How Claude Should Help

When working on this project, Claude should:

- Prioritize **simplicity and clarity** over complexity
- Write **plain HTML, CSS, and JavaScript only** (no frameworks)
- Avoid introducing build tools unless explicitly requested
- Produce **fully working code snippets**, not partial fragments
- Keep explanations brief unless more detail is requested
- Suggest UX/UI improvements when relevant

Claude should ask clarifying questions if:

- The structure of content is unclear
- A feature could be implemented in multiple ways

---

## Tech Stack

- HTML5 (semantic)
- CSS3 (prefer simple styles, optionally CSS variables)
- Vanilla JavaScript (ES6+)
- No frameworks (no React, Vue, etc.)
- No heavy dependencies

---

## Coding Guidelines

### General

- Keep files small and readable
- Use clear, descriptive names for files and variables
- Comment only when necessary (avoid obvious comments)

### HTML

- Use **semantic elements** (`header`, `main`, `section`, `article`, `footer`)
- Ensure accessibility (alt text, labels, proper heading structure)
- Keep structure clean and well-indented

### CSS

- Use simple class-based styling
- Avoid overly complex selectors
- Maintain consistent spacing, colors, and typography
- Prefer mobile-first responsive design

### JavaScript

- Use modern ES6+ syntax
- Avoid global variables when possible
- Keep logic modular (split into small functions)
- Manipulate DOM efficiently
- Handle errors gracefully

---

## File Structure

```
/project-root
  index.html
  /css
    styles.css
  /js
    main.js
  /assets
    /images
    /documents
```

---

## Core Features

Claude should help implement:

1. **Homepage**
   - Overview of the team
   - Highlights of products

2. **Products Section**
   - grid of products
   - filtering options
   - page dividers based on products type
   - Each product includes:
     - Title
     - Description
     - Optional image
     - Link or details
     - button opening the link in a new tab
     - button for opening an iframe of the link
     - tags

3. **Documents Section**
   - List of downloadable or viewable documents
   - pdf viewer of the selected document
   - Clear labeling and organization
   - navigation between different documents topics

4. **Navigation**
   - Simple and intuitive menu
   - Smooth scrolling or page navigation

5. **Responsive Design**
   - Works well on mobile, tablet, and desktop

---

## Design Principles

- Clean and minimal
- Fast loading (optimize images and assets)
- Easy to navigate
- Professional appearance
- Consistent layout across pages

---

## Constraints

- Do NOT introduce frameworks or libraries
- Do NOT add unnecessary animations or heavy effects
- Keep JavaScript lightweight and purposeful
- Avoid overengineering simple features

---

## Optional Enhancements (only if requested)

- Light animations (CSS-based)
- Filtering or search for products/documents
- Dark mode toggle
- Basic form handling (contact form)

---

## Definition of Done

A feature is complete when:

- It works in a modern browser
- It is responsive
- It is readable and maintainable
- It matches the project’s simplicity goals

---

## Notes

This project values:

- Simplicity over cleverness
- Readability over abstraction
- Speed over feature bloat
