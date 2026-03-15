# NexusFlow Code Architecture

This document provides an overview of the codebase structure and key architectural decisions for NexusFlow.

## 📂 Project Structure

```
src/
├── 📁 components/       # React Components
│   ├── 📁 layout/       # Layout components (Sidebar, etc.)
│   ├── 📁 nodes/        # Custom React Flow Nodes (Image, Browser, Markdown)
│   ├── Board.tsx        # Main Canvas Component (React Flow instance)
│   └── HelpModal.tsx    # Help & Guide Modal
├── 📁 lib/              # Core Libraries & Utilities
│   ├── db.ts            # IndexedDB Wrapper (idb) - Storage Layer
│   ├── i18n.ts          # Internationalization Config (i18next)
│   └── utils.ts         # Helper functions (CN, Tailwind merge)
├── 📁 pages/            # Page Components
│   └── Home.tsx         # Main Entry Page (Layout composition)
├── 📁 store/            # State Management
│   └── useBoardStore.ts # Global Store (Zustand) - Data Logic
├── App.tsx              # App Root
└── main.tsx             # Entry Point
```

## 🏗 Core Architecture

### 1. State Management (Zustand)
We use `zustand` for global state management. The store (`useBoardStore.ts`) acts as the single source of truth for:
- **Board Metadata**: List of available boards (ID, Name, CreatedAt).
- **Current Session**: Currently active board ID and its loaded content.
- **Actions**: CRUD operations for boards and nodes.

### 2. Storage Layer (Local-First)
NexusFlow follows a "Local-First" architecture using **IndexedDB** via the `idb` library.
- **Why IndexedDB?** To bypass LocalStorage size limits (5MB) and support storing large image assets locally.
- **Data Model**:
  - `boards`: Lightweight metadata store.
  - `board-data`: Heavy content store (nodes & edges), loaded on-demand.
  - `assets`: Binary blob store for images.

### 3. Canvas Engine (React Flow)
The core canvas is built on `@xyflow/react` (React Flow).
- **Custom Nodes**: All functional nodes are custom components located in `src/components/nodes/`.
- **Interaction**: Node dragging, connecting, and resizing are handled by React Flow's internal event system, synced back to our Zustand store via debounced updates.

### 4. Internationalization (i18next)
- **Library**: `react-i18next`
- **Config**: `src/lib/i18n.ts`
- **Strategy**: 
  - Language detection via `i18next-browser-languagedetector`.
  - Resources are bundled locally for offline support.
  - Dynamic switching without page reload.

## 🔄 Data Flow

1.  **Initialization**: `useBoardStore` initializes and fetches the board list from IndexedDB.
2.  **Selection**: User selects a board -> Store fetches full board data (Nodes/Edges) from DB -> Updates `currentNodes`/`currentEdges`.
3.  **Rendering**: `Board.tsx` subscribes to store updates. On initial load (or board switch), it syncs store state to React Flow's internal state.
4.  **Editing**: User interacts with canvas -> React Flow updates internal state -> `Board.tsx` debounces changes -> Calls Store action.
5.  **Persistence**: Store action saves the snapshot to IndexedDB asynchronously.
