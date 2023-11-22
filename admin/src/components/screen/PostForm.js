import React, { useEffect, useState } from "react";
import {
  ImSpinner11,
  ImEye,
  ImFilePicture,
  ImFilesEmpty,
  ImSpinner3,
} from "react-icons/im";
import { uploadImage } from "../../api/post";
import { useNotification } from "../../context/NotificationProvider";
import DeviceView from "./DeviceView";
const Rules = [
  { title: "From h1 to h6", rule: "# Heading -> ###### Heading" },
  { title: "Blockquote", rule: "> Your Quote" },
  { title: "Image", rule: "![image alt](http://image_url.com)" },
  { title: "Link", rule: "[Link Text](http://your_link.com)" },
];
export const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  content: "",
  tags: "",
  meta: "",
};
export default function PostForm({
  PostInit,
  postBtnTitle,
  busy,
  resetAfterSubmit,
  onSubmit,
}) {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [imageUrlToCopy, setImageUrlToCopy] = useState("");
  const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const { updateNotification } = useNotification();
  const [showDeviceView, setShowDeviceView] = useState(false);
  const handleChange = ({ target }) => {
    const { value, name, checked } = target;

    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes("image")) {
        return alert("this is not an image");
      }
      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbnailUrl(URL.createObjectURL(file));
    }
    if (name === "featured") {
      localStorage.setItem(
        "blogPost",
        JSON.stringify({ ...postInfo, featured: checked })
      );

      return setPostInfo({ ...postInfo, [name]: checked });
    }
    if (name === "tags") {
      const newtags = tags?.split(",");

      if (newtags?.length > 4)
        updateNotification("warning", "Only four tags selected!");
    }
    if (name === "meta" && meta?.length >= 149) {
      return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
    }
    const newPost = { ...postInfo, [name]: value };
    setPostInfo({ ...newPost });

    localStorage.setItem("blogPost", JSON.stringify(newPost));
  };
  const handleImageUpload = async ({ target }) => {
    if (imageUploading) return;

    const file = target.files[0];

    if (!file.type.includes("image")) {
      return updateNotification("error", "This is not an image");
    }
    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    const { error, image } = await uploadImage(formData);
    setImageUploading(false);
    if (error) return updateNotification("error", "Error uploading image");
    setImageUrlToCopy(image);
  };
  const handleOnCopy = () => {
    const texToCopy = `![Add image description](${imageUrlToCopy})`;
    navigator.clipboard.writeText(texToCopy);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, tags, meta } = postInfo;

    if (!title?.trim()) return updateNotification("error", "Title is missing");
    if (!content?.trim())
      return updateNotification("error", "Content is missing");
    if (!tags?.trim()) return updateNotification("error", "Tags is missing");
    if (!meta?.trim())
      return updateNotification(
        "error",
        "Meta description is missing is missing"
      );

    const slug = title
      ? title
          .toLowerCase()
          .replace(/[^a-zA-Z ]/g, " ")
          .split(" ")
          .filter((item) => item.trim())
          .join("-")
      : "";

    const newTags = tags
      ? tags
          .split(",")
          .map((item) => item.trim())
          .splice(0, 4)
      : [];

    const formData = new FormData();
    const finalPost = { ...postInfo, tags: JSON.stringify(newTags), slug };
    for (let key in finalPost) {
      if (finalPost[key] !== undefined && finalPost[key] !== null) {
        formData.append(key, finalPost[key]);
      }
    }

    onSubmit(formData);

    if (resetAfterSubmit) resetForm();
  };

  const resetForm = () => {
    setPostInfo({ ...defaultPost });
    localStorage.removeItem("blogPost");
  };

  useEffect(() => {
    if (PostInit?.thumbnail) {
      setSelectedThumbnailUrl(PostInit?.thumbnail);
    }
    setPostInfo({ ...PostInit });

    return () => {
      if (resetAfterSubmit) resetForm();
    };
  }, [PostInit, resetAfterSubmit]);

  useEffect(() => {
    if (resetAfterSubmit) {
      resetForm();
    }
  }, [resetAfterSubmit]);
  const { title, content, featured, tags, meta } = postInfo;
  return (
    <>
      <form onSubmit={handleSubmit} className="p-2 flex">
        <div className="w-9/12 space-y-3  flex flex-col h-screen">
          {/* title and submit */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">
              Create New Post
            </h1>
            <div className="flex items-center space-x-5">
              <button
                onClick={resetForm}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 hover:text-white hover:bg-blue-500 transition"
              >
                <ImSpinner11 />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setShowDeviceView(true)}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 hover:text-white hover:bg-blue-500 transition"
              >
                <ImEye />
                <span>View</span>
              </button>
              <button className="h-10 w-36 px-5 hover:ring-1 bg-blue-500 rounded text-black hover:text-blue-500 hover:bg-transparent ring-black transistion">
                {busy ? (
                  <ImSpinner3 className="animate-spin mx-auto text-xl" />
                ) : (
                  postBtnTitle
                )}
              </button>
            </div>
          </div>
          {/* check box */}
          <div className="flex">
            <input
              name="featured"
              value={featured}
              onChange={handleChange}
              id="featured"
              type="checkbox"
              hidden
            />
            <label
              className=" select-none flex space-x-2 items-center text-gray-700  cursor-pointer group"
              htmlFor="featured"
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-blue-500 justify-center items-center flex
          group-hover:border-blue-500"
              >
                {featured && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:border-blue-500"></div>
                )}
              </div>
              <span className="group-hover:text-blue-500">Featured</span>
            </label>
          </div>
          {/* title input */}
          <input
            value={title}
            name="title"
            onChange={handleChange}
            type="text"
            className="text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold"
            placeholder="Post title"
          />
          {/* image input */}
          <div className="flex space-x-2 ">
            <div>
              <input
                onChange={handleImageUpload}
                id="image-input"
                type="file"
                hidden
              />
              <label
                htmlFor="image-input"
                className="flex items-center space-x-2 px-3 ring-1 ring-gray-700 rounded 
        h-10 hover:text-white hover:bg-gray-700 transition cursor:pointer "
              >
                <span>Place image</span>
                {!imageUploading ? (
                  <ImFilePicture />
                ) : (
                  <ImSpinner3 className="animate-spin" />
                )}
              </label>
            </div>
            {imageUrlToCopy && (
              <div className=" flex-1  justify-between flex bg-gray-400 rounded overflow-hidden">
                <input
                  type="text"
                  value={imageUrlToCopy}
                  className="bg-transparent px-2 text-white w-full"
                  disabled
                />
                <button
                  onClick={handleOnCopy}
                  type="button"
                  className="text-xs flex flex-col items-center p-1 self-stretch
             justify-center bg-gray-700 text-white "
                >
                  <ImFilesEmpty />
                  <span>copy</span>
                </button>
              </div>
            )}
          </div>
          <textarea
            value={content}
            name="content"
            onChange={handleChange}
            placeholder="## Markdown"
            className=" flex-1 resize-none outline-none focus:ring-1 rounded p-2 w-full h-56 tracking-wide text-lg "
          ></textarea>

          {/* tags input */}
          <div>
            <label className="text-gray-500" htmlFor="tags">
              Tags
            </label>
            <input
              onChange={handleChange}
              value={tags}
              name="tags"
              type="text"
              id="tags"
              className=" outline-none focus:ring-1 rounded p-2 w-full "
              placeholder="Tag one, Tag two"
            />
          </div>
          {/* meta description input */}
          <div>
            <label className="text-gray-500" htmlFor="meta">
              Meta description {meta?.length}/150
            </label>
            <textarea
              onChange={handleChange}
              value={meta}
              name="meta"
              id="meta"
              placeholder="Meta description"
              className="resize-none outline-none focus:ring-1 rounded p-2 w-full h-28 font-semibold"
            ></textarea>
          </div>
        </div>
        <div className="w-1/4 px-2 relative">
          <h1 className="text-xl font-semibold text-gray-700 mb-2">
            Thumbnail
          </h1>
          <div>
            <input
              onChange={handleChange}
              name="thumbnail"
              type="file"
              id="thumbnail"
              hidden
            />
            <label htmlFor="thumbnail" className="cursor-pointer">
              {selectedThumbnailUrl ? (
                <img
                  className="aspect-video shadow-sm rounded"
                  src={selectedThumbnailUrl}
                  alt=""
                />
              ) : (
                <div
                  className="border border-dashed border-gray-500 aspect-video text-gray-500
            flex flex-col justify-center items-center
            "
                >
                  <span>Select thumbnail</span>
                  <span>Recommend size</span>
                  <span>1280 * 720</span>
                </div>
              )}
            </label>
          </div>
          {/* Mark down rule */}
          <div className="bg-white absolute top-1/2 -translate-y-1/2 px-2 py-4 rounded ">
            <h1 className="font-semibold text-center">
              General markdown rules
            </h1>
            <ul className="space-y-2">
              {Rules.map(({ title, rule }) => {
                return (
                  <li key={title}>
                    <p className="font-semibold text-gray-500">{title}</p>
                    <p className="font-semibold text-gray-700 pl-2 font-mono">
                      {rule}
                    </p>
                  </li>
                );
              })}
              <li className="text-center text-blue-500">
                <a
                  href="https://www.markdownguide.org/basic-syntax/"
                  target="_blank"
                >
                  Find out more
                </a>
              </li>
            </ul>
          </div>
        </div>
      </form>
      <DeviceView
        content={content}
        title={title}
        thumbnail={selectedThumbnailUrl}
        visible={showDeviceView}
        onclose={() => setShowDeviceView(false)}
      />
    </>
  );
}
