# Aryan Rae — Portfolio

Personal portfolio website for Aryan Rae, an Associate Product Manager at Licious and a BITS Pilani graduate. The site brings together an introduction, work experience, education, project summaries, résumé and contact links.

**Live website:** [aryan-rae.github.io](https://aryan-rae.github.io/)

## Website

- One page with navigation to About, Experience, Education, Projects and Contact.
- Responsive layout and a mobile navigation menu.
- Light and dark themes, with the selected theme saved in the browser.
- Project filters for Product, Ops, ML and Research.
- LinkedIn, GitHub and résumé links, plus an email-copy control.
- Page metadata and a social-preview image for shared links.

The project cards currently contain summaries; their `href="#"` destinations are placeholders, not published case studies.

## Technology and files

The website uses plain HTML, CSS and JavaScript. It has no package installation or build step.

| File | Purpose |
| --- | --- |
| `index.html` | Page content, navigation, links and search/social metadata |
| `styles.css` | Layout, typography, themes and responsive styles |
| `script.js` | Menu, theme selection, project filters, scroll progress and email copying |
| `AryanRae_Resume.pdf` | Downloadable résumé |
| `favicon.svg` | Browser icon |
| `og.png` | Social-preview image |

Google Fonts supplies the Inter typeface.

## Run locally

Clone the repository and serve its root with any static web server. For example, with Python 3 installed:

```sh
git clone https://github.com/aryan-rae/aryan-rae.github.io.git
cd aryan-rae.github.io
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000/). Stop the server with `Ctrl+C`.

## Update the site

1. Edit copy, dates, project summaries and destinations in `index.html`.
2. Make visual changes in `styles.css` and interaction changes in `script.js`.
3. Replace `AryanRae_Resume.pdf` when updating the résumé. Update the résumé link's version query in `index.html` to help returning visitors load the new file.
4. Keep the description, canonical URL and social-preview metadata consistent with the published site. Update the image metadata if `og.png` changes size.

Before publishing, check narrow and wide screens, the mobile menu, both themes, project filters, contact links and the résumé. Replace placeholder project links only when an appropriate destination is ready to share. There is no automated test suite in this repository.

## Publishing

GitHub Pages publishes the root of the `main` branch at **https://aryan-rae.github.io/**. Commit and push approved changes to `main`, wait for the Pages deployment to finish, and check the live page and its assets.

Keep the repository name `aryan-rae.github.io` to preserve this GitHub Pages address. No Vercel project or backend is required for this website.
