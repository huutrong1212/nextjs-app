import { Typography } from '@/components';
import { cn } from '@/lib/utils';

interface LeftAlignedLayoutProps {
  title: string;
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const LeftAlignedLayout: React.FC<LeftAlignedLayoutProps> = ({
  title,
  rightContent,
  children,
  className,
}) => {
  return (
    <section className={cn('container flex flex-col gap-6', className)}>
      <Typography variant="h2">{title}</Typography>
      {rightContent && <div className="flex justify-end">{rightContent}</div>}
      <div>{children}</div>
    </section>
  );
};

export default LeftAlignedLayout;
