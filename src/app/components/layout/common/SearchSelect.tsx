import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
type SearchSelectProps = {
  dataset: any[] | undefined;
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchDataIds: number[];
  setSearchDataIds: (searchDataIds: number[]) => void;
  selectedData: any[];
  setSelectedData: (selectedData: any[]) => void;
  initialData?: any[] | undefined;
  initialDataIds?: number[] | undefined;
  disabled: boolean;
  placeholder: string;
};

const SearchSelect: FunctionComponent<SearchSelectProps> = ({
  dataset,
  keyword,
  setKeyword,
  searchDataIds,
  setSearchDataIds,
  setSelectedData,
  selectedData,
  initialData,
  initialDataIds,
  disabled,
  placeholder,
}) => {
  const [onFocus, setOnFocus] = useState(false);
  const [noDataFound, setNoDataFound] = useState("");

  useEffect(() => {
    if (initialDataIds) {
      setSelectedData(initialData as any[]);
      setSearchDataIds(initialDataIds as number[]);
    }
  }, [initialData, setSelectedData, initialDataIds, setSearchDataIds]);

  const onClickData = useCallback(
    (data: any) => {
      setSelectedData([...selectedData, data]);
      setSearchDataIds([...searchDataIds, data.id!]);
    },
    [setSelectedData, setSearchDataIds, selectedData, searchDataIds]
  );

  const removeData = useCallback(
    (id: number) => {
      if (selectedData) {
        const deleted = selectedData.filter(
          (selectedData) => selectedData.id !== id
        );
        setSelectedData(deleted);

        const deletedIds = searchDataIds.filter((dataId) => dataId !== id);
        setSearchDataIds(deletedIds);
      }
    },
    [selectedData, setSelectedData, searchDataIds, setSearchDataIds]
  );

  // const isSelected = useMemo(
  //   () => (id: number) => {
  //     return selectedData!.some(function (item: Item) {
  //       return item.id === id;
  //     });
  //   },
  //   [selectedData]
  // );

  const useOutsideClick = (ref: any) => {
    const [outsideClick, setOutsideClick] = useState(false);

    useEffect(() => {
      const handleClickOutside = (e: any) => {
        setOutsideClick(!ref.current.contains(e.target));
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);

    return outsideClick;
  };

  const buttonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonClickedOutside = useOutsideClick(buttonRef);

  useEffect(() => {
    if (buttonClickedOutside) {
      setOnFocus(false);
    }
  }, [buttonClickedOutside, noDataFound, searchDataIds, setOnFocus]);

  const dropdownVisible = useCallback(() => {
    setOnFocus(true);
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [setOnFocus]);

  const setInputFocus = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      className={
        "relative " + (disabled ? "pointer-events-none bg-gray-100" : "")
      }
      ref={buttonRef}
    >
      <div
        onClick={dropdownVisible}
        className={classNames(
          onFocus ? "border-black" : " border-gray-300",
          "w-full inline-block shadow-sm px-2 pt-1 pr-11 cursor-text border"
        )}
      >
        {selectedData &&
          selectedData.map((data, i) => (
            <div
              key={i}
              className="inline-block relative bg-gray-200 rounded-md mr-1 mb-1"
            >
              <div className="cursor-default select-none py-2 pl-3 pr-9 text-gray-900 text-xs">
                <strong>[{data.id}]</strong> {data.name}
              </div>
              {/* <CircularButton
                icon={<XIcon aria-hidden="true" />}
                variant={ButtonType.gray}
                size={Size.xs}
                style={ButtonStyle.roundedR}
                className="absolute inset-y-0 right-0 mr-0 h-auto"
                onClick={() => {
                  removeData(data.id!);
                }}
              /> */}
            </div>
          ))}

        <input
          ref={inputRef}
          name="multiSelect"
          placeholder={placeholder}
          disabled={disabled}
          onFocus={dropdownVisible}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value.toString() || "");
            setNoDataFound("");
          }}
          className={classNames(
            !disabled ? "" : "bg-gray-100 text-gray-500 ",
            "relative border border-transparent pb-2 pt-1 sm:text-sm focus:outline-none"
          )}
        ></input>
      </div>

      {onFocus && (
        <div className="relative">
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {dataset && dataset.length > 0 ? (
              dataset.map((data, i) => (
                <li
                  // className={classNames(
                  //   isSelected(data.id!) ? "hidden" : "",
                  //   "relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  // )}
                  role="option"
                  key={i}
                  value={data.id || ""}
                  onClick={() => {
                    onClickData(data);
                    setInputFocus();
                  }}
                >
                  <strong>[{data.id}]</strong> {data.name}
                </li>
              ))
            ) : !dataset ? (
              <li className="py-8 px-5 block text-center animate-pulse">
                {" "}
                Searching...{" "}
              </li>
            ) : (
              <li className="py-8 px-5 block text-center">
                {" "}
                No results found{" "}
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="absolute top-2.5 right-0 pr-3 flex items-center">
        {keyword.length > 0 || (selectedData && selectedData.length > 0) ? (
          <button
            className="cursor-pointer"
            onClick={() => {
              setSelectedData([]);
              setSearchDataIds([]);
              setKeyword(String(""));
              setInputFocus();
            }}
          >
            {/* <XIcon
              className="h-4 w-4 text-gray-400 hover:text-gray-500"
              aria-hidden="true"
            /> */}
          </button>
        ) : null}
        {/* <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
      </div>
    </div>
  );
};

export default SearchSelect;