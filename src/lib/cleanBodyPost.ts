export default function cleanBodyPost(body: any) {
  const cleanBody = Object.fromEntries(
    Object.entries(body).filter(([_, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    }),
  );
  return cleanBody;
}
