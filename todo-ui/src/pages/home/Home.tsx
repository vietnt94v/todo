import Badge from '../../components/ui/Badge';

const Home = () => {
  return (
    <div className="block">
      Hello WMS
      <div>
        <Badge text="DAMAGED" status="error" />
      </div>
    </div>
  );
};

export default Home;
