import { useState } from "react";

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // Substitua pelo link do seu Google Forms
  const GOOGLE_FORM_ACTION =
    "https://docs.google.com/forms/d/e/SEU_ID_DO_FORMULARIO/formResponse";
  const ENTRY_MESSAGE = "entry.1234567890"; // Troque pelo entry do campo mensagem
  const ENTRY_EMAIL = "entry.0987654321"; // Troque pelo entry do campo email

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = document.createElement("form");
    form.action = GOOGLE_FORM_ACTION;
    form.method = "POST";
    form.target = "hidden_iframe";

    const messageInput = document.createElement("input");
    messageInput.name = ENTRY_MESSAGE;
    messageInput.value = message;
    form.appendChild(messageInput);

    const emailInput = document.createElement("input");
    emailInput.name = ENTRY_EMAIL;
    emailInput.value = email;
    form.appendChild(emailInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setMessage("");
      setEmail("");
    }, 2000);
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 z-50 rounded-full bg-blue-600 text-white px-5 py-3 shadow-lg hover:bg-blue-700 transition"
        onClick={() => setOpen(true)}
        title="Enviar feedback"
      >
        Relatar um problema
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 w-full max-w-xs pointer-events-auto">
            <button
              className=" text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              ✕
            </button>
            {sent ? (
              <div className="text-green-600 dark:text-green-400 font-semibold text-center py-8">
                Obrigado pelo feedback!
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">
                  Relatar um problema
                </h2>
                <textarea
                  required
                  className="w-full rounded border border-gray-300 dark:border-gray-700 p-2 mb-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Descreva o problema..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <input
                  type="email"
                  className="w-full rounded border border-gray-300 dark:border-gray-700 p-2 mb-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Seu email (opcional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded py-2 transition"
                >
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {/* iframe oculto para submissão silenciosa */}
      <iframe name="hidden_iframe" style={{ display: "none" }} />
    </>
  );
}
