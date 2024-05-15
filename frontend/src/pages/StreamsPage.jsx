import { useState, useEffect } from 'react';
import axios from 'axios';
const token = localStorage.getItem('token');

const StreamsPage = () => {
    const [streams, setStreams] = useState([]);
    const [streamName, setStreamName] = useState('');
    const [selectedStream, setSelectedStream] = useState(null); 

    useEffect(() => {
        fetchStreams();
    }, []);

    const fetchStreams = async () => {
        try {
            const response = await axios.get('http://localhost:8200/stream/streams',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data.items);
            setStreams(response.data.items);
        } catch (error) {
            console.error('Error fetching streams:', error);
        }
    };

    const addStream = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8200/stream/add', {
                name: streamName
            },{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
            console.log(response);
            setStreamName(response); 
            console.log('Stream added successfully.');
            alert('Stream added successfully !!!')
            setStreamName(''); 
            fetchStreams();
        } catch (error) {
            console.error('Error adding stream:', error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const streamToUpdate = streams.find(stream => stream._id === id);
            if (streamToUpdate) {
                setSelectedStream(streamToUpdate); 
                setStreamName(streamToUpdate.name);
                console.log(selectedStream); 
            } else {
                console.error('Stream not found');
            }
        } catch (error) {
            console.error('Error updating stream:', error);
        }
    };
    
    const updateStream = async (id, updatedStreamName) => {
        try {
            const response = await axios.patch(
                `http://localhost:8200/stream/update/${id}`,
                { name: updatedStreamName }, 
                { 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            setStreams(prevStreams => 
                prevStreams.map(stream => 
                    stream._id === id ? { ...stream, name: updatedStreamName } : stream
                )
            );
            setStreamName("")
            console.log(response);
            console.log('Stream updated successfully.');
            alert('Stream updated successfully !!!');
        } catch (error) {
            console.error('Error updating stream:', error);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8200/stream/delete/${id}`,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }});
            setStreams(prevStreams => prevStreams.filter(stream => stream._id !== id));
            console.log('Stream deleted successfully.');
            alert('Stream deleted successfully !!!')
        } catch (error) {
            console.error('Error deleting stream:', error);
        }
    };
    

    return (
        <div style={{padding:"5%"}}>
            <div style={{textAlign:"center"}}>
                <h2>Add Stream</h2>
                <form>
                    <input 
                        type="text"
                        placeholder="Enter stream name"
                        value={streamName}
                        onChange={(e) => setStreamName(e.target.value)}
                        style={{padding:"10px", width:"400px", margin:"20px"}}
                    /> <br />
                    <button type="button" style={{padding:"10px", width:"180px", border:"none", backgroundColor:"#b7b8e6", margin:"5px"}} onClick={addStream}>Add </button>
                    <button type="button" style={{padding:"10px", width:"180px", border:"none", backgroundColor:"#b7b8e6", margin:"5px"}} onClick={() => updateStream(selectedStream._id, streamName)}>Update </button>

                </form>
            </div>
            <hr />
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <table style={{width:"600px", marginTop:"50px", border:"1px solid"}}>
                    <thead style={{borderBottom:"1px solid"}}>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {streams.map((stream, index) => (
                            <tr key={stream._id}>
                                <td>{index+1}</td>
                                <td>{stream.name}</td>
                                <td>
                                    <button onClick={() => handleUpdate(stream._id)} style={{border:"none"}}>Update</button>
                                    <button onClick={() => handleDelete(stream._id)} style={{border:"none"}}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { StreamsPage };
