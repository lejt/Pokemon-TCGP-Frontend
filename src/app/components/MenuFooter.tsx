import Link from 'next/link';
import {
  Menubar,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../components/ui/menubar';

export const MenuFooter: React.FC = () => {
  return (
    <Menubar className="fixed bottom-0 min-w-[600px] rounded-none h-[100px] flex bg-slate-100 drop-shadow-[0px_-20px_10px_rgba(0,0,0,0.2)] border-2 border-black">
      <MenubarMenu>
        <MenubarTrigger className="h-full w-full">
          <Link
            href="/home"
            className="w-full h-full flex justify-center items-center"
          >
            Home
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator className="bg-gray-400 h-[50%] w-2" />
      <MenubarMenu>
        <MenubarTrigger className="h-full w-full">
          <Link
            href="/cards"
            className="w-full h-full flex justify-center items-center"
          >
            My Cards
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator className="bg-gray-400 h-[50%] w-2" />
      <MenubarMenu>
        <MenubarTrigger className="h-full w-full flex justify-center cursor-not-allowed">
          Friends
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator className="bg-gray-400 h-[50%] w-2" />
      <MenubarMenu>
        <MenubarTrigger className="h-full w-full flex justify-center cursor-not-allowed">
          Battle
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
