"use client";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';


const QRLoginVApi = () => {
    const [data, setData] = useState(null);
    const pathname = usePathname();
    console.log("pathname",pathname);
    // pathname에서 session ID 추출
    const pathParts = pathname.split("/");
    const session = pathParts.length > 2 ? pathParts[2].substring(0) : null;
    const apiUrl = `http://localhost:8040/api/public/sse/qr-login/pub-api/${session}`;
    useEffect(() => {
        const fetchData = async () => {
                const response = await fetch(apiUrl);
                console.log("response : "+JSON.stringify(response));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
        };
        fetchData();
    }, [apiUrl]);

    return (
        <div>
            <h1>QR 로그인 API 호출</h1>
            {/*{error && <p style={{ color: "red" }}>에러: {error}</p>}*/}
            {session}
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>데이터를 불러오는 중...</p>
            )}
        </div>
    );
};

export default QRLoginVApi;