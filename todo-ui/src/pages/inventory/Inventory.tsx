import Badge from '../../components/ui/Badge';

type Inventory = {
  id: string;
  sku: string;
  quantity: number;
  status: 'AVAILABLE' | 'HOLD' | 'DAMAGED';
};

type InventoryList = {
  inventories: Inventory[];
  onSelectInventory: (inventory: Inventory) => void;
};

const inventoriesFactory = (count: number): InventoryList => {
  const statuses: Inventory['status'][] = ['AVAILABLE', 'HOLD', 'DAMAGED'];
  const generatedInventories: Inventory[] = [];

  for (let i = 1; i <= count; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    generatedInventories.push({
      id: i.toString(),
      sku: `SKU-${i.toString().padStart(3, '0')}`,
      quantity: Math.floor(Math.random() * 200),
      status: randomStatus,
    });
  }

  return {
    inventories: generatedInventories,
    onSelectInventory: () => {},
  };
};

const InventoryList = ({ inventories, onSelectInventory }: InventoryList) => {
  const getStatusColor = (status: Inventory['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'HOLD':
        return 'warning';
      case 'DAMAGED':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <div className="max-h-150 overflow-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id}>
              <td>{inventory.id}</td>
              <td>{inventory.sku}</td>
              <td>{inventory.quantity}</td>
              <td>
                <Badge
                  text={inventory.status}
                  status={getStatusColor(inventory.status)}
                />
              </td>
              <td>
                <button onClick={() => onSelectInventory(inventory)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Inventory = () => {
  const handleSelectInventory = (inventory: Inventory) => {
    console.log('Selected Inventory:', inventory);
  };
  return (
    <>
      <InventoryList
        {...inventoriesFactory(20)}
        onSelectInventory={handleSelectInventory}
      />
    </>
  );
};

export default Inventory;
