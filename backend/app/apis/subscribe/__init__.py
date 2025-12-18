from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import databutton as db

router = APIRouter()

class SubscriptionRequest(BaseModel):
    email: EmailStr

@router.post("/join")
def handle_subscription(body: SubscriptionRequest):
    """
    Handles a new newsletter subscription.

    Sends a notification email to the Beamu team's specified accounts.
    """
    team_emails = ["beamuadventures@gmail.com", "info@beamuadventures.com"]
    
    try:
        db.notify.email(
            to=team_emails,
            subject="🎉 New Beamu Club Subscriber!",
            content_html=f"""
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                    <h3 style="color: #0C1021;">New Subscriber Alert</h3>
                    <p>A new user has joined the Beamu Club!</p>
                    <p><strong>Email:</strong> {body.email}</p>
                    <p style="margin-top: 20px;">Let's welcome them to the adventure! ✨</p>
                </div>
            """
        )
        return {"message": "Successfully subscribed!"}

    except Exception as e:
        print(f"Error sending subscription notification: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the subscription.")
