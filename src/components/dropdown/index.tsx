import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
  Typography,
  DropdownMenuPortal,
} from '@/components/ui';
import { Icon } from '@iconify/react';

interface CustomDropdownProps {
  label: string;
  items: string[];
}

const Dropdown: React.FC<CustomDropdownProps> = ({ label, items }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group cursor-pointer inline-block">
        <div className="flex gap-1">
          <Typography
            variant="h5"
            className="font-normal
              group-data-[state=open]:underline group-data-[state=open]:underline-offset-4
              group-data-[state=open]:decoration-primary group-data-[state=open]:decoration-4
              hover:underline hover:underline-offset-4 hover:decoration-primary hover:decoration-4
            "
          >
            {label}
          </Typography>
          <Icon
            icon="mingcute:down-fill"
            className="group-data-[state=open]:rotate-180 transition-all duration-300 ml-2 text-primary w-6 h-6"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative data-[side=bottom]:top-[5px] min-w-40" align="start">
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
