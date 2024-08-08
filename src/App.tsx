import { Sortable, type SortableProps } from "./components/Sortable";

type KEYS = "react" | "vue" | "angular" | "svelte" | "ember";

const items: SortableProps<KEYS>["items"] = [
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "angular", label: "Angular" },
  { key: "svelte", label: "Svelte" },
  { key: "ember", label: "Ember" },
];

const initialKeyCheckeds: SortableProps<KEYS>["initialKeyCheckeds"] = [
  "react",
  "angular",
];

function App() {
  return (
    <Sortable<KEYS>
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
