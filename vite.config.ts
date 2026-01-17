import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "vaul@1.1.2": "vaul",
      "sonner@2.0.3": "sonner",
      "recharts@2.15.2": "recharts",
      "react-resizable-panels@2.1.7": "react-resizable-panels",
      "react-hook-form@7.55.0": "react-hook-form",
      "react-day-picker@8.10.1": "react-day-picker",
      "lucide-react@0.487.0": "lucide-react",
      "input-otp@1.4.2": "input-otp",
      "figma:asset/d4d57d2df832c490761752acaa5a5611096ad0f3.png": path.resolve(
        __dirname,
        "./src/assets/d4d57d2df832c490761752acaa5a5611096ad0f3.png"
      ),
      "figma:asset/d383ec89883631e1636a4ef1cd1a8169b8a61c71.png": path.resolve(
        __dirname,
        "./src/assets/d383ec89883631e1636a4ef1cd1a8169b8a61c71.png"
      ),
      "figma:asset/d2afe422db17950f27d4ea454ca993e47c0efea1.png": path.resolve(
        __dirname,
        "./src/assets/d2afe422db17950f27d4ea454ca993e47c0efea1.png"
      ),
      "figma:asset/be845882c72f33b6fefd8af3421980d039c99c7a.png": path.resolve(
        __dirname,
        "./src/assets/be845882c72f33b6fefd8af3421980d039c99c7a.png"
      ),
      "figma:asset/bda7b0d56db163d83dc5e77af664f9cb393facca.png": path.resolve(
        __dirname,
        "./src/assets/bda7b0d56db163d83dc5e77af664f9cb393facca.png"
      ),
      "figma:asset/b6767066b78cfb865d7a3f6e212caf8d7ff0c3c0.png": path.resolve(
        __dirname,
        "./src/assets/b6767066b78cfb865d7a3f6e212caf8d7ff0c3c0.png"
      ),
      "figma:asset/9d0dcbad493973ebbf13ac24d21c1b3a8826b4b8.png": path.resolve(
        __dirname,
        "./src/assets/9d0dcbad493973ebbf13ac24d21c1b3a8826b4b8.png"
      ),
      "figma:asset/8f744231b291c01b80cc80cad5cc40941d88f215.png": path.resolve(
        __dirname,
        "./src/assets/8f744231b291c01b80cc80cad5cc40941d88f215.png"
      ),
      "figma:asset/7876d1a880bbee52f598d578d0f16d16bbf0f7f9.png": path.resolve(
        __dirname,
        "./src/assets/7876d1a880bbee52f598d578d0f16d16bbf0f7f9.png"
      ),
      "figma:asset/6dea98ec815b7c5559a6aeee3378e1e9b2852960.png": path.resolve(
        __dirname,
        "./src/assets/6dea98ec815b7c5559a6aeee3378e1e9b2852960.png"
      ),
      "figma:asset/6afbffa74bc1db39b9b125819b3493035c2e7cb2.png": path.resolve(
        __dirname,
        "./src/assets/6afbffa74bc1db39b9b125819b3493035c2e7cb2.png"
      ),
      "figma:asset/4986c3f2b61e44b7f24f7c55a55bdda39c0b9a48.png": path.resolve(
        __dirname,
        "./src/assets/4986c3f2b61e44b7f24f7c55a55bdda39c0b9a48.png"
      ),
      "figma:asset/447762b1051f7b59ecdfc42073573b96d7d2fef6.png": path.resolve(
        __dirname,
        "./src/assets/447762b1051f7b59ecdfc42073573b96d7d2fef6.png"
      ),
      "figma:asset/2be47e67227fd376eb094b55ac5112065f82355f.png": path.resolve(
        __dirname,
        "./src/assets/2be47e67227fd376eb094b55ac5112065f82355f.png"
      ),
      "figma:asset/2076b46a96f4422a375bbf562b7998e5dd9fb028.png": path.resolve(
        __dirname,
        "./src/assets/2076b46a96f4422a375bbf562b7998e5dd9fb028.png"
      ),
      "figma:asset/150f9ca3e38b4d91359bb1b4ae312b2e35978649.png": path.resolve(
        __dirname,
        "./src/assets/150f9ca3e38b4d91359bb1b4ae312b2e35978649.png"
      ),
      "figma:asset/112e38e0aea13e8ab766d86acd7b4486061b4929.png": path.resolve(
        __dirname,
        "./src/assets/112e38e0aea13e8ab766d86acd7b4486061b4929.png"
      ),
      "figma:asset/06313dc8143eab2d50e165053c710a700a7c33c7.png": path.resolve(
        __dirname,
        "./src/assets/06313dc8143eab2d50e165053c710a700a7c33c7.png"
      ),
      "embla-carousel-react@8.6.0": "embla-carousel-react",
      "cmdk@1.1.1": "cmdk",
      "class-variance-authority@0.7.1": "class-variance-authority",
      "@radix-ui/react-tooltip@1.1.8": "@radix-ui/react-tooltip",
      "@radix-ui/react-toggle@1.1.2": "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group@1.1.2": "@radix-ui/react-toggle-group",
      "@radix-ui/react-tabs@1.1.3": "@radix-ui/react-tabs",
      "@radix-ui/react-switch@1.1.3": "@radix-ui/react-switch",
      "@radix-ui/react-slot@1.1.2": "@radix-ui/react-slot",
      "@radix-ui/react-slider@1.2.3": "@radix-ui/react-slider",
      "@radix-ui/react-separator@1.1.2": "@radix-ui/react-separator",
      "@radix-ui/react-select@2.1.6": "@radix-ui/react-select",
      "@radix-ui/react-scroll-area@1.2.3": "@radix-ui/react-scroll-area",
      "@radix-ui/react-radio-group@1.2.3": "@radix-ui/react-radio-group",
      "@radix-ui/react-progress@1.1.2": "@radix-ui/react-progress",
      "@radix-ui/react-popover@1.1.6": "@radix-ui/react-popover",
      "@radix-ui/react-navigation-menu@1.2.5":
        "@radix-ui/react-navigation-menu",
      "@radix-ui/react-menubar@1.1.6": "@radix-ui/react-menubar",
      "@radix-ui/react-label@2.1.2": "@radix-ui/react-label",
      "@radix-ui/react-hover-card@1.1.6": "@radix-ui/react-hover-card",
      "@radix-ui/react-dropdown-menu@2.1.6": "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-dialog@1.1.6": "@radix-ui/react-dialog",
      "@radix-ui/react-context-menu@2.2.6": "@radix-ui/react-context-menu",
      "@radix-ui/react-collapsible@1.1.3": "@radix-ui/react-collapsible",
      "@radix-ui/react-checkbox@1.1.4": "@radix-ui/react-checkbox",
      "@radix-ui/react-avatar@1.1.3": "@radix-ui/react-avatar",
      "@radix-ui/react-aspect-ratio@1.1.2": "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-alert-dialog@1.1.6": "@radix-ui/react-alert-dialog",
      "@radix-ui/react-accordion@1.2.3": "@radix-ui/react-accordion",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    outDir: "build",
  },
  server: {
    port: 8083,
    host: "0.0.0.0",
    allowedHosts: [
      "convertifycrm.com",
      "www.convertifycrm.com",
      "14.224.210.210",
    ],
  },
});
