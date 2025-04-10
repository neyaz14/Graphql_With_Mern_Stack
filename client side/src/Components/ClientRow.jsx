// import React from 'react';

const ClientRow = ({ client }) => {
    return (
        <table className="w-full">
            <tbody className="w-full">
                <tr >
                    <td className="border border-amber-50/25  w-[25%] p-2">{client.name}</td>
                    <td className="border border-amber-50/25  w-[25%] p-2">{client.email}</td>
                    <td className="border border-amber-50/25  w-[25%] p-2">{client.phone}</td>
                    <td className="border border-amber-50/25  w-[25%] p-2">
                        <button className='btn btn-error btn-sm'>
                            X
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

    );
};

export default ClientRow;