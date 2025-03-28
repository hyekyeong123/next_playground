export default function FailPage() {
  const message = 'There was an issue processing your payment. Please try again.';

  return (
      <div>
        <h1>Payment Failed</h1>
        <p>{message}</p>
      </div>
  );
}