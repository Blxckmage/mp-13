'use client';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/event.types';
import { toast } from 'sonner';
import { createTransaction } from '@/utils/actions/transaction';
import { Transaction, transactionSchema } from '@/types/transaction.types';
import { Promotion } from '@/types/promotion.types';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { Points } from '@/types/points.types';
import { Switch } from '@/components/ui/switch';

type BookTicketFormProps = {
  event: Event;
  eventPromotions: Promotion[];
  isUserTicket?: boolean;
  user_id?: number | undefined | null;
  userPoints?: Points[];
};

const transactionWithPromotionSchema = transactionSchema.extend({
  promotion_id: z.string().optional(),
});

type TransactionWithPromotion = z.infer<typeof transactionWithPromotionSchema>;

export default function BookTicketForm({
  event,
  eventPromotions,
  isUserTicket,
  user_id,
  userPoints,
}: BookTicketFormProps) {
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null,
  );
  const [usePoints, setUsePoints] = useState(false);

  const form = useForm<TransactionWithPromotion>({
    resolver: zodResolver(transactionWithPromotionSchema),
    defaultValues: {
      user_id: user_id as number,
      event_id: event.event_id as number,
      total_amount: 0,
      promotion_id: undefined,
    },
  });

  const { control, handleSubmit, watch } = form;
  const quantity = watch('quantity') || 0;

  const calculateTotal = () => {
    const baseAmount = event.ticket_price * quantity;
    let total = baseAmount;
    if (selectedPromotion) {
      const discount =
        (selectedPromotion.discount_percentage / 100) * baseAmount;
      total -= discount;
    }
    if (usePoints && userPoints && userPoints.length > 0) {
      const pointsValue = userPoints.reduce(
        (acc, point) => acc + point.points,
        0,
      );
      total -= pointsValue;
    }
    return total > 0 ? total : 0;
  };

  const onSubmit = async (data: Omit<Transaction, 'transaction_id'>) => {
    try {
      const newData = {
        ...data,
        total_amount: calculateTotal(),
        event_name: event.event_name,
        promotion_id: selectedPromotion?.promotion_id,
      };
      const response = createTransaction(JSON.parse(JSON.stringify(newData)));

      toast.promise(response, {
        loading: 'Creating transaction...',
        success:
          'Transaction created successfully, check your dashboard for transaction details',
        error: 'Failed to create transaction',
      });

      await response;
    } catch (error) {
      return error;
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 my-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="quantity"
          render={({ field }) => (
            <div>
              <FormLabel htmlFor="quantity">Ticket Quantity</FormLabel>
              <FormControl>
                {isUserTicket && isUserTicket ? (
                  <Input
                    max={event.ticket_limit}
                    type="number"
                    id="quantity"
                    disabled
                    {...field}
                  />
                ) : (
                  <Input
                    max={event.ticket_limit}
                    type="number"
                    id="quantity"
                    {...field}
                  />
                )}
              </FormControl>
              <FormDescription>
                {event.available_seats === 0
                  ? null
                  : `Seats available: ${event.available_seats}/${event.total_seats}`}
              </FormDescription>
              <FormMessage />
            </div>
          )}
        />

        <FormField
          control={control}
          name="promotion_id"
          render={({ field }) => (
            <div>
              <FormLabel htmlFor="promotion">Select Promotion</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const promotion = eventPromotions.find(
                      (p) => p.promotion_id === Number(value),
                    );
                    setSelectedPromotion(promotion || null);
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a promotion" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventPromotions.map((promotion) => (
                      <SelectItem
                        key={promotion.promotion_id}
                        value={promotion.promotion_id?.toString() as string}
                      >
                        {promotion.promotion_name} -{' '}
                        {promotion.discount_percentage}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        {userPoints && userPoints.length > 0 && (
          <div className="flex items-center">
            <Switch
              id="usePoints"
              checked={usePoints}
              onCheckedChange={() => setUsePoints(!usePoints)}
            />
            <FormLabel htmlFor="usePoints" className="ml-2">
              Redeem {userPoints?.reduce((acc, point) => acc + point.points, 0)}{' '}
              points
            </FormLabel>
          </div>
        )}

        <Separator />
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total Price: Rp. {calculateTotal().toLocaleString('id-ID')}
          </p>
        </div>
        {isUserTicket ? (
          <Button type="submit" className="w-full" disabled>
            Ticket already booked
          </Button>
        ) : event.available_seats === 0 ? (
          <Button type="submit" className="w-full" disabled>
            Sold out
          </Button>
        ) : (
          <Button type="submit" className="w-full">
            Book ticket
          </Button>
        )}
      </form>
    </Form>
  );
}
