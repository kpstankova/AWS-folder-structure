import { createContext } from "react";
import { FileItemsProviderProps } from "./types";

export const FileItemsContext = createContext<FileItemsProviderProps>({
	fileItems: [],
	setFileItems: () => undefined,
});
