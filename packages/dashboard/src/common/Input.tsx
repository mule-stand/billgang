const Input = ({
  onChange,
  value,
  placeholder,
  className = '',
  icon = null,
  ...props
}) => (
  <div className={`relative w-full ${className}`}>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="block h-[48px] w-full rounded-[12px] border-none bg-surface0 p-[12px] align-middle placeholder:text-surface200"
      placeholder={placeholder}
      {...props}
    />
    {icon && (
      <div className="absolute inset-y-0 right-[14px] flex items-center">
        {icon}
      </div>
    )}
  </div>
)

export default Input
