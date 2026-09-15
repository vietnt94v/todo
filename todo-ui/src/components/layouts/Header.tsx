import { Moon, Sun } from 'lucide-react';
import useStore from '../../store';

const Header = () => {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  return (
    <>
      <div className="flex justify-between p-2 bg-orange-300">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <div>
          <button
            onClick={() => toggleTheme(theme)}
            className="flex items-center gap-2"
          >
            {theme === 'light' ? (
              <>
                <Moon strokeWidth={1} />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun strokeWidth={1} />
                <span>Light</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
