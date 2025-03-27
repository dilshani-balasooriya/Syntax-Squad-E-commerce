import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Chatbot = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      if (!document.getElementById("chatling-embed-script")) {
        window.chtlConfig = { chatbotId: import.meta.env.VITE_CHATBOT_KEY };

        const script = document.createElement("script");
        script.async = true;
        script.dataset.id = import.meta.env.VITE_CHATBOT_KEY;
        script.id = "chatling-embed-script";
        script.type = "text/javascript";
        script.src = "https://chatling.ai/js/embed.js";

        document.body.appendChild(script);

        return () => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      }
    }
  }, [location.pathname]);

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return null;
};

export default Chatbot;
