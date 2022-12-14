const FetchProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/getProducts`
  );
  const data = await res.json();
  const products: Product[] = data.products;

  return products;
};

export default FetchProducts;
