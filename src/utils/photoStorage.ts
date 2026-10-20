/**
 * Persistent Client-Side & Local Server Photo Storage
 * Uses IndexedDB for high-res images and syncs with local /api/upload-photo when available.
 */

const DB_NAME = 'FinuAnniversaryPhotoDB';
const DB_VERSION = 1;
const STORE_NAME = 'photos';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const savePhotoToIndexedDB = async (id: string, dataUrl: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ id, dataUrl, updatedAt: Date.now() });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to save photo to IndexedDB, fallback to localStorage', err);
    try {
      localStorage.setItem(`custom_photo_${id}`, dataUrl);
    } catch (e) {
      console.error('LocalStorage also failed (storage full)', e);
    }
  }
};

export const getPhotoFromIndexedDB = async (id: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => {
        if (req.result && req.result.dataUrl) {
          resolve(req.result.dataUrl);
        } else {
          resolve(localStorage.getItem(`custom_photo_${id}`));
        }
      };
      req.onerror = () => resolve(localStorage.getItem(`custom_photo_${id}`));
    });
  } catch (err) {
    return localStorage.getItem(`custom_photo_${id}`);
  }
};

export const getAllPhotosFromIndexedDB = async (): Promise<Record<string, string>> => {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const result: Record<string, string> = {};
        if (req.result && Array.isArray(req.result)) {
          req.result.forEach((item: { id: string; dataUrl: string }) => {
            result[item.id] = item.dataUrl;
          });
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  } catch (err) {
    return {};
  }
};

export const deletePhotoFromIndexedDB = async (id: string): Promise<void> => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
  } catch (err) {
    console.warn('Delete failed', err);
  }
  localStorage.removeItem(`custom_photo_${id}`);
};

/**
 * Upload to local backend if running in Vite dev mode
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
    // Backend API not available (e.g. static host), perfectly fine since IndexedDB stores it
  }
  return { success: false };
};
