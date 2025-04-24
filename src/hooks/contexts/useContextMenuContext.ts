import { useContext } from "react";

import { ContextMenuContext } from "../../providers/ContextMenuProvider/context";

export const useContextMenuContext = () => useContext(ContextMenuContext);
