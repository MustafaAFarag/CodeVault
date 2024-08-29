/* eslint-disable react/prop-types */
function BackgroundImage({ src, alt }) {
  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-top"
      src={src}
    />
  );
}

export default BackgroundImage;
