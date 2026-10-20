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
  Image as ImageIcon,
  FolderOpen,
  Save,
  Trash2,
} from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { triggerRomanticConfetti } from '../utils/confetti';
import { MemoryItem } from '../data/anniversaryContent';

export const AdminPhotoModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    galleryPhotos,
    weddingPhotos,
    updateGalleryPhoto,
    updateWeddingPhoto,
    addNewGalleryPhoto,
    resetToDefaults,
  } = usePhotos();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // Active Tab: 'upload' | 'manage-gallery' | 'manage-weddings'
  const [activeTab, setActiveTab] = useState<'upload' | 'manage-gallery' | 'manage-weddings'>('upload');

  // Form State for Upload
  const [selectedTargetType, setSelectedTargetType] = useState<'gallery' | 'wedding'>('gallery');
  const [selectedSlotId, setSelectedSlotId] = useState<number>(1);
  const [isNewPhoto, setIsNewPhoto] = useState(false);
  const [photoCategory, setPhotoCategory] = useState<MemoryItem['category']>('class-10');
  const [stageLabel, setStageLabel] = useState('Class 10 • MMET');
  const [caption, setCaption] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Determine relative server path for local save
  const getSuggestedFilePath = () => {
    if (selectedTargetType === 'wedding') {
      return `friends-weddings/wedding-${String(selectedSlotId).padStart(2, '0')}.jpg`;
    }
    const catFolderMap: Record<string, string> = {
      'class-10': 'school/class-10',
      'class-11': 'school/class-11',
      'class-12': 'school/class-12',
      college: 'college',
      weddings: 'friends-weddings',
      other: 'other-memories',
    };
    const folder = catFolderMap[photoCategory] || 'other-memories';
    return `${folder}/photo-${String(selectedSlotId).padStart(2, '0')}.jpg`;
  };

  const handleSavePhoto = async () => {
    if (!previewDataUrl) return;
    setIsSaving(true);

    try {
      const suggestedPath = getSuggestedFilePath();

      if (selectedTargetType === 'wedding') {
        await updateWeddingPhoto(
          selectedSlotId,
          previewDataUrl,
          caption.trim() || undefined,
          suggestedPath
        );
      } else if (isNewPhoto) {
        await addNewGalleryPhoto(
          {
            caption: caption.trim() || 'A sweet memory together ❤️',
            category: photoCategory,
            stageLabel: stageLabel || 'Class 10',
            date: dateStr || 'Memories',
            isRealPhoto: true,
            image: previewDataUrl,
          },
          previewDataUrl,
          suggestedPath
        );
      } else {
        await updateGalleryPhoto(
          selectedSlotId,
          {
            ...(caption.trim() ? { caption: caption.trim() } : {}),
            ...(dateStr.trim() ? { date: dateStr.trim() } : {}),
            category: photoCategory,
            stageLabel,
          },
          previewDataUrl,
          suggestedPath
        );
      }

      setSaveSuccess(true);
      triggerRomanticConfetti();
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Save failed', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectExistingToEdit = (item: MemoryItem) => {
    setSelectedTargetType('gallery');
    setIsNewPhoto(false);
    setSelectedSlotId(item.id);
    setPhotoCategory(item.category);
    setStageLabel(item.stageLabel);
    setCaption(item.caption);
    setDateStr(item.date || '');
    setPreviewDataUrl(item.image.startsWith('data:') ? item.image : null);
    setActiveTab('upload');
  };

  const handleClose = () => {
    setIsAdminOpen(false);
    if (window.location.hash.toLowerCase().includes('admin') || window.location.search.includes('admin')) {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-4xl w-full bg-burgundy-950 border-2 border-gold/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-cream max-h-[92vh] overflow-y-auto"
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
                  <h3 className="font-serif text-2xl font-bold text-cream">
                    Kaakooka's Photo Studio
                  </h3>
                  <span className="text-xs text-blush">
                    Adding real photographs starting from 10th standard
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors flex items-center gap-1.5 ${
                    activeTab === 'upload'
                      ? 'bg-gold text-burgundy-950 font-bold shadow-md'
                      : 'bg-burgundy-900 text-cream/80 hover:text-gold border border-gold/30'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload / Replace</span>
                </button>
                <button
                  onClick={() => setActiveTab('manage-gallery')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors flex items-center gap-1.5 ${
                    activeTab === 'manage-gallery'
                      ? 'bg-gold text-burgundy-950 font-bold shadow-md'
                      : 'bg-burgundy-900 text-cream/80 hover:text-gold border border-gold/30'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Manage Gallery ({galleryPhotos.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('manage-weddings')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-colors flex items-center gap-1.5 ${
                    activeTab === 'manage-weddings'
                      ? 'bg-gold text-burgundy-950 font-bold shadow-md'
                      : 'bg-burgundy-900 text-cream/80 hover:text-gold border border-gold/30'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Wedding Keepsakes ({weddingPhotos.length})</span>
                </button>
              </div>
            </div>

            {/* Success Toast */}
            {saveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm flex items-center gap-3 shadow-md"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Photo saved successfully! It is now live on the website and stored in your device storage.
                </span>
              </motion.div>
            )}

            {/* TAB 1: UPLOAD / REPLACE PHOTO */}
            {activeTab === 'upload' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Form Inputs (Left side) */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Target Section */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTargetType('gallery');
                        setIsNewPhoto(false);
                      }}
                      className={`p-3 rounded-2xl border text-xs font-serif text-center transition-all ${
                        selectedTargetType === 'gallery'
                          ? 'bg-wine text-cream border-gold shadow-md'
                          : 'bg-burgundy-900/60 border-gold/20 text-cream/70'
                      }`}
                    >
                      Gallery Photo (10th+ to Today)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTargetType('wedding');
                        setIsNewPhoto(false);
                      }}
                      className={`p-3 rounded-2xl border text-xs font-serif text-center transition-all ${
                        selectedTargetType === 'wedding'
                          ? 'bg-wine text-cream border-gold shadow-md'
                          : 'bg-burgundy-900/60 border-gold/20 text-cream/70'
                      }`}
                    >
                      Friends' Wedding Keepsake
                    </button>
                  </div>

                  {/* Slot Selection */}
                  {selectedTargetType === 'gallery' ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-serif text-gold">
                          Select Photo Slot to Replace / Add:
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsNewPhoto(!isNewPhoto)}
                          className="text-[11px] text-blush hover:underline"
                        >
                          {isNewPhoto ? '← Pick existing slot' : '+ Create brand new slot'}
                        </button>
                      </div>

                      {!isNewPhoto ? (
                        <select
                          value={selectedSlotId}
                          onChange={(e) => {
                            const id = Number(e.target.value);
                            setSelectedSlotId(id);
                            const found = galleryPhotos.find((p) => p.id === id);
                            if (found) {
                              setCaption(found.caption);
                              setDateStr(found.date || '');
                              setPhotoCategory(found.category);
                              setStageLabel(found.stageLabel);
                            }
                          }}
                          className="w-full px-4 py-2.5 rounded-xl bg-burgundy-900 border border-gold/30 text-cream text-xs font-serif focus:outline-none focus:border-gold"
                        >
                          {galleryPhotos.map((item) => (
                            <option key={item.id} value={item.id}>
                              Slot #{item.id} — [{item.stageLabel}] {item.caption.slice(0, 35)}...
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-blush block bg-burgundy-900/60 p-2.5 rounded-xl border border-gold/20">
                          Creating a brand new photo card for Finu's gallery!
                        </span>
                      )}

                      {/* Category Selection */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'class-10', label: 'Class 10 (MMET)', stage: 'Class 10 • MMET' },
                          { id: 'class-11', label: 'Class 11 (Panakkad)', stage: 'Class 11 • Panakkad' },
                          { id: 'class-12', label: 'Class 12 (Panakkad)', stage: 'Class 12 • Panakkad' },
                          { id: 'college', label: 'College Days', stage: 'College Days' },
                          { id: 'weddings', label: 'Friends\' Weddings', stage: 'Friends\' Weddings' },
                          { id: 'other', label: 'Other Memories', stage: 'Special Milestone' },
                        ].map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setPhotoCategory(c.id as any);
                              setStageLabel(c.stage);
                            }}
                            className={`p-2 rounded-xl text-[11px] font-serif border text-left transition-all ${
                              photoCategory === c.id
                                ? 'bg-gold text-burgundy-950 font-bold border-gold shadow-sm'
                                : 'bg-burgundy-900/40 text-cream/70 border-gold/20'
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Wedding Slot Selection */
                    <div className="space-y-2">
                      <label className="text-xs font-serif text-gold">
                        Select Wedding Memory Frame:
                      </label>
                      <select
                        value={selectedSlotId}
                        onChange={(e) => {
                          const id = Number(e.target.value);
                          setSelectedSlotId(id);
                          const found = weddingPhotos.find((w) => w.id === id);
                          if (found) {
                            setCaption(found.caption);
                            setDateStr(found.date || '');
                          }
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-burgundy-900 border border-gold/30 text-cream text-xs font-serif focus:outline-none focus:border-gold"
                      >
                        {weddingPhotos.map((slot) => (
                          <option key={slot.id} value={slot.id}>
                            Wedding Slot #{slot.id} — {slot.caption}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* File Upload Zone */}
                  <div>
                    <label className="text-xs font-serif text-gold block mb-1.5">
                      Upload Picture from your Device (Mac / Phone):
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-6 rounded-2xl border-2 border-dashed border-gold/50 bg-burgundy-900/40 hover:bg-burgundy-900/70 transition-colors flex flex-col items-center justify-center cursor-pointer text-center group"
                    >
                      <div className="w-12 h-12 rounded-full bg-wine/50 border border-gold/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-gold" />
                      </div>
                      <p className="font-serif text-sm font-semibold text-cream">
                        Click or Drop photo here
                      </p>
                      <p className="text-[11px] text-cream/50 mt-1">
                        Accepts JPG, PNG, WEBP (stored in device storage)
                      </p>
                    </div>
                  </div>

                  {/* Caption & Date Inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-serif text-gold block mb-1">
                        Caption for Finu:
                      </label>
                      <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="e.g. Class 10 farewell smiles with my Finu ❤️"
                        className="w-full px-4 py-2.5 rounded-xl bg-burgundy-900 border border-gold/30 text-cream text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-serif text-gold block mb-1">
                        Approximate Date / Subtitle:
                      </label>
                      <input
                        type="text"
                        value={dateStr}
                        onChange={(e) => setDateStr(e.target.value)}
                        placeholder="e.g. 10th Standard or Wedding Keepsake"
                        className="w-full px-4 py-2.5 rounded-xl bg-burgundy-900 border border-gold/30 text-cream text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={!previewDataUrl || isSaving}
                      onClick={handleSavePhoto}
                      className={`w-full py-3.5 rounded-2xl font-serif font-bold text-base flex items-center justify-center gap-2 transition-all ${
                        previewDataUrl
                          ? 'bg-gradient-to-r from-gold via-amber-400 to-gold text-burgundy-950 shadow-gold-glow hover:shadow-xl cursor-pointer'
                          : 'bg-stone-800 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      <Save className="w-5 h-5" />
                      <span>{isSaving ? 'Saving Photo...' : 'Publish Photo to Website ❤️'}</span>
                    </button>
                    <p className="text-[11px] text-center text-cream/50 mt-2 font-mono">
                      Target file path: public/images/{getSuggestedFilePath()}
                    </p>
                  </div>
                </div>

                {/* Live Preview (Right side) */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <span className="text-xs font-serif text-gold uppercase tracking-wider mb-3">
                    Live Polaroid Preview
                  </span>

                  <div className="w-full max-w-[280px] bg-cream p-4 pt-4 pb-6 rounded-2xl shadow-2xl border border-amber-900/20 rotate-1">
                    {/* Tape */}
                    <div className="w-16 h-5 bg-blush/60 mx-auto mb-3 border-l border-r border-dashed border-amber-800/40 rotate-1 shadow-sm" />

                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-burgundy-900/10 border border-stone-200 flex items-center justify-center relative">
                      {previewDataUrl ? (
                        <img
                          src={previewDataUrl}
                          alt="Live Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <Camera className="w-10 h-10 text-wine/50 mb-2" />
                          <span className="text-xs font-serif text-wine font-semibold">
                            Photo preview appears here
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 px-1 text-center">
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-wine/70 block">
                        {stageLabel} • {dateStr || 'Date'}
                      </span>
                      <p className="font-script text-2xl text-burgundy-950 mt-1 line-clamp-1">
                        {caption || 'Our sweet memory ❤️'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MANAGE GALLERY PHOTOS */}
            {activeTab === 'manage-gallery' && (
              <div>
                <p className="text-xs text-cream/70 mb-4">
                  Click any slot to replace its picture or edit its caption. Real photos start from Class 10!
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                  {galleryPhotos.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectExistingToEdit(item)}
                      className="bg-burgundy-900/60 p-3 rounded-2xl border border-gold/30 hover:border-gold transition-colors cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-burgundy-950 border border-gold/20 relative mb-2 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-wine/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-serif text-gold font-bold">
                          Edit Slot
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] uppercase font-mono text-blush block">
                          Slot #{item.id} • {item.stageLabel}
                        </span>
                        <p className="text-xs font-serif text-cream line-clamp-1">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: MANAGE WEDDINGS */}
            {activeTab === 'manage-weddings' && (
              <div>
                <p className="text-xs text-cream/70 mb-4">
                  Manage the 3 wedding keepsake frames where you got to take photographs together.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {weddingPhotos.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => {
                        setSelectedTargetType('wedding');
                        setSelectedSlotId(slot.id);
                        setCaption(slot.caption);
                        setDateStr(slot.date || '');
                        setActiveTab('upload');
                      }}
                      className="bg-burgundy-900/60 p-4 rounded-2xl border border-gold/30 hover:border-gold transition-colors cursor-pointer text-center group"
                    >
                      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-burgundy-950 border border-gold/20 mb-3 flex items-center justify-center relative">
                        <img
                          src={slot.image}
                          alt={slot.caption}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-wine/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-serif text-gold font-bold">
                          Click to Change
                        </div>
                      </div>

                      <span className="text-xs font-serif text-gold font-bold block mb-1">
                        Wedding Frame #{slot.id}
                      </span>
                      <p className="text-xs text-cream/80 line-clamp-2">
                        {slot.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Action Bar */}
            <div className="mt-8 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between text-xs text-cream/60">
              <div className="flex items-center gap-2">
                <span>All photos are securely preserved in your browser's IndexedDB.</span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (confirm('Reset all uploaded photos back to default placeholders?')) {
                    await resetToDefaults();
                    alert('Reset complete!');
                  }
                }}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset to Placeholders</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
