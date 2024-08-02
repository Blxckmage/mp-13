'use client';

import { Promotion } from '@/types/promotion.types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: 'promotion_name',
    header: 'Promotion Name',
  },
  {
    accessorKey: 'discount_percentage',
    header: 'Discount Percentage',
    cell: ({ row }) => {
      return `${row.original.discount_percentage}%`;
    },
  },
  {
    accessorKey: 'valid_from',
    header: 'Valid From',
    cell: ({ row }) => {
      return new Date(row.original.valid_from).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'valid_until',
    header: 'Valid Until',
    cell: ({ row }) => {
      return new Date(row.original.valid_until).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'max_uses',
    header: 'Max Uses',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      return new Date(row.original.created_at as string).toLocaleDateString(
        'en-UK',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      );
    },
  },
];
