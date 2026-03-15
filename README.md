# NexusFlow

[English](README.md) | [中文](README_zh.md)

**NexusFlow** is a modern, local-first flow presentation tool built with React Flow. It allows you to create interactive diagrams, mind maps, and presentation boards with rich media support, all running directly in your browser without any cloud dependency.

## ✨ Features

- **Infinite Canvas**: Drag, zoom, and pan freely on an infinite workspace.
- **Rich Media Nodes**:
  - **Image Node**: Upload and resize images (PNG, JPG, GIF, WEBP).
  - **Browser Node**: Embed live websites via IFrame for demos.
  - **Markdown Node**: Write rich text with GFM support (tables, code blocks).
- **Local-First Storage**: All data is stored in your browser's **IndexedDB**.
  - No size limits (unlike LocalStorage).
  - Works completely offline.
  - Privacy-focused: Your data never leaves your device.
- **Multi-Board Support**: Create and manage multiple workspaces.
- **Internationalization**: Full English and Chinese (Simplified) support.
- **Dark Mode**: Optimized for long working sessions.

## 🛠 Tech Stack

- **Framework**: React + Vite
- **Canvas Engine**: React Flow (@xyflow/react)
- **State Management**: Zustand
- **Storage**: IndexedDB (idb)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **i18n**: i18next

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/nexus-flow.git
    cd nexus-flow
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## 🗺 Roadmap (2026-2027)

We are currently at **v1.0**. Here is our plan for the next year:

### Q2 2026 (v1.1 - v1.2)
- [ ] **History & Shortcuts**: Undo/Redo (Cmd+Z/Cmd+Shift+Z) support.
- [ ] **Clipboard Integration**: Paste images or text directly from clipboard to create nodes.
- [ ] **Node Actions**: Copy/Paste/Duplicate nodes with shortcuts.
- [ ] **Export/Import**: Export boards as JSON files for backup/sharing.
- [ ] **Image Export**: Export canvas as PNG/SVG.
- [ ] **Performance**: Virtualization for large boards with 1000+ nodes.

### Q3 2026 (v1.3 - v1.4)
- [ ] **New Nodes**: Sticky Note, Todo List, Kanban Board.
- [ ] **Minimap**: Navigation overview for large diagrams.
- [ ] **Theming**: Custom background colors and grid styles.

### Q4 2026 (v1.5 - v1.6)
- [ ] **Collaboration**: Peer-to-peer (P2P) real-time collaboration (WebRTC).
- [ ] **Plugin System**: Foundation for community extensions.

### Q1 2027 (v2.0)
- [ ] **Mobile Support**: Optimized touch interactions for tablets.
- [ ] **AI Assistant**: Auto-layout and content generation suggestions.
- [ ] **Plugin Marketplace**: Browse and install community plugins.

## 🤝 Contributing

We warmly welcome contributions from everyone! Whether you're fixing a bug, improving documentation, or proposing a new feature, your help is appreciated.

### How to Contribute

1.  **Fork** the repository to your own GitHub account.
2.  **Clone** the project to your local machine.
3.  Create a new **Branch** for your changes:
    ```bash
    git checkout -b feature/amazing-feature
    ```
4.  Commit your changes:
    ```bash
    git commit -m "feat: Add amazing feature"
    ```
5.  Push to your branch:
    ```bash
    git push origin feature/amazing-feature
    ```
6.  Open a **Pull Request (PR)** on GitHub.

### Reporting Issues & Feature Requests

If you find a bug or have an idea for a new feature, please open an [Issue](https://github.com/j5land/nexus-flow/issues).

**Issue Template Guidelines:**

- **Bug Report**:
  - **Description**: What happened?
  - **Reproduction Steps**: How can we reproduce it?
  - **Expected Behavior**: What should have happened?
  - **Environment**: Browser version, OS, etc.

- **Feature Request**:
  - **Goal**: What problem are you trying to solve?
  - **Proposal**: How should the solution look like?
  - **Alternatives**: Any other solutions considered?

### Development Guidelines

- Please ensure your code follows the existing style (Tailwind CSS, React Hooks).
- Update `src/lib/i18n.ts` if you add new text strings.
- Test your changes thoroughly before submitting.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
