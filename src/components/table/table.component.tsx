import React from "react";

export default function TableComponent({ data, th }: { data?: any, th?: any }) {
    return (
        <div className="relative overflow-x-auto shadow-md shadow-gray-200 rounded-full">
            <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        {
                            th.map((item: any, index: number) => (
                                <th className="px-6 py-3" key={index} >
                                    {item}
                                </th>
                            ))
                        }
                        <th scope="col" className="px-6 py-3">
                            İşlem
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b ">
                        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}