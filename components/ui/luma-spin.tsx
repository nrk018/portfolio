export const Component = () => {
return (
    <div 
      className="relative w-[65px] aspect-square"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
    <span 
      className="absolute rounded-[50px] animate-loaderAnim shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100"
      style={{
        willChange: "inset",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    />
      <span 
        className="absolute rounded-[50px] animate-loaderAnim animation-delay shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100"
        style={{
          willChange: "inset",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />
        <style jsx>{`
        @keyframes loaderAnim {
          0% {
            inset: 0 35px 35px 0;
          }
          12.5% {
            inset: 0 35px 0 0;
          }
          25% {
            inset: 35px 35px 0 0;
          }
          37.5% {
            inset: 35px 0 0 0;
          }
          50% {
            inset: 35px 0 0 35px;
          }
          62.5% {
            inset: 0 0 0 35px;
          }
          75% {
            inset: 0 0 35px 35px;
          }
          87.5% {
            inset: 0 0 35px 0;
          }
          100% {
            inset: 0 35px 35px 0;
          }
        }
        .animate-loaderAnim {
          animation: loaderAnim 2.5s infinite;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          /* Optimize for 164Hz refresh rate */
          transform: translateZ(0);
          will-change: inset;
        }
        .animation-delay {
          animation-delay: -1.25s;
        }
      `}</style>
  </div>
  );
};
