import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/ui/drawer';

interface CustomDrawerProps {
  headerText: string;
  drawerTriggerChildren?: React.ReactNode;
  drawerContentChildren: React.ReactNode;
  drawerHeight?: string;
}

export const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {
  const {
    headerText,
    drawerTriggerChildren,
    drawerContentChildren,
    drawerHeight = 'h-3/4',
  } = props;

  return (
    <Drawer>
      <DrawerTrigger className="relative">
        {drawerTriggerChildren}
      </DrawerTrigger>

      <DrawerContent className={`${drawerHeight}`}>
        <DrawerHeader className="z-10 flex flex-col items-center justify-center w-full bg-white border-b-2 rounded-none border-gray-300 shadow-[0_10px_10px_-5px_rgba(0,0,0,0.5)]">
          <DrawerTitle>{headerText}</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>

        <div className="flex flex-col items-center w-full h-full mx-auto bg-gray-200 pt-8 pb-12 z-1 overflow-y-auto">
          {drawerContentChildren}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
