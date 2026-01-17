import svgPaths from "./svg-j28agzdiyp";
import imgHero1Img1 from "figma:asset/2be47e67227fd376eb094b55ac5112065f82355f.png";
import imgConvertifyLogoFullLight021 from "figma:asset/d2afe422db17950f27d4ea454ca993e47c0efea1.png";
import imgRectangle1 from "figma:asset/8f744231b291c01b80cc80cad5cc40941d88f215.png";
import imgRectangle2 from "figma:asset/4986c3f2b61e44b7f24f7c55a55bdda39c0b9a48.png";
import imgRectangle3 from "figma:asset/bda7b0d56db163d83dc5e77af664f9cb393facca.png";
import imgRectangle4 from "figma:asset/b6767066b78cfb865d7a3f6e212caf8d7ff0c3c0.png";
import imgRectangle5 from "figma:asset/6dea98ec815b7c5559a6aeee3378e1e9b2852960.png";
import imgRectangle6 from "figma:asset/be845882c72f33b6fefd8af3421980d039c99c7a.png";
import imgRectangle7 from "figma:asset/2076b46a96f4422a375bbf562b7998e5dd9fb028.png";
import imgRectangle8 from "figma:asset/6afbffa74bc1db39b9b125819b3493035c2e7cb2.png";
import imgRectangle9 from "figma:asset/d383ec89883631e1636a4ef1cd1a8169b8a61c71.png";
import imgEllipse1 from "figma:asset/112e38e0aea13e8ab766d86acd7b4486061b4929.png";
import imgConvertifyLogoFullLight022 from "figma:asset/9d0dcbad493973ebbf13ac24d21c1b3a8826b4b8.png";

function IsolationMode() {
  return (
    <div className="absolute h-[981px] left-[-92px] top-[-56px] w-[1644px]" data-name="Isolation_Mode">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1644 981">
        <g clipPath="url(#clip0_227_1605)" id="Isolation_Mode" opacity="0.2">
          <path d={svgPaths.p2c7a3080} fill="var(--fill-0, #FCF9FE)" id="Vector" opacity="0.36" />
          <path d={svgPaths.p1be41880} fill="var(--fill-0, #FCF9FE)" id="Vector_2" opacity="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_227_1605">
            <rect fill="white" height="981" width="1644" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[25px] items-start relative shrink-0 text-white w-full">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[64px] w-full">CRM đồng bộ Lead đa kênh cho nhà quảng cáo</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-full">Đồng bộ lead từ Facebook, Zalo, TikTok, Landing Page. Tối ưu quảng cáo và giảm data kém chất lượng.</p>
    </div>
  );
}

function ButtonCta() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start relative shrink-0 w-full">
      <ButtonCta />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-white w-[min-content]">Miễn phí mọi tính năng, dễ dùng trong 5 phút</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[54px] grow items-start min-h-px min-w-px relative shrink-0">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[50px] py-0 relative w-full">
          <div className="aspect-[515/638] basis-0 grow min-h-px min-w-px relative shrink-0" data-name="hero-1-img 1">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgHero1Img1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute h-[8px] left-[710px] top-[792px] w-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 8">
        <g id="Group 1">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" id="Ellipse 1" r="4" />
          <circle cx="16" cy="4" fill="var(--fill-0, white)" id="Ellipse 2" opacity="0.25" r="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#7c3aed] content-stretch flex gap-[30px] h-[810px] items-center left-1/2 overflow-clip pb-[20px] pt-[80px] px-[45px] top-0 translate-x-[-50%] w-[1440px]">
      <IsolationMode />
      <Frame3 />
      <Frame />
      <Group />
    </div>
  );
}

function ButtonContact() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Trang chủ</p>
    </div>
  );
}

function ButtonContact1() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Vấn đề</p>
    </div>
  );
}

function ButtonContact2() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Giải pháp</p>
    </div>
  );
}

function ButtonContact3() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Ưu điểm</p>
    </div>
  );
}

function ButtonContact4() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Bảng giá</p>
    </div>
  );
}

function ButtonContact5() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Câu hỏi</p>
    </div>
  );
}

function ButtonContact6() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Đăng ký</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <ButtonContact />
      <ButtonContact1 />
      <ButtonContact2 />
      <ButtonContact3 />
      <ButtonContact4 />
      <ButtonContact5 />
      <ButtonContact6 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-[#7c3aed] content-stretch flex h-[80px] items-center justify-between left-1/2 px-[45px] py-0 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] top-0 translate-x-[-50%] w-[1440px]" data-name="Header">
      <div className="h-[50px] relative rounded-[5px] shrink-0 w-[231px]" data-name="Convertify_logo-full-light-02 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
          <img alt="" className="absolute h-[598.16%] left-[-16.32%] max-w-none top-[-243.07%] w-[129.47%]" src={imgConvertifyLogoFullLight021} />
        </div>
      </div>
      <Frame54 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[245px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">Vấn đề của nhà quảng cáo Lead</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">4 vấn đề phổ biến mà các nhà quảng cáo lead hay gặp phải</p>
        </div>
      </div>
    </div>
  );
}

function CloudOff() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="cloud-off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_227_1609)" id="cloud-off">
          <path d={svgPaths.p738f00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.peebde00} id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_227_1609">
            <rect fill="white" height="40" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group28() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CloudOff />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Group28 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">Quản lý thủ công</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Dữ liệu rời rạc trên Google Sheet, dễ bỏ sót và rò rỉ lead.</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-start overflow-clip p-[20px] relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[314px]">
      <Frame5 />
      <div className="aspect-[293/219.75] relative rounded-[5px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle1} />
          <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
        </div>
      </div>
    </div>
  );
}

