import { useCallback } from "react";

function useExternalLink(url: string) {
  return useCallback(() => {
    window.open(url, "_blank");
  }, [url]);
}

function Footer() {
  const handleCode = useExternalLink("https://github.com/shivaKotagiri/youtube-clone");
  const handleFun=useExternalLink("https://github.com/shivaKotagiri/");

  return (
    <div className="justify-center flex-col w-full p-5">
      <div className="text-gray-500 font-semibold text-3xl text-center">
        Made By
        <span onClick={handleFun} className="text-[#146fb5] font-semibold cursor-pointer"> Shiva Kumar Kotagiri</span>
      </div>
      <div onClick={handleCode} className="text-xl text-gray-500 underline text-center p-2 cursor-pointer">
        Get the source code
      </div>
    </div>
  );
}

export default Footer;
