// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Component imports
import { Link } from '@/components/common/Link';

interface Props {
  className?: string,
  onLinkClick?: () => void,
}

function MainNavigation({ className = '', onLinkClick }: Props) {
  return (
    <nav className={className}>
      <Link href="/about" onClick={onLinkClick}>About Us</Link>
      <Link href="/pricing" onClick={onLinkClick}>Pricing</Link>
      <Link href="/contact" onClick={onLinkClick}>Contact Us</Link>
    </nav>
  );
}

export default MainNavigation;
