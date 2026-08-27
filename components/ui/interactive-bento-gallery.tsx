"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { getOptimizedMediaUrl, getVideoPosterUrl } from '@/src/lib/media-optimizer';

// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    tag?: string;
    title: string;
    desc: string;
    stat?: string;
    category?: string;
    url: string;
    span: string;
}

// MediaItem component renders either a video or image based on item.type with zero-lag optimization
export const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Optimized URLs
    const optimizedUrl = getOptimizedMediaUrl(item.url);
    const posterUrl = item.type === 'video' ? getVideoPosterUrl(item.url) : undefined;

    // Strict Intersection Observer to only decode and play videos when actually on screen
    useEffect(() => {
        if (item.type !== 'video') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.15);
                });
            },
            {
                root: null,
                rootMargin: '100px 0px',
                threshold: [0, 0.15, 0.5],
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [item.type]);

    // Handle video play/pause with graceful fallback and no console noise
    useEffect(() => {
        if (item.type !== 'video' || !videoRef.current) return;

        const video = videoRef.current;

        if (isInView) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsLoaded(true);
                    })
                    .catch(() => {
                        // Auto-play was prevented or video paused while switching tabs
                    });
            }
        } else {
            video.pause();
        }
    }, [isInView, item.type]);

    // Render optimized video
    if (item.type === 'video') {
        return (
            <div
                ref={containerRef}
                className={`${className} relative overflow-hidden bg-[#111216] transform-gpu`}
                onClick={onClick}
            >
                {posterUrl && (
                    <img
                        src={posterUrl}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
                    />
                )}
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover transform-gpu relative z-10 pointer-events-none select-none"
                    playsInline
                    // @ts-ignore
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    muted
                    loop
                    disablePictureInPicture
                    disableRemotePlayback
                    controls={false}
                    preload="metadata"
                    poster={posterUrl}
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={optimizedUrl} type="video/mp4" />
                </video>
            </div>
        );
    }

    // Render optimized image with lazy loading and asynchronous decoding
    return (
        <img
            src={optimizedUrl}
            alt={item.title}
            className={`${className} object-cover cursor-pointer bg-[#111216] transform-gpu`}
            onClick={onClick}
            loading="lazy"
            decoding="async"
            style={{
                transform: 'translateZ(0)',
            }}
        />
    );
};

// GalleryModal component displays the selected media item in a modal
export interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[]; // List of media items to display in the modal
}

