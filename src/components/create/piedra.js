import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import {Button, TextField, Typography} from "@material-ui/core";
import '../../assets/css/piedra.css'
import {useDropzone} from 'react-dropzone';
import {Space} from "../Space";
import firebase from "../../util/firebase";
import { v4 as uuidv4 } from 'uuid';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  height: '300px',
  padding: 4,
  boxSizing: 'border-box',
  width: '100%',
  margin: '0 auto',
  flexDirection: 'row',
  alignContent: 'center',
  flexWrap: 'nowrap',
  justifyContent: 'space-around',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

export function Piedra() {

  const [files, setFiles] = useState([]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={''}/>
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };


  const handleOnChangeDesc = (e) => {
    setDescription(e.target.value);
  };

  const handledSubmit = () => {
    console.log(title)
    const todoRef = firebase.database().ref('piedras');
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const uploadTask = storageRef.child('folder/' + files[0].name).put(files[0]);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>{
        let progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
        console.log(progress)
      },(error) =>{
        throw error
      },() =>{
        uploadTask.snapshot.ref.getDownloadURL().then((url) =>{
          const _uuid = uuidv4();
          const todo = {
            key: _uuid,
            title,
            description,
            imagen :  url,
          };
          localStorage.setItem('url', _uuid);
          todoRef.push(todo);
          alert('ok');
          window.location.href = '/qr/';
        })

      }
    )
  };

  return (
    <Container fixed>
      <Typography variant="h2" component="h2">
        Crear Código
      </Typography>

      <form onSubmit={handledSubmit} noValidate autoComplete="off">
        <TextField onChange={handleOnChange} id="outlined-basic" label="Título*" variant="outlined"/>
        <TextField
          id="outlined-multiline-static"
          label="Descripción*"
          multiline
          rows={6}
          defaultValue=""
          variant="outlined"
          onChange={handleOnChangeDesc}
        />

        <main className="container">
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Arrastre 'y' suelte la imagen aquí, o haga clic para seleccionarla</p>
          </div>
          <aside style={thumbsContainer}>
            {thumbs}
          </aside>
        </main>

        <Space margin={2} />
        <div style={{textAlign: 'right'}}>
          <Button onClick={handledSubmit} variant="contained" color="primary">
            Guardar
          </Button>
        </div>

      </form>

    </Container>
  );
}
