"""add publication type to content items

Revision ID: 0a0a36cdee04
Revises: 59f4276d483c
Create Date: 2026-07-08 16:22:47.383153

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0a0a36cdee04'
down_revision: Union[str, Sequence[str], None] = '59f4276d483c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

publication_type_enum = sa.Enum(
    "reel",
    "post",
    "story",
    name="publicationtype",
)

def upgrade() -> None:
    publication_type_enum.create(op.get_bind(), checkfirst=True)

    op.add_column(
        "content_items",
        sa.Column(
            "publication_type",
            publication_type_enum,
            nullable=False,
            server_default="reel",
        ),
    )

    op.alter_column(
        "content_items",
        "publication_type",
        server_default=None,
    )


def downgrade() -> None:
    op.drop_column("content_items", "publication_type")

    publication_type_enum.drop(op.get_bind(), checkfirst=True)
