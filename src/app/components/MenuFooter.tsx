import Link from 'next/link';
import {
  Menubar,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../components/ui/menubar';

export const MenuFooter: React.FC = () => {
  return (
    <Menubar className="fixed bottom-0 min-w-[600px] border-none h-[100px] flex justify-evenly items-center bg-red-500">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/home">Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator />
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/cards">My Cards</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator />
      <MenubarMenu>
        <MenubarTrigger>Friends</MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator />
      <MenubarMenu>
        <MenubarTrigger>Battle</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
