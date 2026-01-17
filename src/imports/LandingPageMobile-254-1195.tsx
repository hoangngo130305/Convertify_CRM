import svgPaths from "./svg-twnj9tyi7t";
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
    <div className="absolute h-[868px] left-[-148px] top-[-34px] w-[1059px]" data-name="Isolation_Mode">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1059 868">
        <g clipPath="url(#clip0_239_1902)" id="Isolation_Mode" opacity="0.2">
          <path d={svgPaths.p1adfcf40} fill="var(--fill-0, #FCF9FE)" id="Vector" opacity="0.36" />
          <path d={svgPaths.p2c1b7070} fill="var(--fill-0, #FCF9FE)" id="Vector_2" opacity="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_239_1902">
            <rect fill="white" height="868" width="1059" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 text-white w-full">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[40px] w-full">CRM đồng bộ Lead đa kênh cho nhà quảng cáo</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Đồng bộ lead từ Facebook, Zalo, TikTok, Landing Page. Tối ưu quảng cáo và giảm data kém chất lượng.</p>
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
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <ButtonCta />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-white w-[min-content]">Miễn phí mọi tính năng, dễ dùng trong 5 phút</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[380px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[45px] py-0 relative size-full">
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
    <div className="absolute bottom-[10px] h-[8px] left-1/2 translate-x-[-50%] w-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 8">
        <g id="Group 1">
          <circle cx="4" cy="4" fill="var(--fill-0, white)" id="Ellipse 1" r="4" />
          <circle cx="16" cy="4" fill="var(--fill-0, white)" id="Ellipse 2" opacity="0.25" r="4" />
        </g>
      </svg>
    </div>
  );
}

function MobileHero() {
  return (
    <div className="absolute bg-[#7c3aed] content-stretch flex flex-col gap-[10px] h-[800px] items-start justify-center left-1/2 overflow-clip pb-[15px] pt-[70px] px-[15px] top-[62px] translate-x-[-50%] w-[430px]" data-name="Mobile Hero">
      <IsolationMode />
      <Frame3 />
      <Frame />
      <Group />
    </div>
  );
}

function ButtonContact() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[10px] pt-[8px] px-[22px] relative rounded-[3px] shrink-0" data-name="Button Contact">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[16px] text-nowrap text-white">Đăng ký</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu">
          <path d="M3 12H21" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 6H21" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3 18H21" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Menu />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <ButtonContact />
      <Group1 />
    </div>
  );
}

