import { useState ,useEffect} from 'react';
import { Flex, Input, InputGroup, InputLeftElement, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

export const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchValue);
    }, 500); // Adjust the delay time as needed (e.g., 500ms)

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, onSearch]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <Flex align="center" py={2} my={2}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <IconButton
            icon={<SearchIcon />}
            aria-label="Search"
            variant="ghost"
            colorScheme="gray"
            size="sm"
          />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Leads"
          value={searchValue}
          variant="outline"
          onChange={handleSearchChange}
        />
        {searchValue && (
          <IconButton
            icon={<CloseIcon />}
            aria-label="Clear"
            variant="ghost"
            colorScheme="gray"
            size="sm"
            onClick={clearSearch}
          />
        )}
      </InputGroup>
    </Flex>
  );
};


