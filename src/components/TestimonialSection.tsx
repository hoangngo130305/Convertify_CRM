import svgPaths from "../imports/svg-0rd7vurkp8";
import imgEllipse1 from "figma:asset/112e38e0aea13e8ab766d86acd7b4486061b4929.png";

export function Frame59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] w-full">Nguyễn Văn Minh</p>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Giám đốc Marketing - Tech Startup</p>
    </div>
  );
}

export function Frame60() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[60px] rounded-full overflow-hidden">
        <img alt="Khách hàng" className="block max-w-none object-cover size-full" height="60" src={imgEllipse1} width="60" />
      </div>
      <Frame59 />
    </div>
  );
}

export function Frame61() {
  return (
    <div className="relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-full transition-all duration-300 hover:shadow-[0px_15px_35px_-10px_rgba(124,58,237,0.25)] hover:scale-[1.02]" style={{ backgroundImage: "linear-gradient(179.806deg, rgba(92, 29, 163, 0.05) 0.20468%, rgba(252, 249, 254, 0.05) 79.877%, rgba(255, 255, 255, 0.05) 99.795%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[40px] pt-[60px] px-[30px] relative w-full">
        <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">
          Sau khi sử dụng hệ thống CRM của Convertify, công việc quản lý lead của tôi trở nên dễ dàng hơn rất nhiều. Dữ liệu từ các kênh quảng cáo được đồng bộ tự động, giúp tôi tiết kiệm thời gian và tối ưu chi phí quảng cáo hiệu quả.
        </p>
        <Frame60 />
        <div className="absolute h-[58px] left-[30px] top-[30px] w-[80px]" data-name="quote">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(124, 58, 237, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 58">
              <path d={svgPaths.p3fad6100} fill="var(--fill-0, #7C3AED)" id="quote-icon" opacity="0.1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Frame64() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[15px] py-0 relative w-full">
          <Frame61 />
        </div>
      </div>
    </div>
  );
}

export function Frame142() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[30px] py-0 relative text-[#212529] w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">
            Khách hàng nói về chúng tôi
          </p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#757575] text-[16px] w-full">
            Hãy lắng nghe những chia sẻ của khách hàng đã trải nghiệm dịch vụ của chúng tôi
          </p>
        </div>
      </div>
    </div>
  );
}
