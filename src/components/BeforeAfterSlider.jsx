import { useRef, useState, useCallback, useEffect } from "react";

function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const dragging = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const calcPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      dragging.current = true;
      setSliderPos(calcPos(e.clientX));
    },
    [calcPos],
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      e.preventDefault();
      setSliderPos(calcPos(e.clientX));
    },
    [calcPos],
  );

  const onMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const onTouchStart = useCallback(
    (e) => {
      dragging.current = true;
      setSliderPos(calcPos(e.touches[0].clientX));
    },
    [calcPos],
  );

  const onTouchMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      setSliderPos(calcPos(e.touches[0].clientX));
    },
    [calcPos],
  );

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mousemove", onMouseMove, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onTouchMove, onMouseUp, onTouchEnd]);

  return (
    <div
      className="ba-slider"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      role="img"
      aria-label={`${beforeAlt} / ${afterAlt}`}
      style={{ touchAction: "none" }}
    >
      <img
        className="ba-img ba-after"
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
      />

      <div className="ba-before-wrap" style={{ width: `${sliderPos}%` }}>
        <img
          className="ba-img ba-before"
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
          style={{ width: containerWidth || "100%" }}
        />
      </div>

      <div
        className="ba-divider"
        style={{ left: `${sliderPos}%` }}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Before/after slider"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 2));
          if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 2));
        }}
      >
        <div className="ba-handle">
          <span className="ba-arrow ba-arrow-left">‹</span>
          <span className="ba-arrow ba-arrow-right">›</span>
        </div>
      </div>

      <span className="ba-label ba-label-before">Before</span>
      <span className="ba-label ba-label-after">After</span>
    </div>
  );
}

export default BeforeAfterSlider;
