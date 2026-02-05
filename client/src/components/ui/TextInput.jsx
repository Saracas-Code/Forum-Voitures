const TextInput = ({
  label,
  id,
  error,
  rightSlot,
  multiline = false,
  className = "",
  inputClassName = "",
  ...props
}) => {
  const InputTag = multiline ? "textarea" : "input";
  const wrapperClass = [
    "ui-input-wrapper",
    rightSlot ? "has-right" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const inputClasses = [
    "ui-input",
    multiline ? "ui-input--textarea" : "",
    error ? "ui-input--error" : "",
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={["ui-field", className].filter(Boolean).join(" ")}>
      {label && (
        <label className="ui-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={wrapperClass}>
        <InputTag id={id} className={inputClasses} {...props} />
        {rightSlot && <div className="ui-input-right">{rightSlot}</div>}
      </div>
      {error && <p className="ui-error">{error}</p>}
    </div>
  );
};

export default TextInput;
