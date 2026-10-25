# Contributing

Thanks for your interest in improving **Moroccan Djellaba Store**. This project
is a static storefront template, so contributions are usually limited to HTML,
CSS, JavaScript, and imagery.

## Getting started

1. Fork and clone the repository.
2. Serve the folder with any static server, e.g.:

   ```bash
   npx serve .
   ```

3. Open `index.html` in your browser.

> Opening the files directly with `file://` also works, but a local server is
> recommended so that relative asset paths behave exactly like production.

## Project conventions

- Keep HTML, CSS, and JavaScript in **separate files** — no large inline
  `<style>` or `<script>` blocks.
- Use **kebab-case** for every file and folder name.
- Page-specific styles live in `assets/css/pages/`, section styles in
  `assets/css/components/`.
- Animations and interactions go in `assets/js/` and must degrade gracefully.
- Never rename or move an asset without updating every reference.

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add wishlist drawer toggle
fix: correct broken product image path
refactor: extract header styles into a stylesheet
docs: document folder structure
chore: update .gitignore
```

## Pull requests

1. Create a topic branch: `git checkout -b feat/short-description`.
2. Make small, focused commits.
3. Verify every page still renders correctly (desktop + mobile) before opening
   the pull request.
4. Describe what changed and why.
