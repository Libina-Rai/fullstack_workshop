import { useSelector, useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

   const filterSelected = (filter) => {
    console.log(filter);
    // setFilter(filter);
    dispatch(filterChange(filter));
  };

  return (
    <div>
      All
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("All")}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("Important")}
      />
      non important
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("Non_Important")}
      />
    </div>
  );
};

export default VisibilityFilter;
