import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface NexusFlowDB extends DBSchema {
  boards: {
    key: string;
    value: {
      id: string;
      name: string;
      createdAt: number;
    };
  };
  'board-data': {
    key: string;
    value: {
      id: string; // boardId
      nodes: any[];
      edges: any[];
    };
  };
  assets: {
    key: string;
    value: {
      id: string;
      blob: Blob;
      mimeType: string;
      createdAt: number;
    };
  };
}

const DB_NAME = 'nexus-flow-db';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<NexusFlowDB>> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<NexusFlowDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Store for board metadata (lightweight)
        if (!db.objectStoreNames.contains('boards')) {
          db.createObjectStore('boards', { keyPath: 'id' });
        }
        
        // Store for board content (heavy nodes/edges)
        if (!db.objectStoreNames.contains('board-data')) {
          db.createObjectStore('board-data', { keyPath: 'id' });
        }
        
        // Store for large binary assets like images
        if (!db.objectStoreNames.contains('assets')) {
          db.createObjectStore('assets', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

// Assets API
export async function saveAsset(blob: Blob): Promise<string> {
  const db = await getDB();
  const id = crypto.randomUUID();
  await db.put('assets', {
    id,
    blob,
    mimeType: blob.type,
    createdAt: Date.now(),
  });
  return id;
}

export async function getAsset(id: string): Promise<Blob | undefined> {
  const db = await getDB();
  const asset = await db.get('assets', id);
  return asset?.blob;
}

export async function deleteAsset(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('assets', id);
}
