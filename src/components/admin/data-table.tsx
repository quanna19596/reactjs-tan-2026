import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";

interface DataTableProps<TRow, TValue> {
  columns: ColumnDef<TRow, TValue>[];
  rows: TRow[];
  pagination: {
    total: number;
    page: number;
    size: number;
    onChange: (newPagination: { page: number; size: number }) => void;
  };
}

const generatePages = (currentIdx: number, pageCount: number) => {
  const getLeftPart = (distance: number) => {
    if (distance <= 1) return [];
    if (distance >= 4) return [0, -1];
    return Array.from({ length: distance - 1 }, (_, i) => i);
  };

  const getMiddlePart = (current: number, last: number) => {
    Array.from({ length: 1 }, (_, i) => current - 2 - i).reverse();

    if (current <= 2) {
      const additional = Array.from(
        { length: 4 - current - 1 },
        (_, i) => i + (4 + current - 2),
      );
      const prevSib = current - 1 < 0 ? [] : [current - 1];
      return [...prevSib, current, current + 1, ...additional];
    }

    if (last - current <= 2) {
      const additional = Array.from(
        { length: current - last + 3 },
        (_, i) => current - 2 - i,
      ).reverse();
      const nextSib = current + 1 > last ? [] : [current + 1];
      return [...additional, current - 1, current, ...nextSib];
    }

    return [current - 1, current, current + 1];
  };

  const getRightPart = (distance: number, last: number) => {
    if (distance <= 1) return [];
    if (distance >= 4) return [-1, last];
    return Array.from({ length: distance - 1 }, (_, i) => last - i).reverse();
  };

  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i);

  const leftDistance = currentIdx - 0;
  const rightDistance = pageCount - 1 - currentIdx;

  const leftPart = getLeftPart(leftDistance);
  const middlePart = getMiddlePart(currentIdx, pageCount - 1);
  const rightPart = getRightPart(rightDistance, pageCount - 1);

  return [...leftPart, ...middlePart, ...rightPart];
};

export function DataTable<TRow, TValue>({
  columns,
  rows,
  pagination,
}: DataTableProps<TRow, TValue>) {
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pagination.total,
    state: {
      pagination: {
        pageIndex: pagination.page,
        pageSize: pagination.size,
      },
    },
    onPaginationChange: (updaterOrValue) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue({
              pageIndex: pagination.page,
              pageSize: pagination.size,
            })
          : updaterOrValue;

      pagination.onChange({
        page: newPagination.pageIndex,
        size: newPagination.pageSize,
      });
    },
  });

  const pageItems = generatePages(
    table.getState().pagination.pageIndex,
    table.getPageCount(),
  );

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination.total > pagination.size && (
        <Pagination className="flex items-center justify-end space-x-2 py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            {pageItems.map((page) => (
              <PaginationItem key={Math.random()}>
                {page < 0 ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={page === pagination.page}
                    onClick={() => table.setPageIndex(page)}
                  >
                    {page + 1}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
