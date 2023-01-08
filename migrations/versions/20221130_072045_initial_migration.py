"""initial migration

Revision ID: 454cd39a417e
Revises: 
Create Date: 2022-11-30 07:20:45.227414

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '454cd39a417e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('profile_pic', sa.String(length=255), nullable=True),
    sa.Column('bio', sa.String(length=255), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('chirps',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('chirp_content', sa.String(length=280), nullable=False),
    sa.Column('image_url', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('chirp_id', sa.Integer(), nullable=False),
    sa.Column('comment_content', sa.String(length=280), nullable=False),
    sa.ForeignKeyConstraint(['chirp_id'], ['chirps.id'], onDelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('chirp_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['chirp_id'], ['chirps.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('comments')
    op.drop_table('chirps')
    op.drop_table('users')
    # ### end Alembic commands ###
