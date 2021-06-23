export const AddToCartFromLg = async (cartAdd, token) => {
    const response = await fetch(
      "https://utebookstore.herokuapp.com/cart/addfromlg",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
            product: cartAdd,
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  
    return response;
  };

  export const AddToCart = async (id, amount, token) => {
    const response = await fetch(
      "https://utebookstore.herokuapp.com/cart/add",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
            book: cartAdd,
            amount: amount
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  
    return response;
  };

  export const DeleteCartItem = async (id, token) => {
    const response = await fetch(
      "https://utebookstore.herokuapp.com/cart/delete/" + id,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-access-token": token
        }
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  
    return response;
  };

  export const OrderAdd = async (orderList, address, note, totalPrice, token) => {
    const response = await fetch(
      "https://utebookstore.herokuapp.com/order/add",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-access-token": token
        },
        body: JSON.stringify({
          products: orderList,
          address: address,
          note: note,
          totalrice: totalPrice
        }),
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    return response;
  };

  export const GetMyOrder = async (token) => {
    const response = await fetch(
      "https://utebookstore.herokuapp.com/order/myorder",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-access-token": token
        }
      }
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    return response;
  };

