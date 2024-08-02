import { getSession } from '@/utils/actions/authentication';
import BackButton from '@/components/dashboard/BackButton';
import { getTicketByUserId } from '@/utils/actions/ticket';
import { DataTable } from './data-table';
import { columns } from './columns';

export default async function TicketsPage() {
  const user = await getSession();
  const data = await getTicketByUserId(user?.user_id as number);

  return (
    <div className="container mx-auto py-10">
      <BackButton className="ml-[-1rem]" />

      <DataTable columns={columns} data={data} />
    </div>
  );
}
