import { Sortable, type SortableProps } from "./components/Sortable";

const items: SortableProps["items"] = [
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "angular", label: "Angular" },
  { key: "svelte", label: "Svelte" },
  { key: "ember", label: "Ember" },
];

const initialKeyCheckeds: SortableProps["initialKeyCheckeds"] = [
  "react",
  "angular",
];

function App() {
  return (
    <Sortable
      initialKeyCheckeds={initialKeyCheckeds}
      items={items}
      onSort={(allItems, checktedItems) => {
        console.log(allItems, checktedItems);
      }}
      showOnlyChecked={false}
    />
  );
}

export default App;
