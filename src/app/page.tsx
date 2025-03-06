"use client";
import {
  ANONYMOUS,
  loadTossPayments, TossPaymentsSDK,
  TossPaymentsWidgets
} from "@tosspayments/tosspayments-sdk";
import { useState } from "react";
import {sendPaymentRequest} from "@/api/payment";
import { v4 as uuidv4 } from "uuid"; // ES Modules

export default function Home() {
  // 버튼 클릭 시 결제 위젯을 띄우는 상태 관리
  const [isPaymentWidgetVisible, setIsPaymentWidgetVisible] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets>();

  // 결제 위젯 초기화 함수
  const initializeTossPayments = async () => {
    if (!widgets) {
      const loadedTossPayments = await loadTossPayments("test_gck_QbgMGZzorz5j5K0JNAKPVl5E1em4");


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

      setWidgets(widgets);
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
        orderIdx: 58,
        tossOrderId,
        amount: 1000,
      });

      // @ts-ignore
      widgets?.setAmount({
        currency:"KRW"
        ,value:1000
      })

      if (widgets && result.status === 200) {
        await  widgets.requestPayment({
          orderId: tossOrderId,
          orderName: 'Test Order',
          customerName: 'Test Customer',
          successUrl: window.location.origin + '/success',
          failUrl: window.location.origin + '/fail',
          metadata:{
            orderIdx:58,
            attendeeIdx:450
          }
        });
      } else {
        alert(result);
      }
    } catch (error) {
      alert(error);
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