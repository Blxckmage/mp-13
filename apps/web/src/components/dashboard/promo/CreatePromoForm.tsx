'use client';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Promotion, promotionSchema } from '@/types/promotion.types';
import { createPromotion } from '@/utils/actions/promotion';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Check, Percent } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreatePromoForm({ event_id }: { event_id: number }) {
  const form = useForm<Promotion>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      event_id: event_id,
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: Promotion) => {
    try {
      const response = createPromotion(data);

      toast.promise(response, {
        loading: 'Creating promotion...',
        success: 'Promotion created successfully',
        error: 'Failed to create promotion',
      });

      await response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Percent size={16} className="mr-2" />
          Create Promotion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Promotion</DialogTitle>
          <DialogDescription>
            Make a promotion for users to use on their next purchase.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={control}
                name="promotion_name"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="name" className="text-right">
                      Promotion Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        className="col-span-3"
                        placeholder="Enter promotion name"
                        onKeyDown={(e) => e.stopPropagation()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-center" />
                  </div>
                )}
              />

              <FormField
                control={control}
                name="discount_percentage"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="discount" className="text-right">
                      Discount Percentage
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="discount"
                        className="col-span-3"
                        placeholder="Enter discount percentage(%)"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-center" />
                  </div>
                )}
              />

              <FormField
                control={control}
                name="valid_from"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="valid_from" className="text-right">
                      Valid From
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker {...field} />
                    </FormControl>
                    <FormMessage className="col-span-3 text-center" />
                  </div>
                )}
              />

              <FormField
                control={control}
                name="valid_until"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="valid_until" className="text-right">
                      Valid Until
                    </FormLabel>
                    <FormControl>
                      <DateTimePicker {...field} />
                    </FormControl>
                    <FormMessage className="col-span-3 text-center" />
                  </div>
                )}
              />

              <FormField
                control={control}
                name="max_uses"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="max_uses" className="text-right">
                      Max Uses
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="max_uses"
                        className="col-span-3"
                        placeholder="Enter max uses"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-3 text-center" />
                  </div>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">
                  <Check size={16} className="mr-2" />
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
