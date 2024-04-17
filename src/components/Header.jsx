import { useNavigate } from 'react-router-dom';


export default () => {
    const redirect = useNavigate();

    return (
        <div>
            <div className="flex flex-row justify-between p-4 bg-cream-header border-b border-header-border">
                <h1>Hanami</h1>
                <button onClick={()=>redirect('/miperfil')}>Perfil</button>
            </div>
        </div>
    )

}