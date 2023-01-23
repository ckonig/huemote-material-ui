import { ListItemIcon } from "@material-ui/core";
import productToIcon from "../helpers/productToIcon";

const ProductIcon = ({ productname }: { productname: string }) => {
  return (
    <ListItemIcon
      style={{ fontSize: "1.5em", margin: "auto" }}
      className={productToIcon(productname)}
    />
  );
};

export default ProductIcon;
