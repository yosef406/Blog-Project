import { useEffect, useState } from "react";
function ImageView() {
  const [imageData, setImageData] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.item(0) as File)}
      />
      <img style={{ width: "500px" }} src={imageData} alt="no cats for you" />
      <button
        onClick={() => {
          if (imageData !== "")
            fetch("https://localhost:5000/api/images/new", {
              method: "post",
              body: JSON.stringify({ name: imageFile?.name, data: imageData }),
              headers: { "Content-Type": "application/json" },
            })
              .then((result) => console.log(result))
              .catch((err) => console.log(err));
        }}
      >
        Upload
      </button>
    </>
  );
}
export default ImageView;
