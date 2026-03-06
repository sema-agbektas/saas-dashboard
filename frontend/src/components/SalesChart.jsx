import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
export default function SalesChart({sales}){
    const chartData = sales.map(s => ({
        date: s.created_at ? new Date(s.created_at).toLocaleDateString() : "Unknown",
        amount: s.amount
    }));
    return(
        <div style={{padding:16,border:"1px solid #ddd",borderRadius:8,marginBottom:16}}>
            <h3 style={{marginTop:0}}>Sales Chart</h3>
            <LineChart width={600} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
}