import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/app/components/ui/drawer';

export default function LoginForm() {
  return (
    <div className="p-8 space-y-4 h-screen w-screen w-1/2 flex-col justify-items-center">
      <Card className="px-10 py-8 space-y-4 w-1/2 flex-col outline-2">
        <DrawerHeader>
          <DrawerTitle>Login</DrawerTitle>
          <DrawerDescription>
            Enter your credentials to continue.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Enter username" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" />
        </div>

        <DrawerFooter>
          <Button className="w-full">Login</Button>
        </DrawerFooter>
      </Card>
    </div>
  );
}
