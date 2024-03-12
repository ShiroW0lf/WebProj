  import Image from "next/image";

  export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center p-24 bg-orange-100 container">
      
        <div className="w-100">
        <h1 className="text-red-400 text-4xl font-extrabold">Data Analysis</h1>    
        <p className="text-black mt-8">
          Upload your Dataset in CSV and excel input
        </p>
        <div className="flex gap-2 bg-gray-500 p-4 text-white w-full rounded justify-between items-center mt-8">
            <div className="flex-col">
          <h3>Drag and drop file here</h3>
          <p>Limit 200 MB per file</p>
            </div>

            <input type="file" className="bg-white text-black rounded h-10 p-2" title="a"></input>
          
        </div>
        </div>

        
      </main>
    );
  }
