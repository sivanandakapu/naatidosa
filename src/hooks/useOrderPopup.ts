import { useEffect, useState } from 'react';

export function useOrderPopup(autoOpenDelay?: number) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);

  useEffect(() => {
    let timerId: number | undefined;

    // if (autoOpenDelay) {
    //   timerId = window.setTimeout(() => {
    //     setShowPopup(true);
    //   }, autoOpenDelay);
    // }

    const handleOpenPopup = () => {
      setSelectedMenuItem(null);
      setShowPopup(true);
    };

    window.addEventListener('openOrderPopup', handleOpenPopup);

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }

      window.removeEventListener('openOrderPopup', handleOpenPopup);
    };
  }, [autoOpenDelay]);

  const openPopup = (itemName?: string) => {
    setSelectedMenuItem(itemName ?? null);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return {
    closePopup,
    openPopup,
    selectedMenuItem,
    showPopup,
  };
}
