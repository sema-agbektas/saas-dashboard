export default function FilterButtons({rangeDays, setRangeDays}) {
    return (
        <div style={{display:"flex",gap:8,marginBottom:10}}>
            <button onClick={() => setRangeDays(7)} disabled={rangeDays === 7}>Last 7 Days</button>
            <button onClick={() => setRangeDays(30)} disabled={rangeDays === 30}>Last 30 Days</button>
            <button onClick={() => setRangeDays(90)} disabled={rangeDays === 90}>Last 90 Days</button>
        </div>
    );
}