import { Outlet } from 'react-router-dom';

const PvmSkaiciuokle = () => {
    return (
        <main>
            <Outlet />
            <h2>Pvm skaiciuokle</h2>
        </main>
    );
};

export default PvmSkaiciuokle;
