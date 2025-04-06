import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import "./SmoothClipReveal.css";

export default function SmoothClipReveal() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", () => {
      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const videoHeight = wrapper.offsetHeight;

      const visibleHeight = windowHeight - rect.top;
      const progress = Math.min(Math.max(visibleHeight / videoHeight, 0), 1);
      const reverse = 1 - progress;

      wrapper.style.setProperty("--reverse-progress", reverse);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="spacer" />
      <div className="video-wrapper" ref={wrapperRef}>
        <div className="video-container">
          <video
            autoPlay
            muted
            loop
            playsInline
            src="https://basehabitation.com/wp-content/uploads/2024/04/Base_Lamps_v02.mp4"
          />
        </div>
      </div>
      <div className="spacer" />
    </>
  );
}
