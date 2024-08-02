import { getEventAttendees, getEventById } from '@/utils/actions/events';
import { columns } from './columns';
import { DataTable } from './data-table';
import BackButton from '@/components/dashboard/BackButton';
import { Event } from '@/types/event.types';

export default async function EventAttendeesPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const data = await getEventAttendees(params.id);
  const event: Event = await getEventById(params.id);
  return (
    <div className="container mx-auto py-10">
      <BackButton className="ml-[-1rem]" />
      <h1 className="text-3xl font-semibold mb-6">{event.event_name}</h1>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
