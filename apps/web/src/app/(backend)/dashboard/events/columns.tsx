'use client';

import CreatePromoForm from '@/components/dashboard/promo/CreatePromoForm';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Event } from '@/types/event.types';
import { deleteEvent } from '@/utils/actions/events';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDownIcon, DeleteIcon, Users } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'event_name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <Link href={`/events/${row.original.event_id}`}>
          <Button variant="link">{row.original.event_name}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ row }) => {
      return new Date(row.original.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ row }) => {
      return new Date(row.original.end_date).toLocaleDateString('en-UK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  {
    accessorKey: 'event_location',
    header: 'Location',
  },
  {
    accessorKey: 'available_seats',
    header: 'Available Seats',
    cell: ({ row }) => {
      return row.original.available_seats === 0
        ? 'Sold Out'
        : `${row.original.available_seats}/${row.original.total_seats}`;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDownIcon size={16} />
                <span className="sr-only">Open actions menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <Link href={`/dashboard/events/${row.original.event_id}`}>
                <DropdownMenuItem className="hover:cursor-pointer">
                  <Button size="sm" variant="ghost">
                    <Users size={16} className="mr-2" />
                    View Attendees
                  </Button>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className="hover:cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <CreatePromoForm event_id={row.original.event_id as number} />
              </DropdownMenuItem>

              <DropdownMenuItem className="hover:cursor-pointer">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    deleteEvent(row.original.event_id as number).then(() => {
                      window.location.reload();
                    });
                  }}
                >
                  <DeleteIcon size={16} className="mr-2" />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
