'use client';
import { Button } from '@/components/ui/button';
import { payTransaction } from '@/utils/actions/transaction';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PayTicketButton({
  transaction_id,
  children,
}: {
  transaction_id?: number | null;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const handlePayment = async () => {
    try {
      const response = payTransaction(transaction_id as number);

      if (response) {
        toast.promise(response, {
          loading: 'Paying ticket...',
          success: 'Ticket paid successfully',
          error: 'Failed to pay ticket',
        });
      }

      await response;
    } catch (error) {
      toast.error('Failed to pay ticket');
    } finally {
      router.refresh();
    }
  };

  return (
    <Button
      onClick={handlePayment}
      className="
      hover:bg-slate-200"
    >
      {children}
    </Button>
  );
}
