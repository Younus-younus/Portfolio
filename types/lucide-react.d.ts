declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface LucideProps extends Partial<Omit<SVGProps<SVGSVGElement>, "ref">> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }
  
  export type LucideIcon = ComponentType<LucideProps>;
  
  // Original icons
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const Github: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const ArrowDown: LucideIcon;
  export const Download: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Mail: LucideIcon;
  export const Phone: LucideIcon;
  export const MapPin: LucideIcon;
  export const Send: LucideIcon;
  export const Twitter: LucideIcon;
  export const Heart: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const Code: LucideIcon;
  export const Database: LucideIcon;
  export const Server: LucideIcon;
  export const Globe: LucideIcon;
  
  // Additional icons for ML Portfolio
  export const ArrowRight: LucideIcon;
  export const Award: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Brain: LucideIcon;
  export const Box: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const FileText: LucideIcon;
  export const GitBranch: LucideIcon;
  export const Layers: LucideIcon;
  export const Moon: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Sun: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Zap: LucideIcon;
}
