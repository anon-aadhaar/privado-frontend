import "../app/globals.css";
import type { AppProps } from "next/app";
import SelectedIssuerProvider from "@/providers/SelectedIssuerProvider";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnonAadhaarProvider>
      <SelectedIssuerProvider>
        <Component {...pageProps} />
      </SelectedIssuerProvider>
    </AnonAadhaarProvider>
  );
}

export default MyApp;
