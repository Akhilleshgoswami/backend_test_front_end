import axios from 'axios';
import React from 'react';

const YourComponent = () => {
    const [urldata,setUrldata] = React.useState([])
    const getData = async () => {
        await axios.get('http://127.0.0.1:8000/webcount/fetch')
           .then(response => {
             // Handle successful response
             console.log(response.data);
             setUrldata(response.data)
           })
           .catch(error => {
             // Handle error
             console.error(error);
           });
       }
       React.useEffect(() => {
         getData()
           }, [])
     
  return (
    <div>
      {Object.keys(urldata).map(key => {
        const item = urldata[key];

        // Check if the object is empty
        if (Object.keys(item).length === 0) {
          return <p key={key}>Object at key {key} is empty.</p>;
        } else {
          // Access properties of the non-empty object
          let wordCount = item?.word_count;
          let likeStatus = item?.like;
          let url = item?.url;

          return (
            <div key={key}>
              <p>Object at key {key}:</p>
              <p>Word Count: {wordCount}</p>
              <p>Like Status: {likeStatus ? 'true' : 'false'}</p>
              <p>URL: {url}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default YourComponent;
