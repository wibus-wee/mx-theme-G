import { $RootStore } from "@contexts/root-store";
import { useState, useEffect } from "react";

export const useReadMask = () => {
  const [showMask, setShowMask] = useState(false);

  const handleScroll = () => {
    const postContent = document.querySelector('.post-content');
    if (postContent) {
      const postContentTop = postContent.getBoundingClientRect().top;
      const postContentBottom = postContent.getBoundingClientRect().bottom;
      console.log(postContentTop, postContentBottom);
      if (postContentTop < 0 && postContentBottom - $RootStore.appUIStore.viewport.h > 0) {
        setShowMask(true);
        $RootStore.appUIStore.setReadMask(true);
      } else {
        $RootStore.appUIStore.setReadMask(false);
        setShowMask(false);
      }
    }
    
  };

  const throttleHandleScroll = () => {
    let timer: any = null;
    return () => {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        handleScroll();
        timer = null;
      }, 100);
    };
  };

  useEffect(() => {
    window.addEventListener('scroll', throttleHandleScroll());
    return () => {
      window.removeEventListener('scroll', throttleHandleScroll());
    };
  }, []);

  return showMask;
}