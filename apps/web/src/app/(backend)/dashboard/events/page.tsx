import { getEvents } from '@/utils/actions/events';
import { columns } from './columns';
import { DataTable } from './data-table';
import BackButton from '@/components/dashboard/BackButton';

export default async function EventsPage() {
  const data = await getEvents();
  return (
    <div className="container mx-auto py-10">
      <BackButton className="ml-[-1rem]" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
