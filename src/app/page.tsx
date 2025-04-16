// import CReactQuill from "@/app/react-quill/page";
import DownloadFile from "@/app/download-file/page";
import QrLogin from "@/app/qr-login/page";

export default function Home() {
  return (
      <div>
        <div><DownloadFile/></div>
        <hr className="border-t border-gray-300 mb-8" />
        <div><QrLogin/></div>
      </div>
  );
}