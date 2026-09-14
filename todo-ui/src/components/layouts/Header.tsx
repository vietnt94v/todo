const Header = () => {
  return (
    <>
      <div className="flex justify-between p-2 bg-orange-300">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
