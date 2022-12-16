import { useEffect, useState } from "react";
import ListItem from "./ListItems/ListItem";
import axios from "axios";
import Loader from "../UI/Loader";

const Products = ({ onAddItem, onRemoveItem, eventState }) => {
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(true);
  // const [presentItems, setPresentItems] = useState([]);

  useEffect(() => {
    /*
      fetch(`https://react-guide-2021-4632f-default-rtdb.firebaseio.com/items.json`)
      .then(response => response.json())
      .then(data =>{
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
      */
    //or
    async function fetchItems() {
      try {
        const response = await axios.get(
          "https://react-guide-2021-4632f-default-rtdb.firebaseio.com/items.json"
        );
        const data = response.data;
        const transformedData = data.map((item, index) => {
          return {
            ...item,
            quantity: 0,
            id: index
          };
        });
        setItems(transformedData);
      } catch (error) {
        console.log("Error, ", error);
        alert("some error occured!");
      } finally {
        setLoader(false);
      }
    }

    fetchItems();
    //or
    /*
      axios.get('https://react-guide-2021-4632f-default-rtdb.firebaseio.com/items.json')
      .then(response =>{
          //console.log(response);
          const data =response.data ;
          const transformedData =data.map((item,index)=>{
            return {
              ...item,
              id:index
            }
          })
          setItems(transformedData);
          // console.log(transformedData);
      })
      .catch(error =>{
        console.log(error);
      })
  */
  }, []);

  useEffect(() => {
    if (eventState.id > -1) {
      if (eventState.type === 1) {
        handleAddItem(eventState.id);
      } else if (eventState.type === -1) {
        handleRemoveItem(eventState.id);
      }
    }
  }, [eventState]);

  const handleAddItem = (id) => {
    // if (presentItems.indexOf(id) > -1) {
    //   return;
    // }
    // setPresentItems([...presentItems, id]);
    // onAddItem();

    let data = [...items];
    let index = data.findIndex((i) => i.id === id);
    data[index].quantity += 1;

    setItems([...data]);
    onAddItem(data[index]);
  };

  const handleRemoveItem = (id) => {
    // let index = presentItems.indexOf(id);
    // if (index > -1) {
    //   let items = [...presentItems];
    //   items.splice(index, 1);
    //   setPresentItems([...items]);
    //   onRemoveItem();

    // }
    let data = [...items];
    let index = data.findIndex((i) => i.id === id);
    if (data[index].quantity !== 0) {
      data[index].quantity -= 1;
      setItems([...data]);
      onRemoveItem(data[index]);
    }
  };
  return (
    <>
      <div className={"product-list"}>
        <div className={"product-list--wrapper"}>
          {/*
          <ListItem
            data={{
              id: 2,
              title: "Title of item 0",
              price: "850",
              discountedPrice: "333",
              thumbnail: "placeholder.png"
            }}
          />*/}

          {/*
            <ListItem data={items[0]} />
          <ListItem data={items[1]} />
          <ListItem data={items[2]} />
            */}

          {items.map((item) => {
            return (
              <ListItem
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
                key={item.id}
                data={item}
              />
            );
          })}
        </div>
      </div>

      {loader && <Loader />}
    </>
  );
};

export default Products;
