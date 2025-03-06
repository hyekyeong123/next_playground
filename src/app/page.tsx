"use client";
import {
  ANONYMOUS,
  loadTossPayments,
  TossPaymentsWidgets
} from "@tosspayments/tosspayments-sdk";
import { useState } from "react";
import {sendPaymentRequest} from "@/api/payment";
import { v4 as uuidv4 } from "uuid"; // ES Modules

export default function Home() {
  // 버튼 클릭 시 결제 위젯을 띄우는 상태 관리
  const [isPaymentWidgetVisible, setIsPaymentWidgetVisible] = useState(false);
  const [tossPayments, setTossPayments] = useState<TossPaymentsWidgets>(null);

  // 결제 위젯 초기화 함수
  const initializeTossPayments = async () => {
    if (!tossPayments) {
      const loadedTossPayments = await loadTossPayments(process.env.TOSS_CLIENT_KEY);
      setTossPayments(loadedTossPayments);

      const widgets = loadedTossPayments.widgets({
        customerKey: ANONYMOUS,
      });

      widgets.setAmount({
        currency: "KRW",
        value: 10000,
      });

      await widgets.renderPaymentMethods({
        selector: "#payment-widget",
        variantKey: "DEFAULT",
      });
    }
  };

  // 버튼 클릭 시 위젯 보이도록 설정
  const handleShowPaymentWidget = () => {
    setIsPaymentWidgetVisible(true);
    initializeTossPayments();
  };

  // 버튼 클릭 시 위젯 보이도록 설정
  const handleClosePaymentWidget = () => {
    setIsPaymentWidgetVisible(false);
  };

  const handlePayment = async () => {
    const tossOrderId = uuidv4();

    try {
      const result = await sendPaymentRequest({
        orderIdx: 20,
        tossOrderId,
        amount: 10000,
      });

      // @ts-ignore
      if (tossPayments && result.status === 200) {
        await tossPayments?.requestPayment('카드', {
          amount: 10000,
          orderId: tossOrderId,
          orderName: 'Test Order',
          customerName: 'Test Customer',
          successUrl: window.location.origin + '/success',
          failUrl: window.location.origin + '/fail',
        });
      } else {
        console.error('Payment request failed:', result);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  return (
      <div>
        <h1>결제 위젯 테스트</h1>
        {/* 결제 위젯을 띄울 버튼 */}
        <button onClick={handleShowPaymentWidget}>결제 위젯 보기</button>

        {/* 결제 위젯을 표시할 DOM 요소 */}
        {isPaymentWidgetVisible && (
            <>
            <div
                id="payment-widget"
                style={{ width: "100%", height: "400px", marginTop: "20px" }}
            ></div>
        {/* 닫기 버튼 */}
            <div>
              <button onClick={handlePayment}>결제하기</button>
            </div>
              <div>
                <button onClick={handleClosePaymentWidget} style={{ marginTop: "10px" }}>닫기</button>
              </div>
            </>
        )}
      </div>
  );
}