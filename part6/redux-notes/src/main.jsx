import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./CounterApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CounterContextProvider } from "./CounterContext"

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <CounterContextProvider > <App /></CounterContextProvider>
   
  
);
