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
import { getOrders, deleteOrder } from "../../../../api/orders";
import { columns } from "../../tables/Orders/columns"

import { OrderForm } from "../../Modals/orderForm"
import { Modal } from "../../Modals/modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ConfirmDeleteModal } from "../../Modals/confirmDeleteModal";

export function DataTable() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isInsert, setIsInsert] = useState(true);
    const [formData, setFormData] = useState({});

    const [isConfirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const cols = columns({setFormVisible, setConfirmDeleteVisible, setFormData, setIsInsert});

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

    const { data: orders=[], isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders
    });

    const qclient = useQueryClient();

    function handleSuccess() {
        qclient.invalidateQueries(["orders"]);
    }

    const table = useReactTable({
        data: orders,
        columns: cols,
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
        <>
            {
                isFormVisible && 
                        <Modal title={"Order Details"} setFormVisible={setFormVisible}>
                            <OrderForm successHandler={handleSuccess} isInsert={isInsert} data={formData} setFormVisible={setFormVisible}/>
                        </Modal> 
            }
            {
                isConfirmDeleteVisible &&
                    <ConfirmDeleteModal 
                        deletefn={deleteOrder} 
                        deleteId={formData.order_id}
                        title={"Delete Order Confirmation"} 
                        warningString={"Are you sure you wish to delete " + formData.name + "'s order?"} 
                        successHandler={handleSuccess} 
                        setConfirmDeleteVisible={setConfirmDeleteVisible}/>
            }
            <div className="flex items-center py-2 justify-between">
                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                    className="w-[30%] min-w-[15rem]"
                    />
                    <button className="bg-indigo-500 p-2 rounded-lg text-gray-50
                        hover:transform-[scale(1.05)] hover:bg-indigo-600 hover:text-indigo-100 transition-all ease-in-out"
                        onClick={() => {
                            setIsInsert(true);
                            setFormVisible(true);
                        }}
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