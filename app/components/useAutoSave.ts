import { useEffect, useState } from 'react';
import Quill from 'quill';

interface UseAutoSaveProps {
  quillRef: React.RefObject<Quill | null>;
  interval?: number;
}

export const useAutoSave = ({ quillRef, interval = 30000 }: UseAutoSaveProps) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (quillRef.current && quillRef.current.getLength() > 1) { 
        // Only save if there's content
        setLastSaved(new Date());
      }
    }, interval);

    return () => clearInterval(saveInterval);
  }, [quillRef, interval]);

  const manualSave = () => {
    setLastSaved(new Date());
  };

  return {
    lastSaved,
    manualSave
  };
};