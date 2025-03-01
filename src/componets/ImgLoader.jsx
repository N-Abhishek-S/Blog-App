import React, { useState } from "react";

function ImgLoader({ src, alt, className }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative w-1/3 h-auto ${className}`}>
      {/* Show Skeleton Loader while image is loading */}
      {loading && !error && (
        <div className="animate-pulse bg-gray-300 rounded-xl w-full h-60 flex items-center justify-center">
          <p className="text-gray-500 text-sm">Loading image...</p>
        </div>
      )}

      {/* Show "Coming Soon" if the image fails */}
      {error && (
        <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-xl w-full h-60">
          <p className="text-gray-600">Image Coming Soon</p>
        </div>
      )}

      {/* The actual image (only show when it's loaded and no error) */}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`rounded-xl w-full h-auto transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}
    </div>
  );
}

export default ImgLoader;
