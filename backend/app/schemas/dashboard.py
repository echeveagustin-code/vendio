from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_posts: int
    scheduled_posts: int
    published_posts: int
    failed_posts: int
    total_views: int
    total_likes: int
    total_comments: int
    total_shares: int
    total_clicks: int