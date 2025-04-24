import { createContext } from "react";
import { ContextMenuProviderProps } from "./types";

export const ContextMenuContext = createContext<ContextMenuProviderProps>({
	openMenu: () => undefined,
	closeMenu: () => undefined,
	isMenuOpen: () => false,
});
