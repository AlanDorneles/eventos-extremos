// ThemedImage.tsx
type Props = {
  lightSrc: string;
  darkSrc?: string;     // se não passar, usa o light no dark
  alt: string;
  className?: string;
};

export function ThemedImage({ lightSrc, darkSrc, alt, className }: Props) {
  return (
    <picture>
      {darkSrc && <source srcSet={darkSrc} media="(prefers-color-scheme: dark)" />}
      <img src={lightSrc} alt={alt} className={className} loading="lazy" />
    </picture>
  );
}