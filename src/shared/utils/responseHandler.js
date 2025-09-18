export const handleResponse = async (resp) => {
  if (!resp.ok) {
    let errorMessage = "Unknown error";
    try {
      const err = await resp.json();

      // Handle FastAPI validation errors
      if (Array.isArray(err.detail)) {
        errorMessage = err.detail
          .map(d => `[${d.loc.join(" → ")}]: ${d.msg}`)
          .join("\n");
      } else if (typeof err.detail === "string") {
        errorMessage = err.detail;
      } else if (err.message) {
        errorMessage = err.message;
      } else {
        errorMessage = JSON.stringify(err);
      }
    } catch {
      errorMessage = resp.statusText;
    }
    throw new Error(errorMessage);
  }
  return resp.json();
};

export const formatAPIError = (error) => {
  try {
    const parsed = JSON.parse(error.message);
    if (parsed.detail && Array.isArray(parsed.detail)) {
      return parsed.detail
        .map(d => `${d.loc.join(" → ")}: ${d.msg}`)
        .join("\n");
    }
  } catch {
    // if it's not JSON, just return the raw message
    return error.message;
  }
  return error.message;
}