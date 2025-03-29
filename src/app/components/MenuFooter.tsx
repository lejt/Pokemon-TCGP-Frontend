import Link from 'next/link';
import {
  Menubar,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../components/ui/menubar';

export const MenuFooter: React.FC = () => {
  return (
    <Menubar className="fixed bottom-0 min-w-[600px] rounded-none h-[100px] flex bg-gradient-to-r from-slate-300 via-white to-slate-300 drop-shadow-[0px_-20px_10px_rgba(0,0,0,0.2)] border-x-2 border-black border-t-0">
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
            Cards
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator className="bg-gray-400 h-[50%] w-2" />
      <MenubarMenu>
        <MenubarTrigger className="h-full w-full flex justify-center cursor-not-allowed text-gray-500">
          Friends
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator className="bg-gray-400 h-[50%] w-2" />
      <MenubarMenu>
        <MenubarTrigger className="h-full w-full flex justify-center cursor-not-allowed text-gray-500">
          Battle
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
