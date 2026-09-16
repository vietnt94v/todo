import { useState } from 'react';
import Badge from '../../components/ui/Badge';

type InventoryItem = {
  id: string;
  sku: string;
  quantity: number;
  status: 'AVAILABLE' | 'HOLD' | 'DAMAGED';
};

type SimulationMode = 'success' | 'empty' | 'error';

type InventoryState =
  | { status: 'idle'; mode: SimulationMode }
  | { status: 'loading'; mode: SimulationMode }
  | { status: 'success'; mode: SimulationMode; data: InventoryItem[] }
  | { status: 'error'; mode: SimulationMode; message: string };

type SimulationOption = {
  value: SimulationMode;
  label: string;
};

const simulationOptions: SimulationOption[] = [
  { value: 'success', label: 'Success' },
  { value: 'empty', label: 'Empty' },
  { value: 'error', label: 'Error' },
];

const inventoryStatuses: InventoryItem['status'][] = [
  'AVAILABLE',
  'HOLD',
  'DAMAGED',
];

const badgeStatusByInventoryStatus: Record<
  InventoryItem['status'],
  'success' | 'warning' | 'error'
> = {
  AVAILABLE: 'success',
  HOLD: 'warning',
  DAMAGED: 'error',
};

const isSimulationMode = (value: string): value is SimulationMode =>
  value === 'success' || value === 'empty' || value === 'error';

const createInventories = (count: number): InventoryItem[] =>
  Array.from({ length: count }, (_, index) => {
    const number = index + 1;

    return {
      id: number.toString(),
      sku: `SKU-${number.toString().padStart(3, '0')}`,
      quantity: Math.floor(Math.random() * 200),
      status:
        inventoryStatuses[
          Math.floor(Math.random() * inventoryStatuses.length)
        ] ?? 'AVAILABLE',
    };
  });

const fetchInventories = async (
  mode: SimulationMode,
): Promise<InventoryItem[]> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 800));

  if (mode === 'error') {
    throw new Error('Unable to load inventory');
  }

  return mode === 'empty' ? [] : createInventories(10);
};

const Inventory = () => {
  const [state, setState] = useState<InventoryState>({
    status: 'idle',
    mode: 'success',
  });
  const isLoading = state.status === 'loading';

  const loadInventories = async () => {
    if (state.status === 'loading') {
      return;
    }

    const mode = state.mode;
    setState({ status: 'loading', mode });

    try {
      const data = await fetchInventories(mode);
      setState({ status: 'success', mode, data });
    } catch (error: unknown) {
      setState({
        status: 'error',
        mode,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const renderContent = () => {
    if (state.status === 'idle') {
      return <p>Click Load inventory to view inventory.</p>;
    }

    if (state.status === 'loading') {
      return <p role="status">Loading…</p>;
    }

    if (state.status === 'error') {
      return (
        <div>
          <p role="alert">{state.message}</p>
          <button type="button" onClick={loadInventories}>
            Try again
          </button>
        </div>
      );
    }

    if (state.data.length === 0) {
      return <p>No inventory available.</p>;
    }

    return (
      <div className="max-h-150 overflow-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">SKU</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map((inventory) => (
              <tr key={inventory.id}>
                <td>{inventory.id}</td>
                <td>{inventory.sku}</td>
                <td>{inventory.quantity}</td>
                <td>
                  <Badge
                    text={inventory.status}
                    status={badgeStatusByInventoryStatus[inventory.status]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="space-y-4">
      <div className="flex items-end gap-3">
        <div className="grid gap-1">
          <label htmlFor="inventory-mode">Simulation mode</label>
          <select
            id="inventory-mode"
            value={state.mode}
            disabled={isLoading}
            onChange={(event) => {
              const mode = event.currentTarget.value;

              if (isSimulationMode(mode)) {
                setState({ status: 'idle', mode });
              }
            }}
          >
            {simulationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled={isLoading}
          className="disabled:cursor-not-allowed disabled:opacity-50"
          onClick={loadInventories}
        >
          Load inventory
        </button>
      </div>

      {renderContent()}
    </section>
  );
};

export default Inventory;
