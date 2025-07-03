import LoginPage from './LoginPage';
import './App.css';
import Container from '@mui/material/Container';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <LoginPage /> 
      </Container>
    </>
  );
}

export default App;
