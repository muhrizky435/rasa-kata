import { Workbox } from "workbox-window";

const registerServiceWorker = () => {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service workers are not supported in this browser.");
    return;
  }

  const wb = new Workbox("/sw.js");

  wb.addEventListener("activated", (e) => {
    if (!e.isUpdate) {
      console.log("Service Worker activated for the first time.");
    } else {
      console.log("Service Worker updated.");
    }
  });

  wb.addEventListener("waiting", () => {
    console.log("New Service Worker is waiting to activate.");
    if (
      confirm(
        "A new version of this app is available. Would you like to update?"
      )
    ) {
      wb.messageSkipWaiting();
    }
  });

  wb.addEventListener("controlling", () => {
    window.location.reload();
  });

  try {
    wb.register();
    console.log("Service Worker registered successfully.");
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
};

registerServiceWorker();
