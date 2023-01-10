import { hasOwnProperty } from "../components/Log";

export function isEmpty(obj: any) {
  if (obj === null || obj === undefined) return true;

  if (["number", "string", "boolean"].includes(typeof obj)) return false;

  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (!["object"].includes(typeof obj)) return true;
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}
