import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="group flex items-center justify-center gap-2 h-[3rem] w-full sm:w-[10rem] bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg outline-none transition-all focus:scale-105 hover:scale-105 hover:from-blue-700 hover:to-purple-700 active:scale-100 shadow-lg hover:shadow-xl disabled:scale-100 disabled:opacity-65 disabled:cursor-not-allowed font-medium"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          <span>Envoi en cours...</span>
        </div>
      ) : (
        <>
          Envoyer le message{" "}
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
  );
}
