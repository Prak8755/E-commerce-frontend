import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminEditProductAsync,
  clearSelectedProduct,
  fetchCreateProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
} from "../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Modals from "../../common/Modals";

const AdminProductForm = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);



  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      console.log("done");
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("brand", selectedProduct.brand);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
    }
  }, [selectedProduct, setValue, params.id]);


  function handleDelete(){
    const product={...selectedProduct};
    console.log(product);
    product.deleted=true;
    dispatch(AdminEditProductAsync(product));
   
  }

  const [showModal,setShowModal]=useState(null);

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          product.images = [product.image1, product.image2, product.image3];

          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          product.rating = 0;
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;

          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(AdminEditProductAsync(product));
            reset();
          } else {
            dispatch(fetchCreateProductAsync(product));
            reset();
          }
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            {selectedProduct.deleted&&<h1 className="text-red-500">This Product is already deleted </h1>}
            <p className="mt-1 text-sm leading-6 text-gray-600">
              You can add product from here{" "}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    {...register("title", { required: "title is required" })}
                    type="text"
                    id="title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-600 text-bold">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description", {
                      required: "description is required",
                    })}
                    id="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                {errors.description && (
                  <p className="text-red-600 text-bold">
                    {errors.description.message}
                  </p>
                )}

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Add more details about product
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Brands
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", { required: "brand is reuired" })}
                  >
                    {brands.map((brand, i) => (
                      <option key={i} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="text-red-600 text-bold">
                      {errors.brands.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Add more details about product
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="categories"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Categories
                </label>
                <div className="mt-2">
                  <select
                    {...register("categories", {
                      required: "categories are required",
                    })}
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.categories && (
                    <p className="text-red-600 text-bold">
                      {errors.categories.message}
                    </p>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Add more details about product
                </p>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("price", {
                      required: "price is required",
                      min: 1,
                      max: 10000,
                    })}
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-600 text-bold">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentaget"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.discountPercentage && (
                  <p className="text-red-600 text-bold">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "stock is required",
                      min: 0,
                    })}
                    id="stock"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.stock && (
                  <p className="text-red-600 text-bold">
                    {errors.stock.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    id="thumbnail"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.thumbnail && (
                  <p className="text-red-600 text-bold">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image-1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image1", { required: "image-1 is required" })}
                    id="image-1"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.image1 && (
                  <p className="text-red-600 text-bold">
                    {errors.image1.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image-2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image2", { required: "image-2 is required" })}
                    id="image-2"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.image2 && (
                  <p className="text-red-600 text-bold">
                    {errors.image2.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image3", { required: "image-3 is required" })}
                    id="image-3"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.image3 && (
                  <p className="text-red-600 text-bold">
                    {errors.image3.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Modals title='Delete' message='Are you sure you want to delete this product' dangerOption='Delete' showModal={showModal} dangerAction={handleDelete}  cancelAction={e=>setShowModal(null)}>

          </Modals>
          {
           params.id&&!selectedProduct.deleted&& <button onClick={e=>{setShowModal(params.id);e.preventDefault();}} className="py-1 px-4 text-white bg-slate-500 rounded mr-2">
              Delete
            </button>
          }
          <button className="py-1 px-4 text-white bg-orange-700 rounded">
            Save
          </button>
          <button className="py-1 px-4 text-white bg-gray-500 ml-3 rounded">
           Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
