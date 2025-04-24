import { PropsWithChildren, useCallback, useState } from "react";

import { ContextMenuContext } from "./context";

export const ContextMenuProvider = ({ children }: PropsWithChildren<object>) => {
	const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

	const openMenu = useCallback((id: string) => {
		setActiveMenuId(id);
	}, []);

	const closeMenu = useCallback((id: string) => {
		setActiveMenuId((current) => (current === id ? null : current));
	}, []);

	const isMenuOpen = useCallback((id: string) => activeMenuId === id, [activeMenuId]);

	return (
		<ContextMenuContext.Provider value={{ openMenu, closeMenu, isMenuOpen }}>
			{children}
		</ContextMenuContext.Provider>
	);
};
