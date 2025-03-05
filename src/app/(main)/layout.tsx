import { MenuFooter } from '../components/MenuFooter';

export const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-grow bg-gray-300 items-center h-full w-full max-w-[600px] font-sans">
      <div className="flex flex-col flex-grow w-full shadow-[50px_0px_100px_rgba(0,0,0,0.7),-50px_0px_100px_rgba(0,0,0,0.7)]">
        {children}
      </div>
      <MenuFooter />
    </div>
  );
};

export default LoggedInLayout;
