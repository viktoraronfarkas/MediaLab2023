# MediaLab 2023 development guide

## Project installation

- After pulling the project from GitHub, navigate to the root folder in the terminal,
  and run `npm i` to install the dependencies.
- Run `npm run dev` to start the development server.

## Formatting with Prettier and ESLint

### Setup

- Autoformatting on save should be enabled for all contributors. To do this,
  please install the following VS Code plugins: **ESLint, Prettier - Code formatter**.
- Then, please refer to [this link](https://blog.yogeshchavan.dev/automatically-format-code-on-file-save-in-visual-studio-code-using-prettier) to set up automatic formatting.

### Usage

- Since Prettier runs automatically on save, normally you don't have to do anything with this yourself. However, if you would like to run Prettier on the whole codebase, you can run `npm run format`.
  <br /><br />
- On the other hand, please run ESLint each time before you commit a piece of code. To do that, run `npm run lint`, and you will get a list of the existing problems in your terminal. Please fix these problems before commiting your code.

### Pre-commit hook

- A pre-commit hook is set up with ESLint, so that code snippets including Lint errors cannot be commited. To enable this, please make sure that you have the latest version of Git installed, and then from the repository root folder, run `git config core.hooksPath .githooks`.
