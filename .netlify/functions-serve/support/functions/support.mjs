
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// functions/support.js
var support_default = async (request) => {
  if (request.method != "POST") return Response.json("Method not allowed!", {
    status: 405
  });
  try {
    const body = await request.json();
    const server = process.env.SERVER;
    const client = process.env.CLIENT;
    const response = await fetch(`${server}/api/maomao-stripe-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": client
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw Error(await response.text());
    const session = await response.json();
    return Response.json(session, {
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
  support_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZnVuY3Rpb25zL3N1cHBvcnQuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBkZWZhdWx0IGFzeW5jICggcmVxdWVzdCApID0+IHtcclxuXHRpZiAoIHJlcXVlc3QubWV0aG9kICE9ICdQT1NUJyApIHJldHVybiBSZXNwb25zZS5qc29uKCAnTWV0aG9kIG5vdCBhbGxvd2VkIScsIHtcclxuXHRcdHN0YXR1czogNDA1XHJcblx0fSApXHJcblxyXG5cdHRyeSB7XHJcblx0XHRjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuXHRcdGNvbnN0IHNlcnZlciA9IHByb2Nlc3MuZW52LlNFUlZFUlxyXG5cdFx0Y29uc3QgY2xpZW50ID0gcHJvY2Vzcy5lbnYuQ0xJRU5UXHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCBgJHtzZXJ2ZXJ9L2FwaS9tYW9tYW8tc3RyaXBlLXNlc3Npb25gLCB7XHJcblx0XHRcdG1ldGhvZDogXCJQT1NUXCIsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuXHRcdFx0XHRcIk9yaWdpblwiOiBjbGllbnRcclxuXHRcdFx0fSxcclxuXHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoIGJvZHkgKVxyXG5cdFx0fSApXHJcblxyXG5cdFx0aWYgKCAhcmVzcG9uc2Uub2sgKSB0aHJvdyBFcnJvciggYXdhaXQgcmVzcG9uc2UudGV4dCgpIClcclxuXHJcblx0XHRjb25zdCBzZXNzaW9uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXHJcblx0XHRcclxuXHRcdHJldHVybiBSZXNwb25zZS5qc29uKCBzZXNzaW9uLCB7XHJcblx0XHRcdHN0YXR1czogMjAwLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuXHRcdFx0fVxyXG5cdFx0fSApXHJcblx0fSBjYXRjaCAoIGVyciApIHtcclxuXHRcdHJldHVybiBSZXNwb25zZS5qc29uKCBlcnIubWVzc2FnZSwge1xyXG5cdFx0XHRzdGF0dXM6IDQwMFxyXG5cdFx0fSApXHJcblx0fVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQU8sa0JBQVEsT0FBUSxZQUFhO0FBQ25DLE1BQUssUUFBUSxVQUFVLE9BQVMsUUFBTyxTQUFTLEtBQU0sdUJBQXVCO0FBQUEsSUFDNUUsUUFBUTtBQUFBLEVBQ1QsQ0FBRTtBQUVGLE1BQUk7QUFDSCxVQUFNLE9BQU8sTUFBTSxRQUFRLEtBQUs7QUFDaEMsVUFBTSxTQUFTLFFBQVEsSUFBSTtBQUMzQixVQUFNLFNBQVMsUUFBUSxJQUFJO0FBQzNCLFVBQU0sV0FBVyxNQUFNLE1BQU8sR0FBRyxNQUFNLDhCQUE4QjtBQUFBLE1BQ3BFLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNSLGdCQUFnQjtBQUFBLFFBQ2hCLFVBQVU7QUFBQSxNQUNYO0FBQUEsTUFDQSxNQUFNLEtBQUssVUFBVyxJQUFLO0FBQUEsSUFDNUIsQ0FBRTtBQUVGLFFBQUssQ0FBQyxTQUFTLEdBQUssT0FBTSxNQUFPLE1BQU0sU0FBUyxLQUFLLENBQUU7QUFFdkQsVUFBTSxVQUFVLE1BQU0sU0FBUyxLQUFLO0FBRXBDLFdBQU8sU0FBUyxLQUFNLFNBQVM7QUFBQSxNQUM5QixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDUixnQkFBZ0I7QUFBQSxNQUNqQjtBQUFBLElBQ0QsQ0FBRTtBQUFBLEVBQ0gsU0FBVSxLQUFNO0FBQ2YsV0FBTyxTQUFTLEtBQU0sSUFBSSxTQUFTO0FBQUEsTUFDbEMsUUFBUTtBQUFBLElBQ1QsQ0FBRTtBQUFBLEVBQ0g7QUFDRDsiLAogICJuYW1lcyI6IFtdCn0K
