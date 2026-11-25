from fastapi import UploadFile, HTTPException
import filetype
import asyncio
import cloudinary.uploader

from app.config.settings import settings

cloudinary.config(
  cloud_name=settings.CLOUDINARY_CLOUD_NAME,
  api_key=settings.CLOUDINARY_API_KEY,
  api_secret=settings.CLOUDINARY_API_SECRET,
  secure=True
)

MAX_FILE_SIZE = 1024 * 1024 * 5 #5MB
ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]

async def validate_file(file: UploadFile, field_name: str):
  if not file.filename:
    raise HTTPException(400, f"{field_name} - Invalid file!")

  content = await file.read(MAX_FILE_SIZE + 1)
  await file.seek(0) # reset file index

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

async def upload_file(content: bytes, folder: str):
  result = await asyncio.to_thread(
    cloudinary.uploader.upload,
    content,
    folder=folder,
    resource_type="auto"
  )

  return {
    "public_id": result["public_id"],
    "resource_type": result['resource_type'],
    "secure_url": result["secure_url"]
  }

async def delete_file(public_id: str, resource_type: str):
  await asyncio.to_thread(
    cloudinary.uploader.destroy,
    public_id,
    resource_type=resource_type,
    invalidate=True
  )
