interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  image: string;
  size?: "large" | "medium" | "small";
  overlay?: boolean;
}

export default function Hero({
  title,
  subtitle,
  children,
  image,
  size = "large",
  overlay = true,
}: HeroProps) {
  const heightClass =
    size === "large"
      ? "min-h-[70vh] md:min-h-[80vh]"
      : size === "medium"
      ? "min-h-[50vh] md:min-h-[60vh]"
      : "min-h-[35vh] md:min-h-[40vh]";

  return (
    <section
      className={`relative flex items-center justify-center ${heightClass} bg-cover bg-center`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      )}
      <div className="relative z-10 container-site text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-zinc-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
