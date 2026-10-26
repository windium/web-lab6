// Controlled input: the value lives in App's state and every change goes through onChange.
function FilterForm({ value, onChange }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <label htmlFor="title-filter">Filter by title</label>
      <input
        id="title-filter"
        type="text"
        placeholder="Type to filter posts..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  );
}

export default FilterForm;
