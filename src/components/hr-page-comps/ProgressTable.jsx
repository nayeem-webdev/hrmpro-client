import { Link } from "react-router-dom";

const ProgressTable = () => {
  // const [sortedData, setSortedData] = useState([...allData]);
  // const [isAscending, setIsAscending] = useState(true);

  // Toggle Sorting: Low to High / High to Low
  // const toggleSorting = () => {
  //   const sorted = [...allData].sort((a, b) =>
  //     isAscending ? a.price - b.price : b.price - a.price
  //   );
  //   setSortedData(sorted);
  //   setIsAscending(!isAscending);
  // };

  return (
    <>
      {/* Sorting Buttons */}
      {/* <div className="flex justify-end mb-4">
        <button
          // onClick={toggleSorting}
          aria-label={`Sort by price ${
            isAscending ? "Low to High" : "High to Low"
          }`}
          className=" py-2 px-4 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-black/70 dark:hover:bg-white/70 transition flex justify-center items-center gap-2 font-bold"
        >
          Sort by Price: {isAscending ? "Low to High" : "High to Low"}
        </button>
      </div> */}

      {/* Product Table */}
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
              Sl.
            </th>
            <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
              Sl.
            </th>
            <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
              Sl.
            </th>
            <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
              Sl.
            </th>
            <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
              Sl.
            </th>
          </tr>
        </thead>
        {/* <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={item._id}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
              <td className="py-2 px-4 text-center">
                <img
                  src={item.product_image}
                  alt={item.product_title}
                  className="w-14 h-14 mx-auto object-scale-down bg-white p-1"
                />
              </td>
              <td className="py-2 px-4">{item.product_title}</td>
              <td className="py-2 px-4 text-center">
                {item.category.replace("-", " ").toUpperCase()}
              </td>
              <td className="py-2 px-4 text-center">$ {item.price}</td>
              <td className="py-2 px-4 text-center">
                <Link
                  to={`/shop/product/${item._id}`}
                  className="mt-3 w-full bg-black text-white  py-2 px-4 rounded-md hover:bg-black/70  transition flex justify-center items-center gap-2 font-bold"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </>
  );
};

export default ProgressTable;
