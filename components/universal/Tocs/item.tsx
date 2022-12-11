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

  const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   const { current: container } = containerRef;
  //   if (!container) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           // @ts-ignore
  //           const { index } = entry.target.dataset;
  //           console.log(index);
  //           setActiveIndex(parseInt(index));
  //         }
  //       });
  //     },
  //     {
  //       root: container,
  //       rootMargin: "0px",
  //       threshold: 1.0,
  //     }
  //   );

  //   const targets = Array.from(container.querySelectorAll(".post-content h2"));
  //   targets.forEach((target) => {
  //     observer.observe(target);
  //   });

  //   return () => {
  //     targets.forEach((target) => {
  //       observer.unobserve(target);
  //     });
  //   };
  // }, []);

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
                // i === activeIndex && styles.active
              )}
            >
              <a
                href={`#${title.replace(/\s/g, '-').toLowerCase()}`}
                className={styles.text}
                data-index={index}
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
