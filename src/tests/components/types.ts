export interface ComponentWithProviderValueProps<T> {
  contextHook: () => T;
  contextValueSetter: (context: T) => void;
}
