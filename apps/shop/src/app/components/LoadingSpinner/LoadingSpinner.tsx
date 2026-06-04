export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-52">
      <div
        className="w-16 text-center flex gap-2 justify-center"
        aria-label="Loading..."
      >
        <div className="w-4 h-4 bg-blue-400 rounded-full inline-block animate-[sk-bouncedelay_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full inline-block animate-[sk-bouncedelay_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]"></div>
        <div className="w-4 h-4 bg-blue-400 rounded-full inline-block animate-[sk-bouncedelay_1.4s_infinite_ease-in-out_both]"></div>
      </div>
      <p className="mt-4 text-gray-500 text-base">Loading...</p>
    </div>
  );
}
