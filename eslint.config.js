const eslint = require("@eslint/js");
const typescriptParser = require("@typescript-eslint/parser");

const { fixupConfigRules } = require("@eslint/compat");
const { FlatCompat } = require("@eslint/eslintrc");

const flatCompat = new FlatCompat();

module.exports = [
	eslint.configs.recommended,
	...fixupConfigRules(flatCompat.extends("plugin:@typescript-eslint/recommended")),
	...fixupConfigRules(flatCompat.extends("plugin:react/recommended")),
	...fixupConfigRules(flatCompat.extends("plugin:react-hooks/recommended")),
	{
		languageOptions: {
			parser: typescriptParser,
		},
		rules: {
			indent: [
				"error",
				"tab",
				{
					offsetTernaryExpressions: true,
					SwitchCase: 1,
					ignoredNodes: ["ArrowFunctionExpression"],
				},
			],
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/array-type": ["error", { default: "generic" }],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "interface",
					format: ["PascalCase"],
					custom: {
						regex: "^I[A-Z]",
						match: false,
					},
				},
			],
			"@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
			"@typescript-eslint/no-shadow": ["error"],
			"@typescript-eslint/no-use-before-define": [
				"error",
				{
					functions: true,
					classes: false,
					variables: true,
					allowNamedExports: true,
				},
			],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					varsIgnorePattern: "^_",
					argsIgnorePattern: "^_",
				},
			],
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "error",
		},
		settings: {
			"import/parsers": {
				"@typescript-eslint/parser": [".ts", ".tsx"],
			},
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./",
				},
			},
		},
		ignores: ["node_modules", "webpack.*.js"],
	},
];
