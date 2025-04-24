import { useContext } from "react";

import { FileItemsContext } from "../../providers/FileItemsProvider/context";

export const useFileItemsContext = () => useContext(FileItemsContext);
