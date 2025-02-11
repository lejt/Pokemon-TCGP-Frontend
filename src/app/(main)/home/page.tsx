import { Card } from '@/app/components/ui/card';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full justify-center">
      <Card className="h-[300px] mb-20">{/* booster */}</Card>
      <div className="flex justify-between">
        {/* TODO: put same styled components in one className */}
        <Card className="border-black border-5 h-[250px] w-[250px]">
          {/* wonder pick */}
        </Card>
        <Card className="border-black border-5 h-[250px] w-[250px]">
          {/* shop */}
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
