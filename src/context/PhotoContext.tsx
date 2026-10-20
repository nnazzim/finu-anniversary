import React, { createContext, useContext, useState, useEffect } from 'react';
import { anniversaryContent, MemoryItem } from '../data/anniversaryContent';
import {
  savePhotoToIndexedDB,
  getAllPhotosFromIndexedDB,
  deletePhotoFromIndexedDB,
  savePhotoToServer,
} from '../utils/photoStorage';

export interface WeddingSlotItem {
  id: number;
  image: string;
  caption: string;
  date?: string;
}

interface PhotoContextType {
  galleryPhotos: MemoryItem[];
  weddingPhotos: WeddingSlotItem[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  updateGalleryPhoto: (
    id: number,
    updates: Partial<MemoryItem>,
    base64Data?: string,
    targetFilePath?: string
  ) => Promise<void>;
  updateWeddingPhoto: (
    id: number,
    base64Data: string,
    caption?: string,
    targetFilePath?: string
  ) => Promise<void>;
  addNewGalleryPhoto: (
    newPhoto: Omit<MemoryItem, 'id'>,
    base64Data: string,
    targetFilePath?: string
  ) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  loading: boolean;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleryPhotos, setGalleryPhotos] = useState<MemoryItem[]>(anniversaryContent.gallery);
  const [weddingPhotos, setWeddingPhotos] = useState<WeddingSlotItem[]>(
    anniversaryContent.weddingsSection.slots
  );
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load photos from IndexedDB & localStorage on mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedImages = await getAllPhotosFromIndexedDB();
        const savedMeta = localStorage.getItem('finu_gallery_meta');
        const savedWeddingMeta = localStorage.getItem('finu_wedding_meta');

        let baseGallery = anniversaryContent.gallery;
        if (savedMeta) {
          try {
            baseGallery = JSON.parse(savedMeta);
          } catch (e) {
            console.error(e);
          }
        }

        // Merge custom images
        const mergedGallery = baseGallery.map((item) => {
          const customImg = storedImages[`gallery_${item.id}`];
          return customImg ? { ...item, image: customImg } : item;
        });
        setGalleryPhotos(mergedGallery);

        let baseWeddings = anniversaryContent.weddingsSection.slots;
        if (savedWeddingMeta) {
          try {
            baseWeddings = JSON.parse(savedWeddingMeta);
          } catch (e) {
            console.error(e);
          }
        }

        const mergedWeddings = baseWeddings.map((slot) => {
          const customImg = storedImages[`wedding_${slot.id}`];
          return customImg ? { ...slot, image: customImg } : slot;
        });
        setWeddingPhotos(mergedWeddings);
      } catch (err) {
        console.error('Failed to load stored photos', err);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const updateGalleryPhoto = async (
    id: number,
    updates: Partial<MemoryItem>,
    base64Data?: string,
    targetFilePath?: string
  ) => {
    let updatedImage = updates.image;

    if (base64Data) {
      await savePhotoToIndexedDB(`gallery_${id}`, base64Data);
      updatedImage = base64Data;

      if (targetFilePath) {
        await savePhotoToServer(targetFilePath, base64Data);
      }
    }

    setGalleryPhotos((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...updates, ...(updatedImage ? { image: updatedImage } : {}) } : item
      );
      localStorage.setItem('finu_gallery_meta', JSON.stringify(updated));
      return updated;
    });
  };

  const updateWeddingPhoto = async (
    id: number,
    base64Data: string,
    caption?: string,
    targetFilePath?: string
  ) => {
    await savePhotoToIndexedDB(`wedding_${id}`, base64Data);

    if (targetFilePath) {
      await savePhotoToServer(targetFilePath, base64Data);
    }

    setWeddingPhotos((prev) => {
      const updated = prev.map((slot) =>
        slot.id === id
          ? {
              ...slot,
              image: base64Data,
              ...(caption ? { caption } : {}),
            }
          : slot
      );
      localStorage.setItem('finu_wedding_meta', JSON.stringify(updated));
      return updated;
    });
  };

  const addNewGalleryPhoto = async (
    newPhoto: Omit<MemoryItem, 'id'>,
    base64Data: string,
    targetFilePath?: string
  ) => {
    const nextId =
      galleryPhotos.length > 0 ? Math.max(...galleryPhotos.map((p) => p.id)) + 1 : 1;

    await savePhotoToIndexedDB(`gallery_${nextId}`, base64Data);

    if (targetFilePath) {
      await savePhotoToServer(targetFilePath, base64Data);
    }

    const created: MemoryItem = {
      ...newPhoto,
      id: nextId,
      image: base64Data,
    };

    setGalleryPhotos((prev) => {
      const updated = [...prev, created];
      localStorage.setItem('finu_gallery_meta', JSON.stringify(updated));
      return updated;
    });
  };

  const resetToDefaults = async () => {
    galleryPhotos.forEach((item) => {
      deletePhotoFromIndexedDB(`gallery_${item.id}`);
    });
    weddingPhotos.forEach((slot) => {
      deletePhotoFromIndexedDB(`wedding_${slot.id}`);
    });
    localStorage.removeItem('finu_gallery_meta');
    localStorage.removeItem('finu_wedding_meta');
    setGalleryPhotos(anniversaryContent.gallery);
    setWeddingPhotos(anniversaryContent.weddingsSection.slots);
  };

  return (
    <PhotoContext.Provider
      value={{
        galleryPhotos,
        weddingPhotos,
        isAdminOpen,
        setIsAdminOpen,
        updateGalleryPhoto,
        updateWeddingPhoto,
        addNewGalleryPhoto,
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
