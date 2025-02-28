import { MenuFooter } from '../components/MenuFooter';

export const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-grow bg-gray-300 items-center h-full w-full max-w-[600px] font-sans">
      <div className="flex flex-col flex-grow w-full h-full">{children}</div>
      <MenuFooter />
    </div>
  );
};

export default LoggedInLayout;
