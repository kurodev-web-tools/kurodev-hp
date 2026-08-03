import { CONTACT_MAX_BODY_BYTES } from "./contact-validation.mjs";

export class ContactRequestError extends Error {
  constructor(code, phase) {
    super(code);
    this.name = "ContactRequestError";
    this.code = code;
    this.phase = phase;
  }
}

export async function readBoundedContactJson(request) {
  const contentLength = request.headers.get("content-length");
  const parsedLength = contentLength === null ? null : Number(contentLength);

  if (Number.isFinite(parsedLength) && parsedLength > CONTACT_MAX_BODY_BYTES) {
    throw new ContactRequestError("PAYLOAD_TOO_LARGE", "content-length");
  }

  if (!request.body) throw new ContactRequestError("INVALID_JSON", "empty-body");

  const reader = request.body.getReader();
  const chunks = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > CONTACT_MAX_BODY_BYTES) {
      await reader.cancel();
      throw new ContactRequestError("PAYLOAD_TOO_LARGE", "stream");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new ContactRequestError("INVALID_JSON", "parse");
  }
}
