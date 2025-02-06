import {
  Menubar,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../components/ui/menubar';

export const MenuFooter: React.FC = () => {
  return (
    <Menubar className="absolute fixed bottom-0 w-full max-w-[600px] h-[100px] flex justify-evenly items-center">
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
      </MenubarMenu>
      <MenubarSeparator />
      <MenubarMenu>
        <MenubarTrigger>My Cards</MenubarTrigger>
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
