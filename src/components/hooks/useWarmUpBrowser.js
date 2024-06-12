import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    const warmUpBrowser = async () => {
      try {
        await WebBrowser.warmUpAsync();
      } catch (error) {
        console.error("Error warming up browser:", error);
      }
    };

    const coolDownBrowser = async () => {
      try {
        await WebBrowser.coolDownAsync();
      } catch (error) {
        console.error("Error cooling down browser:", error);
      }
    };

    warmUpBrowser();

    // Cleanup function to cool down the browser on unmount
    return () => {
      coolDownBrowser();
    };
  }, []); // Empty dependency array to run only on mount and unmount
};
