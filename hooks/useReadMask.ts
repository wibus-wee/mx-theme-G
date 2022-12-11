import { $RootStore } from "@contexts/root-store";
import { useState, useEffect } from "react";

export const useReadMask = () => {
  const [showMask, setShowMask] = useState(false);

  const handleScroll = () => {
    const postContent = document.querySelector('.post-content');
    if (postContent) {
      // 获取文章内容距离上一个元素顶部的高度
      const postContentTop = postContent.getBoundingClientRect().top;
      // 获取文章内容距离下一个元素的高度
      const postContentBottom = postContent.getBoundingClientRect().bottom;
      // 如果进入了文章内容区域
      if (postContentTop < 0 && postContentBottom - 500 > 0) {
        setShowMask(true);
        $RootStore.appUIStore.setReadMask(true);
      } else {
        $RootStore.appUIStore.setReadMask(false);
        setShowMask(false);
      }
    }
    
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return showMask;
}