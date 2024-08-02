'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/types/ticket.types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'event.event_name',
    header: 'Event Name',
    cell: ({ row }) => {
      return (
        <Link href={`/events/${row.original.event_id}`}>
          <Button variant="link">{row.original.event.event_name}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Ticket Quantity',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge>{row.original.quantity}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'event.event_location',
    header: 'Location',
  },
  {
    accessorKey: 'event.start_date',
    header: 'Start At',
    cell: ({ row }) => {
      return new Date(row.original.event.start_date).toLocaleString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
  {
    accessorKey: 'event.end_date',
    header: 'End At',
    cell: ({ row }) => {
      return new Date(row.original.event.end_date).toLocaleString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
];
