import fetch from "node-fetch";

const uploadImage = async (image: File) => {
  if (!image) {
    return { url: "", delete_url: "" };
  }

  // Convert the image to a buffer and base64 encode
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Prepare the ImgBB API URL
  const imgbbUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;

  // Perform the fetch request to ImgBB
  const response = await fetch(imgbbUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      image: buffer.toString("base64"), // Send base64 image data
    }),
  });

  // Check the response and handle errors
  if (!response.ok) {
    const errorText = await response.text();
    console.error("ImgBB API response error:", errorText);
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  const result = await response.json();
  return { url: result.data.image.url, delete_url: result.data.delete_url };
};

export default uploadImage;
