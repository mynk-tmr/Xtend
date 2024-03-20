export async function postalapi(pincode: string) {
  const url = "https://api.postalpincode.in/pincode/" + pincode;
  const res = await fetch(url);
  const parsed = await res.json();
  const data = parsed[0].PostOffice;
  const { Circle: state, District: city } = data[0];
  const localities = data?.map((info: { Name: string }) => info.Name);
  return {
    localities,
    state,
    city,
  };
}
