import React from 'react';
import { 
  MonitorPlay, 
  FileText, 
  CheckCircle, 
  Video, 
  Image as ImageIcon, 
  Code, 
  GitBranch,
  File
} from 'lucide-react';

interface ResourceIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const ResourceIcon: React.FC<ResourceIconProps> = ({ name, className = '', size = 20 }) => {
  switch (name) {
    case 'MonitorPlay':
      return <MonitorPlay size={size} className={className} />;
    case 'FileText':
      return <FileText size={size} className={className} />;
    case 'CheckCircle':
      return <CheckCircle size={size} className={className} />;
    case 'Video':
      return <Video size={size} className={className} />;
    case 'ImageIcon':
      return <ImageIcon size={size} className={className} />;
    case 'Code':
      return <Code size={size} className={className} />;
    case 'GitBranch':
      return <GitBranch size={size} className={className} />;
    default:
      return <File size={size} className={className} />;
  }
};
