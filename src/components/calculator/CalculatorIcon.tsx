import React from 'react';
import {
  Globe,
  ShoppingBag,
  Cpu,
  Target,
  Building2,
  RefreshCw,
  Sparkles,
  Mail,
  BookOpen,
  Calendar,
  CreditCard,
  UserCheck,
  Languages,
  Layers,
  Share2,
  TrendingUp,
  Send,
  Search,
  HelpCircle,
  LucideProps
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  Globe,
  ShoppingBag,
  Cpu,
  Target,
  Building2,
  RefreshCw,
  Sparkles,
  Mail,
  BookOpen,
  Calendar,
  CreditCard,
  UserCheck,
  Languages,
  Layers,
  Share2,
  TrendingUp,
  Send,
  Search
};

interface CalculatorIconProps extends LucideProps {
  name: string;
}

export const CalculatorIcon: React.FC<CalculatorIconProps> = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent {...props} />;
};
