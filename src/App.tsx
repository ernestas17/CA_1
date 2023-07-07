import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { LINK_LIST } from './shared/link_list';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {LINK_LIST.map((link) => {
              return (
                <Route
                  key={link.key}
                  index={link.isIndex ? true : false}
                  path={link.url}
                  element={link.element}
                />
              );
            })}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
