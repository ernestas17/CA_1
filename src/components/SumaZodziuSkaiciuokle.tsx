import { Outlet } from 'react-router-dom';

const SumaZodziuSkaiciuokle = () => {
    return (
        <main>
            <Outlet />
            <h2>Suma zodziais</h2>
        </main>
    );
};

export default SumaZodziuSkaiciuokle;
