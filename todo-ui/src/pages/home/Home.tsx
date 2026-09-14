import useStore from '../../store';

const Home = () => {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <div className="block">
      <div>Theme: {theme}</div>
      <button onClick={() => toggleTheme(theme)}>Toggle Theme</button>
    </div>
  );
};

export default Home;
