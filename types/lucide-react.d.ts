declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  export interface LucideProps extends Partial<Omit<SVGProps<SVGSVGElement>, "ref">> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }
  
  export type LucideIcon = ComponentType<LucideProps>;
  
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
}
