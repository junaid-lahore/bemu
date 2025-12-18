from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
import databutton as db
import asyncpg
from datetime import datetime
import uuid

router = APIRouter(prefix="/community")

class MessageSubmission(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    message: str
    age: Optional[str] = None

class SubmissionResponse(BaseModel):
    id: int
    name: str
    submission_type: str
    message_text: Optional[str]
    image_url: Optional[str]
    image_title: Optional[str]
    age: Optional[str]
    created_at: datetime

async def get_db_connection():
    """Get database connection"""
    database_url = db.secrets.get("DATABASE_URL_DEV")
    return await asyncpg.connect(database_url)

@router.post("/submit-message")
async def submit_message(submission: MessageSubmission) -> dict:
    """Submit a text message to community showcase"""
    try:
        conn = await get_db_connection()
        try:
            await conn.execute(
                """
                INSERT INTO community_submissions 
                (name, email, submission_type, message_text, age, status)
                VALUES ($1, $2, $3, $4, $5, $6)
                """,
                submission.name,
                submission.email,
                "message",
                submission.message,
                submission.age,
                "approved"  # Auto-approve for now, can be changed to 'pending'
            )
            return {"success": True, "message": "Thank you for sharing! Your message will appear soon."}
        finally:
            await conn.close()
    except Exception as e:
        print(f"Error submitting message: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit message")

@router.post("/submit-image")
async def submit_image(
    name: str = Form(...),
    email: Optional[str] = Form(None),
    title: str = Form(...),
    age: Optional[str] = Form(None),
    image: UploadFile = File(...)
) -> dict:
    """Submit an image to community showcase"""
    try:
        # Validate file type
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Only image files are allowed")
        
        # Generate unique filename
        file_extension = image.filename.split('.')[-1]
        unique_filename = f"community/{uuid.uuid4()}.{file_extension}"
        
        # Read file content
        file_content = await image.read()
        
        # Upload to storage
        storage_file = db.storage.binary.put(unique_filename, file_content)
        image_url = storage_file.url
        
        # Save to database
        conn = await get_db_connection()
        try:
            await conn.execute(
                """
                INSERT INTO community_submissions 
                (name, email, submission_type, image_url, image_title, age, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                """,
                name,
                email,
                "image",
                image_url,
                title,
                age,
                "approved"  # Auto-approve for now
            )
            return {"success": True, "message": "Thank you for sharing your creation! It will appear soon."}
        finally:
            await conn.close()
            
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error submitting image: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit image")

@router.get("/submissions")
async def get_submissions(limit: int = 10, status: str = "approved") -> list[SubmissionResponse]:
    """Get approved community submissions (50% messages, 50% images)"""
    try:
        conn = await get_db_connection()
        try:
            # Get equal number of messages and images
            messages_limit = limit // 2
            images_limit = limit - messages_limit
            
            # Get latest messages
            messages = await conn.fetch(
                """
                SELECT id, name, submission_type, message_text, image_url, image_title, age, created_at
                FROM community_submissions
                WHERE status = $1 AND submission_type = 'message'
                ORDER BY created_at DESC
                LIMIT $2
                """,
                status,
                messages_limit
            )
            
            # Get latest images
            images = await conn.fetch(
                """
                SELECT id, name, submission_type, message_text, image_url, image_title, age, created_at
                FROM community_submissions
                WHERE status = $1 AND submission_type = 'image'
                ORDER BY created_at DESC
                LIMIT $2
                """,
                status,
                images_limit
            )
            
            # Combine and shuffle
            all_submissions = list(messages) + list(images)
            
            # Convert to response format
            return [
                SubmissionResponse(
                    id=row['id'],
                    name=row['name'],
                    submission_type=row['submission_type'],
                    message_text=row['message_text'],
                    image_url=row['image_url'],
                    image_title=row['image_title'],
                    age=row['age'],
                    created_at=row['created_at']
                )
                for row in all_submissions
            ]
            
        finally:
            await conn.close()
    except Exception as e:
        print(f"Error fetching submissions: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch submissions")
