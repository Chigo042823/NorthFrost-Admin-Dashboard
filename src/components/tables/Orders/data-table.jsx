import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table"

import { Input } from "../../ui/input";

import { useState } from "react";
import { columns } from "../../tables/Orders/columns"

import { OrderModal } from "../../Modals/Orders/orderModal";

export function DataTable({
    data,
    buttonClick
}) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({});

    const cols = columns({setModalVisible, setModalData});

    console.log(cols)

    const [sorting, setSorting] = useState([
        {
            id: "date",
            desc: true
        }
    ]);

    const [globalFilter, setGlobalFilter] = useState([]);

    const [columnVisibility, setColumnVisibility] = useState({
        location: false,
    });

    const table = useReactTable({
        data,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
        debugAll: true,
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
        <>
            {isModalVisible && <OrderModal data={modalData} visibleHandle={setModalVisible}/> }
            <div className="flex items-center py-2 justify-between">
                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                    className="w-[30%] min-w-[15rem]"
                    />
                    <button className="bg-indigo-500 p-2 rounded-lg text-gray-50
                        hover:transform-[scale(1.05)] hover:bg-indigo-600 hover:text-indigo-100 transition-all ease-in-out"
                        onClick={() => setModalVisible(true)}
                        >
                        Add Order
                    </button>
            </div>
            <Table>
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
                                <TableCell className={cell.id == "actions" && "w-4"} key={cell.id}>
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
        </>
    )

}