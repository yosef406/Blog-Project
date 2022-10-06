import { useEffect, useState } from "react";

function ListImages() {
  const [imageList, setImageList] = useState<Array<{ _id: string }>>([]);
  const [imageData, setImageData] = useState<
    Array<{ _id: string; data: string }>
  >([]);
  const [imageToFetch, setImageToFetch] = useState("");

  useEffect(() => {
    console.log(imageData);

    if (imageToFetch !== "")
      fetch(`https://localhost:5000/api/images/${imageToFetch}`)
        .then((result) => result.json())
        .then((data) => {
          const list = imageData;
          list.push({
            _id: data.image._id,
            data: data.image.data,
          });
          setImageData(list);
          setImageToFetch("");
        })
        .catch((err) => console.log(err));
  }, [imageData, imageToFetch]);

  return (
    <>
      <button
        onClick={() => {
          fetch("https://localhost:5000/api/images/all")
            .then((result) => result.json())
            .then(
              (data: {
                message: string;
                success: boolean;
                images: Array<{ _id: string }>;
              }) => {
                setImageToFetch("");
                setImageList(data.images);
              }
            )
            .catch((err) => console.log("Error: ", err));
          //   setFetchAllImages(true);
        }}
      >
        get image list
      </button>

      {imageList.length > 0
        ? imageList.map((val) => (
            <div key={val._id}>
              <label>id: {val._id}</label>
              <button
                onClick={() => {
                  setImageToFetch(val._id);
                }}
              >
                download{" "}
              </button>
            </div>
          ))
        : ""}
      {imageData.map((val, i) => (
        <div key={val._id + i}>
          <img width="500px" src={val.data} alt="not found" />
          <br />
        </div>
      ))}
    </>
  );
}
export default ListImages;
