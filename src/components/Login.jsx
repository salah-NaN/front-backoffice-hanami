import { useNavigate } from 'react-router-dom';


export default () => {

    const redirect = useNavigate();


    return (
        <div className="mt-4  ">
            <form className="m-8 p-4 border rounded-md">

                <h1 className=' p-4 text-center'>Login</h1>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input

                        value=""
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 " id="email" type="text" placeholder="email" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input

                        value="" className="shadow appearance-none border
                    rounded w-full py-2 px-3 text-gray-700 mb-3 " id="password" type="password" placeholder="******************" />
                </div>

                <div className='flex flex-row gap-4 justify-center'>
                    <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Entrar
                    </button>
                    <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>redirect('/register')}>
                        Registrar
                    </button>
                </div>

            </form>
        </div>
    )

}