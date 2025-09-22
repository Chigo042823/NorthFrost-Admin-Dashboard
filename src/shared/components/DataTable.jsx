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
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            globalFilter,
            columnVisibility
        }
    });

    return (
        <Table className="table-auto">
                <TableHeader>
                    {table.getHeaderGroups()?.map(group => (
                            <TableRow key={group.id}>
                                {group.headers.map(header => (
                                    <TableHead key={header.id} className={header.index == 4 && "w-4"}>
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
                    {table.getRowModel().rows.map(row => (
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
                    ))}
                </TableBody>
            </Table>
    )

}