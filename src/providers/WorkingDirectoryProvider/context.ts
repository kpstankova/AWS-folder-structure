import { createContext } from "react";

import { WorkingDirectoryContextProps } from "./types";

export const WorkingDirectoryContext = createContext<WorkingDirectoryContextProps>({
	selectedDirectory: null,
	setSelectedDirectory: () => undefined,
});
