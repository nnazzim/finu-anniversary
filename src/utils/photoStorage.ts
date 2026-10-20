/**
 * Rock-Solid IndexedDB Photo Storage for Finu & Kaakooka Website
 * Stores each slot independently so adding/updating one never touches another.
 */

const DB_NAME = 'FinuAnniversaryPhotoDB_v2';
const DB_VERSION = 1;
const PHOTO_STORE = 'photos';
const META_STORE = 'metadata';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported on this browser'));
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        db.createObjectStore(PHOTO_STORE, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export interface StoredPhotoRecord {
  key: string; // e.g. "gallery_1", "wedding_1"
  dataUrl: string;
  caption?: string;
  date?: string;
  category?: string;
  stageLabel?: string;
  updatedAt: number;
}

/**
 * Saves a single photo record independently.
 */
export const savePhotoRecord = async (record: StoredPhotoRecord): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([PHOTO_STORE], 'readwrite');
    const store = tx.objectStore(PHOTO_STORE);
    const req = store.put(record);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

/**
 * Gets a single photo record.
 */
export const getPhotoRecord = async (key: string): Promise<StoredPhotoRecord | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction([PHOTO_STORE], 'readonly');
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    return null;
  }
};

/**
 * Gets all photo records stored.
 */
export const getAllPhotoRecords = async (): Promise<Record<string, StoredPhotoRecord>> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction([PHOTO_STORE], 'readonly');
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const map: Record<string, StoredPhotoRecord> = {};
        if (req.result && Array.isArray(req.result)) {
          req.result.forEach((item: StoredPhotoRecord) => {
            map[item.key] = item;
          });
        }
        resolve(map);
      };
      req.onerror = () => resolve({});
    });
  } catch (err) {
    return {};
  }
};

/**
 * Deletes a single photo record without touching any other records.
 */
export const deletePhotoRecord = async (key: string): Promise<void> => {
  try {
    const db = await openDB();
    const tx = db.transaction([PHOTO_STORE], 'readwrite');
    tx.objectStore(PHOTO_STORE).delete(key);
  } catch (err) {
    console.warn('Failed to delete photo record', err);
  }
};

/**
 * Clears all photo records.
 */
export const clearAllPhotoRecords = async (): Promise<void> => {
  try {
    const db = await openDB();
    const tx = db.transaction([PHOTO_STORE], 'readwrite');
    tx.objectStore(PHOTO_STORE).clear();
  } catch (err) {
    console.warn('Failed to clear records', err);
  }
};

/**
 * Synchronizes with local Vite server /api/upload-photo when running locally
 */
export const savePhotoToServer = async (
  filePath: string,
  base64Data: string
): Promise<{ success: boolean; savedPath?: string }> => {
  try {
    const res = await fetch('/api/upload-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filePath, base64Data }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Expected on static hosting or offline mode
  }
  return { success: false };
};
