"use client";
import { useState, useEffect } from 'react';

interface LoginRedisData {
    userIdx: number;         // 사용자 식별자
    createT: string;         // 생성 시간
    sessionId: string;       // 세션 ID
    status: string;          // 상태: 'pending', 'active', 'fail'
    statusMessage?: string;    // 실패 메시지 (선택적)
    qrImage: string;
}
export default function QrLogin() {
    const [qrImage, setQrImage] = useState<string | null>(null);

     function qrLogin(){
         // session은 백엔드에서 qr이미지와 함께 내려줄 값임, 또한 이벤트를 전송할때 id값으로 사용함
         let session = "9ac65d98-268e-44d6-af9a-96d9c9ec9529";
         const url = "http://localhost:8040/api/public/sse/qr-login/"+session;
         const eventSource = new EventSource(url);

         eventSource.onopen = () => {
             console.log("SSE 연결됨.");
         };

         eventSource.addEventListener("qr_login_"+session, (event) => {
             console.log("수신된 데이터 원본:", event.data);

             const data = JSON.parse(event.data);
             console.log("data",data);
             if(data == "Connected"){
                 console.log('첫 응답 메시지 받음');
             }else{
                 if(data.status === 'active'){
                     alert('로그인 성공!');

                     // 성공하거나 실패할때 eventSource닫는게 아니라 qr을 갱신해야함
                     eventSource.close();
                 }else if(data.status === 'fail'){
                     alert('로그인 실패!');
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
                        <img src={qrImage} alt="QR Code" />
                    </div>
                )}
            </div>
        </>
    );
}