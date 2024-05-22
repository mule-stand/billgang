const types = {
  primary: 'bg-brandDefault text-white',
  secondary: 'bg-surface0 text-textSecondary',
}
const Button = ({ onClick, children, type = 'primary' }) => (
  <button
    onClick={onClick}
    className={`h-[36px] w-fit cursor-pointer rounded-[12px] px-[16px] py-[8px] text-sm ${types[type]}`}
  >
    {children}
  </button>
)

export default Button
