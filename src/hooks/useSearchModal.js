import { useState, useEffect } from 'react';

const useSearchModal = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Handle global keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Open search with Ctrl+K or Cmd+K
            if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                event.preventDefault();
                if (!isSearchOpen) {
                    openSearchModal();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen]);

    const openSearchModal = () => {
        setIsSearchOpen(true);
    };

    const closeSearchModal = () => {
        setIsSearchOpen(false);
    };

    return {
        isSearchOpen,
        openSearchModal,
        closeSearchModal
    };
};

export default useSearchModal;