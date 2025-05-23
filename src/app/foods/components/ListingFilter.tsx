// @ts-nocheck : JS compatible
// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Project services and utilities

// 4. Components and UI elements

function ListingFilter({ className, category, sortBy, sortOrder }) {

  return (
    <div
      className={`${className} bg-card1 rounded-lg shadow-md p-4`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            value={category.value}
            onChange={(e) => {
              category.onChange(e);
            }}
          >
            <option value="">All</option>
            <option value="beverage">Beverage</option>
            <option value="condiments">Condiments</option>
            <option value="cream_crackers">Cream Crackers</option>
            <option value="dairy">Dairy</option>
            <option value="dessert">Dessert</option>
            <option value="fruit">Fruit</option>
            <option value="grain">Grain</option>
            <option value="meat">Meat</option>
            <option value="misc">Misc</option>
            <option value="oils-fats">Oils Fats</option>
            <option value="seafood">Seafood</option>
            <option value="snack">Snack</option>
            <option value="vegetable">Vegetable</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <select
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            value={sortBy.value}
            onChange={(e) => {
              sortBy.onChange(e);
            }}
          >
            <option value="name">Name</option>
            <option value="calories_kcal">Calories</option>
            <option value="protein_g">Protein</option>
            <option value="carbs_g">Carbs</option>
            <option value="fat_g">Fat</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sort Order</label>
          <select
            className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            value={sortOrder.value}
            onChange={(e) => {
              sortOrder.onChange(e);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ListingFilter;