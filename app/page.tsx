import Link from 'next/link';

export default function Component() {
    return (
        <main className="flex flex-col min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-mono text-gray-800">sin.Next Stack</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-mono m-4 text-gray-300">SingleStore, Elegance SDK &
                NextJS
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-mono">For real-time intelligent apps</div>
            <div className='grid-cols-3'>
            <button className="m-3 p-3 columns-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link href="/users">
                        CRUD example
                </Link>
            </button>
            <button className="m-3 p-3 columns-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link href="#">
                    AI Chatbot
                </Link>
            </button>
            </div>
        </main>
    );
}
