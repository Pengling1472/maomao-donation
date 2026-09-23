
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// functions/supporters.js
var supporters_default = async (request) => {
  if (request.method != "POST") return Response.json("Method not allowed!", {
    status: 405
  });
  try {
    const server = process.env.SERVER;
    const client = process.env.CLIENT;
    const response = await fetch(`${server}/api/maomao-supporters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": client
      }
    });
    if (!response.ok) throw Error(await response.text());
    const supporters = await response.json();
    return Response.json(supporters, {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    return Response.json(err.message, {
      status: 400
    });
  }
};
export {
  supporters_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZnVuY3Rpb25zL3N1cHBvcnRlcnMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGFzeW5jICggcmVxdWVzdCApID0+IHtcclxuXHRpZiAoIHJlcXVlc3QubWV0aG9kICE9ICdQT1NUJyApIHJldHVybiBSZXNwb25zZS5qc29uKCAnTWV0aG9kIG5vdCBhbGxvd2VkIScsIHtcclxuXHRcdHN0YXR1czogNDA1XHJcblx0fSApXHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBzZXJ2ZXIgPSBwcm9jZXNzLmVudi5TRVJWRVJcclxuXHRcdGNvbnN0IGNsaWVudCA9IHByb2Nlc3MuZW52LkNMSUVOVFxyXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCggYCR7c2VydmVyfS9hcGkvbWFvbWFvLXN1cHBvcnRlcnNgLCB7XHJcblx0XHRcdG1ldGhvZDogXCJQT1NUXCIsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcIk9yaWdpblwiOiBjbGllbnRcclxuXHRcdFx0fVxyXG5cdFx0fSApXHJcblxyXG5cdFx0aWYgKCAhcmVzcG9uc2Uub2sgKSB0aHJvdyBFcnJvciggYXdhaXQgcmVzcG9uc2UudGV4dCgpIClcclxuXHJcblx0XHRjb25zdCBzdXBwb3J0ZXJzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcblx0XHRcclxuXHRcdHJldHVybiBSZXNwb25zZS5qc29uKCBzdXBwb3J0ZXJzLCB7XHJcblx0XHRcdHN0YXR1czogMjAwLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuXHRcdFx0fVxyXG5cdFx0fSApXHJcblx0fSBjYXRjaCAoIGVyciApIHtcclxuXHRcdHJldHVybiBSZXNwb25zZS5qc29uKCBlcnIubWVzc2FnZSwge1xyXG5cdFx0XHRzdGF0dXM6IDQwMFxyXG5cdFx0fSApXHJcblx0fVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU8scUJBQVEsT0FBUSxZQUFhO0FBQ25DLE1BQUssUUFBUSxVQUFVLE9BQVMsUUFBTyxTQUFTLEtBQU0sdUJBQXVCO0FBQUEsSUFDNUUsUUFBUTtBQUFBLEVBQ1QsQ0FBRTtBQUVGLE1BQUk7QUFDSCxVQUFNLFNBQVMsUUFBUSxJQUFJO0FBQzNCLFVBQU0sU0FBUyxRQUFRLElBQUk7QUFDM0IsVUFBTSxXQUFXLE1BQU0sTUFBTyxHQUFHLE1BQU0sMEJBQTBCO0FBQUEsTUFDaEUsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ1IsZ0JBQWdCO0FBQUEsUUFDaEIsVUFBVTtBQUFBLE1BQ1g7QUFBQSxJQUNELENBQUU7QUFFRixRQUFLLENBQUMsU0FBUyxHQUFLLE9BQU0sTUFBTyxNQUFNLFNBQVMsS0FBSyxDQUFFO0FBRXZELFVBQU0sYUFBYSxNQUFNLFNBQVMsS0FBSztBQUV2QyxXQUFPLFNBQVMsS0FBTSxZQUFZO0FBQUEsTUFDakMsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ1IsZ0JBQWdCO0FBQUEsTUFDakI7QUFBQSxJQUNELENBQUU7QUFBQSxFQUNILFNBQVUsS0FBTTtBQUNmLFdBQU8sU0FBUyxLQUFNLElBQUksU0FBUztBQUFBLE1BQ2xDLFFBQVE7QUFBQSxJQUNULENBQUU7QUFBQSxFQUNIO0FBQ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
