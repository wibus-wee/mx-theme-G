import { useRootStore } from "@hooks/useStore";
import clsx from "clsx";
import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { TocProps } from ".";
import styles from "./index.module.css"
export const Toc: FC<TocProps> = ({ headings: $ }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headings: {
    depth: number;
    index: number;
    title: string;
  }[] = useMemo(() => {
    return Array.from($).map((_, index) => {
      return {
        depth: parseInt(_.tagName.slice(1)),
        index,
        title: _.textContent || _.id || "",
      };
    });
  }, [$]);

  const [activeId, setActiveId] = useState("");

  const { appUIStore } = useRootStore()

  useEffect(() => {

    console.log(`-${appUIStore.viewport.h - 300
      }px`)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            console.log(id)
            setActiveId(id);
          }
        });
      },
      {
        rootMargin: `0px -${appUIStore.viewport.h - 500}px 0px 0px`,
        threshold: 1,
      }
    );

    headings.forEach(({ index }) => {
      observer.observe($[index]);
    });

    return () => {
      observer.disconnect();
    };
  }, [appUIStore.viewport, headings, $]);

  return (
    <div className={styles['container']} ref={containerRef}>
      <h3 className={styles['title']}>目录</h3>
      <ul className={styles.list}>
        {headings.map(({ depth, index, title }, i) => {
          return (
            <li
              key={index}
              className={clsx(
                styles.item,
              )}
              style={{ paddingLeft: depth * 10 }}
            >
              <a
                href={`#${title.replace(/\s/g, '-').toLowerCase()}`}
                className={
                  clsx(
                    styles.link,
                    activeId === title.replace(/\s/g, '-').toLowerCase() && styles.active
                  )
                }
                id={title.replace(/\s/g, '-').toLowerCase()}
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: $[index].offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(Toc);

// usage
// import Toc from "./Toc";
// <Toc headings={headings} />
