const FetchCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api/getCategories`
  );
  const data = await res.json();
  const categories: Category[] = data.categories;

  return categories;
};

export default FetchCategories;
