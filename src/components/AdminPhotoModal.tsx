import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Lock,
  Unlock,
  Camera,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Trash2,
  Image as ImageIcon,
  Flower2,
  Save,
  Check,
} from 'lucide-react';
import { usePhotos, EnhancedMemoryItem, WeddingSlotItem } from '../context/PhotoContext';
import { optimizeImageFile } from '../utils/imageOptimizer';
import { triggerRomanticConfetti } from '../utils/confetti';

export const AdminPhotoModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    galleryPhotos,
    weddingPhotos,
    saveGallerySlot,
    saveWeddingSlot,
    removeSlotPhoto,
    resetToDefaults,
  } = usePhotos();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Active Tab: 'gallery' | 'weddings'
  const [activeTab, setActiveTab] = useState<'gallery' | 'weddings'>('gallery');

  // Per-slot loading and notification state
  const [savingSlotId, setSavingSlotId] = useState<string | null>(null);
  const [savedSuccessSlot, setSavedSuccessSlot] = useState<string | null>(null);

  // Editable captions state map
  const [captionsMap, setCaptionsMap] = useState<Record<string, string>>({});

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (clean === '21102019' || clean === 'kaakooka' || clean === 'finu' || clean === 'admin') {
      setIsAuthenticated(true);
      setPasscodeError(false);
      triggerRomanticConfetti();
    } else {
      setPasscodeError(true);
    }
  };

  const handleClose = () => {
    setIsAdminOpen(false);
    if (window.location.hash.toLowerCase().includes('admin') || window.location.search.includes('admin')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // Determine relative server path for local save
  const getGalleryFilePath = (item: EnhancedMemoryItem) => {
    const catFolderMap: Record<string, string> = {
      'class-10': 'school/class-10',
      'class-11': 'school/class-11',
      'class-12': 'school/class-12',
      college: 'college',
      weddings: 'friends-weddings',
      other: 'other-memories',
    };
    const folder = catFolderMap[item.category] || 'other-memories';
    return `${folder}/photo-${String(item.id).padStart(2, '0')}.jpg`;
  };

  /**
   * Handle uploading a photo for a single gallery slot
   */
  const handleUploadGalleryPhoto = async (
    item: EnhancedMemoryItem,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = `gallery_${item.id}`;
    setSavingSlotId(key);

    try {
      // 1. Optimize image (downscale to max 1600px JPEG to avoid browser memory lag)
      const optimizedBase64 = await optimizeImageFile(file, 1600, 0.88);

      // 2. Determine target file path on disk
      const targetFilePath = getGalleryFilePath(item);

      // 3. Save to Slot individually
      const currentCaption = captionsMap[key] ?? item.caption;
      await saveGallerySlot(item.id, optimizedBase64, currentCaption, item.date, targetFilePath);

      setSavedSuccessSlot(key);
      triggerRomanticConfetti();
      setTimeout(() => setSavedSuccessSlot(null), 3000);
    } catch (err) {
      console.error('Failed to upload photo for slot', item.id, err);
      alert('Could not save photo. Please try a different image.');
    } finally {
      setSavingSlotId(null);
      // Reset input value so same file can be re-selected if desired
      e.target.value = '';
    }
  };

  /**
   * Handle saving caption edit for a gallery slot
   */
  const handleSaveGalleryCaption = async (item: EnhancedMemoryItem) => {
    const key = `gallery_${item.id}`;
    const newCaption = captionsMap[key];
    if (!newCaption || newCaption === item.caption) return;

    setSavingSlotId(key);
    try {
      await saveGallerySlot(item.id, item.image, newCaption, item.date, getGalleryFilePath(item));
      setSavedSuccessSlot(key);
      setTimeout(() => setSavedSuccessSlot(null), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingSlotId(null);
    }
  };

  /**
   * Handle uploading a photo for a single wedding slot
   */
  const handleUploadWeddingPhoto = async (
    slot: WeddingSlotItem,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = `wedding_${slot.id}`;
    setSavingSlotId(key);

    try {
      const optimizedBase64 = await optimizeImageFile(file, 1600, 0.88);
      const targetFilePath = `friends-weddings/wedding-${String(slot.id).padStart(2, '0')}.jpg`;
      const currentCaption = captionsMap[key] ?? slot.caption;

      await saveWeddingSlot(slot.id, optimizedBase64, currentCaption, slot.date, targetFilePath);

      setSavedSuccessSlot(key);
      triggerRomanticConfetti();
      setTimeout(() => setSavedSuccessSlot(null), 3000);
    } catch (err) {
      console.error('Failed to save wedding photo', err);
      alert('Could not save photo. Please try a different image.');
    } finally {
      setSavingSlotId(null);
      e.target.value = '';
    }
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-5xl w-full bg-burgundy-950 border-2 border-gold/50 rounded-3xl shadow-2xl p-5 sm:p-8 text-cream max-h-[94vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-burgundy-900 text-cream/70 hover:text-gold border border-gold/30 transition-colors"
          aria-label="Close admin panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================= */}
        {/* PASSCODE UNLOCK SCREEN                                    */}
        {/* ========================================================= */}
        {!isAuthenticated ? (
          <div className="py-12 max-w-md mx-auto text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-wine border-2 border-gold shadow-gold-glow flex items-center justify-center mb-5">
              <Lock className="w-8 h-8 text-gold" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-cream mb-2">
              Kaakooka's Vault 🔐
            </h3>
            <p className="text-blush text-sm mb-6 font-serif">
              Enter passcode to add and manage photographs for Finu.
            </p>

            <form onSubmit={handleUnlock} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-5 py-3 rounded-2xl bg-burgundy-900 border border-gold/40 text-cream text-center text-lg tracking-wider focus:outline-none focus:border-gold"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Incorrect passcode. Try the date she said yes (21102019) or kaakooka.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold via-amber-400 to-gold text-burgundy-950 font-serif font-bold text-base shadow-gold-glow hover:shadow-xl transition-all"
              >
                Unlock Vault 💖
              </button>

              <p className="text-[11px] text-cream/50 pt-2 font-mono">
                Hint: 21102019 (21 Oct 2019) or kaakooka
              </p>
            </form>
          </div>
        ) : (
          /* ========================================================= */
          /* MAIN ADMIN DASHBOARD                                      */
          /* ========================================================= */
          <div>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gold/20 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-wine border border-gold/40 flex items-center justify-center shadow-inner">
                  <Unlock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                    Kaakooka's Photo Studio 📸
                  </h3>
                  <p className="text-xs text-blush">
                    Add pictures to each placeholder. Every slot is saved permanently and independently!
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-4 py-2 rounded-full text-xs font-serif transition-colors flex items-center gap-1.5 ${
                    activeTab === 'gallery'
                      ? 'bg-gold text-burgundy-950 font-bold shadow-md'
                      : 'bg-burgundy-900 text-cream/80 hover:text-gold border border-gold/30'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Gallery Slots (12 Slots)</span>
                </button>
                <button
                  onClick={() => setActiveTab('weddings')}
                  className={`px-4 py-2 rounded-full text-xs font-serif transition-colors flex items-center gap-1.5 ${
                    activeTab === 'weddings'
                      ? 'bg-gold text-burgundy-950 font-bold shadow-md'
                      : 'bg-burgundy-900 text-cream/80 hover:text-gold border border-gold/30'
                  }`}
                >
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>Wedding Keepsakes (3 Frames)</span>
                </button>
              </div>
            </div>

            {/* Guide Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-burgundy-900/60 border border-gold/30 text-xs sm:text-sm text-gold/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                <span>
                  <strong>Tip:</strong> Click <strong>"Upload Picture"</strong> on any slot below to add its photo. Adding a photo to one slot will <em>never</em> overwrite or affect any other slot!
                </span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* TAB 1: 12 GALLERY PHOTO SLOTS                             */}
            {/* ========================================================= */}
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryPhotos.map((item) => {
                  const key = `gallery_${item.id}`;
                  const isSaving = savingSlotId === key;
                  const isSuccess = savedSuccessSlot === key;
                  const isCustom = item.isCustom || item.image.startsWith('data:');
                  const currentCaption = captionsMap[key] ?? item.caption;

                  return (
                    <div
                      key={item.id}
                      className={`relative bg-burgundy-900/70 p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCustom
                          ? 'border-emerald-500/60 shadow-md bg-burgundy-900/90'
                          : 'border-gold/30 hover:border-gold/60'
                      }`}
                    >
                      {/* Top Bar: Slot # & Status Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono uppercase font-bold text-gold bg-burgundy-950 px-2.5 py-0.5 rounded-full border border-gold/30">
                          Slot #{item.id}
                        </span>

                        {isCustom ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/50">
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            <span>Photo Saved ❤️</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-sans text-stone-400 bg-burgundy-950/80 px-2 py-0.5 rounded-full border border-stone-700">
                            <span>Empty Placeholder</span>
                          </span>
                        )}
                      </div>

                      {/* Stage Label */}
                      <span className="text-[11px] font-sans font-semibold text-blush block mb-2">
                        {item.stageLabel}
                      </span>

                      {/* Photo Thumbnail / Preview */}
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-burgundy-950 border border-gold/25 relative mb-3 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {!isCustom && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center pointer-events-none">
                            <Camera className="w-8 h-8 text-gold/40 mb-1" />
                            <span className="text-[11px] text-cream/60 font-serif">
                              Waiting for photo
                            </span>
                          </div>
                        )}

                        {/* Saving overlay */}
                        {isSaving && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-xs font-serif text-gold animate-pulse">
                              Optimizing & Saving...
                            </span>
                          </div>
                        )}

                        {/* Success overlay */}
                        {isSuccess && (
                          <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center text-center p-2">
                            <CheckCircle className="w-8 h-8 text-emerald-400 mb-1 animate-bounce" />
                            <span className="text-xs font-serif font-bold text-emerald-200">
                              Saved to Slot #{item.id}!
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Caption Input */}
                      <div className="mb-3 space-y-1">
                        <label className="text-[10px] uppercase font-sans text-gold/70 flex items-center justify-between">
                          <span>Caption:</span>
                          {currentCaption !== item.caption && (
                            <button
                              type="button"
                              onClick={() => handleSaveGalleryCaption(item)}
                              className="text-blush hover:underline text-[10px] flex items-center gap-0.5"
                            >
                              <Save className="w-2.5 h-2.5" />
                              Save Text
                            </button>
                          )}
                        </label>
                        <input
                          type="text"
                          value={currentCaption}
                          onChange={(e) =>
                            setCaptionsMap((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          onBlur={() => handleSaveGalleryCaption(item)}
                          placeholder="Write a caption for Finu..."
                          className="w-full px-3 py-1.5 rounded-lg bg-burgundy-950 border border-gold/30 text-cream text-xs focus:outline-none focus:border-gold"
                        />
                      </div>

                      {/* Action Buttons: Upload & Remove */}
                      <div className="flex items-center gap-2 pt-1 border-t border-gold/15">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUploadGalleryPhoto(item, e)}
                            className="hidden"
                          />
                          <span className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-wine to-burgundy-700 hover:from-wine-600 hover:to-wine text-cream text-xs font-serif font-semibold border border-gold/50 shadow-md flex items-center justify-center gap-1.5 transition-all">
                            <Upload className="w-3.5 h-3.5 text-gold" />
                            <span>{isCustom ? 'Replace Photo' : 'Upload Picture'}</span>
                          </span>
                        </label>

                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Revert Slot #${item.id} back to placeholder?`)) {
                                removeSlotPhoto('gallery', item.id);
                              }
                            }}
                            title="Remove custom photo from this slot"
                            className="p-2 rounded-xl bg-burgundy-950 hover:bg-rose-950 text-cream/60 hover:text-rose-400 border border-gold/25 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <span className="text-[9px] text-cream/40 mt-2 block font-mono text-center truncate">
                        {getGalleryFilePath(item)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ========================================================= */}
            {/* TAB 2: 3 WEDDING KEEPSAKE FRAMES                          */}
            {/* ========================================================= */}
            {activeTab === 'weddings' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {weddingPhotos.map((slot) => {
                  const key = `wedding_${slot.id}`;
                  const isSaving = savingSlotId === key;
                  const isSuccess = savedSuccessSlot === key;
                  const isCustom = slot.isCustom || slot.image.startsWith('data:');
                  const currentCaption = captionsMap[key] ?? slot.caption;

                  return (
                    <div
                      key={slot.id}
                      className={`relative bg-burgundy-900/70 p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        isCustom
                          ? 'border-emerald-500/60 shadow-md bg-burgundy-900/90'
                          : 'border-gold/30 hover:border-gold/60'
                      }`}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono uppercase font-bold text-gold bg-burgundy-950 px-3 py-0.5 rounded-full border border-gold/30">
                          Wedding Frame #{slot.id}
                        </span>

                        {isCustom ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/50">
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            <span>Photo Saved ❤️</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-sans text-stone-400 bg-burgundy-950/80 px-2 py-0.5 rounded-full border border-stone-700">
                            <span>Empty Placeholder</span>
                          </span>
                        )}
                      </div>

                      {/* Photo Thumbnail */}
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-burgundy-950 border border-gold/25 relative mb-4 flex items-center justify-center">
                        <img
                          src={slot.image}
                          alt={slot.caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {!isCustom && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center pointer-events-none">
                            <Flower2 className="w-8 h-8 text-gold/40 mb-1" />
                            <span className="text-xs text-cream/60 font-serif">
                              Add wedding memory
                            </span>
                          </div>
                        )}

                        {isSaving && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <span className="text-xs font-serif text-gold animate-pulse">
                              Optimizing & Saving...
                            </span>
                          </div>
                        )}

                        {isSuccess && (
                          <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center text-center p-2">
                            <CheckCircle className="w-8 h-8 text-emerald-400 mb-1 animate-bounce" />
                            <span className="text-xs font-serif font-bold text-emerald-200">
                              Wedding Frame #{slot.id} Saved!
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Caption Input */}
                      <div className="mb-4 space-y-1">
                        <label className="text-[10px] uppercase font-sans text-gold/70 block">
                          Wedding Caption:
                        </label>
                        <input
                          type="text"
                          value={currentCaption}
                          onChange={(e) =>
                            setCaptionsMap((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          placeholder="e.g. Dressed up together at our friend's wedding ❤️"
                          className="w-full px-3 py-1.5 rounded-lg bg-burgundy-950 border border-gold/30 text-cream text-xs focus:outline-none focus:border-gold"
                        />
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 pt-2 border-t border-gold/15">
                        <label className="flex-1 cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUploadWeddingPhoto(slot, e)}
                            className="hidden"
                          />
                          <span className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-wine to-burgundy-700 hover:from-wine-600 hover:to-wine text-cream text-xs font-serif font-semibold border border-gold/50 shadow-md flex items-center justify-center gap-1.5 transition-all">
                            <Upload className="w-3.5 h-3.5 text-gold" />
                            <span>{isCustom ? 'Replace Wedding Photo' : 'Upload Wedding Photo'}</span>
                          </span>
                        </label>

                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Revert Wedding Frame #${slot.id} back to placeholder?`)) {
                                removeSlotPhoto('wedding', slot.id);
                              }
                            }}
                            title="Remove wedding photo"
                            className="p-2.5 rounded-xl bg-burgundy-950 hover:bg-rose-950 text-cream/60 hover:text-rose-400 border border-gold/25 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer Action Bar */}
            <div className="mt-8 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between text-xs text-cream/60">
              <span>Each photo is stored independently in IndexedDB without quota limits.</span>
              <button
                type="button"
                onClick={async () => {
                  if (confirm('Are you sure you want to reset all slots back to default placeholders?')) {
                    await resetToDefaults();
                    alert('All slots have been reset to default placeholders.');
                  }
                }}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset All Slots</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
