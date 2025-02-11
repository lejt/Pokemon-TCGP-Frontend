import { MenuFooter } from '../components/MenuFooter';

export const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center h-full min-h-dvh w-full max-w-[600px] bg-blue-500 relative">
      <div className="flex flex-col flex-grow w-full min-h-0">{children}</div>
      <MenuFooter />
    </div>
  );
};

export default LoggedInLayout;
