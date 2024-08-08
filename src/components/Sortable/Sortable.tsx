import { ReactNode, useState } from "react";
import * as S from "./styles";
import { Grip } from "lucide-react";

type ItemSortable<TKey = string> = {
  key: TKey;
  label: string;
};

export type SortableProps<TKey = string> = {
  items: ItemSortable<TKey>[];
  initialKeyCheckeds: TKey[];
  onSort: (
    allitemsSorted: ItemSortable<TKey>[],
    onlyCheckedSorted: ItemSortable<TKey>[]
  ) => void;
  showOnlyChecked?: boolean;
  renderItem?: (props: ItemProps) => ReactNode;
  forceSort?: boolean;
};

type Item<TKey = string> = ItemSortable<TKey> & {
  checked: boolean;
};

export function Sortable<TKey = string>({
  initialKeyCheckeds,
  items,
  onSort,
  showOnlyChecked = false,
  renderItem,
  forceSort,
}: SortableProps<TKey>) {
  const [sortedItems, setSortedItems] = useState<Item<TKey>[]>(() => {
    const mappedItems: Item<TKey>[] = items.map((item) => ({
      ...item,
      checked: initialKeyCheckeds.includes(item.key),
    }));

    return mappedItems.sort((a, b) => Number(b.checked) - Number(a.checked));
  });

  const toggleCheckbox = (label: string) => {
    const newItems: Item<TKey>[] = sortedItems.map((item) =>
      item.label === label ? { ...item, checked: !item.checked } : item
    );

    newItems.sort((a, b) => Number(b.checked) - Number(a.checked));

    setSortedItems(newItems);
    onSort(
      newItems,
      newItems.filter((item) => item.checked)
    );
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLElement>,
    index: number
  ) => {
    event.dataTransfer.setData("dragIndex", index.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    const dragIndex = Number(event.dataTransfer.getData("dragIndex"));

    if (dragIndex !== dropIndex) {
      const newItems = [...sortedItems];
      const [draggedItem] = newItems.splice(dragIndex, 1);
      newItems.splice(dropIndex, 0, draggedItem);

      if (forceSort)
        newItems.sort((a, b) => Number(b.checked) - Number(a.checked));

      setSortedItems(newItems);
      onSort(
        newItems,
        newItems.filter((item) => item.checked)
      );
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const displayedItems = showOnlyChecked
    ? sortedItems.filter((item) => item.checked)
    : sortedItems;

  return (
    <div>
      {displayedItems.map((item, index) => (
        <div
          key={item.label}
          onDrop={(event) => handleDrop(event, index)}
          onDragOver={handleDragOver}
        >
          {renderItem ? (
            renderItem({
              index,
              checked: item.checked,
              label: item.label,
              onClick: () => toggleCheckbox(item.label),
              onDragStart: (event) => handleDragStart(event, index),
            })
          ) : (
            <Sortable.Item
              index={index}
              checked={item.checked}
              label={item.label}
              onClick={() => toggleCheckbox(item.label)}
              onDragStart={handleDragStart}
            />
          )}
        </div>
      ))}
    </div>
  );
}

type ItemProps = {
  index: number;
  checked: boolean;
  label: string;
  onClick: () => void;
  onDragStart: (event: React.DragEvent<HTMLElement>, index: number) => void;
};

Sortable.Item = function Item({
  checked,
  label,
  onClick,
  onDragStart,
  index,
}: ItemProps) {
  return (
    <S.ContainerItem
      draggable
      onDragStart={(event) => onDragStart(event, index)}
    >
      <div>
        <S.Checkbox checked={checked} onChange={onClick} />
        <span>{label}</span>
      </div>

      <Grip size={24} />
    </S.ContainerItem>
  );
};
