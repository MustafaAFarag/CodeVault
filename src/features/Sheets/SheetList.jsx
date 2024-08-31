/* eslint-disable react/prop-types */
import { Paginator } from 'primereact/paginator';
import SheetItem from './SheetItem';

function SheetList({
  sheets,
  onDelete,
  user,
  totalRecords,
  first,
  rows,
  onPageChange,
}) {
  // Calculate the current page number
  const currentPage = Math.floor(first / rows) + 1;
  const totalPages = Math.ceil(totalRecords / rows);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sheets.map((sheet) => (
          <SheetItem
            key={sheet.id}
            sheet={sheet}
            user={user}
            handleDeleteSheet={() => onDelete(sheet.id)}
          />
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        className="mt-6 p-2 text-xl"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        leftContent={
          <span className="font-bold">
            {currentPage} of {totalPages}
          </span>
        }
      />
    </div>
  );
}

export default SheetList;
