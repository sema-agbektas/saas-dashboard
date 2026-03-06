export default function AddSaleForm({amount,setAmount,createSale,loading})
{
    return(
        <div style={{marginBottom:16,padding:16,border:"1px solid #ddd",borderRadius:8}}>
            <h3 style={{marginTop:0}}>Add Sale</h3>
            <div style={{display:"flex",gap:8}}>
                <input
                    style={{flex:1,padding:8}}
                    placeholder="Amount (e.g. 250.75)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={createSale} disabled={loading}>
                    {loading ? "Adding..." : "Add"}
                </button>
            </div>

        </div>
    );
}