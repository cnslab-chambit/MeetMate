export interface ButtonProps {
  onClick: () => void;
  width?: number;
  height?: number;
  active?: boolean;
  children: React.ReactNode;
}
