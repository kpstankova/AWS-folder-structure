import { SizeProp } from "@fortawesome/fontawesome-svg-core";

import { FileTreeItemType } from "../FileTreeItem/types";

export interface FileItemIconProps {
    type: FileTreeItemType;
    size: SizeProp;
    shouldShift?: boolean;
    isInTree?: boolean;
}