function UserX() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="user-x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="user-x">
          <path d={svgPaths.p3f4c9340} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p22941580} id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M30 13.3333L38.3333 21.6667" id="Vector_3" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M38.3333 13.3333L30 21.6667" id="Vector_4" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <UserX />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Group2 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">{`Mù mờ "Khách thật”`}</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Không biết kênh nào dẫn về khách chất lượng để tối ưu ngân sách.</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-start overflow-clip p-[20px] relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[314px]">
      <Frame82 />
      <div className="aspect-[293/219.75] relative rounded-[5px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle2} />
          <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
        </div>
      </div>
    </div>
  );
}

function DollarSign() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="dollar-sign">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="dollar-sign">
          <path d="M20 1.66667V38.3333" id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p3bec0d00} id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <DollarSign />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Group3 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">Lãng phí ngân sách</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Data rác, số sai, form ảo làm đội chi phí quảng cáo.</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-start overflow-clip p-[20px] relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[314px]">
      <Frame83 />
      <div className="aspect-[293/219.75] relative rounded-[5px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle3} />
          <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
        </div>
      </div>
    </div>
  );
}

function PhoneOff() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="phone-off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_227_1652)" id="phone-off">
          <path d={svgPaths.p2ebcf80} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p959d930} id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="clip0_227_1652">
            <rect fill="white" height="40" width="40" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <PhoneOff />
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Group1 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">Sales phản hồi chậm</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Lead không được phân bổ tự động, gọi trùng khách, rớt đơn.</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[40px] items-start overflow-clip p-[20px] relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[314px]">
      <Frame84 />
      <div className="aspect-[293/219.75] relative rounded-[5px] shrink-0 w-full">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle4} />
          <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[30px] items-center justify-center px-[45px] py-0 relative w-full">
          <Frame6 />
          <Frame7 />
          <Frame8 />
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-1/2 px-0 py-[60px] top-[811px] translate-x-[-50%] w-[1440px]">
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame85() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[245px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">Giải pháp Convertify CRM</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">Convertify CRM với 4 giải pháp tối ưu giúp giải quyết tất cả vấn đề của nhà quảng cáo Lead trong cùng 1 nền tảng duy nhất</p>
        </div>
      </div>
    </div>
  );
}

function IconLeadhub() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="icon-leadhub-1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="icon-leadhub-1">
          <path d={svgPaths.p9d4580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p17aff600} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <IconLeadhub />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0 size-[60px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 60 60\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-8 -2.3224 4.2316 -14.577 80 60)\\\'><stop stop-color=\\\'rgba(252,249,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(220,201,250,1)\\\' offset=\\\'0.17488\\\'/><stop stop-color=\\\'rgba(188,154,246,1)\\\' offset=\\\'0.34976\\\'/><stop stop-color=\\\'rgba(156,106,241,1)\\\' offset=\\\'0.52463\\\'/><stop stop-color=\\\'rgba(124,58,237,1)\\\' offset=\\\'0.69951\\\'/></radialGradient></defs></svg>')" }}>
      <Group7 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[279px]">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#7c3aed] text-[18px] text-nowrap uppercase">TÍNH NĂNG LEADHUB</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">Đồng bộ Lead đa kênh</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function ButtonCta1() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[545px]">
      <Frame16 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]">Kết nối Facebook Lead Ads, Zalo, TikTok, Landing Page chỉ với vài click. Mọi lead đồ về một nơi, thông báo ngay lập tức.</p>
      <ButtonCta1 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#fcf9fe] relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[4]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[30px] items-center p-[45px] relative w-full">
          <div className="h-[440px] pointer-events-none relative rounded-[10px] shrink-0 w-[660px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full" src={imgRectangle5} />
            <div aria-hidden="true" className="absolute border border-[#7c3aed] border-solid inset-0 rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" />
          </div>
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function IconAdtracking() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="icon-adtracking-1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="icon-adtracking-1">
          <path d={svgPaths.pdd16700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M30 28.3333V15" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M21.6667 28.3333V8.33333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d="M13.3333 28.3333V23.3333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <IconAdtracking />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0 size-[60px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 60 60\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-8 -2.3224 4.2316 -14.577 80 60)\\\'><stop stop-color=\\\'rgba(252,249,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(220,201,250,1)\\\' offset=\\\'0.17488\\\'/><stop stop-color=\\\'rgba(188,154,246,1)\\\' offset=\\\'0.34976\\\'/><stop stop-color=\\\'rgba(156,106,241,1)\\\' offset=\\\'0.52463\\\'/><stop stop-color=\\\'rgba(124,58,237,1)\\\' offset=\\\'0.69951\\\'/></radialGradient></defs></svg>')" }}>
      <Group4 />
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[279px]">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#7c3aed] text-[18px] text-nowrap uppercase">TÍNH NĂNG Ads Tracking</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">Đo lường hiệu quả</p>
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
      <Frame86 />
      <Frame87 />
    </div>
  );
}

function ButtonCta2() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[545px]">
      <Frame88 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]">Biết chính xác lead chất lượng đến từ chiến dịch nào. Thấy ngay chi phí/lead và doanh thu để ra quyết định tăng/giảm ngân sách.</p>
      <ButtonCta2 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-white relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[3]">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[30px] items-center justify-end p-[45px] relative w-full">
          <Frame89 />
          <div className="h-[440px] pointer-events-none relative rounded-[10px] shrink-0 w-[660px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full" src={imgRectangle6} />
            <div aria-hidden="true" className="absolute border border-[#7c3aed] border-solid inset-0 rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconDataset() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="icon-dataset-1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="icon-dataset-1">
          <path d={svgPaths.p20b6e900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p3fb6f400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p3d21d400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <IconDataset />
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0 size-[60px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 60 60\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-8 -2.3224 4.2316 -14.577 80 60)\\\'><stop stop-color=\\\'rgba(252,249,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(220,201,250,1)\\\' offset=\\\'0.17488\\\'/><stop stop-color=\\\'rgba(188,154,246,1)\\\' offset=\\\'0.34976\\\'/><stop stop-color=\\\'rgba(156,106,241,1)\\\' offset=\\\'0.52463\\\'/><stop stop-color=\\\'rgba(124,58,237,1)\\\' offset=\\\'0.69951\\\'/></radialGradient></defs></svg>')" }}>
      <Group5 />
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[279px]">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#7c3aed] text-[18px] text-nowrap uppercase">TÍNH NĂNG DataSet</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">{`Tối ưu & loại bỏ rác`}</p>
    </div>
  );
}

function Frame92() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
      <Frame90 />
      <Frame91 />
    </div>
  );
}

function ButtonCta3() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[545px]">
      <Frame92 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]">Gửi tín hiệu chất lượng Lead ngược về Facebook/TikTok để thuật toán hiểu và phân phối quảng cáo đúng đối tượng hơn.</p>
      <ButtonCta3 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#fcf9fe] relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[2]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[30px] items-center p-[45px] relative w-full">
          <div className="h-[440px] pointer-events-none relative rounded-[10px] shrink-0 w-[660px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full" src={imgRectangle7} />
            <div aria-hidden="true" className="absolute border border-[#7c3aed] border-solid inset-0 rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" />
          </div>
          <Frame93 />
        </div>
      </div>
    </div>
  );
}

function IconCustomer() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="icon-customer-1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="icon-customer-1">
          <path d={svgPaths.p1a96b600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p1fe95580} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p2a06b680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.p1517b200} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <IconCustomer />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0 size-[60px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 60 60\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-8 -2.3224 4.2316 -14.577 80 60)\\\'><stop stop-color=\\\'rgba(252,249,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(220,201,250,1)\\\' offset=\\\'0.17488\\\'/><stop stop-color=\\\'rgba(188,154,246,1)\\\' offset=\\\'0.34976\\\'/><stop stop-color=\\\'rgba(156,106,241,1)\\\' offset=\\\'0.52463\\\'/><stop stop-color=\\\'rgba(124,58,237,1)\\\' offset=\\\'0.69951\\\'/></radialGradient></defs></svg>')" }}>
      <Group6 />
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[279px]">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#7c3aed] text-[18px] text-nowrap uppercase">TÍNH NĂNG Customer Management</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[26px] w-[min-content]">Quản lý dễ dàng</p>
    </div>
  );
}

function Frame96() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
      <Frame94 />
      <Frame95 />
    </div>
  );
}

function ButtonCta4() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame97() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[545px]">
      <Frame96 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-black w-[min-content]">Gắn tag phân nhóm, tự động nhắc việc, check trùng lead. Giúp sale phản hồi nhanh hơn và tăng hiệu suất.</p>
      <ButtonCta4 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-white relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[30px] items-center justify-end p-[45px] relative w-full">
          <Frame97 />
          <div className="h-[440px] pointer-events-none relative rounded-[10px] shrink-0 w-[660px]">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full" src={imgRectangle8} />
            <div aria-hidden="true" className="absolute border border-[#7c3aed] border-solid inset-0 rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col isolate items-center relative shrink-0 w-full">
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-1/2 px-0 py-[60px] top-[1510px] translate-x-[-50%] w-[1440px]">
      <Frame85 />
      <Frame22 />
    </div>
  );
}

function Frame98() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[245px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">Lĩnh vực phù hợp với Convertify CRM</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">Convertify CRM là giải pháp tối ưu cho doanh nghiệp chạy quảng cáo Lead Form và chốt đơn hiệu quả. Nền tảng đặc biệt phù hợp với các ngành sau:</p>
        </div>
      </div>
    </div>
  );
}

function Layer() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[60px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g clipPath="url(#clip0_227_1555)" id="Layer_1">
          <g id="Group">
            <path clipRule="evenodd" d={svgPaths.p3cbc1780} fill="var(--fill-0, #909CD1)" fillRule="evenodd" id="Vector" />
            <path clipRule="evenodd" d={svgPaths.p1161d900} fill="var(--fill-0, #7986BF)" fillRule="evenodd" id="Vector_2" />
            <path clipRule="evenodd" d={svgPaths.pbbfe300} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_3" />
            <path clipRule="evenodd" d={svgPaths.p362ab80} fill="var(--fill-0, #D1D1F0)" fillRule="evenodd" id="Vector_4" />
            <path clipRule="evenodd" d={svgPaths.p234cac80} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_5" />
            <path clipRule="evenodd" d={svgPaths.p1eba1180} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_6" />
            <path clipRule="evenodd" d={svgPaths.p210c7f00} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_7" />
            <path clipRule="evenodd" d={svgPaths.p136e8800} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_8" />
            <path clipRule="evenodd" d={svgPaths.p5c7ebc0} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_9" />
            <path clipRule="evenodd" d={svgPaths.p3a39d380} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_10" />
            <path clipRule="evenodd" d={svgPaths.pe4d6580} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_11" />
            <path clipRule="evenodd" d={svgPaths.p281df40} fill="var(--fill-0, #7986BF)" fillRule="evenodd" id="Vector_12" />
            <path clipRule="evenodd" d={svgPaths.p24b7ec00} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_13" />
            <path clipRule="evenodd" d={svgPaths.p30d0000} fill="var(--fill-0, #7986BF)" fillRule="evenodd" id="Vector_14" />
          </g>
          <path d={svgPaths.p293e5780} fill="var(--fill-0, #E6B17C)" id="Vector_15" />
          <path d={svgPaths.p605280} fill="var(--fill-0, #D19458)" id="Vector_16" />
          <path clipRule="evenodd" d={svgPaths.p77a7ef0} fill="var(--fill-0, #3D4A75)" fillRule="evenodd" id="Vector_17" />
        </g>
        <defs>
          <clipPath id="clip0_227_1555">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer />
    </div>
  );
}

function Frame24() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Bất động sản</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group9 />
      <Frame24 />
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute inset-[10.57%_15.51%_6.82%_15.51%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.3885 49.5675">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p3bc39100} fill="var(--fill-0, #FF5BA7)" id="Vector" />
            <g id="Group_3">
              <path d={svgPaths.p3328800} fill="var(--fill-0, #FD2C8E)" id="Vector_2" />
              <g id="Group_4">
                <path d={svgPaths.p1c5ad900} fill="var(--fill-0, #FD2C8E)" id="Vector_3" />
                <path d={svgPaths.p28f9ab00} fill="var(--fill-0, #FD2C8E)" id="Vector_4" />
              </g>
              <path d={svgPaths.p323bd840} fill="var(--fill-0, #FD2C8E)" id="Vector_5" />
            </g>
            <g id="Group_5">
              <path d={svgPaths.p3efbf80} fill="var(--fill-0, #FD2C8E)" id="Vector_6" />
              <path d={svgPaths.p14567300} fill="var(--fill-0, #FF5BA7)" id="Vector_7" />
              <path d={svgPaths.pc99f700} fill="var(--fill-0, #FFC3DE)" id="Vector_8" />
              <path d={svgPaths.p1a51de00} fill="var(--fill-0, #FFC3DE)" id="Vector_9" />
              <g id="Group_6">
                <path d={svgPaths.p5bf8c80} fill="var(--fill-0, #FFA7CE)" id="Vector_10" />
                <path d={svgPaths.p2f2d0f00} fill="var(--fill-0, #FFA7CE)" id="Vector_11" />
              </g>
              <g id="Group_7">
                <path d={svgPaths.p1b7e8d00} fill="var(--fill-0, #FFC3DE)" id="Vector_12" />
                <path d={svgPaths.p8cc1780} fill="var(--fill-0, #FFA7CE)" id="Vector_13" />
                <path d={svgPaths.p2c70a550} fill="var(--fill-0, #FFC3DE)" id="Vector_14" />
                <g id="Group_8">
                  <path d={svgPaths.p1a54f300} fill="var(--fill-0, #FFA7CE)" id="Vector_15" />
                  <path d={svgPaths.p3486b00} fill="var(--fill-0, #FFA7CE)" id="Vector_16" />
                </g>
                <g id="Group_9">
                  <path d={svgPaths.p1b0dac80} fill="var(--fill-0, #FFDAEC)" id="Vector_17" />
                  <path d={svgPaths.p32a9b880} fill="var(--fill-0, #B6C4FF)" id="Vector_18" />
                  <path d={svgPaths.p2ee5f600} fill="var(--fill-0, #6582FD)" id="Vector_19" />
                </g>
              </g>
              <path d={svgPaths.p106d1d00} fill="var(--fill-0, #FF7EB7)" id="Vector_20" />
              <g id="Group_10">
                <path d={svgPaths.p14f98e00} fill="var(--fill-0, #FFA7CE)" id="Vector_21" />
                <path d={svgPaths.p2f6cdd80} fill="var(--fill-0, #FFA7CE)" id="Vector_22" />
                <path d={svgPaths.p26265a80} fill="var(--fill-0, #FFA7CE)" id="Vector_23" />
                <path d={svgPaths.p1df64b00} fill="var(--fill-0, #FFA7CE)" id="Vector_24" />
              </g>
            </g>
          </g>
          <g id="Group_11">
            <path d={svgPaths.p25750700} fill="var(--fill-0, #6582FD)" id="Vector_25" />
            <path d={svgPaths.pa79f000} fill="var(--fill-0, #6582FD)" id="Vector_26" />
          </g>
          <path d={svgPaths.p29342340} id="Vector_27" stroke="var(--stroke-0, #FFA7CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45299" />
        </g>
      </svg>
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute inset-[44.56%_2.92%_22.24%_64.79%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3729 19.9218">
        <g id="Group">
          <path d={svgPaths.p10bd1e00} fill="var(--fill-0, #D1DDFF)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p2ca71800} fill="var(--fill-0, #8298FD)" id="Vector_2" />
            <path d={svgPaths.p31de8300} fill="var(--fill-0, #FF7EB7)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute inset-[1.61%_54.1%_0.77%_3.22%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.6093 58.5676">
        <g id="Group">
          <path d={svgPaths.p2c63b500} fill="var(--fill-0, #01EBA4)" id="Vector" />
          <path d={svgPaths.pb019c00} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p1de8db80} fill="var(--fill-0, #01EBA4)" id="Vector_3" />
          <path d={svgPaths.p2db5d600} fill="var(--fill-0, #01EBA4)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[1.61%_2.92%_0.77%_3.22%]" data-name="Group">
      <Group29 />
      <Group32 />
      <Group33 />
    </div>
  );
}

function Capa() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[60px]" data-name="Capa_1">
      <Group34 />
      <div className="absolute inset-[29.42%_89.23%_63.31%_3.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.35897 4.35897">
          <path d={svgPaths.p2a26fbf2} fill="var(--fill-0, #01EBA4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[41.08%_86.77%_51.65%_5.97%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.35897 4.35897">
          <path d={svgPaths.p2a26fbf2} fill="var(--fill-0, #FF5BA7)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[26.63%_5.86%_66.1%_86.88%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.35897 4.35897">
          <path d={svgPaths.p1033cb00} fill="var(--fill-0, #6582FD)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Capa />
    </div>
  );
}

function Frame99() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Thẩm mỹ</p>
    </div>
  );
}

function Frame100() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group10 />
      <Frame99 />
    </div>
  );
}

function Capa1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[60px]" data-name="Capa_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g id="Capa_1">
          <path d={svgPaths.p2c9e2000} fill="var(--fill-0, #232E7A)" id="Vector" />
          <path d={svgPaths.p1d289140} fill="var(--fill-0, #ECECF1)" id="Vector_2" />
          <path d={svgPaths.p13802080} fill="var(--fill-0, #D3D3D8)" id="Vector_3" />
          <path d={svgPaths.p343b0380} fill="var(--fill-0, #FFF5F5)" id="Vector_4" />
          <path d={svgPaths.p2f3b7600} fill="var(--fill-0, #2B3894)" id="Vector_5" />
          <path d={svgPaths.p22ea8ea0} fill="var(--fill-0, #3D4EC6)" id="Vector_6" />
          <path d={svgPaths.p13f60e00} fill="var(--fill-0, #5766CE)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Capa1 />
    </div>
  );
}

function Frame101() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Nha khoa</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group12 />
      <Frame101 />
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute inset-[4.85%_59.89%_46.28%_4.18%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5606 29.3168">
        <g id="Group">
          <path d={svgPaths.p3da9f800} fill="var(--fill-0, #FEBC1F)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p35ab9a00} fill="var(--fill-0, #FEBC1F)" id="Vector_2" />
            <path d={svgPaths.p7154c80} fill="var(--fill-0, #FFD06C)" id="Vector_3" />
          </g>
          <path d={svgPaths.p39c40a00} fill="var(--fill-0, #DF3260)" id="Vector_4" />
          <g id="Group_3">
            <path d={svgPaths.p3617dcc0} fill="var(--fill-0, #DF3260)" id="Vector_5" />
            <path d={svgPaths.p864e200} fill="var(--fill-0, #F45170)" id="Vector_6" />
          </g>
          <path d={svgPaths.p2623e880} fill="var(--fill-0, #9BD899)" id="Vector_7" />
          <path d={svgPaths.p30efbe00} fill="var(--fill-0, #72D561)" id="Vector_8" />
          <g id="Group_4">
            <path d={svgPaths.pfd5ccf0} fill="var(--fill-0, #72D561)" id="Vector_9" />
            <path d={svgPaths.p12015d00} fill="var(--fill-0, #78E75A)" id="Vector_10" />
          </g>
          <g id="Group_5">
            <path d={svgPaths.p2f429700} fill="var(--fill-0, #638DFF)" id="Vector_11" />
          </g>
          <path d={svgPaths.p3a4fd600} fill="var(--fill-0, #DEDFFB)" id="Vector_12" />
          <g id="Group_6">
            <path d={svgPaths.p32051900} fill="var(--fill-0, #DEDFFB)" id="Vector_13" />
            <path d={svgPaths.pe43bd80} fill="var(--fill-0, #F3F1FC)" id="Vector_14" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute inset-[34.98%_8.05%_5.66%_7.64%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.5859 35.611">
        <g id="Group">
          <path d={svgPaths.p2a770300} fill="var(--fill-0, #DEDFFB)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p9e33a00} fill="var(--fill-0, #E9E7FC)" id="Vector_2" />
            <g id="Group_3">
              <path d={svgPaths.p36bc6400} fill="var(--fill-0, #DEDFFB)" id="Vector_3" />
              <path d={svgPaths.pd6c9c80} fill="var(--fill-0, #1D2943)" id="Vector_4" />
              <path d={svgPaths.p3dd1ef00} fill="var(--fill-0, #57B3FE)" id="Vector_5" />
              <path d={svgPaths.p1914a00} fill="var(--fill-0, white)" id="Vector_6" />
            </g>
            <path d={svgPaths.p28072400} fill="var(--fill-0, #F3F1FC)" id="Vector_7" />
            <path d={svgPaths.pb10df0} fill="var(--fill-0, #DEDFFB)" id="Vector_8" />
            <g id="Group_4">
              <path d={svgPaths.p62d4f00} fill="var(--fill-0, #9EA9C9)" id="Vector_9" />
              <path d={svgPaths.pbd376c0} fill="var(--fill-0, #9EA9C9)" id="Vector_10" />
              <path d={svgPaths.p20abac00} fill="var(--fill-0, #F45170)" id="Vector_11" />
              <path d={svgPaths.pb92de00} fill="var(--fill-0, #9EA9C9)" id="Vector_12" />
              <path d={svgPaths.p1bdbe480} fill="var(--fill-0, #9EA9C9)" id="Vector_13" />
              <path d={svgPaths.p18596b80} fill="var(--fill-0, #9EA9C9)" id="Vector_14" />
              <path d={svgPaths.p3945ce00} fill="var(--fill-0, #9EA9C9)" id="Vector_15" />
              <path d={svgPaths.p3fffa400} fill="var(--fill-0, #9EA9C9)" id="Vector_16" />
              <path d={svgPaths.p22ae1100} fill="var(--fill-0, #9EA9C9)" id="Vector_17" />
              <path d={svgPaths.pfee2f00} fill="var(--fill-0, #9EA9C9)" id="Vector_18" />
              <path d={svgPaths.p3283fa00} fill="var(--fill-0, #9EA9C9)" id="Vector_19" />
              <path d={svgPaths.p335c8400} fill="var(--fill-0, #9EA9C9)" id="Vector_20" />
              <path d={svgPaths.p26fcba00} fill="var(--fill-0, #9EA9C9)" id="Vector_21" />
              <path d={svgPaths.p39924a00} fill="var(--fill-0, #9EA9C9)" id="Vector_22" />
              <path d={svgPaths.p1d1ec200} fill="var(--fill-0, #9EA9C9)" id="Vector_23" />
              <path d={svgPaths.p2cf9e300} fill="var(--fill-0, #9EA9C9)" id="Vector_24" />
              <path d={svgPaths.p769dc00} fill="var(--fill-0, #9EA9C9)" id="Vector_25" />
              <path d={svgPaths.p3ffd13c0} fill="var(--fill-0, #9EA9C9)" id="Vector_26" />
              <path d={svgPaths.p2f418980} fill="var(--fill-0, #9EA9C9)" id="Vector_27" />
              <path d={svgPaths.p2e5392f0} fill="var(--fill-0, #B28AFD)" id="Vector_28" />
              <path d={svgPaths.p372ec80} fill="var(--fill-0, #9EA9C9)" id="Vector_29" />
              <path d={svgPaths.p55c6500} fill="var(--fill-0, #9EA9C9)" id="Vector_30" />
              <path d={svgPaths.p6eda300} fill="var(--fill-0, #72D561)" id="Vector_31" />
              <path d={svgPaths.p13c2fd00} fill="var(--fill-0, #9EA9C9)" id="Vector_32" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3308 16.2476">
        <g id="Group">
          <path d={svgPaths.p23d23300} fill="var(--fill-0, #50B069)" id="Vector" />
          <path d={svgPaths.p3d8d0400} fill="var(--fill-0, #5EC363)" id="Vector_2" />
          <path d={svgPaths.p1ef3ea80} fill="var(--fill-0, #72D561)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute inset-[33.58%_3.29%_44.94%_59.67%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2238 12.8875">
        <g id="Group">
          <path d={svgPaths.p18d69d80} fill="var(--fill-0, #78E75A)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p2042e700} fill="var(--fill-0, #72D561)" id="Vector_2" />
            <path d={svgPaths.pb117e00} fill="var(--fill-0, #78E75A)" id="Vector_3" />
            <path d={svgPaths.p2454f300} fill="var(--fill-0, #78E75A)" id="Vector_4" />
            <path d={svgPaths.p1f66ff80} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p2e1e2d00} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p528bc00} fill="var(--fill-0, #72D561)" id="Vector_7" />
            <path d={svgPaths.p6f82580} fill="var(--fill-0, #78E75A)" id="Vector_8" />
          </g>
          <path d={svgPaths.p11045900} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p2470bf00} fill="var(--fill-0, #78E75A)" id="Vector_10" />
          <path d={svgPaths.p12b0a4c0} fill="var(--fill-0, #78E75A)" id="Vector_11" />
          <path d={svgPaths.p3c76b7f0} fill="var(--fill-0, #78E75A)" id="Vector_12" />
          <path d={svgPaths.p2fb46600} fill="var(--fill-0, #72D561)" id="Vector_13" />
          <path d={svgPaths.p61bc600} fill="var(--fill-0, #78E75A)" id="Vector_14" />
        </g>
      </svg>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <Group37 />
      <Group38 />
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute inset-[39.13%_12.84%_50.49%_69.22%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.766 6.22542">
        <g id="Group">
          <path d={svgPaths.peb6f000} fill="var(--fill-0, #F45170)" id="Vector" />
          <path d={svgPaths.p3477f600} fill="var(--fill-0, #F45170)" id="Vector_2" />
          <path d={svgPaths.p227f0f80} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <Group39 />
      <Group40 />
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute inset-[47.2%_26.82%_46.94%_69.2%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.38633 3.51821">
        <g id="Group">
          <path d={svgPaths.pf7e2400} fill="var(--fill-0, #DF3260)" id="Vector" />
          <g id="Vector_2"></g>
          <path d={svgPaths.p2ff8eb00} fill="var(--fill-0, #E9E7FC)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute contents inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <Group41 />
      <div className="absolute inset-[42.23%_19.36%_44.88%_58.45%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3144 7.73853">
          <path d={svgPaths.pabb5180} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[48.92%_16.75%_42.06%_67.74%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.31092 5.41141">
          <path d={svgPaths.p9de7d00} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[50.19%_2.47%_43.85%_87.27%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.15648 3.57777">
          <path d={svgPaths.p21f52a00} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[52.67%_4.62%_41.36%_85.12%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.15648 3.57777">
          <path d={svgPaths.pc17e980} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <Group42 />
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3308 16.2476">
        <g id="Group">
          <path d={svgPaths.p3dfd4200} fill="var(--fill-0, #50B069)" id="Vector" />
          <path d={svgPaths.p23515900} fill="var(--fill-0, #5EC363)" id="Vector_2" />
          <path d={svgPaths.p4419080} fill="var(--fill-0, #72D561)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute inset-[27.91%_3.29%_50.61%_59.67%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.2238 12.8875">
        <g id="Group">
          <path d={svgPaths.pfdc3a00} fill="var(--fill-0, #78E75A)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p3584d4c0} fill="var(--fill-0, #72D561)" id="Vector_2" />
            <path d={svgPaths.p334db00} fill="var(--fill-0, #78E75A)" id="Vector_3" />
            <path d={svgPaths.p1ffa5400} fill="var(--fill-0, #78E75A)" id="Vector_4" />
            <path d={svgPaths.p3c35ab00} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p3a94500} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p31097f00} fill="var(--fill-0, #72D561)" id="Vector_7" />
            <path d={svgPaths.p136f3bd0} fill="var(--fill-0, #78E75A)" id="Vector_8" />
          </g>
          <path d={svgPaths.p1e12b80} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p366925d0} fill="var(--fill-0, #78E75A)" id="Vector_10" />
          <path d={svgPaths.p20e43900} fill="var(--fill-0, #78E75A)" id="Vector_11" />
          <path d={svgPaths.p14e6f80} fill="var(--fill-0, #78E75A)" id="Vector_12" />
          <path d={svgPaths.p21ed2880} fill="var(--fill-0, #72D561)" id="Vector_13" />
          <path d={svgPaths.p2d0c1500} fill="var(--fill-0, #78E75A)" id="Vector_14" />
        </g>
      </svg>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <Group44 />
      <Group45 />
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute inset-[33.46%_12.84%_56.16%_69.22%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.766 6.22422">
        <g id="Group">
          <path d={svgPaths.peb6f000} fill="var(--fill-0, #F45170)" id="Vector" />
          <path d={svgPaths.p3825a780} fill="var(--fill-0, #F45170)" id="Vector_2" />
          <path d={svgPaths.pfa02200} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <Group46 />
      <Group47 />
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute inset-[41.53%_26.82%_52.6%_69.2%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.38637 3.51863">
        <g id="Group">
          <path d={svgPaths.p1913b700} fill="var(--fill-0, #DF3260)" id="Vector" />
          <g id="Vector_2"></g>
          <path d={svgPaths.pcfed080} fill="var(--fill-0, #E9E7FC)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <Group48 />
      <div className="absolute inset-[36.56%_19.36%_50.54%_58.45%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3144 7.73853">
          <path d={svgPaths.pabb5180} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[43.25%_16.75%_47.73%_67.74%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.31092 5.41141">
          <path d={svgPaths.p18fa7c00} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[44.52%_2.47%_49.52%_87.27%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.15648 3.57777">
          <path d={svgPaths.p376f3200} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[47%_4.62%_47.03%_85.12%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.15648 3.57777">
          <path d={svgPaths.p3c63d600} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <Group49 />
    </div>
  );
}

function Group51() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_40.36%_57.92%]" data-name="Group">
      <Group43 />
      <Group50 />
    </div>
  );
}

function Group52() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_5.67%_7.64%]" data-name="Group">
      <Group36 />
      <div className="absolute inset-[26.9%_1.53%_40.36%_57.93%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3223 19.6475">
          <path d={svgPaths.p2fe60200} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <Group51 />
    </div>
  );
}

function Group53() {
  return (
    <div className="absolute inset-[3.77%_50.16%_44.38%_1.33%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.1048 31.1103">
        <g id="Group">
          <path d={svgPaths.p2ffa0980} fill="var(--fill-0, #6BB4F9)" id="Vector" />
          <g id="Group_2">
            <g id="Group_3">
              <path d={svgPaths.p2dac7ef0} fill="var(--fill-0, #6F93F1)" id="Vector_2" />
              <path d={svgPaths.p2e04b900} fill="var(--fill-0, #6BB4F9)" id="Vector_3" />
              <path d={svgPaths.p5230c80} fill="var(--fill-0, #6F93F1)" id="Vector_4" />
              <path d={svgPaths.p28ee4200} fill="var(--fill-0, #6BB4F9)" id="Vector_5" />
              <path d={svgPaths.p225ff072} fill="var(--fill-0, #6F93F1)" id="Vector_6" />
              <path d={svgPaths.p8e43580} fill="var(--fill-0, #6F93F1)" id="Vector_7" />
              <path d={svgPaths.p34e82100} fill="var(--fill-0, #656FEA)" id="Vector_8" />
              <path d={svgPaths.p25ab0c00} fill="var(--fill-0, #6BB4F9)" id="Vector_9" />
            </g>
            <path d={svgPaths.p145b9b40} fill="var(--fill-0, #6BB4F9)" id="Vector_10" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group54() {
  return (
    <div className="absolute contents inset-[3.77%_1.53%_5.66%_1.33%]" data-name="Group">
      <Group35 />
      <Group52 />
      <div className="absolute inset-[3.77%_50.16%_44.38%_1.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.106 31.1102">
          <path d={svgPaths.p104bbb00} fill="var(--fill-0, #656FEA)" id="Vector" />
        </svg>
      </div>
      <Group53 />
    </div>
  );
}

function Group55() {
  return (
    <div className="absolute inset-[76.3%_69.54%_4.84%_3.65%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0855 11.3162">
        <g id="Group">
          <path d={svgPaths.p1b57a300} fill="var(--fill-0, #FFD06C)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p67fe180} fill="var(--fill-0, #F9A83D)" id="Vector_2" />
            <path d={svgPaths.p1569b500} fill="var(--fill-0, #FFD06C)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group56() {
  return (
    <div className="absolute inset-[76.3%_76.84%_8.18%_10.97%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.31278 9.31248">
        <g id="Group" opacity="0.25">
          <path d={svgPaths.pfc01a00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p266df00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group57() {
  return (
    <div className="absolute contents inset-[3.77%_1.53%_4.84%_1.33%]" data-name="Group">
      <Group54 />
      <Group55 />
      <div className="absolute inset-[80.24%_76.31%_12.12%_10.43%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.9547 4.57928">
          <path d={svgPaths.p38bbf0} fill="var(--fill-0, #F9A83D)" id="Vector" />
        </svg>
      </div>
      <Group56 />
    </div>
  );
}

function Group58() {
  return (
    <div className="absolute inset-[3.77%_50.16%_83.4%_49.24%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.360439 7.69378">
        <g id="Group">
          <path d={svgPaths.p14ef5900} fill="var(--fill-0, #656FEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function X() {
  return (
    <div className="absolute contents inset-[3.77%_1.53%_4.84%_1.33%]" data-name="_x32_">
      <Group57 />
      <div className="absolute inset-[9.6%_50.45%_83.4%_37.43%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.27408 4.20068">
          <path d="M7.27408 4.20068L0 0Z" fill="var(--fill-0, #6F93F1)" id="Vector" />
        </svg>
      </div>
      <Group58 />
      <div className="absolute inset-[3.77%_50.47%_83.72%_37.12%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.44825 7.50389">
          <path d={svgPaths.p3386f700} fill="var(--fill-0, #6BB4F9)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Layer2() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[60px]" data-name="Layer_1">
      <X />
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer2 />
    </div>
  );
}

function Frame102() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Tài chính</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group11 />
      <Frame102 />
    </div>
  );
}

function Layer3() {
  return (
    <div className="[grid-area:1_/_1] h-[60px] ml-0 mt-0 relative w-[59.996px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59.9965 60">
        <g clipPath="url(#clip0_227_1272)" id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p32215700} fill="var(--fill-0, #C4D3E4)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1799b900} fill="var(--fill-0, #A1B7D1)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p36fb3f0} fill="var(--fill-0, #EAF6FF)" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p19310000} fill="var(--fill-0, #C4D3E4)" fillRule="evenodd" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p20b3c580} fill="var(--fill-0, #60B7FF)" fillRule="evenodd" id="Vector_5" />
          <path clipRule="evenodd" d={svgPaths.p481fdb0} fill="var(--fill-0, #D8ECFE)" fillRule="evenodd" id="Vector_6" />
          <path clipRule="evenodd" d={svgPaths.p3ffad980} fill="var(--fill-0, #60B7FF)" fillRule="evenodd" id="Vector_7" />
          <g id="Group">
            <path d={svgPaths.p7ce1100} fill="var(--fill-0, #C4D3E4)" id="Vector_8" />
            <path d={svgPaths.p16071180} fill="var(--fill-0, #C4D3E4)" id="Vector_9" />
            <path d={svgPaths.p14dae3f0} fill="var(--fill-0, #C4D3E4)" id="Vector_10" />
            <path d={svgPaths.p1d94c280} fill="var(--fill-0, #C4D3E4)" id="Vector_11" />
            <path d={svgPaths.p3c5fe500} fill="var(--fill-0, #C4D3E4)" id="Vector_12" />
            <path d={svgPaths.pd927f00} fill="var(--fill-0, #C4D3E4)" id="Vector_13" />
            <path d={svgPaths.p33085100} fill="var(--fill-0, #C4D3E4)" id="Vector_14" />
            <path d={svgPaths.p3dae63f0} fill="var(--fill-0, #C4D3E4)" id="Vector_15" />
            <path d={svgPaths.p3d5370f0} fill="var(--fill-0, #C4D3E4)" id="Vector_16" />
            <path d={svgPaths.p2f1b9b60} fill="var(--fill-0, #C4D3E4)" id="Vector_17" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.p2ef52c80} fill="var(--fill-0, #6BA7FF)" id="Vector_18" />
            <path d={svgPaths.p3000f000} fill="var(--fill-0, #6BA7FF)" id="Vector_19" />
            <path d={svgPaths.p3d6d3840} fill="var(--fill-0, #6BA7FF)" id="Vector_20" />
            <path d={svgPaths.p369800b0} fill="var(--fill-0, #6BA7FF)" id="Vector_21" />
            <path d={svgPaths.p1e949680} fill="var(--fill-0, #6BA7FF)" id="Vector_22" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p3f9d2500} fill="var(--fill-0, #A1B7D1)" id="Vector_23" />
            <path d={svgPaths.p1b35e580} fill="var(--fill-0, #A1B7D1)" id="Vector_24" />
            <path d={svgPaths.p1b99c100} fill="var(--fill-0, #A1B7D1)" id="Vector_25" />
            <path d={svgPaths.p2f97b4c0} fill="var(--fill-0, #A1B7D1)" id="Vector_26" />
            <path d={svgPaths.p38438100} fill="var(--fill-0, #A1B7D1)" id="Vector_27" />
            <path d={svgPaths.p323bdf00} fill="var(--fill-0, #A1B7D1)" id="Vector_28" />
            <path d={svgPaths.p311d1000} fill="var(--fill-0, #A1B7D1)" id="Vector_29" />
            <path d={svgPaths.p157d7dc0} fill="var(--fill-0, #A1B7D1)" id="Vector_30" />
            <path d={svgPaths.p3e2cd00} fill="var(--fill-0, #A1B7D1)" id="Vector_31" />
            <path d={svgPaths.p9fb6540} fill="var(--fill-0, #A1B7D1)" id="Vector_32" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p31d8a580} fill="var(--fill-0, #3B97E3)" fillRule="evenodd" id="Vector_33" />
        </g>
        <defs>
          <clipPath id="clip0_227_1272">
            <rect fill="white" height="60" width="59.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group16() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer3 />
    </div>
  );
}

function Frame103() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Bảo hiểm</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group16 />
      <Frame103 />
    </div>
  );
}

function Capa2() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[60px]" data-name="Capa_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g clipPath="url(#clip0_227_1255)" id="Capa_1">
          <path d={svgPaths.p3b095570} fill="var(--fill-0, #FF7043)" id="Vector" />
          <path d={svgPaths.p2d9c3c00} fill="var(--fill-0, #FF5722)" id="Vector_2" />
          <path d={svgPaths.p295b600} fill="var(--fill-0, #EDDBB9)" id="Vector_3" />
          <path d={svgPaths.p1788a580} fill="var(--fill-0, #E0CFAF)" id="Vector_4" />
          <path d={svgPaths.pda14140} fill="var(--fill-0, #FBF2DF)" id="Vector_5" />
          <path d={svgPaths.p4a01c00} fill="var(--fill-0, #EDDBB9)" id="Vector_6" />
          <path d={svgPaths.p3c996900} fill="var(--fill-0, #F2E5CE)" id="Vector_7" />
          <path d={svgPaths.pb3c3b40} fill="var(--fill-0, #78909C)" id="Vector_8" />
          <path d={svgPaths.p29ff0e20} fill="var(--fill-0, #FF7043)" id="Vector_9" />
          <path d={svgPaths.p331eaf00} fill="var(--fill-0, #80DEEA)" id="Vector_10" />
          <path d={svgPaths.p4076e00} fill="var(--fill-0, #4DD0E1)" id="Vector_11" />
          <path d={svgPaths.p26e8ae00} fill="var(--fill-0, #78909C)" id="Vector_12" />
          <path d={svgPaths.p1bd0f880} fill="var(--fill-0, #607D8B)" id="Vector_13" />
          <path d={svgPaths.p3430af80} fill="var(--fill-0, #78909C)" id="Vector_14" />
          <path d={svgPaths.p1f0fe000} fill="var(--fill-0, #607D8B)" id="Vector_15" />
        </g>
        <defs>
          <clipPath id="clip0_227_1255">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Capa2 />
    </div>
  );
}

function Frame104() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Giáo dục</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group13 />
      <Frame104 />
    </div>
  );
}

function Layer1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[60px]" data-name="Layer_2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g clipPath="url(#clip0_227_1228)" id="Layer_2">
          <path d={svgPaths.p30c25000} fill="var(--fill-0, #529DF3)" id="Vector" />
          <path d={svgPaths.p228c8380} fill="var(--fill-0, #050B54)" id="Vector_2" />
          <path d={svgPaths.p247df900} fill="var(--fill-0, #23308C)" id="Vector_3" />
          <path d={svgPaths.p2b56a980} fill="var(--fill-0, #050B54)" id="Vector_4" />
          <path d={svgPaths.p150cf800} fill="var(--fill-0, #23308C)" id="Vector_5" />
          <path d={svgPaths.p3edb2960} fill="var(--fill-0, #050B54)" id="Vector_6" />
          <path d={svgPaths.p1ff94000} fill="var(--fill-0, #FFFDFE)" id="Vector_7" />
          <path d={svgPaths.p90e6300} fill="var(--fill-0, #529DF3)" id="Vector_8" />
          <path d={svgPaths.p135dfb00} fill="var(--fill-0, #050B54)" id="Vector_9" />
          <path d={svgPaths.p38ea1300} fill="var(--fill-0, #050B54)" id="Vector_10" />
          <path d={svgPaths.p33c6dc00} fill="var(--fill-0, #FFFFFD)" id="Vector_11" />
          <path d={svgPaths.p26643680} fill="var(--fill-0, #050B54)" id="Vector_12" />
          <path d={svgPaths.p1f4e2e80} fill="var(--fill-0, #23308C)" id="Vector_13" />
          <path d={svgPaths.p386c2200} fill="var(--fill-0, #23308C)" id="Vector_14" />
          <path d={svgPaths.pa5f9300} fill="var(--fill-0, #050B54)" id="Vector_15" />
          <g id="Group">
            <path d={svgPaths.p287d9400} fill="var(--fill-0, #529DF3)" id="Vector_16" />
            <path d={svgPaths.p199d4f00} fill="var(--fill-0, #529DF3)" id="Vector_17" />
            <path d={svgPaths.p1c8e2590} fill="var(--fill-0, #529DF3)" id="Vector_18" />
          </g>
          <path d={svgPaths.p17bc3470} fill="var(--fill-0, #23308C)" id="Vector_19" />
          <path d={svgPaths.pbd08280} fill="var(--fill-0, #050B54)" id="Vector_20" />
          <path d={svgPaths.p307e6600} fill="var(--fill-0, #27266A)" id="Vector_21" />
          <path d={svgPaths.p15450200} fill="var(--fill-0, #050B54)" id="Vector_22" />
          <path d={svgPaths.p235df880} fill="var(--fill-0, #030955)" id="Vector_23" />
          <path d={svgPaths.p18a73e00} fill="var(--fill-0, #529DF3)" id="Vector_24" />
        </g>
        <defs>
          <clipPath id="clip0_227_1228">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer1 />
    </div>
  );
}

function Frame105() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Ô tô</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group8 />
      <Frame105 />
    </div>
  );
}

function Layer4() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[60px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g clipPath="url(#clip0_227_1212)" id="Layer_1">
          <path d={svgPaths.p1ba208e0} fill="var(--fill-0, #C5E5F4)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p18d3f100} fill="var(--fill-0, #1A4D7C)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p24859540} fill="var(--fill-0, #0C3159)" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p3ace0a00} fill="var(--fill-0, #ED6529)" fillRule="evenodd" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p3818c100} fill="var(--fill-0, #1F4F7F)" fillRule="evenodd" id="Vector_5" />
          <path clipRule="evenodd" d={svgPaths.p180b8c00} fill="var(--fill-0, #1F4F7F)" fillRule="evenodd" id="Vector_6" />
          <g id="Group">
            <path d={svgPaths.p149be500} fill="var(--fill-0, white)" id="Vector_7" />
            <path d={svgPaths.p9f0fe70} fill="var(--fill-0, white)" id="_1" />
            <path d={svgPaths.p1152a80} fill="var(--fill-0, white)" id="_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_227_1212">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group15() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer4 />
    </div>
  );
}

function Frame106() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Dịch vụ B2B</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group15 />
      <Frame106 />
    </div>
  );
}

function Layer5() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[60px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 60">
        <g clipPath="url(#clip0_227_1190)" id="Layer_1">
          <path d={svgPaths.p3b334100} fill="var(--fill-0, #C4E2F2)" id="Vector" />
          <path d={svgPaths.p2ee9d400} fill="var(--fill-0, #2D303B)" id="Vector_2" />
          <path d={svgPaths.p6548f00} fill="var(--fill-0, #3C3F4D)" id="Vector_3" />
          <path d={svgPaths.p11843e00} fill="var(--fill-0, #3C3F4D)" id="Vector_4" />
          <path d={svgPaths.pf1bb600} fill="var(--fill-0, #2D303B)" id="Vector_5" />
          <path d={svgPaths.p9b9bb80} fill="var(--fill-0, #83B2C6)" id="Vector_6" />
          <path d={svgPaths.p12f41800} fill="var(--fill-0, #1F81A3)" id="Vector_7" />
          <path d={svgPaths.p18832100} fill="var(--fill-0, #2C92BF)" id="Vector_8" />
          <path d={svgPaths.p22d44800} fill="var(--fill-0, #1F81A3)" id="Vector_9" />
          <path d={svgPaths.p32d9aa00} fill="var(--fill-0, #2C92BF)" id="Vector_10" />
          <path d={svgPaths.p3741c280} fill="var(--fill-0, #3C3F4D)" id="Vector_11" />
          <path d={svgPaths.p29be5080} fill="var(--fill-0, #2D303B)" id="Vector_12" />
          <path d={svgPaths.p25793580} fill="var(--fill-0, #FF491F)" id="Vector_13" />
          <path d={svgPaths.p40c2d00} fill="var(--fill-0, #FFE14D)" id="Vector_14" />
          <path d={svgPaths.p308aa800} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p3941c000} fill="var(--fill-0, #3C3F4D)" id="Vector_16" />
          <path d={svgPaths.p3e06cf80} fill="var(--fill-0, #FF491F)" id="Vector_17" />
          <path d={svgPaths.p2d3cc640} fill="var(--fill-0, #3C3F4D)" id="Vector_18" />
          <path d={svgPaths.p89cf980} fill="var(--fill-0, #FF491F)" id="Vector_19" />
          <path d={svgPaths.p29bd3300} fill="var(--fill-0, #3C3F4D)" id="Vector_20" />
        </g>
        <defs>
          <clipPath id="clip0_227_1190">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group14() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer5 />
    </div>
  );
}

function Frame107() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Thương mại điện tử</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white content-stretch flex h-[85px] items-center pl-[20px] pr-[35px] py-[10px] relative rounded-[5px] shrink-0 w-[430px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group14 />
      <Frame107 />
    </div>
  );
}

function Frame108() {
  return (
    <div className="content-center flex flex-wrap gap-[30px] items-center justify-center relative shrink-0 w-[1350px]">
      <Frame23 />
      <Frame100 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
    </div>
  );
}

function ButtonCta5() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame109() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-1/2 px-0 py-[60px] top-[3866px] translate-x-[-50%] w-[1440px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0%, rgba(252, 249, 254, 0.05) 30%, rgba(252, 249, 254, 0.05) 70%, rgba(92, 29, 163, 0.05) 100%), linear-gradient(90deg, rgb(252, 249, 254) 0%, rgb(252, 249, 254) 100%)" }}>
      <Frame98 />
      <Frame108 />
      <ButtonCta5 />
    </div>
  );
}

function Frame110() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[245px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[594px]">Lý do Convertify CRM là lựa chọn hàng đầu</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">5 lý do Convertify CRM là nền tảng tối ưu không thể thiếu cho các nhà quảng cáo lead</p>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute inset-[8.32%_0_8.34%_0]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.9999 58.3378">
        <g id="Icon">
          <path d={svgPaths.p2fdd0500} fill="var(--fill-0, #7C3AED)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Layer6() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[70px]" data-name="Layer_1">
      <Icon />
    </div>
  );
}

function Group18() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer6 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Group18 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[26px] text-nowrap">Dễ dùng như Google Sheet</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame32 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Giao diện đơn giản như bảng tính Google Sheet, làm quen trong 15 phút, giúp đội sales/CSKH sử dụng được ngay, không “ngợp” như CRM phức tạp.</p>
    </div>
  );
}

function Layer7() {
  return (
    <div className="overflow-clip relative shrink-0 size-[70px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.9986 69.9986">
        <g id="_x34_9_x2C__Mind_Mapping_x2C__mind_mapping_x2C__analytics_x2C__business_and_finance_x2C__infographics_x2C__flow_chart">
          <path d={svgPaths.p1df3f000} fill="var(--fill-0, #7C3AED)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame111() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Layer7 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[26px] text-nowrap">Triển khai nhanh chóng</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame111 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Kết nối dễ dàng thông qua các nền tảng Facebook, Google, TikTok, Zalo chỉ trong vài cú nhấp chuột. Không cần cải đặt phần mềm hay cấu hình phức tạp.</p>
    </div>
  );
}

function Layer8() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[70px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <g clipPath="url(#clip0_227_1617)" id="Layer_1">
          <path d={svgPaths.pd077d80} fill="var(--fill-0, #7C3AED)" id="Vector" />
          <path d={svgPaths.p1b9a2a80} fill="var(--fill-0, #7C3AED)" id="Vector_2" />
          <path d={svgPaths.p399fe680} fill="var(--fill-0, #7C3AED)" id="Vector_3" />
          <path d={svgPaths.p2d85b200} fill="var(--fill-0, #7C3AED)" id="Vector_4" />
          <path d={svgPaths.p28a1d400} fill="var(--fill-0, #7C3AED)" id="Vector_5" />
          <path d={svgPaths.p211bc200} fill="var(--fill-0, #7C3AED)" id="Vector_6" />
          <path d={svgPaths.p5b35700} fill="var(--fill-0, #7C3AED)" id="Vector_7" />
          <path d={svgPaths.p1fe37140} fill="var(--fill-0, #7C3AED)" id="Vector_8" />
          <path d={svgPaths.p90e9300} fill="var(--fill-0, #7C3AED)" id="Vector_9" />
          <path d={svgPaths.p33471500} fill="var(--fill-0, #7C3AED)" id="Vector_10" />
          <path d={svgPaths.p36c1c280} fill="var(--fill-0, #7C3AED)" id="Vector_11" />
          <path d={svgPaths.p3ce8c900} fill="var(--fill-0, #7C3AED)" id="Vector_12" />
        </g>
        <defs>
          <clipPath id="clip0_227_1617">
            <rect fill="white" height="70" width="70" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group20() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer8 />
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Group20 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[26px] text-nowrap">Loại bỏ data rác</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame112 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Tự động phát hiện và loại trừ lead trùng, lead ảo, lead không hợp lệ, hợp nhất lịch sử khách hàng về một hồ sơ duy nhất. Giúp giảm 30 40% chi phí quảng cáo và tập trung vào những khách hàng thật sự tiềm năng.</p>
    </div>
  );
}

function Layer9() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[70px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <g id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p26dcfd00} fill="var(--fill-0, #7C3AED)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group17() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer9 />
    </div>
  );
}

function Frame113() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Group17 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[26px] text-nowrap">Tăng hiệu quả quảng cáo</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame113 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Theo dõi hiệu quả từng kênh và chiến dịch, tối ưu quảng cáo để ra lead chất lượng hơn, chi phí thấp hơn.</p>
    </div>
  );
}

function Icons() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[70px]" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <g clipPath="url(#clip0_227_1177)" id="Icons">
          <path d={svgPaths.p2cf500} fill="var(--fill-0, #7C3AED)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_227_1177">
            <rect fill="white" height="70" width="70" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group19() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Icons />
    </div>
  );
}

function Frame114() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <Group19 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[26px] text-nowrap">Web-based 100%</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame114 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Nền tảng cloud-based hoạt động hoàn toàn trên trình duyệt, không cần tải về máy.Truy cập dễ dảng từ máy tính, tablet, điện thoại – làm việc mọi lúc, mọi nơi, dữ liệu luôn được đồng bộ và bảo mật.</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-[645px]">
      <Frame33 />
      <Frame34 />
      <Frame35 />
      <Frame36 />
      <Frame37 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1350px]">
      <div className="h-[968px] relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[645px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle9} />
      </div>
      <Frame38 />
    </div>
  );
}

function ButtonCta6() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame115() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-1/2 px-0 py-[60px] top-[4562px] translate-x-[-50%] w-[1440px]">
      <Frame110 />
      <Frame39 />
      <ButtonCta6 />
    </div>
  );
}

function Frame116() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[245px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">Lựa chọn gói dịch vụ phù hợp</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">Trải nghiệm đầy đủ tính năng miễn phí và không giới hạn ngay hôm nay</p>
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 text-[#212529] text-nowrap w-full">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px]">Free</p>
      <p className="font-['Plus_Jakarta_Sans:Bold','Noto_Sans:Regular',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px]">
        <span className="leading-[normal] text-[40px]">0đ</span>
        <span className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] text-[#7c3aed] text-[22px]">{` /trọn đời`}</span>
      </p>
    </div>
  );
}

function ButtonCta7() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0 w-[370px]" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group21() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group21 />
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">50 lead/tháng</p>
    </div>
  );
}

function CheckCircle1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group59() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle1 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group59 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Tính năng cơ bản</p>
    </div>
  );
}

function CheckCircle2() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group60() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle2 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group60 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Hỗ trợ qua email</p>
    </div>
  );
}

function CheckCircle3() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group61() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle3 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group61 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">1 người dùng</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <Frame40 />
      <Frame41 />
      <Frame42 />
      <Frame43 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[20px] items-start pb-[30px] pt-[40px] px-[30px] relative rounded-[10px] self-stretch shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[430px]">
      <Frame46 />
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#212529] text-[18px] text-nowrap uppercase">Dành cho cá nhân và startup</p>
      <ButtonCta7 />
      <Frame44 />
    </div>
  );
}

function Frame117() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 text-[#212529] text-nowrap w-full">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px]">Starter</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px]">
        <span className="leading-[normal] text-[40px]">199.000đ</span>
        <span className="font-['Rubik:Regular',sans-serif] font-normal leading-[32px] text-[#7c3aed] text-[22px]">{` /tháng`}</span>
      </p>
    </div>
  );
}

function ButtonCta8() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0 w-[370px]" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function CheckCircle4() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group62() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle4 />
    </div>
  );
}

function Frame118() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group62 />
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">1.000 lead/tháng</p>
    </div>
  );
}

function CheckCircle5() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group63() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle5 />
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group63 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Toàn bộ tính năng</p>
    </div>
  );
}

function CheckCircle6() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group64() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle6 />
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group64 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">{`Hỗ trợ qua chat & email`}</p>
    </div>
  );
}

function CheckCircle7() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group65() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle7 />
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group65 />
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Mobile app</p>
    </div>
  );
}

function CheckCircle8() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group66() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle8 />
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group66 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">10 người dùng</p>
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <Frame118 />
      <Frame119 />
      <Frame120 />
      <Frame121 />
      <Frame122 />
    </div>
  );
}

function Frame124() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[20px] items-start pb-[30px] pt-[40px] px-[30px] relative rounded-[10px] self-stretch shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[430px]">
      <Frame117 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#212529] text-[18px] text-nowrap uppercase">Dành cho doanh nghiệp nhỏ</p>
      <ButtonCta8 />
      <Frame123 />
    </div>
  );
}

function Frame125() {
  return (
    <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 text-[#212529] text-nowrap w-full">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px]">Pro</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] relative shrink-0 text-[0px]">
        <span className="leading-[normal] text-[40px]">599.000đ</span>
        <span className="font-['Rubik:Regular',sans-serif] font-normal leading-[32px] text-[#7c3aed] text-[22px]">{` /tháng`}</span>
      </p>
    </div>
  );
}

function ButtonCta9() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0 w-[370px]" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function CheckCircle9() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group67() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle9 />
    </div>
  );
}

function Frame126() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group67 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Không giới hạn</p>
    </div>
  );
}

function CheckCircle10() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group68() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle10 />
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group68 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Toàn bộ tính năng</p>
    </div>
  );
}

function CheckCircle11() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group69() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle11 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group69 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Hỗ trợ trực tiếp</p>
    </div>
  );
}

function CheckCircle12() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group70() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle12 />
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group70 />
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Mobile app</p>
    </div>
  );
}

function CheckCircle13() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group71() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle13 />
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group71 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">Tích hợp API hệ thống ngoài</p>
    </div>
  );
}

function CheckCircle14() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="check-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="check-circle">
          <path d={svgPaths.p1fd3cc00} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M22 4L12 14.01L9 11.01" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group72() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle14 />
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group72 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">30 người dùng</p>
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <Frame126 />
      <Frame127 />
      <Frame128 />
      <Frame129 />
      <Frame130 />
      <Frame131 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[20px] items-start pb-[30px] pt-[40px] px-[30px] relative rounded-[10px] self-stretch shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-[430px]">
      <Frame125 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#212529] text-[18px] text-nowrap uppercase">Dành cho doanh nghiệp vừa</p>
      <ButtonCta9 />
      <Frame132 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex gap-[30px] items-start relative shrink-0">
      <Frame45 />
      <Frame124 />
      <Frame47 />
    </div>
  );
}

function Frame133() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-1/2 px-0 py-[60px] top-[5939px] translate-x-[-50%] w-[1440px]" style={{ backgroundImage: "linear-gradient(179.874deg, rgba(92, 29, 163, 0.05) 0.20468%, rgba(252, 249, 254, 0.05) 79.877%, rgba(255, 255, 255, 0.05) 99.795%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Frame116 />
      <Frame48 />
    </div>
  );
}

function Frame134() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 text-[#212529] text-center w-full">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">Tích hợp với các nền tảng hàng đầu</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">Kết nối dễ dàng với các nền tảng hàng đầu chỉ trong vài cú nhấp chuột, giúp dữ liệu đồng bộ tức thì và vận hành ổn định.</p>
    </div>
  );
}

function Layer10() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[100px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g clipPath="url(#clip0_227_1180)" id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p3062040} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1a06c080} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector_2" opacity="0.1" />
          <path clipRule="evenodd" d={svgPaths.p103c9a00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p35781c00} fill="var(--fill-0, #1C74F4)" id="Vector_4" />
          <path d={svgPaths.p29bb1080} fill="var(--fill-0, #1C74F4)" id="Vector_5" />
          <path d={svgPaths.p24aa1200} fill="var(--fill-0, #1C74F4)" id="Vector_6" />
          <path d={svgPaths.p1ae29e00} fill="var(--fill-0, #1C74F4)" id="Vector_7" />
          <path d={svgPaths.p3a65f80} fill="var(--fill-0, #1C74F4)" id="Vector_8" />
        </g>
        <defs>
          <clipPath id="clip0_227_1180">
            <rect fill="white" height="100" width="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group22() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer10 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Group22 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame56 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Zalo</p>
    </div>
  );
}

function Layer11() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[100px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Layer_1">
          <g id="Group">
            <path d={svgPaths.p11ab3f40} fill="var(--fill-0, #FF0033)" id="Vector" />
            <path d={svgPaths.p22c619c0} fill="var(--fill-0, #FF0033)" id="Vector_2" />
            <path d={svgPaths.p38ddd3f0} fill="var(--fill-0, #FF0033)" id="Vector_3" />
          </g>
          <path d={svgPaths.p1c8f1b80} fill="var(--fill-0, black)" id="Vector_4" />
          <g id="Group_2">
            <g id="Group_3">
              <path d={svgPaths.p4ad9e80} fill="var(--fill-0, #00F7EF)" id="Vector_5" />
              <path d={svgPaths.pe39ee00} fill="var(--fill-0, #00F7EF)" id="Vector_6" />
            </g>
            <path d={svgPaths.p3b8cbe80} fill="var(--fill-0, #00F7EF)" id="Vector_7" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group23() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer11 />
    </div>
  );
}

function Frame135() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Group23 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame135 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Tiktok</p>
    </div>
  );
}

function Svg() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[100px]" data-name="svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g clipPath="url(#clip0_227_1160)" id="svg">
          <path clipRule="evenodd" d={svgPaths.p945b04} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p39a71000} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p24eb7a00} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_227_1160">
            <rect fill="white" height="100" width="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group24() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Svg />
    </div>
  );
}

function Frame136() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Group24 />
    </div>
  );
}

function Frame137() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame136 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Facebook</p>
    </div>
  );
}

function Layer12() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[100px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g id="Layer_1">
          <path d={svgPaths.p2a780680} fill="var(--fill-0, #FF0033)" id="Vector" />
          <path d={svgPaths.pd1b6a00} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group25() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer12 />
    </div>
  );
}

function Frame138() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Group25 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame138 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">Youtube</p>
    </div>
  );
}

function Layer13() {
  return (
    <div className="relative shrink-0 size-[100px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <g clipPath="url(#clip0_227_1155)" id="Layer_1">
          <path d={svgPaths.p8bf2080} fill="var(--fill-0, #873EFF)" id="Vector" />
          <path d={svgPaths.p206dcf70} fill="var(--fill-0, #873EFF)" id="wc-logo-def-o" />
          <path d={svgPaths.p316da280} fill="var(--fill-0, #873EFF)" id="wc-logo-def-o_2" />
        </g>
        <defs>
          <clipPath id="clip0_227_1155">
            <rect fill="white" height="100" width="100" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame139() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Layer13 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[15px] grow items-center min-h-px min-w-px relative shrink-0">
      <Frame139 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-center text-nowrap">WooCommerce</p>
    </div>
  );
}

function Frame140() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0 w-full">
      <Frame50 />
      <Frame55 />
      <Frame137 />
      <Frame57 />
      <Frame58 />
    </div>
  );
}

function ButtonCta10() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-[45px] p-[60px] rounded-[20px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] top-[6714px] w-[1350px]" style={{ backgroundImage: "linear-gradient(179.887deg, rgba(92, 29, 163, 0.05) 0.20468%, rgba(252, 249, 254, 0.05) 79.877%, rgba(255, 255, 255, 0.05) 99.795%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Frame134 />
      <Frame140 />
      <ButtonCta10 />
    </div>
  );
}

function Frame141() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center pl-[45px] pr-[245px] py-0 relative text-[#212529] w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">Khách hàng nói về chúng tôi</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">Hãy lắng nghe những chia sẻ của khách hàng đã trải nghiệm dịch vụ của chúng tôi</p>
        </div>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] w-full">Nam Nguyễn</p>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Marketing Expert</p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[60px]">
        <img alt="" className="block max-w-none size-full" height="60" src={imgEllipse1} width="60" />
      </div>
      <Frame59 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0" style={{ backgroundImage: "linear-gradient(179.833deg, rgba(92, 29, 163, 0.05) 0.20468%, rgba(252, 249, 254, 0.05) 79.877%, rgba(255, 255, 255, 0.05) 99.795%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-[40px] pt-[60px] px-[30px] relative w-full">
        <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Lorem ipsum dolor sit amet consectetur. Tellus tellus aliquet et lacinia consectetur. Sit aliquam neque cras mauris porttitor tortor velit. Senectus malesuada ut neque quis auctor. Diam lectus penatibus mauris est eget felis euismod.</p>
        <Frame60 />
        <div className="absolute h-[58px] left-[30px] top-[30px] w-[80px]" data-name="“">
          <div className="absolute inset-0" style={{ "--fill-0": "rgba(124, 58, 237, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 58">
              <path d={svgPaths.p3fad6100} fill="var(--fill-0, #7C3AED)" id="â" opacity="0.1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[30px] items-center relative shrink-0 w-[1350px]">
      {[...Array(3).keys()].map((_, i) => (
        <Frame61 key={i} />
      ))}
    </div>
  );
}

function ButtonCta11() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame142() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-1/2 px-0 py-[60px] top-[7364px] translate-x-[-50%] w-[1440px]">
      <Frame141 />
      <Frame62 />
      <ButtonCta11 />
    </div>
  );
}

function Frame143() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[245px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">Những câu hỏi thường gặp</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">Tổng hợp thắc mắc thường gặp, giúp bạn hiểu rõ hơn về dịch vụ của chúng tôi.</p>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[15px] items-start relative shrink-0">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[23px] w-full" start="1">
        <li className="ms-[34.5px]">
          <span className="leading-[32px]">Convertify CRM có miễn phí không?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Có, chúng tôi cung cấp gói miễn phí với đầy đủ tính năng cơ bản. Bạn có thể nâng cấp lên gói Pro khi cần thêm tính năng nâng cao và hỗ trợ ưu tiên.</p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[15px] items-start relative shrink-0">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[23px] w-full" start="4">
        <li className="ms-[34.5px]">
          <span className="leading-[32px]">Convertify CRM có hỗ trợ tích hợp API không?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Có, chúng tôi cung cấp API cho phép tích hợp với các nền tảng khác như Website, Landing Page, CMS. Bạn có thể đồng bộ lead tự động từ nhiều nguồn khác nhau.</p>
    </div>
  );
}

function Frame64() {
  return (
    <div className="[grid-area:2_/_1] content-stretch flex flex-col gap-[15px] items-start relative shrink-0">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[23px] w-full" start="2">
        <li className="ms-[34.5px]">
          <span className="leading-[32px]">Tôi có thể kết nối mấy kênh quảng cáo?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Convertify CRM hỗ trợ kết nối không giới hạn số lượng kênh quảng cáo bao gồm Facebook Ads, TikTok Ads, Google Ads, Zalo OA và các landing page. Tất cả lead sẽ được đồng bộ tự động về một nơi.</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="[grid-area:2_/_2] content-stretch flex flex-col gap-[15px] items-start relative shrink-0">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[23px] w-full" start="5">
        <li className="ms-[34.5px]">
          <span className="leading-[32px]">Dữ liệu của tôi có được bảo mật không?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Chúng tôi cam kết bảo mật tuyệt đối dữ liệu khách hàng với mã hóa SSL, backup tự động hàng ngày, và tuân thủ các tiêu chuẩn bảo mật quốc tế. Dữ liệu của bạn luôn được an toàn.</p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="[grid-area:3_/_1] content-stretch flex flex-col gap-[15px] items-start relative shrink-0">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[23px] w-full" start="3">
        <li className="ms-[34.5px]">
          <span className="leading-[32px]">Tôi có thể quản lý bao nhiêu lead?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Gói miễn phí cho phép quản lý lên đến 1.000 lead/tháng. Các gói trả phí có thể quản lý không giới hạn số lượng lead, phù hợp với doanh nghiệp có quy mô lớn.</p>
    </div>
  );
}

function Frame68() {
  return (
    <div className="[grid-area:3_/_2] content-stretch flex flex-col gap-[15px] items-start relative shrink-0">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[23px] w-full" start="6">
        <li className="ms-[34.5px]">
          <span className="leading-[32px]">Có hỗ trợ đào tạo sử dụng không?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Có, chúng tôi cung cấp tài liệu hướng dẫn chi tiết, video tutorial và hỗ trợ trực tuyến. Đối với gói Pro, bạn sẽ được đào tạo 1-1 và hỗ trợ ưu tiên qua chat/email.</p>
    </div>
  );
}

function Frame69() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="gap-[30px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_fit-content(100%))] px-[160px] py-0 relative w-full">
        <Frame63 />
        <Frame66 />
        <Frame64 />
        <Frame67 />
        <Frame65 />
        <Frame68 />
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] items-center left-1/2 px-0 py-[60px] top-[8023px] translate-x-[-50%] w-[1440px]">
      <Frame143 />
      <Frame69 />
    </div>
  );
}

function IsolationMode1() {
  return (
    <div className="h-[1477px] relative w-[2474px]" data-name="Isolation_Mode">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2474 1477">
        <g clipPath="url(#clip0_227_1149)" id="Isolation_Mode" opacity="0.2">
          <path d={svgPaths.p2cbfac00} fill="var(--fill-0, #FCF9FE)" id="Vector" opacity="0.36" />
          <path d={svgPaths.p2aeb7880} fill="var(--fill-0, #FCF9FE)" id="Vector_2" opacity="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_227_1149">
            <rect fill="white" height="1477" width="2474" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame144() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 text-center text-white w-full">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[48px] w-[890px]">
        Hãy trải nghiệm Convertify CRM
        <br aria-hidden="true" />
        để bứt phá doanh số ngay hôm nay
      </p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[22px] w-[890px]">Chỉ cần vài nhấp chuột để bắt đầu</p>
    </div>
  );
}

function ButtonCta12() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame145() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[85px] items-center relative shrink-0 w-full">
      <ButtonCta12 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-center text-white w-[min-content]">Miễn phí mọi tính năng, dễ dùng trong 5 phút</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute bg-[#7c3aed] content-stretch flex flex-col gap-[40px] items-start left-[45px] overflow-clip pb-[60px] pt-[80px] px-[60px] rounded-[20px] top-[8788px] w-[1350px]">
      <div className="absolute flex h-[1477px] items-center justify-center left-[-861px] top-[-944px] w-[2474px]">
        <div className="flex-none rotate-[180deg]">
          <IsolationMode1 />
        </div>
      </div>
      <Frame144 />
      <Frame145 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents left-[45px] top-[8788px]">
      <Frame52 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0 w-[315px]">
      <div className="h-[50px] relative rounded-[5px] shrink-0 w-[231px]" data-name="Convertify_logo-full-light-02 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
          <img alt="" className="absolute h-[403.78%] left-[-17.42%] max-w-none top-[-147.09%] w-[130.96%]" src={imgConvertifyLogoFullLight022} />
        </div>
      </div>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Convertify CRM là nền tảng quản lý quảng cáo đa kênh và CRM toàn diện, giúp doanh nghiệp tối ưu hiệu suất quảng cáo và tăng tỷ lệ chuyển đổi lead thành khách hàng.</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col font-['Rubik:Regular',sans-serif] font-normal gap-[8px] items-start justify-end leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap w-full">
      <p className="relative shrink-0">About Us</p>
      <p className="relative shrink-0">Careers</p>
      <p className="relative shrink-0">Our Blog</p>
      <p className="relative shrink-0">Contact Us</p>
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0 w-[200px]">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-nowrap">Company</p>
      <Frame71 />
    </div>
  );
}

function Frame146() {
  return (
    <div className="content-stretch flex flex-col font-['Rubik:Regular',sans-serif] font-normal gap-[8px] items-start justify-end leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap w-full">
      <p className="relative shrink-0">Integration</p>
      <p className="relative shrink-0">Customers</p>
      <p className="relative shrink-0">Pricing</p>
      <p className="relative shrink-0">Help Center</p>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0 w-[200px]">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-nowrap">Product</p>
      <Frame146 />
    </div>
  );
}

function Frame147() {
  return (
    <div className="content-stretch flex flex-col font-['Rubik:Regular',sans-serif] font-normal gap-[8px] items-start justify-end leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap w-full">
      <p className="relative shrink-0">Terms of Use</p>
      <p className="relative shrink-0">Privacy Policy</p>
      <p className="relative shrink-0">Cookies Policy</p>
      <p className="relative shrink-0">Site Map</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0 w-[200px]">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-nowrap">Legal</p>
      <Frame147 />
    </div>
  );
}

function Layer14() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[30px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_227_1144)" id="Layer_1">
          <rect fill="#1DA1F2" height="30" width="30" />
          <path d={svgPaths.p1c956900} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_227_1144">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group26() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[12px] mt-[10px] place-items-start relative">
      <Layer14 />
    </div>
  );
}

function Group31() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[50px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
          <circle cx="25" cy="25" fill="var(--fill-0, #1DA1F2)" id="Ellipse 2" r="25" />
        </svg>
      </div>
      <Group26 />
    </div>
  );
}

function Layer15() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[50px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g clipPath="url(#clip0_227_1455)" id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p1c4c8580} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p10d640b0} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector_2" opacity="0.1" />
          <path clipRule="evenodd" d={svgPaths.p3b804240} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1a8b5300} fill="var(--fill-0, #1C74F4)" id="Vector_4" />
          <path d={svgPaths.p25909f80} fill="var(--fill-0, #1C74F4)" id="Vector_5" />
          <path d={svgPaths.p2d16c100} fill="var(--fill-0, #1C74F4)" id="Vector_6" />
          <path d={svgPaths.p27b85100} fill="var(--fill-0, #1C74F4)" id="Vector_7" />
          <path d={svgPaths.p85a4200} fill="var(--fill-0, #1C74F4)" id="Vector_8" />
        </g>
        <defs>
          <clipPath id="clip0_227_1455">
            <rect fill="white" height="50" width="50" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group73() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer15 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[25px] shrink-0 size-[50px]">
      <Group73 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[50px]" data-name="svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g clipPath="url(#clip0_227_1138)" id="svg">
          <path clipRule="evenodd" d={svgPaths.p35585300} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1aac1100} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector_2" />
          <g id="Vector_3"></g>
          <path clipRule="evenodd" d={svgPaths.p9d8b180} fill="var(--fill-0, #4D98F4)" fillRule="evenodd" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_227_1138">
            <rect fill="white" height="50" width="50" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group74() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Svg1 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex items-center overflow-clip relative rounded-[25px] shrink-0 size-[50px]">
      <Group74 />
    </div>
  );
}

function Layer16() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[30px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Layer_1">
          <path d={svgPaths.p3f729580} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p271f7200} fill="var(--fill-0, #FF0033)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group75() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer16 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="bg-[#f03] content-stretch flex items-center overflow-clip p-[10px] relative rounded-[25px] shrink-0 size-[50px]">
      <Group75 />
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group31 />
      <Frame77 />
      <Frame78 />
      <Frame79 />
    </div>
  );
}

function Frame148() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-end relative shrink-0 w-full">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">info@convertify.vn</p>
      <Frame80 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0 w-[315px]">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#212529] text-[23px] text-nowrap">Connect With Us</p>
      <Frame148 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex gap-[30px] items-start justify-center relative shrink-0">
      <Frame70 />
      <Frame72 />
      <Frame73 />
      <Frame74 />
      <Frame75 />
    </div>
  );
}

function Frame149() {
  return (
    <div className="content-stretch flex font-['Rubik:Regular',sans-serif] font-normal gap-[30px] h-[26px] items-center justify-end leading-[25px] relative shrink-0 text-[#757575] text-[16px] text-nowrap">
      <p className="relative shrink-0">About Us</p>
      <p className="relative shrink-0">Blog</p>
      <p className="relative shrink-0">Careers</p>
      <p className="relative shrink-0">Contact Us</p>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] text-center text-nowrap">Copyright 2025 © Convertify. All right reserved</p>
      <Frame149 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[50px] items-center left-1/2 pb-[30px] pt-[60px] px-[45px] top-[9217px] translate-x-[-50%] w-[1440px]">
      <Frame76 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(204, 204, 204, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1350 1">
            <line id="Line 2" stroke="var(--stroke-0, #CCCCCC)" x2="1350" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame81 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[20px]" data-name="navigation">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="navigation">
          <path d={svgPaths.p5f0b7c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group30() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Navigation />
    </div>
  );
}

function ButtonCta13() {
  return (
    <div className="absolute bg-[#0d6efd] bottom-0 content-stretch flex gap-[10px] items-center justify-center left-1/2 pb-[12px] pt-[10px] px-[24px] rounded-tl-[5px] rounded-tr-[5px] translate-x-[-50%] w-[300px]" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-tl-[5px] rounded-tr-[5px] shadow-[0px_-1px_4px_-1px_rgba(12,12,13,0.1),0px_-1px_4px_-1px_rgba(12,12,13,0.05)]" />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
      <Group30 />
    </div>
  );
}

export default function LandingPageMain() {
  return (
    <div className="bg-white relative size-full" data-name="Landing Page - Main">
      <ButtonCta13 />
      <Frame4 />
      <Header />
      <Frame12 />
      <div className="absolute h-0 left-1/2 top-[1510.5px] translate-x-[-50%] w-[890px]">
        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(204, 204, 204, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 890 1">
            <line id="Line 1" stroke="var(--stroke-0, #CCCCCC)" x2="890" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame13 />
      <Frame109 />
      <Frame115 />
      <Frame133 />
      <Frame49 />
      <Frame142 />
      <Frame51 />
      <Group27 />
      <Frame53 />
      <div className="absolute h-0 left-1/2 top-[8023px] translate-x-[-50%] w-[890px]">
        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(204, 204, 204, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 890 1">
            <line id="Line 1" stroke="var(--stroke-0, #CCCCCC)" x2="890" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}