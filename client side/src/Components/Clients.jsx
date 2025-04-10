import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../../../server side/src/Queries/clientQuery';


const allClients = GET_CLIENTS ;

const Clients = () => {
    const { data, loading, error } = useQuery(allClients);

    if (loading) return <p>Loading ........</p>
    if (error) return <p>Something went wrong !!!!</p>
   
    return (
        <div>
            <table className='table-zebra table w-full'>
                <thead>
                    <tr>
                        <th className="border text-center w-[25%]">Name</th>
                        <th className="border text-center w-[25%]">Email</th>
                        <th className="border text-center w-[25%]">Phone</th>
                        <th className="border text-center w-[25%]">Actions </th>
                    </tr>
                </thead>

            </table>

           
                {
                    data.clients.map(client =>
                        <ClientRow key={client.id} client={client}></ClientRow>
                    )
                }
            
        </div>
    );
};

export default Clients;