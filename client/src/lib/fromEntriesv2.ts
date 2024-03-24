export default function fromEntriesv2(
  data: Iterable<[string, string | FormDataEntryValue]>
) {
  const json = {} as Record<string, string | FormDataEntryValue>;
  for (const [key, value] of data) {
    if (!json[key]) json[key] = value;
    //@ts-expect-error this is fine
    else json[key] = [json[key], value].flat(Infinity);
  }
  return json;
}
