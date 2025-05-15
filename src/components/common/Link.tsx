// TypeScript file
// Next.js compatible
import { useNavigationService } from '@/services/navigation';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export function Link({ children, href, className, ...props }: LinkProps) {
  const navigation = useNavigationService();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigation.navigate(href);
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