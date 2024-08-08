import React from 'react';
import {
  PricingCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  Typography,
} from '@/components';
import { CheckOutlineIcon, CircleInformationIcon } from '@/public/icons';
import { cn } from '@/lib/utils';

interface Feature {
  name: string;
  options: (string | boolean | PricingPlan)[];
}

interface PricingPlan {
  name: string;
  price: number | string;
}

interface Props {
  data: { title?: string; features?: Feature[] }[];
}

const renderTickOrCross = (value: string | boolean | PricingPlan) => {
  if (typeof value === 'boolean') {
    return value ? <CheckOutlineIcon /> : null;
  } else if (typeof value === 'string') {
    return <Typography className="text-grey-8">{value}</Typography>;
  } else {
    return <PricingCard plan={{ ...value }} layoutType="noneOutline" />;
  }
};

const FeatureTable: React.FC<Props> = ({ data }) => {
  const maxOptions = Math.max(
    ...data.flatMap((item) => item.features?.map((feature) => feature.options.length) || [0]),
  );
  const cellWidth = `${100 / (maxOptions + 1)}%`;

  const renderFeatureRows = (features: Feature[] = []) => {
    return features.map((feature, index) => {
      const hasPricingPlan = feature.options.some(
        (option) => typeof option === 'object' && 'name' in option && 'price' in option,
      );

      return (
        <TableRow key={index} className={hasPricingPlan ? 'border-b-0 hover:bg-inherit' : ''}>
          {feature.name ? (
            <TableCell className={cn(!hasPricingPlan && 'border-r')} style={{ width: cellWidth }}>
              <div className="flex justify-between">
                <Typography variant="h5" className="font-normal">
                  {feature.name}
                </Typography>
                <Tooltip content={feature.name}>
                  <CircleInformationIcon />
                </Tooltip>
              </div>
            </TableCell>
          ) : (
            <TableCell />
          )}
          {feature.options.map((option, idx) => (
            <TableCell
              key={idx}
              className={cn(
                'py-2',
                !hasPricingPlan && idx !== feature.options.length - 1 ? 'border-r' : '',
              )}
              style={{ width: cellWidth }}
              align="center"
            >
              {renderTickOrCross(option)}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return (
    <Table className="border-b">
      {/* <TableHeader>
        <TableRow className="border-none hover:bg-inherit">
          <TableCell />
        </TableRow>
      </TableHeader> */}
      <TableBody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {item.title && (
              <TableRow className="sticky top-0 bg-white z-10">
                <TableCell colSpan={maxOptions + 1}>
                  <Typography variant="h4" className="text-black">
                    {item.title}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {Array.isArray(item.features) && renderFeatureRows(item.features)}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default FeatureTable;
