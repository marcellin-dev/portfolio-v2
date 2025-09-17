"use client";

import { sendEmail } from "@/actions/sendEmail";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SectionHeading from "./section-heading";
import SubmitBtn from "./submit-btn";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contactez-moi</SectionHeading>

      <div className="-mt-4 mb-8">
        <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
          Vous pouvez me contacter directement par email ou via le formulaire ci-dessous.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
            href="mailto:lelemarcellin@gmail.com"
          >
            📧 lelemarcellin@gmail.com
          </a>
          <a
            className="group bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            href="tel:+237695509408"
          >
            📱 +237 695 509 408
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Envoyez-moi un message
        </h3>
        <form
          className="flex flex-col space-y-4"
          action={async (formData) => {
            const { data, error } = await sendEmail(formData);

            if (error) {
              toast.error(error);
              return;
            }

            toast.success("Email envoyé avec succès!");
          }}
        >
          <input
            className="h-14 px-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 transition-all outline-none shadow-sm focus:shadow-md"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Votre adresse email"
          />
          <textarea
            className="h-52 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 transition-all outline-none shadow-sm focus:shadow-md resize-none"
            name="message"
            placeholder="Votre message..."
            required
            maxLength={5000}
          />
          <SubmitBtn />
        </form>
      </div>
    </motion.section>
  );
}
