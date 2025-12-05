// Next.js compatible
import { useNavigationService } from '@/services/navigation';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
function Link({ children, href, className, onClick, ...props }: LinkProps) {
  const navigation = useNavigationService();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigation.navigate(href);
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

export { Link };