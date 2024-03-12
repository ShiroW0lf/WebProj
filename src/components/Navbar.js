const Navbar = ()=>{
    return(
        <div className="w-full flex text-white bg-black justify-between p-4 container">
            <div>
                <a href="/">
                <h1>SAD Analytics</h1>
                </a>
            </div>
            <div className="flex gap-12">
            <a href="/" className="hover:text-slate-400">
                Home
            </a>
            <a href="/datavisualization" className="hover:text-slate-400" >
                Data Visualization
            </a>
            <a href="/dataanalysis" className="hover:text-slate-400">
                Data Analysis
            </a>
            <a href="/login" className="hover:text-slate-400">
                Login
            </a>
           
            </div>
        </div>
    )
}

export default Navbar