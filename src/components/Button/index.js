const Button = ({
	onClick,
	title,
	disabled,
	variant,
	icon,
	loading,
	type,
	children,
	classNames,
	...rest
}) => {
	return (
		<button
			{...rest}
			variant={variant}
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={classNames}
		>
			{children}
		</button>
	);
};

export default Button;
