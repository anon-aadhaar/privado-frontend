import "../app/globals.css";
import type { AppProps } from "next/app";
import SelectedIssuerProvider from "@/providers/SelectedIssuerProvider";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    isReady && (
      <AnonAadhaarProvider _useTestAadhaar={true}>
        <SelectedIssuerProvider>
          <Component {...pageProps} />
        </SelectedIssuerProvider>
      </AnonAadhaarProvider>
    )
  );
}

export default MyApp;
