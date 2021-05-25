import './App.css';
//import { useParams} from "react-router-dom";
import Container from '@material-ui/core/Container';
import MediaCard from "./components/viewPage/card";
import React from "react";

function App() {
  //let { id } = useParams();
  return (
    <Container maxWidth="lg">
      <MediaCard />
    </Container>
  );
}

export default App;
