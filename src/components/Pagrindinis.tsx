import { Outlet } from 'react-router-dom';

const Pagrindinis = () => {
    return (
        <main>
            <Outlet />
            <h2>Pagrindinis</h2>
        </main>
    );
};

export default Pagrindinis;
