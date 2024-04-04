import { useNavigate } from 'react-router-dom';


export default () => {

    const redirect = useNavigate();
    
    return (
        <div className="mt-4  ">
        <form className="m-8 p-4 border rounded-md">

            <h1 className='p-4 text-center'>Registrar</h1>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="email"> Email</label>
                <input value="" className="shadow border rounded w-full py-2 px-3 text-gray-700 " id="email" type="text" placeholder="email" />
            </div>
            <div>
                <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    placeholder="Nombre"
                />
            </div>
            <div>
                <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Apellidos</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastname"
                    placeholder="Apellidos"
                />
            </div>

            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input value="" className="shadow appearance-none border
                rounded w-full py-2 px-3 text-gray-700 mb-3 " id="password" type="password" placeholder="******************" />
            </div>
            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Confirmar Password
                </label>
                <input value="" className="shadow appearance-none border
                rounded w-full py-2 px-3 text-gray-700 mb-3 " id="password" type="password" placeholder="******************" />
            </div>


            <div className='flex flex-row gap-4 justify-center'>
                <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Entrar
                </button>
                <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>redirect('/login')}>
                    To login
                </button>
            </div>

        </form>
    </div>
    )

}