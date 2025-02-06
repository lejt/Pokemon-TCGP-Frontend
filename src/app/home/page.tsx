import { MenuFooter } from '../components/MenuFooter';
import { Card } from '../components/ui/card';
import { UserMenuHeader } from '../components/UserMenuHeader';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col h-lvh w-full items-center justify-between bg-blue-500">
      <UserMenuHeader />
      <Card className="h-[250px] w-[600px]">{/* booster */}</Card>
      <div className="flex justify-between w-[600px]">
        <Card className="border-black border-5 h-[250px] w-[250px]">
          {/* wonder pick */}
        </Card>
        <Card className="border-black border-5 h-[250px] w-[250px]">
          {/* shop */}
        </Card>
      </div>
      <Card>{/* footer */}</Card>
      <MenuFooter />
    </div>
  );
};

export default HomePage;
