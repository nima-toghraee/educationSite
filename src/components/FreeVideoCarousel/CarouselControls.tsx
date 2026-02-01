"use client";

type ControlsProps = {
  prev: () => void;
  next: () => void;
};

export default function CarouselControls({ prev, next }: ControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <button
        onClick={prev}
        className="rounded-full p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
        aria-label="قبلی"
      >
        {"<"}
      </button>
      <button
        onClick={next}
        className="rounded-full p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
        aria-label="بعدی"
      >
        {">"}
      </button>
    </div>
  );
}
