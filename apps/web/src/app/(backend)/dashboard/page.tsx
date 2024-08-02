import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { transactionSchema } from '@/types/transaction.types';
import { getSession } from '@/utils/actions/authentication';
import { getOrganizerEvents } from '@/utils/actions/events';
import { getTransactionsByOrganizerId } from '@/utils/actions/transaction';
import { ArrowUpRight, DollarSign, Ticket, Users } from 'lucide-react';
import Link from 'next/link';
import { userSchema } from '@/types/user.types';
import { eventSchema } from '@/types/event.types';
import { z } from 'zod';
import { TransactionChart } from '@/components/dashboard/TransactionChart';

const dashboardTransactionSchema = transactionSchema.extend({
  user: userSchema,
  event: eventSchema,
});

type DashboardTransaction = z.infer<typeof dashboardTransactionSchema>;

const DashboardPage = async () => {
  const session = await getSession();
  if (!session) return <div>Unauthorized</div>;
  const events = await getOrganizerEvents(session?.user_id as number);
  const transactions = await getTransactionsByOrganizerId(
    session?.user_id as number,
  );

  const transactionData = transactions.map(
    (transaction: DashboardTransaction) => ({
      user_id: transaction.user.user_id,
      event_id: transaction.event.event_id,
      event_name: transaction.event.event_name,
      transaction_date: transaction.created_at,
      quantity: transaction.quantity,
      total_amount: transaction.total_amount,
    }),
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp.{' '}
              {transactions
                // @ts-ignore
                .reduce((acc, curr) => acc + curr.total_amount, 0)
                .toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground">
              Total revenue from your events
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">
              Events you have created
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactions
                // @ts-ignore
                .reduce((acc, curr) => acc + curr.quantity, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 grid-cols-1">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your events
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/transactions">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attendant</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions
                  .slice(0, 5)
                  .map((transaction: DashboardTransaction) => (
                    <TableRow key={transaction.transaction_id}>
                      <TableCell>
                        <div className="font-medium">
                          {transaction.user.full_name}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {transaction.user.email}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.event.event_name}</TableCell>
                      <TableCell>
                        <Badge className="text-xs">
                          {transaction.transaction_status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.created_at}</TableCell>
                      <TableCell className="text-right">
                        Rp. {transaction.total_amount.toLocaleString('id-ID')}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 grid-cols-1">
        <TransactionChart transactions={transactionData} />
      </div>
    </main>
  );
};

export default DashboardPage;
