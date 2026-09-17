const Button = ({
  title = "Button",
  onClick,
  onPress,
  buttonStyle = {},
  textStyle = {},
  disabled = false,
  className = "",
  textClassName = "",
  type = "button",
}) => {
  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    else if (onPress) onPress(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={buttonStyle}
    >
      <span className={textClassName} style={textStyle}>
        {title}
      </span>
    </button>
  );
};

export default Button;
