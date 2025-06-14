import { useLocation } from "react-router-dom";
import SelectedItems from "./selectedItems";
import { useState, useEffect } from "react";

interface selectedProducts {
  formik: any;
  setProducts: (val: any) => void;
}

export const SelectProduct = ({ formik, setProducts }: selectedProducts) => {
  const location = useLocation();
  const productsFromLocation = location.state?.product;

  const [products, setLocalProducts] = useState<any[]>([]);

  useEffect(() => {
    if (Array.isArray(productsFromLocation)) {
      const initialized = productsFromLocation.map((item: any) => ({
        ...item,
        quantity: item.quantity || 1,
        selected: true,
      }));
      setLocalProducts(initialized);
      setProducts(initialized);
    } else {
      setLocalProducts([]);
    }
  }, [productsFromLocation]);

  const addItemToCart = (product: any) => {
    const updatedProducts = products.map((item) => {
      if (item._id === product._id && !product.id) {
        return {
          ...item,
          quantity: (item.quantity || 0) + 1,
        };
      }
      const updatedVariants = item.variants?.map((variant: any) => {
        if (variant.id === product.id) {
          return {
            ...variant,
            quantity: (variant.quantity || 0) + 1,
          };
        }
        return variant;
      });

      return {
        ...item,
        variants: updatedVariants ?? item.variants,
      };
    });
    setLocalProducts(updatedProducts);
    setProducts(updatedProducts);
  };

  const removeItemFromCart = (product: any) => {
    const updatedProducts = products.map((item) => {
      // Handle product-level removal
      if (item._id === product._id && !product.id) {
        const newQuantity = item.quantity > 1 ? item.quantity - 1 : 0;
        return {
          ...item,
          quantity: newQuantity,
        };
      }

      // Handle variant-level removal
      const updatedVariants = item.variants?.map((variant: any) => {
        if (variant.id === product.id) {
          const newQuantity = (variant.quantity || 1) - 1;
          return {
            ...variant,
            quantity: newQuantity > 0 ? newQuantity : 0,
          };
        }
        return variant;
      });

      return {
        ...item,
        variants: updatedVariants ?? item.variants,
      };
    });
    setLocalProducts(updatedProducts);
    setProducts(updatedProducts);
  };

  const clearItemFromCart = (product: any) => {
    const updatedProducts = products.map((item) => {
      if (item._id === product._id) {
        return {
          ...item,
          checked: false,
          quantity: 0,
        };
      }
      const updatedVariants = item.variants?.map((variant: any) => {
        if (variant.id === product.id) {
          return {
            ...variant,
            checked: false,
            quantity: 0,
          };
        }
        return variant;
      });

      return {
        ...item,
        variants: updatedVariants ?? item.variants,
      };
    });
    setLocalProducts(updatedProducts);
    setProducts(updatedProducts);
  };
  // const addItemToCart = (product: any) => {
  //   const updatedProducts = products.map((item) =>
  //     item._id === product._id
  //       ? {
  //           ...product, // <- use latest product including updated price/variants
  //           quantity: (item.quantity || 1) + 1,
  //         }
  //       : item
  //   );
  // console.log("updatedProductsupdatedProducts",updatedProducts)
  //   setLocalProducts(updatedProducts);
  //   setProducts(updatedProducts);
  // };

  // console.log("addItemToCart",addItemToCart)

  // const removeItemFromCart = (productId: string | number) => {
  //   const updatedProducts = products.map((item) =>
  //     item._id === productId && item.quantity > 1
  //       ? { ...item, quantity: item.quantity - 1 }
  //       : item
  //   );
  //   setLocalProducts(updatedProducts);
  //   setProducts(updatedProducts)
  // };

  // const clearItemFromCart = (productId: string | number) => {
  //   const updatedProducts = products.map((item) =>
  //     item._id === productId ? { ...item, selected: false, quantity: 0 } : item
  //   );
  //   setLocalProducts(updatedProducts);
  //   setProducts(updatedProducts)
  // };

  return (
    <div>
      <SelectedItems
        items={products}
        showControls
        className="gap-0"
        itemClassName="p-4 pb-5 md:px-6"
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
        clearItemFromCart={clearItemFromCart}
      />
    </div>
  );
};
