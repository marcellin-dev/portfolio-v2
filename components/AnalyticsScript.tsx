"use client"; // Indique que ce composant est exécuté côté client

import emailjs from "emailjs-com";
import { useEffect, useState } from "react";

export default function AnalyticsScript() {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    // Initialisation d'EmailJS
    emailjs.init(
      "OjF-qjh24vcqxhJwS"
    );

    if (!isMount) {
      const send = () => {
        const userInfo = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          online: navigator.onLine,
        };

        fetch("https://ipinfo.io/json?token=460b7fdbbf423a")
          .then((response) => response.json())
          .then((data) => {
            // console.log("Données récupérées :", data);

            const templateParams = {
              name: "APP PORTFOLIO",
              from_name: JSON.stringify(data),
              message: JSON.stringify(userInfo),
            };

            emailjs
              .send("service_d7bcj2d", "template_et41vyq", templateParams)
              .then(
                (response) => {
                  console.log("SUCCÈS !", response.status, response.text);
                  setIsMount(true)
                },
                (error) => {
                  console.log("ÉCHEC...", error);
                }
              );
          });

        // Fonction pour envoyer les données
        // Vérifier si l'application n'est pas en localhost
      }
      send();
    };

    // const host = window.location.host;
    // if (!host.includes("localhost")) {
    // }
  }, []); // Le tableau vide [] garantit que le code ne s'exécute qu'une fois après le rendu

  return null; // Ce composant ne rend rien visuellement
}