import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/user.types';
import { getSession } from '@/utils/actions/authentication';
import { getUserById } from '@/utils/actions/users';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function ProfilePage() {
  const session = await getSession();
  const user: User = await getUserById(session?.user_id as number);
  const userPoints = console.log(user);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center p-6">
        <Avatar className="h-24 w-24 mb-4">
          {/* <AvatarImage src="/placeholder-user.jpg" /> */}
          <AvatarFallback>
            {user.full_name
              .split(' ')
              .map((name) => name[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{user.full_name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.role === 'participant' ? (
              <>
                <div className="flex justify-between items-center">
                  <h1>Current Points: </h1>
                  <span className="font-bold">
                    {user?.points?.reduce(
                      (acc, point) => acc + point.points,
                      0,
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h1>Referral Code:</h1>
                  <span className="font-bold">
                    {user?.referrals?.at(-1)?.referral_code}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h1>Events Created:</h1>
                  <span className="font-bold">{user?.events?.length}</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
