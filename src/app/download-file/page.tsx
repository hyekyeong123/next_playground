"use client";
import {downloadFile} from "@/api/common";

export default function DownloadFile() {
    const handleDownload = async () => {
        try {
            const response = await downloadFile({conferenceIdx:12724});
            console.log(response);
            // 만약 응답에서 파일(blob)로 받는 경우라면 다음처럼 처리
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("요청 중 오류 발생:", error);
        }
    };


    return (
        <div className="p-4">
            <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Excel 다운로드
            </button>
        </div>
    );
}