export default function Container({ children, className = "" }) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-full max-w-layout 3xl:max-w-layout-wide px-4 sm:px-6 lg:px-10 layout-transition">
        {children}
      </div>
    </div>
  );
}