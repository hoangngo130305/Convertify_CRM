import svgPaths from "../imports/svg-8w6yar705l";

function Navigation() {
  return (
    <div className="col-1 ml-0 mt-0 relative row-1 size-[20px]" data-name="navigation">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="navigation">
          <path d={svgPaths.p5f0b7c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Navigation />
    </div>
  );
}

export default function FloatingCTA({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] cursor-pointer hover:opacity-90 transition-opacity"
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
      onClick={onClick}
    >
      <div className="bg-[#0d6efd] content-stretch flex gap-[10px] items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-tl-[10px] rounded-tr-[10px] w-full" data-name="Button CTA">
        <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-tl-[10px] rounded-tr-[10px] shadow-[0px_-1px_4px_-1px_rgba(12,12,13,0.1),0px_-1px_4px_-1px_rgba(12,12,13,0.05)]" />
        <p className="css-ew64yg font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[18px] text-white">Dùng thử miễn phí</p>
        <Group />
      </div>
    </div>
  );
}