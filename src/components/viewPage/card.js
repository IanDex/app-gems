import React, {useEffect, useState} from 'react';
//import QRCode from "qrcode.react";
import ImageZoom from 'react-medium-image-zoom'
import firebase from "../../util/firebase";
import {useParams} from "react-router-dom";


export default function MediaCard() {

  const [todoList, setTodoList] = useState(null);
  let {id} = useParams();
  useEffect(() => {
    const todoRef = firebase.database().ref('piedras');
    todoRef.on('value', (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({id, ...todos[id]});
      }
      todoList.forEach(item => {
        if (item.key === id) {
          setTodoList(item);
        }
      })
    });
  }, [id]);

  console.log({todoList})

  return (
    <section style={{display: 'flex'}}>
      {todoList &&
      <>
        <div style={{margin: '0 auto'}}>
          <ImageZoom
            image={{
              src: todoList.imagen,
              alt: 'Golden Gate Bridge',
              className: 'img',
              style: {width: '60%'}
            }}
            zoomImage={{
              src: todoList.imagen,
              alt: 'Golden Gate Bridge'
            }}
          />
        </div>
        <div>
          <h2>{todoList.title}</h2>
          <p>{todoList.description}</p>
        </div>
      </>
      }

    </section>
  );
}
