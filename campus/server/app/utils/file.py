from fastapi import UploadFile, HTTPException
import filetype

MAX_FILE_SIZE = 1024 * 1024 * 5 #5MB

ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]

async def validate_file(file: UploadFile, field_name: str):
  if not file.filename:
    raise HTTPException(400, f"{field_name} - Invalid file!")

  content = await file.read()
  if not content:
    raise HTTPException(400, f"{field_name} - Invalid file!")

  if file.size > MAX_FILE_SIZE:
    raise HTTPException(400, f"{field_name} - Max file size should be 5MB")

  kind = filetype.guess(content)
  if kind.mime not in ALLOWED_TYPES:
    raise HTTPException(400, f"{field_name} - Unsupported file type")

  return {
    "content": content,
    "type": kind.mime
  }