function MobileHeader() {
  return (
    <div className="absolute bg-[#7c3aed] content-stretch flex h-[60px] items-center justify-between left-1/2 px-[15px] py-0 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] top-[62px] translate-x-[-50%] w-[430px]" data-name="Mobile Header">
      <div className="h-[40px] relative rounded-[5px] shrink-0 w-[185px]" data-name="Convertify_logo-full-light-02 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
          <img alt="" className="absolute h-[598.16%] left-[-16.32%] max-w-none top-[-243.07%] w-[129.47%]" src={imgConvertifyLogoFullLight021} />
        </div>
      </div>
      <Frame4 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[30px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">
            Vấn đề của
            <br aria-hidden="true" />
            nhà quảng cáo Lead
          </p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">
            4 vấn đề phổ biến mà các nhà quảng cáo lead
            <br aria-hidden="true" />
            hay gặp phải
          </p>
        </div>
      </div>
    </div>
  );
}

function CloudOff() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[30px]" data-name="cloud-off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_239_1745)" id="cloud-off">
          <path d={svgPaths.pba7ce40} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d="M1.25 1.24997L28.75 28.75" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
        <defs>
          <clipPath id="clip0_239_1745">
            <rect fill="white" height="30" width="30" />
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
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">Quản lý thủ công</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Dữ liệu rời rạc trên Google Sheet, dễ bỏ sót và rò rỉ lead.</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] self-stretch shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-start pb-[152px] pt-[15px] px-[15px] relative size-full">
          <Frame5 />
          <div className="absolute bottom-[15.12px] h-[121.875px] left-1/2 rounded-[5px] translate-x-[-50%] w-[162.5px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle1} />
              <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserX() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[30px]" data-name="user-x">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="user-x">
          <path d={svgPaths.p1c066000} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p9548a80} id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d="M22.5 10L28.75 16.25" id="Vector_3" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d="M28.75 10L22.5 16.25" id="Vector_4" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
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

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Group2 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">{`Mù mờ "Khách thật”`}</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Không biết kênh nào dẫn về khách chất lượng để tối ưu ngân sách.</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] self-stretch shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-start pb-[152px] pt-[15px] px-[15px] relative size-full">
          <Frame8 />
          <div className="absolute bottom-[15.12px] h-[121.875px] left-1/2 rounded-[5px] translate-x-[-50%] w-[162.5px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle2} />
              <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame102() {
  return (
    <div className="content-stretch flex gap-[15px] items-start relative shrink-0 w-full">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function DollarSign() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[30px]" data-name="dollar-sign">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="dollar-sign">
          <path d="M15 1.24997V28.75" id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d={svgPaths.p2a4e7980} id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
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

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Group3 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">Lãng phí ngân sách</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Data rác, số sai, form ảo làm đội chi phí quảng cáo.</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] self-stretch shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-start pb-[152px] pt-[15px] px-[15px] relative size-full">
          <Frame9 />
          <div className="absolute h-[121.875px] left-[15px] rounded-[5px] top-[229px] w-[162.5px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle3} />
              <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneOff() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[30px]" data-name="phone-off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g clipPath="url(#clip0_239_1507)" id="phone-off">
          <path d={svgPaths.p1d0d5e0} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
          <path d="M28.75 1.24997L1.25 28.75" id="Vector_2" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
        <defs>
          <clipPath id="clip0_239_1507">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group29() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <PhoneOff />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Group29 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">Sales phản hồi chậm</p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Lead không được phân bổ tự động, gọi trùng khách, rớt đơn.</p>
    </div>
  );
}

function Frame63() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[10px] self-stretch shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-start pb-[152px] pt-[15px] px-[15px] relative size-full">
          <Frame62 />
          <div className="absolute h-[121.875px] left-[15px] rounded-[5px] top-[229px] w-[162.5px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
              <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[5px] size-full" src={imgRectangle4} />
              <div className="absolute bg-gradient-to-b from-white inset-0 rounded-[5px] to-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame103() {
  return (
    <div className="content-stretch flex gap-[15px] items-start relative shrink-0 w-full">
      <Frame54 />
      <Frame63 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[15px] items-center justify-center px-[15px] py-0 relative w-full">
          <Frame102 />
          <Frame103 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-center left-1/2 pb-[30px] pt-[45px] px-0 top-[862px] translate-x-[-50%] w-[430px]">
      <Frame10 />
      <Frame11 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[30px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">
            Giải pháp
            <br aria-hidden="true" />
            Convertify CRM
          </p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Convertify CRM với 4 giải pháp tối ưu giúp giải quyết tất cả vấn đề của nhà quảng cáo Lead trong cùng 1 nền tảng duy nhất</p>
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
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#7c3aed] text-[16px] text-nowrap uppercase">TÍNH NĂNG LEADHUB</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">Đồng bộ Lead đa kênh</p>
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
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame16 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Kết nối Facebook Lead Ads, Zalo, TikTok, Landing Page chỉ với vài click. Mọi lead đồ về một nơi, thông báo ngay lập tức.</p>
      <ButtonCta1 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[#fcf9fe] relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[4]">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-start justify-center px-[30px] py-[45px] relative w-full">
          <Frame17 />
          <div className="aspect-[370/247] pointer-events-none relative rounded-[10px] shrink-0 w-full">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full" src={imgRectangle5} />
            <div aria-hidden="true" className="absolute border border-[#7c3aed] border-solid inset-0 rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" />
          </div>
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

function Frame85() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0 size-[60px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 60 60\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-8 -2.3224 4.2316 -14.577 80 60)\\\'><stop stop-color=\\\'rgba(252,249,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(220,201,250,1)\\\' offset=\\\'0.17488\\\'/><stop stop-color=\\\'rgba(188,154,246,1)\\\' offset=\\\'0.34976\\\'/><stop stop-color=\\\'rgba(156,106,241,1)\\\' offset=\\\'0.52463\\\'/><stop stop-color=\\\'rgba(124,58,237,1)\\\' offset=\\\'0.69951\\\'/></radialGradient></defs></svg>')" }}>
      <Group4 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[279px]">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#7c3aed] text-[16px] text-nowrap uppercase">TÍNH NĂNG Ads Tracking</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">Đo lường hiệu quả</p>
    </div>
  );
}

function Frame87() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
      <Frame85 />
      <Frame86 />
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

function Frame88() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame87 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Biết chính xác lead chất lượng đến từ chiến dịch nào. Thấy ngay chi phí/lead và doanh thu để ra quyết định tăng/giảm ngân sách.</p>
      <ButtonCta2 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-white relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[3]">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-end justify-center px-[30px] py-[45px] relative w-full">
          <Frame88 />
          <div className="aspect-[370/247] pointer-events-none relative rounded-[10px] shrink-0 w-full">
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

function Frame89() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0 size-[60px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 60 60\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-8 -2.3224 4.2316 -14.577 80 60)\\\'><stop stop-color=\\\'rgba(252,249,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(220,201,250,1)\\\' offset=\\\'0.17488\\\'/><stop stop-color=\\\'rgba(188,154,246,1)\\\' offset=\\\'0.34976\\\'/><stop stop-color=\\\'rgba(156,106,241,1)\\\' offset=\\\'0.52463\\\'/><stop stop-color=\\\'rgba(124,58,237,1)\\\' offset=\\\'0.69951\\\'/></radialGradient></defs></svg>')" }}>
      <Group5 />
    </div>
  );
}

function Frame90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[279px]">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#7c3aed] text-[16px] text-nowrap uppercase">TÍNH NĂNG DataSet</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">{`Tối ưu & loại bỏ rác`}</p>
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
      <Frame89 />
      <Frame90 />
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

function Frame92() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame91 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Gửi tín hiệu chất lượng Lead ngược về Facebook/TikTok để thuật toán hiểu và phân phối quảng cáo đúng đối tượng hơn.</p>
      <ButtonCta3 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#fcf9fe] relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[2]">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-start justify-center px-[30px] py-[45px] relative w-full">
          <Frame92 />
          <div className="aspect-[370/247] pointer-events-none relative rounded-[10px] shrink-0 w-full">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[10px] size-full" src={imgRectangle7} />
            <div aria-hidden="true" className="absolute border border-[#7c3aed] border-solid inset-0 rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)]" />
          </div>
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

function Frame93() {
  return (
    <div className="content-stretch flex items-center p-[10px] relative rounded-[10px] shrink-0 size-[60px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 60 60\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-8 -2.3224 4.2316 -14.577 80 60)\\\'><stop stop-color=\\\'rgba(252,249,254,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(220,201,250,1)\\\' offset=\\\'0.17488\\\'/><stop stop-color=\\\'rgba(188,154,246,1)\\\' offset=\\\'0.34976\\\'/><stop stop-color=\\\'rgba(156,106,241,1)\\\' offset=\\\'0.52463\\\'/><stop stop-color=\\\'rgba(124,58,237,1)\\\' offset=\\\'0.69951\\\'/></radialGradient></defs></svg>')" }}>
      <Group6 />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[279px]">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#7c3aed] text-[16px] text-nowrap uppercase">TÍNH NĂNG Customer Management</p>
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[#212529] text-[24px] w-[min-content]">Quản lý dễ dàng</p>
    </div>
  );
}

function Frame95() {
  return (
    <div className="content-stretch flex gap-[23px] items-start relative shrink-0">
      <Frame93 />
      <Frame94 />
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

function Frame96() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Frame95 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Gắn tag phân nhóm, tự động nhắc việc, check trùng lead. Giúp sale phản hồi nhanh hơn và tăng hiệu suất.</p>
      <ButtonCta4 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-white relative shadow-[0px_10px_25px_-10px_rgba(124,58,237,0.15)] shrink-0 w-full z-[1]">
      <div className="flex flex-col items-end justify-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-end justify-center px-[30px] py-[45px] relative w-full">
          <Frame96 />
          <div className="aspect-[370/247] pointer-events-none relative rounded-[10px] shrink-0 w-full">
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
    <div className="absolute content-stretch flex flex-col gap-[15px] items-center left-1/2 pb-[15px] pt-[45px] px-0 top-[1844px] translate-x-[-50%] w-[430px]">
      <Frame84 />
      <Frame22 />
    </div>
  );
}

function Frame97() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[30px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">Lĩnh vực phù hợp với Convertify CRM</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Convertify CRM là giải pháp tối ưu cho doanh nghiệp chạy quảng cáo Lead Form và chốt đơn hiệu quả. Nền tảng đặc biệt phù hợp với các ngành sau:</p>
        </div>
      </div>
    </div>
  );
}

function Layer() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Layer_1">
          <g id="Group">
            <path clipRule="evenodd" d={svgPaths.p300a5900} fill="var(--fill-0, #909CD1)" fillRule="evenodd" id="Vector" />
            <path clipRule="evenodd" d={svgPaths.pf303b00} fill="var(--fill-0, #7986BF)" fillRule="evenodd" id="Vector_2" />
            <path clipRule="evenodd" d={svgPaths.p1faa1480} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_3" />
            <path clipRule="evenodd" d={svgPaths.p1f9c5d80} fill="var(--fill-0, #D1D1F0)" fillRule="evenodd" id="Vector_4" />
            <path clipRule="evenodd" d={svgPaths.p264c0200} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_5" />
            <path clipRule="evenodd" d={svgPaths.p1705dbf0} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_6" />
            <path clipRule="evenodd" d={svgPaths.p2ca2d872} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_7" />
            <path clipRule="evenodd" d={svgPaths.p34dc3000} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_8" />
            <path clipRule="evenodd" d={svgPaths.p2463f180} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_9" />
            <path clipRule="evenodd" d={svgPaths.p356aa400} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_10" />
            <path clipRule="evenodd" d={svgPaths.p119f7700} fill="var(--fill-0, #AEAED6)" fillRule="evenodd" id="Vector_11" />
            <path clipRule="evenodd" d={svgPaths.p3f26ef80} fill="var(--fill-0, #7986BF)" fillRule="evenodd" id="Vector_12" />
            <path clipRule="evenodd" d={svgPaths.p25e13100} fill="var(--fill-0, #F3F3FF)" fillRule="evenodd" id="Vector_13" />
            <path clipRule="evenodd" d={svgPaths.p390b0200} fill="var(--fill-0, #7986BF)" fillRule="evenodd" id="Vector_14" />
          </g>
          <path d={svgPaths.p197a7f00} fill="var(--fill-0, #E6B17C)" id="Vector_15" />
          <path d={svgPaths.p160d5480} fill="var(--fill-0, #D19458)" id="Vector_16" />
          <path clipRule="evenodd" d={svgPaths.p27bfd280} fill="var(--fill-0, #3D4A75)" fillRule="evenodd" id="Vector_17" />
        </g>
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
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Bất động sản</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-white content-stretch flex items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] self-stretch shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group9 />
      <Frame24 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute inset-[10.57%_15.51%_6.82%_15.51%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.5923 33.045">
        <g id="Group">
          <g id="Group_2">
            <path d={svgPaths.p2c20f5f0} fill="var(--fill-0, #FF5BA7)" id="Vector" />
            <g id="Group_3">
              <path d={svgPaths.p242d0500} fill="var(--fill-0, #FD2C8E)" id="Vector_2" />
              <g id="Group_4">
                <path d={svgPaths.p9675100} fill="var(--fill-0, #FD2C8E)" id="Vector_3" />
                <path d={svgPaths.p3fc8d900} fill="var(--fill-0, #FD2C8E)" id="Vector_4" />
              </g>
              <path d={svgPaths.p3ad10280} fill="var(--fill-0, #FD2C8E)" id="Vector_5" />
            </g>
            <g id="Group_5">
              <path d={svgPaths.paebc1f2} fill="var(--fill-0, #FD2C8E)" id="Vector_6" />
              <path d={svgPaths.p291bf80} fill="var(--fill-0, #FF5BA7)" id="Vector_7" />
              <path d={svgPaths.pd76d6f0} fill="var(--fill-0, #FFC3DE)" id="Vector_8" />
              <path d={svgPaths.p27060500} fill="var(--fill-0, #FFC3DE)" id="Vector_9" />
              <g id="Group_6">
                <path d={svgPaths.p354a4400} fill="var(--fill-0, #FFA7CE)" id="Vector_10" />
                <path d={svgPaths.p288fd880} fill="var(--fill-0, #FFA7CE)" id="Vector_11" />
              </g>
              <g id="Group_7">
                <path d={svgPaths.p27483700} fill="var(--fill-0, #FFC3DE)" id="Vector_12" />
                <path d={svgPaths.p32e20a00} fill="var(--fill-0, #FFA7CE)" id="Vector_13" />
                <path d={svgPaths.pf64a480} fill="var(--fill-0, #FFC3DE)" id="Vector_14" />
                <g id="Group_8">
                  <path d={svgPaths.p34f10e80} fill="var(--fill-0, #FFA7CE)" id="Vector_15" />
                  <path d={svgPaths.p146b1d00} fill="var(--fill-0, #FFA7CE)" id="Vector_16" />
                </g>
                <g id="Group_9">
                  <path d={svgPaths.p8e30380} fill="var(--fill-0, #FFDAEC)" id="Vector_17" />
                  <path d={svgPaths.p1f48ee00} fill="var(--fill-0, #B6C4FF)" id="Vector_18" />
                  <path d={svgPaths.p1dc28d00} fill="var(--fill-0, #6582FD)" id="Vector_19" />
                </g>
              </g>
              <path d={svgPaths.p13181080} fill="var(--fill-0, #FF7EB7)" id="Vector_20" />
              <g id="Group_10">
                <path d={svgPaths.p23dbe000} fill="var(--fill-0, #FFA7CE)" id="Vector_21" />
                <path d={svgPaths.p3a997280} fill="var(--fill-0, #FFA7CE)" id="Vector_22" />
                <path d={svgPaths.p20477a80} fill="var(--fill-0, #FFA7CE)" id="Vector_23" />
                <path d={svgPaths.p2def8200} fill="var(--fill-0, #FFA7CE)" id="Vector_24" />
              </g>
            </g>
          </g>
          <g id="Group_11">
            <path d={svgPaths.p3042c200} fill="var(--fill-0, #6582FD)" id="Vector_25" />
            <path d={svgPaths.p1715cb80} fill="var(--fill-0, #6582FD)" id="Vector_26" />
          </g>
          <path d={svgPaths.p33639d00} id="Vector_27" stroke="var(--stroke-0, #FFA7CE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45299" />
        </g>
      </svg>
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute inset-[44.56%_2.92%_22.24%_64.79%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9152 13.2812">
        <g id="Group">
          <path d={svgPaths.p166a6cf0} fill="var(--fill-0, #D1DDFF)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p5cbfc00} fill="var(--fill-0, #8298FD)" id="Vector_2" />
            <path d={svgPaths.pe5a44f0} fill="var(--fill-0, #FF7EB7)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute inset-[1.61%_54.1%_0.77%_3.22%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0729 39.0451">
        <g id="Group">
          <path d={svgPaths.p1c139d40} fill="var(--fill-0, #01EBA4)" id="Vector" />
          <path d={svgPaths.p182a8380} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p236af600} fill="var(--fill-0, #01EBA4)" id="Vector_3" />
          <path d={svgPaths.p1ba70900} fill="var(--fill-0, #01EBA4)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[1.61%_2.92%_0.77%_3.22%]" data-name="Group">
      <Group32 />
      <Group33 />
      <Group34 />
    </div>
  );
}

function Capa() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[40px]" data-name="Capa_1">
      <Group35 />
      <div className="absolute inset-[29.42%_89.23%_63.31%_3.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.90598 2.90598">
          <path d={svgPaths.p73af600} fill="var(--fill-0, #01EBA4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[41.08%_86.77%_51.65%_5.97%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.90598 2.90598">
          <path d={svgPaths.p73af600} fill="var(--fill-0, #FF5BA7)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[26.63%_5.86%_66.1%_86.88%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.90598 2.90598">
          <path d={svgPaths.p73af600} fill="var(--fill-0, #6582FD)" id="Vector" />
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

function Frame98() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Thẩm mỹ</p>
    </div>
  );
}

function Frame99() {
  return (
    <div className="bg-white content-stretch flex items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] self-stretch shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group10 />
      <Frame98 />
    </div>
  );
}

function Capa1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="Capa_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Capa_1">
          <path d={svgPaths.pa41b280} fill="var(--fill-0, #232E7A)" id="Vector" />
          <path d={svgPaths.p2bdd7300} fill="var(--fill-0, #ECECF1)" id="Vector_2" />
          <path d={svgPaths.p11a9370} fill="var(--fill-0, #D3D3D8)" id="Vector_3" />
          <path d={svgPaths.p21260780} fill="var(--fill-0, #FFF5F5)" id="Vector_4" />
          <path d={svgPaths.p119e480} fill="var(--fill-0, #2B3894)" id="Vector_5" />
          <path d={svgPaths.p2582bef0} fill="var(--fill-0, #3D4EC6)" id="Vector_6" />
          <path d={svgPaths.p11e41480} fill="var(--fill-0, #5766CE)" id="Vector_7" />
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

function Frame100() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Nha khoa</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group12 />
      <Frame100 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute inset-[4.85%_59.89%_46.29%_4.18%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3737 19.5445">
        <g id="Group">
          <path d={svgPaths.pd9a2980} fill="var(--fill-0, #FEBC1F)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p14aea00} fill="var(--fill-0, #FEBC1F)" id="Vector_2" />
            <path d={svgPaths.p35b2e780} fill="var(--fill-0, #FFD06C)" id="Vector_3" />
          </g>
          <path d={svgPaths.p1e563500} fill="var(--fill-0, #DF3260)" id="Vector_4" />
          <g id="Group_3">
            <path d={svgPaths.pc61be80} fill="var(--fill-0, #DF3260)" id="Vector_5" />
            <path d={svgPaths.p2e34fc30} fill="var(--fill-0, #F45170)" id="Vector_6" />
          </g>
          <path d={svgPaths.p3f8d3f00} fill="var(--fill-0, #9BD899)" id="Vector_7" />
          <path d={svgPaths.p3c93500} fill="var(--fill-0, #72D561)" id="Vector_8" />
          <g id="Group_4">
            <path d={svgPaths.p36f7cac0} fill="var(--fill-0, #72D561)" id="Vector_9" />
            <path d={svgPaths.p212d5770} fill="var(--fill-0, #78E75A)" id="Vector_10" />
          </g>
          <g id="Group_5">
            <path d={svgPaths.p13636980} fill="var(--fill-0, #638DFF)" id="Vector_11" />
          </g>
          <path d={svgPaths.p19007400} fill="var(--fill-0, #DEDFFB)" id="Vector_12" />
          <g id="Group_6">
            <path d={svgPaths.p1f463600} fill="var(--fill-0, #DEDFFB)" id="Vector_13" />
            <path d={svgPaths.p614d180} fill="var(--fill-0, #F3F1FC)" id="Vector_14" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute inset-[34.98%_8.05%_5.66%_7.64%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.7239 23.7407">
        <g id="Group">
          <path d={svgPaths.p35e3e100} fill="var(--fill-0, #DEDFFB)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p1ebad200} fill="var(--fill-0, #E9E7FC)" id="Vector_2" />
            <g id="Group_3">
              <path d={svgPaths.p36b07500} fill="var(--fill-0, #DEDFFB)" id="Vector_3" />
              <path d={svgPaths.p21d12200} fill="var(--fill-0, #1D2943)" id="Vector_4" />
              <path d={svgPaths.p20f23f00} fill="var(--fill-0, #57B3FE)" id="Vector_5" />
              <path d={svgPaths.p1f132400} fill="var(--fill-0, white)" id="Vector_6" />
            </g>
            <path d={svgPaths.p2c854f0} fill="var(--fill-0, #F3F1FC)" id="Vector_7" />
            <path d={svgPaths.p19d29900} fill="var(--fill-0, #DEDFFB)" id="Vector_8" />
            <g id="Group_4">
              <path d={svgPaths.p38ced400} fill="var(--fill-0, #9EA9C9)" id="Vector_9" />
              <path d={svgPaths.p2f23e680} fill="var(--fill-0, #9EA9C9)" id="Vector_10" />
              <path d={svgPaths.p174e6080} fill="var(--fill-0, #F45170)" id="Vector_11" />
              <path d={svgPaths.p34d00d80} fill="var(--fill-0, #9EA9C9)" id="Vector_12" />
              <path d={svgPaths.p99db80} fill="var(--fill-0, #9EA9C9)" id="Vector_13" />
              <path d={svgPaths.p2d9e3c70} fill="var(--fill-0, #9EA9C9)" id="Vector_14" />
              <path d={svgPaths.p37e590c0} fill="var(--fill-0, #9EA9C9)" id="Vector_15" />
              <path d={svgPaths.p915b780} fill="var(--fill-0, #9EA9C9)" id="Vector_16" />
              <path d={svgPaths.p3c478100} fill="var(--fill-0, #9EA9C9)" id="Vector_17" />
              <path d={svgPaths.p29b286c0} fill="var(--fill-0, #9EA9C9)" id="Vector_18" />
              <path d={svgPaths.pda00} fill="var(--fill-0, #9EA9C9)" id="Vector_19" />
              <path d={svgPaths.p14ac4000} fill="var(--fill-0, #9EA9C9)" id="Vector_20" />
              <path d={svgPaths.p24b8680} fill="var(--fill-0, #9EA9C9)" id="Vector_21" />
              <path d={svgPaths.p334d3180} fill="var(--fill-0, #9EA9C9)" id="Vector_22" />
              <path d={svgPaths.p2c409000} fill="var(--fill-0, #9EA9C9)" id="Vector_23" />
              <path d={svgPaths.p20a67680} fill="var(--fill-0, #9EA9C9)" id="Vector_24" />
              <path d={svgPaths.p20da8b80} fill="var(--fill-0, #9EA9C9)" id="Vector_25" />
              <path d={svgPaths.p2d941300} fill="var(--fill-0, #9EA9C9)" id="Vector_26" />
              <path d={svgPaths.p248be500} fill="var(--fill-0, #9EA9C9)" id="Vector_27" />
              <path d={svgPaths.p28812000} fill="var(--fill-0, #B28AFD)" id="Vector_28" />
              <path d={svgPaths.p267a7460} fill="var(--fill-0, #9EA9C9)" id="Vector_29" />
              <path d={svgPaths.p12bab40} fill="var(--fill-0, #9EA9C9)" id="Vector_30" />
              <path d={svgPaths.p1b726800} fill="var(--fill-0, #72D561)" id="Vector_31" />
              <path d={svgPaths.p17db3900} fill="var(--fill-0, #9EA9C9)" id="Vector_32" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2205 10.8319">
        <g id="Group">
          <path d={svgPaths.p200b4100} fill="var(--fill-0, #50B069)" id="Vector" />
          <path d={svgPaths.p2fbef500} fill="var(--fill-0, #5EC363)" id="Vector_2" />
          <path d={svgPaths.p8d2ad00} fill="var(--fill-0, #72D561)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute inset-[33.58%_3.29%_44.94%_59.67%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8159 8.59165">
        <g id="Group">
          <path d={svgPaths.p7e3fc00} fill="var(--fill-0, #78E75A)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.pc905f80} fill="var(--fill-0, #72D561)" id="Vector_2" />
            <path d={svgPaths.p5039800} fill="var(--fill-0, #78E75A)" id="Vector_3" />
            <path d={svgPaths.p2e9c2780} fill="var(--fill-0, #78E75A)" id="Vector_4" />
            <path d={svgPaths.p3b61e470} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p2078d900} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p21a3a80} fill="var(--fill-0, #72D561)" id="Vector_7" />
            <path d={svgPaths.p21afe570} fill="var(--fill-0, #78E75A)" id="Vector_8" />
          </g>
          <path d={svgPaths.p30cbd500} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.pd94f780} fill="var(--fill-0, #78E75A)" id="Vector_10" />
          <path d={svgPaths.p190ab200} fill="var(--fill-0, #78E75A)" id="Vector_11" />
          <path d={svgPaths.p31292e80} fill="var(--fill-0, #78E75A)" id="Vector_12" />
          <path d={svgPaths.p1fb1a100} fill="var(--fill-0, #72D561)" id="Vector_13" />
          <path d={svgPaths.pafda700} fill="var(--fill-0, #78E75A)" id="Vector_14" />
        </g>
      </svg>
    </div>
  );
}

function Group40() {
  return (
    <div className="absolute contents inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <Group38 />
      <Group39 />
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute inset-[39.13%_12.84%_50.49%_69.22%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.17735 4.15028">
        <g id="Group">
          <path d={svgPaths.p2c7e0700} fill="var(--fill-0, #F45170)" id="Vector" />
          <path d={svgPaths.p33eae180} fill="var(--fill-0, #F45170)" id="Vector_2" />
          <path d={svgPaths.p2c3ac400} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group42() {
  return (
    <div className="absolute contents inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <Group40 />
      <Group41 />
    </div>
  );
}

function Group43() {
  return (
    <div className="absolute inset-[47.2%_26.82%_46.94%_69.2%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.59089 2.34575">
        <g id="Group">
          <path d={svgPaths.p25d7ba00} fill="var(--fill-0, #DF3260)" id="Vector" />
          <g id="Vector_2"></g>
          <path d={svgPaths.p2b48fc00} fill="var(--fill-0, #E9E7FC)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group44() {
  return (
    <div className="absolute contents inset-[32.57%_1.53%_40.35%_57.92%]" data-name="Group">
      <Group42 />
      <div className="absolute inset-[42.23%_19.36%_44.88%_58.45%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.87629 5.15902">
          <path d={svgPaths.p15b56d00} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[48.92%_16.75%_42.06%_67.74%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.20728 3.60761">
          <path d={svgPaths.p1c570800} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[50.19%_2.47%_43.85%_87.27%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.10432 2.38518">
          <path d={svgPaths.p30df1a70} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[52.67%_4.62%_41.36%_85.12%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.10432 2.38518">
          <path d={svgPaths.p2e6e780} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <Group43 />
    </div>
  );
}

function Group45() {
  return (
    <div className="absolute inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2205 10.8317">
        <g id="Group">
          <path d={svgPaths.p19cd6380} fill="var(--fill-0, #50B069)" id="Vector" />
          <path d={svgPaths.pe56c380} fill="var(--fill-0, #5EC363)" id="Vector_2" />
          <path d={svgPaths.p8d2ad00} fill="var(--fill-0, #72D561)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute inset-[27.91%_3.29%_50.61%_59.67%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.8159 8.59165">
        <g id="Group">
          <path d={svgPaths.p1ee41400} fill="var(--fill-0, #78E75A)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p3f5ccd00} fill="var(--fill-0, #72D561)" id="Vector_2" />
            <path d={svgPaths.p3ac93b80} fill="var(--fill-0, #78E75A)" id="Vector_3" />
            <path d={svgPaths.p3e78cd00} fill="var(--fill-0, #78E75A)" id="Vector_4" />
            <path d={svgPaths.p1de5cb00} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p32430200} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.paaf7900} fill="var(--fill-0, #72D561)" id="Vector_7" />
            <path d={svgPaths.p2b641900} fill="var(--fill-0, #78E75A)" id="Vector_8" />
          </g>
          <path d={svgPaths.p2a4a3180} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p3aba5620} fill="var(--fill-0, #78E75A)" id="Vector_10" />
          <path d={svgPaths.p23583700} fill="var(--fill-0, #78E75A)" id="Vector_11" />
          <path d={svgPaths.p1f953900} fill="var(--fill-0, #78E75A)" id="Vector_12" />
          <path d={svgPaths.p2b7b0500} fill="var(--fill-0, #72D561)" id="Vector_13" />
          <path d={svgPaths.pafda700} fill="var(--fill-0, #78E75A)" id="Vector_14" />
        </g>
      </svg>
    </div>
  );
}

function Group47() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <Group45 />
      <Group46 />
    </div>
  );
}

function Group48() {
  return (
    <div className="absolute inset-[33.46%_12.84%_56.16%_69.22%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.17735 4.14948">
        <g id="Group">
          <path d={svgPaths.p35ef3500} fill="var(--fill-0, #F45170)" id="Vector" />
          <path d={svgPaths.p5ba4e00} fill="var(--fill-0, #F45170)" id="Vector_2" />
          <path d={svgPaths.p3e8ebb00} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group49() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <Group47 />
      <Group48 />
    </div>
  );
}

function Group50() {
  return (
    <div className="absolute inset-[41.53%_26.82%_52.6%_69.2%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.59091 2.34575">
        <g id="Group">
          <path d={svgPaths.p3001aff0} fill="var(--fill-0, #DF3260)" id="Vector" />
          <g id="Vector_2"></g>
          <path d={svgPaths.p3352c000} fill="var(--fill-0, #E9E7FC)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group51() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_46.02%_57.92%]" data-name="Group">
      <Group49 />
      <div className="absolute inset-[36.56%_19.36%_50.54%_58.45%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.87629 5.15902">
          <path d={svgPaths.p1e068700} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[43.25%_16.75%_47.73%_67.74%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.20728 3.60761">
          <path d={svgPaths.p1cab9100} fill="var(--fill-0, #4B9534)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[44.52%_2.47%_49.52%_87.27%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.10432 2.38518">
          <path d={svgPaths.pf328f00} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[47%_4.62%_47.03%_85.12%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.10432 2.38518">
          <path d={svgPaths.p1e70f900} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <Group50 />
    </div>
  );
}

function Group52() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_40.35%_57.92%]" data-name="Group">
      <Group44 />
      <Group51 />
    </div>
  );
}

function Group53() {
  return (
    <div className="absolute contents inset-[26.9%_1.53%_5.67%_7.64%]" data-name="Group">
      <Group37 />
      <div className="absolute inset-[26.9%_1.53%_40.36%_57.93%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.2149 13.0983">
          <path d={svgPaths.p6913900} fill="var(--fill-0, #50B069)" id="Vector" />
        </svg>
      </div>
      <Group52 />
    </div>
  );
}

function Group54() {
  return (
    <div className="absolute inset-[3.77%_50.16%_44.38%_1.33%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4032 20.7403">
        <g id="Group">
          <path d={svgPaths.pd4c8e00} fill="var(--fill-0, #6BB4F9)" id="Vector" />
          <g id="Group_2">
            <g id="Group_3">
              <path d={svgPaths.p27f44700} fill="var(--fill-0, #6F93F1)" id="Vector_2" />
              <path d={svgPaths.pe71b300} fill="var(--fill-0, #6BB4F9)" id="Vector_3" />
              <path d={svgPaths.p35c56000} fill="var(--fill-0, #6F93F1)" id="Vector_4" />
              <path d={svgPaths.p23be6000} fill="var(--fill-0, #6BB4F9)" id="Vector_5" />
              <path d={svgPaths.pb4edb00} fill="var(--fill-0, #6F93F1)" id="Vector_6" />
              <path d={svgPaths.p27cfba00} fill="var(--fill-0, #6F93F1)" id="Vector_7" />
              <path d={svgPaths.p5736d80} fill="var(--fill-0, #656FEA)" id="Vector_8" />
              <path d={svgPaths.p1178a900} fill="var(--fill-0, #6BB4F9)" id="Vector_9" />
            </g>
            <path d={svgPaths.p415ea00} fill="var(--fill-0, #6BB4F9)" id="Vector_10" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group55() {
  return (
    <div className="absolute contents inset-[3.77%_1.53%_5.66%_1.33%]" data-name="Group">
      <Group36 />
      <Group53 />
      <div className="absolute inset-[3.77%_50.16%_44.38%_1.33%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.404 20.7401">
          <path d={svgPaths.p14abf600} fill="var(--fill-0, #656FEA)" id="Vector" />
        </svg>
      </div>
      <Group54 />
    </div>
  );
}

function Group56() {
  return (
    <div className="absolute inset-[76.3%_69.54%_4.84%_3.65%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.7237 7.54412">
        <g id="Group">
          <path d={svgPaths.p2af11e00} fill="var(--fill-0, #FFD06C)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p263388a0} fill="var(--fill-0, #F9A83D)" id="Vector_2" />
            <path d={svgPaths.p14ca2800} fill="var(--fill-0, #FFD06C)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group57() {
  return (
    <div className="absolute inset-[76.3%_76.84%_8.18%_10.97%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.87519 6.20832">
        <g id="Group" opacity="0.25">
          <path d={svgPaths.p323ef280} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p38c46100} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group58() {
  return (
    <div className="absolute contents inset-[3.77%_1.53%_4.84%_1.33%]" data-name="Group">
      <Group55 />
      <Group56 />
      <div className="absolute inset-[80.24%_76.31%_12.12%_10.43%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.30313 3.05286">
          <path d={svgPaths.p3feedb00} fill="var(--fill-0, #F9A83D)" id="Vector" />
        </svg>
      </div>
      <Group57 />
    </div>
  );
}

function Group59() {
  return (
    <div className="absolute inset-[3.77%_50.16%_83.4%_49.24%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.240293 5.12919">
        <g id="Group">
          <path d={svgPaths.p1cb0c500} fill="var(--fill-0, #656FEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function X() {
  return (
    <div className="absolute contents inset-[3.77%_1.53%_4.84%_1.33%]" data-name="_x32_">
      <Group58 />
      <div className="absolute inset-[9.6%_50.45%_83.4%_37.43%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.84938 2.80045">
          <path d="M4.84938 2.80045L0 0Z" fill="var(--fill-0, #6F93F1)" id="Vector" />
        </svg>
      </div>
      <Group59 />
      <div className="absolute inset-[3.77%_50.47%_83.72%_37.12%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.9655 5.00259">
          <path d={svgPaths.p30386600} fill="var(--fill-0, #6BB4F9)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Layer2() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[40px]" data-name="Layer_1">
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

function Frame101() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Tài chính</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group11 />
      <Frame101 />
    </div>
  );
}

function Layer3() {
  return (
    <div className="[grid-area:1_/_1] h-[40px] ml-0 mt-0 relative w-[39.998px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.9977 40">
        <g clipPath="url(#clip0_239_1608)" id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p55ff000} fill="var(--fill-0, #C4D3E4)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3ce93080} fill="var(--fill-0, #A1B7D1)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p315e3780} fill="var(--fill-0, #EAF6FF)" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p17fef300} fill="var(--fill-0, #C4D3E4)" fillRule="evenodd" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p11b31400} fill="var(--fill-0, #60B7FF)" fillRule="evenodd" id="Vector_5" />
          <path clipRule="evenodd" d={svgPaths.p29759a00} fill="var(--fill-0, #D8ECFE)" fillRule="evenodd" id="Vector_6" />
          <path clipRule="evenodd" d={svgPaths.pb22a380} fill="var(--fill-0, #60B7FF)" fillRule="evenodd" id="Vector_7" />
          <g id="Group">
            <path d={svgPaths.pa627580} fill="var(--fill-0, #C4D3E4)" id="Vector_8" />
            <path d={svgPaths.p370bd000} fill="var(--fill-0, #C4D3E4)" id="Vector_9" />
            <path d={svgPaths.p24175d80} fill="var(--fill-0, #C4D3E4)" id="Vector_10" />
            <path d={svgPaths.p1f9a0880} fill="var(--fill-0, #C4D3E4)" id="Vector_11" />
            <path d={svgPaths.p2b677800} fill="var(--fill-0, #C4D3E4)" id="Vector_12" />
            <path d={svgPaths.p1770fa40} fill="var(--fill-0, #C4D3E4)" id="Vector_13" />
            <path d={svgPaths.pa556100} fill="var(--fill-0, #C4D3E4)" id="Vector_14" />
            <path d={svgPaths.p14b20600} fill="var(--fill-0, #C4D3E4)" id="Vector_15" />
            <path d={svgPaths.p30d97800} fill="var(--fill-0, #C4D3E4)" id="Vector_16" />
            <path d={svgPaths.p246b8b00} fill="var(--fill-0, #C4D3E4)" id="Vector_17" />
          </g>
          <g id="Group_2">
            <path d={svgPaths.pe4b2140} fill="var(--fill-0, #6BA7FF)" id="Vector_18" />
            <path d={svgPaths.p3f1f2b00} fill="var(--fill-0, #6BA7FF)" id="Vector_19" />
            <path d={svgPaths.p63be900} fill="var(--fill-0, #6BA7FF)" id="Vector_20" />
            <path d={svgPaths.p29eab700} fill="var(--fill-0, #6BA7FF)" id="Vector_21" />
            <path d={svgPaths.p1b6c7040} fill="var(--fill-0, #6BA7FF)" id="Vector_22" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p3bdafc00} fill="var(--fill-0, #A1B7D1)" id="Vector_23" />
            <path d={svgPaths.p1485be00} fill="var(--fill-0, #A1B7D1)" id="Vector_24" />
            <path d={svgPaths.p3c307c00} fill="var(--fill-0, #A1B7D1)" id="Vector_25" />
            <path d={svgPaths.p11dccf00} fill="var(--fill-0, #A1B7D1)" id="Vector_26" />
            <path d={svgPaths.p14fcdc80} fill="var(--fill-0, #A1B7D1)" id="Vector_27" />
            <path d={svgPaths.p360fed00} fill="var(--fill-0, #A1B7D1)" id="Vector_28" />
            <path d={svgPaths.p22bce880} fill="var(--fill-0, #A1B7D1)" id="Vector_29" />
            <path d={svgPaths.p2527c300} fill="var(--fill-0, #A1B7D1)" id="Vector_30" />
            <path d={svgPaths.pfd21400} fill="var(--fill-0, #A1B7D1)" id="Vector_31" />
            <path d={svgPaths.p24caff00} fill="var(--fill-0, #A1B7D1)" id="Vector_32" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p34e58700} fill="var(--fill-0, #3B97E3)" fillRule="evenodd" id="Vector_33" />
        </g>
        <defs>
          <clipPath id="clip0_239_1608">
            <rect fill="white" height="40" width="39.9977" />
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

function Frame104() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Bảo hiểm</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group16 />
      <Frame104 />
    </div>
  );
}

function Capa2() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="Capa_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_239_1570)" id="Capa_1">
          <path d={svgPaths.p11c9d00} fill="var(--fill-0, #FF7043)" id="Vector" />
          <path d={svgPaths.p9c8db00} fill="var(--fill-0, #FF5722)" id="Vector_2" />
          <path d={svgPaths.p15069280} fill="var(--fill-0, #EDDBB9)" id="Vector_3" />
          <path d={svgPaths.p158a1180} fill="var(--fill-0, #E0CFAF)" id="Vector_4" />
          <path d={svgPaths.p2df70600} fill="var(--fill-0, #FBF2DF)" id="Vector_5" />
          <path d={svgPaths.p22b95540} fill="var(--fill-0, #EDDBB9)" id="Vector_6" />
          <path d={svgPaths.p17325b00} fill="var(--fill-0, #F2E5CE)" id="Vector_7" />
          <path d={svgPaths.p38f4b500} fill="var(--fill-0, #78909C)" id="Vector_8" />
          <path d={svgPaths.p27b85780} fill="var(--fill-0, #FF7043)" id="Vector_9" />
          <path d={svgPaths.p2fa5a700} fill="var(--fill-0, #80DEEA)" id="Vector_10" />
          <path d={svgPaths.p2d5e8f00} fill="var(--fill-0, #4DD0E1)" id="Vector_11" />
          <path d={svgPaths.p1f9afc00} fill="var(--fill-0, #78909C)" id="Vector_12" />
          <path d={svgPaths.pec97180} fill="var(--fill-0, #607D8B)" id="Vector_13" />
          <path d={svgPaths.p3af8d00} fill="var(--fill-0, #78909C)" id="Vector_14" />
          <path d={svgPaths.p14a16300} fill="var(--fill-0, #607D8B)" id="Vector_15" />
        </g>
        <defs>
          <clipPath id="clip0_239_1570">
            <rect fill="white" height="40" width="40" />
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

function Frame105() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Giáo dục</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group13 />
      <Frame105 />
    </div>
  );
}

function Layer1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="Layer_2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_239_1543)" id="Layer_2">
          <path d={svgPaths.p28d63200} fill="var(--fill-0, #529DF3)" id="Vector" />
          <path d={svgPaths.p34e01800} fill="var(--fill-0, #050B54)" id="Vector_2" />
          <path d={svgPaths.p2f421700} fill="var(--fill-0, #23308C)" id="Vector_3" />
          <path d={svgPaths.p24b629a0} fill="var(--fill-0, #050B54)" id="Vector_4" />
          <path d={svgPaths.p5fb1300} fill="var(--fill-0, #23308C)" id="Vector_5" />
          <path d={svgPaths.p1ec14a00} fill="var(--fill-0, #050B54)" id="Vector_6" />
          <path d={svgPaths.pd1d9e00} fill="var(--fill-0, #FFFDFE)" id="Vector_7" />
          <path d={svgPaths.p2f65e680} fill="var(--fill-0, #529DF3)" id="Vector_8" />
          <path d={svgPaths.pdc05400} fill="var(--fill-0, #050B54)" id="Vector_9" />
          <path d={svgPaths.p3f01c400} fill="var(--fill-0, #050B54)" id="Vector_10" />
          <path d={svgPaths.p28f05680} fill="var(--fill-0, #FFFFFD)" id="Vector_11" />
          <path d={svgPaths.p14b93f00} fill="var(--fill-0, #050B54)" id="Vector_12" />
          <path d={svgPaths.p24fa0580} fill="var(--fill-0, #23308C)" id="Vector_13" />
          <path d={svgPaths.p2af7f480} fill="var(--fill-0, #23308C)" id="Vector_14" />
          <path d={svgPaths.p122d2f80} fill="var(--fill-0, #050B54)" id="Vector_15" />
          <g id="Group">
            <path d={svgPaths.p215b600} fill="var(--fill-0, #529DF3)" id="Vector_16" />
            <path d={svgPaths.p32163d00} fill="var(--fill-0, #529DF3)" id="Vector_17" />
            <path d={svgPaths.p8cb9900} fill="var(--fill-0, #529DF3)" id="Vector_18" />
          </g>
          <path d={svgPaths.p204e3100} fill="var(--fill-0, #23308C)" id="Vector_19" />
          <path d={svgPaths.p1308de80} fill="var(--fill-0, #050B54)" id="Vector_20" />
          <path d={svgPaths.p17e20700} fill="var(--fill-0, #27266A)" id="Vector_21" />
          <path d={svgPaths.p2cc70400} fill="var(--fill-0, #050B54)" id="Vector_22" />
          <path d={svgPaths.p718980} fill="var(--fill-0, #030955)" id="Vector_23" />
          <path d={svgPaths.p231d2af0} fill="var(--fill-0, #529DF3)" id="Vector_24" />
        </g>
        <defs>
          <clipPath id="clip0_239_1543">
            <rect fill="white" height="40" width="40" />
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

function Frame106() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Ô tô</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group8 />
      <Frame106 />
    </div>
  );
}

function Layer4() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_239_1531)" id="Layer_1">
          <path d={svgPaths.p1c86fc00} fill="var(--fill-0, #C5E5F4)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p2a6a0c00} fill="var(--fill-0, #1A4D7C)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2bd00b00} fill="var(--fill-0, #0C3159)" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p15783d20} fill="var(--fill-0, #ED6529)" fillRule="evenodd" id="Vector_4" />
          <path clipRule="evenodd" d={svgPaths.p2f9a6180} fill="var(--fill-0, #1F4F7F)" fillRule="evenodd" id="Vector_5" />
          <path clipRule="evenodd" d={svgPaths.p1890af80} fill="var(--fill-0, #1F4F7F)" fillRule="evenodd" id="Vector_6" />
          <g id="Group">
            <path d={svgPaths.p24b08900} fill="var(--fill-0, white)" id="Vector_7" />
            <path d={svgPaths.p16a14100} fill="var(--fill-0, white)" id="_1" />
            <path d={svgPaths.p14a1e600} fill="var(--fill-0, white)" id="_2" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_239_1531">
            <rect fill="white" height="40" width="40" />
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

function Frame107() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Dịch vụ B2B</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-white content-stretch flex h-[56px] items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group15 />
      <Frame107 />
    </div>
  );
}

function Layer5() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[40px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g clipPath="url(#clip0_239_1648)" id="Layer_1">
          <path d={svgPaths.p2da9f80} fill="var(--fill-0, #C4E2F2)" id="Vector" />
          <path d={svgPaths.p3eeded00} fill="var(--fill-0, #2D303B)" id="Vector_2" />
          <path d={svgPaths.p53dd200} fill="var(--fill-0, #3C3F4D)" id="Vector_3" />
          <path d={svgPaths.p3b3a7900} fill="var(--fill-0, #3C3F4D)" id="Vector_4" />
          <path d={svgPaths.pafc7500} fill="var(--fill-0, #2D303B)" id="Vector_5" />
          <path d={svgPaths.p3e4af780} fill="var(--fill-0, #83B2C6)" id="Vector_6" />
          <path d={svgPaths.p1dd69300} fill="var(--fill-0, #1F81A3)" id="Vector_7" />
          <path d={svgPaths.pbfeaf0} fill="var(--fill-0, #2C92BF)" id="Vector_8" />
          <path d={svgPaths.p78c2800} fill="var(--fill-0, #1F81A3)" id="Vector_9" />
          <path d={svgPaths.p3f13f700} fill="var(--fill-0, #2C92BF)" id="Vector_10" />
          <path d={svgPaths.p19cbc5f0} fill="var(--fill-0, #3C3F4D)" id="Vector_11" />
          <path d={svgPaths.p264cb680} fill="var(--fill-0, #2D303B)" id="Vector_12" />
          <path d={svgPaths.p19093200} fill="var(--fill-0, #FF491F)" id="Vector_13" />
          <path d={svgPaths.p34b8ea00} fill="var(--fill-0, #FFE14D)" id="Vector_14" />
          <path d={svgPaths.p1c6dce80} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p1276df00} fill="var(--fill-0, #3C3F4D)" id="Vector_16" />
          <path d={svgPaths.p26d41200} fill="var(--fill-0, #FF491F)" id="Vector_17" />
          <path d={svgPaths.p6252700} fill="var(--fill-0, #3C3F4D)" id="Vector_18" />
          <path d={svgPaths.p279e4400} fill="var(--fill-0, #FF491F)" id="Vector_19" />
          <path d={svgPaths.p1c12300} fill="var(--fill-0, #3C3F4D)" id="Vector_20" />
        </g>
        <defs>
          <clipPath id="clip0_239_1648">
            <rect fill="white" height="40" width="40" />
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

function Frame108() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">
        Thương mại
        <br aria-hidden="true" />
        điện tử
      </p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-white content-stretch flex h-[62px] items-center pl-[10px] pr-[12px] py-[8px] relative rounded-[5px] shrink-0 w-[192.5px]">
      <div aria-hidden="true" className="absolute border border-[#ccc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Group14 />
      <Frame108 />
    </div>
  );
}

function Frame109() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row justify-center size-full">
        <div className="content-start flex flex-wrap gap-[15px] items-start justify-center px-[15px] py-0 relative w-full">
          <Frame23 />
          <Frame99 />
          <Frame25 />
          <Frame26 />
          <Frame27 />
          <Frame28 />
          <Frame29 />
          <Frame30 />
          <Frame31 />
        </div>
      </div>
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

function Frame110() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-1/2 px-0 py-[30px] top-[4416px] translate-x-[-50%] w-[430px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0%, rgba(252, 249, 254, 0.05) 30%, rgba(252, 249, 254, 0.05) 70%, rgba(92, 29, 163, 0.05) 100%), linear-gradient(90deg, rgb(252, 249, 254) 0%, rgb(252, 249, 254) 100%)" }}>
      <Frame97 />
      <Frame109 />
      <ButtonCta5 />
    </div>
  );
}

function Frame111() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[30px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">
            Lý do Convertify CRM
            <br aria-hidden="true" />
            là lựa chọn hàng đầu
          </p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">5 lý do Convertify CRM là nền tảng tối ưu không thể thiếu cho các nhà quảng cáo lead</p>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute inset-[8.32%_0_8.34%_0]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.9999 41.6699">
        <g id="Icon">
          <path d={svgPaths.p2b04680} fill="var(--fill-0, #7C3AED)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Layer6() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[50px]" data-name="Layer_1">
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
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group18 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[24px] text-nowrap">Dễ dùng như Google Sheet</p>
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
    <div className="overflow-clip relative shrink-0 size-[50px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.999 49.999">
        <g id="_x34_9_x2C__Mind_Mapping_x2C__mind_mapping_x2C__analytics_x2C__business_and_finance_x2C__infographics_x2C__flow_chart">
          <path d={svgPaths.p3ef9eb00} fill="var(--fill-0, #7C3AED)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame112() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Layer7 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[24px] text-nowrap">Triển khai nhanh chóng</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame112 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Kết nối dễ dàng thông qua các nền tảng Facebook, Google, TikTok, Zalo chỉ trong vài cú nhấp chuột. Không cần cải đặt phần mềm hay cấu hình phức tạp.</p>
    </div>
  );
}

function Layer8() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[50px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g clipPath="url(#clip0_239_1514)" id="Layer_1">
          <path d={svgPaths.pf1b0700} fill="var(--fill-0, #7C3AED)" id="Vector" />
          <path d={svgPaths.p244ad480} fill="var(--fill-0, #7C3AED)" id="Vector_2" />
          <path d={svgPaths.p24b76600} fill="var(--fill-0, #7C3AED)" id="Vector_3" />
          <path d={svgPaths.p26167c0} fill="var(--fill-0, #7C3AED)" id="Vector_4" />
          <path d={svgPaths.p291faca0} fill="var(--fill-0, #7C3AED)" id="Vector_5" />
          <path d={svgPaths.p30209b00} fill="var(--fill-0, #7C3AED)" id="Vector_6" />
          <path d={svgPaths.p6c86200} fill="var(--fill-0, #7C3AED)" id="Vector_7" />
          <path d={svgPaths.p4a7f740} fill="var(--fill-0, #7C3AED)" id="Vector_8" />
          <path d={svgPaths.p10e5a730} fill="var(--fill-0, #7C3AED)" id="Vector_9" />
          <path d={svgPaths.p3408b00} fill="var(--fill-0, #7C3AED)" id="Vector_10" />
          <path d={svgPaths.p36122400} fill="var(--fill-0, #7C3AED)" id="Vector_11" />
          <path d={svgPaths.p2c658100} fill="var(--fill-0, #7C3AED)" id="Vector_12" />
        </g>
        <defs>
          <clipPath id="clip0_239_1514">
            <rect fill="white" height="50" width="50" />
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

function Frame113() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group20 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[24px] text-nowrap">Loại bỏ data rác</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame113 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Tự động phát hiện và loại trừ lead trùng, lead ảo, lead không hợp lệ, hợp nhất lịch sử khách hàng về một hồ sơ duy nhất. Giúp giảm 30 40% chi phí quảng cáo và tập trung vào những khách hàng thật sự tiềm năng.</p>
    </div>
  );
}

function Layer9() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[50px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p147f8a00} fill="var(--fill-0, #7C3AED)" fillRule="evenodd" id="Vector" />
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

function Frame114() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group17 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[24px] text-nowrap">Tăng hiệu quả quảng cáo</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame114 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Theo dõi hiệu quả từng kênh và chiến dịch, tối ưu quảng cáo để ra lead chất lượng hơn, chi phí thấp hơn.</p>
    </div>
  );
}

function Icons() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[50px]" data-name="Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 50">
        <g clipPath="url(#clip0_239_1812)" id="Icons">
          <path d={svgPaths.pca49800} fill="var(--fill-0, #7C3AED)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_239_1812">
            <rect fill="white" height="50" width="50" />
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

function Frame115() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group19 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[24px] text-nowrap">Web-based 100%</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame115 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] w-full">Nền tảng cloud-based hoạt động hoàn toàn trên trình duyệt, không cần tải về máy.Truy cập dễ dảng từ máy tính, tablet, điện thoại – làm việc mọi lúc, mọi nơi, dữ liệu luôn được đồng bộ và bảo mật.</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
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
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[20px] items-start px-[15px] py-0 relative w-full">
        <Frame38 />
        <div className="aspect-[660/990] relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-full">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle9} />
        </div>
      </div>
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

function Frame116() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-center left-1/2 pb-[30px] pt-[45px] px-0 top-[5115px] translate-x-[-50%] w-[430px]">
      <Frame111 />
      <Frame39 />
      <ButtonCta6 />
    </div>
  );
}

function Frame117() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[30px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">Lựa chọn gói dịch vụ phù hợp</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Trải nghiệm đầy đủ tính năng miễn phí và không giới hạn ngay hôm nay</p>
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
    <div className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
        </div>
      </div>
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

function Group60() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle1 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group60 />
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

function Group61() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle2 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group61 />
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

function Group62() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle3 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group62 />
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
    <div className="bg-white relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[30px] relative w-full">
        <Frame46 />
        <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#212529] text-[18px] text-nowrap uppercase">Dành cho cá nhân và startup</p>
        <ButtonCta7 />
        <Frame44 />
      </div>
    </div>
  );
}

function Frame118() {
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
    <div className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
        </div>
      </div>
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

function Group63() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle4 />
    </div>
  );
}

function Frame119() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group63 />
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

function Group64() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle5 />
    </div>
  );
}

function Frame120() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group64 />
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

function Group65() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle6 />
    </div>
  );
}

function Frame121() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group65 />
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

function Group66() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle7 />
    </div>
  );
}

function Frame122() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group66 />
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

function Group67() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle8 />
    </div>
  );
}

function Frame123() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group67 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">10 người dùng</p>
    </div>
  );
}

function Frame124() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <Frame119 />
      <Frame120 />
      <Frame121 />
      <Frame122 />
      <Frame123 />
    </div>
  );
}

function Frame125() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[30px] relative w-full">
        <Frame118 />
        <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#212529] text-[18px] text-nowrap uppercase">Dành cho doanh nghiệp nhỏ</p>
        <ButtonCta8 />
        <Frame124 />
      </div>
    </div>
  );
}

function Frame126() {
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
    <div className="bg-[#0d6efd] relative rounded-[3px] shrink-0 w-full" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative w-full">
          <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
        </div>
      </div>
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

function Group68() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle9 />
    </div>
  );
}

function Frame127() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-full">
      <Group68 />
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

function Group69() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle10 />
    </div>
  );
}

function Frame128() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group69 />
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

function Group70() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle11 />
    </div>
  );
}

function Frame129() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group70 />
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

function Group71() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle12 />
    </div>
  );
}

function Frame130() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group71 />
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

function Group72() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle13 />
    </div>
  );
}

function Frame131() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group72 />
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

function Group73() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <CheckCircle14 />
    </div>
  );
}

function Frame132() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Group73 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">30 người dùng</p>
    </div>
  );
}

function Frame133() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <Frame127 />
      <Frame128 />
      <Frame129 />
      <Frame130 />
      <Frame131 />
      <Frame132 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-white relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[30px] relative w-full">
        <Frame126 />
        <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#212529] text-[18px] text-nowrap uppercase">Dành cho doanh nghiệp vừa</p>
        <ButtonCta9 />
        <Frame133 />
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[30px] items-start px-[15px] py-0 relative w-full">
        <Frame45 />
        <Frame125 />
        <Frame47 />
      </div>
    </div>
  );
}

function Frame134() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] items-center left-1/2 pb-[45px] pt-[30px] px-0 top-[6830px] translate-x-[-50%] w-[430px]" style={{ backgroundImage: "linear-gradient(179.09deg, rgba(92, 29, 163, 0.05) 0.20468%, rgba(252, 249, 254, 0.05) 79.877%, rgba(255, 255, 255, 0.05) 99.795%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Frame117 />
      <Frame48 />
    </div>
  );
}

function Frame135() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 text-[#212529] text-center w-full">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">
        Tích hợp với các
        <br aria-hidden="true" />
        nền tảng hàng đầu
      </p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Kết nối dễ dàng với các nền tảng hàng đầu chỉ trong vài cú nhấp chuột, giúp dữ liệu đồng bộ tức thì và vận hành ổn định.</p>
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
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[177.5px]">
      <Frame56 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Zalo</p>
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
          <path d={svgPaths.p1c8f1b80} fill="var(--fill-0, #212529)" id="Vector_4" />
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

function Frame136() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Group23 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[177.5px]">
      <Frame136 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Tiktok</p>
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

function Frame137() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Group24 />
    </div>
  );
}

function Frame138() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[177.5px]">
      <Frame137 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Facebook</p>
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

function Frame139() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Group25 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[177.5px]">
      <Frame139 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">Youtube</p>
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

function Frame140() {
  return (
    <div className="aspect-[234/234] bg-white content-stretch flex items-center justify-center relative rounded-[10px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] shrink-0 w-full">
      <Layer13 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-center relative shrink-0 w-[177.5px]">
      <Frame140 />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-center text-nowrap">WooCommerce</p>
    </div>
  );
}

function Frame141() {
  return (
    <div className="content-start flex flex-wrap gap-[15px] items-start justify-center relative shrink-0 w-full">
      <Frame50 />
      <Frame55 />
      <Frame138 />
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
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-1/2 pb-[30px] pt-[45px] px-[15px] rounded-[20px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] top-[8491px] translate-x-[-50%] w-[400px]" style={{ backgroundImage: "linear-gradient(179.399deg, rgba(92, 29, 163, 0.05) 0.20468%, rgba(252, 249, 254, 0.05) 79.877%, rgba(255, 255, 255, 0.05) 99.795%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Frame135 />
      <Frame141 />
      <ButtonCta10 />
    </div>
  );
}

function Frame142() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[30px] py-0 relative text-[#212529] w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">Khách hàng nói về chúng tôi</p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Hãy lắng nghe những chia sẻ của khách hàng đã trải nghiệm dịch vụ của chúng tôi</p>
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
    <div className="relative rounded-[10px] shadow-[0px_10px_25px_-10px_rgba(33,37,41,0.15)] shrink-0 w-full" style={{ backgroundImage: "linear-gradient(179.806deg, rgba(92, 29, 163, 0.05) 0.20468%, rgba(252, 249, 254, 0.05) 79.877%, rgba(255, 255, 255, 0.05) 99.795%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
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

function Frame64() {
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

function ButtonCta11() {
  return (
    <div className="bg-[#0d6efd] content-stretch flex items-center justify-center pb-[12px] pt-[10px] px-[24px] relative rounded-[3px] shrink-0" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
    </div>
  );
}

function Frame143() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-1/2 pb-[15px] pt-[60px] px-0 top-[9511.5px] translate-x-[-50%] w-[430px]">
      <Frame142 />
      <Frame64 />
      <ButtonCta11 />
    </div>
  );
}

function Frame144() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center justify-center px-[30px] py-0 relative text-[#212529] text-center w-full">
          <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">
            Những câu hỏi
            <br aria-hidden="true" />
            thường gặp
          </p>
          <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Tổng hợp thắc mắc thường gặp, giúp bạn hiểu rõ hơn về dịch vụ của chúng tôi.</p>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[18px] w-full" start="1">
        <li className="ms-[27px]">
          <span className="leading-[normal]">Lorem ipsum dolor sit amet consectetur?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Lorem ipsum dolor sit amet consectetur. Egestas at commodo elit lacus diam scelerisque. Amet lectus nisl dolor ullamcorper placerat enim in egestas nullam. Commodo habitasse massa commodo fames sapien leo condimentum malesuada.</p>
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[18px] w-full" start="2">
        <li className="ms-[27px]">
          <span className="leading-[normal]">Lorem ipsum dolor sit amet consectetur?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Lorem ipsum dolor sit amet consectetur. Egestas at commodo elit lacus diam scelerisque. Amet lectus nisl dolor ullamcorper placerat enim in egestas nullam. Commodo habitasse massa commodo fames sapien leo condimentum malesuada.</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[18px] w-full" start="3">
        <li className="ms-[27px]">
          <span className="leading-[normal]">Lorem ipsum dolor sit amet consectetur?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Lorem ipsum dolor sit amet consectetur. Egestas at commodo elit lacus diam scelerisque. Amet lectus nisl dolor ullamcorper placerat enim in egestas nullam. Commodo habitasse massa commodo fames sapien leo condimentum malesuada.</p>
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[18px] w-full" start="4">
        <li className="ms-[27px]">
          <span className="leading-[normal]">Lorem ipsum dolor sit amet consectetur?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Lorem ipsum dolor sit amet consectetur. Egestas at commodo elit lacus diam scelerisque. Amet lectus nisl dolor ullamcorper placerat enim in egestas nullam. Commodo habitasse massa commodo fames sapien leo condimentum malesuada.</p>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[18px] w-full" start="5">
        <li className="ms-[27px]">
          <span className="leading-[normal]">Lorem ipsum dolor sit amet consectetur?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Lorem ipsum dolor sit amet consectetur. Egestas at commodo elit lacus diam scelerisque. Amet lectus nisl dolor ullamcorper placerat enim in egestas nullam. Commodo habitasse massa commodo fames sapien leo condimentum malesuada.</p>
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <ol className="block font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[0] list-decimal relative shrink-0 text-[#212529] text-[18px] w-full" start="6">
        <li className="ms-[27px]">
          <span className="leading-[normal]">Lorem ipsum dolor sit amet consectetur?</span>
        </li>
      </ol>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#757575] text-[16px] w-full">Lorem ipsum dolor sit amet consectetur. Egestas at commodo elit lacus diam scelerisque. Amet lectus nisl dolor ullamcorper placerat enim in egestas nullam. Commodo habitasse massa commodo fames sapien leo condimentum malesuada.</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[20px] items-start px-[30px] py-0 relative w-full">
        <Frame65 />
        <Frame66 />
        <Frame67 />
        <Frame68 />
        <Frame69 />
        <Frame70 />
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-center left-1/2 px-0 py-[45px] top-[10161.5px] translate-x-[-50%] w-[430px]">
      <Frame144 />
      <Frame71 />
    </div>
  );
}

function IsolationMode1() {
  return (
    <div className="h-[624.19px] relative w-[1045px]" data-name="Isolation_Mode">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1045 624.19">
        <g clipPath="url(#clip0_239_1450)" id="Isolation_Mode" opacity="0.2">
          <path d={svgPaths.p2089f800} fill="var(--fill-0, #FCF9FE)" id="Vector" opacity="0.36" />
          <path d={svgPaths.p31241300} fill="var(--fill-0, #FCF9FE)" id="Vector_2" opacity="0.5" />
        </g>
        <defs>
          <clipPath id="clip0_239_1450">
            <rect fill="white" height="624.19" width="1045" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame145() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0 text-center text-white w-full">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[32px] w-full">
        Hãy trải nghiệm Convertify CRM
        <br aria-hidden="true" />
        để bứt phá doanh số ngay hôm nay
      </p>
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Chỉ cần vài nhấp chuột để bắt đầu</p>
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

function Frame146() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] h-[85px] items-center relative shrink-0 w-full">
      <ButtonCta12 />
      <p className="font-['Rubik:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[16px] text-center text-white w-[min-content]">Miễn phí mọi tính năng, dễ dùng trong 5 phút</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="absolute bg-[#7c3aed] content-stretch flex flex-col gap-[15px] items-start left-[15px] overflow-clip pb-[30px] pt-[40px] px-[15px] rounded-[20px] top-[11747.5px] w-[400px]">
      <div className="absolute flex h-[624.19px] items-center justify-center left-[-452px] top-[-199px] w-[1045px]">
        <div className="flex-none rotate-[180deg]">
          <IsolationMode1 />
        </div>
      </div>
      <Frame145 />
      <Frame146 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents left-[15px] top-[11747.5px]">
      <Frame52 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="[grid-area:1_/_1_/_auto_/_span_2] content-stretch flex flex-col gap-[30px] items-start relative shrink-0">
      <div className="h-[50px] relative rounded-[5px] shrink-0 w-[231px]" data-name="Convertify_logo-full-light-02 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[5px]">
          <img alt="" className="absolute h-[403.78%] left-[-17.42%] max-w-none top-[-147.09%] w-[130.96%]" src={imgConvertifyLogoFullLight022} />
        </div>
      </div>
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#212529] text-[16px] w-[min-content]">Convertify CRM là nền tảng quản lý quảng cáo đa kênh và CRM toàn diện, giúp doanh nghiệp tối ưu hiệu suất quảng cáo và tăng tỷ lệ chuyển đổi lead thành khách hàng.</p>
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex flex-col font-['Rubik:Regular',sans-serif] font-normal gap-[8px] items-start justify-end leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap w-full">
      <p className="relative shrink-0">About Us</p>
      <p className="relative shrink-0">Careers</p>
      <p className="relative shrink-0">Our Blog</p>
      <p className="relative shrink-0">Contact Us</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="[grid-area:2_/_1] content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-nowrap">Company</p>
      <Frame73 />
    </div>
  );
}

function Frame147() {
  return (
    <div className="content-stretch flex flex-col font-['Rubik:Regular',sans-serif] font-normal gap-[8px] items-start justify-end leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap w-full">
      <p className="relative shrink-0">Integration</p>
      <p className="relative shrink-0">Customers</p>
      <p className="relative shrink-0">Pricing</p>
      <p className="relative shrink-0">Help Center</p>
    </div>
  );
}

function Frame75() {
  return (
    <div className="[grid-area:2_/_2] content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-nowrap">Product</p>
      <Frame147 />
    </div>
  );
}

function Frame148() {
  return (
    <div className="content-stretch flex flex-col font-['Rubik:Regular',sans-serif] font-normal gap-[8px] items-start justify-end leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap w-full">
      <p className="relative shrink-0">Terms of Use</p>
      <p className="relative shrink-0">Privacy Policy</p>
      <p className="relative shrink-0">Cookies Policy</p>
      <p className="relative shrink-0">Site Map</p>
    </div>
  );
}

function Frame76() {
  return (
    <div className="[grid-area:3_/_1] content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-nowrap">Legal</p>
      <Frame148 />
    </div>
  );
}

function Layer14() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[21px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g clipPath="url(#clip0_239_1447)" id="Layer_1">
          <rect fill="#1DA1F2" height="21" width="21" />
          <path d={svgPaths.p3fc24400} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_239_1447">
            <rect fill="white" height="21" width="21" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group26() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[8.4px] mt-[7px] place-items-start relative">
      <Layer14 />
    </div>
  );
}

function Group31() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[35px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
          <circle cx="17.5" cy="17.5" fill="var(--fill-0, #1DA1F2)" id="Ellipse 2" r="17.5" />
        </svg>
      </div>
      <Group26 />
    </div>
  );
}

function Layer15() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[35px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g clipPath="url(#clip0_239_1437)" id="Layer_1">
          <path clipRule="evenodd" d={svgPaths.p39edfd00} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1919b4c0} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector_2" opacity="0.1" />
          <path clipRule="evenodd" d={svgPaths.p1d874180} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1763200} fill="var(--fill-0, #1C74F4)" id="Vector_4" />
          <path d={svgPaths.p30ef5bd0} fill="var(--fill-0, #1C74F4)" id="Vector_5" />
          <path d={svgPaths.p268cf200} fill="var(--fill-0, #1C74F4)" id="Vector_6" />
          <path d={svgPaths.p37468cc0} fill="var(--fill-0, #1C74F4)" id="Vector_7" />
          <path d={svgPaths.p14315880} fill="var(--fill-0, #1C74F4)" id="Vector_8" />
        </g>
        <defs>
          <clipPath id="clip0_239_1437">
            <rect fill="white" height="35" width="35" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group74() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer15 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative rounded-[17.5px] shrink-0 size-[35px]">
      <Group74 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[35px]" data-name="svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
        <g clipPath="url(#clip0_239_1892)" id="svg">
          <path clipRule="evenodd" d={svgPaths.p3fadcf80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p11752000} fill="var(--fill-0, #1C74F4)" fillRule="evenodd" id="Vector_2" />
          <g id="Vector_3"></g>
          <path clipRule="evenodd" d={svgPaths.p1a9a8500} fill="var(--fill-0, #4D98F4)" fillRule="evenodd" id="Vector_4" />
        </g>
        <defs>
          <clipPath id="clip0_239_1892">
            <rect fill="white" height="35" width="35" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group75() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Svg1 />
    </div>
  );
}

function Frame80() {
  return (
    <div className="bg-[#d9d9d9] content-stretch flex items-center overflow-clip relative rounded-[17.5px] shrink-0 size-[35px]">
      <Group75 />
    </div>
  );
}

function Layer16() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[21px]" data-name="Layer_1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
        <g id="Layer_1">
          <path d={svgPaths.p2542c800} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p1ad3a980} fill="var(--fill-0, #FF0033)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group76() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Layer16 />
    </div>
  );
}

function Frame81() {
  return (
    <div className="bg-[#f03] content-stretch flex items-center overflow-clip p-[7px] relative rounded-[17.5px] shrink-0 size-[35px]">
      <Group76 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Group31 />
      <Frame79 />
      <Frame80 />
      <Frame81 />
    </div>
  );
}

function Frame149() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-end relative shrink-0 w-full">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#212529] text-[16px] text-nowrap">info@convertify.vn</p>
      <Frame82 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="[grid-area:3_/_2] content-stretch flex flex-col gap-[15px] items-start pb-0 pt-[9px] px-0 relative shrink-0">
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#212529] text-[18px] text-nowrap">Connect With Us</p>
      <Frame149 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="gap-[15px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_fit-content(100%))] relative shrink-0 w-full">
      <Frame72 />
      <Frame74 />
      <Frame75 />
      <Frame76 />
      <Frame77 />
    </div>
  );
}

function Frame150() {
  return (
    <div className="content-stretch flex font-['Rubik:Regular',sans-serif] font-normal gap-[15px] h-[26px] items-center justify-end leading-[25px] relative shrink-0 text-[#757575] text-[16px] text-nowrap">
      <p className="relative shrink-0">About Us</p>
      <p className="relative shrink-0">Blog</p>
      <p className="relative shrink-0">Careers</p>
      <p className="relative shrink-0">Contact Us</p>
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['Rubik:Regular',sans-serif] font-normal leading-[25px] min-w-full relative shrink-0 text-[#757575] text-[16px] w-[min-content]">Copyright 2025 © Convertify. All right reserved</p>
      <Frame150 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[30px] items-center left-1/2 pb-[70px] pt-[50px] px-[15px] top-[12113.5px] translate-x-[-50%] w-[430px]">
      <Frame78 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(204, 204, 204, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 1">
            <line id="Line 2" stroke="var(--stroke-0, #CCCCCC)" x2="400" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame83 />
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
    <div className="absolute bg-[#0d6efd] bottom-0 content-stretch flex gap-[10px] h-[60px] items-center justify-center left-1/2 pb-[12px] pt-[10px] px-[24px] rounded-tl-[10px] rounded-tr-[10px] translate-x-[-50%] w-[430px]" data-name="Button CTA">
      <div aria-hidden="true" className="absolute border border-[#0d6efd] border-solid inset-0 pointer-events-none rounded-tl-[10px] rounded-tr-[10px] shadow-[0px_-1px_4px_-1px_rgba(12,12,13,0.1),0px_-1px_4px_-1px_rgba(12,12,13,0.05)]" />
      <p className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[18px] text-nowrap text-white">Dùng thử miễn phí</p>
      <Group30 />
    </div>
  );
}

function Time() {
  return (
    <div className="content-stretch flex h-[22px] items-center justify-center pb-0 pt-[1.5px] px-0 relative shrink-0 w-[100px]" data-name="Time">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black text-center text-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        9:41
      </p>
    </div>
  );
}

function Levels() {
  return (
    <div className="h-[22px] relative shrink-0 w-[100px]" data-name="Levels">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 22">
        <g id="Levels">
          <path clipRule="evenodd" d={svgPaths.p3992e840} fill="var(--fill-0, black)" fillRule="evenodd" id="Cellular Connection" />
          <path clipRule="evenodd" d={svgPaths.p506bf00} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
          <g id="Frame">
            <rect height="12" id="Border" opacity="0.35" rx="3.8" stroke="var(--stroke-0, black)" width="24" x="61.5068" y="5.5" />
            <path d={svgPaths.p33adc200} fill="var(--fill-0, black)" id="Cap" opacity="0.4" />
            <rect fill="var(--fill-0, black)" height="9" id="Capacity" rx="2.5" width="21" x="63.0068" y="7" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatusBarIPhone() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[154px] items-center justify-center left-1/2 pb-[19px] pt-[21px] px-[24px] top-0 translate-x-[-50%] w-[430px]" data-name="Status bar - iPhone">
      <Time />
      <Levels />
    </div>
  );
}

export default function LandingPageMobile() {
  return (
    <div className="bg-white relative size-full" data-name="Landing Page - Mobile">
      <ButtonCta13 />
      <StatusBarIPhone />
      <MobileHero />
      <MobileHeader />
      <Frame12 />
      <Frame13 />
      <Frame110 />
      <Frame116 />
      <Frame134 />
      <Frame49 />
      <Frame143 />
      <div className="absolute h-0 left-1/2 top-[1844px] translate-x-[-50%] w-[400px]">
        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(204, 204, 204, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 1">
            <line id="Line 1" stroke="var(--stroke-0, #CCCCCC)" x2="400" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Frame51 />
      <Group27 />
      <Frame53 />
    </div>
  );
}