export const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 }); // Track the position of the dockable panel

    if (!isOpen) return null;

    return (
        <>
            {/* Main Modal Backdrop & Window */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[620px] backdrop-blur-2xl bg-[#111216]/80
                          rounded-none sm:rounded-2xl md:rounded-3xl overflow-hidden z-50 flex items-center justify-center p-4"
            >
                {/* Main Content */}
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <div className="flex-1 w-full p-2 sm:p-4 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-4xl 
                                         h-auto max-h-[72vh] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#1A1C22]"
                                initial={{ y: 20, scale: 0.97 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 0.5
                                    }
                                }}
                                exit={{
                                    y: 20,
                                    scale: 0.97,
                                    transition: { duration: 0.15 }
                                }}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain bg-[#111216]" onClick={onClose} />
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 
                                              bg-gradient-to-t from-[#111216] via-[#111216]/80 to-transparent">
                                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#4EFE32]/10 border border-[#4EFE32]/30 text-[#4EFE32] font-['Barlow_Condensed',sans-serif] text-[11px] font-bold tracking-wider uppercase">
                                            {selectedItem.tag || selectedItem.type}
                                        </div>
                                        {selectedItem.stat && (
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white font-['Barlow_Condensed',sans-serif] text-[11px] font-semibold tracking-wider uppercase">
                                                {selectedItem.stat}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                                        <div>
                                            <h3 className="text-[#ECECEC] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide text-lg sm:text-xl md:text-2xl font-bold">
                                                {selectedItem.title}
                                            </h3>
                                            <p className="text-[#ECECEC]/75 font-['Barlow_Semi_Condensed',sans-serif] text-xs sm:text-sm mt-1 max-w-xl">
                                                {selectedItem.desc}
                                            </p>
                                        </div>
                                        <ShimmerButton
                                            shimmerColor="#4EFE32"
                                            shimmerSize="0.08em"
                                            background="rgba(17, 18, 22, 0.95)"
                                            className="px-4 py-2 border border-[#4EFE32]/40 shadow-lg shadow-[#4EFE32]/15 flex-shrink-0"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onClose();
                                                const contactEl = document.getElementById('contact-section');
                                                if (contactEl) {
                                                    contactEl.scrollIntoView({ behavior: 'smooth' });
                                                } else {
                                                    window.location.hash = '#contact-section';
                                                }
                                            }}
                                        >
                                            <span className="flex items-center gap-1.5 font-['Barlow_Condensed',sans-serif] uppercase tracking-wider text-xs font-bold text-[#4EFE32]">
                                                <Send className="w-3.5 h-3.5" />
                                                <span>Deploy Similar Campaign</span>
                                            </span>
                                        </ShimmerButton>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Close Button */}
                <motion.button
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 
                              p-2.5 rounded-full bg-[#1A1C22]/90 text-[#ECECEC] hover:text-[#4EFE32] hover:bg-[#111216] 
                              border border-white/10 text-xs sm:text-sm backdrop-blur-md transition-colors cursor-pointer z-50 shadow-lg"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                >
                    <X className='w-4 h-4' />
                </motion.button>
            </motion.div>

            {/* Draggable Dock */}
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed z-50 left-1/2 bottom-5 -translate-x-1/2 touch-none"
            >
                <motion.div
                    className="relative rounded-2xl bg-[#1A1C22]/90 backdrop-blur-2xl 
                             border border-[#4EFE32]/30 shadow-2xl shadow-black/60
                             cursor-grab active:cursor-grabbing p-1.5"
                >
                    <div className="flex items-center -space-x-1.5 px-2 py-1">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 
                                    rounded-xl overflow-hidden border border-white/15
                                    cursor-pointer hover:z-20
                                    ${selectedItem.id === item.id
                                        ? 'ring-2 ring-[#4EFE32] shadow-lg shadow-[#4EFE32]/30 border-[#4EFE32]'
                                        : 'hover:ring-2 hover:ring-[#00C2CB]/60'}
                                `}
                                initial={{ rotate: index % 2 === 0 ? -10 : 10 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.25 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -8 : 8,
                                    y: selectedItem.id === item.id ? -8 : 0,
                                }}
                                whileHover={{
                                    scale: 1.3,
                                    rotate: 0,
                                    y: -10,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full object-cover" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-[#4EFE32]/30 blur-xl pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[];
    title: string;
    description: string;
    className?: string;
}

export const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description, className = "" }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className={`container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-6xl ${className}`}>
            {(title || description) && (
                <div className="mb-10 text-center max-w-2xl mx-auto">
                    <motion.div
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4EFE32]/10 border border-[#4EFE32]/25 text-[#4EFE32] text-xs font-semibold uppercase tracking-widest mb-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span>Curated Gallery</span>
                    </motion.div>
                    {title && (
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#ECECEC]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {title}
                        </motion.h2>
                    )}
                    {description && (
                        <motion.p
                            className="mt-3 text-sm sm:text-base text-[#ECECEC]/70 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {description}
                        </motion.p>
                    )}
                </div>
            )}
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3.5 auto-rows-[110px] sm:auto-rows-[90px] md:auto-rows-[100px]"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.08 }
                            }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing border border-white/10 hover:border-[#4EFE32]/50 shadow-xl bg-[#1A1C22] group ${item.span}`}
                                onClick={() => !isDragging && setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 30, scale: 0.95, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            delay: index * 0.04
                                        }
                                    }
                                }}
                                whileHover={{ scale: 1.02 }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={0.8}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={(_, info) => {
                                    setIsDragging(false);
                                    const moveDistance = info.offset.x + info.offset.y;
                                    if (Math.abs(moveDistance) > 50) {
                                        const newItems = [...items];
                                        const draggedItem = newItems[index];
                                        const targetIndex = moveDistance > 0 ?
                                            Math.min(index + 1, items.length - 1) :
                                            Math.max(index - 1, 0);
                                        newItems.splice(index, 1);
                                        newItems.splice(targetIndex, 0, draggedItem);
                                        setItems(newItems);
                                    }
                                }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    onClick={() => !isDragging && setSelectedItem(item)}
                                />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 bg-gradient-to-t from-[#111216]/95 via-[#111216]/60 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between gap-1 mb-1 flex-wrap">
                                            <span className="inline-block text-[10px] font-['Barlow_Condensed',sans-serif] font-bold text-[#4EFE32] uppercase tracking-wider">
                                                {item.tag || item.type}
                                            </span>
                                            {item.stat && (
                                                <span className="inline-block text-[9px] font-['Barlow_Condensed',sans-serif] font-bold uppercase tracking-wider text-white/90 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
                                                    {item.stat}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-[#ECECEC] font-['Barlow_Condensed',sans-serif] uppercase tracking-wide text-xs sm:text-sm md:text-base font-bold line-clamp-1 group-hover:text-[#4EFE32] transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-[#ECECEC]/75 font-['Barlow_Semi_Condensed',sans-serif] text-[10px] sm:text-xs line-clamp-2 mt-0.5">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
