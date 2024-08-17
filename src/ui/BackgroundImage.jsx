/* eslint-disable react/prop-types */
function BackgroundImage({ src, alt }) {
  return (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className="absolute h-full w-full inset-0 object-top object-cover"
      src={src}
    />
  );
}

export default BackgroundImage;
