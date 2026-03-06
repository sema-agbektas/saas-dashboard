export default function SaleList({sales}){
    if (sales.length === 0) return <div>No sales yet.</div>;

    return (
        <div style={{padding:16,border:"1px solid #ddd",borderRadius:8}}>
            <h3 style={{marginTop:0}}>Sales List</h3>
            <ul style={{margin:0,paddingLeft:16}}>
                {sales.map(s => (
                    <li key={s.id}>{s.created_at ? new Date(s.created_at).toLocaleDateString() : "Unknown"} - ${s.amount}</li>
                ))}
            </ul>
        </div>
    )
}