import BackButton from '@/components/dashboard/BackButton';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getPromotionByEventId } from '@/utils/actions/promotion';
import { Promotion } from '@/types/promotion.types';

export default async function ManagePromotionsPage({
  params,
}: {
  params: { id: number };
}) {
  const data: Promotion[] = await getPromotionByEventId(params.id);

  return (
    <div className="container mx-auto py-10">
      <BackButton className="ml-[-1rem]" />

      <DataTable event_id={params.id} columns={columns} data={data} />
    </div>
  );
}
