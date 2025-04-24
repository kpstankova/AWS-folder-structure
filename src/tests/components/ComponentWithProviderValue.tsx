import { PropsWithChildren, useEffect } from "react";

import { ComponentWithProviderValueProps } from "../../tests/components/types";

export const ComponentWithProviderValue = <T,>({
	contextHook,
	contextValueSetter,
	children,
}: PropsWithChildren<ComponentWithProviderValueProps<T>>) => {
	const hookResult = contextHook();

	useEffect(() => {
		contextValueSetter(hookResult);
	}, [contextValueSetter, hookResult]);

	return <>{children}</>;
};
