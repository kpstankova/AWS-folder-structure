import { FileTreeItemType } from "../FileTreeItem/types";

export interface CreateItemModalProps {
  shouldOpen: boolean;
  closeModal: () => void;
  type: FileTreeItemType;
}
