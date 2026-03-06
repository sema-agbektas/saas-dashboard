export default function SummaryCards({summary}) {
    if (!summary) return <div>Loading summary...</div>;

    return (
        <div style={{padding:16,border:"1px solid #ddd",borderRadius:8,marginBottom:16}}>
            <h3 style={{marginTop:0}}>Dashboard Summary</h3>
            <div><b>Total Sales:</b> {summary.total_sales}</div>
            <div><b>Total Revenue:</b> {Number(summary.total_revenue).toFixed(2)}</div>
        </div>
    );
}