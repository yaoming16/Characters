import { useState, useRef, useEffect, ReactNode } from "react";
import { expandSVG } from "../../assets/svgs";

import "../../styles/Accordion.css";

interface AccordionProps {
  children: ReactNode;
  title: string;
  className?: string;
  titleStyle?: string;
}

function Accordion({ children , title, className = "", titleStyle = "" }: AccordionProps) {
  // State to open/close
  const [isOpen, setIsOpen] = useState(true);

  //Ref to mesure height
  const contentEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentEl.current && isOpen) {
      contentEl.current.style.height = `${contentEl.current.scrollHeight}px`;
    } else if (contentEl.current) {
      contentEl.current.style.height = "0px";
    }
  }, [children, isOpen]);

  return (
    <section className={`accordion-item ${isOpen ? "active" : ""} ${className}`}>
      <button
        type="button"
        className="accordion-title"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Expand ${title} section`}
      >
        <h3 className={titleStyle}>{title}</h3>
        <span
          aria-label={isOpen ? "Collapse Section" : "Expand Section"}
          className={`svg-span ${isOpen ? "rotate " : ""}`}
        >
          {expandSVG}
        </span>
      </button>
      <div ref={contentEl} className="accordion-content">
        <div className="content">{children}</div>
      </div>
    </section>
  );
}

export default Accordion;