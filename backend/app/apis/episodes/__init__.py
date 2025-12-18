from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
import asyncpg
import databutton as db
from typing import List
from app.libs.shorts_data import SHORTS_DATA


router = APIRouter()


class Short(BaseModel):
    id: int
    title: str
    url: str


class Episode(BaseModel):
    id: int
    title: str
    summary: str
    thumbnail_url: str
    shorts: List[Short]


async def get_db_connection():
    conn = await asyncpg.connect(db.secrets.get("DATABASE_URL_DEV"))
    try:
        yield conn
    finally:
        await conn.close()


@router.get("/episodes", response_model=List[Episode])
async def list_episodes(conn: asyncpg.Connection = Depends(get_db_connection)):
    try:
        episodes_query = "SELECT id, title, summary, thumbnail_url FROM episodes ORDER BY id"
        episodes_rows = await conn.fetch(episodes_query)

        episodes = []
        for episode_row in episodes_rows:
            episode_id = episode_row["id"]
            shorts = SHORTS_DATA.get(episode_id, [])
            episodes.append(
                Episode(
                    id=episode_id,
                    title=episode_row["title"],
                    summary=episode_row["summary"],
                    thumbnail_url=episode_row["thumbnail_url"],
                    shorts=[
                        Short(id=idx, title=s["title"], url=s["url"])
                        for idx, s in enumerate(shorts)
                    ],
                )
            )
        return episodes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/episodes/{episode_id}", response_model=Episode)
async def get_episode(
    episode_id: int, conn: asyncpg.Connection = Depends(get_db_connection)
):
    try:
        episode_query = "SELECT id, title, summary, thumbnail_url FROM episodes WHERE id = $1"
        episode_row = await conn.fetchrow(episode_query, episode_id)

        if not episode_row:
            raise HTTPException(status_code=404, detail="Episode not found")

        shorts = SHORTS_DATA.get(episode_id, [])

        return Episode(
            id=episode_row["id"],
            title=episode_row["title"],
            summary=episode_row["summary"],
            thumbnail_url=episode_row["thumbnail_url"],
            shorts=[
                Short(id=idx, title=s["title"], url=s["url"])
                for idx, s in enumerate(shorts)
            ],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
