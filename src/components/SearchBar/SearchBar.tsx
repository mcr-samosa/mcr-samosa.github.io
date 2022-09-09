import ReactSearchBox from "react-search-box";
import "./SearchBar.css";
import { Button } from "react-bulma-components";

export interface SearchItem {
  key: string;
  value: string;
}
interface SearchProps {
  data: SearchItem[];
  placeholder: string;
  onSelect: (selection: { item: SearchItem }) => void;
}

const SearchBar = ({ data, placeholder, onSelect }: SearchProps) => {
  return (
    <div className="search-container is-flex" style={{ position: "relative" }}>
      <ReactSearchBox
        placeholder={placeholder}
        data={data}
        onSelect={onSelect}
        onChange={() => void 0}
        fuseConfigs={{
          ignoreLocation: true,
          shouldSort: true,
        }}
      />
      <Button
        onClick={() =>
          onSelect({ item: data[Math.floor(Math.random() * data.length)] })
        }
      >
        I&apos;m feeling lucky
      </Button>
    </div>
  );
};

export default SearchBar;
