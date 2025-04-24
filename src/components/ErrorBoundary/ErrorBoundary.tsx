import { Component, ErrorInfo } from "react";

import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		this.setState({
			error,
			errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="p-5 bg-red-100 text-red-800 border rounded-sm">
					<h2>Something went wrong!</h2>
					<details className="whitespace-pre-wrap">
						<summary>Click for details</summary>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo && this.state.errorInfo.componentStack}
					</details>
				</div>
			);
		}

		return this.props.children;
	}
}
