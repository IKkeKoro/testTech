import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import App from "./App";
import "./index.css";
import { THEME } from '@tonconnect/ui';
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://alefmanvladimir.github.io/my-twa/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider 
    manifestUrl={manifestUrl} 
    uiPreferences={{ theme: THEME.DARK }}
  >
    <QueryClientProvider client={queryClient}>
      <Provider>
        <App />
      </Provider>
      </QueryClientProvider>
  </TonConnectUIProvider>
);
