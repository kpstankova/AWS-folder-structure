import { createRoot } from "react-dom/client";

import { App } from "./App/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("app") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<App />
	</QueryClientProvider>,
);
