import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { anniversaryContent, MemoryItem } from '../data/anniversaryContent';
import {
  savePhotoRecord,
  getAllPhotoRecords,
  deletePhotoRecord,
  clearAllPhotoRecords,
  savePhotoToServer,
  StoredPhotoRecord,
} from '../utils/photoStorage';

export interface WeddingSlotItem {
  id: number;
  image: string;
  caption: string;
  date?: string;
  isCustom?: boolean;
}

export interface EnhancedMemoryItem extends MemoryItem {
  isCustom?: boolean;
}

interface PhotoContextType {
  galleryPhotos: EnhancedMemoryItem[];
  weddingPhotos: WeddingSlotItem[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  saveGallerySlot: (
    slotId: number,
    dataUrl: string,
    caption?: string,
    date?: string,
    targetFilePath?: string
  ) => Promise<void>;
  saveWeddingSlot: (
    slotId: number,
    dataUrl: string,
    caption?: string,
    date?: string,
    targetFilePath?: string
  ) => Promise<void>;
  removeSlotPhoto: (type: 'gallery' | 'wedding', slotId: number) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  loading: boolean;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleryPhotos, setGalleryPhotos] = useState<EnhancedMemoryItem[]>(() =>
    anniversaryContent.gallery.map((g) => ({ ...g, isCustom: false }))
  );
  const [weddingPhotos, setWeddingPhotos] = useState<WeddingSlotItem[]>(() =>
    anniversaryContent.weddingsSection.slots.map((w) => ({ ...w, isCustom: false }))
  );
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load all custom photo records from IndexedDB on startup
  const loadFromStorage = useCallback(async () => {
    try {
      const records = await getAllPhotoRecords();

      // Merge Gallery Photos (each slot is checked individually)
      setGalleryPhotos((prev) =>
        anniversaryContent.gallery.map((defaultItem) => {
          const key = `gallery_${defaultItem.id}`;
          const customRecord = records[key];
          if (customRecord && customRecord.dataUrl) {
            return {
              ...defaultItem,
              image: customRecord.dataUrl,
              caption: customRecord.caption || defaultItem.caption,
              date: customRecord.date || defaultItem.date,
              isCustom: true,
            };
          }
          return { ...defaultItem, isCustom: false };
        })
      );

      // Merge Wedding Photos (each slot is checked individually)
      setWeddingPhotos((prev) =>
        anniversaryContent.weddingsSection.slots.map((defaultSlot) => {
          const key = `wedding_${defaultSlot.id}`;
          const customRecord = records[key];
          if (customRecord && customRecord.dataUrl) {
            return {
              ...defaultSlot,
              image: customRecord.dataUrl,
              caption: customRecord.caption || defaultSlot.caption,
              date: customRecord.date || defaultSlot.date,
              isCustom: true,
            };
          }
          return { ...defaultSlot, isCustom: false };
        })
      );
    } catch (err) {
      console.error('Error loading stored photos from IndexedDB:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  /**
   * Save a single Gallery Slot independently
   */
  const saveGallerySlot = async (
    slotId: number,
    dataUrl: string,
    caption?: string,
    date?: string,
    targetFilePath?: string
  ) => {
    const key = `gallery_${slotId}`;
    const targetItem = anniversaryContent.gallery.find((g) => g.id === slotId);

    const record: StoredPhotoRecord = {
      key,
      dataUrl,
      caption: caption || targetItem?.caption,
      date: date || targetItem?.date,
      category: targetItem?.category,
      stageLabel: targetItem?.stageLabel,
      updatedAt: Date.now(),
    };

    // 1. Save independently to IndexedDB
    await savePhotoRecord(record);

    // 2. Save to local disk via Vite dev server if available
    if (targetFilePath) {
      await savePhotoToServer(targetFilePath, dataUrl);
    }

    // 3. Update only that exact slot in React state
    setGalleryPhotos((prev) =>
      prev.map((item) =>
        item.id === slotId
          ? {
              ...item,
              image: dataUrl,
              ...(caption ? { caption } : {}),
              ...(date ? { date } : {}),
              isCustom: true,
            }
          : item
      )
    );
  };

  /**
   * Save a single Wedding Slot independently
   */
  const saveWeddingSlot = async (
    slotId: number,
    dataUrl: string,
    caption?: string,
    date?: string,
    targetFilePath?: string
  ) => {
    const key = `wedding_${slotId}`;
    const targetSlot = anniversaryContent.weddingsSection.slots.find((w) => w.id === slotId);

    const record: StoredPhotoRecord = {
      key,
      dataUrl,
      caption: caption || targetSlot?.caption,
      date: date || targetSlot?.date,
      updatedAt: Date.now(),
    };

    // 1. Save independently to IndexedDB
    await savePhotoRecord(record);

    // 2. Save to local disk via Vite dev server if available
    if (targetFilePath) {
      await savePhotoToServer(targetFilePath, dataUrl);
    }

    // 3. Update only that exact wedding frame in React state
    setWeddingPhotos((prev) =>
      prev.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              image: dataUrl,
              ...(caption ? { caption } : {}),
              ...(date ? { date } : {}),
              isCustom: true,
            }
          : slot
      )
    );
  };

  /**
   * Revert a single slot back to default placeholder without touching any other slot
   */
  const removeSlotPhoto = async (type: 'gallery' | 'wedding', slotId: number) => {
    const key = `${type}_${slotId}`;
    await deletePhotoRecord(key);

    if (type === 'gallery') {
      const defaultItem = anniversaryContent.gallery.find((g) => g.id === slotId);
      if (defaultItem) {
        setGalleryPhotos((prev) =>
          prev.map((item) =>
            item.id === slotId ? { ...defaultItem, isCustom: false } : item
          )
        );
      }
    } else {
      const defaultSlot = anniversaryContent.weddingsSection.slots.find((w) => w.id === slotId);
      if (defaultSlot) {
        setWeddingPhotos((prev) =>
          prev.map((slot) =>
            slot.id === slotId ? { ...defaultSlot, isCustom: false } : slot
          )
        );
      }
    }
  };

  /**
   * Reset all slots to default
   */
  const resetToDefaults = async () => {
    await clearAllPhotoRecords();
    setGalleryPhotos(
      anniversaryContent.gallery.map((g) => ({ ...g, isCustom: false }))
    );
    setWeddingPhotos(
      anniversaryContent.weddingsSection.slots.map((w) => ({ ...w, isCustom: false }))
    );
  };

  return (
    <PhotoContext.Provider
      value={{
        galleryPhotos,
        weddingPhotos,
        isAdminOpen,
        setIsAdminOpen,
        saveGallerySlot,
        saveWeddingSlot,
        removeSlotPhoto,
        resetToDefaults,
        loading,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};
