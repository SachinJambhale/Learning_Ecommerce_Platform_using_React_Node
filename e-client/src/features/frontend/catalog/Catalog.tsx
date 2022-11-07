import * as React from "react";
import Grid from "@mui/material/Grid";
import ProductListing from "./ProductListing";
import Product from "../../../shared/models/ProductModel";
import ProductService from "../../../services/ProductService";
import CatalogSidebar from "./CatalogSidebar";
import { useSearchParams } from "react-router-dom";
import SortProduct from "./SortProduct";
import Helmet from "react-helmet";
import Pagination from "../../../ui/pagination/Pagination";

interface ICatalogProps {}
interface IFilterProduct {
  colors: string[];
  sizes: string[];
}

const Catalog: React.FunctionComponent<ICatalogProps> = (props) => {
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterState, setFilterState] = React.useState<IFilterProduct>({
    colors: [],
    sizes: [],
  });
  const loadProducts = (query: string) => {
    ProductService.fetchAllProduct(`?status=1&${query}`)
      .then((response) => {
        setProducts(response.data.data);
        setTotalProducts(response.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageChange = (current: number, size: number) => {
    const obj: any = {};
    for (const [prop, value] of searchParams) obj[prop] = value;
    setSearchParams({ ...obj, perPage: size, page: current });
  };
  React.useEffect(() => {
    ProductService.fetchAllProduct(`?status=1`).then((response) => {
      setTotalProducts(response.data.total);
      const prods = response.data.data;
      const colors = prods.reduce((pre: string[], prod: Product) => {
        Array.isArray(prod.colors) && pre.push(...prod.colors);
        return pre;
      }, []);
      const sizes = prods.reduce((pre: string[], prod: Product) => {
        Array.isArray(prod.sizes) && pre.push(...prod.sizes);
        return pre;
      }, []);

      console.log("Colors: ", colors);
      console.log("Sizes: ", sizes);

      setFilterState({
        colors: Array.from(new Set(colors)),
        sizes: Array.from(new Set(sizes)),
      });
    });
  }, []);

  React.useEffect(() => {
    console.log("search tostring: ");

    loadProducts(searchParams.toString());
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>Product Listing Catalog</title>
      </Helmet>
      <Grid container>
        <Grid item xs={12} md={3}>
          <CatalogSidebar filterState={filterState} />
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={9}
          justifyContent="flex-end"
          sx={{ p: 2 }}
        >
          <Grid xs={12} md={3}>
            <SortProduct />
          </Grid>
          <Grid xs={12}>
            <ProductListing products={products} />
            <Pagination
              perPage={10}
              current={searchParams.get("page") as unknown as number}
              total={totalProducts}
              handleChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Catalog;
