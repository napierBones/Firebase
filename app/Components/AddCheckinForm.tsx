import React from "react";
import { useForm, SubmitHandler, FieldError} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStore from "@/store/useStore";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import db from "../firebase/firestore";


const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  rooms: z
    .number({ invalid_type_error: "Rooms must be a number" })
    .min(1, "At least one room is required"),
  guests: z
    .number({ invalid_type_error: "Guests must be a number" })
    .min(1, "At least one guest is required"),
    image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Image URL is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const AddCheckInForm: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> =async (data) => {
  try {
     const docRef = await addDoc(collection(db, "checkin"), {
      title: data.title,
      rooms: data.rooms,
      guests: data.guests,
      image: data.image,
      createdAt: serverTimestamp(), }); 
      console.log('Document written with ID: ',docRef.id);
      reset();
      window.location.reload();
  } catch (error) {
    console.error(error);
  }
  };

  const {togglePopupAddCheckin}=useStore()

  return ( 
 
        <form className="p-4 w-96" onSubmit={handleSubmit(onSubmit)}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className={`w-full border rounded-lg p-2 text-sm ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.title as  FieldError).message}
              </p>
            )}
          </div>
           {/* Rooms Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="rooms"
            >
              Rooms
            </label>
            <input
              id="rooms"
              type="number"
              {...register("rooms", { valueAsNumber: true })}
              className={`w-full border rounded-lg p-2 text-sm ${
                errors.rooms ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter No. of Rooms"
            />
            {errors.rooms && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.rooms as FieldError).message}
              </p>
            )}
          </div>
           {/* Guests Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="guests"
            >
              Guests
            </label>
            <input
              id="guests"
              type="number"
              {...register("guests", { valueAsNumber: true })}
              className={`w-full border rounded-lg p-2 text-sm ${
                errors.guests ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter No. of Guests"
            />
            {errors.guests && (
              <p className="text-red-500 text-xs mt-1">
                {(errors.guests as FieldError).message}
              </p>
            )}
          </div>

   {/* Image URL Input */}
<div className="mb-4">
  <label
    className="block text-sm font-medium text-gray-700 mb-1"
    htmlFor="imageUrl"
  >
    Image URL
  </label>
  <input
    id="imageUrl"
    type="url"
    {...register("image", {
      required: "Please enter an image URL",
      pattern: {
        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/,
        message: "Please enter a valid image URL",
      },
    })}
    placeholder="https://example.com/image.jpg"
    className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
  />
  {errors.image && (
    <p className="text-red-500 text-xs mt-1">
      {(errors.image as FieldError).message}
    </p>
  )}
</div>


          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg text-sm"
              onClick={togglePopupAddCheckin}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-purple-600 rounded-lg text-sm hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </form>
     
  );
};

export default AddCheckInForm;
