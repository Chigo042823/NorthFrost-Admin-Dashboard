import { getCoreRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/shared/table";
import { flexRender } from "@tanstack/react-table";

export const DataTable = ({
    data,
    columns,
    sorting, 
    setSorting, 
    globalFilter,
    setGlobalFilter,
    columnFilters, 
    setColumnFilter,
    columnVisibility, 
    setColumnVisibility
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // debugAll: true,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilter,
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            globalFilter,
            columnVisibility,
            columnFilters
        }
    });

    return (
        <Table className="table-auto">
                <TableHeader>
                    {table.getHeaderGroups()?.map(group => (
                            <TableRow key={group.id}>
                                {group.headers.map(header => (
                                    <TableHead key={header.id} className={header.id == "actions" && "w-2"}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows.length != 0 ? table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell className={`${cell.id == "actions" && "w-4"} whitespace-normal`} key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )) :
                        <TableRow>
                            <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center text-stone-500 text-lg font-semibold"
                            >
                                <div 
                                    className="text-stone-400 text-lg text-semibold">
                                    No data available
                                </div>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
    )

}