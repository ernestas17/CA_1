import { Outlet } from 'react-router-dom';

const ValiutuSkaiciuokle = () => {
    return (
        <main>
            <Outlet />
            <h2>Valiutu skaiciuokle</h2>
        </main>
    );
};

export default ValiutuSkaiciuokle;
