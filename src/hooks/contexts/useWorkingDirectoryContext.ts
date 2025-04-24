import { useContext } from "react";

import { WorkingDirectoryContext } from "../../providers/WorkingDirectoryProvider/context";

export const useWorkingDirectoryContext = () =>
  useContext(WorkingDirectoryContext);
