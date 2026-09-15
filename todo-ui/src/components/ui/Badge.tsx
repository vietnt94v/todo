const getColorByStatus = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
} as const;

const getSizeBySize = {
  sm: 'px-2 py-1',
  md: 'px-3 py-1',
  lg: 'px-4 py-2',
} as const;

type BadgeStatus = keyof typeof getColorByStatus;
type BadgeSize = keyof typeof getSizeBySize;

interface BadgeProps {
  text: string;
  status?: BadgeStatus;
  size?: BadgeSize;
}

const getClassName = (status: BadgeStatus, size: BadgeSize) => {
  const colorClass = getColorByStatus[status];
  const sizeClass = getSizeBySize[size];
  const baseClass = 'inline-flex items-center rounded-full text-white';

  return `${baseClass} ${colorClass} ${sizeClass}`;
};

const Badge = ({ text, size = 'md', status = 'info' }: BadgeProps) => {
  return (
    <>
      <div className={getClassName(status, size)}>
        <span>{text}</span>
      </div>
    </>
  );
};

export default Badge;
