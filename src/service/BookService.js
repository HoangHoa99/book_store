

export const GetBookAsync = async () => {
    const response = await fetch("https://utebookstore.herokuapp.com/books", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  
    return response;
  };


  export const GetCategories = async () => {
    const response = await fetch("https://utebookstore.herokuapp.com/categori", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  
    return response;
  };