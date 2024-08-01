import { Button } from '@/components/ui/button';
import { Dialog, DialogClose } from '@/components/ui/dialog';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getSession } from '@/utils/actions/authentication';
import {
  Banknote,
  Folder,
  HomeIcon,
  Menu,
  UserIcon,
  LogOut,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';

export default async function DashboardNavbar({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <Menu />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Event Management</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </DialogClose>
              {session?.role === 'organizer' ? (
                <>
                  <DialogClose asChild>
                    <Link href="/dashboard/events">
                      <Button variant="outline" className="w-full">
                        <Folder className="mr-2 h-4 w-4" />
                        Events
                      </Button>
                    </Link>
                  </DialogClose>
                  <DialogClose asChild>
                    <Link href="/dashboard/transactions">
                      <Button variant="outline" className="w-full">
                        <Banknote className="mr-2 h-4 w-4" />
                        Transactions
                      </Button>
                    </Link>
                  </DialogClose>
                </>
              ) : (
                <>
                  <DialogClose asChild>
                    <Link href="/dashboard/tickets">
                      <Button variant="outline" className="w-full">
                        <Ticket className="mr-2 h-4 w-4" />
                        Your tickets
                      </Button>
                    </Link>
                  </DialogClose>
                  <DialogClose asChild>
                    <Link href="/dashboard/transactions">
                      <Button variant="outline" className="w-full">
                        <Banknote className="mr-2 h-4 w-4" />
                        Your transactions
                      </Button>
                    </Link>
                  </DialogClose>
                </>
              )}
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 hover:cursor-pointer">
                <AvatarFallback>
                  {session?.full_name.split(' ').map((name) => name[0])}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{session?.full_name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/profile">
                <DropdownMenuItem className="hover:cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
              </Link>

              <Link href="/api/auth/signout">
                <DropdownMenuItem className="hover:cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {children}
    </div>
  );
}
