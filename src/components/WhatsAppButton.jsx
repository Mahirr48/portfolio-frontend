const WhatsAppButton = () => {
  const phone = "7383706313"; // ⚠️ replace with your number
  const message = "Hi Mahir, I saw your portfolio and want to connect.";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition hover:scale-110"
    >
      💬
    </a>
  );
};

export default WhatsAppButton;