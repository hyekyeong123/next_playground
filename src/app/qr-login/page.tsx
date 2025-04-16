"use client";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
export default function QrLogin() {
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [sseToken, setSseToken] = useState<string | null>(null);
    const TRANSMISSION_TYPE = "api";
     function qrLogin(){
         const sseToken = uuidv4();
         setSseToken(sseToken)
         const url = "http://localhost:8040/api/public/sse/qr-login/"+TRANSMISSION_TYPE+"/"+sseToken;
         const eventSource = new EventSource(url);

         eventSource.onopen = () => {
             console.log("SSE 연결됨.");
         };

         eventSource.addEventListener("qr_login/"+sseToken, (event) => {
             console.log("수신된 데이터 원본:", event.data);

             const data = JSON.parse(event.data);
             console.log("data",data);
             if(data == "Connected"){
                 console.log('첫 응답 메시지 받음');
             }else{
                 if(data.status === 'active'){
                     alert('로그인 성공!');
                     eventSource.close();
                 }else if(data.status === 'failed'){
                     // QR을 생성할 수 없습니다. 관리자에게 문의하세요.
                     alert(data.statusMessage);
                     return;
                 }
                 if (data.qrImage) {
                     setQrImage(`data:image/png;base64,${data.qrImage}`);// 받은 QR 이미지를 상태에 저장
                     // 앱 로그인 성공
                 } else {
                     alert(data.failMessage);
                     eventSource.close();
                 }
             }
         });

         eventSource.onerror = () => {
             eventSource.close();
         };

         // 10분 후에 SSE 연결 해제
         const timer = setTimeout(() => {
             eventSource.close();
             setQrImage(null);

             // 로그인 실패로 간주
             alert('QR 코드 유효 시간이 초과되었습니다.');
         }, 10 * 60 * 1000); // 10분

         return () => {
             clearTimeout(timer);
             eventSource.close();
         };
     }

    useEffect(() => {
        qrLogin()
    }, []);
    return (
        <>
            <div>
                <h1>QR 로그인 테스트</h1>
                {qrImage && (
                    <div>
                        {sseToken}
                        <img src={qrImage} alt="QR Code" />
                    </div>
                )}
            </div>
        </>
    );
}